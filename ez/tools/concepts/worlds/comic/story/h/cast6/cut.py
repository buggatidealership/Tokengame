#!/usr/bin/python3
# cut the painted pieces out of their white grounds: python3 cut.py
#  t-*  tickets: the ground outside (flood from the border) and the frame's window (flood from the window's centre) made clear; size kept,
#       so layout.json's fractions still map onto the painting
#  g-*  golden stubs: the white around the stub made clear, size kept (it lies exactly over the ticket's own stub)
#  s-* f-* k-*  signs, flags, stamps: cut and cropped to their ink
#  b-*  grounds: copied as they are
import os,glob,json,shutil
from PIL import Image,ImageDraw,ImageFilter
import numpy as np
D=os.path.dirname(os.path.abspath(__file__));L=json.load(open(D+'/layout.json'));os.makedirs(D+'/cut',exist_ok=True)
def clear(im,seeds):
  a=np.asarray(im.convert('RGB')).astype(int);white=(a.min(axis=2)>214)&((a.max(axis=2)-a.min(axis=2))<34)
  m=Image.fromarray((white*255).astype('uint8')).copy();W,H=m.size
  for s in seeds:
    x,y=int(s[0]),int(s[1])
    if m.getpixel((x,y))==255:ImageDraw.floodfill(m,(x,y),128)
  bg=np.asarray(m)==128
  al=Image.fromarray(((~bg)*255).astype('uint8')).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.7))
  o=im.convert('RGB').copy();o.putalpha(al);return o
def border(W,H,st=8):return [(x,y) for x in range(2,W-2,st) for y in (2,H-3)]+[(x,y) for y in range(2,H-2,st) for x in (2,W-3)]
for fn in sorted(glob.glob(D+'/img/*.jpg')):
  n=os.path.basename(fn)[:-4];im=Image.open(fn);W,H=im.size;k=n[0];out=f'{D}/cut/{n}.webp'
  if os.path.exists(out) and os.path.getmtime(out)>os.path.getmtime(fn):continue
  if k=='t':
    w=L['p']['win'];o=clear(im,border(W,H)+[((w[0]+w[2])/2*W,(w[1]+w[3])/2*H),((w[0]*.7+w[2]*.3)*W,(w[1]*.6+w[3]*.4)*H),((w[0]*.3+w[2]*.7)*W,(w[1]*.3+w[3]*.7)*H)])
    o.save(out,quality=90)
  elif k=='g':clear(im,border(W,H)).save(out,quality=90)
  elif k in 'sfkch':
    o=clear(im,border(W,H));bb=o.getchannel('A').point(lambda v:255 if v>128 else 0).getbbox();o.crop(bb).save(out,quality=90)
  elif k=='p':shutil.copy(fn,f'{D}/cut/{n}.jpg')
  print('cut',n)
