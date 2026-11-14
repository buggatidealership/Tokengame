# /usr/bin/python3 board.py <shots dir> <W> <out.png> [cols per row]: one column per shot, a title over each
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3];PER=int(sys.argv[4]) if len(sys.argv)>4 else 99
COLS=[('now','Today (live): T1 the scope'),('a','A · tally, then scope: hit rate'),('a-pnl','A · P&L, Season'),('a-pnl-d1','A · P&L, 24 hours (empty today)'),
 ('b-cal','B · one scope: beat 1, calibrate'),('b','B · beat 2, past the middle'),('b-pnl','B · P&L key'),
 ('c','C · coin, then scope: hit rate'),('c-pnl','C · P&L, Season')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
ims=[(Image.open(f'{D}/{k}-{W}.png').convert('RGB'),t) for k,t in COLS if os.path.exists(f'{D}/{k}-{W}.png')]
rows=[ims[i:i+PER] for i in range(0,len(ims),PER)];g=24;th=70
cw=max(i.size[0] for i,_ in ims)
rh=[max(i.size[1] for i,_ in r)+th for r in rows]
B=Image.new('RGB',(g+len(rows[0])*(cw+g),g+sum(h+g for h in rh)),(10,10,12));d=ImageDraw.Draw(B);y=g
for r,h in zip(rows,rh):
  x=g
  for im,t in r:
    d.text((x+6,y+14),t,fill=(255,210,31),font=F(30));B.paste(im,(x,y+th));x+=cw+g
  y+=h+g
B.save(OUT,optimize=True);print(OUT,B.size)
