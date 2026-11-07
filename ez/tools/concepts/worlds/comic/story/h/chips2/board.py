# python3 board.py <shots dir> <width> <out> : today's live standings, then A and B (whole section), a row with the tryouts chip in
# its three wordings (both schools), and on the phone board a close-up row at 2x (first beat of A, B's beat).
import sys,os,re
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): 01 Current standings, the season ticket',''),
 ('A','A · One chip per model, one beat each, then the tryouts chip. The company mark struck big into the gold plate, the version silkscreened beside it, the flag a decal printed on the board; LAST 5, W-L and SEASON P&L printed on the label; the founder loop in the die; the leader painted lit','$0.53 (8 chips) + $0.13 tryouts'),
 ('B','B · All four EPROMs in ONE beat, ranked by P&L (No. 1 to 4 printed on each label), then the tryouts package with four quartz windows. Mark on the gold plate, flag decal on the ceramic, stats on the black label, the founder behind the quartz window','$0.42 (8 chips, 2 repainted) + $0.04 tryouts')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,22 if W<600 else 24);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;bg='#1b1820'
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
ims=[(t,c,Image.open(f'{D}/ch-{W}-{k}.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/ch-{W}-{k}.png')]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
# the tryouts wordings: the last beat of each take
WD=[('A','In tryouts'),('A-qual','Qualifying'),('A-inf','Running inference…'),('B','In tryouts'),('B-qual','Qualifying'),('B-inf','Running inference…')]
tr=[]
for k,t in WD:
  fs=sorted([f for f in os.listdir(D) if re.fullmatch(rf'bt-{W}-{re.escape(k)}-\d+\.png',f)]);
  if fs:tr.append((f'{k[0]} · "{t}"',Image.open(f'{D}/{fs[-1]}').convert('RGB')))
sc=.5 if W<600 else .5
tr=[(t,i.resize((int(i.width*sc),int(i.height*sc)))) for t,i in tr]
if W<600:
  lh=290;B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),bg);d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:8]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+8*30+4),'Hedra '+c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
  rows=[('Tryouts chip, three wordings (the caption box reads "No. 5? · not signed yet" on all)',tr)]
  cs=[]
  for k,n,t in [('A',0,'A · No. 1 at 2x'),('A',1,'A · No. 2 at 2x'),('B',0,'B · the one beat at 2x')]:
    f=f'{D}/bt-{W}-{k}-{n}.png'
    if os.path.exists(f):cs.append((t,Image.open(f).convert('RGB')))
  rows.append(('Close-ups',cs))
  for title,r in rows:
    H=max(x.height for _,x in r);cw=sum(x.width for _,x in r)+pad*(len(r)+1)
    N=Image.new('RGB',(max(B.width,cw),B.height+H+130),bg);N.paste(B,(0,0));d=ImageDraw.Draw(N);d.text((pad,B.height+14),title,fill='#fdbc2a',font=F);x=pad
    for t,c in r:d.text((x,B.height+52),t,fill='#e9dfc6',font=G);N.paste(c,(x,B.height+86));x+=c.width+pad
    B=N
else:
  hh=[i.height+140 for *_,i in ims];th=max(i.height for _,i in tr)+150
  B=Image.new('RGB',(max([i.width for *_,i in ims]+[sum(i.width for _,i in tr[:3])+pad*4])+2*pad,sum(hh)+th*2+pad),bg);d=ImageDraw.Draw(B);y=pad
  for (t,c,i),h in zip(ims,hh):
    for n,l in enumerate(wrap(d,t+('   · Hedra '+c if c else ''),F,i.width)[:4]):d.text((pad,y+n*30),l,fill='#fdbc2a',font=F)
    B.paste(i,(pad,y+130));y+=h
  for g in (tr[:3],tr[3:]):
    k=min(1,(B.width-pad*(len(g)+1))/sum(c.width for _,c in g));g=[(t,c.resize((int(c.width*k),int(c.height*k)))) for t,c in g]
    d.text((pad,y),'Tryouts chip, three wordings',fill='#fdbc2a',font=F);x=pad
    for t,c in g:d.text((x,y+40),t,fill='#e9dfc6',font=G);B.paste(c,(x,y+80));x+=c.width+pad
    y+=th
B.save(OUT,optimize=True);print(OUT,B.size)
