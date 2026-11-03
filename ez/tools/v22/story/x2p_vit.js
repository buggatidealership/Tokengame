/* ===== H39 X2P_VIT (owner, 2026-11-03: "The vitrine and its drawer pls. Push to prod as well."): "Every round so far" as the vitrine and its
   cabinet (take B of round H37, tools/concepts/worlds/comic/story/h/h37rounds/_h37.js, built). Runs after x2p_more's H32 X2P_MAG block and takes the
   section over: #x2pMag stays in the DOM, display:none (x2p_more's order() still moves #record into place).
   The vitrine: the newest graded Mag 7 round (latest grading day, then the highest round number) alone in the tall lit bay; the other Mag 7 one per
   small bay in their order; a company not graded yet keeps an empty bay (NVIDIA "Bet #1", the others "To come").
   The cabinet: one drawer per grading week (Monday to Friday of the round's grading day), newest on top; the newest drawer open. A drawer is a real
   button (aria-expanded, aria-controls); an open drawer shows two rows of slabs, then "Show all N in this drawer" (the clearer of the two ways to keep
   a 32-round week short on a phone: a box that scrolls inside the page traps the thumb). Only an open drawer's slabs are in the page, so only they
   load their pictures (and lazily).
   The slab, its label and the H34 lift-and-tag are one component everywhere (first touch lifts and tags, the second opens #/round/n; a mouse lifts on
   hover and a click opens; the keyboard focuses, which lifts and tags, and Enter opens). Each grade is read from the page's own slab label
   (#car .card .zlab), as x2p_more does. Names fit their label by their ink, 2px clear of the grade at least, never under 8px: a name that does not
   fit on one line at 8px wraps to two (the ticker then lives in the tag only). Data: ROUNDS / UPCOMING / FILMS / CO_LOGOS (ez-data.js). ===== */
(function(){var n0=0;(function go(){if(!(window.ROUNDS&&window.UPCOMING&&document.getElementById('x2pMag')&&document.querySelector('#car .card .zlab'))){if(++n0<600)setTimeout(go,50);return}
try{run()}catch(e){window.__x2pVitErr=e;console.error(e)}})();
function run(){
const D=document,sec=D.getElementById('record');if(!sec||D.getElementById('x2pVit'))return;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const pd=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2])):null};
const md=d=>MO[d.getUTCMonth()+1]+' '+d.getUTCDate();
const M7=t=>t==='GOOG'?'GOOGL':t;
const MDL=window.MODELS||{},nm=m=>m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const winT=r=>{const W=wins(r);return W.length?W.map(nm).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'};
/* the round's picture, as the record's (written out for make_site.py: media/tile-r<n>-f1.jpg for a round with a film, media/tile-r<n>-t2.jpg without) */
const tile=r=>'media/tile-r'+r.n+'-'+((window.FILMS||{})[r.n]?'f1':'t2')+'.jpg';
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const LB={};const lab=n=>{if(LB[n])return LB[n];const z=D.querySelector(`#car .card[data-n="${n}"] .zlab`);if(!z)return {};const q=s=>((z.querySelector(s)||{}).textContent||'').trim();
  const o={ds:q('.zr .ds'),gr:q('.zr .gr')};if(o.gr)LB[n]=o;return o};
/* ---- data ---- */
const G=ROUNDS.filter(r=>r.a!=null&&r.out).slice().sort((a,b)=>a.n-b.n);
const SL=[];['META','TSLA','GOOGL','MSFT','AMZN','AAPL','NVDA'].forEach(t=>{const g=G.filter(r=>M7(r.ticker)===t).pop();
  if(g){SL.push({r:g,t});return}const u=(window.UPCOMING||[]).filter(r=>M7(r.ticker)===t).sort((a,b)=>a.n-b.n)[0];SL.push({u:u||{ticker:t,co:t},t})});
SL.sort((a,b)=>((a.r||a.u).n||1e9)-((b.r||b.u).n||1e9));
const day=r=>pd(r.resolves)||pd(r.called);
const G7=SL.filter(s=>s.r).map(s=>s.r);
const HERO=G7.slice().sort((a,b)=>((day(b)||0)-(day(a)||0))||(b.n-a.n))[0];
const onCase=new Set(G7.map(r=>r.n));
const REST=G.filter(r=>!onCase.has(r.n)).reverse();/* newest first */
const wk=r=>{const d=day(r);if(!d)return -1;const m=new Date(d);m.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return m.getTime()};
const WEEKS=[];REST.forEach(r=>{const k=wk(r);let w=WEEKS.find(x=>x.k===k);if(!w){w={k,rs:[]};WEEKS.push(w)}w.rs.push(r)});
WEEKS.sort((a,b)=>b.k-a.k);
WEEKS.forEach(w=>{if(w.k<0){w.t='Undated';w.a='Undated';return}const a=new Date(w.k),b=new Date(w.k+4*864e5);
  w.t=a.getUTCMonth()===b.getUTCMonth()?`${md(a)}–${b.getUTCDate()}`:`${md(a)}–${md(b)}`;w.a=`${md(a)} to ${a.getUTCMonth()===b.getUTCMonth()?b.getUTCDate():md(b)}`});
/* ---- the slab ---- */
function slab(r,lz){const L=lab(r.n),f=(window.FILMS||{})[r.n];
  return `<a class="vt-sl${L.gr==='10'?' vt-10':''}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.gr||''}${L.ds?', '+L.ds:''}. ${winT(r)}. Open the slab.`)}">`+
   `<span class="vt-wn"><img ${lz?'data-src':'src'}="${tile(r)}" alt="" loading="lazy" decoding="async" draggable="false">${f?'<i class="vt-pl" aria-hidden="true"></i>':''}</span><span class="vt-fr" aria-hidden="true"></span>`+
   `<span class="vt-lb" aria-hidden="true"><span class="vt-l"><span class="vt-nm">${esc(r.co)}</span><span class="vt-tk">${esc(r.ticker)}</span></span><span class="vt-r"><span class="vt-ds">${esc(L.ds||'')}</span><span class="vt-gr">${esc(L.gr||'')}</span></span></span></a>`}
