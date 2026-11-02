# /usr/bin/python3 board.py : the meet10 boards (390, 1280, 320, close-up). Shots from run.js in out/shots/, close-ups from close.js in out/close/.
from PIL import Image,ImageDraw,ImageFont
import json,os
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(s,f=F):return ImageFont.truetype(f,s)
EZ='../../../../../../../'
def lab(d,x,y,text,w):
  for i,line in enumerate(text.split('\n')):d.text((x,y),line,fill=(255,210,31) if i==0 else (248,240,217),font=font(22 if i==0 else 17,F if i==0 else FR));y+=30 if i==0 else 23
def board(cells,out,w,title,cols=None,sub=''):
  ims=[Image.open(f).convert('RGB') for f,_ in cells];ims=[i.resize((w,int(i.height*w/i.width)),Image.LANCZOS) for i in ims]
  cols=cols or len(ims);rows=(len(ims)+cols-1)//cols;pad=26;head=150;top=120
  rh=[max(ims[r*cols+c].height for c in range(cols) if r*cols+c<len(ims)) for r in range(rows)]
  B=Image.new('RGB',(pad+cols*(w+pad),top+sum(h+head+pad for h in rh)),(14,12,16));d=ImageDraw.Draw(B)
  d.text((pad,20),title,fill=(255,210,31),font=font(34));d.text((pad,68),sub,fill=(200,192,172),font=font(19,FR))
  y=top
  for r in range(rows):
    for c in range(cols):
      k=r*cols+c
      if k>=len(ims):continue
      x=pad+c*(w+pad);lab(d,x,y+8,cells[k][1],w);B.paste(ims[k],(x,y+head))
    y+=rh[r]+head+pad
  B.save(out,optimize=True);print(out,B.size)
L={'now':'Today (chips8 c, live)\nballoons above, SEASON and LAST ROUND windows',
 's1-a':'S1 · the strip  ×  A\nmeetbus A: the ledger up the left, rounds on their side\nline in the SEASON window, W-L in LAST ROUND\nseason P&L off the chip',
 's1-b':'S1 · the strip  ×  B\nas S1 · A, plus the season P&L as a small lit line\nunder LAST 7 DAYS ("SEASON +$148,480")',
 's2-a':'S2 · the tape (my own)  ×  A\nthe same strip, each round a flat ticket read upright:\nround, the company\'s mark lit in the glass, the move\nseason P&L off the chip',
 's2-b':'S2 · the tape  ×  B  (my pick)\nthe tape, plus the season P&L small line\n(the No. order stays explained on the chip)'}
K=['now','s1-a','s1-b','s2-a','s2-b']
board([(f'out/shots/{k}-390.png',L[k]) for k in K],EZ+'x2p-h26-meet10-390.png',780,'meet10 · Meet the models: the line in the chip, fed by the ledger strip · 390 px',
 sub='Frozen mid-pulse: a pulse runs each trace green (the trade went the right way) or red, and lands on that chip\'s W-L: the W or the L lights. All numbers live from ROUNDS / __x2pPnl.')
board([(f'out/shots/{k}-1280.png',L[k]) for k in K],EZ+'x2p-h26-meet10-1280.png',1280,'meet10 · 1280 px: the strip runs down the column gap and feeds both columns',cols=2,
 sub='Same takes; the line fits at 16 px cap height on desktop, two lines, one size on all four chips.')
board([(f'out/shots/{k}-320.png',L[k].split('\n')[0]) for k in ['s1-a','s1-b','s2-a','s2-b']],EZ+'x2p-h26-meet10-320.png',640,'meet10 · 320 px check',
 sub='No sideways scroll, nothing outside the page. The line drops to 8.25 to 8.5 px cap here (9 px floor is met from 360 px up; see REPORT).')
if os.path.exists('out/close/a.png'):
  a=Image.open('out/close/a.png');b=Image.open('out/close/b.png');s1=Image.open('out/close/s1.png');s2=Image.open('out/close/s2.png')
  board([('out/close/a.png','A · the season P&L leaves the chip\nNo. 3 reads −$79,220 over No. 4 at −$34,080 (7 days):\nthe order needs the season figure the chip no longer shows'),
         ('out/close/b.png','B · the season P&L as a small line\n"SEASON −$56,930" over "SEASON −$70,650": the order explains itself;\ncost: a third figure on the chip, about 8 px cap (label 6) at 390')],EZ+'x2p-h26-meet10-pnl.png',1170,'meet10 · the open question, A or B (3x at 390, GPT and Kimi)',
   sub='The line in the SEASON window (one size on all four chips, 10.25 px cap at 390 on the tape take, 10.75 on the strip take); W-L in green and red in the old LAST ROUND window.')
  board([('out/close/s1.png','S1 · the strip (meetbus A)\nrounds on their side, 13 px'),('out/close/s2.png','S2 · the tape (my own)\nflat tickets: round, mark, move')],EZ+'x2p-h26-meet10-strips.png',1100,'meet10 · the two strips, 3x at 390 (a pulse landing on W-L)')
