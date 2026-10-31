/* P3 · Thumb dock and the fighters' colours. While the scoreboard is on screen a ticket-shaped switch floats at the bottom, in
   thumb reach (the same three windows; it only calls the live bill). Each card is painted in its AI's own colour with a Ben-Day
   screen (the fight panel's corners, lesson 48); the numbers sit on cream caption strips. */
(function(){const S=SP,D=document;
window.SPT={id:'p3',cls:'sp-p3',
 mount(){D.body.insertAdjacentHTML('beforeend',`<div class="sp-dock sp-d3"><span class="sp-dl">Scoreboard P&amp;L over</span>${S.ctl('sp-c3')}</div>`);
  const dk=D.querySelector('.sp-d3'),cw=D.querySelector('body > .x2p-cw');dk.style.bottom=((cw&&cw.offsetHeight&&getComputedStyle(cw).display!=='none'?cw.offsetHeight:0)+14)+'px';S.watch(s=>{const on=s.sb&&!s.st;dk.classList.toggle('sp-show',on);dk.inert=!on})},
 card(el,m,x,prev,anim){el.querySelector('.wc9-cap').style.setProperty('--mcc',S.col(m));el.style.setProperty('--mcc',S.col(m));}};
S.mount();})();
