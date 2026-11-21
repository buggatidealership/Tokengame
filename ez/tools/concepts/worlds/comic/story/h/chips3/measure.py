# /usr/bin/python3 measure.py : finds the blank surfaces on the chips3 paintings and writes quads.json (quads TL,TR,BR,BL, painting px).
# s-*/c-*/d-*: pad (gold plate), label (black epoxy panel), low (bare ceramic under the plate: the flag decal),
#   win (s: the square window's dark glass; d: the exposed die's polished square), mid (c: the bare ceramic between plate and label).
# n-* and t-old are copied from ../chips2/quads.json (same paintings). Check images (magenta outlines) go to $S.
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
old=json.load(open('../chips2/quads.json'));R={k:v for k,v in old.items() if k.startswith('n-') or k=='t-old'}
for f in sorted(glob.glob('img/[scd]-*.jpg')):
  n=os.path.basename(f)[:-4];im=Image.open(f).convert('RGB');a=np.asarray(im).astype(int);H,W=a.shape[:2]
  L=a[...,0]*.3+a[...,1]*.59+a[...,2]*.11;mx=a.max(2);mn=a.min(2);sat=(mx-mn)/np.maximum(mx,1)
  gold=nd.binary_opening((sat>.4)&(a[...,0]>140)&(a[...,1]>100)&(a[...,2]<130)&(L>100),iterations=4)
  o={}
  try:
    g=[r for r in regs(gold,800) if r[1]<W*.3 and .6<(r[3]-r[1])/max(1,r[4]-r[2])<2.4];pad=max(g,key=lambda r:r[0]);o['pad']=Q(*pad[1:])
    # gold borders: the label's and the window's frames are thin gold rings; fill them to find the panels inside
    ring=nd.binary_closing((sat>.35)&(a[...,0]>120)&(a[...,2]<140),iterations=2)
    inside=nd.binary_fill_holes(ring)&~ring;inside=nd.binary_opening(inside,iterations=4)
    rs=[r for r in regs(inside,W*H//1200) if r[1]>pad[3]-5]
    lab=max([r for r in rs if (r[3]-r[1])>1.3*(r[4]-r[2])],key=lambda r:r[0]);o['label']=Q(*lab[1:])
    if n[0] in 'sd':
      sq=[r for r in rs if r is not lab and r[3]<lab[1]+10 and .6<(r[3]-r[1])/max(1,r[4]-r[2])<1.6]
      if n[0]=='d':
        dk=nd.binary_opening(L<60,iterations=3);ds=[r for r in regs(dk,3000) if pad[3]<r[1]<lab[1] and r[3]<lab[1]+5 and .7<(r[3]-r[1])/max(1,r[4]-r[2])<1.4]
        w=max(ds,key=lambda r:r[0])
      else:w=max(sq,key=lambda r:r[0])
      o['win']=Q(*w[1:])
    else:
      o['mid']=Q(pad[3]+int(W*.025),lab[2]+4,lab[1]-int(W*.025),lab[4]-4)
    o['low']=Q(pad[1],pad[4]+int(H*.012),pad[3],lab[4])
  except Exception as e:print('FAIL',n,repr(e))
  R[n]=o
  d=ImageDraw.Draw(im)
  for k,v in o.items():d.polygon([tuple(p) for p in v],outline=(255,0,255),width=3)
  im.save(f'{S}/q-{n}.jpg')
# hand measures (gridded crops, coordinates read off a 50px grid): paintings where the gold rings or the darkness test failed
H={'c-kimi-dim':{'pad':Q(104,220,310,412),'label':Q(590,222,1178,488),'mid':Q(335,225,560,485),'low':Q(104,420,310,488)},
 'd-grok-lit':{'pad':Q(122,240,296,388),'win':Q(364,262,580,466),'label':Q(636,230,1172,496),'low':Q(100,420,320,500)},
 'd-kimi-dim':{'pad':Q(88,195,246,335),'win':Q(318,222,550,438),'label':Q(622,206,1188,452),'low':Q(88,345,246,452)},
 'd-kimi-lit':{'pad':Q(116,242,314,418),'win':Q(386,274,580,466),'label':Q(648,244,1180,502),'low':Q(116,428,314,502)},
 's-gpt-dim':{'pad':Q(72,212,266,362),'win':Q(358,248,542,450),'label':Q(614,215,1206,491),'low':Q(72,372,266,491)},
 's-gpt-lit':{'pad':Q(124,242,306,408),'win':Q(362,266,530,438),'label':Q(576,232,1176,474),'low':Q(124,416,306,474)}}
R.update(H)
# the square windows: the found box is the gold frame; keep only the dark glass inside it
for n,o in R.items():
  if n[0]!='s' or n in H:continue
  a=np.asarray(Image.open('img/'+n+'.jpg').convert('L')).astype(int);(x0,y0),_,(x1,y1),_=o['win']
  m=np.zeros(a.shape,bool);m[y0:y1,x0:x1]=a[y0:y1,x0:x1]<34;m=nd.binary_opening(m,iterations=3);lab,k=nd.label(m)
  big=max(range(1,k+1),key=lambda i:(lab==i).sum());o['win']=Q(*bb(lab==big))
for n,o in R.items():
  if n[0] in 'scd':
    im=Image.open('img/'+n+'.jpg').convert('RGB');d=ImageDraw.Draw(im)
    for k,v in o.items():d.polygon([tuple(p) for p in v],outline=(255,0,255),width=3)
    im.save(f'{S}/q-{n}.jpg')
for f in sorted(glob.glob('img/[scd]-*.jpg')):
  n=os.path.basename(f)[:-4];a=np.asarray(Image.open(f).convert('L')).astype(int);H,W=a.shape
  m=nd.binary_opening(a>28,iterations=2);x0,y0,x1,y1=bb(m);g=10
  R[n]['crop']=[max(0,x0-g),max(0,y0-g),min(W,x1+g)-max(0,x0-g),min(H,y1+g)-max(0,y0-g)];R[n]['size']=[W,H]
json.dump(R,open('quads.json','w'));print({k:list(v) for k,v in R.items() if k[0] in 'scd'})
