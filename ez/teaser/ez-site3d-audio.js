/* EZ SITE3D: the sound (Web Audio, synthesized offline, 48 kHz stereo, 32-bit float WAV). Conventions of ez-hype-audio.js:
   - Every event comes from window.SITE3D_PIC (picture frames computed by the same code that moves the plates: the LED digit
     changes, the launch frame, the tile lifts and seats, the shot table T), so a re-time cannot put the sound out of sync.
     Every hit lands one frame after its picture (hit()), with the compressors' look-ahead removed (LAT).
   - Loop seam: two identical cycles are scheduled (every event at t and t + 30 s, the random seed reset per cycle) and only
     the second is kept, so 29.999 s runs into 0.000 s with the tails and the compressor state carried over.
   - Phone speakers: every low hit is a tanh-saturated sine plus a 2nd/3rd-harmonic body kept at 300 Hz and up plus a
     2..5 kHz click (thud()); the bed's bass is doubled an octave up through 250..900 Hz. The pass mark (6 LU or less lost
     through a 300 Hz high-pass) is measured by site3d-render.sh's QA step.
   - Loudness: -14 LUFS / -1 dBTP is set by site3d-render.sh (two-pass loudnorm, linear).
   Palette: the materials on screen. Relays (the LED cells), a servo and glass (the cards rising and lighting), felt (a card
   sitting out), a machined rail and a latch (#1), struck metal and a sub (the seat), viscous gold (the pot), a kiln (the
   enamel firing), oxidising metal (the gold that does not come back). No whooshes, risers from a library, or bloops.
   Scenario balance: A (f1080..1319) and B (f1320..1559) are mixed to the same loudness within 0.5 dB (MIX.aBal / MIX.bBal,
   measured by the QA step); B keeps the bed where A keeps it.
   {stem:"hits"} renders the synced events without the bed (for the onset check). */
