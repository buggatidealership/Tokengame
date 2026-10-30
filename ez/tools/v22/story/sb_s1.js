/* S1 · The ledger: one wide Season 1 ticket, one printed row per AI, every stat in its own column, the heads printed once.
   Story: four accounts on one ticket; read down a column to compare. Carriers: the stub's rank (gold foil = golden ticket),
   the flag behind each face, a P&L bar on one shared $0 line, a hit-rate gauge with the coin flip marked at 50%. */
(function(){const S=window.SS,D=document;
const cell=(c,txt,cls)=>`<span class="ss1-c ss1-${c} ${cls||''}" role="cell">${txt}</span>`;
window.SST={id:'s1',build(h){
  h.innerHTML=`<div class="ss1-tk"><i class="ss1-nt" aria-hidden="true"></i><i class="ss1-nb" aria-hidden="true"></i>
    <div class="ss1-band"><div class="ss1-ti"><b>Season 1</b><span class="ss1-by">Ranked by <em data-lab>Season P&amp;L</em></span></div>${S.sw('ss1-sw')}</div>
    <div class="ss1-tab" role="table" aria-label="The scoreboard">
      <div class="ss1-r ss1-hd" role="row"><span class="ss1-c ss1-st" role="columnheader"><span class="ss-sr">Rank</span>#</span><span class="ss1-c ss1-m" role="columnheader">Model</span>
        <span class="ss1-c ss1-pl" role="columnheader" data-lab>Season P&amp;L</span><span class="ss1-c ss1-wl" role="columnheader">W-L</span><span class="ss1-c ss1-hr" role="columnheader">Hit rate</span>
        <span class="ss1-c ss1-f5" role="columnheader">Last 5</span><span class="ss1-c ss1-tp" role="columnheader">Top round</span><span class="ss1-c ss1-wr" role="columnheader">Worst round</span></div>
      <div class="ss1-rows" role="rowgroup">${S.ORDER.map(m=>`<div class="ss1-r ss1-row" role="row" data-m="${m}" style="--mc:${S.col(m)}">
        ${cell('st','<b data-rk></b>')}
        ${cell('m',`<span class="ss1-pic">${S.flag(m,'ss1-flg')}${S.face(m,'ss1-face')}</span><span class="ss1-nm"><b>${S.NM[m]}</b><small>${S.esc(MODELS[m].ver)}</small>${m===S.gold?'<em class="ss1-gt">Golden ticket</em>':''}</span>`)}
        ${cell('pl','<b class="ss1-v" data-pl></b><span class="ss1-bar" aria-hidden="true"><i class="ss1-z"></i><i class="ss1-b"></i></span>')}
        ${cell('wl','<b data-w class="ss-u"></b>-<b data-l class="ss-d"></b>')}
        ${cell('hr','<b data-hr></b><span class="ss1-g" aria-hidden="true"><i class="ss1-gf"></i><i class="ss1-coin"></i></span>')}
        ${cell('f5','<span class="ss-f5" data-f5></span>')}
        ${cell('tp','<span data-tp></span>')}${cell('wr','<span data-wr></span>')}</div>`).join('')}</div></div>
    <p class="ss1-ft"><span data-ft></span></p></div>`},
 draw(x,prev,anim){const h=D.querySelector('.ss-host.ss-s1'),rows=h.querySelector('.ss1-rows'),els=[...rows.children],by={};els.forEach(e=>by[e.dataset.m]=e);
  h.querySelectorAll('[data-lab]').forEach(e=>e.textContent=x.w.lab);h.dataset.k=x.w.k;
  const span=x.hi-x.lo||1,z=-x.lo/span;
  S.flip(els,()=>x.o.forEach(m=>rows.appendChild(by[m])),anim);
  x.o.forEach((m,i)=>{const e=by[m],a=x.row[m],pa=prev?prev.row[m]:null;
    e.querySelector('[data-rk]').textContent='#'+(i+1);e.classList.toggle('ss1-gold',x.w.k==='season'&&i===0);e.classList.toggle('ss1-first',i===0);
    const v=e.querySelector('[data-pl]');v.className='ss1-v '+(a.amt>=0?'ss-u':'ss-d');S.count(v,pa?pa.amt:a.amt,a.amt,anim?700:0,x.w.k==='season'?S.$f:S.k$);
    const bar=e.querySelector('.ss1-bar');bar.style.setProperty('--z',(z*100).toFixed(2)+'%');
    const b=e.querySelector('.ss1-b'),w=Math.abs(a.amt)/span*100;b.style.left=(a.amt>=0?z*100:z*100-w).toFixed(2)+'%';b.style.width=w.toFixed(2)+'%';b.className='ss1-b '+(a.amt>=0?'ss1-bu':'ss1-bd');
    e.querySelector('[data-w]').textContent=a.W;e.querySelector('[data-l]').textContent=a.L;
    e.querySelector('[data-hr]').textContent=S.hr(a);const hv=S.hrv(a);e.querySelector('.ss1-g').style.visibility=hv==null?'hidden':'';e.querySelector('.ss1-gf').style.width=hv==null?'0':(hv*100).toFixed(1)+'%';
    e.querySelector('[data-f5]').innerHTML=S.f5(a);
    const tw=(t,k)=>t?`<b class="${t.v>=0?'ss-u':'ss-d'}">${S.k$(t.v)}</b>${S.logo(t.r)}<span class="ss-sr">${S.esc(t.r.co)}</span>`:'<b class="ss1-na">–</b>';
    e.querySelector('[data-tp]').innerHTML=tw(a.top);e.querySelector('[data-wr]').innerHTML=tw(a.low)});
  h.querySelector('[data-ft]').textContent=x.empty?`No close in the ${x.w.t.toLowerCase()}. Order stays the season's.`:`${x.w.t} · ${x.w.when} · ${x.rs.length} round${x.rs.length===1?'':'s'} graded. W = right direction.`}};
SSmount()})();
