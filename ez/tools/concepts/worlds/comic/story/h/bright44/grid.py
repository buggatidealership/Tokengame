# /usr/bin/python3 grid.py img x0 y0 x1 y1 out [step] : a crop with a pixel grid every step px (labels in picture pixels), for measuring by eye
import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');x0,y0,x1,y1=map(int,sys.argv[2:6]);st=int(sys.argv[7]) if len(sys.argv)>7 else 20
c=im.crop((x0,y0,x1,y1));k=max(1,int(1400/c.width));c=c.resize((c.width*k,c.height*k),Image.NEAREST);d=ImageDraw.Draw(c)
for x in range((x0//st+1)*st,x1,st):X=(x-x0)*k;d.line([(X,0),(X,c.height)],fill=(255,0,255) if x%100==0 else (0,255,255),width=1);d.text((X+2,2),str(x),fill=(255,0,255))
for y in range((y0//st+1)*st,y1,st):Y=(y-y0)*k;d.line([(0,Y),(c.width,Y)],fill=(255,0,255) if y%100==0 else (0,255,255),width=1);d.text((2,Y+2),str(y),fill=(255,0,255))
c.save(sys.argv[6]);print(c.size)
