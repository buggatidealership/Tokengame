# /usr/bin/python3 board.py <shots dir> <width> <out> [suffix e.g. -gal] [maxh in shot px]: Today, then the three takes, side by side (phones) or stacked (desktop)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1:4];SUF=sys.argv[4] if len(sys.argv)>4 else '';MX=int(sys.argv[5]) if len(sys.argv)>5 else 99999
T=[('now','Today'),('g1','G · G1 · The blow-up, drifting'),('g2','G · G2 · The charge, pulsing to the bell'),('g3','G · G3 · The fight-night banner')]
if SUF:T=T[1:]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,30 if int(W)<600 else 40)
ims=[]
for k,t in T:
  i=Image.open(f'{D}/up-{W}-{k}{SUF}.png').convert('RGB');ims.append((t,i.crop((0,0,i.width,min(i.height,MX)))))
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    f=F
    while d.textlength(t,font=f)>i.width and f.size>16:f=ImageFont.truetype(FN,f.size-1)
    d.text((x,30),t,fill='#fdbc2a',font=f);B.paste(i,(x,90));x+=i.width+40
else:
  cw=max(i.width for _,i in ims);ch=max(i.height for _,i in ims);n=len(ims);cols=2
  B=Image.new('RGB',(cols*cw+40*(cols+1),-(-n//cols)*(ch+100)+30),'#1b1820');d=ImageDraw.Draw(B)
  for k,(t,i) in enumerate(ims):
    x=40+(k%cols)*(cw+40);y=30+(k//cols)*(ch+100);d.text((x,y),t,fill='#fdbc2a',font=F);B.paste(i,(x,y+60))
B.thumbnail((7000,7000));B.save(OUT,optimize=True);print(OUT,B.size)
