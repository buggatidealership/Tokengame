/* N2 · Printed on the chip: the package is printed "NVIDIA × <leader>" with the leader's holo face, and the #2 by P&L peeks over the
   chip's edge, so the name on the chip can still change. Replaces "The pool gets bet on the top AI's call. Today that's Grok." */
(function(){const {D,NM,face,lead,rank,seen}=SB;
  function build(){const sec=D.querySelector('.wc-bet'),m=lead(),rk=rank().filter(x=>x!==m),c=rk[0],P=window.__x2pPnl().A,gap=Math.round(P[m].pnl-P[c].pnl);
    sec.querySelectorAll('.sb-n2').forEach(x=>x.remove());const k=sec.querySelector('.wc-chip-k:not(.wc-chip-k2)');k.classList.add('sb-n2-hid');
    k.insertAdjacentHTML('afterend',`<span class="sb-n2 sb-n2-co" aria-hidden="true"><b>NVIDIA</b><i>×</i>${face(m,'wc-f-xl wc9-holo')}<b class="sb-n2-m">${NM[m]}</b></span>`);
    sec.querySelector('.wc-chip').insertAdjacentHTML('beforeend',`<span class="sb-n2 sb-n2-ch" aria-hidden="true">${face(c,'wc-f-xl')}<small>${NM[c]} · $${gap.toLocaleString('en-US')} behind</small></span>`);
    const c2=sec.querySelector('.wc-bet-l .wc-cap:nth-child(2)');
    c2.innerHTML=`<span class="wc-sr">The pool gets bet on the top AI's call. Today that's ${NM[m]}, $${gap.toLocaleString('en-US')} ahead of ${NM[c]}. </span>Top P&amp;L makes the call. The name locks 24h before NVIDIA reports.`;
    sec.classList.add('sb-n2-on');seen(sec.querySelector('.wc-chip'))}
  build();window.__sbRebuild=build;D.documentElement.classList.add('sb-ok-n2')})();
