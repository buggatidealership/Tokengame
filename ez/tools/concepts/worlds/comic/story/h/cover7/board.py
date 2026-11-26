# /usr/bin/python3 board.py <shots> <out390> <out1280> : today's cover, then the four treatments (step 4 = A), each with its three step-4 options; close-ups
import sys
from PIL import Image,ImageDraw,ImageFont
S,O3,O12=sys.argv[1:4]
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
TK=[('now','Today, live','—'),('s','S · Silver Age flat print: nib line, flat brand colours, dots only in shadows','$0.65'),('p','P · Today\'s pop palette, pushed loud: thick outlines, primaries, Bangers captions','$0.46'),
    ('o','O · Mine: fairground sign-painter, gold leaf, red drop shade, painted panels','$0.46'),('l','L · The logo\'s flat badge (box helper\'s paintings reused + 3 new)','$0.20')]
OPT={'a':'A coming attractions, Bet #1 lit','b':'B vault cracked onto Bet #1','c':'C slip under the grille, stamped'}
def lab(d,x,y,t,w,sz=22,col=(255,255,255)):
  f=F(sz);words=t.split();line='';yy=y
  for wd in words:
    if d.textlength(line+' '+wd,font=f)>w and line:d.text((x,yy),line,font=f,fill=col);yy+=sz+6;line=wd
    else:line=(line+' '+wd).strip()
  d.text((x,yy),line,font=f,fill=col);return yy+sz+8
def quad(im):w,h=im.size;return im.crop((0,h//2,w//2,h))
# 390
CW=585;G=40
cov={k:Image.open(f'{S}/{k}-a-390.png' if k!='now' else f'{S}/now-390.png') for k,_,_ in TK}
sc=CW/cov['now'].width;cov={k:v.resize((CW,int(v.height*sc))) for k,v in cov.items()}
H=max(v.height for v in cov.values())
B=Image.new('RGB',(G+len(TK)*(CW+G),130+H+60+380+90+1000),(24,22,28));d=ImageDraw.Draw(B)
d.text((G,30),'cover7 · Round H12 · the four loop panels as painted objects, open, facts from the newest graded round (R80 Exxon Mobil) and the board leader · 390px',font=F(30),fill=(253,188,42))
for i,(k,t,c) in enumerate(TK):
  x=G+i*(CW+G);lab(d,x,80,t+'  '+c,CW,20);B.paste(cov[k],(x,140))
  if k=='now':continue
  y=140+H+20;cw=(CW-20)//3
  for j,o in enumerate('abc'):
    q=quad(Image.open(f'{S}/{k}-{o}-390-grid.png'));q=q.resize((cw,int(q.height*cw/q.width)));B.paste(q,(x+j*(cw+10),y+44));lab(d,x+j*(cw+10),y,OPT[o],cw,15)
y0=140+H+20+380
d.text((G,y0),'Close-up, my pick S with A (2x): every word on a painted surface',font=F(26),fill=(253,188,42))
g=Image.open(f'{S}/s-a-390-grid.png');B.paste(g,(G,y0+44))
x=G+g.width+G;d.text((x,y0+44),'Second option only: closed / opened pairs (S)',font=F(22),fill=(255,255,255))
for j,(a,b) in enumerate([('letter-s-closed','letter-s-r'),('ticket-s-closed','ticket-s-r')]):
  for k2,n in enumerate((a,b)):
    im=Image.open(f'img/{n}.jpg').resize((380,380));B.paste(im,(x+k2*400,y0+90+j*420))
  d.text((x+800,y0+250+j*420),['letter: sealed → open','ticket: face down → face up'][j],font=F(20),fill=(255,255,255))
B=B.crop((0,0,B.width,y0+44+g.height+40));B.save(O3,optimize=True)
# 1280
cv={k:Image.open(f'{S}/{k}-a-1280.png' if k!='now' else f'{S}/now-1280.png') for k,_,_ in TK}
W=1100;cv={k:v.resize((W,int(v.height*W/v.width))) for k,v in cv.items()}
rows=[['now','s'],['p','o'],['l',None]];Hh=[max(cv[k].height for k in r if k) for r in rows]
B=Image.new('RGB',(G+2*(W+G),100+sum(h+90 for h in Hh)),(24,22,28));d=ImageDraw.Draw(B)
d.text((G,30),'cover7 · Round H12 · 1280px: today, then S, P, O, L (step 4 = A)',font=F(30),fill=(253,188,42));y=100
for r,h in zip(rows,Hh):
  for i,k in enumerate(r):
    if not k:continue
    t=[x for x in TK if x[0]==k][0];lab(d,G+i*(W+G),y,t[1]+'  '+t[2],W,22);B.paste(cv[k],(G+i*(W+G),y+50))
  y+=h+90
B.save(O12,optimize=True)
