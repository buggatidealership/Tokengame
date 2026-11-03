/* X2+ OVERVIEW, round H24 (2026-11-02, the lead's picks; X2+ only): ground G1 (the board, gold edge fingers between beats), rounds D (the ledger grows),
   proof T1 (the scope) + C1 (the close), and the bet ported from X3+ (bet2x). Media: media/gr4-g1-board-p.jpg media/gr4-g1-board-l.jpg media/gr4-s1-fingers.jpg
   media/rounds-h24-ledger.jpg media/rounds-h24-wafer.jpg media/rounds-h24-die.jpg media/p5-scope.jpg media/p5-sockets.jpg media/p5-panel.jpg media/bet-chip-h2.jpg
   media/bet-ground-h2-phone.jpg media/bet-ground-h2-desk.jpg */
window.__G4='g1';window.__G4M='media/';
(function(){var n=0;(function go(){if(!(document.querySelector("section.t4"))){if(++n<400)setTimeout(go,50);return}
try{
// Round H24 · ground4: the page's own ground on X2+. window.__G4 = 'g1'..'g5' picks the take; window.__G4M = base url of the tiles.
(function(){const id=window.__G4;if(!id)return;const M=window.__G4M||'tools/concepts/worlds/comic/story/h/ground4/out/';
const T={g1:{k:'g1-board',s:'s1-fingers',nm:'The board'},g2:{k:'g2-wafer',s:'s2-scribe',nm:'The wafer'},g3:{k:'g3-rack',s:'s3-blank',nm:'The rack'},g4:{k:'g4-bus',s:'s4-junction',nm:'The bus',bus:1},g5:{k:'g5-void',s:null,nm:'The void'}}[id];
const D=document.documentElement;D.classList.add('g4',...('g4-'+id).split(' '));
const css=`
/* GPU (2026-11-02): with the ground on html the fixed night ground draws nothing, and as a fixed layer under the page it pushed the whole page into a second full-screen layer (about 10 MB of tiles at 2.75x), so it goes */
html.g4.x2p.x2d[data-theme="dark"] body::before{content:none!important;background:none!important}
html.g4{background:#030408 url(${M}gr4-${T.k}-p.jpg) 50% 0/100% auto repeat-y!important}
@media (min-width:760px){html.g4{background-image:url(${M}gr4-${T.k}-l.jpg)!important}}
${T.s?`
/* H34 (owner, 2026-11-02, night): every beat and section break is one torn comic-paper gutter (the H21 top6 pick, BG 1: a cream strip ripped
   along both edges, ink outline, a red sliver under it, a halftone shadow), full bleed, with real room above and below. Drawn by __x2pTears. */
html.g4 :is(.t5-bg,.g4-gut,.p5-gut).x2p-tear{display:block;position:relative;pointer-events:none;box-sizing:border-box;width:100vw!important;height:var(--tear-h,46px)!important;max-height:none!important;min-height:0!important;aspect-ratio:auto!important;
 margin:var(--tear-a,44px) 0 var(--tear-b,40px) calc(50% - 50vw)!important;background:none!important;filter:none!important;grid-column:1/-1}
html.g4 main.wrap>.g4-gut.x2p-tear.x2p-tear-x{display:none!important}
html.g4 .x2p-tear>svg{visibility:visible!important;position:absolute;left:0;top:0;display:block;overflow:visible}
@media (min-width:1000px){html.g4 :is(.t5-bg,.g4-gut,.p5-gut).x2p-tear{--tear-h:58px;--tear-a:64px;--tear-b:60px}html.g4 #get .p5-gut.x2p-tear{display:none!important}}
html.g4 .f4-cx{display:none!important}
`:''}
${T.bus?`
html.g4 .g4-bus{position:absolute;z-index:-1;left:0;top:0;width:100%;height:var(--g4h,0px);overflow:hidden;pointer-events:none}
html.g4 .g4-bus i{position:absolute;left:calc(50% - 2px);top:-140px;width:4px;height:140px;border-radius:3px;background:linear-gradient(180deg,transparent,rgba(255,214,110,.0) 20%,rgba(255,222,140,.85) 85%,#fff6d8);box-shadow:0 0 8px 2px rgba(255,190,60,.45);will-change:transform;animation:g4run 14s linear infinite}
html.g4 .g4-bus i:nth-child(2){left:calc(50% - 26px);animation-delay:-5s;animation-duration:17s}
html.g4 .g4-bus i:nth-child(3){left:calc(50% + 22px);animation-delay:-10s;animation-duration:15s}
@keyframes g4run{to{transform:translateY(calc(var(--g4h,8000px) + 140px))}}
@media (prefers-reduced-motion:reduce){html.g4 .g4-bus i{animation:none;display:none}}
`:''}`;
const st=document.createElement('style');st.id='g4-css';st.textContent=css;document.head.appendChild(st);
/* H34: the torn paper, drawn per gutter at its own width (seeded by width and position, so each tear differs and stays put across loads) */
function rnd(seed){let x=seed*9301+49297;return()=>(x=(x*9301+49297)%233280)/233280}
function tear(el,k){let svg=el.querySelector(':scope>svg');if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');el.appendChild(svg)}
  svg.setAttribute('aria-hidden','true');svg.setAttribute('preserveAspectRatio','none');svg.classList.add('t5-bgs');
  const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const key=w+'x'+h+':'+k;if(el.dataset.tear===key)return;el.dataset.tear=key;
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
  const r=rnd((w|0)+k*977),edge=(y0,amp,step,down)=>{let pts=[];for(let x=0;x<=w+step;x+=step*(.6+r()*.8))pts.push([Math.min(x,w),y0+(r()-.5)*amp*2+(down&&r()<.18?amp*1.4:0)]);return pts};
  const t=edge(h*.26,h*.07,7),b=edge(h*.7,h*.08,6,1).reverse(),P=t.concat(b),d='M'+P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' L')+'Z';
  let dots='';for(let x=4;x<w;x+=6)for(let j=0;j<4;j++){const y=h*.78+j*4.2,rr=1.6-j*.38;if(rr>.2)dots+=`<circle cx="${(x+(j%2)*3).toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(2)}"/>`}
  /* fibres where the paper ripped: a pale line just inside the top tear */
  svg.innerHTML=`<g fill="#f8f0d9" opacity=".22">${dots}</g><path d="${d}" fill="#c42a20" transform="translate(2,3.4)"/><path d="${d}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="2.2" stroke-linejoin="round"/><path d="${'M'+t.map(p=>p[0].toFixed(1)+','+(p[1]+2.6).toFixed(1)).join(' L')}" fill="none" stroke="#c9bc98" stroke-width="1.4" opacity=".8"/><path d="${'M'+b.slice().reverse().map(p=>p[0].toFixed(1)+','+(p[1]-2.6).toFixed(1)).join(' L')}" fill="none" stroke="#d9cdb0" stroke-width="1.1" opacity=".7"/>`}
/* the content edges of a block: the lowest (or highest) visible leaf, so the room above and below each tear is what the eye sees, not the
   sections' paddings (the hidden old carousel, screen-reader tables and inert parts are skipped whole) */
function edge(el,top){let v=top?1e9:-1e9;const SK='.r6-old,.p5-sr,[inert],.x2p-sr,.m14-sr,.x2p-tear',LF=/^(svg|img|video|canvas|picture|button|iframe)$/i,O={checkOpacity:true,checkVisibilityCSS:true};
  const walk=n=>{for(let c=n.firstElementChild;c;c=c.nextElementSibling){if(c.matches(SK)||(c.checkVisibility&&!c.checkVisibility(O)))continue;
    if(!c.firstElementChild||LF.test(c.tagName)){const r=c.getBoundingClientRect();if(r.width<2||r.height<2||r.right<0||r.left>innerWidth)continue;v=top?Math.min(v,r.top):Math.max(v,r.bottom)}else walk(c)}};
  walk(el);return Math.abs(v)<1e8?v:null}
const isG=e=>e&&e.matches&&e.matches('.g4-gut');
function tears(){const main=document.querySelector('main.wrap');if(!main)return;
  /* one tear before every shown section after the first (X2's and X2+'s own order routines move sections around; the tears follow them) */
  const shown=e=>e&&e.offsetHeight>0&&!isG(e);
  const secs=[...main.children].filter(e=>e.tagName==='SECTION'&&shown(e));
  secs.slice(1).forEach(sc=>{let p=sc.previousElementSibling;while(p&&!shown(p)&&!isG(p))p=p.previousElementSibling;if(!isG(p)){const g=document.createElement('div');g.className='g4-gut';g.setAttribute('aria-hidden','true');sc.before(g)}});
  /* a tear shows only between two shown sections, once */
  let last=null;[...main.children].forEach(e=>{if(isG(e)){let p=e.previousElementSibling,n=e.nextElementSibling;while(p&&!shown(p))p=p.previousElementSibling;while(n&&!shown(n))n=n.nextElementSibling;
    const ok=p&&n&&p.tagName==='SECTION'&&n.tagName==='SECTION'&&last!==p;e.classList.toggle('x2p-tear-x',!ok);if(ok)last=p}});
  /* desktop: main is a grid whose sections sit on numbered rows; the rows are renumbered in page order so each tear gets its own row between them */
  if(getComputedStyle(main).display==='grid'){let rw=1;[...main.children].forEach(e=>{if(e.offsetHeight>0||(isG(e)&&!e.classList.contains('x2p-tear-x')))e.style.setProperty('grid-row',String(rw++),'important');else e.style.removeProperty('grid-row')})}
  else [...main.children].forEach(e=>e.style.removeProperty('grid-row'));
  const els=[...document.querySelectorAll('section.t4 .t5-bg, main.wrap>.g4-gut, #get .p5-gut')];
  els.forEach((e,i)=>{e.classList.add('x2p-tear');e.setAttribute('aria-hidden','true');tear(e,i)});
  /* the same room above and below every tear: measured to the content's own edges, then the tear's margins set (all measured first, then all set) */
  const desk=innerWidth>=1000,A=desk?72:48,B=desk?64:44,todo=[];
  els.forEach(e=>{if(!e.offsetHeight)return;const sib=(x,d)=>{let s2=x[d];while(s2&&(!s2.offsetHeight||isG(s2)))s2=s2[d];return s2};
    const p=sib(e,'previousElementSibling'),n=sib(e,'nextElementSibling');if(!p||!n)return;const r=e.getBoundingClientRect(),pb=edge(p,0),nt=edge(n,1);if(pb==null||nt==null)return;
    const cs=getComputedStyle(e);todo.push([e,parseFloat(cs.marginTop)+A-(r.top-pb),parseFloat(cs.marginBottom)+B-(nt-r.bottom)])});
  todo.forEach(([e,a,b])=>{e.style.setProperty('--tear-a',Math.max(6,Math.round(a))+'px');e.style.setProperty('--tear-b',Math.max(-120,Math.round(b))+'px')})
  window.__x2pTearGaps=()=>els.filter(e=>e.offsetHeight).map(e=>{const sib=(x,d)=>{let s2=x[d];while(s2&&(!s2.offsetHeight||isG(s2)))s2=s2[d];return s2};const p=sib(e,'previousElementSibling'),n=sib(e,'nextElementSibling'),r=e.getBoundingClientRect();
    return {before:(n&&(n.id||n.className.split(' ')[0]))||'',above:p?Math.round(r.top-edge(p,0)):null,below:n?Math.round(edge(n,1)-r.bottom):null}})}
window.__x2pTears=tears;
let tq=0;const tmo=new MutationObserver(()=>{if(tq)return;tq=1;requestAnimationFrame(()=>{tq=0;tmo.disconnect();try{tears()}finally{const m=document.querySelector('main.wrap');m&&tmo.observe(m,{childList:true})}})});
setTimeout(()=>{const m=document.querySelector('main.wrap');m&&tmo.observe(m,{childList:true})},0);
let tw0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==tw0){tw0=innerWidth;requestAnimationFrame(tears)}});
addEventListener('load',tears);document.fonts&&document.fonts.ready.then(()=>requestAnimationFrame(tears));
[300,1200,3000].forEach(t=>setTimeout(tears,t));

if(T.s){const im=new Image();im.onload=()=>D.style.setProperty('--g4sh',im.naturalHeight);im.src=M+'gr4-'+T.s+'.jpg';
 ['record','learn','highlights','x2pSt','get'].forEach(i=>{const s=document.getElementById(i);if(s&&s.offsetHeight&&!(s.previousElementSibling||{}).classList?.contains('g4-gut')){const d=document.createElement('div');d.className='g4-gut';d.setAttribute('aria-hidden','true');s.before(d)}})}
if(T.bus){const b=document.createElement('div');b.className='g4-bus';b.setAttribute('aria-hidden','true');b.innerHTML='<i></i><i></i><i></i>';document.body.prepend(b);
 const tint=()=>{const mn=document.querySelector('main');D.style.setProperty('--g4h',Math.round(mn.getBoundingClientRect().bottom+scrollY)+'px');const H=D.scrollHeight,y=i=>{const e=document.getElementById(i);return e?Math.round((e.getBoundingClientRect().top+scrollY)/H*1000)/10:null};
  const r=y('record')||40,l=y('learn')||55,b2=y('x2pSt')||80;
  D.style.setProperty('background-image',`linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0) ${r}%,rgba(70,22,8,.32) ${r+3}%,rgba(70,22,8,.32) ${l}%,rgba(60,44,6,.30) ${l+3}%,rgba(60,44,6,.3) ${b2-2}%,rgba(0,0,0,.72) ${b2+2}%,rgba(0,0,0,.72) 100%),url(${M}gr4-${T.k}-${innerWidth>=760?'l':'p'}.jpg)`,'important');
  D.style.setProperty('background-size','100% 100%,100% auto','important');D.style.setProperty('background-repeat','no-repeat,repeat-y','important')};
 tint();addEventListener('load',tint);let w=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w){w=innerWidth;tint()}});setTimeout(tint,3000)}
})();

}catch(e){window.__x2pG4Err=e;console.error(e)}})()})();
window.__R6='B'; /* owner, 2026-11-02: Season 1, die by die (two beats: the season wafer, then the newest rounds) */window.__R6IMG='media/';
(function(){var n=0;(function go(){if(!(document.getElementById("record")&&window.ROUNDS&&window.__x2pPnl&&window.MODELS)){if(++n<400)setTimeout(go,50);return}
try{
/* Round H24 · rounds6: "Every round so far" on X2+, four takes in the chip art, continuing frame 3 (the LEDGER).
   window.__R6 = 'A' ledger entries (one chip per round, stacked like Meet the models' chips)
                 'D' the ledger grows (frame 3's glass ledger, one row per round; an open book of two pages on desktop)
                 'B' the season wafer (every round of Season 1 as a die on one wafer; the newest 8 cut out big below)
                 'C' the socket board (each round's film frame whole in a socket, its readout in the same glass)
   window.__R6IMG = folder of the paintings (default: this concepts folder; the drop-in uses media/ with the same flat names).
   Data live: ROUNDS (graded), PENDING / UPCOMING (what comes next), FILMS (which frame), CO_LOGOS, MODELS. Nothing typed.
   Every live word sits in a painted glass window, lit like the NVIDIA timer (amber gradient, glow, scanlines, the painting's own glare
   screened back over the glass). Sizes are set from the painting's on-screen scale so every live word keeps a cap height of 9 CSS px. */
(function(){
if(window.__x2pMagOff===undefined&&document.getElementById('record')){/* H32: Every round so far is the Mag 7 case (X2P_MAG below) */return}
const D=document,TK=window.__R6||'A',IM=window.__R6IMG||'tools/concepts/worlds/comic/story/h/rounds6/h24/img/web/';
const sec=D.getElementById('record');if(!sec||sec.querySelector('.r6'))return;
const G=(window.ROUNDS||[]).filter(r=>r.a!=null&&r.out),NEW=G.slice().reverse();
const FUT=[...(window.PENDING||[]),...(window.UPCOMING||[])],NEXT=FUT[0]||null;
const MD=window.MODELS||{},ORDER=['GPT','KIMI','CLAUDE','GROK'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>MD[m]);
const callOf=(r,m)=>(r.calls||[]).find(c=>c[0]===m);
const right=(c,a)=>/^UP/i.test(c)===(a>0);
const tile=n=>`media/tile-r${n}-${(window.FILMS||{})[n]?'f1':'t2'}.jpg`;
const mv=r=>String(r.out).replace(/^-/,'−');
const md=s=>{if(!s)return '';const[m,d]=String(s).split('/');return ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][m-1]+' '+(+d)};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''};
const winTxt=r=>{const W=wins(r);return W.length===1?W[0]+' WINS':W.length?W.join(' & ')+' TIE':'NOBODY WINS'};
const nmOf=r=>`${String(r.co).toUpperCase()} (${r.ticker})`;
const cap1=m=>m[0]+m.slice(1).toLowerCase();
const aria=r=>{const W=wins(r);return `Round ${r.n}, ${r.co} (${r.ticker}), moved ${r.out}. ${W.length?W.map(cap1).join(' and ')+(W.length>1?' tie':' wins'):'Nobody wins'}. `+
  ORDER.map(m=>{const c=callOf(r,m);return c?`${cap1(m)} ${right(c[1],r.a)?'right':'wrong'} way`:''}).filter(Boolean).join(', ')+'. Open the graded card.'};
/* real text widths in Anton (the page has loaded its fonts) */
const cv=D.createElement('canvas').getContext('2d');const TW=(t,f)=>{cv.font=`${f}px Anton`;return cv.measureText(String(t)).width};
const CAPR=(()=>{cv.font='100px Anton';return cv.measureText('H').actualBoundingBoxAscent/100})();
let uid=0,MINF=10;/* MINF: the font (painting px) whose cap height is 9.2 CSS px on the painting being drawn */
const setK=k=>{MINF=9.2/(CAPR*k)};
/* the largest size <= max at which t fits w, never below MINF; past that the company name is trimmed (the ticker always stays) */
const fitF=(t,w,max)=>Math.max(MINF,Math.min(max,max*w/TW(t,max)));
const fitName=(r,w,max)=>{let f=fitF(nmOf(r),w,max);if(TW(nmOf(r),f)<=w+.5)return [nmOf(r),f];
  let co=String(r.co).toUpperCase();while(co.length>3&&TW(`${co}… (${r.ticker})`,f)>w)co=co.slice(0,-1).trimEnd();return [`${co}… (${r.ticker})`,f]};
/* ---------- SVG pieces, in the painting's own px ---------- */
const DEFS=(b,PW)=>{const sp=(PW/150).toFixed(2);return `<defs>
 <pattern id="r6slp${b}" width="8" height="${sp}" patternUnits="userSpaceOnUse"><rect width="8" height="${(sp*.32).toFixed(2)}" fill="rgba(0,0,0,.28)"/></pattern>
 <radialGradient id="r6vg${b}" cx=".5" cy=".5" r=".72"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>
 <linearGradient id="r6em${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf0"/><stop offset=".5" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffb43a"/></linearGradient>
 <linearGradient id="r6gd${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".55" stop-color="#ffd25a"/><stop offset="1" stop-color="#ff9d1c"/></linearGradient>
 <linearGradient id="r6up${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ffeb"/><stop offset=".4" stop-color="#6ff59e"/><stop offset="1" stop-color="#16b955"/></linearGradient>
 <linearGradient id="r6dn${b}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe4dc"/><stop offset=".4" stop-color="#ff7a6a"/><stop offset="1" stop-color="#e3261c"/></linearGradient>
</defs>`};
const fillOf=(c,b)=>`url(#r6${c||'em'}${b})`;
const TX=(b,x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${fillOf(o.c,b)}" class="r6-tx r6-${o.c||'em'} ${o.cls||''}" data-cap="${(s*CAPR).toFixed(2)}">${esc(t)}</text>`;
const MK=(m,x,y,s,col,cls)=>`<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" viewBox="0 0 24 24" class="r6-mk ${cls||''}"><path d="${(MD[m]||{}).d||''}" fill="${col}"/></svg>`;
const LOGO=(t,x,y,s)=>{const f=logoF(t);return f?`<image href="${f}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" preserveAspectRatio="xMidYMid meet" class="r6-lg"/>`:''};
const svgOpen=(PW,PH,b)=>`<svg class="r6-sv" viewBox="0 0 ${PW} ${PH}" preserveAspectRatio="none" aria-hidden="true">${DEFS(b,PW)}`;
/* the glass over a window: a faint warm wash, scanlines, and the painting's own glare (cut from the painting) screened back over it */
const glassOver=(b,x,y,w,h,paint,PW,PH,dy,wash)=>{const id='r6g'+b+'_'+(uid++);return `<clipPath id="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}"/></clipPath><g clip-path="url(#${id})">${wash===false?'':`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" class="r6-wash"/>`}<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#r6slp${b})"/></g><g clip-path="url(#${id})" class="r6-glg"><image href="${paint}" x="0" y="${(dy||0).toFixed(1)}" width="${PW}" height="${PH}" class="r6-glr" preserveAspectRatio="none"/></g>`};
/* (a clipped group is isolated, so the screen blend must sit on the group, not on the image inside it) */
/* the film frame behind the glass, never repainted: fit (whole) or fill (cropped), darkened toward the rim */
const frame=(b,n,x,y,w,h,mode,rad,soft)=>{const id='r6c'+b+'_'+(uid++);return `<clipPath id="${id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="${(rad||0).toFixed(1)}"/></clipPath><g clip-path="url(#${id})"><image href="${tile(n)}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" preserveAspectRatio="xMidYMid ${mode||'slice'}" class="r6-fr"/><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="url(#r6vg${b})" opacity="${soft?.45:1}"/></g>`};
/* the four AIs, always in the same order: each mark lit green if it called the direction, red if not, dark if it made no call; the winner's mark ringed in gold */
function marks(b,r,x,y,s,gap){const W=wins(r);return ORDER.map((m,i)=>{const c=callOf(r,m),X=x+i*(s+gap);if(!c)return MK(m,X,y,s,'#3a3022','r6-off');
  const ok=right(c[1],r.a);return (W.includes(m)?`<circle cx="${(X+s/2).toFixed(1)}" cy="${(y+s/2).toFixed(1)}" r="${(s*.68).toFixed(1)}" class="r6-wring"/>`:'')+MK(m,X,y,s,fillOf(ok?'up':'dn',b),'r6-'+(ok?'up':'dn'))}).join('')}
const marksW=s=>4*s+3*s*.42;
/* readout, wide: line 1 logo, name (ticker) ... the move; line 2 R<n>, the four AIs ... who wins (if there is room; the gold ring always says it) */
function readWide(b,r,x,y,w,h,noMarks){const f=Math.max(MINF,h*.3),mvT=mv(r),fm=Math.max(f,Math.min(h*.36,f*1.18)),mw=TW(mvT,fm),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3;
  const [nm,fn]=fitName(r,w-(hasL?ls+g:0)-mw-g*1.5,f),y1=y+h*.44,y2=y+h*.88;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm)+TX(b,x+w,y1,fm,mvT,{a:'end',c:r.a>0?'up':'dn',cls:'r6-big'});
  const ms=f*1.02,rT='R'+r.n;let X=x;s+=TX(b,X,y2,f,rT,{c:'gd'});X+=TW(rT,f)+g*1.4;
  if(noMarks){/* the lenses carry the four AIs; the line names the winner, its mark in gold */
    const W=wins(r),wt=winTxt(r),fw=Math.max(MINF,Math.min(f*.95,f*.95*(x+w-X-W.length*(ms+g))/TW(wt,f*.95)));s+=TX(b,x+w,y2,fw,wt,{a:'end',c:'gd'});
    const x0=x+w-TW(wt,fw)-g*.6;W.forEach((m,i)=>{s+=MK(m,x0-(W.length-i)*(ms+g*.4),y2-ms*.88,ms,fillOf('gd',b),'r6-gdm')});return s}
  s+=marks(b,r,X,y2-ms*.9,ms,ms*.42);X+=marksW(ms)+g*1.6;
  const wt=winTxt(r),fw=Math.min(f*.95,f*.95*(x+w-X)/TW(wt,f*.95));if(fw>=MINF)s+=TX(b,x+w,y2,fw,wt,{a:'end',c:'gd'});return s}
/* readout, stacked: line 1 logo, name (ticker) across the whole glass; line 2 R<n>, the four AIs ... the move */
function readStack(b,r,x,y,w,h){const f=Math.max(MINF,h*.29),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3,[nm,fn]=fitName(r,w-(hasL?ls+g:0),f),y1=y+h*.42,y2=y+h*.87;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm);
  /* laid out from the right: the move, a clear gap (a ring reaches .18 of a mark past it), the four marks; R<n> on the left */
  const rT='R'+r.n,fm=f*1.12,mw=TW(mv(r),fm)*1.04,x0=x+TW(rT,f)+g*1.2,xr=x+w-mw-f*.75,ms=Math.min(f*1.02,(xr-x0)/5.5);
  s+=TX(b,x,y2,f,rT,{c:'gd'})+marks(b,r,xr-marksW(ms)-ms*.18,y2-ms*.9,ms,ms*.42)+TX(b,x+w,y2,fm,mv(r),{a:'end',c:r.a>0?'up':'dn',cls:'r6-big'});return s}
/* readout, narrow: line 1 logo, name (ticker); line 2 the move ... the four AIs */
function readNarrow(b,r,x,y,w,h){const f=Math.max(MINF,h*.31),hasL=!!logoF(r.ticker),ls=f*1.15,g=f*.3,[nm,fn]=fitName(r,w-(hasL?ls+g:0),f),y1=y+h*.42,y2=y+h*.88;let s='';
  if(hasL)s+=LOGO(r.ticker,x,y1-fn*CAPR/2-ls/2,ls);s+=TX(b,x+(hasL?ls+g:0),y1,fn,nm);
  const ms=Math.min(f*1.02,(w-TW(mv(r),f*1.1)-g*2)/5.26),fm=Math.max(MINF,Math.min(f*1.1,f*1.1*(w-marksW(ms)-g*1.5)/TW(mv(r),f*1.1)));
  s+=TX(b,x,y2,fm,mv(r),{c:r.a>0?'up':'dn',cls:'r6-big'})+marks(b,r,x+w-marksW(ms),y2-ms*.9,ms,ms*.42);return s}
/* the entry still to be written: its company lit dim, when it will be written, a blinking cursor */
function readNext(b,nx,x,y,w,h){const f=Math.max(MINF,h*.28),y1=y+h*.42,y2=y+h*.86,nm=`${String(nx.co).toUpperCase()} (${nx.ticker})`,fn=fitF(nm,w,f);
  const when=nx.resolves?`AT THE CLOSE · ${md(nx.resolves)}`:`CALLS DUE ${md(nx.called)}`,rT='R'+nx.n;
  const fw=Math.max(MINF,Math.min(f*.92,f*.92*(w-TW(rT,f)-f*1.4)/TW(when,f*.92)));
  return TX(b,x,y1,fn,nm,{cls:'r6-dim'})+TX(b,x,y2,f,rT,{c:'gd'})+TX(b,x+TW(rT,f)+f*.4,y2,fw,when,{cls:'r6-dim'})
   +`<rect class="r6-cur" x="${(x+TW(rT,f)+f*.4+TW(when,fw)+f*.3).toFixed(1)}" y="${(y2-f*CAPR).toFixed(1)}" width="${(f*.42).toFixed(1)}" height="${(f*CAPR).toFixed(1)}" fill="${fillOf('em',b)}"/>`}
const wrapA=(r,inner,cls)=>r?`<li class="r6-it ${cls||''}"><a href="#/round/${r.n}" aria-label="${esc(aria(r))}">${inner}</a></li>`:`<li class="r6-it r6-next ${cls||''}" aria-label="Next: round ${NEXT.n}, ${esc(NEXT.co)} (${esc(NEXT.ticker)}), ${NEXT.resolves?'written at the close on '+esc(NEXT.resolves):'calls due '+esc(NEXT.called)}">${inner}</li>`;
const paint=(src,PW,PH,s)=>`<div class="r6-pa" style="aspect-ratio:${PW}/${PH}"><img src="${src}" alt="" draggable="false" decoding="async">${s}</svg></div>`;

/* ---------- take A: ledger entries, one chip per round, their pins meeting ---------- */
const PA={src:IM+'rounds-h24-row.jpg',W:1920,H:697,cr:[110,400],k:1920/3620,win:[315,625,940,1500],strip:[1150,645,3530,1075],
  lens:[[1795,1230,2050,1485],[2275,1230,2530,1485],[2750,1230,3005,1485],[3155,1230,3410,1485]]};
const sA=a=>[(a[0]-PA.cr[0])*PA.k,(a[1]-PA.cr[1])*PA.k,(a[2]-PA.cr[0])*PA.k,(a[3]-PA.cr[1])*PA.k];
function rowA(r){const b='A'+(uid++),[wx,wy,wx2,wy2]=sA(PA.win),[sx,sy,sx2,sy2]=sA(PA.strip),pw=PA.W,ph=PA.H,sw=sx2-sx,sh=sy2-sy;let s=svgOpen(pw,ph,b);
  if(!r){s+=glassOver(b,wx,wy,wx2-wx,wy2-wy,PA.src,pw,ph)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+(wx2-wx)*.18,(wy+wy2)/2-(wx2-wx)*.32,(wx2-wx)*.64)}</g>`:'')
    +glassOver(b,sx,sy,sw,sh,PA.src,pw,ph)+readNext(b,NEXT,sx+sw*.045,sy,sw*.91,sh);
    PA.lens.forEach(l=>{const[a,c,d,e]=sA(l);s+=glassOver(b,a,c,d-a,e-c,PA.src,pw,ph,0,false)});return wrapA(null,paint(PA.src,pw,ph,s))}
  s+=frame(b,r.n,wx+(wx2-wx)*.035,wy+(wy2-wy)*.025,(wx2-wx)*.93,(wy2-wy)*.95,'slice',(wx2-wx)*.05)+glassOver(b,wx,wy,wx2-wx,wy2-wy,PA.src,pw,ph,0,false);
  s+=glassOver(b,sx,sy,sw,sh,PA.src,pw,ph)+readWide(b,r,sx+sw*.045,sy,sw*.91,sh,true);
  /* the four lenses: each AI's own lamp, its mark lit green (right way) or red (wrong way); the winner's lens ringed in gold */
  const W=wins(r);PA.lens.forEach((l,i)=>{const[a,c,d,e]=sA(l),m=ORDER[i],cl=callOf(r,m),cx=(a+d)/2,cy=(c+e)/2,rr=(d-a)/2,ok=cl&&right(cl[1],r.a);
    if(!cl){s+=MK(m,cx-rr*.5,cy-rr*.5,rr,'#3a3022','r6-off');return}
    s+=`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(rr*.8).toFixed(1)}" class="r6-lens r6-l${ok?'up':'dn'}"/>`+(W.includes(m)?`<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(rr*.9).toFixed(1)}" class="r6-wring"/>`:'')
      +MK(m,cx-rr*.48,cy-rr*.48,rr*.96,fillOf(ok?'up':'dn',b),'r6-'+(ok?'up':'dn'))+glassOver(b,a,c,d-a,e-c,PA.src,pw,ph,0,false)});
  return wrapA(r,paint(PA.src,pw,ph,s))}

/* ---------- take D: frame 3's ledger, grown (its middle row repeats, so every row has the same geometry) ---------- */
const PD={src:IM+'rounds-h24-ledger.jpg',W:1440,H:2765,k:1440/2000,top:[0,648],mid:[648,1066],bot:[3165,3840],row:{top:[282,600],mid:[696,1014],bot:[3210,3543]},win:[397,595],glass:[628,1642]};/* x in the painting cropped to x 80..2080 */
function rowD(r,piece){const b='D'+(uid++),k=PD.k,[p0,p1]=PD[piece],[g0,g1]=PD.row[piece],PW=PD.W,PH=(p1-p0)*k,dy=-p0*k,
  gy=(g0-p0)*k,gh=(g1-g0)*k,wx=PD.win[0]*k,ww=(PD.win[1]-PD.win[0])*k,gx=PD.glass[0]*k,gw=(PD.glass[1]-PD.glass[0])*k;let s=svgOpen(PW,PH.toFixed(1),b);
  if(!r){s+=glassOver(b,wx,gy,ww,gh,PD.src,PW,PD.H,dy)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+ww*.1,gy+gh/2-ww*.4,ww*.8)}</g>`:'')+glassOver(b,gx,gy,gw,gh,PD.src,PW,PD.H,dy)+readNext(b,NEXT,gx+gw*.05,gy,gw*.9,gh)}
  else s+=frame(b,r.n,wx+ww*.05,gy+gh*.035,ww*.9,gh*.93,'slice',ww*.06,true)+glassOver(b,wx,gy,ww,gh,PD.src,PW,PD.H,dy,false)+glassOver(b,gx,gy,gw,gh,PD.src,PW,PD.H,dy)+readStack(b,r,gx+gw*.045,gy,gw*.91,gh);
  const img=`<img src="${PD.src}" alt="" draggable="false" decoding="async" style="top:${(-p0/(p1-p0)*100).toFixed(4)}%;height:${(3840/(p1-p0)*100).toFixed(4)}%">`;
  return wrapA(r,`<div class="r6-pd" style="aspect-ratio:${PW}/${PH.toFixed(1)}">${img}${s}</svg></div>`)}
function ledgerD(items,cls){const n=items.length;return `<ol class="r6-led ${cls||''}">`+items.map((r,i)=>rowD(r,i===0?'top':i===n-1?'bot':'mid')).join('')+`</ol>`}

/* ---------- take B: the season wafer ---------- */
const PB={src:IM+'rounds-h24-wafer.jpg',W:2048,cx:1024,cy:1024,R:902,die:IM+'rounds-h24-die.jpg',DW:900,DH:880,dwin:[120,120,1644,1604],dm:[1764,1724]};
function waferB(){const total=G.length+FUT.length,R=PB.R*.955,cx=PB.cx,cy=PB.cy;
  /* the largest square die whose grid holds the whole season inside the wafer's edge */
  let best=null;for(let c=6;c<40&&!best;c++){const a=2*R/c,cells=[];for(let j=0;j<c;j++)for(let i=0;i<c;i++){const x=cx-R+i*a,y=cy-R+j*a;if([[x,y],[x+a,y],[x,y+a],[x+a,y+a]].every(([u,v])=>Math.hypot(u-cx,v-cy)<=R))cells.push([x,y])}if(cells.length>=total)best={a,cells}}
  const a=best.a,cells=best.cells,b='B'+(uid++),gp=a*.06,seq=[...G,...FUT];let s=svgOpen(PB.W,PB.W,b);
  seq.forEach((r,i)=>{const[x,y]=cells[i],g=r.a!=null&&r.out,isN=NEXT&&r.n===NEXT.n,last=i===seq.length-1,X=x+gp,Y=y+gp,S=a-gp*2;
    const wx=X+S*PB.dwin[0]/PB.dm[0],wy=Y+S*PB.dwin[1]/PB.dm[1],ws=S*(PB.dwin[2]-PB.dwin[0])/PB.dm[0];
    let d=`<image href="${PB.die}" x="${X.toFixed(1)}" y="${Y.toFixed(1)}" width="${S.toFixed(1)}" height="${S.toFixed(1)}" preserveAspectRatio="none" class="r6-dimg"/>`;
    if(g)d+=`<image href="${tile(r.n)}" x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" preserveAspectRatio="xMidYMid slice" class="r6-dfr"/>`;
    else if(isN)d+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" class="r6-dnext"/>`;
    else if(last)d+=`<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${ws.toFixed(1)}" height="${ws.toFixed(1)}" class="r6-dgold"/>`;
    s+=g?`<a href="#/round/${r.n}" aria-label="${esc(aria(r))}" class="r6-die r6-dg">${d}</a>`:`<g class="r6-die${isN?' r6-dn':''}${last?' r6-dl':''}">${d}</g>`});
  return `<div class="r6-wf" style="aspect-ratio:1"><img src="${PB.src}" alt="" draggable="false" decoding="async">${s}</svg></div>`}
function dieB(r){const b='B'+(uid++),k=PB.DW/PB.dm[0],[x0,y0,x1,y1]=PB.dwin.map(v=>v*k),w=x1-x0,h=y1-y0,PW=PB.DW,PH=PB.DH;let s=svgOpen(PW,PH,b);
  /* one glass window: the film frame in its upper part, the readout lit in its lower part */
  const fh=h*.6,ry=y0+h*.02+fh+h*.01,rh=y1-ry-h*.02;
  s+=frame(b,r.n,x0+w*.02,y0+h*.02,w*.96,fh,'slice',w*.03)+glassOver(b,x0,ry-h*.01,w,y1-ry+h*.01,PB.die,PW,PH)+readNarrow(b,r,x0+w*.06,ry,w*.88,rh)+glassOver(b,x0,y0,w,h,PB.die,PW,PH,0,false);
  return wrapA(r,paint(PB.die,PW,PH,s))}

/* ---------- take C: the socket board (the film frame whole at the top of the glass, the readout under it, the round on the plate) ---------- */
const PC={src:IM+'rounds-h24-socket.jpg',W:900,H:1759,k:900/1255,win:[101,107,1151,1862],plate:[20,2141,1235,2333]};
function sockC(r){const b='C'+(uid++),k=PC.k,[wx,wy,wx2,wy2]=PC.win.map(v=>v*k),[px,py,px2,py2]=PC.plate.map(v=>v*k),PW=PC.W,PH=PC.H,w=wx2-wx,fw=w*.96,fh=fw*4/3,fy=wy+w*.02,ry=fy+fh+w*.02,rh=wy2-ry-w*.03;
  let s=svgOpen(PW,PH,b);const f=Math.max(MINF,(py2-py)*.5);
  if(!r){s+=glassOver(b,wx,wy,w,wy2-wy,PC.src,PW,PH)+(logoF(NEXT.ticker)?`<g class="r6-dim">${LOGO(NEXT.ticker,wx+w*.2,fy+fh*.5-w*.3,w*.6)}</g>`:'')+readNext(b,NEXT,wx+w*.06,ry,w*.88,rh)
    +glassOver(b,px,py,px2-px,py2-py,PC.src,PW,PH)+TX(b,(px+px2)/2,(py+py2)/2+f*CAPR/2,f,'NEXT ROUND',{a:'middle',c:'gd',cls:'r6-dim'});return wrapA(null,paint(PC.src,PW,PH,s))}
  s+=frame(b,r.n,wx+w*.02,fy,fw,fh,'meet',w*.03)+glassOver(b,wx,wy,w,wy2-wy,PC.src,PW,PH)+readNarrow(b,r,wx+w*.06,ry,w*.88,rh);
  s+=glassOver(b,px,py,px2-px,py2-py,PC.src,PW,PH)+TX(b,(px+px2)/2,(py+py2)/2+f*CAPR/2,f,'ROUND '+r.n,{a:'middle',c:'gd'});
  return wrapA(r,paint(PC.src,PW,PH,s))}

/* ---------- the section ---------- */
const HEAD={A:['The ledger','Every trade, written. Newest first.'],D:['The ledger','Every trade, written. Newest first.'],
  B:['Season 1, die by die','Every round of the season. Lit dies are graded.'],C:['Every round so far','Each round, socketed. Newest first.']}[TK];
const PAGE=8;let shown=PAGE,wide=false;
const root=D.createElement('div');root.className='r6 r6-'+TK;
function body(cw){/* cw: the column's CSS width, so the readouts are sized for the screen they land on */
  if(TK==='A'){setK((wide?(cw-18)/2:cw)/PA.W);return `<ol class="r6-list r6-rows">${NEXT?rowA(null):''}${NEW.slice(0,shown).map(rowA).join('')}</ol>`}
  if(TK==='D'){const items=[...(NEXT?[null]:[]),...NEW.slice(0,shown)];
    if(!wide){setK(cw/PD.W);return `<div class="r6-book">${ledgerD(items)}</div>`}
    setK(((cw-22)/2)/PD.W);const h=Math.ceil(items.length/2);return `<div class="r6-book">${ledgerD(items.slice(0,h),'r6-pg1')}${ledgerD(items.slice(h),'r6-pg2')}</div>`}
  if(TK==='B'){const wf=waferB();setK((wide?((cw-22)*1.15/2.15-24)/4:(cw-8)/2)/PB.DW);
    return `<div class="r6-Bb"><figure class="r6-wfw">${wf}<figcaption class="r6-key"><span class="r6-k1"></span>${G.length} graded<span class="r6-k2"></span>next<span class="r6-k3"></span>${FUT.length} to come · gold: NVIDIA</figcaption></figure><ol class="r6-list r6-dies">${NEW.slice(0,shown).map(dieB).join('')}</ol></div>`}
  if(TK==='C'){setK((wide?(cw-36)/4:(cw-6)/2)/PC.W);return `<ol class="r6-list r6-socks">${NEXT?sockC(null):''}${NEW.slice(0,shown-(NEXT?1:0)).map(sockC).join('')}</ol>`}}
function more(){const n=TK==='C'&&NEXT?shown-1:shown;return n<NEW.length?`<button class="r6-more" type="button"><span>Show ${Math.min(PAGE,NEW.length-n)} more</span><i>${n} of ${NEW.length}</i></button>`:`<p class="r6-all">All ${NEW.length} rounds</p>`}
function render(){wide=matchMedia('(min-width:760px)').matches;root.innerHTML=`<header class="r6-hd"><h2 class="r6-h2"><span class="r6-hw">${esc(HEAD[0])}</span></h2><p class="r6-cap">${esc(HEAD[1])}</p></header><div class="r6-bd"></div>`;
  const bd=root.querySelector('.r6-bd');bd.innerHTML=body(bd.clientWidth)+more();
  root.querySelector('.r6-more')?.addEventListener('click',()=>{shown+=PAGE;render()});scale()}
/* --k: CSS px per painting px, for the glow sizes */
function scale(){root.querySelectorAll('.r6-sv').forEach(sv=>{const vb=sv.viewBox.baseVal,w=sv.getBoundingClientRect().width;if(vb&&w)sv.style.setProperty('--k',(w/vb.width).toFixed(5))})}
/* the old carousel stays laid out (the round view copies and measures its cards), only moved off screen and hidden from readers */
[...sec.children].forEach(c=>{c.classList.add('r6-old');c.setAttribute('aria-hidden','true');c.inert=true});
sec.classList.add('r6-sec');sec.appendChild(root);render();
/* a new round arrives: the first time the section comes into view, the newest graded entry is written in (the frame lights, the readout types on,
   a scan band passes). Once per visit; nothing moves with reduced motion. */
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();
  const it=root.querySelector('.r6-it:not(.r6-next)')||root.querySelector('.r6-die.r6-dg:last-of-type');if(it){it.classList.add('r6-in');setTimeout(()=>it.classList.remove('r6-in'),2600)}}},{threshold:.35});io.observe(root)}
