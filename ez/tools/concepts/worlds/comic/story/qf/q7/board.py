# /usr/bin/python3 board.py <shots dir> <id> <out> "<label>"  four beats at 390, then the desktop beat 3
import sys
from PIL import Image,ImageDraw,ImageFont
D,ID,OUT,LAB=sys.argv[1:5]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
beats=['1 Locked','2 The close','3 Graded','4 The record']
ph=[Image.open(f'{D}/{ID}-b{i}.png').convert('RGB').resize((390,844),Image.LANCZOS) for i in (1,2,3,4)]
dk=Image.open(f'{D}/{ID}-d3.png').convert('RGB').crop((0,0,1280,800))
G=24;W=max(4*390+5*G,1280+2*G);Hh=80+40+844+G+40+800+G
B=Image.new('RGB',(W,Hh),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,22),LAB,fill='#fdbc2a',font=F)
for i,im in enumerate(ph):x=G+i*(390+G);d.text((x,86),'Beat '+beats[i]+' · 390',fill='#f3e6c4',font=f);B.paste(im,(x,120))
y=120+844+G;d.text((G,y),'Desktop 1280 x 800 · beat 3, graded',fill='#f3e6c4',font=f);B.paste(dk,(G,y+36))
B.save(OUT,optimize=True);print(OUT,B.size)
