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
html.g4 .t5-bg{height:auto!important;margin:22px 0 24px;aspect-ratio:2400/var(--g4sh,150);max-height:64px;min-height:26px;filter:drop-shadow(0 3px 0 #000) drop-shadow(0 0 14px rgba(0,0,0,.9));background:url(${M}gr4-${T.s}.jpg) 50% 50%/cover no-repeat}
html.g4 .t5-bg>*{visibility:hidden}
html.g4 .g4-gut{display:block;width:100vw;margin:0 0 0 calc(50% - 50vw);height:clamp(26px,8vw,64px);background:url(${M}gr4-${T.s}.jpg) 50% 50%/cover no-repeat;filter:drop-shadow(0 3px 0 #000) drop-shadow(0 0 14px rgba(0,0,0,.9))}
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
if(T.s){const im=new Image();im.onload=()=>D.style.setProperty('--g4sh',im.naturalHeight);im.src=M+'gr4-'+T.s+'.jpg';
 if(!matchMedia('(min-width:1200px)').matches)['record','learn','highlights','x2pSt','get'].forEach(i=>{const s=document.getElementById(i);if(s&&s.offsetHeight&&!(s.previousElementSibling||{}).classList?.contains('g4-gut')){const d=document.createElement('div');d.className='g4-gut';d.setAttribute('aria-hidden','true');s.before(d)}})}
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
   <image href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none"/>
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
  const X=P5.data();const draw=()=>{box.innerHTML=take.html(X);take.draw(box,X)};P5.prepLogos([].concat(...X.days.slice(0,3).map(d=>d.rs.map(r=>r.ticker)))).then(draw);draw();P5.curC={X,draw,box};
  /* the next close ticks once a minute */
  if(!RM.matches)setInterval(()=>{const e=box.querySelector('.p5-cd');if(e&&take.cd)e.textContent=take.cd(X)},30000)};
/* switch markup shared by the takes (real buttons; the takes paint them onto their surfaces) */
P5.sw=(V)=>`<div class="p5-sw" role="group" aria-label="View">${[['acc','Hit rate'],['pnl','P&L']].map(([k,t])=>`<button type="button" data-v="${k}" aria-pressed="${V.view===k}">${t}</button>`).join('')}</div>`+
  (V.view==='pnl'?`<div class="p5-sw p5-ws" role="group" aria-label="Window">${[['season','Season'],['d7','Last 7 days'],['d1','Last 24 hours']].map(([k,t])=>`<button type="button" data-w="${k}" aria-pressed="${V.win===k}">${t}</button>`).join('')}</div>`:'');
P5.head=(a,b)=>`<h2 class="t4-h2 p5-h"><span class="t4-hw">${a}</span>${b?` <span class="t4-hw p5-hw2">${b}</span>`:''}</h2>`;
})();
(function(){const P5=window.P5;
/* real buttons over the painted controls: items [{k:'v'|'w',val,x,y,w,h,label,on}] in painting units */
P5.hits=(crop,items)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return items.map(i=>`<button type="button" class="p5-hit" data-${i.k}="${i.val}" aria-pressed="${!!i.on}" aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></button>`).join('')};
P5.link=(crop,i)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return `<a class="p5-hit" href="${i.href}"${i.ext?' target="_blank" rel="noopener"':''} aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></a>`};
P5.table=(X,V)=>{const pc=P5.pc,NM=P5.NM;if(V.view==='acc')return `<table class="p5-sr"><caption>Hit rate by AI, ${X.N} rounds. A coin flip gets 50%; the luck zone is where 95 in 100 coins would land after this many calls.</caption><tr><th>AI</th><th>W-L</th><th>Hit rate</th><th>Beyond the luck zone</th></tr>${X.arank.map(m=>{const a=X.A[m];return `<tr><th>${NM[m]}</th><td>${a.W}-${a.L}</td><td>${pc(a.hr)}</td><td>${a.out>0?'Yes, above':a.out<0?'Yes, below':'No'}</td></tr>`}).join('')}</table>`;
  const w=X.W[V.win];return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every call, ${w.lab}</caption><tr><th>AI</th><th>Last 24 hours</th><th>Last 7 days</th><th>Season</th></tr>${w.rank.map(m=>`<tr><th>${NM[m]}</th><td>${P5.$f(X.W.d1.tot[m])}</td><td>${P5.$f(X.W.d7.tot[m])}</td><td>${P5.$f(X.W.season.tot[m])}</td></tr>`).join('')}</table>`};
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
  lit+=t(804,222,lab,(ac?X.N:w.n)+(ac||w.n!==1?' ROUNDS':' ROUND'),{a:'end',c:AMB,ls:1});
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
    [.3,.4,.6,.7,.8].forEach(v=>{under+=`<line x1="${cx0}" y1="${Y(v)}" x2="${cx1}" y2="${Y(v)}" stroke="#7dffb0" stroke-opacity=".12" stroke-width="1.2"/>`;lit+=t(cx0-10,Y(v)+sm*.36,sm,Math.round(v*100)+'%',{a:'end',c:'#9fd8b4',op:.85})});
    lit+=`<line x1="${cx0}" y1="${Y(.5)}" x2="${cx1}" y2="${Y(.5)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(.5)+sm*.36,sm,'50%',{a:'end',c:AMB});
    const li=Math.round(n*.2),lz=1.96*Math.sqrt(li/4)/(li+2);lit+=t(cx0+14,Y(.5)-12,sm,'COIN',{c:AMB})+t(Xp(li),Math.min(cy1-8,Y(.5-lz*.72)),sm,'LUCK ZONE',{a:'middle',c:AMB,op:.95});
  }else{
    const st=P5.k$;const tk=[lo,0,hi].map(v=>v);
    if(n){lit+=`<line x1="${cx0}" y1="${Y(0)}" x2="${cx1}" y2="${Y(0)}" stroke="${AMB}" stroke-width="2.4"/>`+t(cx0-10,Y(0)+sm*.36,sm,'$0',{a:'end',c:AMB});
      const top=Math.max(...[].concat(...X.MS.map(m=>w.ser[m]))),bot=Math.min(...[].concat(...X.MS.map(m=>w.ser[m])));
      [top,bot].forEach(v=>{if(Math.abs(Y(v)-Y(0))>40)lit+=t(cx0-10,Y(v)+sm*.36,sm,st(v).replace('.0K','K'),{a:'end',c:'#9fd8b4',op:.85})})}
    else lit+=t((cx0+cx1)/2,(cy0+cy1)/2,lab,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:AMB});
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
  else if(n){const y=652;lit+=t(196,y,sm,'IF YOU’D BET $100K ON EVERY CALL',{c:'#9fd8b4'})+t(196,y+36,sm,'NO LEVERAGE · BEFORE FEES',{c:'#9fd8b4',op:.8})}
  /* soft-key labels on the screen's foot, above each control; the open one boxed */
  const keys=[['v','acc','HIT RATE',KN[0][0]],['v','pnl','P&L',KN[1][0]],['w','season','SEASON',BT[0][0]-12],['w','d7','7D',BT[1][0]],['w','d1','24H',BT[2][0]]];
  keys.forEach(([k,val,l,x])=>{if(k==='w'&&ac)return;const on=k==='v'?V.view===val:V.win===val,s=28,wdt=P5.tw(l,s)+16,xx=Math.min(Math.max(x,G[0]+14+wdt/2),G[0]+G[2]-12-wdt/2),y=738;lit+=(on?`<rect x="${xx-wdt/2}" y="${y-s*.95}" width="${wdt}" height="${s*1.3}" fill="${AMB}" fill-opacity=".9"/>`:'')+t(xx,y,s,l,{a:'middle',c:on?'#140a00':AMB,op:on?1:.75})});
  return {lit,under,over}}
