/* S1 · The circuit: the fees run along the board's traces into the pool; the call is a junction that forks to a lit LED (right) or a blown fuse (wrong) */
BT.go((sec,D)=>{
 const st=`<div class="s1-row"><div class="s1-c">${BT2.gut(`<span class="big">${D.share}%</span> of $EZ creator fees fill the pool.`)}
  ${BT2.panel('s1-a')}</div>
  <div class="s1-c">${BT2.gut(`The pool gets bet on the top AI's call. Today that's ${BT2.lead(D)}.`)}
  ${BT2.panel('s1-b',`<p class="s1-o s1-ok" data-at="[800,40]"><em>Right</em><span>$EZ buyback</span></p><p class="s1-o s1-no" data-at="[880,410]"><em>Wrong</em><span>The pool can be wiped out</span></p>`)}</div></div>`;
 BT2.build(sec,D,st,'s1');
 BT.art(sec.querySelector('.s1-a .p2-art'),'traces-sd.jpg',1920,1080,()=>innerWidth<1000?[260,120,1600,800]:[200,60,1700,1000]);
 BT.art(sec.querySelector('.s1-b .p2-art'),'fork-gpt.jpg',1280,720,[0,20,1280,640]);
});
