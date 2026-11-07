# /usr/bin/python3 align.py <old name> <new name> : maps shop42's measured parts of img/<old>.jpg onto the daylight repaint img/<new>.jpg.
# For each part (case, shelf, cnt, bg) the old crop's edge map is matched in the new picture over scales 0.90-1.10 (FFT cross-correlation on
# edges, quarter size), and every box of that part (crop, plate, key, erase bands) is carried over; writes parts.json entries for <new>.
import json,sys,numpy as np
from PIL import Image,ImageFilter
O,N=sys.argv[1],sys.argv[2];P=json.load(open('../shop42/parts.json'))
def edges(im,k):
  g=im.convert('L').resize((im.width//k,im.height//k),Image.LANCZOS).filter(ImageFilter.FIND_EDGES);a=np.asarray(g,dtype=np.float32);return (a-a.mean())/(a.std()+1e-6)
A=Image.open(f'../shop42/img/{O}.jpg');B=Image.open(f'img/{N}.jpg');K=4;EB=edges(B,K)
def match(box):
  x0,y0,x1,y1=box;best=None
  for s in np.arange(.90,1.101,.005):
    c=A.crop((x0,y0,x1,y1));c=c.resize((max(8,int(c.width*s)),max(8,int(c.height*s))),Image.LANCZOS);t=edges(c,K)
    if t.shape[0]>=EB.shape[0] or t.shape[1]>=EB.shape[1]:continue
    F=np.fft.rfft2(EB);T=np.fft.rfft2(t[::-1,::-1],s=EB.shape);r=np.fft.irfft2(F*T,s=EB.shape)
    h,w=t.shape;v=r[h-1:,w-1:];i=np.unravel_index(np.argmax(v),v.shape);sc=v[i]/(h*w)
    if best is None or sc>best[0]:best=(sc,s,i[1]*K,i[0]*K)
  return best
src=P[O];out={'src':N}
for part,p in src.items():
  if part=='src':continue
  sc,s,nx,ny=match(p['crop']);x0,y0=p['crop'][:2]
  T=lambda x,y:(round(nx+(x-x0)*s),round(ny+(y-y0)*s))
  q={}
  for k,v in p.items():
    if k in('crop','plate','key'):a=T(v[0],v[1]);b=T(v[2],v[3]);q[k]=[a[0],a[1],b[0],b[1]]
    elif k=='s':q[k]=[round(z*s) for z in v]
    elif k=='erase':q[k]=[[T(0,a)[1],T(0,b)[1]] for a,b in v]
    elif k=='eraseR':q[k]=[[*T(a,b),*T(c,d)] for a,b,c,d in v]
    else:q[k]=v
  bw,bh=B.size;cr=q['crop'];q['crop']=[max(0,cr[0]),max(0,cr[1]),min(bw,cr[2]),min(bh,cr[3])]
  out[part]=q;print(part,'score %.3f scale %.3f at %d,%d'%(sc,s,nx,ny),q['crop'])
P2={};
try:P2=json.load(open('parts.json'))
except Exception:pass
P2[N]=out;json.dump(P2,open('parts.json','w'),indent=1)
