#!/usr/bin/python3
# where each opening panel's blank board is (the line under the heading is lettered on it): python3 opfind.py -> op.json
# the board is the largest component of its material's colour in the upper part of the picture; the text box is inset from its edge.
import os,json,glob
from PIL import Image
import numpy as np
from collections import deque
def comps(m):
  h,w=m.shape;lab=np.zeros((h,w),int);out=[];k=0
  for y0 in range(h):
    for x0 in range(w):
      if m[y0,x0] and not lab[y0,x0]:
        k+=1;q=deque([(y0,x0)]);lab[y0,x0]=k;bx=[x0,y0,x0,y0];n=0
        while q:
          y,x=q.popleft();n+=1
          if x<bx[0]:bx[0]=x
          if y<bx[1]:bx[1]=y
          if x>bx[2]:bx[2]=x
          if y>bx[3]:bx[3]=y
          for dy,dx in((1,0),(-1,0),(0,1),(0,-1)):
            ny,nx=y+dy,x+dx
            if 0<=ny<h and 0<=nx<w and m[ny,nx] and not lab[ny,nx]:lab[ny,nx]=k;q.append((ny,nx))
        if n>12:out.append((bx,n))
  return out
D=os.path.dirname(os.path.abspath(__file__))
def black(a):return a.max(axis=2)<52
def slate(a):r,g,b=a[...,0],a[...,1],a[...,2];return (a.max(axis=2)<105)&(g>r+6)&(a.max(axis=2)>18)
def yellow(a):r,g,b=a[...,0],a[...,1],a[...,2];return (r>205)&(g>175)&(b<130)
def red(a):r,g,b=a[...,0],a[...,1],a[...,2];return (r>190)&(g<85)&(b<85)
MAT={'b1':black,'b1h':black,'b2':slate,'b3':black,'gal':yellow,'mid':red}
INSET={'b1':(.07,.14),'b1h':(.07,.14),'b2':(.06,.1),'b3':(.02,.12),'gal':(.08,.18),'mid':(.1,.18)}
# the heading's box (left, top, right) on the calm wall or sky; set per panel after looking at it
HD={'p':[.04,.03,.96],'d':[.025,.045,.5]}
HDX={'o-b1-d':[.02,.03,.36],'o-b3-d':[.02,.03,.52],'o-mid-d':[.02,.04,.45]}
# boards partly behind a figure: the clear part only
BDX={'o-b2-p':[.16,.43,.74,.615],'o-b2-d':[.585,.2,.755,.52]}
out={}
for fn in sorted(glob.glob(D+'/img/o-*.jpg')):
  n=os.path.basename(fn)[:-4];t,a=n.split('-')[1:];im=Image.open(fn).convert('RGB');W,H=im.size
  sm=np.asarray(im.resize((W//4,H//4))).astype(int);m=MAT[t](sm);m[int(m.shape[0]*.72):]=False
  C=comps(m);h,w=m.shape
  if not C:print('none',n);continue
  bx=max(C,key=lambda c:c[1])[0];b=BDX.get(n) or [bx[0]/w,bx[1]/h,(bx[2]+1)/w,(bx[3]+1)/h];ix,iy=INSET[t];bw,bh=b[2]-b[0],b[3]-b[1]
  out[n]={'ar':f'{W}/{H}','bd':[round(b[0]+bw*ix,4),round(b[1]+bh*iy,4),round(b[2]-bw*ix,4),round(b[3]-bh*iy,4)],'hd':HDX.get(n,HD[a])}
  print(n,[round(v,3) for v in b])
json.dump(out,open(D+'/op.json','w'),indent=0)
