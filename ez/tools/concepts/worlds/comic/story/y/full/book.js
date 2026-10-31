/* Round FULL (2026-10-31): the X3+ Overview as one comic book you scroll.
   Laid over the built page after C2 (base/, the cover's page of panels) and DT (dtlib.js, the detail toolkit). Every word and number is
   the page's own (the globals ROUNDS, MODELS, __x2pPnl, and what the page's scripts already wrote); nothing is typed here.
   - the page is the comic's paper; each section is a panel whose ground is drawn once as an image (DT.groundURI);
   - the cuts between sections: a page turn after the splash cover, caption gutters ("And every round is on the record..."), a tear
     before the big question, a diagonal gutter before the bet, "To be continued..." and a page turn to the back cover;
   - every headline, number and sound word is lettered glyph by glyph (DT.lw); every small element (pills, tags, captions, chips,
     stat boxes, last-5 squares, buttons, tabs, stubs, rings, flag patches, card and tile edges) gets a hand-drawn skin (skin()).
   Static art is drawn once (and again only when the width changes); nothing new loops. Prefix cb-. */
(function(){
const X=window.DT,P=window.POP,S=window.SE,D=document,H=D.documentElement,INK=X.INK,f1=X.f1;
const book=D.getElementById('wc-book');if(!X||!book){H.classList.add('cb-ready');return}
H.classList.add('cb-on','cb-t-'+CBT.TAKE);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NO=String(window.__cbNo||'').split(',');const off=k=>NO.includes(k);
const desk=()=>innerWidth>=1000;
const hs=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h%9973+1};
const rel=(el,root)=>{const a=el.getBoundingClientRect(),b=root.getBoundingClientRect();return {x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}};
const holesOf=(root,sel)=>[...root.querySelectorAll(sel)].filter(e=>e.offsetParent&&e.offsetWidth>20).map(e=>rel(e,root));
const NM={GPT:'GPT',KIMI:'KIMI',CLAUDE:'CLAUDE',GROK:'GROK'};
const pm=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');

/* ---------- lettering: painted once onto canvases (canv.js) ---------- */
const LW=(t,o,ex)=>CV.lw(t,Object.assign({jr:5,jb:.05,js:.05,seed:hs(t)},o),ex);
const multi=(parts,o)=>CV.multi(parts.map(p=>Object.assign({},p,{o:Object.assign({seed:hs(p.t)},p.o||{})})),Object.assign({jr:5,jb:.05,js:.05},o));
/* a title: drawn shapes (one small svg) under lettered words placed on it */
function art(w,h,shapes,words,cls){const d=D.createElement('div');d.className='cb-art '+(cls||'');d.setAttribute('aria-hidden','true');d.style.width=f1(w)+'px';d.style.height=f1(h)+'px';d.innerHTML=shapes?X.svg(w,h,shapes):'';
  words.forEach(([r,x,y])=>{r.el.style.left=f1(x)+'px';r.el.style.top=f1(y)+'px';d.appendChild(r.el)});return d}
const put=(host,r)=>{if(host)host.replaceChildren(r.el);return r};

/* ---------- skins: a handmade box behind an element's own text, in the take's way (takes.js) ---------- */
const skinURI=(w,h,o)=>CBT.skinURI(w,h,o);
/* inner lettering: calmer than a headline, never extruded (takes.js) */
const IL=(t,o)=>CV.il(t,Object.assign({seed:hs(t)},o));
/* the largest inner-lettering size (<= s) that fits maxW */
function fitIL(t,s,maxW,o){for(let i=0;i<16;i++){if(CV.ilW(t,Object.assign({},o||{},{size:s}))<=maxW)return s;s*=.94}return s}
/* put a skin on an element: its own border, background and shadow go; a pseudo-element carries the drawing behind the text */
function skin(el,o){if(!el||!el.offsetWidth||off('skin')||o.frame&&off('frame'))return;const cs=getComputedStyle(el),bl=parseFloat(cs.borderLeftWidth)||0,bt=parseFloat(cs.borderTopWidth)||0;
  const w=Math.round(el.offsetWidth),h=Math.round(el.offsetHeight);if(w<6||h<6)return;const dr=o.drop!=null?o.drop:3;
  if(cs.position==='static')el.style.position='relative';
  el.classList.add(o.frame?'cb-skf':'cb-sk');el.style.setProperty('--skl',(-bl)+'px');el.style.setProperty('--skt',(-bt)+'px');el.style.setProperty('--skw',(w+dr)+'px');el.style.setProperty('--skh',(h+dr)+'px');
  if(o.frame){el._cbr={u:skinURI(w,h,o),w:w+dr,h:h+dr};el.style.setProperty('--sk',skinURI(w,h,Object.assign({},o,{droponly:1})));bg(el)}
  else el.style.setProperty('--sk',skinURI(w,h,o))}
/* an element's background: its frame ring (drawn in its own border area, so nothing above it is forced onto a layer) over its ground */
function bg(el){const L=[],S=[];if(el._cbr){L.push(el._cbr.u);S.push(el._cbr.w+'px '+el._cbr.h+'px')}if(el._cbg){L.push(el._cbg.u);S.push(el._cbg.w+'px '+el._cbg.h+'px')}if(!L.length)return;
  el.style.setProperty('background-image',L.join(','),'important');el.style.setProperty('background-size',S.join(','),'important');el.style.setProperty('background-position','0 0','important');
  el.style.setProperty('background-origin','border-box','important');el.style.setProperty('background-clip','border-box','important');el.style.setProperty('background-repeat','no-repeat','important')}

/* ---------- panel grounds ---------- */
const GR={orange:['#ffc066','#ff7a12','#e0480a','rgba(255,232,170,.2)','#b52d00'],blue:['#a9d6ff','#3a8bff','#1446c8','rgba(220,240,255,.18)','#0e2f99'],
  purple:['#e0b4ff','#9a4cf0','#4b16a8','rgba(255,230,255,.14)','#2c0a6e'],nv:['#ddff9a','#86d91f','#3f8a00','rgba(250,255,215,.2)','#2a5e00'],red:['#ff9a8a','#ff3a31','#b3120b','rgba(255,220,200,.16)','#7a0905'],
  navy:['#3a4aa8','#1d2670','#0c1036','rgba(200,210,255,.08)','#050720'],chip:['#4f8a22','#22541a','#0b2410','rgba(220,255,200,.1)','#051a07'],
  mh:['#ffa284','#ff3d31','#c8120c','rgba(255,215,190,.24)','#8a0a05'],p1:['#b4ddff','#4ea6ff','#1c5ed2','rgba(200,235,255,.26)','#123f9c'],
  p2:['#fffbc0','#ffe02a','#ffa400','rgba(255,255,225,.35)','#ff8a00'],p3:['#efc2ff','#a64cff','#5a14c4','rgba(255,225,255,.22)','#3d0a8a'],p4:['#d0ffb0','#46de7e','#0f9a50','rgba(225,255,215,.25)','#06632f'],
  fm:['#c8ffd8','#3fd48a','#0b8a48','rgba(225,255,235,.2)','#05602f']};
function ground(el,f){if(off('ground'))return;const W=Math.round(el.offsetWidth),Hh=Math.round(el.offsetHeight);if(!W||!Hh)return;const o=f(W,Hh);el.classList.add('cb-pn');
  el._cbg={u:X.groundURI(W,Hh,o),w:W,h:Hh};bg(el);if(o.clip&&!off('clip'))el.style.clipPath=o.clip}
const polyPx=p=>`polygon(${p.map(q=>f1(q[0])+'px '+f1(q[1])+'px').join(',')})`;

/* ================= the cover ================= */
function cover(){const root=D.querySelector('.cvx.c2');if(!root)return;const pg=root.querySelector('.c2-pg');if(!pg)return;
  const dk=root.clientWidth>=900,kk=dk?1:Math.min(1,root.clientWidth/360);
  /* grounds: each panel its own colour, the light at its subject, its contour along its own cut */
  const panels=[['mh',root.querySelector('.c2-mh')],...[1,2,3,4].map(i=>['p'+i,root.querySelector('.c2-p'+i)]),['fm',root.querySelector('.c2-fm')]];
  /* the headline, glyph by glyph */
  const h1=root.querySelector('.cvx-h1'),tw=root.querySelector('.c2-t');
  if(h1&&tw&&!off('cvh')){const W=tw.clientWidth,bal=root.querySelector('.c2-bal');
    h1.querySelectorAll(':scope > :not(.cb-hl)').forEach(n=>n.style.display='none');h1.querySelectorAll('.cb-hl').forEach(n=>n.remove());
    /* "Who calls it best?": a white shout balloon with shading, lettered in blue */
    let bw=0,bh=0;if(bal){const s=dk?24:Math.max(15,17*kk);const a=LW('WHO CALLS',{size:s,fill:'blue',jr:4,jb:.05,depth:2,drop:2,key:1.2,out:1.7,nodots:true}),b=LW('IT BEST?',{size:s*1.08,fill:'blue',jr:5,jb:.06,depth:2,drop:2,key:1.2,out:1.7,nodots:true});
      bw=Math.max(a.w,b.w)+30;bh=a.h+b.h+14;const cx=bw/2,cy=bh/2;
      bal.replaceChildren(art(bw,bh+14,X.cloud(cx,cy,bw/2-6,bh/2-7,{seed:6,n:10,shade:'#c9d8f2',ow:2.6,drop:3,trail:[bw*.2,bh+8]}),[[a,cx-a.w/2,cy-a.h+5],[b,cx-b.w/2,cy-4]],'cb-bal'));bal.style.right=dk?'6px':'-2px';bal.style.top=dk?'2px':'-4px'}
    const room=W-(dk?bw+10:bw+4);
    const s2=X.fitw('EARNINGS',{size:dk?76:62,seed:5,grow:.1},W-4);let s1=s2*.86;
    for(let i=0;i<14;i++){const w1=X.layout('4 AIs',{size:s1*.6,sizes:[1,1,1,1,.74]}).tot+12+X.layout('TRADE',{size:s1,grow:.08}).tot+s1*.34;if(w1<=room)break;s1*=.95}
    const a={size:s1*.6,fill:'white',seed:3,jr:5,jb:.05,sizes:[1,1,1,1,.74],depth:3,dot:'#9ab'},t={size:s1,fill:'yellow',seed:8,jr:6,jb:.06,grow:.08,depth:Math.round(s1*.11),dot:'#ff6a0a',dotTo:'br'};
    const wa=X.layout('4 AIs',a).tot,wt=X.layout('TRADE',t).tot,we=X.layout('EARNINGS',{size:s2,seed:5,grow:.1}).tot;
    const y1=s1*1.0+6+(dk?0:Math.max(0,bh-s1*1.05-10)),y2=y1+s2*.98,hh=y2+s2*.34+8;
    const r=CV.paint(W,hh,g=>{CV.word(g,'4 AIs',Object.assign({x:8+wa/2,y:y1,rot:-4},a));CV.word(g,'TRADE',Object.assign({x:8+wa+12+wt/2,y:y1,rot:-4},t));
      CV.word(g,'EARNINGS',{x:6+we/2,y:y2,size:s2,fill:'yellow',seed:5,jr:6,jb:.06,grow:.1,rot:-3,depth:Math.round(s2*.11),dot:'#ff6a0a',dotTo:'br'})});
    const sp=D.createElement('span');sp.className='cb-hl';sp.appendChild(r.el);h1.appendChild(sp)}
  /* sound words */
  /* the sound words inside the panels are inner elements too: lettered in the take's way, calmer than the headline */
  const sf=(sel,txt,o)=>{const el=root.querySelector(sel);if(!el)return;put(el,IL(txt,o));el.classList.add('cb-sfx')};
  sf('.c2-ding','DING!',{size:dk?30:22*kk,fill:'red',rot:-10,jr:7,jb:.07});
  sf('.c2-filed','FILED!',{size:dk?30:22*kk,fill:'pink',rot:6,jr:6,jb:.06});
  const mv=root.querySelector('.c2-mv');if(mv){const L=window.ROUNDS[window.ROUNDS.length-1],up=L.a>0;put(mv,IL((up?'▲':'▼')+Math.abs(L.a).toFixed(2)+'%',{size:dk?28:22,fill:up?'green':'red',rot:-4}))}
  const fb=root.querySelector('.c2-file b');if(fb){put(fb,IL('No. '+window.ROUNDS.length,{size:dk?24:17*kk,fill:'white',rot:-3}))}
  /* the golden ticket's name and P&L: the holo ticket keeps its foil, its words lettered */
  root.querySelectorAll('.cvx-tkt > svg.pp-ext, .cvx-tkp > svg.pp-ext').forEach(sv=>{const t=(sv.querySelector('text')||sv).textContent.trim(),pnl=!!sv.closest('.cvx-tkp');const h=parseFloat(sv.getAttribute('height'))||20,wd=parseFloat(sv.getAttribute('width'))||60;sv.replaceWith(IL(t,{size:fitIL(t,h*(pnl?.56:.66),wd+2),fill:pnl?'green':'white'}).el)});
  /* small elements: the issue strip, step captions and their numbers, the call pills, pass and fail, the logo ring, the film's tag, the hand-off */
  if(!off('cvs'))root.querySelectorAll('.c2-cap').forEach((c,i)=>{skin(c,{pal:'yellow',drop:0,ow:0,key:0,band:true,seed:40+i});const b=c.querySelector(':scope > b');skin(b,{pal:'red',kind:'circle',drop:2,ow:2,key:1,seed:50+i,dots:false})});
  root.querySelectorAll('.c2-b').forEach((b,i)=>skin(b,{pal:b.classList.contains('c2-bu')?'green':'red',kind:'pill',drop:2.5,ow:2.4,seed:60+i}));
  root.querySelectorAll('.cvx-pf').forEach((b,i)=>skin(b,{pal:b.classList.contains('cvx-pass')?'green':'red',drop:2,ow:2,key:1,seed:70+i,dots:false}));
  skin(root.querySelector('.c2-iss'),{pal:'black',drop:3,ow:2.2,key:1,seed:81,dots:false});
  skin(root.querySelector('.c2-lg'),{pal:'white',kind:'circle',drop:3,ow:3,key:1.4,seed:82});
  skin(root.querySelector('.c2-fl'),{pal:'yellow',drop:3,ow:2.6,seed:83});
  root.querySelectorAll('.cvx-nx').forEach((b,i)=>skin(b,{pal:'yellow',drop:4,ow:2.8,seed:84+i}));
  root.querySelectorAll('.c2-cast .pp-coin,.c2-say .pp-coin,.c2-pfs .pp-coin').forEach((c,i)=>coinRing(c,90+i));
  /* the grounds last, at the panels' final size */
  for(const [k,el] of panels){if(!el||off('cvg'))continue;const W=el.offsetWidth,Hh=el.offsetHeight,w=W;
    const q={p1:[[0,0],[.64*w-4,0],[.58*w-4,Hh],[0,Hh]],p2:[[.64*w+4,0],[w,0],[w,Hh],[.58*w+4,Hh]],p3:[[0,0],[.43*w-4,0],[.49*w-4,Hh],[0,Hh]],p4:[[.43*w+4,0],[w,0],[w,Hh],[.49*w+4,Hh]]}[k]||[[0,0],[w,0],[w,Hh],[0,Hh]];
    const xs=q.map(p=>p[0]),x0=Math.min(...xs),x1=Math.max(...xs);const cx=k==='mh'?W*.42:k==='fm'?W*.5:x0+(x1-x0)*({p1:.48,p2:.62,p3:.5,p4:.55}[k]),cy=k==='mh'?Hh*.6:k==='fm'?Hh*.5:Hh*.58;
    el.style.backgroundImage=X.groundURI(W,Hh,{c:GR[k],cx,cy,seed:hs(k),sp:k==='mh'?7.5:6.6,n:28,poly:q,bw:8,r0:Math.min(x1-x0,Hh)*.18,r1:Math.hypot(x1-x0,Hh)*.62,
      holes:k==='fm'?holesOf(el,'.wc-film-slot'):[],
      speed:{r0:k==='mh'?Math.min(W,Hh)*.42:Math.min(x1-x0,Hh)*.36,n:k==='mh'?44:26,l0:10,l1:k==='mh'?100:60,w0:1,w1:k==='mh'?5:3.6,seed:hs(k+'s'),col:k==='p2'?'#c3140c':INK,op:k==='p2'?.6:.6}});
    el.style.backgroundSize=W+'px '+Hh+'px'}
  /* the overlay: what breaks the borders (stars across the gutters, bolts, MINE! across the cut into the record) */
  const PR=pg.getBoundingClientRect(),R=el=>{const b=el.getBoundingClientRect();return {x:b.left-PR.left,y:b.top-PR.top,w:b.width,h:b.height}};
  const ra=root.querySelector('.c2-ra'),rb=root.querySelector('.c2-rb'),mh=root.querySelector('.c2-mh');let ov='';const bits=[];
  const bit=(x,y,w,h,inner)=>bits.push(`<i class="cb-bit" aria-hidden="true" style="left:${f1(x-w/2)}px;top:${f1(y-h/2)}px">${X.svg(w,h,`<g transform="translate(${f1(w/2-x)} ${f1(h/2-y)})">${inner}</g>`)}</i>`);
  if(ra&&rb&&mh){const A=R(ra),B=R(rb),M=R(mh),w=A.w;
    const s1=dk?15:12,s2=dk?13:10,s3=dk?11:8;bit(A.x+.64*w,A.y-4,s1*2+8,s1*2+8,X.star(A.x+.64*w,A.y-4,s1,{rot:-10}));bit(A.x+2,A.y+A.h*.52,s2*2+8,s2*2+8,X.star(A.x+2,A.y+A.h*.52,s2,{rot:12}));bit(A.x+w-2,B.y-4,s3*2+8,s3*2+8,X.star(A.x+w-2,B.y-4,s3,{rot:-20}));
    const k1=dk?1:.78,k2=dk?.9:.7;bit(A.x+.585*w+8*k1,A.y+A.h*.42+20*k1,40,60,X.bolt(A.x+.585*w,A.y+A.h*.42,k1,14));bit(M.x+M.w-24+8*k2,M.y+M.h-30+20*k2,40,60,X.bolt(M.x+M.w-24,M.y+M.h-30,k2,-24));
    const mine=root.querySelector('.c2-mine');if(mine){const r=IL('MINE!',{size:dk?32:24*kk,fill:'gold',rot:-9,jr:7,jb:.07});
      r.el.classList.add('cb-bit');r.el.style.left=f1(B.x+.03*w)+'px';r.el.style.top=f1(B.y+B.h-r.h*.6)+'px';var mineEl=r.el}}
  pg.querySelectorAll(':scope > .cb-bit').forEach(n=>n.remove());if(!off('cvb')){pg.insertAdjacentHTML('beforeend',bits.join(''));if(typeof mineEl!=='undefined')pg.appendChild(mineEl)}}

/* a model's coin: a hand-drawn ring (thick ink, white keyline, lit disc, a stepped drop); the leader's holo keeps its foil */
function coinRing(c,seed){if(!c||!c.offsetWidth||c.classList.contains('pp-holo'))return;const w=c.offsetWidth;c.style.boxShadow='none';
  if(c.classList.contains('pp-holo'))return;
  c.style.background='transparent';c.style.border='0';skin(c,{pal:'white',kind:'circle',drop:Math.max(2,Math.round(w*.07)),ow:Math.max(2,w*.06),key:Math.max(1,w*.03),seed,band:false})}

/* ================= Meet the models ================= */
function chars(){const sec=D.querySelector('#wc-book .wc-chars');if(!sec||!sec.querySelector('.pp1-c'))return;const dk=desk(),W=sec.clientWidth-24;
  /* title: MEET THE / MODELS, lettered, on a jagged burst with a bolt; the tag on a caption box */
  sec.querySelectorAll(':scope > .cb-ttl').forEach(n=>n.remove());
  const t1=LW('MEET THE',{size:Math.min(dk?52:42,W*.12),fill:'yellow',jr:6,jb:.06,rot:-3,depth:4,dot:'#ff6a0a',dotTo:'br'}),
    t2=LW('MODELS',{size:X.fitw('MODELS',{size:dk?110:80},Math.min(W*.82,dk?520:W)),fill:'red',jr:6,jb:.07,grow:.12,rot:-3,depth:6,dot:'#8a0a05',dotTo:'br'});
  const bw=Math.max(t1.w,t2.w)+40,bh=t1.h+t2.h+16;
  let g=X.burst(bw*.5,bh*.56,bh*.5,bh*.78,15,21,{c:['#ffd21f','#fff7c2'],ks:[.78],drop:5,ow:3.4,sx:bw/bh*.62,sy:.8,shade:'#ffd96a'});
  g+=X.speed(bw*.5,bh*.56,bh*.62,{n:30,l0:8,l1:40,w0:1,w1:3.2,col:INK,op:.75,seed:7});
  g+=X.bolt(bw-30,bh*.18,.9,18)+X.star(bw-14,bh*.82,10,{rot:14});
  const ttl=D.createElement('div');ttl.className='cb-ttl';ttl.setAttribute('aria-hidden','true');
  const tag=(sec.querySelector('.pp1-tag')||{}).innerHTML||'';
  ttl.appendChild(art(bw,bh,g,[[t1,14,4],[t2,(bw-t2.w)/2+8,t1.h-6]],'cb-brk'));ttl.insertAdjacentHTML('beforeend',`<p class="cb-tag">${tag}</p>`);
  sec.insertBefore(ttl,sec.querySelector('.pp1-grid'));
  skin(ttl.querySelector('.cb-tag'),{pal:'yellow',drop:3,ow:2.4,seed:5});
  /* the cards */
  const Dd=P.data();
  sec.querySelectorAll('.pp1-c').forEach((c,i)=>{const x=Dd.models[i];if(!x)return;const cw=c.querySelector('.pp1-cap').clientWidth,top=c.querySelector('.pp1-top').clientWidth,sm=cw<240,stack=dk;
    put(c.querySelector('.pp1-rk'),IL('#'+(i+1),{size:sm?27:31,fill:i===0?'gold':'cream'}));
    const ad=c.querySelector('.pp1-adm');if(ad)put(ad,IL(i===0?'GOLDEN TICKET':'SEASON 1',{size:sm?13:15,fill:i===0?'gold':'cream',jr:1,jb:.01}));
    const nmax=stack?top-6:Math.min(top*.56,top-10);
    const nmS=fitIL(x.name.toUpperCase(),stack?50:(sm?36:42),nmax);put(c.querySelector('.pp1-name'),IL(x.name.toUpperCase(),{size:nmS,fill:x.m}));
    const up=x.pnl>=0,plv=c.querySelector('.pp1-plv');const pl=IL(pm(x.pnl),{size:fitIL(pm(x.pnl),sm?40:46,cw-26),fill:up?'green':'red'});
    put(plv,pl);odometer(pl,pm(x.pnl),'cb-'+x.m);
    put(c.querySelector('.pp1-rwv'),IL(`${x.W}/${x.tot}`,{size:sm?25:29,fill:'yellow'}));
    const be=c.querySelector('.pp1-best'),bs=be&&be.querySelector('svg.pp-ext,canvas.cb-bv');if(bs){const b=x.best,bu=b.v>=0;bs.replaceWith(IL(pm(b.v),{size:fitIL(pm(b.v),sm?21:25,(be.clientWidth||120)-16),fill:bu?'green':'red',cls:'cb-bv'}).el)}
    /* small elements */
    skin(c.querySelector('.pp1-cap'),{pal:'yellow',drop:5,ow:3,key:1.5,seed:100+i,dop:.5});
    skin(c.querySelector('.pp1-rw'),{pal:'blue',drop:3,ow:2.4,seed:110+i});
    skin(be,{pal:'pink',drop:3,ow:2.4,seed:120+i});
    c.querySelectorAll('.pp1-t').forEach((q,j)=>skin(q,{pal:q.classList.contains('pp1-tw')?'green':'red',drop:3,ow:2.2,key:1,seed:130+j+i*5,dots:true}));
    const ch=c.querySelector('.pp1-chip');if(ch)skin(ch,{pal:ch.classList.contains('pp1-chipg')?'gold':ch.classList.contains('pp1-chipr')?'red':'black',drop:3,ow:2.2,key:1,seed:150+i,dots:false});
    const fp=c.querySelector('.fb-patch');if(fp){fp.style.border='0';fp.style.boxShadow='none';skin(fp,{frame:1,ow:2.4,key:1,drop:3,seed:160+i})}
    coinRing(c.querySelector('.pp1-coin .pp-coin'),170+i);
    /* the card's edge: a hand-drawn ring with a ticket's notches at the stub's perforation */
    c.style.borderColor='transparent';c.style.boxShadow='none';skin(c,{frame:1,ow:3.6,key:1.4,drop:6,seed:180+i,wob:.6});
    perf(c)});
  /* the module's ground: orange, the light behind the title, halftone growing down and out, ink lines round the title */
  const tr=rel(ttl.querySelector('.cb-art'),sec);
  ground(sec,(W,Hh)=>({c:GR.orange,cx:tr.x+tr.w*.5,cy:tr.y+tr.h*.55,gr:Math.max(W,Hh*.5),r0:Math.min(W,Hh)*.25,r1:Math.max(W,700),seed:11,sp:8,n:30,bw:8,holes:holesOf(sec,'.pp1-c'),
    speed:{r0:tr.h*.62,n:34,l0:14,l1:70,w0:1,w1:4.2,seed:12,op:.55}}))}
/* a ticket's perforation: half-round notches top and bottom where the stub tears off, the dashes hand-drawn */
function perf(c){const st=c.querySelector('.pp1-stub');if(!st||!st.offsetWidth)return;const h=st.offsetHeight,x=st.offsetWidth;const r=X.rng(hs(c.dataset.m||'p'));
  /* the tear line drawn into the stub itself: hand-inked dashes down its right edge, half-round punched notches top and bottom */
  let d='';for(let y=9;y<h-9;y+=9){const l=4+r()*2;d+=`M${f1(x-2+(r()-.5)*.8)} ${f1(y)}l${f1((r()-.5)*.6)} ${f1(l)}`}
  const n=`<path d="${d}" stroke="${INK}" stroke-width="2.3" stroke-linecap="round"/><circle cx="${x}" cy="0" r="6.5" fill="#fffdf6" stroke="${INK}" stroke-width="2.6"/><circle cx="${x}" cy="${h}" r="6.5" fill="#fffdf6" stroke="${INK}" stroke-width="2.6"/>`;
  const u=X.uri(x,h,n),cur=getComputedStyle(st).backgroundImage;st.style.setProperty('background-image',u+(cur&&cur!=='none'&&!st._cbp?','+cur:st._cbp?','+st._cbp:''),'important');if(!st._cbp)st._cbp=cur;
  st.style.setProperty('border-right-color','transparent','important')}
/* the P&L counts up once in view, digit by digit like a rolling counter (the money accruing); the layout never moves */
const counted={};
function odometer(r,fin,key){if(!r||!r.el||RM||counted[key]||!window.IntersectionObserver)return;const n=fin.length;
  const io=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;io.disconnect();counted[key]=1;const t0=performance.now(),T=1200;let lastF=-1;
    const f=t=>{const k=Math.min(1,(t-t0)/T),fr=Math.floor(t/45);if(fr!==lastF&&k<1){lastF=fr;r.redraw([...fin].map((g,j)=>/\d/.test(g)&&k<(.25+.7*j/n)?String((fr+j)%10):g).join(''))}
      if(k<1&&r.el.isConnected)requestAnimationFrame(f);else r.redraw(fin)};requestAnimationFrame(f)},{threshold:.5});io.observe(r.el)}

