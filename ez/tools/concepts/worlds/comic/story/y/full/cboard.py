# close-up board: rows = crops, columns = today + each take
import sys,os
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];out=sys.argv[2];rows=sys.argv[3].split(',');cols=sys.argv[4].split(',');colw=int(sys.argv[5]) if len(sys.argv)>5 else 560
names={'now':'Today (live)','ink':'A · Inked: brush line, crosshatch','cut':'B · Cut paper: scissor cut, soft lift','press':'C · Letterpress: worn ink, pressed in','screen':'D · Screen print: two inks off register'}
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
except:F=ImageFont.load_default()
ims={};rh={}
for r in rows:
  for c in cols:
    f=f'{D}/{r}-{c}.png'
    if os.path.exists(f):
      im=Image.open(f);k=colw/im.size[0];im=im.resize((colw,int(im.size[1]*k)));ims[(r,c)]=im;rh[r]=max(rh.get(r,0),im.size[1])
W=len(cols)*(colw+16)+16;H=50+sum(rh[r]+16 for r in rows)+16
o=Image.new('RGB',(W,H),'#1c1820');d=ImageDraw.Draw(o)
for j,c in enumerate(cols):d.text((16+j*(colw+16),14),names.get(c,c),fill='#fdbc2a',font=F)
y=50
for r in rows:
  for j,c in enumerate(cols):
    if (r,c) in ims:o.paste(ims[(r,c)],(16+j*(colw+16),y))
  y+=rh[r]+16
o.save(out);print(o.size)
