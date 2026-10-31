# /usr/bin/python3 board.py <shotdir> <W> <out.png> : one row per take: the two fixed heads, then each cut at three moments (boundary at 92%, 62%, 32%)
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=json.load(open(__file__.replace('board.py','takes.json')))
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
f=0.5 if W<600 else 0.25
fw,fh=(int(390*f*2/2*2/2*2/2*2),0) if False else (None,None)
names=['mm','er']+[f'c{k}-{j}' for k in range(1,5) for j in range(3)]
heads=['Meet the models head','Every round head']+[f'cut {k}: {["92%","62%","32%"][j]}' for k in range(1,5) for j in range(3)]
cutn=['','','cover > models','','','models > rounds','','','rounds > lucky','','','lucky > bet #1','','']
ims={}
for t in T:
  for n in names:
    im=Image.open(f'{D}/{t["id"]}-{W}-{n}.png');ims[(t['id'],n)]=im.resize((int(im.width*f*(1 if W<600 else 1)/ (2 if W<600 else 1)),int(im.height*f/(2 if W<600 else 1))))
iw,ih=ims[(T[0]['id'],'mm')].size
pad=10;lab=86;top=70
CU=[('k','mm','Close-up · K: MEET THE MODELS lettered into the painted burst'),('k','er','Close-up · K: EVERY ROUND SO FAR above the rack, the live beat on the incoming page'),('i','c2-1','Close-up · I: the painted rope iris closing on the cut'),('k','c4-1','Close-up · K: the iris once, before Bet #1')]
cus=[]
for t,n,l in CU:
  im=Image.open(f'{D}/{t}-{W}-{n}.png');cw=390 if W<600 else 640;im=im.resize((cw,int(im.height*cw/im.width)));cus.append((im,l))
ch=max(c[0].height for c in cus)+50
B=Image.new('RGB',(max(pad+len(names)*(iw+pad),pad+len(cus)*(cus[0][0].width+pad)),top+len(T)*(ih+lab+pad)+ch+20),(20,18,26));d=ImageDraw.Draw(B)
y0=top+len(T)*(ih+lab+pad)+10
for i,(im,l) in enumerate(cus):
  x=pad+i*(im.width+pad);import textwrap
  for q,ln in enumerate(textwrap.wrap(l,44 if W<600 else 72)[:2]):d.text((x,y0+q*20),ln,fill=(253,188,42),font=F(15));B.paste(im,(x,y0+44))
d.text((pad,14),f'Round H6 · book · {W}px · each cut at three moments: the boundary at 92%, 62% and 32% of the screen height',fill=(253,188,42),font=F(26))
for i,n in enumerate(names):d.text((pad+i*(iw+pad),46),heads[i],fill=(248,240,217),font=F(14))
for r,t in enumerate(T):
  y=top+r*(ih+lab+pad)
  d.text((pad,y+6),t['label'],fill=(253,188,42),font=F(24));d.text((pad,y+40),t['desc'],fill=(220,212,190),font=F(16))
  for i,n in enumerate(names):B.paste(ims[(t['id'],n)],(pad+i*(iw+pad),y+lab))
B.save(OUT,optimize=True);print(OUT,B.size)
