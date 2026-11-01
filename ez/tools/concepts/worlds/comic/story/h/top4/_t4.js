/* Round H19 · top4: the top of X2+, from H18 top3's take A, after the owner's notes on it (BRIEF-H Round H19).
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
const D=document,WS=window.__T4W||'b',INK=window.__T4C||'cream',ORD=+(window.__T4O||1),FH='G',AUTO=window.__T4auto!==false;
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
function place(root){fitHead(root);const h2=root.querySelector('.t4-b2 .t4-h2'),fl=root.querySelector('.t4-frs');if(h2&&fl){const hr=h2.querySelector('.t4-hw').getBoundingClientRect();root.style.setProperty('--t4ov',Math.max(0,hr.bottom-fl.getBoundingClientRect().top)+'px');
   /* a caption moves down only in the frames the heading actually crosses */
   fl.querySelectorAll('.t4-fr').forEach(f=>{const c=f.querySelector('.t4-cap'),r=f.getBoundingClientRect();c.style.top=(hr.left<r.right&&hr.right>r.left&&hr.bottom>r.top)?(hr.bottom-r.top+3)+'px':''})}root.querySelectorAll('.t4-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.t4-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)});
  const sec4=p.closest('.t4'),hf=parseFloat(getComputedStyle(sec4.querySelector('.t4-h1')).fontSize),lf=parseFloat(getComputedStyle(sec4.querySelector('.t4-ln')).fontSize),px=Math.round(Math.sqrt(hf*lf)*2)/2;sec4.dataset.swpx=px;
  p.querySelectorAll('.t4-sw').forEach(t=>{const sf=t.closest('.t4-sf'),q=JSON.parse(sf.dataset.q),bh=+sf.dataset.bh,lw=Math.hypot(q[3][0]-q[0][0],q[3][1]-q[0][1]);t.setAttribute('font-size',(px/k*(bh/lw)).toFixed(2))});
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
  const F={call:{w:'CALL',k:'call',l:'Each AI submits its prediction before the earnings report.',cap:`R${EX.n} · ${esc(EX.co)} (${EX.ticker}) · ${md(EX.called)}`,
    p:pic(I4+'t4-call.jpg',1024,1024,[...calls.map((c,i)=>surf(QCALL[i],dieCall(c),'t4-glass t4-die t4-d'+i)),st('call','CALL')],'','',[120,0,870,870])},
   close:{w:'CLOSE',k:'bell',l:'The closing bell decides who wins the round.',cap:`At the close · ${md(EX.resolves)}`,
    p:pic(I4+'t4-buzz-b.jpg',1024,1024,[surf(QBUZZ,readout,'t4-glass t4-rd'),st('close','CLOSE')],'',
      at(70,40,520,320,'t4-veil')+at(222,326,184,214,'t4-knob',`<img src="${I4}t4-buzz-b.jpg" alt="" style="width:${(1024/184*100).toFixed(2)}%;left:${(-222/184*100).toFixed(2)}%;top:${(-326/214*100).toFixed(2)}%">`)+at(162,250,300,300,'t4-ring')+at(162,250,300,300,'t4-ring r2'),[60,40,950,950])},
   ledger:{w:'LEDGER',k:'ledger',l:'Every round is written to the ledger.',cap:`Round ${EX.n} · ${md(EX.resolves)}`,
    p:pic(I4+'t4-ledger-d.jpg',1024,1024,[...ledgerSurfs(),st('ledger','LEDGER')],'',at(80,474,80,66,'t4-head'),[30,60,960,960])},
   board:{w:W2,k:'one',l:ORD===2?'The close ranks the board.':'The ledger ranks the board.',cap:'Top of the board',
    p:pic(I4+'t4-one-b.jpg',1024,1024,[surf([[300,252],[652,212],[748,520],[388,568]],leadSurf,'t4-gold'),st('board',W2)],'','',[50,80,920,920])}};
  const seq=ORD===2?['call','close','board','ledger']:['call','close','ledger','board'];
  return seq.map(k=>F[k]).map(f=>`<li class="t4-fr t4-${f.k}" tabindex="0" role="button" aria-pressed="false" aria-label="${f.w}: ${esc(f.l)}"><div class="t4-ink"><div class="t4-art">${cap(f.cap)}${f.p}</div></div><p class="t4-ln">${esc(f.l)}</p></li>`).join('')}
const DEFS=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
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
const sec=D.createElement('section');sec.className='t4';sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=1000,[fh,fs]=FILM[FH];
  sec.innerHTML=`<div class="t4-b1">${DEFS}<h1 class="t4-h1"><span class="t4-hw t4-hw0">${lt('Four AIs call earnings.')}</span><span class="t4-hw t4-hw1">The market keeps score.</span></h1><div class="t4-bleed">${hero(wide)}</div></div>
   <div class="t4-gut" aria-hidden="true"></div>
   <div class="t4-b2"><h2 class="t4-h2"><span class="t4-hw">How a round works</span></h2><ol class="t4-frs">${frames()}</ol></div>
   <div class="t4-gut" aria-hidden="true"></div>
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
window.__t4={rebuild:build,place:()=>place(sec),all:s=>sec.querySelectorAll('.t4-fr').forEach(f=>s==='on'?(on(f,'test'),f.classList.remove('t4-go')):(f.classList.remove('t4-on','t4-go'),f.setAttribute('aria-pressed','false'))),
  data:{ex:EX.n,co:EX.co,t:EX.ticker,out:EX.out,win:EX.win,calls:calls.map(c=>c.m+(c.up?'+':'-')+c.v),lead,pnl:pnl(lead),wl:A[lead].W+'-'+A[lead].L,graded,prev:G.slice(Math.max(0,iEx-2),iEx).map(r=>r.n)}};
D.documentElement.classList.add('t4-ready');
})();
