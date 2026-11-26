/* Round H proof: shared builders for the four parts. Each take calls them with its own options and skins them with its own CSS.
   sol(D,o)   Smart or lucky: the hit-rate chart round by round ((right + 1) / (calls + 2), the page's own formula), the coin line at
              50%, each AI's final hit rate and the drift from the first half of its calls to the second (lesson 8: shown, not hidden).
   bill(B,D,o) the fight bill, from the live bill's own pieces (B = PQ's bill()).
   tape(x,D,o) the tale of the tape from window.SS.X[k]: P&L skyline from the start line, W-L, hit rate, last 5, top and worst
              round, the best figure of each row ringed in gold (a hand-drawn ring).
   proof(D,o) the four views: P&L, Accuracy, Target hits, Sector.
   dock(D,o)  the three window buttons. Classes pqx-. */
(function(){const Q=window.PQ,{MS,NM,col,$f,k$,pc,esc,mark,founder,flag,coin,tick,cross,frame,brush,burst,rnd}=Q;
/* a hand-drawn gold ring round the best figure (two loose loops, not a CSS border) */
const ring=s=>`<svg class="pqx-ring" viewBox="0 0 100 50" preserveAspectRatio="none" aria-hidden="true"><path d="M8 27 C 6 9, 46 3, 80 7 C 99 10, 98 38, 70 45 C 42 50, 4 44, 6 24 C 8 12, 30 6, 52 6" fill="none" stroke="#0d0b10" stroke-width="5.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/><path d="M8 27 C 6 9, 46 3, 80 7 C 99 10, 98 38, 70 45 C 42 50, 4 44, 6 24 C 8 12, 30 6, 52 6" fill="none" stroke="#f5c542" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>`;
const logo=(r,cls)=>{const c=(window.CO_LOGOS||{})[r.ticker];return c?`<img class="${cls||'pqx-lg'}${c.dark?' pqx-lgdk':''}" src="media/${c.f}" alt="${esc(r.co)}" title="${esc(r.co)} (${esc(r.ticker)})">`:`<b class="${cls||'pqx-lg'} pqx-lgt">${esc(r.ticker.replace(/\..*$/,''))}</b>`};
/* ========== Smart or lucky ========== */
function sol(D,o){o=o||{};const lo=.3,hi=.8,ord=D.byHit,L=Q.lines(D.hit,lo,hi,ord,ord[0]),Y=L.Y;
  const grid=[.4,.6,.7].map(v=>`<line class="pqx-g" x1="0" x2="1000" y1="${Y(v)}" y2="${Y(v)}"/>`).join('');
  const coinY=Y(.5);const ends=Q.spread(L.ends.map(e=>Object.assign({},e)),o.gap||13);
  const chart=`<figure class="pqx-ch" aria-label="Hit rate after every round: ${ord.map(m=>NM[m]+' '+pc(D.acc[m].rate)).join(', ')}. A coin flip gets about 50%.">
    <div class="pqx-pl"><div class="pqx-cv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${grid}<line class="pqx-coinl" x1="0" x2="1000" y1="${coinY}" y2="${coinY}"/>${L.svg}</svg>
      <span class="pqx-coin" style="top:${coinY}%">${coin('pqx-coi')}<b>Coin flip 50%</b></span>
      ${[.4,.6,.7].map(v=>`<span class="pqx-gl" style="top:${Y(v)}%">${pc(v)}</span>`).join('')}</div>
      <div class="pqx-ends">${ends.map(e=>`<span class="pqx-end" style="top:${e.y.toFixed(1)}%;--mc:${col(e.m)}">${o.faces?founder(e.m,'pqx-ef'):mark(e.m,'pqx-em')}<b>${pc(D.acc[e.m].rate)}</b></span>`).join('')}</div></div>
    <p class="pqx-x" aria-hidden="true"><span>R${D.firstR.n}</span><span>Round by round</span><span>R${D.lastR.n}</span></p></figure>`;
  const rows=ord.map((m,i)=>{const s=D.seqs[m],a=D.acc[m],f=s.first,g=s.second,dn=g<f;
    return `<li class="pqx-sr${i===0?' pqx-1':''}" style="--mc:${col(m)};--hr:${a.rate}" data-m="${m}">${o.rowFace?founder(m,'pqx-sf'):mark(m,'pqx-sm')}<b class="pqx-snm">${NM[m]}</b>
      <span class="pqx-shr"><b>${pc(a.rate)}</b><small>${a.W} of ${a.t} right</small></span>
      <span class="pqx-dr ${dn?'pqx-dn':'pqx-up'}" title="First half of its calls, then the second half"><small>1st half</small><b>${pc(f)}</b><i aria-hidden="true">${dn?'↘':'↗'}</i><b>${pc(g)}</b><small>2nd half</small></span></li>`}).join('');
  return {chart,rows:`<ol class="pqx-srs">${rows}</ol>`,ord}}
/* ========== the fight bill ========== */
function bill(B,D,o){o=o||{};const corner=(c,s)=>{if(!c||!c.m)return'';const m=c.m;
    return `<div class="pqx-cn pqx-cn-${s}" style="--mc:${col(m)}" data-m="${m}">
      <span class="pqx-role">${s==='a'&&B.k==='season'?'Golden ticket':esc(c.role.trim()||'Challenger')}</span>
      <span class="pqx-fig">${o.video?founder(m,'pqx-cf',1):founder(m,'pqx-cf')}${mark(m,'pqx-cm')}</span>${o.flags!==false?flag(m,'pqx-cfl'):''}
      <b class="pqx-cnm">${NM[m]}</b><span class="pqx-cpl"><small>${B.k==='season'?'Season P&amp;L':B.k==='d1'?'24h P&amp;L':'7-day P&amp;L'}</small><b class="${c.v>=0?'pqx-u':'pqx-d'}">${$f(c.v)}</b></span>
      <span class="pqx-cwl"><b class="pqx-u">${c.W}</b>-<b class="pqx-d">${c.L}</b><small>W-L</small></span></div>`};
  const stubs=B.stubs.map(s=>`<button type="button" class="pqx-stub" data-k="${s.k}" aria-pressed="${s.on}"><b>${esc(s.t)}</b><small>${esc(s.when)}</small></button>`).join('');
  const body=B.empty?`<p class="pqx-quiet">No bell in ${B.k==='d1'?'24 hours':'7 days'}. Every AI at $0.</p>`:
    `<div class="pqx-bout">${corner(B.a,'a')}<span class="pqx-vs" aria-hidden="true">${o.vsBurst?burst(7,13,o.vsFill||'#ffd23f','#0d0b10','pqx-vsb'):''}<b>VS</b></span>${corner(B.b,'b')}</div>
     ${B.under.length?`<div class="pqx-under"><small>Undercard</small>${B.under.map(u=>`<span style="--mc:${col(u.m)}">${mark(u.m,'pqx-um')}<em>${NM[u.m]}</em><b class="${u.v>=0?'pqx-u':'pqx-d'}">${$f(u.v)}</b></span>`).join('')}</div>`:''}
     ${B.line?`<p class="pqx-line">${B.line}</p>`:''}`;
  return `<div class="pqx-bill">${o.art?`<div class="pqx-art" style="background-image:url(${o.art})"></div>`:''}
    <div class="pqx-bhd"><span class="pqx-std">The standings<small>${esc(B.graded)}</small></span>${B.bell?`<span class="pqx-bell">${o.bellIcon||''}<small>Next bell</small><b>${esc(B.bell.t)}</b><small>${esc(B.bell.n)}</small></span>`:''}</div>
    <h1 class="pqx-h1">${o.h1||"Who's winning?"}</h1><div class="pqx-stubs" role="group" aria-label="Time window">${stubs}</div>${body}</div>`}
/* ========== the tale of the tape ========== */
const ROWS=[['pl','P&L'],['wl','W-L'],['hr','Hit rate'],['l5','Last 5'],['tp','Top round'],['wr','Worst round']];
function tape(x,D,o){o=o||{};const S=window.SS,ord=x.o,row=x.row,lo=x.lo,hi=x.hi,span=(hi-lo)||1;
  const best={pl:null,wl:null,hr:null,tp:null,wr:null};const by=(f,dir)=>{let b=null,bv=null;ord.forEach(m=>{const v=f(row[m]);if(v==null)return;if(bv==null||(dir>0?v>bv:v<bv)){bv=v;b=m}});return b};
  best.pl=by(r=>r.amt,1);best.wl=by(r=>r.W+r.L?r.W-r.L:null,1);best.hr=by(r=>S.hrv(r),1);best.tp=by(r=>r.top?r.top.v:null,1);best.wr=by(r=>r.low?r.low.v:null,1);
  const z=(-lo/span*100);
  const cell=(k,m)=>{const r=row[m],B=best[k]===m;let v='';
    if(k==='pl'){const h=Math.abs(r.amt)/span*100;v=`<span class="pqx-sky" style="--z:${z.toFixed(1)}%"><i class="pqx-col ${r.amt>=0?'pqx-cu':'pqx-cd'}" style="height:${h.toFixed(1)}%;${r.amt>=0?`bottom:${z.toFixed(1)}%`:`top:${(100-z).toFixed(1)}%`}"></i><b class="pqx-v ${r.amt>=0?'pqx-u':'pqx-d'}" style="${r.amt>=0?`bottom:calc(${(z+h).toFixed(1)}% + 3px)`:`top:calc(${(100-z+h).toFixed(1)}% + 3px)`}">${k$(r.amt)}</b></span>`}
    else if(k==='wl')v=`<b class="pqx-big"><span class="pqx-u">${r.W}</span>-<span class="pqx-d">${r.L}</span></b>`;
    else if(k==='hr')v=`<b class="pqx-big">${S.hr(r)}</b>`;
    else if(k==='l5')v=`<span class="pqx-f5">${r.l5.map(ok=>ok?tick():cross()).join('')}</span>`;
    else{const t=k==='tp'?r.top:r.low;v=t?`<span class="pqx-tw">${logo(t.r)}<b class="${t.v>=0?'pqx-u':'pqx-d'}">${k$(t.v)}</b></span>`:'<b class="pqx-big">–</b>'}
    return `<div class="pqx-c pqx-r-${k}${B&&k!=='pl'&&k!=='l5'?' pqx-best':''}" data-m="${m}">${B&&k!=='pl'&&k!=='l5'?ring():''}${v}</div>`};
  const heads=ord.map((m,i)=>`<div class="pqx-c pqx-r-hd" data-m="${m}" style="--mc:${col(m)}"><span class="pqx-rk">#${i+1}</span>${o.faces?founder(m,'pqx-tf'):''}${mark(m,'pqx-tm')}${flag(m,'pqx-tfl')}<b class="pqx-tnm">${NM[m]}</b><small>${esc(MODELS[m].ver)}</small></div>`).join('');
  const body=ROWS.map(([k,t])=>`<span class="pqx-lab pqx-r-${k}">${k==='pl'?esc(x.w.lab):t}</span>${ord.map(m=>cell(k,m)).join('')}`).join('');
  return `<div class="pqx-tape" data-k="${x.w.k}"><div class="pqx-thd"><b class="pqx-tt">${o.title||'Tale of the tape'}</b><span class="pqx-tsub">Left to right by ${esc(x.w.lab)}</span>
      <div class="pqx-tsw" role="group" aria-label="Time window">${S.WS.map(w=>`<button type="button" data-k="${w.k}"><b>${w.short}</b></button>`).join('')}</div></div>
    <div class="pqx-tg" style="--n:${ord.length}"><span class="pqx-lab pqx-r-hd"></span>${heads}${body}</div>
    <p class="pqx-tft"><span>${x.w.k==='season'?'Season':esc(x.w.t)} · ${x.rs.length} rounds graded</span><span class="pqx-key">${ring()}<em>best in the row</em></span></p></div>`}
/* ========== the proof: four views ========== */
function proof(D,o){o=o||{};const ordP=D.byPnl,lead=ordP[0];
  const mn=Math.min(...MS.map(m=>Math.min(...D.bal[m]))),mx=Math.max(...MS.map(m=>Math.max(...D.bal[m])));const lo=Math.floor(mn/5e4)*5e4,hi=Math.ceil(mx/5e4)*5e4;
  const LP=Q.lines(D.bal,lo,hi,ordP,lead),eP=Q.spread(LP.ends.map(e=>Object.assign({},e)),11);
  const gP=[];for(let v=lo;v<=hi;v+=5e4)gP.push(v);
  const chartP=`<div class="pqx-pc"><div class="pqx-pcv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${gP.map(v=>`<line class="pqx-g${v===100000?' pqx-g0':''}" x1="0" x2="1000" y1="${LP.Y(v)}" y2="${LP.Y(v)}"/>`).join('')}${LP.svg}</svg>
     ${gP.filter(v=>v!==100000).map(v=>`<span class="pqx-gl" style="top:${LP.Y(v)}%">$${v/1000}K</span>`).join('')}<span class="pqx-gl pqx-gl0" style="top:${LP.Y(100000)}%">$100K start</span></div>
    <div class="pqx-ends">${eP.map(e=>`<span class="pqx-end" style="top:${e.y.toFixed(1)}%;--mc:${col(e.m)}"${e.m===lead?' data-lead':''}><b>${NM[e.m]}</b><small>${(D.acc[e.m].pct>=0?'+':'')+D.acc[e.m].pct.toFixed(1)}%</small></span>`).join('')}</div></div>`;
  const rowsP=`<ol class="pqx-pr">${ordP.map((m,i)=>`<li style="--mc:${col(m)}"${i===0?' data-lead':''}><i class="pqx-n">${i+1}</i>${mark(m,'pqx-pm')}<b class="pqx-pnm">${NM[m]}</b><span><small>Top W</small><b>${k$(D.acc[m].bw)}</b></span><span><small>Top L</small><b>${k$(D.acc[m].bl)}</b></span><span class="pqx-pbig"><small>P&amp;L</small><b class="${D.acc[m].pnl>=0?'pqx-u':'pqx-d'}">${k$(D.acc[m].pnl)}</b></span></li>`).join('')}</ol>`;
  const ordA=D.byHit,LA=Q.lines(D.hit,.3,.8,ordA,ordA[0]),eA=Q.spread(LA.ends.map(e=>Object.assign({},e)),11);
  const chartA=`<div class="pqx-pc"><div class="pqx-pcv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${[.4,.6,.7].map(v=>`<line class="pqx-g" x1="0" x2="1000" y1="${LA.Y(v)}" y2="${LA.Y(v)}"/>`).join('')}<line class="pqx-coinl" x1="0" x2="1000" y1="${LA.Y(.5)}" y2="${LA.Y(.5)}"/>${LA.svg}</svg>
     <span class="pqx-gl pqx-gl0" style="top:${LA.Y(.5)}%">Coin flip 50%</span></div>
    <div class="pqx-ends">${eA.map(e=>`<span class="pqx-end" style="top:${e.y.toFixed(1)}%;--mc:${col(e.m)}"${e.m===ordA[0]?' data-lead':''}><b>${NM[e.m]}</b><small>${pc(D.acc[e.m].rate)}</small></span>`).join('')}</div></div>`;
  const rowsA=`<ol class="pqx-pr pqx-pra">${ordA.map((m,i)=>`<li style="--mc:${col(m)}"${i===0?' data-lead':''}><i class="pqx-n">${i+1}</i>${mark(m,'pqx-pm')}<b class="pqx-pnm">${NM[m]}</b><span><small>Trades</small><b>${D.acc[m].t}</b></span><span><small class="pqx-u">W</small><b class="pqx-u">${D.acc[m].W}</b></span><span><small class="pqx-d">L</small><b class="pqx-d">${D.acc[m].L}</b></span><span class="pqx-pbig"><small>Hit rate</small><b>${pc(D.acc[m].rate)}</b></span></li>`).join('')}</ol>`;
  /* target: rings every 3% off, one hole per right-way call at its miss, on a golden-angle spiral; bullseye = within 0.1% */
  const tgt=m=>{const t=D.tg[m],R=12;const holes=t.holes.map((v,i)=>{const r=Math.min(v,R)/R*46,a=i*2.39996;return `<circle class="pqx-hole" cx="${(50+Math.cos(a)*r).toFixed(1)}" cy="${(50+Math.sin(a)*r).toFixed(1)}" r="1.9"/>`}).join('');
    return `<svg class="pqx-tgt" viewBox="0 0 100 100" aria-hidden="true">${[46,34.5,23,11.5].map((r,i)=>`<circle class="pqx-rg pqx-rg${i}" cx="50" cy="50" r="${r}"/>`).join('')}<circle class="pqx-bull" cx="50" cy="50" r="3.2"/><path class="pqx-xh" d="M50 2 V98 M2 50 H98"/>${holes}</svg>`};
  const vT=`<div class="pqx-tgs">${D.byTg.map((m,i)=>`<div class="pqx-tc" style="--mc:${col(m)}"${i===0?' data-lead':''}><p class="pqx-tcn"><i class="pqx-n">${i+1}</i>${mark(m,'pqx-pm')}<b>${NM[m]}</b></p>${tgt(m)}
     <p class="pqx-tcs"><span class="pqx-bl"><b>${D.tg[m].bulls}</b><small>Bullseyes</small></span><span class="pqx-i1"><b>${D.tg[m].in1}</b><small>Within 1%</small></span><span class="pqx-of"><b>${D.tg[m].off}</b><small>Off target</small></span></p></div>`).join('')}</div>`;
  const sec=D.sectors.slice(0,o.secN||9);
  const vS=`<div class="pqx-sec"><div class="pqx-sh"><span></span>${MS.map(m=>`<span style="--mc:${col(m)}">${mark(m,'pqx-pm')}</span>`).join('')}</div>${sec.map(s=>{const c=D.sec[s];let bv=-1;MS.forEach(m=>{const z=c[m];if(z&&z.n>=2)bv=Math.max(bv,z.r/z.n)});
     return `<div class="pqx-srw"><span class="pqx-sn">${esc(s)}</span>${MS.map(m=>{const z=c[m];if(!z)return '<span class="pqx-sv pqx-s0">–</span>';const r=z.r/z.n,b=z.n>=2&&r===bv;return `<span class="pqx-sv ${r>=2/3?'pqx-sg':r<=1/3?'pqx-sr':'pqx-sa'}${b?' pqx-best':''}">${b?ring():''}<b>${z.r}/${z.n}</b></span>`}).join('')}</div>`}).join('')}</div>`;
  const V=[['pnl','P&L','Would following them have made you money?',chartP+rowsP],['acc','Accuracy','How often were they right about the direction?',chartA+rowsA],['tgt','Target hits','How close did they get to the real move?',vT],['sec','Sector','Which industries do they call best?',vS]];
  return `<div class="pqx-pf"><div class="pqx-tabs" role="tablist" aria-label="Views">${V.map(v=>`<button type="button" role="tab" data-pv="${v[0]}" aria-selected="false">${o.tab?o.tab(v[1]):`<b>${v[1]}</b>`}</button>`).join('')}</div>
    <div class="pqx-vw">${V.map(v=>`<div class="pqx-v pqx-v-${v[0]}" data-view="${v[0]}" role="tabpanel"><p class="pqx-q">${v[2]}</p>${v[3]}</div>`).join('')}</div>
    <p class="pqx-note">$100,000 to start. The whole balance on every call. Buy on up, short on down. No leverage. Before fees.</p></div>`}
function dock(D,o){o=o||{};return `<span class="pqx-dl">${o.lab||'Scoreboard P&amp;L over'}</span><div class="pqx-dk">${window.SS.WS.map(w=>`<button type="button" data-k="${w.k}"><b>${w.short}</b></button>`).join('')}</div>`}
window.PQX={sol,bill,tape,proof,dock,ring,logo};
})();
