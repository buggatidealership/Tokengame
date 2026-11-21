# /usr/bin/python3 tenboard.py <shots dir> <out>: all ten logo tiles at 390 for every take, one row per take
import sys,glob,re
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1:3]
R=[('s1+s1s+c1','C1 as it is now'),('s1+s1s+g1','G1 · Pop-art blow-up'),('s1+s1s+g2','G2 · Golden-age newsprint'),('s1+s1s+g3','G3 · UPA flat modern'),('s1+s1s+g4','G4 · Kirby cosmic'),('s1+s1s+g5','G5 · Underground crosshatch')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
rows=[]
for k,t in R:
  fs=sorted(glob.glob(f'{D}/ten-{k}-*.png'),key=lambda f:-int(re.search(r'-(\d+)\.png$',f).group(1)))
  rows.append((t,[Image.open(f).convert('RGB') for f in fs]))
cw=max(i.width for _,r in rows for i in r);ch=max(i.height for _,r in rows for i in r);n=max(len(r) for _,r in rows)
B=Image.new('RGB',(40+n*(cw+20),len(rows)*(ch+80)+30),'#1b1820');d=ImageDraw.Draw(B);y=20
for t,r in rows:
  d.text((40,y),t,fill='#fdbc2a',font=F);x=40
  for i in r:B.paste(i,(x,y+50));x+=cw+20
  y+=ch+80
B.save(OUT,optimize=True);print(OUT,B.size)
