# /usr/bin/python3 board.py <shots dir> <390|1280> <out.png>   (shots hd-<id>-<W>.png and, at 390, hd-<id>-390-pnl-season.png from run.js)
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'takes.json')))
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,24);F2=ImageFont.truetype(FR,17);F3=ImageFont.truetype(FN,30)
op=lambda n:Image.open(f'{D}/{n}.png').convert('RGB') if os.path.exists(f'{D}/{n}.png') else None
sc=lambda im,w:im.resize((w,int(im.height*w/im.width)),Image.LANCZOS) if im is not None else None
def wrap(d,t,f,w):
  out=[];cur=''
  for wd in t.split():
    if d.textlength(cur+' '+wd,font=f)>w and cur:out.append(cur);cur=wd
    else:cur=(cur+' '+wd).strip()
  return out+[cur]
if W<600:
  cw=390;A=[sc(op(f'hd-{t["id"]}-390'),cw) for t in T];P=[sc(op(f'hd-{t["id"]}-390-pnl-season'),cw) for t in T]
  h1=max(a.height for a in A);h2=max(p.height for p in P)
  B=Image.new('RGB',(40+(cw+30)*len(T),250+h1+60+h2+40),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,a,p in zip(T,A,P):
    d.text((x,20),t['name'],fill='#fdbc2a',font=F);y=58
    for ln in wrap(d,t['desc'],F2,cw)[:8]:d.text((x,y),ln,fill='#e9dfc6',font=F2);y+=22
    d.text((x,226),'Hit rate (default)',fill='#9fd0a0',font=F2);B.paste(a,(x,250))
    d.text((x,250+h1+30),'Switched to P&L · Season',fill='#9fd0a0',font=F2);B.paste(p,(x,250+h1+60));x+=cw+30
else:
  bw=1100;S=[sc(op(f'hd-{t["id"]}-1280'),bw) for t in T];cols=2;rows=(len(T)+1)//2
  rh=[max(S[i].height for i in range(r*cols,min(len(T),r*cols+cols)))+110 for r in range(rows)]
  B=Image.new('RGB',(40+cols*(bw+40),sum(rh)+40),'#1b1820');d=ImageDraw.Draw(B);y=20
  for r in range(rows):
    for c in range(cols):
      i=r*cols+c;t=T[i];x=40+c*(bw+40);d.text((x,y),t['name'],fill='#fdbc2a',font=F3)
      for k,ln in enumerate(wrap(d,t['desc'],F2,bw)[:2]):d.text((x,y+42+k*22),ln,fill='#e9dfc6',font=F2)
      B.paste(S[i],(x,y+92))
    y+=rh[r]
B.save(OUT,optimize=True);print(OUT,B.size)
