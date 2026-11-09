# python3 mix.py <bed.wav> <bell.wav> <out.wav> : V1 sound. The bed swells under the night, cuts to silence, the closing bell rings alone, the bed returns softly for the verdict.
import sys,wave,numpy as np
def rd(f):
    w=wave.open(f);n=w.getnframes();a=np.frombuffer(w.readframes(n),dtype=np.int16).reshape(-1,w.getnchannels()).astype(np.float32)/32768;return a
SR=48000;bed,bell=rd(sys.argv[1]),rd(sys.argv[2]);D=25.0;N=int(D*SR);out=np.zeros((N,2),np.float32)
def ramp(n0,n1,a,b,arr):
    x=np.linspace(a,b,n1-n0)[:,None];arr[n0:n1]*=x
BELL=14.5
# part 1: the bed from its own start, up to 0.3 s before the bell
e1=int((BELL-.3)*SR);p1=bed[:e1].copy()*0.38;ramp(e1-int(.25*SR),e1,1,0,p1);out[:e1]+=p1
# the bell, alone
b0=int(BELL*SR);bl=bell[:min(len(bell),N-b0)]*1.0;out[b0:b0+len(bl)]+=bl
# part 2: the bed returns (from its 15 s mark) under the verdict and the end card
s2=int(17.0*SR);src=bed[int(15*SR):int(15*SR)+(N-s2)].copy()*0.3;ramp(0,int(1.2*SR),0,1,src);ramp(len(src)-int(1.6*SR),len(src),1,0,src);out[s2:s2+len(src)]+=src
pk=np.abs(out).max();out=out/max(pk,1e-6)*0.89
w=wave.open(sys.argv[3],'w');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes());w.close();print('ok',pk)
