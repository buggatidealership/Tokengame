(function(){
const D=document,W=window,BASE='tools/concepts/worlds/comic/story/h/meet15/img/',M13='tools/concepts/worlds/comic/story/h/meet13/img/';
const UC={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const CTRY={GROK:'us',CLAUDE:'us',GPT:'us',KIMI:'cn'},CNAME={us:'United States',cn:'China',eu:'European Union'};
const UP='#3fd07a',DN='#ff5a4c',CR='#f8f0d9',LB='#d8cfba',GD='#ffd21f',INK='#0d0b10',QT='#efe3c4';
const FND=m=>'media/founder-'+m.toLowerCase()+(m==='GROK'||m==='GPT'?'-anim2':'-anim')+'.jpg';
const TRY=['Mistral','Qwen','Gemini','Nemotron'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const f1=v=>(+v).toFixed(1);
const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
let QUOTE={};
function rows(){const A=__x2pPnl().A,M=W.MODELS||{};
  const R=Object.keys(A).filter(m=>M[m]).map(m=>{const a=A[m],ks=Object.keys(a.per).map(Number).sort((x,y)=>y-x).slice(0,5);
    const nm=String(M[m].name||m),v=String(M[m].ver||''),ver=v.toLowerCase().startsWith(nm.toLowerCase())?v.slice(nm.length).replace(/^[\s\-–]+/,''):v;
    return {m,name:nm.toUpperCase(),full:v,ver:ver.toUpperCase(),pl:a.bal-1e5,W:a.W,L:a.L,l5:ks.map(k=>a.per[k].v>0?'W':'L').reverse(),q:QUOTE[m]||'',c:UC[m],cc:CTRY[m]}});
  R.sort((a,b)=>b.pl-a.pl);return R}
const graded=()=>(W.ROUNDS||[]).filter(r=>typeof r.a==='number'&&!isNaN(r.a)).length;
/* ---------- text: measured on canvas in the SVG's own units ---------- */
const cv=D.createElement('canvas').getContext('2d');
const FF={a:'Anton',b:'"Barlow Condensed"',g:'Bangers',s:'"Shantell Sans"'},FW={a:400,b:700,g:400,s:700};
const tw=(s,fs,f)=>{f=f||'a';cv.font=`${FW[f]} ${fs}px ${FF[f]}`;return cv.measureText(String(s)).width};
const fit=(s,str,w,f)=>Math.min(s,s*w/Math.max(1,tw(str,s,f)));
const FAM={a:"Anton,'Bebas Neue',sans-serif",b:"'Barlow Condensed',Barlow,sans-serif",g:"Bangers,Anton,sans-serif",s:"'Shantell Sans',sans-serif"};
/* T: one line of live text, centred on (x,y) by its em box */
function T(x,y,s,str,o){o=o||{};const f=o.f||'a';return `<text x="${f1(x)}" y="${f1(y)}" font-size="${f1(s)}" text-anchor="${o.a||'middle'}" dominant-baseline="central" fill="${o.c||CR}" font-family="${FAM[f]}" font-weight="${FW[f]}"${o.ls?` letter-spacing="${f1(o.ls)}"`:''}${o.op?` opacity="${o.op}"`:''}${o.st?` stroke="${o.st}" stroke-width="${f1(o.sw)}" paint-order="stroke" stroke-linejoin="round"`:''}${o.fl?` filter="url(#${o.fl})"`:''}${o.tr?` transform="${o.tr}"`:''}${o.cl?` class="${o.cl}"`:''}>${o.raw||esc(str)}</text>`}
function mark(m,x,y,s,fill){const M=W.MODELS&&MODELS[m];if(!M||!M.d)return '';const k=s/24,t=`translate(${f1(x-s/2)} ${f1(y-s/2)}) scale(${k.toFixed(4)})`;
  return `<path d="${M.d}" fill-rule="${M.fr||'nonzero'}" transform="${t}" fill="${fill}"/>`+(M.dot?`<path d="${M.dot}" transform="${t}" fill="${fill}"/>`:'')}
/* W-L with W green and L red */
const wl=(r,s,x,y,o)=>T(x,y,s,'',Object.assign({raw:`<tspan fill="${(o&&o.wc)||UP}">${r.W}</tspan><tspan fill="${(o&&o.dc)||LB}">-</tspan><tspan fill="${(o&&o.lc)||DN}">${r.L}</tspan>`},o||{}));
/* ---------- the flag as a sewn team patch: a hand-cut outline, merrowed ink edge, a stitch line, the flag woven in, a hard shadow ---------- */
let PID=0;
function star(cx,cy,r,rot){let p=[];for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push(f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr))}return p.join(' ')}
function patch(cc,cx,cy,w,rot){const id='m15pt'+(PID++),h=w*.64,x=-w/2,y=-h/2,r=w*.13;
  /* a hand-cut outline: a rounded rect whose sides bow a hair, so it reads as cloth, not a CSS box */
  const j=[.010,-.008,.012,-.006,.009,-.011,.007,-.01];const q=(a,b,k)=>`${f1(a+j[k%8]*w)},${f1(b+j[(k+3)%8]*w)}`;
  const o=`M${q(x+r,y,0)} Q${q(0,y-h*.03,1)} ${q(x+w-r,y,2)} Q${q(x+w,y,3)} ${q(x+w,y+r,4)} Q${q(x+w+w*.02,0,5)} ${q(x+w,y+h-r,6)} Q${q(x+w,y+h,7)} ${q(x+w-r,y+h,0)} Q${q(0,y+h+h*.03,1)} ${q(x+r,y+h,2)} Q${q(x,y+h,3)} ${q(x,y+h-r,4)} Q${q(x-w*.02,0,5)} ${q(x,y+r,6)} Q${q(x,y,7)} ${q(x+r,y,0)}Z`;
  const ix=x+w*.09,iy=y+h*.13,iw=w*.82,ih=h*.74;let fl='';
  if(cc==='us'){for(let i=0;i<13;i++)fl+=`<rect x="${f1(ix)}" y="${f1(iy+i*ih/13)}" width="${f1(iw)}" height="${f1(ih/13+.5)}" fill="${i%2?'#f3ead6':'#c8312c'}"/>`;
    const cw=iw*.44,ch=ih*7/13;fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(cw)}" height="${f1(ch)}" fill="#25366f"/>`;
    for(let a=0;a<4;a++)for(let b=0;b<5;b++)fl+=`<circle cx="${f1(ix+cw*(.12+b*.19+(a%2)*.09))}" cy="${f1(iy+ch*(.15+a*.24))}" r="${f1(ih*.026)}" fill="#f3ead6"/>`}
  else if(cc==='eu'){fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#1f3f9a"/>`;for(let k=0;k<12;k++){const a=k*Math.PI/6;fl+=`<polygon points="${star(ix+iw/2+Math.cos(a)*ih*.32,iy+ih/2+Math.sin(a)*ih*.32,ih*.07,0)}" fill="#ffd21f"/>`}}
  else{fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#cf2f26"/>`;const s=ih;
    fl+=`<polygon points="${star(ix+iw*.18,iy+s*.3,s*.17,0)}" fill="#ffd21f"/>`;[[.36,.12,.3],[.44,.24,.9],[.44,.42,0],[.36,.54,.4]].forEach(([a,b,t])=>fl+=`<polygon points="${star(ix+iw*a,iy+s*b,s*.06,t)}" fill="#ffd21f"/>`)}
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${rot||0})" class="m15-pt">
    <path d="${o}" transform="translate(${f1(w*.035)} ${f1(h*.07)})" fill="rgba(0,0,0,.62)"/>
    <path d="${o}" fill="#1b1712"/><clipPath id="${id}"><rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(w*.05)}"/></clipPath>
    <g clip-path="url(#${id})">${fl}<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="url(#${id}s)"/></g>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
    <rect x="${f1(x+w*.05)}" y="${f1(y+h*.08)}" width="${f1(w*.9)}" height="${f1(h*.84)}" rx="${f1(w*.08)}" fill="none" stroke="#e9dcc0" stroke-width="${f1(w*.018)}" stroke-dasharray="${f1(w*.035)} ${f1(w*.025)}" opacity=".85"/></g>`}
/* the unit colour laid on a painted grey or gold surface: luminance x colour, so the paint's grain stays */
function tint(id,hex,gain,off){const c=rgb(hex).map(v=>v/255),L=[.2126,.7152,.0722].map(v=>v*gain),row=k=>`${(k*L[0]).toFixed(4)} ${(k*L[1]).toFixed(4)} ${(k*L[2]).toFixed(4)} 0 ${(k*(off||0)).toFixed(4)}`;
  return `<filter id="${id}" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%"><feColorMatrix type="matrix" values="${row(c[0])} ${row(c[1])} ${row(c[2])} 0 0 0 1 0"/></filter>`}
/* a lamp of the last 5: a lit lens in green or red with its letter */
function lamp(x,y,r,ch,o){o=o||{};const c=ch==='W'?UP:DN,id=o.g;return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r*1.9)}" fill="url(#${id}${ch})"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${ch==='W'?'#1f8f4f':'#b8271e'}" stroke="${o.st||'#0d0b10'}" stroke-width="${f1(r*.14)}"/>
  <ellipse cx="${f1(x-r*.28)}" cy="${f1(y-r*.36)}" rx="${f1(r*.42)}" ry="${f1(r*.24)}" fill="#fff" opacity=".35"/>`+T(x,y+r*.04,r*1.18,ch,{c:o.lc||'#f6fff8'})}
function glows(id){return `<radialGradient id="${id}W"><stop offset="0" stop-color="${UP}" stop-opacity=".55"/><stop offset="1" stop-color="${UP}" stop-opacity="0"/></radialGradient><radialGradient id="${id}L"><stop offset="0" stop-color="${DN}" stop-opacity=".55"/><stop offset="1" stop-color="${DN}" stop-opacity="0"/></radialGradient>`}
/* the quote, fitted: one size for its lines, a sentence per line where it can */
function qfit(txt,w,h,smax,smin,f){f=f||'a';for(let s=smax;s>=smin;s-=.5){for(const bs of [true,false]){const parts=bs?(txt.match(/[^.!?]+[.!?]+/g)||[txt]):[txt],L=[];
    for(const p of parts){const ws=p.trim().split(/\s+/),g=[];let cur='';for(const wd of ws){const t=cur?cur+' '+wd:wd;if(tw(t,s,f)<=w||!cur)cur=t;else{g.push(cur);cur=wd}}cur&&g.push(cur);
      /* a sentence on two lines splits where the two come out most even (no orphan word) */
      if(g.length===2){let b=null;for(let k=1;k<ws.length;k++){const a=ws.slice(0,k).join(' '),c=ws.slice(k).join(' '),mx=Math.max(tw(a,s,f),tw(c,s,f));if(!b||mx<b.mx)b={mx,l:[a,c]}}L.push(...(b&&b.mx<=w?b.l:g))}else L.push(...g)}
    if(L.length*s*1.12<=h&&L.every(l=>tw(l,s,f)<=w+.5))return {s,L}}}return null}
const lines=(q,x,y,c,o)=>{if(!q)return '';const n=q.L.length,lh=q.s*1.12;return q.L.map((l,i)=>T(x,y-(n-1)*lh/2+i*lh,q.s,l,Object.assign({c},o||{}))).join('')};
/* ===== meet15 · Meet the models, five inspirations (round H36). window.__M15(take), take A|B|C|D|E. Mockup overlay over the built v46-live-x2plus.html.
   Every word and number is live SVG text from __x2pPnl() / MODELS / the page's own computed line (x2p_chips LINE, read from the live chip);
   the paintings (Hedra gpt-image-2, img/) carry no text. Faces: the founders' loops (<video> in a foreignObject; the poster with reduced motion).
     A  The Season 1 set: four trading cards just pulled from a pack; the sealed Season 2 pack beside them
     B  Pit lane: each lab's garage, the bay order is the standings (as F1 allots garages); Season 2's bays still shuttered
     C  Character select: an arcade cabinet; four playable fighters, four locked slots for Season 2
     D  The portrait gallery: four living portraits on the wall, brass plaques; Season 2's frames still under cloth
     E  The weigh-in: each model on a scale whose needle reads its season P&L; Season 2 waits on the bench ===== */
const LAB={GROK:'xAI',CLAUDE:'Anthropic',GPT:'OpenAI',KIMI:'Moonshot AI'};
const S2=[['MISTRAL','eu','Mistral AI'],['QWEN','cn','Alibaba'],['GEMINI','us','Google'],['NEMOTRON','us','NVIDIA']];
const MOTION=!matchMedia('(prefers-reduced-motion: reduce)').matches;
const FOC={GROK:[.42,.36],CLAUDE:[.52,.3],GPT:[.64,.3],KIMI:[.5,.3]};
const MP4=m=>FND(m).replace('.jpg','.mp4');
let FID=0;
/* the founder, cropped into a window by a focal point (square source) */
function face(m,x,y,w,h,o){o=o||{};const id='m15f'+(FID++),s=Math.max(w,h)*(o.z||1),[fx,fy]=FOC[m];
  let ix=x+w/2-fx*s,iy=y+h/2-fy*s;ix=Math.min(x,Math.max(x+w-s,ix));iy=Math.min(y,Math.max(y+h-s,iy));
  const media=MOTION?`<foreignObject x="${f1(ix)}" y="${f1(iy)}" width="${f1(s)}" height="${f1(s)}"><video xmlns="http://www.w3.org/1999/xhtml" src="${MP4(m)}" poster="${FND(m)}" autoplay="" muted="" loop="" playsinline="" style="width:100%;height:100%;display:block;object-fit:cover"></video></foreignObject>`
    :`<image href="${FND(m)}" x="${f1(ix)}" y="${f1(iy)}" width="${f1(s)}" height="${f1(s)}" preserveAspectRatio="none"/>`;
  return `<clipPath id="${id}"><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(o.rx||0)}"/></clipPath><g clip-path="url(#${id})"${o.flt?` style="filter:${o.flt}"`:''}>${media}${o.vg?`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="url(#${o.vg})"/>`:''}</g>`}
/* the unit colour laid on a painted surface (a rect ring: outer minus inner), the paint's light kept */
function ring(img,Wd,Hd,o,i,col,id,gain){return `${tint(id,col,gain||1.25,.02)}<clipPath id="${id}c"><path clip-rule="evenodd" d="M${f1(o[0])} ${f1(o[1])}H${f1(o[2])}V${f1(o[3])}H${f1(o[0])}Z M${f1(i[0])} ${f1(i[1])}H${f1(i[2])}V${f1(i[3])}H${f1(i[0])}Z"/></clipPath><image href="${BASE}${img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none" clip-path="url(#${id}c)" filter="url(#${id})"/>`}
const head=(x,y,w,s,o)=>{o=o||{};s=fit(s,'MEET THE MODELS',w,'g');return `<g transform="rotate(${o.rot==null?-2:o.rot} ${f1(x)} ${f1(y)})">${T(x+s*.06,y+s*.07,s,'MEET THE MODELS',{f:'g',c:INK,ls:s*.02})}${T(x,y,s,'MEET THE MODELS',{f:'g',c:GD,st:INK,sw:s*.07,ls:s*.02})}</g>`};
const KEY='Ranked by season P&L · $100K on every trade';
const flagCC=cc=>cc;
/* text block helpers */
const nm=(r,x,y,s,w,o)=>{o=o||{};let ns=s,vs=s*.42;const tot=tw(r.name,ns)+ns*.18+tw(r.ver,vs);if(tot>w){const k=w/tot;ns*=k;vs*=k}const g=tw(r.name,ns)+ns*.18+tw(r.ver,vs);let x0=o.a==='start'?x:x-g/2;
  return T(x0,y,ns,r.name,{a:'start',c:o.c||CR,st:o.st,sw:o.sw})+T(x0+tw(r.name,ns)+ns*.18,y+ns*.12,vs,r.ver,{a:'start',c:o.vc||o.c||CR,op:o.vop||.8})};
/* season P&L + W-L on one line, labelled */
function stat(r,x,y,s,w,o){o=o||{};const pt=$(r.pl),ws=`${r.W}-${r.L}`,L1='SEASON P&L',L2='W-L',LF=o.lf||.62;
  const need=k=>tw(L1,k*LF,'s')+k*.35+tw(pt,k)+k*.9+tw(L2,k*LF,'s')+k*.35+tw(ws,k);let k=s;if(need(k)>w)k*=w/need(k);
  let px=o.a==='start'?x:x-need(k)/2;const lc=o.lc||LB;let t='';
  t+=T(px,y,k*LF,L1,{a:'start',f:'s',c:lc});px+=tw(L1,k*LF,'s')+k*.35;t+=T(px,y,k,pt,{a:'start',c:r.pl>=0?(o.up||UP):(o.dn||DN),st:o.st,sw:o.sw});px+=tw(pt,k)+k*.9;
  t+=T(px,y,k*LF,L2,{a:'start',f:'s',c:lc});px+=tw(L2,k*LF,'s')+k*.35;t+=wl(r,k,px,y,{a:'start',dc:lc,wc:o.up,lc:o.dn,st:o.st,sw:o.sw});return t}
/* the same two figures stacked: SEASON P&L over W-L, each labelled */
function stat2(r,x,y,s,w,o){o=o||{};const LF=o.lf||.62,lc=o.lc||LB,pt=$(r.pl),ws=`${r.W}-${r.L}`;let k=s;const n1=k=>tw('SEASON P&L',k*LF,'s')+k*.3+tw(pt,k);if(n1(k)>w)k*=w/n1(k);
  const a=n1(k),b=tw('W-L',k*LF,'s')+k*.3+tw(ws,k);let t='';let px=x-a/2;t+=T(px,y,k*LF,'SEASON P&L',{a:'start',f:'s',c:lc})+T(px+tw('SEASON P&L',k*LF,'s')+k*.3,y,k,pt,{a:'start',c:r.pl>=0?UP:DN});
  px=x-b/2;const y2=y+k*1.15;t+=T(px,y2,k*LF,'W-L',{a:'start',f:'s',c:lc})+wl(r,k,px+tw('W-L',k*LF,'s')+k*.3,y2,{a:'start',dc:lc});return t}
const tag=(x,y,s,w)=>T(x,y,fit(s,KEY,w,'s'),KEY,{f:'s',c:LB});
/* ---------- shared: svg wrapper, defs ---------- */
const svgW=(vb,body,defs,cls)=>`<svg class="m15-svg ${cls||''}" viewBox="${vb.map(v=>f1(v)).join(' ')}" aria-hidden="true"><defs>${defs||''}<radialGradient id="m15vg" cx="50%" cy="42%" r="72%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".5"/></radialGradient>
 <linearGradient id="m15holo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff6b6b"/><stop offset=".2" stop-color="#ffd93d"/><stop offset=".4" stop-color="#6bff95"/><stop offset=".6" stop-color="#5ad1ff"/><stop offset=".8" stop-color="#b48cff"/><stop offset="1" stop-color="#ff6bd6"/></linearGradient>
 <filter id="m15ink" x="-3%" y="-15%" width="106%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter></defs>${body}</svg>`;
const R4=(g,X,Y)=>[X(g[0]),Y(g[1]),X(g[2]-g[0]),Y(g[3]-g[1])];
/* a speech balloon: an ellipse-ish hand-cut shape with a wedge tail toward (tx,ty), its words fitted */
function balloon(x,y,w,h,tx,ty,txt,o){o=o||{};const cx=x+w/2,cy=y+h/2,rx=w/2,ry=h/2;
  const a=Math.atan2(ty-cy,tx-cx),b1=a-.32,b2=a+.32,p1=[cx+Math.cos(b1)*rx*.86,cy+Math.sin(b1)*ry*.86],p2=[cx+Math.cos(b2)*rx*.86,cy+Math.sin(b2)*ry*.86];
  const q=qfit(txt,w*.8,h*.72,o.smax||h*.3,o.smin||4,'s');const sw=o.sw||Math.max(1.5,h*.035);
  const shape=`<ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="${f1(rx)}" ry="${f1(ry)}"/><path d="M${f1(p1[0])} ${f1(p1[1])}L${f1(tx)} ${f1(ty)}L${f1(p2[0])} ${f1(p2[1])}Z"/>`;
  return `<g class="m15-bal"><g fill="${INK}" transform="translate(${f1(sw*1.4)} ${f1(sw*1.6)})" opacity=".55">${shape}</g><g fill="${INK}" stroke="${INK}" stroke-width="${f1(sw*2)}" stroke-linejoin="round">${shape}</g><g fill="#fbf4e2">${shape}</g>${q?lines(q,cx,cy,INK,{f:'s'}):''}</g>`}
/* ================= A · the Season 1 set (trading cards) ================= */
const GA={p:{img:'pa2',W:1536,H:2048,vb:[0,0,1,1],
  c:[{w:[.1387,.104,.448,.264],pl:[.142,.268,.445,.300],pn:[.1387,.305,.448,.388],o:[.117,.093,.47,.404],md:[.155,.11]},
     {w:[.536,.104,.856,.264],pl:[.539,.268,.853,.300],pn:[.536,.305,.856,.388],o:[.514,.093,.867,.404],md:[.555,.11]},
     {w:[.1387,.446,.448,.608],pl:[.142,.613,.445,.645],pn:[.1387,.652,.448,.734],o:[.117,.43,.47,.75],md:[.155,.4525]},
     {w:[.536,.446,.856,.608],pl:[.539,.613,.853,.645],pn:[.536,.652,.856,.734],o:[.514,.43,.867,.75],md:[.555,.4525]}],
  mr:.034,pack:[.53,.802,.862,.926],title:[.5,.045,.9,.07],key:[.5,.768,.7]},
 w:{img:'wa',W:2048,H:1152,vb:[0,.06,1,.9],
  c:[[.066,.198],[.238,.364],[.406,.532],[.572,.696]].map(([a,b])=>({w:[a,.318,b,.527],pl:[a+.002,.536,b-.002,.562],pn:[a,.571,b,.718],o:[a-.012,.302,b+.012,.736],md:[a+.009,.322]})),
  mr:.02,pack:[.757,.238,.884,.472],title:[.36,.16,.62,.12],key:[.36,.245,.6]}};
function tA(R,wide){const g=GA[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,df='';
  s+=head(X(g.title[0]),Y(g.title[1]),X(g.title[2]),Y(g.title[3]));s+=tag(X(g.key[0]),Y(g.key[1]),Y(wide?.03:.016),X(g.key[2]));
  R.forEach((r,i)=>{const c=g.c[i],id='m15a'+i,[wx,wy,ww,wh]=R4(c.w,X,Y);
    /* the card's border in the model's colour; #1 printed on holo foil */
    s+=ring(g.img,Wd,Hd,[X(c.o[0]),Y(c.o[1]),X(c.o[2]),Y(c.o[3])],[wx,wy,X(c.pn[2]),Y(c.pn[3])],r.c,id+'t',1.3);
    if(i===0)s+=`<path clip-rule="evenodd" fill-rule="evenodd" d="M${f1(X(c.o[0]))} ${f1(Y(c.o[1]))}H${f1(X(c.o[2]))}V${f1(Y(c.o[3]))}H${f1(X(c.o[0]))}Z M${f1(wx)} ${f1(wy)}H${f1(X(c.pn[2]))}V${f1(Y(c.pn[3]))}H${f1(wx)}Z" fill="url(#m15holo)" opacity=".55" style="mix-blend-mode:overlay"/>`;
    s+=face(r.m,wx,wy,ww,wh,{vg:'m15vg'});
    /* name plate (gold): the name in ink, the flag patch at its right end */
    const [px,py,pw,ph]=R4(c.pl,X,Y);s+=nm(r,px+ph*.45,py+ph*.53,ph*.98,pw-ph*1.9,{a:'start',c:'#16110a',vc:'#16110a'})+patch(r.cc,px+pw-ph*.75,py+ph*.5,ph*1.05,4);
    /* the black panel: the lab, the season line, the model's own line */
    const [nx,ny,nw,nh]=R4(c.pn,X,Y),pad=nw*.06;
    if(!wide){s+=T(nx+nw/2,ny+nh*.15,nh*.14,'by '+LAB[r.m],{f:'s',c:LB})+stat(r,nx+nw/2,ny+nh*.36,nh*.21,nw-pad*2);
      const q=qfit(r.q,nw-pad*2,nh*.42,nh*.16,4,'s');if(q)s+=lines(q,nx+nw/2,ny+nh*.75,QT,{f:'s'})}
    else{s+=T(nx+nw/2,ny+nh*.12,nh*.12,'by '+LAB[r.m],{f:'s',c:LB})+stat2(r,nx+nw/2,ny+nh*.3,nh*.15,nw-pad*2);
      const q=qfit(r.q,nw-pad*2,nh*.34,nh*.13,4,'s');if(q)s+=lines(q,nx+nw/2,ny+nh*.79,QT,{f:'s'})}
    /* the medallion: the rank struck in it */
    const mx=X(c.md[0]),my=Y(c.md[1]),mr=X(g.mr);s+=T(mx,my+mr*.08,mr*1.6,String(i+1),{c:'#1a1208',st:'#f7e2a0',sw:mr*.06});});
  /* Season 2: the sealed pack */
  const [kx,ky,kw,kh]=R4(g.pack,X,Y),vert=kh>kw;let t='';
  t+=T(kx+kw/2,ky+kh*(vert?.15:.18),fit(kh*(vert?.14:.22),'SEASON 2',kw*.8),'SEASON 2',{c:CR,ls:2});
  t+=T(kx+kw/2,ky+kh*(vert?.28:.36),fit(kh*(vert?.065:.11),'SEALED · IN INFERENCE',kw*.86,'s'),'SEALED · IN INFERENCE',{f:'s',c:LB});
  S2.forEach(([n,cc],j)=>{const col=vert?0:j%2,row=vert?j:Math.floor(j/2),cx=vert?kx+kw/2:kx+kw*(col?.72:.28),cy=vert?ky+kh*(.45+j*.14):ky+kh*(.58+row*.24),ss=vert?kh*.085:kh*.13;
    t+=patch(cc,cx-tw(n,ss)/2-ss*.9,cy,ss*1.25,0)+T(cx+ss*.2,cy,ss,n,{c:'#cfc6b0'})});
  s+=t;
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s,df)}
function tB(R,wide){return '<p>todo</p>'}
/* ================= C · character select (arcade) ================= */
const GC={p:{img:'pc',W:1536,H:2048,vb:[.095,.905,0,.8],mq:[.131,.054,.869,.186],sc:[.163,.283,.837,.642]},
          w:{img:'wc',W:2048,H:1152,vb:[0,1,0,.86],mq:[.106,.043,.894,.217],sc:[.152,.318,.848,.708]}};
function lock(x,y,s,c){return `<path d="M${f1(x-s*.28)} ${f1(y)}V${f1(y-s*.22)}A${f1(s*.28)} ${f1(s*.3)} 0 0 1 ${f1(x+s*.28)} ${f1(y-s*.22)}V${f1(y)}" fill="none" stroke="${c}" stroke-width="${f1(s*.1)}"/><rect x="${f1(x-s*.42)}" y="${f1(y-s*.02)}" width="${f1(s*.84)}" height="${f1(s*.62)}" rx="${f1(s*.08)}" fill="${c}"/><circle cx="${f1(x)}" cy="${f1(y+s*.25)}" r="${f1(s*.08)}" fill="#05060a"/>`}
function tC(R,wide){const g=GC[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  const [mx,my,mw,mh]=R4(g.mq,X,Y);s+=head(mx+mw/2,my+mh*.5,mw*.86,mh*.62,{rot:0});
  const [x,y,w,h]=R4(g.sc,X,Y),G=w*.02;let t=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w*.03)}" fill="#04060b"/>`;
  /* header */
  const hh=h*(wide?.1:.085);t+=T(x+G*1.2,y+hh*.6,hh*.62,'SEASON 1 · SELECT A MODEL',{a:'start',c:CR,ls:hh*.04});t+=T(x+w-G*1.2,y+hh*.62,fit(hh*.5,KEY,w*.46,'s'),KEY,{a:'end',f:'s',c:LB});
  const r0=R[0];
  /* the preview of the model under the cursor (#1 at rest; the build steps the cursor through all four) */
  const pv=wide?[x+G,y+hh+G*.4,w*.47-G*1.5,h-hh-G*1.4]:[x+G,y+hh+G*.3,w-G*2,h*.39];
  const fsz=wide?Math.min(pv[3],pv[2]*.56):pv[3];t+=face(r0.m,pv[0],pv[1],fsz,fsz,{vg:'m15vg'});t+=`<rect x="${f1(pv[0])}" y="${f1(pv[1])}" width="${f1(fsz)}" height="${f1(fsz)}" fill="none" stroke="${r0.c}" stroke-width="${f1(fsz*.025)}"/>`;
  const ix=pv[0]+fsz+G,iy=pv[1],iw=pv[2]-fsz-G,L=wide?fsz*.8:pv[3];let yy=iy;
  t+=T(ix,yy+L*.1,L*.15,'No. 1 · LEADS THE SEASON',{a:'start',c:r0.c});
  t+=nm(r0,ix,yy+L*.29,L*.21,iw*.8,{a:'start',c:CR})+patch(r0.cc,ix+iw-L*.13,yy+L*.29,L*.2,0);
  t+=T(ix,yy+L*.45,L*.1,'by '+LAB[r0.m],{a:'start',f:'s',c:LB});
  const q=qfit('“'+r0.q+'”',iw,L*.24,L*.11,4,'s');if(q)t+=q.L.map((l,j)=>T(ix,yy+L*.6+j*q.s*1.12,q.s,l,{a:'start',f:'s',c:QT})).join('');
  t+=stat(r0,ix,yy+L*.9,L*.12,iw,{a:'start'});
  /* the four fighters, in rank order; the cursor on #1 */
  const tr=wide?[x+w*.47+G*.5,y+hh+G*.4,w*.53-G*1.5,h*.56]:[x+G,pv[1]+pv[3]+G*.8,w-G*2,h*.29];
  const tw4=(tr[2]-G*.9*3)/4;
  R.forEach((r,i)=>{const tx=tr[0]+i*(tw4+G*.9),ty=tr[1],th=tr[3],fh=th*.62;
    t+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw4)}" height="${f1(th)}" fill="#0b0e16"/>`+face(r.m,tx,ty,tw4,fh,{vg:'m15vg'});
    t+=T(tx+tw4*.08,ty+fh+th*.11,th*.13,String(i+1),{a:'start',c:r.c})+T(tx+tw4*.25,ty+fh+th*.11,fit(th*.12,r.name,tw4*.7),r.name,{a:'start',c:CR});
    t+=T(tx+tw4/2,ty+fh+th*.27,fit(th*.11,$(r.pl),tw4*.9),$(r.pl),{c:r.pl>=0?UP:DN});
    t+=`<rect x="${f1(tx)}" y="${f1(ty)}" width="${f1(tw4)}" height="${f1(th)}" fill="none" stroke="${r.c}" stroke-width="${f1(i?tw4*.012:tw4*.035)}"/>`;
    if(!i){const c=th*.11;t+=`<polygon points="${f1(tx+tw4/2-c*.6)},${f1(ty-c*.95)} ${f1(tx+tw4/2+c*.6)},${f1(ty-c*.95)} ${f1(tx+tw4/2)},${f1(ty-c*.15)}" fill="${GD}"/>`+T(tx+tw4/2,ty-c*1.55,c*.9,'P1',{c:GD})}});
  /* Season 2: four locked slots */
  const lr=wide?[tr[0],tr[1]+tr[3]+G*.9,tr[2],y+h-(tr[1]+tr[3]+G*.9)-G*.5]:[x+G,tr[1]+tr[3]+G*.6,w-G*2,y+h-(tr[1]+tr[3]+G*.6)-G*.5];
  t+=T(lr[0],lr[1]+lr[3]*.15,lr[3]*.17,'SEASON 2 · LOCKED · IN INFERENCE',{a:'start',c:LB,ls:2});
  const lw=(lr[2]-G*.9*3)/4,ly=lr[1]+lr[3]*.32,lh=lr[3]*.66;
  S2.forEach(([n,cc],j)=>{const lx=lr[0]+j*(lw+G*.9);t+=`<rect x="${f1(lx)}" y="${f1(ly)}" width="${f1(lw)}" height="${f1(lh)}" fill="#0b0e16" stroke="#3a3f4e" stroke-width="${f1(lh*.03)}" stroke-dasharray="${f1(lh*.08)} ${f1(lh*.05)}"/>`;
    t+=lock(lx+lh*.42,ly+lh*.45,lh*.5,'#8a8f9e')+T(lx+lh*.8,ly+lh*.38,fit(lh*.26,n,lw-lh*.95),n,{a:'start',c:'#a9aec0'})+patch(cc,lx+lh*.8+lh*.17,ly+lh*.72,lh*.28,0)});
  /* the glass: scanlines and a glow */
  t+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="url(#m15scan)" opacity=".5" pointer-events="none"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(w*.03)}" fill="url(#m15crt)"/>`;
  const df=`<pattern id="m15scan" width="4" height="${wide?3:4}" patternUnits="userSpaceOnUse"><rect width="4" height="1.3" fill="#000"/></pattern><radialGradient id="m15crt" cx="50%" cy="50%" r="70%"><stop offset="70%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>`;
  return svgW([X(g.vb[0]),0,X(g.vb[1]-g.vb[0]),Y(g.vb[3])],s+t,df)}
