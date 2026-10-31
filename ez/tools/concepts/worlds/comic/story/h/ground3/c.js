(function(){const G=window.__G2;const S=G.secs();
window.__G3BG={models:'ring',rounds:'street',lucky:'coin'};
const beats=G.beats();const capTxt={models:'Meanwhile, at the arena…',rounds:'Down at the newsstand…'};
const box=(w,h,s)=>{G.seed(s);const P=[];const j=()=>(G.rnd()-.5)*2.2;P.push([1+j(),2+j()],[w*.4,1+j()],[w-1+j(),j()+1],[w+j()*.6,h*.5],[w-2+j(),h-1+j()],[w*.55,h+j()*.6],[1+j(),h-2+j()]);
 const d='M'+P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' L')+'Z';return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path d="${d}" fill="#ffe14d" stroke="#0d0b10" stroke-width="2.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`};
S.forEach((s,i)=>{if(s.id==='cover'||s.id==='back')return;

 // the panel border: hand-ruled, thick outer ink and a thin inner line
 G.seed(100+i*13);const r=()=>(G.rnd()-.5)*.55;const q=(o)=>`M${o+r()},${o+r()} L${50+r()},${o*.6+r()} L${100-o+r()},${o+r()} L${100-o*.7+r()},${50+r()} L${100-o+r()},${100-o+r()} L${50+r()},${100-o*.8+r()} L${o+r()},${100-o+r()} L${o*.6+r()},${50+r()}Z`;
 const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','gB-bd');sv.setAttribute('viewBox','0 0 100 100');sv.setAttribute('preserveAspectRatio','none');sv.setAttribute('aria-hidden','true');
 sv.innerHTML=`<path d="${q(.6)}" fill="none" stroke="#0d0b10" stroke-width="5.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${q(1.6)}" fill="none" stroke="#0d0b10" stroke-width="1.1" vector-effect="non-scaling-stroke" opacity=".7"/>`;s.el.append(sv);
 let t=capTxt[s.id];const b=beats.find(x=>x.nextElementSibling===s.el);if(b)t=b.textContent.trim();if(!t)return;
 const c=document.createElement('p');c.className='gB-cap';c.innerHTML=`<span>${t.charAt(0)+t.slice(1).toLowerCase().replace(/nvidia/,'NVIDIA')}</span>`;s.el.before(c);requestAnimationFrame(()=>{c.insertAdjacentHTML('afterbegin',box(c.offsetWidth,c.offsetHeight,200+i))})});
})();
