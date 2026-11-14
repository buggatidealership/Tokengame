/* P3's thumb dock (owner, 2026-10-30: "P3... by far the best one"): while the scoreboard is on screen and its own Season / 24h /
   7 days switch has scrolled away, the same three windows float at the bottom in thumb reach. It only calls the page's
   __wc11Show, so the fight bill, the board and the dock always show one window. */
(function(){const S=window.SS,D=document,host=D.querySelector('#wc-lb .ss-host');if(!S||!host||D.querySelector('.sb-dock'))return;
D.body.insertAdjacentHTML('beforeend',`<div class="sb-dock" role="group" aria-label="Scoreboard time window"><span class="sb-dl">Scoreboard P&amp;L over</span><div class="sb-ctl">${S.WS.map(w=>`<button type="button" class="sb-b" data-k="${w.k}" aria-pressed="false"><b>${w.short}</b></button>`).join('')}</div></div>`);
const dk=D.querySelector('.sb-dock'),bs=[...dk.querySelectorAll('.sb-b')];dk.inert=true;
bs.forEach(b=>b.addEventListener('click',()=>window.__wc11Show(b.dataset.k,!S.RM())));
const sync=()=>{const k=S.cur();bs.forEach(b=>{const on=b.dataset.k===k;b.setAttribute('aria-pressed',on);b.classList.toggle('sb-on',on)})};sync();
D.querySelectorAll('#wc-lb .wc11n-stub').forEach(b=>new MutationObserver(sync).observe(b,{attributes:true,attributeFilter:['aria-selected']}));
const lift=()=>{const cw=D.querySelector('body > .x2p-cw');dk.style.bottom=((cw&&cw.offsetHeight&&getComputedStyle(cw).display!=='none'?cw.offsetHeight:0)+14)+'px'};lift();addEventListener('resize',lift);
const s={b:false,w:true},sw=host.querySelector('.ss-sw'),show=()=>{const on=s.b&&!s.w;dk.classList.toggle('sb-show',on);dk.inert=!on};
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.target===host)s.b=e.isIntersecting;else s.w=e.isIntersecting});show()},{rootMargin:'-110px 0px -80px 0px'});
io.observe(host);if(sw)io.observe(sw)})();
