/* C1 · Two corners: each ticket is a ring; the AIs that called up sit in the green corner, the ones that called down in the red.
   Replaces the "1 up / 3 down" bar and the four rows. */
(function(){const {D,NM,face,calls,seen}=SB;
  const seat=c=>`<span class="sb-rg-s">${face(c.m,'wc-f-s').replace('<i ','<i data-sb-l ')}<b data-sb-l>${c.mag}%</b></span>`;
  const side=(cs,up)=>`<div class="sb-rg-c ${up?'sb-rg-u':'sb-rg-d'}"><span class="sb-rg-h">${up?'Up':'Down'}</span>${cs.length?cs.map(seat).join(''):`<span class="sb-rg-e">Empty corner</span>`}</div>`;
  function build(t){t.querySelector('.sb-ring')?.remove();const cs=calls(t),u=cs.filter(c=>c.up),d=cs.filter(c=>!c.up);
    const sr=`${u.length} up: ${u.map(c=>NM[c.m]+' up '+c.mag+'%').join(', ')||'nobody'}. ${d.length} down: ${d.map(c=>NM[c.m]+' down '+c.mag+'%').join(', ')||'nobody'}.`;
    t.querySelector('.wc-lvc').insertAdjacentHTML('beforebegin',`<div class="sb-ring" data-sb-box role="img" aria-label="${sr}"><i class="sb-rg-rp" aria-hidden="true"></i>${side(u,1)}<span class="sb-rg-vs" aria-hidden="true">vs</span>${side(d,0)}</div>`);
    t.classList.add('sb-c1');seen(t.querySelector('.sb-ring'))}
  D.querySelectorAll('.wc-cliff .wc-tnp').forEach(build);window.__sbFake4=()=>SB.fake4(build);
  D.documentElement.classList.add('sb-ok-c1')})();
