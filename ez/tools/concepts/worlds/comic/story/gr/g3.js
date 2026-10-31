/* G3 the backstage corridor: four dressing-room doors in season P&L order. Each door's brass plate names its model, the record is
   marker-lettered on a strip of gaffer tape on the floor, the leader's door alone carries the gold-leaf star. On scroll into view each
   door swings open once and the room's key light spills out; the character's loop lives inside. Still under reduced motion. */
(function(){const G=GR,O=G.ORD;
/* doorway crops of the 854x480 source: portrait, clear of the plates baked into the loops */
const CROP={GROK:{x:354,y:0,w:298,h:480},CLAUDE:{x:240,y:0,w:298,h:480},GPT:{x:362,y:95,w:241,h:385},KIMI:{x:300,y:0,w:298,h:480}};
/* each room's own key light, read from the film */
const KEY={GROK:'255,58,40',CLAUDE:'255,96,48',GPT:'47,210,122',KIMI:'255,52,40'};
const star=`<svg class="g3-star" viewBox="0 0 100 96" aria-hidden="true"><defs><linearGradient id="g3gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3bf"/><stop offset=".3" stop-color="#e9b947"/><stop offset=".55" stop-color="#fff1b0"/><stop offset=".8" stop-color="#b17c19"/><stop offset="1" stop-color="#e2b23c"/></linearGradient><linearGradient id="g3gs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c6a14"/><stop offset="1" stop-color="#5e3d08"/></linearGradient></defs>
 <polygon points="50,2 62,36 98,36 69,58 80,93 50,72 20,93 31,58 2,36 38,36" fill="url(#g3gs)" transform="translate(1.5 3)"/>
 <polygon points="50,2 62,36 98,36 69,58 80,93 50,72 20,93 31,58 2,36 38,36" fill="url(#g3gl)" stroke="#6b470c" stroke-width="1.5" stroke-linejoin="round"/>
 <polygon points="50,2 62,36 50,50 38,36" fill="#fff8d8" opacity=".55"/><polygon points="50,50 69,58 80,93 50,72" fill="#7a5210" opacity=".35"/>
 <text x="50" y="62" text-anchor="middle" font-family="Ultra,serif" font-size="30" fill="#4a3006">1</text></svg>`;
const door=(m,i)=>{const d=G.D(m),one=d.rank===1,h=i%2?'r':'l';
 return `<article class="g3d g3d-${h}${one?' g3d-one':''}" style="--k:${KEY[m]}" aria-label="${d.nm} (${d.ver}): number ${d.rank}${one?', golden ticket holder':''}. Season P&L ${d.pm}. W-L ${d.W}-${d.L}.">
  <div class="g3d-lint">${one?star:`<span class="g3d-disc" aria-hidden="true">${d.rank}</span>`}<span class="g3d-plate"><b>${d.nm.toUpperCase()}</b><small>${d.ver}</small></span></div>
  <div class="g3d-frame"><div class="g3d-way">${G.vid(m,CROP[m])}</div>
   <div class="g3d-leaf"><i class="g3d-front"><i class="g3d-pn"></i><i class="g3d-pn"></i><i class="g3d-knob"></i></i><i class="g3d-back"><i class="g3d-pn"></i><i class="g3d-pn"></i></i></div></div>
  <i class="g3d-spill" aria-hidden="true"></i>
  <p class="g3d-tape" aria-hidden="true"><span class="g3d-t1"><small>Season P&amp;L</small> <b class="${d.up?'g3-u':'g3-d'}">${d.pm}</b></span><span class="g3d-t2"><small>W-L</small> <b>${d.W}-${d.L}</b></span></p>
 </article>`};
const head=`<h2 class="wc-h2"><span>Meet the models</span><small>Ranked by season P&amp;L on a pretend $100,000 each.</small></h2>`;
const s=G.mount(head+`<div class="g3c">${O.map(door).join('')}</div>`,'gr-g3');
const ds=[...s.querySelectorAll('.g3d')];
if(G.RM()){ds.forEach(d=>d.classList.add('g3-open','g3-now'))}
else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const d=e.target,i=ds.indexOf(d);setTimeout(()=>d.classList.add('g3-open'),180*(i%2)+120);io.unobserve(d)}}),{threshold:.55});ds.forEach(d=>io.observe(d))}
document.documentElement.classList.add('gr-ready');})();
