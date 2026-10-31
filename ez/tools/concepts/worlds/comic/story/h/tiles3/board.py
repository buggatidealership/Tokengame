#!/usr/bin/python3
# tiles3 board: label row + the real grid per take. board.py <shotdir> <width> <out> [closeups]
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],sys.argv[2],sys.argv[3]
TAKES=[('now','Today, live: the T3 tile gilds and crowns the winner\'s object; who won is only in the coin and the foot line.','$0'),
 ('A2','A  Guest star: the winner\'s founder, crowned, painted into the round\'s scene (tie: both; nobody: a knocked-over crown).','$0.06 a tile'),
 ('B','B  The mark on the gold: the winner\'s AI mark embossed into the film\'s own gold crowned object.','$0.06 a tile'),
 ('C2','C  Medallion: a crowned gold cameo of the winner\'s founder set into the scene (nobody: four cameos struck through in red).','$0.06 a tile'),
 ('D','D  Corner box: the comic cover\'s corner box, the winner\'s crowned head from cast2, page-drawn (nobody: four FAIL heads crossed out).','$0, data-driven')]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
ims=[];
for k,t,c in TAKES:
  try: im=Image.open(f'{D}/{k}-{W}.png').convert('RGB')
  except Exception: continue
  if int(W)>1000: im=im.resize((im.width//2,im.height//2))
  lab=Image.new('RGB',(im.width,70),'#0d0b10');d=ImageDraw.Draw(lab)
  d.text((14,10),t if len(t)<(im.width//10) else t[:im.width//10-1]+'…',fill='#ffd23a',font=F(17));d.text((14,40),'Cost: '+c,fill='#f8f0d9',font=F(15))
  if len(t)>=(im.width//10):
    d.rectangle((0,0,im.width,70),fill='#0d0b10');import textwrap
    for i,l in enumerate(textwrap.wrap(t,im.width//10)[:2]): d.text((14,6+i*21),l,fill='#ffd23a',font=F(16))
    d.text((14,50),'Cost: '+c,fill='#f8f0d9',font=F(14))
  ims.append(lab);ims.append(im)
if len(sys.argv)>4:
  cl=Image.open(sys.argv[4]).convert('RGB');w0=max(i.width for i in ims);cl=cl.resize((w0,int(cl.height*w0/cl.width)));lab=Image.new('RGB',(w0,70),'#0d0b10');ImageDraw.Draw(lab).text((14,22),'Close-up: R72 Reddit (Grok), R57 GE Vernova (tie), R51 UPS (nobody)',fill='#ffd23a',font=F(17));ims+=[lab,cl]
H=sum(i.height for i in ims)+8*len(ims);Wd=max(i.width for i in ims)
B=Image.new('RGB',(Wd,H),'#1b181c');y=0
for i in ims: B.paste(i,(0,y));y+=i.height+(8 if i.height!=70 else 0)
B.save(OUT,optimize=True);print(OUT,B.size)
