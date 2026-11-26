# /usr/bin/python3 board.py : the H40 Upcoming boards -> ez/x2p-h40-up-390.png, ez/x2p-h40-up-1280.png (after shot.js F-* runs)
import json
from PIL import Image,ImageDraw,ImageFont
O='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/up40/';EZ='/home/user/Tokengame/ez/'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
FR=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',s)
BG=(24,22,28);CR=(248,240,217);GD=(255,210,31);MU=(200,192,170)
def J(t,W):return json.load(open(f'{O}{t}-{W}.json'))
def gate_lines(W):
  L=[]
  for t,lab in [('F-noon','Tue Nov 3, 7am NY (bell: today\'s close)'),('F-eve','Tue Nov 3, 5pm NY (bell: Wed\'s close)'),('F-in','Nov 3, 7am NY, __x2pUpV=\'in\'')]:
    try:m=J(t,W)
    except Exception:continue
    w=m['worst'];a=m['across'];P=m['panels']
    L.append(f"{lab}: {len(m['rows'])} trade rows · sideways scroll {m['sw']-m['vw']}px · errors {len(m['errs'])} · text under 8px {len(m['small'])} (smallest {m['minFs']}px) · rounds shown twice {len(m['dupes'])}")
    L.append(f"   a. number centre vs flap face: max |dx| {w['num']} |dy| {w['numy']} px · word: {w['word']} / {w['wordy']} · cell widths spread {w['cellw']} · gaps spread {w['gap']} · rows side by side, trade tops {w['pairTop']}")
    L.append(f"      across all cells: label top {a['lab_top']} · word flap top {a['word_top']} · number flap top {a['num_top']} · word baseline {a['wordBase']} · number baseline {a['numBase']} · face centres {a['wordFace_cx']}/{a['numFace_cx']} · number size {a['numSize']} (spreads, px)")
    L.append(f"   b. bell {P['bell']}  |  upcoming predictions {P['soon']}  |  hot {P['hot']}  |  rest {len(P['rest'])} rounds")
  return L
def col(path,w,crop=None,scale=None):
  i=Image.open(path).convert('RGB')
  if crop:i=i.crop(crop)
  k=w/i.width;return i.resize((w,int(i.height*k)),Image.LANCZOS)
def make(W,out,cols,closes,title,sub):
  CW=585 if W<700 else 640;pad=30;hh=120
  ims=[(lab,col(p,CW,c)) for lab,p,c in cols]
  cl=[(lab,Image.open(p).convert('RGB')) for lab,p in closes]
  gl=gate_lines(W)
  wid=max(sum(i.width for _,i in ims)+pad*(len(ims)+1),sum(i.width for _,i in cl)+pad*(len(cl)+1))
  ch=max(i.height for _,i in cl)+50;gh=len(gl)*24+60
  H=hh+ch+gh+max(i.height for _,i in ims)+80
  B=Image.new('RGB',(wid,H),BG);d=ImageDraw.Draw(B)
  d.text((pad,16),title,font=F(30),fill=CR);d.text((pad,60),sub,font=F(17),fill=MU)
  x=pad;y=hh
  for lab,i in cl:d.text((x,y),lab,font=F(20),fill=GD);B.paste(i,(x,y+34));x+=i.width+pad
  y+=ch+10;d.text((pad,y),'THE GATE (getBoundingClientRect on the built page; ink check on the pixels at 3x: every number and word within 0.5px of its face centre at 320, 390, 1280)',font=F(18),fill=GD);y+=34
  for ln in gl:d.text((pad,y),ln,font=FR(15),fill=CR);y+=24
  y+=20;x=pad
  for lab,i in ims:d.text((x,y),lab,font=F(20 if W<700 else 22),fill=GD);B.paste(i,(x,y+40));x+=i.width+pad
  B.save(EZ+out,optimize=True);print(out,B.size)
make(390,'x2p-h40-up-390.png',
 [('Today (live, H39)',EZ+'x2p-h39-up-390.png',(645,140,1260,6740)),('H40 · Tue Nov 3, 7am New York',O+'F-noon-390.png',None),('H40 · same day, 5pm (after the bell)',O+'F-eve-390.png',None),("H40 · reading 2: __x2pUpV='in'",O+'F-in-390.png',None)],
 [('3x close-up: Apple at the next bell (shown at 3x)',O+'F-noon-390-close.png'),('3x: Upcoming predictions, AMD (Claude still due)',O+'F-noonsoon-390-close.png')],
 'H40 Upcoming · 390px phone (shot at 3x, columns shown at 1.5x) · the departures board, trades on the flaps, the new order',
 'Order: the next bell (clock, the rounds it grades) · UPCOMING PREDICTIONS (the next trades due, by day) · HOT UPCOMING PREDICTIONS (Mag 7, then CAPS) · everything else by day. Data: ez/ez-data.js, clock pinned.')
make(1280,'x2p-h40-up-1280.png',
 [('H40 · Tue Nov 3, 7am New York',O+'F-noon-1280.png',None),('H40 · same day, 5pm (after the bell)',O+'F-eve-1280.png',None),("H40 · reading 2: __x2pUpV='in'",O+'F-in-1280.png',None)],
 [('Close-up: the next bell\'s rows at 1280 (shot at 2x)',O+'F-noon3-1280-close.png')],
 'H40 Upcoming · 1280px desktop (shown at half) · rows side by side keep their trade cells on one line',
 'Same rules as the phone; the four cells, their flaps and their type scale up together (one size for every number on the tab).')
