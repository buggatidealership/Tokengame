# /usr/bin/python3 board.py <shots dir> <out390> <out1280> : one row per take (today, A, B, C), five moments per row
import sys
from PIL import Image,ImageDraw,ImageFont
D,O3,O12=sys.argv[1:4]
T=[('now','Today (live)'),('a','A · The Issue: the cover swings open on its spine'),('b','B · Through the panel: fly into the cover\'s gold frame'),('c','C · The long drop: one vertical comic, read downward')]
M=[('1cover','1 Cover'),('2opening','2 Opening'),('3spread','3 First page'),('4turn','4 Chapter turn'),('5inside','5 Inside: header + tabs')]
def font(s):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']:
    try:return ImageFont.truetype(f,s)
    except:pass
  return ImageFont.load_default()
def board(W,tw,out):
  import os
  sz=Image.open(f'{D}/a-{W}-1cover.png').size;th=round(sz[1]*tw/sz[0]);g=14;lh=34
  cv=Image.new('RGB',(g+len(M)*(tw+g),lh+len(T)*(th+lh+g)+g),(18,18,22));d=ImageDraw.Draw(cv)
  for i,(k,l) in enumerate(M):d.text((g+i*(tw+g),8),l,fill=(253,188,42),font=font(18))
  for r,(t,l) in enumerate(T):
    y=lh+r*(th+lh+g);d.text((g,y+6),l,fill=(248,240,217),font=font(20))
    for i,(k,_) in enumerate(M):
      f=f'{D}/{t}-{W}-{k}.png'
      if os.path.exists(f):cv.paste(Image.open(f).convert('RGB').resize((tw,th)),(g+i*(tw+g),y+lh))
  cv.save(out,quality=88) if out.endswith('.jpg') else cv.save(out,optimize=True)
board(390,300,O3);board(1280,560,O12)
