import subprocess,numpy as np,wave,sys
SR=48000;D=9.5;N=int(SR*D);H='/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',H+f+'.mp3','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load('i4-house');o+=.30*m[int(2*SR):int(2*SR)+N]
def place(t,f,peak):
  s=load(f);pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0:s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/np.abs(s).max()*s[:k]
CUES={  # the three in-app generations (iv.html), seconds
 '1':[(0.2,'sfx-whoosh',.14),(0.8,'sfx-whoosh',.1),(1.9,'r11-swell',.16),(2.0,'sfx-whoosh',.16),(2.75,'r11-pluck',.2),(3.95,'r11-pluck',.2),(5.15,'r11-bubble',.26),(5.2,'r11-sparkle',.12),(6.25,'r11-card',.16),(7.05,'sfx-whoosh',.14),(7.7,'r11-thump',.14),(8.7,'sfx-chime',.18)],
 '2':[(0.1,'sfx-whoosh',.14),(0.7,'r11-slide',.18),(1.25,'r11-card',.16),(1.57,'r11-card',.16),(1.89,'r11-card',.16),(2.21,'r11-card',.16),(3.4,'r11-swell',.16),(3.45,'sfx-whoosh',.16),(4.5,'r11-pluck',.2),(5.4,'r11-pluck',.2),(7.0,'sfx-whoosh',.14),(7.8,'r11-thump',.14),(8.6,'sfx-chime',.18)],
 '3':[(1.1,'sfx-tap',.3),(1.3,'sfx-whoosh',.16),(1.95,'r11-card',.16),(2.25,'r11-card',.16),(2.55,'r11-card',.16),(2.85,'r11-card',.16),(4.0,'r11-pluck',.2),(4.9,'r11-pluck',.2),(7.2,'sfx-whoosh',.16),(7.9,'r11-thump',.14),(8.6,'sfx-chime',.18)]}
for t,f,p in CUES[sys.argv[1]]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[2],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
