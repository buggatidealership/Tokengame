#!/usr/bin/python3
# board.py <shots dir>: the rounds6 boards in ez/ (x2p-x3p-h13-rounds6-390.png and -1280.png)
import sys,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];D=os.path.dirname(os.path.abspath(__file__));EZ=os.path.normpath(D+'/../../../../../../..')
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
def col(items,h,crop=None):
  out=[]
  for fn,lab in items:
    p=f'{S}/{fn}'
    if not os.path.exists(p):continue
    im=Image.open(p).convert('RGB')
    if crop:im=im.crop(crop(im))
    k=h/im.height;im=im.resize((int(im.width*k),h),Image.LANCZOS)
    c=Image.new('RGB',(max(im.width,380),h+96),'#fdbc2a');c.paste(im,(0,96));d=ImageDraw.Draw(c);y=6
    for i,l in enumerate(lab.split('\n')):d.text((10,y),l,fill='#0d0b10',font=F if i==0 else f);y+=34 if i==0 else 26
    out.append(c)
  return out
def grid(rows,gap=24,bg='#0d0b10',title=''):
  W=max(sum(c.width for c in r)+gap*(len(r)+1) for r in rows);H=sum(max(c.height for c in r) for r in rows)+gap*(len(rows)+1)+80
  B=Image.new('RGB',(W,H),bg);d=ImageDraw.Draw(B);d.text((gap,22),title,fill='#fdbc2a',font=F);y=80
  for r in rows:
    x=gap
    for c in r:B.paste(c,(x,y));x+=c.width+gap
    y+=max(c.height for c in r)+gap
  return B
T='rounds6 (H13) · Hot off the press, second pass: four covers of one size, the tally on the slate, a cover tap opens its round · on the live X3+ page, live data'
r1=col([('now-390.png','Today (live)\nthe rack, then the grid'),
        ('W1-sway-390.png','W1 · three a wire (MY PICK)\n4 newest, then 2 pencilled next prints\ntally chalked on the slate · loop: sway'),
        ('W2-ink-390.png','W2 · two a wire, big\nthe wires run on past the frame\nloop: wet ink on the newest only'),
        ('W3-sway-390.png','W3 · printed / to come\n4 newest on top, next 3 pencilled below\nloop: sway'),
        ('W1-sway-plain-390.png','W1 with plain blanks\n(for comparison with pencil)')],1688)
r2=col([('W1-sway-390-tap.png','Tap a cover: its round opens\n(the live slab, #/round/80)\nno clip letting go'),
        ('W1-sway-390-full.png','The whole chapter (W1)\npress, rack, every round')],1688)
z=lambda im:(0,int(im.height*.14),im.width,int(im.height*.62))
r3=col([('W1-sway-390.png','Close-up W1\ncovers 107 px wide at 390'),('W2-ink-390.png','Close-up W2\ncovers 129 px'),('W3-sway-390.png','Close-up W3\ncovers 83 px')],900,crop=z)
r4=col([('W1-sway-320.png','320 · W1'),('W2-ink-320.png','320 · W2'),('W3-sway-320.png','320 · W3')],1400)
grid([r1,r2,r3,r4],title=T).save(EZ+'/x2p-x3p-h13-rounds6-390.png',optimize=True)
d1=col([('now-1280.png','Today (live)'),('D-sway-slate-1280.png','D1 · one wire spans the width (MY PICK)\n4 newest + 3 pencilled · tally chalked on the slate')],800)
d2=col([('D-sway-brass-1280.png','D2 · the same wire, tally engraved\nin the brass plate on the press'),('D-sway-slate-1280-tap.png','Tap a cover: its round opens')],800)
grid([d1,d2],title=T).save(EZ+'/x2p-x3p-h13-rounds6-1280.png',optimize=True)
print('ok')
