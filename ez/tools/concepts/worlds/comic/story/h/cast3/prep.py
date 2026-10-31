#!/usr/bin/python3
# cut each prop out of its white ground (flood fill from the border) and measure the blank surface the page writes on.
# writes cut/<prop>.png and props.json {name:{w,h,in:[x0,y0,x1,y1] as fractions, cols:[...] for the tape board}}
import os,json,glob
from PIL import Image,ImageFilter
import numpy as np
from collections import deque
D=os.path.dirname(os.path.abspath(__file__));os.makedirs(D+'/cut',exist_ok=True)
out={}  # note: rerunning overwrites the hand-set rects in props.json
def cut(fn):
  im=Image.open(fn).convert('RGB');a=np.asarray(im).astype(int);h,w,_=a.shape
  white=(a.min(axis=2)>222)&((a.max(axis=2)-a.min(axis=2))<30)
  bg=np.zeros((h,w),bool);q=deque()
  for x in range(w):
    for y in(0,h-1):
      if white[y,x] and not bg[y,x]:bg[y,x]=1;q.append((y,x))
  for y in range(h):
    for x in(0,w-1):
      if white[y,x] and not bg[y,x]:bg[y,x]=1;q.append((y,x))
  while q:
    y,x=q.popleft()
    for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
      ny,nx=y+dy,x+dx
      if 0<=ny<h and 0<=nx<w and white[ny,nx] and not bg[ny,nx]:bg[ny,nx]=1;q.append((ny,nx))
  al=Image.fromarray(((~bg)*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.8))
  rgba=im.copy();rgba.putalpha(al);bb=al.point(lambda v:255 if v>128 else 0).getbbox();rgba=rgba.crop(bb)
  return rgba,a[bb[1]:bb[3],bb[0]:bb[2]],(~bg)[bb[1]:bb[3],bb[0]:bb[2]]
def inner(a,obj,dark=70):
  L=Image.fromarray(a.mean(axis=2).astype('uint8')).filter(ImageFilter.MaxFilter(17));lum=np.asarray(L).astype(int);m=((lum<dark)&obj)[::4,::4];h,w=m.shape;lab=np.zeros((h,w),int);best=(0,None);k=0
  for y0 in range(h):
    for x0 in range(w):
      if m[y0,x0] and not lab[y0,x0]:
        k+=1;q=deque([(y0,x0)]);lab[y0,x0]=k;n=0;bx=[x0,y0,x0,y0]
        while q:
          y,x=q.popleft();n+=1;bx=[min(bx[0],x),min(bx[1],y),max(bx[2],x),max(bx[3],y)]
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<h and 0<=nx<w and m[ny,nx] and not lab[ny,nx]:lab[ny,nx]=k;q.append((ny,nx))
        if n>best[0]:best=(n,bx)
  bx=best[1];return [round(float(bx[0]/w),4),round(float(bx[1]/h),4),round(float(bx[2]/w),4),round(float(bx[3]/h),4)]
def inner_old(a,obj,dark=60):
  lum=a.mean(axis=2);m=(lum<dark)&obj;h,w=m.shape
  # the largest dark block: rows/cols where more than 55% of the row is dark
  rows=np.where(m.mean(axis=1)>.45)[0];cols=np.where(m.mean(axis=0)>.45)[0]
  if not len(rows) or not len(cols):return [.18,.18,.82,.82]
  return [round(cols[0]/w,4),round(rows[0]/h,4),round(cols[-1]/w,4),round(rows[-1]/h,4)]
if __name__!="__main__" or "--force" not in __import__("sys").argv: raise SystemExit("props.json holds hand-set rects; run with --force to remeasure")
for fn in sorted(glob.glob(D+'/img/x-*.jpg')):
  n=os.path.basename(fn)[2:-4];rgba,a,obj=cut(fn);rgba.save(f'{D}/cut/{n}.webp',quality=88)
  rec={'w':rgba.width,'h':rgba.height}
  if n.startswith(('weigh','walk','lineup','tape')):rec['in']=inner(a,obj)
  else:rec['in']=[.16,.2,.84,.8]
  if n.startswith('tape'):
    x0,y0,x1,y1=rec['in'];W=a.shape[1];H=a.shape[0];band=a[int(y0*H+H*.1):int(y1*H-H*.1),int(x0*W):int(x1*W)].mean(axis=2).mean(axis=0)
    sm=np.convolve(band,np.ones(5)/5,'same');n_=len(sm);cands=[]
    for k in(1,2,3):
      c=int(n_*k/4);lo,hi=c-n_//10,c+n_//10;i=lo+int(np.argmax(sm[lo:hi]));cands.append(round(float(x0+(x1-x0)*i/n_),4))
    rec['cols']=cands
  out[n]=rec;print(n,rec)
json.dump(out,open(D+'/props.json','w'),indent=0)
