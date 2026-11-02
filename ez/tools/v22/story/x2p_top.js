/* X2+ TOP, H23 quad4 (ported 2026-11-02). Media: media/top-h23-call.jpg media/top-h23-close.jpg media/top-h23-ledger.jpg media/top-t4-one-b-h22.jpg media/top-hero-t-h22.jpg media/top-hero-w-h22.jpg media/top-t3-screen-h22.jpg media/ez-landing-v4-poster-ez.jpg media/ez-landing-v4.mp4 */
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
  return {html:`<div class="t4-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner?inner(bw,bh):''}<svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}}
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
function place(root){fitHead(root);fitLines(root);requestAnimationFrame(()=>{root.querySelectorAll('.t5-bg').forEach(drawBeat);gutters(root)});const h2=root.querySelector('.t4-b2 .t4-h2'),fl=root.querySelector('.t4-frs');if(h2&&fl){const hr=h2.querySelector('.t4-hw').getBoundingClientRect();root.style.setProperty('--t4ov',Math.max(0,hr.bottom-fl.getBoundingClientRect().top)+'px');
   /* a caption moves down only in the frames the heading actually crosses */
   fl.querySelectorAll('.t4-fr').forEach(f=>{const c=f.querySelector('.t4-cap'),r=f.getBoundingClientRect();if(!c)return;c.style.top=(Math.min(hr.right,r.right)-Math.max(hr.left,r.left)>r.width*.25&&hr.bottom>r.top)?(hr.bottom-r.top+3)+'px':''})}root.querySelectorAll('.t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.t4-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)});
  const sec4=p.closest('.t4'),hf=parseFloat(getComputedStyle(sec4.querySelector('.t4-h1')).fontSize),lf=parseFloat(sec4.dataset.t6base||getComputedStyle(sec4.querySelector('.t4-ln')).fontSize),px=Math.round(Math.sqrt(hf*lf)*2)/2;sec4.dataset.swpx=px;
  /* top5: the sub-head sits between "How a round works" and the line: the geometric mean of the two, a step up (x1.1) */
  sec4.style.setProperty('--t5sh',Math.round(px*1.1*2)/2+'px');sec4.dataset.shpx=Math.round(px*1.1*2)/2;
  p.querySelectorAll('.t4-at').forEach(e=>{const[x,y,w,h]=e.dataset.r.split(',').map(Number);Object.assign(e.style,{left:(x-cx)*k+'px',top:(y-cy)*k+'px',width:w*k+'px',height:h*k+'px'})})})}
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
const dieQ4=c=>(w,h)=>{const s=h*.165,f1=h*.17,nm=NM[c.m].toUpperCase(),tot=s+f1*.28+tw(nm,f1),x0=w/2-tot/2,t=(c.up?'+':'−')+c.v+'%',f2=Math.min(h*.36,w*.86/(t.length*.47));
  /* owner, 2026-11-02: centred in the die. The call and the AI's line form one block; the block's middle is the die's middle (cap height .86 em) */
  const g=h*.09,H=f2*.86+g+f1*.86,y2=h/2-H/2+f2*.86,y1=y2+g+f1*.86;
  return `<g class="q4-g">`+TX(w/2,y2,f2,t,{a:'middle',f:em(c.up?'up':'dn'),cls:'q4-big'})+mark(c.m,x0,y1-s*.86,s)+TX(x0+s+f1*.28,y1,f1,nm)+`</g>`};
/* CLOSE: the readout fills the frame: company and ticker, the move, who wins */
const coLogo=(x,y,sz)=>{const L=(window.CO_LOGOS||{})[EX.ticker],f=L&&(L.f||L);return f?`<image href="media/${f}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" preserveAspectRatio="xMidYMid meet" filter="url(#q4lg)"/>`:''};
const readQ4=(w,h)=>{const co=String(EX.co).toUpperCase(),W=wins(EX),wn=W[0],one=W.length===1,wt=one?NM[wn].toUpperCase()+' WINS':W.length?W.map(m=>NM[m].toUpperCase()).join(' & ')+' TIE':'NOBODY WINS',
  /* owner, 2026-11-02: the move exactly in the middle of the readout; the company (its logo beside the name, no ticker) above and who wins below, mirrored */
  mv=mn(EX.out),f2=Math.min(h*.4,w*.62/(mv.length*.47)),f1=Math.min(h*.15,w*.5/(co.length*.47),w*.5/(wt.length*.47)),g=h*.085,
  ls=f1*1.25,lw=(window.CO_LOGOS||{})[EX.ticker]?ls+f1*.35:0,t1=lw+tw(co,f1),x1=w/2-t1/2,ms=f1*1.15,t3=(one?ms+f1*.3:0)+tw(wt,f1),x3=w/2-t3/2,
  y2=h/2+f2*.43,y1=h/2-f2*.43-g,y3=h/2+f2*.43+g+f1*.86;
  return `<g class="q4-g">`+(lw?coLogo(x1,y1-f1*.43-ls/2,ls):'')+TX(x1+lw,y1,f1,co)+TX(w/2,y2,f2,mv,{a:'middle',f:em(EX.a>0?'up':'dn'),cls:'q4-big'})
   +(one?mark(wn,x3,y3-f1*.95,ms):'')+TX(x3+(one?ms+f1*.3:0),y3,f1,wt,{f:em('gd')})+`</g>`};
/* LEDGER: rows of the record. Row: line 1 round + ticker, the move on the right; line 2 the company, the winner on the right */
/* the winners of a round: none, one, or a tie (the sheet joins tied winners with " & ") */
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>NM[m]);
const rowQ4=(r,cls)=>(w,h)=>{const f=h*.3,mv=r.a>0?'up':'dn',W=wins(r),co=String(r.co).toUpperCase(),ws=f*.95,
   avail=w*.86,wl0=W.length===1?NM[W[0]].toUpperCase():W.length?'TIE':'NOBODY',fit2=wl=>{const ww=W.length*(ws+f*.2)+(wl?tw(wl,f*.9):0);return [ww,Math.min(f,(avail-ww-f*.4)/(co.length*.47))]};
   /* the winner's name goes when the company would have to shrink below .82 of the row's type: its mark stays (a word only for a tie or nobody) */
   let wl=wl0,[ww,f2]=fit2(wl);if(f2<f*.82&&W.length){wl='';[ww,f2]=fit2('')}
   return `<g class="q4-g ${cls}">`+TX(w*.05,h*.42,f,'R'+r.n,{f:em('gd')})+TX(w*.05+tw('R'+r.n+'  ',f),h*.42,f,r.ticker||'')+TX(w*.95,h*.42,f,mn(r.out),{a:'end',f:em(mv)})
    +TX(w*.05,h*.84,f2,co)+W.map((m,i)=>mark(m,w*.95-ww+i*(ws+f*.2),h*.84-ws*.82,ws)).join('')+(wl?TX(w*.95,h*.84,f*.9,wl,{a:'end',f:em('gd')}):'')+`</g>`};
const rowNext=(w,h)=>{const f=h*.3,n=EX.n+1;return `<g class="q4-g q4-nx">`+TX(w*.05,h*.42,f,'R'+n,{f:em('gd')})+`<rect class="q4-cur" x="${(w*.05+tw('R'+n+'  ',f)).toFixed(1)}" y="${(h*.42-f*.74).toFixed(1)}" width="${(f*.42).toFixed(1)}" height="${(f*.78).toFixed(1)}" fill="url(#q4em)"/></g>`};
function ledgerQ4(){const prev=G.slice(Math.max(0,iEx-2),iEx),q=Q4.ledger.q,S=[];
  prev.forEach((r,i)=>S.push(surf(q[i+(2-prev.length)],rowQ4(r,'q4-old'),'q4-glass q4-row')));
  S.push(surf(q[2],rowQ4(EX,'q4-new'),'q4-glass q4-row',scan));S.push(surf(q[3],rowNext,'q4-glass q4-row'));return S}
/* BOARD: the gold lid, the leader's mark and name stamped into the metal (multiplied, a pale lip under each stroke) */
const lidQ4=lip=>(w,h)=>{const nm=NM[lead].toUpperCase(),s=h*.24,f=Math.min(h*.3,(w*.62)/(nm.length*.47)),tot=s+f*.3+tw(nm,f),x0=w/2-tot/2,y=h*.55;
  const body=(fill,dy)=>`<g transform="translate(0 ${dy.toFixed(1)})">`+mark(lead,x0,y-s*.86,s,fill)+`<text x="${(x0+s+f*.3).toFixed(1)}" y="${y.toFixed(1)}" font-size="${f.toFixed(1)}" fill="${fill}" class="t4-an">${esc(nm)}</text></g>`;
  return lip?`<g filter="url(#q4etch)">${body('#fff6cf',h*.007)}</g>`:`<g filter="url(#q4etch)">${body('#4a2c06',0)}</g>`};
const leadSurf=(w,h)=>{const s=Math.min(h*.5,w*.3),x=w*.08+s*1.15,tw2=w*.92-x,fz=fit(NM[lead],tw2,h*.38);
  return `<g class="t4-eg">`+mark(lead,w*.07,h/2-s/2,s,'#2a1a06')+T(x,h/2+fz*.36,fz,NM[lead].toUpperCase(),{c:'#2a1a06',cls:'t4-an t4-eng'})+`</g>`};
const crQ=k=>{const[,,cw,ch]=Q4[k].crop;return [0,0,cw,ch]};
const picQ=(k,S,cls,extra)=>{const[,,cw,ch]=Q4[k].crop;return pic(IMQ+Q4[k].file,cw,ch,S,cls,extra,[0,0,cw,ch])};
function frames(){const cap=t=>`<div class="t4-cap">${t}</div>`;
  const F={call:{w:'CALL',k:'call',l:LINES.call,cap:`R${EX.n} · ${esc(EX.co)} (${EX.ticker}) · ${md(EX.called)}`,
    p:picQ('call',calls.map((c,i)=>surf(Q4.call.q[i],dieQ4(c),'q4-glass q4-die q4-d'+i,scan)),'',glares('call'))},
   close:{w:'CLOSE',k:'close',l:LINES.close,cap:`At the close · ${md(EX.resolves)}`,
    p:picQ('close',[surf(Q4.close.q[0],readQ4,'q4-glass q4-rd',scan)],'',glares('close')+at(-40,-120,300,300,'q4-ring')+at(-40,-120,300,300,'q4-ring r2'))},
   ledger:{w:'LEDGER',k:'ledger',l:LINES.ledger,cap:`Round ${EX.n} · ${md(EX.resolves)}`,
    p:picQ('ledger',ledgerQ4(),'',glares('ledger'))},
   board:{w:'BOARD',k:'board',l:LINES.board,cap:'Top of the board',
    p:pic('media/top-t4-one-b-h22.jpg',1024,1024,[surf([[300,252],[652,212],[748,520],[388,568]],leadSurf,'t4-gold')],'','',[50,80,920,920])}};
  return ['call','close','ledger','board'].map(k=>F[k]).map((f,i)=>`<li class="t4-fr q4-fr q4-${f.k} t4-on" tabindex="0" role="button" aria-label="${i+1} ${f.w}: ${esc(f.l)}"><div class="t4-ink"><div class="t4-art">${f.p}</div></div>${sub(i+1,f.w)}<p class="t4-ln">${lh(f.l)}</p></li>`).join('')}
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
/* ---------- beat 3: the film on the board's own display ---------- */
const FILM={G:['The whole game','1:20']};
function film(){const v=`<video class="t4-v" playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg"><source src="media/ez-landing-v4.mp4" type="video/mp4"></video><i class="t4-glare"></i><button class="t4-play" aria-label="Play the explainer"><i></i></button>`;
  return pic('media/top-t3-screen-h22.jpg',1024,768,[],'t4-scr',at(118,128,790,488,'t4-glass-v',v),[72,77,878,594])}
