"""Score and sound for V3 Painted cinema (24.8 s). python3 mix.py <out.wav> [round json from cues.js]
Cues follow the timeline in index.html (T); the lantern cues are per AI that goes out, so a round passes its counts in."""
import sys,subprocess,numpy as np,wave,json,os
SR=48000;D=24.8;N=int(SR*D);H=os.path.dirname(os.path.abspath(__file__))+'/../../launchvid/hedra/music/'
T=dict(night=6.2,bell=9.2,move=11.8,out=15.0,win=17.8,end=20.4)
out=sys.argv[1];nout=int(sys.argv[2]) if len(sys.argv)>2 else 3;nwin=int(sys.argv[3]) if len(sys.argv)>3 else 1
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2))
m=load(H+'v3-score2.mp3');m=m/ max(1e-6,np.sqrt(np.mean(m**2)))*.12
n=min(N,len(m));env=np.ones(n)
# duck the score under the bell and the move, so the two sounds of the story land
for a,b in [(T['bell']-.1,T['move']+.6)]:
  i,j=int(a*SR),int(b*SR);env[i:j]=np.minimum(env[i:j],.35)
env=np.convolve(env,np.ones(4800)/4800,'same');o[:n]+=m[:n]*env[:,None]
fo=int(1.2*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  f=H+(name if name.endswith('.mp3') else f'sfx-{name}.mp3');s=load(f);s=s/max(1e-6,np.abs(s).max());i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(T['night'],'clock',.22),(T['bell']+1.55,'bell',.55),(T['move']+.05,'boom',.45)]
cues+=[(T['out']+.35+j*.42,'v3-sfx-snuff.mp3',.42) for j in range(nout)]
if nwin: cues+=[(T['out']+.35+nout*.42+.1,'v3-sfx-lantern.mp3',.4),(T['win']+.05,'chime',.35),(T['win']+.2,'cash',.25)]
cues+=[(T['end']+.2,'whoosh',.2)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.1)/np.tanh(1.1)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
