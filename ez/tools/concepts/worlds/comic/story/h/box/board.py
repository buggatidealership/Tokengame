# /usr/bin/python3 board.py <shots> <out390> <out1280> : today's live first screen, then each style's whole path (cover, taking, taken, the four objects opened, step 4's three options, the cinema), then close-ups
import sys
from PIL import Image,ImageDraw,ImageFont
S,O3,O12=sys.argv[1:4]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
BG=(18,18,22);GOLD=(253,188,42);CR=(248,240,217);MU=(181,173,156)
STY={'ink':'Style 1 · the vault\'s brush and ink (spot gold, green, red)','logo':'Style 2 · the logo\'s own style (flat badge, hard slanted edges, speed slashes)'}
COST='paintings $1.93 (37 jobs, gpt-image-2 1K) + Hedra clips $2.84 (12 jobs) = $4.76 of $10'
def fit(im,w):return im.resize((w,round(im.height*w/im.width)),Image.LANCZOS)
def row(o,d,y,ims,caps,w,pad=14):
  x=pad;h=0
  for im,c in zip(ims,caps):
    t=fit(im,w);o.paste(t,(x,y+22));d.text((x,y+2),c,fill=GOLD,font=F(13));x+=w+pad;h=max(h,t.height)
  return y+22+h+pad
def board(W,out):
  L=lambda n:Image.open(f'{S}/{n}.png')
  cw=250 if W==390 else 420
  big=Image.new('RGB',(cw*6+14*7,9000),BG);d=ImageDraw.Draw(big)
  d.text((14,10),f'box · the first screen as one continuous scene: the box office, the loop learned by doing, the cinema · {W}px',fill=GOLD,font=F(22))
  d.text((14,40),'Every word and number is page text from ez-data.js on a surface painted blank for it (80 graded; XOM +2.17%, GPT closest; Grok holds the golden ticket, +$148,480 flat P&L, 45-27). '+COST,fill=MU,font=G(14))
  y=72;d.text((14,y),'Today (live X3+ first screen)',fill=CR,font=F(18));y+=26
  y=row(big,d,y,[L(f'live-{W}')],['live today'],cw if W==390 else cw*2)
  for s in ['ink','logo']:
    d.line((14,y,big.width-14,y),fill=(60,60,70),width=2);y+=8;d.text((14,y),STY[s],fill=CR,font=F(20));y+=30
    if W==390:
      y=row(big,d,y,[L(f'{s}-{W}-{k}') for k in ['1cover','2taking','3taken','4doors','5opening','6open']],
        ['1 the box office (ticket nudges)','scroll: the clip takes it','the ticket is yours','3 the cinema doors','scroll: the clip opens them','the film on the painted screen'],cw)
    else:
      y=row(big,d,y,[L(f'{s}-{W}-{k}') for k in ['1cover','3taken','6open']],['1 the box office (ticket nudges)','scroll: the ticket is yours','3 the cinema: the film on its screen'],cw*2-30)
    y=row(big,d,y,[L(f'{s}-{W}-a-obj{i}-closed') for i in (1,2,3)]+[L(f'{s}-{W}-{o}-obj4-closed') for o in 'abc'],
      ['2a closed: the seal wiggles','2b closed: the bell sways','2c closed: the ticket tilts','4 · A vault: the wheel turns','4 · B slip: the stamp bobs','4 · C poster: frame 1 flickers'],cw)
    y=row(big,d,y,[L(f'{s}-{W}-a-obj{i}-open') for i in (1,2,3)]+[L(f'{s}-{W}-{o}-obj4-open') for o in 'abc'],
      ['tap: the letter opens (clip)','tap: the bell rings (clip)','tap: the ticket turns (clip)','A the vault opens a crack'+(' (clip)' if s=='ink' else ''),'B the slip, stamped','C coming attractions, #1 lit'],cw)
  # close-ups at full resolution
  d.line((14,y,big.width-14,y),fill=(60,60,70),width=2);y+=8;d.text((14,y),'Close-ups (2x, unscaled crops)',fill=CR,font=F(20));y+=30
  cw2=(big.width-14*3)//2;x=14
  for n in ['ink-%d-a-obj1-open'%W,'logo-%d-a-obj2-open'%W]:
    im=L(n);c=im.crop((im.width//6,im.height//6,im.width//6+min(cw2,im.width*2//3),im.height//6+min(560,im.height*2//3)));big.paste(c,(x,y));x+=cw2+14
  y+=min(560,c.height)+20
  big.crop((0,0,big.width,y)).save(out,optimize=True)
board(390,O3);board(1280,O12)
