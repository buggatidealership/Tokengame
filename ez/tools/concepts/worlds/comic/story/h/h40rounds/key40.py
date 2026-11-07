# /usr/bin/python3 key40.py <names...>: keys the magenta out of img/<name>.jpg (holes too), crops to the opaque box, writes img/<name>.webp,
# and prints, as fractions of the cropped box, the blank cream/brass label (largest flat light rect) and any transparent hole inside the object.
import sys,json
from PIL import Image,ImageFilter
import numpy as np
def key(im):
  a=np.asarray(im.convert('RGB')).astype(float);r,g,b=a[...,0],a[...,1],a[...,2]
  m=np.clip(((np.minimum(r,b)-g)-40)/60,0,1);al=1-m
  out=a.copy();mc=np.clip(np.minimum(r,b)-g,0,None)*.92;out[...,0]-=mc;out[...,2]-=mc
  A=Image.fromarray((al*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7))
  o=Image.fromarray(out.clip(0,255).astype('uint8'));o.putalpha(A);return o,al
R={}
for nm in sys.argv[1:]:
  im=Image.open(f'img/{nm}.jpg');o,al=key(im);op=al>.5
  ys,xs=np.where(op);x0,y0,x1,y1=xs.min(),ys.min(),xs.max()+1,ys.max()+1
  c=o.crop((x0,y0,x1,y1));W,H=c.size;res={'box':[int(x0),int(y0),int(x1),int(y1)],'size':[W,H]}
  A=np.asarray(c.split()[3])<128
  m=Image.fromarray((A*255).astype('uint8')).convert('L');pad=Image.new('L',(W+2,H+2),255);pad.paste(m,(1,1))
  from PIL import ImageDraw
  ImageDraw.floodfill(pad,(0,0),0);hm=np.asarray(pad)[1:-1,1:-1]>128
  if hm.sum()>W*H*.01:
    yy,xx=np.where(hm);res['hole']=[round(xx.min()/W,4),round(yy.min()/H,4),round((xx.max()+1)/W,4),round((yy.max()+1)/H,4)]
  rgb=np.asarray(c.convert('RGB')).astype(int);lum=rgb.sum(-1)/3;import os;cr=(lum>int(os.environ.get("LT","165")))&(~A)&(rgb[...,0]>rgb[...,2]+5)
  def run(p,f):
    th=p.max()*f;idx=np.where(p>th)[0]
    if not len(idx):return None
    # longest contiguous run
    best=(0,0);s0=idx[0];prev=idx[0]
    for i in list(idx[1:])+[None]:
      if i is None or i!=prev+1:
        if prev-s0>best[1]-best[0]:best=(s0,prev)
        if i is not None:s0=i
      if i is not None:prev=i
    return best
  if cr.sum()>W*H*.01:
    cx=run(cr.sum(0),.6);cy=run(cr.sum(1),.6)
    if cx and cy:res['light']=[round(cx[0]/W,4),round(cy[0]/H,4),round((cx[1]+1)/W,4),round((cy[1]+1)/H,4)]
  if W>1600:c=c.resize((1600,round(1600*H/W)),Image.LANCZOS)
  c.save(f'img/{nm}.webp',quality=86);R[nm]=res;print(nm,json.dumps(res))
json.dump(R,open('img/keys-%s.json'%'-'.join(sys.argv[1:]),'w'))
