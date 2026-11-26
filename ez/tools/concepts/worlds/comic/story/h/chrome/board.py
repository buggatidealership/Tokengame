# /usr/bin/python3 board.py <shots dir> <width> <out> : one row per part (today, then four takes, label + Hedra cost), then a close-up row
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
P=[('Header (sticky; height measured)','h',[('now-h','Today'),('h1','H1 Masthead: painted dusk skyline of exchange towers, extruded name, paper-tag tabs','$0.03'),('h2','H2 Cover corner box: newsprint band, logo in the corner box with No. = rounds graded and Free; contents-line tabs; price-burst pill','$0.03'),('h3','H3 Ringside: three painted ring ropes; fight tags clipped to the bottom rope','$0.03'),('h4','H4 Marquee: bulb-lit theatre board, name set in letter tiles, the open tab lit','$0.03')]),
 ('Explainer film frame','f',[('now-f','Today'),('f1','F1 Toy theatre: crimson + emerald curtains, gilt plaque presents, velvet banner names it','$0.03'),('f2','F2 Console TV: walnut 1960s set, masking-tape label, running time on a knob tag','$0.03'),('f3','F3 Through the page: film seen through a hole torn in a comic page; caption box + time burst','$0.03'),('f4','F4 Drive-in: film on the big screen at dusk, bulb-lit letter board at the foot','$0.03')]),
 ('Back cover','b',[('now-b','Today'),('b1','B1 Closing bell: struck brass bell; motto rings out as a sound effect; Follow as a ticket','$0.05'),('b2','B2 After the fight: empty ring, confetti; motto caption; Follow tag clipped on','$0.03'),('b3','B3 Closing time: newsstand shutter half down, motto painted on the slats; Follow sticker','$0.03'),('b4','B4 The last panel: rooftop sunset, motto lettered in the sky; Follow caption','$0.03')]),
 ('Desktop crawl (1280 only)','c',[('now-c','Today'),('c1','C1 Ticker: tape spooling out of a painted brass ticker; bell on a station clock','$0.11'),('c2','C2 Studio: painted ON AIR lamp (words are page text), studio clock','$0.11'),('c3','C3 Caption chain: each item on its own cut caption box; painted mic','$0.05'),('c4','C4 Marquee: crawl on the H4 bulb board; red neon On air','$0 (reuses H4)')]),
 ('Loading cover','l',[('now-l','Today'),('l1','L1 Curtain call: logo in the spotlight on the closed curtain','$0.03'),('l2','L2 Off the press: logo and issue No. come off an inked roller','$0.03'),('l3','L3 Ring at night: logo printed on the canvas under one light','$0.03'),('l4','L4 Cover corner: logo in the cover\'s corner box with No. and Free (H2\'s family)','$0 (reuses H2)')])]
F=ImageFont.truetype(FN,20 if W<600 else 22);FH=ImageFont.truetype(FN,34)
rows=[]
for title,k,ts in P:
  ims=[]
  for t in ts:
    f=f'{D}/{k}-{W}-{t[0]}.png'
    if os.path.exists(f):
      im=Image.open(f).convert('RGB')
      if W>=600:im=im.resize((im.width//2,im.height//2))
      ims.append((t,im))
  if ims:rows.append((title,ims))
cw=max(i.width for _,ims in rows for _,i in ims);pad=30;lh=92
Hs=[max(i.height for _,i in ims)+lh+60 for _,ims in rows]
CU=[]
for t in ['now-h','h1','h2','h3','h4'] if W<600 else ['now-c','c1','c2','c3','c4']:
  k=t.replace('now-','')[0];f=f'{D}/{k}-{W}-{t}.png'
  if os.path.exists(f):
    im=Image.open(f).convert('RGB');CU.append(im.crop((0,0,min(im.width,cw),min(im.height,230 if W<600 else 230))))
cuh=(max(i.height for i in CU)+90) if CU else 0
B=Image.new('RGB',(pad+(cw+pad)*5,sum(Hs)+40+cuh),'#1b1820');d=ImageDraw.Draw(B);y=20
def wrap(t,w):
  ws=t.split(' ');ls=['']
  for x in ws:
    if d.textlength(ls[-1]+' '+x,font=F)>w:ls.append(x)
    else:ls[-1]=(ls[-1]+' '+x).strip()
  return ls
for (title,ims),h in zip(rows,Hs):
  d.text((pad,y),title,fill='#f8f0d9',font=FH);x=pad
  for t,i in ims:
    ls=wrap(t[1],cw)[:3]
    for n,l in enumerate(ls):d.text((x,y+50+n*24),l,fill='#fdbc2a',font=F)
    if len(t)>2:d.text((x+cw-d.textlength('Hedra '+t[2],font=F),y+50+3*24-2),'Hedra '+t[2],fill='#9fe0b8',font=F)
    B.paste(i,(x,y+50+lh));x+=cw+pad
  y+=h
if CU:
  d.text((pad,y),'Close-up at device pixels: '+('the header, logo, name and pill' if W<600 else 'the crawl\'s left end and the first items'),fill='#f8f0d9',font=FH);x=pad
  for i in CU:B.paste(i,(x,y+60));x+=cw+pad
B.save(OUT,optimize=True);print(OUT,B.size)
