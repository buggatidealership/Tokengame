# /usr/bin/python3 board.py <shots dir> : ez/x2p-h23-quad4-390.png, -1280.png, -closeup.png
import sys
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];O='../../../../../../../'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
def lab(im,t,s=26,h=56):
  b=Image.new('RGB',(im.width,im.height+h),'#141218');b.paste(im,(0,h));ImageDraw.Draw(b).text((14,12),t,fill='#f8f0d9',font=F(s));return b
def row(ims,gap=24,bg='#141218'):
  W=sum(i.width for i in ims)+gap*(len(ims)-1);H=max(i.height for i in ims);b=Image.new('RGB',(W,H),bg);x=0
  for i in ims:b.paste(i,(x,0));x+=i.width+gap
  return b
def col(ims,gap=24):
  W=max(i.width for i in ims);H=sum(i.height for i in ims)+gap*(len(ims)-1);b=Image.new('RGB',(W,H),'#141218');y=0
  for i in ims:b.paste(i,(0,y));y+=i.height+gap
  return b
o=Image.open
row([lab(o(D+'/s4/fr-390-now.png'),'Today (live X2+): figures 3.6 to 7.4 px cap at 390'),lab(o(D+'/s4/fr-390-q4.png'),'quad4: zoomed-in 2K paintings, figures lit in the glass (9.5 to 40 px cap)')]).save(O+'x2p-h23-quad4-390.png')
col([lab(o(D+'/s4/fr-1280-now.png'),'Today (live X2+), 1280'),lab(o(D+'/s4/fr-1280-q4.png'),'quad4, 1280')]).save(O+'x2p-h23-quad4-1280.png')
# close-up at 3x: each frame's picture at 390 (570 px = 190 css x 3) beside the NVIDIA timer at the same height
z=o(D+'/s5/fr-390-q4.png');import json
m=json.load(open(D+'/s5/boxes.json'))
cs=[lab(z.crop(tuple(int(v*3) for v in b)),n,22,44) for n,b in m]
t=o(O+'tools/concepts/worlds/comic/story/h/h23/ref-nvidia-timer.jpg');t=t.resize((int(t.width*570/t.height),570))
col([row(cs[:2]+cs[2:]),row([lab(t,'Reference: the NVIDIA timer (live), same height',22,44)])]).save(O+'x2p-h23-quad4-closeup.png')
