# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today, then X1 to X3, each in Season and Last 7 days
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30 if W<1000 else 40)
T=[('now','Today','gold circles, static'),('x1','X1 · The crown','a tiny crown per row, a bigger one on the leader'),('x2','X2 · Gold leaf','the golden ticket\'s foil laid under the leader'),('x3','X3 · Lift','the leading figure rises in gold relief')]
WN=[('season','Season'),('d7','Last 7 days')]
G=50
ims={(k,v):Image.open(f'{D}/sb-{W}-{k}-{v}.png').convert('RGB') for k,_,_ in T for v,_ in WN}
if W<1000:
  cw=max(i.width for i in ims.values());H=max(i.height for i in ims.values())
  B=Image.new('RGB',(4*cw+5*G,2*(H+150)+G),'#1b1820');d=ImageDraw.Draw(B)
  for c,(k,t,s) in enumerate(T):
    for r,(v,w) in enumerate(WN):
      x=G+c*(cw+G);y=G+r*(H+150);d.text((x,y),f'{t}  ·  {w}',fill='#fdbc2a',font=F);d.text((x,y+40),s,fill='#f8f0d9',font=F);B.paste(ims[(k,v)],(x,y+100))
else:
  cw=max(i.width for i in ims.values())
  rows=[max(ims[(k,v)].height for v,_ in WN) for k,_,_ in T]
  B=Image.new('RGB',(2*cw+3*G,sum(h+120 for h in rows)+G),'#1b1820');d=ImageDraw.Draw(B);y=G
  for (k,t,s),h in zip(T,rows):
    for c,(v,w) in enumerate(WN):
      x=G+c*(cw+G);d.text((x,y),f'{t}  ·  {w}  ·  {s}',fill='#fdbc2a',font=F);B.paste(ims[(k,v)],(x,y+60))
    y+=h+120
B.thumbnail((6000,9000));B.save(OUT,optimize=True);print(OUT,B.size)