/* ================= Every round so far ================= */
function season(){const sec=D.querySelector('#wc-book .wc-season');if(!sec||!sec.querySelector('.pp1-stb'))return;const dk=desk(),W=sec.clientWidth-24;
  sec.querySelectorAll(':scope > .cb-ttl').forEach(n=>n.remove());
  const t1=LW('EVERY ROUND',{size:X.fitw('EVERY ROUND',{size:dk?56:46},W*.86),fill:'yellow',jr:5,jb:.06,rot:-3,depth:5,dot:'#ff6a0a',dotTo:'br'}),
    t2=LW('SO FAR',{size:Math.min(dk?84:66,W*.2),fill:'pink',jr:7,jb:.07,grow:.12,rot:-3,depth:6,dot:'#6b0626',dotTo:'br'});
  const ttl=D.createElement('div');ttl.className='cb-ttl';ttl.setAttribute('aria-hidden','true');const tag=(sec.querySelector('.pp1-tag')||{}).innerHTML||'';
  const bw=Math.max(t1.w,t2.w+20),bh=t1.h+t2.h-34;
  ttl.appendChild(art(bw,bh,'',[[t1,0,0],[t2,18,t1.h-34]],'cb-brk'));ttl.insertAdjacentHTML('beforeend',`<p class="cb-tag">${tag}</p>`);
  sec.insertBefore(ttl,sec.querySelector('.wc-bis'));skin(ttl.querySelector('.cb-tag'),{pal:'yellow',drop:3,ow:2.4,seed:6});
  tiles();
  const mb=sec.querySelector('.wc-more');if(mb){mb.style.boxShadow='none';skin(mb,{pal:'gold',drop:6,ow:3,key:1.5,seed:7})}
  const tr=rel(ttl.querySelector('.cb-art'),sec);
  ground(sec,(W,Hh)=>({c:GR.blue,cx:tr.x+tr.w*.4,cy:tr.y+tr.h*.5,gr:Math.max(W,Hh*.6),r0:Math.min(W,Hh)*.22,r1:Math.max(W,600),seed:13,sp:8,n:30,bw:8,holes:holesOf(sec,'.wc-bi'),
    speed:{r0:tr.h*.6,n:26,l0:12,l1:60,w0:1,w1:3.6,seed:14,op:.5,a0:-.4,a1:Math.PI*.9}}))}
