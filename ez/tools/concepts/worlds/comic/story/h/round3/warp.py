# /usr/bin/python3 warp.py x0 y0 x1 y1 outw out.jpg : renders the frontal board (frontal units of fit.json) from the E3 master
import sys,json,numpy as np
from PIL import Image
J=json.load(open('fit.json'));H=np.array(J['H']);Hi=np.linalg.inv(H)  # H: src->frontal ; we need frontal->src
x0,y0,x1,y1,ow=map(float,sys.argv[1:6]);out=sys.argv[6]
S=Image.open('../board6/img/e3a.jpg').convert('RGB')
ow=int(ow);oh=int(round(ow*(y1-y0)/(x1-x0)));s=(x1-x0)/ow
# output pixel (u,v) -> frontal (x0+u*s, y0+v*s) -> src = Hi @ [x,y,1]
T=np.array([[s,0,x0],[0,s,y0],[0,0,1]]);M=Hi@T;M=M/M[2,2]
co=[M[0,0],M[0,1],M[0,2],M[1,0],M[1,1],M[1,2],M[2,0],M[2,1]]
im=S.transform((ow,oh),Image.PERSPECTIVE,co,Image.BICUBIC)
im.save(out,quality=88);print(out,im.size)
