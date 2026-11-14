/* 4 Spread the hand. Cue: the cards behind fan a little wider than today, so three cards read as three, and the corner says "See all 3"
   with a fan of three. The first time the stack is centred the corner button wiggles once. Tap it: the deck spreads into a hand of
   three, side by side and smaller (a quick stagger, each card swinging out with a small overshoot), the one on top outlined in gold,
   numbered 1 2 3 underneath. Tap any card: the hand closes onto it (it grows back to full size in front, the other two tuck in
   behind); tap the button again, or move the carousel, and the hand closes onto the card that was on top. */
var R=window.R34,bw=R.bw;R.poses=[{x:0,y:0,r:0,s:1,b:1},{x:-11,y:5,r:-5,s:1,b:.6},{x:11,y:8,r:5,s:1,b:.5}];var P=R.poses;R.apply();
var btn=document.createElement('button');btn.type='button';btn.className='r34-fanb';
btn.innerHTML='<svg viewBox="0 0 16 12" aria-hidden="true"><rect x="1.5" y="2" width="6" height="9" rx="1" transform="rotate(-14 4.5 6.5)" fill="none" stroke="#f2b632" stroke-width="1.4"/><rect x="8.5" y="2" width="6" height="9" rx="1" transform="rotate(14 11.5 6.5)" fill="none" stroke="#f2b632" stroke-width="1.4"/><rect x="5" y="1" width="6" height="10" rx="1" fill="#1b181c" stroke="#f2b632" stroke-width="1.4"/></svg>See all '+R.n;
btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-label','See all '+R.n+' bullseyes');bw.appendChild(btn);
var nums=R.dom.map(function(c,i){var e=document.createElement('span');e.className='r34-num';e.textContent=(i+1)+'';bw.appendChild(e);return e});
var spread=false;
function fanPose(i){var W=bw.offsetWidth,n=R.n,m=(n-1)/2,k=i-m;return {x:k*W*.4,y:Math.abs(k)*22+20,r:k*11,s:.56,b:1}}
/* the page makes the cards behind inert (out of reach); a spread hand puts all three within reach, closing puts that back */
function reach(all){R.order().forEach(function(c,i){var off=!all&&i>0;if('inert' in c)c.inert=off;c.setAttribute('aria-hidden',off?'true':'false')})}
function open(){if(spread||R.busy||R.reduce&&false)return;spread=true;bw.classList.add('r34-spread');btn.setAttribute('aria-expanded','true');reach(true);var top=R.top(),W=bw.offsetWidth,Hh=bw.offsetHeight;
  R.dom.forEach(function(c,i){var from=R.pose(R.order().indexOf(c)),to=fanPose(i);c.style.zIndex=String(c===top?14:11+i);c.classList.toggle('r34-cur',c===top);
    if(R.reduce)R.put(c,to);else{R.anim(c,[{p:from},{p:to}],{duration:420,delay:i*45,easing:'cubic-bezier(.34,1.4,.64,1)'}).finished.then(function(a){R.put(c,to);c.getAnimations().forEach(function(x){x.cancel()})})}
    var e=nums[i];e.style.left=(W/2+to.x-6)+'px';R.play(e,[{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:260,delay:R.reduce?0:300+i*45,fill:'forwards'})});
  btn.innerHTML=btn.innerHTML.replace(/See all \d+|Close/,'Close')}
function close(pick){if(!spread)return;spread=false;bw.classList.remove('r34-spread');btn.setAttribute('aria-expanded','false');btn.innerHTML=btn.innerHTML.replace('Close','See all '+R.n);
  nums.forEach(function(e){e.getAnimations().forEach(function(x){x.cancel()});e.style.opacity=0});
  var from={};R.dom.forEach(function(c,i){from[i]=fanPose(i);c.classList.remove('r34-cur')});
  var steps=pick?R.slot(pick):0;reach(false);
  if(!steps){R.apply();if(!R.reduce)R.order().forEach(function(c,j){R.play(c,R.kf([{p:from[R.dom.indexOf(c)]},{p:P[j]}]),{duration:400,delay:j*40,easing:'cubic-bezier(.2,0,0,1)'})});return}
  R.deal(steps,function(before,after){return after.map(function(c,j){var f=from[R.dom.indexOf(c)];
    return j===0?R.anim(c,[{p:f,z:20},{p:{y:-8,s:1.025},o:.7},{p:P[0],z:20}],{duration:460,easing:'cubic-bezier(.34,1.35,.64,1)'})
                :R.anim(c,[{p:f,z:10-j},{p:P[j],z:10-j}],{duration:400,delay:60*j,easing:'cubic-bezier(.2,0,0,1)'})}).concat([R.shine(after[0],300)].filter(Boolean))})}
btn.addEventListener('click',function(e){if(!bw.classList.contains('on'))return;e.preventDefault();e.stopPropagation();spread?close(null):open()});
bw.addEventListener('click',function(e){if(!spread)return;var c=e.target.closest('.card');if(!c||c.parentNode!==bw)return;e.preventDefault();e.stopPropagation();close(c===R.top()?null:c)},true);
new MutationObserver(function(){if(spread&&!bw.classList.contains('on'))close(null)}).observe(bw,{attributes:true,attributeFilter:['class']});
R.firstView(function(){if(R.reduce)return;R.play(btn,[{transform:'rotate(4deg)'},{transform:'rotate(-8deg) scale(1.12)',offset:.25},{transform:'rotate(10deg) scale(1.12)',offset:.5},{transform:'rotate(-4deg) scale(1.06)',offset:.75},{transform:'rotate(4deg)'}],{duration:620,delay:200,easing:'ease-in-out'});
  var o=R.order();R.play(o[1],R.kf([{p:P[1]},{p:{x:-24,y:8,r:-9,b:.7},o:.5},{p:P[1]}]),{duration:820,delay:120,easing:'cubic-bezier(.34,1.3,.64,1)'});
  if(o[2])R.play(o[2],R.kf([{p:P[2]},{p:{x:24,y:10,r:9,b:.65},o:.5},{p:P[2]}]),{duration:820,delay:170,easing:'cubic-bezier(.34,1.3,.64,1)'})});
R.next=function(){return [btn,'card:next']};R.toFirst=function(){return [btn,'card:first']};
