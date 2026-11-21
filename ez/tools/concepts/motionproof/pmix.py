import subprocess,numpy as np,wave,sys
SR=48000;D=12.0;N=int(SR*D);H='/home/user/Tokengame/ez/tools/concepts/launchvid/hedra/music/'
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',H+f+'.mp3','-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load('i4-house');o+=.55*m[int(2*SR):int(2*SR)+N]
def place(t,f,peak):
  s=load(f);pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0:s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/np.abs(s).max()*s[:k]
for t,f,p in [(0.3,'r11-thump',.2),(2.25,'r11-swell',.22),(2.55,'r11-card',.12),(2.64,'r11-card',.12),(2.73,'r11-card',.12),(2.82,'r11-card',.12),
  (3.25,'sfx-flip',.2),(4.0,'sfx-flip',.2),(4.75,'sfx-flip',.2),(5.5,'sfx-flip',.22),(6.4,'r11-thump',.2),(6.5,'sfx-lock',.3),(7.95,'r11-swell',.2),(8.3,'sfx-stamp',.22),(10.25,'r11-swell',.2),(10.65,'r11-knock',.18)]:
  place(t,f,p)
fi=int(.2*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(.9*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('ok')
