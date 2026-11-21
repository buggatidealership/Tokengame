# /usr/bin/python3 gen.py [takes...]  : out/chip12<t>-<m>-1800/1200.jpg/.webp from the live chip11 paintings (media/, read only).
# Round H28 · meet11. Every take shares one re-laid chip:
#   1. the painted name ("GROK 4.7"), the painted "NO." label and its box are gone: one tall NAME window, 9-sliced from the chip's own
#      P&L window, runs the full width of the panel's top row (the name is live page text, the biggest word on the chip);
#   2. the middle row is shorter (the P&L and W-L windows, 9-sliced from their own painted windows), the W-L window narrower so its label
#      sits on the matte at its left like "Season P&L" does; the quote window is untouched;
#   3. the flag patch is gone and the gold logo plate moves down into its place (0.86 size), so the board's top-left corner is free for
#      the flag's canton (the US) or its stars (China): the flag is laid on the chip in its real orientation, hoist at the left;
#   4. the flag in the substrate, per take:
#      a  COPPER: the stripes and the canton as copper pours on the model's own solder mask, the stars etched out of the copper
#         (US); five copper star pours (China). Gold, so it reads as metal of the board, model colour kept.
#      b  MASK: the board's solder mask itself is printed in the flag's colours (deep PCB red, cream, navy; China red, gold stars),
#         the components, traces and pads stay on top. The loud, meme take. The model colour is lost from the substrate.
#      c  SILHOUETTE: the flag in the mask's own colour, a shade darker and lighter (tone on tone, like a screen print in one ink):
#         the quietest take; reads as a flag by its shapes only.
#      d  WAVING: b with every layer rippled (more at the fly end) and the folds shaded light and dark. Still.
#      e  D2 (the owner's pick of d): d plus a bus of gold traces run to the board's top and bottom edge at the same x on every chip,
#         so where m11.css butts the chips together (pins cut) the lines run on from one chip into the next.
# Words: none painted (every label and number stays page text).
import sys, os, random, math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops
HERE=os.path.dirname(os.path.abspath(__file__));MED=os.path.join(HERE,'../../../../../../../media/');OUT=os.path.join(HERE,'out');os.makedirs(OUT,exist_ok=True)
SZ=(1800,728)
# ---------- geometry (1800 painting units, measured on chip11 with a gold-bevel scan) ----------
D7=(528,220,974,372)          # the painted P&L window (source for the 9-slice)
LR=(992,220,1252,372)         # the painted W-L window (source)
NAME=(408,113,1252,262)       # new: the name window (covers the old name bar, NO. and its box, the old windows' tops)
PNL=(530,276,946,404)         # new: the P&L window
WL=(1046,276,1252,404)        # new: the W-L window (its label on the matte at x 952..1040)
MATTE_BANK=(400,232,522,410)  # clean matte (the panel's left column)
SUB_BANK=(404,60,1268,96)     # clean substrate (the board's top margin, a row of parts)
PLATE=(64,97,330,363)         # the gold logo plate with its own bevel shadow
PATCH=(82,398,318,582)        # the painted flag patch and its bezel
PANEL=(380,94,1283,646)       # the dark panel and its rim (never painted on)
CORE=(1288,110,1774,602)      # the founder window and its gold frame
BODY=(16,56,1784,668)         # the board, inside its rim lights
PK=.86                        # the plate's new size
def plate_dst():
  w=round((PLATE[2]-PLATE[0])*PK);h=round((PLATE[3]-PLATE[1])*PK);cx=(PLATE[0]+PLATE[2])/2;cy=528
  return (round(cx-w/2),round(cy-h/2),round(cx-w/2)+w,round(cy-h/2)+h)
C=30
def nine(src,tw,th):
  sw,sh=src.size;o=Image.new('RGB',(tw,th))
  P=[((0,0,C,C),(0,0,C,C)),((sw-C,0,sw,C),(tw-C,0,tw,C)),((0,sh-C,C,sh),(0,th-C,C,th)),((sw-C,sh-C,sw,sh),(tw-C,th-C,tw,th)),
     ((C,0,sw-C,C),(C,0,tw-C,C)),((C,sh-C,sw-C,sh),(C,th-C,tw-C,th)),((0,C,C,sh-C),(0,C,C,th-C)),((sw-C,C,sw,sh-C),(tw-C,C,tw,th-C)),
     ((C,C,sw-C,sh-C),(C,C,tw-C,th-C))]
  for s,d in P:o.paste(src.crop(s).resize((d[2]-d[0],d[3]-d[1]),Image.LANCZOS),d[:2])
  return o
