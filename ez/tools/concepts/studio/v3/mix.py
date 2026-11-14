"""Score and sound for V3 Painted cinema. python3 mix.py <cues.json> <out.wav>
cues.json comes from the page (window.CUES, dumped by cues.js): {dur, bell, move, cues:[[t, sfx name or file, gain], ...]}."""
import sys,subprocess,numpy as np,wave,json,os
SR=48000;H=os.path.dirname(os.path.abspath(__file__))+'/../../launchvid/hedra/music/'
C=json.load(open(sys.argv[1]));out=sys.argv[2];D=C['dur'];N=int(SR*D)
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2))
m=load(H+'v3-score2.mp3');m=m/max(1e-6,np.sqrt(np.mean(m**2)))*.12
n=min(N,len(m));env=np.ones(n)
i,j=int((C['bell']+.6)*SR),int((C['move']+.4)*SR);env[i:j]=.35   # the bell rings over a quiet score
env=np.convolve(env,np.ones(4800)/4800,'same');o[:n]+=m[:n]*env[:,None]
fo=int(1.2*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  f=H+(name if name.endswith('.mp3') else f'sfx-{name}.mp3');s=load(f);s=s/max(1e-6,np.abs(s).max());i=int(t*SR);k=min(N-i,len(s))
  if k>0:o[i:i+k]+=g*s[:k]
for t,nm,g in C['cues']:put(t,nm,g)
o=np.tanh(o*1.1)/np.tanh(1.1)
w=wave.open(out,'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',out)
