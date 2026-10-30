# /usr/bin/python3 board.py <shots dir> <width 1280|390> <out> [scrolled still]: Today, then T1 to T3 side by side, full tab length, with each tab's height
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1:4];EX=sys.argv[4] if len(sys.argv)>4 else None
T=[('now','Today (live X3+)'),('t1','T1 · The poster wall'),('t2','T2 · The bout sheet'),('t3','T3 · The poster and the rack')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
desk=int(W)>=600;S=1 if desk else 1  # desktop shots are 2x: shown at 1x; phone shots shown at 2x
ims=[]
for k,t in T:
  i=Image.open(f'{D}/up-{W}-{k}.png').convert('RGB')
  if desk:i=i.resize((i.width//2,i.height//2),Image.LANCZOS)
  ims.append((k,t,i))
sc=1 if desk else 2
F=ImageFont.truetype(FN,44 if desk else 36);F2=ImageFont.truetype(FR,28 if desk else 24)
ex=Image.open(EX).convert('RGB') if EX else None
cw=max(i.width for _,_,i in ims);G=60;top=150
hmax=max(i.height for _,_,i in ims)+((ex.height+120) if ex else 0)
B=Image.new('RGB',(len(ims)*(cw+G)+G+70,hmax+top+60),'#1b1820');d=ImageDraw.Draw(B)
for n,(k,t,i) in enumerate(ims):
  x=G+n*(cw+G)
  d.text((x,30),t,fill='#fdbc2a',font=F)
  css=i.height//sc
  d.text((x,30+(56 if desk else 46)),f'tab height {css:,} px at {W} wide',fill='#e8dfc8',font=F2)
  B.paste(i,(x,top))
  # scroll ruler: a bar as long as the tab, ticks every 1000 css px
  rx=x+cw+12;d.rectangle((rx,top,rx+10,top+i.height),fill='#fdbc2a')
  for y in range(0,css+1,1000):
    yy=top+y*sc;d.line((rx-4,yy,rx+16,yy),fill='#e8dfc8',width=3)
  if k=='t3' and ex:
    y=top+i.height+40;d.text((x,y),'T3 scrolled to Tuesday: the poster has changed with the night in view',fill='#fdbc2a',font=F2)
    e=ex.resize((cw,int(ex.height*cw/ex.width)),Image.LANCZOS);B.paste(e,(x,y+50))
B.save(OUT,optimize=True);print(OUT,B.size)
