# /usr/bin/python3 board.py <shots dir> <width> <out.png>: today's Smart-or-lucky and the five directions
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today'),('d1','D1 · Vs. Lady Luck'),('d2','D2 · The People v. Luck'),('d3','D3 · The climb'),('d4','D4 · Hot or not'),('d5','D5 · Test your skill')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
ims=[(t,Image.open(f'{D}/{W}-{k}.png').convert('RGB')) for k,t in T]
pad=40
if W<600:
  cw=ims[0][1].width;H=max(im.height for _,im in ims)+110
  B=Image.new('RGB',(len(ims)*(cw+pad)+pad,H),'#1b1820');d=ImageDraw.Draw(B)
  for i,(t,im) in enumerate(ims):x=pad+i*(cw+pad);d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(im,(x,80))
else:
  cw=ims[0][1].width;H=sum(im.height+80 for _,im in ims)+pad
  B=Image.new('RGB',(cw+2*pad,H),'#1b1820');d=ImageDraw.Draw(B);y=20
  for t,im in ims:d.text((pad,y),t,fill='#fdbc2a',font=F);B.paste(im,(pad,y+50));y+=im.height+80
B.thumbnail((5200,8000));B.save(OUT,optimize=True);print(OUT,B.size)