let lw=innerWidth;addEventListener('resize',()=>{clearTimeout(scale.t);scale.t=setTimeout(()=>{if(innerWidth!==lw){lw=innerWidth;render()}else scale()},150)});
window.__r6={render,scale,set:n=>{shown=n;render()}};
})();

}catch(e){window.__x2pR6Err=e;console.error(e)}})()})();
/* ===== H32 X2P_MAG (owner, 2026-11-02: "Every round so far", round H31 stand take C, built): the Mag 7 in a painted showcase, the rest standing
   in a slab box (labels up, flipped through). Right after How a round works (before Meet the models). window.__x2pMag = 'a' (default: 4 on the
   upper shelf, Amazon then Apple and NVIDIA as empty slots below) | 'b' (the graded Mag 7 only, 3 + 3, the sixth slot the next one to come).
   The slabs stand on the painted shelves: each foot tucked behind the shelf's brass lip (a strip of the same painting laid back over them) with a
   contact shadow; "Mag 7" is page text engraved on the case's blank brass plate. Data: ROUNDS / UPCOMING / FILMS / CO_LOGOS (ez-data.js); each
   grade from the page's own slab label (#car .card .zlab). From tools/concepts/worlds/comic/story/h/stand/_st.js (take C).
   Media: media/mag-case-h32-p.jpg media/mag-case-h32-d.jpg media/mag-slab-h32.webp media/mag-box-h32.webp */
