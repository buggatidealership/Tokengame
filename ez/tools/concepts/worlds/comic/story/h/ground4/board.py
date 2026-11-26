# /usr/bin/python3 board.py <shots dir> : boards ez/x2p-h24-ground-{390,1280,closeup}.png
import sys,json
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];E='/home/user/Tokengame/ez/'
L={'now':'Today: flat night, faint speed lines, torn paper','g1':'G1 The board: one motherboard down the page, gold edge fingers part the beats ($1.28)',
 'g2':'G2 The wafer: a dark die grid, glowing dicing street between beats ($1.28)','g3':'G3 The rack: rails and LEDs, a 1U plate between beats ($1.28)',
 'g4':'G4 The bus: a trace highway, data packets run down it, tint shifts to the vault ($1.28)','g5':'G5 The void: smoke and rim light, keeps the torn paper ($0.85)'}
IDS=['now','g1','g2','g3','g4','g5']
def F(s):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
    try:return ImageFont.truetype(f,s)
    except:pass
  return ImageFont.load_default()
def wrap(t,n):
  w=t.split();o=[];c=''
  for x in w:
    if len(c)+len(x)+1>n:o.append(c);c=x
    else:c=(c+' '+x).strip()
  return o+[c]
def board(W,sc,cols,out,cw,hd0=110):
  ims=[Image.open(f'{D}/full-{W}-{i}.png').convert('RGB') for i in IDS];ims=[i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) for i in ims]
  tw=ims[0].width;g=24;hd=hd0;rows=(len(ims)+cols-1)//cols;rh=[max(ims[r*cols+c].height for c in range(cols) if r*cols+c<len(ims)) for r in range(rows)]
  B=Image.new('RGB',(cols*(tw+g)+g,sum(rh)+rows*(hd+g)+g+70),'#e8e2d4');d=ImageDraw.Draw(B)
  d.text((g,18),f'H24 ground: the X2+ Overview from the top to the bet, {W}px, every take on the real page',fill='#111',font=F(30))
  y=70
  for r in range(rows):
    for c in range(cols):
      k=r*cols+c
      if k>=len(ims):continue
      x=g+c*(tw+g)
      for j,l in enumerate(wrap(L[IDS[k]],cw)):d.text((x,y+8+j*30),l,fill='#111',font=F(24))
      B.paste(ims[k],(x,y+hd))
    y+=rh[r]+hd+g
  B.save(out,optimize=True);print(out,B.size)
board(390,0.62,6,E+'x2p-h24-ground-390.png',16,200)
board(1280,0.42,3,E+'x2p-h24-ground-1280.png',42)
cs=[Image.open(f'{D}/{p}-{i}.png').convert('RGB') for i in IDS for p in ('cu','cu2')]
w,h=cs[0].size;g=20;B=Image.new('RGB',(6*(w+g)+g,2*(h+g)+g+150),'#e8e2d4');d=ImageDraw.Draw(B)
d.text((g,16),'Close-ups at 3x, 390px phone: top row the film -> Meet the models joint; bottom row the gutter into 02 The record',fill='#111',font=F(36))
for k,i in enumerate(IDS):
  x=g+k*(w+g);d.text((x,80),L[i].split(':')[0],fill='#111',font=F(34))
  B.paste(cs[2*k],(x,140));B.paste(cs[2*k+1],(x,140+h+g))
B.save(E+'x2p-h24-ground-closeup.png',optimize=True);print(B.size)
