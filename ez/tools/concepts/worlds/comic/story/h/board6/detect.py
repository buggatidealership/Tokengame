# python3 detect.py img/x.jpg : finds the blank light-grey chip faces and the dark window glass (at 1/4 scale), prints corner quads in painting px
import sys,numpy as np
from PIL import Image,ImageFilter
from collections import deque
S=4
I=Image.open(sys.argv[1]).convert('RGB');W0,H0=I.size
im=np.asarray(I.resize((W0//S,H0//S))).astype(int);mx=im.max(2);mn=im.min(2)
def label(m):
  H,W=m.shape;lab=np.zeros((H,W),int);n=0;out=[]
  for y in range(H):
    for x in range(W):
      if m[y,x] and not lab[y,x]:
        n+=1;q=deque([(y,x)]);lab[y,x]=n;pts=[]
        while q:
          a,b=q.popleft();pts.append((b,a))
          for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
            if 0<=c<H and 0<=d<W and m[c,d] and not lab[c,d]:lab[c,d]=n;q.append((c,d))
        out.append(np.array(pts))
  return out
def quad(p):s=p[:,0]+p[:,1];d=p[:,0]-p[:,1];return [p[s.argmin()],p[d.argmax()],p[s.argmax()],p[d.argmin()]]
grey=(mn>150)&(mx-mn<24)
C=[p for p in label(grey) if len(p)>2500]
print('chips',sorted([[[int(x*S),int(y*S)] for x,y in quad(p)] for p in C],key=lambda q:q[0][1]))
dark=mx<45
Wn=[]
for p in label(dark):
  x0,y0=p.min(0);x1,y1=p.max(0)
  if x0==0 or y0==0 or x1>=im.shape[1]-1 or y1>=im.shape[0]-1:continue
  a=len(p)
  if 1500<a<30000 and a>.6*(x1-x0+1)*(y1-y0+1):Wn.append([[int(x*S),int(y*S)] for x,y in quad(p)])
print('wins',sorted(Wn,key=lambda q:q[0][1]))