function emptySlab(u,bet){const lg=logoF(u.ticker),co=u.co===u.ticker&&u.ticker==='AAPL'?'Apple':u.co;
  return `<span class="vt-sl vt-mt" role="img" aria-label="${esc(`Empty slot: ${co} (${u.ticker}), ${bet?'Bet #1':'to come'}`)}"><span class="vt-wn">${lg?`<img class="vt-ml${dark(u.ticker)?'':' vt-inv'}" src="${lg}" alt="" loading="lazy" decoding="async">`:''}<em class="vt-when">${bet?'Bet #1':'To come'}</em></span><span class="vt-fr" aria-hidden="true"></span>`+
   `<span class="vt-lb" aria-hidden="true"><span class="vt-l"><span class="vt-nm">${esc(co)}</span><span class="vt-tk">${esc(u.ticker)}</span></span><span class="vt-r"><span class="vt-ds">${bet?'Bet #1':'Soon'}</span><span class="vt-gr">?</span></span></span></span>`}
function tag(r){const L=lab(r.n),W=wins(r);
  return `<span class="vt-tag" aria-hidden="true"><b>${esc(r.co)} <small>(${esc(r.ticker)})</small></b>${L.gr?`<span class="vt-tg">Grade ${esc(L.gr)}${L.ds?' · '+esc(L.ds):''}</span>`:''}<span class="vt-tw${W.length?'':' vt-no'}">${esc(winT(r))}</span></span>`}