(function(){var n=0;(function go(){if(!(window.ROUNDS&&window.UPCOMING&&document.getElementById('record')&&document.querySelector('section.t4 .t4-b2')&&document.querySelector('#car .card .zlab'))){if(++n<600)setTimeout(go,50);return}
try{run()}catch(e){window.__x2pMagErr=e;console.error(e)}})();
function run(){
const D=document,V=(window.__x2pMag==='b')?'b':'a';
const M7=t=>t==='GOOG'?'GOOGL':t;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?MO[+m[1]]+' '+(+m[2]):''};
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const tile=r=>`media/tile-r${r.n}-${(window.FILMS||{})[r.n]?'f1':'t2'}.jpg`;
const lab=r=>{const z=D.querySelector(`#car .card[data-n="${r.n}"] .zlab`);if(!z)return null;const q=s=>(z.querySelector(s)||{}).textContent||'';
  return {ds:q('.zr .ds'),gr:q('.zr .gr'),no:q('.zr .no'),cert:(q('.zb').match(/\d{6,}/)||[''])[0],ten:q('.zr .gr')==='10'}};
const MDL=window.MODELS||{},nm=m=>(MDL[m]&&MDL[m].name)||m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const aria=r=>{const L=lab(r)||{},W=wins(r);return `Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.ds||''} ${L.gr||''}. ${W.length?'Winner '+W.map(nm).join(' and '):'Nobody won'}. Open the slab.`};
const G=ROUNDS.filter(r=>r.a!=null&&r.out).slice().sort((a,b)=>a.n-b.n);
/* the Mag 7: one slot per company, its latest graded round; a company not graded yet holds its next round from UPCOMING */
const all=[];['META','TSLA','GOOGL','MSFT','AMZN','AAPL','NVDA'].forEach(t=>{const g=G.filter(r=>M7(r.ticker)===t).pop();
  if(g){all.push({r:g,t});return}const u=(window.UPCOMING||[]).filter(r=>M7(r.ticker)===t).sort((a,b)=>a.n-b.n)[0];all.push({u:u||{ticker:t,co:t},t})});
all.sort((a,b)=>((a.r||a.u).n||1e9)-((b.r||b.u).n||1e9));
const graded=all.filter(s=>s.r),todo=all.filter(s=>!s.r);
const slots=V==='a'?all:[...graded,...todo.slice(0,Math.max(0,6-graded.length))].slice(0,6);
const onCase=new Set(graded.map(s=>s.r.n));
const REST=G.filter(r=>!onCase.has(r.n)).reverse();
const BET=(()=>{const u=(window.UPCOMING||[]).filter(r=>r.ticker==='NVDA').sort((a,b)=>a.n-b.n)[0];return u&&u.n})();
function label(r,L){return `<span class="m7-lab${L.ten?' m7-ten':''}"><span class="m7-l"><span class="m7-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span><span class="m7-nm"><b>${esc(r.co)}</b> <small>(${esc(r.ticker)})</small></span><span class="m7-zb"><i></i><span class="m7-ct">${esc(L.cert)}</span><span class="m7-ho"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></span><span class="m7-r"><span class="m7-no">${esc(L.no)}</span><span class="m7-ds">${esc(L.ds)}</span><span class="m7-gr">${esc(L.gr)}</span></span></span>`}
function slab(r,cls){const L=lab(r)||{ds:'',gr:'',no:'#'+r.n,cert:''},f=(window.FILMS||{})[r.n];
  return `<a class="m7-sl ${cls||''}" href="#/round/${r.n}" aria-label="${esc(aria(r))}" data-n="${r.n}"><span class="m7-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="m7-pl" aria-hidden="true"></i>':''}</span><span class="m7-fr" aria-hidden="true"></span>${label(r,L)}</a>`}
function empty(s){const u=s.u,bet=u.n&&u.n===BET,lg=logoF(u.ticker);
  const when=bet?'Bet #1':V==='b'?'Next: '+u.co+(u.resolves?'\n'+md(u.resolves):''):(u.resolves?'Graded '+md(u.resolves):u.called?'Calls '+md(u.called):'To come');
  return `<div class="m7-sl m7-mt${bet?' m7-bet':''}${V==='b'?' m7-nx':''}" role="img" aria-label="Empty slot: ${esc(u.co)} (${esc(u.ticker)}), round ${u.n||''}, ${bet?'Bet #1, ':''}${u.resolves?'graded at the close on '+md(u.resolves):'calls due '+md(u.called)}"><span class="m7-wn">${lg?`<img class="m7-ml${dark(u.ticker)?'':' m7-inv'}" src="${lg}" alt="" loading="lazy">`:''}<em class="m7-when">${esc(when)}</em></span><span class="m7-fr" aria-hidden="true"></span><span class="m7-lab m7-lab0"><span class="m7-l"><span class="m7-y">Next in the case</span><span class="m7-nm"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small></span></span><span class="m7-r"><span class="m7-no">${u.n?'#'+u.n:''}</span><span class="m7-ds">${bet?'Bet #1':'Soon'}</span><span class="m7-gr">?</span></span></span></div>`}
const items=slots.map(s=>s.r?slab(s.r,'m7-big'):empty(s));
const isD=()=>matchMedia('(min-width:1000px)').matches;
/* the cases, measured on the paintings (px): the inner walls, the blank plate, the top slice (frame + plate) drawn as painted; then per shelf a band
   of velvet stretched to the slabs' height and the shelf's own strip as painted (from s0: the glass line, the brass lip), the last strip down to the foot */
const CASE=window.__x2pMagCase||{p:{img:'media/mag-case-h32-p.jpg',w:2048,h:1536,inner:[192,1856],plate:[790,238,1256,354],top:380,
   shelf:[{s0:840,e:925,lip:[868,906]},{s0:1290,e:1536,lip:[1305,1337]}]},
  d:{img:'media/mag-case-h32-d.jpg',w:2560,h:1440,inner:[92,2466],plate:[1002,234,1554,338],top:380,shelf:[{s0:1135,e:1440,lip:[1196,1233]}]}};
const head=`<header class="m7-hd"><h2 class="t4-h2 m7-h2"><span class="t4-hw">Every round so far</span></h2><p class="m7-cap"><span class="m7-c1">Each round gets a grade from 1 to 10.</span> <span class="m7-c1">A 10 means all four AI<span class="x2p-lc">s</span> got it right, and close.</span></p></header>`;
const isT=()=>!isD()&&matchMedia('(min-width:600px)').matches;
const PAGE=()=>isD()?14:isT()?12:10;let shown=0;
function restHTML(){const k=Math.min(REST.length,shown||PAGE()),it=REST.slice(0,k),C=isD()?7:isT()?4:2,R=Math.ceil(it.length/C);
  const h=`<div class="m7-box"><ol class="m7-flip" style="grid-template-rows:${R>1?`repeat(${R-1},var(--peek)) `:''}auto">${it.map((r,j)=>{const row=R-1-Math.floor(j/C);return `<li style="grid-row:${row+1};grid-column:${j%C+1};z-index:${row+1}" data-col="${j%C===0?'l':j%C===C-1?'r':'m'}"${row===R-1?' class="m7-front"':''}>${slab(r,'m7-fl')}${tag(r)}</li>`}).join('')}</ol><span class="m7-boxf" aria-hidden="true"></span></div>`;
  const more=k<REST.length?`<button class="m7-more" type="button"><span>Show all ${REST.length}</span><i>${k} of ${REST.length}</i></button>`:(REST.length>PAGE()?`<button class="m7-more m7-less" type="button"><span>Show fewer</span></button>`:'');
  return `<p class="m7-sub"><b>Every other round</b> · newest first</p>${h}${more}`}
/* H34 (owner, 2026-11-02, night): a slab in the box lifts and says what it is before it opens: company and ticker, grade, who won.
   Phones: the first tap lifts it and shows the tag, a second tap on the same slab opens it. Mouse: hover lifts and tags, a click opens. */
function tag(r){const L=lab(r)||{},W=wins(r),gw=L.gr?`Grade ${esc(L.gr)}${L.ds?' · '+esc(L.ds):''}`:'';
  return `<span class="m7-tag" aria-hidden="true"><b>${esc(r.co)} <small>(${esc(r.ticker)})</small></b>${gw?`<span class="m7-tg">${gw}</span>`:''}<span class="m7-tw">${W.length?W.map(m=>m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase()).join(' &amp; ')+(W.length>1?' tie':' won'):'Nobody won'}</span></span>`}
function caseHTML(){return `<div class="m7-case m7-${V}" role="group" aria-label="The Mag 7"><i class="m7-bg" aria-hidden="true"></i><span class="m7-plt"><b>Mag 7</b></span><div class="m7-cin">${items.map((x,i)=>`<div class="m7-slot"><i class="m7-sh" aria-hidden="true"></i>${x}</div>`).join('')}</div><i class="m7-lips" aria-hidden="true"></i></div>`}
const sec=D.getElementById('record');
const root=D.createElement('div');root.className='m7r m7-C m7-v'+V;root.id='x2pMag';
/* lay the case out from slices of its painting: the slabs' size sets the bands; each slab's foot tucked behind its shelf's lip */
function lay(){const cs=root.querySelector('.m7-case');if(!cs)return;const d=isD(),C=d?CASE.d:CASE.p,W=cs.clientWidth;if(!W)return;const s=W/C.w,H0=C.h*s;
  const rows=d?[slots.length]:(V==='a'?[4,3]:[3,3]),n=slots.length,iw=(C.inner[1]-C.inner[0])*s,il=C.inner[0]*s,gap=Math.max(4,W*.012);
  const wA=(iw-gap*5)/4,most=Math.max(...rows),w=d?Math.min(170,(iw-gap*(most+1))/most):Math.min((iw-gap*(most+1))/most,wA*(V==='b'?1.12:1)),h=w*922/600;
  const bg=(top,hgt,y0,k)=>`top:${top.toFixed(1)}px;height:${(hgt+1).toFixed(1)}px;background-size:${W}px ${(H0*k).toFixed(1)}px;background-position:0 ${(-y0*s*k).toFixed(1)}px`;
  let html=`<i class="m7-s" style="${bg(0,C.top*s,0,1)}"></i>`,y=C.top*s,prevB=C.plate[3]*s,k0=0;const feet=[],lips=[];
  C.shelf.forEach((sh,i)=>{const tuck=(sh.lip[1]-sh.lip[0])*s*.35,foot=prevB+gap+h,st=foot-(sh.lip[0]-sh.s0)*s-tuck,bh=st-y,src=(sh.s0-(i?C.shelf[i-1].e:C.top));
    html+=`<i class="m7-s" style="${bg(y,bh,(i?C.shelf[i-1].e:C.top),bh/(src*s))}"></i>`;
    const sH=(sh.e-sh.s0)*s;html+=`<i class="m7-s" style="${bg(st,sH+.5,sh.s0,1)}"></i>`;
    const l0=st+(sh.lip[0]-sh.s0)*s;lips.push(`<i class="m7-lip" style="${bg(l0,(sh.lip[1]-sh.lip[0])*s,sh.lip[0],1)}"></i>`);
    feet.push(foot);y=st+sH;prevB=st+(sh.lip[1]-sh.s0)*s});
  cs.style.height=y.toFixed(1)+'px';cs.querySelector('.m7-bg').innerHTML=html;cs.querySelector('.m7-lips').innerHTML=lips.join('');
  const els=[...cs.querySelectorAll('.m7-slot')];let k=0;
  rows.forEach((cnt,ri)=>{const foot=feet[d?0:ri],sp=(iw-cnt*w)/(cnt+1);
    for(let j=0;j<cnt&&k<n;j++,k++){Object.assign(els[k].style,{width:w.toFixed(1)+'px',left:(il+sp+(sp+w)*j).toFixed(1)+'px',top:(foot-h).toFixed(1)+'px'})}});
  const pl=root.querySelector('.m7-plt'),[x0,y0,x1,y1]=C.plate;Object.assign(pl.style,{left:(x0*s)+'px',top:(y0*s)+'px',width:((x1-x0)*s)+'px',height:((y1-y0)*s)+'px',fontSize:((y1-y0)*s*.6).toFixed(1)+'px'});
  root.dataset.mg=JSON.stringify({v:V,w:+w.toFixed(1),h:+h.toFixed(1),caseH:+y.toFixed(1)});fit()}
function render(){root.innerHTML=head+`<div class="m7-b1">${caseHTML()}</div><div class="m7-b2">${restHTML()}</div>`;
  const b=root.querySelector('.m7-more');if(b)b.addEventListener('click',()=>{shown=b.classList.contains('m7-less')?0:REST.length;render();if(!shown)root.querySelector('.m7-b2').scrollIntoView({block:'start'})});
  lay()}
/* H35 (owner's phone, 2026-11-02: "MICROSOFT" and "AMAZON" ran under "STRONG"): the name fits by its ink, at least 2px clear of the right
   column's ink (grade word and grade); where name and ticker do not fit on one line at 85% of the size, the ticker takes its own line */
const ink=el=>{const rs=[],w=D.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(!n.nodeValue.trim())continue;const g=D.createRange();g.selectNodeContents(n);rs.push(...[...g.getClientRects()].filter(r=>r.width>0))}
  return rs.length?{l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right))}:null};
