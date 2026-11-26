# /usr/bin/python3 board.py <shots dir> <out prefix e.g. /home/user/Tokengame/ez/x2p-x3p-story-m-every>
# Writes <prefix>.png (390 section), -close.png (four tiles at 3x), -context.png (each take between live neighbours), -desktop.png (1280)
import sys
from PIL import Image,ImageDraw,ImageFont
D,O=sys.argv[1:3]
T=[('now','Today'),('g2','A · G2 · Golden-age newsprint (as made)'),('g5','A · G5 · Underground crosshatch (as made)'),
   ('m1','M · M1 · Cut and shaded: G5 ground, mark in full colour'),('m2','M · M2 · Engraved rings: pen lines echo the mark'),('m3','M · M3 · Newsprint and pen: dots ground, hatched shadow')]
FP='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';BG='#1b1820';GOLD='#fdbc2a'
def fit(d,t,w,s):
  f=ImageFont.truetype(FP,s)
  while d.textlength(t,font=f)>w and f.size>14:f=ImageFont.truetype(FP,f.size-1)
  return f
def row(name,suffix,thumb=None):
  ims=[(t,Image.open(f'{D}/{name}-{k}.png').convert('RGB')) for k,t in T]
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+120),BG);d=ImageDraw.Draw(B);x=40
  for t,i in ims:d.text((x,32),t,fill=GOLD,font=fit(d,t,i.width,30));B.paste(i,(x,100));x+=i.width+40
  if thumb:B.thumbnail(thumb)
  B.save(O+suffix,optimize=True);print(O+suffix,B.size)
row('season-390','.png');row('ctx-390','-context.png')
# close-ups: one row per take, Lilly, Shell, Mastercard, Chipotle
K=['LLY','SHEL.L','MA','CMG'];rows=[(t,[Image.open(f'{D}/close-{k}-{c}.png').convert('RGB') for c in K]) for k,t in T]
cw=max(i.width for _,r in rows for i in r);ch=max(i.height for _,r in rows for i in r)
B=Image.new('RGB',(40+4*(cw+30),len(rows)*(ch+100)+30),BG);d=ImageDraw.Draw(B);y=30
for t,r in rows:
  d.text((40,y),t,fill=GOLD,font=ImageFont.truetype(FP,38));x=40
  for i in r:B.paste(i,(x,y+62));x+=cw+30
  y+=ch+100
B.save(O+'-close.png',optimize=True);print(O+'-close.png',B.size)
ims=[(t,Image.open(f'{D}/season-1280-{k}.png').convert('RGB')) for k,t in T]
B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),BG);d=ImageDraw.Draw(B);y=30
for t,i in ims:d.text((40,y),t,fill=GOLD,font=ImageFont.truetype(FP,30));B.paste(i,(40,y+50));y+=i.height+90
B.save(O+'-desktop.png',optimize=True);print(O+'-desktop.png',B.size)
