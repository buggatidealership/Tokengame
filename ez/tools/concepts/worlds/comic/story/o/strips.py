# /usr/bin/python3 strips.py <out dir>: what each take does to one picture, composed exactly as the page lays it
# (the still, the layer over it with the tile's own cover crop): R57 GE Vernova's tile and the R55 film panel.
import sys,json,os
from PIL import Image,ImageSequence,ImageDraw
H=os.path.dirname(os.path.abspath(__file__));C=H+'/cg/';OUT=sys.argv[1]
def comp(k,lay,a=1.0):
  st=Image.open(C+f'r{k}-still.jpg').convert('RGBA');l=lay.convert('RGBA').resize(st.size)
  if a<1:al=l.split()[3].point(lambda v:int(v*a));l.putalpha(al)
  st.alpha_composite(l);return st.convert('RGB')
def crop(im,tile):
  if not tile:return im
  w,h=im.size;ch=round(w*96/111);t=(h-ch)//2;return im.crop((0,t,w,t+ch))
for k,tile in [('57',True),('55P',False),('54',True)]:
  fr=[f.copy() for f in ImageSequence.Iterator(Image.open(C+f'r{k}.webp'))];lit=Image.open(C+f'r{k}-lit.webp')
  st=Image.open(C+f'r{k}-still.jpg').convert('RGB')
  sets={'o1':[crop(st,tile),crop(comp(k,lit,.45),tile),crop(comp(k,lit,.85),tile)],'mv':[crop(comp(k,fr[i]),tile) for i in (0,len(fr)//3,2*len(fr)//3)]}
  for nm,ims in sets.items():
    w=sum(i.width for i in ims)+8*(len(ims)-1);can=Image.new('RGB',(w,ims[0].height),(24,22,28));x=0
    for i in ims:can.paste(i,(x,0));x+=i.width+8
    can.save(f'{OUT}/strip-{k}-{nm}.png')
print('ok')
