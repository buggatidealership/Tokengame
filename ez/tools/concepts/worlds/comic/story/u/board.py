# /usr/bin/python3 board.py <shots dir> <width 1280|390> <out.png>: Today, then U1 to U3 side by side at 1x, full tab length;
# split into parts (<out>-1.png, -2.png...) when taller than 7800 px so no board is over 8000 px on its long side
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1:4];W=int(W)
T=[('now','Today (live X3+)'),('u1','U1 · Stamped in'),('u2','U2 · Corners'),('u3','U3 · The fight card')]
SUB={'now':'the live Upcoming tab','u1':'each call a worn stamp on the tile; the winner slot waits','u2':'the newsprint split into a bull corner and a bear corner','u3':'the stub is the fight ticket; calls shouted over faces'}
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[]
for k,t in T:
  i=Image.open(f'{D}/up-{W}-{k}.png').convert('RGB')
  if W>=600:i=i.resize((i.width//2,i.height//2),Image.LANCZOS)
  ims.append((k,t,i))
desk=W>=600;F=ImageFont.truetype(FN,30);F2=ImageFont.truetype(FR,19)
cw=max(i.width for _,_,i in ims);G=40;top=110;PART=7800-top-30
hmax=max(i.height for _,_,i in ims);parts=(hmax+PART-1)//PART
for pi in range(parts):
  y0=pi*PART;h=min(PART,hmax-y0)
  B=Image.new('RGB',(len(ims)*(cw+G)+G,h+top+30),'#1b1820');d=ImageDraw.Draw(B)
  for n,(k,t,i) in enumerate(ims):
    x=G+n*(cw+G);d.text((x,18),t,fill='#fdbc2a',font=F)
    d.text((x,18+(40 if desk else 24)),SUB[k],fill='#e8dfc8',font=F2)
    d.text((x,18+(66 if desk else 40)),f'tab {(i.height if desk else i.height//2):,} px tall at {W}'+(f' · part {pi+1} of {parts}' if parts>1 else ''),fill='#9d94a8',font=F2)
    if y0<i.height:B.paste(i.crop((0,y0,i.width,min(i.height,y0+h))),(x,top))
  o=OUT if parts==1 else OUT.replace('.png',f'-{pi+1}.png');B.save(o,optimize=True);print(o,B.size)
