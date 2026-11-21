/* P3 · Punched: the Season 1 ticket has a hole for every round of the season (graded: punched, ringed green or red by the move;
   calls in: dashed; still to come: printed; the last one is the NVIDIA bet). The walkthrough's round gets punched. */
(function(){const S=SA,n=S.lrN(),r=S.byN(n);if(!r){S.ready();return}
  const all=[].concat(ROUNDS.map(x=>({n:x.n,k:'g',a:x.a})),(window.PENDING||[]).map(x=>({n:x.n,k:'p',t:x.ticker})),(window.UPCOMING||[]).map(x=>({n:x.n,k:'u',t:x.ticker}))).sort((a,b)=>a.n-b.n);
  const T=all.length,G=ROUNDS.length,last=all[T-1],isBet=last&&last.t==='NVDA';
  const holes=all.map(x=>{const cls=x.k==='g'?('sa-hg '+(x.a>0?'sa-hu':'sa-hd')):x.k==='p'?'sa-hp':'sa-hu0';
    return `<i class="sa-ho ${cls}${x.n===n?' sa-me':''}${x===last&&isBet?' sa-bet':''}">${x.n===n?'<span class="sa-chad"></span><span class="sa-punch"></span><b class="sa-pow sa-pow3"><span>Chunk!</span></b>':''}</i>`}).join('');
  const w=S.p5(`<div class="sa-p3"><div class="sa-tk" aria-hidden="true"><p class="sa-tkh"><b>Season 1</b><span>${G} of ${T} punched</span></p>
      <div class="sa-hs" style="--c:${Math.ceil(T/6)};--c3:${Math.ceil(T/3)}">${holes}</div><p class="sa-tkf">${isBet?'<span>Bet #1: NVIDIA ★</span>':''}</p><i class="sa-tn sa-tnl"></i><i class="sa-tn sa-tnr"></i></div>
      <div class="sa-btn"></div></div>`,
    `The Season 1 ticket has a hole for each of its ${T} rounds. ${G} are punched so far, round ${n} among them.${isBet?' The last one is bet number 1, NVIDIA.':''}`);
  if(w)S.once(w.querySelector('.sa-tk'),.7);S.ready()})();
