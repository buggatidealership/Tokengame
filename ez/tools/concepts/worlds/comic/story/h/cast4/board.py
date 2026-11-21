#!/usr/bin/python3
# boards: python3 board.py <shotdir> <outdir>
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
S,O=sys.argv[1],sys.argv[2];D=os.path.dirname(os.path.abspath(__file__))
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
FR=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
cost={'gal':0,'ex':0,'mid':0,'shared':0}
for l in open(D+'/jobs.jsonl'):
  r=json.loads(l);n=r['name'];w=n.split('-')[1] if n[0] in 'tgbs' else 'shared'
  cost[w if w in cost else 'shared']+=r.get('cost') or 0
TAKES=[('now','Today (live)','the pop cards on orange rays; code-drawn boxes'),
 ('gal','A · The portrait gallery','gilt living frames, P&L engraved on brass plaques, stamps in velvet ovals'),
 ('ex','B · The trading floor (pick)','boardroom portraits, P&L lit on quote boards, last 5 as floor lamps'),
 ('mid','C · The midway','marquee-bulb frames, P&L on a prize sign, last 5 as bulbs')]
def lab(dr,x,y,a,b,c):dr.text((x,y),a,font=F(19),fill='#ffd21f');dr.text((x,y+24),b,font=FR(14),fill='#ddd');dr.text((x,y+42),c,font=FR(14),fill='#9fd')
def costs(w):return 'live' if w=='now' else f'plates ${cost[w]:.2f} (+ shared flags/stamps ${cost["shared"]:.2f})'
# 390: two phone screens per take (arriving, then one scroll down), the sticky world behind what is on screen
cw,ch=390,844;g=16;lh=66
img=Image.new('RGB',(g+4*(cw+g),100+2*(ch+8)+lh+60+430),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),'cast4 · Meet the models: today\'s cards redrawn as painted tickets, hung in a world · 390px phone',font=F(26),fill='#fff')
dr.text((g,52),'Silver Age line + flat print (gpt-image-2 1K medium). Every number is live page text from __x2pPnl; founders\' loops play inside the painted frames.',font=FR(16),fill='#bbb')
for c,(w,a,b) in enumerate(TAKES):
  x=g+c*(cw+g);lab(dr,x,96,a,b[:52],costs(w))
  for k in range(2):
    fn=f'{S}/{w}-390-s{k}.png'
    if w=='now':fn=f'{S}/now-390-s{k}.png'
    if os.path.exists(fn):img.paste(Image.open(fn).resize((cw,ch),Image.LANCZOS),(x,100+lh+k*(ch+8)))
y=100+lh+2*(ch+8)+10;dr.text((g,y),'Close-ups at 2x: the #1 ticket in each world. Surfaces: name on the painted ribbon, P&L on the plaque / quote board / prize sign, last five in the painted ovals / lamps / bulbs',font=F(17),fill='#fff')
for c,(w,a,b) in enumerate(TAKES):
  fn=f'{S}/{w}-390-s0.png';x=g+c*(cw+g)
  if os.path.exists(fn):im=Image.open(fn);im2=im.crop((40,600,40+780,600+840)) if w!='now' else im.crop((20,340,800,1180));img.paste(im2.resize((cw,420),Image.LANCZOS),(x,y+40))
img.save(f'{O}/x2p-x3p-h11-cast4-390.png',optimize=True);print(img.size)
# 1280: the section per take
cw=1100;rows=[]
for w,a,b in TAKES:
  fn=f'{S}/{w}-1280.png'
  if os.path.exists(fn):rows.append((w,a,b,Image.open(fn)))
H=90+sum(r[3].height+70 for r in rows)
img=Image.new('RGB',(cw+2*g,H),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),'cast4 · Meet the models in three worlds · 1280px desktop (section shot at 1x)',font=F(26),fill='#fff')
dr.text((g,52),'Same layout as today: four tickets in a row. Every number live; the frames play the founders\' 5 s loops.',font=FR(16),fill='#bbb')
y=90
for w,a,b,im in rows:
  dr.text((g,y),f'{a} · {b} · {costs(w)}',font=F(17),fill='#ffd21f');img.paste(im,(g,y+28));y+=im.height+70
img.save(f'{O}/x2p-x3p-h11-cast4-1280.png',optimize=True);print(img.size)
