# /usr/bin/python3 board.py <shots dir> <width> <out.png>: each take as a column, today on top, the mockup under it
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
T=[('m1','M1 · Scoreboard'),('m2','M2 · Tomorrow tickets'),('m3','M3 · Round stubs'),('m4','M4 · Smart or lucky'),('m5','M5 · #1 everywhere')]
def f(s):
  for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
    try:return ImageFont.truetype(p,s)
    except:pass
  return ImageFont.load_default()
F,S=f(30),f(22);cw=int(W)*2*(1 if int(W)<600 else .55);cw=int(cw);pad=40;cols=[]
for k,t in T:
  ims=[]
  for v in ['now','mock']:
    try:im=Image.open(f'{D}/{W}-{k}-{v}.png').convert('RGB')
    except:continue
    r=cw/im.width;im=im.resize((cw,int(im.height*r)));ims.append((v,im))
  cols.append((t,ims))
if int(W)<600:
  H=max(sum(im.height+50 for _,im in ims)+90 for _,ims in cols);B=Image.new('RGB',(len(cols)*(cw+pad)+pad,H+pad),'#1b1820');d=ImageDraw.Draw(B)
  for i,(t,ims) in enumerate(cols):
    x=pad+i*(cw+pad);y=30;d.text((x,y),t,fill='#fdbc2a',font=F);y+=60
    for v,im in ims:d.text((x,y),'Today' if v=='now' else 'Mockup',fill='#f8f0d9',font=S);y+=34;B.paste(im,(x,y));y+=im.height+16
else:
  H=sum(max(im.height for _,im in ims)+110 for _,ims in cols);B=Image.new('RGB',(2*cw+3*pad,H+pad),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,ims in cols:
    d.text((pad,y),t,fill='#fdbc2a',font=F);y+=50
    for j,(v,im) in enumerate(ims):x=pad+j*(cw+pad);d.text((x,y),'Today' if v=='now' else 'Mockup',fill='#f8f0d9',font=S);B.paste(im,(x,y+32))
    y+=max(im.height for _,im in ims)+60
B.thumbnail((6000,6000));B.save(OUT,optimize=True);print(OUT,B.size)
