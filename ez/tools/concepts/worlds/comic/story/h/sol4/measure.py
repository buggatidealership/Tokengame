#!/usr/bin/python3
# measure.py img/*.jpg -> surf.json: the empty black data surface of each painting (screen, window, chart sheet) as an
# axis-aligned rectangle in painting px (the inner rectangle whose rows and columns are >=93% dark), and for the polygraphs
# the pen tips' x (leftmost bright column inside the surface). Checked by eye on overlay images (ovl/).
import sys,json,os
import numpy as np
from PIL import Image,ImageDraw
from collections import deque
out=json.load(open('surf.json')) if os.path.exists('surf.json') else {}
os.makedirs('ovl',exist_ok=True)
TH=float(os.environ.get('TH',22))
for f in sys.argv[1:]:
  im=Image.open(f).convert('RGB');W,H=im.size;a=np.asarray(im).astype(float);L=a.mean(2)
  k=4;s=L[:H//k*k,:W//k*k].reshape(H//k,k,W//k,k).mean((1,3));h,w=s.shape;dark=s<TH
  def sh(m,dy,dx):
    o=np.zeros_like(m);o[max(dy,0):h+min(dy,0),max(dx,0):w+min(dx,0)]=m[max(-dy,0):h+min(-dy,0),max(-dx,0):w+min(-dx,0)];return o
  def dil(m,r):
    o=m.copy()
    for dy in range(-r,r+1):
      for dx in range(-r,r+1):o|=sh(m,dy,dx)
    return o
  def ero(m,r):return ~dil(~m,r)
  m=ero(dil(dark,3),3)
  # largest all-dark rectangle (histogram method)
  hist=np.zeros(w,int);best=(0,0,0,0,0)
  for y in range(h):
    hist=np.where(m[y],hist+1,0);st=[]
    for x in range(w+1):
      cur=hist[x] if x<w else 0;start=x
      while st and st[-1][1]>=cur:
        sx,sh_=st.pop();ar=sh_*(x-sx)
        if ar>best[0]:best=(ar,sx,y-sh_+1,x-1,y)
        start=sx
      st.append((start,cur))
  _,x0,y0,x1,y1=best
  R=[int(x0*k),int(y0*k),int(x1*k+k),int(y1*k+k)]
  # pens: leftmost column inside the surface with a bright (>110) run in the middle rows
  sub=L[R[1]:R[3],R[0]:R[2]];bright=(sub>110).sum(0);cols=np.where(bright>sub.shape[0]*.03)[0]
  pen=int(R[0]+cols.min()) if len(cols) and cols.min()>sub.shape[1]*.35 else None
  n=os.path.basename(f)[:-4];out[n]={'iw':W,'ih':H,'r':R,'pen':pen}
  d=ImageDraw.Draw(im);d.rectangle(R,outline=(255,0,255),width=3)
  if pen:d.line([pen,R[1],pen,R[3]],fill=(0,255,255),width=3)
  im.thumbnail((500,500));im.save('ovl/'+n+'.jpg')
  print(n,out[n])
json.dump(out,open('surf.json','w'),indent=0)
