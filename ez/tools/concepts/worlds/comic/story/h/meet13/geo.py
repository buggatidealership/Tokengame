# /usr/bin/python3 geo.py img : black picture-frame insets (row centres) and gold border peaks along row 1 and the header/strip columns
import sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int);H,W,_=im.shape
L=im.mean(2);blk=L<22
k=4;sm=blk[::k,::k];h0,w0=sm.shape;seen=np.zeros_like(sm);fr=[]
for y in range(h0):
  for x in range(w0):
    if sm[y,x] and not seen[y,x]:
      st=[(y,x)];seen[y,x]=1;ys=[];xs=[]
      while st:
        a,b=st.pop();ys.append(a);xs.append(b)
        for c,d in((a+1,b),(a-1,b),(a,b+1),(a,b-1)):
          if 0<=c<h0 and 0<=d<w0 and sm[c,d] and not seen[c,d]:seen[c,d]=1;st.append((c,d))
      y0,y1,x0,x1=min(ys)*k,(max(ys)+1)*k,min(xs)*k,(max(xs)+1)*k;w=x1-x0;h=y1-y0
      if .035*W<w<.2*W and .025*H<h<.2*H and len(ys)/((h/k)*(w/k))>.85:fr.append((y0,y1,x0,x1))
fr.sort()
print('W,H',W,H)
for a,b,c,d in fr:print('frame y %.4f-%.4f yc %.4f h %.4f | x %.4f-%.4f xc %.4f w %.4f'%(a/H,b/H,(a+b)/2/H,(b-a)/H,c/W,d/W,(c+d)/2/W,(d-c)/W))
R,G,B=im[...,0],im[...,1],im[...,2];gold=(R>105)&(G>80)&(R-B>28)
def peaks(prof,thr):
  pk=[i for i in range(1,len(prof)-1) if prof[i]>thr and prof[i]>=prof[i-1] and prof[i]>=prof[i+1]]
  g=[];[g.append([y]) if not g or y-g[-1][-1]>3 else g[-1].append(y) for y in pk];return [round(sum(a)/len(a)) for a in g]
if fr:
  a,b=fr[0][0],fr[0][1];band=gold[a+(b-a)//3:b-(b-a)//3]
  px=peaks(band.mean(0),.5);print('row1 x-peaks',[round(x/W,4) for x in px])
  xs=int(W*.45);col=gold[:,xs-4:xs+4].mean(1);print('y-peaks @x.45',[round(y/H,4) for y in peaks(col,.5)])
