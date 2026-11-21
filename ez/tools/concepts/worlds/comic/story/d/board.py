# /usr/bin/python3 board.py <shots dir> <width> <out>: Today, then D1 to D3 (the whole "One round, start to finish" section)
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1:4]
T=[('now','Today'),('d1',"D · D1 · The round's ticket: four coupons, locked, torn, stamped, paid"),('d2','D · D2 · Fight night: bulls vs bears, the bell, the decision, the payout'),('d3','D · D3 · Where they landed: one ruler through the round')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,30)
ims=[(t,Image.open(f'{D}/lr-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+130),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    words=t.split(' ');lines=[''];f=ImageFont.truetype(FN,24)
    for w in words:
      if d.textlength(lines[-1]+' '+w,font=f)>i.width:lines.append(w)
      else:lines[-1]=(lines[-1]+' '+w).strip()
    for k,l in enumerate(lines[:3]):d.text((x,18+k*30),l,fill='#fdbc2a',font=f)
    B.paste(i,(x,120));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.save(OUT,optimize=True);print(OUT,B.size)
