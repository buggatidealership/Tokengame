"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under vid5 A.
python3 mix5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=29.5;N=int(SR*D);H='hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(1.2,'boom',.35),(2.75,'whoosh',.5),(3.65,'whoosh',.35),(4.42,'tap',.6),(4.5,'riser',.45),(4.7,'beep',.5),(5.1,'beep',.5),(5.5,'beep',.55),
 (5.95,'boom',.8),(6.5,'whoosh',.35),(7.62,'lock',.9),(8.8,'whoosh',.45),(10.25,'tap',.7),(11.35,'clock',.7),(13.4,'boom',.5),
 (17.8,'bell',.55),(18.1,'boom',.7),(18.5,'cash',.5),(20.35,'whoosh',.45),(21.5,'whoosh',.35),(24.5,'strike',.8),(24.8,'type',.6),(26.25,'boom',.75)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
