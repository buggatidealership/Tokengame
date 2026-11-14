# /usr/bin/python3 prof.py img [x0 x1 frac]: prints y peaks of cream lines (fraction of image), then for each row band the x edges
import sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int);H,W,_=im.shape
R,G,B=im[...,0],im[...,1],im[...,2]
m=(R>120)&(G>100)&(R-B>25)&(R+G>260)
x0,x1=[float(a) for a in sys.argv[2:4]] if len(sys.argv)>3 else (.3,.7)
py=m[:,int(W*x0):int(W*x1)].mean(1)
pk=[y for y in range(2,H-2) if py[y]>.35 and py[y]>=py[y-1] and py[y]>=py[y+1]]
# merge
g=[];[g.append([y]) if not g or y-g[-1][-1]>4 else g[-1].append(y) for y in pk]
ys=[round(sum(a)/len(a)) for a in g]
print('W,H',W,H);print('ylines',[(y,round(y/H,4),round(float(py[y]),2)) for y in ys])
