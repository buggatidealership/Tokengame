"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A10 (no foot line, centred countdown, stock line, no shatter or crown; 25.05 s).
python3 mixA10.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=25.05;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
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
 (6.9,'whoosh',.4)]+[(7.8+.07*i,'coin',.3) for i in range(4)]+[(8.0,'whoosh',.3),(8.75,'beep',.6),(9.45,'beep',.6),(10.15,'beep',.65),(10.85,'boom',.9),(10.85,'whoosh',.4),(11.18,'tick',.55),(11.3,'coin',.3),(11.45,'clock',.3),(14.9,'riser',.45),
 (16.55,'bell',.55),(16.6,'stamp',.7),(17.75,'whoosh',.4),(18.3,'cash',.4),(18.35,'coin',.35),(21.15,'whoosh',.4),(21.85,'flip',.7),(22.3,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
