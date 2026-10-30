# /usr/bin/python3 cg.py [n,...]: the "one living thing" of each film, hand-picked (no words or numbers in it), as
# patches laid over the tile's still, so nothing outside the box can ever move.
#   cg/r<n>-still.jpg   the settled board (looks like the poster: final numbers, the crown), the tile's picture
#   cg/r<n>.webp        an RGBA animated layer, clear outside the box: the thing moving, soft-edged, a seamless loop (O2, O3)
#   cg/r<n>-lit.webp    an RGBA still patch of the box: the same spot with its lights up (O1 breathes its opacity)
# BOX: [x0,y0,x1,y1] in fractions of the square frame, chosen from scan.py's sheet. A key with "P" is the film panel's
# version (bigger, its own pick). The loop may come from any moment where the camera holds still around the box,
# so the box's motion is laid over the final board (the numbers outside it are always the final ones).
import sys,os,json,subprocess,numpy as np
from PIL import Image,ImageFilter
EZ='/home/user/Tokengame/ez';HERE=os.path.dirname(os.path.abspath(__file__));OUT=HERE+'/cg';os.makedirs(OUT,exist_ok=True)
F=json.loads(subprocess.check_output(['node','-e',"global.window=global;eval(require('fs').readFileSync('%s/ez-data.js','utf8'));console.log(JSON.stringify(FILMS))"%EZ]))
# 53 (the clay child), 61 (Clippy), 59 (minifigures), 58 (conveyor), 56 (city) found no loop: the camera moves round them or they stand still once the board settles, so they stay stills.
BOX={'64':[0,.86,1,1],'62':[.66,.58,.82,.76],'61':[.6,.26,.76,.39],'60':[.38,.82,.68,.97],'59':[.03,.78,.4,.95],'58':[.32,.36,.68,.68],
 '57':[.05,0,.55,.42],'56':[.66,.02,.98,.22],'55':[.4,.27,.55,.53],'54':[.3,.13,.8,.27],'53':[.2,.52,.3,.68],'52':[0,.62,.3,.98],
 '51':[.08,.62,.32,.88],'50':[.22,.18,.62,.36],'55P':[.38,.2,.6,.55]}
SZ={'P':720};PATCH={'P':560}
FPS=12;L=24;K=6;S=128
want=sys.argv[1].split(',') if len(sys.argv)>1 else list(BOX)
def frames(src,size,gray,ss=None,n=None):
  a=['ffmpeg','-v','error']+(['-ss',f'{ss:.3f}'] if ss is not None else [])+['-i',src]+(['-frames:v',str(n)] if n else [])
  a+=['-vf',f'fps={FPS},crop=in_h:in_h,scale={size}:{size}:flags=area,format='+('gray' if gray else 'rgb24'),'-f','rawvideo','-']
  c=1 if gray else 3;return np.frombuffer(subprocess.check_output(a),np.uint8).reshape(-1,size,size,c).astype(np.float32)