def feather_mask(w,h,f):
  m=Image.new('L',(w,h),0);ImageDraw.Draw(m).rectangle((f,f,w-1-f,h-1-f),255);return m.filter(ImageFilter.GaussianBlur(f/2)) if f else m
def ramp(w,h,horiz):
  v=np.linspace(0,255,w if horiz else h).astype(np.uint8)
  a=np.tile(v[None,:],(h,1)) if horiz else np.tile(v[:,None],(1,w));return Image.fromarray(a,'L')
def tile(bank,w,h,rng,rowh=None,ov=6):
  """fill w x h from a bank by rows of random crops (random x, random flips), joins blended over ov px"""
  bw,bh=bank.size;rowh=min(rowh or bh,bh);o=Image.new('RGB',(w,h));y=0
  while y<h:
    row=Image.new('RGB',(w,rowh));x=0
    while x<w:
      cw=min(bw,w-x+ov);sx=rng.randint(0,bw-cw) if bw>cw else 0;sy=rng.randint(0,bh-rowh) if bh>rowh else 0
      p=bank.crop((sx,sy,sx+cw,sy+rowh))
      if rng.random()<.5:p=p.transpose(Image.FLIP_LEFT_RIGHT)
      if rng.random()<.5:p=p.transpose(Image.FLIP_TOP_BOTTOM)
      mk=Image.new('L',p.size,255)
      if x>0:mk.paste(ramp(ov,rowh,True),(0,0))
      row.paste(p,(x,0),mk);x+=cw-ov
    mk=Image.new('L',(w,rowh),255)
    if y>0:mk.paste(ramp(w,ov,False),(0,0))
    o.paste(row,(0,y),mk);y+=rowh-ov
  return o
def patch(im,rect,bank,rng,f=4,rowh=None):
  x0,y0,x1,y1=rect;w,h=x1-x0,y1-y0;t=tile(bank,w,h,rng,rowh);im.paste(t,(x0,y0),feather_mask(w,h,f))
# ---------- the shared re-laid chip ----------
def relay(im,rng):
  matte=im.crop(MATTE_BANK);sub=im.crop(SUB_BANK);d7=im.crop(D7);lr=im.crop(LR);pl=im.crop(PLATE)
  # matte where old bevels would show between the new windows
  patch(im,(398,252,1262,282),matte,rng,3)       # the gutter under the name window
  patch(im,(938,262,1052,414),matte,rng,3)       # between P&L and W-L (old bevels at 967..998), the W-L label's ground
  patch(im,(398,398,1262,420),matte,rng,3,rowh=24)  # the gutter over the quote window (old bottoms at 365..372)
  # the windows, 9-sliced from the chip's own painted windows
  for r,s in ((NAME,d7),(PNL,d7),(WL,lr)):im.paste(nine(s,r[2]-r[0],r[3]-r[1]),r[:2])
  # the flag patch and the plate's old place: substrate (rows of parts from the top margin)
  patch(im,PATCH,sub,rng,5);bare(im,(56,88,338,374),rng)
  return pl
