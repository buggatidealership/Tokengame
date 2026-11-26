#!/usr/bin/env python3
# rounds3 boards: python3 board.py <shots dir>  -> ez/x2p-x3p-h7-rounds3-390.png and -1280.png
import sys,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];EZ=os.path.dirname(os.path.abspath(__file__))+'/../../../../../../..'
PL=[('shop','1  Back issues','a comic shop wall: bagged and boarded'),('tunnel','2  The fight card','the boxers\' tunnel: wheat-pasted posters'),
    ('hall','3  Hall of Fame (pick)','a sports hall of fame: gilt frames, the newest hung in the painting'),('kiosk','4  Late edition','the Wall Street newsstand at the bell: pegged on a wire'),
    ('vault','5  The vault','the grading vault: every cover slabbed')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
BG=(12,12,16);TX=(248,240,217);MU=(181,173,156)
def lab(d,x,y,t,s):d.text((x,y),t,font=F(22),fill=TX);d.text((x,y+30),s,font=G(15),fill=MU)
# 390 board: full chapter (top 1500 css px) + the fly state
cw,ch,fh=390,1560,844;pad=24
B=Image.new('RGB',(pad+len(PL)*(cw+pad),110+ch+30+fh+pad),BG);d=ImageDraw.Draw(B)
d.text((pad,24),'Every round so far: five places where the round covers live  ·  390 x 844  ·  roughs (painted backdrops, coded covers, live data)',font=F(24),fill=TX)
for i,(k,t,s) in enumerate(PL):
  x=pad+i*(cw+pad);im=Image.open(f'{S}/{k}-390.png').convert('RGB');im=im.resize((cw,int(im.height*cw/im.width)),Image.LANCZOS).crop((0,0,cw,ch))
  lab(d,x,62,t,s[:46]);B.paste(im,(x,110))
  fl=Image.open(f'{S}/{k}-390-fly.png').convert('RGB').resize((cw,fh),Image.LANCZOS);B.paste(fl,(x,110+ch+30));d.text((x,110+ch+6),'tap: the cover flies out',font=G(15),fill=MU)
B.save(f'{EZ}/x2p-x3p-h7-rounds3-390.png',optimize=True)
# 1280 board: first screen + first row of covers (top 1250 css px), and the pick's fly state
w=640;h=640;B=Image.new('RGB',(pad+2*(w+pad),80+3*(h+70)),BG);d=ImageDraw.Draw(B)
d.text((pad,22),'Every round so far: five places  ·  1280 wide (shown at half size)',font=F(24),fill=TX)
items=[(k,t,s,f'{S}/{k}-1280.png') for k,t,s in PL]+[('hall','3  Hall of Fame, tapped','the cover flies out at you, the hall blurs behind',f'{S}/hall-1280-fly.png')]
for j,(k,t,s,fn) in enumerate(items):
  x=pad+(j%2)*(w+pad);y=80+(j//2)*(h+70);im=Image.open(fn).convert('RGB');im=im.resize((w,int(im.height*w/im.width)),Image.LANCZOS).crop((0,0,w,h))
  lab(d,x,y,t,s);B.paste(im,(x,y+60))
B.save(f'{EZ}/x2p-x3p-h7-rounds3-1280.png',optimize=True)
print('ok')