let stubUp=null,stubDn=null;
function tiles(){const sec=D.querySelector('#wc-book .wc-season');if(!sec)return;const RR={};window.ROUNDS.forEach(r=>RR[r.n]=r);
  sec.querySelectorAll('.pp1-stb').forEach(s=>{if(!s.offsetParent||!s.querySelector('.pp1-mv svg,.pp1-mv canvas'))return;const r=RR[s.dataset.n];if(!r)return;const first=s.dataset.cb!=='1';s.dataset.cb='1';const up=r.a>0,w=s.clientWidth,sm=w<150,xs=w<110;
    /* the stub's ground: green or red rays from the move, halftone growing to the foot (one image each, scaled) */
    if(!stubUp){stubUp=X.groundURI(130,120,{c:['#8dffc0','#1fd47a','#0b9a52','rgba(230,255,240,.22)','#05703a'],cx:65,cy:38,seed:3,sp:6,n:22,poly:false,r0:18,r1:110});
      stubDn=X.groundURI(130,120,{c:['#ffb3a6','#ff4d40','#c3140c','rgba(255,230,225,.2)','#8a0a05'],cx:65,cy:38,seed:4,sp:6,n:22,poly:false,r0:18,r1:110})}
    s.style.backgroundImage=up?stubUp:stubDn;
    if(first)put(s.querySelector('.pp1-mv'),IL((up?'+':'−')+Math.abs(r.a).toFixed(2)+'%',{size:fitIL('+00.00%',sm?26:31,w-10),fill:'white',seed:r.n}));
    if(first)put(s.querySelector('.pp1-no'),IL('#'+r.n,{size:xs?15:sm?17:21,fill:CBT.TAKE==='cut'?'cream':'gold',seed:r.n+1}));
    if(first)s.querySelectorAll('.pp1-won > svg.pp-ext').forEach(sv=>{const t=(sv.querySelector('text')||sv).textContent.trim();sv.replaceWith(IL(t,{size:xs?11:sm?12.5:14,fill:'cream',font:'Bangers',jr:1,jb:.01}).el)});
    skin(s.querySelector('.pp1-co'),{pal:'yellow',drop:2,ow:2,key:1,seed:r.n+3,dots:false});
    s.querySelectorAll('.pp-coin').forEach((c,j)=>coinRing(c,r.n*7+j));
    const nob=s.querySelector('.pp1-nob');if(nob){nob.style.boxShadow='none';nob.style.border='0';nob.style.background='transparent';skin(nob,{pal:'red',kind:'circle',drop:2,ow:2,key:1,seed:r.n,dots:false})}
    const a=s.closest('.wc-bi');if(a){a.style.borderColor='transparent';a.style.boxShadow='none';skin(a,{frame:1,ow:3.2,key:1.2,drop:5,seed:r.n+9,wob:.55})}})}

