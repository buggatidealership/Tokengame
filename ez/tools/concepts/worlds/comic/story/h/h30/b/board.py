# /usr/bin/python3 board.py <shotdir> <W> <out.png> : each section's frame side by side, the 664 line marked
import json,sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
info=json.load(open(f'{D}/info-{W}.json'))['info']
secs=info['secs'];sc=None
ims=[Image.open(f"{D}/s-{W}-{s['id']}.png").convert('RGB') for s in secs]
k=ims[0].width/W;FR=int(664*k);pad=int(28*k);lab=int(54*k)
H=max(FR,max(i.height for i in ims))+lab+pad
cw=ims[0].width
B=Image.new('RGB',(pad+len(ims)*(cw+pad),H+pad),(46,48,54));d=ImageDraw.Draw(B)
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(15*k));F2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',int(12*k))
except:F=F2=ImageFont.load_default()
NM={'top':'1 Top','round':'2 How a round works','win':"3 Who's winning",'rounds':'4 Every round so far','luck':'5 Smart or lucky','bet':'6 The bet','follow':'7 Follow on X'}
for n,(s,im) in enumerate(zip(secs,ims)):
  x=pad+n*(cw+pad);y=lab
  d.rectangle([x-2,y-2,x+cw+1,y+FR+1],outline=(120,124,132),width=2)
  B.paste(im,(x,y))
  ok=s['h']<=664
  d.text((x,int(8*k)),NM.get(s['id'],s['id']),fill=(248,240,217),font=F)
  d.text((x,int(30*k)),f"{s['h']} px · {s['words']} words · {'fits' if ok else 'OVER'}",fill=(170,230,190) if ok else (255,120,120),font=F2)
  d.line([x-6,y+FR,x+cw+6,y+FR],fill=(255,0,200),width=max(2,int(2*k)))
  d.text((x+cw-int(60*k),y+FR+int(4*k)),'664 px',fill=(255,0,200),font=F2)
B.save(OUT,optimize=True);print(OUT,B.size)
