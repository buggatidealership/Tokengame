# /usr/bin/python3 board.py <shots dir> <width> <out.png> [ids now,a,b,c]: the takes side by side, each under its label,
# scaled to one column width; tallest sets the board's height.
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
IDS=(sys.argv[4] if len(sys.argv)>4 else 'now,a,b,d').split(',')
LAB={'now':'Today (live X2+)','a':'A · Say it first','b':'B · One chip + split','d':'D · Plain (simplest)'}
SUB={'now':'vault, date line, chip, board D, sockets','a':'the owner\'s words, the chip, right | wrong','b':'the words drawn into the chip, then right | wrong','d':'words, one picture, words'}
col=420 if W<600 else 900
ims=[]
for i in IDS:
  im=Image.open(f'{D}/{i}-{W}.png').convert('RGB');k=col/im.width;ims.append(im.resize((col,int(im.height*k)),Image.LANCZOS))
try:
  F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22 if W<600 else 30);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',15 if W<600 else 20)
except Exception:F=f=ImageFont.load_default()
g=24;top=78 if W<600 else 96
H=max(i.height for i in ims)+top+g
B=Image.new('RGB',(len(ims)*col+(len(ims)+1)*g,H),(18,18,20));d=ImageDraw.Draw(B)
for n,(i,im) in enumerate(zip(IDS,ims)):
  x=g+n*(col+g);d.text((x,14),LAB.get(i,i),fill=(255,214,60),font=F);d.text((x,14+(32 if W<600 else 42)),SUB.get(i,''),fill=(220,214,196),font=f);B.paste(im,(x,top))
B.save(OUT,optimize=True);print(OUT,B.size)
