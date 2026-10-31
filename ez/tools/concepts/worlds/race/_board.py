# /usr/bin/python3 _board.py <render dir> : boards from run.js renders (race-390-1..5.png at 2x, race-1536-1..3.png)
import sys
from PIL import Image, ImageDraw, ImageFont
D=sys.argv[1].rstrip('/')
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
BG=(10,30,19);CR=(248,240,217);GD=(253,188,42)
def head(d,W,title,sub):
    d.text((24,18),title,font=F(26),fill=CR);d.text((24,54),sub,font=G(15),fill=(190,200,186))
# phone: five consecutive screens of the scroll at 390x844 (rendered 2x, shown at 1x)
P=[('1','Headline, big screen, standings'),('2','Standings, today\'s card'),('3','Results board (last race day)'),('4','Replays: the graded cards and films'),('5','The race so far, the paddock')]
w,h,g=390,844,24;W=g+len(P)*(w+g);H=96+h+50
B=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(B)
head(d,W,'EZ world: RACE DAY  ·  phone 390x844, the first five screens of the Overview','The season is a race meeting. Four AIs in silks, every earnings report a race, the market close the finish line, prize money = P&L on a pretend $100K, NVIDIA the cup.  Clock: Thu Oct 29, 1:09 pm New York.')
for i,(n,t) in enumerate(P):
    im=Image.open(f'{D}/race-390-{n}.png').convert('RGB').resize((w,h),Image.LANCZOS);x=g+i*(w+g);B.paste(im,(x,96))
    d.rectangle([x-1,95,x+w,96+h],outline=(60,90,70));d.text((x,96+h+12),f'{n}  {t}',font=F(15),fill=GD)
B.save(sys.argv[2] if len(sys.argv)>2 else '/home/user/Tokengame/ez/x2p-world-race-phone.png')
# desktop: three screens at 1536x864, shown at 60%
k=.6;w,h=int(1536*k),int(864*k);P=[('1','The meeting: headline and standings beside the big screen'),('2','Today\'s card (one racecard page per race) and the results board'),('3','Replays: the newest eight graded cards, each with its film')]
W=g*2+w;H=96+len(P)*(h+56)
B=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(B)
head(d,W,'EZ world: RACE DAY  ·  desktop 1536x864, three screens','The film, the record slabs and the crawl are the page\'s own; everything else is built from ez-data.js.')
for i,(n,t) in enumerate(P):
    im=Image.open(f'{D}/race-1536-{n}.png').convert('RGB').resize((w,h),Image.LANCZOS);y=96+i*(h+56);B.paste(im,(g,y));d.rectangle([g-1,y-1,g+w,y+h],outline=(60,90,70));d.text((g,y+h+12),f'{n}  {t}',font=F(15),fill=GD)
B.save(sys.argv[3] if len(sys.argv)>3 else '/home/user/Tokengame/ez/x2p-world-race-desktop.png')
