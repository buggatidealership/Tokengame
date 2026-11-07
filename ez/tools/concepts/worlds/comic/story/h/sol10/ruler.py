# /usr/bin/python3 ruler.py img y0 y1 out : crop band (fractions) and draw x ticks every 1% (labels every 5%)
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]).convert('RGB');W,H=im.size;y0,y1=float(sys.argv[2]),float(sys.argv[3])
c=im.crop((0,int(y0*H),W,int(y1*H)));c=c.resize((2000,int(c.size[1]*2000/W)));d=ImageDraw.Draw(c);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18)
for i in range(101):
  x=i*20;d.line([(x,0),(x,12 if i%5 else 30)],fill=(255,0,255),width=2)
  if i%5==0:d.text((x+2,30),str(i),fill=(255,0,255),font=F)
c.save(sys.argv[4])
