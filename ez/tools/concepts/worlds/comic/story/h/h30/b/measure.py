# /usr/bin/python3 measure.py img/x.jpg ... : finds bright frame-like bezels, prints the glass (inner) rect as fractions of the image
import sys,json
from PIL import Image
import numpy as np
from collections import deque
out={}
for f in sys.argv[1:]:
  im=Image.open(f).convert('RGB');W,H=im.size;s=640/W;sm=im.resize((640,int(H*s)))
  a=np.asarray(sm).astype(float);lum=a.mean(2);h,w=lum.shape
  m=lum>105;lab=np.zeros((h,w),int);comps=[];k=0
  for y in range(h):
    for x in range(w):
      if m[y,x] and not lab[y,x]:
        k+=1;q=deque([(y,x)]);lab[y,x]=k;xs=[x];ys=[y];n=0
        while q:
          cy,cx=q.popleft();n+=1
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=cy+dy,cx+dx
            if 0<=ny<h and 0<=nx<w and m[ny,nx] and not lab[ny,nx]:lab[ny,nx]=k;q.append((ny,nx));xs.append(nx);ys.append(ny)
        x0,x1,y0,y1=min(xs),max(xs),min(ys),max(ys);bw,bh=x1-x0+1,y1-y0+1
        if bw>30 and bh>30 and n/(bw*bh)<.45:comps.append((x0,y0,x1,y1,n))
  rects=[]
  for x0,y0,x1,y1,n in comps:
    cy=(y0+y1)//2;cx=(x0+x1)//2
    # inner edges: walk inward from the outer edge until the pixel goes dark for 2 px
    def walk(seq):
      seen=False
      for i,v in enumerate(seq):
        if v>105:seen=True
        elif seen:return i
      return 0
    l=x0+walk(lum[cy,x0:x1]);r=x1-walk(lum[cy,x0:x1][::-1]);t=y0+walk(lum[y0:y1,cx]);b=y1-walk(lum[y0:y1,cx][::-1])
    rects.append({'outer':[round(x0/w,4),round(y0/h,4),round((x1+1)/w,4),round((y1+1)/h,4)],'glass':[round(l/w,4),round(t/h,4),round(r/w,4),round(b/h,4)]})
  rects.sort(key=lambda r:(round(r['outer'][1],1),r['outer'][0]))
  out[f]=rects;print(f,W,H,json.dumps(rects))
json.dump(out,open('rects.json','w'),indent=1)
