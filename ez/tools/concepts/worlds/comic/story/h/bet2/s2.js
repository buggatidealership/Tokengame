/* S2 · The scale: the pool weighed on the top AI's call; green pan = right, red pan = wrong. Every word on an engraved bronze plate in the scene */
BT.go((sec,D)=>{
 const pl=(c,at,w,html)=>`<div class="s2-pl ${c}" data-at='${at}' style="width:calc(${w}px*var(--k))"><div>${html}</div></div>`;
 const st=`${BT2.gut(`<span class="big">${D.share}%</span> of $EZ creator fees fill the pool.`)}
  ${BT2.gut(`The pool gets bet on the top AI's call. Today that's ${BT2.lead(D)}.`)}
  ${BT2.panel('s2-a',
pl('s2-ok','[70,560]',340,`<em>Right</em>$EZ buyback`)+
   pl('s2-no','[620,560]',330,`<em>Wrong</em>The pool can be wiped out`))}`;
 BT2.build(sec,D,st,'s2');
 BT.art(sec.querySelector('.s2-a .p2-art'),'scale-gpt.jpg',1024,768,[40,0,950,740]);
});
