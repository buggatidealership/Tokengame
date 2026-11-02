# /usr/bin/python3 comp.py img smax vmin minfrac [smin] [vmax]: bboxes (fractions) of connected regions by saturation/value
import sys,numpy as np
from PIL import Image,ImageFilter
im=Image.open(sys.argv[1]).convert('RGB');im.thumbnail((500,500));a=np.asarray(im).astype(float);H,W,_=a.shape
mx=a.max(2);mn=a.min(2);S=(mx-mn)/np.maximum(mx,1);V=mx/255
smax,vmin,mf=float(sys.argv[2]),float(sys.argv[3]),float(sys.argv[4]);smin=float(sys.argv[5]) if len(sys.argv)>5 else -1;vmax=float(sys.argv[6]) if len(sys.argv)>6 else 2
m=(S<smax)&(S>smin)&(V>vmin)&(V<vmax)
seen=np.zeros_like(m);out=[]
for y in range(H):
  for x in range(W):
    if m[y,x] and not seen[y,x]:
      st=[(y,x)];seen[y,x]=1;xs=[];ys=[]
      while st:
        cy,cx=st.pop();xs.append(cx);ys.append(cy)
        for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
          ny,nx=cy+dy,cx+dx
          if 0<=ny<H and 0<=nx<W and m[ny,nx] and not seen[ny,nx]:seen[ny,nx]=1;st.append((ny,nx))
      if len(xs)>mf*H*W:out.append((min(xs)/W,(max(xs)+1)/W,min(ys)/H,(max(ys)+1)/H,len(xs)/(H*W)))
for o in sorted(out,key=lambda o:(round(o[2],1),o[0])):print("x%.4f-%.4f y%.4f-%.4f a%.3f"%o)
