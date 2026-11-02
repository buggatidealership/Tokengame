/* H37 rounds (mockup): "Every round so far" redrawn as one display, five takes (window.__H37 = A..E).
   Mounts over the built v46-live-x2plus.html: hides the live #x2pMag and builds #h37 inside #record.
   Shared parts (one component per thing): the slab (media/mag-slab-h32.webp, the round's tile in its window, a live label),
   the lift-and-tag (first touch lifts and tags, a second opens #/round/n; hover lifts on desktop), the week groups (newest first).
   Data: window.__x2pMagApi (slots, REST: the page's own Mag 7 rule) and each round's grade from the page's own slab label (#car .card .zlab). */
(function(){var n0=0;(function go(){if(!(window.__x2pMagApi&&document.getElementById('x2pMag')&&document.querySelector('#car .card .zlab'))){if(++n0<600)setTimeout(go,50);return}
try{run()}catch(e){window.__h37Err=e;console.error(e)}})();
function run(){
const D=document,T=(window.__H37||'A').toUpperCase(),API=window.__x2pMagApi,P='tools/concepts/worlds/comic/story/h/h37rounds/img/';
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const pd=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2])):null};
const md=d=>MO[d.getUTCMonth()+1]+' '+d.getUTCDate();
const lab=n=>{const z=D.querySelector(`#car .card[data-n="${n}"] .zlab`);if(!z)return {};const q=s=>(z.querySelector(s)||{}).textContent||'';return {ds:q('.zr .ds'),gr:q('.zr .gr')}};
const MDL=window.MODELS||{},nm=m=>m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const winT=r=>{const W=wins(r);return W.length?W.map(nm).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'};
const tile=r=>`media/tile-r${r.n}-${(window.FILMS||{})[r.n]?'f1':'t2'}.jpg`;
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const isD=()=>matchMedia('(min-width:1000px)').matches;
/* ---- the slab: one component everywhere (size by its container; the label has a full and a compact layout, chosen by width) ---- */
function slab(r){const L=lab(r.n),f=(window.FILMS||{})[r.n];
  return `<a class="h7-sl${L.gr==='10'?' h7-10':''}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.gr||''}, ${L.ds||''}. ${winT(r)}. Open the slab.`)}">`+
   `<span class="h7-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="h7-pl" aria-hidden="true"></i>':''}</span><span class="h7-fr" aria-hidden="true"></span>`+
   `<span class="h7-lb" aria-hidden="true"><span class="h7-l"><span class="h7-nm">${esc(r.co)}</span><span class="h7-tk">${esc(r.ticker)}</span></span><span class="h7-r"><span class="h7-ds">${esc(L.ds||'')}</span><span class="h7-gr">${esc(L.gr||'')}</span></span></span></a>`}
function emptySlab(u,bet){const lg=logoF(u.ticker);
  return `<span class="h7-sl h7-mt" role="img" aria-label="${esc(`Empty slot: ${u.co} (${u.ticker})${bet?', Bet #1':', to come'}`)}"><span class="h7-wn">${lg?`<img class="h7-ml${dark(u.ticker)?'':' h7-inv'}" src="${lg}" alt="" loading="lazy">`:''}<em class="h7-when">${bet?'Bet #1':'To come'}</em></span><span class="h7-fr" aria-hidden="true"></span>`+
   `<span class="h7-lb" aria-hidden="true"><span class="h7-l"><span class="h7-nm">${esc(u.co==='AAPL'?'Apple':u.co)}</span><span class="h7-tk">${esc(u.ticker)}</span></span><span class="h7-r"><span class="h7-ds">${bet?'Bet #1':'Soon'}</span><span class="h7-gr">?</span></span></span></span>`}
function tag(r){const L=lab(r.n);
  return `<span class="h7-tag" aria-hidden="true"><b>${esc(r.co)} <small>(${esc(r.ticker)})</small></b><span class="h7-tg">Grade ${esc(L.gr||'')}${L.ds?' · '+esc(L.ds):''}</span><span class="h7-tw${wins(r).length?'':' h7-no'}">${esc(winT(r))}</span></span>`}
