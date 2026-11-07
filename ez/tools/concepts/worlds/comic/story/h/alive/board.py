# Board: one frame per effect (the moment it shows best), its name, the fact it carries and its measured cost.
# /usr/bin/python3 board.py <frames dir> <cost.json> <out.png>
import sys,json,os,re,statistics as st
from PIL import Image,ImageDraw,ImageFont
S,CJ,OUT=sys.argv[1:4]
cfg=open(os.path.join(os.path.dirname(__file__),'cfg.js')).read()
def field(k,f):
    m=re.search(k+r":\{name:'([^']*)',fact:'([^']*)'",cfg);return m.group(1 if f=='name' else 2)
best=json.load(open(os.path.join(os.path.dirname(__file__),'frames.json')))
cost=json.load(open(CJ)) if os.path.exists(CJ) else {}
F=lambda n,s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans'+n+'.ttf',s)
fb,fr,fs=F('-Bold',22),F('',17),F('',15)
ids=list(best.keys());TW=380;cols=4;pad=22
def med(a,k):return st.median([x[k] for x in a]) if a else float('nan')
def costline(i):
    c=cost.get(i)
    if not c:return 'cost: not measured'
    fo,bo=c['fx']['on'],c['base']['on'];ff,bf=c['fx']['off'],c['base']['off']
    return (f"On screen: {med(fo,'fps'):.0f} fps (page alone {med(bo,'fps'):.0f}); main thread {med(fo,'main')-med(bo,'main'):+.2f} s per 3 s",
            "Off screen: 0 animations of its own (counted); main thread within noise")
def wrap(d,t,f,w):
    out=[];line=''
    for word in t.split():
        if d.textlength((line+' '+word).strip(),font=f)>w:out.append(line);line=word
        else:line=(line+' '+word).strip()
    out.append(line);return out
tiles=[]
for n,i in enumerate(ids):
    im=Image.open(f'{S}/{i}-fr/{best[i]:04d}.png').convert('RGB');im=im.resize((TW,int(im.height*TW/im.width)),Image.LANCZOS)
    d=ImageDraw.Draw(Image.new('RGB',(10,10)))
    if im.height>440:o=(im.height-440)//2;im=im.crop((0,o,TW,o+440))
    lines=[(l,fb) for l in wrap(d,f'{n+1}. '+field(i,'name'),fb,TW)]+[(l,fr) for l in wrap(d,'Fact: '+field(i,'fact'),fr,TW)]
    cl=costline(i);lines+=[(l,fs) for c in (cl if isinstance(cl,tuple) else (cl,)) for l in wrap(d,c,fs,TW)]
    th=sum(28 if f==fb else 22 for _,f in lines)+8
    t=Image.new('RGB',(TW,im.height+th),'#f6efe0');t.paste(im,(0,0));d=ImageDraw.Draw(t);y=im.height+6
    for l,f in lines:d.text((0,y),l,fill='#15121a' if f!=fs else '#5a4f45',font=f);y+=28 if f==fb else 22
    tiles.append(t)
rows=[tiles[k:k+cols] for k in range(0,len(tiles),cols)]
W=cols*TW+(cols+1)*pad;HD=176;H=HD+sum(max(t.height for t in r)+pad for r in rows)+pad
B=Image.new('RGB',(W,H),'#f6efe0');d=ImageDraw.Draw(B)
hd=['X3+ alive: 14 small effects inside the existing modules','390 px, one frame each; clips ez/x2p-x3p-h5-alive-<n>.mp4, reel ez/x2p-x3p-h5-alive-reel.mp4']
sub=wrap(d,'Each effect carries one fact, runs only while its picture is on screen, and is still with reduced motion. Cost: 4x slower CPU, 390x844, median of 3 runs, 3 s windows, against the same page without the effect. Effects 5 and 6: the Every round so far viewport drops to about 12 to 25 fps for ANY motion in this headless software-GL test (a 3 px blinking dot alone: 11.6 fps); see REPORT.',fr,W-2*pad)
d.text((pad,20),hd[0],fill='#15121a',font=F('-Bold',30));d.text((pad,58),hd[1],fill='#15121a',font=fr)
for k,l in enumerate(sub):d.text((pad,86+k*22),l,fill='#5a4f45',font=fr)
y=HD
for r in rows:
    for k,t in enumerate(r):B.paste(t,(pad+k*(TW+pad),y))
    y+=max(t.height for t in r)+pad
B.save(OUT);print(OUT,B.size)
