/* X2+ MEET THE MODELS, H23 chips7 (ported 2026-11-02), from tools/concepts/worlds/comic/story/h/chips7/_c7.js.
   Media (written out so make_site.py copies them): media/chip7-grok-1200.jpg media/chip7-grok-1200.webp media/chip7-grok-1800.jpg media/chip7-grok-1800.webp media/chip7-claude-1200.jpg media/chip7-claude-1200.webp media/chip7-claude-1800.jpg media/chip7-claude-1800.webp media/chip7-gpt-1200.jpg media/chip7-gpt-1200.webp media/chip7-gpt-1800.jpg media/chip7-gpt-1800.webp media/chip7-kimi-1200.jpg media/chip7-kimi-1200.webp media/chip7-kimi-1800.jpg media/chip7-kimi-1800.webp media/try7-1200.jpg media/try7-1200.webp media/try7-1800.jpg media/try7-1800.webp media/rays6.webp media/founder-grok-anim.mp4 media/founder-grok-anim.webm media/founder-grok-anim.jpg media/founder-claude-anim.mp4 media/founder-claude-anim.webm media/founder-claude-anim.jpg media/founder-gpt-anim.mp4 media/founder-gpt-anim.webm media/founder-gpt-anim.jpg media/founder-kimi-anim.mp4 media/founder-kimi-anim.webm media/founder-kimi-anim.jpg */
