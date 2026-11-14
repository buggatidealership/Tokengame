#!/usr/bin/python3
# board.py <shots dir> <width> <out.png> : today's live back, then takes A to D, each on R64 (perfect), R80 (split), R51 (no winner)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s);G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
R=[(64,'R64 Samsung · perfect (4 of 4 right), 9.5'),(80,'R80 Exxon Mobil · split (2 of 4), 5.5'),(51,'R51 UPS · no winner (0 of 4), 1')]
T=[('now','Today (live X2+): the coded certificate, U2/C1'),
   ('a','A  The note: a black intaglio banknote; trades in four cartouches, the close in the guilloche oval, the grade struck in the gold seal'),
   ('b','B  The share: an engraved stock certificate on ivory bond; a register of four holders, PASS/FAIL stamped, gold seal'),
   ('c','C  The die: the chip turned over; one black silicon die per AI, the close on the strip, the grade in the gold contact ring'),
   ('d','D  The plate: a blackened steel vault plate; names cut into nickel, the close inlaid in black enamel, a gold medallion')]
box=(20,268,760,1522) if W<600 else (378,72,902,838)
cw=380 if W<600 else 360;ch=int(cw*(box[3]-box[1])/(box[2]-box[0]))
pad=22;lab=30;hd=40;Wb=pad+3*(cw+pad);H=80+len(T)*(hd+ch+lab+pad)
B=Image.new('RGB',(Wb,H),(14,12,20));d=ImageDraw.Draw(B)
d.text((pad,18),f'H36 cardback · the back of a graded round, painted (Hedra gpt-image-2), live text printed into blank fields · {W}px',font=F(19),fill=(255,210,63))
d.text((pad,48),'Inside the real round pop-up of v46-live-x2plus.html; every word and number from ROUNDS and the card\'s own grade. Fonts: Bangers / Anton / Shantell Sans.',font=G(15),fill=(200,192,176))
y=80
for k,t in T:
  d.text((pad,y+10),t[:132],font=F(14),fill=(248,240,217));y+=hd;x=pad
  for n,l in R:
    try:B.paste(Image.open(f'{D}/{k}-{n}-{W}.png').convert('RGB').crop(box).resize((cw,ch),Image.LANCZOS),(x,y))
    except Exception as e:d.text((x,y+20),'missing',font=G(18),fill=(255,90,90))
    d.text((x,y+ch+6),l,font=G(15),fill=(200,192,176));x+=cw+pad
  y+=ch+lab+pad
B.save(OUT,optimize=True);print(OUT,B.size)
