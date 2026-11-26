"""Sound for the launch video (2026-11-07): made from scratch in numpy (no samples, no licences).
A soft pad bed, a low pulse at 120 bpm, and hits timed to vid.html's beats. python3 sound.py out.wav"""
import sys, wave, numpy as np
SR=48000; D=31.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(7)
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
# pad bed: tense minor pulse under the countdown and the race, opens up at the win
for f,a in [(110,.045),(164.81,.03),(220,.025),(261.63,.018)]:
    out+=a*np.sin(2*np.pi*f*t)*(1+.15*np.sin(2*np.pi*.2*t+f))*np.clip(t/1.0,0,1)*np.where(t<14.3,1,np.where(t<17.0,.3,1))
# countdown: rising blips on 3, 2, 1, a riser, the drop
for i,a in enumerate([0.0,.8,1.6]): put(a,pop(600+i*250,.45)); put(a,kick(.5))
put(1.7,whoosh(.8,.35)); put(2.35,slam(1.2)); put(2.42,kick(1.0)); put(2.5,whoosh(.8,.3))
put(3.5,whoosh(.8,.3))
for i in range(4): put(4.4+i*.16,whoosh(.22,.2)); put(4.55+i*.16,pop(700+i*120,.3))
put(5.55,slam(1.0))
# time-warp: a fast forward riser with ticks speeding up
put(7.15,whoosh(1.4,.4))
for k in np.linspace(0,1,40): put(7.3+(k**.6)*1.1,tick(.16,3000+k*4000))
# the 24 hours: the earnings gap hit, then ticks as the clock runs, pulse every half second
put(9.3,slam(1.0))
for b in np.arange(9.8,13.9,.5): put(b,kick(.32))
for k in np.linspace(0,1,60): put(9.4+k*4.5,tick(.07,4200))
# the close: bell, explosion, count-up ticks, landing
for f,a in [(784,.28),(1046.5,.2),(1568,.12)]:
    x=np.clip(t-14.4,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>14.4,np.exp(-x/1.1),0)
put(14.7,slam(1.3)); put(14.7,shimmer(1.6,.12))
for k in np.linspace(0,1,24): put(15.1+(1-(1-k)**2)*.9,tick(.15,4600+k*1500))
put(16.0,kick(.8))
# leaderboard: zoom whoosh, swap swoosh, rank-up pops
put(17.0,whoosh(.6,.3)); put(17.5,whoosh(.7,.25)); put(18.2,whoosh(.4,.25)); put(18.95,whoosh(.95,.32,False)); put(19.8,pop(880,.3)); put(19.9,pop(1320,.25)); put(20.4,kick(.6))
# follow: tap click, the post slides in
put(21.6,whoosh(.55,.28)); put(23.15,tick(.5,2600)); put(23.18,pop(1200,.25))
# strike-through: a slash, then typing
put(25.7,whoosh(.3,.35)); put(25.75,tick(.4,1800))
for i in range(7): put(26.0+i*.07,tick(.22,5200))
# welcome: hit, then the gold chord
put(27.6,whoosh(.35,.3)); put(27.75,slam(1.0))
for f,a in [(220,.06),(277.18,.05),(329.63,.05),(440,.04),(554.37,.03)]:
    x=np.clip(t-28.5,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>28.5,np.minimum(1,x/.5)*np.exp(-x/2.0),0)
put(28.5,shimmer(2.0,.1))
# master: soft clip, fade out, stereo
out=np.tanh(out*1.4)*.85; fo=np.clip((D-t)/.6,0,1); out*=fo
st=np.stack([out,out],1); pcm=(st*32767).astype('<i2')
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close(); print('wrote',sys.argv[1])
