# /usr/bin/python3 board.py <shots dir> <ez dir>: boards x2p-x3p-h10-floor-390.png and -1280.png (today's live page first, then each take in both styles).
import sys
from PIL import Image,ImageDraw,ImageFont
S,EZ=sys.argv[1],sys.argv[2]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
FR=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
def wrap(d,t,f,w):
  out=[];l=''
  for x in t.split():
    if d.textlength((l+' '+x).strip(),font=f)>w:out.append(l);l=x
    else:l=(l+' '+x).strip()
  return out+[l]
ST=[('am','Mon Nov 2, 11:05 am NY · market open'),('close','Fri Oct 30, 4:00 pm · the bell'),('after','Fri Oct 30, 5:45 pm · after the bell'),('night','Mon Nov 2, 5:40 am · overnight'),('wkend','Sat Oct 31, 1:00 pm · weekend')]
STY={'n':'Brush and ink noir (the vault)','l':'The logo\'s flat badge'}
def board(W,colw,out):
  rows=[]
  rows.append(('Today\'s live Upcoming tab (first screen)',[(f'live-up-{W}',f'Live today ({W}px)')]))
  for s in 'nl':
    rows.append((f'1 · The floor on New York\'s clock · {STY[s]} · plates $0.03 to $0.04 each (5 states, one room)',[(f'floor-{s}-{k}-{W}',c) for k,c in ST]))
    rows.append((f'Under the floor: every round to swipe · then Your call (this browser only) · {STY[s]}',[(f'rounds-{s}-{W}','On the card: one black betting card per round to come, logo printed in one ink, the four AIs\' calls (? until in)'),
      (f'call-{s}-open-{W}','Your call, before the AIs\' calls are in: stamp green (up) or red (down) on the next round'),
      (f'call-{s}-called-{W}','Stamped UP. Kept in this browser; the four AIs\' cards stay sealed until their calls are in'),
      (f'call-{s}-result-{W}','Your next visit after the close (demo history R78 to R80): their calls Right / Wrong, "You beat 2 of 4", the running tally')]))
    rows.append((f'2 · Your call at the end of the Overview, in Tonight at the close · {STY[s]}',[(f'tonight-{s}-{W}','In place: the counter under "Next on the card"'),(f'tonight-{s}-open-{W}','The counter close-up: one card, two stamps'),(f'tonight-{s}-called-{W}','Stamped DOWN')]))
  pad=22;ims=[]
  for title,shots in rows:
    row=[]
    for f,c in shots:
      try:im=Image.open(f'{S}/{f}.png').convert('RGB')
      except Exception:continue
      k=colw/im.width
      if W>1000 and f.startswith('live'):k=min(k*1.0,1)
      im=im.resize((int(im.width*k),int(im.height*k)));row.append((im,c))
    ims.append((title,row))
  BW=max(sum(im.width for im,_ in r)+pad*(len(r)+1) for _,r in ims)
  H=sum(110+max(im.height for im,_ in r)+90 for _,r in ims)+90
  bd=Image.new('RGB',(BW,H),'#0b0d12');d=ImageDraw.Draw(bd);d.text((pad,24),f'H10 floor · the Upcoming floor on New York\'s clock, and Your call · {W}px',fill='#ffd21f',font=F(34));y=90
  for title,row in ims:
    d.text((pad,y),title,fill='#f8f0d9',font=F(24));y+=44;x=pad;hh=max(im.height for im,_ in row)
    for im,c in row:
      bd.paste(im,(x,y));yy=y+im.height+8
      for l in wrap(d,c,FR(18),im.width)[:3]:d.text((x,yy),l,fill='#d9d2c0',font=FR(18));yy+=23
      x+=im.width+pad
    y+=hh+110
  bd=bd.crop((0,0,BW,y));bd.save(out,optimize=True);print(out,bd.size)
board(390,390,f'{EZ}/x2p-x3p-h10-floor-390.png')
board(1280,900,f'{EZ}/x2p-x3p-h10-floor-1280.png')
