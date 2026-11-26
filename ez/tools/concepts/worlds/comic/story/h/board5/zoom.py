import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');x0,y0,x1,y1=map(int,sys.argv[3].split(','));st=int(sys.argv[4]);s=float(sys.argv[5])
c=im.crop((x0,y0,x1,y1));c=c.resize((int(c.width*s),int(c.height*s)));d=ImageDraw.Draw(c)
for v in range((x0//st)*st,x1,st):
  X=(v-x0)*s
  if X>=0:d.line([(X,0),(X,c.height)],fill=(0,255,255));d.text((X+2,2),str(v),fill=(255,255,0))
for v in range((y0//st)*st,y1,st):
  Y=(v-y0)*s
  if Y>=0:d.line([(0,Y),(c.width,Y)],fill=(0,255,255));d.text((2,Y+2),str(v),fill=(255,255,0))
c.save(sys.argv[2],quality=90)
