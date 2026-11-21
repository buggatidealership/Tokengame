# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live top, then A, B, B2 (label + Hedra cost); phone board adds a close-up row of the frames at 2x
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): headline, film bill, live strip',''),
 ('A','A · The chip\'s world: four AI dies wired to one score bar; CALL on a four-die chip, BELL a buzzer + readout, #1 a gold-lidded chip, BET the NVIDIA chip spelling NVDA','$0.40'),
 ('B','B · The floor at the bell (pick): the exchange\'s big board ranks the four; CALL spiked order slips, BELL the brass bell, #1 the golden ticket, BET the ticker tape','$0.40'),
 ('B2','B2 · B with the alternative headline: "4 AIs. Every earnings report. One scoreboard."','same as B')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[(t,c,Image.open(f'{D}/top-{W}-{k}.png').convert('RGB')) for k,t,c in T]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
F=ImageFont.truetype(FN,22 if W<600 else 28);G=ImageFont.truetype(FR,20 if W<600 else 24);pad=40;lh=200
B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
for t,c,i in ims:
  for n,l in enumerate(wrap(d,t,F,i.width)[:5]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
  if c:d.text((x,14+5*30+4),'Hedra '+c,fill='#e9dfc6',font=G)
  B.paste(i,(x,lh));x+=i.width+pad
if W<600:
  cs=[]
  for k in ['A','B']:
    for n in range(4):
      f=f'{D}/fr-{W}-{k}-{n}.png'
      if os.path.exists(f):cs.append((f'{k} · frame {n+1} at 2x',Image.open(f).convert('RGB')))
  H=max(x.height for _,x in cs);cw=sum(x.width for _,x in cs)+pad*(len(cs)+1)
  N=Image.new('RGB',(max(B.width,cw),B.height+H+90),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=pad
  for t,c in cs:d.text((x,B.height+20),'Close-up · '+t,fill='#fdbc2a',font=F);N.paste(c,(x,B.height+60));x+=c.width+pad
  B=N
B.save(OUT,optimize=True);print(OUT,B.size)
