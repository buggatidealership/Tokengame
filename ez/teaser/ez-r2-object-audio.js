/* EZ films round 2, "The Object": the sound (Web Audio, synthesised offline, 48 kHz stereo, 32-bit float WAV, base64 for render.js).
   120 BPM, 24 s = 12 bars, D major. Felt, glass and coins; one 16th-note pulse drives the fee set piece, the card and the stack; the
   freeze low-passes and stops it; near-silence; ONE big chord on the pour; two equal outcomes; LED clicks and an end tone into the loop.
   - Every event comes from window.R2_PIC (the page's own timing table and picture events); every hit lands one frame after its picture
     (hit()), with the compressor and limiter look-ahead removed (chainLatency, as ez-film30-audio.js).
   - Loop seam: two identical cycles are scheduled and only the second is kept, so 23.999 s runs into 0.000 s with the tails carried.
   - Phone speakers: every voice has its body in 300 Hz..6 kHz; the pulse bass (73..147 Hz) carries strong 2nd..5th harmonics; no sub.
     A 300 Hz high-pass must lose 6 LU or less (checked by r2-object-render.sh).
   - Never: bells as reward, "ka-ching", jackpot arpeggios, crowd sound, a fanfare on the right call or a sting on the wrong one.
   - The payoff halves: the same loudness (within 1 LU), panned 15% left and right (mono-safe). */