const item=(r,lz)=>`<div class="vt-it" data-n="${r.n}">${slab(r,lz)}${tag(r)}</div>`;
/* ---- the section ---- */
const head=`<header class="m7-hd"><h2 class="t4-h2 m7-h2"><span class="t4-hw">Every round so far</span></h2><p class="m7-cap"><span class="m7-c1">Each round gets a grade from 1 to 10.</span> <span class="m7-c1">A 1 means all four AI<span class="x2p-lc">s</span> got the direction wrong.</span> <span class="m7-c1">A 10 means all four got the direction right, and close to the real move.</span></p></header>`;
const bay=(x,cls)=>`<div class="vt-bay ${cls||''}"><div class="vt-bin">${x}</div></div>`;
const others=SL.filter(s=>!(s.r&&s.r===HERO));
const caseH=`<div class="vt-case" role="group" aria-label="The Mag 7"><span class="vt-plate vt-plt" aria-hidden="true"><b>Mag 7</b></span>${HERO?bay(item(HERO),'vt-hero'):''}<div class="vt-bays">${others.map(s=>bay(s.r?item(s.r):emptySlab(s.u,s.t==='NVDA'),s.r?'':'vt-bmt')).join('')}</div></div>`;
const open=new Set(WEEKS.length?[0]:[]),all=new Set();
const cols=()=>matchMedia('(min-width:1000px)').matches?8:matchMedia('(min-width:600px)').matches?4:matchMedia('(min-width:480px)').matches?3:2;
function trayHTML(i){const w=WEEKS[i],k=all.has(i)?w.rs.length:Math.min(w.rs.length,cols()*2);
  const more=w.rs.length>cols()*2?`<button class="vt-plate vt-all" type="button" data-all="${i}" aria-expanded="${all.has(i)}"><b>${all.has(i)?'Show fewer':`Show all ${w.rs.length} in this drawer`}</b></button>`:'';
  return `<div class="vt-tin">${w.rs.slice(0,k).map(r=>item(r)).join('')}</div>${more}`}
const drawer=(w,i)=>{const o=open.has(i);return `<div class="vt-dw${o?' vt-open':''}" data-dw="${i}"><button class="vt-df" type="button" aria-expanded="${o}" aria-controls="vtTray${i}" aria-label="${esc(`Week of ${w.a}: ${w.rs.length} round${w.rs.length>1?'s':''}. ${o?'Close':'Open'} the drawer.`)}"><i class="vt-d1" aria-hidden="true"></i><i class="vt-d2" aria-hidden="true"></i><i class="vt-d3" aria-hidden="true"></i><span class="vt-card" aria-hidden="true"><b>${esc(w.t)}</b><span>${w.rs.length} round${w.rs.length>1?'s':''}</span></span></button>`+
  `<div class="vt-tray" id="vtTray${i}" role="group" aria-label="${esc('Rounds graded in the week of '+w.a)}"${o?'':' hidden'}>${o?trayHTML(i):''}</div></div>`};
const cabH=`<div class="vt-cab" role="group" aria-label="Every other round, a drawer a week, newest on top"><span class="vt-plate vt-plt" aria-hidden="true"><b>Every other round · a drawer a week</b></span>${WEEKS.map(drawer).join('')}</div>`;
const root=D.createElement('div');root.className='vt';root.id='x2pVit';
/* ---- H41 the swiping element under the vitrine (owner, 2026-11-03: "the weekly drawer is too complex... underneath we just have sort of the
   swiping element... the Tinder one"): every graded round, newest first (latest grading day, then the highest round number), one switch:
   window.__x2pSwipe = 'belt' (default: take C's grading line, a belt scrolled sideways, brass date plates at each new close, Newer / Older)
   or 'deck' (a stack: one slab in front, the next two peeking; swipe or drag left/right, the arrows or the arrow keys deal; swipe up opens).
   The drawer cabinet is off; window.__x2pDrawers=1 brings it back under the line. Painting: media/vit-belt-h41.webp (the belt, take C's, tiled). */
const NEWF=G.slice().sort((a,b)=>((day(b)||0)-(day(a)||0))||(b.n-a.n));
const SW=String(window.__x2pSwipe||'belt').toLowerCase()==='deck'?'deck':'belt',DRW=window.__x2pDrawers==1;
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let lineH='';
if(SW==='belt'){let h='',prev=null;NEWF.forEach(r=>{const d=day(r),k=d?d.getTime():-1;if(k!==prev){prev=k;h+=`<span class="vt-plate vt-day" aria-hidden="true"><b>${d?esc(md(d)):'Undated'}</b></span>`}h+=item(r,1)});
  lineH=`<div class="vt-line vt-sw-belt" role="group" aria-label="${esc(`The line: every graded round, newest first, ${NEWF.length} rounds. Scroll sideways, or use the arrow keys.`)}"><div class="vt-bw"><div class="vt-belt"><div class="vt-trk">${h}</div></div>`+
   `<span class="vt-plate vt-bplt" aria-hidden="true"><b>The line · newest first</b></span></div>`+
   `<div class="vt-nav"><button class="vt-plate vt-nv vt-nw" type="button" aria-label="Newer rounds"><b>‹ Newer</b></button><button class="vt-plate vt-nv vt-ol" type="button" aria-label="Older rounds"><b>Older ›</b></button></div></div>`}
