/* X2+ MEET THE MODELS, H24 chips8 (drop-in for tools/v22/story/x2p_chips.js), from tools/concepts/worlds/comic/story/h/chips8/_c8.js.
   Default take c (the founder says the line in a balloon); window.__C8T="a" shows take a (the line laser-etched; its images are listed too).
   Media (written out so make_site.py copies them): media/chip8a-grok-1200.jpg media/chip8a-grok-1200.webp media/chip8a-grok-1800.jpg media/chip8a-grok-1800.webp media/chip8a-claude-1200.jpg media/chip8a-claude-1200.webp media/chip8a-claude-1800.jpg media/chip8a-claude-1800.webp media/chip8a-gpt-1200.jpg media/chip8a-gpt-1200.webp media/chip8a-gpt-1800.jpg media/chip8a-gpt-1800.webp media/chip8a-kimi-1200.jpg media/chip8a-kimi-1200.webp media/chip8a-kimi-1800.jpg media/chip8a-kimi-1800.webp media/chip8c-grok-1200.jpg media/chip8c-grok-1200.webp media/chip8c-grok-1800.jpg media/chip8c-grok-1800.webp media/chip8c-claude-1200.jpg media/chip8c-claude-1200.webp media/chip8c-claude-1800.jpg media/chip8c-claude-1800.webp media/chip8c-gpt-1200.jpg media/chip8c-gpt-1200.webp media/chip8c-gpt-1800.jpg media/chip8c-gpt-1800.webp media/chip8c-kimi-1200.jpg media/chip8c-kimi-1200.webp media/chip8c-kimi-1800.jpg media/chip8c-kimi-1800.webp media/try8-1200.jpg media/try8-1200.webp media/try8-1800.jpg media/try8-1800.webp media/rays6.webp media/founder-grok-anim.mp4 media/founder-grok-anim.webm media/founder-grok-anim.jpg media/founder-claude-anim.mp4 media/founder-claude-anim.webm media/founder-claude-anim.jpg media/founder-gpt-anim.mp4 media/founder-gpt-anim.webm media/founder-gpt-anim.jpg media/founder-kimi-anim.mp4 media/founder-kimi-anim.webm media/founder-kimi-anim.jpg */
