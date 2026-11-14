#!/usr/bin/python3
# board.py <shots dir> <width> <out.png> [turn.mp4]: today's live back first, then each take on R78, R57 (tie), R51 (nobody), R80 pending replay, close-ups, the turn
import sys,json,os,glob,subprocess,tempfile
from PIL import Image,ImageDraw,ImageFont
D,W,OUT=sys.argv[1],int(sys.argv[2]),sys.argv[3];FL=sys.argv[4] if len(sys.argv)>4 else None
F=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf',s);G=lambda s:ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',s)
C=json.load(open(os.path.dirname(os.path.abspath(__file__))+'/cost.json'))
LB=['R78 Intel · graded','R57 GE Vernova · tie','R51 UPS · nobody','R80 replayed as pending (mockup)']
ROWS=[('now','Today (live T1): the comic "Graded!" certificate on painted paper; the front stays in every take',['f78','78','57','51'],['front (kept) · R78 Intel']+LB[:3])]
T=[('p3d','A  The page, 3D + comic ink',f'slabback D rebuilt: each founder in the pose of what happened (crowned / pass / hit by the stamp / predicting), his call lettered into the balloon painted in his own panel. Pose set ${C["3d"]:.2f}'),
   ('pop','B  The page, pop art',f'Same page, Lichtenstein print: sunburst grounds, Ben-Day skin, heavy ink, red title. Pose set ${C["pop"]:.2f}'),
   ('cel','C  The page, anime cel',f'Same page, anime cel frames: thin line, flat colour with one shadow tone, dark subtitle captions. Pose set ${C["cel"]:.2f}'),
   ('mix','E  Ink by outcome',f'Right calls in 3D colour; a wrong-way founder drops into noir ink (the finish is the verdict). Uses A + noir fail set ${C["noir"]:.2f}'),
   ('cov','D  The round\'s comic cover','Masthead "Round n", the close in the price box, the star of the issue as cover art (winner / both / all four), a cover line, co-stars strip. Pop set')]
for k,t,s in T:ROWS.append((k,t+': '+s,['78','57','51','p80'],LB))
ph=lambda f:Image.open(f'{D}/{f}.png')
s0=ph('now-f78-%d'%W);sw,sh=s0.size
box=(0,int(sh*.13),sw,int(sh*.86)) if W<600 else (int(sw*.28),0,int(sw*.72),sh)
cw=int((box[2]-box[0])*(0.5 if W<600 else 0.62));chh=int((box[3]-box[1])*cw/(box[2]-box[0]))
pad=24;hdr=78;lab=34;Wb=pad+4*(cw+pad)
win=(int(sw*.09),int(sh*.30),int(sw*.91),int(sh*.86)) if W<600 else (int(sw*.316),int(sh*.24),int(sw*.684),int(sh*.95))
CU=['now-78','p3d-78','pop-78','cel-78','mix-78','cov-78'];cu_w=(Wb-pad*4)//3;cu_h=int(cu_w*(win[3]-win[1])/(win[2]-win[0]))
H=pad+60+len(ROWS)*(hdr+chh+lab+pad)+hdr+2*(cu_h+lab+pad)+(hdr+1500 if FL else 0)
B=Image.new('RGB',(Wb,H),(14,12,20));d=ImageDraw.Draw(B)
d.text((pad,18),f'Round H6 · slab2: the back of the opened round · {W}px · pose by outcome, calls lettered into painted balloons, all text from ROUNDS',font=F(20),fill=(255,210,63))
y=64
def wrap(t,n):
  o=[];l=''
  for w in t.split():
    if len(l)+len(w)>n:o.append(l);l=w
    else:l=(l+' '+w).strip()
  return o+[l]
for k,title,shots,labels in ROWS:
  for j,l in enumerate(wrap(title,118 if W<600 else 150)[:2]):d.text((pad,y+6+j*22),l,font=F(17 if W<600 else 16),fill=(248,240,217))
  y+=hdr-24;x=pad
  for s,l in zip(shots,labels):
    try:i=ph(f'{k}-{s}-{W}').crop(box).resize((cw,chh),Image.LANCZOS);B.paste(i,(x,y))
    except Exception as e:d.text((x,y+20),'missing '+s,font=G(18),fill=(255,90,90))
    d.text((x,y+chh+6),l,font=G(19),fill=(200,192,176));x+=cw+pad
  y+=chh+lab+pad+24
d.text((pad,y+10),'Close-ups: R78 Intel, the turned window at full size (today, A, B, C, E, D)',font=F(22),fill=(248,240,217));y+=hdr-30
for n,c in enumerate(CU):
  x=pad+(n%3)*(cu_w+pad);yy=y+(n//3)*(cu_h+lab+pad)
  try:i=ph(c+'-%d'%W).crop(win).resize((cu_w,cu_h),Image.LANCZOS);B.paste(i,(x,yy))
  except Exception:pass
  d.text((x,yy+cu_h+6),{'now':'Today','p3d':'A page · 3D ink','pop':'B page · pop art','cel':'C page · anime cel','mix':'E ink by outcome','cov':'D comic cover'}[c.split('-')[0]],font=G(20),fill=(200,192,176))
y+=2*(cu_h+lab+pad)
if FL:
  td=tempfile.mkdtemp();subprocess.run(['ffmpeg','-loglevel','error','-i',FL,'-vf','fps=12',td+'/f%03d.png'],check=True)
  fr=sorted(glob.glob(td+'/f*.png'));import numpy as np
  a=[np.asarray(Image.open(f).convert('L').resize((60,130))).astype(int) for f in fr];dif=[abs(a[i]-a[i-1]).mean() for i in range(1,len(a))]
  t0=len(fr)-7*12-6;mv=[i for i,v in enumerate(dif) if v>3 and i>=t0];st=max(0,mv[0]-1) if mv else t0;pick=[st,st+2,st+3,st+4,st+12]
  d.text((pad,y+10),'The turn (kept): the pick turning on the live slab, frames at 1/12 s; full clip ez/x2p-x3p-h6-slab2-turn.mp4',font=F(22),fill=(248,240,217));y+=hdr-30;x=pad
  fw=(Wb-pad*6)//5;fh=int(fw*Image.open(fr[0]).size[1]/Image.open(fr[0]).size[0])
  for k in pick:
    k=min(k,len(fr)-1);i=Image.open(fr[k]).convert('RGB').resize((fw,fh));B.paste(i.crop((0,int(fh*.12),fw,int(fh*.86))),(x,y));x+=fw+pad
  y+=int(fh*.74)+pad
B=B.crop((0,0,Wb,y+pad));B.save(OUT,optimize=True);print(OUT,B.size)
