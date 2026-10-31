# /usr/bin/python3 board.py <shots dir> <vault|trans> <width> <out>: today first, then the five takes, labelled
import sys,textwrap
from PIL import Image,ImageDraw,ImageFont
D,M,W,OUT=sys.argv[1],sys.argv[2],int(sys.argv[3]),sys.argv[4]
FB='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';FR='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
T={'vault':[('now','Today','The caption is gone: the painting carries no words.'),
 ('v1','V1 Engraved in the ring','Cut into the vault frame\'s steel ring and gilded, following its arc; the gilt catches the vault\'s light.'),
 ('v2','V2 Gold leaf over the door','The bank\'s name gilded over its vault; the gold leaf is the pool\'s own coins (texture cut from the painting).'),
 ('v3','V3 Written by the light','No sign: the rain left of the vault catches its gold light only inside the letters. The streaks fall.'),
 ('v4','V4 Stencilled on the wall','A heist crew\'s marking sprayed on the wet wall, the paint running in the rain, a red arrow at the door.'),
 ('v5','V5 Light on the wet floor','The light pouring out lands on the wet ground right of the door, and the words are in it, flat on the floor.')],
 'trans':[('now','Today','A ruled seam: the gold ground stops, the black starts.'),
 ('t1','T1 The coin goes in','The coin on the coin-flip line is tossed off the chart, falls down the margin and drops into the vault\'s pile. (Board: its path shown as a trail.)'),
 ('t2','T2 The page tears','The gold page ends in a torn edge; through it the night and its rain. The strip below the tear falls away as you scroll.'),
 ('t3','T3 The night soaks through','The vault\'s rain falls on the ground before the vault arrives; the gold ink runs from the seam in drips that lengthen.'),
 ('t4','T4 The vault\'s light reaches up','A beam leaves the painting\'s top: the rain in it turns gold, and the panel and caption above catch a warm rim.'),
 ('t5','T5 The next page lands','The bet\'s page arrives hinged at the seam, tipped away, and lies flat as you scroll; the gold page shades its top.')]}[M]
ims=[(a,b,c,Image.open(f'{D}/{M}-{W}-{k}.png').convert('RGB')) for k,b,c in T for a in [k]]
F=ImageFont.truetype(FB,30);f=ImageFont.truetype(FR,22)
def lab(d,x,y,t,c,w):
  d.text((x,y),t,fill='#fdbc2a',font=F);yy=y+42
  for ln in textwrap.wrap(c,width=max(20,int(w/12.5))):d.text((x,yy),ln,fill='#e9dfc6',font=f);yy+=28
  return yy
if W<600:
  cols=3 if M=='vault' else 6;iw=ims[0][3].width;ih=max(i.height for *_,i in ims);head=150
  rows=(len(ims)+cols-1)//cols;B=Image.new('RGB',(cols*(iw+40)+40,rows*(ih+head+40)+60),'#1b1820');d=ImageDraw.Draw(B)
  for n,(k,t,c,i) in enumerate(ims):x=40+(n%cols)*(iw+40);y=30+(n//cols)*(ih+head+40);lab(d,x,y,t,c,iw);B.paste(i,(x,y+head))
else:
  cols=2;sc=.5;iw=int(ims[0][3].width*sc);ih=int(max(i.height for *_,i in ims)*sc);head=110
  rows=(len(ims)+1)//2;B=Image.new('RGB',(cols*(iw+40)+40,rows*(ih+head+40)+60),'#1b1820');d=ImageDraw.Draw(B)
  for n,(k,t,c,i) in enumerate(ims):x=40+(n%2)*(iw+40);y=30+(n//2)*(ih+head+40);lab(d,x,y,t,c,iw);B.paste(i.resize((iw,int(i.height*sc))),(x,y+head))
B.save(OUT,optimize=True);print(OUT,B.size)
