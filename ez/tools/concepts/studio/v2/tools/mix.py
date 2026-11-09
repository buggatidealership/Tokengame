"""python3 mix.py <out.wav> : the V2 Broadcast soundtrack (25 s). Music: hedra/music/v2-theme-a.mp3 (ElevenLabs via Hedra, 120 BPM, a phrase every 4 s).
The theme runs to the closing bell and cuts dead on it; the bell rings alone; the theme returns on a phrase start for the player of the match."""
import sys,os,subprocess,numpy as np,wave
SR=48000;D=25.0;N=int(SR*D);H=os.path.dirname(os.path.abspath(__file__))
SFX=H+'/../../../launchvid/hedra/music/';MUS=H+'/../hedra/music/v2-theme-a.mp3'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','quiet','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load(MUS)
def lay(v0,v1,m0,g=.6,fi=.03,fo=.12):
  i0,i1,j0=int(v0*SR),int(v1*SR),int(m0*SR);n=min(i1-i0,len(m)-j0);x=m[j0:j0+n].copy()
  a=int(fi*SR);b=int(fo*SR)
  if a>0:x[:a]*=np.linspace(0,1,a)[:,None]
  if b>0:x[-b:]*=np.linspace(1,0,b)[:,None]
  o[i0:i0+n]+=g*x
lay(0.0,16.0,0.0,fi=0,fo=.06)       # fixture to the bell
lay(18.4,22.0,12.0,fo=.1)           # player of the match, from a phrase start
lay(21.9,25.0,0.0,fo=1.2,g=.5)      # next fixture, the opening phrase again, fading
def put(t,n,g=1.0):
  s=load(SFX+f'sfx-{n}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*.5*s[:k]
cues=[(3.33,'whoosh',.8),(3.58,'strike',.6)]+[(4.05+.16*i,'tap',.45) for i in range(4)]+[
 (7.58,'whoosh',.45),(8.6,'beep',.55),(8.62,'flip',.6),(10.6,'whoosh',.35),(12.0,'tick',.6),
 (16.0,'bell',1.0),(16.02,'strike',.7),(18.38,'whoosh',.7)]+[(18.62+.28*i,'coin',.32) for i in range(4)]+[(19.85,'cash',.55),(21.88,'whoosh',.6),(22.8,'chime',.6)]
for c in cues: put(*c)
o=np.tanh(o*1.15)/np.tanh(1.15)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[1])
