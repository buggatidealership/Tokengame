/* 3 The dealer shows the hand (a card shoe). Cue: the first time the stack is centred, the dealer works the deck once on his own: he
   deals all three, a beat each, and lands back on Tesla, while the count in the tag ticks 1, 2, 3, 1 (the labor illusion: you watch
   the work, so the wait is part of the show). The control is the tag's own chip, "1 / 3 ▸". Deal: the top card slides out of the deck
   down and to the right like a card leaving a shoe and fades; the next card is pushed up into place with a small overshoot; the
   dealt card slips back in at the back; the count rolls and the shine sweeps. */
var R=window.R34,bw=R.bw,P=R.poses;
var tag=bw.querySelector('.x2p-htag'),chip=document.createElement('button');chip.type='button';chip.className='r34-tgb';
chip.innerHTML='<span class="r34-dg"><b>1</b></span><span class="r34-of">/ '+R.n+'</span><i aria-hidden="true">▸</i>';tag.appendChild(chip);
var say=document.createElement('span');say.className='r34-say';say.textContent='3 bullseyes this season';bw.appendChild(say);
function label(){chip.setAttribute('aria-label','Bullseye '+R.num()+' of '+R.n+'. Show the next one')}label();
function shoe(before,after){var A=before[0],B=after[0],C=after[1]===A?null:after[1],W=bw.offsetWidth,Hh=bw.offsetHeight,out=[];
  out.push(R.anim(A,[{p:P[0],z:20,op:1,e:'cubic-bezier(.4,0,.8,.6)'},{p:{x:W*.3,y:Hh*.16,r:13,s:.93},o:.42,z:20,op:0},{p:{x:10,y:28,r:6,s:.96,b:.46},o:.5,z:1,op:0,e:'cubic-bezier(.2,0,0,1)'},{p:P[2],z:1,op:1}],{duration:640}));
  out.push(R.anim(B,[{p:P[1],z:9},{p:{y:-9,r:.4,s:1.03},o:.58},{p:P[0],z:10}],{duration:460,delay:120,easing:'cubic-bezier(.34,1.35,.64,1)'}));
  if(C)out.push(R.anim(C,[{p:P[2],z:8},{p:P[1],z:9}],{duration:360,delay:200,easing:'cubic-bezier(.2,0,0,1)'}));
  R.tick(chip,R.num());label();var s=R.shine(B,380);if(s)out.push(s);return out}
chip.addEventListener('click',function(e){if(!bw.classList.contains('on'))return;e.preventDefault();e.stopPropagation();R.deal(1,shoe)});
R.firstView(function(){if(R.reduce)return;var k=0;R.play(say,[{opacity:0,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)',offset:.12},{opacity:1,offset:.88},{opacity:0}],{duration:3400});
  (function step(){if(k++>=R.n||!bw.classList.contains('on'))return;R.deal(1,shoe);setTimeout(step,1000)})();
  setTimeout(function(){R.play(chip,[{transform:'scale(1)'},{transform:'scale(1.2)',offset:.45},{transform:'scale(1)'}],{duration:460,easing:'cubic-bezier(.34,1.56,.64,1)'})},R.n*1000+250)});
R.next=function(){return [chip]};R.toFirst=function(){return [chip]};