function fit(){root.querySelectorAll('.m7-nm').forEach(e=>{e.style.fontSize='';e.classList.remove('m7-tl');const lab=e.closest('.m7-lab'),rc=lab&&lab.querySelector('.m7-r');if(!rc||!e.offsetWidth)return;
  const R=ink(rc);if(!R)return;const lim=()=>Math.min(R.l-2,e.getBoundingClientRect().right),over=()=>{const I=ink(e);return I?I.r-lim():0};
  const f0=parseFloat(getComputedStyle(e).fontSize);let f=f0,g=0;
  while(over()>0&&f>f0*.85&&g++<40){f-=.25;e.style.fontSize=f+'px'}
  if(over()>0){e.classList.add('m7-tl');f=f0;e.style.fontSize='';g=0;while(over()>0&&f>4.5&&g++<80){f-=.25;e.style.fontSize=f+'px'}}})}
/* the grade's "1" is boxed to a full digit's width a frame later (FONTS AND GOLD below), which widens the right column: fit again then */
const refit=()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{try{fit()}catch(x){}}));
new MutationObserver(refit).observe(root,{childList:true,subtree:true});
D.fonts&&D.fonts.ready.then(()=>setTimeout(()=>{try{fit()}catch(x){}},700));
/* the old carousel stays laid out (the round view copies and measures its cards), only moved off screen and hidden from readers */
[...sec.children].forEach(c=>{if(c===root)return;c.classList.add('r6-old');c.setAttribute('aria-hidden','true');c.inert=true});
sec.classList.add('r6-sec','m7-sec');sec.appendChild(root);
/* the order: How a round works, then this section, then Meet the models. X2's own order routine re-runs on every tab change (and drops Meet the
   models to the foot of the page), so the order is set again after each one. Between beats: one gold-fingers gutter (phones and tablets). */
function order(){const t4=D.querySelector('main > section.t4'),ch=D.querySelector('main > section.ch'),ids=['learn','x2pSt','get'].map(i=>D.getElementById(i));if(!t4)return;
  let prev=t4;const hid=[...D.querySelectorAll('main > section.hero, main > section.x2o-bet, main > #standings')];hid.forEach(h=>{prev.after(h);prev=h});
  const seq=[sec,ch,...ids].filter(Boolean);const gut=!!D.querySelector('.g4-gut');
  D.querySelectorAll('main > .g4-gut').forEach(g=>g.remove());
  seq.forEach((s,i)=>{if(gut){const g=D.createElement('div');g.className='g4-gut';g.setAttribute('aria-hidden','true');prev.after(g);prev=g}prev.after(s);prev=s});
  window.__x2pTears&&requestAnimationFrame(window.__x2pTears)}
order();addEventListener('hashchange',()=>setTimeout(order,0));
/* H34: the two-tap lift on touch (see tag()). The pointer type of the tap decides; a keyboard Enter or a mouse click opens at once. */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.m7-flip li.m7-lift').forEach(l=>l.classList.remove('m7-lift'));
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.m7-flip li>a.m7-sl');if(!a)return;const li=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!li.classList.contains('m7-lift')){e.preventDefault();e.stopPropagation();unlift();li.classList.add('m7-lift')}
  ptype=''},true);
D.addEventListener('click',e=>{if(!(e.target.closest&&e.target.closest('.m7-flip li.m7-lift')))unlift()});
addEventListener('scroll',()=>{if(root.querySelector('.m7-lift')){const l=root.querySelector('.m7-lift').getBoundingClientRect();if(l.bottom<0||l.top>innerHeight)unlift()}},{passive:true});
render();
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw){lay();return}lw=innerWidth;render()});
D.fonts&&D.fonts.ready.then(()=>{fit();lay()});
window.__x2pMagApi={render,lay,slots,REST,V};
}
})();

