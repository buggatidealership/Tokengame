# /usr/bin/python3 board.py <shots dir> <width> <out> : today's live standings, then S, N1, N2 (B, one beat) and A (whole sections);
# a row with the fifth chip's three wordings; on the phone board a 2x close-up row (Claude's label in silkscreen and laser, the three
# founder treatments side by side).
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): 01 Current standings',''),
 ('S','S · B, the founder in a SQUARE quartz window (where the round porthole was). Every word, number, cell and flag printed into the chip: silkscreen ink through an ink filter, the epoxy\'s own grain and light multiplied back over it; bigger, three lines','$0.34 (8 EPROMs)'),
 ('N1','N1 · B, no frame: the loop glazed into the bare ceramic (luminosity blend: the founder in the ceramic\'s own colour), edges dissolving into the enamel; no frame, no glass','$0.34 (8 EPROMs)'),
 ('N2','N2 · B, no frame: the loop seen in the exposed silicon die (screen blend: it glows out of the polish), the die\'s sheen and rim lines over it','$0.34 (8 EPROMs)'),
 ('A','A, revised · one chip per model, one beat each, with the same printed-in name, version, flag and label (H18 paintings reused)','$0 (reused)')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,22 if W<600 else 24);G=ImageFont.truetype(FR,20 if W<600 else 22);pad=40;bg='#1b1820'
def wrap(d,t,F,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
def last(k):
  fs=sorted(f for f in os.listdir(D) if f.startswith(f'bt-{W}-{k}-') and f[len(f'bt-{W}-{k}-'):-4].isdigit());return Image.open(f'{D}/{fs[-1]}').convert('RGB')
ims=[(t,c,Image.open(f'{D}/ch-{W}-{k}.png').convert('RGB')) for k,t,c in T if os.path.exists(f'{D}/ch-{W}-{k}.png')]
if W>=600:ims=[(t,c,i.resize((i.width//2,i.height//2))) for t,c,i in ims]
WD=[('S','"In inference"'),('S-silk-run','"Running inference…"'),('S-silk-pend','"Inference pending"')]
tr=[(t,last(k)) for k,t in WD];tr=[(t,i if W<600 else i.resize((i.width//2,i.height//2))) for t,i in tr]
if W<600:
  lh=330;B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+40),bg);d=ImageDraw.Draw(B);x=pad
  for t,c,i in ims:
    for n,l in enumerate(wrap(d,t,F,i.width)[:9]):d.text((x,14+n*30),l,fill='#fdbc2a',font=F)
    if c:d.text((x,14+9*30+4),'Hedra '+c,fill='#e9dfc6',font=G)
    B.paste(i,(x,lh));x+=i.width+pad
  # close-ups at 2x: Claude's EPROM (No. 2) cut from the one beat, silk and laser; the three founders on Kimi's chip
  def chip(k,n):
    b=Image.open(f'{D}/bt-{W}-{k}-0.png').convert('RGB');h=b.height-68;y0=68+int(h*n/4);return b.crop((0,y0,b.width,y0+int(h/4)))
  cs=[('S · silkscreen (No. 2 at 2x)',chip('S',1)),('S · laser-etched (No. 2 at 2x)',chip('S-laser',1))]
  fz=[('S · square window',chip('S',3)),('N1 · in the ceramic',chip('N1',3)),('N2 · in the silicon',chip('N2',3))]
  rows=[('The fifth chip, three wordings (caption "No. 5? · not signed yet" on all)',tr),('Close-ups at 2x: printed into the chip',cs),('Close-ups at 2x: the founder, three ways (No. 4)',fz)]
  for title,r in rows:
    H=max(x.height for _,x in r);cw=sum(x.width for _,x in r)+pad*(len(r)+1)
    N=Image.new('RGB',(max(B.width,cw),B.height+H+130),bg);N.paste(B,(0,0));d=ImageDraw.Draw(N);d.text((pad,B.height+14),title,fill='#fdbc2a',font=F);x=pad
    for t,c in r:d.text((x,B.height+52),t,fill='#e9dfc6',font=G);N.paste(c,(x,B.height+86));x+=c.width+pad
    B=N
else:
  hh=[i.height+140 for *_,i in ims];th=max(i.height for _,i in tr)+150
  B=Image.new('RGB',(max([i.width for *_,i in ims]+[sum(i.width for _,i in tr)+pad*4])+2*pad,sum(hh)+th+pad),bg);d=ImageDraw.Draw(B);y=pad
  for (t,c,i),h in zip(ims,hh):
    for n,l in enumerate(wrap(d,t+('   · Hedra '+c if c else ''),F,i.width)[:4]):d.text((pad,y+n*30),l,fill='#fdbc2a',font=F)
    B.paste(i,(pad,y+130));y+=h
  k=min(1,(B.width-pad*4)/sum(c.width for _,c in tr));g=[(t,c.resize((int(c.width*k),int(c.height*k)))) for t,c in tr]
  d.text((pad,y),'The fifth chip, three wordings',fill='#fdbc2a',font=F);x=pad
  for t,c in g:d.text((x,y+40),t,fill='#e9dfc6',font=G);B.paste(c,(x,y+80));x+=c.width+pad
B.save(OUT,optimize=True);print(OUT,B.size)
