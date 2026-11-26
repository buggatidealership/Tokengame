# /usr/bin/python3 board.py <dir> <out.png> <scale> <cols as take:label ...>  : columns side by side under a title row (shots from shot.js, named r2-<take>-<w>.png in <dir>)
import sys
from PIL import Image,ImageDraw,ImageFont
d,out,sc,w=sys.argv[1],sys.argv[2],float(sys.argv[3]),sys.argv[4];cols=[c.split(':',1) for c in sys.argv[5:]]
def F(s):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
    try:return ImageFont.truetype(f,s)
    except Exception:pass
  return ImageFont.load_default()
ims=[Image.open(f'{d}/r2-{t}-{w}.png').convert('RGB') for t,_ in cols];ims=[i.resize((round(i.width*sc),round(i.height*sc)),Image.LANCZOS) for i in ims]
g=24;hd=64;H=max(i.height for i in ims)+hd+g;Wd=sum(i.width for i in ims)+g*(len(ims)+1)
o=Image.new('RGB',(Wd,H),'#f3eee2');dr=ImageDraw.Draw(o);x=g
for (t,l),i in zip(cols,ims):
  dr.text((x,16),l,fill='#111',font=F(26));o.paste(i,(x,hd));x+=i.width+g
o.save(out,optimize=True);print(out,o.size)
