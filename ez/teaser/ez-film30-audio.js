/* EZ FILM30 "Daylight": the sound (Web Audio, synthesized offline, 48 kHz stereo, 32-bit float WAV, base64 for render.js).
   Clean and minimal: five small voices, about ten state changes plus two tick ladders, three deliberate silences.
   No risers, braams, whooshes or sub drops; no win jingle against a fail buzzer. Lessons kept from ez-hype-audio.js:
   - Every event comes from window.FILM_PIC (the page's own frame table T), so a re-time moves picture and sound together.
     Every hit lands one frame after its picture (hit()), with the compressor and limiter look-ahead removed (chainLatency).
   - Loop seam: two identical cycles are scheduled and only the second is kept, so 29.999 s runs into 0.000 s with the tails
     (the end tone rings across the loop) and the compressor state carried over.
   - Phone speakers: every voice has its character in 300 Hz..5 kHz; the low notes (the bed's A3, the sink tones D4..C4)
     carry 2nd and 3rd harmonics, so a 300 Hz high-pass loses 6 LU or less (checked by film30-render.sh).
   - Loudness: -14 LUFS integrated, true peak -1.5 dBTP or lower, set by film30-render.sh (two-pass loudnorm, linear only).
   - Mono-centred: the split (scenario A and B on screen together) shares one neutral tone and one seat, L = R.
   Bed: a soft pulse at 96 BPM (30 s = 12 bars exactly, so the loop is in time), root/fifth/octave/fifth per bar, the chord
   following the shot: A (the card), F#m (the board), D (the bet), E (the pot and the split), A (the close). */