else lineH=`<div class="vt-line vt-sw-deck" role="group" aria-label="${esc(`Every graded round, newest first, one at a time (${NEWF.length}). Swipe left for older, right for newer, up to open; or the arrow keys.`)}">`+
   `<div class="vt-stk"></div><div class="vt-nav"><button class="vt-plate vt-nv vt-nw" type="button" aria-label="Newer round"><b>‹ Newer</b></button>`+
   `<span class="vt-plate vt-cnt" aria-live="polite"><b></b></span><button class="vt-plate vt-nv vt-ol" type="button" aria-label="Older round"><b>Older ›</b></button></div></div>`;
root.innerHTML=head+caseH+lineH+(DRW?cabH:'');
root.classList.add('vt-on-'+SW);
sec.classList.add('vt-sec');sec.appendChild(root);
/* desktop pairs the closed drawers two to a row; a closed drawer left alone in its row (before an open one, or the last) takes the whole row */
function pair(){let c=0;const ds=[...root.querySelectorAll('.vt-dw')];ds.forEach((d,j)=>{d.classList.remove('vt-solo');if(open.has(+d.dataset.dw)){c=0;return}
  const nx=ds[j+1];if(c===0&&(!nx||open.has(+nx.dataset.dw))){d.classList.add('vt-solo');return}c=1-c})}
pair();
/* ---- drawers ---- */
function setDrawer(i,o){const dw=root.querySelector(`.vt-dw[data-dw="${i}"]`);if(!dw)return;const b=dw.querySelector('.vt-df'),t=dw.querySelector('.vt-tray'),w=WEEKS[i];
  o?open.add(i):(open.delete(i),all.delete(i));dw.classList.toggle('vt-open',o);b.setAttribute('aria-expanded',o);
  b.setAttribute('aria-label',`Week of ${w.a}: ${w.rs.length} round${w.rs.length>1?'s':''}. ${o?'Close':'Open'} the drawer.`);
  pair();if(o){t.innerHTML=trayHTML(i);t.hidden=false;t.classList.remove('vt-pull');void t.offsetWidth;t.classList.add('vt-pull');fit(t)}else{t.hidden=true;t.innerHTML=''}}
root.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.vt-df');if(b){const i=+b.parentNode.dataset.dw;setDrawer(i,!open.has(i));return}
  const a=e.target.closest&&e.target.closest('[data-all]');if(a){const i=+a.dataset.all,dw=a.closest('.vt-dw');all.has(i)?all.delete(i):all.add(i);const t=dw.querySelector('.vt-tray');t.innerHTML=trayHTML(i);fit(t);
    const nb=t.querySelector('[data-all]');if(nb)nb.focus({preventScroll:true});if(!all.has(i)){const r=dw.getBoundingClientRect();if(r.top<0)dw.scrollIntoView({block:'start'})}}});
/* ---- fitting: names by their ink, at least 2px clear of the grade, never under 8px ---- */
const ink=el=>{const rs=[],tw=D.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const g=D.createRange();g.selectNodeContents(n);rs.push(...[...g.getClientRects()].filter(r=>r.width>0))}
  return rs.length?{l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right)),t:Math.min(...rs.map(r=>r.top)),b:Math.max(...rs.map(r=>r.bottom))}:null};
const MIN=8;
function fitOne(lb){const nmE=lb.querySelector('.vt-nm'),tk=lb.querySelector('.vt-tk'),rc=lb.querySelector('.vt-r');if(!nmE||!lb.offsetWidth)return;
  nmE.style.fontSize='';lb.classList.remove('vt-w2','vt-nt','vt-clip');
  const R=ink(rc),LR=lb.getBoundingClientRect(),lim=e=>Math.min(R?R.l-2:LR.right,LR.right-1,e.getBoundingClientRect().right+.5),over=e=>{const I=ink(e);return I?I.r-lim(e):0};
  const vfit=()=>{const I=ink(lb.querySelector('.vt-l'));return !I||(I.b<=LR.bottom+.5&&I.t>=LR.top-.5)};
  const f0=parseFloat(getComputedStyle(nmE).fontSize);let f=f0,g=0;
  while((over(nmE)>0||!vfit())&&f>MIN&&g++<60){f=Math.max(MIN,f-.25);nmE.style.fontSize=f+'px'}
  if(over(nmE)>0||!vfit()){/* two lines */lb.classList.add('vt-w2');f=f0;nmE.style.fontSize=f+'px';g=0;while((over(nmE)>0||!vfit())&&f>MIN&&g++<60){f=Math.max(MIN,f-.25);nmE.style.fontSize=f+'px'}
    if(over(nmE)>0||!vfit())lb.classList.add('vt-clip')}
  else if(tk&&tk.offsetWidth&&over(tk)>0)lb.classList.add('vt-nt')}