/* ================= tonight at the close (a panel, when there are rounds) ================= */
function cliff(){const sec=D.querySelector('#wc-book > .wc-cliff');if(!sec)return;
  sec.querySelectorAll('.wc-tnp').forEach((t,i)=>{t.style.boxShadow='none';skin(t,{frame:1,ow:3,key:1.2,drop:5,seed:300+i})});
  ground(sec,(W,Hh)=>({c:GR.purple,cx:W*.3,cy:40,seed:31,sp:8,n:26,bw:8,holes:holesOf(sec,'.wc-tnp'),r0:60,r1:Math.max(W,Hh)}))}

/* ================= Smart or lucky ================= */
function splash(){const sec=D.querySelector('#wc-book > .wc-splash');if(!sec)return;const dk=desk();let W=sec.clientWidth-24;
  const bur=sec.querySelector('.wc-burst');if(bur){if(dk)W=Math.min(W,(sec.querySelector('.wc-sp-lead')||bur).clientWidth+20);const h2=bur.querySelector('h2');if(h2)h2.classList.add('cb-sr');bur.querySelectorAll('.cb-ttl').forEach(n=>n.remove());
    const t1=LW('SMART OR',{size:Math.min(dk?56:46,W*.13),fill:'yellow',jr:6,jb:.06,rot:-4,depth:5,dot:'#ff6a0a',dotTo:'br'}),
      t2=LW('LUCKY?',{size:Math.min(dk?84:72,W*.21),fill:'yellow',jr:8,jb:.08,grow:.16,rot:-4,depth:6,dot:'#e0140c',dotTo:'br'});
    const bw=Math.min(W,Math.max(t1.w,t2.w)+70),bh=t1.h+t2.h+20,cx=bw/2,cy=bh*.52;
    let g=X.burst(cx,cy,bh*.44,bh*.7,16,31,{c:['#ff3a31','#ff8a1f','#ffd21f'],ks:[.82,.62],drop:5,ow:3.4,sx:bw/bh*.6,sy:.82});
    g+=X.bolt(14,bh*.2,.85,-18)+X.bolt(bw-22,bh*.62,.8,22)+X.star(bw-30,14,9,{rot:-10})+X.star(26,bh-16,8,{rot:18});
    const tt0=D.createElement('div');tt0.className='cb-ttl';tt0.setAttribute('aria-hidden','true');tt0.appendChild(art(bw,bh,g,[[t1,cx-t1.w/2-12,8],[t2,cx-t2.w/2+8,t1.h-4]],'cb-brk'));bur.appendChild(tt0)}
  const lead=sec.querySelector('.wc-sp-lead');if(lead){lead.style.boxShadow='none';lead.style.borderColor='transparent';lead.style.background='transparent';skin(lead,{pal:'yellow',drop:4,ow:2.8,seed:41})}
  /* the chart: a night panel; every line cased in ink with a cream keyline, like inked lettering */
  const fig=sec.querySelector('.wc10-ch');if(fig){const sv=fig.querySelector('.wc10-cv svg');if(sv&&!off('case')&&!sv.querySelector('.cb-case')){[...sv.querySelectorAll('path.wc10-l')].forEach(p=>{const a=p.cloneNode(),b=p.cloneNode();a.setAttribute('class','wc10-l cb-case');b.setAttribute('class','wc10-l cb-key');a.removeAttribute('style');b.removeAttribute('style');p.before(a);p.before(b)})}
    const cap=fig.querySelector('.wc10-cap');if(cap){cap.style.boxShadow='none';cap.style.borderColor='transparent';cap.style.background='transparent';skin(cap,{pal:'yellow',drop:2,ow:2.2,key:1,seed:42,dots:false})}
    fig.querySelectorAll('.wc10-e .wc-face').forEach((f,i)=>{f.style.boxShadow='none'});
    ground(fig,(W,Hh)=>({c:GR.navy,cx:W*.5,cy:Hh*.45,seed:43,sp:7,n:24,poly:false,r0:W*.3,r1:Math.max(W,Hh)*.75,holes:holesOf(fig,'.wc10-cv')}))}
  /* the four AIs against the coin: each row on its own colour (the participants are the ground), its hit rate lettered */
  sec.querySelectorAll('.wc-cn').forEach((r,i)=>{const m=((r.querySelector('.wc-cn-n')||{}).textContent||'').trim().toUpperCase();
    const pal={GPT:['#7ff0c8','#10a37f','#06664d','rgba(220,255,240,.14)','#04402f'],CLAUDE:['#ffb58a','#e0602a','#8a3210','rgba(255,230,210,.14)','#5e1e06'],KIMI:['#8cbcff','#1a6bff','#0b3a9c','rgba(220,235,255,.14)','#082a70'],GROK:['#6a6474','#2a2530','#0d0b10','rgba(255,255,255,.07)','#000']}[m]||GR.navy;
    r.style.setProperty('--cb-t',(i%2?.6:-.6)+'deg');
    const pc=r.querySelector('.wc-cn-p');if(pc&&!pc.dataset.cb){pc.dataset.cb=1;const t=pc.textContent.trim();pc.setAttribute('aria-label',t);put(pc,IL(t,{size:dk?34:30,fill:'white',seed:hs(t)+i}))}
    const sm=r.querySelector('small');if(sm){sm.style.boxShadow='none';sm.style.border='0';sm.style.background='transparent';skin(sm,{pal:'yellow',drop:2,ow:2,key:1,seed:44+i,dots:false})}
    const fc=r.querySelector('.wc-face');if(fc){fc.style.boxShadow='none'}
    r.style.borderColor='transparent';r.style.boxShadow='none';
    ground(r,(W,Hh)=>({c:pal,cx:W*.12,cy:Hh*.4,seed:45+i,sp:6.5,n:18,poly:false,r0:W*.12,r1:W*.9}));skin(r,{frame:1,ow:3,key:1.2,drop:4,seed:46+i})});
  const cp=sec.querySelector('.wc-sp-cap');if(cp){cp.style.boxShadow='none';cp.style.borderColor='transparent';cp.style.background='transparent';skin(cp,{pal:'yellow',drop:4,ow:2.8,seed:47})}
  /* the panel: a tear across its top (the big question tears in), purple with ink lines round the title */
  const tt=sec.querySelector('.cb-ttl .cb-art'),tr=tt?rel(tt,sec):{x:0,y:0,w:200,h:120};
  const nb=sec.nextElementSibling&&sec.nextElementSibling.classList.contains('cb-gut')?sec.nextElementSibling.nextElementSibling:sec.nextElementSibling,slant=nb&&nb.classList.contains('wc-bet');
  ground(sec,(W,Hh)=>{const rg=X.ragged(W,77,4.5,6).map(([x,y])=>[x,10+y]),sl=slant?SL(W):0;const poly=[...rg,[W,Hh-sl],[0,Hh]];
    return {c:GR.purple,cx:tr.x+tr.w/2,cy:tr.y+tr.h/2,gr:Math.max(W,Hh*.5),r0:tr.h*.5,r1:Math.max(W,Hh*.8),seed:51,sp:8,n:32,bw:8,poly,holes:holesOf(sec,'.wc10-ch,.wc-cn'),
      speed:{r0:tr.h*.66,n:36,l0:14,l1:80,w0:1,w1:4.4,seed:52,op:.6},
      /* the torn edge: a strip of bare paper fibre just under the tear */
      extra:`<path d="M${rg.map(p=>f1(p[0])+' '+f1(p[1]+3)).join('L')}" fill="none" stroke="#fffdf6" stroke-width="4" stroke-opacity=".9"/><path d="M${rg.map(p=>f1(p[0])+' '+f1(p[1]+5.5)).join('L')}" fill="none" stroke="${INK}" stroke-width=".8" stroke-opacity=".5"/>`,
      clip:polyPx([[-60,rg[0][1]],...rg,[W+60,rg[rg.length-1][1]],[W+60,Hh-sl-sl*60/W],[-60,Hh+sl*60/W]])}})}
