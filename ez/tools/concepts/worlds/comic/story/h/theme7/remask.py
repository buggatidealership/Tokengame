# /usr/bin/python3 remask.py : re-masks the green boards inside the section paintings (gold, ink and light kept) -> out/rm-<KEY>-<file>
# A pixel is green solder mask when its hue sits in 70..175 deg and it has some saturation; its hue becomes the mask's, its saturation is scaled
# to the mask's, its value is kept (so the painting's light and ink stay exactly where they were).
import numpy as np,colorsys,os
from PIL import Image
MED='../../../../../../../media/'
MASK={'GROK':'#5d6165','CLAUDE':'#a4572a','GPT':'#3c7146','KIMI':'#3f5684','GREEN':'#2f6a3e'}
FILES=['rounds-h24-wafer.jpg','rounds-h24-die.jpg','p5-scope.jpg','p5-sockets.jpg','p5-panel.jpg']
def rgb2hsv(a):
  r,g,b=a[...,0],a[...,1],a[...,2];mx=a.max(-1);mn=a.min(-1);d=mx-mn+1e-9
  h=np.where(mx==r,((g-b)/d)%6,np.where(mx==g,(b-r)/d+2,(r-g)/d+4))*60;s=np.where(mx>0,d/(mx+1e-9),0);return h,s,mx
def hsv2rgb(h,s,v):
  c=v*s;x=c*(1-np.abs((h/60)%2-1));m=v-c;z=np.zeros_like(h);i=(h//60).astype(int)%6
  r=np.choose(i,[c,x,z,z,x,c]);g=np.choose(i,[x,c,c,x,z,z]);b=np.choose(i,[z,z,x,c,c,x]);return np.stack([r+m,g+m,b+m],-1)
for f in FILES:
  src=MED+f
  if not os.path.exists(src):print('missing',f);continue
  a=np.asarray(Image.open(src).convert('RGB')).astype(float)/255;h,s,v=rgb2hsv(a)
  w=np.clip((s-.12)/.12,0,1)*np.clip(1-np.abs(h-122)/60,0,1)   # how green-mask a pixel is (soft)
  for k,c in MASK.items():
    if k=='GREEN':continue
    th,ts,tv=colorsys.rgb_to_hsv(*[int(c[i:i+2],16)/255 for i in (1,3,5)])
    gs,gs0=ts,colorsys.rgb_to_hsv(*[int(MASK['GREEN'][i:i+2],16)/255 for i in (1,3,5)])[1]
    nh=np.full_like(h,th*360);ns=np.clip(s*(ts/gs0)*(1.0 if k!='GROK' else 1.0),0,1)
    # keep perceived lightness: blue and orange read darker/lighter than green at the same value
    lum=lambda q:q@[.2126,.7152,.0722]
    o=hsv2rgb(nh,ns,v);L0=lum(a);L1=lum(o)+1e-6;o=np.clip(o*(L0/L1)[...,None],0,1)
    out=a*(1-w[...,None])+o*w[...,None]
    Image.fromarray((out*255).astype('uint8')).save(f'out/rm-{k}-{f}',quality=90)
  print(f,a.shape)
