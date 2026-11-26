# /usr/bin/python3 board.py <scratch dir> <out.png>: the detail-pass board (reference, old A, new A; C2 before and after; zooms).
import sys
from PIL import Image,ImageDraw,ImageFont
S,OUT=sys.argv[1],sys.argv[2]
ref=Image.open('/root/.claude/uploads/49afce95-8870-516a-9c3b-e2b261d2a0d8/15cdce91-image.jpg').convert('RGB').crop((42,645,968,1969))
old=Image.open('/home/user/Tokengame/ez/x2p-x3p-pop-2.png').convert('RGB').crop((40,40,820,1160))
new=Image.open(S+'/a-final.png').convert('RGB'); new4=Image.open(S+'/a-final4.png').convert('RGB')
c0=Image.open(S+'/c2-390.png').convert('RGB'); c1=Image.open(S+'/c2d-390.png').convert('RGB')
BG=(27,24,32);W=1900
try: F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26); f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',19)
except: F=f2=ImageFont.load_default()
def fh(im,h): return im.resize((round(im.width*h/im.height),h),Image.LANCZOS)
def fw(im,w): return im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
H1=820
row1=[('Reference (stock comic page)',fh(ref,H1)),('Old A (pop2, take A)',fh(old,H1)),('New A: detail pass',fh(new,H1))]
# row 2: C2 before/after + zooms
H2=900
r2=[('C2 before (390x844)',fh(c0,H2)),('C2 after: detail pass',fh(c1,H2))]
zx=W-20-sum(i.width+20 for _,i in r2)-20
zr=fw(Image.open('/root/.claude/uploads/49afce95-8870-516a-9c3b-e2b261d2a0d8/15cdce91-image.jpg').convert('RGB').crop((40,640,1000,1100)),zx)
zn=fw(new4.crop((0,0,1560,820)),zx)
zc=fw(Image.concat if False else c1.crop((40,300,740,620)),zx//2-5); zc0=fw(c0.crop((40,300,740,620)),zx//2-5)
total=30+36+H1+30+36+H2+20
im=Image.new('RGB',(W,total),BG);d=ImageDraw.Draw(im)
y=30;x=20
for t,i in row1:
  d.text((x,y),t,fill=(255,200,40),font=F);im.paste(i,(x,y+36));x+=i.width+24
# zoom of letters right of row 1
zx1=W-x-20
if zx1>200:
  zz=fw(new4.crop((1000,1380,1560,2240)),zx1); d.text((x,y),'New A, 4x: CRASH / OOPS',fill=(255,200,40),font=f2);im.paste(zz.crop((0,0,zz.width,min(zz.height,H1))),(x,y+36))
y=30+36+H1+30;x=20
for t,i in r2:
  d.text((x,y),t,fill=(255,200,40),font=F);im.paste(i,(x,y+36));x+=i.width+20
d.text((x,y),'Zoom: reference vs new A, letter by letter',fill=(255,200,40),font=f2)
yy=y+36;im.paste(zr,(x,yy));yy+=zr.height+8;im.paste(zn,(x,yy));yy+=zn.height+12
if yy+zc.height+28<=total:
  d.text((x,yy),'C2 masthead: before | after',fill=(255,200,40),font=f2);yy+=28;im.paste(zc0,(x,yy));im.paste(zc,(x+zc0.width+10,yy))
im.save(OUT);print(im.size)
