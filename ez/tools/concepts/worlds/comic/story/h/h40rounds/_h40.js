/* H40 rounds (mockup): "Every round so far", five new worlds (window.__H40 = A..E). Mounts over the built v46-live-x2plus.html:
   hides the live vitrine (#x2pVit) and builds #h40 inside #record. Data: window.__x2pVit (its SL = the seven Mag 7 slots, the page's
   own rule) and ROUNDS / FILMS / CO_LOGOS (ez-data.js); every grade and grade word is read from the page's own slab label (#car .card .zlab).
   The slab, its label, the lift and its tag are the live component (classes vt-*, styled by the live x2p_vit.css): one component per thing.
   A  The population report: every round stacked in its grade row, 10 on top (how rare a 10 is), the Mag 7 face out in their rows.
   B  The pack break: every close is a pack; the newest pack torn open with its rounds fanned; the Mag 7 as the chase set (NVIDIA and Apple still sealed).
   C  The grading line: the newest round under the press, every other round on the belt behind it, newest first; Mag 7 plates find theirs on the belt.
   D  The tape: the ticker prints every round as it is graded; each slab hangs off its line, newest first; Mag 7 slabs hang large.
   E  The floor screen: the newest round's film on the exchange's big screen; seven monitors tune it to the Mag 7; every round on the floor below. */
(function(){var n0=0;(function go(){if(!(window.__x2pVit&&window.ROUNDS&&document.querySelector('#car .card .zlab'))){if(++n0<600)setTimeout(go,50);return}
try{run()}catch(e){window.__h40Err=e;console.error(e)}})();
function run(){
const D=document,T=(window.__H40||'A').toUpperCase(),V=window.__x2pVit,P='tools/concepts/worlds/comic/story/h/h40rounds/img/';
const sec=D.getElementById('record');if(!sec||D.getElementById('h40'))return;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const pd=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2])):null};
const md=d=>MO[d.getUTCMonth()+1]+' '+d.getUTCDate();
const MDL=window.MODELS||{},nm=m=>m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const winT=r=>{const W=wins(r);return W.length?W.map(nm).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'};
const FL=window.FILMS||{};
const tile=r=>'media/tile-r'+r.n+'-'+(FL[r.n]?'f1':'t2')+'.jpg';
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const LB={};const lab=n=>{if(LB[n])return LB[n];const z=D.querySelector(`#car .card[data-n="${n}"] .zlab`);if(!z)return {};const q=s=>((z.querySelector(s)||{}).textContent||'').trim();
  const o={ds:q('.zr .ds'),gr:q('.zr .gr')};if(o.gr)LB[n]=o;return o};
const grn=r=>parseFloat(lab(r.n).gr)||0;
const M7=t=>t==='GOOG'?'GOOGL':t,M7S=new Set(['META','TSLA','GOOGL','MSFT','AMZN','AAPL','NVDA']),isM7=r=>M7S.has(M7(r.ticker));
const CO={META:'Meta',TSLA:'Tesla',GOOGL:'Alphabet',MSFT:'Microsoft',AMZN:'Amazon',AAPL:'Apple',NVDA:'NVIDIA'};
/* ---- data ---- */
const G=ROUNDS.filter(r=>r.a!=null&&r.out).slice().sort((a,b)=>a.n-b.n);
const day=r=>pd(r.resolves)||pd(r.called);
const NEWF=G.slice().sort((a,b)=>((day(b)||0)-(day(a)||0))||(b.n-a.n));/* newest first */
const NEW=NEWF[0];
const SL=V.SL;/* seven slots: {r} graded or {u} to come, in reporting order */
const DAYS=[];NEWF.forEach(r=>{const d=day(r),k=d?d.getTime():-1;let g=DAYS.find(x=>x.k===k);if(!g){g={k,d,rs:[]};DAYS.push(g)}g.rs.push(r)});
DAYS.forEach(g=>{g.t=g.d?md(g.d):'Undated'});
/* ---- the slab (live component) ---- */
function slab(r){const L=lab(r.n),f=FL[r.n];
  return `<a class="vt-sl${L.gr==='10'?' vt-10':''}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.gr||''}${L.ds?', '+L.ds:''}. ${winT(r)}. Open the slab.`)}">`+
   `<span class="vt-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="vt-pl" aria-hidden="true"></i>':''}</span><span class="vt-fr" aria-hidden="true"></span>`+
   `<span class="vt-lb" aria-hidden="true"><span class="vt-l"><span class="vt-nm">${esc(r.co)}</span><span class="vt-tk">${esc(r.ticker)}</span></span><span class="vt-r"><span class="vt-ds">${esc(L.ds||'')}</span><span class="vt-gr">${esc(L.gr||'')}</span></span></span></a>`}
