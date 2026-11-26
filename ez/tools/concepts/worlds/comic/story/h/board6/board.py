# /usr/bin/python3 board.py : boards ez/x2p-h25-board6-{390,1280,close}.png from out/ (run.js and close.js shots)
from PIL import Image,ImageDraw,ImageFont
import os
R='../../../../../../../../'
L={'now':'Live today: take C (the trophy socket)','e1':'E1 · the rack, #1 lifted at the top (head-on, trapezoid board) · $1.50',
   'e2':'E2 · head-on stack, #1 lifted at the top · $1.50','e3':'E3 · E\'s hero angle kept, #1 lifted at the top (my pick) · $1.50'}
def F(s):
  for p in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']:
    if os.path.exists(p):return ImageFont.truetype(p,s)
  return ImageFont.load_default()
def board(files,labels,out,horiz=True,pad=24,lh=56):
  ims=[Image.open(f).convert('RGB') for f in files];f=F(26)
  if horiz:
    W=sum(i.width for i in ims)+pad*(len(ims)+1);H=max(i.height for i in ims)+lh+pad*2
    B=Image.new('RGB',(W,H),(14,14,18));d=ImageDraw.Draw(B);x=pad
    for i,l in zip(ims,labels):d.text((x,pad),l,fill=(248,240,217),font=f);B.paste(i,(x,pad+lh));x+=i.width+pad
  else:
    W=max(i.width for i in ims)+pad*2;H=sum(i.height+lh for i in ims)+pad*(len(ims)+1)
    B=Image.new('RGB',(W,H),(14,14,18));d=ImageDraw.Draw(B);y=pad
    for i,l in zip(ims,labels):d.text((pad,y),l,fill=(248,240,217),font=f);B.paste(i,(pad,y+lh));y+=i.height+lh+pad
  B.save(out,optimize=True);print(out,B.size)
T=['now','e1','e2','e3']
board([f'out/fr-390-{t}.png' for t in T],[L[t] if len(L[t])<44 else L[t][:L[t].index(' · ')+0] for t in T],R+'ez/x2p-h25-board6-390.png')
# 1280: the four takes stacked, each the whole "How a round works" row
ims=[]
for t in T:
  im=Image.open(f'out/fr-1280-{t}.png').convert('RGB');im=im.resize((im.width//2,im.height//2));p=f'out/_half-1280-{t}.png';im.save(p);ims.append(p)
board(ims,[L[t] for t in T],R+'ez/x2p-h25-board6-1280.png',horiz=False)
board([f'out/close-{t}.png' for t in T],[L[t].split(' · ')[0] for t in T],R+'ez/x2p-h25-board6-close.png')
