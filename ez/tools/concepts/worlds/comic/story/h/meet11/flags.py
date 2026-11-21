# /usr/bin/python3 flags.py <out.png> : the four flag takes on the four chip paintings (gen.py out/, no live text), a row per take
import sys,os
from PIL import Image,ImageDraw,ImageFont
H=os.path.dirname(os.path.abspath(__file__));out=sys.argv[1]
T=[('o','The re-laid chip, no flag (name window, short P&L and W-L, plate moved down)'),('a','A  Copper: the canton and stripes as copper pours and traces on the model\'s own mask'),('b','B  Mask: the solder mask printed in the flag\'s colours'),('c','C  Silhouette: the flag in the mask\'s own ink, darker and lighter'),('d','D  Waving: B with the flag rippled and its folds shaded')]
M=['grok','claude','gpt','kimi'];w=600;h=243;g=16;lab=40
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
o=Image.new('RGB',(g+4*(w+g),g+len(T)*(lab+h+g)),'#f3eee2');d=ImageDraw.Draw(o);y=g
for t,l in T:
  d.text((g,y+8),l,fill='#111',font=F);y+=lab
  for i,m in enumerate(M):
    f=f'{H}/out/chip12{t}-{m}-1800.jpg' if t=='o' else f'{H}/out/chip12{t}-{m}-1200.jpg'
    o.paste(Image.open(f).convert('RGB').resize((w,h),Image.LANCZOS),(g+i*(w+g),y))
  y+=h+g
o.save(out,optimize=True);print(out,o.size,round(os.path.getsize(out)/1e6,2),'MB')
