// Round H6 · book: shared layer over ground3 A. (1) the ring's ropes only at the ring's entrance; (2) "Meet the models" lettered
// into the painting's burst; (3) "Every round so far" as the head above the rack; (4) a narrator's beat for the one cut that had none;
// (5) flow's beat-by-beat arrival. Takes (p, i, k) add the cuts.
(function(){const F=window.__FL,B=window.__BK=window.__BK||{};const D=document,H=D.documentElement;const NS='http://www.w3.org/2000/svg';
[...D.querySelectorAll('.gA-rope')].forEach((r,i)=>{if(i>0)r.remove()});
// (2) the burst. Its centre in the painting: phone art 9:16 at (53%, 21.5%), desktop art 16:9 at (50%, 23.5%) (measured on the yellow).
const mm=F.sec('models'),tt=mm&&mm.querySelector('.pp-ttl');
if(tt){mm.classList.add('bk-mm');
 tt.querySelectorAll('svg.pp-ext').forEach((s,k)=>{const face=s.querySelector('text[fill^="url"]');if(!face)return;
  if(face.getAttribute('fill')==='url(#ppg1)')face.setAttribute('fill','url(#bkCream)');
  const d=D.createElementNS(NS,'defs');d.innerHTML=(k===0?'<linearGradient id="bkCream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf2"/><stop offset=".6" stop-color="#fff1c9"/><stop offset="1" stop-color="#f3cf86"/></linearGradient>':'')+
   `<pattern id="bkDot${k}" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(22)"><circle cx="2.5" cy="2.5" r="1.05" fill="#7a1d06"/></pattern>`+
   `<linearGradient id="bkSpot${k}" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>`;s.prepend(d);
  // the burst's own halftone, printed over the letters' lower half (the shade side, away from the spotlights), and the spotlights' sheen on top
  const dots=face.cloneNode(true);dots.removeAttribute('stroke');dots.setAttribute('fill',`url(#bkDot${k})`);dots.setAttribute('class','bk-ovp');
  const sh=face.cloneNode(true);sh.removeAttribute('stroke');sh.setAttribute('fill',`url(#bkSpot${k})`);sh.setAttribute('class','bk-sheen');
  face.after(dots,sh)});
 const place=()=>{const gr=mm.querySelector('.g3-gr');if(!gr)return;const w=gr.offsetWidth,desk=innerWidth>=1000;const ih=desk?w*9/16:w*16/9;
  const cy=ih*(desk?.235:.215);const th=tt.offsetHeight;
  mm.style.setProperty('--bk-tm',Math.round(cy-th/2)+'px');
  // the first card steps in where the ring's ropes are, so the lit corner posts show above it
  const sc=desk?1.55:.86;mm.style.setProperty('--bk-gm',Math.max(16,Math.round(Math.max(ih*(desk?.36:.50),cy+th*sc/2+14)-(cy+th/2)))+'px')};
 place();addEventListener('resize',place);D.fonts.ready.then(place)}
// (3) the head above the rack: the rack is built when the section comes near (h_rounds), so watch for it
const er=F.sec('rounds');const up=()=>{const r=er&&er.querySelector('.hr-rack'),t=er&&er.querySelector('.pp-ttl');if(r&&t&&t.nextElementSibling!==r){r.before(t);er.classList.add('bk-er')}};
if(er){up();new MutationObserver(up).observe(er,{childList:true})}
// (4) the beat between Meet the models and the rounds, live count
const n=F.graded();if(er&&!(er.previousElementSibling&&er.previousElementSibling.classList.contains('wc-beat'))){const p=D.createElement('p');p.className='wc-cap wc-beat bk-beat';
 p.textContent=n+' rounds in. Here is every one…';er.before(p)}
B.ready=true;
})();