const SL=W=>Math.min(26,W*.06);
/* ================= the bet ================= */
function bet(){const sec=D.querySelector('#wc-book > .wc-bet');if(!sec)return;const dk=desk(),W=sec.clientWidth-24;
  const h2=sec.querySelector(':scope > h2.wc-h2');if(h2){h2.querySelectorAll('.cb-ttl').forEach(n=>n.remove());
    const t=multi([{t:'BET #1: ',o:{fill:'yellow',dot:'#ff6a0a'}},{t:'NVIDIA',o:{fill:'nv',dot:'#2a5e00'}}],{size:X.fitw('BET #1: NVIDIA',{size:dk?70:52},Math.min(W,dk?700:W)),jr:5,jb:.06,depth:5,rot:-3,dotTo:'br'});
    const sp=D.createElement('span');sp.className='cb-ttl';sp.setAttribute('aria-hidden','true');sp.style.display='block';sp.appendChild(t.el);h2.prepend(sp);
    const sm=h2.querySelector('small');if(sm){sm.style.boxShadow='none';sm.style.borderColor='transparent';sm.style.background='transparent';skin(sm,{pal:'yellow',drop:3,ow:2.4,seed:61})}}
  const cw=sec.querySelector('.wc-chipw');if(cw){const tk=cw.querySelector('.wc-tick');if(tk&&!tk.querySelector('.cb-cv'))tk.appendChild(IL('TICK… TOCK…',{size:dk?28:22,fill:'white',rot:-6,jr:6,jb:.06,cls:'cb-brk'}).el);
    cw.style.boxShadow='none';cw.style.borderColor='transparent';
    ground(cw,(W,Hh)=>({c:GR.chip,cx:W/2,cy:Hh/2,seed:62,sp:7,n:26,poly:false,r0:Math.min(W,Hh)*.45,r1:Math.max(W,Hh)*.8,holes:holesOf(cw,'.wc-chip'),speed:{r0:Math.min(W,Hh)*.46,n:40,l0:12,l1:60,w0:1,w1:3,col:'#d4ff8a',op:.35,seed:63}}));
    skin(cw,{frame:1,ow:3.6,key:1.4,drop:6,seed:64})}
  sec.querySelectorAll('.wc-bet-l .wc-cap').forEach((c,i)=>{c.style.boxShadow='none';c.style.borderColor='transparent';c.style.background='transparent';skin(c,{pal:'yellow',drop:4,ow:2.6,seed:65+i})});
  const tbc=sec.querySelector('.wc-tbc');if(tbc){tbc.classList.add('cb-brk');tbc.style.setProperty('box-shadow','none','important');tbc.style.setProperty('background','transparent','important');tbc.style.setProperty('border-color','transparent','important');skin(tbc,{pal:'yellow',drop:4,ow:2.8,seed:69})}
  const tr=sec.querySelector('.wc-chipw')?rel(sec.querySelector('.wc-chipw'),sec):{x:W/2,y:200,w:10,h:10};
  const pv=sec.previousElementSibling&&sec.previousElementSibling.classList.contains('cb-gut')?sec.previousElementSibling.previousElementSibling:sec.previousElementSibling,slant=pv&&pv.classList.contains('wc-splash');
  ground(sec,(W,Hh)=>{const sl=slant?SL(W):0;const poly=[[0,sl],[W,0],[W,Hh],[0,Hh]];sec.style.setProperty('margin-top',(slant?10-sl-8:8)+'px','important');
    return {c:GR.nv,cx:tr.x+tr.w/2,cy:tr.y+tr.h/2,gr:Math.max(W,Hh*.6),r0:Math.min(tr.w,tr.h)*.6,r1:Math.max(W,Hh),seed:71,sp:8,n:30,bw:8,poly,holes:holesOf(sec,'.wc-chipw,.wc-cap'),
      clip:polyPx([[-60,sl+sl*60/W],[W+60,-sl*60/W],[W+60,Hh+80],[-60,Hh+80]])}})}

