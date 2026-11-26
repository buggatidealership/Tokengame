/* Round H8 wow mockups: six capabilities mounted on the real X3+ page with its own data (ROUNDS, UPCOMING, __x2pPnl, MODELS).
   Each WW.<id>.mount(host, opts) builds one scene into host. Painted plates are Hedra roughs in ./img; every word and number is page text
   set on a painted surface. Motion: transforms and opacity only. Nothing moves with reduced motion. Mockup code, not for the site. */
(function(){
const IMG=window.WWIMG||'/tools/concepts/worlds/comic/story/h/wow/img/';
const CAST='/tools/concepts/worlds/comic/story/h/cast2/img/';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},ORD=['GPT','KIMI','CLAUDE','GROK'];
const usd=v=>(v<0?'-':'')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const el=(h)=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild};
const W={};window.WW=W;

/* the clock: the page's real time, or a demo time that runs at real speed from WW_NOW (ms) */
const T0=performance.now();W.setNow=x=>{window.WW_SPEED=1;window.WW_NOW=x-(performance.now()-T0)};W.now=()=>window.WW_NOW!=null?window.WW_NOW+(performance.now()-T0)*(window.WW_SPEED||1):Date.now();
const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',weekday:'short',year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});
W.ny=t=>{const o={};NYF.formatToParts(new Date(t)).forEach(p=>o[p.type]=p.value);return {wd:o.weekday,y:+o.year,mo:+o.month,d:+o.day,h:+o.hour,mi:+o.minute,s:+o.second,mdy:`${+o.month}/${+o.day}/${String(o.year).slice(2)}`}};
const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?`${+m[1]}/${+m[2]}/${String(+m[3]%100).padStart(2,'0')}`:''};
const allR=()=>[].concat(window.ROUNDS||[],window.PENDING||[],window.UPCOMING||[]);
const gradedOn=mdy=>allR().filter(r=>md(r.resolves)===mdy);
const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
W.phase=t=>{const n=W.ny(t),m=n.h*60+n.mi+n.s/60,we=n.wd==='Sat'||n.wd==='Sun';
  if(we||m<6*60||m>=16*60+30)return 'night';if(m<16*60)return 'am';return 'close'};
/* the next weekday 4 pm New York after t (or today's if still to come) */
W.nextBell=t=>{for(let i=0;i<8;i++){const n=W.ny(t+i*864e5);if(n.wd==='Sat'||n.wd==='Sun')continue;if(i===0&&n.h>=16)continue;return n}return null};

/* ---------- sound (W6): synthesised in WebAudio, off until the visitor turns it on ---------- */
const S=W.snd={on:false,ctx:null};
function noiseBuf(c,sec){const b=c.createBuffer(1,c.sampleRate*sec,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return b}
S.bell=(c,t,g=.5)=>{/* a brass hand bell: inharmonic partials, fast attack, long decay */
  const out=c.createGain();out.gain.value=g;out.connect(c.destination);
  [[1,1,3.2],[2.32,.55,2.1],[3.73,.4,1.4],[5.18,.28,1],[6.8,.18,.7],[0.5,.35,4]].forEach(([r,a,d])=>{const o=c.createOscillator(),v=c.createGain();o.type='sine';o.frequency.value=880*r;
    v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(a*.3,t+.004);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v);v.connect(out);o.start(t);o.stop(t+d+.1)})};
S.click=(c,t)=>{const s=c.createBufferSource();s.buffer=noiseBuf(c,.05);const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=2400;const v=c.createGain();
  v.gain.setValueAtTime(.6,t);v.gain.exponentialRampToValueAtTime(.001,t+.04);s.connect(f);f.connect(v);v.connect(c.destination);s.start(t)};
S.chalk=(c,t,dur=.45)=>{const s=c.createBufferSource();s.buffer=noiseBuf(c,dur+.1);const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=3200;f.Q.value=3;
  const v=c.createGain();v.gain.setValueAtTime(0,t);for(let i=0;i<dur*22;i++){v.gain.setValueAtTime(.05+Math.random()*.2,t+i/22)}v.gain.setValueAtTime(0,t+dur);s.connect(f);f.connect(v);v.connect(c.destination);s.start(t)};
