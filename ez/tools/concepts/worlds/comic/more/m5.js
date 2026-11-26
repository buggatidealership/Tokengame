/* M5 · one #1 across the page: wherever the leader's face appears (cover, the round, the scoreboard) it carries the holo;
   Starring gets a small waving flag pennant under each face */
(function(){const L=__mfl.lead(),c=(window.MODELS[L]||{}).c;
document.querySelectorAll('.wc-face').forEach(f=>{if((f.getAttribute('style')||'').replace(/\s/g,'').includes('--mc:'+c))f.classList.add('mq-holo')});
document.querySelectorAll('.wc-st-m').forEach(s=>{const m=(s.querySelector('b')||{}).textContent.trim().toUpperCase();s.classList.add('mq-stm');
  s.insertAdjacentHTML('beforeend',`<i class="mq-flg mq-pen" style="--fl:${__mfl.F[__mfl.model(m)]}"></i>`);
  if(m===L)s.insertAdjacentHTML('beforeend','<span class="mq-spk" style="left:-4px;top:-8px">✦</span><span class="mq-spk" style="right:2px;top:18px;animation-delay:1s;font-size:11px">✧</span>')})})();