function fit(scope){const st=root.querySelector('.vt-stk');st&&st.classList.add('vt-flat');
  try{(scope||root).querySelectorAll('.vt-lb').forEach(lb=>{const it=lb.closest('.vt-belt .vt-it');if(it&&!scope&&!it.dataset.f)return;fitOne(lb)})}finally{st&&st.classList.remove('vt-flat')}}
/* the Anton "1" is boxed to a full digit a frame later (x2p_more FONTS AND GOLD), which widens the grade: fit again then */
let rq=0;const refit=()=>{if(rq)return;rq=requestAnimationFrame(()=>{rq=requestAnimationFrame(()=>{rq=0;try{fit()}catch(x){}})})};
new MutationObserver(ms=>{if(ms.some(m=>[...m.addedNodes].some(n=>n.nodeType===1&&(n.classList.contains('uf1')||n.querySelector&&n.querySelector('.uf1')))))refit()}).observe(root,{childList:true,subtree:true});
/* ---- the lift (H34): touch = the first tap lifts and tags, the second opens; mouse = hover lifts, a click opens; the tag kept on screen ---- */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.vt-it.vt-lift').forEach(l=>l.classList.remove('vt-lift'));
function place(it){const t=it.querySelector('.vt-tag');if(!t)return;t.style.left='';const r=it.getBoundingClientRect(),w=t.offsetWidth,vw=D.documentElement.clientWidth;
  const bx=it.closest('.vt-belt'),B=bx?bx.getBoundingClientRect():{left:0,right:vw};let x=r.left+r.width/2-w/2;x=Math.max(B.left+8,Math.min(B.right-8-w,x));t.style.left=(x-r.left)+'px';t.style.setProperty('--tx',Math.max(10,Math.min(w-10,r.left+r.width/2-x))+'px')}
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.vt-it>a.vt-sl');if(!a)return;const it=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!it.classList.contains('vt-lift')){e.preventDefault();e.stopPropagation();unlift();place(it);it.classList.add('vt-lift')}ptype=''},true);
root.addEventListener('pointerover',e=>{const it=e.target.closest&&e.target.closest('.vt-it');if(it&&e.pointerType==='mouse')place(it)});
root.addEventListener('focusin',e=>{const it=e.target.closest&&e.target.closest('.vt-it');if(it)place(it)});
D.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('.vt-it.vt-lift')))unlift()});
addEventListener('scroll',()=>{const l=root.querySelector('.vt-lift');if(l){const r=l.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)unlift()}},{passive:true});
/* ---- width changes: the open drawers re-deal to the new column count; every label refits ---- */
let lw=innerWidth,lc=cols();addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;const c=cols();
  if(c!==lc){lc=c;open.forEach(i=>{const t=root.querySelector('#vtTray'+i);if(t)t.innerHTML=trayHTML(i)})}fit();LN.resize()});
