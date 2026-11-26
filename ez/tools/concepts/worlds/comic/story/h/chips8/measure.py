# /usr/bin/python3 measure.py img/<master>.jpg 'name:x,y;...' : from each approximate centre, walk out to the gold bezel (inner edge) and past it (outer edge)
import sys,json;from PIL import Image;import numpy as np
a=np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
isg=lambda p:p[0]>130 and p[1]>85 and p[0]-p[2]>60
def walk(x,y,dx,dy,want,lim=900):
  for i in range(lim):
    if isg(a[y,x])==want:return x,y
    x+=dx;y+=dy
  return x,y
out={}
for it in sys.argv[2].split(';'):
  n,c=it.split(':');x,y=map(int,c.split(','))
  inn=[walk(x,y,-1,0,True)[0]+1,walk(x,y,0,-1,True)[1]+1,walk(x,y,1,0,True)[0],walk(x,y,0,1,True)[1]]
  o=[walk(inn[0]-1,y,-1,0,False)[0]+1,walk(x,inn[1]-1,0,-1,False)[1]+1,walk(inn[2],y,1,0,False)[0],walk(x,inn[3],0,1,False)[1]]
  out[n]={'in':inn,'out':o};print(n,'in',inn,'out',o,'in wh',inn[2]-inn[0],inn[3]-inn[1])
json.dump(out,open(sys.argv[1].replace('.jpg','.geom.json'),'w'))