P5.take={id:'t1',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="p5-st"></div><p class="p5-ln">${V.view==='acc'?'<b>Hit rate:</b> how often a trade went the right way. Inside the gold zone, <b>a coin could have done it.</b>':'Every call a $100K trade. <b>Who made money?</b>'}</p>${P5.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.p5-st'),s=screen(X,V);
  P5.stage(st,{img:IMG,crop:CROP,glass:[[G[0],G[1],G[2],G[3],26]],lit:s.lit,under:s.under,label:V.view==='acc'?'Oscilloscope: each AI’s hit rate round by round against the coin’s luck zone':'Oscilloscope: P&L if you’d bet $100K on every call',glare:.55,bloom:2.6});
  st.insertAdjacentHTML('beforeend',P5.hits(CROP,[{k:'v',val:'acc',x:KN[0][0]-46,y:828,w:92,h:84,label:'Hit rate view',on:V.view==='acc'},{k:'v',val:'pnl',x:KN[1][0]-46,y:828,w:92,h:84,label:'P&L view',on:V.view==='pnl'}]
   .concat(V.view==='pnl'?[['season','Season'],['d7','Last 7 days'],['d1','Last 24 hours']].map(([v,l],i)=>({k:'w',val:v,x:BT[i][0]-38,y:832,w:76,h:76,label:l,on:V.win===v})):[])));
  P5.vis(st)}};
})();