(function(){var n=0;(function go(){if(!(document.getElementById("learn")&&document.getElementById("get")&&window.ROUNDS&&window.__x2pPnl&&window.MODELS)){if(++n<400)setTimeout(go,50);return}
try{
/* proof5 shared engine: data (h_sol.js's rules verbatim) + a painted stage (one SVG: the painting as <image>, live text lit on its glass,
   the painting's own glare screen-blended back over the glass, silkscreen words with the board's grain multiplied through them).
   Mockup only: mounts over the built v46-live-x2plus.html, replacing #learn's content (kept in the DOM, hidden) and, for the close, #get. */
(function(){
const D=document,RM=matchMedia('(prefers-reduced-motion: reduce)');
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const P5=window.P5={NM};
/* ---------- data: h_sol.js data() verbatim, plus the coin's luck zone and the card ---------- */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
P5.closeAt=closeAt;
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
P5.data=function(){
  const P=window.__x2pPnl().A,MS=Object.keys(P).filter(m=>NM[m]),RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const per=(m,r)=>P[m].per[r.n]?P[m].per[r.n].v:0;
  const A={};MS.forEach(m=>{let k=0,n=0;const s=[.5],c=[0];RS.forEach(r=>{const x=P[m].per[r.n];if(x){n++;if(x.v>0)k++}s.push((k+1)/(n+2));c.push(n)});
    const t=P[m].W+P[m].L;A[m]={s,c,W:P[m].W,L:P[m].L,t,hr:t?P[m].W/t:null,
      /* the coin's luck zone for this many calls (95% of fair coins land inside): a fact about the sample, not a verdict */
      zone:t?1.96*Math.sqrt(.25/t):1};A[m].out=A[m].hr==null?0:(A[m].hr-.5>A[m].zone?1:(.5-A[m].hr>A[m].zone?-1:0))});
  const q=m=>A[m].t*2>=N;
  const arank=MS.slice().sort((a,b)=>(q(b)-q(a))||((A[b].hr||0)-(A[a].hr||0))||(A[b].W-A[a].W));
  const NOW=Date.now(),T=nyToday(),today=Date.UTC(2000+T[2],T[0]-1,T[1]);
  const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
  const WD=[{k:'season',t:'Season',lab:'the season',f:()=>true},
    {k:'d7',t:'Last 7 days',lab:'the last 7 days',f:r=>{const a=dAgo(r);return a>=0&&a<=6}},
    {k:'d1',t:'Last 24 hours',lab:'the last 24 hours',f:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c>NOW-864e5}}];
  const W={};WD.forEach(w=>{const rs=RS.filter(w.f),ser={},tot={},set=new Set(rs.map(r=>r.n));
    MS.forEach(m=>{let b=0;ser[m]=[0];rs.forEach(r=>{b+=per(m,r);ser[m].push(b)});tot[m]=b});
    const rank=MS.slice().sort((a,b)=>w.k==='season'?((q(b)-q(a))||(tot[b]-tot[a])):(tot[b]-tot[a])||(P[b].pnl-P[a].pnl));
    W[w.k]={...w,rs,ser,tot,rank,n:rs.length,set}});
  /* the card: the next days with rounds still to come (calls in or due), by call date, from today on */
  const md=s=>{if(!s)return 9e15;const [m,d,y]=s.split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};
  const todo=[].concat(window.PENDING||[],window.UPCOMING||[]).filter(r=>md(r.called)>=today||md(r.resolves)>=today).sort((a,b)=>md(a.called)-md(b.called)||a.n-b.n);
  const days=[];todo.forEach(r=>{const k=r.called;let d=days.find(x=>x.k===k);if(!d){d={k,t:md(k),rs:[]};days.push(d)}d.rs.push(r)});
  const cap=t=>(window.CAPS&&CAPS[t])||0;days.forEach(d=>d.rs.sort((a,b)=>cap(b.ticker)-cap(a.ticker)));
  return {P,MS,RS,N,A,arank,W,per,days,today,nUp:todo.length}};
/* ---------- formatting ---------- */
P5.$f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
P5.k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(Math.abs(v)>=1e5?0:1)+'K':Math.round(Math.abs(v)));
P5.pc=v=>v==null?'–':Math.round(v*100)+'%';
P5.day=(t,today)=>{const d=new Date(t),w=d.toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'});return t===today?'Today':t===today+864e5?'Tomorrow':w+' '+d.toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})};
P5.esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
P5.logo=t=>{const L=window.CO_LOGOS&&CO_LOGOS[t];const f=L&&(L.f||L);return f?'media/'+f:null};
P5.mark=(m,x,y,s,fill)=>{const M=MODELS[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}" transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill||'#f8f0d9'}"/>`};
/* ---------- the stage: painting + lit text + glare, all in painting units (the painting is 1000 wide) ---------- */
const UID=()=>'p5'+Math.random().toString(36).slice(2,8);
P5.CR='#f8f0d9';P5.GD='#ffd21f';P5.UP='#3ee07f';P5.DN='#ff5148';P5.AMB='#ffb21a';
P5.INK={GPT:'#5ff0b4',KIMI:'#7fb6ff',CLAUDE:'#ff9d6b',GROK:'#f4efe4'};
/* text helpers: t(x,y,size,str,{a,c,cls,ff}) */
P5.t=(x,y,s,str,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||P5.CR}"${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,Bebas Neue,sans-serif'}"${o.cls?` class="${o.cls}"`:''}${o.op?` opacity="${o.op}"`:''}>${o.raw||P5.esc(str)}</text>`};
/* build(el,{img,crop:[x0,y0,x1,y1] in 1000-units of the painting, glass:[[x,y,w,h,r]...], lit:svg (emissive), silk:svg (board print), under:svg (behind lit)}) */
P5.stage=function(el,o){const id=UID(),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0;
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]}" height="${g[3]}" rx="${g[4]||0}"/>`).join('');
  const old=el.querySelector(':scope>.p5-svg');if(old)old.remove();el.insertAdjacentHTML('afterbegin',`<svg class="p5-svg" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${P5.esc(o.label||'')}">
   <defs>
    <filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||3.2}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||3.2)*3.4}" result="b2"/>
     <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".55"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}s" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.2 1.55" result="m"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale=".9" result="d"/><feComposite in="d" in2="m" operator="in"/></filter>
    <filter id="${id}e" x="-5%" y="-5%" width="110%" height="110%"><feMorphology operator="dilate" radius=".35"/><feGaussianBlur stdDeviation=".35"/></filter>
    <clipPath id="${id}c">${gl}</clipPath>
    <clipPath id="${id}k">${o.silk||''}</clipPath>
   </defs>
   ${o.img?`<image href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none"/>`:''}
   <g class="p5-under">${o.under||''}</g>
   <g class="p5-lit" filter="url(#${id}g)">${o.lit||''}</g>
   <g class="p5-ov">${o.over||''}</g>
   ${gl?`<image class="p5-glare" href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare||.5}"/>`:''}
   ${o.silk?`<g class="p5-silk" filter="url(#${id}s)">${o.silk}</g><image href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none" clip-path="url(#${id}k)" style="mix-blend-mode:multiply;opacity:.32"/>`:''}
   ${o.top||''}
  </svg>`);
  el.style.aspectRatio=`${w} / ${h}`;return el.querySelector('svg')};
/* ---------- mount ---------- */
P5.mountProof=function(take){const sec=D.querySelector('#learn');if(!sec)return;
  [...sec.children].forEach(c=>{if(!c.classList.contains('p5'))c.style.display='none'});sec.classList.add('p5-host');
  let box=sec.querySelector('.p5');if(!box){box=D.createElement('div');box.className='p5 p5-'+take.id;sec.appendChild(box)}
  const X=P5.data(),V={view:'acc',win:'season'};
  const draw=()=>{box.innerHTML=take.html(X,V);take.draw(box,X,V);
    box.querySelectorAll('[data-v],[data-w]').forEach(b=>b.onclick=()=>{if(b.dataset.v)V.view=b.dataset.v;if(b.dataset.w)V.win=b.dataset.w;draw();const f=box.querySelector(`[data-${b.dataset.v?'v':'w'}="${b.dataset.v||b.dataset.w}"]`);f&&f.focus({preventScroll:true})})};
  draw();P5.cur={X,V,draw,box};let w0=box.clientWidth;new ResizeObserver(()=>{if(box.clientWidth!==w0){w0=box.clientWidth;draw()}}).observe(box)};
P5.mountClose=function(take){const sec=D.querySelector('#get');if(!sec)return;
  [...sec.children].forEach(c=>{if(!c.classList.contains('p5c'))c.style.display='none'});sec.classList.add('p5-host');
  let box=sec.querySelector('.p5c');if(!box){box=D.createElement('div');box.className='p5c p5c-'+take.id;sec.appendChild(box)}
  const X=P5.data();const draw=()=>{box.innerHTML=take.html(X);take.draw(box,X);window.__x2pTears&&requestAnimationFrame(window.__x2pTears)};
  if(take.prep)take.prep(X).then(draw);
  /* H35: a take with its own desktop composition is drawn again when the width crosses into or out of it */
  if(take.dk){let k0=take.dk();addEventListener('resize',()=>{const k=take.dk();if(k!==k0){k0=k;draw()}})}if(!take.prep)P5.prepLogos([].concat(...X.days.slice(0,3).map(d=>d.rs.map(r=>r.ticker)))).then(draw);draw();P5.curC={X,draw,box};
  /* the next close ticks once a minute */
  if(!RM.matches)setInterval(()=>{const e=box.querySelector('.p5-cd');if(e&&take.cd)e.textContent=take.cd(X)},30000)};
/* switch markup shared by the takes (real buttons; the takes paint them onto their surfaces) */
P5.sw=(V)=>`<div class="p5-sw" role="group" aria-label="View">${[['acc','Hit rate'],['pnl','P&L']].map(([k,t])=>`<button type="button" data-v="${k}" aria-pressed="${V.view===k}">${t}</button>`).join('')}</div>`+
  (V.view==='pnl'?`<div class="p5-sw p5-ws" role="group" aria-label="Window">${[['season','Season'],['d7','Last 7 days'],['d1','Last 24 hours']].map(([k,t])=>`<button type="button" data-w="${k}" aria-pressed="${V.win===k}">${t}</button>`).join('')}</div>`:'');
/* H34 (owner, 2026-11-02, night): a section's heading is clearly the loudest words in it: on phones and tablets it fills its line (up to 52px) */
/* H35: one heading size on the whole Overview (the CSS sets it), so fitH only clears an old inline size */
P5.fitH=h=>{if(!h)return;h.style.removeProperty('font-size');if(innerWidth>=1000||!h.offsetWidth||true)return;const c=getComputedStyle(h),fs=parseFloat(c.fontSize),av=h.clientWidth-parseFloat(c.paddingLeft)-parseFloat(c.paddingRight);
  const rg=document.createRange();rg.selectNodeContents(h);const w=rg.getBoundingClientRect().width;if(!w)return;const f=Math.min(52,Math.floor(fs*av/w*.95*10)/10);if(f>fs)h.style.setProperty('font-size',f+'px','important')};
let p5fw=innerWidth;addEventListener('resize',()=>{if(innerWidth===p5fw)return;p5fw=innerWidth;document.querySelectorAll('main .p5-h').forEach(P5.fitH)});
document.fonts&&document.fonts.ready.then(()=>document.querySelectorAll('main .p5-h').forEach(P5.fitH));
P5.head=(a,b)=>`<h2 class="t4-h2 p5-h"><span class="t4-hw">${a}</span>${b?` <span class="t4-hw p5-hw2">${b}</span>`:''}</h2>`;
})();
(function(){const P5=window.P5;
/* real buttons over the painted controls: items [{k:'v'|'w',val,x,y,w,h,label,on}] in painting units */
P5.hits=(crop,items)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return items.map(i=>`<button type="button" class="p5-hit" data-${i.k}="${i.val}" aria-pressed="${!!i.on}" aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></button>`).join('')};
P5.link=(crop,i)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return `<a class="p5-hit" href="${i.href}"${i.ext?' target="_blank" rel="noopener"':''} aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></a>`};
P5.table=(X,V)=>{const pc=P5.pc,NM=P5.NM;if(V.view==='acc')return `<table class="p5-sr"><caption>Hit rate by AI, ${X.N} rounds. A coin flip gets 50%; the luck zone is where 95 in 100 coins would land after this many calls.</caption><tr><th>AI</th><th>W-L</th><th>Hit rate</th><th>Beyond the luck zone</th></tr>${X.arank.map(m=>{const a=X.A[m];return `<tr><th>${NM[m]}</th><td>${a.W}-${a.L}</td><td>${pc(a.hr)}</td><td>${a.out>0?'Yes, above':a.out<0?'Yes, below':'No'}</td></tr>`}).join('')}</table>`;
  const w=X.W[V.win];return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every trade, ${w.lab}</caption><tr><th>AI</th><th>Last 24 hours</th><th>Last 7 days</th><th>Season</th></tr>${w.rank.map(m=>`<tr><th>${NM[m]}</th><td>${P5.$f(X.W.d1.tot[m])}</td><td>${P5.$f(X.W.d7.tot[m])}</td><td>${P5.$f(X.W.season.tot[m])}</td></tr>`).join('')}</table>`};
/* the next close after now (any round still to come), and a short countdown */
P5.nextClose=X=>{const now=Date.now();let best=null;X.days.forEach(d=>d.rs.forEach(r=>{const c=P5.closeAt(r.ticker,r.resolves);if(c&&c>now&&(!best||c<best.c))best={c,r}}));return best};
P5.cd=X=>{const b=P5.nextClose(X);if(!b)return 'Date to come';const m=Math.max(0,Math.round((b.c-Date.now())/6e4)),d=Math.floor(m/1440),h=Math.floor(m%1440/60);return d?`${d}d ${h}h`:`${h}h ${String(m%60).padStart(2,'0')}m`};
/* a company logo as a lit glyph on a display: its own shape, lit in cream (a display has one phosphor) */
/* logos: the tile (if any) keyed out on a canvas, the mark kept as an alpha mask, so a display can light it in one phosphor */
const LG={};P5.prepLogos=ts=>Promise.all(ts.filter(t=>!(t in LG)).map(t=>new Promise(res=>{const f=P5.logo(t);if(!f){LG[t]=null;return res()}const im=new Image();im.onload=()=>{try{
  const S=160,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');const k=Math.min(S/im.width,S/im.height);g.drawImage(im,(S-im.width*k)/2,(S-im.height*k)/2,im.width*k,im.height*k);
  const d=g.getImageData(0,0,S,S),p=d.data,px=(x,y)=>(y*S+x)*4;const q=Math.round(S*.13),cs=[[q,q],[S-1-q,q],[q,S-1-q],[S-1-q,S-1-q]].map(([x,y])=>px(x,y));
  const tile=cs.every(i=>p[i+3]>200)&&cs.every(i=>Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2])<70);
  for(let i=0;i<p.length;i+=4){let a=p[i+3];if(tile){const dd=Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2]);a=Math.min(a,Math.max(0,Math.min(255,(dd-46)*4)))}p[i]=248;p[i+1]=240;p[i+2]=217;p[i+3]=a}
  g.putImageData(d,0,0);LG[t]=c.toDataURL()}catch(e){LG[t]=null}res()};im.onerror=()=>{LG[t]=null;res()};im.src=f})));
P5.litLogo=(t,x,y,s)=>{if(LG[t])return `<image href="${LG[t]}" x="${(x-s/2).toFixed(1)}" y="${(y-s/2).toFixed(1)}" width="${s}" height="${s}"/>`;const f=P5.logo(t);return f?`<image href="${f}" x="${(x-s/2).toFixed(1)}" y="${(y-s/2).toFixed(1)}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid meet" style="filter:brightness(0) invert(.94) sepia(.25)"/>`:P5.t(x,y+s*.18,s*.5,t,{a:'middle'})};
/* tell the stage when it is on screen, for the re-scan */
let TW=null;P5.tw=(t,s,f)=>{TW=TW||document.createElement('canvas').getContext('2d');TW.font=`${s}px ${f||'Anton'}`;return TW.measureText(t).width};
P5.vis=el=>{if(!('IntersectionObserver' in window))return;new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('p5-vis',e.isIntersecting))).observe(el)};
})();
(function(){const P5=window.P5,{t}=P5;
/* the switch strip: a strip of the same green board (panel painting, between its display and its buttons), the controls
   silkscreened on it, the open one with a lit LED beside it; the footnote printed small on the same strip. */
P5.strip=function(el,V,o){o=o||{};const ac=V.view==='acc',G=[136,172,724,288],CROP=[118,154,882,478];
  const items=[];let lit='',under='';const s=44;
  const row=(list,y,k,sz)=>{const pad=22,ws=list.map(([v,l])=>P5.tw(l,sz)+pad*2);let x=500-(ws.reduce((a,b)=>a+b,0)+(list.length-1)*14)/2;
    list.forEach(([v,l],i)=>{const on=k==='v'?V.view===v:V.win===v,w=ws[i];
      under+=`<rect x="${x}" y="${y-sz-12}" width="${w}" height="${sz+30}" rx="6" fill="none" stroke="${P5.AMB}" stroke-opacity="${on?0:.45}" stroke-width="2"/>`;
      lit+=(on?`<rect x="${x}" y="${y-sz-12}" width="${w}" height="${sz+30}" rx="6" fill="${P5.AMB}"/>`:'')+t(x+w/2,y,sz,l,{a:'middle',c:on?'#140a00':P5.AMB,op:on?1:.8});
      items.push({k,val:v,x,y:y-sz-12,w,h:sz+30,label:l,on});x+=w+14})};
  if(ac){row([['acc','HIT RATE'],['pnl','P&L']],272,'v',s);if(o.foot)lit+=t(500,372,30,o.foot,{a:'middle',c:'#9fd8b4'})}
  else{row([['acc','HIT RATE'],['pnl','P&L']],246,'v',38);row([['season','SEASON'],['d7','7 DAYS'],['d1','24 HOURS']],336,'w',36);if(o.foot)lit+=t(500,420,26,o.foot,{a:'middle',c:'#9fd8b4'})}
  P5.stage(el,{img:'media/p5-panel.jpg',crop:CROP,glass:[[G[0],G[1],G[2],G[3],10]],lit,under,label:'View switch',bloom:2,glare:.55});
  el.insertAdjacentHTML('beforeend',P5.hits(CROP,items))};
})();

