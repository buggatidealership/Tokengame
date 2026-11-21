# /usr/bin/python3 board.py <shots dir> <width> <out>: Today, then H1 to H3 (first screen from the page top; a dashed line marks the phone's fold)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today'),('h1','H · H1 · The loop, alive'),('h2','H · H2 · Fight for the golden ticket'),('h3','H · H3 · The lenticular variant')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,30)
ims=[(t,Image.open(f'{D}/cover-{W}-{k}.png').convert('RGB')) for k,t in T]
FOLD=(844 if W<600 else 1000)*2
def fold(i):
  d=ImageDraw.Draw(i)
  if i.height>FOLD:
    for x in range(0,i.width,24):d.line([(x,FOLD),(x+12,FOLD)],fill='#e0352d',width=4)
  return i
ims=[(t,fold(i)) for t,i in ims]
if W<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+150),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    f=F
    while d.textlength(t,font=f)>i.width and f.size>16:f=ImageFont.truetype(FN,f.size-1)
    d.text((x,30),t,fill='#fdbc2a',font=f);B.paste(i,(x,90));x+=i.width+40
  d.text((40,B.height-48),'Red dashes: where a %dx844 phone screen ends.'%W,fill='#e9dfc6',font=ImageFont.truetype(FN,24))
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.thumbnail((7000,9000));B.save(OUT,optimize=True);print(OUT,B.size)
