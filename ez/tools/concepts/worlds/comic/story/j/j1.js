/* J1 · Moving pictures. Every round's tile in "Every round so far" becomes a cinemagraph cut from that round's own film:
   one thing in the picture keeps quietly moving (the balloon letters turning, a monitor flashing, the board's lights)
   while the rest holds still, like the portraits in Harry Potter. The loop is an animated WebP of 1.5 s (18 frames,
   280 px, median 46 KB) in a plain <img loading=lazy>: no video element, nothing to tap, it still runs in iPhone
   Low Power Mode (which stops muted autoplay video), and the browser only decodes it while it is on screen.
   Rounds without a film keep their logo. Reduced motion: the poster, as today. window.__sjVid=1 swaps in tiny mp4
   loops of the same cinemagraph, for the cost comparison only. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j1');
const B='tools/concepts/worlds/comic/story/j/cg/';
const have=new Set((window.__sjCG||'').split(',').filter(Boolean));
const rm=sjRM();
D.querySelectorAll('.wc-bi').forEach(a=>{const n=+(a.getAttribute('href')||'').replace(/\D/g,'');if(!have.has(String(n)))return;
  const im=a.querySelector('.wc-bi-art img:not(.wc-lgimg)');if(!im||rm)return;
  if(window.__sjVid){const v=D.createElement('video');v.muted=true;v.loop=true;v.playsInline=true;v.autoplay=true;v.preload='none';v.setAttribute('muted','');v.setAttribute('playsinline','');
    v.poster=im.src;v.src=B+'r'+n+'-cg.mp4';v.className='sj-cgv';im.replaceWith(v);
    const io=new IntersectionObserver(es=>es.forEach(e=>{e.isIntersecting?v.play().catch(()=>{}):v.pause()}));io.observe(v)}
  else{im.dataset.sjP=im.src;im.loading='lazy';im.decoding='async';im.src=B+'r'+n+'.webp';a.classList.add('sj-cg')}});
window.__sjToggle=on=>{D.querySelectorAll('.sj-cg img').forEach(i=>{const n=+(i.closest('.wc-bi').getAttribute('href')||'').replace(/\D/g,'');i.src=on?B+'r'+n+'.webp':i.dataset.sjP});D.querySelectorAll('video.sj-cgv').forEach(v=>on?v.play().catch(()=>{}):v.pause())};
H.classList.add('sj-ready-j1')})();
