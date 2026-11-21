/* H3 · The lenticular variant: the cover art is a lenticular card that flips through the loop's four steps on its own
   (stripes and a rainbow sheen as each one turns in), and round again; a tap turns it by hand. The masthead runs across the
   top; the cast stands along the foot as a roll call, the way team books line up their heroes. With reduced motion the card
   lies open as four still frames. */
(function(){const X=SH,S=X.S,m=X.mount('sh-h3');if(!m)return S.ready();const {cv,h1,film,star}=m;
  const fr=[0,1,2,3].map(i=>`<div class="sh-fr sh-fr${i+1}${i?'':' sh-on'}" data-i="${i}" role="listitem"><p class="sh-fq"><i class="sh-n">${i+1}</i><span>${X.STEP[i]}</span></p><div class="sh-fv">${X.V[i]()}</div></div>`).join('');
  const dots=[0,1,2,3].map(i=>`<button type="button" class="sh-dot${i?'':' sh-on'}" data-i="${i}" aria-label="Step ${i+1}: ${S.esc(X.STEP_T[i])}"><b>${i+1}</b></button>`).join('');
  cv.insertAdjacentHTML('afterbegin',X.issue()+`<div class="sh-mh3"></div>
    <div class="sh-art3"><div class="sh-lens" role="list" aria-label="How every round goes" tabindex="0">${fr}<i class="sh-sheen" aria-hidden="true"></i><span class="sh-lt" aria-hidden="true">Lenticular · tap to turn</span></div>
      <div class="sh-dots">${dots}<span class="sh-again" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.6-5.9" fill="none" stroke="#15121a" stroke-width="3" stroke-linecap="round"/><path d="M14 3l5 3-3 5" fill="none" stroke="#15121a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>Every round</span></div>
      ${X.guard()}</div><div class="sh-roll"></div>`);
  cv.querySelector('.sh-mh3').append(h1);cv.querySelector('.sh-roll').append(star);
  cv.querySelector('.sh-art3').after(film);film.classList.add('sh-film');
  const fc=film.querySelector('.wc-film-cap');if(fc)fc.textContent='Inside: how it works · 1:20';
  const L=cv.querySelector('.sh-lens'),F=[...L.querySelectorAll('.sh-fr')],Dt=[...cv.querySelectorAll('.sh-dot')];let cur=0,tm=null,vis=true;
  const go=n=>{if(n===cur)return;const a=F[cur],b=F[n];F.forEach(f=>f.classList.remove('sh-in','sh-out'));a.classList.add('sh-out');a.classList.remove('sh-on');b.classList.add('sh-on','sh-in');
    L.classList.remove('sh-flip');void L.offsetWidth;L.classList.add('sh-flip');Dt.forEach((d,i)=>d.classList.toggle('sh-on',i===n));cur=n;
    cv.querySelector('.sh-dots').style.setProperty('--k',n)};
  const run=()=>{clearInterval(tm);if(S.rm()||!vis)return;tm=setInterval(()=>{if(!S.D.hidden)go((cur+1)%4)},3400)};
  if(S.rm())cv.classList.add('sh-still');
  L.addEventListener('click',()=>{go((cur+1)%4);run()});
  L.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='Enter'||e.key===' '){e.preventDefault();go((cur+1)%4);run()}else if(e.key==='ArrowLeft'){go((cur+3)%4);run()}});
  Dt.forEach((d,i)=>d.addEventListener('click',()=>{go(i);run()}));
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;run()},{threshold:.2}).observe(L);
  window.__shStop=()=>{clearInterval(tm);vis=false;F.forEach(f=>f.classList.remove('sh-in','sh-out'))};
  run();S.ready()})();
