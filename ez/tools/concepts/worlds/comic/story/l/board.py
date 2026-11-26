# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today and I4 first, then L1 to L3 in all three windows, labelled
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34 if W<1000 else 52)
WN=[('close','Last close'),('week','This week'),('season','Season')]
rows=[[('now','Today · the live Leaderboard tab'),('i4','I4 · Title fight (overnight, for reference)')]]
for k,n in [('l1','L1 · The fight bill'),('l2','L2 · Pick an issue'),('l3','L3 · Tale of the tape')]:
  rows.append([(f'{k}-{w}',f'{n} · {t}') for w,t in WN])
CAP=2600 if W<1000 else 1800
ims=[[(t,Image.open(f'{D}/lb-{W}-{k}.png').convert('RGB')) for k,t in r] for r in rows]
ims=[[(t,i.crop((0,0,i.width,min(i.height,CAP)))) for t,i in r] for r in ims]
cw=max(i.width for r in ims for _,i in r);G=50
Bw=3*cw+4*G;Bh=sum(max(i.height for _,i in r)+130 for r in ims)+G
B=Image.new('RGB',(Bw,Bh),'#1b1820');d=ImageDraw.Draw(B);y=G
for r in ims:
  x=G
  for t,i in r:d.text((x,y),t,fill='#fdbc2a',font=F);B.paste(i,(x,y+80));x+=cw+G
  y+=max(i.height for _,i in r)+130
B.thumbnail((6000,12000));B.save(OUT,optimize=True);print(OUT,B.size)
