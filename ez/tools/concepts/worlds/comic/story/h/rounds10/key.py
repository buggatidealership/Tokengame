# /usr/bin/python3 key.py : keys the magenta out of img/sheet.jpg and img/dress.jpg -> img/spr-clip.webp, spr-pocket.webp, spr-plate.webp, dress.webp (alpha)
# and prints the measured rects of the paintings (fractions) used by _r10.css.
from PIL import Image,ImageFilter
import numpy as np
def key(im):
  a=np.asarray(im.convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  # magenta-ness: r and b high, g low
  m=np.clip(((np.minimum(r,b)-g)-40)/60,0,1)            # 1 = background
  al=(1-m)
  # despill: pull magenta out of the edge pixels
  sp=np.clip(np.minimum(r,b)-g,0,None)*(1-al)*0+0
  out=a.copy()
  edge=(al>0)&(al<1)
  lim=np.maximum(g,np.minimum(r,b)*.0)
  out[...,0]=np.where(edge,np.minimum(r,g+ (r-g)*al),r);out[...,2]=np.where(edge,np.minimum(b,g+(b-g)*al*.6),b)
  A=(Image.fromarray((al*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7)))
  o=Image.fromarray(out.clip(0,255).astype('uint8'));o.putalpha(A);return o
sh=Image.open('img/sheet.jpg');W,H=sh.size;k=key(sh)
al=np.asarray(k.split()[3])>128
def bbox(x0,y0,x1,y1):
  sub=al[y0:y1,x0:x1];ys,xs=np.where(sub);return (x0+xs.min(),y0+ys.min(),x0+xs.max()+1,y0+ys.max()+1)
cells={'clip':(0,0,W//3,int(H*.33)),'pocket':(0,int(H*.33),W//3,int(H*.78)),'plate':(W//3,int(H*.78),2*W//3,H)}
for n,c in cells.items():
  b=bbox(*c);pad=6;b=(b[0]-pad,b[1]-pad,b[2]+pad,b[3]+pad);s=k.crop(b);print(n,b,s.size);s.save(f'img/spr-{n}.webp',quality=92)
d=Image.open('img/dress.jpg');dk=key(d);dk.save('img/dress.webp',quality=92)
a=np.asarray(dk.split()[3])<128;ys,xs=np.where(a);print('dress window',xs.min()/d.width,ys.min()/d.height,xs.max()/d.width,ys.max()/d.height,d.size)
