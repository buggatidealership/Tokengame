# /usr/bin/python3 board.py <shots dir> <id> <tradition> <idea> <out>: four beats at 390, then beat 3 at 1280x800
import sys
from PIL import Image,ImageDraw,ImageFont
D,ID,TR,IDEA,OUT=sys.argv[1:6]
FB=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);FS=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
ph=[Image.open(f'{D}/{ID}-390-b{i}.png').convert('RGB').resize((390,844),Image.LANCZOS) for i in range(1,5)]
dk=Image.open(f'{D}/{ID}-1280-b3.png').convert('RGB')
G=30;W=4*390+5*G;Hh=110
B=Image.new('RGB',(W,Hh+844+70+800+G+40),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,22),f'{ID.upper()} · {TR}',fill='#fdbc2a',font=FB);d.text((G,66),IDEA,fill='#e9e1cf',font=FS)
for i,(im,t) in enumerate(zip(ph,['1 Locked','2 The close','3 Graded','4 Hand-off'])):
  x=G+i*(390+G);B.paste(im,(x,Hh+30));d.text((x,Hh+2),t+' · 390',fill='#9fd',font=FS)
y=Hh+30+844+40;d.text((G,y-30),'Beat 3 · desktop 1280x800',fill='#9fd',font=FS);B.paste(dk,((W-1280)//2,y+4))
B.save(OUT,optimize=True);print(OUT,B.size)
