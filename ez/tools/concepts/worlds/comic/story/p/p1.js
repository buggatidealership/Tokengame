/* P1 · The docked bill. While the scoreboard is on screen and the fight bill's stubs have scrolled away, the same three stubs
   dock under the header as a slim ticket strip (a copy that only calls the live bill). Ground: Season 1 ticket stock printed
   with the model's own mark as a security print. */
(function(){const S=SP,D=document;
const tile=m=>{const M=S.MODELS[m],c=S.col(m),o=m==='GROK'?.09:.13,p=`<path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}`;
  const g=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(.62)" fill="${c}" fill-opacity="${o}">${p}</g>`;
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">${g(4,6,-8)}${g(32,34,-8)}</svg>`)}")`};
window.SPT={id:'p1',cls:'sp-p1',
 mount(){D.body.insertAdjacentHTML('beforeend',`<div class="sp-dock sp-d1"><span class="sp-dl">Scoreboard P&amp;L over</span>${S.ctl('sp-c1')}</div>`);
  /* the dock rides on the header's bottom edge (the header slides away on scroll down): followed every frame, only while shown */
  const dk=D.querySelector('.sp-d1'),hd=D.querySelector('header.top');let on=false;const pos=()=>{dk.style.top=Math.max(0,hd.getBoundingClientRect().bottom)+'px';if(on)requestAnimationFrame(pos)};
  pos();S.watch(s=>{const was=on;on=s.sb&&!s.st;dk.classList.toggle('sp-show',on);dk.inert=!on;if(on&&!was)pos()})},
 card(el,m,x,prev,anim){const cap=el.querySelector('.wc9-cap');cap.style.setProperty('--sp-tile',tile(m));
}};
S.mount();})();
