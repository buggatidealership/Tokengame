# /usr/bin/python3 board.py : the H37 Upcoming boards in ez/: today's live tab first, then takes A to F; 390 (shot at DPR 3, shown at half) and 1280
import json
from PIL import Image,ImageDraw,ImageFont
O='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37up/';EZ='../../../../../../../'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
FR=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
N={'now':'Today (live): The next bell, chips','A':'A  Departures (split-flap board)','B':'B  Order of play (enamel plates)','C':'C  The trader\'s diary','D':'D  The paper\'s earnings calendar','E':'E  The fight bill (poster)','F':'F  The wall calendar'}
T=['now','A','B','C','D','E','F']
def meas(t,W):
  try:m=json.load(open(f'{O}{t}-{W}.json'))
  except Exception:return ''
  s=f"{m['sh']}px tall · {'no sideways scroll' if m['sw']<=m['vw'] else 'SIDEWAYS '+str(m['sw']-m['vw'])+'px'} · collisions {len(m.get('coll',[]))} · clipped names {len(m.get('clip',[]))} · errors {len(m['errs'])}"
  return s
def full(W,out,sc,title):
  ims=[(t,Image.open(f'{O}{t}-{W}.png').convert('RGB')) for t in T]
  ims=[(t,i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS)) for t,i in ims]
  pad=30;hh=130
  B=Image.new('RGB',(sum(i.width for _,i in ims)+pad*(len(ims)+1),max(i.height for _,i in ims)+hh+pad),(24,22,28));x=pad
  d=ImageDraw.Draw(B);d.text((pad,14),title,font=F(30),fill=(248,240,217))
  for t,i in ims:
    d.text((x,62),N[t],font=F(24 if W<700 else 30),fill=(255,210,31));d.text((x,98),meas(t,W),font=FR(15 if W<700 else 18),fill=(200,192,170));B.paste(i,(x,hh));x+=i.width+pad
  B.save(EZ+out,optimize=True);print(out,B.size)
full(390,'x2p-h37-up-390.png',.5,'H37 Upcoming, not chips · 390px phone (shot at 3x, shown at half) · 2 Nov 2026, 7pm New York · data: ez-data.js · the next bell Tue Nov 3 (Apple, Palantir in; Shopify, Pfizer due before the open)')
full(1280,'x2p-h37-up-1280.png',.5,'H37 Upcoming, not chips · 1280px desktop (shown at half) · the page column is 860px wide on desktop')
