/* lb · mount: turns the built X2+ page into its Leaderboard tab for a mockup. A "Leaderboard" tab is added to the header and selected,
   every Overview section is hidden (kept in the DOM), and one <section id="lbx"> takes their place with the page's own heading lettering.
   window.__LB(take) builds take a|b|c from window.LBT[take]. */
(function(){
const D=document;
window.__LB=function(take){
  const nav=D.querySelector('header nav.nav');
  if(nav&&!nav.querySelector('[data-r="leaderboard"]')){nav.querySelectorAll('a').forEach(a=>a.removeAttribute('aria-current'));
    const a=D.createElement('a');a.href='#/leaderboard';a.dataset.r='leaderboard';a.textContent='Leaderboard';a.setAttribute('aria-current','page');
    const up=nav.querySelector('[data-r="upcoming"]');nav.insertBefore(a,up)}
  const main=D.querySelector('main');[...main.children].forEach(c=>{if(c.id!=='lbx')c.style.setProperty('display','none','important')});
  D.querySelectorAll('footer, .x2p-cw, #x2pDock, .crawl').forEach(x=>x.style.setProperty('display','none','important'));
  let s=D.getElementById('lbx');if(s)s.remove();
  s=D.createElement('section');s.id='lbx';s.className='lbx lb-'+take;s.setAttribute('aria-label','Leaderboard');
  s.innerHTML=`<h2 class="lb-h"><span class="lb-hw">Leaderboard</span></h2><div class="lb-body"></div>`;
  main.prepend(s);window.scrollTo(0,0);
  const d=LBD.data();window.LBT[take](s.querySelector('.lb-body'),d);return d};
})();
