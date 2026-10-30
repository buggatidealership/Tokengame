# /usr/bin/python3 board.py <shots dir> <section cover|up|back> <width> <out>: Today, then the three takes
import sys
from PIL import Image,ImageDraw,ImageFont
D,S,W,OUT=sys.argv[1:5]
T={'cover':[('now','Today'),('c1','E · C1 · The next fight, live'),('c2','E · C2 · The golden ticket'),('c3','E · C3 · The loop')],
   'up':[('now','Today'),('u1','E · U1 · Fight night'),('u2','E · U2 · The box office'),('u3','E · U3 · The road to Bet #1')],
   'back':[('now','Today'),('k1','E · K1 · Next issue'),('k2','E · K2 · The coupon'),('k3','E · K3 · In your feed')]}[S]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,30)
ims=[(t,Image.open(f'{D}/{S}-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    f=F
    while d.textlength(t,font=f)>i.width and f.size>16:f=ImageFont.truetype(FN,f.size-1)
    d.text((x,30),t,fill='#fdbc2a',font=f);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.thumbnail((7000,7000));B.save(OUT,optimize=True);print(OUT,B.size)
