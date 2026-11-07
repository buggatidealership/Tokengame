# /usr/bin/python3 board.py : boards ez/x2p-h25-rounds7-390.png, -1280.png, -closeup.png from out/, out3x/ and the H24 board (today's live take B)
from PIL import Image,ImageDraw,ImageFont
import os
E='/home/user/Tokengame/ez/';O='out/'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
T={'now':('Today (live): B, Season 1 die by die','wafer, then the newest dies'),
 'A':('A · The darkroom','contact sheet (winner circled) → prints on the line'),
 'B':('B · The tile wall','a glazed tile per round in the winner\'s colour → picture tiles'),
 'C':('C · The trophy case','a shelf per model, a cup per round won → framed pictures'),
 'D':('D · The desk diary','the season by day, stamped → the newest day pages')}
COST={'now':'','A':'Hedra $3.15 (room, strip, peg, print, tape)','B':'Hedra $1.59 (tile, wall, plaque)','C':'Hedra $2.43 (shelf, cup, broken, frame)','D':'Hedra $0.95 (desk, page)'}
def col(img,key,w):
  im=img.resize((w,round(img.height*w/img.width)),Image.LANCZOS);hd=96;c=Image.new('RGB',(w,im.height+hd),'#1b1a1f');d=ImageDraw.Draw(c)
  d.text((10,10),T[key][0],font=F(19),fill='#ffd21f');d.text((10,40),T[key][1],font=G(14),fill='#e8e0cc');d.text((10,64),COST[key],font=G(13),fill='#a59c88');c.paste(im,(0,hd));return c
def board(cols,out,gap=24,maxh=None):
  H=max(c.height for c in cols);W=sum(c.width for c in cols)+gap*(len(cols)+1);B=Image.new('RGB',(W,H+gap*2),'#2c2b31')
  x=gap
  for c in cols:B.paste(c,(x,gap));x+=c.width+gap
  B.save(out,optimize=True);print(out,B.size)
# today from the H24 board's B column (shot on the built page on 2026-11-02 by rounds6)
h=Image.open(E+'x2p-h24-rounds-390.png').convert('RGB').crop((1933,0,2558,2462))
cols=[col(h,'now',390)]+[col(Image.open(O+f'sec-390-{k}.png').convert('RGB'),k,390) for k in 'ABCD']
board(cols,E+'x2p-h25-rounds7-390.png')
# desktop: four takes, each at half size
cols=[col(Image.open(O+f'sec-1280-{k}.png').convert('RGB'),k,640) for k in 'ABCD']
board(cols[:2],'/tmp/claude-0/d1.png');board(cols[2:],'/tmp/claude-0/d2.png')
a=Image.open('/tmp/claude-0/d1.png');b=Image.open('/tmp/claude-0/d2.png');B=Image.new('RGB',(max(a.width,b.width),a.height+b.height),'#2c2b31');B.paste(a,(0,0));B.paste(b,(0,a.height));B.save(E+'x2p-h25-rounds7-1280.png',optimize=True);print('1280',B.size)
# close-ups at 3x: for each take, a piece of beat 1 and one item of beat 2
crops={'A':[(0,700,1170,1500),(0,2900,600,4300)],'B':[(0,620,1170,1300),(0,2050,600,3100)],'C':[(0,560,1170,1300),(0,1880,600,3200)],'D':[(0,560,1170,1700),(0,3020,1170,3900)]}
rows=[]
for k,cs in crops.items():
  im=Image.open(f'out3x/sec-390-{k}.png').convert('RGB');ps=[im.crop((x0,min(y0,im.height-10),x1,min(y1,im.height))) for x0,y0,x1,y1 in cs]
  hh=max(p.height for p in ps);r=Image.new('RGB',(sum(p.width for p in ps)+60,hh+50),'#1b1a1f');d=ImageDraw.Draw(r);d.text((12,12),T[k][0]+' · 3x',font=F(22),fill='#ffd21f');x=12
  for p in ps:r.paste(p,(x,48));x+=p.width+24
  rows.append(r)
W=max(r.width for r in rows);B=Image.new('RGB',(W,sum(r.height for r in rows)+20*len(rows)),'#2c2b31');y=0
for r in rows:B.paste(r,(0,y));y+=r.height+20
B=B.resize((B.width*2//3,B.height*2//3),Image.LANCZOS);B.save(E+'x2p-h25-rounds7-closeup.png',optimize=True);print('close',B.size)
