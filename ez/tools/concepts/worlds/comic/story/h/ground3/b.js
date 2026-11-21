// B · Searchlights: four beams over the rooftops behind Meet the models, the wet street under the rack, the coin behind Smart or lucky; each cut is a jagged starburst edge, the rack's own burst
window.__G3BG={models:'beams',rounds:'street',lucky:'coin'};
(function(){const G=window.__G2;const S=G.secs();
const burst=(W,H,seed)=>{G.seed(seed);let o='',r='';const n=Math.round(W/30);for(let k=0;k<=n;k++){const x=k*W/n,xm=x+W/n/2,h=H*(.3+G.rnd()*.7),h2=h*(.4+G.rnd()*.35);
  o+=`L${x.toFixed(1)},${H} L${(xm+(G.rnd()-.5)*8).toFixed(1)},${(H-h).toFixed(1)} `;r+=`L${x.toFixed(1)},${H} L${(xm+(G.rnd()-.5)*6).toFixed(1)},${(H-h2).toFixed(1)} `}
 return `<path d="M0,${H}${o}L${W},${H}Z" fill="#ffd21f" stroke="#0d0b10" stroke-width="3" stroke-linejoin="round"/><path d="M0,${H}${r}L${W},${H}Z" fill="#ff3a31" stroke="#0d0b10" stroke-width="1.6" stroke-linejoin="round"/>
 <path d="M0,${H-1}H${W}" stroke="#0d0b10" stroke-width="5"/>`};
S.forEach((s,i)=>{if(s.id==='cover'||s.id==='back')return;const c=document.createElement('div');c.className='gB-burst';c.setAttribute('aria-hidden','true');
 const b=[...document.querySelectorAll('#wc-book > p.wc-beat')].find(x=>x.nextElementSibling===s.el);(b||s.el).before(c);
 const draw=()=>{const W=Math.max(320,c.offsetWidth);c.innerHTML=`<svg viewBox="0 0 ${W} 70" preserveAspectRatio="none">${burst(W,70,500+i*7)}</svg>`};draw();addEventListener('resize',draw)});
})();
