#!/usr/bin/python3
# balloons.py: finds the blank speech balloon painted into each pose image and writes balloons.json
# {name:[cx,cy,w,h]} in % of the image (the oval's own box, tail excluded as far as possible), so the page letters the call into it.
import json,os,glob
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__));out={}
for f in sorted(glob.glob(D+'/img/*-*-*.jpg')):
  n=os.path.basename(f)[:-4]
  if n.count('-')!=2: continue
  im=Image.open(f).convert('RGB').resize((256,256));px=im.load();N=256
  wh=[[0]*N for _ in range(N)]
  for y in range(N):
    for x in range(N):
      r,g,b=px[x,y];wh[y][x]=1 if min(r,g,b)>205 and max(r,g,b)-min(r,g,b)<40 else 0
  seen=[[0]*N for _ in range(N)];best=None
  for y in range(0,N//2):
    for x in range(0,int(N*.62)):
      if wh[y][x] and not seen[y][x]:
        st=[(x,y)];seen[y][x]=1;pts=[]
        while st:
          a,b_=st.pop();pts.append((a,b_))
          for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
            u,v=a+dx,b_+dy
            if 0<=u<N and 0<=v<N and wh[v][u] and not seen[v][u]:seen[v][u]=1;st.append((u,v))
        if not best or len(pts)>len(best):best=pts
  if not best or len(best)<400: out[n]=None;print(n,'NO BALLOON');continue
  xs=sorted(p[0] for p in best);ys=sorted(p[1] for p in best)
  q=lambda a,t:a[int(len(a)*t)]
  x0,x1,y0,y1=q(xs,.02),q(xs,.98),q(ys,.02),q(ys,.95)
  out[n]=[round((x0+x1)/2/N*100,1),round((y0+y1)/2/N*100,1),round((x1-x0)/N*100,1),round((y1-y0)/N*100,1)]
  print(n,out[n],len(best))
json.dump(out,open(D+'/balloons.json','w'),indent=0)
