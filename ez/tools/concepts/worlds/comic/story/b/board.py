# /usr/bin/python3 board.py <shots dir> <section> <width> <out>: today, then the three takes, each labelled
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
D,S,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3],sys.argv[4]
N=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'names.json')))
K=['now','c1','c2','c3'] if S=='cliff' else ['now','n1','n2','n3']
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
ims=[(N[k],Image.open(f'{D}/{S}-{W}-{k}.png').convert('RGB')) for k in K]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:d.text((x,30),t,fill='#fdbc2a',font=F);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.save(OUT,optimize=True);print(OUT,B.size)
