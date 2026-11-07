# /usr/bin/python3 profx.py img y0 y1 : x edges (cream vertical lines) inside the band
import sys
from PIL import Image
import numpy as np
im=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int);H,W,_=im.shape
R,G,B=im[...,0],im[...,1],im[...,2];m=(R>110)&(G>90)&(R-B>20)&(R+G>240)
y0,y1=int(float(sys.argv[2])*H),int(float(sys.argv[3])*H)
px=m[y0:y1].mean(0);pk=[x for x in range(2,W-2) if px[x]>.5 and px[x]>=px[x-1] and px[x]>=px[x+1]]
g=[];[g.append([x]) if not g or x-g[-1][-1]>5 else g[-1].append(x) for x in pk]
print([ (round(sum(a)/len(a)), round(sum(a)/len(a)/W,4)) for a in g])
