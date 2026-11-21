#!/usr/bin/python3
# board.py <shots dir> 390|1280 <out.png>
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3];T=json.load(open(os.path.join(os.path.dirname(__file__),'takes.json')))
F=lambda s,b=False:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),s)
def wrap(d,txt,f,w):
  out=[];line=''
  for wd in txt.split():
    t=(line+' '+wd).strip()
    if d.textlength(t,font=f)>w and line:out.append(line);line=wd
    else:line=t
  return out+[line]
def label(k,w):
  im=Image.new('RGB',(w,150),'#1c1416');d=ImageDraw.Draw(im);t,desc,cost=T[k]
  d.text((10,8),t,font=F(20,1),fill='#ffd23f');y=36
  for l in wrap(d,desc,F(13),w-20)[:5]:d.text((10,y),l,font=F(13),fill='#f4eedf');y+=17
  d.text((10,128),'Hedra: '+cost,font=F(12,1),fill='#9fe0b0');return im
ks=list(T.keys())
def load(n,w):
  p=os.path.join(D,n)
  if not os.path.exists(p):return None
  i=Image.open(p).convert('RGB');return i.resize((w,int(i.height*w/i.width)))
if W==390:
  cw=390;cols=[]
  for k in ks:
    parts=[label(k,cw)]
    for n,cap in [('lb-%s-390.png','Season (default)'),('d1-%s-390.png','After tapping 24 hours'),('z-%s.png','Close-up (3x)')]:
      i=load(n%k,cw)
      if i is None:continue
      if cap.startswith('After'):i=i.crop((0,0,cw,min(i.height,900)))
      if cap.startswith('Close'):i=i.crop((0,0,cw,min(i.height,560)))
      c=Image.new('RGB',(cw,24),'#efe6cf');ImageDraw.Draw(c).text((8,4),cap,font=F(13,1),fill='#1c1416');parts+= [c,i]
    cols.append(parts)
  H=max(sum(p.height for p in c) for c in cols);B=Image.new('RGB',(len(cols)*(cw+14)+14,H+60),'#f4ecd6')
  ImageDraw.Draw(B).text((14,14),'Round H3b · lb2 · the Leaderboard tab at 390px: today, then six takes (live data, Oct 31)',font=F(22,1),fill='#1c1416')
  for j,c in enumerate(cols):
    y=50
    for p in c:B.paste(p,(14+j*(cw+14),y));y+=p.height
else:
  cw=900;blocks=[]
  for k in ks:
    i=load('lb-%s-1280.png'%k,cw)
    if i is None:continue
    l=label(k,cw).crop((0,0,cw,150));blocks.append((l,i))
  per=2;rows=[blocks[i:i+per] for i in range(0,len(blocks),per)]
  H=sum(max(l.height+i.height for l,i in r)+20 for r in rows)+60;B=Image.new('RGB',(per*(cw+20)+20,H),'#f4ecd6')
  ImageDraw.Draw(B).text((20,14),'Round H3b · lb2 · the Leaderboard tab at 1280px: today, then six takes',font=F(24,1),fill='#1c1416');y=56
  for r in rows:
    for j,(l,i) in enumerate(r):B.paste(l,(20+j*(cw+20),y));B.paste(i,(20+j*(cw+20),y+l.height))
    y+=max(l.height+i.height for l,i in r)+20
B.save(OUT,optimize=True);print(OUT,B.size)
