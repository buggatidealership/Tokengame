/* EZ hype film: the sound pass for the 15 s cut (Web Audio, synthesized offline, 48 kHz stereo, written as 32-bit float WAV).
   Palette (critique must-fix 9): sub thuds, struck-metal resonances, filtered granular liquid. No bloops, gurgles, slide
   whistles or squash gloops.
   Phone speakers (critique must-fix 5a): every sub hit is a tanh-saturated sine (drive 4) plus a 2nd/3rd-harmonic body
   band-passed to 150..600 Hz plus a 2..5 kHz click, so it still lands through a 200 Hz high-pass.
   Bed (5b): a continuous 120 BPM bed from out 0 to the end: half-time kick and clap, 8th then 16th hats, a saturated 808
   line on the section's root. The only gap is the two silent frames before the impact. The split keeps the bed centred and
   both halves at the same level; the rekt drain runs to the end of the split.
   Sync (must-fix 3): every picture event comes from window.HYPE_PIC (master frames from the plate code) mapped to out frames
   with outOf(); every hit lands one frame after its picture. The call ticks are part of the hat pattern (5d).
   Data is audible: call ticks go up for UP and down for DOWN; each race round ticks on the lane that won it, pitched by lane,
   with an accent when the lead changes. Loudness (-14 LUFS, -1 dBTP) is set in hype-render.sh (limit, then two-pass loudnorm).
   QA 2026-10-11:
   - Phone speakers: the film lost 12.3 LU through a 300 Hz high-pass. The 808 is halved and doubled an octave up, thud()'s
     harmonic body is doubled and its click raised, the pad is louder and opened to 2 kHz; the final balance is MIX below.
   - Loop seam: the sound is rendered as two identical cycles (every event and automation scheduled at t and t + 15 s, the
     random seed reset per cycle) plus a tail, and only the second cycle is kept. Its start therefore carries the first cycle's
     tails and the compressors' settled state, so 14.999 s runs straight into 0.000 s: no cut-off, no digital silence.
   - The bed (pad, drums, 808) ducks 4 dB under the riser (out 424 to the impact) so the impact lands; the chip reveal cut
     (A11, out 450) gets a low struck-metal resonance. */