S.crowd=(c,t,dur,peak=.18)=>{/* a trading floor: low filtered noise with slow swells, then a roar */
  const s=c.createBufferSource();s.buffer=noiseBuf(c,dur+.2);const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=700;f.Q.value=.7;const f2=c.createBiquadFilter();f2.type='lowpass';f2.frequency.value=1800;
  const v=c.createGain();v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(peak*.35,t+1.2);v.gain.linearRampToValueAtTime(peak*.5,t+dur*.6);v.gain.linearRampToValueAtTime(peak,t+dur-1);v.gain.linearRampToValueAtTime(0,t+dur);
  s.connect(f);f.connect(f2);f2.connect(v);v.connect(c.destination);s.start(t)};
S.paper=(c,t)=>{for(let i=0;i<14;i++){const s=c.createBufferSource();s.buffer=noiseBuf(c,.12);const f=c.createBiquadFilter();f.type='highpass';f.frequency.value=4000;const v=c.createGain();const u=t+Math.random()*2.2;
  v.gain.setValueAtTime(.12,u);v.gain.exponentialRampToValueAtTime(.001,u+.1);s.connect(f);f.connect(v);v.connect(c.destination);s.start(u)}};
S.live=()=>{if(!S.ctx)S.ctx=new (window.AudioContext||window.webkitAudioContext)();return S.ctx};
S.ring=()=>{if(!S.on)return;const c=S.live(),t=c.currentTime+.02;for(let i=0;i<6;i++)S.bell(c,t+i*.42,.4);S.crowd(c,t,5,.16);S.paper(c,t+.5)};

