/* bet5 take D, "Plain" (round H28, the simplest: one picture). The heading and the owner's two sentences, then the chip
   (its countdown in the four dies, the date on its tab), then right and wrong as two lit words with their lines, and the
   closing line, all in one block of words under the picture. No crops, no captions in the plate, no vault, no board. */
(function(){
B5.mount(Dt=>`<div class="b5d">
   <div class="b5d-say">
    <h2 class="hb-h" id="b5H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>
    ${B5.say(Dt)}
   </div>
   <div class="b5-art b5-bleed b5d-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,318,896,520]|[380,180,1330,880]" role="timer" aria-live="off">
    ${B5.dies()}
    <div class="b5-at" data-at="[612,330]|[400,200]"><span class="b5d-tab">At the close · ${Dt.dayS}</span></div>
   </div>
   <div class="b5d-out">
    <p class="b5d-o"><span class="b5-ok">Right</span><span class="b5d-l">Profits buy back $EZ.</span></p>
    <p class="b5d-o"><span class="b5-no">Wrong</span><span class="b5d-l">The pool can be wiped out.</span></p>
    <p class="b5-cl b5d-cl">NVIDIA is the first bet, <b>not the last.</b></p>
   </div>
  </div>`);
})();
