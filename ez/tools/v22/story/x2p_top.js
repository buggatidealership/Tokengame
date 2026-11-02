/* X2+ TOP, H23 quad4 (ported 2026-11-02; How a round works = round H28 round3 take C3, ported 2026-11-02: each frame a row of two equal halves, a gold caption box the size of its picture, one type size for all four; CALL long/short, CLOSE "MARKET CLOSE", LEDGER the one entry, BOARD frontal with #1 seated; the ledger row stacks). Media: media/top-h23-call.jpg media/top-h23-close.jpg media/top-h23-ledger.jpg media/top-h28-board-r.jpg media/chip8c-grok-1200.jpg media/chip8c-claude-1200.jpg media/chip8c-gpt-1200.jpg media/chip8c-kimi-1200.jpg media/founder-grok-anim2.mp4 media/founder-grok-anim2.webm media/founder-grok-anim2.jpg media/founder-gpt-anim2.mp4 media/founder-gpt-anim2.webm media/founder-gpt-anim2.jpg media/founder-claude-anim.mp4 media/founder-claude-anim.webm media/founder-claude-anim.jpg media/founder-kimi-anim.mp4 media/founder-kimi-anim.webm media/founder-kimi-anim.jpg media/top-t4-one-b-h22.jpg media/top-hero-t-h22.jpg media/top-hero-w-h22.jpg media/top-t3-screen-h22.jpg media/ez-landing-v4-poster-ez.jpg media/ez-landing-v4.mp4 media/film4-rail-top.jpg media/film4-rail-bot.jpg media/film4-poster-blur.jpg media/film4-connector.jpg media/ez-landing-v4.webm */
/* H23 quad4: a drop-in replacement for tools/v22/story/x2p_top.js (round H23, area quad4; built by quad4/build.py). Only beat 2's four
   pictures, their surfaces and the frame states change: new zoomed-in paintings (media/top-h23-*.jpg), the figures big and lit in the glass,
   the facts visible from the start, small life in the world. Everything else (headline, chip, gutters, film) is x2p_top.js as of f180a6e.
   Laid over the built page as a mockup, it first takes out the live .t4 section. CSS: _q4.css, appended after x2p_top.css. */
