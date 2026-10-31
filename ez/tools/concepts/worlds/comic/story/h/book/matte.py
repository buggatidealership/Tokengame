# makes the iris plates' white hole transparent (flood fill from the centre), writes img/web/<n>.webp and prints the hole's centre and radius
import sys
from PIL import Image,ImageFilter
from collections import deque
for n in sys.argv[1:]:
  im=Image.open(f'img/{n}.jpg').convert('RGB');w,h=im.size;px=im.load()
  wh=lambda p:min(p)>200 and max(p)-min(p)<40
  seen=bytearray(w*h);q=deque([(w//2,h//2)]);seen[h//2*w+w//2]=1;xs=[];ys=[]
  while q:
    x,y=q.popleft();xs.append(x);ys.append(y)
    for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
      X,Y=x+dx,y+dy
      if 0<=X<w and 0<=Y<h and not seen[Y*w+X] and wh(px[X,Y]):seen[Y*w+X]=1;q.append((X,Y))
  m=Image.new('L',(w,h),255);mp=m.load()
  for x,y in zip(xs,ys):mp[x,y]=0
  m=m.filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(.8))
  # outside the rope, fade the plate's black into the bars' flat colour (#02040c), so the plate's square never shows
  import math
  fr=Image.new('L',(w,h),0);fp=fr.load()
  for y in range(h):
    for x in range(w):
      d=math.hypot(x-w/2,y-h/2)/w;fp[x,y]=int(255*max(0,min(1,(d-.40)/.06)))
  im=Image.composite(Image.new('RGB',(w,h),(2,4,12)),im,fr)
  im=im.convert('RGBA');im.putalpha(m);im.save(f'img/web/{n}.webp',quality=82)
  cx=(min(xs)+max(xs))/2/w;cy=(min(ys)+max(ys))/2/h;r=(max(xs)-min(xs)+max(ys)-min(ys))/4/w
  print(n,'centre',round(cx,4),round(cy,4),'radius/w',round(r,4))
