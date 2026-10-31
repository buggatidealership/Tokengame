#!/usr/bin/python3
# board.py <shots dir> <out prefix>: boards for round H / rounds at 390 and 1280 (today first, then each take with a one-line label and its Hedra cost), plus a close-up row.
import sys,os
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];OUT=sys.argv[2];HERE=os.path.dirname(os.path.abspath(__file__))
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
RACK=[('now','Today, live','no opener on the page; tiles below',0),
 ('r1','R1 · A: blank pop rack, live logos','new blank rack; logos placed by the page from ROUNDS x CAPS',.029),
 ('r5','R5 · A on the opener, live logos','the opener repainted with blank covers (2K high); logos placed live',.234),
 ('r4','R4 · C\': art around a blank badge','themed covers with an empty badge; logos placed live',.029),
 ('r2','R2 · B: logos painted by the model','opener edited with the 9 logo files as references (2K med)',.178),
 ('r6','R6 · B at 2K high','same as R2, high quality',.344),
 ('r3','R3 · C: fresh rack, art drawn around logos','new rack, logos given as references (2K med)',.166)]
TILE=[('now','Today, live','',0),
 ('t1','T1 · Silver Age cover','pop-art painting per company (gpt-image-2 1K med x12)',.442),
 ('t2','T2 · Golden Age newsprint','aged-paper painting per company (gpt-image-2 1K low x13)',.06),
 ('t3','T3 · Painted 3D variant, 2 a row','3D render + comic ink (seedream-50-pro x12)',.81),
 ('t4','T4 · The film is the cover','each round\'s own film poster; T1 art where no film',0),
 ('t5','T5 · Brand duotone','T1 art printed in the company colour',0)]
def lab(im,title,sub,cost,w):
  hd=Image.new('RGB',(w,74),'#15121a');d=ImageDraw.Draw(hd)
  d.text((10,8),title,font=F(17),fill='#ffe14d');d.text((10,32),sub,font=F(11),fill='#e8e0cc')
  d.text((10,52),('Hedra $%.3f'%cost) if cost else 'Hedra $0 (no new art)',font=F(11),fill='#9fe0a8')
  out=Image.new('RGB',(w,74+im.height),'#15121a');out.paste(hd,(0,0));out.paste(im,(0,74));return out
def load(t,W,maxh,crop_rack=False):
  p=f'{D}/{t}-{W}.png'
  if not os.path.exists(p):return None
  im=Image.open(p).convert('RGB');s=(390 if W<600 else 640)/im.width;im=im.resize((round(im.width*s),round(im.height*s)),Image.LANCZOS)
  return im.crop((0,0,im.width,min(im.height,maxh)))
def row(items,W,maxh,cols):
  ims=[]
  for t,a,b,c in items:
    im=load(t,W,maxh)
    if im:ims.append(lab(im,a,b,c,im.width))
  cw=ims[0].width;rh=[];g=12
  rows=[ims[i:i+cols] for i in range(0,len(ims),cols)];H=sum(max(x.height for x in r)+g for r in rows)
  out=Image.new('RGB',(cols*(cw+g)+g,H+g),'#2a2530');y=g
  for r in rows:
    for i,x in enumerate(r):out.paste(x,(g+i*(cw+g),y))
    y+=max(x.height for x in r)+g
  return out
def head(text,w):
  im=Image.new('RGB',(w,54),'#0d0b10');ImageDraw.Draw(im).text((14,12),text,font=F(24),fill='#fffaf0');return im
def stack(parts):
  w=max(p.width for p in parts);H=sum(p.height for p in parts);o=Image.new('RGB',(w,H),'#2a2530');y=0
  for p in parts:o.paste(p,(0,y));y+=p.height
  return o
def closeups():
  S=lambda f,box,h=300:(lambda im:im.resize((round(im.width*h/im.height),h),Image.LANCZOS))(Image.open(f).convert('RGB').crop(box))
  I=HERE+'/img/';tiles=[]
  for f,box,cap in [(f'{D}/r5-1280.png',(700,180,1500,900),'R5 live logos on the opener (zoom)'),
                    (I+'rack-B3hi.jpg',(620,420,1420,1100),'R6 painted logos, letters checked'),
                    (I+'rack-B2.jpg',(760,740,1250,1080),'REJECTED nano-banana-pro: "L\'Oreal" for Lilly ($0.164)'),
                    (f'{D}/t1-1280.png',(200,350,1000,920),'T1 covers (zoom)'),
                    (f'{D}/t3-390.png',(0,500,780,1100),'T3 variant covers (zoom)')]:
    if not os.path.exists(f):continue
    try:im=S(f,box)
    except Exception as e:print(e);continue
    tiles.append(lab(im,cap,'',0,im.width).crop((0,0,im.width,74+im.height)))
  w=sum(t.width+12 for t in tiles)+12;o=Image.new('RGB',(w,max(t.height for t in tiles)+24),'#2a2530');x=12
  for t in tiles:o.paste(t,(x,12));x+=t.width+12
  return o
for W,cols,mh in [(390,7,1250),(1280,2,1000)]:
  a=row(RACK,W,1250 if W<600 else 760,cols);b=row(TILE,W,mh if W<600 else 820,6 if W<600 else 2)
  c=closeups();ww=max(a.width,b.width)
  if c.width>ww:c=c.resize((ww,round(c.height*ww/c.width)))
  img=stack([head('Part 1 · The rack: covers carry the biggest companies already graded (live from ROUNDS x CAPS today: MSFT GOOGL AMZN TSMC SPCX META TSLA LLY Samsung)',ww),a,
             head('Part 2 · Every round a comic cover (logo masthead, corner box with round and winner, the move, the name; all page text)',ww),b,head('Close-ups',ww),c])
  img.save(f'{OUT}-{W}.png',optimize=True);print(OUT,W,img.size)
