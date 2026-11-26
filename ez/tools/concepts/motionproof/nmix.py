import subprocess,numpy as np,wave,sys
SR=48000;D=9.6;N=int(SR*D);H='/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',H+f+'.mp3','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load('i4-house');o+=.42*m[int(2*SR):int(2*SR)+N]
def place(t,f,peak):
  s=load(f);pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0:s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/np.abs(s).max()*s[:k]
for t,f,p in [(0.42,'r11-thump',.3),(0.42,'sfx-stamp',.18),(0.85,'r11-thump',.3),(0.85,'sfx-stamp',.18),(1.19,'sfx-boom',.22),(1.19,'sfx-strike',.12),(1.42,'sfx-whoosh',.2),
  (1.83,'r11-thump',.22),(1.83,'r11-bubble',.12),(2.46,'r11-pluck',.16),(2.71,'r11-pluck',.16),(2.96,'r11-pluck',.18),
  (3.54,'r11-bubble',.3),(3.6,'r11-sparkle',.12),(4.09,'r11-bubble',.24),(4.31,'r11-bubble',.3),(4.37,'r11-sparkle',.12),(4.53,'r11-bubble',.24),
  (5.04,'sfx-whoosh',.16),(5.49,'sfx-coin',.3),(5.5,'r11-sparkle',.14),(6.16,'r11-swell',.18),(6.18,'r11-card',.14),(7.63,'r11-whoosh' if False else 'sfx-whoosh',.18),(7.75,'sfx-strike',.14),(8.25,'sfx-chime',.22)]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