const item=(r,cls)=>`<div class="h7-it ${cls||''}" data-n="${r.n}">${slab(r)}${tag(r)}</div>`;
/* ---- data ---- */
const SL=API.slots.map(s=>s.r?{r:s.r,t:s.t}:{u:s.u,t:s.t,bet:s.t==='NVDA'});
const G7=SL.filter(s=>s.r).map(s=>s.r),HERO=G7.slice().sort((a,b)=>b.n-a.n)[0];
const REST=API.REST.slice();/* newest first */
/* weeks (Mon to Fri) by grading day, newest first */
const wk=r=>{const d=pd(r.resolves)||pd(r.called);if(!d)return 'x';const m=new Date(d);m.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return m.getTime()};
const WEEKS=[];REST.forEach(r=>{const k=wk(r);let w=WEEKS.find(x=>x.k===k);if(!w){w={k,rs:[]};WEEKS.push(w)}w.rs.push(r)});
WEEKS.forEach(w=>{const a=new Date(w.k),b=new Date(w.k+4*864e5);w.t=a.getUTCMonth()===b.getUTCMonth()?`${md(a)}–${b.getUTCDate()}`:`${md(a)} – ${md(b)}`});
const gnum=r=>parseFloat(lab(r.n).gr)||0;
const graded=window.ROUNDS.filter(r=>r.a!=null&&r.out).length;
/* ---- the head (today's words and caption box, kept) ---- */
const head=`<header class="h7-hd"><h2 class="t4-h2 h7-h2"><span class="t4-hw">Every round so far</span></h2><p class="m7-cap h7-cap"><span class="m7-c1">Each round gets a grade from 1 to 10.</span> <span class="m7-c1">A 10 means all four AIs got it right, and close.</span></p></header>`;
const sec=D.getElementById('record'),old=D.getElementById('x2pMag');old.style.display='none';
const root=D.createElement('div');root.id='h37';root.className='h7 h7-'+T;sec.appendChild(root);
let open=new Set([0]),page=0,shown=0;
const LIM=()=>isD()?24:matchMedia('(min-width:600px)').matches?20:12;
/* the newest N (or all), grouped by week; a group's first slab may be its anchor (A) */
const groups=(n,anchor)=>{const set=new Set(REST.slice(0,n).map(r=>r.n));return WEEKS.map(w=>{let rs=w.rs.filter(r=>set.has(r.n));if(!rs.length)return null;let best=null;
  if(anchor){best=w.rs.slice().sort((a,b)=>gnum(b)-gnum(a)||b.n-a.n)[0];rs=[best,...w.rs.filter(r=>r!==best)].filter(r=>set.has(r.n)||r===best);}return {w,rs,best}}).filter(Boolean)};
