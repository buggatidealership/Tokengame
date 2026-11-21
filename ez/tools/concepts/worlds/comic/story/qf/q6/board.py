# /usr/bin/python3 board.py <shots dir> <id> <label> <out png>: four phone beats on top (390 wide), the desktop beat 3 below, a label strip
import sys
from PIL import Image,ImageDraw,ImageFont
D,ID,LB,OUT=sys.argv[1:5]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',24);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
G=16;W=4*390+5*G;B=Image.new('RGB',(W,70+844+G+28+800+G),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,20),LB,fill='#fdbc2a',font=F)
for i in range(4):
  x=G+i*(390+G);B.paste(Image.open(f'{D}/{ID}-390-b{i+1}.png').convert('RGB').resize((390,844),Image.LANCZOS),(x,70));d.text((x,54-2),f'Beat {i+1} · 390',fill='#efe2c4',font=f)
y=70+844+G;d.text((G,y+4),'Beat 3 · 1280 × 800',fill='#efe2c4',font=f)
B.paste(Image.open(f'{D}/{ID}-1280-b3.png').convert('RGB').resize((1280,800),Image.LANCZOS),((W-1280)//2,y+28))
B.save(OUT,optimize=True);print(OUT,B.size)
