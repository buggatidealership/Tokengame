"""Sound for vid7feed (The Feed): the M1 trailer score (ElevenLabs music via Hedra) plus ElevenLabs sound effects.
python3 mix7.py <out.wav> [offset s] : with no offset, picks the one that puts the score's biggest rises on the first post (3.6 s) and the close (16.0 s)."""
import sys,subprocess,numpy as np,wave
SR=48000;D=26.6;N=int(SR*D);H='hedra/music/'
def load(f,sr=SR,ch=2):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac',str(ch),'-ar',str(sr),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,ch).astype(float)/32768
mus=H+'m1-trailer.mp3'
if len(sys.argv)>2: off=float(sys.argv[2])
else:
  m=load(mus,8000,1)[:,0];w=400;db=20*np.log10(np.array([np.sqrt(np.mean(m[i:i+w]**2)) for i in range(0,len(m)-w,w)])+1e-6)
  def rise(t):
    i=int(t/.05);return -99 if i<10 or i>len(db)-10 else db[i:i+10].mean()-db[i-10:i].mean()
  best=max((3*rise(3.6+o)+3*rise(16.0+o)+rise(24.35+o),round(o,2)) for o in np.arange(-3,4.01,.05));off=best[1];print('offset',off,'score',round(best[0],1))
o=np.zeros((N,2));m=load(mus)
i0=int(-off*SR) if off<0 else 0;j0=int(off*SR) if off>0 else 0;n=min(N-i0,len(m)-j0);o[i0:i0+n]+=.62*m[j0:j0+n]
fo=int(.8*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.1,'boom',.3),(0.8,'boom',.3),(1.95,'whoosh',.5),(2.1,'riser',.4),(2.6,'beep',.45),(2.93,'beep',.45),(3.27,'beep',.5)]
for t in [3.6,4.6,5.6,6.6]: cues+=[(t,'tap',.5),(t,'boom',.3),(t+.3,'lock',.4)]
cues+=[(9.5,'tap',.7),(9.75,'whoosh',.3),(11.3,'clock',.6),(16.0,'bell',.55),(16.1,'boom',.75),(16.6,'cash',.5),(19.0,'whoosh',.4),(19.6,'whoosh',.3),(22.95,'strike',.8),(23.25,'type',.6),(24.35,'boom',.75)]
for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[1])
