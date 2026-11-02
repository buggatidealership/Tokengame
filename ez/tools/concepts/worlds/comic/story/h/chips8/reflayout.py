# /usr/bin/python3 reflayout.py : layout references for the chips8 masters (1280x720 units, drawn at 3x). Rough shapes only.
# A: SW geometry (window frame top = plate top, bottom = flag bottom). B: the window breaks the chip's top edge (panel break).
from PIL import Image,ImageDraw
import random,json
W,H=1280,720;S=3
GOLD=(214,168,62);CER=(205,203,196);EPX=(18,18,20);GL=(10,12,14);LAB=(235,235,235)
L={}
def lay(k,win,panelR,V2=False):
  im=Image.new('RGB',(W*S,H*S),'black');d=ImageDraw.Draw(im)
  R=lambda b,**kw:d.rectangle([v*S for v in b],**kw)
  RR=lambda b,r,**kw:d.rounded_rectangle([v*S for v in b],r*S,**kw)
  for i in range(21):
    x=46+i*57.6;R((x,112,x+24,146),fill=GOLD);R((x,494,x+24,528),fill=GOLD)
  RR((32,146,1248,494),8,fill=CER,outline=(120,118,112),width=2*S)
  random.seed(4)
  for n in range(90):
    x=random.uniform(40,1240);y=random.choice([random.uniform(150,166),random.uniform(474,490)])
    R((x,y,x+9,y+5),fill=(150,120,80))
  plate=(60,170,236,326);flag=(70,366,226,470)
  RR(plate,6,fill=GOLD,outline=(120,80,20),width=2*S);R(flag,fill=(170,168,160),outline=(100,98,92),width=S)
  P=panelR;RR((256,170,P,470),8,fill=EPX,outline=GOLD,width=2*S)
  noW=(P-96,186,P-16,232);name=(272,186,P-150,232)
  R(name,fill=(28,28,30))
  RR(noW,6,fill=GL,outline=GOLD,width=2*S)
  if V2:
    lr=(P-212,244,P-16,344);d7=(370,244,P-228,344);se=(370,356,P-228,410)
  else:
    d7=(370,244,P-16,344);lr=(370,356,510,410);se=(600,356,P-16,410)
  for bb in (d7,lr,se):RR(bb,8 if bb==d7 else 6,fill=GL,outline=GOLD,width=2*S)
  d.line([272*S,420*S,(P-16)*S,420*S],fill=GOLD,width=S)
  RR(win,8,fill=(190,150,60),outline=(110,80,20),width=2*S)
  inner=(win[0]+12,win[1]+12,win[2]-12,win[3]-12);R(inner,fill=(60,55,70))
  im.resize((W,H),Image.LANCZOS).save(f'ref/layout-{k}.jpg',quality=92)
  L[k]=dict(plate=plate,flag=flag,panel=(256,170,P,470),name=name,no=noW,d7=d7,lr=lr,se=se,foot=(272,424,P-16,462),win=win,inner=inner)
lay('A',(934,170,1234,470),914)
lay('B',(880,116,1234,470),866)
lay('A2',(934,170,1234,470),914,True)
lay('B2',(880,116,1234,470),866,True)
json.dump(L,open('ref/layout.json','w'),indent=1)
# T: the fifth chip in A's body: one strip at the top of the label, four small square windows with a name window under each
im=Image.open('ref/layout-A.jpg').resize((W*S,H*S));d=ImageDraw.Draw(im)
RR=lambda b,r,**kw:d.rounded_rectangle([v*S for v in b],r*S,**kw)
RR((256,170,914,470),8,fill=EPX,outline=GOLD,width=2*S);RR((272,186,898,236),6,fill=GL,outline=GOLD,width=2*S)
T={}
for i in range(4):
  x0=284+i*154;RR((x0+14,252,x0+124,362),8,fill=GL,outline=GOLD,width=2*S);RR((x0,376,x0+138,416),5,fill=GL,outline=GOLD,width=2*S)
im.resize((W,H),Image.LANCZOS).save('ref/layout-T.jpg',quality=92)
