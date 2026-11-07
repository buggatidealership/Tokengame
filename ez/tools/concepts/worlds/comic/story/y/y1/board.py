# /usr/bin/python3 board.py <shots dir> <out>: y1 board: one card large (390 at DPR 3), the section at 390, the section at 1280
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
B_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',40);R_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',26)
card=Image.open(f'{D}/390-y1-card.png').convert('RGB');card=card.crop((0,30,card.width,card.height-30));s390=Image.open(f'{D}/390-y1.png').convert('RGB');s1280=Image.open(f'{D}/1280-y1.png').convert('RGB')
P=40;W=max(card.width+s390.width+3*P,s1280.width+2*P);top=190
H=top+max(card.height,s390.height)+P+60+s1280.height+P
B=Image.new('RGB',(W,H),'#1b1820');d=ImageDraw.Draw(B)
d.text((P,30),'y1 · The mirror',fill='#fdbc2a',font=B_)
d.text((P,80),'Each model at its own dressing-room mirror: name on a chipped enamel plate, its mark lit in the glass,',fill='#e8dcc0',font=R_);d.text((P,112),'the last five calls as the bulbs (lit = right, dead = wrong), the key light green when up, red when down.',fill='#e8dcc0',font=R_)
d.text((P,top-34),'One card, 390 wide at 3x',fill='#b9b19b',font=R_);B.paste(card,(P,top))
x2=P*2+card.width;d.text((x2,top-34),'The section at 390',fill='#b9b19b',font=R_);B.paste(s390,(x2,top))
y=top+max(card.height,s390.height)+P+40;d.text((P,y-34),'The section at 1280',fill='#b9b19b',font=R_);B.paste(s1280,(P,y))
B.save(OUT,optimize=True);print(OUT,B.size)