/* T1 THE SCOPE: the bench oscilloscope traces each AI's hit rate round by round. The coin's luck zone is the scope's mask
   (the funnel every fair coin stays inside, 95 in 100), narrowing with every round. A trace that leaves the mask has left luck's reach.
   The knobs are the view (Hit rate / P&L), the three keys the window (Season / 7 days / 24 hours); their labels are the scope's
   soft-key labels on the bottom of the screen, above each control, as on a real scope. Painting: img/q-scope-b.jpg. */
(function(){const P5=window.P5,{t,pc,k$,NM,INK,GD,AMB,UP,DN,CR}=P5;
const IMG='media/p5-scope.jpg',G=[172,148,656,608],CROP=[120,118,880,940];
const KN=[[285,870],[385,870]],BT=[[672,870],[750,870],[828,870]];
function screen(X,V){const ac=V.view==='acc',w=X.W[V.win];let lit='',under='',over='';
  const cx0=258,cx1=628,cy0=262,cy1=598,lab=34,sm=30;
  /* the top line of the screen: what is traced, and how big the sample is */
  lit+=t(804,222,lab,(ac?X.N:w.n)+(ac||w.n!==1?' ROUNDS':' ROUND'),{a:'end',c:CR,ls:1});
  let lo,hi,n,rank,ser,Y,Xp;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8}
  else{n=w.n;rank=w.rank;ser=m=>w.ser[m];const all=[].concat(...X.MS.map(m=>w.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.08;lo=a-pd;hi=b+pd}
  Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0);Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  /* graticule: the scope's own grid, faint phosphor */
  for(let i=0;i<=8;i++)under+=`<line x1="${cx0+(cx1-cx0)*i/8}" y1="${cy0}" x2="${cx0+(cx1-cx0)*i/8}" y2="${cy1}" stroke="#7dffb0" stroke-opacity=".09" stroke-width="1.2"/>`;
  if(ac){
    /* the mask: the coin's 95% zone for the line as drawn ((right+1)/(calls+2)), by round */
    const up=[],dn=[];for(let i=0;i<=n;i++){const z=i?1.96*Math.sqrt(i/4)/(i+2):0;up.push([Xp(i),Y(.5+z)]);dn.push([Xp(i),Y(.5-z)])}
    under+=`<path d="M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z" fill="${AMB}" fill-opacity=".13" stroke="${AMB}" stroke-opacity=".7" stroke-width="2" stroke-dasharray="7 6"/>`;
    [.3,.4,.6,.7,.8].forEach(v=>{under+=`<line x1="${cx0}" y1="${Y(v)}" x2="${cx1}" y2="${Y(v)}" stroke="#7dffb0" stroke-opacity=".12" stroke-width="1.2"/>`;lit+=t(cx0-10,Y(v)+sm*.36,sm,Math.round(v*100)+'%',{a:'end',c:CR,op:.75})});
    lit+=`<line x1="${cx0}" y1="${Y(.5)}" x2="${cx1}" y2="${Y(.5)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(.5)+sm*.36,sm,'50%',{a:'end',c:CR});
    const li=Math.round(n*.2),lz=1.96*Math.sqrt(li/4)/(li+2);lit+=t(cx0+14,Y(.5)-12,sm,'COIN',{c:CR})+t(Xp(li),Math.min(cy1-8,Y(.5-lz*.72)),sm,'LUCK ZONE',{a:'middle',c:CR,op:.95});
  }else{
    const st=P5.k$;const tk=[lo,0,hi].map(v=>v);
    if(n){lit+=`<line x1="${cx0}" y1="${Y(0)}" x2="${cx1}" y2="${Y(0)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(0)+sm*.36,sm,'$0',{a:'end',c:CR});
      const top=Math.max(...[].concat(...X.MS.map(m=>w.ser[m]))),bot=Math.min(...[].concat(...X.MS.map(m=>w.ser[m])));
      [top,bot].forEach(v=>{if(Math.abs(Y(v)-Y(0))>40)lit+=t(cx0-10,Y(v)+sm*.36,sm,st(v).replace('.0K','K'),{a:'end',c:CR,op:.75})})}
    else lit+=t((cx0+cx1)/2,(cy0+cy1)/2,lab,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:CR});
  }
  /* the traces, the leader's in gold, drawn last */
  const lead=rank[0];
  if(n)rank.slice().reverse().forEach(m=>{const p=ser(m),ld=m===lead;
    lit+=`<path class="p5-tr" d="${p.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${ld?GD:INK[m]}" stroke-width="${ld?5:3.6}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`});
  /* the readouts at each trace's end: name and figure, pushed apart so they never touch */
  if(n){const ends=rank.map(m=>{const p=ser(m);return {m,y:Y(p[p.length-1])}}).sort((a,b)=>a.y-b.y);const gap=ac?40:64;
    for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<gap)ends[i].y=ends[i-1].y+gap;const ov=ends[ends.length-1].y-(cy1+(ac?6:-20));if(ov>0)ends.forEach(e=>e.y-=ov);
    ends.forEach(e=>{const ld=e.m===lead,c=ld?GD:INK[e.m],a=X.A[e.m];
      if(ac)lit+=t(cx1+16,e.y+lab*.36,lab,'',{raw:`<tspan fill="${c}">${P5.esc(NM[e.m].toUpperCase())}</tspan> <tspan fill="${ld?GD:a.out>0?UP:a.out<0?DN:CR}">${pc(a.hr)}</tspan>`});
      else{const v=w.tot[e.m];lit+=t(cx1+16,e.y-2,lab*.9,NM[e.m].toUpperCase(),{c})+t(cx1+16,e.y+lab*.95,lab,k$(v),{c:ld?GD:v>0?UP:v<0?DN:CR})}})}
  /* the measurement row, as a scope prints it under the trace: W-L per AI in the trace's colour */
  if(ac){const y=652;rank.forEach((m,i)=>{const x=196+i*152,a=X.A[m];lit+=t(x,y,sm,NM[m].toUpperCase(),{c:m===lead?GD:INK[m]})+t(x,y+36,lab,a.W+'-'+a.L,{c:CR})})}
  else if(n){const y=652;lit+=t(196,y,sm,'IF YOU’D BET $100K ON EVERY CALL',{c:CR,op:.85})+t(196,y+36,sm,'NO LEVERAGE · BEFORE FEES',{c:CR,op:.7})}
  /* soft-key labels on the screen's foot, above each control; the open one boxed */
  const keys=[['v','acc','HIT RATE',KN[0][0]],['v','pnl','P&L',KN[1][0]],['w','season','SEASON',BT[0][0]-12],['w','d7','7D',BT[1][0]],['w','d1','24H',BT[2][0]]];
  /* H32 (owner, 2026-11-02: "remove the screen"): no scope; the soft keys are the tabs themselves, cream boxes on the board, the open one filled */
  const kr=[];let kx=200;const KS=30,ky=744;keys.forEach(([k,val,l])=>{if(k==='w'&&ac)return;const on=k==='v'?V.view===val:V.win===val,wdt=P5.tw(l,KS)+26;
    if(k==='w'&&kr.length&&kr[kr.length-1].k==='v')kx+=26;
    under+=`<rect x="${kx}" y="${ky-KS*1.02}" width="${wdt}" height="${KS*1.42}" rx="5" fill="${on?CR:'rgba(4,7,14,.72)'}" stroke="${CR}" stroke-width="2.4"/>`;
    over+=t(kx+wdt/2,ky,KS,l,{a:'middle',c:on?'#0d0b10':CR});kr.push({k,val,l,on,x:kx,y:ky-KS*1.02,w:wdt,h:KS*1.42});kx+=wdt+12});
  return {lit,under,over,kr}}
P5.take={id:'t1',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><p class="p5-ln">${V.view==='acc'?'<b>Hit rate:</b> how often a trade went the right way. Inside the gold zone, <b>a coin could have done it.</b>':'Every call a $100K trade. <b>Who made money?</b>'}</p>${P5.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.p5-st'),s=screen(X,V);
  const C2=[170,166,846,782],LB={acc:'Hit rate view',pnl:'P&L view',season:'Season',d7:'Last 7 days',d1:'Last 24 hours'};
  P5.stage(st,{img:null,crop:C2,glass:[],lit:s.lit,under:s.under,over:s.over,label:V.view==='acc'?'Chart: each AI’s hit rate round by round against the coin’s luck zone':'Chart: P&L if you’d bet $100K on every trade',bloom:2.6});
  st.insertAdjacentHTML('beforeend',P5.hits(C2,s.kr.map(r=>({k:r.k,val:r.val,x:r.x-4,y:r.y-8,w:r.w+8,h:r.h+16,label:LB[r.val],on:r.on}))));
  P5.vis(st)}};
})();

/* H33: Smart or lucky is x2p_sol.js (the H29 director's chart, loaded right after this file); T1 mounts only if that one did not */
setTimeout(()=>{if(!P5.cur)P5.mountProof(P5.take)},0);
/* C1 THE NEXT SOCKETS: the board's last row is empty sockets waiting for the next rounds' chips. Each window above a socket lights the
   company's mark and the day its calls lock; the board ends in a gold edge connector that plugs into the Upcoming tab. Then the panel:
   the next bell's countdown on its glass, and two buttons: Get $EZ and Follow on X. Paintings: q-sockets-b, q-panel-b.
   H35 (owner, 2026-11-02, night): "Up next" (was "Next, the AIs trade": "sounds horrible"), the section's one caption box under the
   heading, then the board: the next 8 companies as 4 + 4, the first four in the lit windows, the next four seated in the sockets on dark
   glass, each mark in its own colours (its tile as drawn, a cream plate behind a dark mark, a bare mark as drawn: the Upcoming tab's rule,
   measured per file) with the day its calls lock under it; "Everything coming up" is gone from the board, and so is the next bell's
   glass (the panel is the two buttons only). Phones and tablets: four columns of the board; desktop (1000px+): all six columns, 6 + 6. */
(function(){const P5=window.P5,{t,GD,AMB,UP,CR}=P5;
const CR1=[100,226,632,594],WN=[[144,254],[270,256],[394,256],[518,256],[642,254],[766,254]],WW=90,WH=100;
const SK=[173,303,432,566,697,826],SKY=447,SKW=66,SKH=88;
const CR2=[176,520,824,822],B1=[336,660],B2=[658,660];
const CR1D=[80,232,920,584];
const DK=()=>innerWidth>=1000;
function card(X,n){const out=[];X.days.forEach(d=>d.rs.forEach(r=>{if(out.length<n)out.push({r,d})}));return out}
/* company marks in their own colours: mode per file (tile / plate / bare) and the file trimmed to its ink, once, on a canvas */
const LM={},LT={},lin=c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)};
function prep(ts){return Promise.all([...new Set(ts)].filter(tk=>!(tk in LM)).map(tk=>new Promise(res=>{const src=P5.logo(tk),L=window.CO_LOGOS&&CO_LOGOS[tk],dk=!!(L&&L.dark);
  if(!src){LM[tk]=null;return res()}const im=new Image();
  im.onload=()=>{try{const w0=im.naturalWidth,h0=im.naturalHeight,f=Math.min(1,256/Math.max(w0,h0)),w=Math.max(4,Math.round(w0*f)),h=Math.max(4,Math.round(h0*f));
    const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const a=x.getImageData(0,0,w,h).data;
    const px=(i,j)=>{const q=(j*w+i)*4;return [a[q],a[q+1],a[q+2],a[q+3]]},cs=[px(1,1),px(w-2,1),px(1,h-2),px(w-2,h-2)];
    if(cs.every(q=>q[3]>250&&Math.abs(q[0]-cs[0][0])+Math.abs(q[1]-cs[0][1])+Math.abs(q[2]-cs[0][2])<24)){LM[tk]='tile';LT[tk]=src;return res()}
    let n=0,lo=0;if(!dk)for(let q=0;q<a.length;q+=4){if(a[q+3]<128)continue;n++;const Lm=.2126*lin(a[q])+.7152*lin(a[q+1])+.0722*lin(a[q+2]);if(Lm<.115)lo++}
    LM[tk]=!dk&&n&&lo/n>.3?'plate':'bare';
    let X0=w,Y0=h,X1=-1,Y1=-1;for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(a[(j*w+i)*4+3]>16){if(i<X0)X0=i;if(i>X1)X1=i;if(j<Y0)Y0=j;if(j>Y1)Y1=j}
    if(X1>X0&&Y1>Y0&&(X1-X0+1)*(Y1-Y0+1)<w*h*.8){const pw=Math.round(Math.max(X1-X0,Y1-Y0)*.04),cw=X1-X0+1+2*pw,ch=Y1-Y0+1+2*pw,c3=document.createElement('canvas');c3.width=cw;c3.height=ch;
      c3.getContext('2d').drawImage(c,X0,Y0,X1-X0+1,Y1-Y0+1,pw,pw,X1-X0+1,Y1-Y0+1);LT[tk]=c3.toDataURL()}else LT[tk]=src}catch(e){LM[tk]=LM[tk]||'bare';LT[tk]=LT[tk]||src}res()};
  im.onerror=()=>{LM[tk]=null;res()};im.src=src})))}
