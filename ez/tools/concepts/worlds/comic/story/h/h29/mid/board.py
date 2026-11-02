# /usr/bin/python3 board.py <out.png> <scale> <title> <row-title>|<file:label>,<file:label>... [<row-title>|...]  : rows of shots under labels, dark ground
import sys,os
from PIL import Image,ImageDraw,ImageFont
out,sc,title=sys.argv[1],float(sys.argv[2]),sys.argv[3];rows=[(r.split('|',1)[0],[c.split(':',1) for c in r.split('|',1)[1].split(',')]) for r in sys.argv[4:]]
def F(s):
  try:return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
  except Exception:return ImageFont.load_default()
R=[]
for t,cols in rows:
  ims=[Image.open(f).convert('RGB') for f,_ in cols];ims=[i.resize((round(i.width*sc),round(i.height*sc)),Image.LANCZOS) for i in ims];R.append((t,cols,ims))
g=24;th=56;rh=40;lh=34
Wd=max(sum(i.width for i in ims)+g*(len(ims)+1) for _,_,ims in R);H=th+sum(rh+lh+max(i.height for i in ims)+g for _,_,ims in R)
o=Image.new('RGB',(Wd,H),'#15141a');dr=ImageDraw.Draw(o);dr.text((g,14),title,fill='#ffd21f',font=F(26));y=th
for t,cols,ims in R:
  dr.text((g,y+6),t,fill='#f8f0d9',font=F(22));y+=rh;x=g
  for (f,l),i in zip(cols,ims):dr.text((x,y+4),l,fill='#d8cfba',font=F(17));o.paste(i,(x,y+lh));x+=i.width+g
  y+=lh+max(i.height for i in ims)+g
o.save(out,optimize=True);print(out,o.size,round(os.path.getsize(out)/1e6,2),'MB')
