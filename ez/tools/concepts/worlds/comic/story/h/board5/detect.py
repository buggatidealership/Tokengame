import json,sys
from PIL import Image
import numpy as np
G=json.load(open('guides.json'))
def det(img,r,pad=140,thr=40,frac=.55):
  a=np.asarray(Image.open(img).convert('L'),dtype=float);H,W=a.shape
  x0,y0,x1,y1=max(0,r[0]-pad),max(0,r[1]-pad),min(W,r[2]+pad),min(H,r[3]+pad)
  sub=a[y0:y1,x0:x1]<thr
  cx=sub.mean(0);cy=sub.mean(1)
  # rows/cols within the guide interior strongly dark
  xs=np.where(cx>frac*cx.max())[0];ys=np.where(cy>frac*cy.max())[0]
  # largest contiguous run
  def run(v):
    best=(0,0);s=v[0];p=v[0]
    for q in list(v[1:])+[None]:
      if q is None or q!=p+1:
        if p-s>best[1]-best[0]:best=(s,p)
        if q is not None:s=q
      if q is not None:p=q
    return best
  bx=run(xs);by=run(ys)
  return [int(x0+bx[0]),int(y0+by[0]),int(x0+bx[1]),int(y0+by[1])]
out={}
for k,img in [('a','img/a2g.jpg'),('c','img/c2g.jpg'),('d','img/d2g.jpg')]:
  g=G[k];out[k]={key:[det(img,r) for r in g[key]] for key in ['s','w']}
  if 'ledger' in g:out[k]['ledger']=det(img,g['ledger'],pad=60)
  print(k,out[k])
json.dump(out,open('rects.json','w'))
