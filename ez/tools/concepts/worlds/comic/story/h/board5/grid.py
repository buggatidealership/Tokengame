import sys
from PIL import Image,ImageDraw
im=Image.open(sys.argv[1]).convert('RGB');W,H=im.size;s=float(sys.argv[3]) if len(sys.argv)>3 else 1024/W
im=im.resize((int(W*s),int(H*s)));d=ImageDraw.Draw(im);st=int(sys.argv[4]) if len(sys.argv)>4 else 128
for v in range(0,max(W,H),st):
  x=v*s;d.line([(x,0),(x,im.size[1])],fill=(0,255,255),width=1);d.line([(0,x),(im.size[0],x)],fill=(0,255,255),width=1);d.text((x+2,2),str(v),fill=(255,255,0));d.text((2,x+2),str(v),fill=(255,255,0))
im.save(sys.argv[2],quality=90)
