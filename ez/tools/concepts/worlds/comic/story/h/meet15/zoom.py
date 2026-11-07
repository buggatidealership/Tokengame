# /usr/bin/python3 zoom.py img out x0 y0 x1 y1 : crop with a 1% grid labelled every 5%
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]);W,H=im.size;x0,y0,x1,y1=[float(v) for v in sys.argv[3:7]]
c=im.crop((int(x0*W),int(y0*H),int(x1*W),int(y1*H)));d=ImageDraw.Draw(c);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',14)
for i in range(int(x0*100),int(x1*100)+1):
  x=(i/100-x0)*W;col=(255,0,255) if i%5==0 else (0,200,200);d.line((x,0,x,c.size[1]),fill=col,width=1)
  if i%5==0:d.text((x+2,2),str(i),fill=col,font=F)
for j in range(int(y0*100),int(y1*100)+1):
  y=(j/100-y0)*H;col=(255,0,255) if j%5==0 else (0,200,200);d.line((0,y,c.size[0],y),fill=col,width=1)
  if j%5==0:d.text((2,y+2),str(j),fill=col,font=F)
c.thumbnail((1100,1100));c.save(sys.argv[2],quality=85)