/* ================= D · the portrait gallery (living portraits) ================= */
const GD4={p:{img:'pd2',W:1536,H:2048,vb:[0,0,1,.965],
   cv:[[.16,.142,.392,.316],[.608,.142,.84,.316],[.16,.516,.392,.688],[.608,.516,.84,.688]],mat:[.024,.017,.024,.019],pq:[.016,.052],
   cloth:[[.05,.235],[.25,.445],[.53,.715],[.735,.93]],cy:.875},
  w:{img:'wd',W:2048,H:1152,vb:[0,.03,1,.86],
   cv:[[.082,.356,.176,.559],[.264,.356,.356,.559],[.436,.356,.528,.559],[.603,.356,.690,.559]],mat:[.012,.022,.012,.024],pq:[.035,.085],
   cloth:[[.752,.846],[.858,.954]],cy:.36}};
/* a brass plaque, hand-cut: bevelled, two screws, its lines engraved (pale brass with a dark cut under) */
function brass(x,y,w,h,id){return `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a2e"/><stop offset=".45" stop-color="#5e4519"/><stop offset="1" stop-color="#3a2a0e"/></linearGradient>
  <rect x="${f1(x+h*.06)}" y="${f1(y+h*.1)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h*.08)}" fill="rgba(0,0,0,.55)"/><rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h*.08)}" fill="url(#${id})" stroke="#1c1306" stroke-width="${f1(h*.04)}"/>
  <rect x="${f1(x+h*.06)}" y="${f1(y+h*.06)}" width="${f1(w-h*.12)}" height="${f1(h*.88)}" rx="${f1(h*.05)}" fill="none" stroke="#c9a35a" stroke-opacity=".45" stroke-width="${f1(h*.02)}"/>
  ${[x+h*.16,x+w-h*.16].map(cx=>`<circle cx="${f1(cx)}" cy="${f1(y+h/2)}" r="${f1(h*.055)}" fill="#c9a35a" stroke="#2a1d08" stroke-width="${f1(h*.015)}"/>`).join('')}`}