/* ---------- W1 the vault: the coin pile is as tall as the money (season P&L as a stand-in until the pool is live) ---------- */
W.vault={mount(host,o={}){
  const A=__x2pPnl().A,R=(window.ROUNDS||[]).slice().sort((a,b)=>a.n-b.n);let c=0;const cum=R.map(r=>{ORD.forEach(k=>{const p=A[k]&&A[k].per&&A[k].per[r.n];if(p)c+=p.v});return [r.n,c]});
  const total=ORD.reduce((s,k)=>s+(A[k]?A[k].pnl:0),0),CAP=200000;
  const sec=el(`<section class="ww" id="ww-vault"><h2 class="ww-h">The pool</h2><div class="ww-sc ww-v">
    <img src="${IMG}vault-empty.jpg" alt=""><img class="ww-full" src="${IMG}vault-full.jpg" alt="">
    <div class="ww-t ww-plq"><span class="ww-engs">Stand-in</span><b class="ww-eng">$0</b><span class="ww-engs">Season P&amp;L</span><i class="ww-engs r">R1</i></div>
    <div class="ww-gl"></div><button class="ww-hit" aria-label="Replay the season into the vault"></button>
    <p class="ww-sr">The pile of coins is as tall as the money. Until the pool is live, it shows the four AIs' season P&amp;L: ${usd(total)}.</p></div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.ww-sc'),b=sec.querySelector('.ww-plq b'),rl=sec.querySelector('.ww-plq i.r');
  const fit=()=>sc.style.setProperty('--W',sc.clientWidth);fit();addEventListener('resize',fit);
  const set=(P,n)=>{const f=Math.max(0,Math.min(1,P/CAP));sc.style.setProperty('--ry',(f*35).toFixed(2)+'%');sc.style.setProperty('--rx',(26+30*f).toFixed(2)+'%');
    b.textContent=usd(P);b.classList.toggle('neg',P<0);rl.textContent='R1 to R'+n};
  let raf=0;const play=(dur=6500)=>{cancelAnimationFrame(raf);const t0=performance.now();const st=now=>{const k=Math.min(1,(now-t0)/dur),i=Math.min(cum.length-1,Math.floor(k*(cum.length-1)));set(cum[i][1],cum[i][0]);if(k<1)raf=requestAnimationFrame(st)};raf=requestAnimationFrame(st)};
  W.vault.check={total,last:cum.length?cum[cum.length-1][1]:0,rounds:cum.length};
  if(o.at!=null){const i=Math.min(cum.length-1,o.at);set(cum[i][1],cum[i][0])}else set(total,R.length?R[R.length-1].n:0);
  sec.querySelector('.ww-hit').onclick=()=>play();
  if(!RM&&!o.still){let once=0;new IntersectionObserver(es=>{if(!once&&es[0].isIntersecting){once=1;play()}},{threshold:.5}).observe(sc)}
  W.vault.play=play;return sec}};

/* ---------- W2 the exchange on New York's clock: morning, the bell at 4 pm, night ---------- */
const XC={phone:{ar:'',pl:{am:'exch-am',close:'exch-close',night:'exch-night'},cx:'53.6%',cy:'29.4%',fw:'39%',fh:'19.4%',bx:'2%',by:'9%',bw:'22%',ry:'57.2%',rf:.046},
          wide:{ar:'w',pl:{am:'exch-am-w',close:'exch-close-w',night:'exch-night-w'},cx:'49.6%',cy:'27%',fw:'17%',fh:'30%',bx:'6%',by:'8%',bw:'10%',ry:'56.6%',rf:.021}};
function clockSVG(){let t='';for(let i=0;i<60;i++){const a=i*6*Math.PI/180,big=i%5===0,r1=big?80:86,r2=92;t+=`<line x1="${(Math.sin(a)*r1).toFixed(1)}" y1="${(-Math.cos(a)*r1).toFixed(1)}" x2="${(Math.sin(a)*r2).toFixed(1)}" y2="${(-Math.cos(a)*r2).toFixed(1)}" stroke="#1d1712" stroke-width="${big?3.4:1.2}" stroke-linecap="round"/>`}
  const rn=[['XII',0],['III',90],['VI',180],['IX',270]].map(([s,d])=>{const a=d*Math.PI/180;return `<text x="${(Math.sin(a)*64).toFixed(1)}" y="${(-Math.cos(a)*64+6).toFixed(1)}" text-anchor="middle" font-family="Rye,serif" font-size="17" fill="#1d1712">${s}</text>`}).join('');
  return `<svg viewBox="-100 -100 200 200" preserveAspectRatio="none" aria-hidden="true">${t}${rn}<text y="34" text-anchor="middle" font-family="Barlow Condensed,sans-serif" font-weight="700" font-size="9.5" letter-spacing="2.4" fill="#4a3a22">NEW YORK</text>
   <g class="hh"><path d="M-4 10 L0 -48 L4 10 Z" fill="#1d1712"/></g><g class="mh"><path d="M-2.6 12 L0 -76 L2.6 12 Z" fill="#1d1712"/></g><g class="sh"><path d="M-.8 16 L0 -84 L.8 16 Z" fill="#b8860b"/><circle r="4.2" fill="#b8860b"/></g><circle r="2.2" fill="#1d1712"/></svg>`}
W.exch={mount(host,o={}){
  const C=o.wide?XC.wide:XC.phone,id='ww-exch'+(o.id||'');
  const sec=el(`<section class="ww" id="${id}" style="${o.wide?'max-width:1200px':''}"><h2 class="ww-h">${o.title||'The floor'}</h2><div class="ww-sc ww-x ${C.ar}" style="--cx:${C.cx};--cy:${C.cy};--fw:${C.fw};--fh:${C.fh};--bx:${C.bx};--by:${C.by};--bw:${C.bw};--ry:${C.ry};--rf:${C.rf};--bm:url(${IMG}bell-black.jpg)">
    ${['am','close','night'].map(k=>`<img class="pl pl-${k}" src="${IMG}${C.pl[k]}.jpg" alt="" style="opacity:0">`).join('')}
    <div class="ww-clk">${clockSVG()}</div><div class="ww-cue"></div><div class="ww-bell"><img src="${IMG}bell.webp" alt=""></div>
    <div class="ww-t ww-rail"><span class="ww-leaf l1"></span><small class="l2"></small></div>
    <button class="ww-hit bellhit" aria-label="Ring the bell" style="left:${C.bx};top:${C.by};width:${C.bw};aspect-ratio:390/453"></button>
    <p class="ww-sr" aria-live="polite"></p></div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.ww-sc'),bell=sec.querySelector('.ww-bell'),l1=sec.querySelector('.l1'),l2=sec.querySelector('.l2'),sr=sec.querySelector('.ww-sr');
  const fit=()=>sc.style.setProperty('--W',sc.clientWidth);fit();addEventListener('resize',fit);
  const g={h:sec.querySelector('.hh'),m:sec.querySelector('.mh'),s:sec.querySelector('.sh')};let ph='',rung='',ringT=0;
  const ring=(ms=5000)=>{window.__wwRingAt=Date.now();bell.classList.add('ring');S.ring();clearTimeout(ringT);ringT=setTimeout(()=>bell.classList.remove('ring'),RM?0:ms)};
  sec.querySelector('.bellhit').onclick=()=>ring(2600);
  const tick=()=>{const t=W.now(),n=W.ny(t);
    g.h.setAttribute('transform',`rotate(${((n.h%12)+n.mi/60)*30})`);g.m.setAttribute('transform',`rotate(${(n.mi+n.s/60)*6})`);g.s.setAttribute('transform',`rotate(${n.s*6})`);
    const p=W.phase(t);if(p!==ph){ph=p;sc.querySelectorAll('img.pl').forEach(i=>i.style.opacity=i.classList.contains('pl-'+p)?1:0);sec.dataset.ph=p}
    const today=gradedOn(n.mdy),names=today.slice(0,2).map(r=>r.co).join(', ')+(today.length>2?` +${today.length-2}`:'');
    if(p==='am'){l1.textContent=n.h<9||(n.h===9&&n.mi<30)?'Opens 9:30':'Open';l2.textContent=today.length?`Graded at the close: ${names}`:'No rounds graded today'}
    else if(p==='close'){l1.textContent='The bell';l2.textContent=today.length?`${today.length} graded: ${names}`:'No rounds graded today'}
    else {const nb=W.nextBell(t+(n.h>=16?864e5*0:0));const same=nb&&nb.mdy===n.mdy;l1.textContent='Closed';l2.textContent=nb?`Next bell ${same?'today':DAYS[new Date(Date.UTC(nb.y,nb.mo-1,nb.d)).getUTCDay()]} 4:00 pm`:''}
    sr.textContent=`New York ${String(n.h).padStart(2,'0')}:${String(n.mi).padStart(2,'0')}. ${l1.textContent}. ${l2.textContent}`;
    const k=`${n.mdy}`;if(n.wd!=='Sat'&&n.wd!=='Sun'&&n.h===16&&n.mi===0&&n.s<12&&rung!==k){rung=k;ring(12000)}};
  tick();setInterval(tick,o.fast?50:1000);W.exch.ring=ring;return sec}};

/* ---------- W3 your call at the betting window: you call the next round before the bell; your next visit shows if you beat the AIs ---------- */
const KEY='ez-wow-call';
W.window={mount(host,o={}){
  const nx=(window.PENDING||[]).concat(window.UPCOMING||[]).find(r=>r.resolves)||{};const nd=md(nx.resolves).split('/');
  const close=nd.length===3?`${DAYS[new Date(Date.UTC(2000+ +nd[2],nd[0]-1,+nd[1])).getUTCDay()]} ${['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][+nd[0]]} ${+nd[1]}, 4 pm NY`:'';
  let saved=null;try{saved=JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){}
  if(o.demo)saved=o.demo;
  const gr=saved&&(window.ROUNDS||[]).find(r=>r.n===saved.n);const state=gr?'result':saved?'called':'open';
  const R=gr||nx;const calls={};(R.calls||[]).forEach(c=>calls[c[0]]=c);
  const xs=[[12,18],[32,18],[51.5,17.5],[70.5,16.5]],rot=[-.6,.4,-.3,.8];
  const ai=ORD.map((k,i)=>{const c=calls[k];let body;
    if(!c)body=`<span class="ww-type">sealed</span><span class="ww-stamp ww-dn">Due ${DAYS[new Date(Date.UTC(2000+ +md(nx.called).split('/')[2],md(nx.called).split('/')[0]-1,+md(nx.called).split('/')[1])).getUTCDay()]}</span>`;
    else{const up=/UP/.test(c[1]),ok=gr?(up===(gr.a>0)):null;body=`<span class="ww-type">${up?'Up':'Down'} ${c[1].replace(/UP |DOWN /,'')}</span>${ok==null?'':`<span class="ww-stamp ${ok?'ww-up':'ww-dn'}">${ok?'Right':'Wrong'}</span>`}`}
    return `<div class="ww-slipai" style="left:${xs[i][0]}%;width:${xs[i][1]}%;--r:${rot[i]}deg"><b>${NM[k]}</b>${body}</div>`}).join('');
  let my;if(state==='open')my=`<span class="k">Your call · R${R.n}</span><span class="co">${R.co}</span><span class="ww-type res">Bell: ${close}</span>`;
  else{const up=saved.dir==='up';let res=`Bell: ${close}`,st='';
    if(gr){const right=up===(gr.a>0),wrongAIs=ORD.filter(k=>calls[k]&&(/UP/.test(calls[k][1])!==(gr.a>0))).length,n=ORD.filter(k=>calls[k]).length;
      res=`${gr.out} at the close`;st=`<span class="ww-stamp ${right?'ww-up':'ww-dn'}" style="grid-column:2;grid-row:3/4;font-size:.8em;transform:rotate(4deg)">${right?`Beat ${wrongAIs} of ${n}`:'Wrong way'}</span>`}
    my=`<span class="k">Your call · R${R.n}</span><span class="co">${R.co}</span><span class="ww-stamp ${up?'ww-up':'ww-dn'}">${up?'Up':'Down'}</span><span class="ww-type res">${res}</span>${st}`}
  const sec=el(`<section class="ww" id="ww-window"><h2 class="ww-h">Your call</h2><div class="ww-sc ww-w"><img src="${IMG}window2.jpg" alt="">${ai}
    <div class="ww-my" style="position:absolute">${my}</div>
    ${state==='open'?'<div class="ww-gw g"></div><div class="ww-gw r"></div><button class="ww-hit" data-d="up" aria-label="Call it up" style="left:71.5%;top:61%;width:15%;height:18%"></button><button class="ww-hit" data-d="down" aria-label="Call it down" style="left:83%;top:65%;width:15%;height:19%"></button>':''}
    <div class="ww-t ww-lamp"><span class="ww-leaf">${state==='result'?'You vs the four AIs':'Beat the four AIs'}</span><small>${state==='open'?'Green stamp: up · red stamp: down':'Your call stays in this browser'}</small></div>
    </div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.ww-sc');const fit=()=>sc.style.setProperty('--W',sc.clientWidth);fit();addEventListener('resize',fit);
  sec.querySelectorAll('.ww-hit[data-d]').forEach(b=>b.onclick=()=>{const v={n:R.n,co:R.co,ticker:R.ticker,dir:b.dataset.d,at:Date.now()};try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}
    const p=sec.parentNode,nx2=sec.nextSibling;sec.remove();const s2=W.window.mount(p,{demo:v});p.insertBefore(s2,nx2);s2.querySelector('.ww-my .ww-stamp').animate([{transform:'rotate(-10deg) scale(2.4)',opacity:0},{transform:'rotate(-10deg) scale(.92)',opacity:.9,offset:.7},{transform:'rotate(-10deg) scale(1)',opacity:.88}],{duration:RM?0:420,easing:'cubic-bezier(.2,0,.2,1)'})});
  W.window.check={state,round:R.n,co:R.co};return sec}};

/* ---------- W4 depth from painted layers: the floor seen from the gallery; layers drift with scroll, and with the phone's tilt ---------- */
W.depth={mount(host,o={}){
  const sec=el(`<section class="ww" id="ww-depth"><h2 class="ww-h">From the gallery</h2><div class="ww-sc ww-x" style="--cx:53.6%;--cy:29.4%;--fw:39%;--fh:19.4%">
    <img class="far" src="${IMG}exch-am.jpg" alt="" style="inset:-4% -4%;width:108%;height:108%">
    <div class="ww-clk far2">${clockSVG()}</div>
    <img class="near" src="${IMG}near-rail.webp" alt="" style="left:0;top:20%;width:100%;height:auto;bottom:auto;z-index:4">
    </div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.ww-sc'),far=sc.querySelector('.far'),clk=sc.querySelector('.far2'),near=sc.querySelector('.near');
  const n=W.ny(W.now());const g={h:clk.querySelector('.hh'),m:clk.querySelector('.mh'),s:clk.querySelector('.sh')};g.h.setAttribute('transform',`rotate(${((n.h%12)+n.mi/60)*30})`);g.m.setAttribute('transform',`rotate(${n.mi*6})`);g.s.setAttribute('transform',`rotate(${n.s*6})`);
  let tx=0,ty=0,p=.5;const ap=()=>{/* far plane drifts little, near plane a lot: the gap reads as depth */
    const fy=(p-.5)*-22,ny=(p-.5)*48;far.style.transform=`translate3d(${tx*-6}px,${fy}px,0) scale(1.0)`;clk.style.transform=`translate(-50%,-50%) translate3d(${tx*-6}px,${fy}px,0)`;near.style.transform=`translate3d(${tx*26}px,${ny}px,0)`};
  const onS=()=>{const r=sc.getBoundingClientRect();p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));ap()};
  if(!RM){addEventListener('scroll',onS,{passive:true});addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/25));ty=e.beta;ap()})}
  W.depth.set=(pp,t=0)=>{p=pp;tx=t;ap()};onS();return sec}};

