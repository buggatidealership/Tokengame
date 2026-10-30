# /usr/bin/python3 board.py <shots dir> <sol|lb> <width> <out>: today, then the three takes, labelled
import sys
from PIL import Image,ImageDraw,ImageFont
D,S,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
T={'sol':[('now','Today · Smart or lucky? (R10 chart)'),('c1','C1 · The luck band'),('c2','C2 · How far into the sample'),('c3','C3 · Punched in tens')],
   'lb':[('now','Today · The race so far (lower on the tab)'),('c4','C4 · Line race, above the scoreboard'),('c5','C5 · The track, above the scoreboard'),('c6','C6 · Lead changes, panel by panel')]}[S]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
ims=[(t,Image.open(f'{D}/{S}-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:
    d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.thumbnail((5000,5000));B.save(OUT,optimize=True);print(OUT,B.size)
