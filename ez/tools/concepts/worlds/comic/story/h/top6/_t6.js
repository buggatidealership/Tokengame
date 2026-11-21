/* Round H20 · top5: top4 option 1 (cream, CALL / CLOSE / LEDGER / BOARD, order 1) with the owner's H20 notes (BRIEF-H Round H20):
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
const D=document,WS='b',INK='cream',ORD=1,FH='G',AUTO=window.__T4auto!==false,SH=+(window.__T5S||3),GT=+(window.__T5G||2),BG=+(window.__T6B||1),FG=+(window.__T6F||2),LV=window.__T6L||'a';

/* top6 (Round H21): the four frame lines. LV = 'a' the full lines at today's size; 'b' the same, with "4 AIs submit their predictions" kept on line 1
   (all four lines take the size that clause needs); 'c' the shorter "4 AIs submit predictions ..." (fitted the same way, only if it needs it); 'd' = c with a shorter CLOSE line (my suggestion). */
const KL={a:'4 AIs submit their predictions',b:'4 AIs submit their predictions',c:'4 AIs submit predictions',d:'4 AIs submit predictions'}[LV]||'4 AIs submit their predictions';
const LINES={call:KL+' before the earnings report.',close:LV==='d'?'The close after the report decides who wins.':'The next market close after the report decides who wins.',ledger:'Every round is written to the ledger.',board:'The ledger ranks the board.'};
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
   fl.querySelectorAll('.t4-fr').forEach(f=>{const c=f.querySelector('.t4-cap'),r=f.getBoundingClientRect();c.style.top=(Math.min(hr.right,r.right)-Math.max(hr.left,r.left)>r.width*.25&&hr.bottom>r.top)?(hr.bottom-r.top+3)+'px':''})}root.querySelectorAll('.t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
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
  return pic(I1+(wide?'a-hero-w-2k.jpg':'a-hero-t-2k.jpg'),wide?1280:768,wide?720:1024,[...rank.map((m,i)=>surf(Q[i],dieAI(m),'t4-glass')),surf(QB,led(`SEASON 1 · ${graded} ROUNDS GRADED`),'t4-glass')],'t4-hero','',wide?[150,90,1000,560]:[0,40,768,900])}
/* ---------- beat 2: the four frames ---------- */
const QCALL=[[[277,289],[437,272],[466,399],[302,410]],[[488,268],[641,253],[676,378],[521,391]],[[314,458],[479,440],[512,583],[341,599]],[[537,433],[696,420],[732,558],[568,573]]];
const dieCall=c=>(w,h)=>{const s=Math.min(w,h),t=(c.up?'+':'−')+c.v+'%';return `<g class="t4-lit">`+mark(c.m,w/2-s*.17,h*.08,s*.34)+T(w/2,h*.6,s*.19,NM[c.m].toUpperCase(),{a:'middle',cls:'t4-an'})+T(w/2,h*.9,s*.27,t,{a:'middle',c:c.up?UPC:DNC,cls:'t4-an t4-call'})+`</g>`};
/* the buzzer's readout: a landscape glass beside the piezo buzzer (the chip's own bell) */
const QBUZZ=[[500,396],[856,322],[874,446],[542,522]];
const readout=(w,h)=>{const co=(EX.co+' ('+EX.ticker+')').toUpperCase(),wn=(NM[win]||win).toUpperCase()+' WINS',fw=fit(wn,w*.5,h*.17),tw=wn.length*fw*.47;
  return `<g class="t4-ro">`+T(w/2,h*.25,fit(co,w*.84,h*.17),co,{a:'middle',c:'#ffc23a',cls:'t4-an'})+T(w/2,h*.63,fit(EX.out,w*.5,h*.4),EX.out,{a:'middle',c:EX.a>0?UPC:DNC,cls:'t4-an t4-move'})
   +mark(win,w/2-tw/2-h*.2,h*.735,h*.17)+T(w/2+h*.1,h*.88,fw,wn,{a:'middle',c:'#ffd768',cls:'t4-an t4-win'})+`</g>`
   +`<rect class="t4-cur" x="${w*.48}" y="${h*.42}" width="${w*.04}" height="${h*.18}" fill="#ffc23a"/>`};
/* the ledger: five ruled rows; row 1 the header, then the two rounds before the example, the example (row 4, written by the head), row 5 blank */
const LROW=[[[141,265],[909,284],[909,346],[141,322]],[[141,322],[909,346],[909,402],[141,383]],[[141,383],[909,402],[909,459],[141,445]],[[141,445],[909,459],[909,515],[141,505]]];
const COLS={r:.06,c:.17,m:.7,w:.75};
const ledgerHead=(wv,hv)=>{const f=hv*.36,y=hv*.66,o={c:'#ffc23a',cls:'t4-an t4-lh',ls:'.08em'};
  return `<g class="t4-hd">`+T(wv*COLS.r,y,f,'ROUND',o)+T(wv*COLS.c,y,f,'COMPANY',o)+T(wv*COLS.m,y,f,'MOVE',{...o,a:'end'})+T(wv*COLS.w,y,f,'WINNER',o)+`</g>`};