/* ================= the back cover ================= */
function back(){const sec=D.querySelector('#wc-book > .wc-back');if(!sec)return;const dk=desk(),W=sec.clientWidth-28;
  const mo=sec.querySelector('.wc-motto');if(mo){if(!mo.getAttribute('aria-label'))mo.setAttribute('aria-label',mo.textContent.trim());
    const s=Math.min(dk?54:36,W*.1);const a=LW('NOBODY SAID IT',{size:s,fill:'yellow',jr:5,jb:.06,rot:-3,depth:4,dot:'#ff6a0a',dotTo:'br'});
    const b=multi([{t:'WOULD BE ',o:{fill:'yellow',dot:'#ff6a0a'}},{t:'E',o:{fill:'green',dot:'#05703a'}},{t:'Z',o:{fill:'red',dot:'#8a0a05'}},{t:'.',o:{fill:'yellow'}}],{size:s*1.18,jr:6,jb:.07,depth:5,rot:-3,dotTo:'br'});
    const sp=D.createElement('span');sp.setAttribute('aria-hidden','true');sp.style.cssText='display:grid;justify-items:center';b.el.style.marginTop='-8px';sp.append(a.el,b.el);mo.replaceChildren(sp)}
  const fo=sec.querySelector('.wc-follow');if(fo){fo.style.setProperty('box-shadow','none','important');fo.style.setProperty('background','transparent','important');fo.style.setProperty('border-color','transparent','important');skin(fo,{pal:'gold',drop:6,ow:3,key:1.5,seed:81})}
  ground(sec,(W,Hh)=>({c:['#3a3346','#1a1620','#07060a','rgba(255,240,210,.05)','#2e2838'],cx:W/2,cy:Hh*.3,seed:82,sp:7,n:30,bw:8,r0:W*.2,r1:Math.max(W,Hh),holes:[],
    speed:{r0:Math.min(W,Hh)*.32,n:40,l0:10,l1:60,w0:1,w1:3,col:'#fdbc2a',op:.25,seed:83}}))}

