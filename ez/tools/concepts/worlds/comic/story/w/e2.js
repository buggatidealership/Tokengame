/* E2 · Knockout: the round as a bout in the company's ring. The company's mark is printed on the canvas, the move is the punch
   (the page's own sound effect), every AI that called the wrong way is down with stars round its head, the ones that got the
   direction stay standing, the winner wears the crown. Nobody won: all four down, K.O. The stub keeps #, ticker, move, stamp. */
(async function(){const X=WW;
  const draw=async(a,r)=>{const art=a.querySelector('.wc-bi-art');if(!art||art.querySelector('.ww-p'))return;
    const bm=await X.brand(r.ticker),up=r.a>0,W=X.W(r),cs=X.calls(r);
    art.style.setProperty('--bm',bm);art.style.setProperty('--bt',X.onBrand(bm));art.classList.add('ww-d');
    const right=cs.filter(c=>c.up===up),wrong=cs.filter(c=>c.up!==up);
    right.sort((p,q)=>(W.includes(q.m)-W.includes(p.m))||p.off-q.off);  /* the winner first, then the closest */
    const stand=right.map((c,i)=>`<span class="ww2-up${W.includes(c.m)?' ww2-win':''}" style="--k:${i}">${W.includes(c.m)?'<i class="ww2-cr" aria-hidden="true">👑</i>':''}${X.face(c.m,'ww2-f')}</span>`).join('');
    const down=wrong.map((c,i)=>`<span class="ww2-ko" style="--k:${i}">${X.face(c.m,'ww2-f')}<i class="ww2-st" aria-hidden="true">✦</i></span>`).join('');
    art.insertAdjacentHTML('beforeend',`<span class="ww-p ww2 ${up?'ww-up':'ww-dn'}${right.length?'':' ww2-all'}" aria-hidden="true">
      <i class="ww2-rp"></i><i class="ww2-mat">${X.lgDisc(r.ticker,'ww2-lg')}</i>
      <b class="ww2-sfx">${right.length?X.sfx(r.a):'K.O.!'}</b>
      <span class="ww2-ring" style="--nr:${right.length};--nw:${wrong.length}"><span class="ww2-s">${stand}</span><span class="ww2-d">${down}</span></span></span>`);
    art.querySelectorAll('.ww-lg img').forEach(X.capImg)};
  X.eachNoFilm(draw);X.demo(draw);
  X.ready('e2')})();
