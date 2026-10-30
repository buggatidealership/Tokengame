# /usr/bin/python3 board.py <shots dir> <section lr5|season> <width> <out>: Today, then the takes
import sys
from PIL import Image,ImageDraw,ImageFont
D,S,W,OUT=sys.argv[1:5]
T={'lr5':[('now','Today'),('p1','A · P1 · The pile: the stub drops on'),('p2','A · P2 · Filed: the card slides into its drawer'),('p3','A · P3 · Punched: its hole in the Season 1 ticket')],
   'season2':[('now','Today'),('s1','S1 as it is now'),('s1+s1s+c1','A · C1 · Ben-Day dots, smaller stamp'),('s1+s1s+c2','A · C2 · Sunburst, smaller stamp'),('s1+s1s+c3','A · C3 · Action panel, smaller stamp')],
   'season3':[('s1+s1s+c1','C1 as it is now'),('s1+s1s+g1','A · G1 · Pop-art blow-up (Lichtenstein)'),('s1+s1s+g2','A · G2 · Golden-age newsprint'),('s1+s1s+g3','A · G3 · UPA flat modern (1950s)'),('s1+s1s+g4','A · G4 · Kirby cosmic krackle'),('s1+s1s+g5','A · G5 · Underground crosshatch')],
   'season':[('now','Today'),('s1','A · S1 · Stamped: the winner in ink'),('s2',"A · S2 · Winner's colours"),('s3','A · S3 · The race for wins'),('s3+s3tap','A · S3 · a lane tapped (Claude)')]}[S]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',30)
ims=[(t,Image.open(f'{D}/{S.rstrip("23")}-{W}-{k}.png').convert('RGB')) for k,t in T]
if int(W)<600:
  B=Image.new('RGB',(sum(i.width for _,i in ims)+40*(len(ims)+1),max(i.height for _,i in ims)+110),'#1b1820');d=ImageDraw.Draw(B);x=40
  for t,i in ims:
    f=F
    while d.textlength(t,font=f)>i.width and f.size>16:f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',f.size-1)
    d.text((x,30),t,fill='#fdbc2a',font=f);B.paste(i,(x,90));x+=i.width+40
else:
  B=Image.new('RGB',(max(i.width for _,i in ims)+80,sum(i.height+90 for _,i in ims)+40),'#1b1820');d=ImageDraw.Draw(B);y=30
  for t,i in ims:d.text((40,y),t,fill='#fdbc2a',font=F);B.paste(i,(40,y+50));y+=i.height+90
B.thumbnail((6000,6000));B.save(OUT,optimize=True);print(OUT,B.size)
