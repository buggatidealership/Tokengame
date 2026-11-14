"""Mixes a music track (ElevenLabs via Hedra) and the ElevenLabs sound effects under resolution animation A2 (one idea per shot, 22.4 s).
python3 mix5.py <music.mp3> <offset s> <out.wav> : offset = where the video's t=0 falls in the track (negative = the track starts later)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=22.4;N=int(SR*D);H=__import__('os').path.dirname(__import__('os').path.abspath(__file__))+'/../launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
mus,off,out=sys.argv[1],float(sys.argv[2]),sys.argv[3]
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.1,'boom',.35),(1.9,'whoosh',.4),(2.2,'whoosh',.22),(2.37,'whoosh',.22),(2.54,'whoosh',.22),(2.71,'whoosh',.22),(4.4,'whoosh',.3),(4.82,'tap',.6),(4.86,'whoosh',.18),(6.15,'whoosh',.25),(6.57,'tap',.6),(6.61,'whoosh',.18),(7.9,'whoosh',.25),(8.32,'tap',.6),(8.36,'whoosh',.18),(9.65,'whoosh',.25),(10.07,'tap',.65),(10.11,'whoosh',.18),(11.4,'whoosh',.35),(12.4,'whoosh',.45),(13.0,'clock',.45),(14.6,'riser',.45),(16.9,'bell',.55),(17.4,'boom',.75),(17.9,'cash',.5),(19.4,'whoosh',.4),(19.55,'boom',.6)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
