# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today first, then R1 to R3; each row shows the four
# tabs of "Smarter or just lucky?" (P&L, Accuracy, Target hits, Sector) and "The race so far"
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',34 if W<1000 else 56)
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',24 if W<1000 else 40)
ROWS=[('now','Today · the live Leaderboard tab'),('r1','R1 · The ground is the verdict (green above the line that decides it, red below)'),
      ('r2','R2 · Every rival in its own corner (four strips in each AI\'s own colour)'),('r3','R3 · Printed on the Season 1 ticket (the stub is the axis; the gold rides the leader)')]
K=[('pnl','P&L'),('acc','Accuracy'),('tgt','Target hits'),('sec','Sector'),('race','The race so far')]
ims=[[Image.open(f'{D}/pf-{W}-{t}-{k}.png').convert('RGB') for k,_ in K] for t,_ in ROWS]
cw=max(i.width for r in ims for i in r);G=50 if W<1000 else 80
Bw=len(K)*cw+(len(K)+1)*G;Bh=sum(max(i.height for i in r)+(190 if W<1000 else 260) for r in ims)+G
B=Image.new('RGB',(Bw,Bh),'#1b1820');d=ImageDraw.Draw(B);y=G
for (t,lbl),r in zip(ROWS,ims):
  d.text((G,y),lbl,fill='#fdbc2a',font=F);y+=(70 if W<1000 else 100);x=G
  for (k,kl),i in zip(K,r):d.text((x,y),kl,fill='#f8f0d9',font=f);B.paste(i,(x,y+(50 if W<1000 else 70)));x+=cw+G
  y+=max(i.height for i in r)+(120 if W<1000 else 160)
B.thumbnail((7000,16000));B.save(OUT,optimize=True);print(OUT,B.size)
