# /usr/bin/python3 grid.py in out [maxside] : 5% grid, labelled every 10%
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]).convert('RGB');M=int(sys.argv[3]) if len(sys.argv)>3 else 1000
im.thumbnail((M,M));W,H=im.size;d=ImageDraw.Draw(im);F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',13)
for i in range(1,20):
  c=(255,0,255) if i%2==0 else (0,255,255);x=W*i/20;y=H*i/20
  d.line((x,0,x,H),fill=c,width=1);d.line((0,y,W,y),fill=c,width=1)
  if i%2==0:d.text((x+2,2),str(i*5),fill=c,font=F);d.text((2,y+2),str(i*5),fill=c,font=F)
im.save(sys.argv[2],quality=80);print(im.size)
