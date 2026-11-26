# /usr/bin/python3 auto.py <name> : measures a swapped master by run profiles: the gold plate, the window's dark glass, the label's black panel, the body
import sys,numpy as np
from PIL import Image
a=np.asarray(Image.open(f'img/{sys.argv[1]}.jpg').convert('RGB')).astype(int);r,g,b=a[...,0],a[...,1],a[...,2]
gold=(r>140)&(g>95)&(b<100)&(r-b>70);cer=(r>150)&(g>145)&(b>130)&(abs(r-b)<45);dark=(r+g+b<70)
def box(m,x0,x1,y0,y1,f=.6):
  s=m[y0:y1,x0:x1];c=s.mean(0);rr=s.mean(1);xs=np.where(c>f*c.max())[0];ys=np.where(rr>f*rr.max())[0]
  return [x0+int(xs.min()),y0+int(ys.min()),x0+int(xs.max())+1,y0+int(ys.max())+1]
cs=np.where(cer.sum(0)>60)[0];rs=np.where(cer.sum(1)>200)[0]
print('body',cs.min(),rs.min(),cs.max()+1,rs.max()+1)
print('plate',box(gold,40,300,150,360))
print('label',box(dark,290,880,170,500))
print('glass',box(dark,840,1250,170,500))
