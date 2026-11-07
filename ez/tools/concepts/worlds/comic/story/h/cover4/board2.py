# /usr/bin/python3 board2.py <shots> <cu> <out> : D's four swipe panels at 390, then 3x close-ups of every take
import sys,textwrap
from PIL import Image,ImageDraw,ImageFont
S,CU,OUT=sys.argv[1:4];F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
pad=24
st=[Image.open(f'{S}/dstrip-{i}.png').convert('RGB') for i in range(1,5)]
cu=[Image.open(f'{CU}/cu-390-{k}.png').convert('RGB') for k in 'abcde']
cu=[i.resize((int(i.width*.62),int(i.height*.62))) for i in cu]
W=max(sum(i.width+pad for i in st),sum(i.width+pad for i in cu))+pad
H=pad+40+max(i.height for i in st)+pad+40+max(i.height for i in cu)+pad
B=Image.new('RGB',(W,H),(24,22,30));d=ImageDraw.Draw(B);y=pad
d.text((pad,y),'D at 390px: the strip swiped to each panel (one step per beat; the next panel peeks in at the right)',font=F(22),fill=(255,214,60));y+=40;x=pad
for i in st:B.paste(i,(x,y));x+=i.width+pad
y+=max(i.height for i in st)+pad
d.text((pad,y),'Close-ups at 3x (390px phone): A, B, C, D (first panel), E',font=F(22),fill=(255,214,60));y+=40;x=pad
for i in cu:B.paste(i,(x,y));x+=i.width+pad
B.save(OUT,optimize=True);print(OUT,B.size)
