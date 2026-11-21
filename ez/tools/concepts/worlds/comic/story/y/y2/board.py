# /usr/bin/python3 board.py <shots dir> <out>: y2 board. Label strip, the Grok card at 390 DPR 3, the section at 390, the section at 1280
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
FB=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',44);FS=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',30)
card=Image.open(f'{D}/390-y2-card.png').convert('RGB');card=card.crop((0,24,card.width,card.height));now=Image.open(f'{D}/390-now.png').convert('RGB');ph=Image.open(f'{D}/390-y2.png').convert('RGB');dk=Image.open(f'{D}/1280-y2.png').convert('RGB')
W=max(dk.width,card.width+ph.width+60)+80;top=180
H=top+max(card.height+now.height+180,ph.height+70)+80+dk.height+70+40
B=Image.new('RGB',(W,H),'#1b1820');d=ImageDraw.Draw(B)
d.text((40,28),'y2  The road case',fill='#fdbc2a',font=FB)
d.text((40,84),'Each model is the lid of its flight case under a work lamp in its colour: stencilled name, flag sticker,',fill='#f8f0d9',font=FS)
d.text((40,120),'label-maker record, inventory dots for the last five, a polaroid of its best round taped down.',fill='#f8f0d9',font=FS)
d.text((40,top),'One card, 390 wide at 3x',fill='#fdbc2a',font=FS);B.paste(card,(40,top+44))
yn=top+44+card.height+60;d.text((40,yn),'Today, for comparison (390)',fill='#9a937f',font=FS);B.paste(now,(40,yn+44))
x2=40+card.width+60;d.text((x2,top),'The section at 390',fill='#fdbc2a',font=FS);B.paste(ph,(x2,top+44))
y3=top+max(card.height+now.height+104,ph.height)+44+80;d.text((40,y3),'The section at 1280',fill='#fdbc2a',font=FS);B.paste(dk,(40,y3+44))
B.save(OUT,optimize=True);print(OUT,B.size)
