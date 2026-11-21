import subprocess,numpy as np,wave,sys
SR=48000;D=9.64;N=int(SR*D);H='/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',H+f+'.mp3','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load('i4-house');o+=.30*m[int(2*SR):int(2*SR)+N]
def place(t,f,peak):
  s=load(f);pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0:s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/np.abs(s).max()*s[:k]
CUES={  # real seconds = 1.5 + the shot's own time; each material its own sounds
 'f':[(0.3,'r11-swell',.14),(3.45,'r11-tape',.3),(3.5,'sfx-shatter',.05),(4.9,'sfx-whoosh',.16),(5.25,'r11-card',.16),(5.37,'r11-card',.15),(5.49,'r11-card',.15),(5.61,'r11-card',.14),(6.35,'sfx-chime',.2),(6.4,'r11-swell',.12)],
 't':[(0.3,'r11-swell',.14),(3.4,'r11-slide',.2),(4.0,'r11-flap',.14),(4.7,'r11-pluck',.14),(4.85,'r11-pluck',.13),(5.0,'r11-pluck',.13),(5.15,'r11-pluck',.12),(6.35,'sfx-chime',.2),(6.4,'r11-swell',.12)],
 'p':[(0.3,'r11-swell',.14),(2.6,'r11-flap',.24),(3.3,'r11-flap',.2),(4.0,'r11-card',.16),(4.12,'r11-card',.15),(4.24,'r11-card',.15),(4.36,'r11-card',.14),(6.35,'sfx-chime',.2),(6.4,'r11-swell',.12)]}
for t,f,p in CUES[sys.argv[1]]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[2],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
