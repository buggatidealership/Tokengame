import subprocess,numpy as np,wave,sys
SR=48000;D=13.0;N=int(SR*D);H='/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',H+f+'.mp3','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load('i4-house');o+=.55*m[int(2*SR):int(2*SR)+N]
def place(t,f,peak):
  s=load(f);pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0:s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/np.abs(s).max()*s[:k]
for t,f,p in [(0.25,'sfx-stamp',.2),(0.6,'r11-thump',.16),(1.95,'r11-swell',.2),(2.55,'r11-thump',.22),(3.15,'r11-tape',.3),(3.2,'sfx-shatter',.08),(3.6,'sfx-whoosh',.2),(4.3,'r11-card',.14),(4.4,'r11-card',.14),
  (5.2,'sfx-flip',.22),(5.8,'sfx-flip',.22),(6.4,'sfx-flip',.22),(7.0,'sfx-flip',.24),(7.6,'sfx-stamp',.3),(8.65,'r11-swell',.2),(9.0,'r11-knock',.2),(9.2,'r11-knock',.2),(9.45,'sfx-stamp',.26),(10.65,'r11-swell',.2),(10.95,'r11-thump',.2),(11.6,'sfx-chime',.2)]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
