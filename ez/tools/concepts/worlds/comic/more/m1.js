/* M1 · the Leaderboard's scoreboard as F1: Season 1 stub, the model's flag behind the face, the words on a caption box, #1 holo */
(function(){const L=__mfl.lead();
document.querySelectorAll('.wc-sb-r').forEach((r,i)=>{const m=r.querySelector('h3').textContent.trim().toUpperCase();
  const cap=document.createElement('div');cap.className='mq-cap';['.wc-sb-nm','.wc-sb-pl','.wc-sb-st'].forEach(s=>{const e=r.querySelector(s);if(e)cap.append(e)});r.append(cap);
  r.insertAdjacentHTML('afterbegin',`<i class="mq-flg" style="--fl:${__mfl.F[__mfl.model(m)]}"></i><div class="mq-stub${i?'':' mq-gold'}"><b>#${i+1}</b><i>${i?'Season 1':'Golden ticket'}</i></div><i class="mq-n mq-nt"></i><i class="mq-n mq-nb"></i>`);
  if(m===L){const f=r.querySelector('.wc-face');f.classList.add('mq-holo');f.insertAdjacentHTML('afterend','<span class="mq-spk" style="left:96px;top:6px">✦</span>')}})})();
