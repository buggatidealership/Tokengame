# /usr/bin/python3 sheet.py -> ../../../x2p-tabanim-frames.png: four mid-transition frames per take (P&L -> Accuracy), seeked exactly
import json, os
from PIL import Image, ImageDraw, ImageFont
H=os.path.dirname(os.path.abspath(__file__));F=H+'/frames'
NAME={'T1':'T1 Tear-off · 600ms','T2':'T2 Stamped · 520ms','T3':'T3 Punch and gate · 620ms','T4':'T4 Ink roller · 580ms','T5':'T5 Shuffle the stack · 620ms'}
def font(sz):
  for f in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf']:
    if os.path.exists(f): return ImageFont.truetype(f,sz)
  return ImageFont.load_default()
f1,f2=font(30),font(22)
im0=Image.open(F+'/T1-1.png');w,h=im0.size;s=.6;cw,ch=int(w*s),int(h*s);pad=24;lab=56;top=90
W=pad+4*(cw+pad);Hh=top+5*(lab+ch+pad)
o=Image.new('RGB',(W,Hh),(11,10,20));d=ImageDraw.Draw(o)
d.text((pad,24),'EZ proof card: tab switch, five ticket takes (P&L to Accuracy, frames seeked exactly, 390px phone, 2x)',font=f1,fill=(248,240,217))
for r,t in enumerate(['T1','T2','T3','T4','T5']):
  y=top+r*(lab+ch+pad);ts=json.load(open(f'{F}/{t}.json'))
  d.text((pad,y+12),NAME[t],font=f1,fill=(253,188,42))
  for i in range(4):
    x=pad+i*(cw+pad);o.paste(Image.open(f'{F}/{t}-{i+1}.png').convert('RGB').resize((cw,ch),Image.LANCZOS),(x,y+lab))
    d.rectangle([x,y+lab,x+92,y+lab+30],fill=(4,7,14));d.text((x+8,y+lab+3),f'{ts[i]} ms',font=f2,fill=(248,240,217))
o.save(H+'/../../../x2p-tabanim-frames.png',optimize=True);print(o.size)
