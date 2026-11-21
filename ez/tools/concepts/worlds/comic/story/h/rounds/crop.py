#!/usr/bin/python3
# crop.py: cut the flat letterbox bands the model left above and below the art, save <name>-c.jpg (q85)
import glob,numpy as np;from PIL import Image
def run(m,ref):
  n=0
  for v in m:
    if np.abs(v-ref).max()<16:n+=1
    else:break
  return n
for f in sorted(glob.glob('img/t[0-9]-[0-9]*.jpg')):
  if f.endswith('-c.jpg'):continue
  im=Image.open(f).convert('RGB');a=np.asarray(im).astype(float);m=a[:,int(a.shape[1]*.1):int(a.shape[1]*.9)].mean(1);H=len(m)
  top=run(m[6:],m[6:20].mean(0))+6;bot=H-run(m[::-1][6:],m[::-1][6:20].mean(0))-6
  if top>H*.35:top=0
  if bot<H*.65:bot=H
  top=top+6 if top>12 else 0;bot=bot-6 if bot<H-12 else H
  c=im.crop((0,top,im.width,bot));s=640/c.width;c.resize((640,int(c.height*s)),Image.LANCZOS).save(f[:-4]+'-c.jpg',quality=85);print(f,top,bot,H)
