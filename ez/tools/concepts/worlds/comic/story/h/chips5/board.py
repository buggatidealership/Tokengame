# /usr/bin/python3 board.py <shots dir> <width> <out> : H21 chips5. Today's live standings, H20 S and N2 (before), SW (S swapped) with
# its three flag processes, N2 clean with the same three; then close-ups: the SW chips side by side at 2x with the alignment lines drawn,
# the N2 die before and after, and the flag processes at 3x (US and China).
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): 01 Current standings',''),
 ('h20-S','Before: H20 S. Label right, the founder window between the plate and the label',''),
 ('SW-etch','SW, S swapped + flag ETCHED in the metal layer: red fields bare copper, white tinned, blue heat-blued steel; window frame top = plate top, frame bottom = flag bottom','$0.13 (3 masters, sw-c used)'),
 ('SW-print','SW + flag PRINTED on the ceramic lid: flat pad-print inks, the blue a hair off register, the lid grain over it','same master'),
 ('SW-enamel','SW + flag ENAMEL inlay: glassy enamel fields in gold wire, flush, a gold rim, a soft gloss','same master'),
 ('h20-N2','Before: H20 N2. The rounded mask and dark falloff round the founder',''),
 ('N2-etch','N2 clean: the loop fills the die square edge to edge (no mask, no vignette, no blend) + flag etched','H20 master'),
 ('N2-print','N2 clean + flag printed on the lid',''),
 ('N2-enamel','N2 clean + flag enamel inlay','')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,22 if W<600 else 24);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;bg='#1b1820'
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
ims=[(t,c,Image.open(f'{D}/ch-{W}-{k}.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/ch-{W}-{k}.png')]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
def addrow(B,title,parts,gap=pad):
  H=max(x.height for x in parts);cw=sum(x.width for x in parts)+gap*(len(parts)+1)
  N=Image.new('RGB',(max(B.width,cw),B.height+H+80),bg);N.paste(B,(0,0));d=ImageDraw.Draw(N);d.text((pad,B.height+14),title,fill='#fdbc2a',font=F);x=pad
  for c in parts:N.paste(c,(x,B.height+56));x+=c.width+gap
  return N
def chips(k):
  b=Image.open(f'{D}/bt-{W}-{k}-0.png').convert('RGB');y0=68;h=(b.height-y0-12)/4
  return [b.crop((0,int(y0+h*n),b.width,int(y0+h*(n+1)))) for n in range(4)]
if W<600:
  lh=330;B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),bg);d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:9]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+9*30+4),('Hedra '+c) if c.startswith('$') else c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
else:
  hh=[i.height+100 for *_,i in ims]
  B=Image.new('RGB',(max(i.width for *_,i in ims)+2*pad,sum(hh)+pad),bg);d=ImageDraw.Draw(B);y=pad
  for (t,c,i),h in zip(ims,hh):
    for n,l in enumerate(wrap(d,t+(('   · Hedra '+c) if c.startswith('$') else ''),F,i.width)[:2]):d.text((pad,y+n*30),l,fill='#fdbc2a',font=F)
    B.paste(i,(pad,y+70));y+=h
# close-ups (phone board only; the desktop board shows the sections)
if W<600 and os.path.exists(f'{D}/bt-{W}-SW-etch-0.png'):
  r=chips('SW-etch')
  pass
  B=addrow(B,'SW, the four chips side by side at 2x; window frame top = plate top, frame bottom = flag bottom, measured 0.00 to 0.01px on every chip',r)
  if os.path.exists(f'{D}/bt-{W}-h20-N2-0.png'):
    a=chips('h20-N2')[0];b=chips('N2-etch')[0];cw=int(a.width*.45)
    B=addrow(B,'N2 die, before (H20: rounded mask, dark falloff) and after (clean edge to edge), 2x',[a.crop((cw//3,0,cw//3+cw,a.height)),b.crop((cw//3,0,cw//3+cw,b.height))])
  fl=[]
  for k in ['SW-etch','SW-print','SW-enamel']:
    c=chips(k);fx=(0,int(c[0].height*.5),int(c[0].width*.24),c[0].height-6)
    fl+= [c[0].crop(fx).resize(((fx[2]-fx[0])*3//2,(fx[3]-fx[1])*3//2)),c[3].crop(fx).resize(((fx[2]-fx[0])*3//2,(fx[3]-fx[1])*3//2))]
  B=addrow(B,'The flag processes at 3x: etched (US, China) · printed on the lid (US, China) · enamel inlay (US, China)',fl,24)
B.save(OUT,optimize=True);print(OUT,B.size)
