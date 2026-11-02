# /usr/bin/python3 board.py <shots dir> <W> <out.png> [scale] [per row] : one column per shot, a title over each
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3];SC=float(sys.argv[4]) if len(sys.argv)>4 else 1;PER=int(sys.argv[5]) if len(sys.argv)>5 else 99
COLS=[('a','A · The big board: every column, each row its own chip'),('a.d7','A · ranked by 7 days (tap a column)'),
 ('b','B · Tale of the tape: four corners, the best ringed'),('b.d1.fri','B · window 24h (clock set to Fri Oct 30, 6:30 pm ET)'),
 ('c','C · The race board: chips on the traces, timing tower, pit wall'),('c.hit','C · race on hit rate (the coin flip is the start line)')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(26*max(SC,.6)))
ims=[]
for k,t in COLS:
  try:im=Image.open(f'{D}/{k}-{W}.png').convert('RGB')
  except Exception:continue
  if SC!=1:im=im.resize((int(im.width*SC),int(im.height*SC)),Image.LANCZOS)
  ims.append((t,im))
G=30;TH=int(48*max(SC,.6));rows=[ims[i:i+PER] for i in range(0,len(ims),PER)]
cw=max(i.width for _,i in ims);BW=G+len(rows[0])*(cw+G);BH=G+sum(TH+max(i.height for _,i in r)+G for r in rows)
B=Image.new('RGB',(BW,BH),(14,13,16));d=ImageDraw.Draw(B);y=G
for r in rows:
  x=G
  for t,im in r:d.text((x,y),t,fill=(255,210,31),font=F);B.paste(im,(x,y+TH));x+=cw+G
  y+=TH+max(i.height for _,i in r)+G
B.save(OUT,optimize=True);print(OUT,B.size)
