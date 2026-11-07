# /usr/bin/python3 board.py <shots dir> <width 390|1280> <out.png>
# 390: row 1 Smart or lucky (today, T1..T4), row 2 the Leaderboard (bill, tape, proof on P&L), row 3 Target hits + the dock, row 4 close-ups at 3x.
# 1280: one block per take: Smart or lucky left, the Leaderboard right, Target hits and the dock under them.
import sys,os,json
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
T=json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'takes.json')))
FN='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
F=ImageFont.truetype(FN,26);F2=ImageFont.truetype(FR,19);F3=ImageFont.truetype(FN,34)
op=lambda n:Image.open(f'{D}/{n}.png').convert('RGB') if os.path.exists(f'{D}/{n}.png') else None
def wrap(d,t,f,w):
  out=[];cur=''
  for wd in t.split():
    if d.textlength(cur+' '+wd,font=f)>w and cur:out.append(cur);cur=wd
    else:cur=(cur+' '+wd).strip()
  return out+[cur]
def sc(im,w):return im.resize((w,int(im.height*w/im.width)),Image.LANCZOS) if im is not None else None
if W<600:
  cw=420;rows=[('Smart or lucky? (Overview)','sol'),('Leaderboard: fight bill, tale of the tape, the proof on P&L','lb'),('The proof on Target hits','tgt'),('The thumb dock (shown over the tape)','dock'),('Close-ups at 3x: the corners','z-bill'),('Close-ups at 3x: the tape','z-tape'),('Close-ups at 3x: a target','z-tgt'),('Close-ups at 3x: the hit-rate chart','z-sol')]
  cols=[[sc(op(f'{k}-{t["id"]}-{W}'),cw) for _,k in rows] for t in T]
  H=[max((c[i].height if c[i] is not None else 0) for c in cols) for i in range(len(rows))]
  B=Image.new('RGB',(40+(cw+30)*len(T),330+sum(h+70 for h in H)),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t in T:
    d.text((x,24),t['name'],fill='#fdbc2a',font=F);y=62
    for ln in wrap(d,t['desc'],F2,cw)[:9]:d.text((x,y),ln,fill='#e9dfc6',font=F2);y+=24
    x+=cw+30
  y=330
  for i,(lab,_) in enumerate(rows):
    d.text((40,y),lab,fill='#fdbc2a',font=F3);x=40
    for c in cols:
      if c[i] is not None:B.paste(c[i],(x,y+50))
      x+=cw+30
    y+=H[i]+70
else:
  bw=1280
  blocks=[]
  for t in T:
    s,l,g,k=[op(f'{n}-{t["id"]}-{W}') for n in ('sol','lb','tgt','dock')]
    s,l,g,k=[sc(i,bw//2) for i in (s,l,g,k)]
    left=s.height+(g.height+20 if g is not None else 0)+(k.height+20 if k is not None else 0)
    blocks.append((t,s,l,g,k,max(left,l.height)))
  B=Image.new('RGB',(bw+120,sum(b[5]+150 for b in blocks)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,s,l,g,k,h in blocks:
    d.text((40,y),t['name']+'  ·  '+t['cost'],fill='#fdbc2a',font=F3);d.text((40,y+46),t['desc'][:170],fill='#e9dfc6',font=F2)
    yy=y+100;B.paste(s,(40,yy));yy+=s.height+20
    if g is not None:B.paste(g,(40,yy));yy+=g.height+20
    if k is not None:B.paste(k,(40,yy))
    B.paste(l,(80+bw//2,y+100));y+=h+150
B.save(OUT,optimize=True);print(OUT,B.size)
