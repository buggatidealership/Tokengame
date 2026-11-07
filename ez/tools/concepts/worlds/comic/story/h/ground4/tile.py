# /usr/bin/python3 tile.py : raw 4K masters -> dimmed, vertically seamless tiles in out/ (ground) + cropped gutter strips (strip)
import sys,os,json
from PIL import Image,ImageStat
import numpy as np
os.makedirs('out',exist_ok=True)
GAIN={'g1-board':.48,'g2-wafer':.48,'g3-rack':.9,'g4-bus':.52,'g5-void':.8}
def seam(a,frac=.22):
  H=a.shape[0];o=int(H*frac);T=H-o;t=a[:T].copy()
  w=np.linspace(0,1,o)[:,None,None]
  t[:o]=a[:o]*w+a[T:T+o]*(1-w)   # row 0 == a[T] -> continues from t[T-1]=a[T-1]
  return t
info={}
for f in sorted(os.listdir('raw')):
  n=f[:-4]
  if not n.startswith('g') or '4k' not in n:continue
  k=n.rsplit('-',1)[0];kind=n.rsplit('-',1)[1]
  a=np.asarray(Image.open('raw/'+f).convert('RGB')).astype(np.float32)
  a=a*GAIN[k]
  t=np.clip(seam(a),0,255).astype(np.uint8);im=Image.fromarray(t)
  W=1440 if kind=='p4k' else 2560
  im=im.resize((W,round(im.height*W/im.width)),Image.LANCZOS)
  out=f'out/gr4-{k}-{"p" if kind=="p4k" else "l"}.jpg';im.save(out,quality=80,optimize=True,progressive=True)
  L=np.asarray(im.convert('L')).astype(float)/255
  info[out]={'size':im.size,'kb':os.path.getsize(out)//1024,'meanL':round(L.mean(),3),'p99':round(float(np.percentile(L,99)),3)}
for f in sorted(os.listdir('raw')):
  n=f[:-4]
  if not n.startswith('s'):continue
  im=Image.open('raw/'+f).convert('RGB');a=np.asarray(im.convert('L')).astype(float)
  r=a.mean(1);thr=r.max()*.18;rows=np.where(r>thr)[0]
  y0,y1=int(rows.min()),int(rows.max());pad=int((y1-y0)*.08);y0=max(0,y0-pad);y1=min(im.height,y1+pad)
  c=im.crop((0,y0,im.width,y1));c=c.resize((2400,round(c.height*2400/c.width)),Image.LANCZOS)
  out=f'out/gr4-{n}.jpg';c.save(out,quality=84,optimize=True,progressive=True)
  info[out]={'size':c.size,'kb':os.path.getsize(out)//1024,'band':[y0,y1]}
json.dump(info,open('out/tiles.json','w'),indent=1);print(json.dumps(info,indent=1))
