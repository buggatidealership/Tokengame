#!/usr/bin/python3
# board.py <shots dir> <out-390.png> <out-1280.png>: today's live section first, then each take (hit rate | P&L Season), labelled
import sys
from PIL import Image,ImageDraw,ImageFont
D,O3,O12=sys.argv[1:4]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
TK=[('now','Today live: the big board (chalk on the exchange slate)',''),
 ('a1hd','PICK: A1 Insert coin, vault noir, painted at 2K','$0.52'),
 ('a1','A1 Insert coin, vault noir (brush ink, gold spot), 1K rough','$0.07'),('a2','A2 Insert coin, Silver Age print','$0.04'),('a3','A3 Insert coin, Spider-Verse offset','$0.04'),
 ('p1','P1 Lie detector console, vault noir','$0.04'),('p2','P2 Lie detector console, Silver Age','$0.05'),('p3','P3 Lie detector console, Mignola hard shadow','$0.05'),
 ('d1','P4 Lie detector on the desk (top-down), vault noir','$0.04'),('d3','P5 Lie detector on the desk, Mignola','$0.05')]
def col(W,wins,scale):
  out=[]
  for t,lab,c in TK:
    ims=[]
    for w in wins:
      try:ims.append(Image.open(f'{D}/s3-{t}-{w}-{W}.png').convert('RGB'))
      except Exception:pass
    if not ims:continue
    ims=[i.resize((int(i.width*scale),int(i.height*scale))) for i in ims];out.append((lab+('  ·  '+c if c else ''),ims))
  return out
def board(W,scale,horiz,out,fs):
  cols=col(W,['hit','season'],scale)
  if horiz:  # one column per take, hit over P&L
    cw=max(i.width for _,ims in cols for i in ims);ch=max(sum(i.height for i in ims)+10 for _,ims in cols)
    import textwrap
    B=Image.new('RGB',(len(cols)*(cw+20)+20,ch+110),'#1b1b1f');d=ImageDraw.Draw(B)
    for k,(lab,ims) in enumerate(cols):
      x=20+k*(cw+20);d.multiline_text((x,10),'\n'.join(textwrap.wrap(lab,int(cw/(fs*.62)))),font=F(fs),fill='#ffd21f',spacing=4);y=96
      for i in ims:B.paste(i,(x,y));y+=i.height+10
  else:      # one row per take, hit | P&L
    rw=max(sum(i.width for i in ims)+20 for _,ims in cols);rh=[max(i.height for i in ims) for _,ims in cols]
    B=Image.new('RGB',(rw+40,sum(rh)+len(cols)*70+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
    for (lab,ims),h in zip(cols,rh):
      d.text((20,y),lab,font=F(fs),fill='#ffd21f');y+=46;x=20
      for i in ims:B.paste(i,(x,y));x+=i.width+20
      y+=h+24
  B.save(out,optimize=True);print(out,B.size)
board(390,1,True,O3,22);board(1280,.62,False,O12,22)
# close-ups at 2x device pixels: the pick's end labels, its high-score table, the console's plates and key
def crop(f,box):
  im=Image.open(f'{D}/{f}').convert('RGB');W,H=im.size;return im.crop((int(box[0]*W),int(box[1]*H),int(box[2]*W),int(box[3]*H)))
cs=[('A1 end labels: one line, name then value, in a gutter no line enters',crop('s3-a1hd-hit-390.png',(.45,.25,1,.62))),
    ('A1 P&L: the high-score table under the chart',crop('s3-a1hd-season-390.png',(0,.45,1,.78))),
    ('P1 console: plates (windows), knob plate (mode), the key under the chart',crop('s3-p1-hit-390.png',(0,.5,1,1)))]
w=max(c.width for _,c in cs);B=Image.new('RGB',(w+40,sum(c.height+70 for _,c in cs)+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
for lab,c in cs:d.text((20,y),lab,font=F(26),fill='#ffd21f');y+=46;B.paste(c,(20,y));y+=c.height+24
B.save(O3.replace('-390.png','-closeup.png'),optimize=True);print('closeup',B.size)