P5.mountProof(P5.take);
/* C1 THE NEXT SOCKETS: the board's last row is empty sockets waiting for the next rounds' chips. Each window above a socket lights the
   company's mark and the day its calls lock; the board ends in a gold edge connector that plugs into the Upcoming tab. Then the panel:
   the next bell's countdown on its glass, and two buttons: Get $EZ and Follow on X. Paintings: q-sockets-b, q-panel-b. */
(function(){const P5=window.P5,{t,GD,AMB,UP,CR}=P5;
const CR1=[112,196,888,826],WN=[[144,254],[270,256],[394,256],[518,256],[642,254],[766,254]],WW=90,WH=100,FING=[120,762,768,40];
const CR2=[118,150,882,812],GL=[136,172,724,288],B1=[336,660],B2=[658,660];
function card(X){const out=[];X.days.forEach(d=>d.rs.forEach(r=>{if(out.length<6)out.push({r,d})}));return out}
P5.take={id:'c1',cd:X=>P5.cd(X),html(X){return `<div class="p5-bleed"><h2 class="t4-h2 p5-h"><span class="t4-hw">Next on</span> <span class="t4-hw p5-hw2">the card</span></h2><div class="p5-col"><div class="p5-st"></div><p class="p5-ln">Every round gets its chip when the calls lock. <b>Plug in for the whole schedule.</b></p></div><div class="p5-gut"></div><div class="p5-col"><div class="p5-st"></div><p class="p5-ln">$EZ isn’t live yet. The address appears here, and only here, at launch. <b>Anyone DMing you one before that is a scammer.</b> Not financial advice.</p></div></div>`},
 draw(box,X){const [s1,s2]=box.querySelectorAll('.p5-st'),C=card(X);let lit='',silk='',top='';
  C.forEach(({r,d},i)=>{const [x,y]=WN[i],cx=x+WW/2;lit+=P5.litLogo(r.ticker,cx,y+38,56)+t(cx,y+88,26,new Date(d.t).toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'}).toUpperCase(),{a:'middle',c:AMB})});
  silk+=t(500,FING[1]-16,30,'EVERYTHING COMING UP',{a:'middle',c:'#fff6dc',ls:2});
  top+=`<rect class="p5-fing" x="${FING[0]}" y="${FING[1]}" width="${FING[2]}" height="${FING[3]}" fill="${GD}" style="mix-blend-mode:screen"/>`;
  const lab=C.map(({r,d})=>`${r.co} (${r.ticker}), calls lock ${P5.day(d.t,X.today)}`).join('; ');
  P5.stage(s1,{img:'media/p5-sockets.jpg',crop:CR1,glass:WN.map(([x,y])=>[x,y,WW,WH,6]),lit,silk,top,glare:.55,bloom:1.8,label:'Next on the card: '+lab});
  s1.insertAdjacentHTML('beforeend',P5.link(CR1,{href:'#/upcoming',label:'See everything coming up',x:FING[0],y:FING[1]-50,w:FING[2],h:FING[3]+60}));
  /* the panel: the next bell on the glass; the buttons' caps lit with what they do */
  const nb=P5.nextClose(X);let l2=t(500,232,32,'THE NEXT BELL',{a:'middle',c:AMB,ls:2})+t(500,338,92,P5.cd(X),{a:'middle',c:CR,cls:'p5-cd'})+t(500,400,28,nb?`${nb.r.co.toUpperCase()} · ${X.nUp} ROUNDS LEFT IN SEASON 1`:'',{a:'middle',c:'#9fd8b4'});
  const live=!!(window.CONFIG&&CONFIG.ca);
  l2+=t(B1[0],B1[1]-6,30,'GET',{a:'middle',c:'#eafff1'})+t(B1[0],B1[1]+30,34,'$EZ',{a:'middle',c:'#eafff1'})+t(B2[0],B2[1]-6,30,'FOLLOW',{a:'middle',c:CR})+t(B2[0],B2[1]+30,34,'ON X',{a:'middle',c:CR});
  const sk=t(B1[0],B1[1]+118,26,live?'':'OPENS AT LAUNCH',{a:'middle',c:'#fff6dc'})+t(B2[0],B2[1]+118,26,'EVERY CALL FIRST',{a:'middle',c:'#fff6dc'});
  P5.stage(s2,{img:'media/p5-panel.jpg',crop:CR2,glass:[[GL[0],GL[1],GL[2],GL[3],10]],lit:l2,silk:sk,glare:.5,bloom:2.2,label:'The next bell, Get $EZ and Follow on X'});
  s2.insertAdjacentHTML('beforeend',(live?P5.link(CR2,{href:CONFIG.buyUrl||'#',label:'Get $EZ',x:B1[0]-90,y:B1[1]-90,w:180,h:180,ext:1}):'')+P5.link(CR2,{href:(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn',label:'Follow EZ on X',x:B2[0]-90,y:B2[1]-90,w:180,h:180,ext:1}));
  P5.vis(s1)}};
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
const IMG={chip:'media/bet-chip-h2.jpg',grP:'media/bet-ground-h2-phone.jpg',grD:'media/bet-ground-h2-desk.jpg'};
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
function place5(el){const w=el.clientWidth;if(!w)return;const c=JSON.parse(pk(el.dataset.crop)),iw=2048,ih=1152,k=w/c[2];
  el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${IMG.chip})`;el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  el.style.setProperty('--k',k);el.style.setProperty('--pl',(-c[0]*k)+'px');el.style.setProperty('--pt',(-c[1]*k)+'px');el.style.setProperty('--pw',(iw*k)+'px');el.style.setProperty('--ph',(ih*k)+'px');
  el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=persp(n.offsetWidth,n.offsetHeight,q)});
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
     ${pan('hb5-g','[600,800,560,440]|[560,740,1048,380]','[624,1050]|[600,1000]','Right','Profits buy back $EZ','hb5-ok')}
     ${pan('hb5-r','[1400,560,560,440]|[1000,600,1048,380]','[1420,810]|[1460,860]','Wrong','The pool can be wiped out','hb5-no')}
    </div>
    <div class="hb5-c"><div class="bd-c"><span>${pool}<p class="hb5-say">We bet <em>the whole pool</em> on NVIDIA, based on the <em>#1 AI's</em> prediction.</p></span></div></div>
   </div>
   <p class="hb5-cl">NVIDIA is the first bet, <b>not the last.</b></p>
  </div></div>`}

function dress(){const sec=D.querySelector('#x2pSt');if(!sec||sec.classList.contains('hb-on'))return;
  sec.insertAdjacentHTML('beforeend',html(data(sec)));sec.classList.add('hb-on');H.classList.add('x2b-on');sec.setAttribute('aria-labelledby','x2bH');
  sec.querySelectorAll('.hb5-art').forEach(a=>{a.__hbPlace=()=>{place5(a);seam(sec)};place5(a)});seam(sec);
  if(window.ResizeObserver){const ro=new ResizeObserver(()=>seam(sec));ro.observe(sec.querySelector('.hb5-st'));ro.observe(sec.querySelector('.hb5-c'))}
  tick(sec);H.classList.add('hb-ready')}
function start(){try{dress()}catch(e){window.__x2pHbetErr=e;console.error('h_bet',e);return}
  const main=D.querySelector('main');if(main)new MutationObserver(()=>{try{dress()}catch(e){window.__x2pHbetErr=e}}).observe(main,{childList:true});
  const re=()=>D.querySelectorAll('#x2pSt .hb5-art').forEach(a=>a.__hbPlace&&a.__hbPlace());
  let w0=innerWidth,rt=0;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(rt);rt=setTimeout(re,150)});
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(re);addEventListener('load',re)}
(function wait(n){if(D.querySelector('#x2pSt')&&window.MODELS&&window.__x2pPnl)start();else if(n<480)setTimeout(()=>wait(n+1),250)})(0);
})();
