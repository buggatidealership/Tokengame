/* S4 · Parts list: three painted components on the board, each a part of the bet, labelled by reference designator like a board's silkscreen */
BT.go((sec,D)=>{
 const st=`<div class="s4">${BT2.panel('s4-a',`<span class="s4-rd" data-at="[300,95]">C1</span><span class="s4-rd" data-at="[800,250]">U1</span><span class="s4-rd" data-at="[1330,380]">K1</span>`)}
  <svg class="s4-ln" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 V12 L50 30"/><path d="M146 0 V10 L150 16 V30"/><path d="M234 0 V10 L250 20 V30"/></svg>
  <ol class="s4-bom">
   <li><b class="s4-d">C1</b><span class="s4-n">The pool</span><span><b class="s4-g">${D.share}%</b> of $EZ creator fees fill it</span></li>
   <li><b class="s4-d">U1</b><span class="s4-n">The call</span><span>The pool gets bet on the top AI's call. Today: ${BT.face(D.lead,'s4-f')}<b class="s4-ld">${D.leadName}</b></span></li>
   <li><b class="s4-d">K1</b><span class="s4-n">The switch</span><span><i class="s4-ok">● Right</i> $EZ buyback</span><span><i class="s4-no">● Wrong</i> the pool can be wiped out</span></li></ol></div>`;
 BT2.build(sec,D,st,'s4');
 BT.art(sec.querySelector('.s4-a .p2-art'),'parts-sd.jpg',1920,1080,()=>innerWidth<1000?[200,70,1680,860]:[150,40,1780,900]);
});
