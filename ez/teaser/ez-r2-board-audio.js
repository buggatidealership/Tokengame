/* EZ film round 2, "THE BIG BOARD": the sound (48 kHz stereo, 32-bit float WAV, base64).
   The board is the band: every disc flip in window.R2B_EVENTS becomes a click (a frame's flip count N gives K = min(N, 24)
   clicks at seeded sub-frame offsets, gain sqrt(N / K)), panned by where on the board the flips happened. On top: a D minor
   bed at 120 BPM in Web Audio (pluck bass on 8ths, clap with a 1 to 3 kHz body, a pad for the freeze and the end, stabs), and
   the event sounds in JS (drip ticks, the gate "tk", the coin's descending click run, the neck clink, grains as sand, blips,
   selector ticks, the pour, the ratchet, the two lanes, LED seconds, the riser into the seam).
   Rules (spec-board.md section 12): every hit lands one frame after its picture event; BUY and SELL make the same sound;
   no slot bells, ka-ching, jackpot arpeggios, cheers, fanfare or sting; no sub drops, so a 300 Hz high-pass loses 6 LU or
   less (phone speakers); the bed ducks 4 dB under the four big hits; near-silence 11.6 to 12.0; tape-stop into silence at 10.0.
   Loop: two identical cycles are rendered (every event at t and t + 24 s, the seed reset per cycle) plus a tail; only the
   second cycle is kept, so 23.999 s runs straight into 0.000 s. Loudness (-14 LUFS, -1 dBTP) is set in r2-board-render.sh.
   opts.part: "all" (default), "fx" (clicks and event sounds only), "bed" (music only), "laneL", "laneR" (the two lane sounds). */