/* ---------- W5 the founder's pose follows his latest result (on the real Meet the models cards) ---------- */
W.pose={pick(r,k){if(!r||!r.calls)return null;const c=r.calls.find(x=>x[0]===k);if(!c)return {p:'wait',t:'No call'};
    const up=/UP/.test(c[1]),right=up===(r.a>0),win=String(r.win||'').toUpperCase().split(/[^A-Z]+/).includes(k);
    return win?{p:'win',t:`R${r.n} ${r.ticker}: won`,c:'#ffd21f'}:right?{p:'behind',t:`R${r.n} ${r.ticker}: right way, not closest`,c:'#7be3a6'}:{p:'lose',t:`R${r.n} ${r.ticker}: wrong way`,c:'#ff6b5e'}},
  apply(rn){const r=(window.ROUNDS||[]).find(x=>x.n===rn)||(window.ROUNDS||[]).slice(-1)[0];const out={};
    document.querySelectorAll('.pp1-c[data-m]').forEach(c=>{const k=c.getAttribute('data-m'),q=W.pose.pick(r,k);if(!q)return;out[k]=q.p;
      const port=c.querySelector('.fb-port');if(!port)return;let po=port.querySelector('.ww-pose');
      if(!po){po=document.createElement('div');po.className='ww-pose';port.appendChild(po);const v=port.querySelector('video');if(v)v.style.opacity=0}
      const url=`${CAST}a-${k.toLowerCase()}-${q.p}.jpg`;if(po.dataset.u!==url){const nw=po.cloneNode();nw.style.backgroundImage=`url(${url})`;nw.dataset.u=url;nw.style.opacity=0;port.appendChild(nw);
        requestAnimationFrame(()=>requestAnimationFrame(()=>{nw.style.opacity=1;setTimeout(()=>{if(po.parentNode&&po!==nw)po.remove()},950)}))}
      let rs=c.querySelector('.ww-res');if(!rs){rs=document.createElement('span');rs.className='ww-res';(c.querySelector('.fb-patch')||c.querySelector('.pp1-ver')||c).insertAdjacentElement('afterend',rs)}
      rs.textContent=q.t;rs.style.color=q.c});W.pose.check={round:r&&r.n,poses:out};return out}};

