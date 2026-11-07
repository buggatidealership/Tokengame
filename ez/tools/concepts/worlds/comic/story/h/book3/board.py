# /usr/bin/python3 board.py <shots dir> <out390> <out1280> : the whole Overview as one long column per take (the page's own screen
# slices stacked top to bottom, so a sticky take reads as the screens you scroll through), then a row of every hand-over.
import sys,glob,os
from PIL import Image,ImageDraw,ImageFont
D,O3,O12=sys.argv[1:4]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
L={'now':'Today (live)','r1':'R1 · Page and gutter: inked panels, 10px gutters, captions straddle the gutter, splash per chapter','r2':'R2 · One long picture: painted bridges continue each world into the next, narration on painted signs',
   'r3':'R3 · Turn the page: each chapter a page; read to its foot, the next page slides over it','d2':'D2 · The spread (desktop): left page = the painted hand-over, pinned; right page = the chapter'}
def wrap(d,x,y,t,w,f):
  line='';
  for wd in t.split():
    if d.textlength(line+' '+wd,font=f)>w and line:d.text((x,y),line,fill=(248,240,217),font=f);y+=f.size+4;line=wd
    else:line=(line+' '+wd).strip()
  d.text((x,y),line,fill=(248,240,217),font=f);return y+f.size+4
def board(W,cw,takes,out,hw):
  cols=[];g=24
  for t in takes:
    fs=sorted(glob.glob(f'{D}/{t}-{W}-s*.png'))
    if not fs:continue
    ims=[Image.open(f).convert('RGB') for f in fs];k=cw/ims[0].width
    h=sum(round(i.height*k) for i in ims);col=Image.new('RGB',(cw,h));y=0
    for i in ims:j=i.resize((cw,round(i.height*k)));col.paste(j,(0,y));y+=j.height
    cols.append((t,col))
  hs=[]
  for t,_ in cols:
    fs=sorted(glob.glob(f'{D}/{t}-{W}-h*.png'))
    hs.append([Image.open(f).convert('RGB') for f in fs])
  top=150;mh=max(c.height for _,c in cols)
  hh=max((round(i[0].height*hw/i[0].width) if i else 0) for i in hs)
  nh=max(len(i) for i in hs)
  Wb=max(g+len(cols)*(cw+g), 300+nh*(hw+12)+g);Hb=top+mh+90+len(cols)*(hh+70)+g
  cv=Image.new('RGB',(Wb,Hb),(18,18,22));d=ImageDraw.Draw(cv)
  d.text((g,18),f'book3 · the whole Overview as one scrolled comic, {W}px wide · full page per take (screen slices, top to bottom)',fill=(253,188,42),font=F(30))
  for n,(t,c) in enumerate(cols):
    x=g+n*(cw+g);wrap(d,x,66,L[t],cw,F(17));cv.paste(c,(x,top))
  y=top+mh+30;d.text((g,y),'Every hand-over: the cut between two chapters in the middle of the screen',fill=(253,188,42),font=F(28));y+=50
  for (t,_),row in zip(cols,hs):
    wrap(d,g,y+10,L[t].split(':')[0],270,F(20))
    for i,im in enumerate(row):cv.paste(im.resize((hw,round(im.height*hw/im.width))),(300+i*(hw+12),y))
    y+=hh+70
  cv.save(out,optimize=True);print(out,cv.size)
board(390,300,['now','r1','r2','r3'],O3,260)
board(1280,560,['now','r1','r2','r3','d2'],O12,420)
