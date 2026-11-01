# /usr/bin/python3 measure.py : finds the blank surfaces on every painting in img/ and writes quads.json (each quad TL,TR,BR,BL in
# painting px). n-*: die (largest dark glass), label (wide dark panel), pad (gold plate), top (the bare board right of the plate: the
# name, version and flag are printed there). o-*: pad, win (round window: cx,cy,rx,ry), label, low (bare ceramic under the plate: the
# flag decal). t-*: strip (top label), dies/wins, labels. Check images (magenta outlines) go to $S.
import json,glob,os,numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage as nd
S=os.environ.get('S','/tmp')
def bb(m):ys,xs=np.nonzero(m);return int(xs.min()),int(ys.min()),int(xs.max()),int(ys.max())
def Q(x0,y0,x1,y1):return [[x0,y0],[x1,y0],[x1,y1],[x0,y1]]
def regs(m,amin):
  lab,n=nd.label(m);H,W=m.shape;out=[]
  for i,sl in enumerate(nd.find_objects(lab),1):
    r=lab==i;a=int(r[sl].sum())
    if a<amin or sl[0].start==0 or sl[1].start==0 or sl[0].stop>=H or sl[1].stop>=W:continue
    out.append((a,)+bb(r))
  return out
R={}
for f in sorted(glob.glob('img/*.jpg')):
 try:
    n=os.path.basename(f)[:-4];im=Image.open(f).convert('RGB');a=np.asarray(im).astype(int);H,W=a.shape[:2]
    L=a[...,0]*.3+a[...,1]*.59+a[...,2]*.11;mx=a.max(2);mn=a.min(2);sat=(mx-mn)/np.maximum(mx,1)
    gold=nd.binary_opening((sat>.45)&(a[...,0]>150)&(a[...,1]>110)&(a[...,2]<130)&(L>110),iterations=4)
    thr=24 if 'grok' in n else 40
    dark=nd.binary_opening(L<thr,iterations=3)
    # the glass/labels sit inside the chip: drop dark regions touching the void (handled by the border test) and the void itself
    if n.startswith('o-grok'):thr=18
    dark=nd.binary_opening(L<thr,iterations=3)
    rs=[r for r in regs(dark,W*H//1500) if (r[3]-r[1])*(r[4]-r[2])<W*H*.3]
    o={}
    if n.startswith('n-'):
      sq=[r for r in rs if .7<(r[3]-r[1])/max(1,r[4]-r[2])<1.4];die=max(sq,key=lambda r:r[0]);o['die']=Q(*die[1:])
      wide=[r for r in rs if (r[3]-r[1])>3*(r[4]-r[2]) and r[2]>die[4]];lab=max(wide,key=lambda r:r[0]);o['label']=Q(*lab[1:])
      g=regs(gold,800);g=[r for r in g if r[2]<die[2]];pad=max(g,key=lambda r:r[0]);o['pad']=Q(*pad[1:])
      o['top']=Q(pad[3]+int(W*.025),pad[2],lab[3],pad[4])
    elif n.startswith('o-'):
      g=regs(gold,800);g=[r for r in g if r[1]<W*.3 and .6<(r[3]-r[1])/max(1,r[4]-r[2])<2.1];pad=max(g,key=lambda r:r[0]);o['pad']=Q(*pad[1:])
      lab=max([r for r in rs if r[1]>W*.38 and (r[3]-r[1])>1.4*(r[4]-r[2])],key=lambda r:r[0]);o['label']=Q(*lab[1:])
      rd=[r for r in rs if r[1]>pad[3]-20 and r[3]<lab[1]+20 and .7<(r[3]-r[1])/max(1,r[4]-r[2])<1.4];w=max(rd,key=lambda r:r[0])
      o['win']=[(w[1]+w[3])//2,(w[2]+w[4])//2,(w[3]-w[1])//2,(w[4]-w[2])//2]
      o['low']=Q(pad[1],pad[4]+int(H*.012),pad[3],lab[4])
    else:
      strip=max([r for r in rs if (r[3]-r[1])>4*(r[4]-r[2])],key=lambda r:r[3]-r[1]);o['strip']=Q(*strip[1:])
      rest=[r for r in rs if r is not strip and r[2]>strip[4]]
      big=sorted(rest,key=lambda r:-r[0])[:4];big.sort(key=lambda r:((r[2]*3)//H,r[1]))
      small=[r for r in rest if r not in big and (r[3]-r[1])>2*(r[4]-r[2])];small.sort(key=lambda r:((r[2]*3)//H,r[1]))
      if n=='t-old':o['wins']=[[(r[1]+r[3])//2,(r[2]+r[4])//2,(r[3]-r[1])//2,(r[4]-r[2])//2] for r in big]
      else:o['dies']=[Q(*r[1:]) for r in big]
      o['labels']=[Q(*r[1:]) for r in small[:4]]
    R[n]=o
    if 0:pass
    d=ImageDraw.Draw(im)
    for k,v in o.items():
      for q in (v if k in('dies','labels','wins') else [v]):
        if isinstance(q[0],list):d.polygon([tuple(p) for p in q],outline=(255,0,255),width=3)
        else:d.ellipse([q[0]-q[2],q[1]-q[3],q[0]+q[2],q[1]+q[3]],outline=(255,0,255),width=3)
    im.save(f'{S}/q-{n}.jpg')
 except Exception as e:print('FAIL',n,repr(e))
# hand measures (gridded 2x crops, $S/grid.py): the graphite Grok EPROMs and the old-school tryouts chip, where the dark labels merge
# with the dark body; the Grok packages' bottom label, whose left end merges with the body (x0 from the gold pad's left edge)
R['o-grok-dim']={'pad':Q(112,216,288,403),'win':[453,343,80,82],'label':Q(599,209,1178,477),'low':Q(112,412,288,477)}
R['o-grok-lit']={'pad':Q(105,242,269,391),'win':[441,348,74,76],'label':Q(582,242,1178,468),'low':Q(105,400,269,468)}
R['t-old']={'strip':Q(186,176,1094,259),'wins':[[269,342,61,59],[512,342,58,59],[754,342,59,59],[1002,342,60,59]],
 'labels':[Q(171,425,357,487),Q(418,425,605,487),Q(663,425,852,487),Q(910,425,1102,487)]}
R['t-new']={'strip':Q(155,92,867,195),'dies':[Q(236,237,449,434),Q(569,237,782,434),Q(236,537,449,735),Q(569,537,782,735)],
 'labels':[Q(225,456,456,502),Q(560,456,791,502),Q(225,757,456,805),Q(560,757,791,805)]}
for k in ('n-grok-dim','n-grok-lit'):
  q=R[k]['label'];x0=R[k]['pad'][0][0]+12;q[0][0]=q[3][0]=x0;R[k]['top'][1][0]=R[k]['top'][2][0]=q[1][0]
# the crop: the chip and its light (rays on the lit paintings), a small margin of void around it
for f in sorted(glob.glob('img/*.jpg')):
  n=os.path.basename(f)[:-4];a=np.asarray(Image.open(f).convert('L')).astype(int);H,W=a.shape
  m=nd.binary_opening(a>28,iterations=2);x0,y0,x1,y1=bb(m);g=10
  R[n]['crop']=[max(0,x0-g),max(0,y0-g),min(W,x1+g)-max(0,x0-g),min(H,y1+g)-max(0,y0-g)];R[n]['size']=[W,H]
json.dump(R,open('quads.json','w'));print(json.dumps({k:{a:(len(b) if a in('dies','labels','wins') else 1) for a,b in v.items()} for k,v in R.items()}))