let MK=0;function mark(tk,x,y,s){const m=LM[tk],u=LT[tk];
  if(!m||!u)return t(x,y+s*.18,s*.42,String(tk).split('.')[0],{a:'middle',c:CR});
  const T=s*.9,r=T*.2,f=v=>v.toFixed(1);
  if(m==='tile'){const id='p5mk'+(MK++);return `<clipPath id="${id}"><rect x="${f(x-T/2)}" y="${f(y-T/2)}" width="${f(T)}" height="${f(T)}" rx="${f(r)}"/></clipPath><image href="${u}" x="${f(x-T/2)}" y="${f(y-T/2)}" width="${f(T)}" height="${f(T)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id})"/><rect x="${f(x-T/2)}" y="${f(y-T/2)}" width="${f(T)}" height="${f(T)}" rx="${f(r)}" fill="none" stroke="#0d0b10" stroke-width="${f(T*.03)}"/>`}
  if(m==='plate'){const i=T*.72;return `<rect x="${f(x-T/2)}" y="${f(y-T/2)}" width="${f(T)}" height="${f(T)}" rx="${f(r)}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="${f(T*.03)}"/><image href="${u}" x="${f(x-i/2)}" y="${f(y-i/2)}" width="${f(i)}" height="${f(i)}" preserveAspectRatio="xMidYMid meet"/>`}
  return `<image href="${u}" x="${f(x-s/2)}" y="${f(y-s/2)}" width="${f(s)}" height="${f(s)}" preserveAspectRatio="xMidYMid meet"/>`}
const HEAD=`<h2 class="t4-h2 p5-h p5-nx"><span class="t4-hw">Up next</span></h2><p class="h35-cap">These companies report next. Each one is a round for the four AI<span class="x2p-lc">s</span>, not a bet.</p>`;
const SCHED=`<button type="button" class="p5-sched" data-go="upcoming">See the full schedule <span aria-hidden="true">→</span></button>`;
const SCAM=`$EZ isn’t live yet. The address appears here, and only here, at launch. <b>Anyone DMing you one before that is a scammer.</b> Not financial advice.`;
P5.take={id:'c1',dk:DK,prep:X=>prep(card(X,12).map(c=>c.r.ticker)),html(X){
  return `<div class="p5-bleed p5-nx2${DK()?' p5-dkx':''}">${HEAD}<div class="p5-col"><div class="p5-st p5-nxs"></div>${SCHED}</div><div class="p5-gut"></div><div class="p5-col p5-nxp"><div class="p5-st"></div><p class="p5-ln p5-nxw">${SCAM}</p></div></div>`},
 draw(box,X){const dk=DK(),[s1,s2]=box.querySelectorAll('.p5-st'),cols=dk?6:4,C=card(X,cols*2);let lit='',over='',under='';MK=0;const glass=[];
  const day=d=>new Date(d.t).toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'}).toUpperCase();
  C.forEach(({r,d},i)=>{const row=Math.floor(i/cols),col=i%cols;
   if(row===0){const [x,y]=WN[col],cx=x+WW/2;glass.push([x,y,WW,WH,6]);over+=mark(r.ticker,cx,y+36,54);lit+=t(cx,y+93,22,day(d),{a:'middle',c:AMB})}
   else{const cx=SK[col];glass.push([cx-SKW/2,SKY,SKW,SKH,6]);under+=`<rect x="${cx-SKW/2}" y="${SKY}" width="${SKW}" height="${SKH}" rx="6" fill="#07080a" stroke="#c9a24a" stroke-width="2.4"/>`;
    over+=mark(r.ticker,cx,SKY+31,43);lit+=t(cx,SKY+83,19,day(d),{a:'middle',c:AMB})}});
  const lab=C.map(({r,d})=>`${r.co} (${r.ticker}), calls lock ${P5.day(d.t,X.today)}`).join('; ');
  P5.stage(s1,{img:'media/p5-sockets.jpg',crop:dk?CR1D:CR1,glass,lit,over,under,glare:.45,bloom:1.6,label:'Up next: '+lab});
  /* the panel: the two buttons, their caps lit with what they do */
  const live=!!(window.CONFIG&&CONFIG.ca);
  const l2=t(B1[0],B1[1]-6,30,'GET',{a:'middle',c:'#eafff1'})+t(B1[0],B1[1]+30,34,'$EZ',{a:'middle',c:'#eafff1'})+t(B2[0],B2[1]-6,30,'FOLLOW',{a:'middle',c:CR})+t(B2[0],B2[1]+30,34,'ON X',{a:'middle',c:CR});
  const sk=t(B1[0],B1[1]+118,26,live?'':'OPENS AT LAUNCH',{a:'middle',c:'#fff6dc'})+t(B2[0],B2[1]+118,26,'EVERY CALL FIRST',{a:'middle',c:'#fff6dc'});
  P5.stage(s2,{img:'media/p5-panel.jpg',crop:CR2,lit:l2,silk:sk,bloom:2.2,label:'Get $EZ and Follow on X'});
  s2.insertAdjacentHTML('beforeend',(live?P5.link(CR2,{href:CONFIG.buyUrl||'#',label:'Get $EZ',x:B1[0]-90,y:B1[1]-90,w:180,h:180,ext:1}):'')+P5.link(CR2,{href:(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn',label:'Follow EZ on X',x:B2[0]-90,y:B2[1]-90,w:180,h:180,ext:1}));
  P5.vis(s1);
  /* H34: the schedule button switches to the Upcoming tab through the router's own address (as the tabs do: #/upcoming), never a page anchor */
  const sb=box.querySelector('.p5-sched');if(sb)sb.onclick=()=>{location.hash='#/upcoming'};
  P5.fitH&&P5.fitH(box.querySelector('.p5-h'))}};
})();

P5.mountClose(P5.take);
}catch(e){window.__x2pP5Err=e;console.error(e)}})()})();
document.documentElement.classList.add('x2b-bleed');
/* X2P_BET: Bet #1: NVIDIA on X2+. Since round H28 (2026-11-02) it is take B2 of h/bet5 (see "B2" below), edited here by hand:
   the vault opener, the parts list S4, the sockets and board D (H_BETD) are gone from X2+, so bet2x/gen.py no longer applies.
   (Before: X3+'s live bet chapter as an X2+ drop-in, generated by h/bet2x/gen.py from h_bet.js + h_betd.js.)
   It mounts in X2+'s own bet section (#x2pSt, built by x2plus.js BETSEC), whose children stay in the DOM, hidden; it needs no comic
   DOM (#wc-book, html.p1-on). Data rules unchanged: the bet time is world-comic.js's betAt (verbatim), the pool share SIM.poolShare,
   the leader the P&L leader of window.__x2pPnl (no longer shown: the owner's words name "the #1 AI"). html.x2b-on is set once mounted.
   Errors: window.__x2pHbetErr. */
/* X2+ loads Shantell Sans at 600;700 only: ask for X3+'s own set (400, 600, 800, italic 600), so the bet draws exactly as on X3+ */
(function(){var D=document;if(D.getElementById('x2b-font'))return;var l=D.createElement('link');l.id='x2b-font';l.rel='stylesheet';
 l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:ital,wght@0,400;0,600;0,800;1,600&display=swap';D.head.appendChild(l)})();
/* H_BET on X2+: Bet #1: NVIDIA as take B2 (see "B2" below). The painted GPU chip carries the heading and the date, and the live
   countdown set into its four dies (page text mapped onto each die's glass with a CSS matrix3d; each digit a reel that rolls when it
   changes). The bet time is world-comic.js's betAt, copied verbatim. The digits tick once a second on the wall clock's second, only while
   the chip is on screen and the tab is visible. Nothing moves with reduced motion. A failure is kept in window.__x2pHbetErr. */
(function(){
const H=document.documentElement,D=document,RM=matchMedia('(prefers-reduced-motion: reduce)');
/* full file names written out: make_site.py copies only media named in the page */
const IMG={chip:'media/bet-chip-h2.jpg',grP:'media/bet-ground-h2-phone.jpg',grD:'media/bet-ground-h2-desk.jpg',s2:'media/s2-chips-h35.jpg'};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const p2=v=>String(v).padStart(2,'0');

/* the bet: the close the weekday after NVIDIA's call date in the sheet (or SIM/CONFIG.betDate); world-comic.js betAt, verbatim */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}

/* the leader is the page's own: the name the page's bet section prints ("Today that's <b>Grok</b>"); else the P&L leader */
function data(sec){const S=window.SIM||{},at=betAt();let lead=null;
  const b=sec.querySelector('.wc-bet-l .wc-cap b');if(b){const t=b.textContent.trim().toLowerCase();lead=Object.keys(NM).find(k=>NM[k].toLowerCase()===t)||null}
  if(!lead&&window.__x2pPnl){const P=window.__x2pPnl().A;lead=Object.keys(P).sort((a,c)=>P[c].pnl-P[a].pnl)[0]}
  return {at,lead,share:S.poolShare!=null?Math.round(S.poolShare*100):null,
    md:at?new Date(at).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'America/New_York'}):''}}

/* homography: the unit rect (w x h) onto quad q=[tl,tr,br,bl] -> CSS matrix3d */
function persp(w,h,q){const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${c},${f},0,1)`}
/* H35: a flat (2D) fit of the unit rect onto a small quad: the mean of its edges, centred on its centre. The Season 2 dies are small
   and nearly square-on, so a 2D matrix is within a pixel of the perspective one and, unlike matrix3d, makes no GPU layer of its own. */
function aff(w,h,q){const [p0,p1,p2,p3]=q,ux=((p1[0]-p0[0])+(p2[0]-p3[0]))/2/w,uy=((p1[1]-p0[1])+(p2[1]-p3[1]))/2/w,vx=((p3[0]-p0[0])+(p2[0]-p1[0]))/2/h,vy=((p3[1]-p0[1])+(p2[1]-p1[1]))/2/h;
  const cx=(p0[0]+p1[0]+p2[0]+p3[0])/4,cy=(p0[1]+p1[1]+p2[1]+p3[1])/4;
  return `matrix(${ux},${uy},${vx},${vy},${cx-ux*w/2-vx*h/2},${cy-uy*w/2-vy*h/2})`}
/* the chip: the four dies' glass, measured on the 2048x1152 painting */
const Q=[[[650,494],[781,471],[858,610],[719,631]],[[842,465],[981,440],[1064,579],[918,602]],[[1043,431],[1172,410],[1262,547],[1121,568]],[[1229,403],[1358,383],[1453,514],[1316,535]]];
const lq=q=>{const [tl,tr,br,bl]=q,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.13),m(br,tr,.13),m(br,tr,.36),m(bl,tl,.36)]};
const K=['d','h','m','x'],LAB=['days','hrs','min','sec'];
/* reel digits: each character its own slot; a changed slot rolls the old digit down and out and the new one in from above (counting down) */
function setReel(el,str){const slots=[...el.children];
  while(slots.length<str.length){const s=D.createElement('span');s.className='hbc-sl';s.innerHTML='<i></i>';el.prepend(s);slots.unshift(s)}
  while(slots.length>str.length){slots.shift().remove()}
  [...str].forEach((ch,i)=>{const s=slots[i],cur=s.lastElementChild;if(cur.textContent===ch)return;
    s.querySelectorAll('i').forEach(x=>{if(x!==cur)x.remove()});
    if(!cur.textContent||RM.matches||!cur.animate){cur.textContent=ch;return}
    const n=D.createElement('i');n.textContent=ch;s.appendChild(n);
    const o={duration:420,easing:'cubic-bezier(.3,.9,.3,1.15)',fill:'forwards'};
    cur.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(78%)',opacity:0}],{...o,easing:'cubic-bezier(.5,0,.8,.4)',duration:300}).onfinish=()=>cur.remove();
    const a=n.animate([{transform:'translateY(-80%)',opacity:0},{transform:'translateY(0)',opacity:1}],o);a.onfinish=()=>{try{a.commitStyles();a.cancel()}catch(e){}};
    const die=el.closest('.hbc-die');if(die)try{die.animate([{'--fl':1},{'--fl':0}],{duration:520,easing:'ease-out'})}catch(e){}})}
/* one ticker per chip: on the wall clock's second, only while the chip is (nearly) on screen and the tab is visible */
function tick(root){const art=root.querySelector('.hbc-art'),sr=root.querySelector('[data-sr]');let on=false,t=0,lastSr=-1;
  const set=()=>{const L=left();if(!L)return;const v={d:p2(L.d),h:p2(L.h),m:p2(L.m),x:p2(L.x)};
    root.querySelectorAll('.hbc-num[data-r]').forEach(e=>setReel(e,v[e.dataset.r]));
    const q=Math.floor(L.s/30);if(sr&&q!==lastSr){lastSr=q;sr.textContent=`${L.d} days, ${L.h} hours, ${L.m} minutes until the NVIDIA bet`}};
  const loop=()=>{clearTimeout(t);if(!on||D.hidden||!root.isConnected)return;set();t=setTimeout(loop,1000-(Date.now()%1000)+5)};
  set();
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{on=es[es.length-1].isIntersecting;loop()},{rootMargin:'120px 0px'}).observe(art);else{on=true;loop()}
  D.addEventListener('visibilitychange',loop)}

/* B2 (round H28, owner 2026-11-02: "B2, the owner's note. Yeah."; from tools/concepts/worlds/comic/story/h/bet5/b2.*): the whole bet in
   one chip and its two lit edges. The chip painting carries "Bet #1: NVIDIA" and "At the close · <date>" on one row along its top
   edge, and the countdown in its four dies; under it, two crops of the same painting's rim light: the green-lit pins (RIGHT, profits
   buy back $EZ) and the red-lit pins (WRONG, the pool can be wiped out). One K2 caption carries the bet in the owner's words and sits
   ON the seam between the chip and the two crops, centred on both seams, so the lines are hidden under it. Then the closing line.
   An art box: data-crop "[x,y,w,h]" (phone) | "[x,y,w,h]" (desk) in the painting's pixels; where a crop runs past the painting, the
   box's own dark ground shows, faded into the painting by ::after. [data-at] children are placed at painting pixels, [data-q] quads. */
const pk=v=>{const q=String(v).split('|');return innerWidth>=1000&&q[1]?q[1]:q[0]};
function place5(el){const w=el.clientWidth;if(!w)return;const c=JSON.parse(pk(el.dataset.crop)),iw=2048,ih=1152,k=w/c[2],img=el.dataset.img||IMG.chip;
  el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${img})`;
  /* H35: a [data-fit] quad is laid out at its on-screen size (the GPU rule: never a perspective surface at painting size), --s its height */
  el.querySelectorAll('[data-fit]').forEach(n=>{const q=JSON.parse(n.dataset.q),xs=q.map(p=>p[0]),ys=q.map(p=>p[1]);
    const bw=Math.max(8,Math.round((Math.max(...xs)-Math.min(...xs))*k)),bh=Math.max(8,Math.round((Math.max(...ys)-Math.min(...ys))*k));
    n.style.width=bw+'px';n.style.height=bh+'px';n.style.setProperty('--s',bh+'px')});
  el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  el.style.setProperty('--k',k);el.style.setProperty('--pl',(-c[0]*k)+'px');el.style.setProperty('--pt',(-c[1]*k)+'px');el.style.setProperty('--pw',(iw*k)+'px');el.style.setProperty('--ph',(ih*k)+'px');
  el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=n.hasAttribute('data-fit')?aff(n.offsetWidth,n.offsetHeight,q):persp(n.offsetWidth,n.offsetHeight,q)});
  el.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(pk(n.dataset.at));n.style.left=((x-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px'})}
/* the caption sits on the seam: its middle on the chip's bottom edge (the crops start right under it) */
function seam(sec){const st=sec.querySelector('.hb5-st'),chip=st&&st.querySelector('.hb5-chip'),c=st&&st.querySelector('.hb5-c');
  if(!chip||!chip.offsetHeight)return;c.style.top=(chip.offsetTop+chip.offsetHeight-c.offsetHeight/2)+'px'}
function html(Dt){
  const pan=(cls,crop,at,word,line,w)=>`<div class="hb5-art hb5-o ${cls}" data-crop="${crop}" aria-hidden="true"><div class="hb5-at" data-at="${at}"><span class="${w}">${word}</span><span class="hb5-ol">${line}</span></div></div>`;
  const die=i=>`<div class="hbc-die" data-q='${JSON.stringify(Q[i])}'><span class="hbc-glow"></span><b class="hbc-num" data-r="${K[i]}" aria-hidden="true"></b><i class="hbc-glass"></i></div><div class="hbc-lab" data-q='${JSON.stringify(lq(Q[i]))}' aria-hidden="true">${LAB[i]}</div>`;
  const pool=Dt.share!=null?`<p class="hb5-say"><b class="hb5-n">${Dt.share}%</b> of $EZ creator&nbsp;fees fill the pool.</p>`:'';
  return `<div class="hb-wrap" style="--hb-grp:url(${IMG.grP});--hb-grd:url(${IMG.grD})"><div class="hb-gr" aria-hidden="true"><i></i></div>
  <div class="hb5">
   <div class="hb5-st">
    <div class="hb5-art hb5-chip hbc-art" data-crop="[596,190,930,610]|[-40,110,2210,690]" role="timer" aria-live="off"><span class="hb-sr" data-sr></span>
     <div class="hb5-at hb5-hd" data-at="[614,222]|[0,160]"><h2 class="hb-h" id="x2bH"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>${Dt.md?`<span class="hb5-tab">At the close · ${Dt.md}</span>`:''}</div>
     ${[0,1,2,3].map(die).join('')}
    </div>
    <div class="hb5-two">
     ${pan('hb5-g','[600,800,560,440]|[560,740,1048,380]','[624,1050]|[600,1000]','Right','Profits buy back $EZ.','hb5-ok')}
     ${pan('hb5-r','[1400,560,560,440]|[1000,600,1048,380]','[1420,810]|[1330,860]','Wrong','The pool shrinks or can be wiped out.','hb5-no')}
    </div>
    <div class="hb5-c"><div class="bd-c"><span>${pool}<p class="hb5-say">For Season 1, we bet <em>the whole pool</em> on NVIDIA, long or short, based on the <em>#1 AI's</em> prediction.</p></span></div></div>
   </div>
   ${s2html()}
  </div></div>`}
/* H35 (owner, 2026-11-02, night): the Season 2 beat under the bet, from s2bets take A (sealed chips): four more chips of Bet #1's kind on
   the same dark bench, still unlit. #2, #3 and #4 carry Google's, Apple's and Microsoft's marks in their dies (each in its own colours,
   lit under the glass: the die's diagonal sheen and its edge shading drawn over them); the fourth die says "More". The number
   is silkscreened on the chip under its die, as DAYS and HRS sit under Bet #1's dies. Painting media/s2-chips-h35.jpg (2048x1152); the
   dies' glass measured on it. No dates: "Next earnings season". */
const S2Q=[[[263,556],[471,533],[511,691],[297,717]],[[785,504],[968,485],[1019,628],[831,651]],[[1254,457],[1422,441],[1487,571],[1315,591]],[[1682,413],[1825,399],[1898,517],[1745,535]]];
const S2T=['GOOGL','AAPL','MSFT'],S2N={GOOGL:'Google',AAPL:'Apple',MSFT:'Microsoft'};
/* the strip under a die, on the chip's substrate: the die's side edges carried on down */
const s2lq=q=>{const [tl,tr,br,bl]=q,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.05),m(br,tr,.05),m(br,tr,.36),m(bl,tl,.36)]};
/* H38 (owner, 2026-11-03: "season two should be a sub section/beat"): Season 2 is its own beat inside the bet chapter, built like a
   section at one level down: room and a small torn scrap (the section tears' paper, a fraction of their size) part it from Bet #1,
   then "Season 2" lettered in cream (gold is for section titles), then one cream caption box in the page's style (.h35-cap), then the
   four chips, the whole row fitted to the width (the crop holds all four with their pins and shadows from 320 up), and the tab. The tab
   no longer repeats "Season 2" (the sub-heading says it). */
