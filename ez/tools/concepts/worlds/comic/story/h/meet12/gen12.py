# /usr/bin/python3 gen12.py : out/chip13<p>-<m>-1200/1800.jpg/.webp, Round H28 meet12 (the owner on the live D2: "the chip and the flag are so morphed
# that you don't even realize that it's a chip anymore"). Built on meet11's gen.py (the re-laid chip: name window, short P&L and W-L, no No. box):
#   - no flag in the board: the model's own board colour, its grain, parts and traces, as on chip11 (the flag moves to the name window, live, m12.js);
#   - the gold logo plate centred in the chip's left part (vertically), grown: p and r = 1.08 (takes A, B) or q = 1.24 (takes C, D);
#   - the left part around the plate is board with rows of parts (from the chip's own top margin); p (take A) keeps a clear field above the plate
#     for the etched numeral (bare board in the model's colour), r (take B) and q (takes C, D) have parts all round;
#   - D2's bus: gold traces run to the board's top and bottom edges at the same x on every chip, so the joined chips run on into each other.
import sys,os,random,importlib.util
import numpy as np
from PIL import Image,ImageDraw,ImageFilter
H=os.path.dirname(os.path.abspath(__file__));sp=importlib.util.spec_from_file_location('g11',os.path.join(H,'../meet11/gen.py'));g=importlib.util.module_from_spec(sp);sp.loader.exec_module(g)
OUT=os.path.join(H,'out');os.makedirs(OUT,exist_ok=True)
CX,CY=197,362           # the left part's middle (board x 16..388, y 56..668)
def dst(k):
  w=round((g.PLATE[2]-g.PLATE[0])*k);h=round((g.PLATE[3]-g.PLATE[1])*k);return (round(CX-w/2),round(CY-h/2),round(CX-w/2)+w,round(CY-h/2)+h)
def bus(a,K,G):
  tr=Image.new('L',g.SZ,0);d=ImageDraw.Draw(tr);vi=Image.new('L',g.SZ,0);dv=ImageDraw.Draw(vi)
  for x in range(424,1772,48):
    yb=650 if x<1288 else 606
    for (y0,y1,yv) in ((40,92,92),(yb,690,yb)):d.line((x,y0,x,y1),fill=255,width=7);dv.ellipse((x-9,yv-9,x+9,yv+9),fill=255)
  T=np.asarray(tr.filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255;V=np.asarray(vi.filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255
  bm=np.zeros(g.SZ[::-1],np.float32);bm[:,g.BODY[0]+30:g.BODY[2]-30]=1
  for r in (g.PANEL,g.CORE):bm[r[1]:r[3],r[0]:r[2]]=0
  w=(np.clip(T+V,0,1)*bm*np.maximum(K/np.maximum(G,1e-3),.25)*.95)[...,None];return a*(1-w)+np.array((232,178,84),np.float32)*w
for tag,k,field in (('p',1.08,True),('r',1.08,False),('q',1.24,False)):
  for m in ['grok','claude','gpt','kimi']:
    rng=random.Random(11+len(m));im=Image.open(g.MED+f'chip11-{m}-1800.jpg').convert('RGB');im.info['m']=m
    pl=g.relay(im,rng)
    sub=im.crop(g.SUB_BANK);g.patch(im,(50,84,346,650),sub,rng,9)   # the whole left part: rows of parts, as chip11's ring round the plate
    if field:g.bare(im,(40,66,356,214),rng,f=8)            # take A only: a clear field above the plate for the etched numeral
    d=dst(k);w,h=d[2]-d[0],d[3]-d[1];p=pl.resize((w,h),Image.LANCZOS)
    mk=Image.new('L',(w,h),0);ImageDraw.Draw(mk).rounded_rectangle((3,3,w-4,h-4),radius=round(14*k),fill=255);im.paste(p,d[:2],mk.filter(ImageFilter.GaussianBlur(2)))
    g.plate_dst=lambda d=d:d                                 # the plate's new place, for the board mask
    a=np.asarray(im).astype(np.float32);G=g.geo_mask();K=g.key_mask(a,np.array(g.MC[m],np.float32),95 if m!='grok' else 60)*G
    o=Image.fromarray(np.clip(bus(a,K,G),0,255).astype(np.uint8))
    for W in (1800,1200):
      oo=o if W==1800 else o.resize((W,round(g.SZ[1]*W/1800)),Image.LANCZOS)
      oo.save(os.path.join(OUT,f'chip13{tag}-{m}-{W}.jpg'),quality=90);oo.save(os.path.join(OUT,f'chip13{tag}-{m}-{W}.webp'),quality=88)
  print(tag,'plate',dst(k))
