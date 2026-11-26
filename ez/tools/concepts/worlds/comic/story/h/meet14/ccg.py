# /usr/bin/python3 ccg.py img [mode gold|green|grey|lite] : filled rectangles of one paint as fractions
import sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float);H,W,_=im.shape;mode=sys.argv[2] if len(sys.argv)>2 else 'gold'
r,g,b=im[...,0],im[...,1],im[...,2];mx=im.max(2);mn=im.min(2);S=(mx-mn)/np.maximum(mx,1);V=mx/255
hue=np.degrees(np.arctan2(np.sqrt(3)*(g-b),2*r-g-b))%360
M={'gold':(hue>25)&(hue<60)&(S>.4)&(V>.45),'green':(hue>90)&(hue<180)&(S>.25)&(V>.12)&(V<.5),'grey':(S<.12)&(V>.45)&(V<.85),'lite':(V>.75)&(S<.35)}[mode]
k=3;sm=M[::k,::k];h0,w0=sm.shape;lab=np.zeros(sm.shape,bool);out=[]
for y in range(h0):
  for x in range(w0):
    if sm[y,x] and not lab[y,x]:
      st=[(y,x)];lab[y,x]=1;ys=[];xs=[]
      while st:
        a,c=st.pop();ys.append(a);xs.append(c)
        for p,q in((a+1,c),(a-1,c),(a,c+1),(a,c-1)):
          if 0<=p<h0 and 0<=q<w0 and sm[p,q] and not lab[p,q]:lab[p,q]=1;st.append((p,q))
      y0,y1,x0,x1=min(ys),max(ys)+1,min(xs),max(xs)+1;fr=len(ys)/((y1-y0)*(x1-x0))
      mw=float(sys.argv[3]) if len(sys.argv)>3 else .03
      if (x1-x0)*k>mw*W and (y1-y0)*k>.006*H and fr>.6:out.append((y0*k/H,y1*k/H,x0*k/W,x1*k/W,fr))
out.sort()
for a,b2,c,d,f in out:print('y %.4f-%.4f  x %.4f-%.4f  w %.4f h %.4f fill %.2f'%(a,b2,c,d,d-c,b2-a,f))
