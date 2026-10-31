# /usr/bin/python3 board.py <shots dir> <out390> <out1280> : today first, then the six worlds; red line = the first screen's fold
import sys
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];T=['now','marquee','arena','floor','show','track','studio']
L={'now':'Today (live)','marquee':'1 The Palace','arena':'2 Fight night','floor':'3 The floor at the bell','show':'4 The game show','track':'5 Race night','studio':'6 The studio'}
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22)
except:F=ImageFont.load_default()
def tile(path,W,Hc,fold):
  im=Image.open(path);s=W/(im.size[0]/2);im=im.crop((0,0,im.size[0],min(im.size[1],Hc*2))).resize((W,round(min(im.size[1],Hc*2)/2*s)))
  d=ImageDraw.Draw(im);y=round(fold*s);d.line([(0,y),(W,y)],fill=(255,40,40),width=3);return im
# 390
ims=[tile(f'{D}/cv-390-{t}.png',390,1100,844) for t in T];H=max(i.size[1] for i in ims)
B=Image.new('RGB',(len(T)*410+10,H+60),(20,20,24));d=ImageDraw.Draw(B)
for k,(t,im) in enumerate(zip(T,ims)):B.paste(im,(10+k*410,50));d.text((10+k*410,14),L[t],fill=(253,188,42),font=F)
B.save(sys.argv[2])
# 1280: two columns
ims=[tile(f'{D}/cv-1280-{t}.png',800,800,800) for t in T];h=max(i.size[1] for i in ims)
B=Image.new('RGB',(2*820+10,4*(h+50)+10),(20,20,24));d=ImageDraw.Draw(B)
for k,(t,im) in enumerate(zip(T,ims)):x=10+(k%2)*820;y=10+(k//2)*(h+50);B.paste(im,(x,y+40));d.text((x,y+8),L[t],fill=(253,188,42),font=F)
B.save(sys.argv[3],optimize=True)
