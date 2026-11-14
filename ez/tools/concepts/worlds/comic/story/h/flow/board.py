# /usr/bin/python3 board.py <shots dir> <W> <out.png> : rows = takes (today first), columns = the four cuts, each before / at / after
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X3+): sections stacked on the cream page, two beat captions'),('a','A · Turn the page: each section a printed page on the night desk; its corner curls up as you finish it, the next page lies under; folio "p. n"'),
 ('b','B · Guided view: one printed page of inked panels; the panel in front is inked and full size, the next waits in pencil (faint, set back) and its frame inks in'),
 ('c','C · The pile: pages dropped on the night desk; the next page slides up over the one you read (sticky, scroll stays free), lands, the one beneath darkens'),
 ('d','D · Iris: at each cut the picture closes to a black iris on the boundary, the narrator caption holds a beat, the iris opens on the next section')]
CUT=['cover → Meet the models','Meet the models → Every round','Every round → Smart or lucky','Smart or lucky → Bet #1']
sc=.3 if W<600 else .25
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);g=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
im0=Image.open(f'{D}/now-{W}-c1-0.png');fw,fh=int(im0.size[0]*sc),int(im0.size[1]*sc)
gap,cg=6,22;LH=44
cw=3*fw+2*gap;Wb=24+4*cw+3*cg+24;Hb=60+len(T)*(LH+fh+18)
B=Image.new('RGB',(Wb,Hb),(20,18,26));d=ImageDraw.Draw(B)
d.text((24,16),f'Round H5 · flow: the cuts between sections, {W}px. Each cut: boundary low on screen / mid / passed (frames from the real built page).',font=f,fill=(253,188,42))
y=60
for k,lab in T:
  d.text((24,y+10),lab,font=g,fill=(248,240,217));y+=LH
  for c in range(4):
    x=24+c*(cw+cg)
    if k=='now':d.text((x,y-LH+30),CUT[c],font=g,fill=(170,160,140)) if False else None
    for j in range(3):
      p=f'{D}/{k}-{W}-c{c+1}-{j}.png'
      if os.path.exists(p):B.paste(Image.open(p).convert('RGB').resize((fw,fh),Image.LANCZOS),(x+j*(fw+gap),y))
  y+=fh+18
for c in range(4):d.text((24+c*(cw+cg),44),CUT[c],font=g,fill=(170,160,140))
B.save(OUT,optimize=True);print(OUT,B.size)
