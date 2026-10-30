/* N1 · In the slot: the golden ticket (the same object as #1 on "Meet the models", with the holder's holo face) stands in a slot cut
   into the NVIDIA chip. Replaces "The pool gets bet on the top AI's call. Today that's Grok." */
(function(){const {D,NM,lead,gt,seen}=SB;
  function build(){const sec=D.querySelector('.wc-bet'),m=lead(),chip=sec.querySelector('.wc-chip');
    sec.querySelectorAll('.sb-n1').forEach(x=>x.remove());
    chip.insertAdjacentHTML('afterbegin',`<div class="sb-n1 sb-n1-t" aria-hidden="true">${gt(m)}</div>`);
    sec.querySelector('.wc-chip-pkg').insertAdjacentHTML('afterbegin','<i class="sb-n1 sb-n1-slot" aria-hidden="true"></i>');
    const c2=sec.querySelector('.wc-bet-l .wc-cap:nth-child(2)');
    c2.innerHTML=`<span class="wc-sr">The pool gets bet on the call of the AI holding the golden ticket. Today that's ${NM[m]}. </span>The ticket can still change hands until 24h before NVIDIA reports.`;
    sec.classList.add('sb-n1-on');seen(chip)}
  build();window.__sbRebuild=build;D.documentElement.classList.add('sb-ok-n1')})();
