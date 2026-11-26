/* P2 · Stamped window. A second copy of the bill's stubs printed under "The scoreboard" head, and every ticket rubber-stamped
   with the window its numbers count (re-stamped when the window changes: the stamp is the proof the card changed).
   Ground: the dollar bill the site already prints (panel 4), mint and green ink for a window in profit, red ink for a loss. */
(function(){const S=SP,D=document;
window.SPT={id:'p2',cls:'sp-p2',
 mount(){const h=D.querySelector('#wc-lb .wc-sbd .wc-h2');if(h)h.insertAdjacentHTML('afterend',`<div class="sp-hc"><span class="sp-hcl">Count P&amp;L over</span>${S.ctl('sp-c2')}</div>`)},
 card(el,m,x,prev,anim){let st=el.querySelector('.sp-stp');if(!st){el.insertAdjacentHTML('beforeend','<span class="sp-stp" aria-hidden="true"></span>');st=el.querySelector('.sp-stp')}
  st.innerHTML=`<b>${x.k==='season'?'Season':x.k==='d1'?'Last<br>24 hours':'Last<br>7 days'}</b><small>${S.esc(x.when)}</small>`;
  const tilt=[-11,-7,-13,-9][(+el.style.order||0)%4];st.style.setProperty('--r',tilt+'deg');
  if(anim&&prev&&!S.RM())st.animate([{transform:`rotate(${tilt}deg) scale(1.7)`,opacity:0},{transform:`rotate(${tilt}deg) scale(.94)`,opacity:1,offset:.7},{transform:`rotate(${tilt}deg) scale(1)`,opacity:1}],{duration:340,delay:80*(+el.style.order||0),easing:'cubic-bezier(.5,0,.7,.4)',fill:'backwards'});}};
S.mount();})();
