# /usr/bin/python3 shift.py : sw-c -> sw-c2. The gold plate block moved up 9px so the plate's top edge sits level with the window frame's
# and the label's (y 188 on the 1280x720 master); the seams are in plain ceramic and feathered over 10px.
import numpy as np
from PIL import Image
a=np.asarray(Image.open('img/sw-c.jpg').convert('RGB')).astype(float);o=a.copy()
x0,x1,y0,y1,d=72,300,170,352,9
src=a[y0+d:y1+d,x0:x1];h,w=src.shape[:2]
m=np.ones((h,w));f=10
for i in range(f):
  k=(i+.5)/f;m[i,:]*=k;m[h-1-i,:]*=k;m[:,i]*=k;m[:,w-1-i]*=k
o[y0:y1,x0:x1]=src*m[...,None]+a[y0:y1,x0:x1]*(1-m[...,None])
Image.fromarray(o.clip(0,255).astype('uint8')).save('img/sw-c2.jpg',quality=95)
