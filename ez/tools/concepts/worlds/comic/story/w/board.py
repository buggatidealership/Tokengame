# /usr/bin/python3 board.py <shots dir> <section every|tonight> <width> <out>: today, then the three takes
import sys
from PIL import Image,ImageDraw,ImageFont
D,SEC,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
T={'every':[('now','Today (M3)'),('e1','W·E1 · The winner speaks'),('e2','W·E2 · Knockout'),('e3','W·E3 · Ride the move')],
   'tonight':[('now','Today (R10)'),('t1','W·T1 · Bulls vs bears'),('t2','W·T2 · The shouting match'),('t3','W·T3 · Tug of war')]}[SEC]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
ims=[(t,Image.open(f'{D}/{SEC}-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
if max(B.size)>7900:B.thumbnail((7900,7900))
B.save(OUT,optimize=True);print(OUT,B.size)
