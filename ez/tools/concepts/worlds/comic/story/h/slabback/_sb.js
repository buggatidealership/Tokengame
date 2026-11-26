/* slabback: shared layer. Mounts a take inside the live slab's turned window (#x2pRm .face.back .wc-cert), so the painted acrylic
   holder, the label, the arrows and close stay the live page's own. Every number from the page: RH.data (ROUNDS, __x2pPnl, logo()). */
(function(){const D=document,I='tools/concepts/worlds/comic/story/h/slabback/img/',FD={GPT:'gpt',CLAUDE:'claude',GROK:'grok',KIMI:'kimi'};
const sgn=r=>(r.up?'+':'−')+r.v+'%',mv=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%',off=x=>x.toFixed(2).replace(/\.?0+$/,'')+'% off';
function cert(){const o=D.getElementById('x2pRm');return o&&o.querySelector('.card .face.back .wc-cert')}
function mount(html,cls,g){const ce=cert();if(!ce)throw new Error('no back window');if(getComputedStyle(ce).position==='static')ce.style.position='relative';ce.classList.add('sb-hide');const old=ce.querySelector(':scope>.sb');if(old)old.remove();
  ce.insertAdjacentHTML('beforeend',`<div class="sb ${cls}" data-n="${g.n}">${html}</div>`);const sb=ce.querySelector(':scope>.sb');
  const fb=ce.querySelector('.wc-ce-flip');sb.querySelectorAll('.sb-flip').forEach(b=>{if(fb)b.textContent=fb.textContent.trim();b.addEventListener('click',e=>{e.stopPropagation();fb&&fb.click()})});return sb}
/* the pending replay (mockup only: no round has calls in today): the label shows no grade yet */
function pendLabel(g){D.querySelectorAll('#x2pRm .zlab').forEach(l=>{const ds=l.querySelector('.ds'),gr=l.querySelector('.gr');if(ds)ds.textContent='Final grade';if(gr)gr.textContent='?'
  l.querySelectorAll('*').forEach(x=>{if(/off on avg/i.test(x.textContent)&&!/right/i.test(x.textContent))x.style.display='none'});const hit=[...l.querySelectorAll('*')].filter(e=>/\d of \d right/i.test(e.textContent));const e=hit[hit.length-1];if(e)e.innerHTML='Calls are in'})}
const founder=m=>`media/founder-${FD[m]}-anim.jpg`;
/* a worn stamp: double ring, word, small line; seeded so every strike sits at its own angle */
function stamp(word,small,col,s){RH.seed(s);const r=((RH.rnd()-.5)*16).toFixed(1);return `<span class="sb-stp" style="--c:${col};--r:${r}deg"><b>${word}</b>${small?`<small>${small}</small>`:''}</span>`}
function staple(){return `<svg class="sb-staple" viewBox="0 0 40 12" aria-hidden="true"><path d="M3 9 L3 4 Q3 2 5 2 L35 2 Q37 2 37 4 L37 9" fill="none" stroke="#1b1a1f" stroke-width="3.2" stroke-linecap="round"/><path d="M5 3.4 L35 3.4" stroke="#d8dbe0" stroke-width="1.1"/></svg>`}
/* a torn edge as a clip-path: every tooth its own size */
function torn(s,k=22){RH.seed(s);const t=[],b=[];for(let i=0;i<=k;i++){const x=i/k*100;t.push(x.toFixed(1)+'% '+(RH.rnd()*9).toFixed(1)+'%');b.push((100-x).toFixed(1)+'% '+(91+RH.rnd()*9).toFixed(1)+'%')}return 'polygon('+t.concat(b).join(',')+')'}
function why(g){if(!g.W.length)return g.right?'Nobody wins':'All four went the wrong way';return g.W.length>1?'Shared crown':''}
window.SB={I,mount,pendLabel,founder,stamp,staple,torn,sgn,mv,off,why,
  show(t,n,pend){const g=RH.data(n,pend);if(pend)pendLabel(g);return window['SB_'+t](g)}};
})();
