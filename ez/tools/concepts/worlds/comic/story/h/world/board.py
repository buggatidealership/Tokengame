#!/usr/bin/env python3
# Board for Round H16 `world`: three columns at 390px, one per world, chapters top to bottom.
# /usr/bin/python3 board.py <out.png>
import sys,os
from PIL import Image,ImageDraw,ImageFont
D=os.path.dirname(os.path.abspath(__file__));M=os.path.abspath(D+'/../../../../../../../media')
BG=ImageFont.truetype(D+'/fonts/Bangers.ttf',44);BS=ImageFont.truetype(D+'/fonts/Bangers.ttf',30)
TX=ImageFont.truetype(D+'/fonts/BarlowCondensed-600.ttf',17);SM=ImageFont.truetype(D+'/fonts/BarlowCondensed-600.ttf',15)
CREAM=(248,240,217);GOLD=(255,210,31);INK=(13,11,16);RED=(196,42,32);GRN=(31,122,69);W=390;GAP=18
def head(t,f=BG):
  tw=int(ImageDraw.Draw(Image.new('L',(1,1))).textlength(t,font=f))+40;h=f.size+30
  im=Image.new('RGBA',(tw,h),(0,0,0,0));d=ImageDraw.Draw(im)
  for i,c in ((7,INK),(6,INK),(5,INK),(4,RED),(3,RED),(2,RED),(1,(231,147,11))):d.text((10+i,8+i),t,font=f,fill=c,stroke_width=3,stroke_fill=INK)
  d.text((10,8),t,font=f,fill=GOLD,stroke_width=3,stroke_fill=INK)
  im=im.rotate(2.2,expand=True,resample=Image.BICUBIC)
  if im.width>W-8:im=im.resize((W-8,int(im.height*(W-8)/im.width)),Image.LANCZOS)
  return im
def wrap(t,f,w):
  d=ImageDraw.Draw(Image.new('L',(1,1)));out=[];l=''
  for wd in t.split():
    if d.textlength((l+' '+wd).strip(),font=f)>w:out.append(l);l=wd
    else:l=(l+' '+wd).strip()
  return out+[l]
def cap(t,w=W-60):
  ls=wrap(t,TX,w-20);h=len(ls)*21+16;im=Image.new('RGB',(w,h),INK);d=ImageDraw.Draw(im)
  d.rectangle((1,1,w-2,h-2),outline=CREAM,width=2)
  for i,l in enumerate(ls):d.text((10,8+i*21),l,font=TX,fill=CREAM)
  return im
def note(t,col=(190,180,160)):
  ls=wrap(t,SM,W-36);im=Image.new('RGB',(W,len(ls)*19+18),(4,7,14));d=ImageDraw.Draw(im)
  d.line((16,6,16,im.height-6),fill=GOLD,width=3)
  for i,l in enumerate(ls):d.text((26,8+i*19),l,font=SM,fill=col)
  return im
def pic(fn,w=W,crop=None):
  im=Image.open(fn).convert('RGB')
  if crop:im=im.crop(crop)
  return im.resize((w,int(im.height*w/im.width)),Image.LANCZOS)
def ink(im):  # hand-cut ink frame
  o=Image.new('RGB',(im.width+10,im.height+10),INK);o.paste(im,(5,5));return o
