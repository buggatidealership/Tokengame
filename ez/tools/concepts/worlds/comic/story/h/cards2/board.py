# /usr/bin/python3 board.py <shots dir> <width> <out>   Today, then the six takes; on the 390 board a close-up row (3x, card #1) under them
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live)','$0'),
   ('a1','A1 Painted world + cut paper','scenes $0.27 + 2K $0.32 · paper $0.22'),('a2','A2 Painted world + ink brush','scenes (shared) · brush masks $0.11'),
   ('b1','B1 Satin fight robe + cut paper','robes $0.15'),('b2','B2 Satin fight robe + ink brush','robes (shared)'),
   ('c1','C1 Fight-poster stock + cut paper','posters $0.15'),('c2','C2 Fight-poster stock + ink brush','posters (shared)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,30 if W<600 else 28);F2=ImageFont.truetype(FR,21)
ims=[(t,c,Image.open(f'{D}/{k}-{W}.png').convert('RGB')) for k,t,c in T]
def fit(d,t,f,w):
  while d.textlength(t,font=f)>w and f.size>14:f=ImageFont.truetype(FN,f.size-1)
  return f
if W<600:
  zs=[(t,Image.open(f'{D}/{k}-{W}-zoom.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/{k}-{W}-zoom.png')]
  colw=ims[0][2].width;zs=[(t,z.resize((colw,int(z.height*colw/z.width)))) for t,z in zs]
  H1=max(i.height for _,_,i in ims);H2=max(z.height for _,z in zs)
  B=Image.new('RGB',((colw+40)*len(ims)+40,H1+H2+300),'#1b1820');d=ImageDraw.Draw(B);x=40
  for (t,c,i) in ims:
    d.text((x,24),t,fill='#fdbc2a',font=fit(d,t,F,colw));d.text((x,64),'Hedra: '+c,fill='#e9dfc6',font=fit(d,'Hedra: '+c,F2,colw));B.paste(i,(x,110));x+=colw+40
  y=H1+170;d.text((40,y-50),'Close-ups at 3x: card #1 of each take',fill='#fdbc2a',font=F);x=40
  for t,z in zs:B.paste(z,(x,y));x+=colw+40
else:
  B=Image.new('RGB',(max(i.width for _,_,i in ims)+80,sum(i.height+100 for _,_,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,c,i in ims:d.text((40,y),t+'   ·   Hedra: '+c,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+100
B.save(OUT,optimize=True);print(OUT,B.size)
