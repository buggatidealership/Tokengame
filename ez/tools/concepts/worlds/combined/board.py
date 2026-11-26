# /usr/bin/python3 board.py <render dir> : boards from run.js renders
import sys
from PIL import Image, ImageDraw, ImageFont
D=sys.argv[1].rstrip('/')
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
BG=(21,18,26);CR=(248,240,217);GD=(253,188,42)
def head(d,t,s):d.text((24,18),t,font=F(26),fill=GD);d.text((24,56),s,font=G(15),fill=(220,212,196))
P=[('0','1  What is this: the cover, the film, the cast'),('1','2  How it works: last night in 3 panels'),('2','3  Who is winning, who overtook whom'),('3','4  What happens tonight: tonight\'s card'),
   ('4','5  Is it real: the last 5 nights, every result'),('5','6  Smart or lucky?'),('6','7  Why come back: the NVIDIA bet, follow on X'),('lb','8  Leaderboard tab: the four side by side'),('lb2','9  Leaderboard tab: every overtake')]
w,h,g=390,844,24;per=5;rows=2;W=g+per*(w+g);H=100+rows*(h+56)
B=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(B)
head(d,'EZ, from first principles  ·  phone 390x844, the Overview in order, then the Leaderboard tab','The comic book\'s look and voice with race day\'s structure. Every number from ez-data.js and the page\'s P&L accounts (Thu Oct 29, morning, New York).')
for i,(n,t) in enumerate(P):
    im=Image.open(f'{D}/wk-390-{n}.png').convert('RGB').resize((w,h),Image.LANCZOS);x=g+(i%per)*(w+g);y=100+(i//per)*(h+56);B.paste(im,(x,y))
    d.rectangle([x-1,y-1,x+w,y+h],outline=(70,64,80));d.text((x,y+h+12),t,font=F(14),fill=GD)
B.save('/home/user/Tokengame/ez/x2p-combined-phone.png')
k=.5;w,h=int(1536*k),int(864*k);P=[('0','1  Cover and film'),('1','2  Last night in 3 panels'),('2','3  Who is winning beside the race so far'),('3','4  Tonight\'s card, all rounds at once'),('4','5  The last 5 nights in two columns'),('5','6  Smart or lucky?'),('6','7  The NVIDIA bet, follow on X'),('lb','8  Leaderboard tab')]
W=g+2*(w+g);H=100+4*(h+52)
B=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(B)
head(d,'EZ, from first principles  ·  desktop 1536x864','The same page laid out in two columns where it helps. The crawl at the foot is the live site\'s own.')
for i,(n,t) in enumerate(P):
    im=Image.open(f'{D}/wk-1536-{n}.png').convert('RGB').resize((w,h),Image.LANCZOS);x=g+(i%2)*(w+g);y=100+(i//2)*(h+52);B.paste(im,(x,y))
    d.rectangle([x-1,y-1,x+w,y+h],outline=(70,64,80));d.text((x,y+h+10),t,font=F(14),fill=GD)
B.save('/home/user/Tokengame/ez/x2p-combined-desktop.png')