/* ================= the cuts between sections ================= */
function cuts(){if(off('cuts'))return;book.querySelectorAll(':scope > .cb-turn,:scope > .cb-gut').forEach(n=>n.remove());
  const q=s=>book.querySelector(':scope > '+s),n=window.ROUNDS.length;let pg=1;
  const turn=(after,label)=>{if(!after)return;const t=D.createElement('div');t.className='cb-turn';t.setAttribute('aria-hidden','true');
    t.innerHTML=`<span class="cb-fo"><span class="cb-fo-l">Earnings Zeason · </span>Season 1 · No. ${n}</span><span class="cb-pgno">${pg++}</span><i class="cb-curl">${X.svg(40,40,X.curl(40))}</i>`;after.after(t)};
  const gut=(after,txt,cls)=>{if(!after)return null;const g=D.createElement('div');g.className='cb-gut '+(cls||'');g.setAttribute('aria-hidden','true');g.innerHTML=`<p class="cb-cap cb-brk${cls&&cls.includes('cb-gr')?' cb-r':''}">${txt}</p>`;after.after(g);return g};
  const beat=sec=>{const p=sec&&sec.previousElementSibling;return p&&p.classList.contains('wc-beat')?p.textContent.trim():''};
  turn(q('.wc-cover'));
  gut(q('.wc-chars'),'And every round goes on the record…');
  const cl=q('.wc-cliff');if(cl)gut(q('.wc-season'),beat(cl)||'And next on the card…','cb-gr');
  const sp=q('.wc-splash');if(sp)gut(cl||q('.wc-season'),beat(sp)||'Meanwhile, the big question…','cb-tg');
  const bt=q('.wc-bet');if(bt)gut(sp,beat(bt)||'Next time…','cb-gr cb-dg');
  const bk=q('.wc-back');if(bk)turn(bk.previousElementSibling);
  book.querySelectorAll('.cb-cap').forEach((c,i)=>{c.style.boxShadow='none';c.style.background='transparent';c.style.borderColor='transparent';skin(c,{pal:'yellow',drop:4,ow:2.8,seed:200+i})})}

