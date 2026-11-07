# /usr/bin/python3 board.py <shots dir> <width> <out> : today, then T1..T5 (label + cost), then a close-up row of each take's countdown
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X3+)',''),
 ('s1','S1 · The circuit: fees run down the traces into a gold pool; the call is a junction to a lit LED (right) or a blown fuse (wrong)','$0.10'),
 ('s2','S2 · The scale: green pan right, red pan wrong, words on engraved bronze plates','$0.04'),
 ('s3','S3 · The bet slip: a stub cut from the chip\'s board, gold traces, the stakes printed on it','$0.03'),
 ('s4','S4 · Parts list: three painted parts (C1 pool, U1 call, K1 switch) with the board\'s reference designators','$0.07'),
 ('s5','S5 · Wired: hand-drawn traces carry pulsing fees into a capacitor, a junction, an LED and a blown fuse','$0')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
ims=[(t,c,Image.open(f'{D}/bet-{W}-{k}.png').convert('RGB')) for k,t,c in T]
if W<600:
  F=ImageFont.truetype(FN,22);pad=40;lh=110
  B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    words=t.split(' ');lines=[''];
    for w in words:
      if d.textlength(lines[-1]+' '+w,font=F)>i.width:lines.append(w)
      else:lines[-1]=(lines[-1]+' '+w).strip()
    for n,l in enumerate(lines[:3]):d.text((x,14+n*26),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+3*26),'Hedra: '+c,fill='#e9dfc6',font=F)
    B.paste(i,(x,lh));x+=i.width+pad
else:
  F=ImageFont.truetype(FN,30)
  cols=2;rows=[ims[i:i+cols] for i in range(0,len(ims),cols)]
  cw=max(i.width for *_,i in ims);Hs=[max(i.height for *_,i in r)+80 for r in rows]
  B=Image.new('RGB',(cw*cols+40*(cols+1),sum(Hs)+40),'#1b1820');d=ImageDraw.Draw(B);y=20
  for r,h in zip(rows,Hs):
    x=40
    for t,c,i in r:d.text((x,y),t[:70]+('…' if len(t)>70 else '')+('   Hedra '+c if c else ''),fill='#fdbc2a',font=F);B.paste(i,(x,y+60));x+=cw+40
    y+=h
B.thumbnail((9000,9000));B.save(OUT,optimize=True);print(OUT,B.size)
# close-up row: each take's stakes block at full 2x, cropped from the phone shots (only on the 390 board)
if W<600:
  B=Image.open(OUT).convert('RGB');cs=[]
  for k,t,c in T[1:]:
    i=Image.open(f'{D}/bet-{W}-{k}.png').convert('RGB');h=i.height
    cs.append((k,i.crop((0,int(h*.36),i.width,int(h*.36)+760))))
  ch=Image.open(f'{D}/bet-1280-s1.png').convert('RGB');top=int(ch.height*.30);cs.insert(0,('dies, 1280 at 2x',ch.crop((300,top,1900,top+760)).resize((1200,570))))
  cw=sum(x.width for _,x in cs)+40*(len(cs)+1);N=Image.new('RGB',(max(B.width,cw),B.height+760+90),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=40
  for k,x_ in cs:d.text((x,B.height+20),'Close-up · '+k,fill='#fdbc2a',font=F);N.paste(x_,(x,B.height+70));x+=x_.width+40
  N.save(OUT,optimize=True);print('closeups',N.size)
