/* Round 34, the Bullseye stack's cue and deal (mockups): a small engine shared by the four options. The page's own stack decides which
   card is on top (its hidden "×3" is clicked, so films, flips and labels behave as on the site); this places the cards with the
   individual translate/rotate/scale properties and animates them from their old places to their new ones (Web Animations API,
   transforms, opacity and brightness only, so nothing reflows). Reduced motion: every deal is an instant swap, no cue plays. */
var H=document.documentElement;H.classList.add('r34');
var bw=document.querySelector('#x2pHl .x2p-stk');if(!bw)throw new Error('no stack');
var bt=bw.querySelector('.x2p-stkb');
var R=window.R34={bw:bw,bt:bt,reduce:matchMedia('(prefers-reduced-motion:reduce)').matches,log:[],cue:false};
var dom=[].slice.call(bw.querySelectorAll(':scope>.card'));R.n=dom.length;R.dom=dom;
R.slot=function(c){var m=c.className.match(/x2p-s(\d)/);return m?+m[1]:9};
R.order=function(){return dom.slice().sort(function(a,b){return R.slot(a)-R.slot(b)})};
R.top=function(){return R.order()[0]};
R.num=function(){return dom.indexOf(R.top())+1};
R.round=function(c){var n=+c.getAttribute('data-n'),r=null;(window.ROUNDS||[]).forEach(function(x){if(x.n===n)r=x});return r};
R.poses=[{x:0,y:0,r:0,s:1,b:1},{x:-7,y:4,r:-3.5,s:1,b:.58},{x:7,y:6,r:3.5,s:1,b:.46}];
R.css=function(p){return {translate:(p.x||0)+'px '+(p.y||0)+'px',rotate:(p.r||0)+'deg',scale:String(p.s==null?1:p.s),filter:'brightness('+(p.b==null?1:p.b)+')'}};
R.put=function(c,p){var s=R.css(p);for(var k in s)c.style[k]=s[k]};
R.pose=function(i){return R.poses[Math.min(i,R.poses.length-1)]};
R.apply=function(){R.order().forEach(function(c,i){R.put(c,R.pose(i));c.style.zIndex=String(10-i)})};
R.apply();
R.busy=false;R.hooks=[];R.onDeal=function(f){R.hooks.push(f)};
/* frames: [{p:pose, o:offset, z:zIndex, op:opacity, e:easing to the next frame}] */
R.kf=function(fr){return fr.map(function(f){var k=R.css(f.p);if(f.o!=null)k.offset=f.o;if(f.z!=null)k.zIndex=String(f.z);if(f.op!=null)k.opacity=String(f.op);if(f.e)k.easing=f.e;return k})};
R.anim=function(c,fr,opt){return c.animate(R.kf(fr),Object.assign({fill:'both'},opt))};
/* a one-off animation that lets go of its element when it ends */
R.play=function(el,kf,opt){var a=el.animate(kf,Object.assign({fill:'both'},opt));a.finished.then(function(){a.cancel()},function(){});return a};
R.deal=function(steps,anim){if(R.busy||!bw.classList.contains('on')||!steps)return false;R.busy=true;var before=R.order(),t0=performance.now();
  for(var k=0;k<steps;k++)bt.click();
  var after=R.order();R.apply();
  var anims=R.reduce?[]:((anim&&anim(before,after,steps))||[]);
  R.hooks.forEach(function(f){f(before,after)});
  Promise.all(anims.map(function(a){return a.finished})).then(function(){anims.forEach(function(a){a.cancel()});R.busy=false;R.log.push({steps:steps,ms:Math.round(performance.now()-t0)})});
  return true};
R.shine=function(c,delay){var z=c.querySelector('.face.front .zlab');if(!z||R.reduce)return null;var s=document.createElement('i');s.className='r34-shine';z.appendChild(s);
  var a=s.animate([{transform:'translateX(-130%) skewX(-18deg)',opacity:0},{opacity:1,offset:.3},{transform:'translateX(290%) skewX(-18deg)',opacity:0}],{duration:600,delay:delay||0,easing:'cubic-bezier(.2,0,0,1)',fill:'both'});
  a.finished.then(function(){s.remove()});return a};
R.tick=function(el,n){var d=el&&el.querySelector('.r34-dg');if(!d)return;var o=d.querySelector('b'),nb=document.createElement('b');nb.textContent=n;d.appendChild(nb);
  if(R.reduce||!o){if(o)o.remove();return}
  o.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(-105%)',opacity:0}],{duration:220,easing:'cubic-bezier(.3,0,.8,.15)',fill:'forwards'}).finished.then(function(){o.remove()});
  nb.animate([{transform:'translateY(105%)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:340,delay:80,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'backwards'})};
/* the first time the stack is centred and on screen (the carousel lands on Tightest race, so this is when a visitor reaches it) */
R.firstView=function(f){var done=false,go=function(){if(done)return;var r=bw.getBoundingClientRect();if(!bw.classList.contains('on')||r.top<0||r.bottom>innerHeight+30||r.left<-2||r.right>innerWidth+2)return;done=true;R.cue=true;setTimeout(f,260)};
  var io=new IntersectionObserver(function(){go()},{threshold:[.5,.8,1]});io.observe(bw);
  new MutationObserver(go).observe(bw,{attributes:true,attributeFilter:['class']});addEventListener('scroll',go,{passive:true});
  var tr=bw.parentNode;tr.addEventListener('scroll',function(){clearTimeout(tr.__r34);tr.__r34=setTimeout(go,120)},{passive:true});go()};
