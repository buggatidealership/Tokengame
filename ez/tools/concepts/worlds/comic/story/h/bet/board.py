# /usr/bin/python3 board.py <shots dir> <width> <out> : today, then T1..T5 (label + cost), then a close-up row of each take's countdown
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X3+)',''),
 ('t1','T1 · The die count: a modelled GPU chip, the countdown set into its four dies in perspective','$0.07'),
 ('t2','T2 · The dial: the opener\'s vault in close-up; days on the dial face, the needle sweeps the seconds','$0.05'),
 ('t3','T3 · Main event: a fight poster; purse = the pool, corners = right/wrong, bell clock on a ticket','$0.07'),
 ('t4','T4 · The hourglass: fees pour into the pool; countdown engraved on the base; ink callouts','$0.04'),
 ('t5','T5 · Next issue: the bet as the next comic\'s cover; countdown in the "on sale in" box','$0.30 (1K draft + 2K)')]
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
