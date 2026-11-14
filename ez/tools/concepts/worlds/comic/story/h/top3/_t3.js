/* Round H18 · top3: the top of X2+, take A (the chip's own world) redone after the owner's notes (h18/ref-top-owner.png).
   Laid over the built v46-live-x2plus.html: its hero and its film bill + live strip section are hidden.
   window.__T3L = lettering of the four step words: 'L' LED dot matrix (default), 'S' silkscreen, 'M' stamped gold, 'T' gold traces, 'N' neon
   window.__T3F = film head: 'A' "The explainer · 1:20" (default), 'B' "The 80-second version", 'C' "The whole game in 80 seconds", 'D' "Press play"
   window.__T3auto = false switches off the 3 s self-reveal (default on).
   Every live word sits on a surface the painting left blank for it: an SVG in the surface's own box, mapped onto the surface's four painted
   corners with one matrix3d. Data: ROUNDS, RMETA (mag7), MODELS, __x2pPnl. Nothing typed. */
(function(){
const D=document,LT=window.__T3L||'L',FH=window.__T3F||'A',AUTO=window.__T3auto!==false;
const I1='tools/concepts/worlds/comic/story/h/top1/img/',I3='tools/concepts/worlds/comic/story/h/top3/img/';
if(!D.getElementById('t3-fonts')){const l=D.createElement('link');l.id='t3-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:wght@600;700&family=Doto:wght@900&family=Share+Tech+Mono&family=Black+Ops+One&family=Monoton&family=Tilt+Neon&display=block';D.head.appendChild(l)}
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
  return {html:`<div class="t3-sf ${cls||''}" data-q='${JSON.stringify(q)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner?inner(bw,bh):''}<svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg></div>`}}
/* a painting with surfaces; cr = [x,y,w,h], the part of the painting the frame shows, in painting px */
function pic(src,iw,ih,surfs,cls,extra,cr){cr=cr||[0,0,iw,ih];const[cx,cy,cw,ch]=cr;
  return `<div class="t3-pic ${cls||''}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t3-mv"><img src="${src}" alt="" draggable="false" style="width:${(iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${surfs.map(s=>s.html).join('')}${extra||''}</div></div>`}
/* an element placed on the painting in painting px (a rect), scaled with it */
const at=(x,y,w,h,cls,inner)=>`<i class="t3-at ${cls}" data-r="${x},${y},${w},${h}">${inner||''}</i>`;
function place(root){root.querySelectorAll('.t3-pic').forEach(p=>{const k=p.clientWidth/+p.dataset.iw,cx=+p.dataset.cx,cy=+p.dataset.cy;
  p.querySelectorAll('.t3-sf').forEach(s=>{const q=JSON.parse(s.dataset.q).map(([x,y])=>[(x-cx)*k,(y-cy)*k]);s.style.transform=m3d(+s.dataset.bw,+s.dataset.bh,q)});
  p.querySelectorAll('.t3-at').forEach(e=>{const[x,y,w,h]=e.dataset.r.split(',').map(Number);Object.assign(e.style,{left:(x-cx)*k+'px',top:(y-cy)*k+'px',width:w*k+'px',height:h*k+'px'})})})}
/* ---------- beat 1: the chip, the four AIs (logo and name only), the season bar ---------- */
const QA_W=[[[282,286],[430,276],[452,388],[305,400]],[[470,268],[610,260],[630,368],[492,378]],[[655,252],[790,246],[815,350],[678,360]],[[828,235],[952,228],[992,330],[855,340]]],QA_WB=[[358,480],[1042,408],[1056,452],[365,530]];
const QA_T=[[[207,180],[348,188],[371,326],[224,317]],[[399,192],[533,202],[556,334],[422,328]],[[233,379],[375,383],[395,521],[249,519]],[[432,384],[567,388],[591,520],[453,521]]],QA_TB=[[212,690],[678,671],[694,775],[221,801]];
const dieAI=m=>(w,h)=>{const s=Math.min(w,h);return mark(m,w/2-s*.24,h*.1,s*.48)+T(w/2,h*.86,fit(NM[m].toUpperCase(),w*.86,s*.25),NM[m].toUpperCase(),{a:'middle',cls:'t3-an'})};
const led=t=>(w,h)=>{const f=fit(t,w*.9,h*.5);return T(w/2,h/2+f*.36,f,t,{a:'middle',c:'#ffc23a',cls:'t3-an t3-led'})};
function hero(wide){const Q=wide?QA_W:QA_T,QB=wide?QA_WB:QA_TB;
  return pic(I1+(wide?'a-hero-w-2k.jpg':'a-hero-t-2k.jpg'),wide?1280:768,wide?720:1024,[...rank.map((m,i)=>surf(Q[i],dieAI(m),'t3-glass')),surf(QB,led(`SEASON 1 · ${graded} ROUNDS GRADED`),'t3-glass')],'t3-hero','',wide?[150,90,1000,560]:[0,40,768,900])}
/* ---------- beat 2: the four frames ---------- */
const QCALL=[[[303,373],[438,351],[478,459],[339,475]],[[483,348],[610,325],[659,427],[526,446]],[[358,519],[498,495],[545,610],[399,636]],[[545,487],[681,462],[735,577],[591,598]]];
const dieCall=c=>(w,h)=>{const s=Math.min(w,h),t=(c.up?'+':'−')+c.v+'%';return `<g class="t3-lit">`+mark(c.m,w/2-s*.17,h*.08,s*.34)+T(w/2,h*.6,s*.19,NM[c.m].toUpperCase(),{a:'middle',cls:'t3-an'})+T(w/2,h*.9,s*.27,t,{a:'middle',c:c.up?UPC:DNC,cls:'t3-an t3-call'})+`</g>`};
/* the bell's readout: portrait glass, text runs across its short side */
const QBELL=[[526,376],[717,340],[882,582],[669,626]];
const readout=(w,h)=>{const co=(EX.co+' ('+EX.ticker+')').toUpperCase();
  return `<g class="t3-ro">`+T(w/2,h*.2,fit(co,w*.86,h*.09),co,{a:'middle',c:'#ffc23a',cls:'t3-an'})+T(w/2,h*.48,fit(EX.out,w*.9,h*.24),EX.out,{a:'middle',c:EX.a>0?UPC:DNC,cls:'t3-an t3-move'})
   +`<line x1="${w*.14}" x2="${w*.86}" y1="${h*.58}" y2="${h*.58}" stroke="#ffc23a" stroke-opacity=".5" stroke-width="${h*.008}"/>`
   +mark(win,w/2-h*.065,h*.63,h*.13)+T(w/2,h*.9,fit(win+' WINS',w*.86,h*.12),(NM[win]||win).toUpperCase()+' WINS',{a:'middle',c:'#ffd768',cls:'t3-an t3-win'})+`</g>`
   +`<rect class="t3-cur" x="${w*.44}" y="${h*.44}" width="${w*.12}" height="${h*.05}" fill="#ffc23a"/>`};
/* the ledger: five ruled rows; the rounds before the example already written, the example's row written by the head, the rest blank */
const LROW=[[178,348,722,55],[178,403,722,54],[178,457,722,56],[178,513,722,55],[178,568,722,60]];
const ledgerRow=(r,cls)=>{const[x,y,w,h]=LROW[0];
  return (wv,hv)=>{const f=hv*.6,mv=r.a>0?UPC:DNC,wn=String(r.win||'').toUpperCase(),one=wn&&!/,|&| /.test(wn)&&NM[wn];
   return `<g class="${cls}">`+T(hv*.95,hv*.72,f,'R'+r.n,{c:'#ffc23a',cls:'t3-an'})+T(hv*2.55,hv*.72,f,r.ticker,{c:'#f8f0d9',cls:'t3-an'})
    +T(wv*.52,hv*.72,f,r.out,{a:'end',c:mv,cls:'t3-an'})+(one?mark(wn,wv*.56,hv*.18,hv*.62)+T(wv*.56+hv*.8,hv*.72,f,NM[wn].toUpperCase(),{c:'#ffd768',cls:'t3-an'}):T(wv*.56,hv*.72,f,'NOBODY',{c:'#bdb4a0',cls:'t3-an'}))+`</g>`}};
const rq=([x,y,w,h])=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
function ledgerSurfs(){const prev=G.slice(Math.max(0,iEx-2),iEx),S=[];
  prev.forEach((r,i)=>S.push(surf(rq(LROW[i+(2-prev.length)]),ledgerRow(r,'t3-old'),'t3-glass t3-row')));
  S.push(surf(rq(LROW[2]),ledgerRow(EX,'t3-new'),'t3-glass t3-row t3-wr'));
  return S}
/* the gold lid: the leader engraved */
const leadSurf=(w,h)=>{const s=Math.min(h*.5,w*.3),x=w*.08+s*1.15,tw=w*.92-x,l2=$(pnl(lead)),l3=A[lead].W+'-'+A[lead].L+' · Season P&L';
  return `<g class="t3-eg">`+mark(lead,w*.07,h/2-s/2,s,'#2a1a06')+T(x,h*.4,fit(NM[lead],tw,h*.3),NM[lead].toUpperCase(),{c:'#2a1a06',cls:'t3-an t3-eng'})+T(x,h*.66,fit(l2,tw,h*.2),l2,{c:'#2a1a06',cls:'t3-an t3-eng'})+T(x,h*.84,fit(l3,tw,h*.1),l3,{c:'#3a260b',cls:'t3-an t3-eng'})+`</g>`};
const WORDS={CALL:'CALL',BELL:'BELL',LEDGER:'LEDGER',ONE:'#1'};
function frames(){const F=[];const cap=t=>`<div class="t3-cap">${t}</div>`;
  F.push({w:'CALL',k:'call',l:'Each AI submits its prediction before the earnings report.',cap:`R${EX.n} · ${esc(EX.co)} (${EX.ticker}) · ${md(EX.called)}`,
    p:pic(I1+'a-call.jpg',1024,1024,calls.map((c,i)=>surf(QCALL[i],dieCall(c),'t3-glass t3-die t3-d'+i)),'','',[250,196,550,550])});
  F.push({w:'BELL',k:'bell',l:'The closing bell decides who wins the round.',cap:`At the close · ${md(EX.resolves)}`,
    p:pic(I3+'t3-bell.jpg',1024,1024,[surf(QBELL,readout,'t3-glass t3-rd')],'',
      at(300,136,86,64,'t3-knob',`<img src="${I3}t3-bell.jpg" alt="" style="width:${(1024/86*100).toFixed(2)}%;left:${(-300/86*100).toFixed(2)}%;top:${(-136/64*100).toFixed(2)}%">`)+at(190,120,300,300,'t3-ring')+at(190,120,300,300,'t3-ring r2'),[180,110,760,760])});
  F.push({w:'LEDGER',k:'ledger',l:'Every round is written to the ledger.',cap:`Round ${EX.n} · ${md(EX.resolves)}`,
    p:pic(I3+'t3-ledger.jpg',1024,1024,ledgerSurfs(),'',at(124,462,86,84,'t3-head'),[110,214,640,640])});
  F.push({w:'#1',k:'one',l:'The ledger ranks the board.',cap:'Top of the board',
    p:pic(I1+'a-one.jpg',1024,1024,[surf([[296,350],[640,292],[768,566],[404,634]],leadSurf,'t3-gold')],'','',[170,130,700,700])});
  return F.map((f,i)=>`<li class="t3-fr t3-${f.k}" tabindex="0" role="button" aria-pressed="false" aria-label="${f.w}: ${esc(f.l)}"><div class="t3-ink"><div class="t3-art">${cap(f.cap)}${f.p}</div></div><b class="t3-word t3-L${LT}" aria-hidden="true"><span>${f.w}</span></b><p class="t3-ln">${esc(f.l)}</p></li>`).join('')}
/* ---------- beat 3: the film on the board's own display ---------- */
const FILM={A:['The explainer','1:20'],B:['The 80-second version',''],C:['The whole game','in 80 seconds'],D:['Press play','EZ in 1:20']};
function film(){const v=`<video class="t3-v" playsinline preload="metadata" poster="media/ez-landing-v4-poster-ez.jpg"><source src="media/ez-landing-v4.mp4" type="video/mp4"></video><i class="t3-glare"></i><button class="t3-play" aria-label="Play the explainer"><i></i></button>`;
  return pic(I3+'t3-screen-t.jpg',1024,768,[],'t3-scr',at(118,128,790,488,'t3-glass-v',v),[72,77,878,594])}
/* ---------- mount ---------- */
const lt=s=>esc(s).replace(/AIs/g,'AI<span class="t3-lc">s</span>');
const main=D.querySelector('main'),hero0=D.querySelector('section.hero'),bet0=D.querySelector('section.x2o-bet');
const sec=D.createElement('section');sec.className='t3';sec.setAttribute('aria-label','What EZ does');
function build(){const wide=innerWidth>=1000,[fh,fs]=FILM[FH];
  sec.innerHTML=`<div class="t3-b1"><h1 class="t3-h1"><span class="t3-hw t3-hw0">${lt('Four AIs call earnings.')}</span><span class="t3-hw t3-hw1">The market keeps score.</span></h1><div class="t3-bleed">${hero(wide)}</div></div>
   <div class="t3-gut" aria-hidden="true"></div>
   <div class="t3-b2"><h2 class="t3-h2"><span class="t3-hw">How a round works</span></h2><ol class="t3-frs">${frames()}</ol></div>
   <div class="t3-gut" aria-hidden="true"></div>
   <div class="t3-b3"><h2 class="t3-h2 t3-fh t3-F${FH}"><span class="t3-hw">${esc(fh)}</span>${fs?` <span class="t3-hw t3-hws">${esc(fs)}</span>`:''}</h2><div class="t3-bleed">${film()}</div></div>`;
  requestAnimationFrame(()=>place(sec));wire()}
if(hero0)hero0.before(sec);else main.prepend(sec);
[hero0,bet0].forEach(s=>s&&(s.style.display='none'));
/* ---------- states: every frame starts off; a tap (or 3 s on screen) turns it on ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function on(f,how){if(f.classList.contains('t3-on'))return;f.classList.add('t3-on','t3-go');f.setAttribute('aria-pressed','true');if(how)f.dataset.how=how;setTimeout(()=>f.classList.remove('t3-go'),2600)}
function wire(){const fs=[...sec.querySelectorAll('.t3-fr')];
  fs.forEach(f=>{f.addEventListener('click',()=>{if(f.classList.contains('t3-on')){f.classList.remove('t3-go');void f.offsetWidth;f.classList.add('t3-go');setTimeout(()=>f.classList.remove('t3-go'),2600)}else on(f,'tap')});
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}})});
  if(RM){fs.forEach(f=>on(f,'rm'));return}
  if(AUTO){const tm=new Map(),io=new IntersectionObserver(es=>es.forEach(e=>{const f=e.target;
      if(e.intersectionRatio>=.6&&!tm.has(f))tm.set(f,setTimeout(()=>on(f,'auto'),3000));
      else if(e.intersectionRatio<.6&&tm.has(f)){clearTimeout(tm.get(f));tm.delete(f)}}),{threshold:[0,.6,1]});fs.forEach(f=>io.observe(f))}
  const v=sec.querySelector('.t3-v'),b=sec.querySelector('.t3-play');
  if(v&&b){b.addEventListener('click',()=>{v.muted=false;v.controls=true;v.play().catch(()=>{});b.hidden=true});
    v.addEventListener('loadedmetadata',()=>{const s=Math.round(v.duration||80),t=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');sec.querySelectorAll('.t3-fh .t3-hw').forEach(x=>x.textContent=x.textContent.replace(/\d:\d\d/,t).replace(/\b80 seconds|80-second/,m=>m.replace('80',String(s))))})}}
build();let lw=innerWidth;addEventListener('resize',()=>{if((innerWidth>=1000)!==(lw>=1000)){lw=innerWidth;build()}else place(sec)});
D.fonts&&D.fonts.ready.then(()=>place(sec));
window.__t3={rebuild:build,place:()=>place(sec),all:s=>sec.querySelectorAll('.t3-fr').forEach(f=>s==='on'?(on(f,'test'),f.classList.remove('t3-go')):(f.classList.remove('t3-on','t3-go'),f.setAttribute('aria-pressed','false'))),
  data:{ex:EX.n,co:EX.co,t:EX.ticker,out:EX.out,win:EX.win,calls:calls.map(c=>c.m+(c.up?'+':'-')+c.v),lead,pnl:pnl(lead),wl:A[lead].W+'-'+A[lead].L,graded,prev:G.slice(Math.max(0,iEx-2),iEx).map(r=>r.n)}};
D.documentElement.classList.add('t3-ready');
})();