function s2tear(){let x=97;const r=()=>(x=(x*9301+49297)%233280)/233280,W=240,Hh=22,pts=(y0,a,st)=>{const o=[];for(let i=0;i<=W+st;i+=st*(.6+r()*.8))o.push([Math.min(i,W),y0+(r()-.5)*a*2]);return o};
  const t=pts(5,1.6,5),b=pts(15,1.9,4.5).reverse(),P=t.concat(b),f=v=>v.toFixed(1),d='M'+P.map(p=>f(p[0])+','+f(p[1])).join(' L')+'Z';
  return `<svg viewBox="-3 -2 ${W+8} ${Hh+4}" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="${d}" fill="#c42a20" transform="translate(1.6,2.4)"/><path d="${d}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="1.8" stroke-linejoin="round" vector-effect="non-scaling-stroke"/><path d="${'M'+t.map(p=>f(p[0])+','+f(p[1]+1.6)).join(' L')}" fill="none" stroke="#c9bc98" stroke-width="1.1" opacity=".8" vector-effect="non-scaling-stroke"/></svg>`}
function s2html(){
  const die=(q,i)=>{const t=S2T[i];return `<div class="s2a-d${t?'':' s2a-m'}" data-fit data-q='${JSON.stringify(q)}'>${t?`<i class="s2a-lg" data-t="${t}"></i>`:'<b>More</b>'}</div>`+
    (t?`<div class="s2a-n" data-fit data-q='${JSON.stringify(s2lq(q))}'><b>#${i+2}</b></div>`:'')};
  return `<div class="s2b" role="group" aria-labelledby="s2bH">
    <div class="s2-dv" aria-hidden="true">${s2tear()}</div>
    <h3 class="s2-h" id="s2bH">Season 2</h3>
    <p class="h35-cap s2-cap">NVIDIA is the first bet, not the last. <span class="s2-cap2">Season 2 ups the stakes.</span></p>
    <div class="hb5-art s2-art" data-img="${IMG.s2}" data-crop="[64,316,2004,600]|[50,296,2030,640]" aria-hidden="true">${S2Q.map(die).join('')}</div>
    <p class="hb-sr">Season 2 bets: #2 Google, #3 Apple, #4 Microsoft, and more.</p>
    <div class="s2a-ft"><span class="s2-tab">Next earnings season</span></div>
   </div>`}
/* the marks: a tile (four opaque corners of one colour) is keyed out; a dark one-colour mark (Apple) is lit silver, as a dark mark
   cannot glow in dark glass; every other mark keeps its own colours. Done once on a canvas, then set as the die's picture. */
const S2L={};
function s2logo(t){if(S2L[t])return S2L[t];const L=window.CO_LOGOS&&CO_LOGOS[t],f=L&&(L.f||L);
  return S2L[t]=new Promise(res=>{if(!f)return res(null);const im=new Image();im.onload=()=>{try{const S=240,c=D.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');
    const k=Math.min(S/im.width,S/im.height);g.drawImage(im,(S-im.width*k)/2,(S-im.height*k)/2,im.width*k,im.height*k);
    const d=g.getImageData(0,0,S,S),p=d.data,px=(x,y)=>(y*S+x)*4,q=Math.round(S*.04),cs=[[q,q],[S-1-q,q],[q,S-1-q],[S-1-q,S-1-q]].map(([x,y])=>px(x,y));
    const tile=cs.every(i=>p[i+3]>200)&&cs.every(i=>Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2])<40);
    let lum=0,n=0;for(let i=0;i<p.length;i+=4){let a=p[i+3];if(tile){const dd=Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2]);a=Math.min(a,Math.max(0,Math.min(255,(dd-30)*3)))}p[i+3]=a;if(a>128){lum+=(p[i]+p[i+1]+p[i+2])/3;n++}}
    if(n&&lum/n<70)for(let i=0;i<p.length;i+=4){p[i]=232;p[i+1]=236;p[i+2]=242}
    g.putImageData(d,0,0);
    /* trimmed to the mark's own bounds, so every mark fills its die alike (Apple's file is mostly tile) */
    let x0=S,y0=S,x1=-1,y1=-1;for(let y=0;y<S;y++)for(let x=0;x<S;x++)if(p[px(x,y)+3]>24){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y}
    if(x1<x0)return res(null);const w=x1-x0+1,h=y1-y0+1,o=D.createElement('canvas');o.width=w;o.height=h;o.getContext('2d').drawImage(c,x0,y0,w,h,0,0,w,h);res(o.toDataURL())}catch(e){res(f?'media/'+f:null)}};im.onerror=()=>res(null);im.src='media/'+f})}
function s2marks(sec){sec.querySelectorAll('.s2a-lg[data-t]').forEach(e=>s2logo(e.dataset.t).then(u=>{if(u)e.style.backgroundImage=`url(${u})`}))}

function dress(){const sec=D.querySelector('#x2pSt');if(!sec||sec.classList.contains('hb-on'))return;
  sec.insertAdjacentHTML('beforeend',html(data(sec)));sec.classList.add('hb-on');H.classList.add('x2b-on');sec.setAttribute('aria-labelledby','x2bH');
  sec.querySelectorAll('.hb5-art').forEach(a=>{a.__hbPlace=()=>{place5(a);seam(sec)};place5(a)});seam(sec);
  if(window.ResizeObserver){const ro=new ResizeObserver(()=>seam(sec));ro.observe(sec.querySelector('.hb5-st'));ro.observe(sec.querySelector('.hb5-c'))}
  s2marks(sec);tick(sec);H.classList.add('hb-ready');
  /* the torn gutter under the bet is measured to the content's own edges: measure again now the Season 2 beat is in */
  window.__x2pTears&&requestAnimationFrame(window.__x2pTears)}
function start(){try{dress()}catch(e){window.__x2pHbetErr=e;console.error('h_bet',e);return}
  const main=D.querySelector('main');if(main)new MutationObserver(()=>{try{dress()}catch(e){window.__x2pHbetErr=e}}).observe(main,{childList:true});
  const re=()=>{D.querySelectorAll('#x2pSt .hb5-art').forEach(a=>a.__hbPlace&&a.__hbPlace());window.__x2pTears&&requestAnimationFrame(window.__x2pTears)};
  let w0=innerWidth,rt=0;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(rt);rt=setTimeout(re,150)});
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(re);addEventListener('load',re)}
(function wait(n){if(D.querySelector('#x2pSt')&&window.MODELS&&window.__x2pPnl)start();else if(n<480)setTimeout(()=>wait(n+1),250)})(0);
})();

/* ===== H32 FONTS AND GOLD (owner, 2026-11-02: take A of round H31 unify; from tools/concepts/worlds/comic/story/h/unify/unify.js, ported):
   1. the lit gold gradients of the chips (q4em, q4gd, r6em, r6gd) become cream ramps: gold is for section titles only;
   2. Anton's narrow "1" is boxed to the other digits' width (fixed-width figures in the number face);
   3. the "gets its chip" line of Next on the card is a narrator line.
   Only what changes is re-checked (the mutated nodes), so the bet's ticking countdown costs nothing here. CSS: the FONTS AND GOLD block of x2p_more.css. ===== */
(function(){const D=document,H=D.documentElement;H.classList.add('uf','uf-a');const CR=['#fffdf3','#f8f0d9','#c9bd9f'];
function grads(root){(root.querySelectorAll?root:D).querySelectorAll('linearGradient[id],radialGradient[id]').forEach(g=>{if(g.__uf||!/^(q4em|q4gd|r6em|r6gd)/.test(g.id))return;g.__uf=1;
  const st=g.querySelectorAll('stop');st.forEach((s,i)=>s.setAttribute('stop-color',CR[Math.min(CR.length-1,Math.round(i*(CR.length-1)/Math.max(1,st.length-1)))]))})}
const isAnton=el=>{try{return /^\s*["']?Anton/i.test(getComputedStyle(el).fontFamily)}catch(e){return false}};
function ones(root){if(!root||root.nodeType!==1&&root.nodeType!==3)return;if(root.nodeType===3)root=root.parentElement;if(!root||root.closest('.uf1,.hbc-sl,#car,script,style'))return;
 const tw=D.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.nodeValue.indexOf('1')<0||!/\d/.test(n.nodeValue)?2:1});const todo=[];let n;while(n=tw.nextNode())todo.push(n);
 for(const t of todo){const pe=t.parentElement;if(!pe||pe.closest('.uf1,script,style,.hbc-sl,.sr,[class*="sr-only"],title,desc,#car'))continue;if(!isAnton(pe))continue;
  const parts=t.nodeValue.split('1');if(parts.length<2)continue;const svg=pe instanceof SVGElement;const frag=D.createDocumentFragment();
  if(svg){if(!/^(text|tspan)$/i.test(pe.tagName))continue;const NS='http://www.w3.org/2000/svg';const mk=(c,txt)=>{const o=D.createElementNS(NS,'tspan');o.setAttribute('class',c);o.setAttribute('dx','0.0815em');o.textContent=txt;return o};
   parts.forEach((p,i)=>{if(i===0){if(p)frag.appendChild(D.createTextNode(p));return}frag.appendChild(mk('uf1','1'));frag.appendChild(mk('uf1r',p||'​'))})}
  else{parts.forEach((p,i)=>{if(i>0){const o=D.createElement('span');o.className='uf1';o.textContent='1';frag.appendChild(o)}if(p)frag.appendChild(D.createTextNode(p))})}
  t.replaceWith(frag)}}
function tags(){D.querySelectorAll('#get .p5-ln').forEach(p=>{if(/gets its chip|report next/.test(p.textContent))p.classList.add('uf-nar')})}
let pend=new Set(),q=0;
const mo=new MutationObserver(rs=>{for(const r of rs){if(r.type==='characterData')pend.add(r.target);else r.addedNodes.forEach(a=>pend.add(a))}
  if(q)return;q=1;requestAnimationFrame(()=>{q=0;const list=[...pend];pend.clear();mo.disconnect();
   try{list.forEach(x=>{if(!x.isConnected)return;if(x.nodeType===1){grads(x);ones(x)}else if(x.nodeType===3)ones(x)});tags()}finally{mo.observe(D.body,{childList:true,subtree:true,characterData:true})}})});
function start(){grads(D);tags();ones(D.body);mo.observe(D.body,{childList:true,subtree:true,characterData:true})}
if(D.readyState==='loading')D.addEventListener('DOMContentLoaded',start);else start();
D.fonts&&D.fonts.ready.then(()=>setTimeout(()=>{mo.disconnect();try{ones(D.body)}finally{mo.observe(D.body,{childList:true,subtree:true,characterData:true})}},300));
})();
