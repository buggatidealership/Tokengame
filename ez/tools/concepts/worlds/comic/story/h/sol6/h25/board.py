# /usr/bin/python3 board.py : boards ez/x2p-h25-sol6-{390,390-pnl,1280,closeup}.png from shots/
from PIL import Image,ImageDraw,ImageFont
import os
E='../../../../../../../../'
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
except:F=f=ImageFont.load_default()
L={'now':('Today (live): T1 the scope','$0'),'a':('A · The tote board: W-L trade by trade vs the coin\'s band','$0.52'),
 'b':('B · The coin and its piles: where 100 coins land','$0.96'),'c':('C · The coin tray: one coin per trade, count them','$0.52'),
 'd':('D · The scope, re-worded (control)','$0')}
def row(ids,W,out,suf='',maxh=None):
  ims=[]
  for i in ids:
    p='shots/%s-%d.png'%(i+suf,W)
    if not os.path.exists(p):continue
    im=Image.open(p).convert('RGB')
    if maxh and im.height>maxh:im=im.crop((0,0,im.width,maxh))
    k=i.split('-')[0];t,c=L[k];h=110;cv=Image.new('RGB',(im.width,im.height+h),(12,12,14));cv.paste(im,(0,h))
    d=ImageDraw.Draw(cv);d.text((16,14),t,font=F,fill=(255,210,80));d.text((16,58),'paintings: '+c+('  ·  '+suf.strip('-').replace('-',' ') if suf else ''),font=f,fill=(220,210,190))
    ims.append(cv)
  H=max(i.height for i in ims);B=Image.new('RGB',(sum(i.width for i in ims)+24*(len(ims)+1),H+48),(5,5,7));x=24
  for i in ims:B.paste(i,(x,24));x+=i.width+24
  B.save(E+out,optimize=True);print(out,B.size)
row(['now','a','b','c','d'],390,'x2p-h25-sol6-390.png',maxh=1500)
row(['now','a','b','c','d'],390,'x2p-h25-sol6-390-pnl.png',suf='-pnl',maxh=1500)
row(['now','a','b','c','d'],1280,'x2p-h25-sol6-1280.png',maxh=2000)
# close-up: 3x shots of each take's instrument at 390 (top 1300 px of the 3x capture)
ims=[Image.open('shots/m/%s-390.png'%i).convert('RGB') for i in ['c'] if os.path.exists('shots/m/%s-390.png'%i)]
if ims:
  im=ims[0];im=im.crop((0,int(im.height*.18),im.width,int(im.height*.62)));im.save(E+'x2p-h25-sol6-closeup.png',optimize=True);print('closeup',im.size)
