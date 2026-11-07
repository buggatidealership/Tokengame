# /usr/bin/python3 compose.py : builds img/chip7-<m>-full.jpg from the master and each model's pass.
#  1. fit the pass onto the master's left crop: x and y scale + shift from the gold bezels' edges (least squares), resample it into master coords;
#  2. lay back only the plate (whole, with rim), the flag field (whole, with frame) and the name strip's glass (inside its bezel), feathered;
#  3. tint the ceramic with the model's colour (multiply, only on the pale low-saturation ceramic outside the plate, label, flag and cavity).
from PIL import Image,ImageFilter,ImageDraw;import numpy as np,json
M=Image.open('img/m7-master.jpg').convert('RGB');OX,OY=100,40;CW,CH=2100,1181
TINT={'grok':'#5b5e66','claude':'#dd6a3a','gpt':'#1f9a70','kimi':'#3a63d6'}
def pts(a):
  isg=lambda p:p[0]>140 and p[1]>95 and p[0]-p[2]>70
  def walk(x,y,dx,dy):
    while not isg(a[y,x]):x+=dx;y+=dy
    return x if dx else y
  X=[walk(1900,240,1,0),walk(1065,580,-1,0),walk(1065,580,1,0),walk(1820,580,-1,0),walk(1820,580,1,0),walk(1500,900,-1,0)]
  Y=[walk(1900,240,0,-1),walk(1900,240,0,1),walk(1065,580,0,-1),walk(1065,580,0,1),walk(1820,580,0,-1),walk(1820,580,0,1),walk(1500,900,0,-1)]
  return X,Y
ref=np.asarray(M.crop((OX,OY,OX+CW,OY+CH))).astype(int);RX,RY=pts(ref)
def fit(p,q):A=np.vstack([p,np.ones(len(p))]).T;return np.linalg.lstsq(A,np.array(q,float),rcond=None)[0]
def feather(size,box,r):
  m=Image.new('L',size,0);ImageDraw.Draw(m).rectangle(box,fill=255);return m.filter(ImageFilter.GaussianBlur(r))
rep={}
for m,col in TINT.items():
  P=Image.open(f'img/p7-{m}-a.jpg').convert('RGB');k=P.width/CW
  small=np.asarray(P.resize((CW,CH),Image.LANCZOS)).astype(int);QX,QY=pts(small)
  ax,bx=fit(RX,QX);ay,by=fit(RY,QY)
  # resample the full-res pass into master-crop coords: crop pixel p -> pass pixel (a p + b) * k
  W=P.transform((CW,CH),Image.AFFINE,(ax*k,0,bx*k,0,ay*k,by*k),Image.BICUBIC)
  QX2,QY2=pts(np.asarray(W).astype(int))
  rep[m]={'x':[round(ax,5),round(bx,2)],'y':[round(ay,5),round(by,2)],'resid_x':[q-r for q,r in zip(QX2,RX)],'resid_y':[q-r for q,r in zip(QY2,RY)]}
  full=Image.new('RGB',M.size);full.paste(W,(OX,OY))
  out=M.copy()
  for box,fr in [((195,790,640,1140),6),((842,277,2114,451),4)]:
    out=Image.composite(full,out,feather(M.size,box,fr))
  # the plate: nano-banana-pro's engraving on the master's own plate crop (it keeps the framing to the pixel), laid back whole
  pl=Image.open(f"img/pl7-{m}-{'nb3' if m=='grok' else 'nb2'}.jpg").convert('RGB').resize((630,630),Image.LANCZOS)
  plf=Image.new('RGB',M.size);plf.paste(pl,(120,200));out=Image.composite(plf,out,feather(M.size,(150,228,720,760),4))
  # the tint, last: the ceramic only (pale, not gold), outside the plate face, the flag, the label and the cavity
  a=np.asarray(out).astype(float);r,g,b=a[...,0],a[...,1],a[...,2];mx=a.max(2);mn=a.min(2);sat=(mx-mn)/(mx+1)
  cer=(((r-b)<62)&(a.mean(2)>88)).astype(float)
  keep=Image.new('L',M.size,0);d=ImageDraw.Draw(keep)
  d.rectangle((44,112,3716,1382),fill=255)          # the ceramic body
  for bx0 in [(176,252,694,734),(214,812,622,1118),(762,204,2722,1284),(2780,178,3658,1258)]:d.rectangle(bx0,fill=0)
  km=np.asarray(keep.filter(ImageFilter.GaussianBlur(3))).astype(float)/255*cer
  km=np.asarray(Image.fromarray((km*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float)/255
  t=np.array([int(col[i:i+2],16) for i in (1,3,5)],float)/255
  tinted=a*(1-km[...,None])+(a*t*1.18).clip(0,255)*km[...,None]
  out=Image.fromarray(tinted.clip(0,255).astype(np.uint8))
  out.save(f'img/chip7-{m}-full.jpg',quality=93)
  print(m,rep[m])
json.dump(rep,open('compose.json','w'),indent=1)
