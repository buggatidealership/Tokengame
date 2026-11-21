/* bet4 take B, "One chip": the whole bet in one picture. The chip painting (media/bet-chip-h2.jpg) carries every fact:
   the title lettered in its light, the time on a printed tab, the countdown in its four dies, one caption drawn into the board
   (the pool and whose call), RIGHT under the green-lit pins, WRONG under the red-lit pins, and the closing line on the ground.
   Phones: a tall crop that runs past the painting's foot onto its own black; desktop: the whole painting with a margin of black. */
(function(){
B4.mount(Dt=>{
  const lead=Dt.name?`Today: ${B4.face(Dt.lead)}<b>${Dt.name}</b>`:'';
  return `<div class="b4-art b4-bleed b4b" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,-10,930,1290]|[-90,-30,2228,1250]" role="group" aria-labelledby="b4H">
   <div class="b4-at b4b-t" data-at="[616,6]|[-50,0]"><h2 class="hb-h" id="b4H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2></div>
   <div class="b4-at b4b-w" data-at="[624,205]|[-40,232]"><span class="b4b-tab">At the close · ${Dt.dayS}</span></div>
   <div class="b4b-dies" role="timer" aria-live="off">${B4.dies()}</div>
   ${B4.cap(`<b>${Dt.share}%</b> of $EZ creator fees fill the pool. It rides on #1's call. ${lead}`,'b4b-c','[612,706]|[-60,470]')}
   <div class="b4-at b4b-r" data-at="[618,1050]|[640,1030]"><span class="b4-ok">Right</span><span class="b4-ol">Profits buy back $EZ</span></div>
   <div class="b4-at b4b-x" data-at="[1040,1050]|[1770,760]"><span class="b4-no">Wrong</span><span class="b4-ol">The pool can be wiped out</span></div>
   <div class="b4-at b4b-e" data-at="[620,1206]|[1180,1112]"><p class="b4-cl">NVIDIA is the first bet, <b>not the last.</b></p></div>
  </div>`});
})();
