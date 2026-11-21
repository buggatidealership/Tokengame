# /usr/bin/python3 fit.py : fits a homography that turns board6 E3 (the live frame-4 painting's 2880 master) full frontal.
# Model: the three seated sockets (chips #2-#4, board6's cq[1..3]) are equal rectangles of the chip's aspect (3760:1520) stacked at an equal pitch;
# the rank windows (wq) are equal rectangles at the same pitch, left of them. Least squares over the 28 corners; the pitch, the windows' size and place are free.
import numpy as np,json
E3={"cq":[[[1345,394],[2415,254],[2429,522],[1329,640]],[[1325,1049],[2392,971],[2388,1244],[1312,1304]],[[1284,1515],[2380,1485],[2396,1761],[1259,1774]],[[1227,1983],[2369,2030],[2377,2342],[1207,2281]]],
 "wq":[[[520,740],[805,710],[790,895],[500,930]],[[460,1148],[732,1124],[708,1320],[428,1340]],[[392,1568],[664,1564],[640,1768],[360,1772]],[[316,1988],[596,1996],[560,2216],[280,2200]]]}
AS=3760/1520
def dlt(src,dst):
  A=[]
  for (x,y),(u,v) in zip(src,dst):
    A.append([x,y,1,0,0,0,-u*x,-u*y,-u]);A.append([0,0,0,x,y,1,-v*x,-v*y,-v])
  _,_,V=np.linalg.svd(np.array(A,float));H=V[-1].reshape(3,3);return H/H[2,2]
def ap(H,p):p=np.array(p,float);q=np.c_[p,np.ones(len(p))]@H.T;return q[:,:2]/q[:,2:]
def model(P,wx0,wx1,wy0,wh):
  W=1000;Hc=W/AS;dst=[];src=[]
  for i in (1,2,3):
    y=(i-1)*P;src+=E3['cq'][i];dst+=[[0,y],[W,y],[W,y+Hc],[0,y+Hc]]
  for i in range(4):
    y=(i-1)*P+wy0;src+=E3['wq'][i];dst+=[[wx0,y],[wx1,y],[wx1,y+wh],[wx0,y+wh]]
  return src,dst
best=None
for P in np.arange(440,640,4):
 for wy0 in np.arange(-40,80,8):
  for wh in np.arange(200,340,10):
   for wx0 in np.arange(-900,-500,20):
    wx1=wx0+wh*1.25
    src,dst=model(P,wx0,wx1,wy0,wh);H=dlt(src,dst);e=np.abs(ap(H,src)-np.array(dst)).max()
    if best is None or e<best[0]:best=(e,P,wx0,wx1,wy0,wh,H)
print('coarse',best[:6])
# refine with scipy-free coordinate descent on window aspect too
e,P,wx0,wx1,wy0,wh,H=best
def err(p):
  P,wx0,wx1,wy0,wh=p;src,dst=model(P,wx0,wx1,wy0,wh);H=dlt(src,dst);d=ap(H,src)-np.array(dst);return np.sqrt((d**2).mean()),H
p=np.array([P,wx0,wx1,wy0,wh],float);st=np.array([8,20,20,8,10],float)
cur,_=err(p)
for it in range(400):
  imp=False
  for k in range(5):
    for s in (1,-1):
      q=p.copy();q[k]+=s*st[k];e2,_=err(q)
      if e2<cur:cur,p,imp=e2,q,True
  if not imp:st/=2
  if st.max()<.05:break
cur,H=err(p);print('rms',round(cur,2),'params',np.round(p,1))
src,dst=model(*p);print('max err px (frontal units)',np.abs(ap(H,src)-np.array(dst)).max().round(1))
json.dump({'H':H.tolist(),'P':p[0],'w':[p[1],p[2],p[3],p[4]],'Hc':1000/AS},open('fit.json','w'))
