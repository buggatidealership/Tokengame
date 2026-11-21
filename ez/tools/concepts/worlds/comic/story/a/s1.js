/* S1 · Stamped: each round's winner is an ink stamp across its picture, in the winner's ink; "Nobody won" in red; a tie gets two stamps */
(function(){const S=SA,RR={};ROUNDS.forEach(r=>RR[r.n]=r);
  const st=(m,i,k,tie)=>`<span class="sa-st${tie?' sa-st'+k:''}" style="--ink:${m?S.col(m):'#c8261d'};--r:${tie?(k?9:-11):[-9,6,-4,10,-7,3][i%6]}deg">${m?S.logo(m,'sa-st-l'):'<i class="sa-st-x">×</i>'}<b>${m?S.NM[m]:'Nobody'}</b><small>${tie?'tie':'won'}</small></span>`;
  S.D.querySelectorAll('.wc-season .wc-bi').forEach(a=>{if(a.querySelector('.sa-st'))return;const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;
    const W=S.W(r),art=a.querySelector('.wc-bi-art');
    art.insertAdjacentHTML('beforeend',`<span class="sa-sts" aria-hidden="true">${W.length?W.map((m,k)=>st(m,r.n,k,W.length>1)).join(''):st(null,r.n,0)}</span>`);
    a.setAttribute('aria-label',a.getAttribute('aria-label')+'. '+(W.length?W.map(m=>S.NM[m]).join(' and ')+(W.length>1?' tie for the win':' won'):'Nobody won'))});
  S.ready()})();
