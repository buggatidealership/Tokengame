# grid.py <img> <out> : the painting with a labelled 5% grid, to read off the blank surfaces' positions
import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');W,H=im.size;d=ImageDraw.Draw(im)
for i in range(1,20):
  x=W*i/20;y=H*i/20;c=(0,255,255) if i%2==0 else (255,0,255)
  d.line([(x,0),(x,H)],fill=c,width=1);d.line([(0,y),(W,y)],fill=c,width=1)
  if i%2==0:d.text((x+2,2),str(i*5),fill=c);d.text((2,y+2),str(i*5),fill=c)
im.save(sys.argv[2])
