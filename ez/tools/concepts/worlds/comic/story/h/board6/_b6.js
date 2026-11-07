/* Round H25 · board6: frame 4, BOARD, as E (the golden ticket) revised. A drop-in for x2p_top.js's frame 4 (li.q4-board), laid over the built page.
   The owner's changes to E (BRIEF-H.md, board6):
     - #1 at the TOP: the leader's chip lifted out of its gold socket on a column of light at the top of the stack, 2, 3 and 4 below;
     - every chip lit as on Meet the models, but every number on it a placeholder dash (No., LAST 7 DAYS, LAST ROUND, SEASON): the numbers
       are revealed one scroll later, in Meet the models; this frame only says "this is a leaderboard";
     - the founders' faces are the only filled content: each chip's window plays its founder's loop, exactly as on Meet the models;
     - the chips ARE Meet the models' chips (media/chip8c-<m>-1200.jpg, chips8 take c geometry), so the reveal reads as the same chip coming closer.
   window.__B6  = take: 'e1' looking down the rack (a board standing up, the camera above it, #1 nearest at the top),
                  'e2' head-on (the stack seen straight, #1 lifted at the top).
   window.__B6IMG = folder of the paintings (default this folder's img/). Live: the order (season P&L, __x2pPnl) and the rank numerals.
   Painted: the board, sockets, light column and windows; on each chip its mark, flag, name, version and labels. */
