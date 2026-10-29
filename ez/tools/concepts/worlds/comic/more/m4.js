/* M4 · smart or lucky: each model's row carries its flag behind the face, a gold coin spins at the coin-flip line as the
   row comes in, #1's face in holo */
(function(){const L=__mfl.lead(),NM={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'};
document.querySelectorAll('.wc-cn').forEach(r=>{const m=r.querySelector('.wc-cn-n').textContent.trim().toUpperCase();
  r.insertAdjacentHTML('afterbegin',`<i class="mq-flg" style="--fl:${__mfl.F[__mfl.model(m)]}"></i>`);
  r.querySelector('.wc-cn-bar').insertAdjacentHTML('beforeend','<span class="mq-coin"><b>$</b></span>');
  if(m===L)r.querySelector('.wc-face').classList.add('mq-holo')})})();