(function(){
"use strict";
window.renderAudio=function(o){return window.__r2objAudio(o)};
window.__r2objAudio=function(opts){
  var STEM=opts&&opts.stem;
  var P=window.R2_PIC,T=P.T,FPS=P.FPS,SR=48000,dur=24,CYC=2,TAIL=0.5;
  var MIX={pluck:.20,ting:.14,clink:.075,tap:.17,shaker:.03,bass:.17,pshk:.035,seal:.20,hit:.42,slide:.10,led:.10,pad:.0065,rise:.03,endt:.05,pay:.16,limT:-18,compT:-24};
  if(window.R2_MIX_TEST)for(var mk in window.R2_MIX_TEST)MIX[mk]=window.R2_MIX_TEST[mk];
  var ctx=new OfflineAudioContext(2,Math.round(SR*(CYC*dur+TAIL)),SR);
  var bus=ctx.createGain();bus.gain.value=.8;
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=MIX.compT;comp.ratio.value=3;comp.attack.value=.006;comp.release.value=.2;comp.knee.value=8;
  var lim=ctx.createDynamicsCompressor();lim.threshold.value=MIX.limT;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.08;lim.knee.value=0;
  var hpf=ctx.createBiquadFilter();hpf.type="highpass";hpf.frequency.value=110;hpf.Q.value=.6;
  bus.connect(hpf);hpf.connect(comp);comp.connect(lim);lim.connect(ctx.destination);
  var LAT=0;
  function chainLatency(){var c2=new OfflineAudioContext(1,4800,SR),b=c2.createBuffer(1,4800,SR);b.getChannelData(0)[480]=.5;
    var s=c2.createBufferSource();s.buffer=b;var k1=c2.createDynamicsCompressor(),k2=c2.createDynamicsCompressor();
    [[k1,comp],[k2,lim]].forEach(function(q){["threshold","ratio","attack","release","knee"].forEach(function(n){q[0][n].value=q[1][n].value})});
    s.connect(k1);k1.connect(k2);k2.connect(c2.destination);s.start(0);
    return c2.startRendering().then(function(o){var d=o.getChannelData(0),i=0;while(i<d.length&&Math.abs(d[i])<1e-4)i++;return (i-480)/SR})}
  return chainLatency().then(function(lat){LAT=Math.max(0,lat);window.R2_AUDIO_LAT_MS=LAT*1000;return schedule()});

  function schedule(){
    var EV=[],OFF=0;
    var NB=(function(){var b=ctx.createBuffer(1,SR*2,SR),d=b.getChannelData(0),s=7;for(var i=0;i<d.length;i++){s=(s*16807)%2147483647;d[i]=s/1073741823.5-1}return b})();
    var NOTE={B1:61.74,D2:73.42,E2:82.41,Fs2:92.5,G2:98,A2:110,B2:123.47,D3:146.83,Fs3:185,G3:196,A3:220,B3:246.94,Cs4:277.18,D4:293.66,E4:329.63,Fs4:369.99,G4:392,A4:440,B4:493.88,
      Cs5:554.37,D5:587.33,E5:659.25,Fs5:739.99,G5:783.99,A5:880,B5:987.77,D6:1174.66};
    /* the pulse filter: one shared low-pass (8 kHz; 1.2 kHz into the seal) and one gain (on 3.0..12.0, half from 14.5 to 19.0) */
    var pf=ctx.createBiquadFilter();pf.type="lowpass";pf.Q.value=.7;var pg=ctx.createGain();pf.connect(pg);pg.connect(bus);
    pf.frequency.setValueAtTime(8000,0);pg.gain.setValueAtTime(0,0);
    for(var cy=0;cy<CYC;cy++){OFF=cy*dur;cycle(cy===CYC-1)}
    window.R2_SFX=EV;
    return render();

    function cycle(log){
      function hit(t){return Math.max(0,OFF+t+1/FPS-LAT)}                   /* one frame after its picture */
      function ev(t,what){if(log)EV.push([+(t+1/FPS).toFixed(4),what])}
      function env(g,t,a,d,v){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0002,t+a+d);g.gain.setValueAtTime(0,t+a+d+.01)}
      function panTo(node,p){if(!p)return node;var sp=ctx.createStereoPanner();sp.pan.value=p;node.connect(sp);return sp}
      function out(node,p,dest){panTo(node,p).connect(dest||bus)}
      /* a tone with harmonics [[ratio,gain]...], low-passed */
      function tone(t,f,v,a,d,parts,lp,p,dest){var o0=ctx.createGain(),flt=ctx.createBiquadFilter();flt.type="lowpass";flt.frequency.value=lp||6000;flt.Q.value=.5;o0.connect(flt);out(flt,p,dest);
        env(o0,t,a,d,v);(parts||[[1,1]]).forEach(function(q){var o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f*q[0];g.gain.value=q[1];o.connect(g);g.connect(o0);o.start(t);o.stop(t+a+d+.05)})}
      function noise(t,f,Q,v,a,d,p,dest,type){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=NB;bp.type=type||"bandpass";bp.frequency.value=f;bp.Q.value=Q;
        s.connect(bp);bp.connect(g);out(g,p,dest);env(g,t,a,d,v);s.start(t,(f*0.37+t*13.1)%1.5);s.stop(t+a+d+.05)}
      /* voices */
      function pluck(t,f,v,p){tone(t,f,v,.006,.55,[[1,1],[2,.55],[3,.32],[4,.12]],3600,p)}                         /* felt pluck */
      function ting(t,v){tone(t,1800,v,.002,.9,[[1,1],[2.76,.28],[5.4,.06]],8000)}                                       /* glass mallet */
      function clink(t,v,res,p,dest){tone(t,2400*(res||1),v,.003,.08,[[1,1],[4100/2400,.7],[6300/2400,.45]],9000,p,dest);noise(t,4500*(res||1),3,v*.5,.0008,.02,p,dest)}  /* coin */
      function tap(t,f,v,p){tone(t,f||1400,v,.001,.07,[[1,1],[2.3,.3]],5000,p);noise(t,(f||1400)*1.2,2,v*.4,.0005,.012,p)}  /* porcelain / wood */
      function shaker(t,v,dest){noise(t,6000,1.2,v,.002,.045,0,dest)}
      function bass(t,f,v){var o0=ctx.createGain();o0.connect(pf);env(o0,t,.004,.11,v);[[1,1],[2,.85],[3,.6],[4,.4],[5,.25]].forEach(function(q){var o=ctx.createOscillator(),g=ctx.createGain();o.type=q[0]===1?"triangle":"sine";o.frequency.value=f*q[0];g.gain.value=q[1];o.connect(g);g.connect(o0);o.start(t);o.stop(t+.17)})}
      function chord(t,fs,v,d,parts,lp,p){fs.forEach(function(f,k){tone(t,f,v/fs.length,.006,d,parts||[[1,1],[2,.5],[3,.3],[4,.15],[5,.08]],lp||5200,p)})}

      /* ---------- B1: frame 0 is a hit: a felt D chord, the glass ting, the clink; a clink per landing on the 8th grid ---------- */
      [NOTE.D4,NOTE.Fs4,NOTE.A4].forEach(function(f){pluck(hit(0),f,MIX.pluck*.6)});ting(hit(0),MIX.ting);ev(0,"f0: felt D chord + glass ting");
      P.b1.forEach(function(t){clink(hit(t),MIX.clink*(t>20?1:1),1+((t*4)%3)*.04,0);ev(t,"clink (landing in the $ pot)")});
      if(STEM!=="hits"){for(var k=0;k<12;k++){var tt=k*.25;if(tt<3)shaker(OFF+tt+0.125,MIX.shaker)}
        noise(OFF+.5,4500,1.4,MIX.shaker*.9,.6,.9,0);                                                                   /* the airy shimmer under the sweep */
        [[0.5,NOTE.D5],[1.0,NOTE.A4],[1.5,NOTE.Fs4],[2.0,NOTE.A4],[2.5,NOTE.D5]].forEach(function(q){pluck(OFF+q[0],q[1],MIX.pluck*.35)})}
      /* ---------- B2a: tags dock, the shed coins pop (the same sound for BUY and SELL); the 16th pulse starts on the cut ---------- */
      tap(hit(T.dock),1200,MIX.tap);tap(hit(T.dock)+.06,1600,MIX.tap*.8);ev(T.dock,"two taps: the tags dock");
      P.sheds.forEach(function(t,i){clink(hit(t),MIX.clink*1.4,0.95,0);tone(hit(t),NOTE.A5,MIX.clink*.6,.002,.12,[[1,1],[2,.2]],7000);ev(t,"coin pop (shed "+(i%2?"SELL":"BUY")+", identical)")});
      /* the pulse: muted plucked bass on 16ths, root and octave; D (3..5), Bm (5..7), G (7..9), A (9..12); returns at half level 14.5..19 */
      var PROG=[[3,5,NOTE.D2],[5,7,NOTE.B1*2],[7,9,NOTE.G2],[9,12.02,NOTE.A2],[14.5,17,NOTE.D2],[17,19,NOTE.G2]];
      if(STEM!=="hits"){
        pg.gain.setValueAtTime(0,OFF+2.99);pg.gain.linearRampToValueAtTime(1,OFF+3.02);pg.gain.setValueAtTime(1,OFF+12.0);pg.gain.linearRampToValueAtTime(0,OFF+12.08);
        pg.gain.setValueAtTime(0,OFF+14.49);pg.gain.linearRampToValueAtTime(.5,OFF+14.6);pg.gain.setValueAtTime(.5,OFF+18.9);pg.gain.linearRampToValueAtTime(0,OFF+19.0);
        pf.frequency.setValueAtTime(8000,OFF+11.7);pf.frequency.exponentialRampToValueAtTime(1200,OFF+12.0);pf.frequency.setValueAtTime(8000,OFF+14.4);
        PROG.forEach(function(seg){for(var t=seg[0];t<seg[1]-1e-6;t+=.125){var j=Math.round((t-seg[0])/.125);var f=seg[2]*(j%4===2?2:1);bass(OFF+t,f,MIX.bass*(j%4===0?1:j%2?.55:.78));shaker(OFF+t+.0625,MIX.pshk*(j%2?1:.6),pf)}});
        ev(3,"the 16th pulse starts");ev(11.7,"the pulse low-passes 8 kHz -> 1.2 kHz into the seal");ev(14.5,"the pulse returns at half level")}
      /* ---------- B2b: pot clinks on 16ths (ducked under the pulse), pitch rising with the heap; dish clinks drier and lower, left ---------- */
      P.b2pot.forEach(function(q){clink(hit(q[0]),MIX.clink*.4,1.6/2.4+q[1]*(0.8/2.4)*1.6,0)});
      P.b2dish.forEach(function(q){clink(hit(q[0]),MIX.clink*.3,0.62,-.2)});
      /* ---------- B3: a porcelain tap on the cut; the flip lands (tick + a two-note reveal) ---------- */
      tap(hit(T.b3),1100,MIX.tap*.9);ev(T.b3,"porcelain tap (the card)");
      tone(hit(T.flip1),2400,MIX.clink*1.2,.001,.05,[[1,1]],9000);tone(hit(T.flip1),NOTE.A4,MIX.pluck*.5,.006,.5,[[1,1],[2,.5],[3,.25]],4000);tone(hit(T.flip1)+.125,NOTE.D5,MIX.pluck*.5,.006,.7,[[1,1],[2,.5],[3,.25]],4000);ev(T.flip1,"the flip lands: tick + reveal (A4, D5)");
      /* ---------- B4: four soft taps as the names dissolve; the seal (2.5 kHz glass, 400 ms) as the sleeve lands ---------- */
      for(var i=0;i<4;i++){tap(hit(T.nm0)+i*.0625,1300-i*80,MIX.tap*.5)}ev(T.nm0,"four taps: names out");
      tone(hit(T.lid1),2500,MIX.seal,.002,.4,[[1,1],[2.01,.25],[3.3,.1]],9000);tone(hit(T.lid1),NOTE.D4,MIX.seal*.35,.004,.5,[[1,1],[2,.6],[3,.3]],3000);ev(T.lid1,"the seal (the leaderboard freezes)");
      /* B4b: a soft rising tone under the lift; then near-silence 13.6..14.0 */
      if(STEM!=="hits"){var rt=ctx.createOscillator(),rg=ctx.createGain(),rlp=ctx.createBiquadFilter();rlp.type="lowpass";rlp.frequency.value=3000;rt.type="sine";rt.frequency.setValueAtTime(NOTE.A4,OFF+T.b4b);rt.frequency.exponentialRampToValueAtTime(NOTE.D5,OFF+13.4);
        var r2=ctx.createOscillator();r2.type="sine";r2.frequency.setValueAtTime(NOTE.A4*2,OFF+T.b4b);r2.frequency.exponentialRampToValueAtTime(NOTE.D5*2,OFF+13.4);var r2g=ctx.createGain();r2g.gain.value=.35;r2.connect(r2g);r2g.connect(rg);
        rg.gain.setValueAtTime(0,OFF+T.b4b);rg.gain.linearRampToValueAtTime(MIX.rise,OFF+12.9);rg.gain.linearRampToValueAtTime(0,OFF+13.55);rt.connect(rg);rg.connect(rlp);rlp.connect(bus);rt.start(OFF+T.b4b);rt.stop(OFF+13.6);r2.start(OFF+T.b4b);r2.stop(OFF+13.6);ev(T.b4b,"rising tone under the lift")}
      ev(13.6,"near-silence 13.60..14.00");
      /* ---------- B5: THE HIT (D add9, 294..1175 Hz, strong harmonics, no sub) + the coin slide; settling clinks ---------- */
      chord(hit(T.hit),[NOTE.D4,NOTE.Fs4,NOTE.A4,NOTE.E5,NOTE.D6],MIX.hit,2.6,[[1,1],[2,.7],[3,.5],[4,.3],[5,.18]],5600);ev(T.hit,"THE HIT: D add9 (the whole $ pot)");
      tone(hit(T.hit),NOTE.D3,MIX.hit*.25,.004,1.4,[[1,.5],[2,1],[3,.7],[4,.4]],2400);
      for(var g=0;g<26;g++){var gt=T.pour0+g*0.025;noise(hit(gt),1500+((g*1931)%4500),4,MIX.slide*(1-g/34),.002,.06+(g%3)*.02,((g%5)-2)*.08)}ev(T.pour0,"the coin slide (granular metal, 1..6 kHz)");
      P.pourLand.slice(-6).concat([14.72,14.8,14.9]).forEach(function(t,j){clink(hit(t),MIX.clink*(0.7-j*0.05),0.9+(j%3)*.05,((j%3)-1)*.15)});
      /* ---------- B6: two equal halves (left: three rising glass clinks into a soft chord; right: a descending slide into a muted thud) ---------- */
      [17.18,17.40,17.62].forEach(function(t,j){clink(hit(t),MIX.pay*.7,1+j*.12,-.15)});chord(hit(17.85),[NOTE.A4,NOTE.D5,NOTE.Fs5],MIX.pay*1.15,1.0,null,4800,-.15);ev(17.18,"left: three rising clinks into a soft chord (15% left)");
      for(var s2=0;s2<14;s2++){var st=17.12+s2*0.045;noise(hit(st),5200-s2*280,4,MIX.pay*.42*(1-s2/22),.002,.05,.15)}
      tone(hit(17.85),NOTE.D3,MIX.pay*1.1,.004,.45,[[1,.4],[2,1],[3,.6],[4,.3]],1400,.15);noise(hit(17.85),600,1.2,MIX.pay*.5,.003,.12,.15);ev(17.12,"right: descending slide into a muted low-mid thud (15% right)");
      /* ---------- B7: the pulse is gone; a pad (G, then D at 21.0); a click per LED second; refill clinks; the end tone into the loop ---------- */
      if(STEM!=="hits"){[[T.b7,21.0,[NOTE.G3,NOTE.B3,NOTE.D4,NOTE.Fs4]],[21.0,24.4,[NOTE.D4,NOTE.Fs4,NOTE.A4,NOTE.E5]]].forEach(function(sg){sg[2].forEach(function(f,q){
          var o=ctx.createOscillator(),o2=ctx.createOscillator(),gg=ctx.createGain(),g2=ctx.createGain(),lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.value=2400;o.type=o2.type="sine";o.frequency.value=f;o2.frequency.value=f*2;o.detune.value=q%2?3:-3;g2.gain.value=.4;
          var t0=OFF+sg[0],t1=OFF+sg[1];gg.gain.setValueAtTime(0,t0);gg.gain.linearRampToValueAtTime(MIX.pad,t0+.4);gg.gain.setValueAtTime(MIX.pad,t1-.4);gg.gain.linearRampToValueAtTime(0,t1);
          o.connect(gg);o2.connect(g2);g2.connect(gg);gg.connect(lp);lp.connect(bus);o.start(t0);o2.start(t0);o.stop(t1+.05);o2.stop(t1+.05)})});
        ev(T.b7,"pad (G), the pulse stops");ev(21.0,"the chord resolves (D add9)")}
      P.led.forEach(function(t){tone(hit(t),3000,MIX.led,.0008,.03,[[1,1],[1.5,.3]],9000);noise(hit(t),3200,3,MIX.led*.5,.0005,.01,0);ev(t,"LED click")});
      chord(hit(23.5),[NOTE.D5,NOTE.A5],MIX.endt,3.2,[[1,1],[2,.25],[2.76,.18]],7000);ting(hit(23.5),MIX.ting*.35);ev(23.5,"end tone (rings into frame 0)");
    }
    function render(){return ctx.startRendering().then(function(buf){
      var k0=Math.round(SR*dur*(CYC-1)),n=Math.round(SR*dur);
      var Lc=buf.getChannelData(0).subarray(k0,k0+n),Rc=buf.getChannelData(1).subarray(k0,k0+n),bytes=44+n*8,ab=new ArrayBuffer(bytes),v=new DataView(ab);
      function ws(o,s){for(var i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))}
      ws(0,"RIFF");v.setUint32(4,bytes-8,true);ws(8,"WAVE");ws(12,"fmt ");v.setUint32(16,16,true);v.setUint16(20,3,true);v.setUint16(22,2,true);v.setUint32(24,SR,true);v.setUint32(28,SR*8,true);v.setUint16(32,8,true);v.setUint16(34,32,true);ws(36,"data");v.setUint32(40,n*8,true);
      for(var i=0,o=44;i<n;i++,o+=8){v.setFloat32(o,Lc[i],true);v.setFloat32(o+4,Rc[i],true)}
      var u=new Uint8Array(ab),s="";for(var j=0;j<u.length;j+=32768)s+=String.fromCharCode.apply(null,u.subarray(j,j+32768));return btoa(s)})}
  }};
})();