(function(){
"use strict";
window.__r2bAudio=function(opts){
  opts=opts||{};var PART=opts.part||"all";
  var E=window.R2B_EVENTS,T=E.T,SR=48000,DUR=24,FPS=60,CYC=2,TAIL=.6,PRE=.5,NS=Math.round(SR*(PRE+CYC*DUR+TAIL)),F1=1/FPS;
  var MIX={click:.085,patter:.05,bass:.2,clap:.16,pad:.018,stab:.2,fx:1,lim:-6,comp:-18};
  if(window.R2B_MIX_TEST)for(var k0 in window.R2B_MIX_TEST)MIX[k0]=window.R2B_MIX_TEST[k0];
  var seed=1;function rnd(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
  /* ---------------- JS DSP ---------------- */
  function biq(type,f0,Q){var w=2*Math.PI*f0/SR,a=Math.sin(w)/(2*Q),c=Math.cos(w),b0,b1,b2,a0=1+a,a1=-2*c,a2=1-a;
    if(type==="bp"){b0=a;b1=0;b2=-a}else if(type==="lp"){b0=(1-c)/2;b1=1-c;b2=(1-c)/2}else{b0=(1+c)/2;b1=-(1+c);b2=(1+c)/2}
    b0/=a0;b1/=a0;b2/=a0;a1/=a0;a2/=a0;var x1=0,x2=0,y1=0,y2=0;return function(x){var y=b0*x+b1*x1+b2*x2-a1*y1-a2*y2;x2=x1;x1=x;y2=y1;y1=y;return y}}
  function norm(a){var m=0;for(var i=0;i<a.length;i++)m=Math.max(m,Math.abs(a[i]));if(m)for(var j=0;j<a.length;j++)a[j]/=m;return a}
  /* a disc click: 3 ms noise burst through a 2.4 kHz resonant band-pass (Q 6), a plastic body at about 1.1 kHz, a 600 Hz
     knock, 15 to 25 ms decay; pitch +-8% per variant */
  function mkClick(pf,dec){var n=Math.round(SR*.035),o=new Float32Array(n),bp=biq("bp",2400*pf,6),bp2=biq("bp",1100*pf,4),hp=biq("hp",450,.7);
    for(var i=0;i<n;i++){var t=i/SR,nz=t<.003?(rnd()*2-1)*Math.exp(-t/.0011):0;
      var y=bp(nz)*3.2+bp2(nz)*1.4+Math.sin(2*Math.PI*600*pf*t)*Math.exp(-t/.0055)*.4+(t<.0006?(rnd()*2-1)*.5:0);o[i]=hp(y)*Math.exp(-t/dec)}return norm(o)}
  var CLK=[];for(var v=0;v<24;v++)CLK.push(mkClick(.92+.16*rnd(),.015+.01*rnd()));
  /* pitched tick (coin steps, selector, LED, ratchet, blips' attack) */
  function tick(f,dec,bright){var n=Math.round(SR*Math.min(.25,dec*6)),o=new Float32Array(n),bp=biq("bp",f*1.5,3);
    for(var i=0;i<n;i++){var t=i/SR,e=Math.exp(-t/dec);o[i]=(Math.sin(2*Math.PI*f*t)*.8+Math.sin(2*Math.PI*f*2.01*t)*.35*bright+(t<.002?bp(rnd()*2-1)*1.5:0))*e}return norm(o)}
  /* the neck clink: bright inharmonic partials, 120 ms */
  function clink(){var n=Math.round(SR*.3),o=new Float32Array(n),P=[[2093,1],[3141,.6],[4710,.45],[6270,.25]];
    for(var i=0;i<n;i++){var t=i/SR,s=0;P.forEach(function(p,k){s+=Math.sin(2*Math.PI*p[0]*t+k)*p[1]*Math.exp(-t/(.07-.012*k))});o[i]=s+(t<.002?(rnd()*2-1)*.6:0)}return norm(o)}
  var CLINK=clink();
  /* the gate "tk": the same for BUY and SELL; a woody knock */
  var GATE=(function(){var n=Math.round(SR*.06),o=new Float32Array(n),bp=biq("bp",1300,5);for(var i=0;i<n;i++){var t=i/SR;
    o[i]=(Math.sin(2*Math.PI*820*t)*Math.exp(-t/.012)*.7+Math.sin(2*Math.PI*1640*t)*Math.exp(-t/.007)*.4+bp(t<.004?rnd()*2-1:0)*2.5)}return norm(o)})();
  /* sand grains: short noise grains through a band-pass; gold rises 1.6 to 2.4 kHz with the level, slate is drier and lower */
  function grain(fc,dec){var n=Math.round(SR*dec*5),o=new Float32Array(n),bp=biq("bp",fc,2.5);for(var i=0;i<n;i++){var t=i/SR;o[i]=bp(rnd()*2-1)*Math.exp(-t/dec)}return norm(o)}
  var GG=[];for(var g=0;g<8;g++)GG.push(grain(1600+g*115,.006));var GS=grain(1000,.004);
  /* a soft thud (lanes, wrong side): low-mid, no sub */
  function thud(){var n=Math.round(SR*.35),o=new Float32Array(n),lp=biq("lp",900,.7);for(var i=0;i<n;i++){var t=i/SR;
    o[i]=lp(Math.sin(2*Math.PI*190*t)*.6+Math.sin(2*Math.PI*380*t)*.55+Math.sin(2*Math.PI*570*t)*.25+(t<.004?(rnd()*2-1)*.5:0))*Math.exp(-t/.08)}return norm(o)}
  /* a soft chord (lanes, right side): F A D, mid register */
  function softChord(fs,len){var n=Math.round(SR*len),o=new Float32Array(n);for(var i=0;i<n;i++){var t=i/SR,a=Math.min(1,t/.02)*Math.exp(-t/(len*.35)),s=0;
    fs.forEach(function(f,k){s+=(Math.sin(2*Math.PI*f*t)+.35*Math.sin(4*Math.PI*f*t+k)+.15*Math.sin(6*Math.PI*f*t))*(1-k*.1)});o[i]=s*a}return norm(o)}
  var L=new Float32Array(NS),R=new Float32Array(NS),LL=new Float32Array(NS),LR=new Float32Array(NS);
  function add(buf,t,g,pan,dl,dr){var i0=Math.round(t*SR);if(i0<0)return;var gl=g*Math.cos((pan+1)*Math.PI/4),gr=g*Math.sin((pan+1)*Math.PI/4);
    dl=dl||L;dr=dr||R;for(var i=0;i<buf.length&&i0+i<NS;i++){dl[i0+i]+=buf[i]*gl;dr[i0+i]+=buf[i]*gr}}
  var LAT=0;
  function hit(t){return t+F1}   /* one frame after the picture (the JS track is shifted by the chain latency at playback) */
  var N12=[0,1,2,3,4,5,6,7,8,9,10,11];
  var LANES=PART==="laneL"||PART==="laneR";
  function fx(OFF){seed=20261012;
    if(LANES){fxLanes(OFF);return}
    fxBoard(OFF);fxLanes(OFF);fxEnd(OFF)}
  function fxBoard(OFF){
    /* 1. the board: every flip, as clicks */
    var flips=E.flips,cols=E.flipCol,dyn=E.dynFlips;
    for(var f=0;f<flips.length;f++){var n=flips[f]-(dyn[f]||0);if(n<=0)continue;var K=Math.min(n,24),gk=Math.sqrt(n/K),pan=Math.max(-.8,Math.min(.8,(cols[f]/96-.5)*1.3));
      for(var k=0;k<K;k++)add(CLK[Math.floor(rnd()*24)],OFF+(f+1+rnd())/FPS,MIX.click*gk*(.7+.6*rnd()),Math.max(-.9,Math.min(.9,pan+(rnd()-.5)*.4)))}
    /* 2. patter hats on 16ths while the bed plays (not in the locked read, the freeze, or under the chip's quiet) */
    for(var s=0;s<DUR*8;s++){var t=s/8;if(bedLevel(t)<.5||(t>=T.lockRead[0]&&t<T.lockRead[1]))continue;var acc=s%4===2?1:s%2?.45:.7;
      add(CLK[(s*7)%24],OFF+t+F1+.002,MIX.patter*acc*bedLevel(t),((s%4)-1.5)*.25)}
    /* B8: patter hats only (the bed thins to a pad) */
    for(var s2=0;s2<DUR*8;s2++){var t2=s2/8;if(t2<T.b8||t2>=T.b9)continue;add(CLK[(s2*5)%24],OFF+t2+F1+.002,MIX.patter*(s2%2?.6:1.1),((s2%4)-1.5)*.3)}
    /* 3. the drip: one soft tick per row */
    E.drip.forEach(function(t){add(tick(3200,.006,.3),OFF+hit(t),.09,.35)});
    /* 4. coins: the gate tk (same for BUY and SELL), a descending click run (a semitone per row), the clink at the neck */
    E.coins.forEach(function(cn){var vis=cn.beat==="B1";add(GATE,OFF+hit(cn.t0),vis?.32:.12,.25);
      cn.steps.forEach(function(st,k){add(tick(2400*Math.pow(2,-k/12),.007,.5),OFF+hit(st[0]),vis?.16:.07,.25)});
      add(CLINK,OFF+hit(cn.tb),vis?.28:.16,.3)});
    /* 5. grains: gold rises with the level, slate is drier and lower */
    var ng=0,tot=E.grains.filter(function(x){return x[1]}).length;
    E.grains.forEach(function(gr){if(gr[1]){ng++;add(GG[Math.min(7,Math.floor(ng/tot*8))],OFF+hit(gr[0]),.07*(.7+.6*rnd()),.35+(rnd()-.5)*.3)}else add(GS,OFF+hit(gr[0]),.06,-.1)});
    /* 6. the race: a two-note rising blip on each lead change, a bright click per new win block, the settle */
    E.race.forEach(function(t,k){add(tick(1760,.03,.6),OFF+hit(t),.2,0);add(tick(2349,.05,.6),OFF+hit(t)+.06,.2,0);
      var nb=E.raceBlocks[k]-(k?E.raceBlocks[k-1]:0);for(var b=0;b<Math.min(nb,16);b++)add(tick(3000+b*60,.005,.4),OFF+hit(t)+.03+b*.012,.07,(b/16-.5))});
    /* 7. the freeze: one crisp clack for the frame, then a faint icy shimmer (5 to 8 kHz, about -28 dB) */
    var sh=(function(){var n=Math.round(SR*1.4),o=new Float32Array(n),bp=biq("bp",6500,1.2);for(var i=0;i<n;i++){var t=i/SR;o[i]=bp(rnd()*2-1)*Math.min(1,t/.05)*Math.exp(-t/.5)}return norm(o)})();
    add(sh,OFF+hit(T.freeze)+.02,.03,0);
    /* 8. the call: selector hops (soft ticks), the pour (a falling click cascade), the ratchet (10 clicks accelerating) */
    E.sel.forEach(function(t){add(tick(1500,.008,.3),OFF+hit(t),.08,.3)});
    E.pour.forEach(function(p,k){add(CLK[k%24],OFF+hit(p[1]),.07,.25);add(tick(2600*Math.pow(2,-k/40),.005,.3),OFF+hit(p[0]),.045,-.4+k/E.pour.length)});
    E.ratchet.forEach(function(t,k){add(tick(1400*Math.pow(2,k/12),.012,.6),OFF+hit(t),.16,.3)})}
  function fxLanes(OFF){
    /* 9. the lanes: equal weight. Left: three bright clicks rising and a soft chord. Right: a downward patter into a muted thud.
       The right side is RMS-matched to the left over the lane window, so neither outcome sounds bigger */
    var l0=T.lanes[0],l1=T.lanes[1],lL=new Float32Array(NS),lR=new Float32Array(NS),rl=new Float32Array(NS),rr=new Float32Array(NS);
    [0,1,2].forEach(function(k){add(tick(1568*Math.pow(2,k*4/12),.02,.6),OFF+hit(l0+k*(l1-l0)/3),.5,-.35,lL,lR)});add(softChord([349.2,440,587.3],1.1),OFF+hit(l1),.32,-.35,lL,lR);
    for(var k3=0;k3<9;k3++)add(tick(2093*Math.pow(2,-k3*2/12),.012,.4),OFF+hit(l0+k3*(l1-l0)/9),.32,.35,rl,rr);add(thud(),OFF+hit(l1),.6,.35,rl,rr);
    var eL=0,eR=0,j0=Math.round((OFF+l0)*SR),j1=Math.min(NS,Math.round((OFF+l1+1.4)*SR));
    for(var j=j0;j<j1;j++){eL+=lL[j]*lL[j]+lR[j]*lR[j];eR+=rl[j]*rl[j]+rr[j]*rr[j]}var kR=Math.sqrt(eL/Math.max(1e-12,eR));window.R2B_LANE_RMS_MATCH=kR;
    for(var j2=j0;j2<j1;j2++){if(PART!=="laneR"){L[j2]+=lL[j2];R[j2]+=lR[j2]}if(PART!=="laneL"){L[j2]+=rl[j2]*kR;R[j2]+=rr[j2]*kR}}
  }
  function fxEnd(OFF){
    /* 10. the chip: one LED tick (2 kHz) on each second */
    E.led.forEach(function(t){add(tick(2000,.01,.2),OFF+hit(t),.13,.2)});
    /* 11. the riser into the seam: click density swelling 23.25 .. 24.0 */
    for(var q=0;q<60;q++){var u=q/60,t3=T.b9-.5+.75*Math.pow(u,.6);add(CLK[q%24],OFF+t3,MIX.click*.6*(.3+u),(rnd()-.5)*1.2)}
  }
  /* bed level by time (0..1): full, half, off */
  function bedLevel(t){if(t<T.lockRead[0])return 1;if(t<T.lockRead[1])return .45;if(t<T.freeze)return 1;if(t<T.b5)return 0;if(t<T.b6)return 1;if(t<T.b8)return .72;return 0}
  if(PART!=="bed"){for(var c=0;c<CYC;c++)fx(PRE+c*DUR)}
  /* ---------------- the bed and the hits (Web Audio) ---------------- */
  return chainLatency().then(function(lat){LAT=lat;window.R2B_AUDIO_LAT_MS=lat*1000;return renderAll()});
  function chainLatency(){var c2=new OfflineAudioContext(1,4800,SR),bb=c2.createBuffer(1,4800,SR);bb.getChannelData(0)[480]=.5;var sr=c2.createBufferSource();sr.buffer=bb;
    var k1=c2.createDynamicsCompressor(),k2=c2.createDynamicsCompressor();[[k1,{threshold:MIX.comp,ratio:3,attack:.006,release:.15,knee:6}],[k2,{threshold:MIX.lim,ratio:20,attack:.001,release:.06,knee:0}]].forEach(function(q){for(var nm in q[1])q[0][nm].value=q[1][nm]});
    sr.connect(k1);k1.connect(k2);k2.connect(c2.destination);sr.start(0);return c2.startRendering().then(function(o){var d=o.getChannelData(0),i=0;while(i<d.length&&Math.abs(d[i])<1e-4)i++;return (i-480)/SR})}
  function renderAll(){
  var ctx=new OfflineAudioContext(2,NS,SR);
  var master=ctx.createGain();master.gain.value=1;
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=MIX.comp;comp.ratio.value=3;comp.attack.value=.006;comp.release.value=.15;comp.knee.value=6;
  var lim=ctx.createDynamicsCompressor();lim.threshold.value=MIX.lim;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.06;lim.knee.value=0;
  master.connect(comp);comp.connect(lim);lim.connect(ctx.destination);
  var bedF=ctx.createBiquadFilter();bedF.type="lowpass";bedF.frequency.value=16000;bedF.Q.value=.5;var bedG=ctx.createGain();bedG.gain.value=0;
  var bed=ctx.createGain();bed.connect(bedF);bedF.connect(bedG);bedG.connect(master);
  var hitBus=ctx.createGain();hitBus.connect(master);
  var noiseB=(function(){var b=ctx.createBuffer(1,SR*2,SR),d=b.getChannelData(0),s=7;for(var i=0;i<d.length;i++){s=(s*16807)%2147483647;d[i]=s/1073741823.5-1}return b})();
  var clickBuf=ctx.createBuffer(2,NS,SR);clickBuf.getChannelData(0).set(L);clickBuf.getChannelData(1).set(R);
  var DOBED=PART==="all"||PART==="bed",DOFX=PART==="all"||PART==="fx",DOCLK=PART!=="bed";
  if(DOCLK){var cs=ctx.createBufferSource();cs.buffer=clickBuf;cs.connect(master);cs.start(0,LAT)}
  var NT={D2:73.42,F2:87.31,G2:98,A2:110,Bb2:116.54,C3:130.81,D3:146.83,F3:174.61,A3:220,Bb3:233.08,C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392,A4:440,Bb4:466.16,C5:523.25,D5:587.33,E5:659.26,F5:698.46,A5:880,D6:1174.66};
  var CH=[["D2","D3","A2","D3"],["D2","D3","F2","D3"],["Bb2","Bb2","F2","Bb2"],["C3","C3","G2","C3"],["D2","D3","A2","D3"],null,["D2","D3","A2","D3"],["Bb2","Bb2","F2","Bb2"],["C3","C3","G2","C3"],["D2","D3","A2","D3"],null,null];
  function pluck(t,f,g){var o=ctx.createOscillator(),o2=ctx.createOscillator(),lp=ctx.createBiquadFilter(),ga=ctx.createGain(),g2=ctx.createGain();
    o.type="sawtooth";o2.type="square";o.frequency.value=f;o2.frequency.value=f*2;g2.gain.value=.55;
    lp.type="lowpass";lp.Q.value=5;lp.frequency.setValueAtTime(2800,t);lp.frequency.exponentialRampToValueAtTime(520,t+.13);
    ga.gain.setValueAtTime(0,t);ga.gain.linearRampToValueAtTime(g,t+.004);ga.gain.exponentialRampToValueAtTime(.0005,t+.23);
    var hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=60;
    o.connect(lp);o2.connect(g2);g2.connect(lp);lp.connect(hp);hp.connect(ga);ga.connect(bed);o.start(t);o2.start(t);o.stop(t+.26);o2.stop(t+.26)}
  function clap(t,g,dest){var src=ctx.createBufferSource();src.buffer=noiseB;var bp=ctx.createBiquadFilter();bp.type="bandpass";bp.frequency.value=1700;bp.Q.value=.9;
    var hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=700;var ga=ctx.createGain();ga.gain.setValueAtTime(0,t);
    [0,.011,.022].forEach(function(d){ga.gain.setValueAtTime(g,t+d);ga.gain.exponentialRampToValueAtTime(g*.15,t+d+.009)});ga.gain.setValueAtTime(g*.8,t+.033);ga.gain.exponentialRampToValueAtTime(.0005,t+.18);
    src.connect(bp);bp.connect(hp);hp.connect(ga);ga.connect(dest||bed);src.start(t,(t*7.3)%1.5);src.stop(t+.2)}
  function pad(t0,t1,notes,g,lpf){notes.forEach(function(n,k){[-6,6].forEach(function(dt){var o=ctx.createOscillator(),lp=ctx.createBiquadFilter(),ga=ctx.createGain(),hp=ctx.createBiquadFilter();
      o.type="sawtooth";o.frequency.value=NT[n];o.detune.value=dt+k*1.5;lp.type="lowpass";lp.frequency.value=lpf||1600;lp.Q.value=.3;hp.type="highpass";hp.frequency.value=220;
      ga.gain.setValueAtTime(0,t0);ga.gain.linearRampToValueAtTime(g,t0+.35);ga.gain.setValueAtTime(g,Math.max(t0+.35,t1-.3));ga.gain.linearRampToValueAtTime(0,t1);
      o.connect(lp);lp.connect(hp);hp.connect(ga);ga.connect(bed);o.start(t0);o.stop(t1+.05)})})}
  /* a stab: a voiced chord with strong 2nd to 5th harmonics, fast filter, mid-forward, no sub */
  function stab(t,notes,g,len,dest){notes.forEach(function(n,k){["sawtooth","square"].forEach(function(ty,q){var o=ctx.createOscillator(),lp=ctx.createBiquadFilter(),ga=ctx.createGain();
      o.type=ty;o.frequency.value=NT[n];o.detune.value=(q?7:-5)+k;lp.type="lowpass";lp.Q.value=2;lp.frequency.setValueAtTime(5200,t);lp.frequency.exponentialRampToValueAtTime(900,t+len*.8);
      var hp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=200;
      ga.gain.setValueAtTime(0,t);ga.gain.linearRampToValueAtTime(g*(q?.45:.6)/Math.sqrt(notes.length),t+.005);ga.gain.exponentialRampToValueAtTime(.0004,t+len);
      o.connect(lp);lp.connect(hp);hp.connect(ga);ga.connect(dest||hitBus);o.start(t);o.stop(t+len+.05)})})}
  function burst(t,g,len,fc){var src=ctx.createBufferSource();src.buffer=noiseB;var bp=ctx.createBiquadFilter();bp.type="bandpass";bp.frequency.value=fc||2600;bp.Q.value=.8;
    var ga=ctx.createGain();ga.gain.setValueAtTime(g,t);ga.gain.exponentialRampToValueAtTime(.0005,t+len);src.connect(bp);bp.connect(ga);ga.connect(hitBus);src.start(t,(t*3.1)%1.5);src.stop(t+len+.02)}
  function riser(t0,t1,f0,f1,g,dest){var src=ctx.createBufferSource();src.buffer=noiseB;src.loop=true;var bp=ctx.createBiquadFilter();bp.type="bandpass";bp.Q.value=1.4;
    bp.frequency.setValueAtTime(f0,t0);bp.frequency.exponentialRampToValueAtTime(f1,t1);var ga=ctx.createGain();ga.gain.setValueAtTime(.0001,t0);ga.gain.exponentialRampToValueAtTime(g,t1);ga.gain.setValueAtTime(.0001,t1+.005);
    src.connect(bp);bp.connect(ga);ga.connect(dest||hitBus);src.start(t0);src.stop(t1+.02)}
  function cycleBed(OFF){
    /* bed level automation */
    var lv=function(x){return Math.max(.0001,x)};
    bedG.gain.setValueAtTime(lv(1),OFF+0);
    if(DOBED){
      /* ducking under the slam at f0 */
      bedG.gain.setValueAtTime(.63,OFF+F1);bedG.gain.linearRampToValueAtTime(1,OFF+.18);
      bedG.gain.setValueAtTime(1,OFF+T.lockRead[0]);bedG.gain.linearRampToValueAtTime(.45,OFF+T.lockRead[0]+.08);bedG.gain.setValueAtTime(.45,OFF+T.lockRead[1]);bedG.gain.linearRampToValueAtTime(1,OFF+T.lockRead[1]+.1);
      bedG.gain.setValueAtTime(1,OFF+T.b2+F1-.001);bedG.gain.setValueAtTime(.63,OFF+T.b2+F1);bedG.gain.linearRampToValueAtTime(1,OFF+T.b2+.2);
      /* the tape-stop into silence at 10.0 (150 ms): the bed's filter falls and the bed stops; a pad only after that */
      bedF.frequency.setValueAtTime(16000,OFF+T.freeze-.15);bedF.frequency.exponentialRampToValueAtTime(180,OFF+T.freeze);bedF.frequency.setValueAtTime(1800,OFF+T.freeze+.01);
      bedG.gain.setValueAtTime(1,OFF+T.freeze-.15);bedG.gain.linearRampToValueAtTime(.0001,OFF+T.freeze+F1*.5);
      bedG.gain.setValueAtTime(.0001,OFF+T.freeze+.15);bedG.gain.linearRampToValueAtTime(.5,OFF+T.freeze+.6);
      /* near-silence 11.6 .. 12.0 (bed -40 dB) */
      bedG.gain.setValueAtTime(.5,OFF+T.quiet[0]-.15);bedG.gain.linearRampToValueAtTime(.01,OFF+T.quiet[0]);
      bedF.frequency.setValueAtTime(1800,OFF+T.b5);bedF.frequency.setValueAtTime(16000,OFF+T.b5+F1);
      bedG.gain.setValueAtTime(.01,OFF+T.b5+F1-.001);bedG.gain.setValueAtTime(.63,OFF+T.b5+F1);bedG.gain.linearRampToValueAtTime(1,OFF+T.b5+.25);
      /* the clack at 14.0: duck, then the bed returns at half level */
      bedG.gain.setValueAtTime(1,OFF+T.b6+F1-.001);bedG.gain.setValueAtTime(.45,OFF+T.b6+F1);bedG.gain.linearRampToValueAtTime(.72,OFF+T.b6+.3);
      bedG.gain.setValueAtTime(.72,OFF+T.b8-.05);bedG.gain.linearRampToValueAtTime(.6,OFF+T.b8+.2);
      /* bass on 8ths */
      for(var e=0;e<DUR*4;e++){var t=e/4,bar=Math.floor(t/2),ch=CH[bar];if(!ch||bedLevel(t)<.01)continue;if(t>=T.freeze-.1&&t<T.b5)continue;
        var n=ch[e%4];pluck(OFF+t+F1,NT[n],MIX.bass*(e%2?.75:1))}
      /* the last bass note before the freeze bends down (the tape-stop) */
      /* clap on beats 2 and 4 */
      for(var b=0;b<DUR*2;b++){var tb=b/2;if(b%2===0)continue;if(bedLevel(tb)<.5||(tb>=T.lockRead[0]&&tb<T.lockRead[1]))continue;clap(OFF+tb+F1,MIX.clap)}
      /* pads: the freeze (Dm add9, dark and still) and the chip (Dm add9 to Bb add9) */
      pad(OFF+T.freeze+.15,OFF+T.b5+.05,["D4","F4","A4","E5"],MIX.pad,1300);
      pad(OFF+T.b8,OFF+21.8,["D4","F4","A4","E5"],MIX.pad*1.6,2200);pad(OFF+21.3,OFF+DUR+.05,["D4","F4","Bb4","C5"],MIX.pad*1.6,2200);
    }
    if(DOFX){
      /* f0: the board slam: an 80 ms click burst, a D pluck and a clap on the downbeat */
      burst(OFF+F1,.35,.08,2400);stab(OFF+F1,["D4","A4","D5"],MIX.stab*.7,.35);clap(OFF+F1,MIX.clap*1.2,hitBus);
      /* the rewrite cascades come from the flips */
      /* 5.0: the 69% slam: click burst, clap, D minor stab, mid-forward */
      burst(OFF+T.b2+F1,.3,.08,2600);clap(OFF+T.b2+F1,MIX.clap*1.2,hitBus);stab(OFF+T.b2+F1,["D4","F4","A4","D5"],MIX.stab,.5);
      /* 7.75: the settle stab */
      stab(OFF+T.settle+F1,["F4","A4","D5"],MIX.stab*.55,.3);
      /* 9.25 .. 10.0: a filtered riser under the clatter */
      riser(OFF+T.open[0],OFF+T.freeze,700,5200,.12);
      /* 10.0: one crisp clack for the frame */
      burst(OFF+T.freeze+F1,.42,.05,2900);
      /* 12.0: THE HIT. Dm add9 voiced 294 to 1175 Hz, full-board click cascade, a clap. No sub boom. */
      stab(OFF+T.b5+F1,["D4","A4","D5","E5","F5","A5","D6"],MIX.stab*1.5,1.2);burst(OFF+T.b5+F1,.45,.12,2300);clap(OFF+T.b5+F1,MIX.clap*1.4,hitBus);
      /* 12.75: the ticket rewrite is in the flips. 14.0: one synchronous clack and a clean stab */
      burst(OFF+T.b6+F1,.5,.06,2700);stab(OFF+T.b6+F1,["D4","A4","D5","F5"],MIX.stab*.9,.45);
      /* 19.75: a soft power-on swell under the dissolve (no hum below 300 Hz) */
      riser(OFF+T.dis1[0],OFF+T.dis1[1],500,1900,.05);
      /* 23.25 .. 24.0: the riser into the seam */
      riser(OFF+T.b9-.5,OFF+DUR,900,4200,.07)}
  }
  for(var c3=0;c3<CYC;c3++)cycleBed(PRE+c3*DUR-LAT);   /* the kept cycle is scheduled LAT early: the compressors' look-ahead puts it back on time */
  return ctx.startRendering().then(function(buf){
    /* a look-ahead peak limiter over the whole two-cycle render (stereo-linked, 3 ms look-ahead, 12 ms release), 9.5 dB under
       the raw peak: the disc clicks are fast transients the Web Audio limiter lets through, and the two-pass loudnorm stays
       linear only if the peaks sit at most 13 dB over the loudness. The kept cycle inherits the settled envelope, so the
       seam stays continuous. */
    var c0=buf.getChannelData(0),c1=buf.getChannelData(1),N=c0.length,pk=0;for(var q=0;q<N;q++)pk=Math.max(pk,Math.abs(c0[q]),Math.abs(c1[q]));
    var ceil=pk*Math.pow(10,-(opts.limDb!=null?opts.limDb:9.5)/20),LA=Math.round(SR*.003),rel=1-Math.exp(-1/(SR*(opts.relMs!=null?opts.relMs:12)/1000)),need=new Float32Array(N);
    for(var q2=0;q2<N;q2++){var m=Math.max(Math.abs(c0[q2]),Math.abs(c1[q2]));need[q2]=m>ceil?ceil/m:1}
    /* sliding minimum over [i, i+LA] (monotonic deque), then a release-only smoother; the attack is the look-ahead ramp */
    var dq=new Int32Array(N),h0=0,t0=0,gmin=new Float32Array(N);
    for(var q3=N-1;q3>=0;q3--){while(t0>h0&&need[dq[t0-1]]>=need[q3])t0--;dq[t0++]=q3;while(dq[h0]>q3+LA)h0++;gmin[q3]=need[dq[h0]]}
    var g=1,ramp=new Float32Array(N);for(var q4=0;q4<N;q4++){var tg=gmin[q4];g=tg<g?tg:g+(1-g)*rel;if(g>1)g=1;ramp[q4]=g}
    /* smooth the attack: average the gain over the look-ahead window so it ramps down instead of stepping */
    var acc=0,sm=new Float32Array(N);for(var q5=0;q5<N;q5++){acc+=ramp[q5];if(q5>=LA)acc-=ramp[q5-LA];sm[q5]=Math.min(ramp[q5],acc/Math.min(q5+1,LA))}
    for(var q6=0;q6<N;q6++){var gg=Math.min(sm[q6],gmin[q6]);c0[q6]*=gg;c1[q6]*=gg}
    window.R2B_LIMIT={rawPeakDb:20*Math.log10(pk),ceilDb:20*Math.log10(ceil)};
    var k0=Math.round(SR*(PRE+DUR*(opts.cycle!=null?opts.cycle:CYC-1))),n=Math.round(SR*DUR);
    var Lc=buf.getChannelData(0).subarray(k0,k0+n),Rc=buf.getChannelData(1).subarray(k0,k0+n),bytes=44+n*8,ab=new ArrayBuffer(bytes),v=new DataView(ab);
    function ws(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))}
    ws(0,"RIFF");v.setUint32(4,bytes-8,true);ws(8,"WAVE");ws(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,3,true);v.setUint16(22,2,true);v.setUint32(24,SR,true);v.setUint32(28,SR*8,true);v.setUint16(32,8,true);v.setUint16(34,32,true);ws(36,"data");v.setUint32(40,n*8,true);
    for(var i=0,o=44;i<n;i++,o+=8){v.setFloat32(o,Lc[i],true);v.setFloat32(o+4,Rc[i],true)}
    var u=new Uint8Array(ab),s="";for(var j=0;j<u.length;j+=32768)s+=String.fromCharCode.apply(null,u.subarray(j,j+32768));return btoa(s)})}};
})();
