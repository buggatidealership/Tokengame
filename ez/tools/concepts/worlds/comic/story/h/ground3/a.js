// A · Fight night: the arena ring behind Meet the models, the wet street under the rack, the coin toss behind Smart or lucky; sections are cut by the ring's ropes
window.__G3BG={models:'ring',rounds:'street',lucky:'coin'};
(function(){const G=window.__G2;const S=G.secs();
const rope=(y,col,dark,seed,W)=>{G.seed(seed);const sag=6+G.rnd()*5,tilt=(G.rnd()-.5)*6;const d=`M-10,${y+tilt} Q${W*.5},${y+sag} ${W+10},${y-tilt}`;
 // twist: short diagonal ink strokes along the rope
 return `<path d="${d}" fill="none" stroke="#0d0b10" stroke-width="13" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${dark}" stroke-width="9"/>
 <path d="${d}" fill="none" stroke="${col}" stroke-width="5.5" transform="translate(0,-1.4)"/><path d="${d}" fill="none" stroke="#0d0b10" stroke-width="9" stroke-dasharray="1.6 7.4" opacity=".45"/>
 <path d="${d}" fill="none" stroke="#fff8e6" stroke-width="1.6" transform="translate(0,-3.2)" stroke-dasharray="${18+G.rnd()*20} 6 ${4+G.rnd()*6} 9" opacity=".85"/>`};
const cut=(i,W)=>{const H=74;return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">
 <path d="M${W-34},-4 L${W-20},-4 L${W-18},${H+4} L${W-36},${H+4}Z" fill="#2a2730" stroke="#0d0b10" stroke-width="3"/><path d="M${W-31},0 L${W-27},0 L${W-26},${H} L${W-32},${H}Z" fill="#6c6874"/>
 ${rope(16,'#ff3a31','#8f1a14',300+i,W)}${rope(38,'#f8f0d9','#9b917c',310+i,W)}${rope(60,'#03c870','#065c2f',320+i,W)}
 ${[16,38,60].map(y=>`<rect x="${W-41}" y="${y-8}" width="24" height="16" rx="3" fill="#fdbc2a" stroke="#0d0b10" stroke-width="2.6"/><path d="M${W-37},${y-4}h16" stroke="#fff3c4" stroke-width="2"/>`).join('')}</svg>`};
S.forEach((s,i)=>{if(s.id==='cover'||s.id==='back')return;const c=document.createElement('div');c.className='gA-rope';c.setAttribute('aria-hidden','true');
 const b=[...document.querySelectorAll('#wc-book > p.wc-beat')].find(x=>x.nextElementSibling===s.el);(b||s.el).before(c);
 const draw=()=>{c.innerHTML=cut(i,Math.max(320,c.offsetWidth))};draw();addEventListener('resize',draw)});
})();
