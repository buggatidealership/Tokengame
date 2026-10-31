/* J5 · The closing bell. Panel 3 of "One round, start to finish" starts ungraded: the market box is blank and every
   call waits with an empty stamp. When the panel comes on screen the closing bell swings, the market's move lands,
   then the stamps slam down one by one, PASS or FAIL, closest first, and the winner's tag drops last: the motion acts
   out "the close grades every call". It plays once, silently. A tap on the bell plays it again WITH sound (a brass bell
   rung three times and a rubber-stamp thump per call, synthesised with Web Audio: no audio file) and a 10 ms buzz per
   stamp on phones that allow it (Android). Reduced motion: the graded panel, as today, no sound. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j5');
const pn=D.querySelector('.wc-lr-3');if(!pn){H.classList.add('sj-ready-j5');return}
const mk=pn.querySelector('.wc-ce-mk'),num=mk&&mk.querySelector('b'),rows=[...pn.querySelectorAll('.wc-ce-r')],st=rows.map(r=>r.querySelector('.wc-ce-pf')),win=[...pn.querySelectorAll('.wc-ce-nm em')];
mk.insertAdjacentHTML('beforeend',`<button type="button" class="sj-bell" aria-label="Ring the closing bell (with sound)"><svg viewBox="0 0 40 44" aria-hidden="true"><path class="sj-bl-b" d="M20 5c-1.6 0-2.6 1-2.6 2.4v1.1C11 10 8 15 8 21v8l-4 5v2h32v-2l-4-5v-8c0-6-3-11-9.4-12.5V7.4C22.6 6 21.6 5 20 5z"/><circle class="sj-bl-c" cx="20" cy="39" r="3.6"/><path class="sj-bl-s" d="M13 15c1.4-2.4 3.4-3.6 5.6-4"/></svg></button>
  <span class="sj-ding" aria-hidden="true">Ding!</span>`);
rows.forEach(r=>r.insertAdjacentHTML('beforeend','<i class="sj-slot" aria-hidden="true">?</i>'));
const rule=pn.querySelector('.wc-lr-rule'),bell=mk.querySelector('.sj-bell'),ding=mk.querySelector('.sj-ding'),bsvg=bell.querySelector('svg');
const T={bell:0,num:.78,st0:1.12,stD:.26,win:.2};const DUR=T.st0+T.stD*st.length+T.win+.4;
const cl=x=>Math.max(0,Math.min(1,x)),out=x=>1-Math.pow(1-x,3);
function slam(el,q,rot){if(!el)return;el.style.opacity=q>0?1:0;const s=q<1?2.3-1.3*out(q):1;el.style.transform=`rotate(${rot}deg) scale(${s.toFixed(3)})`}
function draw(t){/* t in seconds since the bell */
  const sw=t<0?0:Math.exp(-t*2.6)*Math.sin(t*26);bsvg.style.transform=`rotate(${(sw*22).toFixed(2)}deg)`;
  const dq=cl(t/.12)*(1-cl((t-1.1)/.3));ding.style.opacity=t<0?0:dq;ding.style.transform=`rotate(-10deg) scale(${(.7+.3*cl(t/.15)+.06*Math.sin(t*26)).toFixed(3)})`;
  if(num){const q=cl((t-T.num)/.16);num.style.opacity=t<T.num?0:1;num.style.transform=`scale(${(q<1?1.9-.9*out(q):1).toFixed(3)})`;
    const em=mk.querySelector('em');if(em){em.style.opacity=t<T.num?0:1;em.style.transform=`rotate(-6deg) scale(${(q<1?.4+.6*out(q):1).toFixed(3)})`}}
  if(rule)rule.style.opacity=cl((t-(T.st0+T.stD*st.length+.25))/.3);
  st.forEach((s,i)=>{const q=cl((t-T.st0-i*T.stD)/.14);slam(s,t<T.st0+i*T.stD?0:q,-7);const sl=rows[i].querySelector('.sj-slot');if(sl)sl.style.opacity=t<T.st0+i*T.stD?1:0;
    rows[i].style.transform=q>0&&q<1?`translateY(${(Math.sin(q*Math.PI)*1.6).toFixed(2)}px)`:''});
  const wt=T.st0+T.stD*st.length+.05;win.forEach(w=>{const q=cl((t-wt)/.2);w.style.opacity=q;w.style.transform=`translateY(${((1-out(q))*-10).toFixed(1)}px) rotate(-4deg)`})}
