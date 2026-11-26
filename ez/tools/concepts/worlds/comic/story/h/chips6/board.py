# /usr/bin/python3 board.py <shots dir> <W> <out.png> : today's standings | chips6 | chips6 with the measured grid, then close-ups
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
cols=[('Today (live standings)','ch-%d-now.png'),('chips6: N2 clean, swapped, one real-chip master','ch-%d-N6.png'),('chips6, every shared box outlined (equal to 0.00px)','ch-%d-N6-grid.png')]
ims=[Image.open(f'{D}/'+f%W).convert('RGB') for _,f in cols]
k=.5 if W>600 else 1
ims=[i.resize((int(i.width*k),int(i.height*k))) for i in ims]
cw=max(i.width for i in ims);H=max(i.height for i in ims)
one=Image.open(f'{D}/one-{W}-N6-1.png').convert('RGB')
if W>600:one=one.resize((one.width//1,one.height//1))
m=Image.open('img/m6-master.jpg').convert('RGB')
die=m.crop((870,40,1210,380)).resize((680,680),Image.LANCZOS)
lft=m.crop((20,30,280,420)).resize((520,780),Image.LANCZOS)
pad=40;top=110
bw=pad+len(ims)*(cw+pad);bw=max(bw,pad*3+one.width+die.width+lft.width)
bh=top+H+pad+70+max(one.height,die.height,lft.height)+pad
B=Image.new('RGB',(bw,bh),(18,17,22));d=ImageDraw.Draw(B)
d.text((pad,30),f'H22 chips6 · Meet the models · {W}px',fill=(255,210,31),font=F(34))
for i,(im,(t,_)) in enumerate(zip(ims,cols)):
  x=pad+i*(cw+pad);d.text((x,top-34),t,fill=(240,232,207),font=F(20));B.paste(im,(x,top))
y=top+H+pad;d.text((pad,y),'Close-ups: one chip at 2x · the master die (pad ring, I/O cells, arrays, bond wires) · the master\'s left end (pin-1 notch and dimple, frit seam, gold pins)',fill=(240,232,207),font=F(20))
y+=50;x=pad
for im in (one,die,lft):B.paste(im,(x,y));x+=im.width+pad
B.save(OUT,optimize=True);print(OUT,B.size)
