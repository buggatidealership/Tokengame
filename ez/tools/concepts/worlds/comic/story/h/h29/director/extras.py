# /usr/bin/python3 -I extras.py <board-2.png> <launch screens dir> <rule screens dir> <main screens dir> <out.png>
# Appends to board -2: (a) the after-launch state (sticky bar on, the CA filled with a SAMPLE address, Buy $EZ), the screens where it shows;
# (b) the bet's caption in both wordings (the owner's approved words = the main render; the rule-9 wording), cropped from the same screen.
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
b2,dL,dR,dM,out=sys.argv[1:6]
F='/usr/share/fonts/truetype/dejavu/';fT=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',26);fB=ImageFont.truetype(F+'DejaVuSans-Bold.ttf',15);fS=ImageFont.truetype(F+'DejaVuSans.ttf',14)
B=Image.open(b2).convert('RGB')
JL=json.load(open(os.path.join(dL,'screens.json')));JR=json.load(open(os.path.join(dR,'screens.json')));JM=json.load(open(os.path.join(dM,'screens.json')))
W,VH=390,844
def find(J,word):
  for s in J['shots']:
    if any(word in x for x in (s.get('secs') or [])):return s
  return J['shots'][-1]
# after launch: a mid-page screen (bar on), the bet screen, the end (bar gone, CA filled)
L=[s for s in JL['shots'] if s['y']>800]
pick=[L[1] if len(L)>1 else L[0],find(JL,'Bet #1'),JL['shots'][-1]]
labs=['bar on (scrolling up), never over a number you are reading','bar on, the bet screen','the end: bar gone, CA whole + Copy, Buy $EZ']
g=26;pw=W;cap=60
# bet wording crops
def betcrop(J):
  s=find(J,'Bet #1');im=Image.open(s['png']).convert('RGB').resize((W,VH));return im
mB,rB=betcrop(JM),betcrop(JR)
ew=g+3*(pw+g)+40+2*(pw+g);eh=60+VH+cap
E=Image.new('RGB',(max(B.width,ew),eh+20),(4,7,14));d=ImageDraw.Draw(E)
d.text((g,14),'After launch (the second variant): Follow · Buy $EZ · CA copy',fill=(255,210,31),font=fT)
x=g
for s,l in zip(pick,labs):
  im=Image.open(s['png']).convert('RGB').resize((pw,VH),Image.LANCZOS);E.paste(im,(x,60));d.rectangle((x-1,59,x+pw,60+VH),outline=(60,60,70))
  d.multiline_text((x,60+VH+8),l,fill=(220,214,198),font=fS);x+=pw+g
x+=40;d.text((x,14),'The bet caption, both wordings',fill=(255,210,31),font=fT)
for im,l in [(mB,'MAIN: the owner\'s words, "based on the #1 AI\'s prediction"'),(rB,'ALT: rule 9, "based on the trade of #1 on the board"')]:
  E.paste(im,(x,60));d.rectangle((x-1,59,x+pw,60+VH),outline=(60,60,70));d.multiline_text((x,60+VH+8),l.replace(', "','\n"'),fill=(220,214,198),font=fS);x+=pw+g
O=Image.new('RGB',(max(B.width,E.width),B.height+E.height),(4,7,14));O.paste(B,(0,0));O.paste(E,(0,B.height))
O.save(out,optimize=True);print(out,O.size,os.path.getsize(out))
