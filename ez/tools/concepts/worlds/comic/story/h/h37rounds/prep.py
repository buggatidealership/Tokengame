# /usr/bin/python3 prep.py : keys the cut-outs (plight, drawer, easel), makes the seamless vertical tiles (galwall, counter, rackwall: a band
# mirrored onto itself), resizes the frames (bay, tray, album) for the web, and prints the drawer's card-holder rect as fractions of the drawer.
from PIL import Image,ImageFilter
import numpy as np
def key(im):
  a=np.asarray(im.convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  m=np.clip(((np.minimum(r,b)-g)-40)/60,0,1);al=1-m
  out=a.copy();mc=np.clip(np.minimum(r,b)-g,0,None)*.92;out[...,0]-=mc;out[...,2]-=mc
  A=Image.fromarray((al*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7))
  o=Image.fromarray(out.clip(0,255).astype('uint8'));o.putalpha(A);return o,al
for nm,w in (('plight',600),('drawer',1210),('easel',600)):
  im=Image.open(f'img/{nm}.jpg');o,al=key(im);ys,xs=np.where(al>.5);x0,y0,x1,y1=xs.min(),ys.min(),xs.max()+1,ys.max()+1
  c=o.crop((x0,y0,x1,y1));c=c.resize((w,round(w*c.size[1]/c.size[0])),Image.LANCZOS);c.save(f'img/{nm}.webp',quality=88);print(nm,(x0,y0,x1,y1),'->',c.size)
  if nm=='drawer':
    rgb=np.asarray(c.convert('RGB')).astype(int);h,wd=rgb.shape[:2]
    cr=(rgb[...,0]>185)&(rgb[...,1]>170)&(rgb[...,2]>120)&(rgb[...,0]-rgb[...,2]<90)
    yy,xx=np.where(cr);print('card',[round(v,4) for v in (np.percentile(xx,2)/wd,np.percentile(yy,2)/h,np.percentile(xx,98)/wd,np.percentile(yy,98)/h)])
def tile(nm,y0,y1,w):
  im=Image.open(f'img/{nm}.jpg').convert('RGB');W,H=im.size;b=im.crop((0,int(H*y0),W,int(H*y1)))
  t=Image.new('RGB',(W,b.size[1]*2));t.paste(b,(0,0));t.paste(b.transpose(Image.FLIP_TOP_BOTTOM),(0,b.size[1]))
  t=t.resize((w,round(w*t.size[1]/W)),Image.LANCZOS);t.save(f'img/{nm}-tile.webp',quality=82);print(nm,'tile',t.size)
tile('galwall',.42,.98,900);tile('counter',.25,.95,900);tile('rackwall',.30,.98,1400)
# the top of the gallery wall (its own light) as the head of the wall
im=Image.open('img/galwall.jpg').convert('RGB');im.resize((900,1200),Image.LANCZOS).save('img/galwall.webp',quality=82)
for nm,w in (('bay',900),('tray',1400),('album',1000)):
  im=Image.open(f'img/{nm}.jpg').convert('RGB');im=im.resize((w,round(w*im.size[1]/im.size[0])),Image.LANCZOS);im.save(f'img/{nm}.jpg',quality=86);print(nm,im.size)
