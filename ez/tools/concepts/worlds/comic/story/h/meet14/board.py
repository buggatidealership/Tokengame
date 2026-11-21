# /usr/bin/python3 board.py <shots dir> <W> <out.png> [scale] [per row] : one column per take, a title over each
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3];SC=float(sys.argv[4]) if len(sys.argv)>4 else 1;PER=int(sys.argv[5]) if len(sys.argv)>5 else 99
COLS=[('now','Today (live)'),('v1','V1 · Today\'s chips: unit colour, flag patch, LAST 5'),('v2','V2 · The motherboard: a leaderboard of memory modules'),('v3','V3 · The ballpark board, refined'),('v4','V4 · Fight-night billing')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
ims=[]
for k,t in COLS:
  f=f'{D}/{k}-{W}.png'
  if os.path.exists(f):
    im=Image.open(f).convert('RGB')
    if SC!=1: im=im.resize((round(im.size[0]*SC),round(im.size[1]*SC)),Image.LANCZOS)
    ims.append((im,t))
rows=[ims[i:i+PER] for i in range(0,len(ims),PER)];g=24;th=56;cw=max(i.size[0] for i,_ in ims)
rh=[max(i.size[1] for i,_ in r)+th for r in rows]
B=Image.new('RGB',(g+len(rows[0])*(cw+g),g+sum(h+g for h in rh)),(10,10,12));d=ImageDraw.Draw(B);y=g
fs=14 if cw<450 else 17 if cw<700 else 30
for r,h in zip(rows,rh):
  x=g
  for im,t in r:
    d.text((x+6,y+12),t,fill=(255,210,31),font=F(fs));
    if W=='390':d.line((x,y+th+int(664*im.size[0]/390),x+im.size[0],y+th+int(664*im.size[0]/390)),fill=(255,0,255),width=2)
    B.paste(im,(x,y+th));x+=cw+g
  y+=h+g
B.save(OUT,optimize=True);print(OUT,B.size,os.path.getsize(OUT)//1024,'KB')
