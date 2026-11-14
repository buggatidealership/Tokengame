#!/usr/bin/python3
# cast6 layout guides (reference images for gpt-image-2): python3 guide.py -> guide/p-body-<m>.png, guide/p-gold.png
# Today's card format: stub left, the big founder window top right (~half the width), name/version/right-way down the left, P&L full width, best call, last five.
import json,os
from PIL import Image,ImageDraw
D=os.path.dirname(os.path.abspath(__file__));L=json.load(open(D+'/layout.json'));os.makedirs(D+'/guide',exist_ok=True)
def R(b,W,H):return [b[0]*W,b[1]*H,b[2]*W,b[3]*H]
S=L['p'];W,H=S['W'],S['H']
for m,stock in (('claude','#e8692f'),('gpt','#10a37f'),('grok','#2a2530'),('kimi','#1a6bff')):
  im=Image.new('RGB',(W,H),'#ffffff');d=ImageDraw.Draw(im)
  d.rectangle([4,4,W-5,H-5],fill=stock,outline='#111',width=7)
  sx=R(S['stub'],W,H);d.rectangle([4,4,sx[2],H/2],fill='#16b862');d.rectangle([4,H/2,sx[2],H-5],fill='#ef3a2e')
  for y in range(14,H-10,22):d.ellipse([sx[2]-5,y,sx[2]+5,y+10],fill='#ffffff')
  d.ellipse(R(S['seal'],W,H),fill='#ffd21f',outline='#111',width=5);d.rectangle(R(S['strip'],W,H),fill='#ffd21f',outline='#111',width=4)
  w=R(S['win'],W,H);f=S['frame']*W;d.rectangle([w[0]-f,w[1]-f,w[2]+f,w[3]+f],fill='#7a3b1c',outline='#111',width=6);d.rectangle(w,fill='#ffffff',outline='#111',width=5)
  d.ellipse(R(S['coin'],W,H),fill='#ffd21f',outline='#111',width=6)
  r=R(S['ribbon'],W,H);h=r[3]-r[1];d.polygon([(r[0],r[1]),(r[2]-h*.35,r[1]),(r[2],r[1]+h/2),(r[2]-h*.35,r[3]),(r[0],r[3])],fill='#ffd21f',outline='#111',width=6)
  d.rectangle(R(S['ver'],W,H),fill='#c8961e',outline='#111',width=5)
  for k in ('rw','pnl','bc'):d.rectangle(R(S[k],W,H),fill='#0d0b10',outline='#c8961e',width=8)
  bw=S['boxw']*W;x0,y0=S['box0'][0]*W,S['box0'][1]*H
  for i in range(5):x=x0+i*(bw+S['boxg']*W);d.ellipse([x,y0,x+bw,y0+bw],fill='#cfd3d8',outline='#111',width=5)
  im.save(f'{D}/guide/p-body-{m}.png')
im=Image.new('RGB',(W,H),'#ffffff');d=ImageDraw.Draw(im);sx=R(S['stub'],W,H)
d.rectangle([4,4,sx[2],H-5],fill='#f2b51e',outline='#111',width=7)
for y in range(14,H-10,22):d.ellipse([sx[2]-5,y,sx[2]+5,y+10],fill='#ffffff')
d.ellipse(R(S['seal'],W,H),fill='#ffe98a',outline='#111',width=5);d.rectangle(R(S['strip'],W,H),fill='#ffe98a',outline='#111',width=4)
im.save(f'{D}/guide/p-gold.png');print('ok')
