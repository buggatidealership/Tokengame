/* S3 · Tale of the tape: the four AIs stand side by side like a fight poster (left = first in the window's order), every
   stat is one row across them, printed once. The P&L row is a skyline from the $0 line (a flat $100K on every call): up is profit, down is
   loss, the height is the money. In each other row the best figure is circled in gold ink, so "who wins this stat" reads
   at a glance; a window with too few calls leaves the hit rate blank instead of circling a fluke. Switching the window
   sends the fighters to their new corners (they slide sideways) and the skyline regrows. */
(function(){const S=window.SS,D=document;
const ROWS=[['pl','P&L'],['wl','W-L'],['hr','Hit rate'],['l5','Last 5'],['tp','Top round'],['wr','Worst round']];
window.SST={id:'s3',build(h){
  const lab=ROWS.map(([k,t])=>k==='pl'?`<span class="ss3-lab ss3-r-pl"><b data-lab>${t}</b><small class="ss3-st0"><i class="ss3-dash"></i> <span data-st0>$0</span></small></span>`:`<span class="ss3-lab ss3-r-${k}">${t}</span>`).join('');
  const cells=S.ORDER.map(m=>`<div class="ss3-c ss3-r-hd" data-m="${m}"><span class="ss3-stub"><b data-rk></b><i data-sub></i></span>
      <span class="ss3-pic">${S.flag(m,'ss3-flg')}${S.face(m,'ss3-face')}</span><b class="ss3-nm">${S.NM[m]}</b><small class="ss3-ver">${S.esc(MODELS[m].ver)}</small></div>
    <div class="ss3-c ss3-r-pl" data-m="${m}"><span class="ss3-sky"><i class="ss3-col"></i><b class="ss3-v" data-pl></b></span></div>
    <div class="ss3-c ss3-r-wl" data-m="${m}"><b class="ss3-big"><span data-w class="ss-u"></span>-<span data-l class="ss-d"></span></b></div>
    <div class="ss3-c ss3-r-hr" data-m="${m}"><b class="ss3-big" data-hr></b></div>
    <div class="ss3-c ss3-r-l5" data-m="${m}"><span class="ss-f5" data-f5></span></div>
    <div class="ss3-c ss3-r-tp" data-m="${m}"><span class="ss3-tw" data-tp></span></div>
    <div class="ss3-c ss3-r-wr" data-m="${m}"><span class="ss3-tw" data-wr></span></div>`).join('');
  h.innerHTML=`<div class="ss3-tk"><div class="ss3-band"><div class="ss3-ti"><b>Season 1 · Tale of the tape</b><span>Left to right by <em data-lab>Season P&amp;L</em></span></div>${S.sw('ss3-sw')}</div>
    <div class="ss3-g" aria-hidden="true"><span class="ss3-lab ss3-r-hd ss3-lab0"><span class="ss3-key"><i class="ss3-ring"></i> Best in the row</span></span>${lab}<i class="ss3-base"></i>${cells}</div>
    <ol class="ss-sr" data-sr></ol><p class="ss3-ft"><span data-ft></span><span class="ss3-key"><i class="ss3-ring"></i> best in the row</span></p></div>`},
 draw(x,prev,anim){const h=D.querySelector('.ss-host.ss-s3'),g=h.querySelector('.ss3-g'),cs=[...g.querySelectorAll('.ss3-c')];
  h.querySelectorAll('[data-lab]').forEach(e=>e.textContent=x.w.lab);h.dataset.k=x.w.k;h.querySelectorAll('[data-st0]').forEach(e=>e.textContent='$0');
  const lo=Math.min(0,...S.ORDER.map(m=>x.row[m].amt)),hi=Math.max(0,...S.ORDER.map(m=>x.row[m].amt)),span=(hi-lo)||1;
  g.style.setProperty('--zb',(-lo/span).toFixed(4));/* the start line's height from the row's foot, as a share */
  S.flip(cs,()=>x.o.forEach((m,i)=>g.querySelectorAll(`.ss3-c[data-m="${m}"]`).forEach(c=>{c.style.setProperty('--c',i);c.classList.toggle('ss3-c0',i===0)})),anim);
  const best=(f,hiwin)=>{const v=S.ORDER.map(m=>f(x.row[m])).filter(v=>v!=null);if(v.length<2)return null;return hiwin?Math.max(...v):Math.min(...v)};
  const bHr=best(a=>S.hrv(a),true),bL5=best(a=>a.l5.filter(Boolean).length,true),few=x.rs.length<3,bTp=few?null:best(a=>a.top?a.top.v:null,true),bWr=few?null:best(a=>a.low?a.low.v:null,true);
  x.o.forEach((m,i)=>{const a=x.row[m],pa=prev?prev.row[m]:null,q=k=>g.querySelector(`.ss3-r-${k}[data-m="${m}"]`);
    const hd=q('hd');hd.querySelector('[data-rk]').textContent='#'+(i+1);hd.querySelector('[data-sub]').textContent=m===S.gold?'Golden ticket':'Season 1';
    hd.classList.toggle('ss3-gold',m===S.gold);hd.classList.toggle('ss3-one',i===0);
    const pl=q('pl');pl.classList.toggle('ss3-neg',a.amt<0);pl.style.setProperty('--h',(Math.abs(a.amt)/span).toFixed(4));
    const v=pl.querySelector('[data-pl]');v.className='ss3-v '+(a.amt>=0?'ss-u':'ss-d');S.count(v,pa?pa.amt:a.amt,a.amt,anim?700:0,S.k$);
    q('wl').querySelector('[data-w]').textContent=a.W;q('wl').querySelector('[data-l]').textContent=a.L;
    const hv=S.hrv(a),he=q('hr');he.querySelector('[data-hr]').textContent=S.hr(a);he.classList.toggle('ss3-best',hv!=null&&hv===bHr);
    q('l5').querySelector('[data-f5]').innerHTML=S.f5(a);q('l5').classList.toggle('ss3-best',a.l5.filter(Boolean).length===bL5);
    const tw=t=>t?`${S.logo(t.r)}<b class="${t.v>=0?'ss-u':'ss-d'}">${S.k$(t.v)}</b>`:'<b class="ss3-na">–</b>';
    q('tp').querySelector('[data-tp]').innerHTML=tw(a.top);q('tp').classList.toggle('ss3-best',!!a.top&&a.top.v===bTp);
    q('wr').querySelector('[data-wr]').innerHTML=tw(a.low);q('wr').classList.toggle('ss3-best',!!a.low&&a.low.v===bWr)});
  h.querySelector('[data-sr]').innerHTML=x.o.map((m,i)=>{const a=x.row[m];return `<li>#${i+1} ${S.NM[m]}: ${x.w.lab} ${S.$f(a.amt)}; W-L ${a.W}-${a.L}; hit rate ${S.hr(a)}${a.top?'; top round '+S.esc(a.top.r.co)+' '+S.k$(a.top.v):''}${a.low?'; worst round '+S.esc(a.low.r.co)+' '+S.k$(a.low.v):''}.</li>`}).join('');
  if(anim&&!S.RM())g.querySelectorAll('.ss3-col').forEach(c=>c.animate([{transform:'scaleY(0)'},{transform:'scaleY(1)'}],{duration:620,delay:160,easing:'cubic-bezier(.3,1.3,.5,1)',fill:'backwards'}));
  h.querySelector('[data-ft]').textContent=x.empty?`No close in the ${x.w.t.toLowerCase()}.`:`${x.w.t} · ${x.w.when} · ${x.rs.length} round${x.rs.length===1?'':'s'} graded.`}};
SSmount()})();
