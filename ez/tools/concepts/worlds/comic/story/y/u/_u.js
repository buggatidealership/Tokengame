/* Round U (2026-10-31): the Upcoming tab at level 4 of the pop cover's recipe. Shared code for the takes u1, u2, u3.
   Laid over the built X3+ (#/upcoming). Every date, call, colour and logo comes from the page's own globals:
   PENDING / UPCOMING through SE.toCome(), CO_LOGOS through SG.get() (the trimmed mark, its familiar part, the brand colour read
   from the logo file), MODELS, and __x2pPnl() through SE.lead() (the P&L leader's coin is holo, as everywhere on X3+).
   window.__uSim = 1 shows the "calls in" state: the rounds of the newest graded close, rewound to calls in (the runner also fixes
   the clock to that morning, so "today" and the bells read as they did then). Nothing typed by hand. */
window.UU=(function(){const P=POP,S=SE,G=SG,INK=P.INK,D=document,H=D.documentElement;const esc=S.esc;
/* each exchange's close, local time (a copy of world-comic.js closeAt, which is private there) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
function bell(x){const at=closeAt(x.ticker,x.day);if(at==null)return 'Date to come';const ms=at-Date.now();if(ms<=0)return 'Bell rang';const mn=Math.round(ms/6e4),h=Math.floor(mn/60);
  return 'Bell in '+(h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m')}
/* the list: SE's, or with the newest graded close rewound to calls in */
function list(){let L=S.toCome();
  if(window.__uSim){const last=ROUNDS.reduce((a,r)=>S.pd(r.resolves).t>S.pd(a).t?r.resolves:a,ROUNDS[0].resolves);
    const sim=ROUNDS.filter(r=>r.resolves===last).map(r=>{const q=S.pd(r.resolves),me=((window.RMETA||{})[r.n])||{};
      const calls=r.calls.map(c=>{const k=/^(UP|DOWN)\s+([\d.]+)/i.exec(c[1]);return k?{m:c[0],dir:k[1].toUpperCase(),mag:+k[2]}:null}).filter(Boolean);
      return {n:r.n,co:r.co,ticker:r.ticker,locked:1,calls,day:q.m+'/'+q.d+'/'+(q.y%100),m7:!!me.mag7,ai:(me.themes||[]).indexOf('AI')>-1,nv:r.ticker==='NVDA',r:S.rel(r.resolves),up:calls.filter(c=>c.dir==='UP').length,dn:calls.filter(c=>c.dir!=='UP').length}});
    L=sim.concat(L)}
  return L}
const days=L=>S.byDay(L);
/* colours from a brand hex */
const lum=h=>{const n=parseInt(h.slice(1),16),f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(n>>16)+.7152*f(n>>8&255)+.0722*f(n&255)};
const dark=h=>lum(h)<.06;
const fillOf=h=>dark(h)?['#a8a2b3','#5a5464','#2b2733']:[P.lighten(h,.55),h,P.shade(h,.72)];
const shOf=h=>dark(h)?'#000000':P.shade(h,.38);
/* the brand ground of a card: two tones of the brand colour (a near-black brand gets a steel grey, so its ink mark still reads) */
const tones=h=>dark(h)?['#5a5366','#463f52']:[P.lighten(h,.14),h];
/* brand data for each ticker (cached by SG) */
const cache={};const brand=t=>cache[t]||(cache[t]=G.get(t).then(M=>M||{hx:'#2b2733',B:[43,39,51],m:null,part:null,dark:true}).catch(()=>({hx:'#2b2733',m:null})));
/* --------------------------------------------------------------------------------------------- the blown-up mark, extruded
   the company's own mark (or its familiar part) blown up on its brand rays, with a cream rim, a thick ink outline, a stacked
   solid extrusion in the brand's dark and the halftone fading in from the edges: the logo itself is built in the cover's depth. */
const rgb=a=>`rgb(${a.map(Math.round).join(',')})`;
const hexA=h=>{const n=parseInt(h.slice(1),16);return [n>>16,n>>8&255,n&255]};
function blow(W,H,M,o={}){const c=G.cv(W,H),x=c.getContext('2d'),hx=M.hx||'#2b2733',[c1,c2]=tones(hx);
  x.fillStyle=c2;x.fillRect(0,0,W,H);const ox=W*(o.rx!=null?o.rx:.72),oy=H*(o.ry!=null?o.ry:.5),R=Math.hypot(W,H),n=o.n||30;x.fillStyle=c1;
  for(let i=0;i<n;i++){const a0=i/n*2*Math.PI;x.beginPath();x.moveTo(ox,oy);x.arc(ox,oy,R,a0,a0+Math.PI/n);x.closePath();x.fill()}
  G.dots(x,W,H,Math.max(5,Math.min(W,H)/18),rgb(hexA(P.shade(dark(hx)?'#463f52':hx,.55))),(u,v)=>{const e=Math.min(u,1-u,v,1-v);return Math.max(0,.46-e*2.4)});
  const part=o.whole||!M.part?M.m:M.part;if(!part)return c;
  const kw=part.width/part.height>2.2?Math.min(o.kw||.6,.62):(o.kw||.6);const s=Math.min(W*kw/part.width,H*(o.kh||.6)/part.height),w=part.width*s,h=part.height*s,L=G.cv(W,H);
  const lx=L.getContext('2d');lx.imageSmoothingQuality='high';lx.drawImage(part,(o.cx!=null?o.cx:.62)*W-w/2,(o.cy!=null?o.cy:.5)*H-h/2,w,h);
  const ol=Math.max(1.6,Math.min(h*.05,w*.05,(o.ol||9))),rim=G.dil(L,ol*.8,[255,247,226]),out=G.dil(rim,ol,G.INK),dp=Math.max(2,Math.round(ol*(o.dpk||1.6)));
  const shd=G.sil(out,hexA(shOf(hx)));x.drawImage(G.sil(out,G.INK),dp+ol*.5,dp+ol*.5);for(let k=dp;k>0;k--)x.drawImage(shd,k,k);
  x.drawImage(out,0,0);x.drawImage(rim,0,0);
  /* a thin white highlight top-left inside the rim, then the mark, then ink dots in its lower right (the cover's lit side) */
  x.drawImage(G.sil(L,[255,255,255]),-Math.max(1,ol*.35),-Math.max(1,ol*.35));x.drawImage(L,0,0);
  const sh=G.cv(W,H),sx=sh.getContext('2d');G.dots(sx,W,H,Math.max(3,Math.min(W,H)/40),'rgba(21,18,26,.42)',(u,v)=>Math.max(0,(u+v-1.0)*.7));sx.globalCompositeOperation='destination-in';sx.drawImage(L,0,0);x.drawImage(sh,0,0);
  return c}
/* paint a blow-up into a holder (CSS size), 1.2x for the drift */
async function paintArt(el,t,o={}){const M=await brand(t);const r=el.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1),k=o.still?1:1.2;
  if(!r.width||!r.height)return;el.querySelectorAll('canvas').forEach(c=>c.remove());
  const c=blow(Math.round(r.width*k*d),Math.round(r.height*k*d),M,{...o,ol:(o.ol||7)*d});c.className='uu-cv'+(o.still?' uu-st':'');el.appendChild(c)}
/* a logo held on an extruded coin: cream face, a rim in the brand colour, the mark inside (never anything on top of it) */
async function paintCoin(el,t){const M=await brand(t),sz=el.clientWidth,d=Math.min(2,devicePixelRatio||1);el.style.setProperty('--b',M.hx||'#2b2733');
  el.style.boxShadow=P.xbox(Math.max(2,Math.round(sz*.07)),shOf(M.hx||'#2b2733'),{hl:Math.max(1.5,sz*.04),lo:Math.max(2,sz*.06),bw:Math.max(2,sz*.04)});
  if(!M.m){el.innerHTML=`<b class="uu-nolg">${esc(S.tk(t)).slice(0,4)}</b>`;return}
  const W=Math.round(sz*d),c=G.cv(W,W),x=c.getContext('2d'),m=M.m,k=Math.min(W*.56/m.width,W*.5/m.height);x.lineWidth=W*.1;x.strokeStyle=M.hx||'#2b2733';x.beginPath();x.arc(W/2,W/2,W/2-W*.05,0,7);x.stroke();x.lineWidth=Math.max(1,W*.02);x.strokeStyle='#0d0b10';x.beginPath();x.arc(W/2,W/2,W/2-W*.1,0,7);x.stroke();x.imageSmoothingQuality='high';x.drawImage(m,(W-m.width*k)/2,(W-m.height*k)/2,m.width*k,m.height*k);
  el.querySelectorAll('canvas').forEach(q=>q.remove());c.className='uu-lcv';el.appendChild(c)}
/* --------------------------------------------------------------------------------------------- the calls
   each AI is a coin (the P&L leader's in holo) saying its call in an extruded balloon: green up, red down, an inked "?" until it is in */
const sgn=c=>(c.dir==='UP'?'+':'−')+c.mag+'%';
function chip(m,c,sz,lead,cls){const k=c?(c.dir==='UP'?'u':'d'):'q';
  return `<span class="uu-ch uu-ch${k} ${cls||''}" style="--sz:${sz}px">${P.coin(m,sz,{holo:m===lead,dp:Math.max(2,Math.round(sz*.08))})}<b class="uu-bl" aria-hidden="true">${c?sgn(c):'?'}</b><span class="pp-sr">${S.NM[m]} ${c?(c.dir==='UP'?'says up ':'says down ')+c.mag+'%.':'has not called yet.'}</span></span>`}
const VS=`<b class="uu-vs" aria-hidden="true">VS</b>`;
function calls(x,sz,o={}){const lead=S.lead();if(!x.locked)return S.ORDER.map(m=>chip(m,null,sz,lead,o.cls)).join('');
  const cs=S.ORDER.map(m=>x.calls.find(c=>c.m===m)).filter(Boolean);
  if(o.vs){const up=cs.filter(c=>c.dir==='UP').sort((a,b)=>b.mag-a.mag),dn=cs.filter(c=>c.dir!=='UP').sort((a,b)=>b.mag-a.mag);
    return `<span class="uu-cn uu-bu">${up.map(c=>chip(c.m,c,sz,lead,o.cls)).join('')}</span>${up.length&&dn.length?VS:''}<span class="uu-cn uu-be">${dn.map(c=>chip(c.m,c,sz,lead,o.cls)).join('')}</span>`}
  return cs.map(c=>chip(c.m,c,sz,lead,o.cls)).join('')}
/* a clock drawn in ink, for the bell */
const CLK=`<svg class="uu-clk" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="13" r="9" fill="#fff6dc" stroke="#0d0b10" stroke-width="2.6"/><path d="M12 8v5l3.5 2.2" fill="none" stroke="#0d0b10" stroke-width="2.4" stroke-linecap="round"/><path d="M5 4.5l3 2M19 4.5l-3 2" stroke="#0d0b10" stroke-width="2.6" stroke-linecap="round"/></svg>`;
const due=x=>x.r==='Today'?'today':x.r==='Tomorrow'?'tomorrow':x.r==='past'?'soon':S.wd(x.day);
function foot(x){return x.locked?`<span class="uu-bell" data-t="${esc(x.ticker)}" data-d="${esc(x.day||'')}">${CLK}<b>${esc(bell(x))}</b></span>`:`<span class="uu-due">Calls due ${esc(due(x))}</span>`}
/* a gold burst badge (Mag 7, Bet #1) */
function badge(x,w,h){const t=x.nv?'BET #1':x.m7?'MAG 7':'';if(!t)return '';return `<span class="uu-bdg" style="width:${w}px;height:${h}px">${P.burstSvg(w,h,{n:11,dp:3,c1:'#ffd21f',c2:'#fff3a0',k:.8,seed:x.n})}<b>${t}</b></span>`}
/* an extruded word placeholder, filled after layout to its own width (o.fit: fit the slot's width) */
const X=(t,o)=>`<span class="uu-x" data-t="${esc(t)}" data-o='${JSON.stringify(o).replace(/'/g,'&#39;')}'></span>`;
function fillX(root){root.querySelectorAll('.uu-x').forEach(s=>{const o=JSON.parse(s.dataset.o);if(o.fit){const w=s.clientWidth;if(!w)return;o.max=w*o.fit}s.innerHTML=P.ext(s.dataset.t,o)})}
/* name fills: white with the brand's dark as the extrusion */
const nmO=(hx,o)=>Object.assign({fill:['#ffffff','#fff4d6','#f0d6a0'],shade:shOf(hx)},o);
/* --------------------------------------------------------------------------------------------- the tab around the takes */
function mount(cls){const up=D.getElementById('wc-up');up.querySelectorAll(':scope > *:not(.wc-back)').forEach(e=>e.classList.add('uu-hide'));
  up.querySelectorAll(':scope > .uu-root').forEach(e=>e.remove());const root=D.createElement('div');root.className='uu-root '+cls;const bk=up.querySelector('.wc-back');bk.before(root);bk.classList.add('uu-back');return root}
/* the filter, as three extruded slabs; the pressed one sinks into its extrusion */
function filter(root,onChange){const f=root.querySelector('.uu-flt');if(!f)return;f.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{f.querySelectorAll('button').forEach(q=>q.setAttribute('aria-pressed',q===b?'true':'false'));root.dataset.f=b.dataset.f;
  root.querySelectorAll('[data-day]').forEach(d=>{const v=[...d.querySelectorAll('[data-n]')].some(a=>!b.dataset.f||a.dataset[b.dataset.f]==='1');d.classList.toggle('uu-none',!v)});onChange&&onChange()}))}
