/* meet14 · Meet the models, round H34 (mockup overlay over the built v46-live-x2plus.html). window.__M14(take), take v1|v2|v3|v4.
   Owner (2026-11-02, night): keep it whimsical but easy to digest; from today's chips: (1) the lab flag back to the TOP RIGHT of the name module as a
   small team patch, (2) the flag panel becomes ONE solid unit colour per model (Grok #e4e0d6, Claude #ef8a55, GPT #b18cff, Kimi #58b7ff, the Smart or
   lucky chart's colours), (3) the last 5 carries the label "LAST 5" everywhere. Then variations of layout and world:
     v1 today's chips with 1-3 (img/chip14-<m>.jpg: the live chip12 paintings re-inked in the unit colour, the flag panel a solid enamel inlay,
        a LAST 5 window cut in under the P&L row; chip14.py)
     v2 the same content as a leaderboard in the chip world: a motherboard, each model a memory module in its unit colour, the slot is the rank
        (Hedra v2p / v2w; v2p-b.jpg = v2p with the lower windows re-sliced so W-L fits; the grey solder mask tinted live by a colour matrix)
     v3 the ballpark board refined (Hedra v3p3 portrait, meet13's n1w wide): each name plate painted in the unit colour, flag patch, LAST 5 tag
     v4 fight-night billing (Hedra v4p2 / v4w2): main event #1 vs #2, undercard #3 vs #4; W-L is a fighter's record, the flag beside the name
   Every word and number is live SVG text from __x2pPnl() / MODELS / the page's own computed quote (x2p_chips LINE); the paintings carry no text.
   Founders: the loops' posters (a <video> in the same slot is the build). No perspective, no motion: GPU-cheap (one SVG per take, static). */
