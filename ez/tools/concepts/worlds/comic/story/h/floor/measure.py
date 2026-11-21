# measure.py: find the blank slate (dark rectangle) and the clock face (pale disc) on every floor plate -> geo.json (fractions of the plate)
import json,glob,os
from PIL import Image
from collections import deque
def region(im,seed,test):
  W,H=im.size;px=im.load();seen=set([seed]);q=deque([seed]);xs=[];ys=[]
  while q:
    x,y=q.popleft();xs.append(x);ys.append(y)
    for dx,dy in((1,0),(-1,0),(0,1),(0,-1)):
      a,b=x+dx,y+dy
      if 0<=a<W and 0<=b<H and (a,b) not in seen and test(px[a,b]):seen.add((a,b));q.append((a,b))
  return min(xs),min(ys),max(xs),max(ys),len(xs)
def lum(p):return .3*p[0]+.59*p[1]+.11*p[2]
out={}
for f in sorted(glob.glob('img/fl-*.jpg')):
  im=Image.open(f).convert('RGB');W,H=im.size;s=W/300;sm=im.resize((300,round(H/s)));w,h=sm.size;px=sm.load()
  wide=f.endswith('-w.jpg')
  # slate: darkest pixel near expected centre, flood fill dark
  cy0=.47 if wide else .4;best=None
  for y in range(int(h*(cy0-.1)),int(h*(cy0+.08))):
    for x in range(int(w*.4),int(w*.6)):
      v=lum(px[x,y])
      if best is None or v<best[0]:best=(v,x,y)
  t=max(28,best[0]+22)
  x0,y0,x1,y1,n=region(sm,(best[1],best[2]),lambda p:lum(p)<t)
  # clock: brightest-ish pixel in top centre band, flood fill pale
  cy=.1 if not wide else .15;bb=None
  for y in range(int(h*.05),int(h*.3)):
    for x in range(int(w*.42),int(w*.58)):
      v=lum(px[x,y])
      if bb is None or v>bb[0]:bb=(v,x,y)
  c=region(sm,(bb[1],bb[2]),lambda p:lum(p)>bb[0]-45)
  out[os.path.basename(f)[:-4]]={'slate':[round(x0/w,4),round(y0/h,4),round((x1+1)/w,4),round((y1+1)/h,4)],'clock':[round(c[0]/w,4),round(c[1]/h,4),round((c[2]+1)/w,4),round((c[3]+1)/h,4)]}
  print(f,out[os.path.basename(f)[:-4]],n,best[0])
json.dump(out,open('geo.json','w'),indent=0)
