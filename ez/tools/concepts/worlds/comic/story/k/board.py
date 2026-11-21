# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out>: Today, then K1 to K4 (the first screen from the page top; red dashes where the
# phone screen ends), then each one-at-a-time take's four steps.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live)'),('k1','K · K1 · The strip, one panel at a time'),('k2','K · K2 · The lenticular card'),('k3','K · K3 · The tear-off ticket pad'),('k4','K · K4 · The loop, refined (H1)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,34);FS=ImageFont.truetype(FN,26)
BG='#1b1820';GO='#fdbc2a';CR='#e9dfc6'
FOLD=(844 if W<600 else 1000)*2
def fold(i):
  d=ImageDraw.Draw(i)
  if i.height>FOLD:
    for x in range(0,i.width,24):d.line([(x,FOLD),(x+12,FOLD)],fill='#e0352d',width=5)
  return i
cov=[(t,fold(Image.open(f'{D}/cover-{W}-{k}.png').convert('RGB'))) for k,t in T]
steps=[(t,[Image.open(f'{D}/step-{W}-{k}-{n}.png').convert('RGB') for n in range(1,5)]) for k,t in T if os.path.exists(f'{D}/step-{W}-{k}-1.png')]
def fit(d,t,f,w):
  while d.textlength(t,font=f)>w and f.size>16:f=ImageFont.truetype(FN,f.size-1)
  return f
if W<600:
  cw=sum(i.width for _,i in cov)+40*(len(cov)+1);ch=max(i.height for _,i in cov)+150
  sw=max(sum(s.width for s in ss)+40*5 for _,ss in steps);sh=sum(max(s.height for s in ss)+110 for _,ss in steps)
  B=Image.new('RGB',(max(cw,sw),ch+sh+80),BG);d=ImageDraw.Draw(B);x=40
  for t,i in cov:d.text((x,30),t,fill=GO,font=fit(d,t,F,i.width));B.paste(i,(x,90));x+=i.width+40
  d.text((40,ch-40),'Red dashes: where a %dx844 phone screen ends. Each take shows step 1; its four steps follow below.'%W,fill=CR,font=FS)
  y=ch+40
  for t,ss in steps:
    d.text((40,y),t+' · the four steps, one at a time',fill=GO,font=F);x=40
    for n,s in enumerate(ss):d.text((x,y+52),'Step %d'%(n+1),fill=CR,font=FS);B.paste(s,(x,y+90));x+=s.width+40
    y+=max(s.height for s in ss)+110
else:
  rows=[]
  for k,t in T:
    i=[c for tt,c in cov if tt==t][0];ss=[s for tt,s2 in steps if tt==t for s in s2]
    rows.append((t,i,ss))
  w4=(2560-40*3)//4
  def sh(ss):return int(ss[0].height*w4/ss[0].width)+70 if ss else 0
  B=Image.new('RGB',(2640,sum(i.height+110+sh(ss) for _,i,ss in rows)+40),BG);d=ImageDraw.Draw(B);y=30
  for t,i,ss in rows:
    d.text((40,y),t,fill=GO,font=F);B.paste(i,(40,y+56));y+=i.height+90
    if ss:
      x=40
      for n,s in enumerate(ss):s2=s.resize((w4,int(s.height*w4/s.width)));d.text((x,y),'Step %d'%(n+1),fill=CR,font=FS);B.paste(s2,(x,y+36));x+=w4+40
      y+=sh(ss)+20
B.save(OUT,optimize=True);print(OUT,B.size)
