# /usr/bin/python3 quads.py img.jpg [thr] : the dark glass windows of a painting as quads (TL,TR,BR,BL) in the image's px, largest first.
import sys
from PIL import Image
im=Image.open(sys.argv[1]).convert('L');W,H=im.size;s=4;sm=im.resize((W//s,H//s));w,h=sm.size;px=sm.load()
thr=int(sys.argv[2]) if len(sys.argv)>2 else 34
seen=bytearray(w*h);out=[]
for y in range(h):
  for x in range(w):
    if seen[y*w+x] or px[x,y]>thr:continue
    st=[(x,y)];seen[y*w+x]=1;pts=[]
    while st:
      a,b=st.pop();pts.append((a,b))
      for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
        if 0<=c<w and 0<=d<h and not seen[d*w+c] and px[c,d]<=thr:seen[d*w+c]=1;st.append((c,d))
    if len(pts)>w*h*0.01:out.append(pts)
out.sort(key=len,reverse=True)
for pts in out:
  tl=min(pts,key=lambda p:p[0]+p[1]);br=max(pts,key=lambda p:p[0]+p[1]);tr=max(pts,key=lambda p:p[0]-p[1]);bl=min(pts,key=lambda p:p[0]-p[1])
  print(len(pts)*s*s,[[p[0]*s,p[1]*s] for p in (tl,tr,br,bl)])