(function(){var n=0;(function go(){if(!document.querySelector("section.x2o-bet")||!window.__x2pPnl){if(++n<400)setTimeout(go,50);return}
try{
/* X2+ TOP (owner, 2026-11-01: round H21 top6 take A, built): the headline, "How a round works" (1 CALL, 2 CLOSE, 3 LEDGER, 4 BOARD on R40 Tesla),
   the film "The whole game"; torn paper between beats, gold trace between frames, lines variant d. From tools/concepts/worlds/comic/story/h/top6/_t6.js.
   (top5 notes follow) Round H20 · top5: top4 option 1 (cream, CALL / CLOSE / LEDGER / BOARD, order 1) with the owner's H20 notes (BRIEF-H Round H20):
   the step words leave the board and become numbered comic sub-heads (window.__T5S = 1 gold badge, 2 green word + big numeral, 3 caption tab),
   and the gutters get two drawn strengths (window.__T5G = 1 torn paper / zigzag cut, 2 board edge with pins / gold trace, 3 ink band with a halftone fade / dotted rule).
   Laid over top4's CSS (_t4.css) plus _t5.css. Classes keep top4's t4- names; top5's own are t5-.
   (top4's notes follow)
   window.__T4W = step-word set: 'b' CALL / CLOSE / LEDGER / BOARD (default, the owner's lean), 'a' CALL / CLOSE / LEDGER / #1
   window.__T4C = step-word ink: 'cream' (default, classic silkscreen), 'green' (bright green ink), 'gold' (gold-plated lettering, ENIG)
   window.__T4O = order: 1 CALL, CLOSE, LEDGER, BOARD (default); 2 CALL, CLOSE, BOARD, LEDGER
   The step words are printed on each painting's bare strip of board (silkscreen, in perspective), in the headline's Bangers.
   Laid over the built v46-live-x2plus.html: its hero and its film bill + live strip section are hidden.
   window.__T4L = lettering of the four step words: 'L' LED dot matrix (default), 'S' silkscreen, 'M' stamped gold, 'T' gold traces, 'N' neon
   window.__T4F = film head: 'A' "The explainer · 1:20" (default), 'B' "The 80-second version", 'C' "The whole game in 80 seconds", 'D' "Press play"
   window.__T4auto = false switches off the 3 s self-reveal (default on).
   Every live word sits on a surface the painting left blank for it: an SVG in the surface's own box, mapped onto the surface's four painted
   corners with one matrix3d. Data: ROUNDS, RMETA (mag7), MODELS, __x2pPnl. Nothing typed. */
(function(){
const D=document,WS='b',INK='cream',ORD=1,FH='G',AUTO=window.__T4auto!==false,SH=3,GT=2,BG=1,FG=2,LV='d';

/* top6 (Round H21): the four frame lines. LV = 'a' the full lines at today's size; 'b' the same, with "4 AIs submit their predictions" kept on line 1
   (all four lines take the size that clause needs); 'c' the shorter "4 AIs submit predictions ..." (fitted the same way, only if it needs it); 'd' = c with a shorter CLOSE line (my suggestion). */
const KL={a:'4 AIs submit their predictions',b:'4 AIs submit their predictions',c:'4 AIs submit predictions',d:'4 AIs submit predictions'}[LV]||'4 AIs submit their predictions';
const LINES={call:'Each AI goes long or short before the report.',close:'The next market close ends every trade.',ledger:'Every trade is written to the ledger.',board:'The ledger ranks the board.'}; /* owner, 2026-11-02: the trade's own words (long or short before the report, out at the next close) */ /* H23 addendum 2: the simpler lines */
const lh=t=>LV!=='a'&&t.startsWith(KL)?`<span class="t6-k">${esc(KL)}</span>${esc(t.slice(KL.length))}`:esc(t);
function fitLines(root){const ls=[...root.querySelectorAll('.t4-ln')];ls.forEach(l=>l.style.fontSize='');if(LV==='a')return;const k=root.querySelector('.t6-k');if(!k)return;
  const ln=k.parentElement,cs=getComputedStyle(ln),av=ln.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),f0=parseFloat(cs.fontSize);root.dataset.t6base=f0;k.style.whiteSpace='nowrap';
  const w=k.getBoundingClientRect().width;let f=f0;if(w>av-1)f=Math.floor(f0*(av-1)/w*10)/10;root.dataset.t6fs=f;root.dataset.t6need=(Math.ceil(f0*(av)/w*100)/100);root.dataset.t6av=av.toFixed(1);root.dataset.t6kw=w.toFixed(1);
  if(f!==f0)ls.forEach(l=>l.style.fontSize=f+'px')}
const I5='tools/concepts/worlds/comic/story/h/top5/img/';
const I1='tools/concepts/worlds/comic/story/h/top1/img/',I4='tools/concepts/worlds/comic/story/h/top4/img/',I3='tools/concepts/worlds/comic/story/h/top3/img/';
if(!D.getElementById('t4-fonts')){const l=D.createElement('link');l.id='t4-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&display=block';D.head.appendChild(l)}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* ---------- live data ---------- */
const R=window.ROUNDS||[],G=R.filter(r=>r.a!=null&&r.out);
const m7=n=>!!((window.RMETA||{})[n]||{}).mag7;
const ok=(c,a)=>/^UP/i.test(c)===(a>0);
/* the example: the newest graded Mag 7 round split two right, two wrong, with one winner (today R40 Tesla) */
const EX=[...G].reverse().find(r=>m7(r.n)&&r.calls.length===4&&r.calls.filter(([m,c])=>ok(c,r.a)).length===2&&r.win&&!/,|&| /.test(r.win))||G[G.length-1];
const iEx=G.indexOf(EX);
const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal),lead=rank[0];
const pnl=m=>A[m].bal-100000,$=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const MD=window.MODELS||{};
const calls=EX.calls.map(([m,c])=>{const up=/^UP/i.test(c),v=(c.match(/[\d.]+/)||[''])[0];return {m,up,v,ok:up===(EX.a>0)}});
const win=String(EX.win||'').toUpperCase(),graded=G.length;
const md=s=>{const[m,d]=String(s).split('/');return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]+' '+(+d)};
const sgn=v=>(v<0?'−':'+')+String(Math.abs(v));
/* a model's mark in an SVG; Grok and GPT are black marks, so on lit glass they print in cream */
const mark=(m,x,y,s,col)=>{const M=MD[m]||{},c=col||(/^#(0|1)/.test(M.c||'')||m==='GPT'?'#f8f0d9':M.c);return `<svg x="${x}" y="${y}" width="${s}" height="${s}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${c}"/></svg>`};
const T=(x,y,s,t,o={})=>`<text x="${x}" y="${y}" font-size="${s}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||'#f8f0d9'}" class="${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const UPC='#3ee07f',DNC='#ff5148';
const fit=(t,w,max)=>Math.min(max,w/(String(t).length*.47));
/* ---------- homography: rect (0,0,w,h) -> quad (TL,TR,BR,BL) ---------- */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  const n=8;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(A[r][c])>Math.abs(A[p][c]))p=r;[A[c],A[p]]=[A[p],A[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<n;r++)if(r!==c){const f=A[r][c]/A[c][c];for(let k=c;k<n;k++)A[r][k]-=f*A[c][k];B[r]-=f*B[c]}}
  const X=B.map((b,i)=>b/A[i][i]);const[a,b,c,d,e,f,g,hh]=X;
  return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
function surf(q,draw,cls,inner){const L=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]),bw=(L(q[0],q[1])+L(q[3],q[2]))/2,bh=(L(q[0],q[3])+L(q[1],q[2]))/2;
  return {html:`<div class="t4-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner?inner(bw,bh):''}<svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="100%" height="100%" aria-hidden="true">${draw(bw,bh)}</svg></div>`}}
/* a painting with surfaces; cr = [x,y,w,h], the part of the painting the frame shows, in painting px */
function pic(src,iw,ih,surfs,cls,extra,cr){cr=cr||[0,0,iw,ih];const[cx,cy,cw,ch]=cr;
  return `<div class="t4-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t4-mv"><img src="${src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${surfs.map(s=>s.html).join('')}${extra||''}</div></div>`}
/* an element placed on the painting in painting px (a rect), scaled with it */
const at=(x,y,w,h,cls,inner)=>`<i class="t4-at ${cls}" data-r="${x},${y},${w},${h}">${inner||''}</i>`;
/* both headline lines one size, the largest at which each stays on one line; "How a round works" and the film head take the same size */
function fitHead(root){const h1=root.querySelector('.t4-h1');if(!h1)return;const hs=[h1,...root.querySelectorAll('.t4-h2')];hs.forEach(h=>h.style.fontSize='');
  const base=parseFloat(getComputedStyle(h1).fontSize),cs=getComputedStyle(h1),avail=h1.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
  const need=Math.max(...[...h1.querySelectorAll('.t4-hw')].map(e=>e.scrollWidth+parseFloat(getComputedStyle(e).marginLeft)));
  const fs=need>avail?Math.floor(base*avail/need*.985*10)/10:base;hs.forEach(h=>h.style.setProperty('font-size',fs+'px','important'))}
function place(root){fitHead(root);fitLines(root);requestAnimationFrame(()=>{root.querySelectorAll('.t5-bg').forEach(drawBeat);gutters(root);f4fit()});const h2=root.querySelector('.t4-b2 .t4-h2'),fl=root.querySelector('.t4-frs');if(h2&&fl){const hr=h2.querySelector('.t4-hw').getBoundingClientRect();root.style.setProperty('--t4ov',Math.max(0,hr.bottom-fl.getBoundingClientRect().top)+'px');
   /* a caption moves down only in the frames the heading actually crosses */
   fl.querySelectorAll('.t4-fr').forEach(f=>{const c=f.querySelector('.t4-cap'),r=f.getBoundingClientRect();if(!c)return;c.style.top=(Math.min(hr.right,r.right)-Math.max(hr.left,r.left)>r.width*.25&&hr.bottom>r.top)?(hr.bottom-r.top+3)+'px':''})}root.querySelectorAll('.t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.t4-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);/* MEM: the surface is laid out at its on-screen size, its svg scaling by its viewBox: a layer with perspective is rastered at its own size in device pixels (layout size x the pixel ratio), so at painting size (1,000 to 2,600 px) it ran a phone out of GPU memory and the page painted black (2026-11-02); laid out at on-screen size x the pixel ratio it was still rastered at the ratio squared (7.6x the pixels at 2.75: 41 MB of tiles for the four frames on a 390px phone, 5 MB now; GPU probe 2026-11-02, tools/concepts/perf/gpu). window.__t4Rmax raises the ratio for tests only */const R=Math.min(window.__t4Rmax||1,3,Math.max(1,window.devicePixelRatio||1)),w=+s.dataset.bw*k*R,h=+s.dataset.bh*k*R;s.style.width=w+'px';s.style.height=h+'px';s.style.setProperty('--r',R);s.style.transform=m3d(w,h,q)});
  p.querySelectorAll('.t4-at').forEach(e=>{const[x,y,w,h]=e.dataset.r.split(',').map(Number);Object.assign(e.style,{left:(x-cx)*k+'px',top:(y-cy)*k+'px',width:w*k+'px',height:h*k+'px'})})});c3fit(root)}
/* ---------- beat 1: the chip, the four AIs (logo and name only), the season bar ---------- */
const QA_W=[[[282,286],[430,276],[452,388],[305,400]],[[470,268],[610,260],[630,368],[492,378]],[[655,252],[790,246],[815,350],[678,360]],[[828,235],[952,228],[992,330],[855,340]]],QA_WB=[[358,480],[1042,408],[1056,452],[365,530]];
const QA_T=[[[207,180],[348,188],[371,326],[224,317]],[[399,192],[533,202],[556,334],[422,328]],[[233,379],[375,383],[395,521],[249,519]],[[432,384],[567,388],[591,520],[453,521]]],QA_TB=[[212,690],[678,671],[694,775],[221,801]];
const dieAI=m=>(w,h)=>{const s=Math.min(w,h);return mark(m,w/2-s*.24,h*.1,s*.48)+T(w/2,h*.86,fit(NM[m].toUpperCase(),w*.86,s*.25),NM[m].toUpperCase(),{a:'middle',cls:'t4-an'})};
const led=t=>(w,h)=>{const f=fit(t,w*.9,h*.5);return T(w/2,h/2+f*.36,f,t,{a:'middle',c:'#ffc23a',cls:'t4-an t4-led'})};
function hero(wide){const Q=wide?QA_W:QA_T,QB=wide?QA_WB:QA_TB;
  return pic('media/'+(wide?'top-hero-w-h22.jpg':'top-hero-t-h22.jpg'),wide?1280:768,wide?720:1024,[...rank.map((m,i)=>surf(Q[i],dieAI(m),'t4-glass')),surf(QB,led(`SEASON 1 · ${graded} ROUNDS GRADED`),'t4-glass')],'t4-hero','',wide?[150,90,1000,560]:[0,40,768,900])}
/* ---------- beat 2: the four frames (round H23 quad4: zoom-ins at 2K, the readouts big, every figure lit in its glass) ----------
   Paintings: media/top-h23-{call,close,ledger,board}.jpg, each the crop cr of a 2048 px painting, exported square (1200 px; board 960).
   Quads and crops are in the 2048 painting's px minus the crop's origin (so the crop's own px), measured on the paintings (quad4/quads.json). */
const Q4={"call": {"crop": [168, 0, 1880, 1880], "file": "top-h23-call.jpg", "q": [[[100, 164], [784, 164], [800, 804], [120, 820]], [[986, 164], [1568, 172], [1656, 796], [1032, 816]], [[164, 1096], [844, 1092], [888, 1772], [204, 1788]], [[1116, 1080], [1728, 1080], [1804, 1740], [1164, 1760]]]}, "close": {"crop": [140, 120, 1880, 1880], "file": "top-h23-close.jpg", "q": [[[140, 440], [1520, 260], [1780, 1420], [310, 1670]]]}, "ledger": {"crop": [380, 300, 1400, 1400], "file": "top-h23-ledger.jpg", "q": [[[32, -148], [1028, -176], [1096, 164], [72, 192]], [[84, 224], [1100, 180], [1156, 528], [124, 560]], [[136, 604], [1172, 564], [1232, 920], [172, 952]], [[184, 988], [1244, 944], [1352, 1312], [220, 1396]]]}, "board": {"crop": [170, 90, 1760, 1760], "file": "top-h23-board.jpg", "q": [[[6, 262], [1254, 50], [1782, 1314], [462, 1666]]]}};
const IMQ='media/';
const em=(c)=>c==='up'?'url(#q4up)':c==='dn'?'url(#q4dn)':c==='gd'?'url(#q4gd)':'url(#q4em)';
const TX=(x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.f||em()}" class="t4-an q4-tx ${o.cls||''}" ${o.ls?`letter-spacing="${o.ls}"`:''}>${esc(t)}</text>`;
const mn=s=>String(s).replace(/^-/,'−');
const tw=(t,f)=>String(t).length*f*.47;
/* the glass's own glare and reflections, cut from the painting itself and laid back over the lit text (screen) */
function glare(k){const v=Q4[k],[,,cw,ch]=v.crop;return `<img class="q4-gl" src="${IMQ+v.file}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${v.q.map(q=>q.map(([x,y])=>`${(x/cw*100).toFixed(2)}% ${(y/ch*100).toFixed(2)}%`).join(',')).join(',')})">`}
/* a polygon clip per quad needs one polygon; several quads: one img per quad */
function glares(k){const v=Q4[k],[,,cw,ch]=v.crop;return v.q.map(q=>`<img class="q4-gl" src="${IMQ+v.file}" alt="" draggable="false" style="width:100%;left:0;top:0;clip-path:polygon(${q.map(([x,y])=>`${(x/cw*100).toFixed(2)}% ${(y/ch*100).toFixed(2)}%`).join(',')})">`).join('')}
const scan=(w,h)=>`<i class="q4-scan"></i>`;
/* CALL: each die a lit display: the AI's mark and name, then its call, the face of the die */
/* C3 (round H28): the die reads the call's own word, LONG or SHORT, big in green or red; the AI's mark and name under it (no % size) */
const dieQ4=c=>(w,h)=>{const s=h*.165,f1=h*.17,nm=NM[c.m].toUpperCase(),tot=s+f1*.28+tw(nm,f1),x0=w/2-tot/2,t=c.up?'LONG':'SHORT',f2=Math.min(h*.33,w*.82/(t.length*.5));
  const g=h*.09,H=f2*.86+g+f1*.86,y2=h/2-H/2+f2*.86,y1=y2+g+f1*.86;
  return `<g class="q4-g">`+TX(w/2,y2,f2,t,{a:'middle',f:em(c.up?'up':'dn'),cls:'q4-big'})+mark(c.m,x0,y1-s*.86,s)+TX(x0+s+f1*.28,y1,f1,nm)+`</g>`};
/* CLOSE: the readout fills the frame: company and ticker, the move, who wins */
const coLogo=(x,y,sz)=>{const L=(window.CO_LOGOS||{})[EX.ticker],f=L&&(L.f||L);return f?`<image href="media/${f}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" preserveAspectRatio="xMidYMid meet" filter="url(#q4lg)"/>`:''};
/* C3 (round H28): the readout says the sentence's own words: the company, the move, then MARKET CLOSE (the winner is the ledger's to say) */
const readQ4=(w,h)=>{const co=String(EX.co).toUpperCase(),wt='MARKET CLOSE',
  mv=mn(EX.out),f2=Math.min(h*.4,w*.62/(mv.length*.47)),f1=Math.min(h*.15,w*.5/(co.length*.47),w*.5/(wt.length*.47)),g=h*.085,
  ls=f1*1.25,lw=(window.CO_LOGOS||{})[EX.ticker]?ls+f1*.35:0,t1=lw+tw(co,f1),x1=w/2-t1/2,t3=tw(wt,f1),x3=w/2-t3/2,
  y2=h/2+f2*.43,y1=h/2-f2*.43-g,y3=h/2+f2*.43+g+f1*.86;
  return `<g class="q4-g">`+(lw?coLogo(x1,y1-f1*.43-ls/2,ls):'')+TX(x1+lw,y1,f1,co)+TX(w/2,y2,f2,mv,{a:'middle',f:em(EX.a>0?'up':'dn'),cls:'q4-big'})
   +TX(x3,y3,f1,wt,{cls:'r3-mc'})+`</g>`};
/* LEDGER: rows of the record. Row: line 1 round + ticker, the move on the right; line 2 the company, the winner on the right */
/* the winners of a round: none, one, or a tie (the sheet joins tied winners with " & ") */
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>NM[m]);
/* C3 (round H28): the ledger painting cropped to the one slot (q[2]) with only the example round in it:
   ROUND n and its move, then the company and WINNER <mark> <model>; a soft fade over the neighbouring slots' slivers. LCR = the crop shown, in the 1400 crop's px. */
const LCR=[58,532,1238,452];
const entryQ4=(w,h)=>{const f=h*.27,co=String(EX.co).toUpperCase(),W=wins(EX),one=W.length===1,mv=mn(EX.out),ws=f*.95,
  wl=one?NM[W[0]].toUpperCase():W.length?'TIE':'NOBODY',wtot=tw('WINNER ',f*.78)+(one?ws+f*.22:0)+tw(wl,f),xw=w*.95-wtot,y1=h*.43,y2=h*.84;
  return `<g class="q4-g q4-new">`+TX(w*.05,y1,f,'ROUND '+EX.n,{f:em('gd')})+TX(w*.95,y1,f,mv,{a:'end',f:em(EX.a>0?'up':'dn')})
   +TX(w*.05,y2,f,co)+TX(xw,y2,f*.78,'WINNER',{f:em('gd'),cls:'r3-wl'})+(one?mark(W[0],xw+tw('WINNER ',f*.78),y2-ws*.84,ws):'')+TX(w*.95,y2,f,wl,{a:'end',f:em('gd')})+`</g>`};
function ledgerC3(){const v=Q4.ledger,iw=v.crop[2],q=v.q[2],[cx,cy,cw,ch]=LCR,src=IMQ+v.file;
  const gl=`<img class="q4-gl" src="${src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;clip-path:polygon(${q.map(([x,y])=>`${(x/iw*100).toFixed(2)}% ${(y/iw*100).toFixed(2)}%`).join(',')})">`;
  return pic(src,iw,iw,[surf(q,entryQ4,'q4-glass q4-row')],'r3-led',gl+'<i class="r3-vig" aria-hidden="true"></i>',LCR)}
const crQ=k=>{const[,,cw,ch]=Q4[k].crop;return [0,0,cw,ch]};
const picQ=(k,S,cls,extra)=>{const[,,cw,ch]=Q4[k].crop;return pic(IMQ+Q4[k].file,cw,ch,S,cls,extra,[0,0,cw,ch])};
/* Round H25 board6 E3: frame 4, the golden ticket revised (#1 on top lifted on light, lit dashes, the founders' loops; Grok and GPT the H25 characters) */
/* chips8 take c's geometry, in chip units (3760 x 1520): the No., LAST 7 DAYS, LAST ROUND and SEASON windows, and the founder's window */
const B6G={s:[3760,1520],no:[2385,251,2604,421],d7:[1120,479,2020,759],lr:[2086,478,2604,765],se:[1121,890,2604,1087],core:[2766,305,3612,1179]};
const b6pc=(v,t)=>(v/t*100).toFixed(4)+'%',b6at=r=>`left:${b6pc(r[0],B6G.s[0])};top:${b6pc(r[1],B6G.s[1])};width:${b6pc(r[2]-r[0],B6G.s[0])};height:${b6pc(r[3]-r[1],B6G.s[1])}`;
const b6dash=(r,lead)=>{const w=r[2]-r[0],h=r[3]-r[1],f=h*.62;return `<i class="b6-w" style="${b6at(r)}"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><rect x="${(w*.34).toFixed(1)}" y="${(h*.42).toFixed(1)}" width="${(w*.32).toFixed(1)}" height="${(h*.16).toFixed(1)}" rx="${(h*.08).toFixed(1)}" fill="${em(lead?'gd':'em')}" class="q4-tx b6-dash"/></svg></i>`};
/* STILL: the founders as still pictures here (the loops live in Meet the models) */
const b6vid=m=>{const b='media/founder-'+m.toLowerCase()+(m==='GROK'||m==='GPT'?'-anim2':'-anim');return `<img class="b6-v" src="${b}.jpg" alt="" draggable="false" decoding="async">`};
/* C3 (round H28): BOARD full frontal (board6 E3 made frontal, media/top-h28-board-r.jpg): every chip in its socket, #1 seated in the gold one (no lift),
   ranks 1 to 4 lit, the numbers withheld (lit dashes; Meet the models has them), founders still. Plain % boxes: no perspective surface here. */
const BR={file:'top-h28-board-r.jpg',ar:[2520,3300],chip:[[47.619,9.981,39.683,12.25],[47.619,32.121,39.683,12.25],[47.619,54.261,39.683,12.25],[47.619,76.402,39.683,12.25]],
  win:[[7.94,11.205,13.43,10.379],[7.94,33.346,13.43,10.379],[7.94,55.486,13.43,10.379],[7.94,77.626,13.43,10.379]]};
const brChip=(m,i)=>{const src='media/chip8c-'+m.toLowerCase()+'-1200.jpg';
  return `<img class="b6-im" src="${src}" alt="" draggable="false"><i class="b6-die" style="${b6at(B6G.core)}">${b6vid(m)}</i>`+['no','d7','lr','se'].map(k=>b6dash(B6G[k],i===0)).join('')+`<i class="r3-cg" aria-hidden="true"></i>`};
function boardC3(){const box=r=>`left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%`;
  return `<div class="r3-bd" style="aspect-ratio:${BR.ar[0]}/${BR.ar[1]}"><img class="r3-bdi" src="${IMQ+BR.file}" alt="" draggable="false">`
   +rank.map((m,i)=>`<div class="r3-chip${i===0?' r3-lead':''}" style="${box(BR.chip[i])}">${brChip(m,i)}</div><i class="r3-rk${i===0?' r3-rk1':''}" style="${box(BR.win[i])}"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><text x="50" y="78" font-size="78" text-anchor="middle" fill="${em(i?'em':'gd')}" class="t4-an q4-tx q4-big">${i+1}</text></svg></i>`).join('')+`</div>`}
/* C3: each caption box takes its picture's exact size; one type size for all four, the largest at which every box holds its words (the tightest box sets it).
   Skipped when nothing it depends on changed (a phone's address bar fires height-only resizes). */
let c3key='';
function c3fit(root){const fs=[...root.querySelectorAll('.t4-frs.r3c3>.t4-fr')],cs=fs.map(f=>f.querySelector('.r3c3-cap')),as=fs.map(f=>f.querySelector('.t4-art'));if(!cs.length||cs.some(c=>!c))return;
  root.querySelectorAll('.r3-bd').forEach(b=>b.style.setProperty('--k',(b.clientWidth/1400).toFixed(5)));
  root.querySelectorAll('.r3-rk').forEach(r=>r.style.setProperty('--k',(r.clientWidth/100).toFixed(5)));
  const key=as.map(a=>{const z=getComputedStyle(a);return z.width+'x'+z.height}).join(',')+'|'+(D.fonts?D.fonts.status:'');if(key===c3key)return;c3key=key;
  as.forEach((a,i)=>{const z=getComputedStyle(a);cs[i].style.width=z.width;cs[i].style.height=z.height});
  const fits=()=>cs.every(c=>{const n=c.firstElementChild;return n.scrollHeight<=c.clientHeight-2*parseFloat(getComputedStyle(c).paddingTop)+1&&n.scrollWidth<=n.clientWidth+1});
  let lo=8,hi=96;for(let i=0;i<14;i++){const m=(lo+hi)/2;cs.forEach(c=>c.style.fontSize=m+'px');if(fits())lo=m;else hi=m}
  const f=Math.floor(lo*4)/4;cs.forEach(c=>c.style.fontSize=f+'px');root.dataset.c3fs=f}
const VERB={call:'Call',close:'Close',ledger:'Ledger',board:'Board'};
/* the sentence with the trade's key words in its colours */
const sayHTML=k=>esc(LINES[k]).replace(/\blong\b/,'<span class="up">long</span>').replace(/\bshort\b/,'<span class="dn">short</span>')
  .replace(/(market close)/,'<span class="gd">$1</span>').replace(/(the ledger)\.$/,'<span class="gd">$1</span>.').replace(/(the board)\.$/,'<span class="gd">$1</span>.');

function frames(){const W=wins(EX),wn=W.map(m=>NM[m]).join(' and ')||'nobody';
  const F={call:{p:picQ('call',calls.map((c,i)=>surf(Q4.call.q[i],dieQ4(c),'q4-glass q4-die q4-d'+i,scan)),'',glares('call')),
     a:calls.map(c=>NM[c.m]+' '+(c.up?'long':'short')).join(', ')},
   close:{p:picQ('close',[surf(Q4.close.q[0],readQ4,'q4-glass q4-rd',scan)],'',glares('close')+at(-40,-120,300,300,'q4-ring')+at(-40,-120,300,300,'q4-ring r2')),a:`${EX.co} ${mn(EX.out)}`},
   ledger:{p:ledgerC3(),a:`Round ${EX.n}, ${EX.co} ${mn(EX.out)}, winner ${wn}`},
   board:{p:boardC3(),a:rank.map((m,i)=>(i+1)+' '+NM[m]).join(', ')+'. The numbers are in Meet the models'}};
  return ['call','close','ledger','board'].map((k,i)=>`<li class="t4-fr q4-fr q4-${k} t4-on" aria-label="${i+1} ${VERB[k]}: ${esc(LINES[k])} ${esc(F[k].a)}."><div class="r3c3-cap" aria-hidden="true"><div class="r3c3-in"><small>${VERB[k]}</small><span class="r3-tab">${i+1}</span>${sayHTML(k)}</div></div><div class="t4-ink"><div class="t4-art">${F[k].p}</div></div></li>`).join('')}
/* the glow and bloom are drawn in the screen's px: each painting carries its scale k (CSS px per painting px) as --k */
function q4k(root){root.querySelectorAll('.q4-fr .t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw;if(k)p.style.setProperty('--k',k.toFixed(5))})}

/* ---------- top5: the numbered comic sub-head (narration, not printed on the board) ---------- */
/* a wobbly hand-drawn closed path around (cx,cy): n points, radius r, wobble w, seeded so it is the same on every load */
function rnd(seed){let x=seed*9301+49297;return()=>(x=(x*9301+49297)%233280)/233280}
function blob(cx,cy,rx,ry,n,w,seed){const r=rnd(seed),P=[];for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(r()-.5)*w;P.push([cx+Math.cos(a)*rx*k,cy+Math.sin(a)*ry*k])}
  let d=`M${P[0][0].toFixed(1)},${P[0][1].toFixed(1)}`;for(let i=0;i<n;i++){const p=P[i],q=P[(i+1)%n],m=[(p[0]+q[0])/2,(p[1]+q[1])/2];d+=` Q${p[0].toFixed(1)},${p[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`}return d+'Z'}
function poly(pts,seed,j){const r=rnd(seed);return 'M'+pts.map(([x,y])=>`${(x+(r()-.5)*j).toFixed(1)},${(y+(r()-.5)*j).toFixed(1)}`).join(' L')+'Z'}
function sub(n,w){const lab=`<span class="t5-w">${esc(w)}</span>`;
  if(SH===1)return `<h3 class="t5-sh t5-S1"><span class="t5-n"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="${blob(21.5,21.5,17,17,9,.14,n*7)}" fill="#0d0b10"/><path d="${blob(19,19,17,17,9,.14,n*7)}" fill="url(#t5g)" stroke="#0d0b10" stroke-width="2.6"/><path d="${blob(17,15,9,6,7,.3,n*3)}" fill="#fff4c4" opacity=".5"/></svg><b>${n}</b></span>${lab}</h3>`;
  if(SH===2)return `<h3 class="t5-sh t5-S2 ${n%2?'t5-l':'t5-r'}"><span class="t5-n"><b>${n}</b></span>${lab}</h3>`;
  return `<h3 class="t5-sh t5-S3"><svg class="t5-box" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="${poly([[4,5],[98,2],[96,36],[2,38]],n*11,2.2)}" fill="#0d0b10" transform="translate(2.2,2.6)"/><path d="${poly([[3,3],[97,1],[95,35],[1,37]],n*11,2.2)}" fill="#050507" stroke="#f8f0d9" stroke-width="1.6" vector-effect="non-scaling-stroke"/></svg><span class="t5-n"><svg viewBox="0 0 40 40" preserveAspectRatio="none" aria-hidden="true"><path d="${poly([[3,4],[37,2],[38,37],[2,38]],n*5,3)}" fill="#c42a20" stroke="#0d0b10" stroke-width="2.4"/></svg><b>${n}</b></span>${lab}</h3>`}
/* ---------- top5: the gutters. Beat gutters are drawn full width; frame gutters are drawn into the frames' gaps by gutters() ---------- */
function beatGut(){
  if(BG===2)return `<div class="t5-bg t5-G2" aria-hidden="true"><i class="t5-el"></i><i class="t5-em"></i><i class="t5-er"></i></div>`;
  return `<div class="t5-bg t5-G${BG}" aria-hidden="true"><svg class="t5-bgs" preserveAspectRatio="none" aria-hidden="true"></svg></div>`}
function drawBeat(el){const svg=el.querySelector('.t5-bgs');if(!svg)return;const w=el.clientWidth,h=el.clientHeight;if(!w)return;svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
  const r=rnd(w|0),edge=(y0,amp,step,down)=>{let pts=[];for(let x=0;x<=w+step;x+=step*(.6+r()*.8))pts.push([Math.min(x,w),y0+(r()-.5)*amp*2+(down&&r()<.18?amp*1.4:0)]);return pts};
  if(BG===1){/* torn cream paper: a strip ripped along both edges, an ink outline, a red sliver under it (the headline's drop), a soft halftone shadow below */
    const t=edge(h*.3,h*.07,7),b=edge(h*.68,h*.08,6,1).reverse(),P=t.concat(b),d='M'+P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' L')+'Z';
    let dots='';for(let x=4;x<w;x+=6)for(let k=0;k<4;k++){const y=h*.74+k*4.2,rr=1.6-k*.38;if(rr>.2)dots+=`<circle cx="${(x+(k%2)*3).toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(2)}"/>`}
    svg.innerHTML=`<g fill="#f8f0d9" opacity=".22">${dots}</g><path d="${d}" fill="#c42a20" transform="translate(2,3.2)"/><path d="${d}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="2"/><path d="${'M'+t.map(p=>p[0].toFixed(1)+','+(p[1]+2.4).toFixed(1)).join(' L')}" fill="none" stroke="#c9bc98" stroke-width="1.4" opacity=".8"/>`}
  if(BG===3){/* a thick brushed ink band in the bet's green, cream ink edges, a gold halftone fading out of it */
    const t=edge(h*.18,h*.04,9),b=edge(h*.62,h*.05,8).reverse(),d='M'+t.concat(b).map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' L')+'Z';
    let dots='';for(let k=0;k<5;k++){const y=h*.66+k*h*.065,rr=(h*.05)*(1-k/5);for(let x=(k%2)*h*.06;x<w;x+=h*.12)dots+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(2)}"/>`}
    svg.innerHTML=`<g fill="#ffd21f">${dots}</g><path d="${d}" fill="#0a5c2e" stroke="#0d0b10" stroke-width="2.4"/><path d="${'M'+t.map(p=>p[0].toFixed(1)+','+(p[1]+3).toFixed(1)).join(' L')}" fill="none" stroke="#f8f0d9" stroke-width="1.6"/><path d="${'M'+b.slice().reverse().map(p=>p[0].toFixed(1)+','+(p[1]-3).toFixed(1)).join(' L')}" fill="none" stroke="#3ee07f" stroke-width="1.1" opacity=".7"/>`}}
/* frame gutters: the light break in the gaps between frames (vertical between columns, horizontal between rows) */
function gutters(root){const fl=root.querySelector('.t4-frs');if(!fl)return;let ov=fl.querySelector('.t5-fg');if(!ov){ov=D.createElementNS('http://www.w3.org/2000/svg','svg');ov.setAttribute('class','t5-fg');ov.setAttribute('aria-hidden','true');fl.appendChild(ov)}
  const fr=fl.getBoundingClientRect(),W=fr.width,H=fr.height;ov.setAttribute('viewBox',`0 0 ${W} ${H}`);ov.setAttribute('width',W);ov.setAttribute('height',H);
  const rs=[...fl.querySelectorAll('.t4-fr')].map(f=>{const r=f.getBoundingClientRect();return {l:r.left-fr.left,r:r.right-fr.left,t:r.top-fr.top,b:r.bottom-fr.top}});
  const segs=[];/* vertical: between neighbours in one row; horizontal: between rows */
  rs.forEach((a,i)=>rs.forEach((b,j)=>{if(j<=i)return;if(Math.abs(a.t-b.t)<4&&b.l>a.r-1&&b.l-a.r<60)segs.push(['v',(a.r+b.l)/2,a.t+4,Math.max(a.b,b.b)-2]);}));
  const rows=[...new Set(rs.map(r=>Math.round(r.t)))].sort((x,y)=>x-y);for(let k=1;k<rows.length;k++){const up=rs.filter(r=>Math.round(r.t)===rows[k-1]),y=(Math.max(...up.map(r=>r.b))+rows[k])/2;segs.push(['h',y,6,W-6])}
  const r=rnd(7);let out='';
  segs.forEach(([o,c,s0,s1])=>{const L=s1-s0,pt=(u,v)=>o==='v'?`${v.toFixed(1)},${u.toFixed(1)}`:`${u.toFixed(1)},${v.toFixed(1)}`;
    if(FG===1){/* zigzag cut: small teeth in cream, thin */let d='M'+pt(s0,c),u=s0,k=0;while(u<s1){u=Math.min(s1,u+5);d+=' L'+pt(u,c+(k++%2?-2.2:2.2))}out+=`<path d="${d}" fill="none" stroke="#f8f0d9" stroke-width="1.3" stroke-linejoin="round" opacity=".75"/>`}
    if(FG===2){/* a gold trace with a via at each end and a little jog */const m=s0+L*(.35+r()*.3);out+=`<path d="M${pt(s0+6,c)} L${pt(m-6,c)} L${pt(m,c+3)} L${pt(s1-6,c+3)}" fill="none" stroke="#0d0b10" stroke-width="3.6" stroke-linejoin="round"/><path d="M${pt(s0+6,c)} L${pt(m-6,c)} L${pt(m,c+3)} L${pt(s1-6,c+3)}" fill="none" stroke="#d9a32a" stroke-width="1.6" stroke-linejoin="round"/>`;
      [[s0+4,c],[s1-4,c+3]].forEach(([u,v])=>{const [x,y]=pt(u,v).split(',').map(Number);out+=`<circle cx="${x}" cy="${y}" r="3.2" fill="#0d0b10"/><circle cx="${x}" cy="${y}" r="2.2" fill="none" stroke="#ffd768" stroke-width="1.2"/>`})}
    if(FG===3){/* a dotted rule: cream dots that grow toward the middle and fade at the ends (halftone, used as a line) */const n=Math.floor(L/6);for(let k=0;k<=n;k++){const u=s0+k*L/n,f=Math.sin(Math.PI*k/n),rr=.5+1.1*f;const [x,y]=pt(u,c).split(',').map(Number);out+=`<circle cx="${x}" cy="${y}" r="${rr.toFixed(2)}" fill="#f8f0d9" opacity="${(.35+.5*f).toFixed(2)}"/>`}}});
  ov.innerHTML=out}
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
 <radialGradient id="t5g" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#fff0a8"/><stop offset=".5" stop-color="#f2be3e"/><stop offset="1" stop-color="#b9800f"/></radialGradient>
 <linearGradient id="t4gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".45" stop-color="#f2be3e"/><stop offset=".8" stop-color="#c8901c"/><stop offset="1" stop-color="#ffe08a"/></linearGradient>
 <filter id="t4ss" x="-5%" y="-15%" width="110%" height="135%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".5" numOctaves="2" seed="7" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="2" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="1" seed="3" result="g"/>
  <feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -3 2.45" result="gm"/>
  <feComposite in="d" in2="gm" operator="in" result="ink"/>
  <feOffset in="ink" dy="1.2" result="o"/><feColorMatrix in="o" type="matrix" values="0 0 0 0 0 0 0 0 0 .04 0 0 0 0 0 0 0 0 .55 0" result="sh"/>
  <feMerge><feMergeNode in="sh"/><feMergeNode in="ink"/></feMerge></filter><linearGradient id="q4em" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf0"/><stop offset=".5" stop-color="#ffe9a8"/><stop offset="1" stop-color="#ffb43a"/></linearGradient>
 <linearGradient id="q4gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c8"/><stop offset=".55" stop-color="#ffd25a"/><stop offset="1" stop-color="#ff9d1c"/></linearGradient>
 <linearGradient id="q4up" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ffeb"/><stop offset=".4" stop-color="#6ff59e"/><stop offset="1" stop-color="#16b955"/></linearGradient>
 <linearGradient id="q4dn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2da"/><stop offset=".4" stop-color="#ff6d5e"/><stop offset="1" stop-color="#e01f14"/></linearGradient>
 <filter id="q4lg" x="-30%" y="-30%" width="160%" height="160%"><feFlood flood-color="#ffe9a8"/><feComposite in2="SourceAlpha" operator="in" result="l"/><feGaussianBlur in="l" stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="l"/></feMerge></filter><filter id="q4etch" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".06" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
 </defs></svg>`;
/* ---------- beat 3 (H26 film4): "The whole game", a 2.39:1 film strip under How a round works ----------
   The strip bleeds edge to edge of the window at every width: a gold rail above, the glass, a rail with the board's lip and pins below
   (tiles cut from one 4K painting, repeated across; no side bezels, the strip runs off both edges). In the glass: the poster whole
   (16:9, the glass's full height) over a blurred copy of itself, and the film's title lit on the glass beside it (F4L 'title', the default),
   or the bet's lettering a size down above the strip ('chapter'), or a cinema letterboard on the top rail ('marquee').
   Glass height = min(width / 2.39, 560px): 163px at 390, 536 at 1280, 560 at 1920 (capped; 2.39:1 would be 803).
   A tap (or Enter/Space) opens the film with sound: phones hand it to their own full-screen player (iOS webkitEnterFullscreen, else
   requestFullscreen + a landscape lock), inside a page view that stays as the fallback; desktop opens a theatre (16:9, as big as the window
   allows, the same rails). Close, Escape or a click outside closes it and gives focus back. Nothing moves on the page; nothing animates at all.
   Gaps (round H26 rule, box to box): D = k·u + 0.45·ΔE, u = clamp(26px, 8vw, 32px); k 1 How a round works → its film,
   3.5 the top → How a round works, 5 the film → Meet the models (an edge connector drawn in it). ΔE = 0 on today's one green ground.
   Media: media/film4-rail-top.jpg media/film4-rail-bot.jpg media/film4-poster-blur.jpg media/film4-connector.jpg
   media/ez-landing-v4-poster-ez.jpg media/ez-landing-v4.mp4 media/ez-landing-v4.webm */
const F4M=window.__F4M||'media/',F4L=window.__F4L||'title',F4CAP=560;
let F4T='1:20',F4S=80;/* the running time: replaced from the film's own metadata as soon as the strip is near */
const f4fmt=s=>Math.floor(s/60)+':'+String(Math.round(s%60)).padStart(2,'0');
const f4aria=()=>`Play The whole game, a film of ${Math.floor(F4S/60)} minute${F4S>=120?'s':''}${F4S%60?' '+(F4S%60)+' seconds':''}, with sound`;
function film4(){
  const ttl=F4L==='title'?`<div class="f4-ttl" aria-hidden="true"><span class="f4-l">The</span><span class="f4-l">Whole</span><span class="f4-l">Game</span><span class="f4-run"><i class="f4-key"></i><b class="f4-t">${F4T}</b></span></div>`:'';
  const over=F4L==='title'?'':`<span class="f4-disc" aria-hidden="true"><i></i></span>`;
  const above=F4L==='chapter'?`<h2 class="f4-chap"><span class="t4-hw">The whole game</span><span class="f4-chr f4-t">${F4T}</span></h2>`
    :F4L==='marquee'?`<div class="f4-mq"><span class="f4-mqi"><span class="f4-mqw">The whole game</span><span class="f4-mqt f4-t">${F4T}</span></span></div>`:'';
  return `${above}<div class="f4-strip" role="button" tabindex="0" aria-label="${f4aria()}"><i class="f4-rt"></i><div class="f4-gl"><img class="f4-bl" src="${F4M}film4-poster-blur.jpg" alt="" draggable="false"><div class="f4-grp">${ttl}<div class="f4-pic"><img class="f4-po" src="media/ez-landing-v4-poster-ez.jpg" alt="" draggable="false">${over}</div></div><i class="f4-sc"></i></div><i class="f4-rb"></i></div><i class="f4-tr" aria-hidden="true"></i>`}
const f4u=()=>Math.min(32,Math.max(26,D.documentElement.clientWidth*.08));
const f4r=e=>{const r=e.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY,l:r.left,r:r.right,w:r.width,h:r.height}};
/* lay out the strip (bleed, heights, the title) and set the three gaps; idempotent, run from place() */
function f4fit(){const b3=sec.querySelector('.f4'),st=b3&&b3.querySelector('.f4-strip');if(!st)return;const vw=D.documentElement.clientWidth;
  /* bleed: the strip reaches both edges of the window, whatever the column's padding (desktop's column is 1180px, centred) */
  b3.style.marginLeft=b3.style.marginRight='0px';const br=b3.getBoundingClientRect();b3.style.marginLeft=(-br.left)+'px';b3.style.marginRight=(-(vw-br.right))+'px';
  const W=vw,hg=Math.min(W/2.39,F4CAP),k=Math.min(.16,Math.max(.1,W/3650)),pw=hg*16/9,bw=F4L==='title'?Math.min(W-pw,pw*.42):0;
  st.style.setProperty('--rt',(54*k).toFixed(2)+'px');st.style.setProperty('--rb',(205*k).toFixed(2)+'px');st.style.setProperty('--hg',hg.toFixed(2)+'px');
  st.style.setProperty('--pw',pw.toFixed(2)+'px');st.style.setProperty('--bw',bw.toFixed(2)+'px');
  const tt=st.querySelector('.f4-ttl');if(tt){/* the title: the widest line fills the band, the four rows fit the glass */
    tt.style.fontSize='100px';const pad=Math.max(8,bw*.1),ls=[...tt.querySelectorAll('.f4-l')],wmax=Math.max(...ls.map(l=>l.getBoundingClientRect().width));
    /* capped below "How a round works" (the beat's head stays the loudest words), the band then hugs the title */
    const h2=sec.querySelector('.t4-b2 .t4-h2'),cap=h2?parseFloat(getComputedStyle(h2).fontSize)*.86:64;let f=Math.min((bw-2*pad)/wmax*100,hg*.86/3.75);
    if(f>cap){f=cap;st.style.setProperty('--bw',(wmax*f/100+2*pad).toFixed(2)+'px')}tt.style.fontSize=f.toFixed(2)+'px';tt.style.paddingLeft=tt.style.paddingRight=pad.toFixed(1)+'px'}
  const mq=b3.querySelector('.f4-mqi');if(mq){mq.style.left=Math.max(12,(vw-Math.min(vw,1180))/2+12)+'px'}
  /* gaps */const u=f4u(),fl=sec.querySelector('.t4-frs'),g1=sec.querySelector('.t5-bg'),b1=sec.querySelector('.t4-b1 .t4-bleed'),h2=sec.querySelector('.t4-b2 .t4-h2');
  const first=b3.querySelector('.f4-chap .t4-hw,.f4-mqi')||st,cx=sec.querySelector('.f4-cx'),ch=D.querySelector('section.ch .ch-h');
  for(let i=0;i<2;i++){
    if(g1&&b1&&h2){const cur=f4r(h2).t-f4r(b1).b;g1.style.marginBottom=(parseFloat(getComputedStyle(g1).marginBottom)+3.5*u-cur)+'px'}
    if(fl){const cur=f4r(first).t-f4r(fl).b;b3.style.marginTop=(parseFloat(getComputedStyle(b3).marginTop)+u-cur)+'px'}
    if(cx){const cl=Math.max(14,u*.6),want=5*u;cx.style.height=(want-2*cl)+'px';cx.style.marginTop=cl+'px';cx.style.marginLeft=b3.style.marginLeft;cx.style.marginRight=b3.style.marginRight;
      if(ch){const cur=f4r(ch).t-f4r(st).b;cx.style.marginBottom=(parseFloat(getComputedStyle(cx).marginBottom)+want-cur)+'px'}}}
  /* the joint: a gold trace from the frames' centre gutter down into the strip's top rail */
  const tr=b3.querySelector('.f4-tr');if(tr&&fl){const y0=f4r(fl).b-6,y1=f4r(first).t+2,bt=f4r(b3).t;tr.style.top=(y0-bt)+'px';tr.style.height=Math.max(0,y1-y0)+'px';tr.style.left=(f4r(fl).l+f4r(fl).w/2-f4r(b3).l-1)+'px'}
  sec.dataset.f4=JSON.stringify({u:+u.toFixed(1),beat:g1&&b1&&h2?+(f4r(h2).t-f4r(b1).b).toFixed(1):null,film:fl?+(f4r(first).t-f4r(fl).b).toFixed(1):null,chapter:ch?+(f4r(ch).t-f4r(st).b).toFixed(1):null,strip:[+f4r(st).w.toFixed(1),+f4r(st).h.toFixed(1)],glass:+hg.toFixed(1)})}
/* open: one <video>, made on the first tap, moved into the page view or the theatre */
let f4v=null,f4lb=null,f4back=null;
function f4video(){if(f4v)return f4v;f4v=D.createElement('video');f4v.className='f4-v';f4v.playsInline=true;f4v.preload='auto';f4v.controls=true;f4v.poster='media/ez-landing-v4-poster-ez.jpg';
  f4v.innerHTML='<source src="media/ez-landing-v4.mp4" type="video/mp4"><source src="media/ez-landing-v4.webm" type="video/webm">';
  return f4v}
function f4close(){if(!f4lb)return;if(f4v){f4v.pause()}const d=D.fullscreenElement;if(d&&D.exitFullscreen)D.exitFullscreen().catch(()=>{});f4lb.remove();f4lb=null;D.removeEventListener('keydown',f4key,true);if(f4back)f4back.focus({preventScroll:true})}
function f4key(e){if(!f4lb)return;if(e.key==='Escape'){e.preventDefault();f4close()}else if(e.key==='Tab'){const f=[...f4lb.querySelectorAll('button,video')];const i=f.indexOf(D.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}}
function f4open(still){const vw=D.documentElement.clientWidth,vh=innerHeight,ph=vw<760;f4back=D.activeElement;
  f4lb=D.createElement('div');f4lb.className='f4-lb'+(ph?' f4-ph':'');f4lb.setAttribute('role','dialog');f4lb.setAttribute('aria-modal','true');f4lb.setAttribute('aria-label','The whole game');
  const w=ph?vw:Math.min(vw-96,(vh-150)*16/9),k=Math.min(.16,Math.max(.1,w/3650));
  f4lb.innerHTML=`<div class="f4-lbh" aria-hidden="true"><i class="f4-key"></i>The whole game<b class="f4-t">${F4T}</b></div><div class="f4-lbs" style="width:${w.toFixed(1)}px;--rt:${(54*k).toFixed(2)}px;--rb:${(205*k).toFixed(2)}px"><i class="f4-rt"></i><div class="f4-lbg" style="height:${(w*9/16).toFixed(1)}px"></div><i class="f4-rb"></i></div>${ph?'<div class="f4-hint">Turn your phone for full screen</div>':''}<button class="f4-x" type="button" aria-label="Close the film">✕</button>`;
  D.body.appendChild(f4lb);const v=f4video();f4lb.querySelector('.f4-lbg').appendChild(v);
  f4lb.querySelector('.f4-x').addEventListener('click',f4close);f4lb.addEventListener('click',e=>{if(e.target===f4lb)f4close()});D.addEventListener('keydown',f4key,true);
  if(still)return;v.muted=false;const p=v.play();p&&p.catch(()=>{});
  /* phones: the phone's own player, full screen (inside the tap's gesture); the page view stays behind it as the fallback */
  if(ph){try{if(v.webkitEnterFullscreen&&!v.requestFullscreen)v.webkitEnterFullscreen();else if(v.requestFullscreen)v.requestFullscreen().then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})).catch(()=>{});else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}catch(e){}}
  else f4lb.querySelector('.f4-x').focus({preventScroll:true})}
function f4wire(){const b3=sec.querySelector('.f4'),st=b3&&b3.querySelector('.f4-strip');if(!st)return;
  st.addEventListener('click',()=>f4open());st.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f4open()}});
  /* the running time from the file, read once the strip is near (metadata only) */
  const probe=()=>{const v=D.createElement('video');v.preload='metadata';v.muted=true;v.src='media/ez-landing-v4.mp4';v.onloadedmetadata=()=>{const s=Math.round(v.duration||0);if(s>0){F4S=s;F4T=f4fmt(s);D.querySelectorAll('.f4-t').forEach(t=>t.textContent=F4T);st.setAttribute('aria-label',f4aria());f4fit()}v.removeAttribute('src');v.load()}};
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();probe()}},{rootMargin:'600px 0px'});io.observe(st)}else probe();
  /* Meet the models is built by another script: refit the chapter gap once its head exists */
  let n=0;(function wait(){if(D.querySelector('section.ch .ch-h')){f4fit();return}if(++n<60)setTimeout(wait,250)})();
  window.__f4open=f4open}
/* ---------- mount ---------- */
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="t4-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet');
D.querySelectorAll('section.t4').forEach(s=>s.remove());const sec=D.createElement('section');sec.className='t4 t5 t5-s'+SH+' t5-g'+GT;sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=1000;
  sec.innerHTML=`<div class="t4-b1">${DEFS}<h1 class="t4-h1"><span class="t4-hw t4-hw0">${lt('Four AIs call earnings.')}</span><span class="t4-hw t4-hw1">The market keeps score.</span></h1><div class="t4-bleed">${hero(wide)}</div></div>
   ${beatGut()}
   <div class="t4-b2 r3-C3"><h2 class="t4-h2"><span class="t4-hw">How a round works</span></h2><ol class="t4-frs r3 r3c3">${frames()}</ol></div>
   <div class="t4-b3 f4 f4-L${F4L}" role="group" aria-label="The whole game, the film">${film4()}</div><div class="f4-cx" aria-hidden="true"></div>`;
  requestAnimationFrame(()=>{place(sec);q4k(sec)});wire()}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
/* ---------- states (H23): every fact shows from the start. Small life in the world while the frames are on screen: the dies re-scan one after
   another, the readout re-scans, the ledger's cursor blinks, a glint crosses the gold. A tap replays the frame's moment. Still with reduced motion. ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function wire(){const fs=[...sec.querySelectorAll('.t4-fr')],fl=sec.querySelector('.t4-frs');
  /* STILL (owner, 2026-11-02: "no animation or pulsing or anything... just the numbers are always displayed"): no loops on screen, no tap replay */
  if(false){fs.forEach(f=>{f.addEventListener('click',()=>{f.classList.remove('q4-go');void f.offsetWidth;f.classList.add('q4-go');setTimeout(()=>f.classList.remove('q4-go'),2400)});
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}})});
  if('IntersectionObserver' in window&&fl)new IntersectionObserver(es=>{fl.classList.toggle('q4-vis',es[es.length-1].isIntersecting)},{rootMargin:'80px 0px'}).observe(fl);else fl&&fl.classList.add('q4-vis')}

  f4wire()}
c3key='';build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(lw>=1000)){lw=innerWidth;c3key='';build()}else{place(sec);q4k(sec)}});
D.fonts&&D.fonts.ready.then(()=>{c3key='';place(sec);q4k(sec)});
window.__t5=window.__t4={rebuild:build,place:()=>{place(sec);q4k(sec)},all:()=>{},
  data:{ex:EX.n,co:EX.co,t:EX.ticker,out:EX.out,win:EX.win,calls:calls.map(c=>c.m+(c.up?'+':'-')+c.v),lead,pnl:pnl(lead),wl:A[lead].W+'-'+A[lead].L,graded,calls2:calls.map(c=>c.m+':'+(c.up?'long':'short'))}};
D.documentElement.classList.add('t4-ready','t5-ready');
})();

}catch(e){window.__x2pTopErr=window.__q4Err=e;console.error(e)}})()})();
