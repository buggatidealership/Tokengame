"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A4 (one shared P&L race, 28.6 s).
python3 mix5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=28.6;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.05,'boom',.35)]+[(1.0+.12*i,'whoosh',.25) for i in range(4)]+[x for f in (3.5,4.28,5.06,5.84) for x in ((f-.2,'whoosh',.18),(f+.05,'flip',.8),(f+.42,'tap',.45))]+[
 (6.9,'whoosh',.4),(8.3,'beep',.6),(8.9,'beep',.6),(9.5,'beep',.65),(10.1,'boom',.9),(10.1,'whoosh',.4),(10.43,'tick',.55),(10.55,'coin',.3),(10.7,'clock',.3),(14.6,'riser',.45),
 (16.2,'bell',.55),(16.25,'stamp',.7)]+[(16.85+.15*i,'shatter',.75) for i in range(3)]+[(17.45,'chime',.85),(17.7,'cash',.4),(18.0,'whoosh',.3),
 (19.4,'whoosh',.4),(20.0,'coin',.35),(23.3,'whoosh',.4),(24.0,'flip',.7),(24.45,'tap',.4)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
