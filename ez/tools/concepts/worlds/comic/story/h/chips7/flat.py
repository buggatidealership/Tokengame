# /usr/bin/python3 flat.py img... : test 5. Grain is blurred out first (Gaussian 3px at 1200 wide), so a uniform but grainy lid counts as flat. On a 1200px-wide copy, 12x12px cells whose luminance spread (std) is under 4 are "flat"; flat cells
# that touch form regions (4-neighbour flood fill). Prints the largest flat region as a share of the object (pixels brighter than the void).
import sys;from PIL import Image,ImageFilter;import numpy as np
from collections import deque
for f in sys.argv[1:]:
  im=Image.open(f).convert('L');im=im.resize((1200,round(im.height*1200/im.width)),Image.LANCZOS).filter(ImageFilter.GaussianBlur(3));a=np.asarray(im).astype(float)
  c=12;H,W=a.shape[0]//c,a.shape[1]//c;b=a[:H*c,:W*c].reshape(H,c,W,c)
  sd=b.std(axis=(1,3));mn=b.mean(axis=(1,3))
  obj=mn>14;flat=(sd<4)&obj
  seen=np.zeros_like(flat);best=0;tot=0
  for y in range(H):
    for x in range(W):
      if flat[y,x] and not seen[y,x]:
        q=deque([(y,x)]);seen[y,x]=1;n=0
        while q:
          yy,xx=q.popleft();n+=1
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            Y,X=yy+dy,xx+dx
            if 0<=Y<H and 0<=X<W and flat[Y,X] and not seen[Y,X]:seen[Y,X]=1;q.append((Y,X))
        best=max(best,n);tot+=n
  print(f.split('/')[-1],'largest flat region %.1f%% of the object, all flat cells %.1f%%'%(best/obj.sum()*100,tot/obj.sum()*100))