(function(){
const D=document,W=window,BASE='tools/concepts/worlds/comic/story/h/meet14/img/',M13='tools/concepts/worlds/comic/story/h/meet13/img/';
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
function patch(cc,cx,cy,w,rot){const id='m14pt'+(PID++),h=w*.64,x=-w/2,y=-h/2,r=w*.13;
  /* a hand-cut outline: a rounded rect whose sides bow a hair, so it reads as cloth, not a CSS box */
  const j=[.010,-.008,.012,-.006,.009,-.011,.007,-.01];const q=(a,b,k)=>`${f1(a+j[k%8]*w)},${f1(b+j[(k+3)%8]*w)}`;
  const o=`M${q(x+r,y,0)} Q${q(0,y-h*.03,1)} ${q(x+w-r,y,2)} Q${q(x+w,y,3)} ${q(x+w,y+r,4)} Q${q(x+w+w*.02,0,5)} ${q(x+w,y+h-r,6)} Q${q(x+w,y+h,7)} ${q(x+w-r,y+h,0)} Q${q(0,y+h+h*.03,1)} ${q(x+r,y+h,2)} Q${q(x,y+h,3)} ${q(x,y+h-r,4)} Q${q(x-w*.02,0,5)} ${q(x,y+r,6)} Q${q(x,y,7)} ${q(x+r,y,0)}Z`;
  const ix=x+w*.09,iy=y+h*.13,iw=w*.82,ih=h*.74;let fl='';
  if(cc==='us'){for(let i=0;i<13;i++)fl+=`<rect x="${f1(ix)}" y="${f1(iy+i*ih/13)}" width="${f1(iw)}" height="${f1(ih/13+.5)}" fill="${i%2?'#f3ead6':'#c8312c'}"/>`;
    const cw=iw*.44,ch=ih*7/13;fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(cw)}" height="${f1(ch)}" fill="#25366f"/>`;
    for(let a=0;a<4;a++)for(let b=0;b<5;b++)fl+=`<circle cx="${f1(ix+cw*(.12+b*.19+(a%2)*.09))}" cy="${f1(iy+ch*(.15+a*.24))}" r="${f1(ih*.026)}" fill="#f3ead6"/>`}
  else{fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#cf2f26"/>`;const s=ih;
    fl+=`<polygon points="${star(ix+iw*.18,iy+s*.3,s*.17,0)}" fill="#ffd21f"/>`;[[.36,.12,.3],[.44,.24,.9],[.44,.42,0],[.36,.54,.4]].forEach(([a,b,t])=>fl+=`<polygon points="${star(ix+iw*a,iy+s*b,s*.06,t)}" fill="#ffd21f"/>`)}
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) rotate(${rot||0})" class="m14-pt">
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
function crown(x,y,s,c){const p=[[-.5,.32],[-.5,-.18],[-.25,.08],[0,-.42],[.25,.08],[.5,-.18],[.5,.32]].map(([a,b])=>`${f1(x+a*s)},${f1(y+b*s)}`).join(' ');
  return `<g><polygon points="${p}" fill="${c}" stroke="${INK}" stroke-width="${f1(s*.07)}" stroke-linejoin="round"/><rect x="${f1(x-.5*s)}" y="${f1(y+.38*s)}" width="${f1(s)}" height="${f1(s*.14)}" fill="${c}" stroke="${INK}" stroke-width="${f1(s*.06)}"/></g>`}
const sr=R=>`<table class="m14-sr"><caption>Meet the models: Season 1, ranked by season P&amp;L ($100K on every trade).</caption><tr><th>No.</th><th>Model</th><th>Lab country</th><th>Season P&amp;L</th><th>W-L</th><th>Last 5, oldest to newest</th><th>Line</th></tr>${R.map((r,i)=>`<tr><td>${i+1}</td><td>${esc(r.full)}</td><td>${CNAME[r.cc]}</td><td>${$(r.pl)}</td><td>${r.W}-${r.L}</td><td>${r.l5.join(' ')}</td><td>${esc(r.q)}</td></tr>`).join('')}</table>`;
const head=(x,y,w,s,o)=>{o=o||{};s=fit(s,'MEET THE MODELS',w,'g');return `<g transform="rotate(-2 ${f1(x)} ${f1(y)})">${T(x+s*.07,y+s*.08,s,'MEET THE MODELS',{f:'g',c:INK,ls:s*.02})}${T(x,y,s,'MEET THE MODELS',{f:'g',c:o.c||GD,st:INK,sw:s*.07,ls:s*.02})}</g>`};

/* ================= V1 · today's chips, 1 to 3 applied ================= */
function v1(R,wide){const CW=1800,CH=828;
  return `<div class="m14-v1b">`+R.map((r,i)=>{const top=wide?0:i?63:31,bot=wide?CH:CH-(i<3?67:35),id='m14c'+i,g='m14g'+i;let s='';
    s+=`<image href="${BASE}chip14-${r.m.toLowerCase()}.jpg" x="0" y="0" width="${CW}" height="${CH}"/>`;
    /* the founder in the die */
    s+=`<clipPath id="${id}f"><rect x="1327" y="147" width="401" height="521" rx="6"/></clipPath><g clip-path="url(#${id}f)"><image href="${FND(r.m)}" x="1327" y="147" width="401" height="521" preserveAspectRatio="xMidYMid slice"/><rect x="1327" y="147" width="401" height="521" fill="url(#${id}vg)"/></g>`;
    /* name window: the name lit, the version small, the flag patch on its top right corner */
    const NH=149,nfs0=NH*.62/.735,pad=NH*.3,room=844-pad*2-150;let nfs=nfs0,vs=nfs*.42;const tot=tw(r.name,nfs)+nfs*.16+tw(r.ver,vs,'b');if(tot>room){const k=room/tot;nfs*=k;vs*=k}
    s+=T(408+pad,188,nfs,r.name,{a:'start',c:`url(#${id}n)`,fl:id+'gl',ls:nfs*.03})+T(408+pad+tw(r.name,nfs)+nfs*.03*r.name.length+nfs*.16,196,vs,r.ver,{a:'start',f:'b',c:'#e6d3a8',op:.85,ls:vs*.06});
    s+=patch(r.cc,1192,118,136,4);
    /* season P&L, W-L, labels on the matte */
    const lab=(x,y,t1,t2)=>t2?T(x,y-21,41,t1,{f:'b',c:LB})+T(x,y+21,41,t2,{f:'b',c:LB}):T(x,y,41,t1,{f:'b',c:LB});
    s+=lab(465,340,'SEASON','P&L')+lab(997,340,'W-L');
    s+=T(738,343,fit(74,$(r.pl),374),$(r.pl),{c:r.pl>=0?UP:DN});
    const ws=`${r.W}-${r.L}`;s+=wl(r,fit(70,ws,170),1149,343);
    /* LAST 5: the label on the matte, five lit cells in the new window, oldest to newest */
    s+=lab(465,462,'LAST 5');
    r.l5.forEach((c,j)=>{const x=552+j*(111.2+30.5),col=c==='W'?UP:DN;s+=`<rect x="${f1(x)}" y="433" width="111.2" height="58" rx="10" fill="${c==='W'?'rgba(63,208,122,.16)':'rgba(255,90,76,.16)'}" stroke="${col}" stroke-width="3.5"/>`+T(x+55.6,463,48,c,{c:col})});
    /* the quote */
    const q=qfit(r.q,770,140,80,44);s+=lines(q,829.5,611,QT,{ls:1});
    return `<div class="m14-c1"><i class="m32-tab${i?'':' m32-t1'}" aria-hidden="true"><b>${i+1}</b></i><svg viewBox="0 ${top} ${CW} ${bot-top}" aria-hidden="true">
      <defs><linearGradient id="${id}n" x1="0" y1="0" x2="0" y2="1"><stop offset=".05" stop-color="#fff"/><stop offset=".55" stop-color="#fff6dc"/><stop offset="1" stop-color="#f0d9a2"/></linearGradient>
      <filter id="${id}gl" x="-5%" y="-30%" width="110%" height="160%"><feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#ffbe5a" flood-opacity=".6"/></filter>
      <radialGradient id="${id}vg" cx="50%" cy="42%" r="72%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".5"/></radialGradient>${glows(g)}</defs>${s}</svg></div>`}).join('')+`</div>`}

/* ================= V2 · the motherboard: a leaderboard of memory modules ================= */
const G2={p:{img:'v2p-b',si:'v2p-sub',W:1152,H:2048,crop:[0,.118,1,.845],tops:[.2754,.4131,.5508,.6899],title:[.5,.162,.84],sub:[.5,.212],
           mod:[.084,.260,.916,.387],sq:[.1589,.2856,.2682,.3545],lng:[.3359,.2754,.8698,.3223],pl:[.3958,.3398,.5450,.3662],w:[.5590,.3398,.6745,.3662],
           leds:[.695,.731,.766,.802,.837],ly:.3547,lr:.0135,laby:.3312,rank:[.036,.336]},
        w:{img:'v2w',si:'v2w-sub',W:2048,H:1152,crop:[.03,.0,.97,.96],tops:[.2396,.4219,.6042,.7839],title:[.5,.088,.6],sub:[.5,.158],
           mod:[.130,.220,.880,.356],sq:[.2373,.2396,.2959,.3255],lng:[.3311,.2396,.6738,.2839],pl:[.3779,.2969,.5728,.3359],w:[.5918,.3047,.6460,.3359],
           leds:[.6728,.7,.7272,.7544,.7816],ly:.317,lr:.0094,laby:.2905,rank:[.092,.29]}};
function v2(R,wide){const g=G2[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd;let s='',df='',tops=g.tops;
  const vb=[X(g.crop[0]),Y(g.crop[1]),X(g.crop[2]-g.crop[0]),Y(g.crop[3]-g.crop[1])];
  s+=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  /* title on the board's blank black field */
  s+=head(X(g.title[0]),Y(g.title[1]),X(g.title[2]),wide?Y(.06):Y(.05));
  const sub=`Season 1 · ${graded()} rounds · ranked by season P&L · $100K on every trade`;s+=T(X(g.sub[0]),Y(g.sub[1]),fit(wide?Y(.024):Y(.0125),sub,X(.86),'s'),sub,{f:'s',c:CR});
  R.forEach((r,i)=>{const d=tops[i]-tops[0],Yd=f=>Y(f+d),id='m14v2'+i;
    df+=tint(id+'t',r.c,1.75,0)+`<clipPath id="${id}m"><rect x="${f1(X(g.mod[0]))}" y="${f1(Yd(g.mod[1]))}" width="${f1(X(g.mod[2]-g.mod[0]))}" height="${f1(Y(g.mod[3]-g.mod[1]))}"/></clipPath>`;
    s+=`<image href="${BASE}${g.si}.webp" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none" clip-path="url(#${id}m)" filter="url(#${id}t)"/>`;
    /* the slot is the rank: silkscreened on the motherboard beside the module */
    const rk=wide?Y(.065):X(.062);s+=T(X(g.rank[0]),Yd(g.rank[1]),rk,String(i+1),{c:i?CR:GD,st:INK,sw:rk*.08});
    /* founder */
    const sq=g.sq,fx=X(sq[0])+3,fy=Yd(sq[1])+3,fw=X(sq[2]-sq[0])-6,fh=Y(sq[3]-sq[1])-6;
    s+=`<clipPath id="${id}f"><rect x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" rx="4"/></clipPath><image href="${FND(r.m)}" x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}f)"/>`;
    /* the name module: mark, name, version; the flag patch on its top right corner; on desktop the quote beside the name */
    const L=g.lng,lx=X(L[0]),lw=X(L[2]-L[0]),lh=Y(L[3]-L[1]),ly=Yd(L[1])+lh/2,ms=lh*.5,pad=lh*.3;
    let nfs=lh*.6/.735,vs=nfs*.42;const room=wide?lw*.36:lw-pad*2-ms*1.3-lh*.95;const tot=tw(r.name,nfs)+nfs*.16+tw(r.ver,vs,'b');if(tot>room){const k=room/tot;nfs*=k;vs*=k}
    s+=mark(r.m,lx+pad+ms/2,ly,ms,CR);const nx=lx+pad+ms*1.3;
    s+=T(nx,ly,nfs,r.name,{a:'start',c:CR,ls:nfs*.03})+T(nx+tw(r.name,nfs)+nfs*.03*r.name.length+nfs*.14,ly+nfs*.06,vs,r.ver,{a:'start',f:'b',c:'#e6d3a8',op:.85,ls:vs*.05});
    if(wide&&r.q){const qx0=nx+tw(r.name,nfs)+nfs*.03*r.name.length+nfs*.14+tw(r.ver,vs,'b')+lh*.5,qw=lx+lw-qx0-lh*.95,q=qfit('“'+r.q+'”',qw,lh*.84,lh*.36,lh*.22);s+=lines(q,qx0+qw/2,ly,QT)}
    s+=patch(r.cc,lx+lw-lh*.52,Yd(L[1])+lh*.02,lh*.86,5);
    /* the lower row: labels silkscreened in ink on the module, values in the glass */
    const lab=(x,t)=>T(x,Yd(g.laby),wide?Y(.0125):Y(.0118),t,{f:'b',c:'#16120f',op:.92,ls:1});
    const P=g.pl,pw=X(P[2]-P[0]),ph=Y(P[3]-P[1]),py=Yd(P[1])+ph/2;s+=lab(X((P[0]+P[2])/2),'SEASON P&L')+T(X((P[0]+P[2])/2),py,fit(ph*.74,$(r.pl),pw*.88),$(r.pl),{c:r.pl>=0?UP:DN});
    const Q=g.w,qw2=X(Q[2]-Q[0]),qh=Y(Q[3]-Q[1]),qy=Yd(Q[1])+qh/2;s+=lab(X((Q[0]+Q[2])/2),'W-L')+wl(r,fit(qh*.72,`${r.W}-${r.L}`,qw2*.66),X((Q[0]+Q[2])/2),qy);
    s+=lab(X((g.leds[0]+g.leds[4])/2),'LAST 5');
    r.l5.forEach((c,j)=>{s+=lamp(X(g.leds[j]),Yd(g.ly),X(g.lr),c,{g:'m14v2g'})});
  });
  /* No. 5? silkscreened on the empty slot area under the board's last module */
  const t5=`NO. 5?  IN TRYOUTS: ${TRY.join(' · ').toUpperCase()}`,y5=Y(tops[3]+(wide?.16:.143));s+=T(X(.5),y5,fit(wide?Y(.02):Y(.0135),t5,X(.8),'b'),t5,{f:'b',c:'#d9c9a0',ls:2,op:.9});
  return `<svg class="m14-svg" viewBox="${vb.map(v=>v.toFixed(0)).join(' ')}" aria-hidden="true"><defs>${df}${glows('m14v2g')}</defs>${s}</svg>`}

/* ================= V3 · the ballpark board, refined ================= */
const G3={p:{img:BASE+'v3p3',W:1536,H:2048,crop:[.065,0,.935,.985],hd:[.137,.1764,.879,.3401],lab:.3702,rows:[.4007,.5081,.6150,.7234],
           rank:[.1374,.2288],fr:[.2617,.3457,.0109,.0842],name:[.3766,.5770,0,.0405],tag:[.3766,.4331,.0503,.0773],bulbs:[.4522,.4811,.5094,.5376,.5665],by:.0701,br:.0112,
           pnl:[.5908,.7897],wl:[.8031,.8793],rh:.0937,last:[.137,.879,.8615],pen:[.105,.47],labx:{no:.183,model:.477,pnl:.690,wl:.841}},
        w:{img:M13+'n1w',W:2048,H:1152,crop:[.06,0,.94,.985],hd:[.159,.162,.845,.269],lab:.2925,rows:[.3733,.4913,.6094,.7274],ph:.07,
           rank:[.192,.04],fr:[.2637,.0469,.0729],name:[.3822,.1428,0,.07],pnl:[.5264,.1232],wl:[.623,.0396],l5:[.68,.7164,.7528,.7884,.8244],l5w:.03,last:[.159,.845,.822,.065],pen:[.145,.31]}};
const CHALK='#fff5d8';
function v3(R,wide){const g=G3[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd,id='m14v3';let s='',df='',top='';
  const vb=[X(g.crop[0]),Y(g.crop[1]),X(g.crop[2]-g.crop[0]),Y(g.crop[3]-g.crop[1])];
  s+=`<image href="${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  const [hx0,hy0,hx1,hy1]=g.hd,hw=X(hx1-hx0),hh=Y(hy1-hy0),hcx=X((hx0+hx1)/2);
  top+=head(hcx,Y(hy0)+hh*.42,hw*.86,Math.min(hh*.42,hw*.17));
  const sub=`Season 1 · ${graded()} rounds · ranked by season P&L · $100K on every trade`;s+=T(hcx,Y(hy0)+hh*.8,fit(hh*.11,sub,hw*.9,'s'),sub,{f:'s',c:CHALK});
  const lw=wide?.0125:.0115,lab=(x,t)=>{s+=T(X(x),Y(g.lab),Y(lw),t,{f:'s',c:CHALK,ls:Y(lw)*.05})};
  if(wide){lab(g.rank[0],'NO.');lab(g.fr[0],'FOUNDER');lab(g.name[0],'MODEL');lab(g.pnl[0],'SEASON P&L');lab(g.wl[0],'W-L');lab((g.l5[0]+g.l5[4])/2,'LAST 5 · NEWEST →')}
  else{lab(g.labx.no,'NO.');lab(g.labx.model,'MODEL');lab(g.labx.pnl,'SEASON P&L');lab(g.labx.wl,'W-L')}
  R.forEach((r,i)=>{let y0,cy,nm,fr,pl,wlx,rk;
    if(wide){cy=Y(g.rows[i]);const ph=Y(g.ph);rk={x:X(g.rank[0]),y:cy,s:fit(ph*.62,String(i+1),X(g.rank[1])*.7)};fr={x:X(g.fr[0])-X(g.fr[1])/2,y:cy-Y(g.fr[2])/2,w:X(g.fr[1]),h:Y(g.fr[2])};
      nm={x:X(g.name[0]-g.name[1]/2),y:cy-ph/2+Y(.006),w:X(g.name[1]),h:ph-Y(.012)};pl={x:X(g.pnl[0]),y:cy,w:X(g.pnl[1])};wlx={x:X(g.wl[0]),w:X(g.wl[1]),y:cy}}
    else{y0=Y(g.rows[i]);const rh=Y(g.rh);cy=y0+rh/2;rk={x:X((g.rank[0]+g.rank[1])/2),y:cy,s:Math.min(rh*.62,X(g.rank[1]-g.rank[0])*.8)};
      fr={x:X(g.fr[0])+2,y:y0+Y(g.fr[2])+2,w:X(g.fr[1]-g.fr[0])-4,h:Y(g.fr[3]-g.fr[2])-4};nm={x:X(g.name[0]),y:y0+Y(g.name[2]),w:X(g.name[1]-g.name[0]),h:Y(g.name[3]-g.name[2])};
      pl={x:X((g.pnl[0]+g.pnl[1])/2),y:cy,w:X(g.pnl[1]-g.pnl[0])};wlx={x:X((g.wl[0]+g.wl[1])/2),w:X(g.wl[1]-g.wl[0]),y:cy}}
    s+=T(rk.x,rk.y,rk.s,String(i+1),{c:i?CHALK:GD,fl:id+'ch'});
    s+=`<clipPath id="${id}f${i}"><rect x="${f1(fr.x)}" y="${f1(fr.y)}" width="${f1(fr.w)}" height="${f1(fr.h)}"/></clipPath><g clip-path="url(#${id}f${i})"><image href="${FND(r.m)}" x="${f1(fr.x)}" y="${f1(fr.y)}" width="${f1(fr.w)}" height="${f1(fr.h)}" preserveAspectRatio="xMidYMid slice"/><rect x="${f1(fr.x)}" y="${f1(fr.y)}" width="${f1(fr.w)}" height="${f1(fr.h)}" fill="url(#${id}vg)"/></g>`;
    /* the name plate painted in the unit colour: the colour brushed on, the board's own grain multiplied back through it, an ink edge */
    const ix=nm.x+nm.w*.035,iy=nm.y+nm.h*.12,iw=nm.w*.93,ih=nm.h*.76;
    s+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(ih*.08)}" fill="${r.c}" filter="url(#${id}br)"/>`;
    s+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="url(#${id}sh)" style="mix-blend-mode:multiply"/>`;
    const ms=ih*.6,nfs0=ih*.62/.735,room=iw-ih*.5-ms*1.3-ih*.9;let nfs=nfs0;if(tw(r.name,nfs)>room)nfs*=room/tw(r.name,nfs);
    const tx=ix+ih*.28;s+=mark(r.m,tx+ms/2,iy+ih/2,ms,'#16120f')+T(tx+ms*1.3,iy+ih/2,nfs,r.name,{a:'start',c:'#16120f',ls:nfs*.03});
    s+=patch(r.cc,ix+iw-ih*.42,iy+ih*.02,ih*.82,5);
    /* season P&L and W-L in chalk */
    s+=T(pl.x,pl.y,fit(wide?Y(.035):Y(.03),$(r.pl),pl.w*.86),$(r.pl),{c:r.pl>=0?UP:DN,fl:id+'ch'});
    s+=wl(r,fit(wide?Y(.03):Y(.022),`${r.W}-${r.L}`,wlx.w*.82),wlx.x,wlx.y,{fl:id+'ch',dc:CHALK});
    /* LAST 5: the wooden tag says it, the bulbs light W green or L red */
    if(wide){const s5=fit(Y(.028),'W',X(g.l5w)*.7);r.l5.forEach((c,j)=>{s+=T(X(g.l5[j]),cy,s5,c,{c:c==='W'?UP:DN,fl:id+'ch'})})}
    else{const ty=y0+Y((g.tag[2]+g.tag[3])/2),tx0=X(g.tag[0]),tx1=X(g.tag[1]);s+=T((tx0+tx1)/2,ty,fit(Y(.0125),'LAST 5',(tx1-tx0)*.82),'LAST 5',{c:CHALK});
      r.l5.forEach((c,j)=>{s+=lamp(X(g.bulbs[j]),y0+Y(g.by),X(g.br),c,{g:id+'g',st:'#2a1d10'})})}
  });
  /* No. 5? in tryouts, on the last plate */
  const lx0=X(g.last[0]),lx1=X(g.last[1]),ly=Y(g.last[2]),lfs=wide?Y(.03):Y(.022),t1='NO. 5?',t2=`IN TRYOUTS: ${TRY.join(' · ').toUpperCase()}`;
  const t2s=fit(lfs*.7,t2,(lx1-lx0)*.74-tw(t1,lfs),'s'),gw=tw(t1,lfs)+lfs*.6+tw(t2,t2s,'s'),gx=lx0+(lx1-lx0-gw)/2;
  s+=T(gx,ly,lfs,t1,{a:'start',c:CHALK,fl:id+'ch'})+T(gx+tw(t1,lfs)+lfs*.6,ly,t2s,t2,{a:'start',f:'s',c:CHALK,op:.85});
  top+=`<g transform="rotate(-8 ${f1(X(g.pen[0]))} ${f1(Y(g.pen[1]))})">${crown(X(g.pen[0]),Y(g.pen[1]),wide?X(.026):X(.05),CHALK)}</g>`;
  return `<svg class="m14-svg" viewBox="${vb.map(v=>v.toFixed(0)).join(' ')}" aria-hidden="true"><defs>
    <filter id="${id}ch" x="-3%" y="-15%" width="106%" height="130%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${wide?2.4:3}" xChannelSelector="R" yChannelSelector="G"/></filter>
    <filter id="${id}br" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035 .5" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -.6 1.25" result="a"/><feComposite in="d" in2="a" operator="in"/></filter>
    <linearGradient id="${id}sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#e9e2d2"/><stop offset="1" stop-color="#a99d86"/></linearGradient>
    <radialGradient id="${id}vg" cx="50%" cy="42%" r="70%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>${glows(id+'g')}</defs>${s}${top}</svg>`}

/* ================= V4 · fight-night billing ================= */
const G4={p:{img:'v4p2',W:1152,H:2048,crop:[0,0,1,1],band:[.0599,.0322,.9427,.1304],vs:[.5,.297,.07],foot:[.0833,.9229,.9141,.9756],
           f:[[.0677,.1611,.4375,.4395],[.5651,.1611,.9349,.4395],[.1276,.6152,.4193,.8013],[.5729,.6152,.8802,.8013]],
           b:[[.0495,.4570,.4505,.5127],[.5521,.4570,.9505,.5127],[.1068,.8174,.4401,.8584],[.5599,.8174,.8932,.8584]],below:[.067,.064],rule:.5845},
        w:{img:'v4w2',W:2048,H:1152,crop:[0,0,1,1],band:[.0688,.0312,.9346,.2083],vs:[.3105,.514,.06],foot:null,
           f:[[.0381,.3073,.2915,.7604],[.3369,.3073,.5889,.7604],[.6387,.3828,.7852,.7422],[.8145,.3828,.9624,.7422]],
           b:[[.0293,.7891,.2944,.8880],[.3281,.7891,.5918,.8880],[.6313,.7786,.7925,.8880],[.8071,.7786,.9712,.8880]],below:[.075,.075]}};
function v4(R,wide){const g=G4[wide?'w':'p'],Wd=g.W,Hd=g.H,X=f=>f*Wd,Y=f=>f*Hd,id='m14v4';let s='',df='',s0='',vs0='';
  s+=`<image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  /* the top band: the section's title printed in black ink with a red under-print, the bill's line under it */
  const [bx0,by0,bx1,by1]=g.band,bw=X(bx1-bx0),bh=Y(by1-by0),bcx=X((bx0+bx1)/2),ts=fit(bh*(wide?.5:.52),'MEET THE MODELS',bw*.8,'g'),ty=Y(by0)+bh*(wide?.42:.4);
  s+=`<g transform="rotate(-1.5 ${f1(bcx)} ${f1(ty)})">${T(bcx+ts*.05,ty+ts*.06,ts,'MEET THE MODELS',{f:'g',c:'#b0261e',ls:ts*.02,op:.9})}${T(bcx,ty,ts,'MEET THE MODELS',{f:'g',c:wide?GD:'#14100c',ls:ts*.02,st:wide?INK:null,sw:ts*.06})}</g>`;
  const sub=`Season 1 · ${graded()} rounds · main event #1 vs #2 · ranked by season P&L`;s+=T(bcx,Y(by0)+bh*(wide?.8:.82),fit(bh*(wide?.13:.15),sub,bw*.88,'b'),sub.toUpperCase(),{f:'b',c:wide?CR:'#14100c',ls:2});
  /* the starburst printed back over the portraits' inner edges (its gold alone, cut from the painting), then VS in it */
  s0=`<image href="${BASE}${g.img}-burst.webp" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none"/>`;
  const vsz=X(g.vs[2])*1.25;vs0=T(X(g.vs[0]),Y(g.vs[1]),vsz,'VS',{f:'g',c:'#b0261e',st:'#14100c',sw:vsz*.06});
  R.forEach((r,i)=>{const F=g.f[i],B=g.b[i],ii=id+i,fx=X(F[0]),fy=Y(F[1]),fw=X(F[2]-F[0]),fh=Y(F[3]-F[1]),main=i<2;
    s+=`<clipPath id="${ii}f"><rect x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}"/></clipPath><g clip-path="url(#${ii}f)"><image href="${FND(r.m)}" x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" preserveAspectRatio="xMidYMid slice" style="filter:contrast(1.06) saturate(.9)"/><rect x="${f1(fx)}" y="${f1(fy)}" width="${f1(fw)}" height="${f1(fh)}" fill="url(#${id}vg)"/></g>`;
    /* the billing rank, a printed roundel on the frame's top-left corner (gold for #1) */
    const rr=Math.min(fw,fh)*(wide?.13:.14);s+=`<circle cx="${f1(fx+rr*.7)}" cy="${f1(fy+rr*.7)}" r="${f1(rr)}" fill="${i?'#b0261e':'#e8b23a'}" stroke="#14100c" stroke-width="${f1(rr*.14)}"/>`+T(fx+rr*.7,fy+rr*.72,rr*1.25,'#'+(i+1),{f:'g',c:i?CR:'#14100c'});
    /* the name band, re-inked in the unit colour (gold paper's grain kept), name and mark in black ink, the flag patch top right */
    const nx=X(B[0]),ny=Y(B[1]),nw=X(B[2]-B[0]),nh=Y(B[3]-B[1]);df+=tint(ii+'t',r.c,1.45,.02);
    s+=`<clipPath id="${ii}b"><rect x="${f1(nx)}" y="${f1(ny)}" width="${f1(nw)}" height="${f1(nh)}"/></clipPath><image href="${BASE}${g.img}.jpg" x="0" y="0" width="${Wd}" height="${Hd}" preserveAspectRatio="none" clip-path="url(#${ii}b)" filter="url(#${ii}t)"/>`;
    const ms=nh*.5,room=nw-nh*.3-ms*1.3-nh*.55;let nfs=nh*.6/.735,vs=nfs*.4;const tot=tw(r.name,nfs)+nfs*.14+tw(r.ver,vs,'b');if(tot>room){const k=room/tot;nfs*=k;vs*=k}
    const tx=nx+nh*.3;s+=mark(r.m,tx+ms/2,ny+nh/2,ms,'#14100c')+T(tx+ms*1.3,ny+nh/2,nfs,r.name,{a:'start',c:'#14100c',ls:nfs*.03})+T(tx+ms*1.3+tw(r.name,nfs)+nfs*.03*r.name.length+nfs*.14,ny+nh/2+nfs*.06,vs,r.ver,{a:'start',f:'b',c:'#14100c',op:.8,ls:vs*.05});
    s+=patch(r.cc,nx+nw-nh*.5,ny+nh*.04,nh*.8,5);
    /* printed on the black card under the band: the purse (season P&L), the record (W-L), the last 5 */
    const bl=Y(g.below[main?0:1]),y1=ny+nh+bl*.32,y2=ny+nh+bl*.74,cx=nx+nw/2,ls=bl*.2;
    const pt=$(r.pl),ps=fit(bl*(wide?.5:.42),pt,nw*.55),lt='SEASON P&L',lsz=Math.min(ls,bl*.22)*(wide?1.15:1);
    const lw0=tw(lt,lsz,'b')+lt.length*1,gw=lw0+lsz*.9+tw(pt,ps);s+=T(cx-gw/2,y1,lsz,lt,{a:'start',f:'b',c:CR,ls:1})+T(cx-gw/2+lw0+lsz*.9,y1,ps,pt,{a:'start',c:r.pl>=0?UP:DN});
    const ws=`${r.W}-${r.L}`;let s2=bl*(wide?.3:.26);const need=k=>tw('W-L',k*.8,'b')+k*.4+tw(ws,k)+k*1.1+tw('LAST 5',k*.8,'b')+k*.4+5*k*1.15;if(need(s2)>nw*.96)s2*=nw*.96/need(s2);const l5w=s2*1.15;const parts=tw('W-L',s2*.8,'b')+s2*.4+tw(ws,s2)+s2*1.1+tw('LAST 5',s2*.8,'b')+s2*.4+5*l5w;let px=cx-parts/2;
    s+=T(px,y2,s2*.8,'W-L',{a:'start',f:'b',c:CR,ls:1});px+=tw('W-L',s2*.8,'b')+s2*.4;s+=wl(r,s2,px,y2,{a:'start',dc:CR});px+=tw(ws,s2)+s2*1.1;
    s+=T(px,y2,s2*.8,'LAST 5',{a:'start',f:'b',c:CR,ls:1});px+=tw('LAST 5',s2*.8,'b')+s2*.4;
    r.l5.forEach((c,j)=>{const col=c==='W'?UP:DN;s+=`<rect x="${f1(px+j*l5w)}" y="${f1(y2-s2*.52)}" width="${f1(l5w*.86)}" height="${f1(s2*1.04)}" rx="${f1(s2*.12)}" fill="none" stroke="${col}" stroke-width="${f1(s2*.09)}"/>`+T(px+j*l5w+l5w*.43,y2,s2*.78,c,{c:col})});
  });
  if(g.foot){const [fx0,fy0,fx1,fy1]=g.foot,t=`Ranked by season P&L · $100K on every trade · No. 5? In tryouts: ${TRY.join(', ')}`;s+=T(X((fx0+fx1)/2),Y((fy0+fy1)/2),fit(Y(fy1-fy0)*.34,t,X(fx1-fx0)*.92,'b'),t,{f:'b',c:CR,ls:1})}
  return `<svg class="m14-svg" viewBox="0 0 ${Wd} ${Hd}" aria-hidden="true"><defs>${df}<radialGradient id="${id}vg" cx="50%" cy="40%" r="75%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>${s}${s0}${vs0}</svg>`}

W.__M14G={G2,G3,G4};
W.__M14=function(take){const sec=D.querySelector('section.c8');if(!sec)return false;const de=D.documentElement;de.classList.add('m14-on','m14-'+take);
  sec.querySelectorAll('.c8-one').forEach(o=>{const b=o.querySelector('.c8-bal span');if(b)QUOTE[o.dataset.m]=b.textContent.trim()});
  const keep=take==='v1'?[...sec.querySelectorAll(':scope>h2.ch-h,:scope>p.ch-sub')]:[];
  [...sec.children].forEach(c=>{if(!c.classList.contains('m14')&&!keep.includes(c)&&c.tagName!=='svg'&&!c.classList.contains('ch-sr'))c.style.display='none'});
  let host=sec.querySelector(':scope>.m14');if(!host){host=D.createElement('div');host.className='m14';sec.appendChild(host)}
  const wide=matchMedia('(min-width:900px)').matches,R=rows();host.className='m14 m14-'+take+(wide?' m14-wide':'');
  host.innerHTML=({v1,v2,v3,v4})[take](R,wide)+sr(R);return true};
})();