const FLT=`<div class="uu-flt" role="group" aria-label="Show"><button type="button" aria-pressed="true" data-f="">All</button><button type="button" aria-pressed="false" data-f="m7">Mag 7</button><button type="button" aria-pressed="false" data-f="ai">AI</button></div>`;
const counts=L=>{const lk=L.filter(x=>x.locked).length;return {lk,tc:L.length-lk,all:L.length}};
/* the drift runs only while its art is on screen (idle cost) */
function run(root){const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('uu-run',e.isIntersecting)),{rootMargin:'100px'});root.querySelectorAll('.uu-art').forEach(a=>io.observe(a))}
function tickBells(root){setInterval(()=>root.querySelectorAll('.uu-bell').forEach(b=>{const t=b.querySelector('b');if(t)t.textContent=bell({ticker:b.dataset.t,day:b.dataset.d})}),60000)}
function check(sel){const r=P.check('#wc-up',sel);const root=D.querySelector('#wc-up .uu-root');
  /* anything laid over a blown-up mark's box: content boxes that intersect an art holder and are not inside it */
  const arts=[...root.querySelectorAll('.uu-art')].filter(a=>a.offsetParent);let over=0;arts.forEach(a=>{const ar=a.getBoundingClientRect();root.querySelectorAll('.uu-x,.uu-ch,.uu-bdg,.uu-bell,.uu-due,.uu-tk').forEach(n=>{if(a.contains(n)||!n.offsetParent)return;const q=n.getBoundingClientRect();if(q.left<ar.right-2&&q.right>ar.left+2&&q.top<ar.bottom-2&&q.bottom>ar.top+2)over++})});
  const small=[...root.querySelectorAll('.uu-bl,.uu-due,.uu-tk,.uu-bell b,.uu-cnt')].filter(n=>n.offsetParent).map(n=>parseFloat(getComputedStyle(n).fontSize));
  r.overArt=over;r.minFont=small.length?Math.min(...small):null;r.dead=r.deadPct.length?{max:Math.max(...r.deadPct),mean:Math.round(r.deadPct.reduce((a,b)=>a+b,0)/r.deadPct.length)}:null;delete r.deadPct;return r}
async function boot(take,build){await P.fonts();try{await build()}catch(e){console.error(e)}
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(boot.t);boot.t=setTimeout(()=>build(),300)});H.classList.add(take+'-ready')}
return {P,S,G,INK,esc,closeAt,bell,list,days,lum,dark,fillOf,shOf,tones,brand,blow,paintArt,paintCoin,chip,calls,VS,foot,badge,X,fillX,nmO,mount,filter,FLT,counts,run,tickBells,check,boot,due}})();
