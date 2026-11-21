"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation C.
python3 mix5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=13.0;N=int(SR*D);H='../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.05,'boom',.3),(0.35,'tap',.35),(0.45,'tap',.35),(0.55,'tap',.35),(0.65,'tap',.35),(1.3,'whoosh',.35),(1.55,'whoosh',.3),(2.85,'riser',.35),(3.0,'boom',.55),(3.05,'clock',.45),(7.0,'riser',.35),(7.4,'bell',.55),(7.55,'boom',.75),(7.7,'cash',.45),(8.75,'whoosh',.4),(9.0,'tap',.4),(9.12,'tap',.4),(9.24,'tap',.4),(9.36,'tap',.4),(11.1,'whoosh',.45),(11.3,'boom',.6)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
