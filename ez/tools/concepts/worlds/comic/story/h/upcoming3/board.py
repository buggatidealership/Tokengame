# /usr/bin/python3 board.py : the three H32 boards in ez/ (390 and 1280 full tabs, today + A, B, C; first frames at 3x, both data states)
import json
from PIL import Image,ImageDraw,ImageFont
O='out/';EZ='../../../../../../../'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
FR=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
N={'now':'Today (live)','A':'A  The next bell','B':'B  The road to NVIDIA','C':'C  Up for grading'}
def meas(t,W):
  try:m=json.load(open(f'{O}{t}-{W}.json'))
  except Exception:return ''
  return f"{m['sh']}px · {'no sideways scroll' if m['sw']<=m['vw'] else 'SCROLL '+str(m['sw']-m['vw'])} · {len(m['errs'])} errors"
def full(W,out,sc,side):
  ims=[(t,Image.open(f'{O}{t}-{W}.png').convert('RGB')) for t in ['now','A','B','C']]
  ims=[(t,i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS)) for t,i in ims]
  hh=70;pad=24
  if side:
    B=Image.new('RGB',(sum(i.width for _,i in ims)+pad*5,max(i.height for _,i in ims)+hh+60),(24,22,28));x=pad
    d=ImageDraw.Draw(B);d.text((pad,12),f'H32 Upcoming · {W}px · 2 Nov 2026 · data: the sheet (R81 Palantir, R82 Apple: all four trades in)',font=F(26),fill=(248,240,217))
    for t,i in ims:d.text((x,52),N[t],font=F(26),fill=(255,210,31));d.text((x,84),meas(t,W),font=FR(15),fill=(200,192,170));B.paste(i,(x,hh+50));x+=i.width+pad
  else:
    B=Image.new('RGB',(sum(i.width for _,i in ims)+pad*5,max(i.height for _,i in ims)+hh+60),(24,22,28));x=pad
    d=ImageDraw.Draw(B);d.text((pad,12),f'H32 Upcoming · {W}px desktop · 2 Nov 2026',font=F(26),fill=(248,240,217))
    for t,i in ims:d.text((x,52),N[t],font=F(26),fill=(255,210,31));d.text((x,84),meas(t,W),font=FR(15),fill=(200,192,170));B.paste(i,(x,hh+50));x+=i.width+pad
  B.save(EZ+out,optimize=True);print(out,B.size)
full(390,'x2p-h32-upcoming-390.png',.5,1)
full(1280,'x2p-h32-upcoming-1280.png',.5,1)
# first frames at 3x: row 1 the sheet's state, row 2 ez-data.js as committed (no trades for R81/R82 yet: "trades coming in")
fr={(t,d):Image.open(f'{O}{t}3-{d}-390-first.png').convert('RGB') for t in ['now','A','B','C'] for d in ['sheet','repo']}
w,h=fr[('now','sheet')].size;pad=40;hh=110
B=Image.new('RGB',(4*w+5*pad,2*(h+hh)+pad*3),(24,22,28));d=ImageDraw.Draw(B)
rows=[('sheet','The sheet now: all four trades in for Palantir and Apple'),('repo','ez-data.js as committed: no trades yet for Palantir and Apple (trades coming in)')]
for r,(dk,lab) in enumerate(rows):
  y=pad+r*(h+hh+pad);d.text((pad,y),lab,font=F(44),fill=(248,240,217))
  for c,t in enumerate(['now','A','B','C']):
    x=pad+c*(w+pad);d.text((x,y+56),N[t]+' · first frame 390x664 at 3x',font=F(34),fill=(255,210,31));B.paste(fr[(t,dk)],(x,y+hh))
B.save(EZ+'x2p-h32-upcoming-first.png',optimize=True);print('first',B.size)
