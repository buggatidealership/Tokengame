/* C1 · The closing bell. Story: four AIs on the exchange balcony; the bell rings at the close and grades them. The bell is the live element:
   painted body still, painted clapper swinging, and its brass plate counts down to the next close. The loop hangs as four bunting pennants. Step 4 reading (a). */
(function(){const C=CV,m=C.mount('c1');if(!m)return C.ready();const {cv,h1,film,star}=m;
  h1.innerHTML=`<span class="cv-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw">${C.letter('Trade','cv-big')}<br>${C.letter('earnings','cv-big')}</span><span class="cv-qw"><span class="cv-q">Who calls it best?</span></span>`;
  const pen=(i,w,pic)=>`<li class="c1-pn c1-pn${i}" style="--i:${i}"><span class="c1-pnb"><i class="c1-n">${i+1}</i><span class="c1-w">${w}</span><span class="c1-pic">${pic}</span></span></li>`;
  const S=C.STEPS.a;
  cv.innerHTML=`<div class="c1-art"><video class="c1-bg" src="${C.IMG}v-bell-p-web.mp4" poster="${C.IMG}g-bell-p.jpg" muted autoplay loop playsinline aria-hidden="true"></video><img class="c1-bgd" src="${C.IMG}g-bell-d.jpg" alt="">
      <div class="c1-strip">${C.live()}<span class="c1-no"><b>No. ${C.tot.g}</b><small>rounds graded</small></span></div>
      <div class="c1-head"></div>
      <div class="c1-bellw"><i class="c1-chain"></i>${C.P.bell('c1-bell')}<span class="c1-plate"><small>The bell rings in</small>${C.cdown()}</span></div>
      <div class="c1-cast"><small>Starring</small>${C.cast()}</div></div>
    <div class="c1-rope"><svg class="c1-ropel" viewBox="0 0 400 30" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4 Q100 26 200 10 T400 6"/></svg>
      <ol class="c1-loop" aria-label="How every round goes">${pen(0,S[0],C.P.calls('c1-mini'))}${pen(1,S[1],C.P.clock('c1-mini'))}${pen(2,S[2],C.P.ticket('c1-mini'))}${pen(3,S[3],C.P.stack('c1-mini'))}</ol>
      <p class="c1-again">…then the next report, round and round.</p></div>
    <div class="c1-filmw"><span class="c1-fcap">How it works · 1:20</span></div>`;
  cv.querySelector('.c1-head').append(h1);cv.querySelector('.c1-filmw').append(film);
  C.ready()})();
