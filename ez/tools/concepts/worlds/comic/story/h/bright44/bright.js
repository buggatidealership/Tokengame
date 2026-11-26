/* H44 bright (mockup): each Overview section after the top gets its own bright ground (window.__BR = 'A' or 'B'), laid behind the
   built X2+ page; the top (headline, How a round works, the film) keeps today's dark board. Layouts, words and paintings unchanged.
   A  Colour pages: one logo ink per chapter, printed flat like a comic's colour page, a Ben-Day shade only along its foot, a hard cut
      at the torn paper: the record on cream, the cast on gold, the test on sunlit green, the bet stays night, Up next on red.
   B  One trading day: the logo's colours as tints on cream, lit by the hour of a trading day from the top of each chapter:
      the record at the morning open (pale gold), the cast at midday (sky green), the test in the afternoon (warm coral),
      the bet at the close (night, as today), Up next the next morning (dawn rose).
   The ground layer is one absolutely placed block under main (z-index -1), cut at the middle of each tear; it is re-cut on resize. */
(function(){try{
const D=document,T=(window.__BR||'A').toUpperCase(),H=D.documentElement;H.classList.add('br-on','br-'+T);
const G={A:{record:['#f8f0d9','#efe1b9','lt'],ch:['#fdbc2a','#e9a20e','lt'],learn:['#3fd68c','#22b56f','lt'],x2pSt:['#04070e','#04070e','dk'],get:['#ff3a31','#e2261e','lt']},
         B:{record:['#fff7e3','#ffe39a','lt'],ch:['#effaf2','#c4ecd4','lt'],learn:['#fff0e6','#ffc6a8','lt'],x2pSt:['#0a0d16','#04070e','dk'],get:['#fff4ef','#ffd6cc','lt']}}[T];
const L=D.createElement('div');L.id='brG';L.setAttribute('aria-hidden','true');D.body.prepend(L);
function cut(){const M=D.querySelector('main'),y=e=>e.getBoundingClientRect().top+scrollY;let html='',last=null,open=null;
 const kids=[...M.children].filter(e=>e.getClientRects().length&&e.offsetHeight>2&&(e.tagName==='SECTION'||e.classList.contains('x2p-tear')));
 const close=at=>{if(!open)return;const g=open.g;html+=`<i class="br-g br-g-${open.k} br-${g[2]}" style="top:${open.t0}px;height:${at-open.t0}px;--g0:${g[0]};--g1:${g[1]}"></i>`;open=null};
 kids.forEach(e=>{if(e.classList.contains('x2p-tear')){const c=y(e)+e.offsetHeight/2;close(c);last=c;return}
  const k=e.id||(e.classList.contains('ch')?'ch':'');const g=G[k];e.classList.remove('br-lt','br-dk');if(!g)return;
  e.classList.add('br-'+g[2]);e.dataset.ground=g[0];e.dataset.brk=k;open={k,g,t0:last!=null?last:y(e)}});
 close(M.getBoundingClientRect().bottom+scrollY);
 L.style.height=H.scrollHeight+'px';L.innerHTML=html}
cut();let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;cut()}});D.fonts&&D.fonts.ready.then(cut);setTimeout(cut,800);
try{let q=0;new ResizeObserver(()=>{cancelAnimationFrame(q);q=requestAnimationFrame(cut)}).observe(D.querySelector('main'))}catch(e){}
window.__br={fit:cut,T};
}catch(e){window.__brErr=e}})();
