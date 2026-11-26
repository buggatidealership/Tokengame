/* f2 "More room for the film" (round 31): the bet ticket leaves the first screen (as f1) and the film grows where it can. The ticket (the live
   element, so its countdown keeps running) moves into a plain placeholder section right before 05 Get $EZ, where the bet section will go.
   From 600px the film is as wide as the headline above it: its right edge on the end of "BUYBACKS" (measured, so it follows the headline's
   size), never narrower than today's 560px, never wider than the column, and short enough that a 768px-tall laptop still sees all of it.
   Idempotent. */
var d=document,H=d.documentElement,bt=d.querySelector('.x2p-bt'),get=d.getElementById('get');
if(bt&&get){var s=d.getElementById('r31-bet');
  if(!s){s=d.createElement('section');s.id='r31-bet';s.className='sec r31-bet';s.setAttribute('aria-label','The bet');get.parentNode.insertBefore(s,get)}
  if(bt.parentNode!==s)s.appendChild(bt)}
var sb=d.querySelector('section.x2o-bet');if(sb)sb.setAttribute('aria-label','How it works');
H.classList.add('r31-f2');
var vt=d.querySelector('.x2p-vt'),h1=d.querySelector('section.hero h1');
if(vt&&h1&&!window.__r31f2){
  window.__r31f2=function(){
    if(innerWidth<600){vt.style.removeProperty('--fw');return}
    var r=d.createRange();r.selectNodeContents(h1);var right=0;[].forEach.call(r.getClientRects(),function(b){if(b.width>0)right=Math.max(right,b.right)});
    var L=vt.getBoundingClientRect().left,col=vt.parentNode.getBoundingClientRect().right-L;
    var fw=Math.max(560,Math.min(right-L,col,(innerHeight-350)*16/9));
    vt.style.setProperty('--fw',Math.round(fw)+'px')};
  window.__r31f2();
  addEventListener('resize',window.__r31f2);if(d.fonts&&d.fonts.ready)d.fonts.ready.then(window.__r31f2);
}
window.__r31={shot:'.x2p-vt'};
