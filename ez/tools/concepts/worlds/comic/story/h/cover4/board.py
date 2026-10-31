# /usr/bin/python3 board.py <shots> 390|1280 <out> : today's live cover first, then A to E, labels with cost; 390 adds D's swipe panels and close-ups
import sys,os
from PIL import Image,ImageDraw,ImageFont
S,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
T=[('now','Today (live X3+): the issue strip, the loop of four flat panels, the film','—'),
 ('a','A · The issue: one painted comic cover. Corner box, the title, the four founders on the floor with the leader holding the golden ticket, each real call in a balloon by his head, a "Bet #1: NVIDIA" flash; the four steps as "In this issue"','Hedra $0.17 (cover + desktop cover)'),
 ('b','B · The page: page one of the comic on cream stock, a panel per step. 1 four heads with real calls, 2 the winner crowned beside one who failed, the move as the bell, 3 the leader with the ticket, 4 the leader at the chip','Hedra $0 (cast2 moments)'),
 ('c','C · The splash: one picture of the leader with the golden ticket; narration boxes in reading order carry the calls and the close; step 3 is printed on the ticket itself','Hedra $0 (cast2 moment)'),
 ('d','D · One beat at a time: four big panels you swipe, the next peeking in; 2x2 heads with calls, the four stamped under the bell, the ticket, the chip with the live countdown in its dies and empty slots #2-#4','Hedra $0.04 (chip scene) + cast2'),
 ('e','E · The close, then the ticket: the four at the rail hold cardboard signs, their real calls in marker, stamped pass/fail, winner crowned, the bell rings the move; the leader holds the ticket (#1 printed) before the chip, countdown in its dies','Hedra $0.13 (rail scene + chip scene)')]
sc=1 if W==1280 else .5  # shots at DPR 2 for 390
ims=[]
for k,_,_ in T:
  p=f'{S}/cv-{W}-{k}.png';im=Image.open(p).convert('RGB')
  if W==390:im=im.resize((int(im.width*.5),int(im.height*.5)))
  else:im=im.resize((int(im.width*.5),int(im.height*.5)))
  ims.append(im)
fold=844 if W==390 else 800
cw=max(i.width for i in ims);pad=24;lh=185 if W==390 else 130
if W==390:
  cols=len(ims);H=lh+max(i.height for i in ims)+pad*2
  B=Image.new('RGB',(cols*(cw+pad)+pad,H),(24,22,30));d=ImageDraw.Draw(B)
  for n,(im,(k,t,c)) in enumerate(zip(ims,T)):
    x=pad+n*(cw+pad);y=pad
    import textwrap
    for j,l in enumerate(textwrap.wrap(t,34)[:9]):d.text((x,y+j*17),l,font=F(13),fill=(255,214,60))
    d.text((x,y+lh-22),c,font=F(12),fill=(200,200,210))
    B.paste(im,(x,y+lh));d.line((x,y+lh+fold*.5,x+im.width,y+lh+fold*.5),fill=(255,40,40),width=2)
else:
  rows=[ims[i:i+3] for i in range(0,len(ims),3)];Tr=[T[i:i+3] for i in range(0,len(T),3)]
  H=sum(lh+max(i.height for i in r)+pad for r in rows)+pad
  B=Image.new('RGB',(3*(cw+pad)+pad,H),(24,22,30));d=ImageDraw.Draw(B);y=pad
  import textwrap
  for r,tr in zip(rows,Tr):
    for n,(im,(k,t,c)) in enumerate(zip(r,tr)):
      x=pad+n*(cw+pad)
      for j,l in enumerate(textwrap.wrap(t,66)[:5]):d.text((x,y+j*19),l,font=F(15),fill=(255,214,60))
      d.text((x,y+lh-24),c,font=F(13),fill=(200,200,210))
      B.paste(im,(x,y+lh));d.line((x,y+lh+fold*.5,x+im.width,y+lh+fold*.5),fill=(255,40,40),width=2)
    y+=lh+max(i.height for i in r)+pad
B.save(OUT,optimize=True);print(OUT,B.size)
