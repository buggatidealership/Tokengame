# /usr/bin/python3 board.py <shots dir> <out phone png> <out desktop png>
# Phone board: the four strips at 390 side by side (Today, Q1, Q2, Q3), then panel 3 at its beats per take.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,OUTP,OUTD=sys.argv[1:4];BG=(24,22,28);G=28
def F(s,b=False):
  return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
ft,fl,fs=F(40,True),F(21),F(22,True)
T=[('now','Today (live R11)'),('q1','Q1 · Fight card: the ring, the arena screen, scorecards, the purse'),('q2','Q2 · Shouting match: balloons carried from the calls to the grader, bills, podium'),('q3','Q3 · Bet slips and the tape: slips dealt, ticker tape, slips stamped or torn, the cashier')]
LINE='"One round, start to finish" on round 56 (Robinhood), every number read from ROUNDS and __x2pPnl(). Panel 2 now starts at 0:10 of the film (all four calls on their screens); the market lands at 0:13.2. Panel 3 waits until the dial is fully on screen and read, then plays in three beats over about 6 s; tap to replay; still with reduced motion.'
def wrap(t,f,w):
  out=[];l='';dr=ImageDraw.Draw(Image.new('RGB',(1,1)))
  for x in t.split():
    if dr.textlength(l+' '+x,font=f)>w and l:out.append(l);l=x
    else:l=(l+' '+x).strip()
  return out+[l]
def board(rows,out,colw,title):
  rr=[]
  for r in rows:
    ims=[]
    for p,lab in r:
      im=Image.open(p).convert('RGB');k=colw/im.width;im=im.resize((colw,round(im.height*k)),Image.LANCZOS);ims.append((im,lab))
    rr.append(ims)
  TW=max(len(r)*(colw+G)+G for r in rr);hl=wrap(LINE,fl,TW-2*G);head=72+28*len(hl)+12
  RH=[max(i.height for i,_ in r)+64 for r in rr]
  c=Image.new('RGB',(TW,head+sum(RH)+G),BG);d=ImageDraw.Draw(c);d.text((G,18),title,font=ft,fill=(253,188,42))
  for i,l in enumerate(hl):d.text((G,72+28*i),l,font=fl,fill=(235,230,220))
  y=head
  for r,h in zip(rr,RH):
    x=G
    for im,lab in r:
      for i,l in enumerate(wrap(lab,fs,im.width)[:2]):d.text((x,y+4+26*i),l,font=fs,fill=(255,255,255) if lab.startswith('Today') else (253,188,42))
      c.paste(im,(x,y+60));x+=im.width+G
    y+=h
  c.save(out,optimize=True);print(out,c.size)
P=lambda n:os.path.join(D,n)
rows=[[(P('strip-390-%s.png'%t),lab) for t,lab in T]]
for t,lab in T:
  rows.append([(P('p3-390-%s-%s.png'%(t,b)),'%s · panel 3 · %s'%(lab.split(':')[0].split(' (')[0],bl)) for b,bl in ([('start','0.0 s'),('needle','0.5 s'),('hit','1.2 s'),('end','end, 3.3 s')] if t=='now' else [('calls','1.5 s: the calls land'),('bell','3.3 s: the bell, the needle'),('hit','4.5 s: the hit'),('end','end, 6 s: graded, crowned')])])
board(rows,OUTP,520,'One round, start to finish · helper q · phone (390)')
board([[(P('strip-1280-now.png'),T[0][1]+': panel 2 is 309 x 603, a square film cropped to half'),(P('strip-1280-q1.png'),T[1][1])],[(P('strip-1280-q2.png'),T[2][1]),(P('strip-1280-q3.png'),T[3][1])]],OUTD,1200,'One round, start to finish · helper q · desktop (1280)')
