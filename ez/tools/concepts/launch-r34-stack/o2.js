/* 2 Index tabs (pull one from the deck). The cards behind sit a strip to the left of the top card, each with a gold tab printed with its
   round and ticker, like the index tabs on a card file (the proof's folder tabs, the owner's favourite selector). Cue: the first time
   the stack is centred, the cards behind slide out from under the top card to their strips and the tabs pop out one after the other.
   Deal: tap a tab; that card slides further out to the left from under the deck, comes over the top and slides home with a small
   overshoot, while the old top steps back into a strip; the tag's count rolls and the label's shine sweeps once. */
var R=window.R34,bw=R.bw;R.poses=[{x:0,y:0,r:0,s:1,b:1},{x:-15,y:0,r:-.6,s:1,b:.6},{x:-30,y:0,r:-1.2,s:1,b:.46}];var P=R.poses;R.apply();
var tag=bw.querySelector('.x2p-htag');var nEl=document.createElement('span');nEl.className='r34-n';nEl.innerHTML='<span class="r34-dg"><b>1</b></span>/'+R.n;tag.appendChild(nEl);
var tabs=[];
function draw(){tabs.forEach(function(t){t.remove()});tabs=[];var o=R.order(),H=bw.offsetHeight;
  o.slice(1).forEach(function(c,k){var i=k+1,r=R.round(c),t=document.createElement('button');t.type='button';t.className='r34-tab';
    t.style.left=(P[i].x-18)+'px';t.style.top=(H*.16+k*(H*.29))+'px';t.style.height=Math.round(H*.25)+'px';t.style.zIndex=String(9-i);
    t.innerHTML='<b>#'+c.getAttribute('data-n')+'<span> '+(r?r.ticker:'')+'</span></b>';t.setAttribute('aria-label','Bullseye '+(R.dom.indexOf(c)+1)+' of '+R.n+': round '+c.getAttribute('data-n')+(r?', '+r.co:'')+'. Bring to the top');
    t.addEventListener('click',function(e){if(!bw.classList.contains('on'))return;e.preventDefault();e.stopPropagation();R.deal(R.slot(c),pull)});
    bw.appendChild(t);tabs.push(t)})}
draw();
function pull(before,after){var X=after[0],W=bw.offsetWidth,out=[],i0=before.indexOf(X);
  out.push(R.anim(X,[{p:P[i0],z:9-i0,e:'cubic-bezier(.3,0,.4,1)'},{p:{x:-W*.5,y:-4,r:-6,s:1.02,b:.9},o:.42,z:9-i0},{p:{x:-W*.48,y:-6,r:-5,s:1.03,b:1},o:.48,z:20,e:'cubic-bezier(.34,1.25,.64,1)'},{p:P[0],z:20}],{duration:660}));
  after.slice(1).forEach(function(c,k){var i=k+1,j=before.indexOf(c);out.push(R.anim(c,[{p:P[j],z:10-j},{p:P[i],z:10-i}],{duration:380,delay:120,easing:'cubic-bezier(.2,0,0,1)'}))});
  tabs.forEach(function(t){out.push(t.animate([{opacity:1},{opacity:0}],{duration:120,fill:'both'}))});
  R.tick(nEl,R.num());var s=R.shine(X,330);if(s)out.push(s);
  setTimeout(function(){draw();tabs.forEach(function(t,k){R.play(t,[{transform:'translateX(14px)',opacity:0},{transform:'translateX(0)',opacity:1}],{duration:320,delay:k*70,easing:'cubic-bezier(.34,1.56,.64,1)'})})},560);
  return out}
R.firstView(function(){if(R.reduce)return;var o=R.order();
  o.slice(1).forEach(function(c,k){R.play(c,R.kf([{p:P[0]},{p:P[k+1]}]),{duration:520,delay:k*90,easing:'cubic-bezier(.34,1.4,.64,1)'})});
  tabs.forEach(function(t,k){R.play(t,[{transform:'translateX(22px)',opacity:0},{transform:'translateX(-4px)',opacity:1,offset:.7},{transform:'translateX(0)',opacity:1}],{duration:460,delay:420+k*120,easing:'cubic-bezier(.2,0,0,1)'})})});
R.next=function(){return [tabs[0]]};R.toFirst=function(){var c=R.dom[0],i=R.order().indexOf(c);return [tabs[i-1]]};