const ENG={c:'#f3dfa8',st:'#1c1306'};
function tD(R,wide){const g=GD4[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`,top='';
  if(wide){s+=head(X(.38),Y(.095),X(.5),Y(.09),{rot:-1.5})+tag(X(.38),Y(.165),Y(.028),X(.5))}
  R.forEach((r,i)=>{const c=g.cv[i],[cx,cy,cw,ch]=R4(c,X,Y),m=g.mat,id='m15d'+i;
    /* the mat in the model's colour */
    s+=ring(g.img,Wd,Hd,[X(c[0]-m[0]),Y(c[1]-m[1]),X(c[2]+m[2]),Y(c[3]+m[3])],[cx,cy,cx+cw,cy+ch],r.c,id+'t',1.35);
    s+=face(r.m,cx,cy,cw,ch,{vg:'m15vg'});
    /* the catalogue number, a brass disc on the frame's top-left corner */
    const nr=cw*(wide?.13:.11),nx=X(c[0]-m[0])-nr*.1,ny=Y(c[1]-m[1])-nr*.1;
    s+=`<circle cx="${f1(nx+nr*.08)}" cy="${f1(ny+nr*.12)}" r="${f1(nr)}" fill="rgba(0,0,0,.6)"/><circle cx="${f1(nx)}" cy="${f1(ny)}" r="${f1(nr)}" fill="url(#${id}b)" stroke="#1c1306" stroke-width="${f1(nr*.1)}"/>`+T(nx,ny+nr*.05,nr*1.25,String(i+1),ENG);
    /* the plaque: No. and name, the lab with its flag, the season line */
    const py=Y(c[3]+m[3])+Y(g.pq[0]),ph=Y(g.pq[1]),px=cx-cw*.04,pw=cw*1.08;s+=brass(px,py,pw,ph,id+'b');
    if(!wide){s+=nm(r,px+pw/2,py+ph*.3,ph*.36,pw*.8,{c:ENG.c})+stat(r,px+pw/2,py+ph*.72,ph*.28,pw*.84,{lc:'#d9c08a'})}
    else{s+=nm(r,px+pw/2,py+ph*.18,ph*.2,pw*.8,{c:ENG.c})+T(px+pw/2+ph*.12,py+ph*.39,ph*.11,LAB[r.m],{f:'s',c:'#d9c08a'})+patch(r.cc,px+pw/2-tw(LAB[r.m],ph*.11,'s')/2-ph*.1,py+ph*.39,ph*.15,0)+stat2(r,px+pw/2,py+ph*.6,ph*.14,pw*.84,{lc:'#d9c08a'})}
    /* the portrait speaks */
    if(!wide){const right=i%2===0,bw=X(.27),bh=Y(.07),by=cy+(right?ch*.52:ch*.08),bx=right?X(.37):X(.63)-bw;
      top+=balloon(bx,by,bw,bh,right?cx+cw*.86:cx+cw*.14,by+bh*(right?.1:.9),r.q,{smax:bh*.24})}
    else{const pb=py+ph,bw=cw*1.7,bh=Y(.1),bx=cx+cw/2-bw/2,by=pb+Y(.045);top+=balloon(bx,by,bw,bh,cx+cw*.62,pb-ph*.1,r.q,{smax:bh*.22})}
  });
  /* Season 2: the frames under cloth, a paper tag on each cord */
  const tags=wide?S2.map((s2,j)=>[g.cloth[j%2],j<2?.36:.555]):S2.map((s2,j)=>[g.cloth[j],g.cy]);
  S2.forEach(([n,cc],j)=>{const [[a,b],yy]=tags[j],tx=X((a+b)/2),ty=Y(yy),tw0=X(b-a)*.62,th=tw0*.36;
    s+=`<g transform="rotate(${j%2?4:-4} ${f1(tx)} ${f1(ty)})"><path d="M${f1(tx-tw0/2)} ${f1(ty-th/2)}H${f1(tx+tw0/2-th*.4)}L${f1(tx+tw0/2)} ${f1(ty)}L${f1(tx+tw0/2-th*.4)} ${f1(ty+th/2)}H${f1(tx-tw0/2)}Z" fill="#e8dcc0" stroke="${INK}" stroke-width="${f1(th*.05)}"/><circle cx="${f1(tx+tw0/2-th*.42)}" cy="${f1(ty)}" r="${f1(th*.08)}" fill="${INK}"/>`
      +patch(cc,tx-tw0/2+th*.42,ty-th*.02,th*.5,0)+T(tx+th*.12,ty-th*.13,fit(th*.36,n,tw0*.58),n,{c:INK})+T(tx+th*.12,ty+th*.24,fit(th*.2,'Season 2',tw0*.58,'s'),'Season 2',{f:'s',c:'#5a4a30'})+`</g>`});
  const lab=wide?[.903,.70]:[.5,.952];s+=T(X(lab[0]),Y(lab[1]),fit(Y(wide?.026:.016),'Season 2 · in inference',X(wide?.18:.6),'s'),'Season 2 · in inference',{f:'s',c:LB});
  return svgW([0,Y(g.vb[1]),Wd,Y(g.vb[3]-g.vb[1])],s+top,'')}
function tE(R,wide){return '<p>todo</p>'}
const sr=R=>`<table class="m15-sr"><caption>Meet the models: Season 1, ranked by season P&amp;L ($100K on every trade). Season 2: ${S2.map(s=>s[0][0]+s[0].slice(1).toLowerCase()).join(', ')} in inference.</caption><tr><th>No.</th><th>Model</th><th>Lab</th><th>Season P&amp;L</th><th>W-L</th><th>Line</th></tr>${R.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.full)}</td><td>${LAB[r.m]}, ${CNAME[r.cc]}</td><td>${$(r.pl)}</td><td>${r.W}-${r.L}</td><td>${esc(r.q)}</td></tr>`).join('')}</table>`;
W.__M15=function(take){const sec=D.querySelector('section.c8');if(!sec)return false;const de=D.documentElement;de.classList.add('m15-on','m15-'+take);
  sec.querySelectorAll('.c8-one').forEach(o=>{const b=o.querySelector('.c8-bal span');if(b)QUOTE[o.dataset.m]=b.textContent.trim()});
  [...sec.children].forEach(c=>{if(!c.classList.contains('m15')&&c.tagName!=='svg')c.style.display='none'});
  let host=sec.querySelector(':scope>.m15');if(!host){host=D.createElement('div');sec.appendChild(host)}
  const wide=matchMedia('(min-width:900px)').matches,R=rows();host.className='m15 m15-'+take+(wide?' m15-wide':'');
  host.innerHTML=({A:tA,B:tB,C:tC,D:tD,E:tE})[take](R,wide)+sr(R);return true};
})();
