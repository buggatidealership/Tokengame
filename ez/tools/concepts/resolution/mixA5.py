"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A5 (logo header, cards at the bottom, centred race, round result, 29.5 s).
python3 mixA5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=29.5;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.05,'boom',.35),(1.0,'whoosh',.35)]+[(2.2+.12*i,'whoosh',.25) for i in range(4)]+[x for f in (3.3,4.08,4.86,5.64) for x in ((f-.2,'whoosh',.18),(f+.05,'flip',.8),(f+.42,'tap',.45))]+[
 (7.0,'whoosh',.4),(8.3,'whoosh',.25),(9.3,'beep',.6),(9.9,'beep',.6),(10.5,'beep',.65),(11.1,'boom',.9),(11.1,'whoosh',.4),(11.43,'tick',.55),(11.55,'coin',.3),(11.7,'clock',.3),(15.5,'riser',.45),
 (17.1,'bell',.55),(17.15,'stamp',.7)]+[(17.75+.15*i,'shatter',.75) for i in range(3)]+[(18.35,'chime',.85),(18.6,'cash',.4),(18.9,'whoosh',.3),
 (20.3,'whoosh',.4),(20.9,'coin',.35),(24.3,'whoosh',.4),(25.0,'flip',.7),(25.45,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
