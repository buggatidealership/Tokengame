import json,sys,numpy as np
from PIL import Image,ImageFilter
tag=sys.argv[1];d=json.load(open(f'out/{tag}/m.json'));hh=d['hdr']['h']
res={}
def box(a,r,ax):
    r=max(1,int(r));p=np.pad(a,[(r+1,r) if i==ax else (0,0) for i in range(2)],mode='edge');c=np.cumsum(p,axis=ax)
    if ax==0: return (c[2*r+1:]-c[:-2*r-1])/(2*r+1)
    return (c[:,2*r+1:]-c[:,:-2*r-1])/(2*r+1)
def blur(a,s):
    r=s*0.9
    for _ in range(3): a=box(box(a,r,0),r,1)
    return a
for m in d['res']:
    k=m['k'];im=np.asarray(Image.open(f'out/{tag}/s{k:02d}.png').convert('RGB')).astype(np.float32)/255
    H=im.shape[0];im2=im.copy()
    R,G,B=im2[...,0],im2[...,1],im2[...,2];L=.2126*R+.7152*G+.0722*B
    RG=R-G;BY=B-(R+G)/2
    sc=d['W']/390
    s=np.zeros_like(L)
    for ch,w in((L,1.0),(RG,.6),(BY,.6)):
        for a,b in((3,24),(6,48)):
            c=np.abs(blur(ch,a*sc)-blur(ch,b*sc));c/= (c.max()+1e-6);s+=w*c
    s+=0.8*blur(L,6*sc)  # bright things pull on a dark page
    s[:hh,:]=0  # the sticky header is the same on every screen
    if d['W']>900: s[-46:,:]=0  # desktop crawl bar, the same on every screen
    s=blur(s,14*sc)
    y,x=np.unravel_index(np.argmax(s),s.shape)
    # top region: threshold 85% of max
    res[k]={'x':int(x),'y':int(y)}
json.dump(res,open(f'out/{tag}/sal.json','w'));print(res)
