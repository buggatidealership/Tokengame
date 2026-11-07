#!/usr/bin/python3
# boards: python3 board.py <shotdir> <outdir>
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
S,O=sys.argv[1],sys.argv[2];D=os.path.dirname(os.path.abspath(__file__))
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',n)
FR=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',n)
cost={}
for l in open(D+'/jobs.jsonl'):
  r=json.loads(l);n=r['name'];p=n.split('-')
  if r.get('status')!='COMPLETED':continue
  if n.startswith('p-'):k=p[1]+'-'+p[2]
  elif n.startswith('x-chip'):k='cards-'+p[2]
  elif n.startswith('x-'):k=p[1]+'-'+p[2]
  else:continue
  cost[k]=cost.get(k,0)+(r.get('cost') or 0)
WORLDS=[('weigh','Fight night 1 · The weigh-in: P&L on the scale dial'),('tape','Fight night 2 · Tale of the tape: one riveted board, a column each'),
 ('walk','Fight night 3 · The walkout: numbers on the entrance banner'),('lineup','Other world 1 · The line-up: the mugshot letter board'),
 ('cards','Other world 2 · The card room: brass plaque + last five as chips')]
STY=[('noir','Noir brush & ink, one spot colour'),('silver','Silver Age line + flat print'),('mignola','Hard black shapes, flat colour')]
def lab(dr,x,y,t1,t2,w):
  dr.text((x,y),t1,font=F(17),fill='#ffd21f');dr.text((x,y+22),t2,font=FR(14),fill='#ddd')
def board(W,cw,ch,name,dpr):
  cols=1+len(WORLDS);g=14;lh=50
  img=Image.new('RGB',(cols*(cw+g)+g,90+len(STY)*(ch+lh+g)),'#151217');dr=ImageDraw.Draw(img)
  dr.text((g,16),f'cast3 · Meet the models, fight night and two other worlds, three drawn styles · {W}px',font=F(26),fill='#fff')
  dr.text((g,52),'Live data from __x2pPnl. Hedra gpt-image-2 1K medium; costs are the plates for that take (4 founders + its prop).',font=FR(16),fill='#bbb')
  for r,(s,sl) in enumerate(STY):
    y=90+r*(ch+lh+g)
    items=[('now',None)]+[(w,wl) for w,wl in WORLDS]
    for c,(w,wl) in enumerate(items):
      x=g+c*(cw+g);fn=f'{S}/{"now-now" if w=="now" else w+"-"+s}-{W}.png'
      if w=='now' and r>0:
        dr.text((x,y+10),sl,font=F(20),fill='#ffd21f');continue
      if not os.path.exists(fn):continue
      im=Image.open(fn);sc=cw/im.width;im=im.resize((cw,int(im.height*sc)),Image.LANCZOS).crop((0,0,cw,ch))
      img.paste(im,(x,y+lh))
      if w=='now':lab(dr,x,y,'Today (live)','the pop cards, founders\' loops',cw)
      else:lab(dr,x,y,wl.split(' · ')[0]+f' · {sl.split(" ")[0]} · ${cost.get(w+"-"+s,0):.2f}',wl.split(' · ')[1][:46],cw)
  if W==390:
    CR={'weigh':(188,256),'walk':(12,284),'lineup':(97,282),'cards':(10,330),'tape':(20,500)}
    y=img.height;img2=Image.new('RGB',(img.width,y+60+340+g),'#151217');img2.paste(img,(0,0));dr=ImageDraw.Draw(img2)
    dr.text((g,y+8),'Close-ups at 2x (noir), the first fighter\'s surface: every number is live page text set into a painted, blank object',font=F(20),fill='#fff')
    for c,(w,wl) in enumerate(WORLDS):
      im=Image.open(f'{S}/{w}-noir-390.png');x0,y0=CR[w];x=g+(c+1)*(cw+g)
      img2.paste(im.crop((x0*2,y0*2,x0*2+390,y0*2+340)),(x,y+50))
    img=img2
  img.save(name,optimize=True);print(name,img.size)
board(390,390,820,f'{O}/x2p-x3p-h9-cast3-390.png',2)
board(1280,640,420,f'{O}/x2p-x3p-h9-cast3-1280.png',1)
