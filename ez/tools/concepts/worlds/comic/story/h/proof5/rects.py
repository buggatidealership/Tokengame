import sys
from PIL import Image
import numpy as np
sys.setrecursionlimit(100000)
for f in sys.argv[1:]:
  im=np.asarray(Image.open(f).convert('L').resize((250,250)),dtype=float)
  m=im<50;seen=np.zeros_like(m);out=[]
  for y in range(250):
    for x in range(250):
      if m[y,x] and not seen[y,x]:
        st=[(y,x)];seen[y,x]=1;pts=[]
        while st:
          a,b=st.pop();pts.append((a,b))
          for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
            if 0<=c<250 and 0<=d<250 and m[c,d] and not seen[c,d]:seen[c,d]=1;st.append((c,d))
        if 60<len(pts)<40000:
          ys=[p[0] for p in pts];xs=[p[1] for p in pts];x0,x1,y0,y1=min(xs),max(xs),min(ys),max(ys)
          if x1-x0<240 and y1-y0<240:out.append((x0*4,y0*4,(x1-x0+1)*4,(y1-y0+1)*4,round(len(pts)/((x1-x0+1)*(y1-y0+1)),2)))
  print(f.split('/')[-1],sorted(out,key=lambda r:(r[1]//40,r[0])))
