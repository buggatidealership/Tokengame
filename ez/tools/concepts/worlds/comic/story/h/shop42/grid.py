# /usr/bin/python3 grid.py <img> <x0,y0,x1,y1> <out> [step] : crop with a labelled pixel grid (original pixels), for measuring the painted parts
import sys
from PIL import Image,ImageDraw,ImageFont
im=Image.open(sys.argv[1]).convert('RGB');x0,y0,x1,y1=map(int,sys.argv[2].split(','));st=int(sys.argv[4]) if len(sys.argv)>4 else 100
c=im.crop((x0,y0,x1,y1));k=min(1.0,1400/max(c.size));c=c.resize((int(c.width*k),int(c.height*k)));d=ImageDraw.Draw(c);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
for x in range((x0//st+1)*st,x1,st):X=(x-x0)*k;d.line([(X,0),(X,c.height)],fill=(255,0,255),width=1);d.text((X+2,2),str(x),font=f,fill=(255,255,0))
for y in range((y0//st+1)*st,y1,st):Y=(y-y0)*k;d.line([(0,Y),(c.width,Y)],fill=(0,255,255),width=1);d.text((2,Y+2),str(y),font=f,fill=(255,255,0))
c.save(sys.argv[3],quality=85)
