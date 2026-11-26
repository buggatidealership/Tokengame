# /usr/bin/python3 cc.py img [thr] [minfrac] : dark rectangles (connected components of L<thr, mostly filled) as fractions
import sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int);H,W,_=im.shape;thr=int(sys.argv[2]) if len(sys.argv)>2 else 26
L=im.mean(2);k=3;sm=(L<thr)[::k,::k];h0,w0=sm.shape;lab=np.zeros(sm.shape,int);n=0;out=[]
for y in range(h0):
  for x in range(w0):
    if sm[y,x] and not lab[y,x]:
      n+=1;st=[(y,x)];lab[y,x]=n;ys=[];xs=[]
      while st:
        a,b=st.pop();ys.append(a);xs.append(b)
        for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
          if 0<=c<h0 and 0<=d<w0 and sm[c,d] and not lab[c,d]:lab[c,d]=n;st.append((c,d))
      y0,y1,x0,x1=min(ys),max(ys)+1,min(xs),max(xs)+1;fr=len(ys)/((y1-y0)*(x1-x0))
      if (x1-x0)*k>.03*W and (y1-y0)*k>.012*H and fr>.8 and (x1-x0)*k<.95*W:out.append((y0*k/H,y1*k/H,x0*k/W,x1*k/W,fr))
out.sort()
for a,b,c,d,f in out:print('y %.4f-%.4f  x %.4f-%.4f  w %.4f h %.4f fill %.2f'%(a,b,c,d,d-c,b-a,f))
