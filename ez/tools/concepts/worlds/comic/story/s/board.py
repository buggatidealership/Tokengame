# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today, then S1 to S3, each in Season and Last 24 hours
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30 if W<1000 else 40)
T=[('now','Today · the live scoreboard'),('s1','S1 · The ledger: one Season 1 ticket, a row per AI'),('s2','S2 · The race: lanes from the $100K start line'),('s3','S3 · Tale of the tape: four corners, a row per stat')]
WN=[('season','Season'),('d1','Last 24 hours picked')]
G=50
if W<1000:
  ims=[(f'{t}  ·  {w}',Image.open(f'{D}/sb-{W}-{k}-{v}.png').convert('RGB')) for k,t in T for v,w in WN]
  cw=max(i.width for _,i in ims);H=max(i.height for _,i in ims)
  # two rows of four columns: Season on top, 24h below
  B=Image.new('RGB',(4*cw+5*G,2*(H+140)+G),'#1b1820');d=ImageDraw.Draw(B)
  for j,(t,i) in enumerate(ims):
    col,row=j//2,j%2;x=G+col*(cw+G);y=G+row*(H+140)
    lab=t.split('  ·  ');d.text((x,y),lab[0].split(':')[0],fill='#fdbc2a',font=F);d.text((x,y+38),lab[1],fill='#f8f0d9',font=F);B.paste(i,(x,y+90))
else:
  ims=[[(f'{t}  ·  {w}',Image.open(f'{D}/sb-{W}-{k}-{v}.png').convert('RGB')) for v,w in WN] for k,t in T]
  cw=max(i.width for r in ims for _,i in r)
  Bh=sum(max(i.height for _,i in r)+110 for r in ims)+G
  B=Image.new('RGB',(2*cw+3*G,Bh),'#1b1820');d=ImageDraw.Draw(B);y=G
  for r in ims:
    x=G
    for t,i in r:d.text((x,y),t,fill='#fdbc2a',font=F);B.paste(i,(x,y+60));x+=cw+G
    y+=max(i.height for _,i in r)+110
B.thumbnail((6000,9000));B.save(OUT,optimize=True);print(OUT,B.size)
