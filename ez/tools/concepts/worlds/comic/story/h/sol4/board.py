#!/usr/bin/python3
# board.py <shots dir>: writes ez/x2p-x3p-h11-sol4-390.png, -1280.png, -bet.png, -closeup.png (today first, then each take, labelled)
import sys,textwrap
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];E='/home/user/Tokengame/ez/'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
TK=[('now','Today live: the big board (chalk on the exchange slate)',''),
 ('ehih','PICK: E3 the coin behind the mask + I2 the lie detector in the exchange room, both painted at 2K','$1.02 (2K) on $0.19 of roughs'),
 ('e1i1','E1 the robot whose nose grows + I1 the lie detector on the desk, onlookers round it','$0.17'),
 ('e2i1','E2 the sure mouth over a blank page + I1 the desk','$0.17'),
 ('e3i2','E3 the coin behind the mask + I2 the exchange room (1K roughs)','$0.15'),
 ('e4i2','E4 the coin-op oracle + I2 the exchange room','$0.15')]
def op(n):
  try:return Image.open(f'{D}/{n}').convert('RGB')
  except Exception:return None
def b390():
  cols=[]
  for t,lab,c in TK:
    ims=[i for i in [op(f's4-{t}-hit-390.png')] if i]
    if t in('ehih','e1i1'):
      s=op(f's4-{t}-season-390.png')
      if s:ims.append(s)
    if ims:cols.append((lab+('  ·  '+c if c else ''),ims))
  cw=max(i.width for _,ims in cols for i in ims);ch=max(sum(i.height+10 for i in ims) for _,ims in cols)
  B=Image.new('RGB',(len(cols)*(cw+24)+24,ch+150),'#1b1b1f');d=ImageDraw.Draw(B)
  for k,(lab,ims) in enumerate(cols):
    x=24+k*(cw+24);d.multiline_text((x,14),'\n'.join(textwrap.wrap(lab,int(cw/(24*.62)))),font=F(24),fill='#ffd21f',spacing=4);y=140
    for j,i in enumerate(ims):
      if j:d.text((x,y-4),'the same chapter, switched to P&L · Season',font=F(20),fill='#9ff7c6');y+=26
      B.paste(i,(x,y));y+=i.height+10
  B.save(E+'x2p-x3p-h11-sol4-390.png',optimize=True);print('390',B.size)
def b1280():
  rows=[]
  for t,lab,c in TK:
    ims=[i for i in [op(f's4-{t}-hit-1280.png'),op(f's4-{t}-season-1280.png')] if i]
    if ims:rows.append((lab+('  ·  '+c if c else ''),[i.resize((i.width*45//100,i.height*45//100)) for i in ims]))
  rw=max(sum(i.width+20 for i in ims) for _,ims in rows);rh=[max(i.height for i in ims) for _,ims in rows]
  B=Image.new('RGB',(rw+40,sum(rh)+len(rows)*110+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
  for (lab,ims),h in zip(rows,rh):
    L=textwrap.wrap(lab+('   (left: hit rate · right: P&L Season)' if len(ims)>1 else ''),int(rw/(24*.62)));d.multiline_text((20,y),'\n'.join(L),font=F(24),fill='#ffd21f',spacing=4);y+=32*len(L)+14;x=20
    for i in ims:B.paste(i,(x,y));x+=i.width+20
    y+=h+30
  B.save(E+'x2p-x3p-h11-sol4-1280.png',optimize=True);print('1280',B.size)
def bet():
  lab={'now':'Today live: callouts as text under the plate','k1':'K1 silkscreen: printed on the board itself ($0.10)','k2':'K2 caption boxes drawn into the plate ($0.10)'}
  r1=[(t,op(f's4bet-{t}-390.png')) for t in('now','k1','k2')];r2=[(t,op(f's4bet-{t}-1280.png')) for t in('now','k1','k2')]
  r2=[(t,i.resize((i.width*55//100,i.height*55//100))) for t,i in r2 if i];r1=[(t,i) for t,i in r1 if i]
  W=max(sum(i.width+24 for _,i in r1),max(i.width for _,i in r2)+40)+24
  H=max(i.height for _,i in r1)+90+sum(i.height+60 for _,i in r2)+40
  B=Image.new('RGB',(W,H),'#1b1b1f');d=ImageDraw.Draw(B);x=24
  for t,i in r1:d.multiline_text((x,14),'\n'.join(textwrap.wrap(lab[t],34)),font=F(22),fill='#ffd21f');B.paste(i,(x,84));x+=i.width+24
  y=84+max(i.height for _,i in r1)+30
  for t,i in r2:d.text((24,y),lab[t]+'  ·  1280',font=F(22),fill='#ffd21f');B.paste(i,(24,y+34));y+=i.height+60
  B.save(E+'x2p-x3p-h11-sol4-bet.png',optimize=True);print('bet',B.size)
def close():
  def crop(f,box):
    im=op(f);W,H=im.size;return im.crop((int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H)))
  cs=[('Pick, beat 2: the board in the exchange room, chalk line ends one line each (390, 2x)',crop('s4-ehih-hit-390.png',(0,.36,1,.72))),
      ('Pick, beat 2 in P&L: the W-L / P&L table chalked under the chart',crop('s4-ehih-season-390.png',(0,.36,1,.72))),
      ('Beat 3: the same voice, a right call and a wrong one of the same size (a real pair from ROUNDS)',crop('s4-ehih-hit-390.png',(0,.70,1,1)))]
  w=max(c.width for _,c in cs);B=Image.new('RGB',(w+40,sum(c.height+150 for _,c in cs)+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
  for lab,c in cs:
    L=textwrap.wrap(lab,int(w/(26*.62)));d.multiline_text((20,y),'\n'.join(L),font=F(26),fill='#ffd21f',spacing=4);y+=34*len(L)+12;B.paste(c,(20,y));y+=c.height+30
  B.save(E+'x2p-x3p-h11-sol4-closeup.png',optimize=True);print('close',B.size)
b390();b1280();bet();close()
