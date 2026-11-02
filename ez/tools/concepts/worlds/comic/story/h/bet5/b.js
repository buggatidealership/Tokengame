/* bet5 take B, "One chip, then right | wrong" (round H28): bet4 B's chip carries the heading, the date tab, the countdown in its
   four dies and one caption drawn into the plate with the owner's two sentences (69% from SIM.poolShare); then A's split: two
   crops of the same painting's rim light, the green-lit pins (RIGHT) and the red-lit pins (WRONG); then the closing line. */
(function(){
B5.mount(Dt=>{
  const pan=(cls,crop,at,word,line,w)=>`<div class="b5-art b5b-o ${cls}" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="${crop}">
    <div class="b5-at" data-at="${at}"><span class="${w}">${word}</span><span class="b5-ol">${line}</span></div></div>`;
  return `<div class="b5b">
   <div class="b5-art b5-bleed b5b-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,-10,930,935]|[-40,-20,2210,820]" role="group" aria-labelledby="b5H">
    <div class="b5-at b5b-t" data-at="[616,6]|[-20,4]"><h2 class="hb-h" id="b5H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2></div>
    <div class="b5-at b5b-w" data-at="[624,205]|[-10,200]"><span class="b5b-tab">At the close · ${Dt.dayS}</span></div>
    <div class="b5b-dies" role="timer" aria-live="off">${B5.dies()}</div>
    <div class="b5-at b5b-c" data-at="[612,712]|[1630,250]"><div class="bd-c"><span>${B5.say(Dt,'b5b-s')}</span></div></div>
   </div>
   <div class="b5b-two b5-bleed">
    ${pan('b5b-g','[600,830,560,410]|[560,780,1048,340]','[624,1050]|[600,1000]','Right','Profits buy back $EZ','b5-ok')}
    ${pan('b5b-r','[1400,600,560,410]|[1000,620,1048,340]','[1420,824]|[1460,820]','Wrong','The pool can be wiped out','b5-no')}
   </div>
   <p class="b5-cl b5b-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div>`});
})();
