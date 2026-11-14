"""Release video mix: the M1 trailer bed (the owner's pick for v5 A) from 4 s in, so its hits land on the cuts (0,4,8,12,16,20),
plus soft effects on each move. python3 mix.py <out.wav>"""
import sys,subprocess,numpy as np,wave,os
SR=48000;PF=os.environ.get('PF')=='1';DS=8*60/118;D=float(os.environ.get('DUR',26+DS if PF else 26));N=int(SR*D);H=os.path.join(os.path.dirname(os.path.abspath(__file__)),'../launchvid/hedra/music/')
def load(f):
  raw=subprocess.run(['ffmpeg','-loglevel','error','-i',f,'-ac','2','-ar',str(SR),'-f','s16le','-'],capture_output=True).stdout
  return np.frombuffer(raw,'<i2').reshape(-1,2).astype(float)/32768
o=np.zeros((N,2));m=load(H+os.environ.get('TRACK','m1-trailer')+'.mp3');GAIN=float(os.environ.get('GAIN','.62'))
# v9 (one-sentence hook, the live card from 3 s): video 0-8 = track 1-9 (its 4 s hit on the 3 s cut), 8-14 = track 8-14 (the 8 s hit on the 8 s cut), 14-26 = track 16-28
segs=[(0,8,1),(8,14,8),(14,26,16)]
# TRACK=<file in music/> picks another bed; SEGS='[[video0,video1,track0],...]' places it (a track scored to this cut: [[0,26,0]])
if os.environ.get('SEGS'):
  import json;segs=[tuple(x) for x in json.loads(os.environ['SEGS'])]
for v0,v1,t0 in segs:
  i0,i1=int(v0*SR),int(v1*SR);seg=m[int(t0*SR):int(t0*SR)+(i1-i0)];o[i0:i0+len(seg)]+=GAIN*seg
x=int(.012*SR)
for v in ([b for b,_,_ in segs[1:]]):
  a=int(v*SR);o[a-x:a+x]*=np.concatenate([np.linspace(1,.3,x),np.linspace(.3,1,x)])[:,None]
fi=int(.25*SR);o[:fi]*=np.linspace(0,1,fi)[:,None];fo=int(1.0*SR);o[-fo:]*=np.linspace(1,0,fo)[:,None]
def put(t,name,g=1.0):
  s=load(H+f'sfx-{name}.mp3');i=int(t*SR);k=min(N-i,len(s));o[i:i+k]+=g*s[:k]
cues=[(0.15,'tap',.45),(0.95,'whoosh',.25),(1.35,'tap',.5),(2.75,'whoosh',.35),(3.0,'whoosh',.45),(3.7,'whoosh',.3),(4.05,'tap',.55),(4.4,'tick',.5),(4.9,'tick',.55),(5.9,'tick',.5),(6.4,'tick',.55),(7.75,'whoosh',.3),
 (8.0,'whoosh',.4),(9.35,'whoosh',.3),(10.05,'tap',.55),(11.55,'whoosh',.35),(12.450,'tick',.35),(12.565,'tick',.35),(12.680,'tick',.35),(12.795,'tick',.35),(12.910,'tick',.35),(13.025,'tick',.35),(13.140,'tick',.35),(13.255,'tick',.35),(13.370,'tick',.35),(13.485,'tick',.35),(10.35,'tick',.45),(15.95,'tap',.5),(16.45,'tick',.45),(20.00,'tick',.45),(20.22,'tick',.45),(20.44,'tick',.45),(20.75,'tick',.4),(20.97,'tick',.4),(21.19,'tick',.4),(13.7,'whoosh',.3),(14.0,'whoosh',.45),(15.2,'whoosh',.3),(15.5,'tap',.5),(17.7,'whoosh',.3),
 (18.0,'whoosh',.5),(18.9,'tap',.45),(19.08,'tap',.45),(19.26,'tap',.5),(21.7,'whoosh',.35),(22.05,'boom',.7)]
