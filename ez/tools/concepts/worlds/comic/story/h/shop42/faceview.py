# /usr/bin/python3 faceview.py <out.jpg> : every hand-measured face drawn on its painting (cyan rect, magenta centre lines), zoomed, one sheet
import json,sys
from PIL import Image,ImageDraw
S=json.load(open('parts.json'));cells=[]
for nm,sp in S.items():
  for part,p in sp.items():
    if part=='src':continue
    src=p.get('src',sp['src']);im=Image.open('img/%s.jpg'%src).convert('RGB')
    for kind,r in (('plate',p.get('plate')),('hang',(p.get('hang') or {}).get('face'))):
      if not r:continue
      x0,y0,x1,y1=r;m=30;c=im.crop((x0-m,y0-m,x1+m,y1+m));k=440/c.width;c=c.resize((440,int(c.height*k)));d=ImageDraw.Draw(c)
      d.rectangle([m*k,m*k,(x1-x0+m)*k,(y1-y0+m)*k],outline=(0,255,255));cx=((x1-x0)/2+m)*k;cy=((y1-y0)/2+m)*k
      d.line([cx,0,cx,c.height],fill=(255,0,255));d.line([0,cy,c.width,cy],fill=(255,0,255));d.text((4,4),f'{nm} {part}',fill=(255,255,0));cells.append(c)
for t,f in (('a-tag',[.09,.258,.912,.84]),('b-tag',[.13,.12,.925,.88]),('c-tag',[.075,.1,.925,.9])):
  im=Image.open('img/%s.webp'%t).convert('RGB');W,H=im.size;c=im.resize((440,int(H*440/W)));d=ImageDraw.Draw(c);k=440/W
  d.rectangle([f[0]*W*k,f[1]*H*k,f[2]*W*k,f[3]*H*k],outline=(0,255,255));cx=(f[0]+f[2])/2*W*k;cy=(f[1]+f[3])/2*H*k
  d.line([cx,0,cx,c.height],fill=(255,0,255));d.line([0,cy,c.width,cy],fill=(255,0,255));d.text((4,4),t,fill=(255,255,0));cells.append(c)
cols=3;rows=[cells[i:i+cols] for i in range(0,len(cells),cols)];H=sum(max(c.height for c in r)+10 for r in rows)
B=Image.new('RGB',(cols*450,H),(40,40,40));y=0
for r in rows:
  x=0
  for c in r:B.paste(c,(x,y));x+=450
  y+=max(c.height for c in r)+10
B.save(sys.argv[1],quality=85)
