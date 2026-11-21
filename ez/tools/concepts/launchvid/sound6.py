"""Sound for the launch video (2026-11-08, v5 Reddit): made from scratch in numpy (no samples, no licences).
A soft pad bed, a low pulse at 120 bpm, and hits timed to vid6.html (four screens)'s beats. python3 sound.py out.wav"""
import sys, wave, numpy as np
SR=48000; D=14.5; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(7)
out=np.zeros(N)
def env(n,a=.005,r=.2):
    x=np.arange(n)/SR; e=np.minimum(1,x/a)*np.exp(-x/r); return e
def put(at,sig,g=1.0):
    i=int(at*SR); j=min(N,i+len(sig)); out[i:j]+=g*sig[:j-i]
def kick(g=.9):
    n=int(.45*SR); x=np.arange(n)/SR; f=45+110*np.exp(-x*28); ph=2*np.pi*np.cumsum(f)/SR; return g*np.sin(ph)*env(n,.002,.16)
def tick(g=.25,f=5200):
    n=int(.05*SR); x=np.arange(n)/SR; return g*(np.sin(2*np.pi*f*x)+.4*rng.standard_normal(n))*env(n,.0005,.012)
def pop(f=880,g=.3):
    n=int(.18*SR); x=np.arange(n)/SR; fr=f*(1+.6*np.exp(-x*40)); return g*np.sin(2*np.pi*np.cumsum(fr)/SR)*env(n,.001,.06)
def whoosh(dur=.5,g=.35,up=True):
    n=int(dur*SR); w=rng.standard_normal(n); k=np.linspace(0,1,n); sh=(k if up else 1-k)**2
    lp=np.convolve(w,np.ones(24)/24,mode='same'); return g*lp*sh*np.sin(np.pi*k)**.5
def slam(g=1.0):
    n=int(.7*SR); x=np.arange(n)/SR; nz=rng.standard_normal(n); lp=np.convolve(nz,np.ones(40)/40,mode='same')
    return g*(.8*np.sin(2*np.pi*(38+70*np.exp(-x*20))*x)*env(n,.001,.25)+.9*lp*env(n,.001,.09))
def shimmer(dur=1.2,g=.12):
    n=int(dur*SR); x=np.arange(n)/SR; s=sum(np.sin(2*np.pi*f*x+i)*(.7**i) for i,f in enumerate([1318.5,1567.98,1975.5,2637]))
    return g*s*np.minimum(1,x/.15)*np.exp(-x/(dur*.5))
for f,a in [(110,.045),(164.81,.03),(220,.025),(261.63,.018)]:
    out+=a*np.sin(2*np.pi*f*t)*(1+.15*np.sin(2*np.pi*.2*t+f))*np.clip(t/1.0,0,1)*np.where(t<10.1,1,.8)
put(0.05,kick(.6)); put(0.55,kick(.5)); put(0.6,shimmer(.8,.06))
for i in range(4): put(1.7+i*.18,whoosh(.3,.22)); put(1.85+i*.18,pop(700+i*130,.28))
for i in range(4): put(2.9+i*.12,tick(.45,2400)); put(2.92+i*.12,tick(.3,3600))
put(3.55,whoosh(.3,.3)); put(3.75,slam(1.2)); put(3.8,kick(1.0))
for b in np.arange(4.3,9.7,.5): put(b,kick(.3))
for k in np.linspace(0,1,70): put(4.0+k*5.6,tick(.06,4200))
put(8.6,whoosh(1.1,.35))
for f,a in [(784,.28),(1046.5,.2),(1568,.12)]:
    x=np.clip(t-10.1,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>10.1,np.exp(-x/1.1),0)
put(10.3,slam(1.3)); put(10.3,shimmer(1.6,.12))
for k in np.linspace(0,1,24): put(10.45+(1-(1-k)**2)*.75,tick(.15,4600+k*1500))
put(11.3,kick(.7)); put(11.9,whoosh(.4,.3)); put(12.45,slam(1.0))
for f,a in [(220,.06),(277.18,.05),(329.63,.05),(440,.04),(554.37,.03)]:
    x=np.clip(t-12.5,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>12.5,np.minimum(1,x/.4)*np.exp(-x/1.6),0)
put(12.5,shimmer(1.6,.1))
# master: soft clip, fade out, stereo
out=np.tanh(out*1.4)*.85; fo=np.clip((D-t)/.6,0,1); out*=fo
st=np.stack([out,out],1); pcm=(st*32767).astype('<i2')
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close(); print('wrote',sys.argv[1])
