# python3 board.py <shots dir> <ez dir>: one board per idea, x2p-x3p-h8-wow-<n>.png (states side by side, a caption under each).
import sys,os
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
B=[('1','The pool: the coin pile is as tall as the money',[('vault-now-390','Now: R1 to R80, the four AIs\' season P&L, +$123,850 (stand-in until the pool is live; $200K fills the vault).'),('vault-r40-390','Scrubbed to R40: the pile is lower. Tap the plaque and the season pours in round by round.'),('vault-r10-390','R10: under water, -$27,250. The floor is bare and the plaque turns red.')]),
 ('2','The floor runs on New York\'s clock',[('exch-tue1012-390','Tue Nov 3, 10:12 am NY: open, the clock shows New York time, the rail names today\'s rounds.'),('exch-tue1600-390','4:00 pm: the bell swings by itself, slips fly, "The bell, 4 graded".'),('exch-tue2140-390','9:40 pm: closed, moonlight, one lamp. "Next bell Wed 4:00 pm".'),('exch-now-390','Right now (Sat Oct 31): night, next bell Mon.'),('exch-tue1600-1280','Desktop, 4:00 pm.')]),
 ('3','Your call: beat the four AIs',[('window-open-390','Before the bell: R81 Palantir, the AIs\' slips sealed until Monday. The two stamps glow: green up, red down.'),('window-called-390','Tapped green: UP stamped on your slip, kept in your browser.'),('window-result-390','Your next visit (shown with R80 Exxon): their calls unsealed and marked, your slip stamped "Beat 2 of 4".')]),
 ('4','Depth: the floor seen from the gallery',[('depth-p0-390','Scene entering from below: the rail and the trader sit low.'),('depth-p5-390','Centred.'),('depth-p1-390','Leaving at the top, phone tilted right: the near rail travels 4x further than the wall, so the room opens up.')]),
 ('5','The founder\'s pose follows his latest result',[('pose-r79-1280','After R79 AstraZeneca: GPT and Claude tie and both wear the crown, Kimi right way but not closest (chasing), Grok hit by the FAIL.'),('pose-r80-1280','After R80 Exxon: GPT crowned, Kimi chasing, Claude and Grok hit by the FAIL.'),('pose-r80-390','Phone, after R80.')]),
 ('6','Sound you turn on: the radio on the trading post',[('sound-off-390','Off by default: the radio\'s glow pulses slowly as the cue.'),('sound-on-390','On: the dial lights; the floor murmurs; at 4:00 pm the bell, the roar and the slips.'),('sound-on-1280','Desktop.')])]
for n,title,shots in B:
  ims=[(Image.open(f'{S}/{f}.png').convert('RGB'),c) for f,c in shots]
  H=1500;ims=[(im.resize((int(im.width*min(1,H/im.height)) if im.height>H else im.width, min(H,im.height))) if im.height>H else im,c) for im,c in ims]
  ims=[(im.resize((int(im.width*H*0.62/im.height),int(H*0.62))) if im.width>1500 else im,c) for im,c in ims]
  pad=24;cw=[max(im.width,380) for im,_ in ims];W=sum(cw)+pad*(len(ims)+1);hh=max(im.height for im,_ in ims)
  bd=Image.new('RGB',(W,hh+300),'#0b0d12');d=ImageDraw.Draw(bd);d.text((pad,24),f'H8 wow {n} · {title}',fill='#ffd21f',font=F(36))
  x=pad
  for (im,c),w in zip(ims,cw):
    bd.paste(im,(x,90));y=100+im.height
    for l in wrap(d,c,FR(20),w):d.text((x,y),l,fill='#e8e2d0',font=FR(20));y+=27
    x+=w+pad
  bd.save(f'{EZ}/x2p-x3p-h8-wow-{n}.png',optimize=True);print(n,bd.size)
