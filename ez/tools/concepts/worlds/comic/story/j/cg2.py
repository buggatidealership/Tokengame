# /usr/bin/python3 cg2.py <out dir> <round n,...|all>: "moving pictures" for Every round so far, as true cinemagraphs.
# For each round with a film: search its second half for 1.5 s where ONE region moves and the rest holds still
# (the Harry Potter portrait), prefer moments that look like the round's poster (the board with the crown),
# freeze everything outside that region on the first frame, cross-fade the loop's seam, and write:
#   r<n>-base.jpg  the still frame (360x360), which replaces the poster in the tile
#   r<n>.webp       the cinemagraph as an animated WebP (280x280), the one the mockup uses
#   r<n>-cg.mp4    the same cinemagraph as a whole-tile H.264 loop (for the cost comparison)
import sys,os,json,subprocess,numpy as np
from PIL import Image,ImageFilter
EZ='/home/user/Tokengame/ez'
OUT=sys.argv[1];os.makedirs(OUT,exist_ok=True)
F=json.loads(subprocess.check_output(['node','-e',"global.window=global;eval(require('fs').readFileSync('%s/ez-data.js','utf8'));console.log(JSON.stringify(FILMS))"%EZ]))
want=sys.argv[2] if len(sys.argv)>2 else 'all'
ns=sorted(F,key=int) if want=='all' else want.split(',')
FPS=12;L=18;K=5;S=96;R=360
def frames(src,ss=None,n=None,size=S,gray=True):
  a=['ffmpeg','-v','error']+(['-ss',f'{ss:.3f}'] if ss is not None else [])+['-i',src]+(['-frames:v',str(n)] if n else [])
  a+=['-vf',f'fps={FPS},crop=in_h:in_h,scale={size}:{size}:flags=area,format='+('gray' if gray else 'rgb24'),'-f','rawvideo','-']
  raw=subprocess.check_output(a);c=1 if gray else 3
  return np.frombuffer(raw,np.uint8).reshape(-1,size,size,c).astype(np.float32)
meta=json.load(open(f'{OUT}/meta.json')) if os.path.exists(f'{OUT}/meta.json') else {}
for n in ns:
  f=F[n];mp4=f'{EZ}/media/{f["f"]}.mp4';po=f'{EZ}/media/{f["p"]}.jpg'
  if not os.path.exists(mp4):continue
  g=frames(mp4)[...,0];N=len(g)
  P=np.asarray(Image.open(po).convert('L').resize((S,S)),np.float32)
  d2p=np.abs(g-P).mean(axis=(1,2));step=np.r_[0,np.abs(np.diff(g,axis=0)).mean(axis=(1,2))]
  best=None
  # only after the board has settled on its final numbers (the frame first looks like the poster), so a counting
  # number can never show a different move than the round's (owner rule: the picture must not tell another story)
  settle=int(np.argmax(d2p<=d2p.min()+6))
  for s in range(max(int(N*.45),settle),N-L-K-1,2):
    w=g[s:s+L+K]
    if step[s+1:s+L+K].max()>9:continue
    sd=w.std(axis=0);mv=sd>5;fr=mv.mean()
    if fr<.015 or fr>.40:continue
    still=sd[~mv].mean()                       # how still the rest is
    amp=sd[mv].mean();clo=np.abs(w[0]-w[L])[mv].mean()   # the seam: how far the moving part is from where it started
    sc=min(amp,25)*np.sqrt(fr)-3*still-0.15*d2p[s]-0.25*clo
    if best is None or sc>best[0]:best=(sc,s,fr,amp,still,d2p[s])
  if not best:print(n,'no cinemagraph window after the board settles: keeps its poster',flush=True);meta.pop(n,None);continue
  sc,s,fr,amp,still,dp=best
  c=frames(mp4,ss=s/FPS,n=L+K,size=R,gray=False)  # L+K frames, RGB, 360
  if len(c)<L+K:print(n,'short');continue
  sd=c.mean(axis=3).std(axis=0)
  m=(sd>6).astype(np.uint8)*255
  mi=Image.fromarray(m).filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(7))
  A=np.asarray(mi,np.float32)/255;A=np.clip(A*1.6,0,1)[...,None]
  base=c[0]
  out=[]
  for j in range(L):
    fj=c[j] if j>=K else c[j]*(j/K)+c[L+j]*(1-j/K)      # seam cross-fade: frame L-1 runs on into frame 0
    out.append(fj*A+base*(1-A))
  ys,xs=np.where(A[...,0]>.02);x0,x1,y0,y1=xs.min(),xs.max()+1,ys.min(),ys.max()+1
  x0-=x0%2;y0-=y0%2;x1+=x1%2;y1+=y1%2;pw,ph=x1-x0,y1-y0
  Image.fromarray(base.astype(np.uint8)).save(f'{OUT}/r{n}-base.jpg',quality=80)
  if os.environ.get('PATCH'):   # the sprite-strip route, measured once: 124 to 406 KB per tile, so not used
    strip=Image.new('RGBA',(pw*L,ph))
    for j,o in enumerate(out):
      rgba=np.concatenate([o[y0:y1,x0:x1],A[y0:y1,x0:x1]*255],axis=2).clip(0,255).astype(np.uint8)
      strip.paste(Image.fromarray(rgba,'RGBA'),(j*pw,0))
    strip.save(f'{OUT}/r{n}-patch.webp','WEBP',quality=60,method=6)
  tmp=f'{OUT}/_t{n}';os.makedirs(tmp,exist_ok=True)
  for j,o in enumerate(out):Image.fromarray(o.clip(0,255).astype(np.uint8)).save(f'{tmp}/{j:02d}.png')
  subprocess.check_call(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i',f'{tmp}/%02d.png','-vf','scale=280:280:flags=lanczos','-c:v','libwebp_anim','-lossless','0','-q:v','62','-loop','0','-an',f'{OUT}/r{n}.webp'])
  subprocess.check_call(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i',f'{tmp}/%02d.png','-vf','scale=280:280','-c:v','libx264','-crf','28','-pix_fmt','yuv420p','-movflags','+faststart','-an',f'{OUT}/r{n}-cg.mp4'])
  for x in os.listdir(tmp):os.remove(f'{tmp}/{x}')
  os.rmdir(tmp)
  meta[n]={'L':L,'fps':FPS,'t0':round(s/FPS,2),'movingShare':round(float(fr),3),'rest':round(float(still),2),'lookLikePoster':round(float(dp),1),
    'box':[int(x0),int(y0),int(pw),int(ph)],'size':R,'base':os.path.getsize(f'{OUT}/r{n}-base.jpg'),'webp':os.path.getsize(f'{OUT}/r{n}.webp'),'mp4':os.path.getsize(f'{OUT}/r{n}-cg.mp4')}
  print(n,meta[n],flush=True)
  json.dump(meta,open(f'{OUT}/meta.json','w'))
