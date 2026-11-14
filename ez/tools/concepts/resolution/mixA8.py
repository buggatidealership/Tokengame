"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A8 (the EZ pack opening; 28.25 s).
python3 mixA8.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=28.25;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
F=(3.7,4.25,4.8,5.75)
cues=[(0.05,'boom',.3),(1.15,'tick',.35),(1.3,'tick',.35),(1.45,'tick',.4),(1.6,'shatter',.55),(1.6,'whoosh',.5),(1.62,'boom',.5),(1.8,'whoosh',.3),(2.45,'tap',.35),(2.0,'whoosh',.3),(2.45,'whoosh',.3)]+[(3.0+.05*i,'whoosh',.18) for i in range(4)]+[(3.45+.05*i,'tap',.3) for i in range(4)]+[x for f in F for x in ((f-.5,'riser',.12),(f-.2,'whoosh',.18),(f+.05,'flip',.8),(f+.35,'stamp',.4),(f+.4,'chime',.2))]+[
 (6.6,'whoosh',.25),(8.95,'whoosh',.4)]+[(9.85+.07*i,'coin',.3) for i in range(4)]+[(10.05,'whoosh',.25),(10.85,'beep',.6),(11.4,'beep',.6),(11.95,'beep',.65),(12.5,'boom',.9),(12.5,'whoosh',.4),(12.83,'tick',.55),(12.95,'coin',.3),(13.1,'clock',.3),(16.55,'riser',.45),
 (18.15,'bell',.55),(18.2,'stamp',.7)]+[(18.75+.15*i,'shatter',.75) for i in range(3)]+[(19.3,'chime',.85),(19.55,'cash',.4),(19.8,'whoosh',.3),
 (20.95,'whoosh',.4),(21.55,'coin',.35),(24.35,'whoosh',.4),(25.05,'flip',.7),(25.5,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
