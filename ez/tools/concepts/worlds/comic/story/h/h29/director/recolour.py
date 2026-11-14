# /usr/bin/python3 -I recolour.py : GPT's chip board from green to violet (the H29 colour rule: model colours never green, red or gold).
# Only green-hued, saturated pixels move (hue 75..175 deg -> around 282 deg, a little more saturated); the gold plate, the ink and the copper stay as painted.
import sys,os,colorsys
from PIL import Image
import numpy as np
SRC='/home/user/Tokengame/ez/tools/concepts/worlds/comic/story/h/meet12/out/';OUT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'img')
def rgb2hsv(a):
    r,g,b=a[...,0],a[...,1],a[...,2];mx=a.max(-1);mn=a.min(-1);d=mx-mn;h=np.zeros_like(mx)
    m=d>1e-6
    rr=(mx==r)&m;gg=(mx==g)&m&~rr;bb=m&~rr&~gg
    h[rr]=((g-b)[rr]/d[rr])%6;h[gg]=(b-r)[gg]/d[gg]+2;h[bb]=(r-g)[bb]/d[bb]+4
    return h*60,np.where(mx>0,d/np.maximum(mx,1e-6),0),mx
def hsv2rgb(h,s,v):
    c=v*s;x=c*(1-np.abs((h/60)%2-1));m=v-c;z=np.zeros_like(h);i=(h//60).astype(int)%6
    R=np.choose(i,[c,x,z,z,x,c]);G=np.choose(i,[x,c,c,x,z,z]);B=np.choose(i,[z,z,x,c,c,x])
    return np.stack([R+m,G+m,B+m],-1)
for w in (1200,1800):
    im=Image.open(f'{SRC}chip13q-gpt-{w}.jpg').convert('RGB');a=np.asarray(im).astype(np.float32)/255
    h,s,v=rgb2hsv(a)
    wgt=np.clip((s-.18)/.2,0,1)*np.clip(1-np.abs(h-125)/55,0,1)  # how green
    nh=np.where(wgt>0,(h+(282-125)*1.0),h)%360
    out=hsv2rgb(nh,np.clip(s*np.where(wgt>0,1.2,1),0,1),v*np.where(wgt>0,1.08,1).clip(0,1))
    out=a*(1-wgt[...,None])+np.clip(out,0,1)*wgt[...,None]
    o=Image.fromarray((out*255).round().astype(np.uint8))
    o.save(f'{OUT}/chip-gpt-violet-{w}.jpg',quality=86);o.save(f'{OUT}/chip-gpt-violet-{w}.webp',quality=82)
print('ok')
