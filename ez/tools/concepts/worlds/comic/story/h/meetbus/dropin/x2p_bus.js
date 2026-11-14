/* X2+ drop-in (tools/v22/story/x2p_bus.js), load after x2p_chips.js. Default take b. Media (flat names, copy out/pub/* into media/): media/mb-strip.jpg media/mb-strip.webp media/mb-bundle.jpg media/mb-bundle.webp media/mb-bundle-v.jpg media/mb-bundle-v.webp media/mb-readout.jpg media/mb-readout.webp */
/* Round H25 · meetbus: Meet the models fed by the ledger. Laid over the live Meet the models (x2p_chips.js, chips8 take c) without touching it:
   the chips, founders and balloons stay as they are; this adds the ledger and the gold traces around them.
   Takes (window.__MB):
     'a' THE STRIP   the ledger as a vertical glass strip down the section's left (board5's D): the newest graded rounds run up it in frame 3's amber;
                     each round, as it passes a chip's trace, sends a pulse into that chip: green if that model's trade went the right way, red if not.
     'b' THE BUS     the ledger as a readout across the top, one round at a time, readable flat; an amber packet drops down a gold bus on the left
                     and branches into each chip in turn, turning green or red as it enters.
     'c' THE SPINE   the chips stay full-bleed; the ledger is a lit spine behind them, seen only in the gutters, and the round sits in the caption tab.
                     The packet runs down the spine and each chip lights from behind on its edge, green or red.
   On desktop (2x2) the strip / bus / spine runs down the column gap and feeds both columns.
   Data, live: ROUNDS (the 12 newest graded rounds, oldest first), __x2pPnl().A[m].per[n].v (sign = the trade's direction right or wrong);
   a model that did not trade a round gets no pulse. Nothing is typed.
   Motion: one clock, rendered deterministically from time t (window.__MBT freezes it for boards); only while the section is near the screen;
   with reduced motion everything is still: the newest round shown, each trace lit steady in that model's colour for it.
   Options: window.__MBIMG (image folder), window.__MBN (rounds in the loop, default 12). window.__mb = {layout, render, seq}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__x2pPnl||!W.ROUNDS||four.querySelectorAll('.c8-one').length<4){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__mbErr=e;console.error(e)}})();
function run(sec,four){
const T=(W.__MB||'b').toLowerCase(),IMG=W.__MBIMG||'media/',N=W.__MBN||12;
const A=W.__x2pPnl().A,G=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice(-N);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mv=r=>String(r.out||'').replace(/^-/,'−');
const lab=r=>`<b>R${r.n}</b> ${esc(r.co)} (${esc(r.ticker)}) <i>${esc(mv(r))}</i>`;
const vd=(m,r)=>{const q=A[m]&&A[m].per[r.n];return q?(q.v>0?'ok':'no'):null};
sec.classList.add('mb','mb-'+T);sec.style.setProperty('--mbimg',`url(${IMG})`);
['strip','bundle','bundle-v','readout'].forEach(k=>sec.style.setProperty('--mb-'+k,`image-set(url("${IMG}mb-${k}.webp") type("image/webp"),url("${IMG}mb-${k}.jpg") type("image/jpeg"))`));
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);
const L=D.createElement('div');L.className='mb-l';L.setAttribute('aria-hidden','true');four.prepend(L);
/* the spine: A's strip, B's bus, C's lit spine */
const sp=D.createElement('div');sp.className='mb-sp';L.append(sp);
let col=null,ro=null,rt=null,cr=null;
if(T==='a'){sp.innerHTML='<div class="mb-gl"><div class="mb-col"></div><i class="mb-glare"></i></div>';col=sp.querySelector('.mb-col');
  col.innerHTML=(G.map(r=>`<span class="mb-lb">${lab(r)}</span>`).join('')).repeat(2)}
