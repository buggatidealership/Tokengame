# board.py <shots> <out390> <out1280> : one row per take: the cover, the opening half way, the book open
import sys
from PIL import Image,ImageDraw,ImageFont
S,O3,O12=sys.argv[1:4]
T=[('a','A · The closing bell','opens: the bell rings, the hall doors part (gatefold)','moves: the bell sways'),
   ('b','B · The tape','opens: the dome lifts, the tape runs on down the page','moves: a glint crosses the dome'),
   ('c','C · The scoreboard','opens: fly through the lit operator hatch','moves: the hatch light flickers'),
   ('d','D · The box office  (pick)','opens: the golden ticket comes out of the slot and turns over','moves: the ticket nudges out of its slot'),
   ('e','E · The issue','opens: the cover swings on its spine, then a pan to the right page','moves: the cover corner lifts; the bell sways')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
def board(W,cw,ch,out):
  cols=['1 the cover','2 opening (half way)','3 open: the first spread']
  pad=16;lab=58;w=pad+3*(cw+pad);h=pad+len(T)*(ch+lab+pad)+30
  o=Image.new('RGB',(w,h),(18,18,22));d=ImageDraw.Draw(o)
  d.text((pad,8),f'cover6 · the book\'s cover, no characters · {W}px · live text from ez-data.js (80 graded, Grok holds the golden ticket, XOM +2.17%)',fill=(253,188,42),font=F(18))
  y=40
  for k,name,op,mv in T:
    d.text((pad,y),name,fill=(248,240,217),font=F(22));d.text((pad,y+28),op+'   ·   '+mv,fill=(181,173,156),font=F(15))
    for i,s in enumerate(['1cover','2open','3inside']):
      im=Image.open(f'{S}/{k}-{W}-{s}.png').resize((cw,ch),Image.LANCZOS);x=pad+i*(cw+pad);o.paste(im,(x,y+lab))
      if k=='a':d.text((x,y+lab-16),cols[i],fill=(253,188,42),font=F(13))
    y+=ch+lab+pad
  o.save(out)
board(390,390,844,O3);board(1280,640,400,O12)
