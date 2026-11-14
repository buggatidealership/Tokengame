# python3 board.py <OUT>: x2p-hub-phone.png (the first five 390x844 screens, shot at 2x, shown at 1x) and x2p-hub-desktop.png
# (1536x864 first screen and fight night, with the full page scaled beside them)
import sys
from PIL import Image,ImageDraw
O=sys.argv[1];E='/home/user/Tokengame/ez/'
bg=(14,13,20)
ims=[Image.open(f'{O}/p390-{i}.png').convert('RGB') for i in range(5)]
ims=[i.resize((390,844),Image.LANCZOS) for i in ims]
B=Image.new('RGB',(5*390+4*24+48,844+48),bg)
for k,i in enumerate(ims):B.paste(i,(24+k*(390+24),24))
B.save(E+'x2p-hub-phone.png')
t=Image.open(f'{O}/d1536-top.png').convert('RGB').resize((1536,864),Image.LANCZOS)
b=Image.open(f'{O}/d1536-b.png').convert('RGB').resize((1536,864),Image.LANCZOS)
f=Image.open(f'{O}/d1536-full.png').convert('RGB');H=864*2+24;f=f.resize((round(f.width*H/f.height),H),Image.LANCZOS)
D=Image.new('RGB',(24+1536+24+f.width+24,24+H+24),bg)
D.paste(t,(24,24));D.paste(b,(24,24+864+24));D.paste(f,(24+1536+24,24))
D.save(E+'x2p-hub-desktop.png')
print(B.size,D.size)
