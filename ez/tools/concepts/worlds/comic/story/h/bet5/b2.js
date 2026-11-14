/* bet5 take B2 (owner's notes on B, round H28): the heading laid onto the chip where the date tab was, with "At the close ·
   <date>" beside it on the same row; the countdown in the dies; the K2 caption with the owner's new words (69% from
   SIM.poolShare) sits ON the seam between the chip and the RIGHT / WRONG crops, centred on it and on the seam between the two
   crops, so the lines are hidden there; then the closing line. */
(function(){
const md=at=>new Date(at).toLocaleDateString('en-US',{timeZone:'America/New_York',month:'short',day:'numeric'});
B5.after=function(box){const st=box.querySelector('.b5e-st'),chip=box.querySelector('.b5e-chip'),c=box.querySelector('.b5e-c');
  const pos=()=>{if(!chip.offsetHeight)return;c.style.top=(chip.offsetTop+chip.offsetHeight-c.offsetHeight/2)+'px'};
  pos();new ResizeObserver(pos).observe(st);new ResizeObserver(pos).observe(c);document.fonts&&document.fonts.ready.then(pos)};
B5.mount(Dt=>{
  if(Dt.share==null)throw new Error('no SIM.poolShare');
  const pan=(cls,crop,at,word,line,w)=>`<div class="b5-art b5e-o ${cls}" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="${crop}">
    <div class="b5-at" data-at="${at}"><span class="${w}">${word}</span><span class="b5-ol">${line}</span></div></div>`;
  return `<div class="b5e">
   <div class="b5e-st b5-bleed">
    <div class="b5-art b5e-chip" data-src="media/bet-chip-h2.jpg" data-iw="2048" data-ih="1152" data-crop="[596,190,930,610]|[-40,110,2210,690]" role="group" aria-labelledby="b5H">
     <div class="b5-at b5e-hd" data-at="[614,222]|[0,160]"><h2 class="hb-h" id="b5H"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2><span class="b5e-tab">At the close · ${md(Dt.at)}</span></div>
     <div class="b5e-dies" role="timer" aria-live="off">${B5.dies()}</div>
    </div>
    <div class="b5e-two">
     ${pan('b5e-g','[600,800,560,440]|[560,740,1048,380]','[624,1050]|[600,1000]','Right','Profits buy back $EZ','b5-ok')}
     ${pan('b5e-r','[1400,560,560,440]|[1000,600,1048,380]','[1420,810]|[1460,860]','Wrong','The pool can be wiped out','b5-no')}
    </div>
    <div class="b5e-c"><div class="bd-c"><span><p class="b5-say"><b class="b5-n">${Dt.share}%</b> of $EZ creator&nbsp;fees fill the pool.</p><p class="b5-say">We bet <em>the whole pool</em> on NVIDIA, based on the <em>#1 AI's</em> prediction.</p></span></div></div>
   </div>
   <p class="b5-cl b5e-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div>`});
})();
