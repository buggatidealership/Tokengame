# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live top, then O1..N3 (label + Hedra cost); a close-up row of the
# hand-over panels (and, on the phone board, beat 1 of each school) at 2x
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): headline, film bill, live strip',''),
 ('O1','O1 · Old school, classic gutter. Beat 1: the marble hall\'s quotation board, the newest round chalked on its slates. Hand-over: the dusty ticker vs one lit chip, motto as two narration captions','beat 1 $0.25 + $0.07'),
 ('O2','O2 · Old school, pasted beats (pick). The arch butts beat 1; the motto is gilded in the lintel; four chips on velvet, one per AI, leader lit gold','beat 1 $0.25 + $0.17'),
 ('O3','O3 · Old school, designed break. No second panel: a ticker tape runs edge to edge as the gutter, the motto crawling on it','beat 1 $0.25 + $0.04'),
 ('N1','N1 · New school, classic gutter. Beat 1: the glass exchange\'s LED wall. Hand-over: the old ticker vs a server blade, motto as captions','beat 1 $0.25 + $0.07'),
 ('N2','N2 · New school, pasted beats. The server aisle butts beat 1; the motto lit on its LED band; four chips in the glass case','beat 1 $0.25 + $0.17'),
 ('N3','N3 · New school, designed break. An LED ticker band edge to edge as the gutter, the motto crawling','beat 1 $0.25 + $0.04')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[(t,c,Image.open(f'{D}/top-{W}-{k}.png').convert('RGB')) for k,t,c in T]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
F=ImageFont.truetype(FN,22 if W<600 else 26);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;lh=250
if W>=600:
  # desktop: two rows (old school, new school) after today's
  rows=[ims[:1]+ims[1:4],[(None,None,None)]+ims[4:]]
  cw=max(i.width for *_,i in ims);rh=[max(x[2].height for x in r if x[2]) for r in rows]
  B=Image.new('RGB',(4*cw+5*pad,sum(rh)+2*lh+80),'#1b1820');d=ImageDraw.Draw(B);y=0
  for r,h in zip(rows,rh):
    x=pad
    for t,c,i in r:
      if i:
        for n,l in enumerate(wrap(d,t,F,i.width)[:6]):d.text((x,y+14+n*31),l,fill='#fdbc2a',font=F)
        if c:d.text((x,y+14+6*31+4),'Hedra '+c,fill='#e9dfc6',font=G)
        B.paste(i,(x,y+lh))
      x+=cw+pad
    y+=h+lh+40
else:
  B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:7]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+7*30+4),'Hedra '+c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
cs=[]
for k in (['O1','N1'] if W<600 else []):
  f=f'{D}/b1-{W}-{k}.png'
  if os.path.exists(f):cs.append((f'{k[0]} · beat 1 board at 2x',Image.open(f).convert('RGB')))
for k in ['O1','O2','N2','N3','O3']:
  f=f'{D}/hand-{W}-{k}.png'
  if os.path.exists(f):
    im=Image.open(f).convert('RGB')
    if W>=600:im=im.resize((im.width*3//4,im.height*3//4))
    cs.append((f'{k} · hand-over',im))
if cs:
  H=max(x.height for _,x in cs);cw2=sum(x.width for _,x in cs)+pad*(len(cs)+1)
  N=Image.new('RGB',(max(B.width,cw2),B.height+H+90),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=pad
  for t,c in cs:d.text((x,B.height+20),'Close-up · '+t,fill='#fdbc2a',font=F);N.paste(c,(x,B.height+60));x+=c.width+pad
  B=N
B.save(OUT,optimize=True);print(OUT,B.size)
