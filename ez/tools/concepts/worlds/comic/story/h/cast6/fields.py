#!/usr/bin/python3
# where each painting actually put its fields (ribbon, version tag, P&L, right way, best call, seal, strip): python3 fields.py
# writes fields.json {ticket:{field:[x0,y0,x1,y1]}}. Each field's material has a colour of its own (gold, brass, black board, red sign,
# blue board); the components of that colour (at quarter size) are matched to the guide's rect by overlap; no good match -> the guide.
import os,json,glob
from PIL import Image
import numpy as np
from collections import deque
D=os.path.dirname(os.path.abspath(__file__));L=json.load(open(D+'/layout.json'))
def gold(a):r,g,b=a[...,0],a[...,1],a[...,2];return (r>150)&(g>120)&(b<130)&(r-b>60)
def black(a):return a.max(axis=2)<48
def red(a):r,g,b=a[...,0],a[...,1],a[...,2];return (r>170)&(g<80)&(b<80)
def blue(a):r,g,b=a[...,0],a[...,1],a[...,2];return (b>150)&(r<90)&(b-r>90)
def dred(a):r,g,b=a[...,0],a[...,1],a[...,2];return (r>110)&(g<60)&(b<60)
MAT0={'gal':{'ribbon':gold,'ver':dred,'pnl':gold,'rw':gold,'bc':gold},
     'ex':{'ribbon':gold,'ver':gold,'pnl':black,'rw':black,'bc':black},
     'mid':{'ribbon':gold,'ver':red,'pnl':red,'rw':blue,'bc':blue}}
MAT={'base':MAT0['ex'],'lit':MAT0['ex']}
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
def iou(a,b):
  ix=max(0,min(a[2],b[2])-max(a[0],b[0]));iy=max(0,min(a[3],b[3])-max(a[1],b[1]));i=ix*iy
  return i/((a[2]-a[0])*(a[3]-a[1])+(b[2]-b[0])*(b[3]-b[1])-i+1e-9)
out={}
for fn in sorted(glob.glob(D+'/img/t-*.jpg')):
  n=os.path.basename(fn)[:-4];w,m=n.split('-')[1:];S=L['p']
  im=Image.open(fn).convert('RGB');W,H=im.size;sm=np.asarray(im.resize((W//4,H//4),Image.BILINEAR)).astype(int);h,ww=sm.shape[:2]
  res={};cache={}
  for f,fnc in MAT[w].items():
    if fnc not in cache:
      mk=fnc(sm);mk[:, :int(S['stub'][2]*ww)+2]=False;cache[fnc]=[([b[0]/ww,b[1]/h,(b[2]+1)/ww,(b[3]+1)/h],k) for b,k in comps(mk)]
  # the painter often draws the frame larger and pushes the fields down: find the one shift that fits the fields best
  sh=lambda g,dy,k:[g[0],g[1]*k+dy,g[2],g[3]*k+dy]
  def score(dy,k):return sum(max([iou(c[0],sh(S[f],dy,k)) for c in cache[fnc]],default=0) for f,fnc in MAT[w].items())
  dy,k=max(((d/200,k/100) for d in range(-10,31) for k in (94,97,100,103,106)),key=lambda p:score(*p))
  for f,fnc in MAT[w].items():
    g=sh(S[f],dy,k);best=max(cache[fnc],key=lambda c:iou(c[0],g),default=None)
    if best and iou(best[0],g)>.2:res[f]=[round(v,4) for v in best[0]]
    else:res[f]=[round(v,4) for v in g];print('guide',n,f,round(iou(best[0],g),2) if best else '-')
  res['dy']=[dy,k]
  # the frame's window: the largest clear hole in the cut-out that does not touch the edge
  al=np.asarray(Image.open(f'{D}/cut/{n}.webp').getchannel('A').resize((W//4,H//4)))<128;hw,hh=al.shape[1],al.shape[0]
  holes=[(b,k) for b,k in comps(al) if b[0]>1 and b[1]>1 and b[2]<hw-2 and b[3]<hh-2]
  if holes:b=max(holes,key=lambda c:c[1])[0];res['win']=[round(b[0]/hw,4),round(b[1]/hh,4),round((b[2]+1)/hw,4),round((b[3]+1)/hh,4)]
  else:print('no window',n)
  out[n]=res
json.dump(out,open(D+'/fields.json','w'))