meta=json.load(open(OUT+'/meta.json')) if os.path.exists(OUT+'/meta.json') else {}
for key in want:
  n=key.rstrip('P');big=key.endswith('P');R=SZ['P'] if big else 360;PW=PATCH['P'] if big else 280
  f=F[n];mp4=f'{EZ}/media/{f["f"]}.mp4';po=f'{EZ}/media/{f["p"]}.jpg'
  x0,y0,x1,y1=BOX[key];g=frames(mp4,S,True)[...,0];N=len(g)
  P=np.asarray(Image.open(po).convert('L').resize((S,S)),np.float32)
  d2p=np.abs(g-P).mean(axis=(1,2));bi=int(np.argmin(d2p))            # the base: the frame most like the poster
  bx=np.zeros((S,S),bool);bx[int(y0*S):int(np.ceil(y1*S)),int(x0*S):int(np.ceil(x1*S))]=True
  ring=np.asarray(Image.fromarray(bx.astype(np.uint8)*255).filter(ImageFilter.MaxFilter(9)))>0;near=ring&~bx  # a band round the box
  best=None
  for s in range(0,N-L-K-1):
    w=g[s:s+L+K]
    if np.abs(w[:,near]-g[bi][near]).mean(axis=1).max()>7:continue    # the camera must hold still around the box
    sd=w.std(axis=0)[bx];mv=sd>4;fr=mv.mean()
    if fr<.03:continue
    amp=sd[mv].mean();clo=np.abs(w[0]-w[L])[bx].mean()
    sc=min(amp,18)*np.sqrt(fr)-0.6*clo
    if best is None or sc>best[0]:best=(sc,s,fr,amp,clo)
  if not best:print(key,'nothing moves in the box with the camera still');continue
  sc,s,fr,amp,clo=best
  base=frames(mp4,R,False,ss=bi/FPS,n=1)[0]
  c=frames(mp4,R,False,ss=s/FPS,n=L+K)
  X0,Y0,X1,Y1=int(x0*R),int(y0*R),int(np.ceil(x1*R)),int(np.ceil(y1*R));X0-=X0%2;Y0-=Y0%2;X1+=X1%2;Y1+=Y1%2;X1=min(X1,R);Y1=min(Y1,R)
  sd=c.mean(axis=3).std(axis=0);m=np.zeros((R,R),np.uint8);m[Y0:Y1,X0:X1]=((sd[Y0:Y1,X0:X1]>5)*255).astype(np.uint8)
  e=max(3,R//60)
  A=np.asarray(Image.fromarray(m).filter(ImageFilter.MaxFilter(2*(e//2)+1)).filter(ImageFilter.GaussianBlur(e)),np.float32)/255
  A=np.clip(A*1.5,0,1);fe=np.zeros((R,R),np.float32);fe[Y0:Y1,X0:X1]=1           # never past the box: feather its own edge
  fe=np.asarray(Image.fromarray((fe*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(e*.8)),np.float32)/255;A=(A*fe)[...,None]
  out=[]
  for j in range(L):
    fj=c[j] if j>=K else c[j]*(j/K)+c[L+j]*(1-j/K)
    out.append(fj)
  sx=f'r{key}'
  Image.fromarray(base.astype(np.uint8)).save(f'{OUT}/{sx}-still.jpg',quality=82)
  pw,ph=X1-X0,Y1-Y0;k=PW/R;tw,th=max(2,round(pw*k)),max(2,round(ph*k))
  tmp=f'{OUT}/_t{key}';os.makedirs(tmp,exist_ok=True)
  for j,o in enumerate(out):
    rgba=np.concatenate([o,A*255],axis=2).clip(0,255).astype(np.uint8)   # the whole frame, clear outside the box: it lays over the still with the same crop
    Image.fromarray(rgba,'RGBA').resize((PW,PW),Image.LANCZOS).save(f'{tmp}/{j:02d}.png')
  # played at 9 fps: the film's own motion at three quarters of its speed (slower reads calmer)
  subprocess.check_call(['ffmpeg','-v','error','-y','-framerate','9','-i',f'{tmp}/%02d.png','-c:v','libwebp_anim','-lossless','0','-q:v','70','-loop','0','-pix_fmt','yuva420p','-an',f'{OUT}/{sx}.webp'])
  for x in os.listdir(tmp):os.remove(f'{tmp}/{x}')
  os.rmdir(tmp)
  # O1: the same spot lit: its brighter half lifted and warmed, as a lamp coming up
  b=base[Y0:Y1,X0:X1];lum=b.mean(axis=2);t=np.percentile(lum,55);w=np.clip((lum-t)/(lum.max()-t+1e-3),0,1)[...,None]
  lit=np.clip(b*(1+.55*w)+np.array([28,20,6])*w,0,255)
  bl=np.asarray(Image.fromarray(lit.astype(np.uint8)).filter(ImageFilter.GaussianBlur(e)),np.float32);lit=np.clip(np.maximum(lit,bl*1.05),0,255)
  fe2=fe[Y0:Y1,X0:X1][...,None];al=(fe2*np.clip(w*1.6+.15,0,1))*255
  full=np.zeros((R,R,4),np.float32);full[Y0:Y1,X0:X1]=np.concatenate([lit,al],axis=2)
  Image.fromarray(full.astype(np.uint8),'RGBA').resize((PW,PW),Image.LANCZOS).save(f'{OUT}/{sx}-lit.webp',quality=80)
  meta[key]={'box':[round(X0/R,4),round(Y0/R,4),round((X1-X0)/R,4),round((Y1-Y0)/R,4)],'base_s':round(bi/FPS,2),'loop_s':round(s/FPS,2),'moving':round(float(fr),3),'amp':round(float(amp),1),
    'seam':round(float(clo),1),'still':os.path.getsize(f'{OUT}/{sx}-still.jpg'),'webp':os.path.getsize(f'{OUT}/{sx}.webp'),'lit':os.path.getsize(f'{OUT}/{sx}-lit.webp')}
  print(key,meta[key],flush=True)
json.dump(meta,open(OUT+'/meta.json','w'),indent=0)
