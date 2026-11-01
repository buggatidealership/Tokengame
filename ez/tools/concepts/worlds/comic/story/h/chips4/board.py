# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live standings, H19's S (before), then S and N2 made symmetrical, the box measurements are in boxes.md. On the phone board a
# 2x close-up row: chips No. 1 to 4 cut from the beat and laid side by side, so the parts line up across them.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): 01 Current standings',''),
 ('h19S','Before: H19 S. Each chip its own painting, so the window, logo plate, label and flag land in different places and sizes','H19'),
 ('S','S, symmetrical: one master EPROM painting, re-coloured per model; the founder in the square quartz window; every part on one fixed grid','$0.11 (master) + $0.04 (rays)'),
 ('N2','N2, symmetrical: one master with the exposed silicon die, re-coloured per model; the loop glows out of the die, no frame','$0.05 (master)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,22 if W<600 else 24);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;bg='#1b1820'
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
ims=[(t,c,Image.open(f'{D}/ch-{W}-{k}.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/ch-{W}-{k}.png')]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
if W<600:
  lh=300;B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),bg);d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:8]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+8*30+4),c if c=='H19' else 'Hedra '+c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
  # 2x close-ups: the four chips cut from the beat (each a quarter of the chips' height) and laid side by side
  def chips(k):
    b=Image.open(f'{D}/bt-{W}-{k}-0.png').convert('RGB');y0=68;h=(b.height-y0-12)/4
    return [b.crop((0,int(y0+h*n),b.width,int(y0+h*(n+1)))) for n in range(4)]
  for k,title in [('h19S','Before (H19 S), the four chips side by side at 2x'),('S','S, the four chips side by side at 2x: window, logo, flag and label line up'),('N2','N2, the four chips side by side at 2x')]:
    if not os.path.exists(f'{D}/bt-{W}-{k}-0.png'):continue
    r=chips(k);H=max(x.height for x in r);cw=sum(x.width for x in r)+pad*5
    N=Image.new('RGB',(max(B.width,cw),B.height+H+80),bg);N.paste(B,(0,0));d=ImageDraw.Draw(N);d.text((pad,B.height+14),title,fill='#fdbc2a',font=F);x=pad
    for c in r:N.paste(c,(x,B.height+56));x+=c.width+pad
    B=N
else:
  hh=[i.height+100 for *_,i in ims]
  B=Image.new('RGB',(max(i.width for *_,i in ims)+2*pad,sum(hh)+pad),bg);d=ImageDraw.Draw(B);y=pad
  for (t,c,i),h in zip(ims,hh):
    for n,l in enumerate(wrap(d,t+('   · '+(c if c=='H19' else 'Hedra '+c) if c else ''),F,i.width)[:2]):d.text((pad,y+n*30),l,fill='#fdbc2a',font=F)
    B.paste(i,(pad,y+70));y+=h
B.save(OUT,optimize=True);print(OUT,B.size)
