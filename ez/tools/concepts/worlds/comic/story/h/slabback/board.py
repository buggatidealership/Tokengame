#!/usr/bin/python3
# board.py <shots dir> <width> <out.png> : today's live back first, then each take (graded film, tie, no winner, pending, mid-flip), then close-ups
import sys
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3]
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s)
G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
ROWS=[('now','Today (live T1): the comic "Graded!" certificate restyled on painted paper; the front stays in every take',['f78','78','57','51'],['front (kept) · R78 Intel','R78 Intel · graded','R57 GE Vernova · tie','R51 UPS · nobody'])]
T={'a':('A  The grader\'s bench','Each call a ticket slip stapled on in rank order; PASS/FAIL struck across its end; the close torn from the tape. Plates $0.10 (card, slip)'),
   'b':('B  The judges\' scorecard','Fight night: the founders are the fighters, Called / Off / Verdict, the bell, the decision sash. Plates $0.09 (scorecard, ring corner)'),
   'c':('C  Where they landed','Every call a pin in a painted maple board at the move it called; the close is the gold line; distance = the miss. Plates $0.12 (board, pin, desk)'),
   'd':('D  The page (pick)','One comic page: four founder panels in rank order saying their call, the verdict as captions, the close as the last tier. Plate $0.04 (+2K newsprint)')}
for k,(t,s) in T.items():ROWS.append((k,t+': '+s,['78','57','51','p80'],['R78 Intel · graded','R57 GE Vernova · tie','R51 UPS · nobody','R80 replayed as pending (mockup)']))
ph=lambda f:Image.open(f'{D}/{f}.png')
s0=ph('now-f78-%d'%W);sw,sh=s0.size
if W<600: box=(0,int(sh*.13),sw,int(sh*.86))
else: box=(int(sw*.28),0,int(sw*.72),sh)
cw=int((box[2]-box[0])*(0.5 if W<600 else 0.62));chh=int((box[3]-box[1])*cw/(box[2]-box[0]))
pad=24;hdr=74;lab=34
cols=4;Wb=pad+cols*(cw+pad)
H=pad+len(ROWS)*(hdr+chh+lab+pad)+60
# close-ups: each take's graded back, the window only, at 2x
CU=['now-57','a-57','b-57','c-57','d-57'];cuW=0
im0=ph(CU[0]+'-%d'%W)
win=(int(sw*.09),int(sh*.30),int(sw*.91),int(sh*.86)) if W<600 else (int(sw*.316),int(sh*.24),int(sw*.684),int(sh*.95))
cu_w=(Wb-pad*(len(CU)+1))//len(CU);cu_h=int(cu_w*(win[3]-win[1])/(win[2]-win[0]))
H+=hdr+cu_h+lab+pad
FL=sys.argv[4] if len(sys.argv)>4 else None
if FL: H+=hdr+1600
B=Image.new('RGB',(Wb,H),(14,12,20));d=ImageDraw.Draw(B)
d.text((pad,18),f'Round H4 · slabback: the back of the opened round · {W}px · every word and number is page text from ROUNDS / __x2pPnl',font=F(26),fill=(255,210,63))
y=60
for k,title,shots,labels in ROWS:
  d.text((pad,y+10),title[:150],font=F(17 if W<600 else 15),fill=(248,240,217));y+=hdr-30
  x=pad
  for s,l in zip(shots,labels):
    f=f'{D}/{k}-{s}-{W}.png'
    try:i=Image.open(f).crop(box).resize((cw,chh),Image.LANCZOS);B.paste(i,(x,y))
    except Exception as e:d.text((x,y+20),'missing '+s,font=G(18),fill=(255,90,90))
    d.text((x,y+chh+6),l,font=G(19),fill=(200,192,176));x+=cw+pad
  y+=chh+lab+pad+30
d.text((pad,y+10),'Close-ups: R57 GE Vernova (a tie), the turned window at full size',font=F(22),fill=(248,240,217));y+=hdr-30;x=pad
for c in CU:
  try:i=ph(c+'-%d'%W).crop(win).resize((cu_w,cu_h),Image.LANCZOS);B.paste(i,(x,y))
  except Exception:pass
  d.text((x,y+cu_h+6),{'now':'Today','a':'A bench','b':'B scorecard','c':'C landed','d':'D page'}[c.split('-')[0]],font=G(19),fill=(200,192,176));x+=cu_w+pad
if FL:
  import subprocess,os,glob,tempfile
  td=tempfile.mkdtemp();subprocess.run(['ffmpeg','-loglevel','error','-i',FL,'-vf','fps=12',td+'/f%03d.png'],check=True)
  fr=sorted(glob.glob(td+'/f*.png'));import numpy as np
  a=[np.asarray(Image.open(f).convert('L').resize((60,130))).astype(int) for f in fr];dif=[abs(a[i]-a[i-1]).mean() for i in range(1,len(a))]
  mv=[i for i,v in enumerate(dif) if v>3 and i>len(dif)//3];st=mv[0] if mv else 0;pick=[st,st+1,st+2,st+3,st+10]
  y+=cu_h+lab+pad;d.text((pad,y+10),'The turn: D on R57, recorded on the live slab (frames at 1/12 s; full clip ez/x2p-x3p-h4-slabback-flip.webm)',font=F(22),fill=(248,240,217));y+=hdr-30;x=pad
  fw=(Wb-pad*6)//5;fh=int(fw*844/390)
  for k in pick[:5]:
    k=min(k,len(fr)-1);i=Image.open(fr[k]).convert('RGB').resize((fw,fh));B.paste(i.crop((0,int(fh*.12),fw,int(fh*.86))),(x,y));x+=fw+pad
  B=B.crop((0,0,Wb,y+int(fh*.74)+pad))
B.save(OUT,optimize=True);print(OUT,B.size)