def bare(im,rect,rng,f=7):
  """bare solder mask in the model's own colour (a corner of the board with no parts on it): the colour sampled from the board,
  its grain from a low and a high noise, a few worn gold flecks, two traces and their vias, so the flag has a calm field to sit in"""
  x0,y0,x1,y1=rect;w,h=x1-x0,y1-y0;a=np.asarray(im).astype(np.float32)
  sm=a[SUB_BANK[1]:SUB_BANK[3],SUB_BANK[0]:SUB_BANK[2]].reshape(-1,3);mc=np.array(MC_OF(im),np.float32)
  nr=np.random.default_rng(rng.randint(0,1<<30))
  lo=np.asarray(Image.fromarray((nr.random((h//16+2,w//16+2))*255).astype(np.uint8)).resize((w,h),Image.BICUBIC)).astype(np.float32)/255-.5
  hi=nr.normal(0,1,(h,w)).astype(np.float32);hi=np.asarray(Image.fromarray(np.clip(hi*40+128,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255-.5
  sh=np.linspace(1.05,.93,h)[:,None]
  t=mc[None,None,:]*(1+lo[...,None]*.16+hi[...,None]*.12)*sh[...,None]
  fl=np.asarray(Image.fromarray((nr.random((h//5+2,w//5+2))*255).astype(np.uint8)).resize((w,h),Image.BICUBIC).filter(ImageFilter.GaussianBlur(1))).astype(np.float32)/255
  fk=np.clip((fl-.80)*9,0,1)[...,None]*.85;t=t*(1-fk)+np.array((176,140,64),np.float32)*(1+hi[...,None]*.3)*fk
  o=Image.fromarray(np.clip(t,0,255).astype(np.uint8));d=ImageDraw.Draw(o)
  for (ya,xb) in ((int(h*.18),int(w*.72)),(int(h*.82),int(w*.3))):
    d.line((0,ya,xb,ya),fill=(150,118,58),width=3);d.line((xb,ya,xb+18,ya-18),fill=(150,118,58),width=3);d.ellipse((xb+12,ya-26,xb+26,ya-12),outline=(170,135,66),width=3)
  im.paste(o,(x0,y0),feather_mask(w,h,f))
def put_plate(im,pl):
  d=plate_dst();w,h=d[2]-d[0],d[3]-d[1];p=pl.resize((w,h),Image.LANCZOS)
  m=Image.new('L',(w,h),0);ImageDraw.Draw(m).rounded_rectangle((3,3,w-4,h-4),radius=14,fill=255);m=m.filter(ImageFilter.GaussianBlur(2))
  im.paste(p,d[:2],m)
# ---------- masks ----------
def geo_mask():
  m=Image.new('L',SZ,0);d=ImageDraw.Draw(m);d.rounded_rectangle(BODY,radius=24,fill=255)
  for r in (PANEL,CORE):d.rounded_rectangle(r,radius=14,fill=0)
  pd=plate_dst();d.rounded_rectangle((pd[0]-6,pd[1]-6,pd[2]+6,pd[3]+6),radius=18,fill=0)
  return np.asarray(m.filter(ImageFilter.GaussianBlur(1.5))).astype(np.float32)/255
def key_mask(a,mc,sig):
  """how much each pixel is bare solder mask (close to the model's mask colour); parts, pads and dark gaps fall away"""
  d=np.sqrt(((a-mc)**2).sum(-1));k=np.clip(1-d/sig,0,1);return k**.8
# ---------- the flags, drawn in painting units ----------
BH=(BODY[1],BODY[3]);FH=BH[1]-BH[0]
def star_pts(cx,cy,r,rot=-90):
  P=[]
  for i in range(10):
    a=math.radians(rot+i*36);rr=r if i%2==0 else r*.382;P.append((cx+rr*math.cos(a),cy+rr*math.sin(a)))
  return P
def us_layers():
  """returns (stripes red mask, canton mask, stars mask) as float arrays"""
  sh=FH/13;st=Image.new('L',SZ,0);d=ImageDraw.Draw(st)
  for i in range(0,13,2):d.rectangle((0,BH[0]+i*sh,SZ[0],BH[0]+(i+1)*sh-1),255)
  cH=sh*7;cW=388-BODY[0]-2+6  # the canton fills the board's free top-left (to the panel's rim)
  ca=Image.new('L',SZ,0);ImageDraw.Draw(ca).rectangle((0,BH[0],BODY[0]+cW,BH[0]+cH),255)
  sr=Image.new('L',SZ,0);ds=ImageDraw.Draw(sr);x0=BODY[0]+6;w=cW-10
  for row in range(9):
    n=6 if row%2==0 else 5
    for j in range(n):
      cx=x0+w*((2*j+(1 if row%2==0 else 2))/12);cy=BH[0]+cH*((row+1)/10)
      ds.polygon(star_pts(cx,cy,cH*.0616/ (7/13) *.5*.95),fill=255)
  f=lambda im:np.asarray(im.filter(ImageFilter.GaussianBlur(.8))).astype(np.float32)/255
  return f(st),f(ca),f(sr)
def cn_layers():
  u=27;ox=BODY[0]-2;oy=BH[0];sr=Image.new('L',SZ,0);d=ImageDraw.Draw(sr);bx,by=ox+5*u,oy+5*u
  d.polygon(star_pts(bx,by,3*u),fill=255)
  for (sx,sy) in ((10,2),(12,4),(12,7),(10,9)):
    cx,cy=ox+sx*u,oy+sy*u;rot=math.degrees(math.atan2(by-cy,bx-cx));d.polygon(star_pts(cx,cy,u,rot),fill=255)
  f=lambda im:np.asarray(im.filter(ImageFilter.GaussianBlur(.8))).astype(np.float32)/255
  return f(sr)
def traces():
  """each red stripe as a bus of three copper traces (the white stripes bare)"""
  sh=FH/13;tr=Image.new('L',SZ,0);d=ImageDraw.Draw(tr)
  for i in range(0,13,2):
    y0=BH[0]+i*sh
    for k in range(3):yy=y0+sh*(.2+k*.3);d.line((0,yy,SZ[0],yy),fill=255,width=max(3,round(sh*.17)))
  return np.asarray(tr.filter(ImageFilter.GaussianBlur(.7))).astype(np.float32)/255
MC={'grok':(86,84,80),'claude':(196,92,44),'gpt':(40,128,82),'kimi':(60,86,146)}
MC_OF=lambda im:MC[im.info['m']]
FLAG={'grok':'us','claude':'us','gpt':'us','kimi':'cn'}
def lum(a):return a[...,0]*.2126+a[...,1]*.7152+a[...,2]*.0722
def compose(base,m,t):
  a=np.asarray(base).astype(np.float32);G=geo_mask();mc=np.array(MC[m],np.float32);K=key_mask(a,mc,95 if m!='grok' else 60)*G
  L=lum(a)/max(1,lum(mc[None,None,:])[0,0]);L=np.clip(L,0,1.8)[...,None]
  fl=FLAG[m]
  if fl=='us':S,CA,ST=us_layers();RED=S*(1-CA)
  else:ST=cn_layers();RED=np.ones(SZ[::-1],np.float32);CA=np.zeros_like(RED);S=RED
  if t=='a':
    cu=np.array((222,166,78),np.float32)
    if fl=='us':
      TR=traces();P=np.clip(CA*(1-ST)+TR*(1-CA),0,1)
    else:P=ST
    cop=cu*np.clip(L*.55+.55,0,1.4)
    pe=np.asarray(Image.fromarray((P*255).astype(np.uint8)).filter(ImageFilter.FIND_EDGES).filter(ImageFilter.GaussianBlur(.8))).astype(np.float32)/255
    w=(P*K*.95)[...,None];out=a*(1-w)+cop*w;out=out*(1-(np.clip(pe*1.4,0,1)*K*.55)[...,None])
  elif t=='b':
    if fl=='us':
      red=np.array((150,32,36),np.float32);wht=np.array((214,204,184),np.float32);blu=np.array((30,44,100),np.float32);sw=np.array((236,230,212),np.float32)
      col=red*S[...,None]*(1-CA[...,None])+wht*(1-S[...,None])*(1-CA[...,None])+blu*CA[...,None]
      col=col*(1-(ST*CA)[...,None])+sw*(ST*CA)[...,None]
    else:
      red=np.array((168,30,24),np.float32);gold=np.array((240,190,56),np.float32)
      col=red*(1-ST[...,None])+gold*ST[...,None]
    # the mask's own shading carried over (a shade of the original luminance), parts stay on top
    w=(K*.92)[...,None];out=a*(1-w)+col*np.clip(L*.95,0,1.35)*w
    if fl=='us':
      sw2=(ST*CA*np.maximum(K,.45)*G*.85)[...,None];out=out*(1-sw2)+np.array((236,230,212),np.float32)*np.clip(L,0.6,1.2)*sw2
    else:
      sg=(ST*np.maximum(K,.45)*G*.8)[...,None];out=out*(1-sg)+np.array((240,190,56),np.float32)*np.clip(L,0.6,1.25)*sg
  elif t=='c':
    # tone on tone: the flag's shapes in the mask's own ink, a shade darker (red stripes, canton) and lighter (stars)
    if fl=='us':dk=np.clip(RED*.7+CA,0,1)*(1-ST);lt=ST*CA
    else:dk=np.zeros_like(ST);lt=ST
    out=a*(1-(dk*K*.5)[...,None])
    hi=np.clip(a*1.6+30,0,255);w=(lt*np.maximum(K,.35*G)*.9)[...,None];out=out*(1-w)+hi*w
  elif t=='d':
    # B's mask, waving: every layer rippled (more at the fly end), and the folds shaded light and dark across the board
    lam=380.;amp=20.;xx=np.arange(SZ[0])[None,:].astype(np.float32);yy=np.arange(SZ[1])[:,None].astype(np.float32)
    ph=2*math.pi*xx/lam;dy=amp*np.sin(ph)*(.6+.4*xx/SZ[0]);Y=np.clip(np.rint(yy-dy),0,SZ[1]-1).astype(int);X=np.broadcast_to(np.arange(SZ[0])[None,:],Y.shape)
    wv=lambda A:A[Y,X]
    if fl=='us':Sw,CAw,STw=wv(S),wv(CA),wv(ST)
    else:STw=wv(ST)
    fold=(1+.3*np.cos(ph+.6))[...,None]
    if fl=='us':
      red=np.array((150,32,36),np.float32);wht=np.array((214,204,184),np.float32);blu=np.array((30,44,100),np.float32)
      col=red*Sw[...,None]*(1-CAw[...,None])+wht*(1-Sw[...,None])*(1-CAw[...,None])+blu*CAw[...,None];top=STw*CAw;sc=np.array((236,230,212),np.float32)
    else:
      col=np.array((168,30,24),np.float32)*np.ones_like(STw)[...,None];top=STw;sc=np.array((240,190,56),np.float32)
    w=(K*.92)[...,None];out=a*(1-w)+col*np.clip(L*.95,0,1.35)*fold*w
    sg=(top*np.maximum(K,.45)*G*.85)[...,None];out=out*(1-sg)+sc*np.clip(L,0.6,1.2)*fold*sg
  elif t=='e':
    # D2: D's waving flag, plus the bus that joins one chip to the next: gold traces run from inside the top and bottom margins to the
    # board's edge, at the same x on every chip, so where two chips butt (m11.css cuts the pins) each line runs straight on into the next
    out=np.asarray(compose(base,m,'d')).astype(np.float32)
    tr=Image.new('L',SZ,0);d=ImageDraw.Draw(tr);vi=Image.new('L',SZ,0);dv=ImageDraw.Draw(vi)
    for x in range(424,1772,48):
      yb=650 if x<1288 else 606
      for (y0,y1,yv) in ((40,92,92),(yb,690,yb)):
        d.line((x,y0,x,y1),fill=255,width=7);dv.ellipse((x-9,yv-9,x+9,yv+9),fill=255)
    T=np.asarray(tr.filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255;V=np.asarray(vi.filter(ImageFilter.GaussianBlur(.6))).astype(np.float32)/255
    bm=Image.new('L',SZ,0);ImageDraw.Draw(bm).rectangle((BODY[0]+30,0,BODY[2]-30,SZ[1]),255);bm=np.asarray(bm).astype(np.float32)/255
    for r in (PANEL,CORE):bm[r[1]:r[3],r[0]:r[2]]=0
    cu=np.array((232,178,84),np.float32);w=(np.clip(T+V,0,1)*bm*np.maximum(K/np.maximum(G,1e-3),.25)*.95)[...,None]
    out=out*(1-w)+cu*w
  return Image.fromarray(np.clip(out,0,255).astype(np.uint8))
def run(takes):
  for m in ['grok','claude','gpt','kimi']:
    rng=random.Random(11+len(m))
    im=Image.open(MED+f'chip11-{m}-1800.jpg').convert('RGB');im.info['m']=m;pl=relay(im,rng);put_plate(im,pl)
    im.save(os.path.join(OUT,f'chip12o-{m}-1800.jpg'),quality=90)   # the re-laid chip without a flag (for checks)
    for t in takes:
      o=compose(im,m,t)
      # the plate is pasted back on top (no flag on it)
      for w in (1800,1200):
        oo=o if w==1800 else o.resize((w,round(SZ[1]*w/1800)),Image.LANCZOS)
        oo.save(os.path.join(OUT,f'chip12{t}-{m}-{w}.jpg'),quality=90);oo.save(os.path.join(OUT,f'chip12{t}-{m}-{w}.webp'),quality=88)
  print('ok',takes)
if __name__=='__main__':run(sys.argv[1:] or ['a','b','c','d','e'])
