# /usr/bin/python3 board.py <shots dir>: phone (390) and desktop (1280) boards, split above 7800 px
import sys
from PIL import Image
S=sys.argv[1];E='/home/user/Tokengame/ez/'
for w,name in ((390,'phone'),(1280,'desktop')):
    im=Image.open(f'{S}/{w}.png').convert('RGB');W,H=im.size
    if H<=7800: im.save(f'{E}x2p-x3p-wow-z4-{name}.png',optimize=True);print(name,im.size);continue
    n=-(-H//7600);step=-(-H//n)
    for i in range(n):
        p=im.crop((0,i*step,W,min(H,(i+1)*step)));p.save(f'{E}x2p-x3p-wow-z4-{name}-{i+1}.png',optimize=True);print(name,i+1,p.size)
