#!/usr/bin/python3
# detect.py: measures the blank trade-dress surfaces the painter left in each dr-r<n> cover (treatment B), so the page can set
# its live words inside them. Writes dress.json: per round, each surface's box in % of the cover (x, y, w, h).
import json,sys,os
from collections import deque
import numpy as np
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))
def comps(mask,region):
  y0,y1,x0,x1=region;H,W=mask.shape;seen=np.zeros_like(mask,bool);best=None
  for y in range(y0,y1):
    for x in range(x0,x1):
      if mask[y,x] and not seen[y,x]:
        q=deque([(y,x)]);seen[y,x]=1;pts=[]
        while q:
          cy,cx=q.popleft();pts.append((cy,cx))
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=cy+dy,cx+dx
            if 0<=ny<H and 0<=nx<W and mask[ny,nx] and not seen[ny,nx]:seen[ny,nx]=1;q.append((ny,nx))
        if best is None or len(pts)>len(best):best=pts
  a=np.array(best);ys,xs=a[:,0],a[:,1]
  return [round(100*xs.min()/W,1),round(100*ys.min()/H,1),round(100*(xs.max()-xs.min()+1)/W,1),round(100*(ys.max()-ys.min()+1)/H,1),len(best)]
out={}
for n,f in [(80,'dr-r80'),(79,'dr-r79'),(78,'dr-r78'),(77,'dr2-r77')]:
  im=Image.open(f'{D}/img/{f}.jpg').convert('RGB').resize((200,300));a=np.asarray(im).astype(int);r,g,b=a[...,0],a[...,1],a[...,2]
  yel=(r>215)&(g>175)&(b<90);wht=(r>222)&(g>222)&(b>210);red=(r>190)&(g<70)&(b<70)
  out[n]={'img':f,'banner':comps(yel,(0,60,0,200)),'box':comps(wht,(0,70,0,90)),'burst':comps(wht,(130,290,90,200)),'ribbon':comps(red,(210,300,0,200))}
  print(n,out[n])
json.dump(out,open(f'{D}/dress.json','w'),indent=1)
