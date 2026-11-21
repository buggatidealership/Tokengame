# python3 grid.py img x0 y0 x1 y1 scale out : crop with a labelled 10px grid (every 50 bold) for reading master coordinates
import sys
from PIL import Image,ImageDraw
f,x0,y0,x1,y1,s,out=sys.argv[1],*map(int,sys.argv[2:7]),sys.argv[7]
im=Image.open(f).convert('RGB').crop((x0,y0,x1,y1));im=im.resize((im.width*s,im.height*s),Image.NEAREST);d=ImageDraw.Draw(im)
for x in range((x0//10+1)*10,x1,10):
  X=(x-x0)*s;d.line((X,0,X,im.height),fill=(0,255,255) if x%50==0 else (0,120,120),width=1)
  if x%50==0:d.text((X+2,2),str(x),fill=(255,255,0))
for y in range((y0//10+1)*10,y1,10):
  Y=(y-y0)*s;d.line((0,Y,im.width,Y),fill=(0,255,255) if y%50==0 else (0,120,120),width=1)
  if y%50==0:d.text((2,Y+2),str(y),fill=(255,255,0))
im.save(out)
