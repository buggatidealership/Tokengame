/* J3 · The golden ticket in your hand. Only #1's ticket answers the phone's tilt: the card leans a few degrees with
   the phone, the gold foil on its stub slides through its colours and a glint runs across the card, like a real
   foil ticket under a lamp. The other three tickets stay flat paper. Input: deviceorientation (Android: at once;
   iPhone: a small "Tilt" chip asks once, as iOS requires a tap), else the mouse over the ticket, else nothing moves.
   All motion is transform on three small layers; the loop runs only while the angle is still settling. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j3');
const cards=[...D.querySelectorAll('.wc-sb-1,.wc-ch-1')];
cards.forEach(c=>{if(c.querySelector('.sj-gl'))return;c.classList.add('sj-tilt');
  const stub=c.querySelector('.wc9-stub.wc9-gold,.wc-tks');if(stub&&!stub.querySelector('.sj-foil'))stub.insertAdjacentHTML('beforeend','<span class="sj-foil" aria-hidden="true"><span class="sj-band"></span></span>');
  c.insertAdjacentHTML('beforeend','<i class="sj-gl" aria-hidden="true"><i class="sj-glb"></i></i>')});
let tx=0,ty=0,cx=0,cy=0,raf=0,base=null;
function paint(){cards.forEach(c=>{c.style.transform=`perspective(900px) rotateY(${(cx*9).toFixed(2)}deg) rotateX(${(-cy*6).toFixed(2)}deg)`;
  const b=c.querySelector('.sj-band');if(b)b.style.transform=`translate3d(0,${(-33.3+cy*20+cx*13).toFixed(2)}%,0)`;
  const g=c.querySelector('.sj-glb');if(g)g.style.transform=`translate3d(${(cx*60-cy*25).toFixed(2)}%,0,0) skewX(-20deg)`;
  c.style.setProperty('--sjg',(Math.min(1,Math.hypot(cx,cy))*.6+.25).toFixed(3))})}
function loop(){const k=window.__sjNoEase?1:.18;cx+=(tx-cx)*k;cy+=(ty-cy)*k;paint();
  if(Math.abs(tx-cx)+Math.abs(ty-cy)>.002)raf=requestAnimationFrame(loop);else raf=0}
function aim(x,y){if(sjRM())return;tx=Math.max(-1,Math.min(1,x));ty=Math.max(-1,Math.min(1,y));if(!raf)raf=requestAnimationFrame(loop)}
window.__sjTilt=(g,b)=>{if(!base)base={g,b};aim((g-base.g)/20,(b-base.b)/20)};
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;window.__sjTilt(e.gamma,e.beta)},{passive:true});
cards.forEach(c=>{c.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=c.getBoundingClientRect();aim((e.clientX-r.left)/r.width*2-1,(e.clientY-r.top)/r.height*2-1)});
  c.addEventListener('pointerleave',()=>aim(0,0))});
/* iPhone: motion data only after a tap that asks for it */
const needAsk=window.__sjIOS||(/iP(hone|od|ad)/.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent)))&&typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function';
if(needAsk&&!sjRM())cards.forEach(c=>{const s=c.querySelector('.wc9-stub.wc9-gold,.wc-tks');if(!s||s.querySelector('.sj-ask'))return;
  s.insertAdjacentHTML('beforeend','<button type="button" class="sj-ask" aria-label="Let the golden ticket follow your phone\'s tilt"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="8" height="15" rx="1.6" transform="rotate(-18 12 10)"/><path d="M4 18c2 2.4 5 3.4 8 3.2M20 6c-1.4-1.9-3.3-3-5.4-3.4"/></svg>Tilt</button>');
  s.querySelector('.sj-ask').addEventListener('click',async e=>{e.preventDefault();e.stopPropagation();try{const r=await DeviceOrientationEvent.requestPermission();if(r==='granted')D.querySelectorAll('.sj-ask').forEach(x=>x.remove())}catch(_){}})});
H.classList.add('sj-ready-j3')})();
