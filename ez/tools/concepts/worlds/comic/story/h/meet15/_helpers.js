const D=document,W=window,BASE='tools/concepts/worlds/comic/story/h/meet15/img/',M13='tools/concepts/worlds/comic/story/h/meet13/img/';
const UC={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const CTRY={GROK:'us',CLAUDE:'us',GPT:'us',KIMI:'cn'},CNAME={us:'United States',cn:'China'};
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
