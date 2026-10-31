# /usr/bin/python3 board.py <shots dir> <390|1280> <out>: Today first, then each take's five beats, one column per beat.
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('v1','V · V1 · The tear-off pad: each tap tears the top ticket off'),('v2','V · V2 · One ring, redrawn: same cast, same panel, five moments'),('v3','V · V3 · The fold-out strip: five panels, one unfolded at a time')]
BEAT=['1 · Predict','2 · Report','3 · Bell','4 · Paid','5 · Record']
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';F=ImageFont.truetype(FN,40);FS=ImageFont.truetype(FN,30)
BG='#1b1820';GO='#fdbc2a';CR='#e9dfc6';G=40
rows=[(t,[Image.open(f'{D}/{k}-{W}-{i}.png').convert('RGB') for i in range(1,6)]) for k,t in T]
now=Image.open(f'{D}/now-{W}.png').convert('RGB')
if W<600:
  cw=max(i.width for _,r in rows for i in r);rh=[max(i.height for i in r) for _,r in rows]
  H=sum(h+150 for h in rh)+60
  nh=H-200;nw=int(now.width*nh/now.height);now=now.resize((nw,nh),Image.LANCZOS)
  B=Image.new('RGB',(G+nw+G*2+5*(cw+G),H),BG);d=ImageDraw.Draw(B)
  d.text((G,40),'Today (live): all five panels at once',fill=GO,font=FS);B.paste(now,(G,100))
  x0=G+nw+G*2;y=40
  for (t,r),h in zip(rows,rh):
    d.text((x0,y),t,fill=GO,font=F);x=x0
    for i,im in enumerate(r):d.text((x,y+56),BEAT[i],fill=CR,font=FS);B.paste(im,(x,y+100));x+=cw+G
    y+=h+150
else:
  s=.75;sw=int(1280*s);rows=[(t,[i.resize((sw,int(i.height*s)),Image.LANCZOS) for i in r]) for t,r in rows]
  now=now.resize((int(now.width*s),int(now.height*s)),Image.LANCZOS)
  Wd=G+5*(sw+G);H=now.height+160+sum(max(i.height for i in r)+170 for _,r in rows)
  B=Image.new('RGB',(Wd,H),BG);d=ImageDraw.Draw(B)
  d.text((G,40),'Today (live): all five panels at once',fill=GO,font=F);B.paste(now,(G,100));y=now.height+160
  for t,r in rows:
    d.text((G,y),t,fill=GO,font=F);x=G
    for i,im in enumerate(r):d.text((x,y+56),BEAT[i],fill=CR,font=FS);B.paste(im,(x,y+100));x+=sw+G
    y+=max(i.height for i in r)+170
B.save(OUT,optimize=True);print(OUT,B.size)
