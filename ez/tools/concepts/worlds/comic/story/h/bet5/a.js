/* bet5 take A, "Say it first", with the owner's words (round H28): the heading, then the bet said plainly in two sentences
   (the 69% from SIM.poolShare), then the chip with its countdown and date tab, then the two outcomes, each lit by the chip's own
   rim light (crops of media/bet-chip-h2.jpg: the green-lit pins, the red-lit pins), then the closing line. No vault, no board. */
(function(){
B5.mount(Dt=>{
  const pan=(cls,crop,at,word,line,w)=>`<div class="b5-art b5a-o ${cls}" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="${crop}">
    <div class="b5-at" data-at="${at}"><span class="${w}">${word}</span><span class="b5-ol">${line}</span></div></div>`;
  return `<div class="b5a">
   <div class="b5a-say">
    <h2 class="hb-h" id="b5H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>
    ${B5.say(Dt,'b5a-dk')}
   </div>
   <div class="b5-art b5-bleed b5a-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,318,896,430]|[420,150,1200,860]" role="timer" aria-live="off">
    ${B5.dies()}
    <div class="b5-at b5a-w" data-at="[612,330]|[440,175]"><span class="b5a-tab">At the close · ${Dt.dayS}</span></div>
   </div>
   <div class="b5a-two b5-bleed">
    ${pan('b5a-g','[600,770,560,470]|[560,742,1048,380]','[624,1004]|[600,992]','Right','Profits buy back $EZ','b5-ok')}
    ${pan('b5a-r','[1480,590,560,470]|[1000,640,1048,380]','[1500,824]|[1460,890]','Wrong','The pool can be wiped out','b5-no')}
   </div>
   <p class="b5-cl b5a-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div>`});
})();
