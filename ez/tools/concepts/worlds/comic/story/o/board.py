# /usr/bin/python3 board.py <spec.json>: boards for helper o. spec: {"out","title","line","colw","rows":[[[png,label],...],...],"notes":[...]}
# Each row is a line of frames scaled to one column width; a label over each frame; the title and one line on top.
import sys,json
from PIL import Image,ImageDraw,ImageFont
S=json.load(open(sys.argv[1]));W=S.get('colw',560);G=24;BG=(24,22,28)
def F(s,b=False):
  try:return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
  except Exception:return ImageFont.load_default()
ft,fl,fn=F(34,True),F(19),F(19,True)
def wrap(t,f,w):
  out=[];l=''
  for x in t.split():
    if ImageDraw.Draw(Image.new('RGB',(1,1))).textlength(l+' '+x,font=f)>w and l:out.append(l);l=x
    else:l=(l+' '+x).strip()
  return out+[l]
rows=[];
for r in S['rows']:
  ims=[]
  for p,lab in r:
    im=Image.open(p).convert('RGB');cw=r[0][2] if len(r[0])>2 else W
    k=W/im.width if im.width>W else 1
    if im.width>W:im=im.resize((W,round(im.height*k)),Image.LANCZOS)
    ims.append((im,lab))
  rows.append(ims)
TW=max(sum(i.width for i,_ in r)+G*(len(r)+1) for r in rows);TW=max(TW,1200)
hl=wrap(S['line'],fl,TW-2*G);head=60+26*len(hl)+10
RH=[max(i.height for i,_ in r)+56 for r in rows]
can=Image.new('RGB',(TW,head+sum(RH)+G),BG);d=ImageDraw.Draw(can)
d.text((G,16),S['title'],font=ft,fill=(253,188,42))
for i,l in enumerate(hl):d.text((G,62+26*i),l,font=fl,fill=(235,230,220))
y=head
for r,h in zip(rows,RH):
  x=G
  for im,lab in r:
    ll=wrap(lab,fn,im.width)[:2]
    for i,l in enumerate(ll):d.text((x,y+4+22*i),l,font=fn,fill=(253,188,42) if not lab.startswith('Today') else (255,255,255))
    can.paste(im,(x,y+50));x+=im.width+G
  y+=h
can.save(S['out'],optimize=True);print(S['out'],can.size)
