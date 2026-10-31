// D · Torn reveal: each section's painted scene tears open over the last; the torn edge shows the card's cream core and its ink; the scene drifts as you scroll
window.__G3BG={models:'beams',rounds:'street',lucky:'coin'};
(function(){const G=window.__G2;const S=G.secs();
const tear=(W,H,seed)=>{G.seed(seed);let p=[],x=0;while(x<W){x+=6+G.rnd()*16;p.push([Math.min(x,W),H*.3+G.rnd()*H*.5])}
 const top='M0,0 L'+p.map(q=>q[0].toFixed(1)+','+q[1].toFixed(1)).join(' L')+` L${W},0Z`;
 const core='M0,0 L'+p.map(q=>q[0].toFixed(1)+','+(q[1]+5+G.rnd()*7).toFixed(1)).join(' L')+` L${W},0Z`;
 const fib=p.filter(()=>G.rnd()<.45).map(q=>`<path d="M${q[0].toFixed(1)},${(q[1]+3).toFixed(1)} l${((G.rnd()-.5)*4).toFixed(1)},${(2+G.rnd()*4).toFixed(1)}" stroke="#d9cba6" stroke-width="1"/>`).join('');
 return {top,core,fib}};
S.forEach((s,i)=>{if(s.id==='cover'||s.id==='back')return;const c=document.createElement('div');c.className='gD-tear';c.setAttribute('aria-hidden','true');
 const b=[...document.querySelectorAll('#wc-book > p.wc-beat')].find(x=>x.nextElementSibling===s.el);(b||s.el).before(c);
 const draw=()=>{const W=Math.max(320,c.offsetWidth),H=44,t=tear(W,H,700+i*11);
  c.innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs><pattern id="gDn${i}" width="260" height="260" patternUnits="userSpaceOnUse"><image href="${G.base}img/web/g-night-tile.jpg" width="260" height="260"/></pattern></defs><path d="${t.core}" fill="#f2e6c6"/>${t.fib}<path d="${t.top}" fill="url(#gDn${i})"/><path d="${t.top.replace(/Z$/,'')}" fill="none" stroke="#0d0b10" stroke-width="2.4" stroke-linejoin="round"/></svg>`};draw();addEventListener('resize',draw)});
})();
