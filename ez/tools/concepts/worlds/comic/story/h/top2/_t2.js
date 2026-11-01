/* top2 kit (Round H15): replaces X2+'s top (headline, film bill, live strip) with three beats in the NVIDIA chip's art style.
   Take = window.__t2Take: 'c' objects on the void, 'd' the machine. Every live word sits on a surface the painting left blank for it,
   placed in the painting's own pixel space (% of the image, mapped through the frame's crop), or in a caption box.
   Data only from the page: ROUNDS (newest graded round), MODELS, CO_LOGOS, __x2pPnl (P&L, W-L, its usd formatter). */
(function(){
const D=document,TK=window.__t2Take||'c',IMG='tools/concepts/worlds/comic/story/h/top2/img/',RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---- data ---- */
function data(){
  const R=[...ROUNDS].filter(r=>r.out&&r.calls&&r.calls.length).sort((a,b)=>a.n-b.n),r=R[R.length-1];
  const P=__x2pPnl(),A=P.A,ord=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl);
  const calls=r.calls.map(([m,c])=>{const up=/^UP/i.test(c),v=(c.match(/[\d.]+/)||[''])[0];return {m,up,v}});
  return {r,calls,P,A,ord,lead:ord[0]}}
/* the AI's mark printed in one ink on a cream disc, gold rim (svg, 24 box) */
function mark(m,cls){const M=MODELS[m]||{};const c=/^#111/.test(M.c||'')?'#15121a':M.c;
  return `<i class="t2-mk ${cls||''}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d||''}" fill-rule="${M.fr||'nonzero'}" fill="${c}"/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}</svg></i>`}
const co=r=>`${esc(r.co)} (${esc(r.ticker)})`;
const pnl=(P,v)=>P.usd(v);
const arw=up=>up?'▲':'▼';
/* ---- a painted frame: img = {src, iw, ih}; crop = [x,y,w,h] in % of the image; sfc = surfaces in image % ---- */
function art({src,crop,ar,cls},inner){return `<div class="t2-art ${cls||''}" style="--ar:${ar};background-image:url(${IMG+src});background-size:${10000/crop[2]}% ${10000/crop[3]}%;background-position:${crop[0]/(100-crop[2])*100||0}% ${crop[1]/(100-crop[3])*100||0}%" data-crop='${JSON.stringify(crop)}'>${inner||''}</div>`}
/* a surface: box in image % [x0,y0,x1,y1] (or centre form {cx,cy,w,h,rot,skew}), mapped into the crop */
function sfc(crop,b,html,cls,extra){let cx,cy,w,h,rot=0,sk=0;
  if(Array.isArray(b)){cx=(b[0]+b[2])/2;cy=(b[1]+b[3])/2;w=b[2]-b[0];h=b[3]-b[1]}else({cx,cy,w,h,rot=0,skew:sk=0}=b);
  const L=(cx-crop[0])/crop[2]*100,T=(cy-crop[1])/crop[3]*100,W=w/crop[2]*100,H=h/crop[3]*100;
  return `<div class="t2-s ${cls||''}" style="left:${L}%;top:${T}%;width:${W}%;height:${H}%;transform:translate(-50%,-50%) rotate(${rot}deg) skewX(${sk}deg);${extra||''}">${html}</div>`}

/* ---- the takes ---- */
const TAKES={
 c:{name:'Objects on the void',
  head:['Four AIs call earnings.','The market keeps score.'],
  hero:{p:{src:'c0s.jpg',crop:[4,4,92,80]},d:{src:'c0w.jpg',crop:[8,0,84,100]},
    rows:{p:[[24,31,85,39],[24,41.5,86,49.5],[23.5,52,86.5,60.5],[23,63,87,71]],d:[[26,33,81.5,43],[25.5,46,82,55],[25,58.5,82.5,68],[25,71,83,81]]},
    lamps:{p:[[18.5,35,7.6],[18,45.5,7.6],[17.5,56,7.8],[17,66.5,8]],d:[[22,38,5],[21.5,50.5,5],[21,63,5.2],[20.5,76,5.4]]}},
  f:[
   {w:'CALL',line:'Each AI calls the move before the report.',src:'c1b-letter.jpg',crop:[8,6,84,84],cls:'t2-call',
    s:(d,cr)=>{const L=[23,31.5,40,48.5];return d.calls.map((c,i)=>sfc(cr,[25,L[i]-3.6,75,L[i]+3.6],`${mark(c.m)}<b>${NM[c.m]}</b><em class="${c.up?'t2u':'t2d'}">${arw(c.up)}${c.v}%</em>`,'t2-ln')).join('')
      +sfc(cr,{cx:50,cy:88.5,w:46,h:5,rot:0},`<span>${co(d.r)}</span>`,'t2-adr')}},
   {w:'BELL',line:'The closing bell says who was right.',src:'c2-bell.jpg',crop:[10,8,82,82],cls:'t2-bell',
    s:(d,cr)=>sfc(cr,[29.5,71.5,77.5,83.5],`<span class="t2-e1">${co(d.r)} · close</span><span class="t2-e2 ${d.r.a>=0?'t2u':'t2d'}">${esc(d.r.out)}</span>`,'t2-plate'),
    fx:'<i class="t2-ding" aria-hidden="true">DING!</i><svg class="t2-ml" viewBox="0 0 100 100" aria-hidden="true"><path d="M17 30 q-6 10 0 20M11 26 q-9 14 0 28M83 30 q6 10 0 20M89 26 q9 14 0 28"/></svg>'},
   {w:'#1',line:'The top of the board holds the golden ticket.',src:'c3-ticket.jpg',crop:[12,12,78,78],cls:'t2-tix',
    s:(d,cr)=>{const a=d.A[d.lead];return sfc(cr,{cx:55.5,cy:50,w:50,h:18,rot:-8.4},`<div class="t2-tr1">${mark(d.lead)}<b>${NM[d.lead]}</b><em>${a.W}-${a.L}</em></div><div class="t2-tr2 ${a.pnl>=0?'t2u':'t2d'}">${pnl(d.P,a.pnl)} <small>P&amp;L</small></div>`,'t2-tk')}},
   {w:'BET',line:'We follow its call. Bet #1: NVIDIA.',src:'c4-vault.jpg',crop:[30,8,64,64],cls:'t2-vault',
    s:(d,cr)=>sfc(cr,{cx:60,cy:30.2,w:28,h:7,rot:-1.5},`<span class="t2-e2s">Bet #1: NVIDIA</span>`,'t2-plate t2-plate1'),
    wheel:[60.6,52.3,26]}
  ]},
 d:{name:'The machine',
  head:['4 AIs. Every earnings report.','One scoreboard.'],
  hero:{p:{src:'d0s.jpg',crop:[4,2,92,92]},d:{src:'d0w.jpg',crop:[10,0,80,100]},
    disp:{p:[31,25.5,73,52.5],d:[40.5,22,63.5,57]}},
  f:[
   {w:'CALL',line:'Each AI calls the move before the report.',src:'d1b-cards.jpg',crop:[14,22,72,72],cls:'t2-cards',
    s:(d,cr)=>{const X=[[21.5,33.5],[37,49],[52,63.5],[67,78.5]];return d.calls.map((c,i)=>sfc(cr,[X[i][0],38,X[i][1],62],`${mark(c.m)}<b>${NM[c.m]}</b><em class="${c.up?'t2u':'t2d'}">${arw(c.up)}<br>${c.v}%</em>`,'t2-card')).join('')
      +sfc(cr,[19,71,79,75.5],`<span>R${d.r.n} · ${co(d.r)}</span>`,'t2-plate t2-bar')}},
   {w:'BELL',line:'The closing bell says who was right.',src:'d2-striker.jpg',crop:[12,10,80,80],cls:'t2-bell',
    s:(d,cr)=>sfc(cr,{cx:59.6,cy:66.2,w:24,h:24},`<span class="t2-d1">${esc(d.r.ticker)} close</span><span class="t2-d2 ${d.r.a>=0?'t2u':'t2d'}">${esc(d.r.out)}</span>`,'t2-dial'),
    fx:'<i class="t2-ding" aria-hidden="true">DING!</i><svg class="t2-ml" viewBox="0 0 100 100" aria-hidden="true"><path d="M17 22 q-6 10 0 20M11 18 q-9 14 0 28M83 22 q6 10 0 20M89 18 q9 14 0 28"/></svg>'},
   {w:'#1',line:'The top of the board holds the golden ticket.',src:'d3-chute.jpg',crop:[22,28,70,70],cls:'t2-tix',
    s:(d,cr)=>{const a=d.A[d.lead];return sfc(cr,{cx:65.5,cy:72.5,w:22,h:26,rot:6,skew:16},`${mark(d.lead)}<b>${NM[d.lead]}</b><div class="t2-tr2 ${a.pnl>=0?'t2u':'t2d'}">${d.P.usd(a.pnl,1)}</div><em>${a.W}-${a.L}</em>`,'t2-tk t2-tkv')}},
   {w:'BET',line:'We follow its call. Bet #1: NVIDIA.',src:'d4-hatch.jpg',crop:[14,8,76,76],cls:'t2-vault',
    s:(d,cr)=>sfc(cr,[30,19,70,30],`<span class="t2-e2s">Bet #1: NVIDIA</span>`,'t2-plate t2-plate1'),
    wheel:[70.6,60,13]}
  ]}
};
const T=TAKES[TK];
function heroHtml(d,dk){const H=T.hero,v=dk?H.d:H.p,cr=v.crop,ar=(cr[2]*(dk?16:1))/(cr[3]*(dk?9:1));let inner='';
  if(H.rows){const rows=H.rows[dk?'d':'p'],lamps=H.lamps[dk?'d':'p'];
    inner=d.ord.map((m,i)=>{const a=d.A[m],l=lamps[i];
      return sfc(cr,{cx:l[0],cy:l[1],w:l[2]*(dk?9/16:1),h:l[2]},mark(m),'t2-lamp'+(i===0?' on':''),`width:${l[2]/cr[2]*100}%;height:auto;aspect-ratio:1`)
        +sfc(cr,rows[i],`<b>${NM[m]}</b><em>${a.W}-${a.L}</em><span class="${a.pnl>=0?'t2u':'t2d'}">${d.P.usd(a.pnl)}</span>`,'t2-row'+(i===0?' on':''))}).join('')}
  else{const b=H.disp[dk?'d':'p'];
    inner=sfc(cr,b,`<div class="t2-di"><div class="t2-dh">Season 1 · P&amp;L</div>`+d.ord.map((m,i)=>{const a=d.A[m];return `<div class="t2-dr${i===0?' on':''}">${mark(m)}<b>${NM[m]}</b><span class="${a.pnl>=0?'t2u':'t2d'}">${d.P.usd(a.pnl,1)}</span></div>`}).join('')+'</div>','t2-disp')}
  return art({src:v.src,crop:cr,ar,cls:'t2-hero'},inner)}
function frameHtml(f,d,i){const inner=f.s(d,f.crop)+(f.fx||'')+(f.wheel?`<i class="t2-wh" style="left:${(f.wheel[0]-f.crop[0])/f.crop[2]*100}%;top:${(f.wheel[1]-f.crop[1])/f.crop[3]*100}%;width:${f.wheel[2]/f.crop[2]*100}%;background-image:url(${IMG+f.src});background-size:${10000/f.wheel[2]}% ${10000/f.wheel[2]}%;background-position:${(f.wheel[0]-f.wheel[2]/2)/(100-f.wheel[2])*100}% ${(f.wheel[1]-f.wheel[2]/2)/(100-f.wheel[2])*100}%"></i>`:'');
  return `<li class="t2-f ${f.cls}" tabindex="0"><span class="t2-w" aria-hidden="true">${f.w}</span>${art({src:f.src,crop:f.crop,ar:1},inner)}<p>${f.line}</p></li>`}
function build(){const d=data(),dk=innerWidth>=900;
  const sec=D.createElement('section');sec.className='t2 t2-'+TK;sec.setAttribute('aria-label','What EZ is');
  sec.innerHTML=`<div class="t2-b1"><h1 class="t2-h"><span>${T.head[0]}</span><span class="t2-h2">${T.head[1]}</span></h1>${heroHtml(d,dk)}</div>
   <div class="t2-b2"><div class="t2-cap"><span>How a round works</span></div><ol class="t2-g">${T.f.map((f,i)=>frameHtml(f,d,i)).join('')}</ol>
   <p class="t2-ft">Round ${d.r.n}, ${co(d.r)}, live from the sheet.</p></div>
   <div class="t2-b3"><h2 class="t2-fh"><span>Watch the whole thing</span> <small>1:20</small></h2><div class="t2-film"><video playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg"><source src="media/ez-landing-v4.mp4" type="video/mp4"></video><button class="t2-play" type="button" aria-label="Play the film, 1:20, with sound"><i></i></button></div></div>`;
  return sec}
function film(sec){const f=sec.querySelector('.t2-film'),v=f.querySelector('video'),b=f.querySelector('.t2-play');
  b.onclick=()=>{v.muted=false;v.controls=true;v.play();f.classList.add('on')};v.onended=()=>{f.classList.remove('on');v.controls=false}}
/* each headline line on one line: step its size down until it fits the panel's width */
/* engraved lines stay one line on their plate: step down until they fit the surface */
function fitS(){D.querySelectorAll('.t2 :is(.t2-e1,.t2-adr span,.t2-bar span,.t2-e2s)').forEach(s=>{s.style.fontSize='';const q=s.closest('.t2-s').getBoundingClientRect();let k=1,b=parseFloat(getComputedStyle(s).fontSize);
  while(s.getBoundingClientRect().width>q.width*.94&&k>.5){k-=.04;s.style.fontSize=(b*k)+'px'}})}
function fitH(){fitS();D.querySelectorAll('.t2-h>span').forEach(s=>{s.style.fontSize='';const P=s.parentElement.getBoundingClientRect().right-6;let k=1;
  while(s.getBoundingClientRect().right>P&&k>.4){k-=.03;s.style.fontSize=k+'em'}})}
function go(n){const st=D.querySelector('#standings');
  if(!st||!window.ROUNDS||!window.__x2pPnl){if(n<200)return setTimeout(()=>go(n+1),150);return}
  const sec=build();st.before(sec);film(sec);
  D.documentElement.classList.add('t2-on');
  let w=innerWidth;addEventListener('resize',()=>{if((innerWidth>=900)!==(w>=900)){w=innerWidth;const s2=build();D.querySelector('section.t2').replaceWith(s2);film(s2)}});
  /* micro-interactions: hover on desktop, a tap plays it once on a phone; all diegetic, none needed to read the fact */
  D.addEventListener('pointerdown',e=>{const f=e.target.closest('.t2-f');if(!f||RM)return;f.classList.remove('t2-go');void f.offsetWidth;f.classList.add('t2-go');setTimeout(()=>f.classList.remove('t2-go'),1300)});
  D.addEventListener('keydown',e=>{const f=e.target.closest&&e.target.closest('.t2-f');if(f&&(e.key==='Enter'||e.key===' ')&&!RM){e.preventDefault();f.classList.remove('t2-go');void f.offsetWidth;f.classList.add('t2-go');setTimeout(()=>f.classList.remove('t2-go'),1300)}});
  /* the #1 ticket follows the pointer a little and catches the light */
  D.addEventListener('pointermove',e=>{const a=e.target.closest&&e.target.closest('.t2-tix .t2-art');D.querySelectorAll('.t2-tix .t2-art').forEach(x=>{if(x!==a){x.style.removeProperty('--rx');x.style.removeProperty('--ry')}});
    if(!a||RM||e.pointerType!=='mouse')return;const r=a.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;a.style.setProperty('--ry',(x*16).toFixed(1)+'deg');a.style.setProperty('--rx',(-y*12).toFixed(1)+'deg');a.style.setProperty('--gx',((x+.5)*100).toFixed(0)+'%')});
  fitH();D.fonts&&D.fonts.ready.then(fitH);addEventListener('resize',fitH);
  D.documentElement.classList.add('t2-ready')}
go(0);
})();