else{sp.innerHTML='<i class="mb-pk"></i>'}
if(T==='b'){ro=D.createElement('div');ro.className='mb-ro';ro.innerHTML='<div class="mb-gl"><span class="mb-rk">Ledger</span><div class="mb-rw"><span class="mb-rt"></span></div><i class="mb-glare"></i></div>';L.append(ro);rt=ro.querySelector('.mb-rt')}
if(T==='c'){const cap=sec.querySelector('.ch-cap');cr=D.createElement('span');cr.className='mb-cr';cr.innerHTML='<i class="mb-cd"></i><span class="mb-ct"></span>';cap&&cap.append(cr);rt=cr.querySelector('.mb-ct')}
/* a trace and a hit light per chip */
const taps=ones.map((o,j)=>{const t=D.createElement('div');t.className='mb-tp';t.innerHTML='<i class="mb-tl"></i><i class="mb-ph"></i>';if(T!=='c')L.append(t);
  const h=D.createElement('i');h.className='mb-hit';o.querySelector('.c7-pic').append(h);return {o,t,h,m:ms[j]}});
let Gm={};
function layout(){const fr=four.getBoundingClientRect(),desk=fr.width>=700;sec.classList.toggle('mb-desk',desk);
  const R=taps.map(x=>{const r=x.o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
  const sw={a:desk?46:32,b:desk?22:18,c:desk?18:13}[T];
  let cx;if(desk){const xs=R.map(r=>r.x),mid=(Math.max(...R.filter(r=>r.x<fr.width/2).map(r=>r.x+r.w))+Math.min(...R.filter(r=>r.x>=fr.width/2).map(r=>r.x)))/2;cx=mid}else cx={a:3+sw/2,b:3+sw/2,c:2+sw/2}[T];
  let top=Math.min(...R.map(r=>r.y)),bot=Math.max(...R.map(r=>r.y+r.h));
  if(T==='b'){const rh=desk?64:54,ry=top-(desk?118:104);ro.style.cssText=`left:${desk?R[0].x:0}px;top:${ry}px;width:${desk?Math.max(...R.map(r=>r.x+r.w))-R[0].x:fr.width}px;height:${rh}px`;top=ry+rh-6;bot=Math.max(...R.map(r=>r.y+r.h/2))+sw}
  else if(T==='a'){top-=desk?60:14;bot+=10}else{top=desk?top-60:0;bot=fr.height}
  sp.style.cssText=`left:${cx-sw/2}px;top:${top}px;width:${sw}px;height:${bot-top}px;--sw:${sw}px`;
  Gm={cx,sw,top,bot,desk,R};
  taps.forEach((x,j)=>{const r=R[j],left=!desk||r.x>cx,y=r.y+r.h*.5,h=Math.max(9,r.h*(T==='a'?.22:.15));
    const x0=left?cx+sw/2-2:r.x+r.w-2,x1=left?r.x+2:cx-sw/2+2;x.left=left;x.y=y;x.len=Math.max(0,x1-x0);
    x.t.style.cssText=`left:${x0}px;top:${y-h/2}px;width:${x.len}px;height:${h}px`;x.t.classList.toggle('mb-rev',!left);
    x.h.classList.toggle('mb-rt2',!left)});
  if(col){col.style.setProperty('--fs',(desk?17:13)+'px');requestAnimationFrame(()=>{const lb=[...col.querySelectorAll('.mb-lb')];
    const n=G.length;Gm.lab=lb.slice(0,n).map((e,k)=>({k,c:e.offsetTop+e.offsetHeight/2}));Gm.LL=lb[n].offsetTop-lb[0].offsetTop;render(now())})}
  else render(now())}
/* ---- the clock ---- */
const RM=matchMedia('(prefers-reduced-motion: reduce)');
const now=()=>W.__MBT!=null?+W.__MBT:(RM.matches?-1:performance.now());
const P=3800,V=24;/* B/C: ms per round; A: strip speed px/s */
const set=(x,cls,i,u)=>{x.t.classList.remove('mb-ok','mb-no');x.h.classList.remove('mb-ok','mb-no');if(cls){x.t.classList.add('mb-'+cls);x.h.classList.add('mb-'+cls)}
  x.t.style.setProperty('--i',i.toFixed(3));x.h.style.setProperty('--i',i.toFixed(3));x.t.style.setProperty('--u',u.toFixed(3))};
let shown=-1;
function render(t){if(!Gm.R)return;const still=t<0;
 if(T==='a'){if(!Gm.lab)return;const LL=Gm.LL,gt=sp.querySelector('.mb-gl').getBoundingClientRect(),ft=four.getBoundingClientRect(),off=gt.top-ft.top;
   const H=gt.height,s=still?(Gm.lab[G.length-1].c-H*.5+LL)%LL:(t/1000*V)%LL;col.style.transform=`translateY(${(-s-LL+H).toFixed(2)}px)`;
   /* label k sits at column y = c_k + n*LL; on screen at off + c - s - LL + H (moving up). Its last crossing of chip j's trace: */
   taps.forEach(x=>{let best=null;for(const L0 of Gm.lab){const yy=x.y-off-H+LL;/* c + nLL - s = yy */
       const sStar=L0.c-yy,ds=(((s-sStar)%LL)+LL)%LL,dt=ds/V*1000;if(best===null||dt<best.dt)best={dt,r:G[L0.k]}}
     if(still){const r=G[G.length-1];set(x,vd(x.m,r),.6,1);return}
     const v=vd(x.m,best.r),u=Math.min(1,best.dt/520),i=best.dt<520?1:Math.max(0,1-(best.dt-520)/1400);
     set(x,v,v?Math.max(i,.12):0,u)})}
 else{const n=G.length,k=still?n-1:Math.floor(t/P)%n,ph=still?1:(t%P)/P,r=G[k];
   if(shown!==k){rt.innerHTML=lab(r);shown=k;rt.classList.remove('mb-in');void rt.offsetWidth;if(!still)rt.classList.add('mb-in')}
   const y0=Gm.top,y1=Gm.bot,a0=.14,a1=.62,e=Math.min(1,Math.max(0,(ph-a0)/(a1-a0))),yd=y0+(y1-y0)*e;
   const pk=sp.querySelector('.mb-pk');pk.style.transform=`translateY(${(yd-y0).toFixed(1)}px)`;pk.style.opacity=still?0:(ph<a0||ph>a1+.04?0:1);
   taps.forEach(x=>{const v=vd(x.m,r),yt=T==='c'?x.y:x.y;
     if(still){set(x,v,v?.6:0,1);return}
     const pt=a0+(a1-a0)*((yt-y0)/(y1-y0)),dt=(ph-pt)*P;
     if(dt<0){set(x,null,0,0);return}
     const u=Math.min(1,dt/420),i=dt<420?1:Math.max(.45,1-(dt-420)/900);set(x,v,v?(ph>.94?i*(1-(ph-.94)/.06):i):0,u)})}}
let raf=0,vis=false;const loop=()=>{raf=0;if(!vis||W.__MBT!=null||RM.matches)return;render(now());raf=requestAnimationFrame(loop)};
const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis&&!raf)raf=requestAnimationFrame(loop)},{rootMargin:'120px 0px'});io.observe(sec);
let lw=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lw){lw=w;layout()}}).observe(four);
D.fonts&&D.fonts.ready.then(layout);layout();
/* screen readers: the ledger's newest rounds, one line */
const srl=D.createElement('p');srl.className='ch-sr';srl.textContent='The ledger, newest rounds: '+G.slice().reverse().slice(0,4).map(r=>`round ${r.n}, ${r.co}, ${mv(r)}: `+ms.map(m=>{const v=vd(m,r);return v?`${m} ${v==='ok'?'right':'wrong'}`:''}).filter(Boolean).join(', ')).join('; ')+'.';sec.append(srl);
W.__mb={state:t=>{render(t);return taps.map(x=>({m:x.m,i:+x.t.style.getPropertyValue('--i'),u:+x.t.style.getPropertyValue('--u'),v:x.t.classList.contains('mb-ok')?'ok':x.t.classList.contains('mb-no')?'no':null}))},layout,render,seq:G.map(r=>r.n),T,geo:()=>Gm};D.documentElement.classList.add('mb-ready');
}})();
