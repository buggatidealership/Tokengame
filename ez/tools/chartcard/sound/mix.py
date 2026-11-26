#!/usr/bin/env python3
# The chart video's sound: one ElevenLabs kit (kit/, made once through Hedra, see jobs.jsonl) placed on the video's own timeline.
# mix.py <video.mp4> <timeline.json> <sfx|trap|show> <out.mp4>
#   timeline.json: make.js with TLOUT=<file> (the beats: title hits, each AI's reveal, 3-2-1, the report, the slow first hour,
#   the close, the winner, the table). sfx = effects only; trap / show = effects over a music bed whose drop lands on the report.
# Every effect is placed to the frame; the music is shifted so its measured drop (DROP below) lands on tl.boom.
import json,sys,subprocess,os
D=os.path.dirname(os.path.abspath(__file__));K=D+'/kit/'
vid,tlf,take,out=sys.argv[1:5];tl=json.load(open(tlf));T=tl['T']
# measured on the kit (loudness every 10 ms): where each bed's drop starts, and the gain that lifts its quiet intro
MUSIC={'trap':('m-trap.mp3',6.88,5.0),'show':('m-show.mp3',7.34,4.0)}
# peak-matched gains (stamp comes out of the model 26 dB down)
G={'roar':1,'hit':1,'whoosh':1,'stamp':16,'beep':.9,'drop':1,'ticker':1,'bell':1,'cash':1.4,'cheer':1,'riser':1,'slide':1}
ev=[]
def at(name,t,g):
  if 0<=t<T: ev.append((name,t,g*G[name]))
at('hit',tl['hits'][0],.75);at('hit',tl['hits'][1],1)
for k,l in enumerate(tl['lands']):
  r=tl['R0']+k*tl['RS'];at('whoosh',r-.08,.4);at('stamp',r+.26,.9);at('slide',l,.25)
c0=tl['cd'][0];st=(tl['boom']-c0)/3;[at('beep',c0+i*st,.4) for i in range(3)];at('riser',tl['boom']-1.35,.5)
at('drop',tl['boom'],.5);at('roar',tl['boom']+.05,.6);at('hit',tl['boom'],.7);at('ticker',tl['slow'][0],.22);at('ticker',tl['slow'][0]+3,.16);at('ticker',tl['slow'][0]+6,.1)  # the tape runs until the close (the kit's ticker loops seamlessly)
at('bell',tl['close'][0],.45)
w=tl['win'][0]+.25;at('cash',w+.05,.85);at('cheer',w,.35)
t0=tl['tab'][0];at('slide',t0,.45);[at('slide',t0+1.1*(1+.3*k)/3,.3) for k in range(3)]
args=['ffmpeg','-y','-loglevel','error','-i',vid];fl=[];lab=[]
for i,(n,t,g) in enumerate(ev):
  args+=['-i',K+n+'.mp3'];ms=int(round(t*1000))
  fl.append(f'[{i+1}:a]aresample=44100,aformat=channel_layouts=stereo,volume={g:.3f},adelay={ms}|{ms}[e{i}]');lab.append(f'[e{i}]')
# the floor: a trading-floor murmur under the whole video (owner, 5 Nov: "trading floor murmur, whatever gets dopamine going"),
# low under the title, dipped for the 3-2-1 so the beeps cut through, up with the race, swelling for the winner
FL=bool(os.environ.get('FLOOR'))  # owner, 5 Nov: the crowd only when earnings drop (FLOOR=1 brings the murmur back)
c1,b=tl['cd'][0],tl['boom']
if FL: args+=['-stream_loop','-1','-i',K+'floor.mp3'];j=len(ev)+1
if FL:
  lv=f"if(lt(t,{c1:.2f}),.32,if(lt(t,{b:.2f}),.32-.24*(t-{c1:.2f})/{b-c1:.2f},if(lt(t,{w:.2f}),.42,.5)))"
  fl.append(f"[{j}:a]aresample=44100,aformat=channel_layouts=stereo,atrim=0:{T:.2f},afade=t=in:d=0.6,volume='{lv}':eval=frame,afade=t=out:st={T-1.4:.2f}:d=1.4[fl]");lab.append('[fl]')
if take in MUSIC:
  fn,drop,boost=MUSIC[take];sh=tl['boom']-drop;args+=['-i',K+fn];j=len(ev)+(2 if FL else 1)
  pre=f'atrim=start={-sh:.3f},asetpts=PTS-STARTPTS,' if sh<0 else ''
  dl=f',adelay={int(sh*1000)}|{int(sh*1000)}' if sh>0 else ''
  fl.append(f"[{j}:a]aresample=44100,aformat=channel_layouts=stereo,{pre}volume='if(lt(t,{drop-.05:.2f}),{boost},1)':eval=frame,volume=.42{dl},"
            f"afade=t=out:st={T-1.6:.2f}:d=1.6[mu]");lab.append('[mu]')
fl.append(''.join(lab)+f'amix=inputs={len(lab)}:normalize=0:duration=longest,apad=whole_dur={T:.2f},atrim=0:{T:.2f},alimiter=limit=.95,loudnorm=I=-14:TP=-1.5:LRA=11[a]')
args+=['-filter_complex',';'.join(fl),'-map','0:v','-map','[a]','-c:v','copy','-c:a','aac','-b:a','160k','-ar','44100','-shortest','-movflags','+faststart',out]
subprocess.run(args,check=True);print(take,len(ev),'effects ->',out)
