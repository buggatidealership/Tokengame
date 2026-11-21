/* S3 · The race for wins: above the grid, every AI's won rounds as a lane of tickets (the last 10 rounds as numbered stubs,
   earlier wins as thin ticks), a lane for nobody; tap a lane to light its rounds in the grid. Each tile's winner wears a crown. */
(function(){const S=SA,R=ROUNDS.slice().sort((a,b)=>b.n-a.n),RR={};R.forEach(r=>RR[r.n]=r);
  const L=10,recent=new Set(R.slice(0,L).map(r=>r.n));
  const keys=S.ORDER.concat(['NOBODY']),won={};keys.forEach(k=>won[k]=[]);
  R.forEach(r=>{const W=S.W(r);(W.length?W:['NOBODY']).forEach(m=>won[m].push(r))});
  const ks=keys.filter(k=>k!=='NOBODY').sort((a,b)=>won[b].length-won[a].length||won[b].filter(r=>recent.has(r.n)).length-won[a].filter(r=>recent.has(r.n)).length).concat(['NOBODY']);
  const lane=k=>{const ws=won[k],nw=ws.filter(r=>recent.has(r.n)),old=ws.filter(r=>!recent.has(r.n)),col=k==='NOBODY'?'#c8261d':S.col(k);
    return `<button type="button" class="sa-ln" data-k="${k}" style="--lc:${col}" aria-pressed="false" aria-label="${k==='NOBODY'?'Nobody':S.NM[k]}: ${ws.length} rounds won, ${nw.length} of the last ${L}. Show them in the grid.">
      <span class="sa-ln-n">${k==='NOBODY'?'<i class="wc-nob wc-nob-s">×</i>':S.face(k,'wc-f-s')}<b>${k==='NOBODY'?'Nobody':S.NM[k]}</b></span>
      <span class="sa-ln-r">${nw.map(r=>`<i class="sa-mt">${r.n}</i>`).join('')}</span>
      <span class="sa-ln-o">${old.map(()=>'<i></i>').join('')}</span><b class="sa-ln-c">${ws.length}</b></button>`};
  const race=`<div class="sa-race" role="group" aria-label="Rounds won so far"><p class="sa-rh" aria-hidden="true"><span></span><span>Last ${L} rounds</span><span>Before</span><span>Won</span></p>${ks.map(lane).join('')}</div>`;
  const g=S.D.querySelector('.wc-season .wc-bis');if(!g||S.D.querySelector('.sa-race')){S.ready();return}
  g.insertAdjacentHTML('beforebegin',race);
  g.querySelectorAll('.wc-bi').forEach(a=>{const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;const W=S.W(r);a.dataset.w=(W.length?W:['NOBODY']).join(' ');
    const w=a.querySelector('.wc-bi-w');if(w&&W.length)w.insertAdjacentHTML('afterbegin','<i class="sa-cr3" aria-hidden="true">♛</i>');
    a.setAttribute('aria-label',a.getAttribute('aria-label')+'. '+(W.length?W.map(m=>S.NM[m]).join(' and ')+(W.length>1?' tie for the win':' won'):'Nobody won'))});
  S.D.querySelectorAll('.sa-ln').forEach(b=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')!=='true';
    S.D.querySelectorAll('.sa-ln').forEach(x=>x.setAttribute('aria-pressed','false'));if(on)b.setAttribute('aria-pressed','true');
    g.dataset.saf=on?b.dataset.k:'';g.querySelectorAll('.wc-bi').forEach(a=>a.classList.toggle('sa-dim',on&&!a.dataset.w.split(' ').includes(b.dataset.k)))}));
  S.ready()})();
