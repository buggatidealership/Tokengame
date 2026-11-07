# /usr/bin/python3 board.py <shots dir> <W> <out.png> : today's Meet the models (chips7) | take a | take b | take c | a with every live box outlined, then close-ups
# /usr/bin/python3 board.py close <3x shots dir> <out.png> : one chip at 3x (1170 real px at 390): today's against takes a and b
import sys
from PIL import Image,ImageDraw,ImageFont
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
BG=(18,17,22);CR=(240,232,207);GD=(255,210,31)
if sys.argv[1]!='close':
  D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
  cols=[('Today (live): chips7','ch-%d-now.png'),('a · SW: founder big, 7 days lit, last round, season, the line etched','ch-%d-a.png'),
        ('b · the window breaks the chip\'s top edge','ch-%d-b.png'),('c · a, the line said in a balloon (readable)','ch-%d-c.png'),('a · every live box outlined','ch-%d-a-grid.png')]
  ims=[Image.open(f'{D}/'+f%W).convert('RGB') for _,f in cols];k=.5 if W>600 else 1
  ims=[i.resize((int(i.width*k),int(i.height*k))) for i in ims];cw=max(i.width for i in ims);H=max(i.height for i in ims)
  ones=[Image.open(f'{D}/one-{W}-{t}-{i}.png').convert('RGB') for t,i in (('a',0),('a',3),('b',0))];tr=Image.open(f'{D}/try-{W}-a.png').convert('RGB')
  if W>600:ones=[o.resize((o.width*2//3,o.height*2//3)) for o in ones];tr=tr.resize((tr.width*2//3,tr.height*2//3))
  pad=40;top=110;rowc=2 if W>600 else 4
  bw=max(pad+len(ims)*(cw+pad),pad+sum(o.width+pad for o in ones[:rowc])+pad)
  bh=top+H+pad+70+sum(o.height+pad for o in ones+[tr])
  B=Image.new('RGB',(bw,bh),BG);d=ImageDraw.Draw(B);d.text((pad,30),f'H24 chips8 · Meet the models as character cards · {W}px',fill=GD,font=F(34))
  for i,(im,(t,_)) in enumerate(zip(ims,cols)):x=pad+i*(cw+pad);d.text((x,top-34),t,fill=CR,font=F(13 if W<600 else 18));B.paste(im,(x,top))
  y=top+H+pad;d.text((pad,y),'Close-ups (2x): a No. 1 · a No. 4 · b No. 1 · the fifth chip (all painted, nothing moves)',fill=CR,font=F(20));y+=50
  for im in ones+[tr]:B.paste(im,(pad,y));y+=im.height+pad
  B=B.crop((0,0,bw,y));B.save(OUT,optimize=True);print(OUT,B.size)
else:
  D,OUT=sys.argv[2],sys.argv[3]
  rows=[('Today (live, chips7): small die, Last 5, W-L, Season P&L','one-390-now-0.png'),('chips8 a: founder fills the window; LAST 7 DAYS biggest; LAST ROUND logo + ✓/✗; SEASON; etched line','one-390-a-0.png'),
        ('chips8 b: the same, the window frame rising over the top pins','one-390-b-0.png'),('chips8 a, No. 3: ✓ green beside Exxon\'s mark (two X\'s) in the display\'s warm light','one-390-a-2.png')]
  ims=[Image.open(f'{D}/'+f).convert('RGB') for _,f in rows];pad=40
  bw=max(i.width for i in ims)+2*pad;bh=110+sum(i.height+70 for i in ims)
  B=Image.new('RGB',(bw,bh),BG);d=ImageDraw.Draw(B);d.text((pad,30),'H24 chips8 · close-up at 3x (390px = 1170 real px)',fill=GD,font=F(32));y=110
  for (t,_),im in zip(rows,ims):d.text((pad,y-34),t,fill=CR,font=F(19));B.paste(im,(pad,y));y+=im.height+70
  B.save(OUT,optimize=True);print(OUT,B.size)
