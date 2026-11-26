# /usr/bin/python3 key.py in.jpg out.webp : chroma-green key (only the green connected to the image edge), despill, trim
import sys,numpy as np
from PIL import Image,ImageDraw,ImageFilter
a=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
R,G,B=a[...,0],a[...,1],a[...,2];mx=np.maximum(R,B);d=G-mx
m=Image.fromarray(((d>120)*255).astype('uint8'),'L').copy();h,w=d.shape
for p in [(0,0),(w-1,0),(0,h-1),(w-1,h-1)]:
  if m.getpixel(p)==255:ImageDraw.floodfill(m,p,128)
m=m.point(lambda v:255 if v==128 else 0).filter(ImageFilter.MaxFilter(5))
conn=(np.asarray(m)>0)|(d>200)
al=np.where(conn,np.clip(1-(d-25)/70,0,1),1.0)
G2=np.where(conn&(G>mx),mx+(G-mx)*0.15,G)
o=np.dstack([R,G2,B,al*255]).clip(0,255).astype('uint8')
im=Image.fromarray(o,'RGBA');im=im.crop(im.getchannel("A").point(lambda v:255 if v>8 else 0).getbbox());im.thumbnail((900,900));im.save(sys.argv[2]);print(sys.argv[2],im.size)