window.__C7IMG="media/";
(function(){var n=0;(function go(){if(!document.getElementById("standings")||!window.__x2pPnl||!window.ROUNDS||!window.MODELS){if(++n<400)setTimeout(go,50);return}
try{
/* Round H23 · chips7: Meet the models, painted in. A drop-in replacement for x2p_chips.js (chips6).
   ONE master painting (img/m7-master.jpg, gpt-image-2 4K: a ceramic multi-chip module, its substrate dense with thick-film traces, vias and
   SMD parts, a gold logo plate, a recessed flag field, a black epoxy label with dark-glass display windows, an exposed silicon die), then one
   pass per model on the same pixels: gpt-image-2 painted the flag (etched and enamelled into the field) and the name + version (laser-marked in
   the name window), nano-banana-pro engraved the lab's mark into the gold plate from its true silhouette (it keeps the framing to the pixel).
   compose.py lays those parts back on the master and tints the ceramic, so every chip is the same painting: identical geometry, measured.
   Painted (static): the mark, the flag, the name and version, and the labels NO., LAST 5, W-L, SEASON P&L.
   Live (page text, lit as the displays would light it): No., the five Last 5 cells, W-L and the season P&L, each inside its painted window,
   emissive with a bloom, the window's own painted glass glare screened back over it. The founder's loop plays in the die's core.
   Fifth chip: try7 (blank master, then nano-banana-pro painted IN INFERENCE, the four lab marks, names and flags from a typeset guide).
   Self-contained: needs window.__x2pPnl, ROUNDS and MODELS. Optional: window.__C7IMG (image folder; default this folder's out/), window.__C7MEDIA
   (default 'media/'), window.__C7GRID (outlines every live box). Media (flat names, for make_site.py): chip7-grok-1200.jpg chip7-grok-1200.webp
   chip7-grok-1800.jpg chip7-grok-1800.webp chip7-claude-1200.jpg chip7-claude-1200.webp chip7-claude-1800.jpg chip7-claude-1800.webp
   chip7-gpt-1200.jpg chip7-gpt-1200.webp chip7-gpt-1800.jpg chip7-gpt-1800.webp chip7-kimi-1200.jpg chip7-kimi-1200.webp chip7-kimi-1800.jpg
   chip7-kimi-1800.webp try7-1200.jpg try7-1200.webp try7-1800.jpg try7-1800.webp rays6.webp
   DOM: inserts <section class="ch c7"> before #standings and hides #standings (or appends to <main>). window.__c7 = {boxes, fit, rebuild, data}. */
(function(){
const D=document,W=window;if(!W.__x2pPnl||!W.ROUNDS||!W.MODELS)return;
const IMG=W.__C7IMG||'tools/concepts/worlds/comic/story/h/chips7/out/',MED=W.__C7MEDIA||'media/';
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
/* ---------- geometry: the master's own pixels (3760 x 1520), measured on img/m7-master.jpg (boxes.py, compose.py) ---------- */
const G={size:[3760,1520],
  no:[2333,267,2585,458],                /* the NO. window's glass, inside its gold bezel */
  wl:[2189,520,2585,720],                /* the W-L window */
  pnl:[1136,787,2585,1203],              /* the SEASON P&L window */
  cells:[[1093,546,1237,699],[1282,546,1425,700],[1470,546,1613,700],[1659,546,1803,700],[1848,546,1992,699]], /* the five LAST 5 windows */
  core:[2972,420,3456,1028],             /* the die's core, inside the pad ring: the founder's loop */
  plate:[153,231,717,757],flag:[214,812,622,1118],name:[835,270,2121,458]};
const TG={size:[6336,2688],dies:[[786,961,1454,1632],[2122,960,2799,1625],[3461,960,4136,1626],[4799,961,5476,1624]]};
/* ---------- live data ---------- */
const A=W.__x2pPnl().A,MD=W.MODELS;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},CC={us:'United States',cn:'China',eu:'European Union'};
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const wl=m=>A[m].W+'-'+A[m].L;
const Gd=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)),L5=Gd.slice(-5);
const last5=m=>L5.map(r=>{const p=A[m].per[r.n];return p?(p.v>0?'W':'L'):'-'});
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- boxes in % of the painting ---------- */
const pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=(r,S)=>`left:${pc(r[0],S[0])};top:${pc(r[1],S[1])};width:${pc(r[2]-r[0],S[0])};height:${pc(r[3]-r[1],S[1])}`;
const clip=(r,S)=>`clip-path:inset(${pc(r[1],S[1])} ${pc(S[0]-r[2],S[0])} ${pc(S[1]-r[3],S[1])} ${pc(r[0],S[0])})`;
const img=(n,cls,st,S)=>`<img class="${cls}" src="${IMG+n}-1200.jpg" srcset="${IMG+n}-1200.webp 1200w, ${IMG+n}-1800.webp 1800w" sizes="(min-width:1000px) 580px, 100vw" alt="" draggable="false" decoding="async" style="${st||''}">`;
/* a lit display: the figure on the glass in master units (an SVG laid exactly on the window), a bloom, then the window's own painted glass
   (the same image, clipped to the window) screened back over it, so the painting's glare and reflections sit on top of the light */
function disp(k,r,txt,cls,n){const S=G.size,w=r[2]-r[0],h=r[3]-r[1],fs=h*.74;
  return `<div class="c7-win c7-${k} ${cls}" data-k="${k}" style="${at(r,S)}"><span class="c7-glow"></span>
   <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><g class="c7-fit" data-w="${w*.88}" data-cx="${w/2}" data-y="${h*.5+fs*.36}"><text x="${w/2}" y="${h*.5+fs*.36}" font-size="${fs}" text-anchor="middle">${esc(txt)}</text></g></svg>
   <i class="c7-gl"></i><i class="c7-scan"></i></div>${img(n,'c7-glass',clip(r,S))}`}
/* a Last 5 cell: an LED behind the glass, lit green (right way) or red (wrong way), the mark in it; dim when there was no call */
function cell(k,i,r,n){const S=G.size,w=r[2]-r[0],h=r[3]-r[1],s=Math.min(w,h),sw=s*.11,cx=w/2,cy=h/2,u=s*.5;
  const g=k==='W'?`<path d="M${cx-u} ${cy+u*.02}L${cx-u*.25} ${cy+u*.72}L${cx+u} ${cy-u*.62}" fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`
   :k==='L'?`<path d="M${cx-u*.72} ${cy-u*.72}L${cx+u*.72} ${cy+u*.72}M${cx+u*.72} ${cy-u*.72}L${cx-u*.72} ${cy+u*.72}" fill="none" stroke-width="${sw}" stroke-linecap="round"/>`
   :`<path d="M${cx-u*.55} ${cy}H${cx+u*.55}" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `<div class="c7-win c7-cell c7-${k==='W'?'w':k==='L'?'l':'n'}" data-k="c${i}" style="${at(r,S)}"><span class="c7-glow"></span><svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${g}</svg></div>${img(n,'c7-glass',clip(r,S))}`}
const vid=m=>{const b=MED+'founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
/* ---------- one chip ---------- */
function chip(m,i){const S=G.size,lit=m===lead,n='chip7-'+m.toLowerCase(),p=pnl(m);
  return `<div class="c7-pic${lit?' c7-lead':''}">
   ${lit?`<i class="c7-rays" style="background-image:url(${MED}rays6.webp)"></i>`:''}${img(n,'c7-base')}
   <div class="c7-die" style="${at(G.core,S)}">${vid(m)}</div>
   ${disp('no',G.no,String(i+1),i?'c7-amb':'c7-gold',n)}
   ${disp('wl',G.wl,wl(m),'c7-amb',n)}
   ${disp('pnl',G.pnl,$(p),p>=0?'c7-up':'c7-dn',n)}
   ${last5(m).map((k,j)=>cell(k,j,G.cells[j],n)).join('')}</div>`}
/* ---------- the fifth chip: four labs still in inference; everything on it is painted, a slow scan passes each die ---------- */
const TRY=['Mistral','Qwen','Gemini','Nemotron'],TCC={Mistral:'eu',Qwen:'cn',Gemini:'us',Nemotron:'us'};
function tryChip(){const S=TG.size;
  const dies=TG.dies.map((r,i)=>{const w=r[2]-r[0],h=r[3]-r[1],k=.1,q=[r[0]+w*k,r[1]+h*k,r[2]-w*k,r[3]-h*k];return `<div class="c7-try c7-try${i}" style="${at(q,S)}"><i class="c7-tscan"></i></div>`}).join('');
  return `<div class="c7-pic c7-t" style="aspect-ratio:${S[0]}/${S[1]}">${img('try7','c7-base')}${dies}</div>`}
/* ---------- mount ---------- */
/* the figures' ink: each display's light runs from near-white at the top to its colour at the foot, as the NVIDIA timer's digits do */
const gr=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".08" stop-color="${a}"/><stop offset=".58" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${gr('c7gA','#fffbe8','#ffd256','#ff9d1c')}${gr('c7gG','#fffdf0','#ffe37a','#ffb21c')}${gr('c7gU','#f4fff7','#7dffb0','#16c45e')}${gr('c7gD','#fff2ee','#ff8a7a','#e3301f')}</defs></svg>`;
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch c7'+(W.__C7GRID?' c7-grid':'');sec.setAttribute('aria-label','Meet the models');
function fitAll(){sec.querySelectorAll('.c7-fit').forEach(g=>{g.removeAttribute('transform');const w=+g.dataset.w,bb=g.getBBox();
  if(bb.width>w){const k=w/bb.width,ax=+g.dataset.cx,y=+g.dataset.y;g.setAttribute('transform',`translate(${ax} ${y}) scale(${k}) translate(${-ax} ${-y})`);g.dataset.k=k.toFixed(3)}else g.dataset.k='1'})}
function build(){
  sec.innerHTML=`${DEFS}<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>
   <ol class="ch-beats ch-b" aria-hidden="true"><li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>Season 1</b> <span>· the board, by P&amp;L</span></div>
     <div class="c7-four">${rank.map((m,i)=>`<div class="c7-one" data-m="${m}">${chip(m,i)}</div>`).join('')}</div></div></div></li>
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-t"><b>No. 5?</b> <span>· not signed yet</span></div>${tryChip()}</div></div></li></ol>
   <ol class="ch-sr">${rank.map((m,i)=>`<li>No. ${i+1} ${esc(MD[m].ver)}, ${CC[FLAG[m]]}: last five ${last5(m).map(k=>k==='W'?'right':k==='L'?'wrong':'no call').join(', ')}; ${wl(m)} W-L; season P&L ${$(pnl(m))}</li>`).join('')}
    <li>In inference: ${TRY.map(t=>t+' ('+CC[TCC[t]]+')').join(', ')}</li></ol>`;
  requestAnimationFrame(fitAll);wire()}
/* motion: the loops play muted only near the screen; the displays re-scan now and then (a short refresh, staggered), only while on screen */
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){sec.querySelectorAll('.c7-win:not(.c7-cell)').forEach((e,i)=>e.style.setProperty('--d',(-(i*1.37)%7).toFixed(2)+'s'));
  if(RM.matches||!('IntersectionObserver' in W)){sec.classList.add('c7-still');return}
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(v.tagName==='VIDEO'){if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}
    else v.classList.toggle('c7-on',e.isIntersecting)}),{rootMargin:'80px 0px'});
  sec.querySelectorAll('video,.c7-pic').forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();D.fonts&&D.fonts.ready.then(fitAll);
const rel=(e,R)=>{const r=e.getBoundingClientRect();return [r.left-R.left,r.top-R.top,r.width,r.height].map(v=>+v.toFixed(2))};
W.__c7={boxes:()=>[...sec.querySelectorAll('.c7-one')].map(o=>{const P=o.querySelector('.c7-pic'),R=P.getBoundingClientRect();
  return {m:o.dataset.m,chip:[R.left,R.top+scrollY,R.width,R.height].map(v=>+v.toFixed(2)),die:rel(o.querySelector('.c7-die'),R),
   ...Object.fromEntries([...o.querySelectorAll('.c7-win')].map(f=>[f.dataset.k,rel(f,R)]))}}),fit:fitAll,rebuild:build,G,
  data:{rank,lead,lot:Gd.length,rows:rank.map(m=>[m,pnl(m),wl(m),last5(m).join('')]),l5:L5.map(r=>r.n)}};
D.documentElement.classList.add('c7-ready');
})();

}catch(e){window.__x2pChipsErr=e;console.error(e)}})()})();
