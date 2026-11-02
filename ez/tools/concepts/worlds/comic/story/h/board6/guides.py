# python3 guides.py: typeset layout guides (2048 px) for gpt-image-2's first reference image. Writes guide-*.png and guides.json (the planned places).
from PIL import Image,ImageDraw,ImageFilter
import json,numpy as np
N=2048;G={}
def H(src,dst):
  A=[]
  for (x,y),(u,v) in zip(src,dst):A+=[[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]
  h=np.linalg.solve(np.array(A,float),np.array([c for p in dst for c in p],float));return np.append(h,1).reshape(3,3)
def P(h,u,v):x,y,w=h@[u,v,1];return (x/w,y/w)
def quad(h,r):x0,y0,x1,y1=r;return [P(h,x0,y0),P(h,x1,y0),P(h,x1,y1),P(h,x0,y1)]
CH=2.474
def layout(h,lift):
  # plane units: board 0..1000 wide, 0..1000 tall. rank window left (40..190), chip right (230..960), rows down
  S=[];Wn=[];rows=[(150,335),(365,550),(580,765),(795,980)]
  for i,(y0,y1) in enumerate(rows):
    hh=y1-y0-24;w=hh*CH;cx=600
    S.append([cx-w/2,y0+12,cx+w/2,y1-12]);Wn.append([60,y0+35,200,y1-35])
  return S,Wn
def draw(name,h,lift,bg_q):
  im=Image.new('RGB',(N,N),(0,0,0));d=ImageDraw.Draw(im)
  d.polygon(bg_q,fill=(22,78,38))
  S,Wn=layout(h,lift);out={'s':[],'w':[]}
  for i,(r,w) in enumerate(zip(S,Wn)):
    gold=i==0;pad=14
    d.polygon(quad(h,[r[0]-pad,r[1]-pad,r[2]+pad,r[3]+pad]),fill=(214,164,44) if gold else (92,92,98))
    d.polygon(quad(h,r),fill=(10,10,10))
    q=quad(h,r);out['s'].append(q)
    if gold and lift:
      # a column of warm light rising from the gold socket: the leader's chip floats in it (laid by code)
      lq=[(x,y-lift) for x,y in q];col=Image.new('RGBA',(N,N),(0,0,0,0));cd=ImageDraw.Draw(col)
      cd.polygon([lq[0],lq[1],q[1],q[2],q[3],q[0]],fill=(255,222,120,150));im.paste(col,(0,0),col);d=ImageDraw.Draw(im)
    d.polygon(quad(h,[w[0]-8,w[1]-8,w[2]+8,w[3]+8]),fill=(200,150,40));wq=quad(h,w);d.polygon(wq,fill=(16,16,20));out['w'].append(wq)
  im.save(name+'.png');G[name]=out
# E1: looking down the rack. A board standing up, camera above looking down: the top row is nearest (widest), rows recede downward
bq=[(30,150),(2018,150),(1760,1990),(290,1990)]
h=H([(0,0),(1000,0),(1000,1000),(0,1000)],bq);draw('guide-e1',h,110,bq)
# E2: head-on, a slight tilt; the top socket gold, its chip lifted on light
bq2=[(70,90),(1978,90),(1940,1990),(108,1990)]
h2=H([(0,0),(1000,0),(1000,1000),(0,1000)],bq2);draw('guide-e2',h2,80,bq2)
json.dump(G,open('guides.json','w'))
# E3: E's hero angle kept: the board turned away to the left (the chips' side nearest), #1 still at the top of the stack
G=json.load(open('guides.json'))
bq3=[(120,420),(1990,90),(1990,2010),(120,1760)]
h3=H([(0,0),(1000,0),(1000,1000),(0,1000)],bq3);draw('guide-e3',h3,120,bq3)
json.dump(G,open('guides.json','w'))
