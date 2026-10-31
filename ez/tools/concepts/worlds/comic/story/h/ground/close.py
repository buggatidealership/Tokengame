# /usr/bin/python3 close.py <shots> <width> <board> : appends a close-up row (section headline areas and the Upcoming top, at full resolution) to a board
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,W,BD=sys.argv[1],int(sys.argv[2]),sys.argv[3];T=json.load(open('takes.json'));F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
import subprocess
pos=json.load(open(f'{D}/pos-{W}.json'))
cols=[]
for t in T:
  k=t['k'];a=Image.open(f'{D}/ov-{W}-{k}.png').convert('RGB');u=Image.open(f'{D}/up-{W}-{k}.png').convert('RGB');s=a.width/W;p=pos[k]
  ch=a.crop((0,int((p['ch']-60)*s),a.width,int((p['ch']+260)*s)));se=a.crop((0,int((p['se']-60)*s),a.width,int((p['se']+220)*s)));up=u.crop((0,int(p['up']*s),u.width,int((p['up']+300)*s)))
  if W>600:ch,se,up=[x.crop((0,0,min(x.width,900),x.height)) for x in (ch,se,up)]
  c=Image.new('RGB',(ch.width,ch.height+se.height+up.height+120),'#1b1820');d=ImageDraw.Draw(c);d.text((0,0),t['title'].split('(')[0],fill='#fdbc2a',font=F)
  c.paste(ch,(0,40));c.paste(se,(0,ch.height+60));c.paste(up,(0,ch.height+se.height+80));cols.append(c)
R=Image.new('RGB',(sum(c.width+30 for c in cols),max(c.height for c in cols)+60),'#1b1820');x=0
for c in cols:R.paste(c,(x,40));x+=c.width+30
d=ImageDraw.Draw(R);d.text((0,0),'Close-ups at full resolution: the gutter above Meet the models and its headline, Every round so far, the Upcoming top',fill='#e9dfc6',font=F)
B=Image.open(BD).convert('RGB');sc=B.width/R.width;R=R.resize((B.width,int(R.height*sc)))
O=Image.new('RGB',(B.width,B.height+R.height+40),'#1b1820');O.paste(B,(0,0));O.paste(R,(0,B.height+40));O.thumbnail((9000,12000));O.save(BD,optimize=True);print(BD,O.size)
