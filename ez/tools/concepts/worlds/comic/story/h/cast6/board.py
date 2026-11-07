#!/usr/bin/python3
# cast6 boards: python3 board.py <shotdir> <outdir>
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
S,O=sys.argv[1],sys.argv[2];D=os.path.dirname(os.path.abspath(__file__))
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n);FR=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
c={};tot=0
for l in open(D+'/jobs.jsonl'):
  r=json.loads(l);n=r['name'];k=n.split('-')[0];c[k]=c.get(k,0)+(r.get('cost') or 0);tot+=r.get('cost') or 0
tk=c.get('t',0)+c.get('g',0)  # tickets (base + lit) and the gold stub, shared
TAKES=[('now','Today (live)','code-drawn pop cards on orange rays','live'),
 ('A','A · Hero moment','the golden ticket on the podium under the one skylight beam; the rest in the crowd\'s shade',f"plate ${c.get('pa',0):.2f} + crowd ${c.get('cs',0):.2f}"),
 ('B','B · The wall (pick)','scale: the leader\'s living portrait IS the exchange wall; P&L on its quote board',f"2K plates ${c.get('pb2',0):.2f} (1K draft ${c.get('pb',0):.2f})"),
 ('C','C · Spot colour','three gallery spots: gold on #1, green on a profit, red on a loss',f"plate ${c.get('pc',0):.2f} + lit tickets"),
 ('D','D · Looking up','worm\'s-eye opener at the board; each ticket hangs from it on a chain',f"plate ${c.get('pd',0):.2f} + chain ${c.get('k',0):.2f}"),
 ('E','E · Open outcry','every ticket held up by a trader\'s hand; on desktop height = rank',f"plate ${c.get('pe',0):.2f} + hands ${c.get('h',0):.2f}")]
foot=f"Shared: tickets in today's format (4 base + 4 lit) and the gold stub ${tk:.2f}. Total Hedra spend ${tot:.2f}."
cw,ch,g,lh=390,844,16,70
img=Image.new('RGB',(g+6*(cw+g),110+2*(ch+8)+lh+40+460+40),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),'cast6 · Meet the models that stands out · five levers on the trading floor · 390px phone',font=F(26),fill='#fff')
dr.text((g,52),"Today's format kept (stub, big living founder portrait, name, flag, Right way, Season P&L, Best call, Last 5). Every figure is live page text on a painted blank surface. "+foot,font=FR(15),fill='#bbb')
for i,(t,a,b,co) in enumerate(TAKES):
  x=g+i*(cw+g);dr.text((x,100),a,font=F(19),fill='#ffd21f');dr.text((x,124),b[:56],font=FR(13),fill='#ddd');dr.text((x,142),co,font=FR(13),fill='#9fd')
  for k in range(2):
    fn=f'{S}/{t}-390-s{k}.png'
    if not os.path.exists(fn):continue
    im=Image.open(fn)
    img.paste(im.resize((cw,ch),Image.LANCZOS),(x,110+lh-10+k*(ch+8)))
y=110+lh+2*(ch+8);dr.text((g,y),'Close-ups at 2x: the #1 moment in each take (the striking frame)',font=F(17),fill='#fff')
for i,(t,a,b,co) in enumerate(TAKES):
  fn=f'{S}/{t}-390-s0.png';x=g+i*(cw+g)
  if os.path.exists(fn):
    im=Image.open(fn);box={'B':(0,180,780,1100),'A':(0,560,780,1480),'D':(0,0,780,920)}.get(t,(0,340,780,1260))
    img.paste(im.crop(box).resize((cw,460),Image.LANCZOS),(x,y+30))
img.save(f'{O}/x2p-x3p-h14-cast6-390.png',optimize=True);print(img.size)
rows=[(t,a,b,co,Image.open(f'{S}/{t}-1280.png')) for t,a,b,co in TAKES if os.path.exists(f'{S}/{t}-1280.png')]
W=1280+2*g;Hh=96+sum(r[4].height+60 for r in rows)
img=Image.new('RGB',(W,Hh),'#151217');dr=ImageDraw.Draw(img)
dr.text((g,16),'cast6 · Meet the models that stands out · 1280px desktop (section shot at 1x)',font=F(26),fill='#fff');dr.text((g,52),foot,font=FR(16),fill='#bbb')
y=96
for t,a,b,co,im in rows:dr.text((g,y),f'{a} · {b} · {co}',font=F(16),fill='#ffd21f');img.paste(im,(g,y+26));y+=im.height+60
img.save(f'{O}/x2p-x3p-h14-cast6-1280.png',optimize=True);print(img.size)
