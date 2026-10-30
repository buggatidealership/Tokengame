/* E1 · The winner speaks: each round without a film is a splash panel. The company is the setting (its colour, its mark on a sign),
   the winner is the character and says the call that won in a balloon, the move is the page's own sound effect.
   Nobody won: the four pile up, dizzy, under the move. The stub keeps #, ticker, the move and the stamp. */
(async function(){const X=WW;
  const draw=async(a,r,force)=>{const art=a.querySelector('.wc-bi-art');if(!art||art.querySelector('.ww-p'))return;
    const bm=await X.brand(r.ticker),bt=X.onBrand(bm),up=r.a>0,W=X.W(r),cs=X.calls(r);
    art.style.setProperty('--bm',bm);art.style.setProperty('--bt',bt);art.classList.add('ww-d');
    let who;
    if(W.length){const ws=W.map(m=>cs.find(c=>c.m===m)).filter(Boolean),same=ws.every(c=>c.up===ws[0].up&&c.mag===ws[0].mag);
      const say=c=>`${c.up?'Up':'Down'} ${c.mag}%!`;
      who=`<span class="ww1-who${W.length>1?' ww1-two':''}">${W.map((m,i)=>X.face(m,'ww1-f',`--i:${i}`)).join('')}<i class="ww1-ml" aria-hidden="true"></i></span>
        <span class="ww1-bal${same?(say(ws[0]).length>8?' ww1-long':''):' ww1-bal2'}">${same?say(ws[0]):ws.map(c=>X.NM[c.m]+': '+say(c)).join('<br>')}</span>`}
    else who=`<span class="ww1-pile">${X.ORDER.map((m,i)=>X.face(m,'ww1-pf',`--i:${i}`)).join('')}<i class="ww1-dz" aria-hidden="true">✶</i><i class="ww1-dz ww1-dz2" aria-hidden="true">✶</i></span><span class="ww1-bal ww1-huh">Huh?!</span>`;
    art.insertAdjacentHTML('beforeend',`<span class="ww-p ww1 ${up?'ww-up':'ww-dn'}${W.length?'':' ww1-nob'}" aria-hidden="true">
      ${X.lgDisc(r.ticker,'ww1-lg')}<b class="ww1-sfx">${X.sfx(r.a)}</b>${who}</span>`);
    art.querySelectorAll('.ww-lg img').forEach(X.capImg)};
  X.eachNoFilm(draw);X.demo(draw);
  /* the film arrives: the drawn panel peels away from its corner and the film's poster is under it (played once for a returning visitor) */
  window.__wwArrive=a=>{const r=X.rOf(a)||X.RR[66];const art=a.querySelector('.wc-bi-art');const tmp=document.createElement('span');tmp.className='wc-bi-art';const host=document.createElement('a');host.className='wc-bi';host.append(tmp);
    return draw(host,r,true).then(()=>{const p=tmp.querySelector('.ww-p');p.classList.add('ww1-peel');art.append(p);art.style.setProperty('--bm',tmp.style.getPropertyValue('--bm'))})};
  X.ready('e1')})();
