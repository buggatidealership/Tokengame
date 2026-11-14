# /usr/bin/python3 board.py <out.png> <scale> <title> <file:label> ...  : shots side by side under labels and a title, on the brief's paper
import sys
from PIL import Image,ImageDraw,ImageFont
out,sc,title=sys.argv[1],float(sys.argv[2]),sys.argv[3];cols=[c.split(':',1) for c in sys.argv[4:]]
def F(s):
  try:return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
  except Exception:return ImageFont.load_default()
ims=[Image.open(f).convert('RGB') for f,_ in cols];ims=[i.resize((round(i.width*sc),round(i.height*sc)),Image.LANCZOS) for i in ims]
g=24;th=58;hd=48;H=max(i.height for i in ims)+th+hd+g;Wd=sum(i.width for i in ims)+g*(len(ims)+1)
o=Image.new('RGB',(Wd,H),'#f3eee2');dr=ImageDraw.Draw(o);dr.text((g,14),title,fill='#111',font=F(28));x=g
for (f,l),i in zip(cols,ims):
  dr.text((x,th+8),l,fill='#111',font=F(22));o.paste(i,(x,th+hd));x+=i.width+g
o.save(out,optimize=True);import os;print(out,o.size,round(os.path.getsize(out)/1e6,2),'MB')
