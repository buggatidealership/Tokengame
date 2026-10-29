# /usr/bin/python3 board.py <dir> <ez dir> : compose the owner's boards from boards.js screens
import sys
from PIL import Image, ImageDraw, ImageFont
D,EZ=sys.argv[1],sys.argv[2]
def font(sz,b=True):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf' if b else '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
    try: return ImageFont.truetype(f,sz)
    except: pass
  return ImageFont.load_default()
BG=(16,14,24);GOLD=(253,188,42);INK=(248,240,217);MUT=(170,163,150)
def board(rows,title,sub,out,sc,cols):
  ims=[[(Image.open('%s/%s.png'%(D,k)).convert('RGB'),lab) for k,lab in r] for r in rows]
  w0,h0=ims[0][0][0].size;w,h=int(w0*sc),int(h0*sc);gap=26;pad=40;lab=52;tit=120
  W=pad*2+cols*w+(cols-1)*gap;Hh=tit+len(rows)*(lab+h)+(len(rows)-1)*gap+pad
  o=Image.new('RGB',(W,Hh),BG);d=ImageDraw.Draw(o)
  d.text((pad,30),title,font=font(34),fill=GOLD);d.text((pad,76),sub,font=font(19,False),fill=MUT)
  y=tit
  for r in ims:
    for i,(im,l) in enumerate(r):
      x=pad+i*(w+gap);d.text((x,y+14),l,font=font(19),fill=INK);o.paste(im.resize((w,h),Image.LANCZOS),(x,y+lab))
    y+=lab+h+gap
  o.save(out,optimize=True);print(out,o.size)
board([[('po-0','Overview 1 · Attract mode, the film'),('po-1','Overview 2 · Next fight (VS)'),('po-2','Overview 3 · Character select'),('po-3','Overview 4 · Replays'),('po-4','Overview 5 · Smart or lucky?')],
       [('pl-0','Leaderboard 1 · High scores'),('pl-1','Leaderboard 2 · Lead changes'),('pl-2','Leaderboard 3 · Fighter stats'),('pu-0','Upcoming 1 · The card, tonight'),('pu-1','Upcoming 2 · Coming up')]],
      'EZ Live X4+ · the arcade · phone 390x844',"Every number from ez-data.js and the page's P&L accounts (Thu 29 Oct, after the R64 sync). Header: health bars of the top two banks and the time to the next bell.",
      EZ+'/x2p-x4p-arcade-phone.png',.5,5)
board([[('do-0','Overview · first screen'),('do-1','Overview · character select')],[('do-2','Overview · replays (the wall)'),('do-3','Overview · smart or lucky, boss fight')],
       [('dl-0','Leaderboard · high scores, lead changes'),('dl-1','Leaderboard · fighter stats, sectors')],[('du-0','Upcoming · the card'),('do-3','')]][:4],
      'EZ Live X4+ · the arcade · desktop 1536x864','Overview, Leaderboard and Upcoming on a laptop screen. The bottom crawl is X2+\'s own.',EZ+'/x2p-x4p-arcade-desktop.png',.5,2)
