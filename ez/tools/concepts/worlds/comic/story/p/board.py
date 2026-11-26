# /usr/bin/python3 board.py <shots dir> <390|1280> <out>: Today first, then P1 to P4; Season, Last 24 hours, Last 7 days as a
# reader sees them (the scoreboard head under the header), then the whole scoreboard in Season (390 and 320 on the phone board)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30 if W<1000 else 40)
T=[('now','Today · the live scoreboard as rebuilt 18:20 (a sticker per card in a window)'),
   ('p1','P1 · The docked bill: the three stubs dock under the header while the scoreboard is on screen · ground: ticket stock printed with the model\'s own mark'),
   ('p2','P2 · Stamped window: the stubs printed again under the head, every ticket rubber-stamped with its window · ground: the dollar bill, green ink in profit, red ink at a loss'),
   ('p3','P3 · Thumb dock: a ticket switch floats at the bottom while the scoreboard is on screen · ground: each card in its AI\'s colour, numbers on caption strips'),
   ('p4','P4 · Punch the ticket: Season / 24h / 7d punched on every ticket\'s stub · ground: ticket stock printed with the logos of the rounds the window counts')]
WN=[('season','Season'),('d1','Last 24 hours'),('d7','Last 7 days')]
rows=[]
for k,t in T:
  cells=[(f'v-{W}-{k}-{w}.png',n) for w,n in WN]
  cells.append((f'sb-{W}-{k}-season.png','Whole scoreboard, Season, %d'%W))
  if W<1000:cells.append((f'sb-320-{k}-season.png','Whole scoreboard, Season, 320'))
  rows.append((t,[(Image.open(f'{D}/{f}').convert('RGB'),n) for f,n in cells]))
CAP=2400 if W<1000 else 2000
G=40;cw=max(i.width for _,r in rows for i,_ in r)
Bw=len(rows[0][1])*(cw+G)+G
Bh=sum(min(max(i.height for i,_ in r),CAP)+140 for _,r in rows)+G
B=Image.new('RGB',(Bw,Bh),'#1b1820');d=ImageDraw.Draw(B);y=G
for t,r in rows:
  d.text((G,y),t,fill='#fdbc2a',font=F);x=G
  for i,n in r:
    d.text((x,y+50),n,fill='#f8f0d9',font=F);B.paste(i.crop((0,0,i.width,min(i.height,CAP))),(x,y+100));x+=cw+G
  y+=min(max(i.height for i,_ in r),CAP)+140
B.thumbnail((5600 if W>1000 else 9000,16000));B.save(OUT,optimize=True);print(OUT,B.size)
