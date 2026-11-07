# /usr/bin/python3 board.py <shots dir> : composes ez/x2p-h28-rounds10-*.png from run.js and tiles.js shots (each kept under about 6 MB)
import sys,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/';HERE=os.path.dirname(os.path.abspath(__file__))
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19)
NAME={'now':('Today (live)','rounds6 B: wafer, then 8 dies'),
 'A':('A · hot off the press','newest print on the wire, next pencilled'),'B':('B · the newsstand','latest issue on top, the rest racked'),
 'C':('C · the latest issue','one cover dress, back issues fanned'),'D':('D · the press run','the newest print comes off the rollers'),
 'A+':('A · after Show more','phones +8, desktop +12'),'B+':('B · after Show more','phones +8, desktop +12'),'C+':('C · after Show more','phones +8, desktop +12'),'D+':('D · after Show more','phones +8, desktop +12')}
def save(B,out):
  p=OUT+out;B.save(p,optimize=True)
  if os.path.getsize(p)>6e6:B.quantize(colors=256,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.FLOYDSTEINBERG).save(p,optimize=True)
  print(out,B.size,round(os.path.getsize(p)/1e6,2),'MB')
def board(ids,W,k,out,title,cols=None):
  ims=[Image.open(f'{S}/sec-{W}-{i}.png').convert('RGB') for i in ids];ims=[im.resize((int(im.width*k),int(im.height*k)),Image.LANCZOS) for im in ims]
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
board(['now','A','B','C','D'],390,.62,'x2p-h28-rounds10-390.png','rounds10 · 390px · the latest print / the latest issue, then six, then Show more · paintings: Hedra gpt-image-2, 2026-11-02')
board(['A','B','C','D'],320,.75,'x2p-h28-rounds10-320.png','rounds10 · 320px (2x shots)')
board(['now','A','B','C','D'],1280,.62,'x2p-h28-rounds10-1280.png','rounds10 · 1280px · the hero two rows high, three beside it, nothing empty under it',cols=2)
board(['A+','B+','C+','D+'],1280,.5,'x2p-h28-rounds10-1280-more.png','rounds10 · 1280px after one tap: twelve more (two full rows of six)',cols=2)
board(['A+','B+','C+','D+'],390,.5,'x2p-h28-rounds10-390-more.png','rounds10 · 390px after one tap: eight more')
# close-up: one winner, a tie, nobody, per take (390, dpr 3)
rows=[[Image.open(f'{S}/tile-{t}-{n}.png').convert('RGB') for n in ('78','79','none')] for t in 'ABCD']
rows=[[i.resize((int(i.width*.8),int(i.height*.8)),Image.LANCZOS) for i in r] for r in rows]
cw=max(i.width for r in rows for i in r);g=30
B=Image.new('RGB',(3*cw+4*g+120,sum(max(i.height for i in r) for r in rows)+len(rows)*g+110),'#141210');d=ImageDraw.Draw(B)
d.text((g,22),'rounds10 · one item at 3x (shown at 2.4x): one winner (R78 Intel) · a tie (R79 AstraZeneca) · nobody (newest no-winner round)',font=F,fill='#ffd25a');y=80
for t,r in zip('ABCD',rows):
  d.text((g,y+10),t,font=F,fill='#f8f0d9');x=g+90
  for i in r:B.paste(i,(x,y));x+=cw+g
  y+=max(i.height for i in r)+g
save(B,'x2p-h28-rounds10-closeup.png')
# the paintings made for this round (contact sheet)
fs=[('wireP','A phone'),('standP','B phone'),('pressP','D phone'),('dress','C cover trade dress'),('wireD','A desktop'),('standD','B desktop'),('pressD','D desktop'),('velvet','C case'),('sheet','sprites (keyed)')]
ims=[]
for f,l in fs:
  i=Image.open(f'{HERE}/img/{f}.jpg').convert('RGB');i.thumbnail((620,620));ims.append((i,l))
B=Image.new('RGB',(5*640+20,2*700+80),'#141210');d=ImageDraw.Draw(B);d.text((20,20),'rounds10 · the nine paintings (Hedra gpt-image-2, 4K; no words in the art): $3.96 in all',font=F,fill='#ffd25a')
for k,(i,l) in enumerate(ims):
  x=20+(k%5)*640;y=70+(k//5)*700;B.paste(i,(x,y+36));d.text((x,y),l,font=f2,fill='#f8f0d9')
save(B,'x2p-h28-rounds10-art.png')
