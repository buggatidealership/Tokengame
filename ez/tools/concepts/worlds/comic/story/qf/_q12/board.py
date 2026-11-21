# /usr/bin/python3 board.py <shots dir> <id> <label> <out>: four phone beats on top, the desktop beat 3 below; prints white area per shot
import sys,json
from PIL import Image,ImageDraw,ImageFont
D,ID,LAB,OUT=sys.argv[1:5]
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',26);f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
def white(png,js,sc):
  im=Image.open(png).convert('RGB');m=json.load(open(js));top=m['book'][0]*sc;fl=m['film']
  W,H=im.size;px=im.load();n=w=0
  for y in range(int(top),H,3):
    for x in range(0,W,3):
      if fl and fl[0]*sc<=x<(fl[0]+fl[2])*sc and fl[1]*sc<=y<(fl[1]+fl[3])*sc:continue
      r,g,b=px[x,y];n+=1
      if min(r,g,b)>215 and max(r,g,b)-min(r,g,b)<30:w+=1
  return round(100*w/n,2)
ph=[];names=['1 · Locked','2 · The close','3 · Graded','4 · Hand-off']
for b in range(1,5):
  im=Image.open(f'{D}/390-b{b}.png').convert('RGB');print('390 beat',b,'white %',white(f'{D}/390-b{b}.png',f'{D}/390-b{b}.json',2))
  ph.append(im.resize((390,844),Image.LANCZOS))
dk=Image.open(f'{D}/1280-b3.png').convert('RGB');print('1280 beat 3 white %',white(f'{D}/1280-b3.png',f'{D}/1280-b3.json',1))
print('320 beat 3 white %',white(f'{D}/320-b3.png',f'{D}/320-b3.json',2))
G=24;Wd=max(4*390+5*G,1280+2*G);B=Image.new('RGB',(Wd,80+40+844+G+40+800+G),'#1b1820');d=ImageDraw.Draw(B)
d.text((G,18),LAB,fill='#fdbc2a',font=F);d.text((G,52),'Round 66 Shell (SHEL.L). Phone 390x844, beats 1 to 4; desktop 1280x800, beat 3.',fill='#d8cfbd',font=f2)
x=G
for i,im in enumerate(ph):d.text((x,88),names[i],fill='#fdbc2a',font=f2);B.paste(im,(x,120));x+=390+G
y=120+844+G;d.text((G,y),'Desktop 1280 · beat 3 · Graded',fill='#fdbc2a',font=f2);B.paste(dk,(G,y+32))
B.save(OUT,optimize=True);print(OUT,B.size)
