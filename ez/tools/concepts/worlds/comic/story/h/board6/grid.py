# /usr/bin/python3 grid.py img/x.jpg out.jpg x0 y0 x1 y1 [step] : a crop with a labelled grid in painting px, for measuring by eye
import sys
from PIL import Image,ImageDraw
f,o=sys.argv[1],sys.argv[2];x0,y0,x1,y1=map(int,sys.argv[3:7]);st=int(sys.argv[7]) if len(sys.argv)>7 else 100
im=Image.open(f).convert('RGB').crop((x0,y0,x1,y1));k=1400/max(im.size);im=im.resize((int(im.width*k),int(im.height*k)));d=ImageDraw.Draw(im)
for x in range((x0//st+1)*st,x1,st):X=(x-x0)*k;d.line([(X,0),(X,im.height)],fill=(0,255,255) if x%(st*5) else (255,0,255),width=1);d.text((X+2,2),str(x),fill=(255,255,0))
for y in range((y0//st+1)*st,y1,st):Y=(y-y0)*k;d.line([(0,Y),(im.width,Y)],fill=(0,255,255) if y%(st*5) else (255,0,255),width=1);d.text((2,Y+2),str(y),fill=(255,255,0))
im.save(o,quality=90)