window.__C8IMG="media/";if(!window.__C8T)window.__C8T="c";
(function(){var n=0;(function go(){if(!document.getElementById("standings")||!window.__x2pPnl||!window.ROUNDS||!window.MODELS){if(++n<400)setTimeout(go,50);return}
try{
/* Round H24 · chips8: Meet the models as character cards. A drop-in replacement for x2p_chips.js (chips7).
   The card (BRIEF-H.md, chips8): the founder BIG in a square window at the chip's right end (chips5's SW geometry: the frame's top level with the
   gold plate's top, its bottom level with the flag field's bottom); the engraved mark, the etched flag, the laser-marked name and version, the
   painted labels NO. / LAST 7 DAYS / LAST ROUND / SEASON, and one laser-etched line of personality along the foot of the label: all painted
   (one master per take, then one nano-banana-pro pass per model on the same pixels; compose.py lays the parts back and tints the ceramic).
   Live, lit in the painted glass with chips7's recipe (gradient, bloom, the window's own glass screened back on top):
     No. n (season-P&L order) · LAST 7 DAYS = P&L of this model's trades graded in the last 7 New York calendar days (today and the six before,
     by each round's close date, as world-comic.js R11 counts it), green or red, the biggest figure; "No trades" (dim) when none, never "$0" ·
     LAST ROUND = the newest graded round this model traded: the company's logo lit, and a ✓ or ✗ for the direction · SEASON = "+$148,480 · 45-27".
   Motion: only the founder loops (muted, only near the screen, never with reduced motion). No re-scans, no flicker, no glow animation.
   Takes (window.__C8T): 'a' = SW (default) · 'b' = the window breaks the chip's top edge (its own master) · 'c' = 'a' with the personality line
   lifted out of the etch into the founder's speech balloon (see REPORT.md, the twelve questions).
   Self-contained: needs window.__x2pPnl, ROUNDS, MODELS and CO_LOGOS. Options: window.__C8IMG (image folder; default this folder's out/),
   window.__C8MEDIA (default 'media/'), window.__C8GRID (outlines every live box), window.__C8NOW (a Date.parse()able time, for boards).
   Media (flat names, for make_site.py): chip8a-grok-1200.jpg chip8a-grok-1200.webp chip8a-grok-1800.jpg chip8a-grok-1800.webp
   chip8a-claude-1200.jpg chip8a-claude-1200.webp chip8a-claude-1800.jpg chip8a-claude-1800.webp chip8a-gpt-1200.jpg chip8a-gpt-1200.webp
   chip8a-gpt-1800.jpg chip8a-gpt-1800.webp chip8a-kimi-1200.jpg chip8a-kimi-1200.webp chip8a-kimi-1800.jpg chip8a-kimi-1800.webp
   chip8b-grok-1200.jpg chip8b-grok-1200.webp chip8b-grok-1800.jpg chip8b-grok-1800.webp chip8b-claude-1200.jpg chip8b-claude-1200.webp
   chip8b-claude-1800.jpg chip8b-claude-1800.webp chip8b-gpt-1200.jpg chip8b-gpt-1200.webp chip8b-gpt-1800.jpg chip8b-gpt-1800.webp
   chip8b-kimi-1200.jpg chip8b-kimi-1200.webp chip8b-kimi-1800.jpg chip8b-kimi-1800.webp chip8c-<m>-1200/1800.jpg/.webp (take c) try8-1200.jpg try8-1200.webp try8-1800.jpg try8-1800.webp
   rays6.webp founder-<m>-anim.mp4/.webm/.jpg
   DOM: inserts <section class="ch c8"> before #standings and hides #standings. window.__c8 = {boxes, fit, rebuild, data}. */
(function(){
const D=document,W=window;if(!W.__x2pPnl||!W.ROUNDS||!W.MODELS)return;
const T=(W.__C8T||'a').toLowerCase(),IMG=W.__C8IMG||'tools/concepts/worlds/comic/story/h/chips8/out/',MED=W.__C8MEDIA||'media/';
if(!D.getElementById('t1-fonts')){const l=D.createElement('link');l.id='t1-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
/* ---------- geometry: the cropped paintings' own pixels, measured (measure.py on the masters, minus the crop) ---------- */
const GA={size:[3760,1520],no:[2385,251,2604,421],d7:[1120,479,2020,759],lr:[2086,478,2604,765],se:[1121,890,2604,1087],core:[2766,305,3612,1179]};
const GB={size:[3760,1500],no:[2275,260,2527,434],d7:[1129,505,1942,765],lr:[2005,506,2528,764],se:[1129,834,1943,1015],core:[2697,107,3630,1106]};
const G=T==='b'?GB:GA,PRE='chip8'+(T==='b'?'b':T==='c'?'c':'a')+'-',TS=[3760,1460];
/* ---------- live data ---------- */
const P=W.__x2pPnl(),A=P.A,MD=W.MODELS,CL=W.CO_LOGOS||{};
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},CC={us:'United States',cn:'China',eu:'European Union'};
/* the personality lines, computed from the sheet by stated rules (owner, 2026-11-02: "we can change the personality lines... the more data... you can see signal"), refreshed with every sync:
   1. the model with the largest share of short calls, if 70% or more: "Shorts almost everything." + "Somehow it's working." if it leads the season, "The market disagrees." if its P&L is negative;
   2. of the others, the model whose calls are the largest on average: "Never met a small move it liked.";
   3. of the others, the last in season P&L, if 55% or more of its calls are long: "Buys every dip. Some dips keep dipping.";
   4. of the others, the one with the largest share of long calls, if 55% or more: "Bullish on everything. Including itself.";
   5. anyone left: "Right on X of Y trades. Ask again tomorrow." (its own record). Each line is used once. */
const LINE=(()=>{const st={},Gd=(window.ROUNDS||[]).filter(r=>r.calls&&r.a!=null);
  for(const r of Gd)for(const[m,c]of r.calls){const s=st[m]=st[m]||{n:0,up:0,sz:0};s.n++;if(/^UP/i.test(c))s.up++;s.sz+=parseFloat(String(c).replace(/[^0-9.]/g,''))||0}
  const ms=Object.keys(A).filter(m=>st[m]&&st[m].n),L={},left=new Set(ms),pl=m=>A[m].bal-100000,byBal=ms.slice().sort((a,b)=>A[b].bal-A[a].bal);
  const pick=(f,score,ok,line)=>{const c=[...left].filter(f).sort((a,b)=>score(b)-score(a))[0];if(c&&ok(c)){L[c]=line(c);left.delete(c)}};
  pick(()=>1,m=>1-st[m].up/st[m].n,m=>1-st[m].up/st[m].n>=.7,m=>'Shorts almost everything.'+(m===byBal[0]?" Somehow it's working.":pl(m)<0?' The market disagrees.':''));
  pick(()=>1,m=>st[m].sz/st[m].n,()=>1,()=>'Never met a small move it liked.');
  pick(m=>m===byBal[byBal.length-1],m=>st[m].up/st[m].n,m=>st[m].up/st[m].n>=.55,()=>'Buys every dip. Some dips keep dipping.');
  pick(()=>1,m=>st[m].up/st[m].n,m=>st[m].up/st[m].n>=.55,()=>'Bullish on everything. Including itself.');
  for(const m of left)L[m]=`Right on ${A[m].W} of ${A[m].W+A[m].L} trades. Ask again tomorrow.`;
  return L})();
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const Gd=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a));
/* New York's today, and how many calendar days ago a round's close date is (R11's rule) */
const NOW=W.__C8NOW?Date.parse(W.__C8NOW):Date.now();
const nyT=(()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date(NOW)),g=k=>+p.find(x=>x.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'))})();
const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=String(r.resolves).split(' ')[0].split('/').map(Number);if(!m)return 1e9;return Math.round((nyT-Date.UTC(2000+(y%100),m-1,d))/864e5)};
const win7=Gd.filter(r=>{const a=dAgo(r);return a>=0&&a<=6});
const d7=m=>{const t=win7.filter(r=>A[m].per[r.n]);return t.length?{n:t.length,v:t.reduce((s,r)=>s+A[m].per[r.n].v,0)}:null};
const lastR=m=>{for(let i=Gd.length-1;i>=0;i--){const r=Gd[i],q=A[m].per[r.n];if(q)return {r,ok:q.v>0}}return null};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=(r,S)=>`left:${pc(r[0],S[0])};top:${pc(r[1],S[1])};width:${pc(r[2]-r[0],S[0])};height:${pc(r[3]-r[1],S[1])}`;
const clip=(r,S)=>`clip-path:inset(${pc(r[1],S[1])} ${pc(S[0]-r[2],S[0])} ${pc(S[1]-r[3],S[1])} ${pc(r[0],S[0])})`;
const img=(n,cls,st)=>`<img class="${cls}" src="${IMG+n}-1200.jpg" srcset="${IMG+n}-1200.webp 1200w, ${IMG+n}-1800.webp 1800w" sizes="(min-width:1000px) 580px, 100vw" alt="" draggable="false" decoding="async" style="${st||''}">`;
/* a lit display: SVG text on the glass in painting units, a bloom, the window's own painted glass screened back over it */
function disp(k,r,txt,cls,n,o){o=o||{};const S=G.size,w=r[2]-r[0],h=r[3]-r[1],fs=h*(o.fs||.7);
  return `<div class="c7-win c8-${k} ${cls}" data-k="${k}" style="${at(r,S)}"><span class="c7-glow"></span>
   <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><g class="c7-fit" data-w="${w*(o.fw||.88)}" data-cx="${w/2}" data-y="${h*.5+fs*.36}"><text x="${w/2}" y="${h*.5+fs*.36}" font-size="${fs}" text-anchor="middle">${txt}</text></g></svg>
   <i class="c7-gl"></i></div>${img(n,'c7-glass',clip(r,S))}`}
/* LAST ROUND: the company's logo lit on the left half of the glass, the ✓ / ✗ LED on the right */
function lastWin(m,n){const S=G.size,r=G.lr,w=r[2]-r[0],h=r[3]-r[1],L=lastR(m);if(!L)return disp('lr',r,'—','c7-amb c8-dim',n);
  const lg=CL[String(L.r.ticker).toUpperCase()],f=lg&&(lg.f||lg),s=Math.min(w,h),u=s*.3,cx=w-h*.5,cy=h/2,sw=s*.1;
  const mk=L.ok?`<path d="M${cx-u} ${cy+u*.02}L${cx-u*.25} ${cy+u*.72}L${cx+u} ${cy-u*.62}" fill="none" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`
   :`<path d="M${cx-u*.72} ${cy-u*.72}L${cx+u*.72} ${cy+u*.72}M${cx+u*.72} ${cy-u*.72}L${cx-u*.72} ${cy+u*.72}" fill="none" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `<div class="c7-win c8-lr ${L.ok?'c8-ok':'c8-no'}" data-k="lr" style="${at(r,S)}"><span class="c7-glow"></span>
   ${f?`<img class="c8-lg" data-src="${MED+f}" alt="" style="left:${pc(h*.14,w)};top:14%;width:${pc(w-h*1.12,w)};height:72%">`:`<b class="c8-tk">${esc(L.r.ticker)}</b>`}
   <i class="c8-led" style="left:${pc(w-h,w)};width:${pc(h,w)}"></i>
   <svg viewBox="0 0 ${w} ${h}" aria-hidden="true">${mk}</svg><i class="c7-gl"></i></div>${img(n,'c7-glass',clip(r,S))}`}
const vid=m=>{const b=MED+'founder-'+m.toLowerCase()+'-anim';return `<video muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
const sm=s=>`<tspan class="c8-sep">${s}</tspan>`;
function chip(m,i){const S=G.size,lit=m===lead,n=PRE+m.toLowerCase(),a=A[m],p=a.bal-100000,s7=d7(m);
  return `<div class="c7-pic c8-pic${lit?' c7-lead':''}" style="aspect-ratio:${S[0]}/${S[1]}">
   ${lit?`<i class="c7-rays" style="background-image:url(${MED}rays6.webp)"></i>`:''}${img(n,'c7-base')}
   <div class="c7-die c8-die" style="${at(G.core,S)}">${vid(m)}</div>
      ${disp('no',G.no,String(i+1),i?'c7-amb':'c7-gold',n)}
   ${s7?disp('d7',G.d7,$(s7.v),s7.v>=0?'c7-up':'c7-dn',n,{fs:.66}):disp('d7',G.d7,'No trades','c7-amb c8-dim',n,{fs:.42})}
   ${lastWin(m,n)}
   ${disp('se',G.se,`${$(p)}${sm(' · ')}${a.W}-${a.L}`,'c7-amb',n,{fs:.56,fw:.9})}</div>`}
/* the fifth chip: four labs still in inference; everything on it is painted, nothing moves */
const TRY=['Mistral','Qwen','Gemini','Nemotron'],TCC={Mistral:'eu',Qwen:'cn',Gemini:'us',Nemotron:'us'};
const tryChip=()=>`<div class="c7-pic c7-t c8-pic" style="aspect-ratio:${TS[0]}/${TS[1]}">${img('try8','c7-base')}</div>`;
const gr=(id,a,b,c)=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset=".08" stop-color="${a}"/><stop offset=".58" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>${gr('c7gA','#fffbe8','#ffd256','#ff9d1c')}${gr('c7gG','#fffdf0','#ffe37a','#ffb21c')}${gr('c7gU','#f4fff7','#7dffb0','#16c45e')}${gr('c7gD','#fff2ee','#ff8a7a','#e3301f')}</defs></svg>`;
const st=D.getElementById('standings'),sec=D.createElement('section');sec.className='ch c7 c8 c8-'+T+(W.__C8GRID?' c7-grid':'');sec.setAttribute('aria-label','Meet the models');
function fitAll(){sec.querySelectorAll('.c7-fit').forEach(g=>{g.removeAttribute('transform');const w=+g.dataset.w,bb=g.getBBox();
  if(bb.width>w){const k=w/bb.width,ax=+g.dataset.cx,y=+g.dataset.y;g.setAttribute('transform',`translate(${ax} ${y}) scale(${k}) translate(${-ax} ${-y})`);g.dataset.k=k.toFixed(3)}else g.dataset.k='1'})}
/* a logo lit on dark glass: every mark is shown as the display's own warm light (as the top's TESLA), so green and red on this window mean only the direction
   (Exxon's mark is two red X's: in its own colour it read as a second ✗); a mark drawn on its own tile keeps the tile */
function lightLogos(){sec.querySelectorAll('img.c8-lg[data-src]').forEach(im=>{const s=im.dataset.src;im.removeAttribute('data-src');const o=new Image();o.onload=()=>{try{
   const c=D.createElement('canvas'),n=64;c.width=c.height=n;const x=c.getContext('2d');x.drawImage(o,0,0,n,n);const d=x.getImageData(0,0,n,n).data;
   const ca=[0,n-1,n*(n-1),n*n-1].map(i=>d[i*4+3]),tile=ca.every(v=>v>200);let L=0,c2=0,S=0;
   for(let i=0;i<d.length;i+=4)if(d[i+3]>128){const r=d[i],g=d[i+1],b=d[i+2];L+=.2126*r+.7152*g+.0722*b;S+=Math.max(r,g,b)-Math.min(r,g,b);c2++}
   const lum=c2?L/c2/255:1,sat=c2?S/c2/255:0;im.classList.add(tile?'c8-tile':'c8-inv')}catch(e){im.classList.add('c8-col')}im.src=s};o.onerror=()=>{im.src=s};o.src=s})}
function build(){
  sec.innerHTML=`${DEFS}<h2 class="ch-h"><span class="ch-w">Meet the</span> <span class="ch-w ch-w2">models</span></h2>
   <p class="ch-sub"><span>Ranked by season P&amp;L.</span> <span>$100K on every call.</span></p>
   <ol class="ch-beats ch-b" aria-hidden="true"><li class="ch-beat"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-g"><b>Season 1</b> <span>· the board, by P&amp;L</span></div>
     <div class="c7-four c8-four">${rank.map((m,i)=>`<div class="c7-one c8-one" data-m="${m}">${T==='c'?`<div class="c8-bal"><span>${esc(LINE[m])}</span></div>`:''}${chip(m,i)}</div>`).join('')}</div></div></div></li>
    <li class="ch-beat ch-tb"><div class="ch-ink"><div class="ch-art"><div class="ch-cap ch-cap-t"><b>No. 5?</b> <span>· not signed yet</span></div>${tryChip()}</div></div></li></ol>
   <ol class="ch-sr">${rank.map((m,i)=>{const s7=d7(m),L=lastR(m),a=A[m];return `<li>No. ${i+1} ${esc(MD[m].ver)}, ${CC[FLAG[m]]}. ${esc(LINE[m])} Last 7 days: ${s7?$(s7.v)+' on '+s7.n+' trade'+(s7.n>1?'s':''):'no trades'}. Last round: ${L?esc(L.r.co)+', '+(L.ok?'right':'wrong')+' direction':'none'}. Season: ${$(a.bal-100000)}, ${a.W}-${a.L} W-L.</li>`}).join('')}
    <li>In inference: ${TRY.map(t=>t+' ('+CC[TCC[t]]+')').join(', ')}</li></ol>`;
  requestAnimationFrame(fitAll);lightLogos();wire()}
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(){if(RM.matches||!('IntersectionObserver' in W)){sec.classList.add('c7-still');return}
  io&&io.disconnect();io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});
  sec.querySelectorAll('video').forEach(v=>io.observe(v))}
if(st){st.before(sec);st.style.display='none'}else D.querySelector('main').append(sec);
build();D.fonts&&D.fonts.ready.then(fitAll);
const rel=(e,R)=>{const r=e.getBoundingClientRect();return [r.left-R.left,r.top-R.top,r.width,r.height].map(v=>+v.toFixed(2))};
W.__c8={boxes:()=>[...sec.querySelectorAll('.c8-one')].map(o=>{const Pc=o.querySelector('.c7-pic'),R=Pc.getBoundingClientRect();
  return {m:o.dataset.m,chip:[R.left,R.top+scrollY,R.width,R.height].map(v=>+v.toFixed(2)),die:rel(o.querySelector('.c7-die'),R),
   ...Object.fromEntries([...o.querySelectorAll('.c7-win')].map(f=>[f.dataset.k,rel(f,R)]))}}),fit:fitAll,rebuild:build,G,T,
  data:{rank,lead,graded:Gd.length,win7:win7.map(r=>r.n),rows:rank.map(m=>{const s=d7(m),L=lastR(m);return [m,s?Math.round(s.v):null,s?s.n:0,L?L.r.n+':'+L.r.ticker+(L.ok?' ✓':' ✗'):null,Math.round(A[m].bal-100000),A[m].W+'-'+A[m].L]})}};
D.documentElement.classList.add('c8-ready');
})();

}catch(e){window.__x2pChipsErr=e;console.error(e)}})()})();