(function(){
"use strict";
window.renderAudio=function(o){return window.__audio(o)};
window.__audio=function(opts){
  var BED=!(opts&&opts.stem==="hits");
  var P=window.SITE3D_PIC,T=P.T,N=P.N,FPS=P.FPS,SR=48000,dur=N/FPS;
  var MIX={sub:.6,hf:150,hlp:600,b808:.8,o808:1,o808lp:900,o808hp:250,pad:.034,padlp:2000,padhp:250,padoct:2,hat:1.6,tick:.05,buzz:.035,aBal:1,bBal:1,limT:-7,compT:-16};
  if(window.SITE3D_MIX_TEST)for(var mk in window.SITE3D_MIX_TEST)MIX[mk]=window.SITE3D_MIX_TEST[mk];
  var CYC=2,TAIL=.5,ctx=new OfflineAudioContext(2,Math.round(SR*(CYC*dur+TAIL)),SR),OFF=0;
  var bus=ctx.createGain();bus.gain.value=.8;var bedBus=ctx.createGain();bedBus.connect(bus);var ROUTE=bus;
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=MIX.compT;comp.ratio.value=3;comp.attack.value=.006;comp.release.value=.16;comp.knee.value=6;
  var lim=ctx.createDynamicsCompressor();lim.threshold.value=MIX.limT;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.06;lim.knee.value=0;
  var duck=ctx.createGain();bus.connect(comp);comp.connect(lim);lim.connect(duck);duck.connect(ctx.destination);
  var LAT=0;
  function chainLatency(){var c2=new OfflineAudioContext(1,4800,SR),b=c2.createBuffer(1,4800,SR);b.getChannelData(0)[480]=.5;
    var s=c2.createBufferSource();s.buffer=b;var k1=c2.createDynamicsCompressor(),k2=c2.createDynamicsCompressor();
    [[k1,comp],[k2,lim]].forEach(function(q){["threshold","ratio","attack","release","knee"].forEach(function(n){q[0][n].value=q[1][n].value})});
    s.connect(k1);k1.connect(k2);k2.connect(c2.destination);s.start(0);
    return c2.startRendering().then(function(o){var d=o.getChannelData(0),i=0;while(i<d.length&&Math.abs(d[i])<1e-4)i++;return (i-480)/SR})}
  return chainLatency().then(function(lat){LAT=lat;window.SITE3D_AUDIO_LAT_MS=lat*1000;return schedule()});
  function schedule(){
  var seed,EV=[];function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
  function noise(){var b=ctx.createBuffer(1,SR*2,SR),d=b.getChannelData(0),s=11;for(var i=0;i<d.length;i++){s=(s*16807)%2147483647;d[i]=s/1073741823.5-1}return b}var NB=noise();
  for(var cy=0;cy<CYC;cy++){OFF=cy*dur;seed=20261012;EV=[];cycle()}
  window.SITE3D_SFX=EV.sort(function(a,b){return a[0]-b[0]});
  return render();
  function cycle(){
  function hit(fr){return Math.max(0,OFF+(Math.ceil(fr-1e-6)+1)/FPS-LAT)}   /* one frame after its picture */
  function at(fr){return Math.max(0,OFF+fr/FPS-LAT)}                        /* bed events on the grid itself */
  function ev(fr,what){EV.push([Math.round(fr*100)/100,what])}
  function pan(x,dst){var p=ctx.createStereoPanner();p.pan.value=x||0;p.connect(dst||ROUTE);return p}
  function env(g,t,a,d,v){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0003,t+a+d)}
  function curve(drive){var c=new Float32Array(1024);for(var i=0;i<1024;i++){var x=i/511.5-1;c[i]=Math.tanh(drive*x)/Math.tanh(drive)}return c}
  var SAT4=curve(4),SAT2=curve(3);
  var NOTE={D1:36.71,A1:55,Bb1:58.27,C2:65.41,D2:73.42,F2:87.31,G2:98,A2:110,Bb2:116.54,C3:130.81,Cs3:138.59,D3:146.83,E3:164.81,F3:174.61,G3:196,A3:220,Bb3:233.08,
    C4:261.63,Cs4:277.18,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,C6:1046.5,D6:1174.66,F6:1396.91,A6:1760};

  /* ---- instruments (thud/kick/hat/clap/metal/grains/swell/pad/b808/drone as in ez-hype-audio.js) ---- */
  function thud(t,f0,f1,d,g,p){var out=pan(p);
    var o=ctx.createOscillator(),ws=ctx.createWaveShaper(),a=ctx.createGain();o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d*.6);
    ws.curve=SAT4;env(a,t,.003,d,g*MIX.sub);o.connect(ws);ws.connect(a);a.connect(out);o.start(t);o.stop(t+d+.05);
    [2,3].forEach(function(h,k){var ob=ctx.createOscillator(),hp=ctx.createBiquadFilter(),lp=ctx.createBiquadFilter(),ab=ctx.createGain(),b0=Math.max(MIX.hf*h,f0*h),b1=Math.max(MIX.hf*h,f1*h);
      ob.type="triangle";ob.frequency.setValueAtTime(b0*1.6,t);ob.frequency.exponentialRampToValueAtTime(b0,t+.02);ob.frequency.exponentialRampToValueAtTime(b1,t+d*.5);
      hp.type="highpass";hp.frequency.value=150;hp.Q.value=.7;lp.type="lowpass";lp.frequency.value=MIX.hlp;lp.Q.value=.7;
      env(ab,t,.002,d*.45,g*(k?1.4:2));ob.connect(hp);hp.connect(lp);lp.connect(ab);ab.connect(out);ob.start(t);ob.stop(t+d+.05)});
    var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),ac=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=3200;bp.Q.value=.8;
    env(ac,t,.0008,.016,g*1.3);s.connect(bp);bp.connect(ac);ac.connect(out);s.start(t,rnd());s.stop(t+.04)}
  function kick(t,g){thud(t,120,44,.34,g,0)}
  function hat(t,g,p,open){var s=ctx.createBufferSource(),hp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;hp.type="highpass";hp.frequency.value=8000;
    env(a,t,.0015,open?.14:.035,g*MIX.hat);s.connect(hp);hp.connect(a);a.connect(pan(p||0));s.start(t,rnd()*1.5);s.stop(t+.2)}
  function clap(t,g){[0,.011,.023].forEach(function(dt,k){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=1300;bp.Q.value=1.4;
    env(a,t+dt,.001,k===2?.17:.02,g*(k===2?1:.7));s.connect(bp);bp.connect(a);a.connect(pan(0));s.start(t+dt,rnd()*1.5);s.stop(t+dt+.22)})}
  function metal(t,f,g,d,p,bright){var R=[1,2.756,5.404,8.933],A=[1,.42,.2,.09];bright=bright==null?1:bright;
    R.forEach(function(r,k){if(f*r>16000)return;[-1,1].forEach(function(sg){var o=ctx.createOscillator(),a=ctx.createGain();o.frequency.value=f*r*(1+sg*.0011*(k+1));
      env(a,t,.0015,d/(1+k*1.3),g*A[k]*(k?bright:1)*.5);o.connect(a);a.connect(pan(p));o.start(t);o.stop(t+d+.05)})})}
  function grains(t,d,f0,f1,rate,g,p,q,spread){var n=Math.max(1,Math.round(d*rate));for(var i=0;i<n;i++){var u=rnd(),tt=t+u*d,fc=f0*Math.pow(f1/f0,u)*(1+(rnd()-.5)*.35);
    var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=fc;bp.Q.value=q||9;
    var gl=.006+rnd()*.03;env(a,tt,.002,gl,g*(.5+rnd()*.5));s.connect(bp);bp.connect(a);a.connect(pan((p||0)+(rnd()-.5)*(spread==null?.3:spread)));s.start(tt,rnd()*1.5);s.stop(tt+gl+.02)}}
  function swell(t,d,f0,f1,g,p,q){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;s.loop=true;bp.type="bandpass";bp.Q.value=q||2.5;
    bp.frequency.setValueAtTime(f0,t);bp.frequency.exponentialRampToValueAtTime(f1,t+d);a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+d*.88);a.gain.linearRampToValueAtTime(0,t+d);
    s.connect(bp);bp.connect(a);a.connect(pan(p));s.start(t);s.stop(t+d+.02)}
  function pad(t,d,fs,g,cut){fs.forEach(function(f){[-1,1].forEach(function(sg){var o=ctx.createOscillator(),lp=ctx.createBiquadFilter(),a=ctx.createGain();o.type="sawtooth";o.frequency.value=f*MIX.padoct*(1+sg*.0007);
    var src=o;if(MIX.padhp){var ph=ctx.createBiquadFilter();ph.type="highpass";ph.frequency.value=MIX.padhp;ph.Q.value=.7;o.connect(ph);src=ph}
    lp.type="lowpass";lp.frequency.value=cut||900;a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.12);a.gain.setValueAtTime(g,Math.max(t+.13,t+d-.06));a.gain.linearRampToValueAtTime(0,t+d);
    src.connect(lp);lp.connect(a);a.connect(pan(sg*.35));o.start(t);o.stop(t+d+.02)})})}
  function b808(t,f,d,g){[[1,g*MIX.b808,0],[2,g*MIX.o808,1]].forEach(function(L){var o=ctx.createOscillator(),ws=ctx.createWaveShaper(),lp=ctx.createBiquadFilter(),a=ctx.createGain(),last=lp;ws.curve=SAT2;
    var fm=f*L[0],gg=L[1];o.frequency.setValueAtTime(fm*1.5,t);o.frequency.exponentialRampToValueAtTime(fm,t+.035);lp.type="lowpass";lp.frequency.value=L[2]?MIX.o808lp:1400;if(L[2])lp.Q.value=.7;
    if(L[2]){var hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=MIX.o808hp;hp.Q.value=.7;lp.connect(hp);last=hp}
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(gg,t+.004);a.gain.setTargetAtTime(gg*.55,t+.06,.12);a.gain.setTargetAtTime(0,t+d-.05,.03);
    o.connect(ws);ws.connect(lp);last.connect(a);a.connect(pan(0));o.start(t);o.stop(t+d+.2)})}
  /* a saturated low drone, its 2nd and 3rd harmonics band-passed 150..600 Hz so phones hear it */
  function drone(t,d,f,g){var o=ctx.createOscillator(),ws=ctx.createWaveShaper(),a=ctx.createGain();ws.curve=SAT2;o.frequency.value=f;
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.25);a.gain.setValueAtTime(g,Math.max(t+.26,t+d-.2));a.gain.linearRampToValueAtTime(0,t+d);o.connect(ws);ws.connect(a);a.connect(pan(0));o.start(t);o.stop(t+d+.02);
    [2,3].forEach(function(h){var ob=ctx.createOscillator(),bp=ctx.createBiquadFilter(),ab=ctx.createGain();ob.type="sawtooth";ob.frequency.value=f*h;bp.type="bandpass";bp.frequency.value=Math.min(600,Math.max(150,f*h*1.5));bp.Q.value=.8;
      ab.gain.setValueAtTime(0,t);ab.gain.linearRampToValueAtTime(g*.5,t+.3);ab.gain.setValueAtTime(g*.5,Math.max(t+.31,t+d-.2));ab.gain.linearRampToValueAtTime(0,t+d);ob.connect(bp);bp.connect(ab);ab.connect(pan(0));ob.start(t);ob.stop(t+d+.02)})}
  /* RELAY: one LED cell clicking (8 ms: a body near 1 kHz and a 4 kHz transient); unit 0..3 = days..seconds, heavier for days */
  function relay(t,g,unit,p){var f=[620,800,1000,1250][unit==null?3:unit];var o=ctx.createOscillator(),a=ctx.createGain();o.type="square";o.frequency.setValueAtTime(f,t);
    var lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2600;env(a,t,.0004,.008,g*.35);o.connect(lp);lp.connect(a);a.connect(pan(p));o.start(t);o.stop(t+.02);
    var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),ac=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=4000;bp.Q.value=1.2;env(ac,t,.0003,.006,g);s.connect(bp);bp.connect(ac);ac.connect(pan(p));s.start(t,rnd()*1.5);s.stop(t+.02)}
  function cascade(t0,d,n,g,p,rise){for(var i=0;i<n;i++){var u=i/(n-1||1);relay(t0+d*u+(rnd()-.5)*.004,g*(.6+.4*rnd()),rise==null?3:(rise>0?Math.min(3,Math.floor(u*4)):3-Math.min(3,Math.floor(u*4))),(p||0)+(rnd()-.5)*.5)}}
  function clack(t,g,p){relay(t,g*1.6,0,p);thud(t,240,90,.09,g*1.4,p);metal(t,NOTE.A3,g*.5,.18,p,.5)}
  function pip(t,f,g,p){[1,3].forEach(function(h,k){var o=ctx.createOscillator(),a=ctx.createGain();o.frequency.value=f*h;env(a,t,.003,.06,g*(k?.25:1));o.connect(a);a.connect(pan(p));o.start(t);o.stop(t+.12)})}
  function tink(t,f,g,p){[1,2.32,4.25].forEach(function(r,k){var o=ctx.createOscillator(),a=ctx.createGain();o.frequency.value=f*r;env(a,t,.001,.35/(1+k),g*[1,.35,.15][k]);o.connect(a);a.connect(pan(p));o.start(t);o.stop(t+.45)})}
  function felt(t,g,p){var s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;lp.type="lowpass";lp.frequency.value=700;env(a,t,.004,.09,g);s.connect(lp);lp.connect(a);a.connect(pan(p));s.start(t,rnd()*1.5);s.stop(t+.15);thud(t,130,70,.14,g*.6,p)}
  function servo(t,d,g){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;s.loop=true;bp.type="bandpass";bp.Q.value=6;bp.frequency.setValueAtTime(200,t);bp.frequency.exponentialRampToValueAtTime(600,t+d);
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.08);a.gain.setValueAtTime(g,t+d-.1);a.gain.linearRampToValueAtTime(0,t+d);s.connect(bp);bp.connect(a);a.connect(pan(0));s.start(t);s.stop(t+d+.02);
    var o=ctx.createOscillator(),oa=ctx.createGain();o.type="triangle";o.frequency.setValueAtTime(180,t);o.frequency.exponentialRampToValueAtTime(330,t+d);oa.gain.setValueAtTime(0,t);oa.gain.linearRampToValueAtTime(g*.3,t+.1);oa.gain.linearRampToValueAtTime(0,t+d);o.connect(oa);oa.connect(pan(0));o.start(t);o.stop(t+d+.02)}
  function rail(t,d,g,p){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;s.loop=true;bp.type="bandpass";bp.frequency.value=2800;bp.Q.value=3;
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+d*.3);a.gain.linearRampToValueAtTime(0,t+d);s.connect(bp);bp.connect(a);a.connect(pan(p));s.start(t);s.stop(t+d+.02)}
  function kiln(t,g,p){var s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;lp.type="lowpass";lp.Q.value=1.5;lp.frequency.setValueAtTime(200,t);lp.frequency.exponentialRampToValueAtTime(2000,t+.25);
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.03);a.gain.exponentialRampToValueAtTime(.0003,t+.45);s.connect(lp);lp.connect(a);a.connect(pan(p));s.start(t,rnd()*1.5);s.stop(t+.5)}
  function pour(t,d,f0,f1,g,p){grains(t,d,f0,f1,70,g,p,6,.25);var s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;s.loop=true;lp.type="lowpass";lp.frequency.setValueAtTime(f0*.6,t);lp.frequency.exponentialRampToValueAtTime(f1*.6,t+d);
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g*.5,t+.06);a.gain.setValueAtTime(g*.5,Math.max(t+.07,t+d-.04));a.gain.linearRampToValueAtTime(0,t+d);s.connect(lp);lp.connect(a);a.connect(pan(p));s.start(t);s.stop(t+d+.02)}

  /* ===== BED: 120 BPM, D minor. [frame0, frame1, root, chord, hats per beat, half-time] ===== */
  var SEC=[[0,120,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],0,0],[120,180,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],1,0],[180,300,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2,0],
    [300,T.lock,NOTE.Bb1*2,[NOTE.Bb2,NOTE.D3,NOTE.F3],4,0],[T.lock,T.elim[0],NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2,1],[T.elim[0],T.last0,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.Bb3],2,1],
    [T.last0,T.out,NOTE.A2/2,[NOTE.A2,NOTE.Cs4/2,NOTE.E3],4,0],[T.seat,1080,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2,0],
    [1080,1320,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2,0],[1320,T.end,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2,0],[T.end,N,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3,NOTE.E4],1,1]];
  ROUTE=bedBus;
  if(BED)SEC.forEach(function(sc){if(sc[1]>sc[0])pad(at(sc[0]),(sc[1]-sc[0])/FPS,sc[3],MIX.pad*(sc[0]<120?.6:1),MIX.padlp)});
  function secAt(f){for(var i=0;i<SEC.length;i++)if(f>=SEC[i][0]&&f<SEC[i][1])return SEC[i];return null}
  for(var f=0;f<N&&BED;f+=7.5){var sc=secAt(f);if(!sc)continue;var inBar=f%120;
    if(f>=T.out&&f<T.seat)continue;                                         /* F1: digital silence from lights out to the seat */
    if(f>=T.zero-30&&f<T.out)continue;                                      /* the bed drops out under the last half second */
    if(f>=120){var kOn=sc[5]?(inBar===0):(inBar===0||inBar===45||(inBar===97.5&&sc[4]>2));if(kOn&&f!==T.seat)kick(at(f),inBar===97.5?.3:.46)}
    if(f>=180&&(sc[5]?inBar===60:inBar===60))clap(at(f),.18);
    if(sc[4]){var step=30/sc[4];if((f%step)<1e-6)hat(at(f),f%30===0?.045:.03,.12*((f/7.5)%2?1:-1))}}
  for(f=120;f<N&&BED;f+=30){var s2=secAt(f);if(!s2||(f>=T.zero-30&&f<T.seat))continue;var b=(f%120)/30,r=s2[2];
    if(b===0)b808(at(f),r,.95,.16);else if(b===1&&!s2[5])b808(at(f+15),r,.55,.12);else if(b===3&&!s2[5])b808(at(f),r*(s2[4]>2?1.5:1),.5,.12)}
  ROUTE=bus;

  /* ===== S1 HOOK: a low D drone in a dark room; the loop restarts on a relay tick on the downbeat ===== */
  drone(at(0),120/FPS,NOTE.D1,.05);ev(0,"drone D1");
  thud(hit(0),NOTE.D3,NOTE.D1,.8,.35,0);ev(0,"sub D (loop start)");

  /* ===== the clock: a relay tick for every digit change, capped at 30 per second; past that the ticks fuse into a buzz ===== */
  var last=-9;P.ticks.forEach(function(tk){var fr=tk[0],u=tk[1];if(fr-last<2)return;last=fr;relay(hit(fr),MIX.tick*(u===0?1.6:u===1?1.25:1),u,u<2?-.2:.2)});
  (function(){/* buzz density: ticks per frame in a 6-frame window */
    var dens=new Float32Array(N);P.ticks.forEach(function(tk){for(var k=-3;k<=3;k++){var i=tk[0]+k;if(i>=0&&i<N)dens[i]+=1/7}});
    for(var fr=0;fr<N;fr+=3){if(dens[fr]>.45)grains(hit(fr),3/FPS,2600,3400,140*dens[fr],MIX.buzz*dens[fr],0,4,.6)}})();
  ev(P.T.ffStart,"fast-forward: ticks speed into a buzz");

  /* ===== S2: the launch (fees open), the pot fills ===== */
  if(P.F_LAUNCH!=null){metal(hit(P.F_LAUNCH),NOTE.A4,.07,.6,-.5,.7);clack(hit(P.F_LAUNCH),.05,-.5);ev(P.F_LAUNCH,"launch: the fee channel opens")}
  var fl=P.F_LAUNCH==null?180:P.F_LAUNCH;pour(hit(fl+4),(T.lock-fl-4)/FPS,1200,700,.035,-.4);ev(fl+4,"pour into the pot");
  /* the cards rise out of the page (servo), then light one by one (glass) */
  servo(hit(T.rise0),50/FPS,.04);ev(T.rise0,"servo: the board rises");
  for(var k=0;k<P.NL;k++){tink(hit(T.rise0+k*6+30),[NOTE.A5,NOTE.F5,NOTE.D5,NOTE.C5,NOTE.A4,NOTE.G4][k],.05,-.2+.13*k);ev(T.rise0+k*6+30,"card lights #"+(k+1))}

  /* ===== S3 THE FREEZE: the clock locks at the 24 hour mark; the status LEDs go solid on the same clack ===== */
  clack(hit(T.lock),.16,0);thud(hit(T.lock),70,34,.6,.42,0);metal(hit(T.lock),NOTE.D3,.08,1.0,0,.5);ev(T.lock,"LOCK (6 dB under the seat)");

  /* ===== S4 DROP ZONE: a descending pip as each status LED dies, a felt seat as the card sinks into the page ===== */
  var PIPS=[NOTE.A5,NOTE.F5,NOTE.D5,NOTE.C5,NOTE.A4];
  T.elim.forEach(function(te,j){pip(hit(te),PIPS[Math.min(j,PIPS.length-1)],.11,.25-.25*j);felt(hit(te+30),.14,.1);ev(te,"pip: #"+(P.NL-j)+" goes dark");ev(te+30,"felt: #"+(P.NL-j)+" sits out")});
  rail(hit(T.one0),(T.one1-T.one0)/FPS,.03,-.1);clack(hit(T.one1),.1,0);ev(T.one1,"latch: #1 makes the call");
  metal(hit(810),NOTE.D5,.05,.9,0,.8);metal(hit(810),NOTE.A5,.03,.7,.1,.6);ev(810,"match cut ring");

  /* ===== S5 ZERO: the last 24 hours buzz into silence; lights out; the seat ===== */
  swell(hit(T.last0),(T.out-T.last0+4)/FPS,400,4200,.15,0,1.8);ev(T.last0,"rise under the last 24 hours, cut by the silence");
  clack(hit(T.zero),.12,0);thud(hit(T.zero),90,40,.3,.32,0);ev(T.zero,"ZERO (the dies read 00 00 00 00)");
  /* the silence (after the compressors, on the true clock): from lights out to the seat */
  var q0=OFF+T.out/FPS,q1=OFF+(T.seat+1)/FPS;duck.gain.setValueAtTime(1,q0-.002);duck.gain.linearRampToValueAtTime(0,q0);duck.gain.setValueAtTime(0,q1);duck.gain.linearRampToValueAtTime(1,q1+.0015);ev(T.out,"LIGHTS OUT: silence");
  thud(hit(T.seat),62,30,1.3,.95,0);metal(hit(T.seat),NOTE.D3,.16,1.6,0,.6);metal(hit(T.seat),180,.12,.5,0,.9);tink(hit(T.seat)+.01,NOTE.D6,.05,0);
  (function(){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=3500;bp.Q.value=.7;env(a,hit(T.seat),.001,.03,.5);s.connect(bp);bp.connect(a);a.connect(pan(0));s.start(hit(T.seat),.2);s.stop(hit(T.seat)+.06)})();
  ev(T.seat,"THE SEAT (impact)");
  cascade(hit(T.reflow),12/FPS,24,.06,-.3,1);ev(T.reflow,"relay cascade: the call");
  pour(hit(T.pot0),(T.pot1-T.pot0)/FPS,900,380,.05,-.3);ev(T.pot0,"pour: the whole pot goes in");
  cascade(hit(T.levOn),8/FPS,10,.05,0,1);metal(hit(T.levOn),NOTE.D2*2,.12,1.4,0,.4);thud(hit(T.levOn),80,34,.5,.4,0);ev(T.levOn,"leverage + wipe-out line");

  /* ===== S6 SCENARIO A: the move matches; the profit lifts tiles out of the market into the bay ===== */
  var A=MIX.aBal;
  cascade(hit(T.aMove),12/FPS,20,.06*A,.3,1);metal(hit(T.aMove+2),NOTE.D5,.07*A,.9,.3,.8);metal(hit(T.aMove+2),NOTE.A5,.06*A,.9,.35,.7);ev(T.aMove,"A: the move matches (D+A)");
  pour(hit(T.aGold),16/FPS,1100,1500,.04*A,.4);ev(T.aGold,"A: gold to the tray");
  P.tileLift.forEach(function(t0,j){relay(hit(t0),.05*A,2,.45);kiln(hit(t0+2),.07*A,.45);ev(t0,"A: tile "+(j+1)+" lifts and fires");
    for(var c=0;c<4;c++)tink(hit(t0+20+c*(6+3*c)),NOTE.D6*(1+.06*((j+c)%3)),.018*A*(1-c*.2),.45);
    clack(hit(P.tileSeat[j]),.05*A,.5);ev(P.tileSeat[j],"A: tile "+(j+1)+" seats")});

  /* ===== S7 SCENARIO B: the next bet goes in, the move goes against it, 0.27 comes back, the rest cools to black ===== */
  var B=MIX.bBal;
  clack(hit(T.bBet),.08*B,-.3);cascade(hit(T.bBet+1),12/FPS,14,.05*B,-.3,1);pour(hit(T.bBet+2),26/FPS,900,380,.045*B,-.45);ev(T.bBet,"B: the next bet goes in");
  cascade(hit(T.bMove),12/FPS,20,.06*B,.3,-1);metal(hit(T.bMove+2),NOTE.D5,.07*B,.9,.3,.8);metal(hit(T.bMove+2),NOTE.Cs4*2,.06*B,.9,.25,.7);ev(T.bMove,"B: the move goes against (D+C#)");
  pour(hit(T.bBack),(T.bBack1-T.bBack)/FPS,500,700,.045*B,-.45);ev(T.bBack,"B: a short return that stops dead");
  drone(hit(T.bBack1),(T.bCool1-T.bBack1)/FPS,NOTE.D2,.035*B);ev(T.bBack1,"B: low D under the ghost line");
  for(var j2=0;j2<P.tiles;j2++){var tb=T.bCool0+T.aTileStep*j2;   /* one tenth goes dark per step, on A's cadence */thud(hit(tb),110,60,.18,.07*B,-.45);grains(hit(tb+2),.45,700,220,40,.05*B,-.45,7,.2);
    for(var c2=0;c2<4;c2++)tink(hit(tb+20+c2*(6+3*c2)),NOTE.D5*(.94-.04*c2),.012*B*(1-c2*.2),-.45);ev(tb,"B: oxidising, step "+(j2+1))}

  /* ===== S8 END: struck metal on the cut, the bed resolves to D, the dies relight, the last bar runs into frame 0 ===== */
  metal(hit(T.end),NOTE.D5,.07,1.6,0,.9);metal(hit(T.end)+.02,NOTE.A5,.04,1.4,.15,.7);ev(T.end,"end metal");
  cascade(hit(T.relight0),(T.relight1-T.relight0)/FPS,40,.04,0,-1);ev(T.relight0,"relight cascade");
  drone(at(N-120),120/FPS,NOTE.D1,.045);
  }
  function render(){return ctx.startRendering().then(function(buf){
    var k0=Math.round(SR*dur*(CYC-1)),n=Math.round(SR*dur);
    var Lc=buf.getChannelData(0).subarray(k0,k0+n),Rc=buf.getChannelData(1).subarray(k0,k0+n),bytes=44+n*8,ab=new ArrayBuffer(bytes),v=new DataView(ab);
    function ws(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))}
    ws(0,"RIFF");v.setUint32(4,bytes-8,true);ws(8,"WAVE");ws(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,3,true);v.setUint16(22,2,true);v.setUint32(24,SR,true);v.setUint32(28,SR*8,true);v.setUint16(32,8,true);v.setUint16(34,32,true);ws(36,"data");v.setUint32(40,n*8,true);
    for(var i=0,o=44;i<n;i++,o+=8){v.setFloat32(o,Lc[i],true);v.setFloat32(o+4,Rc[i],true)}
    var u=new Uint8Array(ab),s="";for(var j=0;j<u.length;j+=32768)s+=String.fromCharCode.apply(null,u.subarray(j,j+32768));return btoa(s)})}}};
})();
