# /usr/bin/python3 board.py <shots dir> <width> <out> : today, then C1..C5 (label + cost), the fold marked; one row of tiles
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X3+): the loop as four flat panels','' ),
 ('c1','C1 · The closing bell: painted balcony (Hedra loop), the bell swings and counts down, the loop as bunting. Step 4 (a)','$0.20 + shared props'),
 ('c2','C2 · Round the clock (recommended): the loop IS the clock; real New York time, 4 PM pip, steps in its quarters. Step 4 (a)','$0.40 + shared props'),
 ('c2b','C2b · the same with step 4 (b): "We follow its call on NVIDIA with our pool. It can be lost."','same as C2'),
 ('c3','C3 · The golden ticket: the leader on painted foil under a spotlight, the loop as tear-off stubs. Step 4 (b)','$0.07 + shared props'),
 ('c4','C4 · Fight night: each AI on its own corner post, smoke loop, rounds on placards, the pool is the purse. Step 4 (b)','$0.20 + shared props'),
 ('c5','C5 · The floor, live: trading-floor loop, steps on desk monitors, a live tape with the real next bell. Step 4 (a)','$0.40 + shared props ($1.13: bell, clapper, clock, ticket, stack, jar; 2K bell and clock)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
DPR=2;FOLD=(844 if W<600 else 800)*DPR
ims=[(t,c,Image.open(f'{D}/cv-{W}-{k}.png').convert('RGB')) for k,t,c in T]
sc=1 if W<600 else .5
ims=[(t,c,i.resize((int(i.width*sc),int(i.height*sc)))) for t,c,i in ims]
F=ImageFont.truetype(FN,22);Fs=ImageFont.truetype(FR,19);pad=40;lh=150
B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),'#1b1820');d=ImageDraw.Draw(B);x=pad
for t,c,i in ims:
  words=t.split(' ');lines=['']
  for w in words:
    if d.textlength(lines[-1]+' '+w,font=F)>i.width:lines.append(w)
    else:lines[-1]=(lines[-1]+' '+w).strip()
  for n,l in enumerate(lines[:4]):d.text((x,12+n*26),l,fill='#fdbc2a',font=F)
  if c:d.text((x,12+4*26+4),'Hedra: '+c,fill='#e9dfc6',font=Fs)
  B.paste(i,(x,lh));fy=lh+int(FOLD*sc)
  if fy<lh+i.height:
    for xx in range(x,x+i.width,24):d.line([(xx,fy),(xx+12,fy)],fill='#ff3a31',width=4)
    d.text((x+6,fy+6),'first screen ends',fill='#ff3a31',font=Fs)
  x+=i.width+pad
if len(sys.argv)>4:
  R=Image.open(sys.argv[4]).convert("RGB");R.thumbnail((B.width-80,10**5));B2=Image.new("RGB",(B.width,B.height+R.height+90),"#1b1820");B2.paste(B,(0,0));ImageDraw.Draw(B2).text((40,B.height+20),"Close-ups at 3x: the C1 bell (painted body, clapper, live plate), the C2 clock (painted face, hands at New York time, red 4 PM pip), the lettering, the C3 ticket",fill="#fdbc2a",font=F);B2.paste(R,(40,B.height+70));B=B2
B.save(OUT,optimize=True);print(OUT,B.size)
