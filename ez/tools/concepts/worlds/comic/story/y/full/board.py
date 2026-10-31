# boards for round FULL: the phone page in images at most 1900 px tall (today beside the book on the first), and the desktop page
import sys
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];OUT=sys.argv[2]
try:
  F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',24);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
except: F=f=ImageFont.load_default()
BG='#1c1820';GOLD='#fdbc2a';LH=54;SEG=1900-LH-16
new=Image.open(S+'/full-390.png');now=Image.open(S+'/now-390.png')
def head(d,x,t,s=''):
  d.text((x,10),t,fill=GOLD,font=F);d.text((x,34),s,fill='#d8d0c0',font=f) if s else None
# image 1: today | the book, the same height
k=0;W=new.size[0];segs=[new.crop((0,y,W,min(new.size[1],y+SEG))) for y in range(0,new.size[1],SEG)]
o=Image.new('RGB',(W*2+48,LH+SEG+16),BG);d=ImageDraw.Draw(o)
head(d,16,'Today (live X3+)','390 x 844, the first 950 px');head(d,W+32,'The book (take A, inked)','390 x 844, the first 950 px')
o.paste(now.crop((0,0,W,SEG)),(16,LH));o.paste(segs[0],(W+32,LH));o.save(f'{OUT}-1.png');n=1
# the rest of the book, two slices per image
rest=segs[1:]
for i in range(0,len(rest),2):
  pair=rest[i:i+2];o=Image.new('RGB',(W*2+48,LH+SEG+16),BG);d=ImageDraw.Draw(o)
  for j,sg in enumerate(pair):
    y0=(i+j+1)*SEG//2;head(d,16+j*(W+16),'The book, continued',f'from {y0} px down');o.paste(sg,(16+j*(W+16),LH))
  n+=1;o.save(f'{OUT}-{n}.png')
print('phone images',n)
