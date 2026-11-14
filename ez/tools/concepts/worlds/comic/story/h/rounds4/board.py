#!/usr/bin/env python3
# rounds4 boards: /usr/bin/python3 board.py <shots dir>  -> ez/x2p-x3p-h9-rounds4-390.png and -1280.png
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];D=os.path.dirname(os.path.abspath(__file__));EZ=D+'/../../../../../../..'
PL=[('shop','1  Back issues (kept)','comic shop wall, every cover bagged on a hook'),('tunnel','2  The fight card (kept)','boxers\' tunnel, wheat-pasted, torn edges'),
    ('kiosk','3  Late edition (kept)','Wall Street newsstand, pegged on a wire'),('press','4  Hot off the press (new, pick)','print shop, each round clipped up to dry'),
    ('locker','5  The locker room (new)','stadium lockers, taped inside the door'),('cinema','6  Now showing (new)','picture palace, a brass poster case each')]
STY=[('noir','A  brush-and-ink noir, gold spot (the vault)'),('silver','B  Silver Age line + flat print colour'),('shadow','C  hard-shadow shapes, flat colour')]
cost=sum((json.loads(l).get('cost') or 0) for l in open(D+'/jobs.jsonl'))
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s);G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
BG=(12,12,16);TX=(248,240,217);MU=(181,173,156);GD=(253,188,42)
def im(fn,w,h,y0=0):
  i=Image.open(fn).convert('RGB');i=i.resize((w,int(i.height*w/i.width)),Image.LANCZOS);return i.crop((0,y0,w,y0+h))
# ---- 390 ----
cw,pad=390,24;H1,H2,HF=1560,1080,844
cols=[('live','0  Today (live)','the rack and the T2/T3 tiles')]+PL
W=pad+len(cols)*(cw+pad);Ht=120+40+H1+3*(40)+2*H2+HF+40+620+pad
B=Image.new('RGB',(W,Ht),BG);d=ImageDraw.Draw(B)
d.text((pad,20),f'Every round so far, H9 rounds4: six places x three drawn styles  ·  390 x 844  ·  roughs: Hedra gpt-image-2 1K (pick at 2K), covers = each round\'s scene redrawn, every word live page text  ·  ${cost:.2f} spent',font=F(24),fill=TX)
d.text((pad,58),'Rows: style A full chapter · style B first screens · style C first screens · tap (cover flies out) · close-up. No founders on the covers; the cover line names the winner.',font=G(18),fill=MU)
for i,(k,t,s) in enumerate(cols):
  x=pad+i*(cw+pad);y=110;d.text((x,y),t,font=F(20),fill=GD if 'pick' in t else TX);d.text((x,y+26),s,font=G(14),fill=MU);y+=60
  if k=='live':B.paste(im(f'{S}/live-390.png',cw,H1),(x,y));continue
  for j,(st,sl) in enumerate(STY):
    hh=H1 if j==0 else H2
    if j:d.text((x,y+8),sl,font=G(14),fill=MU);y+=34
    else:d.text((x,y-22),'',font=G(14),fill=MU)
    B.paste(im(f'{S}/{k}-{st}-390.png',cw,hh),(x,y));y+=hh+(0 if j else 0)
  d.text((x,y+10),'tap: the cover flies out (style A)',font=G(14),fill=MU);y+=34;B.paste(im(f'{S}/{k}-noir-390-fly.png',cw,HF),(x,y))
# close-up row: the pick's first wall row in all three styles at 2x
y=Ht-620-pad+10;d.text((pad,y),'Close-up at 2x: the pick (Hot off the press), first row of covers, A / B / C',font=F(20),fill=TX);y+=36
x=pad
for st,_ in STY:
  i=Image.open(f'{S}/press-{st}-390.png').convert('RGB');top=int(i.width*4/3*0.92);c=i.crop((0,top,i.width,top+560));B.paste(c,(x,y));x+=c.width+pad
B.save(f'{EZ}/x2p-x3p-h9-rounds4-390.png',optimize=True)
# ---- 1280 ----
w,h=640,660;B=Image.new('RGB',(pad+3*(w+pad),110+7*(h+70)),BG);d=ImageDraw.Draw(B)
d.text((pad,22),f'Every round so far, H9 rounds4  ·  1280 wide (shown at half size)  ·  columns: A noir, B Silver Age, C hard shadow',font=F(24),fill=TX)
d.text((pad,58),'First row: today\'s live section and the pick tapped. Then each place in the three drawn styles.',font=G(18),fill=MU)
y=100;d.text((pad,y),'0  Today (live)',font=F(20),fill=TX);B.paste(im(f'{S}/live-1280.png',w,h),(pad,y+40))
d.text((pad+w+pad,y),'4  Hot off the press, tapped (A)',font=F(20),fill=GD);B.paste(im(f'{S}/press-noir-1280-fly.png',w,h),(pad+w+pad,y+40))
for r,(k,t,s) in enumerate(PL):
  y=100+(r+1)*(h+70)
  for c,(st,sl) in enumerate(STY):
    x=pad+c*(w+pad);d.text((x,y),f'{t}  ·  {sl[:1]}',font=F(18),fill=GD if 'pick' in t else TX);B.paste(im(f'{S}/{k}-{st}-1280.png',w,h),(x,y+40))
B.save(f'{EZ}/x2p-x3p-h9-rounds4-1280.png',optimize=True);print('ok',round(cost,2))
