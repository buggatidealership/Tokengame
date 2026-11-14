/* T1 Ringside, 3D first with a comic ink finish (seedream-50-pro paintings).
   Smart or lucky: the coin spins over the ropes (painted); the chart is drawn on the ring canvas (painted), its grid lines are ring
   ropes and the coin line a gold rope: above it you beat the coin, below it you are on the canvas. The four fighters stand under
   it on corner cards, each with the drift from the first half of its calls to the second.
   Leaderboard: the bill in the painted arena, the two corners as torn fight photos of the founders; the tape on the weigh-in
   curtain; the proof on the ring canvas, Target hits at the painted range. */
(function(){const Q=PQ,X=PQX,{NM,col,mark,founder,flag,torn,frame,coin}=Q;const I='tools/concepts/worlds/comic/story/h/proof/img/';
/* a twisted rope: thick stroke, a lighter twist drawn as a dash on top (non-scaling) */
const rope=(y,c,h)=>`<line class="t1-rp" x1="0" x2="1000" y1="${y}" y2="${y}" style="--rc:${c}"/><line class="t1-rpt" x1="0" x2="1000" y1="${y}" y2="${y}" style="--rh:${h}"/>`;
const panel=(seed,img,inner,cls,pos)=>`<div class="t1-pan ${cls||''}" style="--tc:${torn(seed,1.4,6)}"><div class="t1-ink"><div class="t1-img" style="background-image:url(${I}${img});background-position:${pos||'50% 50%'}"></div>${inner||''}</div></div>`;
window.PQT={id:'t1',
 sol(D){const s=X.sol(D,{gap:13});let svg=s.chart.replace(/<line class="pqx-g"[^>]*y1="([\d.]+)"[^>]*\/>/g,(a,y)=>rope(y,'#b8312b','#f0d9b0')).replace(/<line class="pqx-coinl"[^>]*y1="([\d.]+)"[^>]*\/>/,(a,y)=>rope(y,'#c98a12','#ffe9a0'));
   return `${panel(3,'s1-ring.jpg','<span class="t1-cap" style="--tc:'+torn(5,2,3)+'">A coin gets half of them right.<br>Who is still above the ropes?</span>','t1-hero','50% 38%')}
    <h2 class="t1-h"><span>Smart</span> <em>or</em> <span>lucky?</span></h2>
    ${panel(8,'s1-canvas.jpg',`<p class="t1-k"><b>Hit rate, round by round</b><span>${coin('t1-kc')} the coin: 50%</span></p>${svg}`,'t1-chp','50% 40%')}
    <ol class="t1-srs">${s.ord.map((m,i)=>{const sq=D.seqs[m],a=D.acc[m],dn=sq.second<sq.first;return `<li class="t1-sr${i===0?' t1-1':''}" style="--mc:${col(m)};--tc:${torn(20+i,1.6,4)}">
      <span class="t1-ph">${founder(m,'t1-pf')}${flag(m,'t1-pfl')}</span><b class="t1-nm">${NM[m]}</b><span class="t1-hr ${a.rate>=.5?'t1-ov':'t1-un'}"><b>${Q.pc(a.rate)}</b><small>${a.rate>=.5?'above the coin':'under the coin'}</small></span>
      <span class="t1-dr" title="its first half of calls, then its second half"><small>1st half</small> ${Q.pc(sq.first)} <i>${dn?'↘':'↗'}</i> <small>2nd half</small> ${Q.pc(sq.second)}</span></li>`}).join('')}</ol>`},
 bill(B,D){return X.bill(B,D,{art:I+'l1-arena.jpg',video:0,vsBurst:1,vsFill:'#f5c542'})},
 tape(x,D){return `<div class="t1-tp" style="--tc:${torn(41,1,6)}"><div class="t1-tpi" style="background-image:url(${I}l1-curtain.jpg)"></div>${X.tape(x,D,{faces:1,title:'Weigh-in · tale of the tape'})}</div>`},
 proof(D){return `<div class="t1-pfw" style="--tc:${torn(51,1,6)}"><div class="t1-pfi" style="background-image:url(${I}s1-canvas.jpg)"></div><div class="t1-rgi" style="background-image:url(${I}l1-range.jpg)"></div>${X.proof(D,{tab:t=>`<b>${t}</b>`})}</div>`},
 dock(D){return X.dock(D,{lab:'Round card'})},
 after(lb){const r=lb.querySelector('.pq-proof');if(r&&!r.dataset.t1){r.dataset.t1=1;const w=r.querySelector('.t1-pfw');const s=()=>{if(w.dataset.on!==r.dataset.on)w.dataset.on=r.dataset.on};new MutationObserver(s).observe(r,{attributes:true,attributeFilter:['data-on']});s()}}
};})();
