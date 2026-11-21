# /usr/bin/python3 tint.py <neutral ground tile> <connector painting> : writes out/t7-gnd-<KEY>.jpg and out/t7-cx-<KEY>.jpg
# The ground: the painting's own light (luminance) printed through each model's solder mask; gold (warm, saturated) pixels keep their gold.
import sys,os,numpy as np
from PIL import Image
os.makedirs('out',exist_ok=True)
MASK={'GREEN':'#2f6a3e','GROK':'#5d6165','CLAUDE':'#a4572a','GPT':'#3c7146','KIMI':'#3f5684','VAULT':'#0b0a10','BARE':'#24221e'}
import colorsys
def rgb(h,sat=1.0):
  c=[int(h[i:i+2],16)/255 for i in (1,3,5)];hh,ss,vv=colorsys.rgb_to_hsv(*c);return np.array(colorsys.hsv_to_rgb(hh,min(1,ss*sat),vv))
def goldmask(a):
  mx=a.max(2);mn=a.min(2);s=(mx-mn)/(mx+1e-6);r,g,b=a[...,0],a[...,1],a[...,2]
  warm=(r>=g)&(g>b*1.15)&(s>.35)&(mx>.18)
  return np.clip((s-.35)/.25,0,1)*warm
def seamless(im,frac=.22):
  a=np.asarray(im).astype(float);H=a.shape[0];n=int(H*frac);body=a[:H-n].copy();tail=a[H-n:]
  w=np.linspace(0,1,n)[:,None,None];body[:n]=body[:n]*w+tail*(1-w)
  return Image.fromarray(body.astype('uint8'))
def tint(src,out,key,target_mean=.04,W=1440):
  im=Image.open(src).convert('RGB');x0=int(im.width*.075);im=im.crop((x0,0,im.width-x0,im.height));im=seamless(im)
  if im.width>W: im=im.resize((W,round(im.height*W/im.width)),Image.LANCZOS)
  a=np.asarray(im).astype(float)/255;Y=a@[.2126,.7152,.0722];g=goldmask(a)
  Yn=Y/ (np.percentile(Y,50)+1e-4)   # 1 = the median board
  c=rgb(MASK[key],1.6)
  if key=='VAULT': base=np.clip(Yn[...,None]*.035,0,1)*np.array([1,1,1.1])
  else:
    base=c[None,None,:]*(.35+.9*np.tanh(.8*Yn))[...,None]
  # normalise so the mean luminance is target_mean (the beats keep the key light)
  m=(base@[.2126,.7152,.0722]).mean();tm=target_mean if key!='VAULT' else .02
  base=base*(tm/max(m,1e-4))
  gold=a*(.2 if key!='VAULT' else .14)
  o=base*(1-g[...,None])+gold*g[...,None]
  Image.fromarray((np.clip(o,0,1)*255).astype('uint8')).save(out,quality=88)
  return (o@[.2126,.7152,.0722])
def cx(src,out,key,W=2400):
  im=Image.open(src).convert('RGB')
  if im.width>W: im=im.resize((W,round(im.height*W/im.width)),Image.LANCZOS)
  a=np.asarray(im).astype(float)/255;Y=a@[.2126,.7152,.0722];g=goldmask(a)
  c=rgb(MASK[key]) if key!='VAULT' else np.array([.06,.06,.07])
  base=c[None,None,:]*np.clip(Y/(np.percentile(Y,60)+1e-4),0,2.5)[...,None]*.85
  o=base*(1-g[...,None])+a*g[...,None]
  im=Image.fromarray((np.clip(o,0,1)*255).astype('uint8'));H=im.height
  im.crop((0,int(H*.25),im.width,int(H*.46))).save(out.replace('t7-cx-','t7-cxT-'),quality=88)
  im.crop((0,int(H*.46),im.width,int(H*.70))).save(out.replace('t7-cx-','t7-cxB-'),quality=88)
if __name__=='__main__':
  gs,cs=sys.argv[1],sys.argv[2]
  for k in MASK:
    L=tint(gs,f'out/t7-gnd-{k}.jpg',k);
    # contrast of the cream text (#f8f0d9, L=.866) against the ground's p99 and p99.9
    def cr(l):return (0.866+.05)/(l+.05)
    print(k,'meanL %.3f p99 %.3f -> %.1f:1  p99.9 %.3f -> %.1f:1'%(L.mean(),np.percentile(L,99),cr(np.percentile(L,99)),np.percentile(L,99.9),cr(np.percentile(L,99.9))))
    cx(cs,f'out/t7-cx-{k}.jpg',k)
