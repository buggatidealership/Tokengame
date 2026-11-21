# /usr/bin/python3 board.py <shots dir> <sol|lb> <width> <out>: Today first, then each take, labelled
import sys
from PIL import Image,ImageDraw,ImageFont
D,SEC,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
T={'sol':[('now','Today · Smart or lucky?'),('i1','I1 · Your turn (fresh)'),('i1b','I1 · Your turn (1 guess, 6 luck runs)'),('i2','I2 · The hot streak'),('i3','I3 · Tug of war')],
   'lb':[('now','Today · the Leaderboard tab'),('i4','I4 · Title fight'),('i5','I5 · Pick the window (Season)'),('i5b','I5 · Pick the window (Last close)'),('i6','I6 · The chase')]}[SEC]
if int(W)>=1000:T=[t for t in T if t[0]!='i1b']
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30 if int(W)<1000 else 40)
ims=[(t,Image.open(f'{D}/{SEC}-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+100 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+60));y+=i.height+100
B.thumbnail((6000,12000));B.save(OUT,optimize=True);print(OUT,B.size)
