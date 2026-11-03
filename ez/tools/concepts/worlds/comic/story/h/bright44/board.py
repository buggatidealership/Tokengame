# /usr/bin/python3 board.py page <shots dir> <W> <out.png>   : today, A, B side by side (full Overview), the contrast table on top
# /usr/bin/python3 board.py rounds <shots dir> <W> <out.png> : Every round so far, today vs S1, S2, S3
import sys,json,os
from PIL import Image,ImageDraw,ImageFont
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',int(s))
R=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',int(s))
BG=(24,22,28);CR=(248,240,217);MU=(200,190,170)
def wrap(d,t,f,w):
  out=[];line=''
  for word in t.split():
    s=(line+' '+word).strip()
    if d.textlength(s,font=f)>w and line:out.append(line);line=word
    else:line=s
  out.append(line);return out
mode,D,W,OUT=sys.argv[1],sys.argv[2],int(sys.argv[3]),sys.argv[4]
NAMES={'now':('Today (live)','The page on one dark circuit board from top to foot.'),
 'A':('A  Colour pages','One logo ink per chapter, printed flat like a comic\'s colour page, a hard cut at each torn-paper tear: the record on cream, the cast on gold, the test on sunlit green, the bet stays night (the stakes), Up next on red. A Ben-Day shade only along each page\'s foot.'),
 'B':('B  One trading day','The logo\'s colours as light tints, lit by the hour of a trading day: the record at the morning open (pale gold), the cast at midday (sky green), the test in the afternoon (coral), the bet at the close (night), Up next the next morning (dawn rose). Light from the top of each chapter.'),
 'S1':('S1  The card shop, in daylight','shop42\'s take A repainted at late morning: honey oak and brass, the Mag 7 on emerald felt in the wall cabinet, the live belt in the glass counter, "The line · newest first" on the counter\'s plate.'),
 'S2':('S2  Today\'s section, brightened','No shop. The live case in honey oak with a brass rim, each bay the daylight repaint of the live bay, the live belt on the cream ground.'),
 'S3':('S3  The shop window, from the street','Midday outside the same shop: the Mag 7 in the display window under the striped awning, "Mag 7" on the gilded sign board, the live belt in the glass street cart on the pavement.')}
SECN={'top':'Top','record':'Every round so far','ch':'Meet the models','learn':'Smart or lucky','x2pSt':'The bet','get':'Up next / follow'}
if mode=='page':
  ids=['now','A','B'];sc=1 if W<600 else .5;ims=[]
  for k in ids:
    im=Image.open(f'{D}/page-{W}-{k}.png').convert('RGB');im=im.resize((int(W*sc),int(im.height*W*sc/im.width)),Image.LANCZOS);ims.append(im)
  cw=ims[0].width;pad=24;cols=len(ims);bw=cols*(cw+pad)+pad
  # contrast table
  C={k:json.load(open(f'{D}/contrast-{W}-{k}.json')) for k in ids}
  secs=[s for s in ['record','ch','learn','x2pSt','get'] if s in C['now']['sections']]
  d0=ImageDraw.Draw(Image.new('RGB',(10,10)))
  hh=240 if W<600 else 200;th=60+34*(len(secs)+1)+40+(100 if W<600 else 40)
  B=Image.new('RGB',(bw,hh+th+max(i.height for i in ims)+pad),BG);d=ImageDraw.Draw(B)
  x=pad
  for k,im in zip(ids,ims):
    d.text((x,16),NAMES[k][0],font=F(26 if W<600 else 30),fill=CR)
    for j,l in enumerate(wrap(d,NAMES[k][1],R(15 if W<600 else 17),cw)[:9]):d.text((x,54+j*20),l,font=R(15 if W<600 else 17),fill=MU)
    x+=cw+pad
  y=hh
  for l in wrap(d,f'Contrast at {W}px, measured on the pixels (WCAG AA: 4.5:1 body, 3:1 big). Each cell: lowest ratio of the words standing on the section\'s own ground  /  of every word in the section, paintings and buttons included. The 1.85 is today\'s dimmed "Newer" plate at the start of the belt (an inactive control) and the "?" grades printed on the empty NVIDIA and Apple slabs; the 3.00 is the numeral engraved in the silver medal. Both are live and unchanged by A and B.',F(15),bw-2*pad):d.text((pad,y),l,font=F(15),fill=CR);y+=21
  y+=10
  colw=(bw-2*pad-230)//3
  d.text((pad,y),'Section',font=F(16),fill=MU)
  for i,k in enumerate(ids):d.text((pad+230+i*colw,y),NAMES[k][0].split('  ')[0],font=F(16),fill=MU)
  y+=30
  for s in secs:
    d.text((pad,y),SECN.get(s,s),font=R(16),fill=CR)
    for i,k in enumerate(ids):
      v=C[k]['sections'][s];g=v['minG'];a=v['min']
      okg=g>=3 if g<99 else True
      txt=(f"{g:.2f}" if g<99 else '-')+f"  /  {a:.2f}"+(f"  ({v['nfail']} under)" if v['nfail'] else '')
      d.text((pad+230+i*colw,y),txt,font=R(16),fill=(120,230,150) if okg else (255,110,100))
    y+=30
  y=hh+th;x=pad
  for im in ims:B.paste(im,(x,y));x+=cw+pad
  B.save(OUT,optimize=True);print(OUT,B.size)
