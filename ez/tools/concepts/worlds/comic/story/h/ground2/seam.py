# /usr/bin/python3 seam.py name... : measure wrap seams, write img/web/<name>.jpg (tile, 512px) fixed with a half-offset cross-blend if the seam shows
import sys,numpy as np
from PIL import Image
def seam(a):
  a=a.astype(float);h=np.abs(a[:,0]-a[:,-1]).mean();v=np.abs(a[0]-a[-1]).mean()
  inner=(np.abs(a[:,1:]-a[:,:-1]).mean()+np.abs(a[1:]-a[:-1]).mean())/2
  return h/inner,v/inner
for n in sys.argv[1:]:
  im=Image.open(f'img/{n}.jpg').convert('RGB');S=512;im=im.resize((S,S),Image.LANCZOS);a=np.asarray(im)
  r=seam(a)
  # cross-blend: centre of original, edges from half-offset copy (whose edges are the original's centre: continuous)
  o=np.roll(np.roll(a,S//2,0),S//2,1).astype(float)
  y,x=np.mgrid[0:S,0:S];d=np.minimum(np.minimum(x,S-1-x),np.minimum(y,S-1-y))/(S/2)
  m=np.clip((d-0.05)/0.35,0,1)[...,None]
  b=(a*m+o*(1-m)).astype(np.uint8);r2=seam(b)
  Image.fromarray(b).save(f'img/web/{n}.jpg',quality=80)
  print(n,'seam ratio h/v before %.2f %.2f after %.2f %.2f'%(r+r2))