/* ================= the header's tabs: the same hand-drawn tags ================= */
function tabs(){D.querySelectorAll('header.top nav a, header.top .tabs a, header.top [role=tab]').forEach((a,i)=>{if(!a.offsetWidth||a.offsetWidth>260)return;const on=a.getAttribute('aria-current')||a.classList.contains('on')||a.getAttribute('aria-selected')==='true';
  a.style.setProperty('box-shadow','none','important');a.style.setProperty('background','transparent','important');a.style.setProperty('border-color','transparent','important');skin(a,{pal:on?'gold':'white',drop:3,ow:2.4,key:1.1,seed:400+i,dots:!!on})})}

/* ================= build, and again when the width changes or the page redraws a module ================= */
const F={cuts,cover,chars,season,cliff,splash,bet,back,tabs};const run=k=>{if(!off(k))F[k]()};
function all(){['cuts','cover','chars','season','cliff','splash','bet','back','tabs'].forEach(run);
  /* sizes settle after the lettering went in: redo the grounds once at their final size */
  requestAnimationFrame(()=>{['chars','season','splash','bet','back'].forEach(run)})}
/* for the cost measure: one full build, timed (the first pass; the settle pass follows in the next frame) */
window.__cbRebuild=()=>{const t=performance.now();all();return performance.now()-t};
let busy=false;
function go(){if(busy)return;busy=true;try{all()}catch(e){console.error('cb',e)}busy=false;H.classList.add('cb-ready')}
/* wait for the cover's page of panels (C2 builds once it has a width), then build; rebuild the cover whenever C2 redraws its rows */
function start(n){if(!D.querySelector('.cvx.c2 .c2-rows .c2-p1')&&n<120){setTimeout(()=>start(n+1),100);return}
  go();const rows=D.querySelector('.cvx.c2 .c2-rows');if(rows)new MutationObserver(()=>{clearTimeout(rows._t);rows._t=setTimeout(()=>{try{run('cover')}catch(e){console.error(e)}},60)}).observe(rows,{childList:true})}
Promise.all([D.fonts.load('40px "Luckiest Guy"'),D.fonts.load('20px Bangers')]).then(()=>start(0),()=>start(0));
let lw=innerWidth,tt=0;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;clearTimeout(tt);tt=setTimeout(go,300)});
/* "Show all" and pop_p1's own rebuilds: dress what is new */
const se=D.querySelector('#wc-book .wc-season');if(se)new MutationObserver(()=>{clearTimeout(se._t);se._t=setTimeout(()=>{try{tiles();season()}catch(e){console.error(e)}},200)}).observe(se.querySelector('.wc-bis')||se,{attributes:true,attributeFilter:['data-all']});
})();
