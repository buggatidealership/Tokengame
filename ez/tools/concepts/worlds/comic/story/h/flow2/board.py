# /usr/bin/python3 board.py : composes the flow2 boards from out/*.png into ez/x2p-h27-flow2-*.png
from PIL import Image,ImageDraw,ImageFont
import os
O='out/';EZ='../../../../../../../'
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22);S=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
def W(im,w):return im.resize((w,round(im.size[1]*w/im.size[0])),Image.LANCZOS)
def col(title,sub,ims,w,gap=12):
  ims=[W(i,w) for i in ims];h=74+sum(i.size[1] for i in ims)+gap*(len(ims)-1)
  c=Image.new('RGB',(w,h),'#f4efe2');d=ImageDraw.Draw(c);d.text((4,6),title,font=F,fill='#111');d.text((4,38),sub,font=S,fill='#444')
  y=74
  for i in ims:c.paste(i,(0,y));y+=i.size[1]+gap
  return c
def row(cols,out,pad=24,title=None):
  h=max(c.size[1] for c in cols)+(60 if title else 0);w=sum(c.size[0] for c in cols)+pad*(len(cols)+1)
  b=Image.new('RGB',(w,h+pad*2),'#f4efe2');d=ImageDraw.Draw(b)
  if title:d.text((pad,pad),title,font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',28),fill='#111')
  x=pad
  for c in cols:b.paste(c,(x,pad+(60 if title else 0)));x+=c.size[0]+pad
  b.save(EZ+out,optimize=True);print(out,b.size)
o=lambda f:Image.open(O+f).convert('RGB')
# 1 order
row([col("Today's order","headline, How a round works, the film, Meet the models",[o('base-390.png')],390),
     col("Friend's order, today's frames","headline, Meet the models, How a round works, the film",[o('nowF-390.png')],390),
     col("Friend's order + take C (my pick)","headline, Meet the models, C text first, the film",[o('C-390.png')],390),
     col("Today's order + take C","headline, C text first, the film, Meet the models",[o('Ct-390.png')],390)],
    'x2p-h27-flow2-order-390.png',title='flow2 · the Overview order, 390px (whole top, page as built + mockup)')
# 2 takes at 390 (How a round works only)
A=[o('A-390-%d.png'%i) for i in range(1,5)]
Dd=[o('D-390-%s.png'%s) for s in ['0','1','1l','2','4','5']]
row([col('Now (live)','2x2 frames, line under each',[o('sec-now-390.png')],390),
     col('A · one step per screen','scroll turns the step; 4 screens shown',A,390),
     col('B · caption on the panel','sentence on a gold caption box, one panel per beat',[o('sec-B-390.png')],390),
     col('C · text first, small picture','sentence big + this round in words; picture as proof',[o('sec-C-390.png')],390),
     col("D · Play the round (owner's a)",'dark until play; words letter in, then the frame lights',Dd,390)],
    'x2p-h27-flow2-takes-390.png',title='flow2 · How a round works, four takes, 390px, friend\'s order (Meet the models above)')
# 3 takes at 1280
row([col('Now (live)','',[o('sec-now-1280.png')],1280),
     col('A · one step per screen (steps 1 and 3)','',[o('A-1280-1.png'),o('A-1280-3.png')],1280)],'x2p-h27-flow2-takes-1280-a.png',title='flow2 · 1280px (1 of 2)')
row([col('B · caption on the panel','',[o('sec-B-1280.png')],1280),
     col('C · text first, small picture (my pick)','',[o('sec-C-1280.png')],1280),
     col("D · Play the round: waiting, step 2, end",'',[o('D-1280-0.png'),o('D-1280-2.png'),o('D-1280-5.png')],1280)],'x2p-h27-flow2-takes-1280-b.png',title='flow2 · 1280px (2 of 2)')
# 4 checks at 320
def crop(f,a,b):im=o(f);return im.crop((0,a,im.size[0],min(b,im.size[1])))
c320=o('C-320.png');b320=o('B-320.png')
row([col('A at 320 (step 1)','',[o('A-320-1.png')],320),col('B at 320','',[crop('B-320.png',1500,b320.size[1])],320),
     col('C at 320','',[crop('C-320.png',1500,c320.size[1])],320),col('D at 320 (waiting, step 2, end)','',[o('D-320-0.png'),o('D-320-2.png'),o('D-320-5.png')],320)],
    'x2p-h27-flow2-320.png',title='flow2 · 320px checks')