function tag(r){const L=lab(r.n),W=wins(r);
  return `<span class="vt-tag" aria-hidden="true"><b>${esc(r.co)} <small>(${esc(r.ticker)})</small></b>${L.gr?`<span class="vt-tg">Grade ${esc(L.gr)}${L.ds?' · '+esc(L.ds):''}</span>`:''}<span class="vt-tw${W.length?'':' vt-no'}">${esc(winT(r))}</span></span>`}
const item=(r,c)=>`<div class="vt-it${c?' '+c:''}" data-n="${r.n}">${slab(r)}${tag(r)}</div>`;
/* a slab seen in a pile: the holder and its picture only, no label (decoration of a row whose plate carries the facts) */
const mini=r=>`<span class="h4-mini" aria-hidden="true"><span class="vt-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async"></span><span class="vt-fr"></span></span>`;
const m7name=s=>s.r?s.r.co:(CO[s.t]||s.t);
/* ---- the section head (today's, unchanged: one variable per take) ---- */
const head=`<header class="m7-hd"><h2 class="t4-h2 m7-h2"><span class="t4-hw">Every round so far</span></h2><p class="m7-cap"><span class="m7-c1">Each round gets a grade from 1 to 10.</span> <span class="m7-c1">A 10 means all four AI<span class="x2p-lc">s</span> got it right, and close.</span></p></header>`;
const plate=(t,c,tagN)=>`<${tagN||'span'} class="vt-plate h4-pt ${c||''}"${tagN==='button'?' type="button"':''}><b>${t}</b></${tagN||'span'}>`;
const cols=()=>matchMedia('(min-width:1000px)').matches?8:matchMedia('(min-width:600px)').matches?4:3;
const root=D.createElement('div');root.className='vt h40 h40-'+T;root.id='h40';
let after=()=>{};
/* =================================================================== A: the population report */
if(T==='A'){
  const ROWS=[];for(let g=10;g>=1;g--)ROWS.push({g,rs:NEWF.filter(r=>Math.max(1,Math.floor(grn(r)))===g)});
  ROWS.forEach(R=>{R.rs.sort((a,b)=>(isM7(b)-isM7(a))||0)});
  const nr=ROWS.find(R=>R.rs.includes(NEW));const open=new Set([nr?nr.g:10]);
  const m7n=SL.filter(s=>s.r).length;
  const allR=new Set();const tray=R=>{const k=allR.has(R.g)?R.rs.length:Math.min(R.rs.length,cols()*2);return `<div class="pa-tin">${R.rs.slice(0,k).map(r=>item(r,r===NEW?'pa-new':'')).join('')}</div>`+
    (R.rs.length>cols()*2?`<button class="vt-plate h4-pt pa-all" type="button" data-g="${R.g}"><b>${allR.has(R.g)?'Show fewer':`All ${R.rs.length} in row ${R.g}`}</b></button>`:'')};
  const row=R=>{const o=open.has(R.g),m=R.rs.filter(isM7),rest=R.rs.filter(r=>!isM7(r));
    return `<div class="pa-row${o?' pa-open':''}${R.rs.length?'':' pa-zero'}" data-g="${R.g}">`+
     `<button class="pa-pl" type="button" aria-expanded="${o}" aria-controls="paT${R.g}" aria-label="${esc(`Grade ${R.g}${R.g<10?' to '+R.g+'.5':''}: ${R.rs.length} round${R.rs.length===1?'':'s'}. ${o?'Close':'Open'} the row.`)}"${R.rs.length?'':' disabled'}><span class="pa-pn">${R.g}</span><span class="pa-pc">×${R.rs.length}</span></button>`+
     `<div class="pa-sh">${m.map(r=>item(r,'pa-m7'+(r===NEW?' pa-new':''))).join('')}<span class="pa-pile">${rest.map(r=>r===NEW?`<span class="h4-mini pa-nmini" aria-hidden="true"><span class="vt-wn"><img src="${tile(r)}" alt="" loading="lazy"></span><span class="vt-fr"></span></span>`:mini(r)).join('')}</span></div>`+
     `<div class="pa-tray" id="paT${R.g}"${o?'':' hidden'}>${o?tray(R):''}</div></div>`};
  root.innerHTML=head+`<div class="pa-wrap"><div class="pa-top">${item(NEW,'pa-hero')}<div class="pa-side">${plate('Newest · Round '+NEW.n,'pa-p1')}${plate(`Graded ${esc(lab(NEW.n).gr)} · into row ${nr?nr.g:''}`,'pa-p2')}</div></div>`+
   `<div class="pa-board" role="group" aria-label="Every graded round by grade, 10 at the top">${plate(`Rounds by grade · ${G.length} graded`,'vt-plt')}${ROWS.map(row).join('')}</div>`+
   `<div class="pa-key">${plate(`Mag 7 face out · ${m7n} of 7 graded`,'pa-p3')}</div></div>`;
  root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.pa-all');if(a){const g=+a.dataset.g;allR.has(g)?allR.delete(g):allR.add(g);const t=a.parentNode;t.innerHTML=tray(ROWS.find(x=>x.g===g));fit(t);return}
    const b=e.target.closest&&e.target.closest('.pa-pl');if(!b)return;const rw=b.parentNode,g=+rw.dataset.g,R=ROWS.find(x=>x.g===g),t=rw.querySelector('.pa-tray');
    const o=!open.has(g);o?open.add(g):open.delete(g);rw.classList.toggle('pa-open',o);b.setAttribute('aria-expanded',o);t.hidden=!o;t.innerHTML=o?tray(R):'';if(o)fit(t)});
  /* the pile: each slab shows a sliver; the step shrinks so a full row never spills */
  /* one step for every row, so a pile's length is its count (a histogram), set by the most crowded row */
  after=()=>{let st=1e9,w=0;const rows=[...root.querySelectorAll('.pa-sh')];rows.forEach(sh=>{const ms=[...sh.querySelector('.pa-pile').children];if(ms.length<2)return;w=ms[0].offsetWidth;
      const av=sh.clientWidth-[...sh.querySelectorAll('.pa-m7')].reduce((a,e)=>a+e.offsetWidth+6,0)-2;st=Math.min(st,(av-w)/(ms.length-1))});
    st=Math.max(3,Math.min(w*1.08,st));rows.forEach(sh=>sh.querySelector('.pa-pile').style.setProperty('--st',st+'px'))};
}
/* =================================================================== B: the pack break */
if(T==='B'){
  const D0=DAYS[0];const fan=[NEW,...D0.rs.filter(r=>r!==NEW&&isM7(r)),...D0.rs.filter(r=>r!==NEW&&!isM7(r)).sort((a,b)=>grn(b)-grn(a))].slice(0,5);
  const ord=fan.length===5?[3,1,0,2,4]:fan.length===4?[3,1,0,2]:fan.length===3?[1,0,2]:fan.length===2?[1,0]:[0];/* slot -> fan index, the newest in the middle */
  const fanH=ord.map((fi,slot)=>{const r=fan[fi],c=slot-(ord.length-1)/2;return `<div class="pb-f" style="--c:${c};--a:${Math.abs(c)}">${item(r,fi===0?'pb-top':'')}</div>`}).join('');
  const openD=new Set(),allP={v:false};
  const packLabel=(g,big)=>`<span class="pb-lab"><b>${esc(g.t)}</b><span>${g.rs.length} round${g.rs.length===1?'':'s'}</span></span>`;
  const pk=(g,i)=>`<div class="pb-pk" data-d="${i}"><button class="pb-pb" type="button" aria-expanded="false" aria-controls="pbT${i}" aria-label="${esc(`The pack of ${g.t}: ${g.rs.length} round${g.rs.length===1?'':'s'} graded at that close. Open it.`)}">`+
     `<span class="pb-peek" aria-hidden="true">${g.rs.slice(0,3).map(mini).join('')}</span><span class="pb-wr" aria-hidden="true"></span>${packLabel(g)}</button></div>`;
  const chase=SL.map(s=>s.r?`<div class="pb-ch">${item(s.r)}</div>`:`<div class="pb-ch pb-seal" role="img" aria-label="${esc(`${m7name(s)} (${s.t}): not graded yet, ${s.t==='NVDA'?'Bet #1':'to come'}`)}"><span class="pb-swr" aria-hidden="true"></span><span class="pb-slab" aria-hidden="true">${logoF(s.t)?`<img src="${logoF(s.t)}" alt="" class="${dark(s.t)?'':'pb-inv'}">`:''}<b>${s.t==='NVDA'?'Bet #1':'To come'}</b><span>${esc(m7name(s))}</span></span></div>`).join('');
  const rest=DAYS.slice(1);const SHOWN=()=>allP.v?rest.length:Math.min(rest.length,cols()===8?6:cols()*2);
  const grid=()=>rest.slice(0,SHOWN()).map((g,i)=>pk(g,i+1)).join('');
  root.innerHTML=head+`<div class="pb-hero"><div class="pb-fan">${fanH}</div><div class="pb-open" role="img" aria-label="${esc(`The newest pack, ${D0.t}: ${D0.rs.length} rounds graded at that close`)}"><span class="pb-owr" aria-hidden="true"></span>${packLabel(D0,1)}</div>`+
   (D0.rs.length>fan.length?`<button class="vt-plate h4-pt pb-more" type="button" data-d="0" aria-expanded="false" aria-controls="pbT0"><b>All ${D0.rs.length} from this pack</b></button>`:'')+`<div class="pb-tray" id="pbT0" hidden></div></div>`+
   `<div class="pb-chase" role="group" aria-label="The Mag 7, the chase set">${plate(`Mag 7 · ${SL.filter(s=>s.r).length} of 7 pulled`,'vt-plt')}<div class="pb-cg">${chase}</div></div>`+
   `<div class="pb-packs" role="group" aria-label="Every earlier close, a pack each, newest first">${plate('A pack every close · newest first','vt-plt')}<div class="pb-grid">${grid()}</div>`+
   (rest.length>SHOWN()?`<button class="vt-plate h4-pt pb-all" type="button"><b>Show all ${rest.length} packs</b></button>`:'')+`</div>`;
  const trayH=g=>`<div class="pb-tin">${g.rs.map(r=>item(r)).join('')}</div>`;
  function shut(){root.querySelectorAll('.pb-grid .pb-tray').forEach(t=>t.remove());root.querySelectorAll('.pb-pk.pb-on').forEach(p=>{p.classList.remove('pb-on');p.querySelector('.pb-pb').setAttribute('aria-expanded','false')})}
  root.addEventListener('click',e=>{const m=e.target.closest&&e.target.closest('.pb-more');if(m){const t=root.querySelector('#pbT0'),o=t.hidden;t.hidden=!o;t.innerHTML=o?trayH(D0):'';m.setAttribute('aria-expanded',o);m.querySelector('b').textContent=o?'Fold the pack':`All ${D0.rs.length} from this pack`;if(o)fit(t);return}
    const a=e.target.closest&&e.target.closest('.pb-all');if(a){allP.v=!allP.v;root.querySelector('.pb-grid').innerHTML=grid();a.querySelector('b').textContent=allP.v?'Show fewer':`Show all ${rest.length} packs`;return}
    const b=e.target.closest&&e.target.closest('.pb-pb');if(!b)return;const pkE=b.parentNode,i=+pkE.dataset.d,was=pkE.classList.contains('pb-on');shut();if(was)return;
    pkE.classList.add('pb-on');b.setAttribute('aria-expanded','true');const sibs=[...root.querySelectorAll('.pb-grid .pb-pk')],top=pkE.offsetTop;let last=pkE;sibs.forEach(s=>{if(s.offsetTop===top)last=s});
    const t=D.createElement('div');t.className='pb-tray';t.id='pbT'+i;t.innerHTML=trayH(DAYS[i]);last.after(t);fit(t)});
}
/* =================================================================== C: the grading line */
if(T==='C'){
  const belt=NEWF.slice(1);let html='',prev=null;
  belt.forEach(r=>{const d=day(r),k=d?d.getTime():-1;if(k!==prev){prev=k;html+=`<span class="pc-day vt-plate" aria-hidden="true"><b>${d?esc(md(d)):'Undated'}</b></span>`}html+=item(r,isM7(r)?'pc-m7':'')});
  const jump=SL.map(s=>s.r?`<button class="vt-plate h4-pt pc-j" type="button" data-n="${s.r.n}" aria-label="${esc(`Find ${s.r.co} (${s.r.ticker}), grade ${lab(s.r.n).gr}, on the line`)}"><b>${esc(s.r.co)}</b><b class="pc-jg">${esc(lab(s.r.n).gr)}</b></button>`:
     `<span class="vt-plate h4-pt pc-j pc-jx" role="img" aria-label="${esc(`${m7name(s)}: not graded yet${s.t==='NVDA'?', Bet #1':''}`)}"><b>${esc(m7name(s))}</b><b class="pc-jg">${s.t==='NVDA'?'Bet #1':'Soon'}</b></span>`).join('');
  root.innerHTML=head+`<div class="pc-top"><div class="pc-press"><div class="pc-pm" aria-hidden="true"></div><div class="pc-on">${item(NEW,'pc-hero')}</div></div>`+
   `<div class="pc-m7s" role="group" aria-label="The Mag 7: find each on the line">${plate('Mag 7 on the line','vt-plt')}<div class="pc-jr">${jump}</div></div></div>`+
   `<div class="pc-line"><div class="pc-belt" tabindex="0" role="group" aria-label="${esc(`The line: every other graded round, newest first, ${belt.length} rounds`)}"><div class="pc-trk">${html}</div></div>`+
   `<div class="pc-nav">${plate('‹ Newer','pc-l','button')}${plate(`${G.length} graded · newest first`,'pc-c')}${plate('Older ›','pc-r','button')}</div></div>`;
  const B=()=>root.querySelector('.pc-belt');
  root.addEventListener('click',e=>{const j=e.target.closest&&e.target.closest('.pc-j[data-n]');if(j){const it=root.querySelector(`.pc-belt .vt-it[data-n="${j.dataset.n}"]`);if(!it)return;const b=B();
      b.scrollTo({left:it.offsetLeft-(b.clientWidth-it.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});root.querySelectorAll('.vt-lift').forEach(x=>x.classList.remove('vt-lift'));setTimeout(()=>{place(it);it.classList.add('vt-lift')},450);return}
    const n=e.target.closest&&e.target.closest('.pc-l,.pc-r');if(n){const b=B();b.scrollBy({left:(n.classList.contains('pc-r')?1:-1)*b.clientWidth*.8,behavior:'smooth'})}});
}
/* =================================================================== D: the tape */
if(T==='D'){
  let shown=12;const list=NEWF.slice(1);const d0=day(NEW);
  const entries=k=>{let h='',prev=d0?d0.getTime():-1,side=0;list.slice(0,k).forEach(r=>{const d=day(r),key=d?d.getTime():-1;if(key!==prev){prev=key;h+=`<li class="pd-day" aria-hidden="true"><span class="pd-ink">${d?esc(md(d)).toUpperCase():'UNDATED'}</span></li>`}
      const L=lab(r.n),m=isM7(r);side=1-side;h+=`<li class="pd-e${m?' pd-m7':''} pd-${side?'l':'r'}" data-n="${r.n}"><span class="pd-ink" aria-hidden="true"><b>R${r.n}</b><b class="pd-g">${esc(L.gr||'')}</b></span><div class="pd-hang">${m?plate('Mag 7','pd-mp'):''}${item(r)}</div></li>`});return h};
  root.innerHTML=head+`<div class="pd-mach"><div class="pd-tk" aria-hidden="true"></div></div><div class="pd-run"><div class="pd-tape" aria-hidden="true"></div>`+
   `<div class="pd-first"><span class="pd-ink pd-dl" aria-hidden="true">${d0?esc(md(d0)).toUpperCase():''}</span><span class="pd-ink pd-fi" aria-hidden="true"><b>R${NEW.n}</b><b class="pd-g">${esc(lab(NEW.n).gr)}</b></span>${item(NEW,'pd-hero')}</div>`+
   `<ol class="pd-list" aria-label="Every other graded round, newest first, as the tape printed it">${entries(shown)}</ol></div>`+
   `<div class="pd-foot">${plate(`Unspool all ${G.length}`,'pd-all','button')}</div>`;
  root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.pd-all');if(!a)return;shown=shown===12?list.length:12;root.querySelector('.pd-list').innerHTML=entries(shown);a.querySelector('b').textContent=shown===12?`Unspool all ${G.length}`:'Roll it back up';fit(root.querySelector('.pd-list'));after()});
  /* each slab hangs off its line; on one side a slab never touches the one above it (the tape line moves down instead) */
  after=()=>{const L=[...root.querySelectorAll('.pd-list>li')];L.forEach(li=>li.style.marginTop='');const fl=root.querySelector('.pd-first .vt-it'),lb={l:fl.getBoundingClientRect().bottom,r:fl.getBoundingClientRect().bottom};
    L.forEach(li=>{if(!li.classList.contains('pd-e'))return;const sd=li.classList.contains('pd-l')?'l':'r',h=li.querySelector('.pd-hang'),t=h.getBoundingClientRect().top,need=lb[sd]+12-t;
      if(need>0)li.style.marginTop=need+'px';lb[sd]=h.getBoundingClientRect().bottom});
    const last=L[L.length-1];if(last){const hb=Math.max(lb.l,lb.r),lbB=last.getBoundingClientRect().bottom;root.querySelector('.pd-list').style.paddingBottom=Math.max(10,hb-lbB+10)+'px'}};
}
/* =================================================================== E: the floor screen */
if(T==='E'){
  const film=r=>r.film?{v:'media/'+r.film+'.mp4',p:'media/'+(r.poster||r.film+'-poster')+'.jpg'}:null;
  const ch=SL.map((s,i)=>s.r?`<button class="pe-mon" type="button" data-n="${s.r.n}" aria-label="${esc(`Show round ${s.r.n}, ${s.r.co} (${s.r.ticker}), grade ${lab(s.r.n).gr}, on the big screen`)}"><span class="pe-mg"><img src="${tile(s.r)}" alt="" loading="lazy"></span><span class="pe-mf" aria-hidden="true"></span><span class="pe-ml" aria-hidden="true"><b>${esc(s.r.co)}</b><b class="pe-mn">${esc(lab(s.r.n).gr)}</b></span></button>`:
    `<span class="pe-mon pe-off" role="img" aria-label="${esc(`${m7name(s)}: not graded yet${s.t==='NVDA'?', Bet #1':''}`)}"><span class="pe-mg">${logoF(s.t)?`<img class="pe-lg${dark(s.t)?'':' pe-inv'}" src="${logoF(s.t)}" alt="">`:''}<em class="pe-ms">${s.t==='NVDA'?'Bet #1':'Soon'}</em></span><span class="pe-mf" aria-hidden="true"></span><span class="pe-ml" aria-hidden="true"><b>${esc(m7name(s))}</b><b class="pe-mn">?</b></span></span>`).join('');
  let shown=false;const floor=()=>{const k=shown?G.length:cols()*2;return NEWF.slice(0,k).map(r=>item(r,r===NEW?'pe-new':'')).join('')};
  const scr=r=>{const f=film(r),L=lab(r.n);return {media:f?`<video muted playsinline loop preload="metadata" poster="${f.p}"><source src="${f.v}" type="video/mp4"></video>`:`<img src="${tile(r)}" alt="">`,
    l1:`Round ${r.n} · ${esc(r.co)} (${esc(r.ticker)})`,l2:`Grade ${esc(L.gr||'')}${L.ds?' '+esc(L.ds):''} · ${esc(winT(r))}`,bg:f?f.p:tile(r),al:`On the big screen: round ${r.n}, ${r.co} (${r.ticker}), grade ${L.gr}, ${winT(r)}.`}};
  const s0=scr(NEW);
  root.innerHTML=head+`<div class="pe-scr" role="group" aria-label="${esc(s0.al)}"><div class="pe-gl"><span class="pe-bg" style="background-image:url(${s0.bg})"></span><span class="pe-md">${s0.media}</span><span class="pe-st" aria-hidden="true"></span></div><div class="pe-fr" aria-hidden="true"></div>`+
   `<a class="pe-np" href="#/round/${NEW.n}"><b class="pe-l1">${s0.l1}</b><span class="pe-l2">${s0.l2}</span></a><span class="pe-live" aria-hidden="true"><b>Newest</b></span></div>`+
   `<div class="pe-chs" role="group" aria-label="The Mag 7 channels">${plate('Mag 7 · tune the screen','vt-plt')}<div class="pe-cg">${ch}</div></div>`+
   `<div class="pe-floor" role="group" aria-label="Every graded round, newest first">${plate('Every round · newest first','vt-plt')}<div class="pe-fg">${floor()}</div>${plate(`Show all ${G.length}`,'pe-all','button')}</div>`;
  const tune=n=>{const r=G.find(x=>x.n===n);if(!r)return;const s=scr(r),gl=root.querySelector('.pe-gl'),wrap=root.querySelector('.pe-scr');
    gl.classList.remove('pe-sw');void gl.offsetWidth;gl.classList.add('pe-sw');
    setTimeout(()=>{gl.querySelector('.pe-md').innerHTML=s.media;gl.querySelector('.pe-bg').style.backgroundImage=`url(${s.bg})`;const np=root.querySelector('.pe-np');np.href='#/round/'+n;np.querySelector('.pe-l1').innerHTML=s.l1;np.querySelector('.pe-l2').innerHTML=s.l2;
      root.querySelector('.pe-live b').textContent=n===NEW.n?'Newest':'Mag 7';wrap.setAttribute('aria-label',s.al);play();fitNp()},180);
    root.querySelectorAll('.pe-mon').forEach(m=>m.classList.toggle('pe-onm',+m.dataset.n===n))};
  const play=()=>{const v=root.querySelector('.pe-md video');if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches)v.play().catch(()=>{})};
  root.addEventListener('click',e=>{const m=e.target.closest&&e.target.closest('.pe-mon[data-n]');if(m){tune(+m.dataset.n);return}
    const a=e.target.closest&&e.target.closest('.pe-all');if(a){shown=!shown;root.querySelector('.pe-fg').innerHTML=floor();a.querySelector('b').textContent=shown?'Show fewer':`Show all ${G.length}`;fit(root.querySelector('.pe-fg'))}});
  /* the nameplate: both lines fit the plate's face, never under 8px */
  const shrink=(e,box,mn)=>{e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(e.getBoundingClientRect().width>box-2&&f>mn&&g++<60){f-=.25;e.style.fontSize=f+'px'}return e.getBoundingClientRect().width<=box-2};
  const fitNp=()=>{const np=root.querySelector('.pe-np');if(!np)return;['.pe-l1','.pe-l2'].forEach(s=>shrink(np.querySelector(s),np.clientWidth,8))};
  /* the monitor plates: the name and grade step down together to 8px; if they still do not fit, the grade leaves the plate (it is in the tag and the big screen) */
  const fitMl=()=>root.querySelectorAll('.pe-ml').forEach(p=>{const bs=[...p.querySelectorAll('b')];p.classList.remove('pe-ng');bs.forEach(b=>b.style.fontSize='');const w=()=>bs.reduce((a,b)=>a+b.getBoundingClientRect().width,0)+3;
    let f=parseFloat(getComputedStyle(bs[0]).fontSize),g=0;while(w()>p.clientWidth-2&&f>8&&g++<60){f-=.25;bs.forEach((b,i)=>b.style.fontSize=(i?f*1.12:f)+'px')}if(w()>p.clientWidth-2)p.classList.add('pe-ng')});
  after=()=>{fitNp();fitMl();play()};
}
sec.classList.add('h40-sec');sec.appendChild(root);
/* ---- fitting the slab labels (the live rule: names by their ink, 2px clear of the grade, never under 8px) ---- */
const ink=el=>{const rs=[],tw=D.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const g=D.createRange();g.selectNodeContents(n);rs.push(...[...g.getClientRects()].filter(r=>r.width>0))}
  return rs.length?{l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right)),t:Math.min(...rs.map(r=>r.top)),b:Math.max(...rs.map(r=>r.bottom))}:null};
