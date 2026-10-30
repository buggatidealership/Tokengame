/* P3 · Thumb dock and the fighters' colours. While the scoreboard is on screen a ticket-shaped switch floats at the bottom, in
   thumb reach (the same three windows; it only calls the live bill). Each card is painted in its AI's own colour with a Ben-Day
   screen (the fight panel's corners, lesson 48); the numbers sit on cream caption strips. Beside Last 5: the AI's P&L as a bar
   on one scale shared by all four cards, so the ranking reads card to card; the others are thin ticks in their colours. */
(function(){const S=SP,D=document;
const bar=(m,x)=>{const vs=S.ORDER.map(k=>x.amt[k]),lo=Math.min(0,...vs),hi=Math.max(0,...vs),sp=(hi-lo)||1,P=v=>((v-lo)/sp*100),z=P(0),v=x.amt[m],a=P(v);
  return `<span class="sp-k">Vs the others</span><span class="sp-bt" style="--z:${z.toFixed(2)}%">
   ${S.ORDER.filter(k=>k!==m).map(k=>`<i class="sp-bk" style="left:${P(x.amt[k]).toFixed(2)}%;--c:${S.col(k)}" title="${S.NM[k]}"></i>`).join('')}
   <b class="sp-bb ${v>=0?'sp-bu':'sp-bd'}" style="left:${Math.min(z,a).toFixed(2)}%;width:${Math.abs(a-z).toFixed(2)}%"></b><i class="sp-b0"></i></span>`};
window.SPT={id:'p3',cls:'sp-p3',
 mount(){D.body.insertAdjacentHTML('beforeend',`<div class="sp-dock sp-d3"><span class="sp-dl">Scoreboard P&amp;L over</span>${S.ctl('sp-c3')}</div>`);
  const dk=D.querySelector('.sp-d3'),cw=D.querySelector('body > .x2p-cw');dk.style.bottom=((cw&&cw.offsetHeight&&getComputedStyle(cw).display!=='none'?cw.offsetHeight:0)+14)+'px';S.watch(s=>{const on=s.sb&&!s.st;dk.classList.toggle('sp-show',on);dk.inert=!on})},
 card(el,m,x,prev,anim){el.querySelector('.wc9-cap').style.setProperty('--mcc',S.col(m));el.style.setProperty('--mcc',S.col(m));
  const f=el.querySelector('.sp-fill');f.innerHTML=bar(m,x);
  if(anim&&!S.RM()){const b=f.querySelector('.sp-bb');b.animate([{transform:'scaleX(0)'},{transform:'none'}],{duration:520,easing:'cubic-bezier(.3,.9,.3,1)'})}}};
S.mount();})();
