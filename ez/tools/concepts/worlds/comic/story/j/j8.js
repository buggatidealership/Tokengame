/* J8 · Wet ink. A round's stamp is still wet for the first day after its close: the move's stamp on its tile in
   "Every round so far" (and the winner's corner face) carries a glossy sheen that slowly slides, a soft ink bleed at
   its edge, and while it is only a few hours old a drop of ink hanging off it. The wetness fades with the hours
   (graded 2 h ago: glossy; 20 h ago: nearly dry; a day later: plain paper again), so the newest rounds stand out
   without a "new" label, and the page changes while you are away. Each round's close is its own exchange's close.
   Reduced motion: the gloss and bleed stay, nothing slides. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j8');
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const RR={};ROUNDS.forEach(r=>RR[r.n]=r);
function paint(){const now=window.__sjNow||Date.now();let wet=0;
  D.querySelectorAll('.wc-bi').forEach(a=>{const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;const at=closeAt(r.ticker,r.resolves);
    const h=at==null?99:(now-at)/36e5,w=h<0?0:Math.max(0,1-h/24);a.classList.toggle('sj-wet',w>0);a.classList.toggle('sj-drip',w>.8);
    const em=a.querySelector('.wc9-bs em');if(em&&w>0&&!em.querySelector('.sj-gls')){em.insertAdjacentHTML('beforeend','<span class="sj-gls" aria-hidden="true"></span>');em.insertAdjacentHTML('afterend','<span class="sj-drop" aria-hidden="true"></span>')}
    const dr=a.querySelector('.sj-drop');if(dr&&em){dr.style.left=(em.offsetLeft+em.offsetWidth*.72)+'px';dr.style.top=(em.offsetTop+em.offsetHeight-2)+'px'}
    if(w>0){a.style.setProperty('--wet',w.toFixed(3));wet++;a.dataset.sjAge=Math.max(0,Math.round(h))}else a.style.removeProperty('--wet')});
  return wet}
window.__sjPaint8=paint;paint();addEventListener('resize',paint);setInterval(paint,10*60*1000);
window.__sjToggle=on=>H.classList.toggle('sj-j8',on);
H.classList.add('sj-ready-j8')})();
