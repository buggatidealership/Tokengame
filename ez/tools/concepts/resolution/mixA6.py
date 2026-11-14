"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A6 (G3 gloss ground, about 25.5 s).
python3 mixA6.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=25.5;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.05,'boom',.35),(1.0,'whoosh',.35)]+[(2.0+.12*i,'whoosh',.25) for i in range(4)]+[x for f in (3.0,3.62,4.24,4.86) for x in ((f-.2,'whoosh',.18),(f+.05,'flip',.8),(f+.42,'tap',.45))]+[
 (6.2,'whoosh',.4),(7.3,'whoosh',.25),(8.1,'beep',.6),(8.65,'beep',.6),(9.2,'beep',.65),(9.75,'boom',.9),(9.75,'whoosh',.4),(10.08,'tick',.55),(10.2,'coin',.3),(10.35,'clock',.3),(13.8,'riser',.45),
 (15.4,'bell',.55),(15.45,'stamp',.7)]+[(16.0+.15*i,'shatter',.75) for i in range(3)]+[(16.55,'chime',.85),(16.8,'cash',.4),(17.05,'whoosh',.3),
 (18.2,'whoosh',.4),(18.8,'coin',.35),(21.6,'whoosh',.4),(22.3,'flip',.7),(22.75,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