const ledgerRow=(r,cls)=>(wv,hv)=>{const f=hv*.56,y=hv*.72,mv=r.a>0?UPC:DNC,wn=String(r.win||'').toUpperCase(),one=wn&&!/,|&| /.test(wn)&&NM[wn],co=String(r.co).toUpperCase();
   return `<g class="${cls}">`+T(wv*COLS.r,y,f,'R'+r.n,{c:'#ffc23a',cls:'t4-an'})+T(wv*COLS.c,y,Math.min(f,fit(co,wv*(COLS.m-COLS.c-.14),f)),co,{c:'#f8f0d9',cls:'t4-an'})
    +T(wv*COLS.m,y,f,r.out,{a:'end',c:mv,cls:'t4-an'})+(one?mark(wn,wv*COLS.w,hv*.2,hv*.58)+T(wv*COLS.w+hv*.72,y,f,NM[wn].toUpperCase(),{c:'#ffd768',cls:'t4-an'}):T(wv*COLS.w,y,f,'NOBODY',{c:'#bdb4a0',cls:'t4-an'}))+`</g>`};
function ledgerSurfs(){const prev=G.slice(Math.max(0,iEx-2),iEx),S=[surf(LROW[0],ledgerHead,'t4-glass t4-row')];
  prev.forEach((r,i)=>S.push(surf(LROW[1+i+(2-prev.length)],ledgerRow(r,'t4-old'),'t4-glass t4-row')));
  S.push(surf(LROW[3],ledgerRow(EX,'t4-new'),'t4-glass t4-row t4-wr'));
  return S}
/* the gold lid: the leader engraved */
const leadSurf=(w,h)=>{const s=Math.min(h*.5,w*.3),x=w*.08+s*1.15,tw=w*.92-x,l2=$(pnl(lead)),l3=A[lead].W+'-'+A[lead].L+' · Season P&L';
  return `<g class="t4-eg">`+mark(lead,w*.07,h/2-s/2,s,'#2a1a06')+T(x,h*.4,fit(NM[lead],tw,h*.3),NM[lead].toUpperCase(),{c:'#2a1a06',cls:'t4-an t4-eng'})+T(x,h*.66,fit(l2,tw,h*.2),l2,{c:'#2a1a06',cls:'t4-an t4-eng'})+T(x,h*.84,fit(l3,tw,h*.1),l3,{c:'#3a260b',cls:'t4-an t4-eng'})+`</g>`};
/* the step word, silkscreened on the painting's bare strip of board: Bangers, in perspective, ink grain, no stroke or drop.
   Its font size is set in screen px by place() from --t4swpx (between the headline's and the line's). */
const INKS={cream:'#efe6cc',green:'#5ef08f',gold:'url(#t4gold)'};
const sw=t=>(w,h)=>`<text class="t4-sw" x="${w*.05}" y="${h*.78}" font-size="${h*.7}" fill="${INKS[INK]||INKS.cream}" filter="url(#t4ss)">${esc(t)}</text>`;
const STRIP={call:[[214,731],[954,649],[976,719],[222,799]],close:[[170,738],[930,554],[964,640],[190,844]],ledger:[[60,614],[950,614],[950,768],[60,768]],board:[[242,686],[932,598],[952,686],[258,790]]};
function frames(){const cap=t=>`<div class="t4-cap">${t}</div>`;const W2=WS==='a'?'#1':'BOARD';
  const st=(k,w)=>surf(STRIP[k],sw(w),'t4-strip');
  const F={call:{w:'CALL',k:'call',l:LINES.call,cap:`R${EX.n} · ${esc(EX.co)} (${EX.ticker}) · ${md(EX.called)}`,
    p:pic(I4+'t4-call.jpg',1024,1024,[...calls.map((c,i)=>surf(QCALL[i],dieCall(c),'t4-glass t4-die t4-d'+i))],'','',[120,0,870,870])},
   close:{w:'CLOSE',k:'bell',l:LINES.close,cap:`At the close · ${md(EX.resolves)}`,
    p:pic(I4+'t4-buzz-b.jpg',1024,1024,[surf(QBUZZ,readout,'t4-glass t4-rd')],'',
      at(70,40,520,320,'t4-veil')+at(222,326,184,214,'t4-knob',`<img src="${I4}t4-buzz-b.jpg" alt="" style="width:${(1024/184*100).toFixed(2)}%;left:${(-222/184*100).toFixed(2)}%;top:${(-326/214*100).toFixed(2)}%">`)+at(162,250,300,300,'t4-ring')+at(162,250,300,300,'t4-ring r2'),[60,40,950,950])},
   ledger:{w:'LEDGER',k:'ledger',l:LINES.ledger,cap:`Round ${EX.n} · ${md(EX.resolves)}`,
    p:pic(I4+'t4-ledger-d.jpg',1024,1024,[...ledgerSurfs()],'',at(80,474,80,66,'t4-head'),[30,60,960,960])},
   board:{w:W2,k:'one',l:LINES.board,cap:'Top of the board',
    p:pic(I4+'t4-one-b.jpg',1024,1024,[surf([[300,252],[652,212],[748,520],[388,568]],leadSurf,'t4-gold')],'','',[50,80,920,920])}};
  const seq=ORD===2?['call','close','board','ledger']:['call','close','ledger','board'];
  return seq.map(k=>F[k]).map((f,i)=>`<li class="t4-fr t4-${f.k}" tabindex="0" role="button" aria-pressed="false" aria-label="${i+1} ${f.w}: ${esc(f.l)}"><div class="t4-ink"><div class="t4-art">${cap(f.cap)}${f.p}</div></div>${sub(i+1,f.w)}<p class="t4-ln">${lh(f.l)}</p></li>`).join('')}
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
  <feMerge><feMergeNode in="sh"/><feMergeNode in="ink"/></feMerge></filter></defs></svg>`;
/* ---------- beat 3: the film on the board's own display ---------- */
const FILM={G:['The whole game','1:20']};
function film(){const v=`<video class="t4-v" playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg"><source src="media/ez-landing-v4.mp4" type="video/mp4"></video><i class="t4-glare"></i><button class="t4-play" aria-label="Play the explainer"><i></i></button>`;
  return pic(I3+'t3-screen-t.jpg',1024,768,[],'t4-scr',at(118,128,790,488,'t4-glass-v',v),[72,77,878,594])}
