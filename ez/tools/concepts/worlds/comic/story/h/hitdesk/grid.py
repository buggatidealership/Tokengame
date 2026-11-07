# /usr/bin/python3 grid.py img/x.jpg out.png [step]  : painting with a labelled grid, to measure corners by eye
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]).convert('RGB');st=int(sys.argv[3]) if len(sys.argv)>3 else 50;d=ImageDraw.Draw(im);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',11)
for x in range(0,im.width,st):d.line([(x,0),(x,im.height)],fill=(255,0,255) if x%(st*2)==0 else (0,255,255),width=1);d.text((x+2,2),str(x),fill=(255,255,0),font=F)
for y in range(0,im.height,st):d.line([(0,y),(im.width,y)],fill=(255,0,255) if y%(st*2)==0 else (0,255,255),width=1);d.text((2,y+2),str(y),fill=(255,255,0),font=F)
im.save(sys.argv[2]);print(im.size)
