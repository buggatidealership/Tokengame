# python3 board.py <shots dir> <ez dir> : the take boards for round H4 "ticket"
import sys
from PIL import Image,ImageDraw,ImageFont
S,EZ=sys.argv[1],sys.argv[2]
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
T={'a':'A  Under the lamp: the ticket on the desk in the lamp\'s pool; index tabs, a punch, the lamp flickers on a switch',
   'b':'B  At the teller\'s window: the ticket on the marble under the brass window; a rubber stamp prints each view',
   'c':'C  A comic page: the kiosk is the establishing panel, the ticket panel breaks out of it; views turn like pages'}
def row(ims,sc,gap=16):
  ims=[i.resize((int(i.width*sc),int(i.height*sc))) for i in ims];h=max(i.height for i in ims)
  c=Image.new('RGB',(sum(i.width for i in ims)+gap*(len(ims)-1),h),(11,13,22));x=0
  for i in ims:c.paste(i,(x,0));x+=i.width+gap
  return c
def board(rows,out,title):
  W=max(r.width for _,r in rows)+60;H=sum(r.height+70 for _,r in rows)+90
  c=Image.new('RGB',(W,H),(11,13,22));d=ImageDraw.Draw(c);d.text((30,26),title,fill=(255,211,61),font=F(28));y=90
  for lab,r in rows:d.text((30,y),lab,fill=(246,234,208),font=F(20));c.paste(r,(30,y+40));y+=r.height+70
  c.save(out,optimize=True);print(out,c.size)
cols='Overview: P&L only|Leaderboard: P&L|Accuracy|Target hits|Sector'
board([(T[t]+'   ('+cols+')',row([Image.open(f'{S}/ov-390-{t}.png')]+[Image.open(f'{S}/lb-390-{t}-{v}.png') for v in ['pnl','acc','tgt','sec']],.5)) for t in 'abc'],
      EZ+'/x2p-x3p-h4-ticket-390.png','Proof ticket, painted  ·  390px  ·  live data, page text, painted scenes and paper (Hedra)')
board([(T[t]+'   (Overview | Leaderboard)',row([Image.open(f'{S}/ov-1280-{t}.png'),Image.open(f'{S}/lb-1280-{t}-{"pnl" if t=="b" else "acc" if t=="a" else "tgt"}.png')],.5)) for t in 'abc'],
      EZ+'/x2p-x3p-h4-ticket-1280.png','Proof ticket, painted  ·  1280px')
