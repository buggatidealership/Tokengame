"""Cuts the master sound (sound5.py) with the same segments as the picture (cuts5.json). A rewind segment plays its slice backwards.
python3 cutsnd.py master.wav B out.wav"""
import sys,json,wave,numpy as np
m,k,o=sys.argv[1:4];w=wave.open(m);SR=w.getframerate();a=np.frombuffer(w.readframes(w.getnframes()),'<i2').reshape(-1,2).astype(float)
segs=json.load(open(__file__.rsplit('/',1)[0]+'/cuts5.json'))[k]['segs'];out=[]
for s in segs:
  d,f,t=s[0],s[1],s[2];rw=len(s)>3
  i0,i1=sorted((int(f*SR),int(t*SR)));x=a[i0:i1]
  if rw:x=x[::-1]
  n=int(d*SR);idx=np.linspace(0,len(x)-1,n).astype(int);x=x[idx]
  fd=int(.012*SR);r=np.ones(n);r[:fd]=np.linspace(0,1,fd);r[-fd:]=np.linspace(1,0,fd);out.append(x*r[:,None]*(.6 if rw else 1))
y=np.concatenate(out);fo=int(.4*SR);y[-fo:]*=np.linspace(1,0,fo)[:,None]
w2=wave.open(o,'wb');w2.setnchannels(2);w2.setsampwidth(2);w2.setframerate(SR);w2.writeframes(np.clip(y,-32767,32767).astype('<i2').tobytes());w2.close();print('wrote',o,len(y)/SR)
