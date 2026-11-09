"""Release video mix: the M1 trailer bed (the owner's pick for v5 A) from 4 s in, so its hits land on the cuts (0,4,8,12,16,20),
plus soft effects on each move. python3 mix.py <out.wav>"""
import sys,subprocess,numpy as np,wave,os
SR=48000;D=26.0;N=int(SR*D);H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../launchvid/hedra/music/')
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load(H+'m1-trailer.mp3')
# video 0-14 = track 4-18; video 14-26 = track 16-28 (the splice lands on the track's big 16 s hit)
a=int(14*SR);o[:a]+=.62*m[int(4*SR):int(4*SR)+a];b=N-a;o[a:]+=.62*m[int(16*SR):int(16*SR)+b]
x=int(.012*SR);o[a-x:a+x]*=np.concatenate([np.linspace(1,.3,x),np.linspace(.3,1,x)])[:,None]
fi=int(.25*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(1.0*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(1.55,'tap',.45),(3.75,'whoosh',.35),(4.0,'whoosh',.45),(5.0,'whoosh',.3),(5.35,'tap',.55),(5.8,'tick',.5),(6.65,'tick',.5),(7.75,'whoosh',.3),
 (8.0,'whoosh',.4),(9.35,'whoosh',.3),(10.05,'tap',.55),(11.55,'whoosh',.35),(12.450,'tick',.35),(12.565,'tick',.35),(12.680,'tick',.35),(12.795,'tick',.35),(12.910,'tick',.35),(13.025,'tick',.35),(13.140,'tick',.35),(13.255,'tick',.35),(13.370,'tick',.35),(13.485,'tick',.35),(10.3,'tap',.5),(15.95,'tap',.5),(16.8,'tick',.5),(20.00,'tick',.45),(20.22,'tick',.45),(20.44,'tick',.45),(13.7,'whoosh',.3),(14.0,'whoosh',.45),(15.2,'whoosh',.3),(15.5,'tap',.5),(17.7,'whoosh',.3),
 (18.0,'whoosh',.5),(18.9,'tap',.45),(19.08,'tap',.45),(19.26,'tap',.5),(21.7,'whoosh',.35),(22.05,'boom',.7),(24.1,'tap',.5)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[1])