const moreBtn=(t)=>{const k=shown||LIM();return k<REST.length?`<button class="h7-more" type="button" data-more="1"><span>${t} ${REST.length}</span><i>newest ${Math.min(k,REST.length)} shown</i></button>`:''};
/* ---------------- the five takes ---------------- */
const TK={
/* A. Gallery of Honour: the Mag 7 hung in a single line, each under its own picture light with a tombstone in wall lettering (Rijksmuseum's corridor
   to one focal point; museums' single-line hang); the rest a salon hang on the same wall, ambient light only, each week's best grade hung large. */
A(){const line=SL.map(s=>{if(s.r){const L=lab(s.r.n);return `<li class="h7-hon"><i class="h7-lamp" aria-hidden="true"></i><i class="h7-pool" aria-hidden="true"></i>${item(s.r,'h7-big')}<p class="h7-tomb"><b>${esc(s.r.co)}</b> <span>(${esc(s.r.ticker)})</span><br><span class="h7-tl">Round ${s.r.n} · ${esc(s.r.out)}</span><br><span class="h7-tl">Grade <em>${esc(L.gr)}</em> · ${esc(winT(s.r))}</span></p></li>`}
     return `<li class="h7-hon h7-hmt"><i class="h7-lamp h7-off" aria-hidden="true"></i>${emptySlab(s.u,s.bet)}<p class="h7-tomb"><b>${esc(s.u.co==='AAPL'?'Apple':s.u.co)}</b> <span>(${esc(s.u.ticker)})</span><br><span class="h7-tl">${s.bet?'Bet #1 · the hook is ready':'Its hook is ready'}</span></p></li>`}).join('');
  const gs=groups(shown||LIM(),true);
  const salon=gs.map(g=>`<section class="h7-wk"><h3 class="h7-wl">Week of ${g.w.t} <span>· ${g.w.rs.length} rounds</span></h3><div class="h7-salon">${g.rs.map(r=>item(r,r===g.best?'h7-x2':'')).join('')}</div></section>`).join('');
  return `<div class="h7-wall">${head}<p class="h7-wt"><span>The Mag 7</span> <i>oldest to newest<span class="h7-sw"> · swipe along the wall</span></i></p><ol class="h7-line">${line}</ol>
   <p class="h7-wt h7-wt2"><span>The collection</span> <i>${REST.length} rounds · newest first · each week hangs around its best grade</i></p>${salon}
   ${moreBtn('Show all')}</div>`},
/* B. The vitrine and its drawers: the newest Mag 7 alone in the tall bay (one piece per vitrine, lit 10:1), the other Mag 7 one per small bay;
   under the case a jeweller's cabinet, a drawer per week with its brass card holder; the newest drawer pulled open, its slabs on black velvet. */
B(){const bay=(x,cls)=>`<div class="h7-bay ${cls||''}"><i class="h7-bayp" aria-hidden="true"></i><div class="h7-bin">${x}</div></div>`;
  const others=SL.filter(s=>!(s.r&&s.r===HERO));
  const top=`<div class="h7-case">${bay(item(HERO,'h7-big'),'h7-hero')}<div class="h7-bays">${others.map(s=>bay(s.r?item(s.r):emptySlab(s.u,s.bet),s.r?'':'h7-bmt')).join('')}</div><span class="h7-plate"><b>Mag 7</b></span></div>`;
  const dr=WEEKS.map((w,i)=>{const o=open.has(i);return `<div class="h7-dw${o?' h7-open':''}"><button class="h7-df" type="button" data-dw="${i}" aria-expanded="${o}">${i===0?'<span class="h7-new">Newest</span>':''}<span class="h7-card"><b>${w.t}</b></span><span class="h7-cnt">${w.rs.length}<i>rounds</i></span></button>${o?`<div class="h7-tray"><div class="h7-tin">${w.rs.map(r=>item(r)).join('')}</div></div>`:''}</div>`}).join('');
  return `${head}${top}<p class="h7-sub">Every other round <i>· a drawer a week, newest on top</i></p><div class="h7-cab">${dr}</div>`},
/* C. The registry: the Mag 7 as a set in a collector's album (PSA's Set Registry, its Digital Card Album built to look like a binder): five of seven
   pockets filled, two waiting; every other round on the album's pages, nine to a page, newest first, a spread of two on desktop. */
C(){const fill=G7.length;const pips=SL.map(s=>`<i class="${s.r?'on':''}"></i>`).join('');
  const set=`<div class="h7-alb h7-set"><div class="h7-ain"><p class="h7-reg"><b>Mag 7 set</b><span class="h7-pips" aria-label="${fill} of 7 graded">${pips}</span><i>${fill} of 7</i></p><div class="h7-pk7">${SL.map(s=>`<div class="h7-pk">${s.r?item(s.r):emptySlab(s.u,s.bet)}</div>`).join('')}</div></div></div>`;
  const per=9,pages=Math.ceil(REST.length/per),spread=isD()?2:1;page=Math.min(page,Math.ceil(pages/spread)-1);
  const pg=i=>{const rs=REST.slice(i*per,i*per+per);if(!rs.length)return '';const a=rs[rs.length-1],z=rs[0];
    return `<div class="h7-alb h7-pg"><div class="h7-ain"><p class="h7-pgh"><b>Page ${i+1}</b><i>Rounds ${a.n}–${z.n}</i></p><div class="h7-pk9">${rs.map(r=>`<div class="h7-pk">${item(r)}</div>`).join('')}</div></div></div>`};
  const ps=[];for(let i=0;i<spread;i++)ps.push(pg(page*spread+i));
  const nav=`<div class="h7-pnav"><button type="button" data-pg="-1" ${page?'':'disabled'} aria-label="Newer page">‹</button><span>${(page*spread)+1}${spread>1?'–'+Math.min(pages,page*spread+2):''} of ${pages}</span><button type="button" data-pg="1" ${(page+1)*spread<pages?'':'disabled'} aria-label="Older page">›</button></div>`;
  return `${head}${set}<p class="h7-sub">Every other round <i>· nine to a page, newest first</i></p><div class="h7-spread">${ps.join('')}</div>${nav}`},
/* D. The card show: the Mag 7 stand upright on brass easels on top of the counter, each under its own spot; every other round lies flat
   under the glass, laid by hand in rows, a brass strip and the week engraved between weeks (how dealers show hundreds of slabs). */
D(){const top=`<div class="h7-top"><span class="h7-dplt">Mag 7 · on the stands</span>${SL.map(s=>`<div class="h7-es">${s.r?item(s.r):emptySlab(s.u,s.bet)}<i class="h7-easel" aria-hidden="true"></i></div>`).join('')}</div>`;
  const glass=WEEKS.map(w=>`<div class="h7-strip"><b>${w.t}</b><i>${w.rs.length} rounds${isD()?'':' · swipe'}</i></div><div class="h7-flat"><div class="h7-row">${w.rs.map(r=>{const a=((r.n*37)%7-3)*.5;return item(r).replace('class="h7-it ','style="--rot:'+a.toFixed(2)+'deg" class="h7-it ')}).join('')}</div></div>`).join('');
  return `${head}<div class="h7-counter">${top}<p class="h7-sub h7-gl">Under the glass <i>· every other round, a row a week, newest left</i></p><div class="h7-glass">${glass}<i class="h7-sheen" aria-hidden="true"></i></div></div>`},
/* E. The storehouse: one rack holds everything (V&A East Storehouse: the collection on open racks, visible); the top shelf is the Mag 7,
   lit; each shelf below is a week, its brass lip engraved, every slab standing whole. */
E(){const C=isD()?8:3;const shelf=(rs,tagt,cls)=>{const rows=[];for(let i=0;i<rs.length;i+=C)rows.push(rs.slice(i,i+C));
    return rows.map((row,i)=>`<div class="h7-sh ${cls||''}"><div class="h7-on">${row.join('')}</div><i class="h7-lip" aria-hidden="true"></i>${i===0&&tagt?`<span class="h7-stag">${tagt}</span>`:''}</div>`).join('')};
  const m7=SL.map(s=>s.r?item(s.r):emptySlab(s.u,s.bet));
  const C7=isD()?7:4,rows7=[m7.slice(0,C7),m7.slice(C7)].filter(x=>x.length);
  const top=rows7.map((row,i)=>`<div class="h7-sh h7-m7"><div class="h7-on">${row.join('')}</div><i class="h7-lip" aria-hidden="true"></i>${i===0?'<span class="h7-stag h7-g"><b>Mag 7</b></span>':''}</div>`).join('');
  const gs=groups(shown||LIM(),false);
  const rest=gs.map(g=>shelf(g.rs.map(r=>item(r)),`<b>${g.w.t}</b> · ${g.w.rs.length} rounds`)).join('');
  return `${head}<div class="h7-rack">${top}<p class="h7-sub">Every other round <i>· a shelf a week, newest first</i></p>${rest}</div>${moreBtn('Show all')}`}
};
function render(){root.innerHTML=TK[T]();fit();
  root.querySelectorAll('[data-more]').forEach(b=>b.onclick=()=>{shown=WEEKS.length;render()});
  root.querySelectorAll('[data-dw]').forEach(b=>b.onclick=()=>{const i=+b.dataset.dw;open.has(i)?open.delete(i):open.add(i);render()});
  root.querySelectorAll('[data-pg]').forEach(b=>b.onclick=()=>{page+=+b.dataset.pg;render()})}
