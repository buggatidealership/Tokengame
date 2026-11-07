# /usr/bin/python3 sub.py img out x0 y0 x1 y1 [pitch n] : the grey solder mask of the memory modules only (RGBA webp), for the live unit-colour tint filter
import sys
import numpy as np
from PIL import Image,ImageFilter
im=Image.open(sys.argv[1]).convert('RGB');a=np.asarray(im).astype(float);H,W,_=a.shape
x0,y0,x1,y1=[float(v) for v in sys.argv[3:7]];pitch=float(sys.argv[7]);n=int(sys.argv[8])
mx=a.max(2);mn=a.min(2);S=(mx-mn)/np.maximum(mx,1);V=mx/255
m=(S<.2)&(V>.28)
reg=np.zeros((H,W),bool)
for i in range(n):reg[int((y0+i*pitch)*H):int((y1+i*pitch)*H),int(x0*W):int(x1*W)]=True
al=Image.fromarray(((m&reg)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(.8))
out=im.copy();out.putalpha(al);out.save(sys.argv[2],quality=88)
print(sys.argv[2],(m&reg).sum())
