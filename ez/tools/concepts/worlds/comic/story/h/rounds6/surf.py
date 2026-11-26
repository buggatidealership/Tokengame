#!/usr/bin/python3
# surf.py: measures the blank surface each plate carries for the tally (the slate's black, the brass plate's gold), in % of the plate.
# Writes surf.json {plate:[x,y,w,h]} (the inner face, inset from the frame/rim so the words never touch it).
import json,os
from collections import deque
import numpy as np
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))
def big(mask,reg):
  H,W=mask.shape;y0,y1,x0,x1=[int(v) for v in reg];seen=np.zeros_like(mask,bool);best=[]
  for y in range(y0,y1,2):
    for x in range(x0,x1,2):
      if mask[y,x] and not seen[y,x]:
        q=deque([(y,x)]);seen[y,x]=1;pts=[]
        while q:
          cy,cx=q.popleft();pts.append((cy,cx))
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=cy+dy,cx+dx
            if 0<=ny<H and 0<=nx<W and mask[ny,nx] and not seen[ny,nx]:seen[ny,nx]=1;q.append((ny,nx))
        if len(pts)>len(best):best=pts
  a=np.array(best);ys,xs=a[:,0],a[:,1]
  # robust box: 3rd-97th percentile, so a stray thin arm of the region does not stretch it
  x0,x1=np.percentile(xs,[3,97]);y0,y1=np.percentile(ys,[3,97])
  return [float(round(100*x0/W,2)),float(round(100*y0/H,2)),float(round(100*(x1-x0)/W,2)),float(round(100*(y1-y0)/H,2))]
out={}
REG={'p-slate-9x16':(.6,.95,.4,1),'p-slate-16x9':(.45,.95,.12,.48),'p-brass2-9x16':(.6,.95,.25,.7),'p-brass2-16x9':(.55,1,.35,.7)}
for f in REG:
  im=Image.open(f'{D}/img/{f}.jpg').convert('RGB');im=im.resize((im.width//4,im.height//4));a=np.asarray(im).astype(int);r,g,b=a[...,0],a[...,1],a[...,2];H,W=r.shape
  if 'slate' in f: m=(r<70)&(g<70)&(b<70)
  else: m=(r>150)&(g>110)&(b<110)&(r-b>90)&~((r>225)&(g>195)&(b<70))  # brass, not the flat yellow wall
  y0,y1,x0,x1=REG[f];m[:int(H*y0)]=0;m[int(H*y1):]=0;m[:,:int(W*x0)]=0;m[:,int(W*x1):]=0;out[f]=big(m,(H*y0,H*y1,W*x0,W*x1));print(f,out[f])
json.dump(out,open(f'{D}/surf.json','w'),indent=1)
