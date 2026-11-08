"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A11 (market reaction number, session on the axis, quicker flips and countdown, longer race; 26 s).
python3 mixOneA.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=20.0;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
SKIP={"boom","riser","shatter","stamp","clock"}
def put(t,name,g=1.0):
  if name in SKIP:return
  g*=.5
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(2.2,'whoosh',.5),(2.25,'tick',.6),(9.9,'bell',.45),(15.2,'bell',.6),(15.5,'chime',.85),(15.75,'cash',.45),(16.0,'whoosh',.45)]+[(16.3+.12*i,'coin',.35) for i in range(4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
