# /usr/bin/python3 board.py <shots dir> <width> <out.png> [ids now,a,b,c]: the 390x664 (or 1280x800) beat frames side by side
# (two per row at 1280), each under its label.
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
IDS=(sys.argv[4] if len(sys.argv)>4 else 'now,a,b,c').split(',')
LAB={'now':'Today (live X2+)','a':'A · Sealed chips','b':'B · The board of sockets','c':'C · The wafer'}
SUB={'now':'the bet ends on one line: "NVIDIA is the first bet, not the last."',
 'a':'four more chips, unlit, still in their film: #2 #3 #4 More',
 'b':'Bet #1 lit in socket 1; empty sockets #2 #3 #4 More; a spark runs down the bus',
 'c':'Bet #1 is the die cut out of the wafer; #2 #3 #4 light up in turn'}
col=420 if W<600 else 1000;per=len(IDS) if W<600 else 2
ims=[]
for i in IDS:
  im=Image.open(f'{D}/{i}-{W}-beat.png').convert('RGB');k=col/im.width;ims.append(im.resize((col,int(im.height*k)),Image.LANCZOS))
try:
  F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',22 if W<600 else 30);f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14 if W<600 else 20)
except Exception:F=f=ImageFont.load_default()
g=24;top=86 if W<600 else 96;rows=(len(ims)+per-1)//per;rh=max(i.height for i in ims)+top+g
B=Image.new('RGB',(per*col+(per+1)*g,rows*rh+g),(18,18,20));d=ImageDraw.Draw(B)
for n,(i,im) in enumerate(zip(IDS,ims)):
  x=g+(n%per)*(col+g);y=(n//per)*rh+14
  d.text((x,y),LAB.get(i,i),fill=(255,214,60),font=F)
  sub=SUB.get(i,'');
  if W<600 and len(sub)>48:
    cut=sub.rfind(' ',0,48);d.text((x,y+30),sub[:cut],fill=(220,214,196),font=f);d.text((x,y+48),sub[cut+1:],fill=(220,214,196),font=f)
  else:d.text((x,y+(30 if W<600 else 42)),sub,fill=(220,214,196),font=f)
  B.paste(im,(x,y-14+top))
B.save(OUT,optimize=True);print(OUT,B.size)
