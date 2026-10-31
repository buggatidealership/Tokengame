# /usr/bin/python3 board.py <shots dir> <out base (…/x2p-x3p-pop-upcoming)>: round U boards.
#  <base>.png          the tab as it stands today (Sat 31 Oct: no calls in yet), today / U1 / U2 / U3 at 390, the top of the tab
#  <base>-2.png        the same with calls in (the 30 Oct close rewound to its morning), today / U1 / U2 / U3 at 390
#  <base>-desktop.png  today / U1 / U2 / U3 at 1280, the top of the tab
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
B_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);M_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',15);R_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
T=[('now','Today','the tab as it is live'),('u1','U1 · level 4 · Fight-night posters','one pop module a night; the main event its brand\'s card'),
   ('u2','U2 · level 4 · Pop stubs still to print','the record\'s pop stub, the calls where the move goes'),('u3','U3 · level 4, main event 5 · The fight bill','one printed bill; names in brand colours, headliner first')]
def phone(suffix,out,title,sub,H=1700):
  P=24;cw=390;W=4*cw+5*P;top=96
  B=Image.new('RGB',(W,top+H+P),'#1b1820');d=ImageDraw.Draw(B)
  d.text((P,16),title,fill='#fdbc2a',font=B_);d.text((P,48),sub,fill='#e8dcc0',font=R_)
  for i,(t,lab,s) in enumerate(T):
    x=P+i*(cw+P);d.text((x,70),lab,fill='#fdbc2a' if t!='now' else '#b9b19b',font=M_)
    im=Image.open(f'{D}/up-390-{t}{suffix}.png').convert('RGB');c=im.crop((0,0,im.width,min(im.height,2*H))).resize((cw,min(im.height,2*H)//2),Image.LANCZOS);B.paste(c,(x,top))
  B.save(out,optimize=True);print(out,B.size)
phone('',OUT+'.png','Round U · the Upcoming tab at level 4 of the pop cover','Today, Sat 31 Oct: no calls in yet (34 rounds to call). 390 wide, the top of the tab. Every date, call, colour and logo from the page (UPCOMING, PENDING, CO_LOGOS, MODELS, __x2pPnl).')
phone('-sim',OUT+'-2.png','Round U · with the calls in','Simulated: the clock set to Fri 30 Oct, 10:30 am New York, and that day\'s 10 rounds (R71 to R80, graded that evening) rewound to calls in. Their real calls; no results shown.')
# desktop
P=24;cw=640;H=760;W=2*cw+3*P;top=70
B=Image.new('RGB',(W,top+2*(H+40)+P),'#1b1820');d=ImageDraw.Draw(B)
d.text((P,16),'Round U · the Upcoming tab at 1280 (top of the tab, shown at half size)',fill='#fdbc2a',font=B_)
for i,(t,lab,s) in enumerate(T):
  x=P+(i%2)*(cw+P);y=top+(i//2)*(H+40);d.text((x,y),lab+'  ·  '+s,fill='#fdbc2a' if t!='now' else '#b9b19b',font=M_)
  im=Image.open(f'{D}/up-1280-{t}.png').convert('RGB');c=im.crop((0,0,im.width,min(im.height,int(H*2*2560/1280)//1))).resize((cw,H),Image.LANCZOS) if False else im.crop((0,0,im.width,min(im.height,H*4))).resize((cw,min(im.height,H*4)//4),Image.LANCZOS);B.paste(c,(x,y+24))
B.save(OUT+'-desktop.png',optimize=True);print(OUT+'-desktop.png',B.size)
