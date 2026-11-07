# /usr/bin/python3 measure.py : measures the blank surfaces on every chip painting (img/*.jpg) and writes quads.json.
# Dark glass / black labels = dark connected regions not touching the border (luma < thr); the gold pad = saturated yellow region;
# the white label = bright, unsaturated region. Each region -> four corners (TL,TR,BR,BL) from its extreme points. Check images to the scratchpad.
import sys,json,glob,os,numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage as nd
S=os.environ.get('S','/tmp')
def quad(mask):
  # the region's bounding box: the paintings are near head-on, and a reflection streak can cut a corner off the dark glass
  ys,xs=np.nonzero(mask);x0,x1,y0,y1=int(xs.min()),int(xs.max()),int(ys.min()),int(ys.max())
  return [[x0,y0],[x1,y0],[x1,y1],[x0,y1]]
def regions(m,amin,H,W):
  lab,n=nd.label(m);out=[]
  for i,sl in enumerate(nd.find_objects(lab),1):
    r=lab[sl]==i;a=int(r.sum())
    if a<amin:continue
    if sl[0].start==0 or sl[1].start==0 or sl[0].stop>=H or sl[1].stop>=W:continue
    full=np.zeros((H,W),bool);full[sl]=r
    # the glass carries a pale reflection streak: fill the region's convex hull (the panels are convex), so the streak is inside
    from scipy.spatial import ConvexHull
    ys,xs=np.nonzero(full);pts=np.c_[xs,ys];h=ConvexHull(pts)
    hm=Image.new('L',(W,H),0);ImageDraw.Draw(hm).polygon([tuple(map(int,p)) for p in pts[h.vertices]],fill=1);full=np.asarray(hm).astype(bool);out.append((int(full.sum()),full,sl))
  return out
R={}
for f in sorted(glob.glob('img/*.jpg')):
  if '-2k' in f:continue
  n=os.path.basename(f)[:-4];im=Image.open(f).convert('RGB');a=np.asarray(im).astype(int);H,W=a.shape[:2]
  L=a[...,0]*.3+a[...,1]*.59+a[...,2]*.11;mx=a.max(2);mn=a.min(2);sat=(mx-mn)/np.maximum(mx,1)
  thr=(22 if 'grok' in n else 34) if not n.startswith('o-') else (40 if 'grok' in n else 58)
  dark=nd.binary_opening(L<thr,iterations=2)

  rs=regions(dark,W*H//900,H,W)
  rs=[r for r in rs if r[0]<W*H*.4]
  out={}
  if n.startswith('n-'):
    rs.sort(key=lambda r:-r[0]);die=rs[0];out['die']=quad(die[1])
    lab=[r for r in rs[1:] if (r[2][1].stop-r[2][1].start)>2.5*(r[2][0].stop-r[2][0].start)]
    if lab:out['label']=quad(max(lab,key=lambda r:r[0])[1])
    gold=(sat>.5)&(a[...,0]>170)&(a[...,1]>130)&(a[...,2]<120);gold[int(H*.3):]=False;gold[:,int(W*.4):]=False
    g=regions(nd.binary_opening(gold,iterations=3),400,H,W)
    if g:out['pad']=quad(max(g,key=lambda r:r[0])[1])
    wh=(L>185)&(sat<.18);wh[int(H*.3):]=False;wh[:,:int(W*.55)]=False
    w=regions(nd.binary_opening(wh,iterations=2),400,H,W)
    if w:out['tag']=quad(max(w,key=lambda r:r[0])[1])
  elif n.startswith('o-'):
    rs.sort(key=lambda r:r[2][1].start);big=[r for r in rs if r[0]>W*H*.01]
    rect=[r for r in big if (r[2][1].stop-r[2][1].start)>1.3*(r[2][0].stop-r[2][0].start)]
    rnd=[r for r in big if r not in rect]
    if len(rect)>=2:out['left']=quad(rect[0][1]);out['right']=quad(rect[-1][1])
    if rnd:
      c=max(rnd,key=lambda r:r[0]);ys,xs=np.nonzero(c[1]);out['win']=[int(xs.mean()),int(ys.mean()),int((xs.max()-xs.min())/2),int((ys.max()-ys.min())/2)]
  else:
    big=sorted([r for r in rs if r[0]>W*H*.015],key=lambda r:-r[0])[:4]
    big.sort(key=lambda r:((r[2][0].start*4)//H,r[2][1].start));out['dies']=[quad(r[1]) for r in big]
    small=[r for r in rs if r[0]<W*H*.015 and (r[2][1].stop-r[2][1].start)>3*(r[2][0].stop-r[2][0].start)]
    small.sort(key=lambda r:((r[2][0].start*4)//H,r[2][1].start));out['labels']=[quad(r[1]) for r in small[:4]]
  R[n]=out;d=ImageDraw.Draw(im)
  for k,v in out.items():
    vs=v if k in('dies','labels') else [v]
    for q in vs:
      if len(q)==4 and isinstance(q[0],list):d.polygon([tuple(p) for p in q],outline=(255,0,255),width=3)
      elif len(q)==4:d.ellipse([q[0]-q[2],q[1]-q[3],q[0]+q[2],q[1]+q[3]],outline=(255,0,255),width=3)
  im.save(f'{S}/q-{n}.png')
# hand measures (gridded 2x crops): the big chip's dies and labels; the EPROM labels the detector merged, mirrored about the window
R['b-tall']={'dies':[[[204,296],[353,296],[353,441],[204,441]],[[420,295],[572,295],[572,441],[420,441]],[[201,525],[354,525],[354,680],[201,680]],[[419,525],[575,525],[575,681],[419,681]]],
 'labels':[[[216,474],[343,474],[343,503],[216,503]],[[429,474],[557,474],[557,504],[429,504]],[[214,711],[342,711],[342,742],[214,742]],[[430,711],[559,711],[559,742],[430,742]]]}
R['b-wide']={'dies':[[[295,239],[430,239],[431,396],[281,396]],[[480,239],[615,239],[620,396],[470,396]],[[664,240],[800,240],[808,395],[662,396]],[[849,240],[984,240],[998,395],[849,395]]],
 'labels':[[[287,450],[415,450],[415,476],[287,476]],[[476,450],[610,450],[610,476],[476,476]],[[667,450],[800,450],[800,476],[667,476]],[[864,450],[994,450],[994,476],[864,476]]]}
for k in ('o-grok-lit','o-kimi-lit'):
  cx=R[k]['win'][0];r=R[k]['right'];R[k]['left']=[[2*cx-r[1][0],r[0][1]],[2*cx-r[0][0],r[0][1]],[2*cx-r[0][0],r[2][1]],[2*cx-r[1][0],r[2][1]]]
json.dump(R,open('quads.json','w'),indent=0);print(json.dumps({k:list(v.keys())+[len(v.get('dies',[])),len(v.get('labels',[]))] for k,v in R.items()}))