(function(){
"use strict";
window.renderAudio=function(o){return window.__f30audio(o)};
window.__f30audio=function(opts){
  var STEM=opts&&opts.stem;                       /* "hits": the synced events without the bed (onset checks) */
  var P=window.FILM_PIC,T=P.T,N=P.N,FPS=P.FPS,SR=48000,dur=N/FPS,CYC=2,TAIL=.5;
  var MIX={bed:.034,pad:.020,tick:.22,bell:.28,lock:.32,end:.30,low:.32,limT:-10,compT:-24};   /* measured: linear loudnorm, bells 7..8 dB over the bed */
  if(window.FILM_MIX_TEST)for(var mk in window.FILM_MIX_TEST)MIX[mk]=window.FILM_MIX_TEST[mk];
  var ctx=new OfflineAudioContext(2,Math.round(SR*(CYC*dur+TAIL)),SR);
  var bus=ctx.createGain();bus.gain.value=.8;
  var comp=ctx.createDynamicsCompressor();comp.threshold.value=MIX.compT;comp.ratio.value=3;comp.attack.value=.008;comp.release.value=.2;comp.knee.value=8;
  var lim=ctx.createDynamicsCompressor();lim.threshold.value=MIX.limT;lim.ratio.value=20;lim.attack.value=.001;lim.release.value=.08;lim.knee.value=0;
  var hpf=ctx.createBiquadFilter();hpf.type="highpass";hpf.frequency.value=120;hpf.Q.value=.6;
  bus.connect(hpf);hpf.connect(comp);comp.connect(lim);lim.connect(ctx.destination);
  var LAT=0;
  function chainLatency(){var c2=new OfflineAudioContext(1,4800,SR),b=c2.createBuffer(1,4800,SR);b.getChannelData(0)[480]=.5;
    var s=c2.createBufferSource();s.buffer=b;var k1=c2.createDynamicsCompressor(),k2=c2.createDynamicsCompressor();
    [[k1,comp],[k2,lim]].forEach(function(q){["threshold","ratio","attack","release","knee"].forEach(function(n){q[0][n].value=q[1][n].value})});
    s.connect(k1);k1.connect(k2);k2.connect(c2.destination);s.start(0);
    return c2.startRendering().then(function(o){var d=o.getChannelData(0),i=0;while(i<d.length&&Math.abs(d[i])<1e-4)i++;return (i-480)/SR})}
  return chainLatency().then(function(lat){LAT=Math.max(0,lat);window.FILM_AUDIO_LAT_MS=LAT*1000;return schedule()});

  function schedule(){
    var EV=[],OFF=0;
    var NB=(function(){var b=ctx.createBuffer(1,SR,SR),d=b.getChannelData(0),s=7;for(var i=0;i<d.length;i++){s=(s*16807)%2147483647;d[i]=s/1073741823.5-1}return b})();
    var NOTE={Cs3:138.59,D3:146.83,E3:164.81,Fs3:185,A3:220,B3:246.94,C4:261.63,Cs4:277.18,D4:293.66,E4:329.63,Fs4:369.99,G4:392,Gs4:415.3,A4:440,B4:493.88,
      Cs5:554.37,D5:587.33,E5:659.25,F5:698.46,Fs5:739.99,G5:783.99,Gs5:830.61,A5:880,As5:932.33,B5:987.77,E6:1318.5};
    for(var cy=0;cy<CYC;cy++){OFF=cy*dur;cycle(cy===CYC-1)}
    window.FILM_SFX=EV;
    return render();

    function cycle(log){
      function hit(fr){return Math.max(0,OFF+(fr+1)/FPS-LAT)}          /* one frame after its picture */
      function ev(fr,what){if(log)EV.push([fr+1,what])}
      function env(g,t,a,d,v){g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+a);g.gain.exponentialRampToValueAtTime(.0002,t+a+d);g.gain.setValueAtTime(0,t+a+d+.01)}
      /* a tone with harmonics: parts [[ratio, gain], ...], so low notes still read on a phone */
      function tone(t,f,v,a,d,parts,lp,det){var out=ctx.createGain(),flt=ctx.createBiquadFilter();flt.type="lowpass";flt.frequency.value=lp||5000;flt.Q.value=.5;out.connect(flt);flt.connect(bus);
        env(out,t,a,d,v);(parts||[[1,1]]).forEach(function(p){var o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f*p[0];if(det)o.detune.value=det;g.gain.value=p[1];o.connect(g);g.connect(out);o.start(t);o.stop(t+a+d+.05)})}
      /* 1. bed pluck: triangle + 2nd/3rd harmonics, 8 ms attack, 280 ms decay, 180 Hz..3.2 kHz */
      function pluck(t,f,v){var out=ctx.createGain(),hp=ctx.createBiquadFilter(),lp=ctx.createBiquadFilter();hp.type="highpass";hp.frequency.value=180;lp.type="lowpass";lp.frequency.value=3200;
        out.connect(hp);hp.connect(lp);lp.connect(bus);env(out,t,.008,.28,v);
        [[1,1,"triangle"],[2,.55,"sine"],[3,.3,"sine"]].forEach(function(p){var o=ctx.createOscillator(),g=ctx.createGain();o.type=p[2];o.frequency.value=f*p[0];g.gain.value=p[1];o.connect(g);g.connect(out);o.start(t);o.stop(t+.36)})}
      /* 2. tick: a 6 ms band-passed noise click (1.2..3 kHz) and a 60 ms ping at the step's pitch */
      function tick(t,f,v){var s=ctx.createBufferSource(),bp=ctx.createBiquadFilter(),g=ctx.createGain();s.buffer=NB;bp.type="bandpass";bp.frequency.value=2000;bp.Q.value=1.1;
        s.connect(bp);bp.connect(g);g.connect(bus);env(g,t,.0008,.006,v*.9);s.start(t,(f*7)%0.8);s.stop(t+.02);
        tone(t,f,v*.8,.002,.06,[[1,1],[2,.25]],6000)}
      /* 3. resolve: a soft bell (sine + a 2.76x partial), with a 2nd harmonic for small speakers */
      function bell(t,f,v,d){tone(t,f,v,.004,d||1.2,[[1,1],[2,.22],[2.76,.28],[5.4,.05]],6500)}
      /* 4. felt low tone (the sinks): sine + 2nd/3rd harmonics, 600 ms */
      function felt(t,f,v){tone(t,f,v,.006,.6,[[1,1],[2,.7],[3,.35]],2400)}
      /* 5. lock chord / end tone: harmonics, +-2 cents */
      function chord(t,fs,v,d){fs.forEach(function(f,k){tone(t,f,v/fs.length,.004,d,[[1,1],[2,.38],[3,.18]],5000,k%2?2:-2)})}

      /* ---------- the bed ---------- */
      var BEAT=60/96,beats=Math.round(dur/BEAT);
      var CH=[[0,["A3","E4","A4","E4"]],[T.s3,["Fs3","Cs4","Fs4","Cs4"]],[T.s4,["D4","A4","D5","A4"]],[T.s5,["E4","B4","E5","B4"]],[T.s7,["A3","E4","A4","E4"]]];
      var MUTE=[[P.ff[P.ff.length-1],T.s3],[T.lockSil,T.lock+12],[T.sil6,T.s7]];   /* the silences (with room for the 280 ms decay) */
      /* a soft sustained chord under the pulse (the bed's body; keeps the crest factor low enough for a linear loudnorm) */
      if(STEM!=="hits"){var pg=ctx.createGain(),plp=ctx.createBiquadFilter();plp.type="lowpass";plp.frequency.value=1800;plp.Q.value=.4;pg.connect(plp);plp.connect(bus);pg.gain.setValueAtTime(0,OFF);
        var segs=[];CH.forEach(function(c,j){segs.push([c[0],j<CH.length-1?CH[j+1][0]:N,c[1]])});
        segs.forEach(function(sg){[sg[2][0],sg[2][1],sg[2][2]].forEach(function(nm,q){var o=ctx.createOscillator(),o2=ctx.createOscillator(),g=ctx.createGain(),g2=ctx.createGain(),t0=OFF+sg[0]/FPS,t1=OFF+sg[1]/FPS,f=NOTE[nm];
          o.type="sine";o2.type="sine";o.frequency.value=f;o2.frequency.value=f*2;o.detune.value=q===1?3:-2;g2.gain.value=.35;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(1,t0+.35);g.gain.setValueAtTime(1,Math.max(t0+.35,t1-.25));g.gain.linearRampToValueAtTime(0,t1+.05);
          o.connect(g);o2.connect(g2);g2.connect(g);g.connect(pg);o.start(t0);o2.start(t0);o.stop(t1+.1);o2.stop(t1+.1)})});
        /* the pad's level, with the three silences cut cleanly (60 ms fades) */
        var lv=MIX.pad,pts=[[0,lv]];MUTE.forEach(function(m){pts.push([m[0]-4,lv],[m[0],0],[m[1]+6,0],[m[1]+30,lv])});pts.sort(function(a,b){return a[0]-b[0]});
        pts.forEach(function(p){pg.gain.linearRampToValueAtTime(p[1],OFF+p[0]/FPS)})}
      if(STEM!=="hits")for(var k=0;k<beats;k++){var fr=k*BEAT*FPS,muted=MUTE.some(function(m){return fr>=m[0]-17&&fr<m[1]});if(muted)continue;
        var ch=CH[0][1];CH.forEach(function(c){if(fr>=c[0])ch=c[1]});var nm=ch[k%4];pluck(OFF+fr/FPS,NOTE[nm],MIX.bed*(k%4===0?1:k%2?.62:.8))}

      if(STEM==="bed")return;
      /* ---------- S1 the card ---------- */
      bell(hit(T.l2),NOTE.E5,MIX.bell*.45,1.0);ev(T.l2,"soft bell under line 2");
      /* ---------- S2 fast-forward: one tick per readable value, a semitone up each time; zero is the same voice an octave down ---------- */
      var LAD=[NOTE.E5,NOTE.F5,NOTE.Fs5,NOTE.G5,NOTE.Gs5,NOTE.A5,NOTE.As5,NOTE.B5];
      P.ff.forEach(function(fr,j){var last=j===P.ff.length-1;if(last){tick(hit(fr),NOTE.A4,MIX.tick*1.2);bell(hit(fr),NOTE.E4,MIX.bell*.5,.5);ev(fr,"zero tick")}
        else{tick(hit(fr),LAD[Math.min(j,LAD.length-1)],MIX.tick);ev(fr,"fast-forward tick "+(j+1))}});
      /* ---------- S3 the board ---------- */
      bell(hit(T.s3),NOTE.A4,MIX.bell*.8,1.2);ev(T.s3,"the board: resolve");
      var LOW=[NOTE.D4,NOTE.Cs4,NOTE.C4];P.drops.forEach(function(fr,j){felt(hit(fr),LOW[Math.min(j,2)],MIX.low);ev(fr,"sink "+(j+1))});
      bell(hit(P.rise),NOTE.E5,MIX.bell*.7,1.2);bell(hit(P.rise),NOTE.A5,MIX.bell*.45,1.2);ev(P.rise,"#1 rises");
      /* ---------- S4 the bet ---------- */
      [T.row1,T.row2,T.row3].forEach(function(fr,j){tick(hit(fr),NOTE.B5,MIX.tick*.42);ev(fr,"ticket row "+(j+1))});
      chord(hit(T.lock),[NOTE.G4,NOTE.D5],MIX.lock,1.4);ev(T.lock,"lock chord (after 300 ms of silence)");
      /* ---------- S5 the pot ---------- */
      bell(hit(T.fill0),NOTE.B4,MIX.bell*.5,1.1);ev(T.fill0,"the pot fills: soft bell");
      /* ---------- S6 the split: shared, neutral, centred ---------- */
      tick(hit(T.split),NOTE.E5,MIX.tick*.6);ev(T.split,"split: tick");
      bell(hit(T.act0),NOTE.A4,MIX.bell*.7,1.2);bell(hit(T.act0),NOTE.E5,MIX.bell*.5,1.2);ev(T.act0,"shared tone (A4 + E5, an open fifth)");
      bell(hit(T.seat1),NOTE.E4,MIX.bell*.7,.6);ev(T.seat1,"shared seat (E4, 0.6 s: clear of the silence before the close)");
      /* ---------- S7 the close: the end tone after 300 ms of silence, ringing across the loop ---------- */
      chord(hit(T.s7),[NOTE.A4,NOTE.E5,NOTE.A5],MIX.end,3.0);ev(T.s7,"end tone (rings into frame 0)");
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