# SET=<name>: sound sets by meaning (owner, 2026-11-09: the doubled whoosh at each section change read as "pshu pshu"; "there needs to be a better noise").
# One sound per section change; every effect levelled to its role's peak and placed so its own peak lands on the motion; runs of pops climb in pitch.
ROLE=dict(word=[.15,1.35],strike=[1.12],cut=[3.0,8.0,11.65,14.0,18.0,21.9],lift=[3.85,9.5,15.35],card=[18.95,19.13,19.31],land=[4.05,10.05,15.95],
 pop=[[4.4,4.9],[5.9,6.4],[12.450,12.565,12.680,12.795,12.910,13.025,13.140,13.255,13.370,13.485],[20.00,20.22,20.44],[20.75,20.97,21.19]],gold=[10.35],money=[16.45],end=[22.05])
if os.environ.get('POL'): # the polished cut: AIs pop one after the other, LONG and SHORT land on their own sound, the 2 v 2 score, six sectors
  ROLE['pop']=[[4.4,4.52],[5.9,6.02],[6.95],[12.450,12.565,12.680,12.795,12.910,13.025],[20.00,20.22,20.44],[20.75,20.97,21.19]];ROLE['side']=[4.9,6.4]
PEAK=dict(side=.2,word=.07,strike=.2,cut=.24,lift=.2,card=.14,land=.16,pop=.15,gold=.21,money=.25,end=.6)
SETS={'none':{}, # role: file (None = silent)
 'soft':dict(side='r11-thump',word='sfx-tap',strike='sfx-strike',cut='r11-swell',lift='r11-thump',card='r11-thump',land='r11-bubble',pop='r11-bubble',gold='r11-sparkle',money='r11-sparkle',end='sfx-boom'),
 'glass':dict(side='r11-pluck',word='sfx-tap',strike='sfx-strike',cut='r11-slide',lift='r11-slide',card='r11-ping',land='r11-pluck',pop='r11-ping',gold='sfx-chime',money='sfx-chime',end='sfx-boom'),
 'floor':dict(side='r11-knock',word='sfx-tap',strike='sfx-strike',cut='r11-swell',lift='r11-card',card='r11-card',land='r11-knock',pop='r11-flap',gold='sfx-coin',money='r11-kaching',end='sfx-boom'),
 'quiet':dict(side='r11-knock',word='sfx-tap',strike='sfx-strike',cut=None,lift='r11-thump',card=None,land=None,pop='r11-knock',gold='r11-sparkle',money='r11-sparkle',end='sfx-boom'),
 'pluck':dict(side='r11-pluck',word='sfx-tap',strike='sfx-strike',cut='r11-tape',lift='r11-swell',card='r11-pluck',land='r11-pluck',pop='r11-pluck',gold='r11-sparkle',money='r11-sparkle',end='sfx-boom')}
def place(t,name,peak,semi=0):
  s=load(H+name+'.mp3');m1=np.abs(s).max()
  if semi:
    k=2**(semi/12);n=int(len(s)/k);x=np.arange(n)*k;s=np.stack([np.interp(x,np.arange(len(s)),s[:,c]) for c in (0,1)],1)
  pk=np.argmax(np.abs(s).max(1));i=int(t*SR)-pk
  if i<0: s=s[-i:];i=0
  k=min(N-i,len(s));o[i:i+k]+=peak/m1*s[:k]
# PF=1 (2026-11-10): the AI PROFILES scene at 14 s, 8 beats long; every cue from 14 s on moves by DS, plus the scene's own cues
if PF:
  sh=lambda t:t if t<14 else t+DS
  for k,v in list(ROLE.items()):
    ROLE[k]=[[sh(x) for x in r] if isinstance(r,list) else sh(r) for r in v]
  ROLE['cut']=sorted(ROLE['cut']+[14.0]);ROLE['lift']+= [14.6];ROLE['gold']+=[15.7];ROLE['pop']+=[[16.4,16.75,17.1]]
SET=os.environ.get('SET')
if SET:
  M=SETS[SET]
  for role,ts in ROLE.items():
    f=M.get(role)
    if not f: continue
    if role=='pop':
      for run in ts:
        for n,t in enumerate(run): place(t,f,PEAK['pop']*(.72 if len(run)>6 else 1),semi=(n*(1 if len(run)>6 else 2)) if SET!='floor' else 0)
    else:
      for t in ts: place(t,f,PEAK[role])
else:
  for t,nm,g in cues: put(t,nm,g)
o=np.tanh(o*1.2)/np.tanh(1.2)
w=wave.open(sys.argv[1],'wb');w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes((np.clip(o,-1,1)*32767).astype('<i2').tobytes());w.close();print('wrote',sys.argv[1])
