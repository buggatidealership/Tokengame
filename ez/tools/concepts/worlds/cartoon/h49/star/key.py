# /usr/bin/python3 key.py <in.png> <outprefix> : key out the flat magenta ground, despill, split into pieces by recursive XY cuts
# through fully empty rows/columns, save each trimmed RGBA png (numpy + PIL only)
import sys,numpy as np
from PIL import Image
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(np.float32)
R,G,B=im[...,0],im[...,1],im[...,2]
m=np.minimum(R,B)-G                      # magenta-ness: how far both red and blue rise above green
c=np.concatenate([m[:30,:30].ravel(),m[-30:,-30:].ravel(),m[:30,-30:].ravel(),m[-30:,:30].ravel()]);bg=np.median(c)
lo,hi=bg*0.30,bg*0.75
a=np.clip((hi-m)/(hi-lo),0,1)            # 1 = subject, 0 = ground
sp=np.where(a<0.999,np.clip(m,0,None),0)*0.92   # despill on the soft edge only
out=np.dstack([np.clip(R-sp,0,255),G,np.clip(B-sp,0,255),a*255]).astype(np.uint8)
solid=a>0.5
def cut(y0,y1,x0,x1,depth=0):
  s=solid[y0:y1,x0:x1]
  if s.sum()<3000:return []
  rows=np.where(s.any(1))[0];cols=np.where(s.any(0))[0]
  y0,y1,x0,x1=y0+rows[0],y0+rows[-1]+1,x0+cols[0],x0+cols[-1]+1
  s=solid[y0:y1,x0:x1]
  for axis in (1,0):            # try splitting columns first, then rows
    occ=s.any(0) if axis==1 else s.any(1)
    gaps=np.where(~occ)[0]
    if len(gaps):
      # split at the middle of the widest run of empties
      runs=np.split(gaps,np.where(np.diff(gaps)!=1)[0]+1);r=max(runs,key=len)
      if len(r)>=(int(sys.argv[3]) if len(sys.argv)>3 else 12):
        mid=r[len(r)//2]
        if axis==1:return cut(y0,y1,x0,x0+mid,depth+1)+cut(y0,y1,x0+mid,x1,depth+1)
        return cut(y0,y0+mid,x0,x1,depth+1)+cut(y0+mid,y1,x0,x1,depth+1)
  return [(x0,y0,x1,y1)]
P=cut(0,a.shape[0],0,a.shape[1])
P.sort(key=lambda p:(round(p[1]/(a.shape[0]/3)),p[0]))
for j,(x0,y0,x1,y1) in enumerate(P):
  pad=4;x0=max(0,x0-pad);y0=max(0,y0-pad);x1=min(a.shape[1],x1+pad);y1=min(a.shape[0],y1+pad)
  Image.fromarray(out[y0:y1,x0:x1]).save(f'{sys.argv[2]}{j}.png');print(j,(x0,y0,x1,y1),(x1-x0,y1-y0))
