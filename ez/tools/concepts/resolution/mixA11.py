"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A11 (market reaction number, session on the axis, quicker flips and countdown, longer race; 26 s).
python3 mixA11.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=26.0;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
F=(3.4,3.75,4.1,4.45)
cues=[(0.05,'boom',.35),(1.35,'tap',.3),(1.6,'whoosh',.35),(2.3,'tap',.35)]+[(2.6+.12*i,'whoosh',.22) for i in range(4)]+[(2.6+.12*i+.45,'tap',.35) for i in range(4)]+[x for f in F for x in ((f+.05,'flip',.75),(f+.35,'stamp',.32),(f+.4,'chime',.16))]+[
 (6.2,'whoosh',.4)]+[(7.1+.07*i,'coin',.3) for i in range(4)]+[(7.25,'whoosh',.3),(7.85,'beep',.6),(8.35,'beep',.6),(8.85,'beep',.65),(9.35,'boom',.9),(9.35,'whoosh',.4),(9.68,'tick',.55),(9.8,'clock',.3),(14.33,'bell',.4),(15.9,'riser',.45),
 (17.55,'bell',.55),(17.6,'stamp',.7),(18.7,'whoosh',.4),(19.25,'cash',.4),(19.3,'coin',.35),(22.1,'whoosh',.4),(22.8,'flip',.7),(23.25,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
