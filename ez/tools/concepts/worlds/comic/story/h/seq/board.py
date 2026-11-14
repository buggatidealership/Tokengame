# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out.png> : one row per chapter (today's live first, then the takes), labelled
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
ROWS=[('tonight','Tonight at the close (end of the Overview)',[('now','Today live'),('tW1','tW1 Fight night: marquee, sealed envelopes, bell, posters · $0.17'),('tW2','tW2 The station: departures board, ticket barriers, doors at the bell, platforms · $0.17'),('tW3','tW3 The floor: slate, four desks, bell, ticker tape · $0.13')]+([('tW1-oct30','tW1 at Fri Oct 30 11:00 ET (calls in, real calls)'),('tW3-oct30','tW3 at Fri Oct 30 11:00 ET')] if W==390 else [])),
 ('upcoming','The Upcoming tab top',[('now','Today live'),('uW1','uW1 Fight night: the marquee bills the week, a poster per night, envelopes, bell'),('uW2','uW2 The station: the board lists the week, platforms per day, barriers, doors'),('uW3','uW3 The floor: the slate chalks the week, desks, tape, bell')]+([('uW1-oct30','uW1 at Fri Oct 30 11:00 ET')] if W==390 else [])),
 ('leaderboard','The Leaderboard tab top',[('now','Today live'),('lA','lA Title fight: golden ticket over the ring, corners, the punch that decided it, the announcer · $0.18'),('lB','lB The race: tote board, cars at the line, photo finish · $0.12'),('lC','lC The ticket hall: the case, the honours board, the plates swapped · $0.13')])]
sc=0.5 if W==390 else 0.36
blocks=[]
for ch,title,items in ROWS:
  ims=[]
  for k,lab in items:
    p=f'{D}/{ch}-{W}-{k}.png'
    if not os.path.exists(p):continue
    im=Image.open(p).convert('RGB');im=im.resize((int(im.width*sc),int(im.height*sc)))
    if W==390 and im.height>1500:pass
    ims.append((im,lab))
  cw=max(i.width for i,_ in ims);lh=64;H=max(i.height for i,_ in ims)+lh+70
  row=Image.new('RGB',(len(ims)*(cw+24)+24,H),(24,22,28));d=ImageDraw.Draw(row);d.text((24,14),title,fill=(255,210,31),font=F(30))
  for j,(im,lab) in enumerate(ims):
    x=24+j*(cw+24);words=lab.split();ln='';y=60
    lines=[];
    for w in words:
      t=(ln+' '+w).strip()
      if d.textlength(t,font=F(15))>cw:lines.append(ln);ln=w
      else:ln=t
    lines.append(ln)
    for l in lines[:3]:d.text((x,y),l,fill=(240,236,226),font=F(15));y+=19
    row.paste(im,(x,60+lh))
  blocks.append(row)
BW=max(b.width for b in blocks);BH=sum(b.height for b in blocks)
B=Image.new('RGB',(BW,BH),(24,22,28));y=0
for b in blocks:B.paste(b,(0,y));y+=b.height
B.save(OUT,optimize=True);print(OUT,B.size)
