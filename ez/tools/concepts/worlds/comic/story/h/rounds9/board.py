# /usr/bin/python3 board.py <shots dir> : composes ez/x2p-h27-rounds9-*.png from run.js and tiles.js shots
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19)
NAME={'now':('Today (live)','rounds6 B: the season wafer, then 8 dies'),
 'A':('A · the reel','cinema: oxblood velvet, every round a piece of film'),'B':('B · the stamp album','each round a stamp; its ink = the move'),'C':('C · the 45s','each round a record sleeve on a gold wall'),
 'A+':('A · after Show more','desktop adds 10, phones 8'),'B+':('B · after Show more','desktop adds 10, phones 8'),'C+':('C · after Show more','desktop adds 10, phones 8')}
def board(ids,W,k,out,title,cols=None):
  ims=[Image.open(f'{S}/sec-{W}-{i}.png') for i in ids];ims=[im.resize((int(im.width*k),int(im.height*k)),Image.LANCZOS) for im in ims]
  cols=cols or len(ims);rows=(len(ims)+cols-1)//cols;cw=max(i.width for i in ims);g=30;hd=100
  rh=[max(ims[r*cols+c].height for c in range(cols) if r*cols+c<len(ims)) for r in range(rows)]
  B=Image.new('RGB',(cols*cw+(cols+1)*g,sum(rh)+rows*(hd+g)+g+70),'#141210');d=ImageDraw.Draw(B);d.text((g,22),title,font=F,fill='#ffd25a')
  y=70+g
  for r in range(rows):
    for c in range(cols):
      j=r*cols+c
      if j>=len(ims):continue
      x=g+c*(cw+g);n=NAME[ids[j]];d.text((x,y),n[0],font=F,fill='#f8f0d9');d.text((x,y+36),n[1],font=f2,fill='#c9bfa6');B.paste(ims[j],(x,y+hd-22))
    y+=rh[r]+hd+g
  B.save(OUT+out,optimize=True);print(out,B.size)
board(['now','A','B','C'],390,.75,'x2p-h27-rounds9-390.png','rounds9 · 390px · hero = the latest round, six, Show 8 more · no die, no gold frames')
board(['A','B','C'],320,1,'x2p-h27-rounds9-320.png','rounds9 · 320px (the six drop the company logo; AstraZeneca trims in B and C)')
board(['A','B','C'],1280,.5,'x2p-h27-rounds9-1280.png','rounds9 · 1280px · the hero spans two rows, the six fill five columns, nothing empty under it',cols=1)
board(['A+','B+','C+'],1280,.4,'x2p-h27-rounds9-1280-more.png','rounds9 · 1280px after one tap: ten more close two full rows (the button shows the next rounds, dim)')
board(['A+','B+','C+'],390,.6,'x2p-h27-rounds9-390-more.png','rounds9 · 390px after one tap: eight more')
# close-up: one winner, a tie, nobody, per take (390, dpr 3)
rows=[]
for t in 'ABC':
  ims=[Image.open(f'{S}/tile-{t}-{n}.png') for n in ('78','79','none')];rows.append(ims)
cw=max(i.width for r in rows for i in r);g=30
B=Image.new('RGB',(3*cw+4*g+160,sum(max(i.height for i in r) for r in rows)+len(rows)*g+150),'#141210');d=ImageDraw.Draw(B)
d.text((g,22),'rounds9 · the tile at 3x: one winner (R78 Intel) · a tie (R79 AstraZeneca) · nobody (R51 UPS)',font=F,fill='#ffd25a');y=80
for t,r in zip('ABC',rows):
  d.text((g,y+10),t,font=F,fill='#f8f0d9');x=g+120
  for i in r:B.paste(i,(x,y));x+=cw+g
  y+=max(i.height for i in r)+g
B.save(OUT+'x2p-h27-rounds9-closeup.png',optimize=True);print(B.size)
