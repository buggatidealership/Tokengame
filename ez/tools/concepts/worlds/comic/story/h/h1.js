/* H1 · The loop, alive: a Silver Age front. Trade dress (issue strip, corner box with the cast, the masthead), and the cover art
   is the loop itself: four living panels in a ring, one lit after the other, round and round. The film is the inside page. */
(function(){const X=SH,S=X.S,m=X.mount('sh-h1');if(!m)return S.ready();const {cv,h1,film,star}=m;
  const P=[0,1,2,3].map(i=>`<div class="sh-p sh-p${i+1}" role="listitem" style="--i:${i}"><p class="sh-c"><i class="sh-n">${i+1}</i><span>${X.STEP[i]}</span></p><div class="sh-vw">${X.V[i]()}</div></div>`).join('');
  const AR=['r','d','l','u'].map((d,i)=>`<i class="sh-ar sh-ar-${d}" style="--i:${i}" aria-hidden="true"></i>`).join('');
  cv.insertAdjacentHTML('afterbegin',X.issue()+`<div class="sh-mast"><div class="sh-cb"></div></div>`);
  const mast=cv.querySelector('.sh-mast');mast.querySelector('.sh-cb').append(star);mast.append(h1);
  mast.insertAdjacentHTML('afterend',`<div class="sh-art"><div class="sh-grid" role="list" aria-label="How every round goes">${P}${AR}<span class="sh-hub" aria-hidden="true"><svg viewBox="0 0 60 60"><g class="sh-hubr"><path d="M30 6a24 24 0 0 1 23 17" fill="none" stroke="#15121a" stroke-width="4"/><path d="M48 18l6 7 3-9z" fill="#15121a"/>
      <path d="M30 54A24 24 0 0 1 7 37" fill="none" stroke="#15121a" stroke-width="4"/><path d="M12 42l-6-7-3 9z" fill="#15121a"/></g></svg><b>Every<br>round</b></span></div>${X.guard()}</div>`);
  film.classList.add('sh-film');cv.querySelector('.sh-art').after(film);film.insertAdjacentHTML('afterend',X.guard().replace('class="sh-gd"','class="sh-gd sh-dgd" aria-hidden="true"'));
  const cap=film.querySelector('.wc-film-cap');if(cap)cap.textContent='Inside: how it works · 1:20';
  S.ready()})();
