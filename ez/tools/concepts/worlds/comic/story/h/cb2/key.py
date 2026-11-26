# /usr/bin/python3 key.py in.jpg out.webp width : key out the flat magenta ground, despill, crop, resize
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('RGB');w,h=im.size;px=im.load()
out=Image.new('RGBA',(w,h));po=out.load()
for y in range(h):
  for x in range(w):
    r,g,b=px[x,y]
    m=min(r,b)-g   # magenta-ness: high R and B, low G
    a=1.0 if m<40 else (0.0 if m>150 else 1-(m-40)/110)
    if a<1: b=min(b,max(g,int(g*1.05))); r=min(r,max(g+90,r- int((1-a)*80)))
    b=min(b,g+10) if a>0 else b
    po[x,y]=(r,g,b,int(a*255))
bb=out.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox();out=out.crop(bb)
W=int(sys.argv[3]);out=out.resize((W,round(out.size[1]*W/out.size[0])),Image.LANCZOS)
out.save(sys.argv[2],'WEBP',quality=92,method=6);print(out.size)
