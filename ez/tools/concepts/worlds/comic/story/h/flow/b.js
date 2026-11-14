(function(){const F=window.__FL;const S=F.secs().filter(s=>s.id!=='back');
S.forEach(({el,id},i)=>{const w=Math.round(el.offsetWidth+14),h=Math.round(el.offsetHeight+14);
 const fr=document.createElement('span');fr.className='flb-fr-w';
 const mk=()=>{const w=Math.round(el.offsetWidth+14),h=Math.round(el.offsetHeight+14);return `<svg class="flb-fr${fr.dataset.d?' fl-drawn':''}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><path class="o" pathLength="1" d="${F.inkRect(w,h,11+i*7,2.6)}" transform="translate(2 2) scale(${((w-4)/w).toFixed(4)} ${((h-4)/h).toFixed(4)})"/><path class="i" pathLength="1" d="${F.inkRect(w,h,23+i*5,1.6)}" transform="translate(7 7) scale(${((w-14)/w).toFixed(4)} ${((h-14)/h).toFixed(4)})"/></svg>`};
 el.insertAdjacentHTML('beforeend',mk().replace('class="flb-fr','class="flb-fr flb-'+id));const sv=el.lastElementChild;
 if(id!=='cover'){const wa=document.createElement('i');wa.className='flb-wash';wa.setAttribute('aria-hidden','true');el.appendChild(wa)}
 let lw=w,lh=h;new ResizeObserver(()=>{const W=el.offsetWidth+14,H=el.offsetHeight+14;if(Math.abs(W-lw)<2&&Math.abs(H-lh)<2)return;lw=W;lh=H;const d=sv.classList.contains('fl-drawn');const n=document.createElement('div');n.innerHTML=mk();const ns=n.firstElementChild;ns.classList.add('flb-'+id);if(d)ns.classList.add('fl-drawn');sv.replaceWith(ns)}).observe(el)});
// the frame inks itself in as the panel arrives (a stroke drawn once, then still)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const s=e.target.querySelector(':scope > .flb-fr');if(s)s.classList.add('fl-drawn');e.target.classList.add('flb-on');io.unobserve(e.target)}}),{rootMargin:'0px 0px -22% 0px'});
S.forEach(({el,id})=>{if(id==='cover'){el.querySelector(':scope > .flb-fr').classList.add('fl-drawn');el.classList.add('flb-on')}else io.observe(el)});
F.beats({margin:'-18%'});F.ready()})();
