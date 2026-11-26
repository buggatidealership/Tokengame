# /usr/bin/python3 reflayout.py : the layout reference for the master (1280x720 units; the 4K painting is 3x). Rough shapes only.
from PIL import Image,ImageDraw
W,H=1280,720;S=3
im=Image.new('RGB',(W*S,H*S),'black');d=ImageDraw.Draw(im)
R=lambda x0,y0,x1,y1,**k:d.rectangle([x0*S,y0*S,x1*S,y1*S],**k)
RR=lambda x0,y0,x1,y1,r,**k:d.rounded_rectangle([x0*S,y0*S,x1*S,y1*S],r*S,**k)
GOLD=(214,168,62);CER=(205,203,196);EPX=(18,18,20);GL=(10,12,14)
# pins
for i in range(21):
  x=48+i*57.6
  R(x,118,x+24,152,fill=GOLD);R(x,548,x+24,582,fill=GOLD)
RR(32,150,1248,550,8,fill=CER,outline=(120,118,112),width=2*S)
# a few traces and SMDs on the ceramic, to say "busy substrate"
import random;random.seed(4)
for k in range(60):
  x=random.choice([random.uniform(40,250),random.uniform(250,920)]);y=random.choice([random.uniform(156,172),random.uniform(524,545),random.uniform(470,545)])
  if 70<x<240 and 180<y<465:continue
  R(x,y,x+9,y+5,fill=(150,120,80))
# gold plate
RR(70,182,236,348,6,fill=GOLD,outline=(120,80,20),width=2*S)
# flag field (blank, slightly darker ceramic)
R(88,372,218,459,fill=(170,168,160),outline=(100,98,92),width=S)
# label panel
RR(262,175,905,520,8,fill=EPX,outline=GOLD,width=2*S)
# row 1: name strip (blank) + NO. window
R(280,192,742,262,fill=(26,26,28))
RR(800,192,887,262,6,fill=GL,outline=GOLD,width=S*2)
# row 2: five LED windows + W-L window
for i in range(5):
  x=385+i*62;RR(x,288,x+52,340,5,fill=GL,outline=GOLD,width=S*2)
RR(752,278,887,348,6,fill=GL,outline=GOLD,width=S*2)
# row 3: P&L window
RR(455,364,887,502,8,fill=GL,outline=GOLD,width=S*2)
# die cavity + die
RR(925,167,1232,474,6,fill=(190,150,60),outline=(110,80,20),width=2*S)
R(940,182,1217,459,fill=(70,60,90))
im.resize((W,H),Image.LANCZOS).save('ref/layout.jpg',quality=92)
