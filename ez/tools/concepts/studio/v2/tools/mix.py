"""python3 mix.py <T.json> <out.wav> : the V2 Broadcast soundtrack. T.json is window.__T, written by render.js, so a round without a path stays in sync.
Music: hedra/music/v2-theme-a.mp3 (ElevenLabs via Hedra, 120 BPM, a phrase every 4 s). It runs to the closing bell and cuts dead on it; the bell rings alone;
the theme returns on a phrase start for the winner card and again for the next trades."""
import sys,os,json,subprocess,numpy as np,wave
T=json.load(open(sys.argv[1]));SR=48000;D=T['end'];N=int(SR*D);H=os.path.dirname(os.path.abspath(__file__))
SFX=H+'/../../../launchvid/hedra/music/';MUS=H+'/../hedra/music/v2-theme-a.mp3'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','quiet','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load(MUS)
def lay(v0,v1,m0,g=.6,fi=.03,fo=.12):
  i0,i1,j0=int(v0*SR),min(N,int(v1*SR)),int(m0*SR);n=min(i1-i0,len(m)-j0);x=m[j0:j0+n].copy()
  a=int(fi*SR);b=int(fo*SR)
  if a>0:x[:a]*=np.linspace(0,1,a)[:,None]
  if b>0:x[-b:]*=np.linspace(1,0,b)[:,None]
  o[i0:i0+n]+=g*x
lay(0.0,T['fin'],0.0,fi=0,fo=.05)
lay(T['po'],T['nx']+.1,12.0,fo=.1)
lay(T['nx'],D,0.0,fo=1.0,g=.5)
def put(t,n,g=1.0):
  s=load(SFX+f'sfx-{n}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*.5*s[:k]
cues=[(T['st0']-.02,'whoosh',.8),(T['st0']+.23,'strike',.6)]+[(T['st1']+.05+.16*i,'tap',.45) for i in range(4)]+[
 (T['lu1']-.02,'whoosh',.45),(T['ev'],'flip',.6)]
if T['L1']>T['L0']:cues+=[(T['L1'],'whoosh',.3),(T['L2'],'tick',.6)]
cues+=[(T['fin'],'bell',1.0),(T['fin']+.02,'strike',.7),(T['po']-.02,'whoosh',.7)]+[(T['po']+.62+.25*i,'coin',.32) for i in range(4)]+[(T['po']+1.75,'cash',.55),(T['nx']-.02,'whoosh',.6),(T['nx']+.9,'chime',.6)]
for c in cues: put(*c)
o=np.tanh(o*1.15)/np.tanh(1.15)
w=wave.open(sys.argv[2],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[2],D,'s')
