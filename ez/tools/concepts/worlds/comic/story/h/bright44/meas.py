# /usr/bin/python3 meas.py img/x.jpg x0 y0 x1 y1 : the bounding box of the gold (brass) pixels inside a region (a plate's painted face), and of
# the dark ink outline around it; prints both in the picture's pixels
import sys,numpy as np
from PIL import Image
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int);x0,y0,x1,y1=map(int,sys.argv[2:6]);a=im[y0:y1,x0:x1]
r,g,b=a[...,0],a[...,1],a[...,2];gold=(r>150)&(g>110)&(b<120)&(r-b>70)
cols=np.where(gold.mean(0)>.5)[0];rows=np.where(gold.mean(1)>.5)[0]
print('gold face: x %d-%d  y %d-%d'%(x0+cols.min(),x0+cols.max(),y0+rows.min(),y0+rows.max()))
