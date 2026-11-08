"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A3 (owner sequence, 29.5 s).
python3 mix5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
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
cues=[(0.05,'boom',.35)]+[(1.1+.14*i,'whoosh',.25) for i in range(4)]+[x for f in (3.9,5.1,6.3,7.5) for x in ((f-.05,'whoosh',.2),(f,'flip',.8),(f+.25,'tap',.45))]+[(9.4,'whoosh',.4),(10.0,'whoosh',.3),(11.0,'beep',.6),(11.65,'beep',.6),(12.3,'beep',.65),(12.95,'boom',.9),(12.95,'whoosh',.4),(13.5,'clock',.35),(16.8,'riser',.45),(18.5,'bell',.55)]+[(18.65+.12*i,'shatter',.75) for i in range(3)]+[(19.2,'chime',.85),(19.45,'cash',.4),(21.2,'whoosh',.4),(25.0,'whoosh',.4),(25.15,'boom',.45)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
