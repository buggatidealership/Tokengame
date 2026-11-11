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
for t,f,p in [(0.3,'r11-swell',.16),(1.2,'r11-sparkle',.08),(2.75,'r11-slide',.22),(2.8,'sfx-whoosh',.12),(3.3,'sfx-whoosh',.2),
  (4.3,'r11-card',.16),(4.42,'r11-card',.15),(4.54,'r11-card',.15),(4.66,'r11-card',.14),(4.6,'r11-sparkle',.14),(5.4,'r11-thump',.14),
  (6.35,'sfx-chime',.2),(6.4,'r11-swell',.12)]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
