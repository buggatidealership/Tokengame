# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live top, then take A redone (arrival, every frame off; then every frame on),
# then a row of the five step-word letterings (the four frames each), then a row of the four film heads.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
sc=2 if W>=600 else 1
def ld(f):
  i=Image.open(f'{D}/{f}').convert('RGB');return i.resize((i.width//sc,i.height//sc)) if sc>1 else i
TOP=[('now','Today (live X2+): headline at the foot of the picture, How it works bill, live strip',''),
 ('LAoff','A redone, on arrival: headline on top, the chip with the four AIs (logo + name only), every beat edge to edge; each frame off and inviting a tap (dies breathe, the bell\'s plunger bobs, the ledger\'s cursor blinks, a glint on the gold)','Hedra $0.29 new + top1\'s paintings'),
 ('LAon','A redone, every frame on (after a tap, or 3 s on screen): R40 Tesla\'s four calls, the bell\'s readout with the move and Grok wins, R40 written to the ledger under R38 and R39, the leader engraved','LED lettering, film head A')]
LET=[('L','L · LED dot matrix (pick): amber dots on a black glass strip, the season bar\'s family'),('S','S · Silkscreen: cream part-label ink on a scrap of green board'),
 ('M','M · Stamped gold: letters struck into a gold plate'),('T','T · Gold traces: the letters routed like the board\'s traces'),('N','N · Neon: green tubes, red on the bell and #1')]
FH=[('A','A · "The explainer 1:20" (pick)'),('B','B · "The 80-second version"'),('C','C · "The whole game in 80 seconds"'),('D','D · "Press play · EZ in 1:20"')]
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
F=ImageFont.truetype(FN,22);G=ImageFont.truetype(FR,19);pad=40;lh=230
ims=[(t,c,ld(f'top-{W}-{k}.png')) for k,t,c in TOP]
rows=[]
def row(title,items):
  hh=max(i.height for _,i in items);ww=sum(i.width for _,i in items)+pad*(len(items)+1)
  R=Image.new('RGB',(ww,hh+110),'#1b1820');d=ImageDraw.Draw(R);d.text((pad,14),title,fill='#e9dfc6',font=F);x=pad
  for t,i in items:
    for n,l in enumerate(wrap(d,t,G,i.width)[:2]):d.text((x,48+n*24),l,fill='#fdbc2a',font=G)
    R.paste(i,(x,104));x+=i.width+pad
  return R
B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+30),'#1b1820');d=ImageDraw.Draw(B);x=pad
for t,c,i in ims:
  for n,l in enumerate(wrap(d,t,F,i.width)[:6]):d.text((x,12+n*28),l,fill='#fdbc2a',font=F)
  if c:d.text((x,12+6*28+6),c,fill='#e9dfc6',font=G)
  B.paste(i,(x,lh));x+=i.width+pad
rows.append(B)
rows.append(row('The step words: five letterings (none is the bet\'s Bangers, which "How a round works" now wears)',[(t,ld(f'fr-{W}-{k}Aon.png')) for k,t in LET]))
rows.append(row('The film\'s head: four options (the display on the board is the frame; no bill, no "How it works")',[(t,ld(f'fh-{W}-L{k}on.png')) for k,t in FH]))
N=Image.new('RGB',(max(r.width for r in rows),sum(r.height for r in rows)),'#1b1820');y=0
for r in rows:N.paste(r,(0,y));y+=r.height
N.save(OUT,optimize=True);print(OUT,N.size)