I=lambda n:D+'/img/'+n+'.jpg'
VAULT=M+'/bet-vault-h2.jpg';CHIP=M+'/bet-chip-h2.jpg'
WORLDS=[
 ('A · The exchange at night','One old exchange building, top floor to basement. You arrive at the steps, walk onto the floor, go down to the records room, down the stairs to the vault, and ride the lift back up for tonight.',[
  ('Four AIs call earnings.','The market keeps score, every night at the close.',[I('a1')],'The bell over the door rings; the doors swing in. Camera walks onto the floor.'),
  ('The trading floor','Four posts, one board. Ranked by P&L.',[I('a2')],'Each graded slip drops down a brass tube to the floor below.'),
  ('The records room','Every graded round, filed for good.',[I('a3')],'Behind the last cabinet, stairs lead down. Gold light at the bottom.',I('a4h')),
  ('Bet #1: NVIDIA','Down in the vault, the pool waits.',[VAULT,CHIP],'The lift rises from the vault to the street. The clock over the door counts to the next close.'),
  ('Tonight at the close','Back up. The bell rings again.',[I('a5')],None)]),
 ('B · The board','The whole site is one circuit board seen from above. A pulse of gold light runs along one trace, part to part, and the last part on the board is the NVIDIA chip itself.',[
  ('Four AIs call earnings.','One clock on the board. It ticks at every close.',[I('b1')],'The clock pulses; the light runs out to four sockets.'),
  ('Four sockets','Each AI is a chip on the board. Its meter is its P&L.',[I('b2')],'Every result is written down the trace into memory.'),
  ('The memory','Every round written to memory. Nothing erased.',[I('b3')],'One trace leaves the memory and runs to the big chip.',I('b4h')),
  ('Bet #1: NVIDIA','The last chip on the board. The pool sits under it.',[VAULT,CHIP],'Past the chip, the power connector at the board\'s edge.'),
  ('Next tick','Power stays on. The next close is already coming.',[I('b5')],None)]),
 ('C · The tape (pick)','One strip of ticker tape runs down the whole page through the black void. Every chapter is one hero object it passes through, lit like the chip. The tape is the record: it starts at the ticker, ends in the vault, and is still printing.',[
  ('Four AIs call earnings.','The calls print on the tape before the report.',[I('c1')],'The tape spills out of the jar and falls down the page.'),
  ('The board','The tape feeds the board. Four slots, ranked by P&L.',[I('c2')],'Out of the board, the tape runs on to the cutter.'),
  ('Every round, filed','Cut at the close. Graded. Filed for good.',[I('c3')],'The uncut tape snakes down into the vault door\'s slot.',I('c4h')),
  ('Bet #1: NVIDIA','The tape ends in the vault. So does the pool.',[VAULT,CHIP],'Back at the ticker, the tape keeps coming.'),
  ('Tonight at the close','The tape is still running.',[I('c5')],None)]),
]
cols=[]
for title,bible,chs in WORLDS:
  parts=[]
  t=head(title,BS);parts.append(('i',t,12))
  parts.append(('i',note(bible,CREAM),10))
  for n,(h,c,pics,hand,*hp) in enumerate(chs,1):
    lab=Image.new('RGB',(W,24),(4,7,14));ImageDraw.Draw(lab).text((10,4),f'CHAPTER {n}'+(' · live paintings, unchanged' if n==4 else ''),font=SM,fill=GOLD);parts.append(('i',lab,4))
    for p in pics:parts.append(('i',ink(pic(p,W-10)),4))
    parts.append(('ov',head(h),-58));parts.append(('ovc',cap(c),6))
    if hand:
      parts.append(('i',note('Hand-over: '+hand),4))
      if hp:parts.append(('i',ink(pic(hp[0],W-90)),6))
    parts.append(('sp',None,GAP))
  H=sum((p[1].height if p[1] else 0)+p[2] for p in parts if p[0]!='ov')+400
  col=Image.new('RGB',(W,H),(4,7,14));y=8
  for k,im,g in parts:
    if k=='i':col.paste(im,((W-im.width)//2,y),im if im.mode=='RGBA' else None);y+=im.height+g
    elif k=='ov':col.paste(im,(0,y-im.height+30),im)   # heading breaks the panel's lower edge
    elif k=='ovc':col.paste(im,(14,y+4));y+=im.height+10+g
    else:y+=g
  cols.append(col.crop((0,0,W,y+10)))
H=max(c.height for c in cols);out=Image.new('RGB',(W*3+40,H+70),(0,0,0));d=ImageDraw.Draw(out)
d.text((14,14),'H16 world · three stages for the whole Overview, top to bottom, ending in the bet\'s vault and chip · 390px · 15 Hedra roughs, $0.74',font=TX,fill=CREAM)
for i,c in enumerate(cols):out.paste(c,(10+i*(W+10),56))
out.save(sys.argv[1],optimize=True);print(out.size)
