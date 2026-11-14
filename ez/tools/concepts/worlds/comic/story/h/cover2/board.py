# /usr/bin/python3 board.py <shots dir> <width> <out> : today, then K1..K5, labelled with a line and the cost; the first screen's end marked
# /usr/bin/python3 board.py <shots dir> close <out> : close-ups at 3x, one row per take
import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
T=[('now','Today (live X3+): flat face circles in step 1, flat panels','' ),
 ('k1','K1 · Clockwork (C2 redone): marks struck into brass coins, logo enamelled on a hanging sign, engraved plates, cog numbers, brass tubes round a real New York clock, the painted bell, a ledger','$0.35 1K + $1.72 2K (coin, sign, gear, ledger)'),
 ('k2','K2 · Box office (C3 redone): the leader\'s foil ticket with a gilded wax seal, marks pressed into red wax, a playbill for the logo, a date stamper for the close, the ticket spike, words on admission stubs','$0.24'),
 ('k3','K3 · Pinned (new): a denim jacket; marks as enamel pins, the logo on an embroidered patch, an alarm-clock pin keeping New York time, name tapes, chain-stitched arrows, chenille headline','$0.33 1K + $0.86 2K (pin, patch)'),
 ('k4','K4 · The midway (new): marks painted on gallery targets, the logo on a bulb sign, a high striker that rings the bell, a prize roll, a chalk scoreboard, planks, bulb arrows, wood-type headline','$0.33'),
 ('k5','K5 · Cut paper (new): marks cut from paper on rosettes, the logo on a scalloped sign, a paper clock keeping New York time, a gold paper ticket, a card stack, cut-card arrows and labels, stacked-paper headline','$0.37')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,22);Fs=ImageFont.truetype(FR,18);pad=40
def wrap(d,t,font,w):
  L=['']
  for x in t.split(' '):
    if d.textlength((L[-1]+' '+x).strip(),font=font)>w:L.append(x)
    else:L[-1]=(L[-1]+' '+x).strip()
  return L
if W=='close':
  rows=[]
  for k,t,c in T[1:]:
    fs=sorted(glob.glob(f'{D}/cu-{k}-*.png'));ims=[Image.open(f).convert('RGB') for f in fs]
    ims=[i.resize((max(1,int(i.width*330/i.height)),330)) if i.height>330 or i.width<900 else i for i in ims]
    rows.append((t,ims))
  Wd=max(sum(i.width+16 for i in r) for _,r in rows)+2*pad;Hd=sum(330+70 for _ in rows)+40
  B=Image.new('RGB',(Wd,Hd),'#1b1820');d=ImageDraw.Draw(B);y=20
  for t,r in rows:
    d.text((pad,y),t.split(':')[0]+': close-ups at 3x (issue strip, headline, Starring, steps 1 to 4, the loop, the film frame, the button)',fill='#fdbc2a',font=F);y+=36;x=pad
    for i in r:B.paste(i,(x,y));x+=i.width+16
    y+=330+34
  B.save(OUT,optimize=True);print(OUT,B.size);sys.exit()
W=int(W);DPR=2;FOLD=(844 if W<600 else 800)*DPR;sc=1 if W<600 else .5
ims=[(t,c,Image.open(f'{D}/cv-{W}-{k}.png').convert('RGB')) for k,t,c in T]
ims=[(t,c,i.resize((int(i.width*sc),int(i.height*sc)))) for t,c,i in ims]
lh=190;B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
for t,c,i in ims:
  for n,l in enumerate(wrap(d,t,F,i.width)[:6]):d.text((x,10+n*26),l,fill='#fdbc2a',font=F)
  if c:d.text((x,lh-28),'Hedra: '+c,fill='#e9dfc6',font=Fs)
  B.paste(i,(x,lh));fy=lh+int(FOLD*sc)
  if fy<lh+i.height:
    for xx in range(x,x+i.width,24):d.line([(xx,fy),(xx+12,fy)],fill='#ff3a31',width=4)
    d.text((x+6,fy+6),'first screen ends',fill='#ff3a31',font=Fs)
  x+=i.width+pad
B.save(OUT,optimize=True);print(OUT,B.size)
