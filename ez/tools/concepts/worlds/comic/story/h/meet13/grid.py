# /usr/bin/python3 grid.py img out [x0 y0 x1 y1 fractions to crop] : magenta grid every 1% (bold + label every 5%)
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]).convert('RGB');W,H=im.size
c=[float(v) for v in sys.argv[3:7]] if len(sys.argv)>6 else [0,0,1,1]
im=im.crop((int(c[0]*W),int(c[1]*H),int(c[2]*W),int(c[3]*H)));OW=int(__import__("os").environ.get("OW","1500"));sw=OW/im.size[0];im=im.resize((OW,int(im.size[1]*sw)))
d=ImageDraw.Draw(im);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',13)
for i in range(101):
  f=i/100
  if c[0]<=f<=c[2]:
    x=(f-c[0])*W*sw;d.line([(x,0),(x,im.size[1])],fill=(255,0,255) if i%5==0 else (255,120,255),width=2 if i%5==0 else 1)
    if i%5==0:[d.text((x+2,yy),str(i),fill=(0,255,255),font=F) for yy in range(0,im.size[1],300)]
  if c[1]<=f<=c[3]:
    y=(f-c[1])*H*sw;d.line([(0,y),(im.size[0],y)],fill=(255,0,255) if i%5==0 else (255,120,255),width=2 if i%5==0 else 1)
    if i%5==0:[d.text((xx,y+2),str(i),fill=(0,255,255),font=F) for xx in range(0,im.size[0],300)]
im.save(sys.argv[2])
