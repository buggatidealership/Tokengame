# /usr/bin/python3 board.py <id> <shots dir> "<tradition>" "<idea>" : the four beats at 390 on top, beat 3 at 1280 below.
# Also prints the near-white share of each module (pixels with every channel above 235, inside the module's box).
import sys,json
from PIL import Image,ImageDraw,ImageFont
ID,S,TRAD,IDEA=sys.argv[1:5]
F='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
try: fb=ImageFont.truetype(F,30);fs=ImageFont.truetype(F.replace('-Bold',''),22)
except Exception: fb=fs=ImageFont.load_default()
def white(tag):
    im=Image.open(f'{S}/{tag}.png').convert('RGB');k=json.load(open(f'{S}/{tag}.json'));x,y,w,h=[v*2 for v in k['mod']]
    c=im.crop((max(0,x),max(0,y),x+w,y+h));px=c.getdata();n=sum(1 for p in px if min(p)>235);return round(100*n/max(1,len(px)),1)
for t in ['390-b1','390-b2','390-b3','390-b4','1280-b3','320-b3']: print(t,'near-white',white(t),'%')
ph=[Image.open(f'{S}/390-b{i}.png').convert('RGB').resize((390,844)) for i in (1,2,3,4)]
dk=Image.open(f'{S}/1280-b3.png').convert('RGB').resize((1280,800))
G=16;W=max(4*390+3*G,1280)+2*G;Hh=70+30+844+G+30+800+G
b=Image.new('RGB',(W,Hh),(27,26,34));d=ImageDraw.Draw(b)
d.text((G,14),f'{ID}  ·  {TRAD}',fill=(255,210,63),font=fb);d.text((G,48),IDEA,fill=(240,232,210),font=fs)
names=['Beat 1 · Locked','Beat 2 · The close','Beat 3 · Graded','Beat 4 · Hand-off']
x0=(W-(4*390+3*G))//2
for i,im in enumerate(ph):
    d.text((x0+i*(390+G),78),names[i]+' (390)',fill=(200,190,170),font=fs);b.paste(im,(x0+i*(390+G),104))
y=104+844+G;d.text(((W-1280)//2,y),'Beat 3 · Graded (1280 x 800)',fill=(200,190,170),font=fs);b.paste(dk,((W-1280)//2,y+28))
out=f'/home/user/Tokengame/ez/x2p-x3p-qf-{ID}.png';b.save(out,optimize=True);print(out,b.size)
