"""Sound for the launch video (2026-11-08, v5 Reddit): made from scratch in numpy (no samples, no licences).
A soft pad bed, a low pulse at 120 bpm, and hits timed to vid5.html's beats. python3 sound.py out.wav"""
import sys, wave, numpy as np
SR=48000; D=30.0; N=int(SR*D); t=np.arange(N)/SR; rng=np.random.default_rng(7)
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
# pad bed: low and tense from the hook to the close, opens up at the win
for f,a in [(110,.045),(164.81,.03),(220,.025),(261.63,.018)]:
    out+=a*np.sin(2*np.pi*f*t)*(1+.15*np.sin(2*np.pi*.2*t+f))*np.clip(t/1.5,0,1)*np.where(t<11.4,1,np.where(t<12.8,.25,np.where(t<17.8,1,.8)))
# hook: one low hit on each line
put(0.15,kick(.55)); put(1.2,kick(.8)); put(1.25,shimmer(1.0,.07))
# the phone rises, push-in, Reddit's row lifts
put(2.75,whoosh(.7,.32)); put(3.65,whoosh(.85,.28)); put(4.42,pop(660,.3))
# 3, 2, 1, riser, the drop
for i,a in enumerate([4.7,5.1,5.5]): put(a,pop(600+i*250,.45)); put(a,kick(.5))
put(5.2,whoosh(.75,.35)); put(5.95,slam(1.2)); put(6.0,kick(1.0))
for i in range(4): put(6.5+i*.14,whoosh(.2,.18)); put(6.62+i*.14,pop(700+i*120,.3))
# LOCKED: a padlock clack
put(7.65,tick(.7,2200)); put(7.67,tick(.5,3400)); put(7.7,slam(.9))
# the post, the tap on Follow
put(8.8,whoosh(.55,.28)); put(10.25,tick(.5,2600)); put(10.28,pop(1200,.25))
# 24 hours later: ticks speeding up under a riser
put(11.35,whoosh(1.4,.38))
for k in np.linspace(0,1,44): put(11.45+(k**.6)*1.15,tick(.15,3000+k*4000))
# the race: the gap hit, a pulse every half second, ticks as the line runs
put(13.4,slam(1.0))
for b in np.arange(13.9,17.4,.5): put(b,kick(.3))
for k in np.linspace(0,1,56): put(13.5+k*3.8,tick(.06,4200))
# the close: bell, hit, count-up ticks, landing
for f,a in [(784,.28),(1046.5,.2),(1568,.12)]:
    x=np.clip(t-17.8,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>17.8,np.exp(-x/1.1),0)
put(18.1,slam(1.3)); put(18.1,shimmer(1.6,.12))
for k in np.linspace(0,1,24): put(18.5+(1-(1-k)**2)*.9,tick(.15,4600+k*1500))
put(19.5,kick(.8))
# the board: rise, the two rows lift, the swap, the gap bar runs
put(20.35,whoosh(.65,.3)); put(20.9,whoosh(.6,.25)); put(21.5,whoosh(.4,.25)); put(21.97,pop(880,.3)); put(22.05,pop(1320,.25))
for k in np.linspace(0,1,14): put(21.9+k*.6,tick(.1,3800+k*1200))
put(22.6,whoosh(.45,.22,False))
# trusting / tracking: the slash, then typing
put(24.5,whoosh(.3,.35)); put(24.55,tick(.4,1800))
for i in range(8): put(24.8+i*.065,tick(.22,5200))
# welcome: the logo lands, the gold chord
put(26.2,whoosh(.35,.3)); put(26.3,slam(1.0))
for f,a in [(220,.06),(277.18,.05),(329.63,.05),(440,.04),(554.37,.03)]:
    x=np.clip(t-26.9,0,None); out+=a*np.sin(2*np.pi*f*t)*np.where(t>26.9,np.minimum(1,x/.5)*np.exp(-x/2.0),0)
put(26.9,shimmer(2.0,.1))
# master: soft clip, fade out, stereo
out=np.tanh(out*1.4)*.85; fo=np.clip((D-t)/.6,0,1); out*=fo
st=np.stack([out,out],1); pcm=(st*32767).astype('<i2')
w=wave.open(sys.argv[1],'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes()); w.close(); print('wrote',sys.argv[1])
