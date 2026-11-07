# python3 board.py <shots dir> <width> <out> : today's live standings, then A, B, B2, C (label + Hedra cost); the phone board adds a
# close-up row of one beat per take at 2x.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): 01 Current standings, the season ticket',''),
 ('A','A · One chip per model, one beat each (new school). The leader\'s chip painted lit, gold rays like the bet\'s chip. Founder loop in the die; mark on the gold pad, flag on the label, name, W-L, P&L silkscreened','$0.53 (8 chips)'),
 ('B','B · Two chips per beat, old school (pick): 1970s EPROMs, the founder seen through the quartz window. "The race for No. 1" (1 and 2), "Chasing" (3 and 4)','$0.34 (8 chips)'),
 ('B2','B2 · Two per beat, new school side by side: the trade-off shown; the silkscreen is too small on a phone (6px)','reuses A\'s'),
 ('C','C · One big chip, four dies, in P&L order; the leader\'s die lit by a gold light round its bezel','$0.09 (2 chips)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[(t,c,Image.open(f'{D}/ch-{W}-{k}.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/ch-{W}-{k}.png')]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
F=ImageFont.truetype(FN,22 if W<600 else 24);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;lh=260
if W<600:
  B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:7]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+7*30+4),'Hedra '+c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
  cs=[]
  for k,n in [('A',0),('B',0),('B2',0),('C',0)]:
    f=f'{D}/bt-{W}-{k}-{n}.png'
    if os.path.exists(f):cs.append((f'{k} · first beat at 2x',Image.open(f).convert('RGB')))
  H=max(x.height for _,x in cs);cw=sum(x.width for _,x in cs)+pad*(len(cs)+1)
  N=Image.new('RGB',(max(B.width,cw),B.height+H+90),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=pad
  for t,c in cs:d.text((x,B.height+20),'Close-up · '+t,fill='#fdbc2a',font=F);N.paste(c,(x,B.height+60));x+=c.width+pad
  B=N
else:
  # desktop: one take per row
  hh=[i.height+110 for *_,i in ims];B=Image.new('RGB',(max(i.width for *_,i in ims)+2*pad,sum(hh)+pad),'#1b1820');d=ImageDraw.Draw(B);y=pad
  for (t,c,i),h in zip(ims,hh):
    for n,l in enumerate(wrap(d,t+('   · Hedra '+c if c else ''),F,i.width)[:3]):d.text((pad,y+n*30),l,fill='#fdbc2a',font=F)
    B.paste(i,(pad,y+100));y+=h
B.save(OUT,optimize=True);print(OUT,B.size)