fit();D.fonts&&D.fonts.ready.then(()=>{fit();setTimeout(()=>{try{fit()}catch(x){}},700)});
/* ===================================================== the line (belt or deck) ===================================================== */
const LN=SW==='belt'?belt():deck();
window.__x2pVit={WEEKS,REST,SL,HERO,setDrawer,fit,NEWF,SW,LN};
/* ---- the belt: a sideways scroller (overflow-y hidden, so it never traps the page's scroll); slabs load and fit only once near its view ---- */
function belt(){const ln=root.querySelector('.vt-line'),B=ln.querySelector('.vt-belt'),nw=ln.querySelector('.vt-nw'),ol=ln.querySelector('.vt-ol');
  const its=[...B.querySelectorAll('.vt-it')],links=its.map(i=>i.querySelector('a.vt-sl'));
  /* one tab stop on the belt (roving): the arrow keys walk it */
  let cur=0;const rove=k=>{links.forEach((a,i)=>a.tabIndex=i===k?0:-1);cur=k};rove(0);
  const seen=it=>{if(it.dataset.f)return;it.dataset.f=1;const im=it.querySelector('img[data-src]');if(im){im.src=im.dataset.src;im.removeAttribute('data-src')}fitOne(it.querySelector('.vt-lb'))};
  let io=null;const near=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting)||io)return;near.disconnect();
    io=new IntersectionObserver(es2=>es2.forEach(e=>{if(e.isIntersecting)seen(e.target)}),{root:B,rootMargin:'0px 100% 0px 100%'});its.forEach(i=>io.observe(i))},{rootMargin:'700px 0px'});near.observe(ln);
  const ends=()=>{const m=B.scrollWidth-B.clientWidth;[[nw,B.scrollLeft<=2],[ol,B.scrollLeft>=m-2]].forEach(([b,x])=>{b.classList.toggle('vt-off',x);b.setAttribute('aria-disabled',x)})};
  let sq=0;B.addEventListener('scroll',()=>{if(sq)return;sq=requestAnimationFrame(()=>{sq=0;ends();const l=B.querySelector('.vt-lift');if(l){const r=l.getBoundingClientRect(),R=B.getBoundingClientRect();if(r.right<R.left||r.left>R.right)unlift()}})},{passive:true});
  const go=d=>{const m=B.scrollWidth-B.clientWidth;if(d<0&&B.scrollLeft<=2||d>0&&B.scrollLeft>=m-2)return;B.scrollBy({left:d*B.clientWidth*.8,behavior:RM()?'auto':'smooth'})};
  nw.addEventListener('click',()=>go(-1));ol.addEventListener('click',()=>go(1));
  const show=k=>{const it=its[k],R=B.getBoundingClientRect(),r=it.getBoundingClientRect();seen(it);if(r.left<R.left+8||r.right>R.right-8)B.scrollBy({left:r.left+r.width/2-(R.left+R.width/2),behavior:RM()?'auto':'smooth'})};
  B.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowLeft:-1,Home:-1e9,End:1e9}[e.key];if(k==null)return;const i=links.indexOf(D.activeElement);if(i<0)return;e.preventDefault();
    const j=Math.max(0,Math.min(links.length-1,i+k));rove(j);links[j].focus({preventScroll:true});show(j)});
  B.addEventListener('focusin',e=>{const i=links.indexOf(e.target);if(i>=0){rove(i);show(i)}});
  ends();
  return {resize(){its.forEach(i=>{if(i.dataset.f){fitOne(i.querySelector('.vt-lb'))}});ends()},B,its}}
