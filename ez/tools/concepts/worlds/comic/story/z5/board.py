# /usr/bin/python3 board.py <shots dir>: the full Overview boards, phone (390 viewport at 2x) and desktop (1280, scaled to 1x), split under 7800 px
import sys,os
from PIL import Image
D=sys.argv[1];O='/home/user/Tokengame/ez/'
def out(im,name,maxh=7800):
  H=im.size[1]
  if H<=maxh:im.save(O+name+'.png',optimize=True);print(name,im.size);return
  n=-(-H//maxh);step=-(-H//n)
  for i in range(n):
    c=im.crop((0,i*step,im.size[0],min(H,(i+1)*step)));c.save(O+f'{name}-{i+1}.png',optimize=True);print(f'{name}-{i+1}',c.size)
p=Image.open(D+'/390-1.png').convert('RGB');out(p,'x2p-x3p-wow-z5-phone')
d=Image.open(D+'/1280-1.png').convert('RGB');d=d.resize((1280,d.size[1]//2),Image.LANCZOS);out(d,'x2p-x3p-wow-z5-desktop')
