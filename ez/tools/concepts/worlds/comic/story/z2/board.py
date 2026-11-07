# /usr/bin/python3 board.py <shots dir> <ez dir>: phone and desktop boards for z2 (Silver/Bronze Age issue), split under 7800 px
import sys
from PIL import Image,ImageDraw,ImageFont
D,E=sys.argv[1],sys.argv[2]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26)
def board(src,name,label):
  im=Image.open(src).convert('RGB');W,H=im.size;LIM=7800-70;parts=[]
  y=0
  while y<H:parts.append(im.crop((0,y,W,min(H,y+LIM))));y+=LIM
  for i,p in enumerate(parts):
    B=Image.new('RGB',(W,p.height+70),'#1b1820');d=ImageDraw.Draw(B)
    d.text((20,20),label+(f'  ({i+1}/{len(parts)})' if len(parts)>1 else ''),fill='#fdbc2a',font=F);B.paste(p,(0,70))
    out=f'{E}/x2p-x3p-wow-z2-{name}'+(f'-{i+1}' if len(parts)>1 else '')+'.png';B.save(out,optimize=True);print(out,B.size)
board(f'{D}/full-390.png','phone','Z2 · Silver/Bronze Age: the Overview as one issue · 390')
board(f'{D}/full-1280.png','desktop','Z2 · Silver/Bronze Age: the Overview as one issue · 1280')
