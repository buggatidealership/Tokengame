/* T1 · Bulls vs bears: every card is a two-corner fight. The 🐂 corner holds the AIs that say up, the 🐻 corner the ones that say down;
   each says its number in a balloon. A lone AI in its corner stands bigger (one against three is the story), so no corner is ever empty. */
(async function(){const X=WW;
  const side=(cs,up)=>{const n=cs.length,sz=n===1?'ww1x':n===2?'ww2x':'ww3x';
    return `<div class="ww-co ${up?'ww-cu':'ww-cd'} ${sz}"><i class="ww-an">${up?'🐂':'🐻'}</i>${n?cs.map((c,i)=>`<p class="ww-sp" style="--i:${i}">${X.face(c.m,'ww-tf')}<span class="ww-bl"><small>${X.NM[c.m]}</small>${c.up?'Up':'Down'} ${c.mag}%</span></p>`).join(''):`<p class="ww-none">No ${up?'bulls':'bears'}</p>`}</div>`};
  await X.tn((p,cs)=>{const U=cs.filter(c=>c.up),Dn=cs.filter(c=>!c.up);
    return `<div class="ww-ring" style="--u:${U.length};--d:${Dn.length}">${side(U,true)}<i class="ww-vs">VS</i>${side(Dn,false)}</div>`},'ww-t1');
  X.ready('t1')})();