else:
  ids=[k for k in ['now','S2','S1','S3'] if os.path.exists(f'{D}/sec-{W}-{k}.png')]
  if W<600:
    ims=[Image.open(f'{D}/sec-{W}-{k}.png').convert('RGB') for k in ids];ims=[i.resize((W,int(i.height*W/i.width)),Image.LANCZOS) for i in ims]
    cw=W;pad=24;hh=150;B=Image.new('RGB',(len(ims)*(cw+pad)+pad,hh+max(i.height for i in ims)+pad),BG);d=ImageDraw.Draw(B);x=pad
    for k,im in zip(ids,ims):
      d.text((x,14),NAMES.get(k,('Today (live)',''))[0] if k!='now' else 'Today (live)',font=F(20),fill=CR)
      t=NAMES[k][1] if k!='now' else 'The Mag 7 case and the H41 belt on the dark board.'
      for j,l in enumerate(wrap(d,t,R(13),cw)[:7]):d.text((x,44+j*16),l,font=R(13),fill=MU)
      B.paste(im,(x,hh));x+=cw+pad
  else:
    ims=[Image.open(f'{D}/sec-{W}-{k}.png').convert('RGB') for k in ids];sc=.6;ims=[i.resize((int(i.width*sc),int(i.height*sc)),Image.LANCZOS) for i in ims]
    cw=max(i.width for i in ims);pad=28;hh=80;rows=[ims[0:2],ims[2:4]];rid=[ids[0:2],ids[2:4]]
    H=sum(max(i.height for i in r)+hh+pad for r in rows)+pad;B=Image.new('RGB',(2*(cw+pad)+pad,H),BG);d=ImageDraw.Draw(B);y=pad
    for r,ri in zip(rows,rid):
      x=pad
      for k,im in zip(ri,r):
        d.text((x,y),NAMES[k][0] if k!='now' else 'Today (live)',font=F(24),fill=CR)
        t=NAMES[k][1] if k!='now' else 'The Mag 7 case and the H41 belt on the dark board.'
        for j,l in enumerate(wrap(d,t,R(15),cw)[:2]):d.text((x,y+32+j*19),l,font=R(15),fill=MU)
        B.paste(im,(x,y+hh));x+=cw+pad
      y+=max(i.height for i in r)+hh+pad
  B.save(OUT,optimize=True);print(OUT,B.size)