function fitOne(lb){const nmE=lb.querySelector('.vt-nm'),tk=lb.querySelector('.vt-tk'),rc=lb.querySelector('.vt-r');if(!nmE||!lb.offsetWidth)return;
  nmE.style.fontSize='';lb.classList.remove('vt-w2','vt-nt','vt-clip');
  const R=ink(rc),LR=lb.getBoundingClientRect(),lim=e=>Math.min(R?R.l-2:LR.right,LR.right-1,e.getBoundingClientRect().right+.5),over=e=>{const I=ink(e);return I?I.r-lim(e):0};
  const vfit=()=>{const I=ink(lb.querySelector('.vt-l'));return !I||(I.b<=LR.bottom+.5&&I.t>=LR.top-.5)};
  const f0=parseFloat(getComputedStyle(nmE).fontSize);let f=f0,g=0;
  while((over(nmE)>0||!vfit())&&f>8&&g++<60){f=Math.max(8,f-.25);nmE.style.fontSize=f+'px'}
  if(over(nmE)>0||!vfit()){lb.classList.add('vt-w2');f=f0;nmE.style.fontSize=f+'px';g=0;while((over(nmE)>0||!vfit())&&f>8&&g++<60){f=Math.max(8,f-.25);nmE.style.fontSize=f+'px'}if(over(nmE)>0||!vfit())lb.classList.add('vt-clip')}
  else if(tk&&tk.offsetWidth&&over(tk)>0)lb.classList.add('vt-nt')}
