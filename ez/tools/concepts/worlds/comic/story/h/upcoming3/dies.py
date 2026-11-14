# /usr/bin/python3 dies.py names... : the blank dark dies of each painting (connected dark regions not touching the border), in full-size px
import sys,numpy as np
from PIL import Image
from collections import deque
for f in sys.argv[1:]:
  I=Image.open('img/%s.jpg'%f).convert('L');W0,H0=I.size;k=4;im=np.asarray(I.resize((W0//k,H0//k))).astype(int);H,W=im.shape
  dk=im<36;seen=np.zeros_like(dk);out=[]
  for y in range(H):
    for x in range(W):
      if dk[y,x] and not seen[y,x]:
        q=deque([(y,x)]);seen[y,x]=1;pts=[];edge=False
        while q:
          cy,cx=q.popleft();pts.append((cy,cx))
          if cy in(0,H-1) or cx in(0,W-1):edge=True
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=cy+dy,cx+dx
            if 0<=ny<H and 0<=nx<W and dk[ny,nx] and not seen[ny,nx]:seen[ny,nx]=1;q.append((ny,nx))
        if edge or len(pts)<W*H*.003:continue
        ys=[p[0] for p in pts];xs=[p[1] for p in pts]
        out.append((min(xs)*k,min(ys)*k,(max(xs)+1)*k,(max(ys)+1)*k,round(len(pts)/((max(xs)-min(xs)+1)*(max(ys)-min(ys)+1)),2)))
  nb=np.asarray(I).astype(int)>40;ys,xs=np.where(nb)
  print(f,(W0,H0),'board',(int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())))
  for o in sorted(out):print('  ',o)
