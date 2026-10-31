# /usr/bin/python3 field.py img... : the blank face of each cut-out: grow from the light pixel nearest a seed (default the centre); prints centre and size in % of the image
import sys,numpy as np
from PIL import Image
from collections import deque
for arg in sys.argv[1:]:
  f,_,seed=arg.partition('@');im=Image.open(f).convert('RGBA');W0,H0=im.size;im.thumbnail((200,200));A=np.asarray(im).astype(float);a=A[...,3];rgb=A[...,:3]
  mx=rgb.max(-1);mn=rgb.min(-1);sat=(mx-mn)/(mx+1)
  m=(mx<90)&(a>200) if 'record' in f else (mx>195)&(sat<.3)&(a>200)
  H,W=m.shape;sx,sy=[float(v)/100 for v in seed.split(',')] if seed else (.5,.5)
  ys,xs=np.where(m);k=np.argmin((xs-sx*W)**2+(ys-sy*H)**2);q=deque([(ys[k],xs[k])]);seen=np.zeros_like(m);seen[ys[k],xs[k]]=1;P=[]
  while q:
    y,x=q.popleft();P.append((y,x))
    for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
      Y,X=y+dy,x+dx
      if 0<=Y<H and 0<=X<W and m[Y,X] and not seen[Y,X]:seen[Y,X]=1;q.append((Y,X))
  P=np.array(P);print(f.split('/')[-1],W0,H0,'cx %.1f cy %.1f w %.1f h %.1f'%(P[:,1].mean()/W*100,P[:,0].mean()/H*100,(np.ptp(P[:,1])+1)/W*100,(np.ptp(P[:,0])+1)/H*100))
