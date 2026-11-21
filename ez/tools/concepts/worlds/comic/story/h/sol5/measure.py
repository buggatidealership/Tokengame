#!/usr/bin/python3
# measure.py img/x.jpg ... -> surf.json: every empty dark surface (paper strip, window, counter, caption box) and every empty white
# surface (speech balloon) of each painting, as the largest axis-aligned rectangle inside each connected region, in painting px.
# Overlays with the region numbers in ovl/ (checked by eye before use).
import sys,json,os
import numpy as np
from PIL import Image,ImageDraw
from collections import deque
out=json.load(open('surf.json')) if os.path.exists('surf.json') else {}
def maxrect(m):
  h,w=m.shape;hist=np.zeros(w,int);best=(0,0,0,0,0)
  for y in range(h):
    hist=np.where(m[y],hist+1,0);st=[]
    for x in range(w+1):
      cur=hist[x] if x<w else 0;start=x
      while st and st[-1][1]>=cur:
        sx,sh=st.pop();ar=sh*(x-sx)
        if ar>best[0]:best=(ar,sx,y-sh+1,x-1,y)
        start=sx
      st.append((start,cur))
  return best
for f in sys.argv[1:]:
  im=Image.open(f).convert('RGB');W,H=im.size;L=np.asarray(im).astype(float).mean(2);k=4
  s=L[:H//k*k,:W//k*k].reshape(H//k,k,W//k,k);mx=s.max((1,3));mn=s.min((1,3));h,w=mx.shape
  res=[]
  for kind,m in (('dark',mx<40),('white',mn>225)):
    lab=np.zeros(m.shape,int);n=0
    for y in range(h):
      for x in range(w):
        if m[y,x] and not lab[y,x]:
          n+=1;q=deque([(y,x)]);lab[y,x]=n;cnt=0
          while q:
            a,b=q.popleft();cnt+=1
            for c,d in ((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
              if 0<=c<h and 0<=d<w and m[c,d] and not lab[c,d]:lab[c,d]=n;q.append((c,d))
          if cnt>=120:
            ar,x0,y0,x1,y1=maxrect(lab==n)
            if (x1-x0)>=10 and (y1-y0)>=4:res.append({'k':kind,'r':[int(x0*k),int(y0*k),int(x1*k+k),int(y1*k+k)],'a':int(ar)})
  res.sort(key=lambda r:-r['a']);n=os.path.basename(f)[:-4];out[n]={'iw':W,'ih':H,'s':res[:8]}
  d=ImageDraw.Draw(im)
  for i,r in enumerate(res[:8]):
    c=(255,0,255) if r['k']=='dark' else (0,200,255);d.rectangle(r['r'],outline=c,width=4);d.text((r['r'][0]+6,r['r'][1]+4),str(i),fill=c)
  im.thumbnail((600,600));im.save('ovl/'+n+'.jpg')
  print(n,W,H,[(i,r['k'],r['r']) for i,r in enumerate(res[:8])])
json.dump(out,open('surf.json','w'),indent=0)
