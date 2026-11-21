# /usr/bin/python3 glass.py name x y [thr] : flood-fill the dark glass from a seed (4K px), print its bbox (on a 1/4 grid, refined x4)
import sys,numpy as np
from PIL import Image
def glass(name,x,y,thr=30):
  a=np.asarray(Image.open(f'img/{name}.jpg').convert('L').resize((960,540))).astype(float)
  m=a<thr;r=np.zeros_like(m);sx,sy=x//4,y//4
  if not m[sy,sx]:print('seed not dark',a[sy,sx]);return
  r[sy,sx]=True
  for i in range(2000):
    n=r.copy();n[1:]|=r[:-1];n[:-1]|=r[1:];n[:,1:]|=r[:,:-1];n[:,:-1]|=r[:,1:];n&=m
    if (n==r).all():break
    r=n
  ys,xs=np.where(r);return [int(xs.min()*4),int(ys.min()*4),int(xs.max()*4+4),int(ys.max()*4+4)]
if __name__=='__main__':
  print(glass(sys.argv[1],int(sys.argv[2]),int(sys.argv[3]),float(sys.argv[4]) if len(sys.argv)>4 else 30))
