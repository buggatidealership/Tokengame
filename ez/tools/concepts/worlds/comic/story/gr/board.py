# /usr/bin/python3 board.py <shots dir> <width> <out>: today, then G1 to G3
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
T=[('now','Today'),('g1','G1 · Fight card: the dressing-room mirror'),('g2','G2 · Interior page: panels and captions'),('g3','G3 · The backstage corridor: four doors')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',22)
ims=[(t,Image.open(f'{D}/{W}-{k}.png').convert('RGB')) for k,t in T]
note='Source film is 854x480: art is upscaled about 1.7x on a phone and 2.9x on desktop at 2x pixel density, so it looks soft. A full-resolution re-export would fix it.'
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+150),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    lab=t if len(t)<34 else t.split(':')[0];d.text((x,30),lab,fill='#fdbc2a',font=F);d.text((x,70),t.split(':')[1].strip() if ':' in t else '',fill='#e8dcc0',font=f2);B.paste(i,(x,110));x+=i.width+40
  d.text((40,B.height-34),note,fill='#b9b19b',font=f2)
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+80),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
  d.text((40,y),note,fill='#b9b19b',font=f2)
B.thumbnail((6000,6000));B.save(OUT,optimize=True);print(OUT,B.size)
