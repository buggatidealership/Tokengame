# /usr/bin/python3 loadboard.py <shots> <out> : the loading cover, today first, phone row then desktop row, plus a 3x close-up of each logo
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2];F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',18);Fr=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
T=[('now','Today (live): L3, the ring at night','the rejected ring; 2 images'),('h','Lh · hanging factory lamp','painted (gpt-image-2 1K, $0.06); +93 KB phone, +73 KB desk'),('s','Ls · the rack\'s street lamp','painted, the lamp post from the newsstand scene ($0.06); +100 KB / +66 KB'),('c','Lc · drawn lamp, no image','hand-cut tin shade in the logo green, halftone cone; 0 KB, works from first paint')]
B=Image.new('RGB',(4*410+20,100+844+30+270),'#14121a');d=ImageDraw.Draw(B)
for i,(t,a,b) in enumerate(T):
  x=10+i*410;d.text((x,10),a,font=F,fill='#ffe14d');[d.text((x,36+j*16),ln,font=Fr,fill='#ddd') for j,ln in enumerate(__import__('textwrap').wrap(b,52))]
  p=Image.open(f'{D}/load-390-{t}.png').resize((390,844));B.paste(p,(x,100))
  q=Image.open(f'{D}/load-1280-{t}.png').resize((400,250));B.paste(q,(x,100+844+30))
  c=Image.open(f'{D}/load-390-{t}.png');w,h=c.size;cc=c.crop((w//2-130,int(h*.38),w//2+130,int(h*.38)+260+260)).resize((260,520));B.paste(cc,(x,80+844+30+260)) if False else None
d.text((10,100+844+8),'1280 x 800',font=Fr,fill='#aaa')
B.save(OUT,optimize=True);print(OUT,B.size)
