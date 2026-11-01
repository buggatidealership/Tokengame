# /usr/bin/python3 reg.py : fits each per-model pass onto the master's left crop: scale and shift (x, y) minimising the difference on the
# parts the pass did not change (label right half, ceramic edges), on edge maps so repainted textures matter less. Writes reg.json.
from PIL import Image,ImageFilter;import numpy as np,json
def edges(im):return np.asarray(im.convert('L').filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(2))).astype(float)
ref=Image.open('ref/left.jpg');W,H=ref.size;f=2
R=edges(ref.resize((W//f,H//f)))
regs=[(1100,480,2050,1150),(20,1060,1000,1160),(700,20,2050,180),(30,250,130,1050)]
out={}
for m in ['grok','claude','gpt','kimi']:
  src=Image.open(f'img/p7-{m}-a.jpg');best=None
  for sx in np.arange(.990,1.0001,.001):
    for sy in np.arange(.992,1.0081,.002):
      # map master-crop coords p -> output coords q = p*s*k + t (k = 3840/2100); render the inverse once per scale
      k=src.width/W
      for tx in range(-8,9,2):
        for ty in range(-8,9,2):
          pass
      im=src.transform((W//f,H//f),Image.AFFINE,(sx*k*f,0,0,0,sy*k*f,0),Image.BILINEAR)
      A=edges(im)
      for tx in range(-10,11):
        for ty in range(-10,11):
          e=0
          for x0,y0,x1,y1 in regs:
            x0//=f;y0//=f;x1//=f;y1//=f
            e+=np.abs(R[y0:y1,x0:x1]-A[y0+ty:y1+ty,x0+tx:x1+tx]).mean()
          if best is None or e<best[0]:best=(e,float(sx),float(sy),tx*f,ty*f)
  out[m]=best[1:];print(m,[round(v,4) for v in best])
json.dump(out,open('reg.json','w'))
