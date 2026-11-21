/* M2 · tomorrow at the close as Admit One tickets: the stub is printed as the country the stock trades in, waving;
   the round number on it; notches at the tear; the up/down tally punched */
(function(){const P=window.PENDING||[];
document.querySelectorAll('.wc-tnp').forEach(t=>{const tk=(t.querySelector('header small')||{}).textContent||'';const p=P.find(x=>x.ticker===tk)||{};const c=__mfl.of(tk);
  t.insertAdjacentHTML('afterbegin',`<div class="mq-tstub"><i class="mq-flg" style="--fl:${__mfl.F[c]}"></i><b>R${p.n||''}</b><em>${c}</em></div><i class="mq-n mq-nt"></i><i class="mq-n mq-nb"></i>`)})})();
