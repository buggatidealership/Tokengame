# /usr/bin/python3 compose.py [A|B] : img/chip8<k>-<m>-full.jpg from the master and each model's nano-banana-pro pass.
# 1. fit the pass onto the master: x and y scale + shift from the inner edges of the five display windows (least squares); resample into master coords.
# 2. lay back the plate, the flag field, the name strip and the foot band (feathered). 3. tint the pale ceramic with the model's colour (as chips7).
import sys,json;from PIL import Image,ImageDraw,ImageFilter;import numpy as np
G=json.load(open('ref/guides.json'))['GEO'];TINT={'grok':'#5b5e66','claude':'#dd6a3a','gpt':'#1f9a70','kimi':'#3a63d6'}
CEN={'A2':dict(no=(2532,604),d7=(1604,884),lr=(2384,884),se=(1896,1256)),'B2':dict(no=(2416,604),d7=(1556,888),lr=(2288,888),se=(1556,1184)),'A':dict(no=(2484,664),d7=(1904,916),lr=(1344,1176),se=(2224,1176)),'B':dict(no=(2444,640),d7=(1852,904),lr=(1312,1184),se=(2192,1184))}
isg=lambda p:p[0]>130 and p[1]>85 and p[0]-p[2]>60
def edges(a,cen):
  X=[];Y=[]
  for x,y in cen.values():
    def w(dx,dy):
      X0,Y0=x,y
      for i in range(1500):
        if isg(a[Y0,X0]):return X0 if dx else Y0
        X0+=dx;Y0+=dy
    X+= [w(-1,0),w(1,0)];Y+=[w(0,-1),w(0,1)]
  return X,Y
def fit(p,q):A=np.vstack([p,np.ones(len(p))]).T;return np.linalg.lstsq(A,np.array(q,float),rcond=None)[0]
def feather(size,box,r):m=Image.new('L',size,0);ImageDraw.Draw(m).rectangle(box,fill=255);return m.filter(ImageFilter.GaussianBlur(r))
rep={}
NOFOOT='nofoot' in sys.argv
PICK={'B2-claude':'c','B2-kimi':'c'}
for k in ([a for a in sys.argv[1:] if a in ('A','B','A2','B2')] or ['A2','B2']):
  g=G[k];M=Image.open(g['src']).convert('RGB');a=np.asarray(M).astype(int);cen=CEN[k];RX,RY=edges(a,cen)
  for m,col in TINT.items():
    P=Image.open(f"img/p8{k}-{m}-{PICK.get(k+'-'+m,'a')}.jpg").convert('RGB');sx=P.width/M.width;sy=P.height/M.height
    pa=np.asarray(P).astype(int);cq={n:(int(x*sx),int(y*sy)) for n,(x,y) in cen.items()};QX,QY=edges(pa,cq)
    ax,bx=fit(RX,QX);ay,by=fit(RY,QY)
    Wp=P.transform(M.size,Image.AFFINE,(ax,0,bx,0,ay,by),Image.BICUBIC)
    QX2,QY2=edges(np.asarray(Wp).astype(int),cen)
    rep[f'{k}-{m}']={'x':[round(ax,5),round(bx,2)],'y':[round(ay,5),round(by,2)],'res_x':[q-r for q,r in zip(QX2,RX)],'res_y':[q-r for q,r in zip(QY2,RY)]}
    out=M.copy()
    pad=lambda b,p:(b[0]-p,b[1]-p,b[2]+p,b[3]+p)
    for box,pd,fr in [(g['plate'],40,6),(g['flag'],22,5),(g['name'],2,3),(g['foot'],0,5)][:3 if NOFOOT else 4]:
      out=Image.composite(Wp,out,feather(M.size,pad(box,pd),fr))
    A2=np.asarray(out).astype(float);r,gg,b=A2[...,0],A2[...,1],A2[...,2]
    cer=(((r-b)<62)&(A2.mean(2)>88)).astype(float)
    keep=Image.new('L',M.size,0);d=ImageDraw.Draw(keep)
    tb=json.load(open('img/'+{'A':'m8A-d','B':'m8B-a','A2':'m8A2-a','B2':'m8B2-a'}[k]+'.geom.json'))
    d.rectangle((40,300,3800,1760),fill=255)
    for bx0 in [pad(g['plate'],40),pad(g['flag'],24),(860,480,2690,1580),(tb['win']['out'][0]-60,tb['win']['out'][1]-60,tb['win']['out'][2]+60,tb['win']['out'][3]+60)]:d.rectangle(bx0,fill=0)
    km=np.asarray(keep.filter(ImageFilter.GaussianBlur(3))).astype(float)/255*cer
    km=np.asarray(Image.fromarray((km*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float)/255
    t=np.array([int(col[i:i+2],16) for i in (1,3,5)],float)/255
    out=Image.fromarray((A2*(1-km[...,None])+(A2*t*1.18).clip(0,255)*km[...,None]).clip(0,255).astype(np.uint8))
    out.save(f'img/chip8{k}{"c" if NOFOOT else ""}-{m}-full.jpg',quality=93);print(k,m,rep[f'{k}-{m}'])
json.dump(rep,open('compose.json','w'),indent=1)
