#!/usr/bin/python3
# board.py <shots dir>: writes ez/x2p-x3p-h14-sol6-390.png (today first, each take, then close-ups) and -1280.png
import sys,textwrap
from PIL import Image,ImageDraw,ImageFont
D=sys.argv[1];E='/home/user/Tokengame/ez/'
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
TK=[('now','Today live: the big board (chalk on the exchange slate)',''),
 ('h','PICK (H): E3 a third smaller; caption L1 (classic letterer, gold box) straddling the plate\'s top-left frame; the polygraph at 2K: four pen arms on the brass rail, nibs on each line end, the strip\'s timing ticks running; "Only the record..." as the closing caption','2K plate $0.28 on $0.30 of roughs'),
 ('a','A: the same at 1K (rough plate)','$0.04'),
 ('b','B: caption L2, the owner\'s hand (Shantell Sans, mixed case, cream narration paper), tucked into the corner','same plate'),
 ('c','C: caption L3, the shout (red box, Bangers, the count big, 50% in gold), hanging further out over the ground','same plate'),
 ('d','D: E3 two thirds wide with the title stacked beside it; the polygraph seen from above (bird\'s-eye desk)','$0.04')]
op=lambda n:(lambda p:Image.open(p).convert('RGB'))(f'{D}/{n}')
def lab(d,x,y,t,w,s=24,c='#ffd21f'):
  L=textwrap.wrap(t,int(w/(s*.62)));d.multiline_text((x,y),'\n'.join(L),font=F(s),fill=c,spacing=4);return 30*len(L)
def b390():
  cols=[]
  for t,l,c in TK:
    ims=[op(f's6-{t}-hit-390.png')]
    if t in('h',):ims.append(op(f's6-{t}-season-390.png'))
    cols.append((l+('  ·  '+c if c else ''),ims))
  cw=780;ch=max(sum(i.height+40 for i in ims) for _,ims in cols)
  # close-ups: the three captions and the pens, at 2x
  def cr(f,a,b,c_,d_):im=op(f);W,H=im.size;return im.crop((int(a*W),int(b*H),int(c_*W),int(d_*H)))
  cl=[('L1 classic letterer (pick)',cr('s6-h-hit-390.png',0,.205,1,.29)),('L2 the owner\'s hand',cr('s6-b-hit-390.png',0,.205,1,.29)),
      ('L3 the shout',cr('s6-c-hit-390.png',0,.2,1,.3)),('The pens: nibs on the line ends, ticks feeding left (pick)',cr('s6-h-hit-390.png',0,.33,1,.43)),
      ('P&L Season on the strip: one row of four (pick)',cr('s6-h-season-390.png',0,.33,1,.43)),('Closing caption on the voice panels (pick)',cr('s6-h-hit-390.png',0,.54,1,.64))]
  clh=max(i.height for _,i in cl)
  B=Image.new('RGB',(len(cols)*(cw+24)+24,ch+190+clh+120),'#1b1b1f');d=ImageDraw.Draw(B)
  for k,(l,ims) in enumerate(cols):
    x=24+k*(cw+24);lab(d,x,14,l,cw);y=180
    for j,i in enumerate(ims):
      if j:d.text((x,y-4),'the same chapter, switched to P&L · Season',font=F(20),fill='#9ff7c6');y+=26
      B.paste(i,(x,y));y+=i.height+10
  y0=ch+200;d.text((24,y0),'Close-ups (2x)',font=F(30),fill='#ffffff');y0+=50
  for k,(l,i) in enumerate(cl):
    x=24+k*(cw+24);d.text((x,y0),l,font=F(20),fill='#ffd21f');B.paste(i,(x,y0+30))
  B.save(E+'x2p-x3p-h14-sol6-390.png',optimize=True);print('390',B.size)
def b1280():
  rows=[]
  for t,l,c in TK:
    if t=='a':continue
    ims=[op(f's6-{t}-hit-1280.png')]
    if t=='h':ims.append(op('s6-h-season-1280.png'))
    rows.append((l+('  ·  '+c if c else ''),[i.resize((i.width*45//100,i.height*45//100)) for i in ims]))
  rw=max(sum(i.width+20 for i in ims) for _,ims in rows);rw=max(rw,1200);rh=[max(i.height for i in ims) for _,ims in rows]
  B=Image.new('RGB',(rw+40,sum(rh)+len(rows)*110+20),'#1b1b1f');d=ImageDraw.Draw(B);y=20
  for (l,ims),h in zip(rows,rh):
    y+=lab(d,20,y,l+('   (left: hit rate · right: P&L Season)' if len(ims)>1 else ''),rw)+14;x=20
    for i in ims:B.paste(i,(x,y));x+=i.width+20
    y+=h+30
  B.save(E+'x2p-x3p-h14-sol6-1280.png',optimize=True);print('1280',B.size)
b390();b1280()
