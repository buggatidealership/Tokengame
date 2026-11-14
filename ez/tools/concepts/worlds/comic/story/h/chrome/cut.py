# /usr/bin/python3 cut.py : cut the flat black screen/hole out of a painting (flood fill from a seed), save img/<n>-cut.png + bbox json
from PIL import Image,ImageFilter,ImageDraw
import json
S={'fm-theatre':(.5,.5),'fm-theatre-2k':(.5,.5),'fm-tv':(.4,.45),'fm-drivein':(.6,.25),'fm-torn':(.42,.42)}
out={}
for n,(sx,sy) in S.items():
  im=Image.open(f'img/{n}.jpg').convert('RGB');W,H=im.size
  L=im.convert('L').point(lambda v:255 if v<(12 if n=='fm-drivein' else 34) else 0)
  m=L.copy();ImageDraw.floodfill(m,(int(sx*W),int(sy*H)),128)
  m=m if n!='fm-drivein' else Image.composite(Image.new('L',m.size,0),m,Image.new('L',m.size,0).point(lambda v:0).transform(m.size,Image.EXTENT,(0,0,1,1)) ) if False else m
  if n=='fm-drivein':
    from PIL import ImageDraw as D2;dd=D2.Draw(m);dd.rectangle([0,0,int(.255*W),H],fill=0)
  hole=m.point(lambda v:255 if v==128 else 0).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
  a=hole.point(lambda v:255-v);rgba=im.copy();rgba.putalpha(a);rgba.save(f'img/{n}-cut.png',optimize=True)  # converted to .webp after (see README in REPORT)
  bb=hole.point(lambda v:255 if v>128 else 0).getbbox();out[n]=[round(bb[0]/W*100,2),round(bb[1]/H*100,2),round(bb[2]/W*100,2),round(bb[3]/H*100,2),W,H]
  print(n,out[n])
json.dump(out,open('cut.json','w'))
# the 2K theatre was painted on white: clear the white outside the arch from the corners too
im=Image.open('img/fm-theatre-2k-cut.png');W,H=im.size;L=im.convert('RGB').convert('L').point(lambda v:255 if v>236 else 0)
m=L.copy()
for c in [(2,2),(W-3,2),(2,H-3),(W-3,H-3)]:
  if m.getpixel(c)==255:ImageDraw.floodfill(m,c,128)
bg=m.point(lambda v:255 if v==128 else 0).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
a=Image.composite(Image.new('L',im.size,0),im.split()[3],bg);im.putalpha(a);im.save('img/fm-theatre-2k-cut.png',optimize=True)
