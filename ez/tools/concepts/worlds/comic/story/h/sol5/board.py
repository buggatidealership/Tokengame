#!/usr/bin/python3
# board.py <shots dir> <cost json>: writes ez/x2p-x3p-h13-sol5-390.png and -1280.png (today first, then each take, labelled), and -closeup.png
import sys,textwrap,json
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];E='/home/user/Tokengame/ez/'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
TK=[('now','Today live: the big board (chalk on the exchange slate)',''),
 ('vh','PICK, V1 at 2K: the mask; the lie detector up close, its pens writing each line, 312 on its counter, plates engraved; same voice; the strip into the vault','2K $1.0 on $0.20 of roughs'),
 ('v1','V1 (1K rough): the same sequence','$0.20'),
 ('v2','V2 onlookers react: the crowd holds up the printout, the two old lines in their balloons','$0.18'),
 ('v3','V3 floor strip: the strip runs out of the machine across the room, pens at its end, crowd pointing','$0.17'),
 ('v4','V4 the mask speaks: "Trust me. I\'m sure." in its balloon, then V1','$0.09 + V1')]
def op(n):
  try:return Image.open(f'{D}/{n}').convert('RGB')
  except Exception:return None
def b390():
  cols=[]
  for t,lab,c in TK:
    ims=[i for i in [op(f's5-{t}-hit-390.png')] if i]
    if t in('vh','v2'):
      s=op(f's5-{t}-season-390.png')
      if s:ims.append(s)
    if ims:cols.append((lab+('  ·  '+c if c else ''),ims))
  cw=max(i.width for _,ims in cols for i in ims);ch=max(sum(i.height+40 for i in ims) for _,ims in cols)
  B=Image.new('RGB',(len(cols)*(cw+24)+24,ch+190),'#1b1b1f');d=ImageDraw.Draw(B)
  for k,(lab,ims) in enumerate(cols):
    x=24+k*(cw+24);d.multiline_text((x,14),'\n'.join(textwrap.wrap(lab,int(cw/(24*.62)))),font=F(24),fill='#ffd21f',spacing=4);y=180
    for j,i in enumerate(ims):
      if j:d.text((x,y-4),'the same chapter, switched to P&L · Season',font=F(20),fill='#9ff7c6');y+=26
      B.paste(i,(x,y));y+=i.height+10
  B.save(E+'x2p-x3p-h13-sol5-390.png',optimize=True);print('390',B.size)
def b1280():
  rows=[]
  for t,lab,c in TK:
    ims=[i for i in [op(f's5-{t}-hit-1280.png'),op(f's5-{t}-season-1280.png')] if i]
    if ims:rows.append((lab+('  ·  '+c if c else ''),[i.resize((i.width*45//100,i.height*45//100)) for i in ims]))
  rw=max(sum(i.width+20 for i in ims) for _,ims in rows);rh=[max(i.height for i in ims) for _,ims in rows]
  B=Image.new('RGB',(rw+40,sum(rh)+len(rows)*110+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
  for (lab,ims),h in zip(rows,rh):
    L=textwrap.wrap(lab+('   (left: hit rate · right: P&L Season)' if len(ims)>1 else ''),int(rw/(24*.62)));d.multiline_text((20,y),'\n'.join(L),font=F(24),fill='#ffd21f',spacing=4);y+=32*len(L)+14;x=20
    for i in ims:B.paste(i,(x,y));x+=i.width+20
    y+=h+30
  B.save(E+'x2p-x3p-h13-sol5-1280.png',optimize=True);print('1280',B.size)
def close():
  def crop(f,box):
    im=op(f);W,H=im.size;return im.crop((int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H)))
  cs=[('Pick, beat 2 in hit rate: the pens write each line, the coin flip lettered on the strip, 312 on the counter (390, 2x)',crop('s5-vh-hit-390.png',(0,.29,1,.6))),
      ('Pick, beat 2 in P&L: the table on the strip, two by two',crop('s5-vh-season-390.png',(0,.29,1,.6))),
      ('V2: the onlookers say the old plain lines',crop('s5-v2-hit-390.png',(0,.28,1,.58))),
      ('Beat 4: the record runs into the vault; the narration caption carries the hand-over',crop('s5-vh-hit-390.png',(0,.70,1,1)))]
  w=max(c.width for _,c in cs);B=Image.new('RGB',(w+40,sum(c.height+150 for _,c in cs)+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
  for lab,c in cs:
    L=textwrap.wrap(lab,int(w/(26*.62)));d.multiline_text((20,y),'\n'.join(L),font=F(26),fill='#ffd21f',spacing=4);y+=34*len(L)+12;B.paste(c,(20,y));y+=c.height+30
  B.save(E+'x2p-x3p-h13-sol5-closeup.png',optimize=True);print('close',B.size)
b390();b1280();close()
