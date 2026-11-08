"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A7 (scenes 1-3 locked: hop into the header, flips with sparkles and embers, arcs to $0; 27.5 s).
python3 mixA7.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=27.5;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
F=(3.5,4.05,4.6,5.15)
cues=[(0.05,'boom',.35),(1.35,'tap',.3),(1.6,'whoosh',.35),(2.3,'tap',.35)]+[(2.6+.12*i,'whoosh',.22) for i in range(4)]+[(2.6+.12*i+.45,'tap',.35) for i in range(4)]+[x for f in F for x in ((f-.2,'whoosh',.18),(f+.05,'flip',.8),(f+.35,'stamp',.35),(f+.4,'chime',.18))]+[
 (5.85,'whoosh',.25),(8.2,'whoosh',.4)]+[(9.1+.07*i,'coin',.3) for i in range(4)]+[(9.3,'whoosh',.25),(10.1,'beep',.6),(10.65,'beep',.6),(11.2,'beep',.65),(11.75,'boom',.9),(11.75,'whoosh',.4),(12.08,'tick',.55),(12.2,'coin',.3),(12.35,'clock',.3),(15.8,'riser',.45),
 (17.4,'bell',.55),(17.45,'stamp',.7)]+[(18.0+.15*i,'shatter',.75) for i in range(3)]+[(18.55,'chime',.85),(18.8,'cash',.4),(19.05,'whoosh',.3),
 (20.2,'whoosh',.4),(20.8,'coin',.35),(23.6,'whoosh',.4),(24.3,'flip',.7),(24.75,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
