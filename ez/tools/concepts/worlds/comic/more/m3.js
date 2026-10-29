/* M3 · every round so far as torn ticket stubs: the round number, ticker and move on a perforated stub under the picture;
   rounds where every AI got the direction right in holo foil */
(function(){const R={};(window.ROUNDS||[]).forEach(r=>R[r.n]=r);
document.querySelectorAll('.wc-bi').forEach(a=>{const n=+(a.getAttribute('href')||'').replace(/\D/g,'');const r=R[n];if(!r)return;
  const up=r.a>0,perfect=r.calls.length>1&&r.calls.every(c=>/^UP/.test(c[1])===up);
  a.insertAdjacentHTML('beforeend',`<div class="mq-bs"><b>#${n}</b><small>${r.ticker.replace(/\..*$/,'')}</small><em class="${up?'mq-u':'mq-d'}">${up?'+':'−'}${Math.abs(r.a).toFixed(2)}%</em></div><i class="mq-n mq-nl"></i><i class="mq-n mq-nr"></i>`);
  if(perfect)a.classList.add('mq-perf')})})();
