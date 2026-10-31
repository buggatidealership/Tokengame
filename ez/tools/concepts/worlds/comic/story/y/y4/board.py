# /usr/bin/python3 board.py <shots dir> <out>: the #1 card in six textures (390 wide at DPR 3), then a 3x detail row
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
T=[('t0','T0  Today','Flat fills, even outlines.'),
   ('t1','T1  Spider-Verse print','CMY halftone only in the shade, plates off register, hatching, paper grain, ink heavier on the shadow side.'),
   ('t2','T2  Spider-Verse light','T1 + a hard warm key from the left, cel-hard fold terminators, a rim in the model\'s colour, the caption as card stock.'),
   ('t3','T3  Painted (Arcane)','Brushed paint on every form, soft warm key and cool shade, soft shadows, painted type. No dots.'),
   ('t4','T4  Printed paper','Letterpress words pressed into grained card, uneven ink density, ink spread, registration marks.'),
   ('t5','T5  Foil and emboss','Brushed gold foil, the money in metal foil, the name in gloss black, raised flag and caption, a sheen.')]
FB=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',46)
FS=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',27)
FH=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',60)
ims=[(k,a,b,Image.open(f'{D}/{k}.png').convert('RGB')) for k,a,b in T]
cw=max(i.width for *_,i in ims);ch=max(i.height for *_,i in ims);G=60;L=150
def wrap(t,w,f,d):
  out,line=[],''
  for word in t.split():
    s=(line+' '+word).strip()
    if d.textlength(s,font=f)>w:out.append(line);line=word
    else:line=s
  out.append(line);return out
# detail crops: the face, the stub's foot of the face and the top of the caption box, at native 3x
crop=(150,60,690,560);dw=crop[2]-crop[0];dh=crop[3]-crop[1]
W=3*cw+4*G;Hh=160+2*(ch+L+G)+120+dh+L+G
B=Image.new('RGB',(W,Hh),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,40),'Y4 · Texture: the same Meet the models card, only the surface changes (#1 card, 390 wide, DPR 3)',fill='#fdbc2a',font=FH)
for n,(k,a,b,im) in enumerate(ims):
  x=G+(n%3)*(cw+G);y=160+(n//3)*(ch+L+G)
  d.text((x,y),a,fill='#fdbc2a',font=FB)
  for j,l in enumerate(wrap(b,cw,FS,d)[:2]):d.text((x,y+60+j*34),l,fill='#f8f0d9',font=FS)
  B.paste(im,(x,y+L))
y0=160+2*(ch+L+G)+20
d.text((G,y0),'Close up at 3x: the face, the flag and the top of the caption box',fill='#fdbc2a',font=FH)
dx=G;sc=min(1,(W-2*G-5*24)/(6*dw))
for k,a,b,im in ims:
  c=im.crop(crop);c=c.resize((int(dw*sc),int(dh*sc)),Image.LANCZOS)
  d.text((dx,y0+100),a.split('  ')[0],fill='#fdbc2a',font=FB);B.paste(c,(dx,y0+160));dx+=c.width+24
B=B.crop((0,0,W,y0+160+int(dh*sc)+G))
B.save(OUT,optimize=True);print(OUT,B.size)
