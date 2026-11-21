# /usr/bin/python3 board.py <shots> <390|1280|close> <out> : today's live cover first, then T1..T4, labelled, with cost
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
L=[('now','Today (live X3+): flat face circles, stock comic caption font, a row of flat panels',''),
 ('t1','T1 · Minted: the founders struck as silver coins (leader gold), brass plates, engraved Cinzel lettering, a brass bell whose sound is the move','Hedra $0.40 (4 coins + gold coin, bell, gold ticket)'),
 ('t2','T2 · Season tickets: each founder printed in a Season 1 ticket\'s window (leader on the gold one), cream card plates, wood-type headline','Hedra $0.06 (2 tickets) + shared'),
 ('t3','T3 · Sealed: each founder pressed into wax in the lab\'s colour (GPT green, Claude orange, Grok black, Kimi blue), brush lettering','Hedra $0.26 (4 seals) + shared'),
 ('t4','T4 · Cameos (simplest): the founders\' own painted portraits in hand-inked rings of the lab colour, leader gold, comic hand lettering','Hedra $0 own (shared grounds, bell, ticket)')]
if W=='close':
  import glob
  rows=[]
  for t,lab,c in L[1:]:
    fs=sorted(glob.glob(f'{D}/cu-{t}-*.png'))[:8];ims=[Image.open(f).convert('RGB') for f in fs]
    for i in ims:i.thumbnail((380,300))
    rows.append((lab,ims))
  Wd=sum(i.width+10 for i in rows[0][1])+20;Hh=sum(max(i.height for i in r[1])+50 for r in rows)+20
  o=Image.new('RGB',(max(Wd,2200),Hh),(24,20,30));d=ImageDraw.Draw(o);y=10
  for lab,ims in rows:
    d.text((12,y),lab[:150],font=F(18),fill=(255,214,90));x=12;y+=30
    for i in ims:o.paste(i,(x,y));x+=i.width+10
    y+=max(i.height for i in ims)+20
  o.save(OUT);sys.exit()
ims=[(Image.open(f'{D}/cv-{W}-{t}.png').convert('RGB'),lab,c) for t,lab,c in L]
sc=1 if W=='390' else .55
ims=[(i.resize((int(i.width*sc),int(i.height*sc))),l,c) for i,l,c in ims]
cw=max(i.width for i,_,_ in ims)+30
if W=='390':
  o=Image.new('RGB',(cw*len(ims)+20,max(i.height for i,_,_ in ims)+150),(24,20,30));d=ImageDraw.Draw(o)
  import textwrap
  for k,(i,l,c) in enumerate(ims):
    x=20+k*cw;yy=10
    for ln in textwrap.wrap(l,40):d.text((x,yy),ln,font=F(15),fill=(255,214,90));yy+=19
    d.text((x,112),c,font=F(12),fill=(200,200,210));o.paste(i,(x,140))
    d.line([(x,140+844-125),(x+i.width,140+844-125)],fill=(255,60,60),width=2)
else:
  o=Image.new('RGB',(2*cw+20,(max(i.height for i,_,_ in ims)+90)*3),(24,20,30));d=ImageDraw.Draw(o)
  for k,(i,l,c) in enumerate(ims):
    import textwrap;x=20+(k%2)*cw;y=10+(k//2)*(max(j.height for j,_,_ in ims)+90);yy=y
    for ln in textwrap.wrap(l,95):d.text((x,yy),ln,font=F(15),fill=(255,214,90));yy+=19
    d.text((x,y+42),c,font=F(12),fill=(200,200,210));o.paste(i,(x,y+62))
o.save(OUT);print(o.size)
