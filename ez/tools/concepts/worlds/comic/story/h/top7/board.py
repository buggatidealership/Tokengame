# /usr/bin/python3 board.py <shotdir> <width> <out.png> [scale]
# One column per take (today, A, B, C): the full top as captured, the first screen's end (664 on phones) as a red line,
# and the phone frame with How a round works scrolled under the sticky header as a red box (green when the whole section fits).
import sys,json
from PIL import Image,ImageDraw,ImageFont
d,W,out=sys.argv[1],int(sys.argv[2]),sys.argv[3];sc=float(sys.argv[4]) if len(sys.argv)>4 else 1.0
names=[('now','Today (live)'),('A','A · rows'),('B','B · 2x2, captions under'),('C','C · one block, captions outside')]
try:F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(15/sc*sc+2));f2=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
except: F=f2=ImageFont.load_default()
cols=[]
for k,lab in names:
  m=json.load(open(f'{d}/{k}-{W}.json'));im=Image.open(f'{d}/{k}-{W}-full.png').convert('RGB')
  r=im.width/W;H=min(im.height,int(((m['meet'][0] if m['meet'] else m['sec'][1])+60)*r));im=im.crop((0,0,im.width,H))
  dr=ImageDraw.Draw(im);VH=m['VH'];hd=m['hd']
  dr.line([(0,VH*r),(im.width,VH*r)],fill=(255,40,40),width=max(2,int(3*r)))
  dr.text((6,VH*r-20*r),f'first screen ends ({VH})',fill=(255,80,80),font=f2)
  top,bot,h=m['hrw'];fits=h<=VH-hd;c=(60,230,110) if fits else (255,40,40)
  y0=(top-6)*r;dr.rectangle([2,y0,im.width-3,y0+(VH-hd)*r],outline=c,width=max(3,int(4*r)))
  im=im.resize((int(im.width*sc/r),int(im.height*sc/r)))
  head=Image.new('RGB',(im.width,74),(16,14,20));hd2=ImageDraw.Draw(head)
  hd2.text((8,6),lab,fill=(255,210,31),font=F)
  hd2.text((8,30),f'How a round works {h}px · frame under header {VH-hd}px · {"FITS" if fits else "over by "+str(h-(VH-hd))}',fill=c,font=f2)
  hd2.text((8,50),f'top section {m["sec"][1]-m["sec"][0]}px · scrollW {m["sw"]}/{m["vw"]} · errors {len(m["er"])+(1 if m["err"] or m["t7"] else 0)}',fill=(220,220,220),font=f2)
  col=Image.new('RGB',(im.width,im.height+74),(16,14,20));col.paste(head,(0,0));col.paste(im,(0,74));cols.append(col)
G=16;Wt=sum(c.width for c in cols)+G*(len(cols)+1);Ht=max(c.height for c in cols)+2*G
B=Image.new('RGB',(Wt,Ht),(40,36,44));x=G
for c in cols:B.paste(c,(x,G));x+=c.width+G
B.save(out,optimize=True);print(out,B.size)
