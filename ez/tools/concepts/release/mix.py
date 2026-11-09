"""Release video mix: the M1 trailer bed (the owner's pick for v5 A) from 4 s in, so its hits land on the cuts (0,4,8,12,16,20),
plus soft effects on each move. python3 mix.py <out.wav>"""
import sys,subprocess,numpy as np,wave,os
SR=48000;D=25.0;N=int(SR*D);H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../launchvid/hedra/music/')
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load(H+'m1-trailer.mp3');j0=int(4.0*SR);n=min(N,len(m)-j0);o[:n]+=.62*m[j0:j0+n]
fi=int(.25*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(1.0*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(1.55,'tap',.45),(3.75,'whoosh',.35),(4.0,'whoosh',.45),(5.2,'whoosh',.3),(5.55,'tap',.55),(7.75,'whoosh',.3),
 (8.0,'whoosh',.4),(9.5,'whoosh',.3),(10.2,'tick',.6),(11.7,'whoosh',.3),(12.0,'whoosh',.4),(13.3,'whoosh',.3),(13.6,'tap',.5),(15.7,'whoosh',.3),
 (16.0,'boom',.45),(16.0,'whoosh',.5),(16.9,'tap',.45),(17.08,'tap',.45),(17.26,'tap',.5),(19.7,'whoosh',.35),(20.05,'boom',.7),(22.3,'tap',.5)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[1])
