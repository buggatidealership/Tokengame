# /usr/bin/python3 closeboard.py <shots dir> <out>: 4x close-ups, one row per take, three tiles each
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1:3]
R=[('s1+s1s+c1','C1 as it is now'),('s1+s1s+g1','G1 · Pop-art blow-up'),('s1+s1s+g2','G2 · Golden-age newsprint'),('s1+s1s+g3','G3 · UPA flat modern'),('s1+s1s+g4','G4 · Kirby cosmic'),('s1+s1s+g5','G5 · Underground crosshatch')]
K=['LLY','CAT','VOW3.DE']
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',44)
rows=[(t,[Image.open(f'{D}/close-{k}-{c}.png').convert('RGB') for c in K]) for k,t in R]
cw=max(i.width for _,r in rows for i in r);ch=max(i.height for _,r in rows for i in r)
B=Image.new('RGB',(40+3*(cw+40),len(rows)*(ch+110)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
for t,r in rows:
  d.text((40,y),t,fill='#fdbc2a',font=F);x=40
  for i in r:B.paste(i,(x,y+70));x+=cw+40
  y+=ch+110
B.save(OUT,optimize=True);print(OUT,B.size)