/* ---------- mount ---------- */
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="t4-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet');
const sec=D.createElement('section');sec.className='t4 t5 t5-s'+SH+' t5-g'+GT;sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=1000,[fh,fs]=FILM[FH];
  sec.innerHTML=`<div class="t4-b1">${DEFS}<h1 class="t4-h1"><span class="t4-hw t4-hw0">${lt('Four AIs call earnings.')}</span><span class="t4-hw t4-hw1">The market keeps score.</span></h1><div class="t4-bleed">${hero(wide)}</div></div>
   ${beatGut()}
   <div class="t4-b2"><h2 class="t4-h2"><span class="t4-hw">How a round works</span></h2><ol class="t4-frs">${frames()}</ol></div>
   ${beatGut()}
   <div class="t4-b3"><h2 class="t4-h2 t4-fh t4-F${FH}"><span class="t4-hw">${esc(fh)}</span>${fs?` <span class="t4-hw t4-hws">${esc(fs)}</span>`:''}</h2><div class="t4-bleed">${film()}</div></div>`;
  requestAnimationFrame(()=>place(sec));wire()}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
/* ---------- states: every frame starts off; a tap (or 3 s on screen) turns it on ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function on(f,how){if(f.classList.contains('t4-on'))return;f.classList.add('t4-on','t4-go');f.setAttribute('aria-pressed','true');if(how)f.dataset.how=how;setTimeout(()=>f.classList.remove('t4-go'),2600)}
function wire(){const fs=[...sec.querySelectorAll('.t4-fr')];
  fs.forEach(f=>{f.addEventListener('click',()=>{if(f.classList.contains('t4-on')){f.classList.remove('t4-go');void f.offsetWidth;f.classList.add('t4-go');setTimeout(()=>f.classList.remove('t4-go'),2600)}else on(f,'tap')});
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}})});
  if(RM){fs.forEach(f=>on(f,'rm'));return}
  if(AUTO){const tm=new Map(),io=new IntersectionObserver(es=>es.forEach(e=>{const f=e.target;
      if(e.intersectionRatio>=.6&&!tm.has(f))tm.set(f,setTimeout(()=>on(f,'auto'),3000));
      else if(e.intersectionRatio<.6&&tm.has(f)){clearTimeout(tm.get(f));tm.delete(f)}}),{threshold:[0,.6,1]});fs.forEach(f=>io.observe(f))}
  const v=sec.querySelector('.t4-v'),b=sec.querySelector('.t4-play');
  if(v&&b){b.addEventListener('click',()=>{v.muted=false;v.controls=true;v.play().catch(()=>{});b.hidden=true});
    v.addEventListener('loadedmetadata',()=>{const s=Math.round(v.duration||80),t=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');sec.querySelectorAll('.t4-fh .t4-hw').forEach(x=>x.textContent=x.textContent.replace(/\d:\d\d/,t).replace(/\b80 seconds|80-second/,m=>m.replace('80',String(s))))})}}
build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(lw>=1000)){lw=innerWidth;build()}else place(sec)});
D.fonts&&D.fonts.ready.then(()=>place(sec));
window.__t5=window.__t4={rebuild:build,place:()=>place(sec),all:s=>sec.querySelectorAll('.t4-fr').forEach(f=>s==='on'?(on(f,'test'),f.classList.remove('t4-go')):(f.classList.remove('t4-on','t4-go'),f.setAttribute('aria-pressed','false'))),
  data:{ex:EX.n,co:EX.co,t:EX.ticker,out:EX.out,win:EX.win,calls:calls.map(c=>c.m+(c.up?'+':'-')+c.v),lead,pnl:pnl(lead),wl:A[lead].W+'-'+A[lead].L,graded,prev:G.slice(Math.max(0,iEx-2),iEx).map(r=>r.n)}};
D.documentElement.classList.add('t4-ready','t5-ready');
})();
