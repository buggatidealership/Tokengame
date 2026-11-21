# /usr/bin/python3 board.py <shots dir> : composes ez/x2p-h28-chain-*.png from run.js and tiles.js shots (each board kept under about 6 MB)
import sys,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19)
NAME={'now':('Today (live)','rounds6 B: the season wafer, then 8 dies'),
 'A':('A · the hash chain','a gold link in every gap'),'B':('B · the explorer','latest block, then rows'),
 'C':('C · the bus','the hash printed on the line'),'D':('D · the open block','81 open; hashes on the edges'),
 'E':('E · A + open block','my pick'),'E+':('E · after Show more','desktop 10 (two rows), phones 8'),
 'A+':('A · after Show more','desktop 10 (two rows), phones 8'),'B+':('B · after Show more','desktop 8 (rows of two), phones 8'),'C+':('C · after Show more','desktop: a second bus of 8'),'D+':('D · after Show more','desktop 10 (two rows of five), phones 8')}
def save(B,out):
  p=OUT+out;B.save(p,optimize=True)
  k=1.0
  while os.path.getsize(p)>6_000_000:k*=.9;B.resize((int(B.width*k),int(B.height*k)),Image.LANCZOS).save(p,optimize=True)
  print(out,Image.open(p).size,round(os.path.getsize(p)/1e6,2),'MB')
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
  save(B,out)
board(['E','A','B','C','D'],390,.55,'x2p-h28-chain-390.png','chain · 390px · the latest block, six, Show 8 more · every hash is SHA-256 of the round + the hash before it')
board(['E','A','B','C','D'],320,.7,'x2p-h28-chain-320.png','chain · 320px (ties keep the marks, names in the screen-reader label; small blocks drop the company logo)')
board(['E','A','B','C','D'],1280,.5,'x2p-h28-chain-1280.png','chain · 1280px · no dead space beside or under the latest block',cols=2)
board(['E+','B+','C+','D+'],1280,.42,'x2p-h28-chain-1280-more.png','chain · 1280px after one tap on Show more',cols=2)
board(['E+','B+','C+','D+'],390,.5,'x2p-h28-chain-390-more.png','chain · 390px after one tap: eight more')
rows=[]
for t in 'ABCD':
  rows.append([Image.open(f'{S}/tile-{t}-{n}.png') for n in ('78','79','none')])
sc=.75;rows=[[i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) for i in r] for r in rows]
cw=max(i.width for r in rows for i in r);g=30
op=Image.open(f'{S}/open-D.png');op=op.resize((int(op.width*sc),int(op.height*sc)),Image.LANCZOS)
B=Image.new('RGB',(3*cw+4*g+120,sum(max(i.height for i in r) for r in rows)+len(rows)*g+170+op.height+60),'#141210');d=ImageDraw.Draw(B)
d.text((g,22),'chain · the block at 3x: one winner (R78 Intel) · a tie (R79 AstraZeneca) · nobody (newest no-winner round) · D\'s open block',font=F,fill='#ffd25a');y=80
for t,r in zip('ABCD',rows):
  d.text((g,y+10),t,font=F,fill='#f8f0d9');x=g+90
  for i in r:B.paste(i,(x,y));x+=cw+g
  y+=max(i.height for i in r)+g
d.text((g,y+10),'D · open',font=F,fill='#f8f0d9');B.paste(op,(g+90,y+50))
save(B,'x2p-h28-chain-closeup.png')
