# /usr/bin/python3 boxes.py : each window's inner box (the glass inside its gold bezel), found by walking out from a seed point until gold
import sys,json;from PIL import Image;import numpy as np
a=np.asarray(Image.open(sys.argv[1] if len(sys.argv)>1 else 'img/m7-master.jpg').convert('RGB')).astype(int)
isg=lambda p:p[0]>140 and p[1]>95 and p[0]-p[2]>70
def walk(x,y,dx,dy):
  while not isg(a[y,x]):x+=dx;y+=dy
  return x,y
def box(cx,cy):
  L=[];R=[];T=[];B=[]
  for o in (-0.2,0,0.2):
    pass
  l=walk(cx,cy,-1,0)[0];r=walk(cx,cy,1,0)[0]
  xs=[int(l+(r-l)*f) for f in (.25,.5,.75)]
  t=np.median([walk(x,cy,0,-1)[1] for x in xs]);b=np.median([walk(x,cy,0,1)[1] for x in xs])
  ys=[int(t+(b-t)*f) for f in (.25,.5,.75)]
  l=np.median([walk(cx,y,-1,0)[0] for y in ys]);r=np.median([walk(cx,y,1,0)[0] for y in ys])
  return [int(l)+1,int(t)+1,int(r),int(b)]
S={'name':(1400,330),'no':(2440,330),'wl':(2380,620),'pnl':(1850,1000),'plate':(420,500),'flag':(415,950)}
for i,x in enumerate([1160,1340,1530,1720,1910]):S['c%d'%i]=(x,620)
out={k:box(*v) for k,v in S.items()}
for k,v in out.items():print(k,v,'w',v[2]-v[0],'h',v[3]-v[1])
json.dump(out,open('geom.json','w'))
