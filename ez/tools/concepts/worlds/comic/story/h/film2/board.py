# /usr/bin/python3 board.py : boards from out/ into ez/x2p-h24-film-*.png
import json
from PIL import Image,ImageDraw,ImageFont
O='out/';E='/home/user/Tokengame/ez/'
M=json.load(open(O+'measure.json'))
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
except:F=f2=ImageFont.load_default()
L={'now':('Today (live X2+)','4:3 glass, 1024 px painting (878 of 1170 px needed), bands, 1:20 in the head'),
 'A':('A · Roll the tape · after the frames','die display: the die is the screen; LED + gold key below · $0.43'),
 'B':('B · Start here · right after the hero','the fifth die: four AIs lit above the film · $0.41 (edit of A)'),
 'C':('C · Now showing · right after the hero (pick)','drive-in over a city of chips, god rays · $0.41 (edit)'),
 'D':('D · Model picking · after the frames','old-school trading CRT as a board · $0.43')}
def lab(im,k,W,key):
  t,s=L[k];m=M.get(key,{});
  if m and k!='now':s+=f"  ·  LED cap {m.get('ledCap')}px · film {m['filmCss'][0]:.0f}px wide, whole"
  pad=86;c=Image.new('RGB',(im.width,im.height+pad),'#0b0a10');c.paste(im,(0,pad));d=ImageDraw.Draw(c)
  d.text((14,10),t,fill='#ffd21f',font=F);d.text((14,48),s,fill='#e8dcc0',font=f2);return c
def col(ims,gap=24,bg='#1b1a20'):
  W=sum(i.width for i in ims)+gap*(len(ims)+1);H=max(i.height for i in ims)+2*gap;c=Image.new('RGB',(W,H),bg);x=gap
  for i in ims:c.paste(i,(x,gap));x+=i.width+gap
  return c
def row(ims,gap=24,bg='#1b1a20'):
  W=max(i.width for i in ims)+2*gap;H=sum(i.height for i in ims)+gap*(len(ims)+1);c=Image.new('RGB',(W,H),bg);y=gap
  for i in ims:c.paste(i,(gap,y));y+=i.height+gap
  return c
# 390 phone board
ims=[]
for k in ['now','A','B','C','D']:
  ims.append(lab(Image.open(O+f'beat-390-{k}.png').convert('RGB'),k,780,'390-'+k))
col(ims).save(E+'x2p-h24-film-390.png',optimize=True)
# 1280
ims=[]
for k in ['now','A','B','C','D']:
  im=Image.open(O+f'beat-1280-{k}.png').convert('RGB');im=im.resize((im.width//2,im.height//2),Image.LANCZOS);ims.append(lab(im,k,1280,'1280-'+k))
a=row(ims[:3]);b=row(ims[3:]);col([a,b]).save(E+'x2p-h24-film-1280.png',optimize=True)
# flow (the whole top) at 390: today, B, C
ims=[]
for k in ['now','B','C']:
  im=Image.open(O+f'top-390-{k}.png').convert('RGB');im=im.resize((im.width*2//3,im.height*2//3),Image.LANCZOS);ims.append(lab(im,k,520,'390-'+k))
col(ims).save(E+'x2p-h24-film-flow-390.png',optimize=True)
print('ok')
