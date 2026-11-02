# /usr/bin/python3 board.py : boards ez/x2p-h24-rounds-{390,1280,closeup}.png from out/ (dpr 2) and out3/ (dpr 3 close-ups)
from PIL import Image,ImageDraw,ImageFont
import os
H=os.path.dirname(os.path.abspath(__file__));EZ=os.path.abspath(H+'/../../../../../../../../')
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
TAKES=[('now','Today on X2+: the PSA slab carousel "Every call, receipts included"','$0'),
 ('A','A · Ledger entries: one chip per round, pins meeting like Meet the models; frame, readout, four lit lenses (one per AI); next entry on top','$0.48'),
 ('D','D · The ledger grows: frame 3\'s glass ledger, one row per round (the middle row repeats); an open book of two pages on desktop','$0.48'),
 ('B','B · Season 1, die by die: all 114 rounds as dies on one wafer (lit = graded, amber = next, gold = NVIDIA); the newest 8 cut out big','$1.56'),
 ('C','C · Every round so far: each film frame whole in a gold socket, its readout in the same glass, the round on the plate','$0.59')]
def label(im,txt,cost,w):
  pad=60;c=Image.new('RGB',(im.width,im.height+pad),'#141218');c.paste(im,(0,pad));d=ImageDraw.Draw(c)
  d.text((10,8),txt if len(txt)<w else txt[:w-1]+'…',font=F(17),fill='#f8f0d9');d.text((10,32),'Hedra: '+cost,font=F(15),fill='#ffd25a');return c
def board(W,cols,maxh,name,scale):
  ims=[]
  for k,t,c in TAKES:
    p=f'{H}/out/sec-{W}-{k}.png'
    if not os.path.exists(p):continue
    im=Image.open(p).convert('RGB');im=im.resize((int(im.width*scale),int(im.height*scale)),Image.LANCZOS)
    if im.height>maxh:im=im.crop((0,0,im.width,maxh))
    ims.append(label(im,t,c,int(im.width/9.5)))
  rows=[ims[i:i+cols] for i in range(0,len(ims),cols)];g=16
  BW=max(sum(i.width for i in r)+g*(len(r)+1) for r in rows);BH=sum(max(i.height for i in r) for r in rows)+g*(len(rows)+1)+70
  B=Image.new('RGB',(BW,BH),'#2a2730');d=ImageDraw.Draw(B);d.text((g,18),f'H24 rounds · "Every round so far" on X2+ at {W}px, laid over the built v46-live-x2plus.html (live data, R80 newest)',font=F(24),fill='#f8f0d9')
  y=70
  for r in rows:
    x=g
    for i in r:B.paste(i,(x,y));x+=i.width+g
    y+=max(i.height for i in r)+g
  B.save(f'{EZ}/{name}',optimize=True);print(name,B.size)
board(390,5,2300,'x2p-h24-rounds-390.png',.8)
board(1280,1,1400,'x2p-h24-rounds-1280.png',.5)
# close-ups: one row of each take at 3x, and the wafer
ims=[]
for k,t,c in TAKES[1:]:
  p=f'{H}/out3/row-390-{k}.png'
  if os.path.exists(p):ims.append(label(Image.open(p).convert('RGB'),t.split(':')[0]+' · one row at 3x',c,90))
p=f'{H}/out3/wafer-390.png'
if os.path.exists(p):
  im=Image.open(p).convert('RGB');ims.append(label(im.crop((0,0,im.width,int(im.height*.62))),'B · the wafer at 3x (top 62%)','',90))
g=16;BW=max(i.width for i in ims)+g*2;BH=sum(i.height for i in ims)+g*(len(ims)+1)+60
B=Image.new('RGB',(BW,BH),'#2a2730');d=ImageDraw.Draw(B);d.text((g,16),'H24 rounds · close-ups at 3x (390px phone)',font=F(24),fill='#f8f0d9');y=60
for i in ims:B.paste(i,(g,y));y+=i.height+g
B.save(f'{EZ}/x2p-h24-rounds-closeup.png',optimize=True);print('closeup',B.size)
