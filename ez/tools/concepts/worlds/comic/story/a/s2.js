/* S2 · Winner's colours: each round wears its winner's colour: a crowned banner with the name, the frame and the stub tinted;
   nobody: grey hatching; a tie: the banner split in two colours */
(function(){const S=SA,RR={};ROUNDS.forEach(r=>RR[r.n]=r);
  S.D.querySelectorAll('.wc-season .wc-bi').forEach(a=>{if(a.querySelector('.sa-bn'))return;const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;
    const W=S.W(r),c=W.map(S.col);
    a.style.setProperty('--wcol',c[0]||'#6d6672');if(c[1])a.style.setProperty('--wcol2',c[1]);
    a.classList.add(W.length>1?'sa-tie':W.length?'sa-won':'sa-none');
    a.insertAdjacentHTML('afterbegin',`<span class="sa-bn" aria-hidden="true">${W.length?'<i class="sa-cr">♛</i>'+W.map(m=>`<b>${S.NM[m]}</b>`).join('<i class="sa-amp">&amp;</i>'):'<i class="sa-x">×</i><b>Nobody</b>'}</span>`);
    a.setAttribute('aria-label',a.getAttribute('aria-label')+'. '+(W.length?W.map(m=>S.NM[m]).join(' and ')+(W.length>1?' tie for the win':' won'):'Nobody won'))});
  S.ready()})();
