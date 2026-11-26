/* bet4 take A, "Say it first": the words come before the pictures (lesson 135's other way). The bet in one lettered sentence
   under the heading, then the chip with the countdown and its date tab, then the two outcomes, each lit by the chip's own rim
   light (crops of media/bet-chip-h2.jpg: the green-lit pins, the red-lit pins), then the closing line. No vault, no board. */
(function(){
B4.mount(Dt=>{
  const lead=Dt.name?` Today's #1: ${B4.face(Dt.lead)}<b class="b4a-ld">${Dt.name}</b>.`:'';
  const pan=(cls,crop,at,word,line,w)=>`<div class="b4-art b4a-o ${cls}" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="${crop}">
    <div class="b4-at" data-at="${at}"><span class="${w}">${word}</span><span class="b4-ol">${line}</span></div></div>`;
  return `<div class="b4a">
   <div class="b4a-say">
    <h2 class="hb-h" id="b4H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>
    <p class="b4a-hl"><span class="g">The whole pool</span> rides on <span class="g">#1's call.</span></p>
    <p class="b4a-dk"><b class="b4a-n">${Dt.share}%</b> of $EZ creator fees fill the pool.${lead}</p>
   </div>
   <div class="b4-art b4-bleed b4a-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,318,896,430]|[420,150,1200,860]" role="timer" aria-live="off">
    ${B4.dies()}
    <div class="b4-at b4a-w" data-at="[612,330]|[440,175]"><span class="b4a-tab">At the close · ${Dt.dayS}</span></div>
   </div>
   <div class="b4a-two b4-bleed">
    ${pan('b4a-g','[600,770,560,470]|[560,742,1048,380]','[624,1004]|[600,992]','Right','Profits buy back $EZ','b4-ok')}
    ${pan('b4a-r','[1480,590,560,470]|[1000,640,1048,380]','[1500,824]|[1460,890]','Wrong','The pool can be wiped out','b4-no')}
   </div>
   <p class="b4-cl b4a-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div>`});
})();