(function(){
"use strict";
window.__audio=function(opts){
  var BED=!(opts&&opts.stem==="hits");      /* {stem:"hits"} renders the synced hits alone, for the onset check */
  var D=window.HYPE_DATA,P=window.HYPE_PIC,N=P.N,FPS=60,SR=48000,dur=N/FPS;
  /* the phone-speaker balance (QA 2026-10-11), in one place. Pass mark: the film loses no more than 6 LU through a 300 Hz
     high-pass (24 dB/oct; it lost 12.3) and still normalises linearly to -14 LUFS / -1 dBTP. The review's first settings
     (808 halved, its octave at .10 through 150..600 Hz, thud body x2, click 1.3, pad .035 at 2 kHz) reached 8.1 LU. These
     reach 5.0: the thud's sine at .6 and its harmonic body kept at 300 Hz and up (hf 150 per harmonic); the 808's sine at
     .8 of the halved level and its octave copy at the same level through 250..900 Hz; the pad an octave up, high-passed at
     250 Hz; hats x1.6; the impact drone at .6; the limiter at -7 dB so the peaks sit 11.7 dB over the loudness.
     window.HYPE_MIX_TEST overrides any of them (for the high-pass test only). */
  var MIX={sub:.6,hf:150,hlp:600,b808:.8,o808:1,o808lp:900,o808hp:250,pad:.035,padlp:2000,padhp:250,padoct:2,hat:1.6,drone:.6,limT:-7,compT:-16,arpL:2.5,drainR:.7,chip:1,chipD:.45};
  /* arpL/drainR: the split's two sides within 0.5 dB (QA: equal weight). chip/chipD: the chip reveal's resonance, short so it
     has died about 23 dB by the impact 10 frames later (the impact still rises 14 dB over the frames before it, 100..1500 Hz) */
  if(window.HYPE_MIX_TEST)for(var mk in window.HYPE_MIX_TEST)MIX[mk]=window.HYPE_MIX_TEST[mk];
  var CYC=2,TAIL=.5,ctx=new OfflineAudioContext(2,Math.round(SR*(CYC*dur+TAIL)),SR),OFF=0;   /* OFF: the cycle being scheduled */
  /* master: bus -> glue compressor -> fast limiter -> duck (the two silent frames) -> out; the bed runs through bedBus */
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
  return chainLatency().then(function(lat){LAT=lat;window.HYPE_AUDIO_LAT_MS=lat*1000;return schedule()});
  function schedule(){
  var seed,EV=[];function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
  function noise(){var b=ctx.createBuffer(1,SR*2,SR),d=b.getChannelData(0),s=11;for(var i=0;i<d.length;i++){s=(s*16807)%2147483647;d[i]=s/1073741823.5-1}return b}var NB=noise();
  for(var cy=0;cy<CYC;cy++){OFF=cy*dur;seed=20261011;EV=[];cycle()}
  window.HYPE_SFX=EV.sort(function(a,b){return a[0]-b[0]});
  return render()
  function cycle(){
  var O=P.outOf;
  /* picture out frame -> sound time, one frame late. A fractional event (a drop touching the floor between frames) is first
     visible on the next whole frame, so it is rounded up first. LAT removes the compressors' look-ahead delay. */
  function hit(fr){return Math.max(0,OFF+(Math.ceil(fr-1e-6)+1)/FPS-LAT)}
  function at(fr){return Math.max(0,OFF+fr/FPS-LAT)}       /* bed events sit on the grid itself */
  function pan(x,dst){var p=ctx.createStereoPanner();p.pan.value=x||0;p.connect(dst||ROUTE);return p}
  function env(g,t,a,d,v){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0003,t+a+d)}
  function curve(drive){var c=new Float32Array(1024);for(var i=0;i<1024;i++){var x=i/511.5-1;c[i]=Math.tanh(drive*x)/Math.tanh(drive)}return c}
  var SAT4=curve(4),SAT2=curve(3);
  var NOTE={D1:36.71,E1:41.2,F1:43.65,G1:49,A1:55,Bb1:58.27,C2:65.41,D2:73.42,Eb2:77.78,F2:87.31,A2:110,Bb2:116.54,C3:130.81,D3:146.83,E3:164.81,F3:174.61,G3:196,A3:220,Bb3:233.08,C4:261.63,Cs4:277.18,D4:293.66,
    Eb4:311.13,E4:329.63,F4:349.23,G4:392,A4:440,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99,A5:880,C6:1046.5,D6:1174.66,F6:1396.91,A6:1760};
  var PENT=[NOTE.D4,NOTE.F4,NOTE.G4,NOTE.A4,NOTE.C5,NOTE.D5,NOTE.F5,NOTE.G5,NOTE.A5,NOTE.C6,NOTE.D6];

  /* ---- instruments ---- */
  /* THUD: the one sub hit. Saturated sine (drive 4, at MIX.sub) + harmonic body (2f, 3f, kept at MIX.hf x h or more) band-passed
     150..600 Hz + 2..5 kHz click. The body (2f at 2g, 3f at 1.4g) and the click (1.3g) carry the hit on phone speakers
     (QA 2026-10-11: they were g, .7g, .9g, with the sine at g and the body floor at 90 Hz x h). */
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
  /* struck metal: free-bar partial ratios, each partial a slightly detuned pair; brighter partials die sooner */
  function metal(t,f,g,d,p,bright){var R=[1,2.756,5.404,8.933],A=[1,.42,.2,.09];bright=bright==null?1:bright;
    R.forEach(function(r,k){if(f*r>16000)return;[-1,1].forEach(function(sg){var o=ctx.createOscillator(),a=ctx.createGain();o.frequency.value=f*r*(1+sg*.0011*(k+1));
      env(a,t,.0015,d/(1+k*1.3),g*A[k]*(k?bright:1)*.5);o.connect(a);a.connect(pan(p));o.start(t);o.stop(t+d+.05)})})}
  /* filtered granular liquid: short noise grains through a narrow band-pass whose centre sweeps f0 -> f1 */
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
  /* 808: saturated sine with a short pitch drop, long body, plus the same line an octave up through a band (MIX: 250..900 Hz,
     at the level of the halved 808), so the bass line is still heard on phone speakers (QA 2026-10-11) */
  function b808(t,f,d,g){[[1,g*MIX.b808,0],[2,g*MIX.o808,1]].forEach(function(L){var o=ctx.createOscillator(),ws=ctx.createWaveShaper(),lp=ctx.createBiquadFilter(),a=ctx.createGain(),last=lp;ws.curve=SAT2;
    var fm=f*L[0],gg=L[1];o.frequency.setValueAtTime(fm*1.5,t);o.frequency.exponentialRampToValueAtTime(fm,t+.035);lp.type="lowpass";lp.frequency.value=L[2]?MIX.o808lp:1400;if(L[2])lp.Q.value=.7;
    if(L[2]){var hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=MIX.o808hp;hp.Q.value=.7;lp.connect(hp);last=hp}
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(gg,t+.004);a.gain.setTargetAtTime(gg*.55,t+.06,.12);a.gain.setTargetAtTime(0,t+d-.05,.03);
    o.connect(ws);ws.connect(lp);last.connect(a);a.connect(pan(0));o.start(t);o.stop(t+d+.2)})}
  function drone(t,d,f,g,c0,c1){var o=ctx.createOscillator(),lp=ctx.createBiquadFilter(),a=ctx.createGain();o.type="sawtooth";o.frequency.value=f;lp.type="lowpass";
    lp.frequency.setValueAtTime(c0,t);lp.frequency.exponentialRampToValueAtTime(c1,t+d);a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.1);a.gain.setValueAtTime(g,t+d-.06);a.gain.linearRampToValueAtTime(0,t+d);
    o.connect(lp);lp.connect(a);a.connect(pan(0));o.start(t);o.stop(t+d+.02)}
  function glide(t,d,f0,f1,g,p){var o=ctx.createOscillator(),ws=ctx.createWaveShaper(),lp=ctx.createBiquadFilter(),a=ctx.createGain();
    ws.curve=SAT2;o.type="sawtooth";o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);
    lp.type="lowpass";lp.frequency.setValueAtTime(1800,t);lp.frequency.exponentialRampToValueAtTime(220,t+d);a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g,t+.05);a.gain.setValueAtTime(g,t+d*.8);a.gain.linearRampToValueAtTime(0,t+d);
    o.connect(ws);ws.connect(lp);lp.connect(a);a.connect(pan(p));o.start(t);o.stop(t+d+.02)}
  function riser(t,d,g){swell(t,d,300,4200,g,0,1.6);var o=ctx.createOscillator(),a=ctx.createGain();o.type="triangle";o.frequency.setValueAtTime(NOTE.A2,t);o.frequency.exponentialRampToValueAtTime(NOTE.A4,t+d);
    a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(g*.5,t+d*.95);a.gain.linearRampToValueAtTime(0,t+d);o.connect(a);a.connect(pan(0));o.start(t);o.stop(t+d+.02)}

  /* ---- the loop's warps, inverted, so choreography sounds sit on their pictures ---- */
  function inv(fn,T,a,b){for(var k=0;k<48;k++){var m=(a+b)/2;if(fn(m)<T)a=m;else b=m}return (a+b)/2}
  var S=P.seg;function ev(fr,what){EV.push([Math.round(fr*100)/100,what])}

  /* ===== BED (continuous, out 0..N-1) ===== */
  /* sections: [out0, out1, root, chord, hats per beat] */
  var IMP=O(P.potHit);
  var SEC=[[0,S.A4.o0,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2],[S.A4.o0,S.A5.o0,NOTE.Bb1*2,[NOTE.Bb2,NOTE.D3,NOTE.F3],2],[S.A5.o0,S.A6.o0,NOTE.C2,[NOTE.C3,NOTE.E3,NOTE.G3],4],
    [S.A6.o0,S.A9.o0,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],4],[S.A9.o0,IMP-2,NOTE.A1,[NOTE.A2,NOTE.Cs4/2,NOTE.E3],4],
    [IMP,S.A12.o0,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2],[S.A12.o0,S.A13.o0,NOTE.D2,[NOTE.D3,NOTE.Eb4/2,NOTE.A3],4],
    [S.A13.o0,S.A14.o0,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3],2],[S.A14.o0,N,NOTE.D2,[NOTE.D3,NOTE.F3,NOTE.A3,NOTE.E4],2]];
  ROUTE=bedBus;   /* the bed: pad, drums, 808 (the call ticks below go to the main bus) */
  if(BED)SEC.forEach(function(sc){var o0=sc[0],o1=sc[1];if(o1<=o0)return;pad(at(o0),(o1-o0)/FPS,sc[3],MIX.pad,MIX.padlp)});   /* QA 2026-10-11: was .02 through 750/1000 Hz, an octave down */
  /* drums on the 120 BPM grid (1 beat = 30 f): kick on beat 1 and the "and" of 2, clap on 3; hats per section */
  function secAt(f){for(var i=0;i<SEC.length;i++)if(f>=SEC[i][0]&&f<SEC[i][1])return SEC[i];return null}
  var callSet={};P.calls.forEach(function(c,k){callSet[c]=k});
  for(var f=0;f<N;f+=7.5){var sc=secAt(f);if(!sc)continue;var inBar=f%120,isImpWin=f>=IMP-2&&f<IMP;
    if(isImpWin)continue;
    if(BED&&(inBar===0||inBar===45||(inBar===97.5&&sc[4]>2))){if(!(f>=IMP-30&&f<IMP)&&f>0)kick(at(f),inBar===97.5?.32:.5)}   /* frame 0 has its own sub hit */
    if(BED&&(inBar===60||(sc===SEC[6]&&inBar===105)))clap(at(f),.2);
    var step=30/sc[4],onHat=(f%step)<1e-6;
    var ck=callSet[Math.round(f)];
    if(ck!=null&&D.drops[ck].has){                         /* the call ticks are the hat on that 16th: a metal tick, up for UP, down for DOWN */
      var dr=D.drops[ck];ROUTE=bus;metal(hit(Math.round(f)),dr.dir==="UP"?NOTE.A5:NOTE.D5,.06,.2,-.45+.3*ck,.8);ROUTE=bedBus;if(BED)hat(at(f),.03,0);ev(Math.round(f),"call tick "+dr.name+" "+dr.dir)}
    else if(onHat&&BED)hat(at(f),f%30===0?.05:.034,.12*((f/7.5)%2?1:-1))}
  /* 808 line: root on beat 1 (held), a pickup on the "and" of 2, the fifth on beat 4 in the busy sections */
  for(f=0;f<N&&BED;f+=30){var sc2=secAt(f);if(!sc2)continue;var b=(f%120)/30,r=sc2[2];if(f>=IMP-30&&f<IMP)continue;
    if(b===0)b808(at(f),r,.95,f?.17:.12);else if(b===1)b808(at(f+15),r,.55,.13);else if(b===2)b808(at(f+15),r,.4,.1);else if(b===3)b808(at(f),r*(sc2[4]>2?1.5:1),.5,.13)}   /* halved (QA 2026-10-11) */
  ROUTE=bus;
  /* frame 0: the loop restarts on a D sub hit */
  thud(hit(0),NOTE.D3,NOTE.D1,1.0,.6,0);ev(0,"sub D (loop start)");

  /* ===== A1 HOOK: loop choreography at warp^-1 ===== */
  function wA1(f){return P.warpA1(f)}
  [[1.43,0],[1.475,1],[1.52,2]].forEach(function(q){var fr=inv(wA1,q[0],0,120);metal(hit(fr),[NOTE.D5,NOTE.F5,NOTE.A5][q[1]],.13,.5,[-.4,0,.4][q[1]]);ev(fr,"pinch metal")});
  var p0=inv(wA1,1.85,0,120),p1=inv(wA1,2.05,0,120);grains(hit(p0),(p1-p0)/FPS,2400,900,90,.09,0,10);ev(p0,"pour grains");
  [[1.97,0],[2.05,1],[2.13,2]].forEach(function(q){var fr=inv(wA1,q[0],0,120);thud(hit(fr),150,70,.22,.24,[-.4,0,.4][q[1]]);metal(hit(fr),[NOTE.D4,NOTE.F4,NOTE.A4][q[1]],.05,.35,[-.4,0,.4][q[1]],.6);ev(fr,"glyph land thud")});
  var gl0=inv(wA1,2.45,0,120);swell(hit(gl0),.62,2600,7500,.02,0,3);ev(gl0,"glint shimmer");

  /* ===== A5 GRADED: the outcome on the cut, wrong drops sink, the winner rises ===== */
  thud(hit(S.A5.o0),110,45,.5,.5,0);metal(hit(S.A5.o0),D.up?NOTE.A4:NOTE.D4,.07,.6,0,.5);ev(S.A5.o0,"outcome thud");
  P.wrong.forEach(function(w){var fo=O(w.floor);if(fo==null)return;var px=-.45+.3*w.k;
    thud(hit(fo),95,40,.3,.22,px);grains(hit(fo),.55,1600,180,70,.06,px,7);ev(fo,"sink "+D.drops[w.k].name)});
  var wr=O(P.winRise);if(D.wins.length&&wr!=null){metal(hit(wr),NOTE.D6,.08,.9,.1,.8);metal(hit(wr)+.06,NOTE.A6/2,.06,.9,.1,.6);ev(wr,"winner metal D+A")}
  var pu=O(P.push);if(pu!=null){swell(hit(pu)-16/FPS,16/FPS,500,1800,.03,0)}

  /* ===== A6 RACE: one metal tick per round on the lane that won it; an accent when the lead changes ===== */
  P.race.forEach(function(rr,j){var fo=O(rr.m);if(fo==null)return;
    if(rr.lanes.length)rr.lanes.forEach(function(l){metal(hit(fo),PENT[3+2*l],.05,.16,-.45+.3*l,.7)});else hat(hit(fo),.03,0);
    if(rr.leadChange){metal(hit(fo),NOTE.D6,.06,.5,-.45+.3*rr.lead,.9);ev(fo,"lead change -> lane "+rr.lead)}
    ev(fo,"round "+(j+1)+" tick")});
  var lastR=O(P.race[P.race.length-1].m);if(lastR!=null){metal(hit(lastR),NOTE.D6,.09,1.1,-.45,1);thud(hit(lastR),90,50,.3,.22,0);ev(lastR,"#1 final")}

  /* ===== A9 FEES: a bead lands every 8th, walking up the pentatonic as the pot grows ===== */
  var kb=0;P.fees.forEach(function(m){var fo=O(m);if(fo==null)return;
    metal(hit(fo),PENT[Math.min(PENT.length-1,2+kb)],.05,.22,.35,.6);grains(hit(fo),.12,2600,900,90,.05,.35,10);kb++;ev(fo,"bead lands")});

  /* ===== A11 LANDS: riser, two silent frames, the impact ===== */
  riser(at(IMP-36),34/FPS,.16);ev(IMP-36,"riser");
  /* the bed ducks 4 dB under the riser and comes back with the impact (inside the two silent frames) */
  var bd0=at(IMP-36),bd1=OFF+(IMP-1)/FPS;bedBus.gain.setValueAtTime(1,bd0);bedBus.gain.linearRampToValueAtTime(.63,bd0+.08);
  bedBus.gain.setValueAtTime(.63,bd1);bedBus.gain.linearRampToValueAtTime(1,bd1+1/FPS);
  /* the chip reveal (cut to A11): a low struck-metal resonance and a soft body under the riser (QA: the weakest cut), short and
     well below the impact */
  var cr=S.A11.o0;metal(hit(cr),NOTE.D3,.22*MIX.chip,MIX.chipD,0,.9);metal(hit(cr),NOTE.A3,.1*MIX.chip,MIX.chipD*.75,.15,.7);thud(hit(cr),160,70,.25,.32*MIX.chip,0);ev(cr,"chip reveal metal");
  /* the duck sits after the compressors, so it runs on the true clock (no LAT): silent for sound frames IMP-1 and IMP */
  var q0=OFF+(IMP-1)/FPS,q1=OFF+(IMP+1)/FPS;duck.gain.setValueAtTime(1,q0-.002);duck.gain.linearRampToValueAtTime(0,q0);duck.gain.setValueAtTime(0,q1-.001);duck.gain.linearRampToValueAtTime(1,q1);
  thud(hit(IMP),55,28,1.2,.85,0);kick(hit(IMP),.55);
  (function(){var s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),a=ctx.createGain();s.buffer=NB;lp.type="lowpass";lp.frequency.value=2400;
    env(a,hit(IMP),.002,.3,.2);s.connect(lp);lp.connect(a);a.connect(pan(0));s.start(hit(IMP),.3);s.stop(hit(IMP)+.34)})();
  metal(hit(IMP),NOTE.D3,.14,2.2,0,.4);grains(hit(IMP+1),.35,900,260,60,.05,0,6);ev(IMP,"IMPACT");
  drone(hit(IMP+1),(S.A12.o0-IMP-1)/FPS,NOTE.D1*2,.03*MIX.drone,200,700);

  /* ===== A12 LEVERAGE: the hit sits on the wipe-out line, on the cut (critique must-fix 5) ===== */
  var lv=S.A12.o0;thud(hit(lv),80,32,.9,.62,0);metal(hit(lv),NOTE.D3,.1,1.4,0,.4);metal(hit(lv),NOTE.Eb4,.05,1.2,.2,.5);ev(lv,"hit on leverage + wipe-out line");
  grains(at(lv),(S.A13.o0-lv)/FPS,300,1400,40,.025,0,4,.6);                    /* the pot's shiver under the line */

  /* ===== A13 SPLIT: left buyback, right rekt, the same level; the bed stays centred ===== */
  var L=-.6,R=.6,s0=S.A13.o0,s1=S.A13.o1+1;
  function oSp(m){return O(m)}
  [[1.43,0],[1.475,1],[1.52,2]].forEach(function(q){var m=inv(P.warpSplitL,q[0],1320,1392),fr=oSp(m);metal(hit(fr),[NOTE.D5,NOTE.F5,NOTE.A5][q[1]],.09,.45,L);ev(fr,"L pinch")});
  var lp0=inv(P.warpSplitL,1.85,1320,1392);grains(hit(oSp(lp0)),.25,2400,900,80,.06,L,10,.15);
  [[1.97,0],[2.05,1],[2.13,2]].forEach(function(q){var m=inv(P.warpSplitL,q[0],1320,1392),fr=oSp(m);thud(hit(fr),140,60,.2,.18,L);metal(hit(fr),[NOTE.D4,NOTE.F4,NOTE.A4][q[1]],.05,.4,L,.6);ev(fr,"L land")});
  var lEnd=oSp(1392);for(var a16=lEnd;a16<s1;a16+=7.5){metal(at(a16),[NOTE.D5,NOTE.F5,NOTE.A5,NOTE.F5][Math.round((a16-lEnd)/7.5)%4],.02*MIX.arpL,.15,L,.4)}   /* 16th arpeggio under the buyback hold */
  for(a16=s0;a16<lEnd;a16+=15){metal(at(a16),NOTE.D5,.014*MIX.arpL,.12,L,.3)}
  grains(hit(oSp(P.splitBoil)),30/FPS,700,2200,110,.07,R,5,.15);ev(oSp(P.splitBoil),"R boil");
  var sk0=oSp(P.splitSink[0]);glide(hit(sk0),(s1-sk0-1)/FPS,NOTE.D3,NOTE.D1,.06*MIX.drainR,R);grains(hit(sk0),(s1-sk0-1)/FPS,1400,140,55,.065*MIX.drainR,R,7,.15);thud(hit(oSp(P.splitSlump)),70,30,.5,.2,R);
  ev(sk0,"R drain glide to the end of the split");

  /* ===== A14 END and the melt into frame 0 ===== */
  metal(hit(S.A14.o0),NOTE.D5,.08,1.6,0,.9);metal(hit(S.A14.o0)+.02,NOTE.A5,.045,1.4,.15,.7);ev(S.A14.o0,"tagline metal on the cut");
  function wA14(m){return P.warpA14(m)}
  var mg=O(inv(wA14,5.35,1668,1799));if(mg!=null&&mg>=S.A14.o0){thud(hit(mg),120,48,.45,.3,0);ev(mg,"merge thud")}
  var g1=O(inv(wA14,6.15,1668,1799)),g2=O(inv(wA14,6.65,1668,1799));if(g1!=null){swell(hit(g1),(g2-g1)/FPS,2400,6800,.018,0,3);ev(g1,"glint shimmer")}
  swell(at(N-24),24/FPS,400,2400,.035,0,1.4);ev(N-24,"lift into frame 0");
  }   /* end of cycle() */

  /* keep the second cycle only: samples [dur, 2 dur) of the render */
  function render(){return ctx.startRendering().then(function(buf){
    var k0=Math.round(SR*dur*(CYC-1)),n=Math.round(SR*dur);
    var Lc=buf.getChannelData(0).subarray(k0,k0+n),Rc=buf.getChannelData(1).subarray(k0,k0+n),bytes=44+n*8,ab=new ArrayBuffer(bytes),v=new DataView(ab);
    function ws(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))}
    ws(0,"RIFF");v.setUint32(4,bytes-8,true);ws(8,"WAVE");ws(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,3,true);v.setUint16(22,2,true);v.setUint32(24,SR,true);v.setUint32(28,SR*8,true);v.setUint16(32,8,true);v.setUint16(34,32,true);ws(36,"data");v.setUint32(40,n*8,true);
    for(var i=0,o=44;i<n;i++,o+=8){v.setFloat32(o,Lc[i],true);v.setFloat32(o+4,Rc[i],true)}
    var u=new Uint8Array(ab),s="";for(var j=0;j<u.length;j+=32768)s+=String.fromCharCode.apply(null,u.subarray(j,j+32768));return btoa(s)})}}};
})();
