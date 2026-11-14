# /usr/bin/python3 board.py <shots dir> : composes the boards ez/x2p-h26-rounds8-*.png from run.js shots
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT='/home/user/Tokengame/ez/'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',19)
NAME={'now':('Today (live)','rounds6 take B: the season wafer, then the newest 8'),'A-L':('A · the die','hero: the latest round'),'A-T':('A · the die','hero: the top round (biggest W)'),
 'B-L':('B · the filing cabinet','hero: the latest round, pulled out'),'B-T':('B · the filing cabinet','hero: the top round, pulled out'),
 'C-L':('C · the binder (ledger)','hero: the latest round'),'C-T':('C · the binder (ledger)','hero: the top round (biggest W)')}
def board(ids,W,k,out,title,cols=None):
  ims=[Image.open(f'{S}/sec-{W}-{i}.png') for i in ids];ims=[im.resize((int(im.width*k),int(im.height*k)),Image.LANCZOS) for im in ims]
  cols=cols or len(ims);rows=(len(ims)+cols-1)//cols;cw=max(i.width for i in ims);g=30;hd=110
  rh=[max(ims[r*cols+c].height for c in range(cols) if r*cols+c<len(ims)) for r in range(rows)]
  B=Image.new('RGB',(cols*cw+(cols+1)*g,sum(rh)+rows*(hd+g)+g+70),'#141210');d=ImageDraw.Draw(B);d.text((g,22),title,font=F,fill='#ffd25a')
  y=70+g
  for r in range(rows):
    for c in range(cols):
      j=r*cols+c
      if j>=len(ims):continue
      x=g+c*(cw+g);n=NAME[ids[j]];d.text((x,y),n[0],font=F,fill='#f8f0d9');d.text((x,y+38),n[1],font=f2,fill='#c9bfa6');B.paste(ims[j],(x,y+hd-20))
    y+=rh[r]+hd+g
  B.save(OUT+out,optimize=True);print(out,B.size)
board(['now','A-L','B-L','C-L'],390,.75,'x2p-h26-rounds8-390-latest.png','rounds8 · 390px · hero = the latest round, then six, then Show 8 more')
board(['A-T','B-T','C-T'],390,.75,'x2p-h26-rounds8-390-top.png','rounds8 · 390px · hero = the top round: the season\'s biggest W (R72 Reddit, only Grok short, +$29,270)')
board(['A-L','B-L','C-L'],320,1,'x2p-h26-rounds8-320.png','rounds8 · 320px (the six drop their marks; the stamp keeps the winner)')
board(['A-L','B-L','C-L'],1280,.5,'x2p-h26-rounds8-1280-latest.png','rounds8 · 1280px · latest hero',cols=1)
board(['A-T','B-T','C-T'],1280,.5,'x2p-h26-rounds8-1280-top.png','rounds8 · 1280px · top hero',cols=1)
# closeup: the hero of each take at 2x (390)
cr=[];
for i,h in [('A-T',1240),('B-T',1340),('C-T',1500)]:
  im=Image.open(f'{S}/sec-390-{i}.png');cr.append(im.crop((0,170,im.width,min(im.height,170+h))))
g=30;B=Image.new('RGB',(sum(c.width for c in cr)+g*4,max(c.height for c in cr)+130),'#141210');d=ImageDraw.Draw(B);d.text((g,22),'rounds8 · the three heroes at 2x (390px, top round)',font=F,fill='#ffd25a');x=g
for (i,_),c in zip([('A-T',0),('B-T',0),('C-T',0)],cr):d.text((x,70),NAME[i][0],font=F,fill='#f8f0d9');B.paste(c,(x,110));x+=c.width+g
B.save(OUT+'x2p-h26-rounds8-closeup.png',optimize=True);print(B.size)
