# /usr/bin/python3 board.py <shots> <width> <out> : Today, then each take (Overview cover -> Every round so far, then the Upcoming top), labelled with cost; a close-up row at the end
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=json.load(open('takes.json'))
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def col(k):
  a=Image.open(f'{D}/ov-{W}-{k}.png').convert('RGB');u=Image.open(f'{D}/up-{W}-{k}.png').convert('RGB')
  c=Image.new('RGB',(a.width,a.height+u.height+30),'#1b1820');c.paste(a,(0,0));c.paste(u,(0,a.height+30));return c,a.height
def wrap(d,t,f,w):
  out=[];l=''
  for x in t.split():
    if d.textlength(l+' '+x,font=f)>w and l:out.append(l);l=x
    else:l=(l+' '+x).strip()
  return out+[l]
if W<600:
  cs=[(t,)+col(t['k']) for t in T];cw=cs[0][1].width;B=Image.new('RGB',(len(cs)*(cw+40)+40,max(c.height for _,c,_ in cs)+260),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,c,ah in cs:
    d.text((x,24),t['title'],fill='#fdbc2a',font=ImageFont.truetype(FN,38))
    for i,l in enumerate(wrap(d,t['line'],ImageFont.truetype(FR,24),cw)[:4]):d.text((x,74+i*30),l,fill='#e9dfc6',font=ImageFont.truetype(FR,24))
    B.paste(c,(x,200));d.text((x,200+ah+2),'Upcoming tab, top',fill='#fdbc2a',font=ImageFont.truetype(FN,22));x+=cw+40
else:
  cs=[(t,)+col(t['k']) for t in T];B=Image.new('RGB',(len(cs)*(1280+40)+40,max(c.height for _,c,_ in cs)+170),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,c,ah in cs:
    d.text((x,20),t['title'],fill='#fdbc2a',font=ImageFont.truetype(FN,34))
    for i,l in enumerate(wrap(d,t['line'],ImageFont.truetype(FR,22),1280)[:3]):d.text((x,64+i*28),l,fill='#e9dfc6',font=ImageFont.truetype(FR,22))
    B.paste(c,(x,160));d.text((x,160+ah+4),'Upcoming tab, top',fill='#fdbc2a',font=ImageFont.truetype(FN,20));x+=1320
B.thumbnail((9000,9000));B.save(OUT,optimize=True);print(OUT,B.size)
