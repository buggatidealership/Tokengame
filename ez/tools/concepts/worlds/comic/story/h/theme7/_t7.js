/* Round H25 · theme7: colour per section, the gap/bleed rule, and "the whole game" as its own small section.
   Laid over the built v46-live-x2plus.html (mockup only). window.__T7 = palette ('now' | 'p1' | 'p2' | 'p3'),
   window.__T7F = film take ('' keeps today's beat | 'm' monitor | 'c' cartridge | 'p' plug | 'l' silkscreen line),
   window.__T7M = base url of theme7/out/. Exposes window.__t7 = {bands, gaps, test()} for the measurements. */
(function(){try{
const W=window,D=document,ID=W.__T7||'p1',FT=W.__T7F||'',M=W.__T7M||'tools/concepts/worlds/comic/story/h/theme7/out/';
if(ID==='now'&&!FT)return;
/* ---------- the solder masks: each model's chip substrate colour (sampled from media/chip8c-*-1200.jpg), plus the board green and the vault ---------- */
const MASK={GREEN:'#2f6a3e',GROK:'#5d6165',CLAUDE:'#a4572a',GPT:'#3c7146',KIMI:'#3f5684',VAULT:'#0b0a10',BARE:'#24221e'};
const EXT={GREEN:'#0a5c2e',GROK:'#5a6066',CLAUDE:'#a44a16',GPT:'#2a7a3c',KIMI:'#2f4f95',VAULT:'#0a5c2e',BARE:'#3a352c'};
const NAME={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};
/* ---------- live owners of each section, from the page's own data ---------- */
const P=W.__x2pPnl?W.__x2pPnl():null,A=P?P.A:{},MS=Object.keys(A);
const by=f=>MS.slice().sort((a,b)=>f(b)-f(a))[0];
const pnlLead=by(m=>A[m].bal);
const hitLead=by(m=>{const a=A[m];return a.W/Math.max(1,a.W+a.L)});
const wins={};MS.forEach(m=>wins[m]=0);(W.ROUNDS||[]).forEach(r=>{if(!r.win)return;MS.forEach(m=>{if(new RegExp('\\b'+m+'\\b').test(r.win))wins[m]++})});
const winLead=by(m=>wins[m]);
const OWN={rounds:winLead,proof:hitLead,bet:pnlLead};
/* palette per section key: top, film, models (per chip), rounds, proof, bet, close */
const PAL={
 now:{top:'GREEN',film:'GREEN',rounds:'GREEN',proof:'GREEN',bet:'VAULT',close:'GREEN'},
 p1:{mat:'mask',top:'GREEN',film:'GREEN',rounds:winLead,proof:hitLead,bet:'VAULT',betRim:pnlLead,close:'GREEN'},
 p2:{mat:'mask',top:'GREEN',film:'GREEN',rounds:'GROK',proof:'KIMI',bet:'VAULT',betRim:'CLAUDE',close:'GPT'},
 p3:{mat:'light',top:'GREEN',film:'GREEN',rounds:winLead,proof:hitLead,bet:'VAULT',betRim:pnlLead,close:'GREEN'}}[ID]||{};
const WHY={rounds:`most round wins: ${NAME[winLead]} ${wins[winLead]}`,proof:`best hit rate: ${NAME[hitLead]} ${Math.round(100*A[hitLead].W/(A[hitLead].W+A[hitLead].L))}%`,bet:`golden ticket: ${NAME[pnlLead]}`};
/* ---------- colour maths for the gap rule ---------- */
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
const lab=h=>{const l=hex(h).map(c=>c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4));const x=(l[0]*.4124+l[1]*.3576+l[2]*.1805)/.95047,y=l[0]*.2126+l[1]*.7152+l[2]*.0722,z=(l[0]*.0193+l[1]*.1192+l[2]*.9505)/1.08883;
 const f=t=>t>.008856?Math.cbrt(t):7.787*t+16/116;return [116*f(y)-16,500*(f(x)-f(y)),200*(f(y)-f(z))]};
const dE=(a,b)=>{const p=lab(MASK[a]),q=lab(MASK[b]);return Math.hypot(p[0]-q[0],p[1]-q[1],p[2]-q[2])};
/* THE GAP RULE (stated in REPORT.md as tests): a gap is the connector between two boards. Its height grows with how far the visitor travels:
   h = base(kind) + 0.45 · ΔE76(mask above, mask below), capped at 96 px; kind = 'world' (between sections, base clamp(26px,8vw,64px)),
   'beat' (inside a section: same board, base 10 px). Its top half is printed in the mask above, its bottom half in the mask below. */
const vw=()=>D.documentElement.clientWidth;
const baseH=kind=>kind==='beat'?10:Math.max(26,Math.min(64,vw()*.08));
const gapH=(a,b,kind)=>Math.round(Math.min(96,baseH(kind)+.45*dE(a,b)));
/* ---------- CSS ---------- */
const css=`
html.t7{background:#ff00ff!important}
html.t7.t7-test{background:#ff00ff!important}
html.t7:not(.t7-test){background:#030408!important}
html.t7 body::before{background:none!important}
html.t7 .g4-gut{display:none!important}
html.t7 #x2pSt{padding-bottom:16px!important}
@media (min-width:760px){html.t7 main>*,html.t7 main>#record,html.t7 main>#learn,html.t7 main>#highlights,html.t7 main>#x2pSt,html.t7 main>#get{grid-row:auto!important}html.t7 main>.t7-gap,html.t7 main>.t7-film{grid-column:1 / -1}}
.t7-layer{position:absolute;left:0;top:0;width:100%;z-index:-1;pointer-events:none;overflow:hidden}
.t7-band{position:absolute;left:0;width:100%;background-repeat:repeat-y;background-position:50% 0;background-size:100% auto}
.t7-band.t7-light{background-blend-mode:normal}

.t7-gapv{position:absolute;left:0;width:100%;overflow:hidden}
.t7-gapv i{position:absolute;left:0;width:100%;height:50%;background-size:cover;background-repeat:no-repeat}
.t7-gapv i.t{top:0;background-position:50% 100%}.t7-gapv i.b{bottom:0;background-position:50% 0}
.t7-gapv.beat::after{content:'';position:absolute;left:0;right:0;top:50%;height:2px;margin-top:-1px;background:linear-gradient(90deg,transparent,rgba(255,214,120,.55) 15%,rgba(255,230,160,.8) 50%,rgba(255,214,120,.55) 85%,transparent);box-shadow:0 1px 0 rgba(0,0,0,.8)}
.t7-gap{display:block;width:100%}
/* the section label the board carries (silkscreened on the mask, top-left, small): says whose colour this is */
.t7-silk{position:absolute;right:12px;text-align:right;font:700 9px/1 'Barlow Condensed',sans-serif;letter-spacing:.18em;text-transform:uppercase;color:rgba(248,240,217,.42);text-shadow:0 1px 0 rgba(0,0,0,.6);mix-blend-mode:screen;white-space:nowrap}
.t7-silk b{color:var(--c);font-weight:800;filter:brightness(1.9)}
html.t7 .t4 .t5-bg{filter:drop-shadow(0 2px 0 #000)!important}
/* bet: the vault keeps its black; the golden ticket holder's colour is its rim */
.t7-band.t7-vault::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--rim) 0,transparent 9%,transparent 91%,var(--rim) 100%);opacity:.55}
`;
const st=D.createElement('style');st.id='t7-css';st.textContent=css;D.head.appendChild(st);
D.documentElement.classList.add('t7','t7-'+ID);
const tile=k=>`url(${M}t7-gnd-${k}.jpg)`;
const half=(k,pos)=>`url(${M}t7-cx${pos==='b'?'B':'T'}-${k}.jpg)`;
/* ---------- film take: "the whole game" as its own small section ---------- */
if(FT&&W.__t7film)W.__t7film(FT);
if(ID==='now'){W.__t7={film:FT};return}
/* ---------- the sections in order ---------- */
const main=D.querySelector('main');
function sections(){const out=[];const top=D.querySelector('section.t4');if(top)out.push({k:'top',el:top});
 const fs=D.querySelector('section.t7-film');if(fs)out.push({k:'film',el:fs});
 const ch=D.querySelector('section.ch');if(ch)out.push({k:'models',el:ch});
 [['record','rounds'],['learn','proof'],['highlights','mvp'],['x2pSt','bet'],['get','close']].forEach(([id,k])=>{const e=D.getElementById(id);if(e&&e.offsetHeight>0&&getComputedStyle(e).display!=='none')out.push({k,el:e})});return out}
const layer=D.createElement('div');layer.className='t7-layer';layer.setAttribute('aria-hidden','true');D.body.prepend(layer);
let G=[];
function insertGaps(){D.querySelectorAll('.t7-gap').forEach(g=>g.remove());const S=sections();G=[];
 for(let i=1;i<S.length;i++){const a=colOf(S[i-1],'out'),b=colOf(S[i],'in');const g=D.createElement('div');g.className='t7-gap';g.setAttribute('aria-hidden','true');
  const h=gapH(a,b,'world');g.style.height=h+'px';g.dataset.a=a;g.dataset.b=b;S[i].el.before(g);G.push({el:g,a,b,h,kind:'world'})}
 return S}
/* colour on a section's edges: Meet the models enters in its first chip's colour and leaves in the tryout's bare board */
function colOf(s,edge){if(s.k==='models')return edge==='in'?(chips()[0]||{}).m||'GREEN':'BARE';return PAL[s.k]||'GREEN'}
function chips(){return [...D.querySelectorAll('section.ch .c8-one')].map(o=>({m:o.dataset.m,el:o}))}
function draw(){if(matchMedia('(min-width:760px)').matches)[...D.querySelector('main').children].forEach(e=>e.style.setProperty('grid-row','auto','important'));const S=insertGaps();layer.innerHTML='';const H=D.documentElement.scrollHeight;layer.style.height=H+'px';const sy=scrollY;
 const R=e=>{const r=e.getBoundingClientRect();return {t:r.top+sy,b:r.bottom+sy}};
 const bands=[];
 S.forEach((s,i)=>{const t=i===0?0:R(G[i-1].el).b,b=i===S.length-1?H:R(G[i].el).t;
  if(s.k==='models'){// one band per chip, beat seams midway between chips; the head joins the first chip's band; the tryout sits on bare board
   const C=chips(),tb=s.el.querySelector('.ch-tb');let y=t;
   C.forEach((c,j)=>{const r=R(c.el),nx=C[j+1]?R(C[j+1].el).t:(tb?R(tb).t:b);const end=j<C.length-1?Math.round((r.b+nx)/2):(tb?Math.round((r.b+R(tb).t)/2):b);
    bands.push({k:'models',c:c.m,t:y,b:end});y=end});
   if(tb)bands.push({k:'models',c:'BARE',t:y,b});return}
  bands.push({k:s.k,c:PAL[s.k]||'GREEN',t,b})});
 bands.forEach(bd=>{const d=D.createElement('div');d.className='t7-band'+(PAL.mat==='light'?' t7-light':'')+(bd.c==='VAULT'?' t7-vault':'');d.style.top=bd.t+'px';d.style.height=(bd.b-bd.t)+'px';
  d.style.backgroundImage=tile(bd.c);if(PAL.mat==='light'&&bd.c!=='VAULT'){const c=MASK[bd.c];d.style.backgroundImage=`linear-gradient(90deg,${c}cc 0,${c}55 7%,transparent 22%,transparent 78%,${c}55 93%,${c}cc 100%),${tile('VAULT')}`;d.style.backgroundSize='100% 100%,100% auto';d.style.backgroundRepeat='no-repeat,repeat-y'}if(bd.c==='VAULT'){d.style.setProperty('--rim',MASK[PAL.betRim||'GREEN']);d.style.backgroundImage=tile('VAULT')}
  layer.appendChild(d);bd.el=d});
 // beat seams inside Meet the models (a scored line on the same panel: two different masks meeting, so a thin connector)
 for(let j=1;j<bands.length;j++){const a=bands[j-1],b=bands[j];if(a.k!=='models'||b.k!=='models')continue;const h=gapH(a.c,b.c,'beat'),y=a.b-h/2;
  const g=D.createElement('div');g.className='t7-gapv beat';g.style.top=y+'px';g.style.height=h+'px';g.innerHTML=`<i class="t" style="background-image:${half(a.c,'t')}"></i><i class="b" style="background-image:${half(b.c,'b')}"></i>`;layer.appendChild(g)}
 // world gaps: the connector, top half in the mask above, bottom half in the mask below
 G.forEach(g=>{const r=R(g.el);const v=D.createElement('div');v.className='t7-gapv world';v.style.top=r.t+'px';v.style.height=(r.b-r.t)+'px';
  v.innerHTML=`<i class="t" style="background-image:${half(g.a,'t')}"></i><i class="b" style="background-image:${half(g.b,'b')}"></i>`;layer.appendChild(v)});
 // silkscreen: whose colour this board is (only where the colour carries a fact)
 bands.forEach(bd=>{const why=WHY[bd.k];if(!why||PAL.mat==='none'||ID==='p2'||ID==='now')return;const s=D.createElement('div');s.className='t7-silk';s.style.top=(bd.t+6)+'px';s.style.setProperty('--c',MASK[bd.c==='VAULT'?PAL.betRim:bd.c]);s.innerHTML=`<b>■</b> ${why}`;layer.appendChild(s)});
 W.__t7.bands=bands.map(b=>({k:b.k,c:b.c,t:Math.round(b.t),b:Math.round(b.b)}));W.__t7.gaps=G.map(g=>({a:g.a,b:g.b,h:g.h,dE:+dE(g.a,g.b).toFixed(1)}))}
/* the paintings' black void takes the section's mask: dark panel fills cleared, the paintings lighten over the ground (black shows the ground, light stays the painting) */
/* the heads' extrusion (today green #0a5c2e everywhere) takes the section's mask; Meet the models stacks all four, in rank order */
function heads(){if(ID==='now')return;sections().forEach(s=>{[...s.el.querySelectorAll('*')].forEach(e=>{if(e.closest('.t7-film'))return;const c=getComputedStyle(e).textShadow;if(!c||c.indexOf('rgb(10, 92, 46)')<0)return;
  if(!e.dataset.t7ts)e.dataset.t7ts=c;let ts=e.dataset.t7ts;
  if(s.k==='models'){const r=chips().map(o=>o.m);let i=0;ts=ts.replace(/rgb\(10, 92, 46\)/g,()=>EXT[r[Math.min(i++,r.length-1)]]||EXT.GREEN)}
  else{const k=s.k==='bet'?(PAL.betRim||'GREEN'):(PAL[s.k]||'GREEN');ts=ts.replace(/rgb\(10, 92, 46\)/g,EXT[k])}
  e.style.textShadow=ts})})}
/* re-mask: the section's own paintings have their green board re-printed in the section's mask (remask.py; gold, ink and light kept) */
const RMF=['rounds-h24-wafer.jpg','rounds-h24-die.jpg','p5-scope.jpg','p5-sockets.jpg','p5-panel.jpg'];
function remask(){if(PAL.mat!=='mask')return;sections().forEach(s=>{const k=PAL[s.k];if(!k||['GREEN','GPT','VAULT'].includes(k))return;
  const sw=u=>{for(const f of RMF){if(u&&u.indexOf(f)>=0&&u.indexOf('rm-')<0)return M+'rm-'+k+'-'+f}return null};
  s.el.querySelectorAll('img').forEach(i=>{const n=sw(i.currentSrc||i.src);if(n){i.removeAttribute('srcset');i.src=n}});
  s.el.querySelectorAll('image').forEach(i=>{const n=sw(i.getAttribute('href')||i.getAttribute('xlink:href'));if(n){i.setAttribute('href',n)}});
  [s.el,...s.el.querySelectorAll('*')].forEach(e=>{const bi=getComputedStyle(e).backgroundImage;if(!bi.startsWith('url('))return;const n=sw(bi);if(n)e.style.backgroundImage=`url(${n})`})})}
function voids(){if(PAL.mat==='none')return;sections().forEach(s=>{if(s.k==='bet')return;[s.el,...s.el.querySelectorAll('*')].forEach(e=>{const c=getComputedStyle(e);const r=e.getBoundingClientRect();if(r.width<200||r.height<60)return;
  if(c.backgroundColor==='rgb(2, 2, 3)'||(s.k==='models'&&e.classList.contains('ch-ink'))){e.style.backgroundColor='transparent'}
  const isPaint=(e.tagName==='IMG'&&!e.closest('.c7-die'))||(e.tagName==='svg'&&e.querySelector('image'))||(c.backgroundImage.startsWith('url(')&&e.tagName!=='VIDEO');
  if(isPaint&&!e.closest('.t4-scr')&&!e.closest('.t7-film')){e.style.mixBlendMode='lighten';e.classList.add('t7-lt')}})})}
W.__t7={MASK,PAL,OWN,wins,dE,gapH,draw,sections,voids,heads,remask};voids();heads();remask();setTimeout(remask,1200);
draw();let lw=vw();addEventListener('resize',()=>{if(vw()!==lw){lw=vw();draw()}});D.fonts&&D.fonts.ready.then(draw);setTimeout(draw,1500);
}catch(e){window.__t7Err=e;console.error(e)}})();
