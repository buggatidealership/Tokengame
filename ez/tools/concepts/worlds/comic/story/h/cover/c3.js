/* C3 · The golden ticket. Story: four AIs chase one ticket; whoever tops the P&L holds it, and our pool follows the holder's call.
   The ticket is the hero, painted foil tilting under the spotlight with the real leader pressed on its stub; the loop is the ticket's four tear-off stubs.
   Step 4 reading (b): the pool comes back, with its risk said on the same stub. */
(function(){const C=CV,m=C.mount('c3');if(!m)return C.ready();const {cv,h1,film,star}=m;
  h1.innerHTML=`<span class="cv-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw">${C.letter('Trade','cv-big')} ${C.letter('earnings','cv-big')}</span><span class="cv-qw"><span class="cv-q">Who calls it best?</span></span>`;
  const S=C.STEPS.b,pic=[C.P.calls('c3-mini'),C.P.clock('c3-mini'),'',C.P.pool('c3-mini c3-poolm')];
  const stub=i=>`<li class="c3-s c3-s${i}" style="--i:${i}"><span class="c3-sb"><i class="c3-n">${i+1}</i><span class="c3-w">${S[i]}</span>${pic[i]?`<span class="c3-pic">${pic[i]}</span>`:''}</span></li>`;
  const others=C.S.STAR.filter(x=>x!==C.lead);
  cv.innerHTML=`<div class="c3-art"><img class="c3-bg" src="${C.IMG}g-vault-p.jpg" alt=""><img class="c3-bgd" src="${C.IMG}g-vault-d.jpg" alt="">
      <div class="c3-top">${C.live()}<span class="c3-bell"><small>Next bell</small>${C.cdown()}</span></div>
      <div class="c3-head"></div>
      <div class="c3-stage"><span class="c3-hold"><small>Holds the golden ticket now</small></span>${C.P.ticket('c3-tk')}
        <span class="c3-chase" aria-label="Chasing it">${others.map(x=>`<span class="cv-cm">${C.face(x)}<b>${C.esc(C.S.NM[x])}</b></span>`).join('')}</span></div></div>
    <div class="c3-roll"><ol class="c3-loop" aria-label="How every round goes">${[0,1,2,3].map(i=>i===2?`<li class="c3-s c3-s2" style="--i:2"><span class="c3-sb"><i class="c3-n">3</i><span class="c3-w">${S[2]}</span><span class="c3-arrow" aria-hidden="true">↑ that one</span></span></li>`:stub(i)).join('')}</ol></div>
    <div class="c3-filmw"><span class="c3-fcap">How it works · 1:20</span></div>`;
  cv.querySelector('.c3-head').append(h1);cv.querySelector('.c3-filmw').append(film);
  C.ready()})();
