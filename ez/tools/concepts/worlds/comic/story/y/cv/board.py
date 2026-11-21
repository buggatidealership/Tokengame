# /usr/bin/python3 board.py <shots dir> <out.png> <out-desktop.png>: round CV boards. Today, then C1..C4, first phone screen (390x844 at 2x) side by side; then the 1280x1000 first screens.
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT,OUTD=sys.argv[1],sys.argv[2],sys.argv[3]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans'
B_=ImageFont.truetype(F+'-Bold.ttf',40);M_=ImageFont.truetype(F+'-Bold.ttf',27);R_=ImageFont.truetype(F+'.ttf',21)
T=[('now','Today','the live cover: issue strip, Starring box, four flat quadrants'),
   ('c1','C1 · The prize wheel','pop art leads · chrome ring with a running light · holo ticket · clay hub'),
   ('c2','C2 · The page of panels','comic page leads · manga speed lines and sound effects · riso grain · holo panel'),
   ('c3','C3 · The golden-age cover','golden-age cover leads, film as cover art · deco gilt frame · riso tagline · 35mm strip'),
   ('c4','C4 · The board game','toy blocks lead (isometric board) · clay piece and pill · pop rays · holo block')]
def wrap(d,t,f,w):
  out=[];line=''
  for word in t.split(' '):
    tt=(line+' '+word).strip()
    if d.textlength(tt,font=f)>w and line:out.append(line);line=word
    else:line=tt
  return out+[line]
def board(sfx,cols,scale,out,title,sub):
  ims=[Image.open(f'{D}/{t}-{sfx}.png').convert('RGB') for t,_,_ in T]
  ims=[i.resize((int(i.width*scale),int(i.height*scale)),Image.LANCZOS) for i in ims]
  P=40;cw=ims[0].width;ch=ims[0].height;rows=(len(ims)+cols-1)//cols;lab=118
  W=cols*cw+(cols+1)*P;H=130+rows*(ch+lab+P)
  B=Image.new('RGB',(W,H),'#1b1820');d=ImageDraw.Draw(B)
  d.text((P,30),title,fill='#fdbc2a',font=B_);d.text((P,84),sub,fill='#e8dcc0',font=R_)
  for k,((t,l,s),im) in enumerate(zip(T,ims)):
    x=P+(k%cols)*(cw+P);y=130+(k//cols)*(ch+lab+P)
    d.text((x,y),l,fill='#fdbc2a' if t!='now' else '#b9b19b',font=M_)
    for j,ln in enumerate(wrap(d,s,R_,cw)[:3]):d.text((x,y+38+j*26),ln,fill='#e8dcc0',font=R_)
    B.paste(im,(x,y+lab))
  B.save(out);print(out,B.size)
board('390',5,.93,OUT,'Round CV · the cover, mixed and never flat · first phone screen (390x844)','Every number from the page: ROUNDS (round 80, Exxon Mobil), __x2pPnl (Grok +$255,864), MODELS. Header and tabs are the live page.')
board('1280',3,.35,OUTD,'Round CV · the cover at 1280 (first screen, 1280x1000)','Same takes laid out for the wide screen; the bottom crawl is the live page.')
