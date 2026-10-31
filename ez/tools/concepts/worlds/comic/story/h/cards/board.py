# /usr/bin/python3 board.py <shots dir> <width> <out>   Today, then T1..T6 side by side (390) or stacked (1280); close-up row (3x) on the 390 board
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live)','$0'),('t1','T1 Doors: founder in his doorway','$0.59'),('t2','T2 Fight bill on card stock','$0.07'),('t3','T3 Steel locker + Dymo tape','$0.07'),
   ('t4','T4 Binder page, leader on holo foil','$0.07'),('t5','T5 Championship belt, metal = rank','$0.10'),('t6','T6 Cut from the costume, sewn patches','$0.15')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,30 if W<600 else 26);F2=ImageFont.truetype(FR,22)
ims=[(t,c,Image.open(f'{D}/{k}-{W}.png').convert('RGB')) for k,t,c in T]
def fit(d,t,f,w):
  while d.textlength(t,font=f)>w and f.size>14:f=ImageFont.truetype(FN,f.size-1)
  return f
if W<600:
  zs=[(t,Image.open(f'{D}/{k}-{W}-zoom.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/{k}-{W}-zoom.png')]
  zs=[(t,z.resize((ims[0][2].width,int(z.height*ims[0][2].width/z.width)))) for t,z in zs]
  colw=ims[0][2].width;H1=max(i.height for _,_,i in ims);H2=max(z.height for _,z in zs)
  B=Image.new('RGB',((colw+40)*len(ims)+40,H1+H2+300),'#1b1820');d=ImageDraw.Draw(B);x=40
  for (t,c,i) in ims:
    d.text((x,24),t,fill='#fdbc2a',font=fit(d,t,F,colw));d.text((x,64),'Hedra: '+c,fill='#e9dfc6',font=F2);B.paste(i,(x,110));x+=colw+40
  y=H1+170;d.text((40,y-50),'Close-ups at 3x: card 1 of each take (the leader)',fill='#fdbc2a',font=F);x=40
  for t,z in zs:B.paste(z,(x,y));x+=colw+40
else:
  B=Image.new('RGB',(max(i.width for _,_,i in ims)+80,sum(i.height+100 for _,_,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,c,i in ims:d.text((40,y),t+'   ·   Hedra: '+c,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+100
B.thumbnail((9000,12000));B.save(OUT,optimize=True);print(OUT,B.size)
