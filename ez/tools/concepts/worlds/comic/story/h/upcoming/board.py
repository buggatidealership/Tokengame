# /usr/bin/python3 board.py <shots dir> <width> <out> [takes]: today, then each take labelled with its line and cost, plus a close-up row
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
L=json.load(open(__file__.replace('board.py','takes.json')))
TS=sys.argv[4].split(',') if len(sys.argv)>4 else [t['id'] for t in L]
T={t['id']:t for t in L}
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(n,b=True):return ImageFont.truetype(FN if b else FR,n)
def wrap(d,s,f,w):
  out=[];line=''
  for word in s.split():
    t=(line+' '+word).strip()
    if d.textlength(t,font=f)>w and line:out.append(line);line=word
    else:line=t
  return out+[line]
ims=[(T[k],Image.open(f'{D}/{k}-{W}.png').convert('RGB')) for k in TS]
if W<600:
  cw=ims[0][1].width;H=max(i.height for _,i in ims);B=Image.new('RGB',(len(ims)*(cw+40)+40,H+330),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    d.text((x,24),t['title'],fill='#fdbc2a',font=font(30));y=68
    for ln in wrap(d,t['line'],font(21,False),cw):d.text((x,y),ln,fill='#e9dfc6',font=font(21,False));y+=27
    B.paste(i,(x,300));x+=cw+40
else:
  sc=.62;ims=[(t,i.resize((int(i.width*sc),int(i.height*sc)))) for t,i in ims]
  cols=3;cw=ims[0][1].width;rows=[ims[k:k+cols] for k in range(0,len(ims),cols)]
  H=sum(max(i.height for _,i in r)+190 for r in rows)+40;B=Image.new('RGB',(cols*(cw+40)+40,H),'#1b1820');d=ImageDraw.Draw(B);y0=30
  for r in rows:
    x=40
    for t,i in r:
      d.text((x,y0),t['title'],fill='#fdbc2a',font=font(30));y=y0+42
      for ln in wrap(d,t['line'],font(20,False),cw)[:4]:d.text((x,y),ln,fill='#e9dfc6',font=font(20,False));y+=26
      B.paste(i,(x,y0+170))
      x+=cw+40
    y0+=max(i.height for _,i in r)+190
if W<600:
  C=[(t,Image.open(f'{D}/close-{t["id"]}-{W}.png').convert('RGB')) for t,_ in ims]
  ch=max(i.height for _,i in C);N=Image.new('RGB',(B.width,B.height+ch+120),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=40
  d.text((40,B.height+20),'Close-up: each main event at full phone resolution',fill='#fdbc2a',font=font(28))
  for t,i in C:N.paste(i,(x,B.height+80));x+=cw+40
  B=N
B.save(OUT,optimize=True);print(OUT,B.size)
