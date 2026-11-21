/* C2 · Round the clock. Story: every round goes round the clock once, and the clock is real: its hands are New York's time now, the red pip is the 4 PM close,
   and on a report day a red wedge shows what is left before the bell. The four steps sit in the clock's four quarters, read clockwise. Step 4 reading (a). */
(function(){const C=CV,m=C.mount('c2');if(!m)return C.ready();const {cv,h1,film,star}=m;
  h1.innerHTML=`<span class="cv-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw">${C.letter('Trade','cv-big')} ${C.letter('earnings','cv-big')}</span><span class="cv-qw"><span class="cv-q">Who calls it best?</span></span>`;
  const RD=window.__cvRead==='b'?'b':'a',S=C.STEPS[RD],pic=[C.P.calls('c2-mini'),C.P.bell('c2-mini c2-bellm'),C.P.ticket('c2-mini c2-tkm'),RD==='b'?C.P.pool('c2-mini c2-poolm'):C.P.stack('c2-mini')];
  const q=i=>`<li class="c2-q c2-q${i}" style="--i:${i}"><span class="c2-tag"><i class="c2-n">${i+1}</i><span class="c2-w">${S[i]}</span></span><span class="c2-pic">${pic[i]}</span></li>`;
  cv.innerHTML=`<div class="c2-art"><video class="c2-bg" src="${C.IMG}v-clock-p-web.mp4" poster="${C.IMG}g-clock-p.jpg" muted autoplay loop playsinline aria-hidden="true"></video><video class="c2-bgd" src="${C.IMG}v-clock-d-web.mp4" poster="${C.IMG}g-clock-d.jpg" muted autoplay loop playsinline aria-hidden="true"></video>
      <div class="c2-top">${C.live()}<span class="c2-no">No. ${C.tot.g}<small>graded</small></span></div>
      <div class="c2-head"></div><div class="c2-cast"><small>Starring</small>${C.cast()}</div>
      <div class="c2-dial"><ol class="c2-loop" aria-label="How every round goes, clockwise">${q(0)}${q(1)}${q(2)}${q(3)}</ol>
        <div class="c2-clockw">${C.P.clock('c2-clock')}<svg class="c2-arc" viewBox="0 0 200 200" aria-hidden="true"><path d="M112 14A86 86 0 0 1 186 88"/><path d="M186 112A86 86 0 0 1 112 186"/><path d="M88 186A86 86 0 0 1 14 112"/><path d="M14 88A86 86 0 0 1 88 14"/>
          <path class="c2-ah" d="M180 78l7 12 6-13zM122 180l-12 7 13 6zM20 122l-7-12-6 13zM78 20l12-7-13-6z"/></svg></div>
        <span class="c2-plate"><small>Bell in</small>${C.cdown()}<small class="c2-pd">${C.esc(C.closeDay())} · 4 PM New York</small></span></div></div>
    <div class="c2-filmw"><span class="c2-fcap">How it works · 1:20</span></div>`;
  cv.querySelector('.c2-head').append(h1);cv.querySelector('.c2-filmw').append(film);
  if(matchMedia('(min-width:1000px)').matches)cv.querySelector('.c2-art').append(cv.querySelector('.c2-filmw'));
  C.ready()})();
