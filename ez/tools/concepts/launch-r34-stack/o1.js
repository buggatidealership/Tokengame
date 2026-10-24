/* 1 Peek and tuck (the dealer's hand). Cue: the first time the stack is centred, the dealer spreads the deck once: the two cards behind
   swing out left and right so their labels show, the top card lifts a hair, they settle, and the counter "1/3 ›" on the corner gives
   one bounce. Deal: the top card lifts, swings up and to the right, tucks under the deck at the top of its arc and lands at the back;
   the next card rises into place with a small overshoot, the counter rolls to the next number like a ticket counter and a shine sweeps
   once across the new card's grading label. */
var R=window.R34,bw=R.bw,P=R.poses;
var pill=document.createElement('button');pill.type='button';pill.className='r34-pill';
pill.innerHTML='<span class="r34-dg"><b>1</b></span><span class="r34-of">/'+R.n+'</span><i aria-hidden="true">›</i>';bw.appendChild(pill);
function label(){pill.setAttribute('aria-label','Bullseye '+R.num()+' of '+R.n+'. Show the next one')}label();
function tuck(before,after){var A=before[0],B=after[0],C=after[1]===A?null:after[1],W=bw.offsetWidth,out=[];
  out.push(R.anim(A,[{p:P[0],z:20,e:'cubic-bezier(.2,0,.4,1)'},{p:{x:W*.34,y:-26,r:10,s:1.05},o:.4,z:20,e:'cubic-bezier(.5,0,.6,1)'},{p:{x:W*.36,y:-16,r:9,s:1,b:.75},o:.52,z:1,e:'cubic-bezier(.2,0,0,1)'},{p:P[2],z:1}],{duration:620}));
  out.push(R.anim(B,[{p:P[1],z:9},{p:{y:-6,r:.5,s:1.022},o:.6},{p:P[0],z:10}],{duration:440,delay:170,easing:'cubic-bezier(.34,1.3,.64,1)'}));
  if(C)out.push(R.anim(C,[{p:P[2],z:8},{p:P[1],z:9}],{duration:380,delay:230,easing:'cubic-bezier(.2,0,0,1)'}));
  R.tick(pill,R.num());label();var s=R.shine(B,330);if(s)out.push(s);return out}
pill.addEventListener('click',function(e){if(!bw.classList.contains('on'))return;e.preventDefault();e.stopPropagation();R.deal(1,tuck)});
R.firstView(function(){if(R.reduce)return;var o=R.order(),W=bw.offsetWidth,hold=function(p){return [{p:p.a},{p:p.b,o:.36,e:'cubic-bezier(.2,0,0,1)'},{p:p.b,o:.68},{p:p.a}]};
  R.play(o[1],R.kf(hold({a:P[1],b:{x:-W*.22,y:10,r:-11,s:.97,b:.82}})).map(function(k,i){if(i===0)k.easing='cubic-bezier(.34,1.45,.64,1)';return k}),{duration:1500});
  if(o[2])R.play(o[2],R.kf(hold({a:P[2],b:{x:W*.22,y:12,r:11,s:.97,b:.78}})).map(function(k,i){if(i===0)k.easing='cubic-bezier(.34,1.45,.64,1)';return k}),{duration:1500,delay:70});
  R.play(o[0],R.kf(hold({a:P[0],b:{y:-7,s:1.025}})),{duration:1500});
  R.play(pill,[{transform:'rotate(4deg) scale(1)'},{transform:'rotate(-3deg) scale(1.22)',offset:.45},{transform:'rotate(4deg) scale(1)'}],{duration:480,delay:1560,easing:'cubic-bezier(.34,1.56,.64,1)'})});
R.next=function(){return [pill]};R.toFirst=function(){return [pill]};
