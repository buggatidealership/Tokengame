# /usr/bin/python3 board.py <shots dir> <W> <out.png> : today's Meet the models (chips6) | chips7 | chips7 with every live box outlined, then close-ups
# /usr/bin/python3 board.py close <3x shots dir> <out.png> : one chip at 3x, today's against chips7, and the NVIDIA timer beside a chips7 display
import sys
from PIL import Image,ImageDraw,ImageFont
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
BG=(18,17,22);CR=(240,232,207);GD=(255,210,31)
if sys.argv[1]!='close':
  D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
  cols=[('Today (live): chips6, every word and figure laid on','ch-%d-now.png'),('chips7: painted in, the figures lit on the glass ($3.24 of Hedra)','ch-%d-C7.png'),('chips7, every live box outlined (equal on all four chips)','ch-%d-C7-grid.png')]
  ims=[Image.open(f'{D}/'+f%W).convert('RGB') for _,f in cols];k=.5 if W>600 else 1
  ims=[i.resize((int(i.width*k),int(i.height*k))) for i in ims];cw=max(i.width for i in ims);H=max(i.height for i in ims)
  ones=[Image.open(f'{D}/one-{W}-C7-{i}.png').convert('RGB') for i in (0,3)];tr=Image.open(f'{D}/try-{W}-C7.png').convert('RGB')
  pad=40;top=110;bw=max(pad+len(ims)*(cw+pad),pad+sum(o.width+pad for o in ones)+tr.width+pad)
  bh=top+H+pad+70+max(o.height for o in ones+[tr])+pad
  B=Image.new('RGB',(bw,bh),BG);d=ImageDraw.Draw(B);d.text((pad,30),f'H23 chips7 · Meet the models · {W}px',fill=GD,font=F(34))
  for i,(im,(t,_)) in enumerate(zip(ims,cols)):x=pad+i*(cw+pad);d.text((x,top-34),t,fill=CR,font=F(18 if W<600 else 20));B.paste(im,(x,top))
  y=top+H+pad;d.text((pad,y),'Close-ups (2x): No. 1 and No. 4 · the fifth chip, everything on it painted',fill=CR,font=F(20));y+=50;x=pad
  for im in ones+[tr]:B.paste(im,(x,y));x+=im.width+pad
  B.save(OUT,optimize=True);print(OUT,B.size)
else:
  D,OUT=sys.argv[2],sys.argv[3]
  now=Image.open(f'{D}/one-390-now-2.png').convert('RGB');c7=Image.open(f'{D}/one-390-C7-2.png').convert('RGB')
  nv=Image.open('../h23/ref-nvidia-timer.jpg').convert('RGB')
  # the chips7 P&L and W-L windows of the same chip, at 3x, beside the timer at the same height
  s=c7.width/3760;crop=c7.crop((int(1060*s),int(500*s),int(2620*s),int(1230*s)))
  h=480;nv=nv.resize((int(nv.width*h/nv.height),h));crop=crop.resize((int(crop.width*h/crop.height),h))
  pad=40;bw=max(now.width,c7.width,nv.width+crop.width+pad)+2*pad;bh=110+now.height+c7.height+h+3*70+2*pad
  B=Image.new('RGB',(bw,bh),BG);d=ImageDraw.Draw(B);d.text((pad,30),'H23 chips7 · close-up at 3x (one chip at 390px is 1170 real pixels)',fill=GD,font=F(34))
  y=110;d.text((pad,y-34),'Today (live, chips6): GPT\'s logo, flag and label laid on the painting',fill=CR,font=F(22));B.paste(now,(pad,y));y+=now.height+70
  d.text((pad,y-34),'chips7: mark engraved, flag etched, name and labels laser-marked (painted); No., Last 5, W-L, P&L lit on the glass (live)',fill=CR,font=F(22));B.paste(c7,(pad,y));y+=c7.height+70
  d.text((pad,y-34),'Test 3, side by side: the NVIDIA timer (live site) | chips7\'s W-L and P&L windows',fill=CR,font=F(22));B.paste(nv,(pad,y));B.paste(crop,(pad+nv.width+pad,y))
  B.save(OUT,optimize=True);print(OUT,B.size)
