# /usr/bin/python3 board.py <shots dir> <W> <out.png> [scale]: one column per take, a title over each; kept under ~6 MB
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3];SC=float(sys.argv[4]) if len(sys.argv)>4 else 1
COLS=[('now','Today (live): T1, the scope + switch'),('a','A · Etched: the trace on the board'),('b','B · The recorder: pens on the paper'),('c','C · The peg board: cord on baize'),('d','D · The chain: one block per round')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
ims=[]
for k,t in COLS:
  f=f'{D}/{k}-{W}.png'
  if os.path.exists(f):
    im=Image.open(f).convert('RGB')
    if SC!=1: im=im.resize((round(im.size[0]*SC),round(im.size[1]*SC)),Image.LANCZOS)
    ims.append((im,t))
g=24;th=60;cw=max(i.size[0] for i,_ in ims);H=max(i.size[1] for i,_ in ims)+th
B=Image.new('RGB',(g+len(ims)*(cw+g),H+2*g),(10,10,12));d=ImageDraw.Draw(B);x=g
for im,t in ims:
  d.text((x+6,g+12),t,fill=(255,210,31),font=F(26 if cw<900 else 34));B.paste(im,(x,g+th));x+=cw+g
B.save(OUT,optimize=True);print(OUT,B.size,os.path.getsize(OUT)//1024,'KB')