/* names fit their label on one line: step down, never below 6px */
function fit(){root.querySelectorAll('.h7-nm').forEach(e=>{e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(e.scrollWidth>e.clientWidth+.5&&f>6&&g++<40){f-=.5;e.style.fontSize=f+'px'}})}
/* the lift: touch = first tap lifts and tags, second opens; mouse = hover lifts, click opens; the tag kept inside the screen */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.h7-it.h7-lift').forEach(l=>l.classList.remove('h7-lift'));
function place(it){const t=it.querySelector('.h7-tag');if(!t)return;t.style.left='';t.style.right='';const r=it.getBoundingClientRect(),w=t.offsetWidth,vw=D.documentElement.clientWidth;
  let x=r.left+r.width/2-w/2;x=Math.max(8,Math.min(vw-8-w,x));t.style.left=(x-r.left)+'px';t.style.setProperty('--tx',(r.left+r.width/2-x)+'px')}
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.h7-it>a.h7-sl');if(!a)return;const it=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!it.classList.contains('h7-lift')){e.preventDefault();e.stopPropagation();unlift();place(it);it.classList.add('h7-lift')}ptype=''},true);
root.addEventListener('pointerover',e=>{const it=e.target.closest&&e.target.closest('.h7-it');if(it&&e.pointerType==='mouse')place(it)});
root.addEventListener('focusin',e=>{const it=e.target.closest&&e.target.closest('.h7-it');if(it)place(it)});
D.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('.h7-it.h7-lift')))unlift()});
addEventListener('scroll',()=>{const l=root.querySelector('.h7-lift');if(l){const r=l.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)unlift()}},{passive:true});
render();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;render()}});D.fonts&&D.fonts.ready.then(fit);
window.__h37={render,T,WEEKS,REST,SL,graded};
}})();
