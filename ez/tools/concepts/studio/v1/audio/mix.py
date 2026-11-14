# python3 mix.py <dir with bed.wav bell.wav tap.wav coin.wav> <out.wav>
# V1 sound: the bed is audible from frame 0 and swells under the trades and the night; a soft tap as each trade row lands;
# it cuts to silence just before the bell; the closing bell rings alone; the bed returns under the count-up, which ends on a coin.
import sys,wave,numpy as np
D=sys.argv[1]
def rd(f):
    w=wave.open(D+'/'+f);n=w.getnframes();return np.frombuffer(w.readframes(n),dtype=np.int16).reshape(-1,w.getnchannels()).astype(np.float32)/32768
SR=48000;bed,bell,tap,coin=rd('bed.wav'),rd('bell.wav'),rd('tap.wav'),rd('coin.wav');DUR=25.0;N=int(DUR*SR);out=np.zeros((N,2),np.float32)
def ramp(arr,n0,n1,a,b):arr[n0:n1]*=np.linspace(a,b,n1-n0)[:,None]
def put(x,t,g):i=int(t*SR);x=x[:N-i]*g;out[i:i+len(x)]+=x
# timings mirror T in index.html
BELL=13.6;ROWS=[5.35+i*.38 for i in range(4)];COIN=17.0;RET=15.5
p1=bed[int(4.5*SR):int(4.5*SR)+int((BELL-.3)*SR)].copy()*0.38;ramp(p1,0,len(p1),1.3,0.55);ramp(p1,0,int(.08*SR),0,1);ramp(p1,len(p1)-int(.25*SR),len(p1),1,0);out[:len(p1)]+=p1
put(bell,BELL,1.0)
for t in ROWS:put(tap,t,0.32)
put(coin,COIN,0.42)
s2=int(RET*SR);src=bed[int(15*SR):int(15*SR)+(N-s2)].copy()*0.2;ramp(src,0,int(1.2*SR),0,1);ramp(src,len(src)-int(1.8*SR),len(src),1,0);out[s2:s2+len(src)]+=src
out=out/max(np.abs(out).max(),1e-6)*0.89
w=wave.open(sys.argv[2],'w');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((out*32767).astype(np.int16).tobytes());w.close();print('ok')
