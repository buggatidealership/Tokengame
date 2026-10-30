/* C3 · Torn in two: the ticket's call stub tears along a perforation into an Up half and a Down half; each AI's pill sits on the
   half it picked, so the bigger side is the bigger half. A 4 vs 0 ticket stays whole. Replaces the "1 up / 3 down" bar. */
(function(){const {D,NM,face,calls,seen}=SB;
  const pill=c=>`<div class="wc-lvs ${c.up?'wc-lvu':'wc-lvd'}">${face(c.m,'wc-f-s')}<p data-sb-l><small>${NM[c.m]}</small>${c.up?'Up':'Down'} ${c.mag}%</p></div>`;
  const half=(cs,up,whole)=>cs.length?`<div class="sb-tr-w ${up?'sb-tr-u':'sb-tr-d'}${whole?' sb-tr-1':''}"><div class="sb-tr-h"><span class="sb-tr-t" aria-hidden="true">${up?'▲ Up':'▼ Down'}</span>${cs.map(pill).join('')}</div></div>`:'';
  function build(t){t.querySelector('.sb-tr')?.remove();const cs=calls(t),u=cs.filter(c=>c.up),d=cs.filter(c=>!c.up),whole=!u.length||!d.length;
    t.querySelector('.wc-lvc').insertAdjacentHTML('beforebegin',`<div class="sb-tr${whole?' sb-tr-whole':''}" data-sb-box aria-label="${u.length} up, ${d.length} down">${half(u,1,whole)}${half(d,0,whole)}${whole?`<span class="sb-tr-st" aria-hidden="true">No split</span>`:''}</div>`);
    t.classList.add('sb-c3');seen(t.querySelector('.sb-tr'))}
  D.querySelectorAll('.wc-cliff .wc-tnp').forEach(build);window.__sbFake4=()=>SB.fake4(build);
  D.documentElement.classList.add('sb-ok-c3')})();
