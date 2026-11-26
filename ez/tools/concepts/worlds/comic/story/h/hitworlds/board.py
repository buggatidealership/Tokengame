#!/usr/bin/python3
# board.py <shots dir>: builds ez/x2p-x3p-h7-hitworlds-390.png and -1280.png from run.js's shots (hit and season views).
import sys
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];EZ='/home/user/Tokengame/ez/'
T=[('now','Today (live)'),('poly','W1 The lie detector'),('arcade','W2 Insert coin'),('neon','W3 Lucky’s back wall'),('bill','W4 Painted over the city'),('tide','W5 Head above water')]
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
except Exception:F=f2=ImageFont.load_default()
def get(t,w,W):
  try:return Image.open(f'{D}/hw-{t}-{w}-{W}.png').convert('RGB')
  except Exception:return None
# 390: one column per take, hit rate on top, P&L season under it (phone shots are 2x)
cols=[];H=0
for t,lab in T:
  a=get(t,'hit',390);b=get(t,'season',390) if t!='now' else None
  ims=[x.resize((585,int(x.height*585/x.width))) for x in (a,b) if x];h=sum(i.height for i in ims)+30*len(ims);cols.append((lab,ims));H=max(H,h)
CW=585;o=Image.new('RGB',(len(cols)*(CW+30)+30,H+90),'#14161c');d=ImageDraw.Draw(o)
for k,(lab,ims) in enumerate(cols):
  x=30+k*(CW+30);d.text((x,24),lab,fill='#fdbc2a',font=F);y=80
  for j,i in enumerate(ims):
    d.text((x,y-4),['Hit rate (default)','P&L · Season'][j] if lab[0]=='W' else 'Live section today',fill='#b5ad9c',font=f2);o.paste(i,(x,y+26));y+=i.height+56
o.save(EZ+'x2p-x3p-h7-hitworlds-390.png',optimize=True)
# 1280: a row per take, hit rate | P&L season, at half size
rows=[(lab,[x for x in (get(t,'hit',1280),get(t,'season',1280) if t!='now' else None) if x]) for t,lab in T]
RW=1280;sc=.5;Hs=[max(int(i.height*sc) for i in ims) for _,ims in rows]
o=Image.new('RGB',(int(2*RW*sc)+90,sum(Hs)+70*len(rows)+30),'#14161c');d=ImageDraw.Draw(o);y=20
for (lab,ims),h in zip(rows,Hs):
  d.text((30,y),lab,fill='#fdbc2a',font=F)
  for j,i in enumerate(ims):i=i.resize((int(i.width*sc),int(i.height*sc)));o.paste(i,(30+j*(int(RW*sc)+30),y+44))
  y+=h+70
o.save(EZ+'x2p-x3p-h7-hitworlds-1280.png',optimize=True);print('ok')
