"""Sound for the launch video (2026-11-07): made from scratch in numpy (no samples, no licences).
A soft pad bed, a low pulse at 120 bpm, and hits timed to vid.html's beats. python3 sound.py out.wav"""
import sys, wave, numpy as np
SR=48000; D=22.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(7)
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
# pad bed: A minor add9, slow swell, ducks before the welcome
for f,a in [(110,.05),(164.81,.035),(220,.03),(246.94,.02),(329.63,.018)]:
    lfo=1+.15*np.sin(2*np.pi*.17*t+f)
    out+=a*np.sin(2*np.pi*f*t)*lfo*np.clip(t/1.5,0,1)*np.where(t<18.2,1,np.clip(1-(t-18.2)/.4,0,1))
# pulse: soft kick every half second through the data scenes
for b in np.arange(2.75,18.0,.5): put(b,kick(.35))
# hook words
put(0.0,kick(.9)); put(.35,pop(660,.25)); put(.95,pop(880,.28))
for i in range(4): put(1.5+i*.1,pop(990+i*120,.22))
# the count-up: ticks speeding with the number, a riser into the landing, a slam
for k in np.linspace(0,1,26): put(2.95+(1-(1-k)**2)*1.3,tick(.18,4800+k*1600))
put(3.4,whoosh(.9,.25)); put(4.3,slam(.9))
# leaderboard rows
for i in range(4): put(5.3+i*.12,pop(520+i*90,.2))
# hit-rate bars, the stamp
put(7.85,whoosh(1.0,.22)); put(8.95,slam(1.1))
# in play: logo pop, card flips
put(10.75,pop(700,.3))
for i in range(4): put(11.5+i*.18,tick(.3,3400)); put(11.5+i*.18,pop(600+i*70,.12))
# next up: rows and logos, NVIDIA shimmer
for i in range(4):
    put(14.7+i*.22,whoosh(.25,.12))
    for j in range(4): put(14.85+i*.22+j*.07,pop(1100+j*80,.1))
put(16.3,shimmer(1.6,.14))
# welcome: a hit, then a long gold chord
put(18.3,whoosh(.4,.3)); put(18.45,slam(1.0))
for f,a in [(220,.06),(277.18,.05),(329.63,.05),(440,.04),(554.37,.03)]:
    x=np.clip(t-19.4,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>19.4,np.minimum(1,x/.6)*np.exp(-x/2.2),0)
put(19.4,shimmer(2.2,.1))
# master: soft clip, fade out, stereo
out=np.tanh(out*1.4)*.85; fo=np.clip((D-t)/.6,0,1); out*=fo
st=np.stack([out,out],1); pcm=(st*32767).astype('<i2')
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close(); print('wrote',sys.argv[1])
