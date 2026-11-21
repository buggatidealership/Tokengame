# /usr/bin/python3 -I extras.py <board-2.png> <launch dir (launch.js)> <out.png>
# Appends to board -2: (a) the after-launch state: the sticky bar where it shows (a gutter in its band, scrolling up) and the end
# (bar gone, the CA whole with Copy, Buy $EZ); (b) the bet section in both caption wordings.
import sys,os
from PIL import Image,ImageDraw,ImageFont
b2,dL,out=sys.argv[1:4]
F='/usr/share/fonts/truetype/dejavu/';fT=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',26);fS=ImageFont.truetype(F+'DejaVuSans.ttf',14)
B=Image.open(b2).convert('RGB');W,VH,g=390,844,26
A=[('L-a.png','bar on (scrolling up): only where its band\nholds no number, here over a gutter'),('L-b.png','bar on above the bet: Follow (primary),\nBuy $EZ, copy the CA'),('L-c.png','the end: bar gone; the CA whole (a SAMPLE),\nCopy, Buy $EZ on pump.fun')]
bm=Image.open(os.path.join(dL,'bet-main.png')).convert('RGB');br=Image.open(os.path.join(dL,'bet-rule.png')).convert('RGB')
bm=bm.resize((W,int(bm.height*W/bm.width)));br=br.resize((W,int(br.height*W/br.width)))
eh=60+VH+60;E=Image.new('RGB',(B.width,eh),(4,7,14));d=ImageDraw.Draw(E)
d.text((g,14),'After launch (variant 2): Follow · Buy $EZ · CA copy',fill=(255,210,31),font=fT)
x=g
for f,l in A:
  im=Image.open(os.path.join(dL,f)).convert('RGB').resize((W,VH),Image.LANCZOS);E.paste(im,(x,60));d.rectangle((x-1,59,x+W,60+VH),outline=(60,60,70));d.multiline_text((x,60+VH+8),l,fill=(220,214,198),font=fS,spacing=3);x+=W+g
x+=30;d.text((x,14),'The bet caption, both wordings',fill=(255,210,31),font=fT)
for im,l in [(bm,'MAIN (in the cut): the owner\'s words\n"based on the #1 AI\'s prediction"'),(br,'ALT: rule 9\n"based on the trade of #1 on the board"')]:
  E.paste(im,(x,60));d.rectangle((x-1,59,x+W,60+im.height),outline=(60,60,70));d.multiline_text((x,60+im.height+8),l,fill=(220,214,198),font=fS,spacing=3);x+=W+g
O=Image.new('RGB',(B.width,B.height+E.height),(4,7,14));O.paste(B,(0,0));O.paste(E,(0,B.height))
O.save(out,optimize=True);print(out,O.size,os.path.getsize(out))
