# /usr/bin/python3 board.py <shots dir> <out>: round P board: per module, today / P1 / P2 at 390 (DPR 2), then each take at 1280.
import sys
from PIL import Image,ImageDraw,ImageFont
D,OUT=sys.argv[1],sys.argv[2]
B_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',46);M_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30);R_=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',25)
MODS=[('chars','Meet the models',[('now','Today',''),('p1','P1 · level 4 · Pop ticket','today\'s ticket and flag, every element extruded and lit, orange rays'),('p2','P2 · level 5 · Four covers (all in)','each model its own comic cover: name masthead, P&L in the action burst')]),
      ('season','Every round so far',[('now','Today',''),('p1','P1 · level 4 · Pop stub','art whole on top; the move extruded on a green or red ray stub; winner coin'),('p2','P2 · level 3 · Issue covers','the move as the masthead band; art; company and winner along the foot')])]
P=48;W=3*772+4*P
im=lambda f:Image.open(f'{D}/{f}.png').convert('RGB')
blocks=[]
for sec,name,takes in MODS:
  ph=[im(f'{sec}-390-{t}') for t,_,_ in takes];dk=[im(f'{sec}-1280-{t}') for t,_,_ in takes[1:]]
  blocks.append((name,takes,ph,dk))
H=170
for name,takes,ph,dk in blocks:H+=110+max(p.height for p in ph)+P+sum(d.height*(W-2*P)//d.width+110 for d in dk)+P
B=Image.new('RGB',(W,H),'#1b1820');d=ImageDraw.Draw(B)
d.text((P,40),'Round P · whole modules in the pop cover\'s depth',fill='#fdbc2a',font=B_)
d.text((P,104),'390 wide at 2x (today, P1, P2), then each take at 1280. Every number from the page\'s globals (ROUNDS, __x2pPnl, MODELS).',fill='#e8dcc0',font=R_)
y=170
for name,takes,ph,dk in blocks:
  d.text((P,y+10),name,fill='#ffffff',font=B_);y+=80
  for i,(t,lab,sub) in enumerate(takes):
    x=P+i*(772+P);d.text((x,y),lab,fill='#fdbc2a' if t!='now' else '#b9b19b',font=M_)
  y+=40
  for i,p in enumerate(ph):B.paste(p,(P+i*(772+P),y))
  y+=max(p.height for p in ph)+P
  for (t,lab,sub),dd in zip(takes[1:],dk):
    d.text((P,y),lab+' at 1280',fill='#fdbc2a',font=M_);d.text((P,y+42),sub,fill='#e8dcc0',font=R_);y+=90
    w2=W-2*P;h2=dd.height*w2//dd.width;B.paste(dd.resize((w2,h2),Image.LANCZOS),(P,y));y+=h2+20
  y+=P
B.save(OUT,optimize=True);print(OUT,B.size)