function fit(scope){root.classList.add('h4-flat');(scope||root).querySelectorAll('.vt-lb').forEach(fitOne);root.classList.remove('h4-flat')}
/* ---- the lift (live H34 rule) ---- */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.vt-it.vt-lift').forEach(l=>l.classList.remove('vt-lift'));
function place(it){const t=it.querySelector('.vt-tag');if(!t)return;t.style.left='';const r=it.getBoundingClientRect(),w=t.offsetWidth,vw=D.documentElement.clientWidth;
  let x=r.left+r.width/2-w/2;x=Math.max(8,Math.min(vw-8-w,x));t.style.left=(x-r.left)+'px';t.style.setProperty('--tx',Math.max(10,Math.min(w-10,r.left+r.width/2-x))+'px')}
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.vt-it>a.vt-sl');if(!a)return;const it=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!it.classList.contains('vt-lift')){e.preventDefault();e.stopPropagation();unlift();place(it);it.classList.add('vt-lift')}ptype=''},true);
root.addEventListener('pointerover',e=>{const it=e.target.closest&&e.target.closest('.vt-it');if(it&&e.pointerType==='mouse')place(it)});
root.addEventListener('focusin',e=>{const it=e.target.closest&&e.target.closest('.vt-it');if(it)place(it)});
D.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('.vt-it.vt-lift')))unlift()});
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;after();fit()});
after();fit();D.fonts&&D.fonts.ready.then(()=>{after();fit()});
window.__h40={T,NEW,DAYS,G,fit,place};
}
})();
