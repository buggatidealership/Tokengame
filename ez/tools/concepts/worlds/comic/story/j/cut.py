# /usr/bin/python3 cut.py <out dir> <round n,...|all>: "moving pictures" for Every round so far.
# For each round with a film: find the moment that looks like the tile's poster (so the tile keeps today's picture),
# then the most loopable 1 to 1.7 s around it (first and last frame alike, gentle motion, no cut),
# and write it as one horizontal sprite strip (WebP) plus a tiny mp4 of the same loop for comparison.
import sys,os,json,subprocess,numpy as np
from PIL import Image
EZ='/home/user/Tokengame/ez'
OUT=sys.argv[1];os.makedirs(OUT,exist_ok=True)
F=json.loads(subprocess.check_output(['node','-e',"global.window=global;eval(require('fs').readFileSync('%s/ez-data.js','utf8'));console.log(JSON.stringify(FILMS))"%EZ]))
want=sys.argv[2] if len(sys.argv)>2 else 'all'
ns=sorted(F,key=int) if want=='all' else want.split(',')
FPS=12;S=48;TW,TH=280,240
def gray(src,fps=FPS):
  raw=subprocess.check_output(['ffmpeg','-v','error','-i',src,'-vf',f'fps={fps},crop=in_h*1:in_h*1,scale={S}:{S},format=gray','-f','rawvideo','-'])
  return np.frombuffer(raw,np.uint8).reshape(-1,S,S).astype(np.float32)
meta={}
for n in ns:
  f=F[n];mp4=f'{EZ}/media/{f["f"]}.mp4';po=f'{EZ}/media/{f["p"]}.jpg'
  if not os.path.exists(mp4):print(n,'no file');continue
  g=gray(mp4);P=np.asarray(Image.open(po).convert('L').resize((S,S)),np.float32)
  N=len(g);d2p=np.abs(g-P).mean(axis=(1,2));t=int(np.argmin(d2p))
  step=np.r_[0,np.abs(np.diff(g,axis=0)).mean(axis=(1,2))]
  best=None
  for L in range(12,21):
    for s in range(max(0,t-36),min(N-L,t+36)):
      e=s+L-1;mot=step[s+1:e+1]
      if mot.max()>14:continue                       # a cut or a whip: not a portrait
      clo=np.abs(g[s]-g[e]).mean()
      m=mot.mean();sc=min(m,3.5)-1.6*clo-0.04*abs(s+L/2-t)
      if m<0.35:sc-=2                                 # a still frame is not alive
      if best is None or sc>best[0]:best=(sc,s,L,clo,m)
  if not best:print(n,'no window');continue
  sc,s,L,clo,m=best
  tmp=f'{OUT}/_f{n}';os.makedirs(tmp,exist_ok=True)
  subprocess.check_call(['ffmpeg','-v','error','-y','-ss',f'{s/FPS:.3f}','-i',mp4,'-frames:v',str(L),'-vf',f'fps={FPS},crop=in_h:in_h*{TH/TW:.4f},scale={TW}:{TH}:flags=lanczos',f'{tmp}/%02d.png'])
  fr=sorted(os.listdir(tmp));L=len(fr)
  strip=Image.new('RGB',(TW*L,TH))
  for i,x in enumerate(fr):strip.paste(Image.open(f'{tmp}/{x}').convert('RGB'),(i*TW,0))
  strip.save(f'{OUT}/r{n}.webp','WEBP',quality=58,method=6)
  subprocess.check_call(['ffmpeg','-v','error','-y','-framerate',str(FPS),'-i',f'{tmp}/%02d.png','-c:v','libx264','-crf','30','-pix_fmt','yuv420p','-movflags','+faststart','-an',f'{OUT}/r{n}.mp4'])
  for x in fr:os.remove(f'{tmp}/{x}')
  os.rmdir(tmp)
  meta[n]={'L':L,'t0':round(s/FPS,2),'poster_at':round(t/FPS,2),'closure':round(float(clo),2),'motion':round(float(m),2),'webp':os.path.getsize(f'{OUT}/r{n}.webp'),'mp4':os.path.getsize(f'{OUT}/r{n}.mp4')}
  print(n,meta[n],flush=True)
old={}
if os.path.exists(f'{OUT}/meta.json'):old=json.load(open(f'{OUT}/meta.json'))
old.update(meta);json.dump(old,open(f'{OUT}/meta.json','w'),indent=0)
