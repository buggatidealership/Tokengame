/* H31 · stand: "Every round so far" as PSA graded slabs (mockup over the built v46-live-x2plus.html; never shipped as is).
   window.__ST = 'A' | 'B' | 'C'
   A the stand: painted slabs on a painted brass ledge before velvet (two tiers on phones, one row of seven on desktop); the rest a grid of slabs.
   B built: the record's own CSS slab on a built acrylic riser; the rest on brass shelves, four to a shelf.
   C the case: the Mag 7 in a painted showcase; the rest standing in a slab box, labels up, flipped through.
   Data: ROUNDS / UPCOMING / FILMS / CO_LOGOS from ez-data.js; each grade read from the page's own slab label (#car .card .zlab). */
(function(){var n=0;(function go(){if(!(window.ROUNDS&&window.UPCOMING&&document.querySelector('.t4-b2')&&document.querySelector('#car .card .zlab'))){if(++n<600)setTimeout(go,50);return}
try{run()}catch(e){window.__stErr=e;console.error(e)}})();
function run(){
const TK=window.__ST||'A',BASE=window.__STBASE||'tools/concepts/worlds/comic/story/h/stand/img/';
const M7=['MSFT','GOOGL','GOOG','AMZN','META','NVDA','TSLA','AAPL'],CO_KEY=t=>t==='GOOG'?'GOOGL':t;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?MO[+m[1]]+' '+(+m[2]):''};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const tile=r=>`media/tile-r${r.n}-${(window.FILMS||{})[r.n]?'f1':'t2'}.jpg`;
/* the page's own label for each graded round */
const lab=r=>{const z=document.querySelector(`#car .card[data-n="${r.n}"] .zlab`);if(!z)return null;const q=s=>(z.querySelector(s)||{}).textContent||'';
  return {ds:q('.zr .ds'),gr:q('.zr .gr'),no:q('.zr .no'),cert:(q('.zb').match(/\d{6,}/)||[''])[0],ten:q('.zr .gr')==='10'}};
const MDL=window.MODELS||{},nm=m=>(MDL[m]&&MDL[m].name)||m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const aria=r=>{const L=lab(r)||{},W=wins(r);return `Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.ds} ${L.gr}. ${W.length?'Winner '+W.map(nm).join(' and '):'Nobody won'}. Open the slab.`};
const G=ROUNDS.slice().sort((a,b)=>a.n-b.n);
/* the stand: one slot per Mag 7 company, its latest graded round; a company not graded yet holds its next round from UPCOMING */
const slots=[];['META','TSLA','GOOGL','MSFT','AMZN','AAPL','NVDA'].forEach(t=>{const g=G.filter(r=>CO_KEY(r.ticker)===t).pop();
  if(g){slots.push({r:g,t});return}const u=(window.UPCOMING||[]).filter(r=>CO_KEY(r.ticker)===t).sort((a,b)=>a.n-b.n)[0];slots.push({u:u||{ticker:t,co:t},t})});
slots.sort((a,b)=>((a.r||a.u).n||1e9)-((b.r||b.u).n||1e9));
const graded=slots.filter(s=>s.r).length,onStand=new Set(slots.filter(s=>s.r).map(s=>s.r.n));
const REST=G.filter(r=>!onStand.has(r.n)).reverse();/* newest first */
const BET=(()=>{const u=(window.UPCOMING||[]).filter(r=>r.ticker==='NVDA').sort((a,b)=>a.n-b.n)[0];return u&&u.n})();
/* one slab: window (the round's outcome frame) under the frame, the label on the frame's blank label */
function label(r,L,sz){return `<span class="st-lab${L.ten?' st-ten':''}"><span class="st-l"><span class="st-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span><span class="st-nm"><b>${esc(r.co)}</b> <small>(${esc(r.ticker)})</small></span><span class="st-zb"><i></i><span class="st-ct">${esc(L.cert)}</span><span class="st-ho"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></span><span class="st-r"><span class="st-no">${esc(L.no)}</span><span class="st-ds">${esc(L.ds)}</span><span class="st-gr">${esc(L.gr)}</span></span></span>`}
function slab(r,cls){const L=lab(r)||{ds:'',gr:'',no:'#'+r.n,cert:''};const f=(window.FILMS||{})[r.n];
  return `<a class="st-sl ${cls||''}" href="#/round/${r.n}" aria-label="${esc(aria(r))}" data-n="${r.n}"><span class="st-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="st-pl" aria-hidden="true"></i>':''}</span><span class="st-fr" aria-hidden="true"></span>${label(r,L)}</a>`}
function empty(s){const u=s.u,bet=u.n&&u.n===BET,lg=logoF(u.ticker);const when=bet?'Bet #1':(u.resolves?'Graded '+md(u.resolves):u.called?'Calls '+md(u.called):'To come');
  return `<div class="st-sl st-mt${bet?' st-bet':''}" role="img" aria-label="Empty slot: ${esc(u.co)} (${esc(u.ticker)}), round ${u.n||''}, ${bet?'Bet #1, ':''}${u.resolves?'graded at the close on '+md(u.resolves):'calls due '+md(u.called)}"><span class="st-wn">${lg?`<img class="st-ml${dark(u.ticker)?'':' st-inv'}" src="${lg}" alt="" loading="lazy">`:''}<em class="st-when">${esc(when)}</em></span><span class="st-fr" aria-hidden="true"></span><span class="st-lab st-lab0"><span class="st-l"><span class="st-y">Next on the stand</span><span class="st-nm"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small></span></span><span class="st-r"><span class="st-no">${u.n?'#'+u.n:''}</span><span class="st-ds">${bet?'Bet #1':'Soon'}</span><span class="st-gr">?</span></span></span></div>`}
const standItems=slots.map(s=>s.r?slab(s.r,'st-big'):empty(s));
const isD=()=>matchMedia('(min-width:1000px)').matches;
const head=`<header class="st-hd"><h2 class="t4-h2 st-h2"><span class="t4-hw">Every round so far</span></h2><p class="st-cap"><span class="st-c1">Every round is graded like a collector's card.</span> <span class="st-c1">10: all four AIs right, and close.</span></p></header>`;
const plate=`<span class="st-plt"><b>The Mag 7</b><i>${graded} of 7 graded</i></span>`;
const PAGE=()=>TK==='B'?(isD()?16:12):TK==='C'?(isD()?14:10):(isD()?16:9);
let shown=0;
function restHTML(){const k=Math.min(REST.length,shown||PAGE());const it=REST.slice(0,k);let h='';
  if(TK==='A')h=`<ol class="st-grid">${it.map(r=>`<li>${slab(r)}</li>`).join('')}</ol>`;
  if(TK==='B'){const per=isD()?8:4;for(let i=0;i<it.length;i+=per)h+=`<ol class="st-shelf">${it.slice(i,i+per).map(r=>`<li>${slab(r)}</li>`).join('')}</ol>`}
  if(TK==='C'){const C=isD()?7:2,R=Math.ceil(it.length/C);/* the newest stand at the front (bottom row, whole); older ones behind, only their labels showing */
    h=`<div class="st-box"><ol class="st-flip" style="grid-template-rows:${R>1?`repeat(${R-1},var(--peek)) `:''}auto">${it.map((r,j)=>{const row=R-1-Math.floor(j/C);return `<li style="grid-row:${row+1};grid-column:${j%C+1};z-index:${row+1}"${row===R-1?' class="st-front"':''}>${slab(r,'st-fl')}</li>`}).join('')}</ol><span class="st-boxf" aria-hidden="true"></span></div>`}
  const more=k<REST.length?`<button class="st-more" type="button"><span>Show all ${REST.length}</span><i>${k} of ${REST.length}</i></button>`:(REST.length>PAGE()?`<button class="st-more st-less" type="button"><span>Show fewer</span></button>`:'');
  return `<p class="st-sub"><b>Every other round</b> · newest first</p>${h}${more}`}
function standHTML(){if(TK==='C'){return `<div class="st-case"><div class="st-cin">${standItems.map(x=>`<div class="st-slot">${x}</div>`).join('')}</div>${plate}</div>`}
  const d=isD(),rows=d?[standItems]:[standItems.slice(0,4),standItems.slice(4)];
  return `<div class="st-stand">${rows.map((row,i)=>`<div class="st-tier st-t${i}"><div class="st-row">${row.map(x=>`<div class="st-slot">${x}</div>`).join('')}</div><span class="st-ledge" aria-hidden="true"></span>${i===rows.length-1?plate:''}</div>`).join('')}</div>`}
const root=document.createElement('div');root.className='st st-'+TK;root.id='stRoot';
function render(){root.innerHTML=head+`<div class="st-b1">${standHTML()}</div><div class="st-b2">${restHTML()}</div>`;
  const b=root.querySelector('.st-more');if(b)b.addEventListener('click',()=>{shown=b.classList.contains('st-less')?0:REST.length;render();if(!shown)root.querySelector('.st-b2').scrollIntoView({block:'start'})});
  fit()}
/* the label's company name steps down until it fits (the page's own nmFit idea) */
function fit(){root.querySelectorAll('.st-nm').forEach(e=>{e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(e.scrollWidth>e.clientWidth+.5&&f>5.5&&g++<40){f-=.5;e.style.fontSize=f+'px'}})}
const b2=document.querySelector('.t4-b2'),b3=document.querySelector('.t4-b3');const mt=b3?getComputedStyle(b3).marginTop:'';b2.after(root);
/* the film's own fitter measures its gap from How a round works; keep the gap it had (mockup only) */
if(b3){const st=document.createElement('style');st.id='stFix';st.textContent=`html.st-on .t4-b3{margin-top:${mt}!important}`;document.head.appendChild(st)}
const rec=document.getElementById('record');if(rec)rec.classList.add('st-gone');
document.documentElement.classList.add('st-on');render();
/* the top's own fitter rebuilds its blocks on a resize; put the section back after How a round works whenever that happens */
new MutationObserver(()=>{if(root.isConnected)return;const b=document.querySelector('.t4-b2');if(b)b.after(root)}).observe(document.querySelector('main')||document.body,{childList:true,subtree:true});
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;render()});
document.fonts&&document.fonts.ready.then(fit);
window.__st={render,slots,REST,graded};
}
})();
