# /usr/bin/python3 key.py <names...> : keys the magenta out of img/<name>.jpg, crops to the opaque box, writes img/<name>.webp (alpha) and prints the box and, for 'slab', the window (keyed hole) and the label (cream) rects as fractions.
import sys
from PIL import Image,ImageFilter
import numpy as np
def key(im):
  a=np.asarray(im.convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  m=np.clip(((np.minimum(r,b)-g)-40)/60,0,1);al=1-m
  out=a.copy();mc=np.clip(np.minimum(r,b)-g,0,None)*.92;out[...,0]-=mc;out[...,2]-=mc;r,g,b=out[...,0],out[...,1],out[...,2];edge=(al>0)&(al<1)
  out[...,0]=np.where(edge,np.minimum(r,g+(r-g)*al),r);out[...,2]=np.where(edge,np.minimum(b,g+(b-g)*al*.6),b)
  A=Image.fromarray((al*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7))
  o=Image.fromarray(out.clip(0,255).astype('uint8'));o.putalpha(A);return o,al
for nm in sys.argv[1:]:
  im=Image.open(f'img/{nm}.jpg');o,al=key(im);op=al>.5
  ys,xs=np.where(op);x0,y0,x1,y1=xs.min(),ys.min(),xs.max()+1,ys.max()+1
  c=o.crop((x0,y0,x1,y1));W,H=c.size
  if nm=='slab':
    a2=np.asarray(c.split()[3])<128;h,w=a2.shape
    # the window: the transparent hole inside the slab (not touching the border)
    cx=w//2;col=a2[:,cx];rows=np.where(col[int(h*.3):int(h*.95)])[0]+int(h*.3);y0w,y1w=rows.min(),rows.max()+1
    cy=(y0w+y1w)//2;rr=np.where(a2[cy,int(w*.05):int(w*.95)])[0]+int(w*.05);best=(0,rr.min(),y0w,rr.max()+1,y1w)
    print('window',[round(v,4) for v in (best[1]/w,best[2]/h,best[3]/w,best[4]/h)])
    rgb=np.asarray(c.convert('RGB')).astype(int);cr=(rgb[...,0]>200)&(rgb[...,1]>185)&(rgb[...,2]>150)&(np.abs(rgb[...,0]-rgb[...,2])<70)
    yy,xx=np.where(cr[:int(h*.4)]);print('cream',[round(v,4) for v in (np.percentile(xx,1)/w,np.percentile(yy,1)/h,np.percentile(xx,99)/w,np.percentile(yy,99)/h)])
    c.thumbnail((600,1200),Image.LANCZOS)
  elif nm in('ledge','box'):c=c.resize((2048,round(2048*H/W)),Image.LANCZOS)
  c.save(f'img/{nm}.webp',quality=88);print(nm,(x0,y0,x1,y1),im.size,'->',c.size)
