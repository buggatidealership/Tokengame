# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today and L1 first, then N1 to N4 in Season, Last 24 hours,
# Last 7 days, and the quiet 24 hours (the clock moved back to Mon Oct 26, 10 am ET, with the rounds graded by then)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30 if W<1000 else 44)
WN=[('season','Season'),('d1','Last 24 hours'),('d7','Last 7 days'),('d1-empty','Quiet 24h (Mon Oct 26, 10 am ET)')]
rows=[[('now','Today · the live Leaderboard tab'),('l1-season','L1 · The fight bill (round L, Season)')]]
for k,n in [('n1','N1 · Corners, the walk-in'),('n2','N2 · Bill posting'),('n3','N3 · The arena board'),('n4','N4 · The ring card')]:
  rows.append([(f'{k}-{w}',f'{n} · {t}') for w,t in WN])
CAP=2000 if W<1000 else 1300
ims=[[(t,Image.open(f'{D}/lb-{W}-{k}.png').convert('RGB')) for k,t in r] for r in rows]
ims=[[(t,i.crop((0,0,i.width,min(i.height,CAP)))) for t,i in r] for r in ims]
cw=max(i.width for r in ims for _,i in r);G=50
Bw=4*cw+5*G;Bh=sum(max(i.height for _,i in r)+120 for r in ims)+G
B=Image.new('RGB',(Bw,Bh),'#1b1820');d=ImageDraw.Draw(B);y=G
for r in ims:
  x=G
  for t,i in r:d.text((x,y),t,fill='#fdbc2a',font=F);B.paste(i,(x,y+70));x+=cw+G
  y+=max(i.height for _,i in r)+120
B.thumbnail((7000,14000));B.save(OUT,optimize=True);print(OUT,B.size)