window.__sjDraw5=draw;
/* sound: scheduled on any AudioContext, so the recorder renders the very same sound offline */
function sound(ac,at){const o=ac.destination;
  const ring=t0=>{[[1,.5,1.6],[2.01,.18,.9],[2.76,.16,.7],[5.43,.06,.35],[8.9,.03,.2]].forEach(([k,g,d])=>{const os=ac.createOscillator(),gn=ac.createGain();os.type='sine';os.frequency.value=780*k;
    gn.gain.setValueAtTime(0,t0);gn.gain.linearRampToValueAtTime(g*.5,t0+.004);gn.gain.exponentialRampToValueAtTime(.0001,t0+d);os.connect(gn).connect(o);os.start(t0);os.stop(t0+d+.05)})};
  [0,.26,.52].forEach(x=>ring(at+x));
  const thump=t0=>{const n=ac.createBufferSource(),b=ac.createBuffer(1,Math.round(ac.sampleRate*.12),ac.sampleRate),c=b.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=(Math.random()*2-1)*Math.pow(1-i/c.length,3);
    n.buffer=b;const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=420;const g=ac.createGain();g.gain.value=.9;n.connect(f).connect(g).connect(o);n.start(t0);
    const os=ac.createOscillator(),og=ac.createGain();os.frequency.setValueAtTime(140,t0);os.frequency.exponentialRampToValueAtTime(55,t0+.11);og.gain.setValueAtTime(.55,t0);og.gain.exponentialRampToValueAtTime(.0001,t0+.14);os.connect(og).connect(o);os.start(t0);os.stop(t0+.16)};
  st.forEach((s,i)=>thump(at+T.st0+i*T.stD));}
window.__sjSound5=async(off)=>{const sr=44100,len=(off+DUR+.6),ac=new OfflineAudioContext(1,Math.round(sr*len),sr);sound(ac,off);const buf=await ac.startRendering(),d=buf.getChannelData(0);
  const pcm=new DataView(new ArrayBuffer(44+d.length*2)),w=(o,s)=>{for(let i=0;i<s.length;i++)pcm.setUint8(o+i,s.charCodeAt(i))};
  w(0,'RIFF');pcm.setUint32(4,36+d.length*2,true);w(8,'WAVEfmt ');pcm.setUint32(16,16,true);pcm.setUint16(20,1,true);pcm.setUint16(22,1,true);pcm.setUint32(24,sr,true);pcm.setUint32(28,sr*2,true);pcm.setUint16(32,2,true);pcm.setUint16(34,16,true);w(36,'data');pcm.setUint32(40,d.length*2,true);
  for(let i=0;i<d.length;i++)pcm.setInt16(44+i*2,Math.max(-1,Math.min(1,d[i]*.8))*32767,true);
  const u=new Uint8Array(pcm.buffer);let s='';for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(s)};
let t0=null,raf=0,ac=null;
function play(withSound){t0=sjT();if(withSound){try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume();sound(ac,ac.currentTime+.02)}catch(e){}
    if(navigator.vibrate)st.forEach((s,i)=>setTimeout(()=>navigator.vibrate(10),(T.st0+i*T.stD)*1000))}
  cancelAnimationFrame(raf);(function f(){const t=(sjT()-t0)/1000;draw(t);if(t<DUR)raf=requestAnimationFrame(f)})()}
bell.addEventListener('click',e=>{e.preventDefault();play(!sjRM());if(sjRM())draw(99)});
if(sjRM()){draw(99)}else{draw(-1);const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();if(!window.__sjHold)play(false)}},{threshold:.6});io.observe(pn)}
window.__sjToggle=on=>{if(on)play(false);else{cancelAnimationFrame(raf);draw(99)}};
H.classList.add('sj-ready-j5')})();
