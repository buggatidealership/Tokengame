#!/usr/bin/python3
# boards: python3 board.py <shotdir> <outdir>
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
S,O=sys.argv[1],sys.argv[2];D=os.path.dirname(os.path.abspath(__file__))
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
FR=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
cost={};tot=0
for l in open(D+'/jobs.jsonl'):
  r=json.loads(l);n=r['name'];c=r.get('cost') or 0;tot+=c
  k=n.split('-')[1] if n[0] in 'to' else 'shared'
  if n[0] in 'lc':k=n.split('-')[1] if '-' in n else 'b2'
  if k=='b1h':k='b1h'
  cost[k]=cost.get(k,0)+c
TAKES=[('now','Today (live)','orange rays; big portrait; code-drawn boxes'),
 ('b1h','B1 · Boardroom (pick, 2K)','quote boards lit, mahogany frame, lamps light up'),
 ('b1','B1 at 1K (the draft)','the 1K paintings the 2K repaint replaces'),
 ('b2','B2 · Trading floor: chalk post','everything chalked on slates, gilt frame'),
 ('b3','B3 · Trading floor: split-flap','P&L on the flaps, record on brass, enamel tokens'),
 ('gal','A · Portrait gallery','brass plaques, gilt frame, velvet ovals'),
 ('mid','C · The midway','prize signs, bulb frame, bulbs light up')]
def lab(dr,x,y,a,b,c):dr.text((x,y),a,font=F(18),fill='#ffd21f');dr.text((x,y+23),b,font=FR(14),fill='#ddd');dr.text((x,y+41),c,font=FR(14),fill='#9fd')
def costs(w):return 'live' if w=='now' else f'paintings ${cost.get(w,0)+(cost.get("b1",0) if w=="b1h" else 0):.2f}'+(' (with B1 1K and lamps)' if w=='b1h' else '')
cw,ch=390,844;g=16;lh=66;N=len(TAKES)
img=Image.new('RGB',(g+N*(cw+g),100+lh+3*(ch+8)+40+460),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),"cast5 · Meet the models: today's big living portrait on painted tickets, a painted opening panel · 390px phone",font=F(26),fill='#fff')
dr.text((g,52),"Silver Age line + flat print (gpt-image-2 1K medium). Every word and number is live page text set on a painted surface; the founders' loops play in the painted frames. Rows: arriving, one screen down, two screens down.",font=FR(16),fill='#bbb')
for c,(w,a,b) in enumerate(TAKES):
  x=g+c*(cw+g);lab(dr,x,96,a,b,costs(w))
  for k in range(3):
    fn=f'{S}/{w}-390-s{k}.png'
    if os.path.exists(fn):img.paste(Image.open(fn).resize((cw,ch),Image.LANCZOS),(x,100+lh+k*(ch+8)))
y=100+lh+3*(ch+8)+6;dr.text((g,y),'Close-ups at 2x: the #1 ticket. Surfaces: name on the pennant/ribbon, P&L on the quote board / slate / flaps / plaque / prize sign, last five in painted lamps, slates, tokens, ovals, bulbs',font=F(16),fill='#fff')
for c,(w,a,b) in enumerate(TAKES):
  fn=f'{S}/{w}-390-s0.png';x=g+c*(cw+g)
  if os.path.exists(fn):im=Image.open(fn);box=(0,250,780,1150) if w=='now' else (0,930,780,1830);img.paste(im.crop(box).resize((cw,450),Image.LANCZOS),(x,y+30))
img.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).save(f'{O}/x2p-x3p-h13-cast5-390.png',optimize=True);print(img.size)
cw=1100;rows=[]
for w,a,b in [t for t in TAKES if t[0]!='b1h']:
  fn=f'{S}/{w}-1280.png'
  if os.path.exists(fn):rows.append((w,a,b,Image.open(fn)))
sc=lambda im:im.resize((cw,int(im.height*cw/im.width)),Image.LANCZOS)
H=90+sum(sc(r[3]).height+66 for r in rows)
img=Image.new('RGB',(cw+2*g,H),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),"cast5 · Meet the models at 1280: the opening panel, then the four tickets",font=F(26),fill='#fff')
dr.text((g,52),"Shot at 1x and scaled to 1100 wide. Every word and number is live page text on a painted surface.",font=FR(16),fill='#bbb');y=90
for w,a,b,im in rows:
  lab(dr,g,y,a,b,costs(w));im=sc(im);img.paste(im,(g,y+62));y+=im.height+66
img.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).save(f'{O}/x2p-x3p-h13-cast5-1280.png',optimize=True);print(img.size)
