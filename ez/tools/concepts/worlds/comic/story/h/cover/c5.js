/* C5 · The floor, live. Story: EZ is a trading floor that never sleeps; the season runs on its screens. A Hedra loop of the painted floor
   (screens flicker, haze drifts) carries the mood; the data runs on page elements: a ticker tape with the real next bell and the reports on the card,
   and four desk monitors that show the loop. Step 4 reading (a). */
(function(){const C=CV,m=C.mount('c5');if(!m)return C.ready();const {cv,h1,film,star}=m;
  h1.innerHTML=`<span class="cv-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw">${C.letter('Trade','cv-big')}<br>${C.letter('earnings','cv-big')}</span><span class="cv-qw"><span class="cv-q">Who calls it best?</span></span>`;
  const S=C.STEPS.a,pic=[C.P.calls('c5-mini'),C.P.clock('c5-mini'),C.P.ticket('c5-mini c5-tkm'),C.P.stack('c5-mini')];
  const mon=i=>`<li class="c5-m c5-m${i}" style="--i:${i}"><span class="c5-bz"><span class="c5-scr"><i class="c5-n">0${i+1}</i><span class="c5-w">${S[i]}</span><span class="c5-pic">${pic[i]}</span></span></span><i class="c5-st" aria-hidden="true"></i></li>`;
  const L=C.left(),items=L&&L.top?C.S.toCome().filter(x=>x.day===L.day).map(x=>C.S.tk(x.ticker)):[];
  const tape=()=>`<span>Season 1 · live</span><span>No. ${C.tot.g} graded</span><span>Next bell ${C.esc(C.closeDay())} 4 PM ET · in <b class="c5-cd">${C.esc(C.leftTxt())}</b></span><span>On the card: ${items.map(C.esc).join(' · ')}</span><span>Golden ticket: ${C.esc(C.S.NM[C.lead])}</span>`;
  cv.innerHTML=`<div class="c5-art"><video class="c5-bg" src="${C.IMG}v-floor-p-web.mp4" poster="${C.IMG}g-floor-p.jpg" muted autoplay loop playsinline aria-hidden="true"></video><video class="c5-bgd" src="${C.IMG}v-floor-d-web.mp4" poster="${C.IMG}g-floor-d.jpg" muted autoplay loop playsinline aria-hidden="true"></video>
      <div class="c5-top">${C.live()}</div><div class="c5-head"></div><div class="c5-cast"><small>Starring</small>${C.cast()}</div>
      <ol class="c5-loop" aria-label="How every round goes">${[0,1,2,3].map(mon).join('')}</ol></div>
    <div class="c5-tape" role="marquee" aria-label="Live tape"><div class="c5-tr">${tape()}${tape()}</div></div>
    <div class="c5-filmw"><span class="c5-fcap">How it works · 1:20</span></div>`;
  cv.querySelector('.c5-head').append(h1);cv.querySelector('.c5-filmw').append(film);
  if(matchMedia('(min-width:1000px)').matches)cv.querySelector('.c5-art').append(cv.querySelector('.c5-filmw'));
  C.every(()=>cv.querySelectorAll('.c5-cd').forEach(e=>e.textContent=C.leftTxt()));
  C.ready()})();