/* ---------- mount ---------- */
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="t4-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet');
D.querySelectorAll('section.t4').forEach(s=>s.remove());const sec=D.createElement('section');sec.className='t4 t5 t5-s'+SH+' t5-g'+GT;sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=1000,[fh,fs]=FILM[FH];
  sec.innerHTML=`<div class="t4-b1">${DEFS}<h1 class="t4-h1"><span class="t4-hw t4-hw0">${lt('Four AIs call earnings.')}</span><span class="t4-hw t4-hw1">The market keeps score.</span></h1><div class="t4-bleed">${hero(wide)}</div></div>
   ${beatGut()}
   <div class="t4-b2"><h2 class="t4-h2"><span class="t4-hw">How a round works</span></h2><ol class="t4-frs">${frames()}</ol></div>
   ${beatGut()}
   <div class="t4-b3"><h2 class="t4-h2 t4-fh t4-F${FH}"><span class="t4-hw">${esc(fh)}</span>${fs?` <span class="t4-hw t4-hws">${esc(fs)}</span>`:''}</h2><div class="t4-bleed">${film()}</div></div>`;
  requestAnimationFrame(()=>{place(sec);q4k(sec)});wire()}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
/* ---------- states (H23): every fact shows from the start. Small life in the world while the frames are on screen: the dies re-scan one after
   another, the readout re-scans, the ledger's cursor blinks, a glint crosses the gold. A tap replays the frame's moment. Still with reduced motion. ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function wire(){const fs=[...sec.querySelectorAll('.t4-fr')],fl=sec.querySelector('.t4-frs');
  if(!RM){fs.forEach(f=>{f.addEventListener('click',()=>{f.classList.remove('q4-go');void f.offsetWidth;f.classList.add('q4-go');setTimeout(()=>f.classList.remove('q4-go'),2400)});
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}})});
  if('IntersectionObserver' in window&&fl)new IntersectionObserver(es=>{fl.classList.toggle('q4-vis',es[es.length-1].isIntersecting)},{rootMargin:'80px 0px'}).observe(fl);else fl&&fl.classList.add('q4-vis')}

  const v=sec.querySelector('.t4-v'),b=sec.querySelector('.t4-play');
  if(v&&b){b.addEventListener('click',()=>{v.muted=false;v.controls=true;v.play().catch(()=>{});b.hidden=true});
    v.addEventListener('loadedmetadata',()=>{const s=Math.round(v.duration||80),t=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');sec.querySelectorAll('.t4-fh .t4-hw').forEach(x=>x.textContent=x.textContent.replace(/\d:\d\d/,t).replace(/\b80 seconds|80-second/,m=>m.replace('80',String(s))))})}}
build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(lw>=1000)){lw=innerWidth;build()}else{place(sec);q4k(sec)}});
D.fonts&&D.fonts.ready.then(()=>{place(sec);q4k(sec)});
window.__t5=window.__t4={rebuild:build,place:()=>{place(sec);q4k(sec)},all:()=>{},
  data:{ex:EX.n,co:EX.co,t:EX.ticker,out:EX.out,win:EX.win,calls:calls.map(c=>c.m+(c.up?'+':'-')+c.v),lead,pnl:pnl(lead),wl:A[lead].W+'-'+A[lead].L,graded,prev:G.slice(Math.max(0,iEx-2),iEx).map(r=>r.n)}};
D.documentElement.classList.add('t4-ready','t5-ready');
})();

}catch(e){window.__x2pTopErr=window.__q4Err=e;console.error(e)}})()})();
