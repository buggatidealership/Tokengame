# python3 quads.py img.jpg [thr] [minfrac]: dark glass windows not touching the border, as bboxes [x0,y0,x1,y1] in image px (frontal paintings), JSON.
import sys,json
from PIL import Image
im=Image.open(sys.argv[1]).convert('L');W,H=im.size;s=max(1,W//700);sm=im.resize((W//s,H//s));w,h=sm.size;px=sm.load()
thr=int(sys.argv[2]) if len(sys.argv)>2 else 30;mf=float(sys.argv[3]) if len(sys.argv)>3 else .002
seen=bytearray(w*h);out=[]
for y in range(h):
  for x in range(w):
    if seen[y*w+x] or px[x,y]>thr:continue
    st=[(x,y)];seen[y*w+x]=1;n=0;x0=x1=x;y0=y1=y;edge=False
    while st:
      a,b=st.pop();n+=1;x0=min(x0,a);x1=max(x1,a);y0=min(y0,b);y1=max(y1,b)
      if a in(0,w-1) or b in(0,h-1):edge=True
      for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
        if 0<=c<w and 0<=d<h and not seen[d*w+c] and px[c,d]<=thr:seen[d*w+c]=1;st.append((c,d))
    if not edge and n>w*h*mf and n>(x1-x0+1)*(y1-y0+1)*.6:out.append([x0*s,y0*s,(x1+1)*s,(y1+1)*s,n*s*s])
out.sort(key=lambda r:(r[1]//(H//40),r[0]))
print(json.dumps(out))
