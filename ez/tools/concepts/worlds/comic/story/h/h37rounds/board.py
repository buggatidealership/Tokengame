# /usr/bin/python3 board.py <shots dir> <width> <out.png> [scale] : today plus takes A to E, side by side at 390 (each column the 3x shot shown
# at half size) or stacked at 1280; each with its name and the principle it borrows. On phones a gold rule marks where a 844px phone screen ends,
# measured from the section's top. Phone columns are cut at CUT css px (default 2300) with a note of the full height.
#   lift <shots dir> <out.png> : the lifted-tag close-ups, one per take, at 390 and 1280.
import sys,json,glob,os
from PIL import Image,ImageDraw,ImageFont
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(s))
R=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',int(s))
NAMES={'now':('Today (live)','the painted case + the slab box'),
 'A':('A  Gallery of Honour','single-line hang under picture lights, wall-text tombstones; the rest a salon hang, each week around its best grade'),
 'B':('B  The vitrine and its drawers','one piece per lit bay (boutique vitrine); a jeweller\'s drawer per week, the newest pulled open'),
 'C':('C  The registry album','PSA Set Registry: the Mag 7 as a set, 5 of 7 filled; every other round on binder pages, nine a page'),
 'D':('D  The card show','featured slabs upright on stands; the rest flat under the dealer\'s glass, a row per week (swipe)'),
 'E':('E  The storehouse','V&A East open storage: one rack holds all; the top shelf is the Mag 7, every shelf below a week')}
def wrap(d,t,f,w):
  out=[];line=''
  for word in t.split():
    s=(line+' '+word).strip()
    if d.textlength(s,font=f)>w and line:out.append(line);line=word
    else:line=s
  out.append(line);return out
if sys.argv[1]=='lift':
  D,OUT=sys.argv[2],sys.argv[3];cells=[]
  for W in (390,1280):
    for k in ['now','A','B','C','D','E']:
      f=f'{D}/lift-{W}-{k}.png'
      if os.path.exists(f):cells.append((W,k,Image.open(f).convert('RGB')))
  tw=520;th=0;rows=[]
  for W,k,im in cells:
    if W>600:im=im.resize((im.width*2,im.height*2),Image.LANCZOS)
    im.thumbnail((tw,620));rows.append((W,k,im))
  cols=6;cw=tw+24;hh=70;rh=max(i.height for _,_,i in rows)+hh+20
  B=Image.new('RGB',(cols*cw+24,2*rh+20),(24,22,28));d=ImageDraw.Draw(B)
  for j,(W,k,im) in enumerate(rows):
    r=0 if W==390 else 1;c=['now','A','B','C','D','E'].index(k);x=24+c*cw;y=20+r*rh
    d.text((x,y),f'{NAMES[k][0]} · {W}px',font=F(22),fill=(248,240,217));d.text((x,y+30),'first tap lifts + tags' if W==390 else 'hover lifts + tags',font=R(16),fill=(200,190,170))
    B.paste(im,(x,y+hh))
  B.save(OUT,optimize=True);print(OUT,B.size);sys.exit()
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3];CUT=int(os.environ.get('CUT',2300))
M={}
for f in glob.glob(D+'/measure-*.json'):M.update(json.load(open(f)))
ims=[]
for k in ['now','A','B','C','D','E']:
  im=Image.open(f'{D}/sec-{W}-{k}.png').convert('RGB');m=M.get(f'{W}-{k}',{})
  if W<600:
    sc=im.width/W;full=im.height/sc
    if im.height>CUT*sc:im=im.crop((0,0,im.width,int(CUT*sc)))
    im=im.resize((im.width//2,im.height//2),Image.LANCZOS);sc=im.width/W;dr=ImageDraw.Draw(im)
    y=int((8+844)*sc);dr.rectangle([0,y-2,im.width,y+2],fill=(255,210,31));dr.text((8,y-28),'844px phone screen ends',font=F(18),fill=(255,210,31))
    if full>CUT+20:dr.rectangle([0,im.height-44,im.width,im.height],fill=(24,22,28));dr.text((10,im.height-36),f'... continues: section {int(full)}px tall',font=F(20),fill=(248,240,217))
  ims.append((k,im,m))
if W<600:
  cw=ims[0][1].width;pad=24;hh=150;H=max(i.height for _,i,_ in ims)+hh+pad
  B=Image.new('RGB',(len(ims)*(cw+pad)+pad,H),(24,22,28));d=ImageDraw.Draw(B);x=pad
  for k,i,m in ims:
    d.text((x,18),NAMES[k][0],font=F(30),fill=(248,240,217))
    for j,l in enumerate(wrap(d,NAMES[k][1],R(19),cw)[:4]):d.text((x,60+j*24),l,font=R(19),fill=(205,195,170))
    B.paste(i,(x,hh));x+=cw+pad
else:
  pad=30;hh=70;sc=float(sys.argv[4]) if len(sys.argv)>4 else 1
  ims=[(k,i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) if sc!=1 else i,m) for k,i,m in ims]
  cw=ims[0][1].width;cols=2;rows=[ims[j:j+cols] for j in range(0,len(ims),cols)]
  H=sum(max(i.height for _,i,_ in r)+hh+pad for r in rows)+pad;B=Image.new('RGB',(cols*(cw+pad)+pad,H),(24,22,28));d=ImageDraw.Draw(B);y=pad
  for r in rows:
    x=pad
    for k,i,m in r:
      d.text((x,y),NAMES[k][0],font=F(26),fill=(248,240,217));d.text((x,y+34),NAMES[k][1],font=R(17),fill=(205,195,170));B.paste(i,(x,y+hh));x+=cw+pad
    y+=max(i.height for _,i,_ in r)+hh+pad
B.save(OUT,optimize=True);print(OUT,B.size)
