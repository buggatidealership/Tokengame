# /usr/bin/python3 grid.py in.jpg out.png : 10% grid with labels, for measuring blank surfaces by eye
import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');w,h=im.size;s=700/max(w,h);im=im.resize((int(w*s),int(h*s)));w,h=im.size;d=ImageDraw.Draw(im)
for i in range(1,20):
  x=w*i/20;y=h*i/20;c=(255,0,255) if i%2==0 else (0,255,255)
  d.line([(x,0),(x,h)],fill=c,width=1 if i%2 else 2);d.line([(0,y),(w,y)],fill=c,width=1 if i%2 else 2)
  if i%2==0:d.text((x+2,2),str(i*5),fill=(255,0,255));d.text((2,y+2),str(i*5),fill=(255,0,255))
im.save(sys.argv[2])
