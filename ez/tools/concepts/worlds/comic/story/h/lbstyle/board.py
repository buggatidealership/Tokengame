#!/usr/bin/python3
# board.py <shots dir> : ez/x2p-x3p-h6-lbstyle-390.png and -1280.png (today first, then A, B, C), from run.js output.
import sys,os
from PIL import Image,ImageDraw,ImageFont
S=sys.argv[1];EZ=os.path.abspath(os.path.dirname(__file__)+'/../../../../../../..')
F=lambda n:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%n,1)
def font(sz,b=False):return ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans%s.ttf'%('-Bold' if b else ''),sz)
T=[('now','Today, live','The fight bill, scoreboard S3 and proof as they are on earningszn.xyz.','—'),
   ('a','A · Noir ink, "the case file"  (my pick)','Rain and lamplight; the noir cast (ticket / challenger poses), mugshots on the office wall, grease pencil on the window. Colour only for facts: gold ticket, green/red money.','$2.58 (4 grounds, 2 redone at 2K, 8 poses, 4 living loops)'),
   ('b','B · Anime cel, "the tournament arc"','The fighters’ own colours are the bill’s two halves; arena, club-room board, rooftop at dusk; cel cast; the chapter turn is an anime eyecatch.','$1.68 (3 grounds, 8 poses)'),
   ('c','C · Mix, noir x pop','Noir scenes and cast, but the facts printed in the Overview’s pop lettering; the headline on a lit pop billboard painted into the street.','$0.03 (the billboard street) + A’s art')]
def wrap(d,txt,f,w):
  out=[];line=''
  for wd in txt.split():
    t=(line+' '+wd).strip()
    if d.textlength(t,font=f)>w: out.append(line);line=wd
    else: line=t
  out.append(line);return out
def label(w,t):
  im=Image.new('RGB',(w,150),'#111');d=ImageDraw.Draw(im);d.text((10,10),t[1],font=font(19,True),fill='#f3e9cf')
  y=40
  for l in wrap(d,t[2],font(14),w-20):d.text((10,y),l,font=font(14),fill='#cfc6b2');y+=19
  d.text((10,128),'Hedra: '+t[3],font=font(13),fill='#e2b33c');return im
def col(im,w):return im.resize((w,round(im.size[1]*w/im.size[0])),Image.LANCZOS)
def board(width,cw,rows,out):
  cols=[]
  for t in T:
    parts=[label(cw,t)]
    for r in rows:
      f=f'{S}/{r}-{t[0]}-{width}.png' if r!='z' else f'{S}/z-{t[0]}.png'
      if os.path.exists(f):
        cap=Image.new('RGB',(cw,30),'#222');ImageDraw.Draw(cap).text((10,7),{'lb':'Season window (default)','d1':'after tapping “Last 24 hours”','z':'close-up, 3x, at 320px (the narrowest phone)'}[r],font=font(14,True),fill='#f3e9cf')
        parts+= [cap,col(Image.open(f).convert('RGB'),cw)]
    cols.append(parts)
  H=max(sum(p.size[1] for p in c) for c in cols)
  B=Image.new('RGB',(len(cols)*(cw+16)+16,H+80),'#e8e2d2');d=ImageDraw.Draw(B)
  d.text((16,18),f'EZ X3+ · Round H6 · lbstyle: the Leaderboard tab as a chapter in another ink · {width}px',font=font(26,True),fill='#111')
  for i,c in enumerate(cols):
    y=64
    for p in c:B.paste(p,(16+i*(cw+16),y));y+=p.size[1]
  B.save(out,optimize=True);print(out,B.size)
board(390,390,['lb','d1','z'],f'{EZ}/x2p-x3p-h6-lbstyle-390.png')
board(1280,640,['lb'],f'{EZ}/x2p-x3p-h6-lbstyle-1280.png')
