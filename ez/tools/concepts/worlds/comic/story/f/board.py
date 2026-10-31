# /usr/bin/python3 board.py <shots dir> <390|320|1280> <out>: Today first, then each take, labelled; phone widths side by side, desktop in a 2 x 2 grid at half size
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
T=[('now','Today · the Leaderboard tab as it is'),('f1','F1 · Previously… (four recap panels)'),('f2','F2 · The golden ticket (it changes hands)'),('f3','F3 · The timeline (last close, now, next bell)')]
if W=='390':T+=[('f1-visit','F1 · back after 3 days (stored visit)'),('f3-visit','F3 · back after 3 days (stored visit)')]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22 if W!='1280' else 34)
ims=[(t,Image.open(f'{D}/{W}-{k}.png').convert('RGB')) for k,t in T]
if W!='1280':ims=[(t,i.resize((i.width*2//3,i.height*2//3),Image.LANCZOS)) for t,i in ims]
if W!='1280':
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(i,(x,90));x+=i.width+40
else:
  ims=[(t,i.resize((i.width//2,i.height//2))) for t,i in ims];cw=max(i.width for _,i in ims)
  rows=[ims[:2],ims[2:]];hs=[max(i.height for _,i in r)+90 for r in rows]
  B=Image.new('RGB',(2*cw+120,sum(hs)+40),'#1b1820');d=ImageDraw.Draw(B);y=20
  for r,h in zip(rows,hs):
    for c,(t,i) in enumerate(r):
      x=40+c*(cw+40);d.text((x,y+10),t,fill='#fdbc2a',font=F);B.paste(i,(x,y+70))
    y+=h
B.save(OUT,optimize=True);print(OUT,B.size)
