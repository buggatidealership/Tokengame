# /usr/bin/python3 board.py <shots dir> <width> <out> : today, then A..D (label, words of plain text outside the world, Hedra cost); a close-up row on the phone board
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X3+): the parts list','59 words of plain text',''),
 ('A','A · Engraved: 69% cut into the pool\'s brass rim, fees drip in; the call as a noir caption; RIGHT/WRONG on the enamel plates; #2 #3 #4 sockets after the lit NVIDIA chip','9 plain words (the date line)','$0.37'),
 ('B','B · Gold plate: 69% stamped on a plate riveted to the pool, fees pour down; the host says the call in a balloon; the enamel plates; empty sockets','9 plain words','$0.51'),
 ('C','C · Gauge: the tank\'s dial needle at 69%, gold rising in its window; caption + the leader speaks from the junction ("Today that\'s me"); Season 2 silkscreened','9 plain words','$0.37'),
 ('D','D · One board (pick): the chip\'s board keeps going: fees run down the traces into the pool, 69% silkscreened beside it, the fork, the empty sockets, two captions','9 plain words','$0.24')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[(t,w,c,Image.open(f'{D}/bet-{W}-{k}.png').convert('RGB')) for k,t,w,c in T]
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
if W<600:
  F=ImageFont.truetype(FN,22);G=ImageFont.truetype(FR,20);pad=40;lh=170
  B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
  for t,w,c,i in ims:
    ls=wrap(d,t,F,i.width)[:4]
    for n,l in enumerate(ls):d.text((x,14+n*27),l,fill='#fdbc2a',font=F)
    d.text((x,14+4*27+6),w+('   ·   Hedra '+c if c else ''),fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
else:
  F=ImageFont.truetype(FN,30);G=ImageFont.truetype(FR,26)
  cols=len(ims);cw=max(i.width for *_,i in ims)//2
  sm=[(t,w,c,i.resize((cw,int(i.height*cw/i.width)))) for t,w,c,i in ims]
  B=Image.new('RGB',(cw*cols+40*(cols+1),max(i.height for *_,i in sm)+230),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,w,c,i in sm:
    for n,l in enumerate(wrap(d,t,F,cw)[:4]):d.text((x,16+n*36),l,fill='#fdbc2a',font=F)
    d.text((x,16+4*36+10),w+('   ·   Hedra '+c if c else ''),fill='#e9dfc6',font=G)
    B.paste(i,(x,210));x+=cw+40
B.save(OUT,optimize=True);print(OUT,B.size)

# close-up row (phone board only): each take's in-world lettering at 2x: the pool panel and the voice panel
if W<600:
  import os
  B=Image.open(OUT).convert('RGB');F=ImageFont.truetype(FN,22)
  pick={'A':[0,1],'B':[0,1],'C':[0,1],'D':[0]}
  cs=[]
  for k,ix in pick.items():
    for i in ix:
      f=f'{D}/pan-390-{k}-{i}.png'
      if os.path.exists(f):cs.append((f'{k} · panel {i+1} at 2x',Image.open(f).convert('RGB')))
  cs=[(t,x if x.height<=1300 else x.crop((0,0,x.width,1300))) for t,x in cs]
  H=max(x.height for _,x in cs);cw=sum(x.width for _,x in cs)+40*(len(cs)+1)
  N=Image.new('RGB',(max(B.width,cw),B.height+H+90),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=40
  for t,x_ in cs:d.text((x,B.height+20),'Close-up · '+t,fill='#fdbc2a',font=F);N.paste(x_,(x,B.height+60));x+=x_.width+40
  N.save(OUT,optimize=True);print('closeups',N.size)
