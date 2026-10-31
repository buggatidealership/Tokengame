# /usr/bin/python3 closeboard.py <dir> <out>: the four close-up cards, one row per take
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1:3];T=[('g1','G1 · The blow-up, drifting'),('g2','G2 · The charge, pulsing to the bell'),('g3','G3 · The fight-night banner')]
CAP=['Made-up 4 vs 0 (Coinbase, all down)','Amazon: 1 bull vs 3 bears','Intel: 2 vs 2, a wordmark','NVIDIA: Bet #1, calls not in yet']
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,34);f2=ImageFont.truetype(FN,24)
rows=[[Image.open(f'{D}/close-{k}-{i}.png').convert('RGB') for i in range(4)] for k,_ in T]
cw=max(i.width for r in rows for i in r);rh=[max(i.height for i in r) for r in rows]
B=Image.new('RGB',(4*cw+5*40,sum(h+120 for h in rh)+60),'#1b1820');d=ImageDraw.Draw(B);y=30
for (k,t),r,h in zip(T,rows,rh):
  d.text((40,y),'G · '+t,fill='#fdbc2a',font=F)
  for i,im in enumerate(r):x=40+i*(cw+40);d.text((x,y+48),CAP[i],fill='#e9dfc6',font=f2);B.paste(im,(x,y+90))
  y+=h+120
B.save(OUT,optimize=True);print(OUT,B.size)
