/* T2 · The shouting match: no boxes at all. Each AI shouts its call as sound-effect lettering straight out of its face: "UP" climbs,
   "DOWN" sinks, and the bigger the call the bigger the letters. Speakers take turns left and right like a conversation;
   a lone voice against the rest gets the last word, set apart under a lightning split. */
(async function(){const X=WW;
  const sz=v=>Math.max(14,Math.min(24,12+Math.abs(+v)*1.6));      /* conviction: the size of the call sets the size of the letters */
  await X.tn((p,cs,u)=>{const lone=u===1?cs.find(c=>c.up):u===cs.length-1?cs.find(c=>!c.up):null;
    const rest=cs.filter(c=>c!==lone),order=lone?rest.concat([lone]):cs;
    return `<div class="ww-sh">${order.map((c,i)=>`${c===lone?'<i class="ww-zz" aria-hidden="true"></i>':''}<p class="ww-ln ${c.up?'ww-lu':'ww-ld'}${i%2?' ww-rt':''}${c===lone?' ww-lone':''}" style="--fs:${sz(c.mag)}px">${X.face(c.m,'ww-tf')}<span class="ww-who">${X.NM[c.m]}</span><b class="ww-yl">${c.up?'Up':'Down'} ${c.mag}%!<i>${c.up?'↗':'↘'}</i></b></p>`).join('')}</div>`},'ww-t2');
  X.ready('t2')})();
