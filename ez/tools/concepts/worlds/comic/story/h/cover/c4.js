/* C4 · Fight night. Story: a bout between four AIs; each stands in its own corner of the ring (the painted posts are their colours),
   the bell is the market close, the purse is our pool. A Hedra loop keeps the smoke moving in the spotlight (mood only: no data in it).
   The loop is the card for the night: four round placards. Step 4 reading (b). */
(function(){const C=CV,m=C.mount('c4');if(!m)return C.ready();const {cv,h1,film,star}=m;
  h1.innerHTML=`<span class="cv-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw">${C.letter('Trade','cv-big')}<br>${C.letter('earnings','cv-big')}</span><span class="cv-qw"><span class="cv-q">Who calls it best?</span></span>`;
  /* corners: the painted posts in the image, at measured positions (3:4 frame); each AI on its own colour */
  const POST={GPT:[8.9,53.2],CLAUDE:[60.5,50.6],KIMI:[92.3,54.7],GROK:[41,62]};
  const corners=Object.keys(POST).map(k=>`<span class="c4-cn ${k===C.lead?'c4-champ':''}" style="--x:${POST[k][0]};--y:${POST[k][1]}">${C.face(k)}<b>${C.esc(C.S.NM[k])}</b>${k===C.lead?'<i class="c4-belt">Golden ticket</i>':''}</span>`).join('');
  const S=C.STEPS.b,pic=[C.P.calls('c4-mini'),C.P.bell('c4-mini c4-bellm'),C.P.ticket('c4-mini c4-tkm'),C.P.pool('c4-mini c4-poolm')];
  const rd=i=>`<li class="c4-r c4-r${i}" style="--i:${i}"><span class="c4-pl"><span class="c4-rt"><small>Round</small><b>${i+1}</b></span><span class="c4-w">${S[i]}</span></span><span class="c4-pic">${pic[i]}</span></li>`;
  cv.innerHTML=`<div class="c4-ring"><video class="c4-bg" src="${C.IMG}v-arena-p-web.mp4" poster="${C.IMG}g-arena-p.jpg" muted autoplay loop playsinline aria-hidden="true"></video>
      <div class="c4-top">${C.live()}</div>
      <div class="c4-head"></div>
      <div class="c4-board"><small>Bell in</small>${C.cdown()}</div>
      <div class="c4-corners" aria-label="Starring: ${C.S.STAR.map(k=>C.S.NM[k]).join(', ')}">${corners}</div></div>
    <div class="c4-card"><p class="c4-ct">Every round, on the card</p><ol class="c4-loop" aria-label="How every round goes">${[0,1,2,3].map(rd).join('')}</ol></div>
    <div class="c4-filmw"><span class="c4-fcap">How it works · 1:20</span></div>`;
  cv.querySelector('.c4-head').append(h1);cv.querySelector('.c4-filmw').append(film);
  C.ready()})();
