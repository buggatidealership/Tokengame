# /usr/bin/python3 board.py <shots dir (now from run.js 'now', c, d)> <width> <out>: today, then c and d, labelled; a close-up row of the eight frames on the phone board
import sys,os
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=[('now','Today (live X2+): headline, film bill, live strip',''),
 ('c','(c) Objects on the void: the scoreboard (live P&L, W-L), then CALL letter, BELL plate, #1 golden ticket, BET vault','Hedra $1.08'),
 ('d','(d) The machine: one contraption; its screen keeps score, each frame a close-up of one station','Hedra $1.11')]
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
ims=[(t,c,Image.open(f'{D}/top-{W}-{k}.png').convert('RGB')) for k,t,c in T]
sc=1 if W<600 else .5
ims=[(t,c,i.resize((int(i.width*sc),int(i.height*sc)))) for t,c,i in ims]
F=ImageFont.truetype(FN,22);G=ImageFont.truetype(FR,20);pad=40;lh=150
def wrap(d,t,mx):
  L=['']
  for w in t.split(' '):
    if d.textlength((L[-1]+' '+w).strip(),font=F)>mx:L.append(w)
    else:L[-1]=(L[-1]+' '+w).strip()
  return L
B=Image.new('RGB',(sum(i.width for *_,i in ims)+pad*(len(ims)+1),max(i.height for *_,i in ims)+lh+30),'#1b1820');d=ImageDraw.Draw(B);x=pad
for t,c,i in ims:
  for n,l in enumerate(wrap(d,t,i.width)[:4]):d.text((x,14+n*27),l,fill='#fdbc2a',font=F)
  if c:d.text((x,14+4*27+4),c,fill='#e9dfc6',font=G)
  B.paste(i,(x,lh));x+=i.width+pad
if W<600:
  fr=[]
  for k in 'cd':
    for j in range(4):
      f=f'{D}/fr-{W}-{k}-{j}.png'
      if os.path.exists(f):fr.append((f'{k} · frame {j+1}',Image.open(f).convert('RGB')))
  h=max(x_.height for _,x_ in fr);cw=sum(x_.width for _,x_ in fr)+pad*(len(fr)+1)
  N=Image.new('RGB',(max(B.width,cw),B.height+h+80),'#1b1820');N.paste(B,(0,0));d=ImageDraw.Draw(N);x=pad
  d.text((pad,B.height+8),'Close-up, every frame at 2x (390px): live text on the painted surfaces',fill='#fdbc2a',font=F)
  for t,x_ in fr:d.text((x,B.height+40),t,fill='#e9dfc6',font=G);N.paste(x_,(x,B.height+70));x+=x_.width+pad
  B=N
B.save(OUT,optimize=True);print(OUT,B.size)
