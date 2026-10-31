# /usr/bin/python3 board.py <shots dir> <width> <out>: today then takes A-D (pending), close-ups pending and with calls in (390); 1280 adds the sign study
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
L=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'takes.json')));T={t['id']:t for t in L};TS=[t['id'] for t in L]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
f=lambda n,b=True:ImageFont.truetype(FN if b else FR,n)
def wrap(d,s,ft,w):
  out=[];line=''
  for word in s.split():
    t=(line+' '+word).strip()
    if d.textlength(t,font=ft)>w and line:out.append(line);line=word
    else:line=t
  return out+[line]
def head(d,x,y,t,cw,fs=30,ls=20):
  d.text((x,y),t['title'],fill='#fdbc2a',font=f(fs));y+=fs+12
  for ln in wrap(d,t['line'],f(ls,False),cw):d.text((x,y),ln,fill='#e9dfc6',font=f(ls,False));y+=ls+6
if W<600:
  ims=[(T[k],Image.open(f'{D}/{k}-{W}.png').convert('RGB')) for k in TS];cw=ims[0][1].width;H=max(i.height for _,i in ims);top=360
  rows=[]
  for lab,sfx in [('Close-up: the main event, calls not in yet (today)',''),('Close-up: the same main event with calls in (the newest graded round\'s own calls, read from ROUNDS)','-calls')]:
    rows.append((lab,[Image.open(f'{D}/close-{k}-{W}{sfx}.png').convert('RGB') if k!='now' else None for k in TS]))
  rh=sum(max(i.height for i in r if i)+110 for _,r in rows)
  B=Image.new('RGB',(len(ims)*(cw+40)+40,top+H+rh+40),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:head(d,x,24,t,cw,30,21);B.paste(i,(x,top));x+=cw+40
  y=top+H+40
  for lab,r in rows:
    d.text((40,y),lab,fill='#fdbc2a',font=f(28));x=40
    for i in r:
      if i:B.paste(i,(x,y+60))
      x+=cw+40
    y+=max(i.height for i in r if i)+110
else:
  sc=.5;ims=[(T[k],Image.open(f'{D}/{k}-{W}.png').convert('RGB')) for k in TS];ims=[(t,i.resize((int(i.width*sc),int(i.height*sc)))) for t,i in ims]
  cw=ims[0][1].width;cols=3;rows=[ims[k:k+cols] for k in range(0,len(ims),cols)]
  S=Image.open(f'{D}/S-{W}.png').convert('RGB');S=S.crop((0,180,S.width,S.height));S=S.resize((int(S.width*.9),int(S.height*.9)))
  H=sum(max(i.height for _,i in r)+190 for r in rows)+S.height+120
  B=Image.new('RGB',(max(cols*(cw+40)+40,S.width+80),H),'#1b1820');d=ImageDraw.Draw(B);y0=30
  for r in rows:
    x=40
    for t,i in r:head(d,x,y0,t,cw,28,18);B.paste(i,(x,y0+170));x+=cw+40
    y0+=max(i.height for _,i in r)+190
  d.text((40,y0),'Sign study at 1280: method (a), the real logo file placed on painted panels, against method (b), a model painting the sign from the logo',fill='#fdbc2a',font=f(28))
  B.paste(S,(40,y0+60))
B.save(OUT,optimize=True);print(OUT,B.size)
