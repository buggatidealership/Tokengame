# /usr/bin/python3 board.py <shots dir> <out>: y3 board: one card large (390 at DPR 3), the section at 390x844, the section at 1280
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',44);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',30)
card=Image.open(f'{D}/card-y3.png').convert('RGB');ph=Image.open(f'{D}/s390-y3.png').convert('RGB');dk=Image.open(f'{D}/s1280-y3.png').convert('RGB')
dk=dk.resize((dk.width*1100//dk.width*2//2,dk.height*1100*2//dk.width//2)) if False else dk
G=40;Wd=max(card.width+G+ph.width,dk.width)+2*G
B=Image.new('RGB',(Wd,140+60+max(card.height,ph.height)+G+60+dk.height+G),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,30),'y3 · The door',fill='#fdbc2a',font=F)
d.text((G,88),'Each model behind its own dressing-room door: paint and light in its colour, rank on a brass star, the stats on a call sheet pinned to the door.',fill='#f8f0d9',font=f)
y=150;d.text((G,y),'One card, 390 wide at 3x',fill='#b5ad9c',font=f);d.text((G+card.width+G,y),'The section at 390x844',fill='#b5ad9c',font=f)
B.paste(card,(G,y+50));B.paste(ph,(G+card.width+G,y+50));y+=50+max(card.height,ph.height)+G
d.text((G,y),'The section at 1280',fill='#b5ad9c',font=f);B.paste(dk,(G,y+50))
B.save(OUT,optimize=True);print(OUT,B.size)