/* ---------- W6 sound you turn on: a radio on the trading post; off by default ---------- */
W.sound={mount(host,o={}){
  const wide=!!o.wide,C=wide?XC.wide:XC.phone;
  const R=wide?{x:'80%',y:'56%',w:'11%',lx:'85.5%',ly:'94%',lf:.0125}:{x:'4%',y:'64%',w:'30%',lx:'19%',ly:'95%',lf:.055};
  const sec=W.exch.mount(host,{wide,id:'-snd'+(wide?'w':''),title:'Turn it up',...o});sec.classList.add('ww-snd');const sc=sec.querySelector('.ww-sc');
  sc.insertAdjacentHTML('beforeend',`<div class="ww-rcue" style="left:${R.x};top:${R.y};width:${R.w};aspect-ratio:377/482"></div>
    <div class="ww-radio" style="left:${R.x};top:${R.y};width:${R.w};aspect-ratio:377/482"><img src="${IMG}radio.webp" alt=""></div>
    <div class="ww-dial" style="left:${R.x};top:${R.y};width:${R.w};aspect-ratio:377/482;background:radial-gradient(circle at 50% 66%,rgba(255,190,80,.95) 0,rgba(255,140,20,.4) 9%,transparent 17%)"></div>
    <div class="ww-t ww-rlab" style="left:${R.lx};top:${R.ly}"><span class="ww-leaf">Sound off</span></div>
    <button class="ww-hit" aria-pressed="false" aria-label="Sound: the bell, the chalk, the floor" style="left:${R.x};top:${R.y};width:${R.w};aspect-ratio:377/482"></button>`);
  const b=sc.querySelector('.ww-hit[aria-pressed]'),lab=sc.querySelector('.ww-rlab .ww-leaf');
  const set=on=>{S.on=on;sec.classList.toggle('on',on);b.setAttribute('aria-pressed',on);lab.textContent=on?'Sound on':'Sound off';if(on){const c=S.live();c.resume();S.click(c,c.currentTime+.01);S.crowd(c,c.currentTime+.05,4,.08)}};
  b.onclick=()=>set(!S.on);W.sound.set=set;return sec}};

/* offline render of the sound track for the board's video (same synthesis as the page) */
W.renderTrack=async(plan,dur)=>{const c=new OfflineAudioContext(1,44100*dur,44100);plan.forEach(([k,t,a])=>{if(k==='bell')S.bell(c,t,a||.4);else if(k==='crowd')S.crowd(c,t,a||4,.16);else S[k](c,t)});
  const b=await c.startRendering(),d=b.getChannelData(0);const buf=new ArrayBuffer(44+d.length*2),v=new DataView(buf);const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
  ws(0,'RIFF');v.setUint32(4,36+d.length*2,true);ws(8,'WAVE');ws(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,44100,true);v.setUint32(28,88200,true);v.setUint16(32,2,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,d.length*2,true);
  let pk=0;for(let i=0;i<d.length;i++)pk=Math.max(pk,Math.abs(d[i]));const g=pk>.95?.95/pk:1;for(let i=0;i<d.length;i++)v.setInt16(44+i*2,Math.max(-1,Math.min(1,d[i]*g))*32767,true);
  let s='';const u=new Uint8Array(buf);for(let i=0;i<u.length;i+=8192)s+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return btoa(s)};
})();
