# /usr/bin/python3 board.py : the boards ez/x2p-h24-board5-*.png from out/
import os
from PIL import Image,ImageDraw,ImageFont
O='out/';E='../../../../../../../'
try:FT=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);FS=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
except:FT=FS=ImageFont.load_default()
L={'now':('Today (live X2+)','the gold lid: Grok alone'),
 'a':('A · The rack','four sockets, the leader\'s gold; rank + name lit · $0.47'),
 'b':('B · Back to the chip','beat 1\'s four dies, ranked; leader gold · $0'),
 'c':('C · The trophy socket (pick)','leader big, its P&L lit; 2-4 below · $1.20'),
 'd':('D · The bus','the ledger feeds four sockets; rounds scroll · $0.47'),
 'e':('E · The golden ticket','hero shot, #1 lifted on light · $0.15'),
 '1':('Gap 1 · The bus','four trace bundles carry data down'),'2':('Gap 2 · The seam','gold fingers plug into the next board'),'3':('Gap 3 · The breakaway rail','mouse bites: the board\'s own perforation')}
def lab(im,k,w):
  h=78;c=Image.new('RGB',(w,im.height*w//im.width+h),(14,12,18));d=ImageDraw.Draw(c);t,s=L[k];d.text((12,8),t,fill=(255,210,31),font=FT);d.text((12,44),s,fill=(248,240,217),font=FS)
  c.paste(im.resize((w,im.height*w//im.width)),(0,h));return c
def row(ims,gap=16):
  H=max(i.height for i in ims);W=sum(i.width for i in ims)+gap*(len(ims)-1);c=Image.new('RGB',(W,H),(30,28,34));x=0
  for i in ims:c.paste(i,(x,0));x+=i.width+gap
  return c
def col(ims,gap=16):
  W=max(i.width for i in ims);H=sum(i.height for i in ims)+gap*(len(ims)-1);c=Image.new('RGB',(W,H),(30,28,34));y=0
  for i in ims:c.paste(i,(0,y));y+=i.height+gap
  return c
T=['now','a','b','c','d','e']
row([lab(Image.open(O+f'fr-390-{k}.png'),k,780) for k in T]).save(E+'x2p-h24-board5-390.png',optimize=True)
col([lab(Image.open(O+f'fr-1280-{k}.png'),k,1600) for k in T]).save(E+'x2p-h24-board5-1280.png',optimize=True)
row([lab(Image.open(O+f'close-{k}.png'),k,570) for k in T]).save(E+'x2p-h24-board5-close.png',optimize=True)
G=['now','1','2','3'];L['now']=('Today (live X2+)','torn paper; gold trace between frames')
row([lab(Image.open(O+f'gap-390-{k}.png'),k,780) for k in G]).save(E+'x2p-h24-board5-gaps-390.png',optimize=True)
col([lab(Image.open(O+f'gap-1280-{k}.png').crop((0,0,2560,min(2800,Image.open(O+f'gap-1280-{k}.png').height))),k,1280) for k in G]).save(E+'x2p-h24-board5-gaps-1280.png',optimize=True)
print('ok')
