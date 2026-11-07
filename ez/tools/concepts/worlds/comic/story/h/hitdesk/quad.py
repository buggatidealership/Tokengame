# /usr/bin/python3 quad.py img mode thr seedx seedy  -> corners tl,tr,br,bl of the connected region (dark<thr or bright>thr) holding the seed
import sys,json,numpy as np
from PIL import Image,ImageDraw,ImageFilter
f,mode,thr,sx,sy=sys.argv[1],sys.argv[2],float(sys.argv[3]),int(sys.argv[4]),int(sys.argv[5])
g=Image.open(f).convert('L').filter(ImageFilter.MedianFilter(5))
b=g.point(lambda v:255 if ((v<thr) if mode=='dark' else (v>thr)) else 0)
ImageDraw.floodfill(b,(sx,sy),128)
a=np.asarray(b);ys,xs=np.nonzero(a==128);s=xs+ys;d=xs-ys
q=[(xs[s.argmin()],ys[s.argmin()]),(xs[d.argmax()],ys[d.argmax()]),(xs[s.argmax()],ys[s.argmax()]),(xs[d.argmin()],ys[d.argmin()])]
print(json.dumps([[int(x),int(y)] for x,y in q]),'area',len(xs))