/* ---- the deck: one slab in front, the next two peeking under it; a deal flies the front card off the way it was swiped and the next rises ---- */
function deck(){const ln=root.querySelector('.vt-line'),S=ln.querySelector('.vt-stk'),nw=ln.querySelector('.vt-nw'),ol=ln.querySelector('.vt-ol'),cnt=ln.querySelector('.vt-cnt b');
  let i=0;const N=NEWF.length,els=new Map();
  const mk=r=>{const w=D.createElement('div');w.innerHTML=item(r);const it=w.firstChild;it.classList.add('vt-dk');return it};
  function render(j,fromKb){const want=NEWF.slice(j,j+3);const keep=new Set(want.map(r=>r.n));
    els.forEach((it,n)=>{if(!keep.has(n)&&!it.classList.contains('vt-fly')){it.dataset.p=3;it.inert=true;els.delete(n);setTimeout(()=>it.remove(),RM()?0:340)}});
    want.forEach((r,p)=>{let it=els.get(r.n);if(!it){it=mk(r);it.dataset.p='f';S.appendChild(it);fitOne(it.querySelector('.vt-lb'));it.dataset.p=Math.min(3,p+1);els.set(r.n,it);void it.offsetWidth}
      it.dataset.p=p;const a=it.querySelector('a.vt-sl');a.tabIndex=p?-1:0;it.inert=!!p;p?it.setAttribute('aria-hidden','true'):it.removeAttribute('aria-hidden')});
    i=j;cnt.textContent=`R${NEWF[j].n} · ${j+1} of ${N}`;
    [[nw,j<=0],[ol,j>=N-1]].forEach(([b,x])=>{b.classList.toggle('vt-off',x);b.setAttribute('aria-disabled',x)});
    if(fromKb){const f=els.get(NEWF[j].n);f&&f.querySelector('a.vt-sl').focus({preventScroll:true})}}
  const front=()=>els.get(NEWF[i].n);
  function deal(step,kb){const j=i+step;if(j<0||j>=N){bump(step);return false}unlift();const f=front();
    if(f&&!RM()){f.classList.add('vt-fly',step>0?'vt-fl':'vt-flr');f.style.transform='';f.inert=true;els.delete(NEWF[i].n);setTimeout(()=>f.remove(),360)}
    else if(f){f.remove();els.delete(NEWF[i].n)}
    render(j,kb);return true}
  function bump(step){const f=front();if(!f||RM())return;f.classList.remove('vt-bump','vt-bumpr');void f.offsetWidth;f.classList.add(step>0?'vt-bump':'vt-bumpr')}
  nw.addEventListener('click',()=>deal(-1));ol.addEventListener('click',()=>deal(1));
  ln.addEventListener('keydown',e=>{if(e.target.closest('button'))return;const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(!k)return;e.preventDefault();deal(k,true)});
  /* the gesture, on the front card only (touch-action:none there; anywhere else the page scrolls as usual) */
  let g=null,eat=0;
  S.addEventListener('dragstart',e=>e.preventDefault());
  S.addEventListener('pointerdown',e=>{const f=front();if(!f||!f.contains(e.target)||e.button>0)return;g={id:e.pointerId,x:e.clientX,y:e.clientY,t:performance.now(),ax:null,f,ly:e.clientY,pt:e.pointerType}});
  S.addEventListener('pointermove',e=>{if(!g||e.pointerId!==g.id)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;
    if(!g.ax){if(Math.hypot(dx,dy)<7)return;g.ax=Math.abs(dx)>=Math.abs(dy)?'x':dy<0?'up':'down';try{g.f.setPointerCapture(g.id)}catch(x){}g.f.classList.add('vt-drag');unlift()}
    if(g.ax==='x')g.f.style.transform=`translate(${dx}px,${Math.max(-30,Math.min(30,dy*.25))}px) rotate(${dx/16}deg)`;
    else if(g.ax==='up')g.f.style.transform=`translateY(${Math.min(0,dy)}px) scale(${1+Math.min(0,dy)/-2500})`;
    else if(g.pt!=='mouse'){scrollBy(0,g.ly-e.clientY);g.ly=e.clientY}});
  const end=e=>{if(!g||e.pointerId!==g.id)return;const G0=g;g=null;if(!G0.ax)return;eat=performance.now()+400;
    const f=G0.f,dx=e.clientX-G0.x,dy=e.clientY-G0.y,dt=Math.max(1,performance.now()-G0.t),W=f.offsetWidth,H=f.offsetHeight;f.classList.remove('vt-drag');
    if(e.type==='pointercancel'){f.style.transform='';return}
    if(G0.ax==='x'&&(Math.abs(dx)>W*.28||Math.abs(dx)/dt>.45&&Math.abs(dx)>30)){if(deal(dx<0?1:-1))return}
    if(G0.ax==='up'&&(-dy>H*.2||-dy/dt>.45&&-dy>36)){const n=NEWF[i].n;if(!RM()){f.classList.add('vt-up');f.style.transform=''}
      setTimeout(()=>{eat=0;ptype='';const a=f.querySelector('a.vt-sl');a?a.click():(location.hash='#/round/'+n);setTimeout(()=>{f.classList.remove('vt-up')},400)},RM()?0:220);return}
    f.style.transform=''};
  S.addEventListener('pointerup',end);S.addEventListener('pointercancel',end);
  /* a drag is not a tap: the click that may follow it neither lifts nor opens */
  D.addEventListener('click',e=>{if(performance.now()<eat&&S.contains(e.target)){e.preventDefault();e.stopPropagation();eat=0}},true);
  render(0);
  return {resize(){[...S.children].forEach(it=>{S.classList.add('vt-flat');fitOne(it.querySelector('.vt-lb'));S.classList.remove('vt-flat')})},S,deal,get i(){return i}}}
}
})();