(function(){var n=0;(function go(){const li=document.querySelector('li.q4-board');if(!li||!window.__x2pPnl||!window.__t5||!window.MODELS){if(++n<400)setTimeout(go,50);return}
try{
const D=document,W=window,T=W.__B6||'e1',IMG=W.__B6IMG||'tools/concepts/worlds/comic/story/h/board6/img/',MED=W.__B6MED||'media/';
const A=W.__x2pPnl().A,MD=W.MODELS,NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
/* the board's order: season P&L, highest first (the same sort as Meet the models, so the two always agree) */
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const em=c=>c==='gd'?'url(#q4gd)':'url(#q4em)';
/* ---------- the takes: painting file, crop and measured quads (painting px) ---------- */
const TK=Object.assign({"e1":{"img":"e1c.jpg","iw":2880,"crop":[200,170,2300,2300],"cq":[[[1255,282],[2245,282],[2245,682],[1255,682]],[[1294,1112],[2234,1112],[2234,1492],[1294,1492]],[[1286,1637],[2226,1637],[2226,2017],[1286,2017]],[[1274,2121],[2214,2121],[2214,2501],[1274,2501]]],"wq":[[[380,612],[708,612],[732,916],[412,912]],[[444,1160],[744,1160],[772,1440],[468,1444]],[[492,1668],[792,1668],[816,1928],[520,1920]],[[544,2144],[824,2148],[848,2388],[568,2396]]],"beam":[[1262,440],[2238,440],[2238,925],[1262,925]]},"e2":{"img":"e2c.jpg","iw":2880,"crop":[200,110,2270,2270],"cq":[[[1315,189],[2265,189],[2265,573],[1315,573]],[[1341,961],[2241,961],[2241,1325],[1341,1325]],[[1344,1499],[2244,1499],[2244,1863],[1344,1863]],[[1343,2043],[2243,2043],[2243,2407],[1343,2407]]],"wq":[[[368,400],[684,404],[680,724],[364,720]],[[364,972],[680,972],[676,1296],[364,1292]],[[368,1540],[684,1544],[680,1864],[364,1864]],[[368,2084],[684,2088],[676,2412],[364,2408]]],"beam":[[1312,330],[2268,330],[2268,752],[1312,752]]},"e3":{"img":"e3a.jpg","iw":2880,"crop":[200,130,2350,2350],"cq":[[[1345,394],[2415,254],[2429,522],[1329,640]],[[1325,1049],[2392,971],[2388,1244],[1312,1304]],[[1284,1515],[2380,1485],[2396,1761],[1259,1774]],[[1227,1983],[2369,2030],[2377,2342],[1207,2281]]],"wq":[[[520,740],[805,710],[790,895],[500,930]],[[460,1148],[732,1124],[708,1320],[428,1340]],[[392,1568],[664,1564],[640,1768],[360,1772]],[[316,1988],[596,1996],[560,2216],[280,2200]]],"beam":[[1380,440],[2385,300],[2398,745],[1362,850]]}},W.__B6TK||{});
const C=TK[T];if(!C)throw new Error('board6: no take '+T);
/* ---------- the chip: chips8 take c's own geometry (3760 x 1520 units), measured on the master ---------- */
const GS=[3760,1520],GA={no:[2385,251,2604,421],d7:[1120,479,2020,759],lr:[2086,478,2604,765],se:[1121,890,2604,1087],core:[2766,305,3612,1179]};
const pc=(v,t)=>(v/t*100).toFixed(4)+'%';
const at=r=>`left:${pc(r[0],GS[0])};top:${pc(r[1],GS[1])};width:${pc(r[2]-r[0],GS[0])};height:${pc(r[3]-r[1],GS[1])}`;
const clip=r=>`clip-path:inset(${pc(r[1],GS[1])} ${pc(GS[0]-r[2],GS[0])} ${pc(GS[1]-r[3],GS[1])} ${pc(r[0],GS[0])})`;
/* a placeholder: one lit dash, centred in the window's glass (the window's own painted glass screened back over it) */
const dash=(k,r,lead)=>{const w=r[2]-r[0],h=r[3]-r[1],f=h*.62;
  return `<i class="b6-w b6-${k}" style="${at(r)}"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><rect x="${(w*.34).toFixed(1)}" y="${(h*.42).toFixed(1)}" width="${(w*.32).toFixed(1)}" height="${(h*.16).toFixed(1)}" rx="${(h*.08).toFixed(1)}" fill="${em(lead?'gd':'em')}" class="q4-tx b6-dash"/></svg></i>`};
const vid=m=>{const b=MED+'founder-'+m.toLowerCase()+'-anim';return `<video class="b6-v" muted loop playsinline preload="metadata" poster="${b}.jpg" aria-hidden="true" tabindex="-1"><source src="${b}.mp4" type="video/mp4"><source src="${b}.webm" type="video/webm"></video>`};
const chipIn=(m,i)=>(bw,bh)=>{const src=MED+'chip8c-'+m.toLowerCase()+'-1200.jpg',lead=i===0,sx=bw/GS[0],sy=bh/GS[1];
  /* the chip's own glass, screened back over the lit dashes: one clip path of the four windows, in the surface's px */
  const P=['no','d7','lr','se'].map(k=>{const[x0,y0,x1,y1]=GA[k];return `M${(x0*sx).toFixed(1)} ${(y0*sy).toFixed(1)}H${(x1*sx).toFixed(1)}V${(y1*sy).toFixed(1)}H${(x0*sx).toFixed(1)}Z`}).join('');
  return `<img class="b6-im" src="${src}" alt="" draggable="false">`
   +`<i class="b6-die" style="${at(GA.core)}">${vid(m)}</i>`
   +['no','d7','lr','se'].map(k=>dash(k,GA[k],lead)).join('')
   +`<img class="b6-im b6-gl" src="${src}" alt="" draggable="false" style="clip-path:path('${P}')">`};
function surf(q,draw,cls,inner){const L=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]),bw=(L(q[0],q[1])+L(q[3],q[2]))/2,bh=(L(q[0],q[3])+L(q[1],q[2]))/2;
  return `<div class="t4-sf ${cls||''}" data-q='${JSON.stringify(q.map(p=>p.map(v=>Math.round(v))))}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner?inner(bw,bh):''}${draw?`<svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg>`:''}</div>`}
/* the rank window on the board: the rank numeral, lit (the leader's gold) */
const rankDraw=i=>(w,h)=>{const f=Math.min(h*.8,w*1.3);return `<g class="q4-g">`+`<text x="${(w/2).toFixed(1)}" y="${(h/2+f*.37).toFixed(1)}" font-size="${f.toFixed(1)}" text-anchor="middle" fill="${em(i?'em':'gd')}" class="t4-an q4-tx q4-big">${i+1}</text></g>`};
function build(){const[cx,cy,cw,ch]=C.crop,src=IMG+C.img;let S='';const GQ=[];
  /* the column of light out of the gold socket, under the lifted chip (screened over the painted cavity) */
  if(C.beam)S+=surf(C.beam,null,'b6-beam',()=>'<i class="b6-rays"></i>');
  rank.forEach((m,i)=>{S+=surf(C.cq[i],null,'b6-chip'+(i===0?' b6-lead':''),chipIn(m,i));
    S+=surf(C.wq[i],rankDraw(i),'q4-glass b6-rk'+(i===0?' b6-rl':''),()=>`<i class="q4-scan"></i>`);GQ.push(C.wq[i])});
  const gl=GQ.map(q=>`<img class="q4-gl" src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;clip-path:polygon(${q.map(([x,y])=>`${(x/C.iw*100).toFixed(2)}% ${(y/C.iw*100).toFixed(2)}%`).join(',')})">`).join('');
  return `<div class="t4-pic b6-pic b6-${T}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t4-mv"><img src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${S}${gl}</div></div>`}
const RM=matchMedia('(prefers-reduced-motion: reduce)');let io=null;
function wire(li){io&&io.disconnect();const vs=li.querySelectorAll('video.b6-v');if(RM.matches||!('IntersectionObserver' in W)){li.classList.add('b6-still');return}
  io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.muted=true;const p=v.play();p&&p.catch(()=>{})}else v.pause()}),{rootMargin:'80px 0px'});vs.forEach(v=>io.observe(v))}
function apply(){const li=D.querySelector('li.q4-board');if(!li||li.dataset.b6===T)return;li.querySelector('.t4-art').innerHTML=build();li.dataset.b6=T;
  li.setAttribute('aria-label','4 BOARD: The ledger ranks the board. '+rank.map((m,i)=>`${i+1} ${NM[m]}`).join(', ')+'. The numbers are below, in Meet the models.');
  W.__t5.place();wire(li)}
apply();
const sec=D.querySelector('section.t4');if(sec)new MutationObserver(()=>{const li=D.querySelector('li.q4-board');if(li&&!li.dataset.b6)apply()}).observe(sec,{childList:true,subtree:true});
W.__b6={take:T,rank,apply};
}catch(e){window.__b6Err=e;console.error(e)}})()})();
