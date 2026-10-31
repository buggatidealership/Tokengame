/* J4 · Since your last visit. The page remembers (in this browser only) where things stood the last time you came:
   each model's P&L and place, and how many rounds were graded. Next time, Meet the models opens in the OLD order with
   the OLD money, then the cards overtake each other into today's order while the money rolls to today's figure, each
   with what it made or lost since; the rounds graded while you were away carry a NEW stamp. First visit: nothing
   changes (the page just notes where things stand). One caption names the day of your last visit.
   Storage: localStorage "ez-seen" (a few hundred bytes), wrapped in try/catch. window.__sjPrevK forces a past
   visit for the mockup: the state after the first k graded rounds, in grading order. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j4');
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM=sjNM,P=window.__x2pPnl().A;
const key=s=>{const [m,d,y]=(s||'0/0/0').split('/').map(Number);return (y%100)*1e4+m*100+d};
const R=ROUNDS.slice().sort((a,b)=>key(a.resolves)-key(b.resolves)||a.n-b.n),N=R.length;
const stAt=k=>{const pnl={},cnt={},w={};ORDER.forEach(m=>{pnl[m]=0;cnt[m]=0;w[m]=0});for(let i=0;i<k;i++)ORDER.forEach(m=>{const x=P[m].per[R[i].n];if(x){pnl[m]+=x.v;cnt[m]++;if(x.v>0)w[m]++}});
  const rank=ORDER.slice().sort((a,b)=>{const qa=cnt[a]>=k/2,qb=cnt[b]>=k/2;return qa!==qb?(qa?-1:1):pnl[b]-pnl[a]});return {k,pnl,w,cnt,rank,ns:R.slice(0,k).map(r=>r.n),day:k?R[k-1].resolves:null}};
const now=stAt(N);
let prev=null;try{prev=JSON.parse(localStorage.getItem('ez-seen')||'null')}catch(e){}
if(window.__sjPrevK!=null)prev=stAt(window.__sjPrevK);
try{localStorage.setItem('ez-seen',JSON.stringify({k:N,pnl:now.pnl,rank:now.rank,ns:now.ns,day:now.day,at:Date.now()}))}catch(e){}
window.__sjPrev=prev;
const ok=prev&&prev.k<N&&prev.pnl;
if(!ok){H.classList.add('sj-ready-j4');return}
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const dayLbl=s=>{const [m,d,y]=s.split('/').map(Number);return WD[new Date(Date.UTC(2000+(y%100),m-1,d)).getUTCDay()]+' '+MON[m-1]+' '+d};
const fresh=new Set(now.ns.filter(n=>!prev.ns.includes(n)));
const $=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US'),pm=v=>(v<0?'−':'+')+$(v),kk=v=>(v<0?'−':'+')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
/* the caption: one line, the only words this adds */
const grid=D.querySelector('.wc-ch-grid');
const passes=[];now.rank.forEach((m,i)=>{const was=prev.rank.indexOf(m);if(was>i){const past=prev.rank.slice(i,was).filter(o=>now.rank.indexOf(o)>i);if(past.length)passes.push(NM[m]+' passed '+past.map(o=>NM[o]).join(' and '))}});
grid.insertAdjacentHTML('beforebegin',`<p class="wc-cap sj-since"><b>Since your last visit</b>${fresh.size} round${fresh.size===1?'':'s'} graded.${passes.length?' '+passes.join('. ')+'.':''}</p>`);
/* each card: the delta under its money, and its move in places */
const cards=[...grid.querySelectorAll('.wc-ch')];
cards.forEach(c=>{const m=c.dataset.m,d=now.pnl[m]-prev.pnl[m],was=prev.rank.indexOf(m),is=now.rank.indexOf(m);
  const big=c.querySelector('.wc-ch-big');if(big)big.insertAdjacentHTML('beforeend',`<small class="sj-dl ${d>=0?'wc-tu':'wc-td'}">${kk(d)} since then</small>`);
  if(was!==is)c.insertAdjacentHTML('beforeend',`<b class="sj-mv ${was>is?'sj-up':'sj-dn'}" aria-label="${was>is?'Up':'Down'} ${Math.abs(was-is)} since your last visit">${was>is?'▲':'▼'}${Math.abs(was-is)}</b>`)});
/* the rounds graded since then */
D.querySelectorAll('.wc-bi').forEach(a=>{const n=+(a.getAttribute('href')||'').replace(/\D/g,'');if(fresh.has(n)){a.classList.add('sj-new');a.insertAdjacentHTML('beforeend','<b class="sj-nst" aria-label="New since your last visit">New</b>')}});
/* the overtake: cards start where they stood last time, money as it was, then move and roll (1.6 s) */
const ROLES=['We bet on its call','In the hunt','In the hunt','Last place'];let t0=null,raf=0,geo=null;const DUR=1700,ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
function measure(){const pos=cards.map(c=>{const r=c.getBoundingClientRect();return {x:r.left,y:r.top}});
  geo=cards.map(c=>{const m=c.dataset.m,from=cards[now.rank.indexOf(m)]&&pos[prev.rank.indexOf(m)],to=pos[now.rank.indexOf(m)];return {dx:from.x-to.x,dy:from.y-to.y}})}
function draw(p){cards.forEach((c,i)=>{const m=c.dataset.m,g=geo[i],e=ease(Math.min(1,Math.max(0,p*1.25-.12)));
    c.style.transform=(g.dx||g.dy)?`translate(${(g.dx*(1-e)).toFixed(1)}px,${(g.dy*(1-e)).toFixed(1)}px) scale(${(1+.04*Math.sin(Math.PI*e)*(prev.rank.indexOf(m)>now.rank.indexOf(m)?1:-.5)).toFixed(3)})`:'';
    c.style.zIndex=prev.rank.indexOf(m)>now.rank.indexOf(m)?3:1;
    const n=c.querySelector('.sj-cnt');if(n){const v=prev.pnl[m]+(now.pnl[m]-prev.pnl[m])*ease(Math.min(1,p));n.textContent=pm(v);const b=n.closest('.wc-ch-big');if(b){b.classList.toggle('wc-tu',v>=0);b.classList.toggle('wc-td',v<0)}}
    const rk=(p<.55?prev:now).rank.indexOf(m);c.querySelectorAll('.wc-tks b,.wc-ch-rk').forEach(x=>{x.textContent='#'+(rk+1)});
    const ro=c.querySelector('.wc-ch-role');if(ro)ro.textContent=ROLES[rk];
    const wl=c.querySelector('.wc-ch-l b');if(wl&&prev.w){const S=p<.55?prev:now;wl.textContent=S.w[m]+' of '+S.cnt[m]}
    const dl=c.querySelector('.sj-dl');if(dl)dl.style.opacity=Math.min(1,Math.max(0,(p-.75)*4));
    const mv=c.querySelector('.sj-mv');if(mv)mv.style.transform=`scale(${p<.8?0:Math.min(1.25,(p-.8)*8)>1?1+.25*Math.max(0,1-(p-.925)*10):Math.min(1.25,(p-.8)*8)}) rotate(-8deg)`});
  D.querySelectorAll('.sj-nst').forEach((s,i)=>{const q=Math.min(1,Math.max(0,(p-.2-i*.12)*5));s.style.transform=`rotate(-12deg) scale(${(q<1?2.2-1.2*q:1).toFixed(3)})`;s.style.opacity=q})}
function run(){if(t0==null)t0=sjT();const p=Math.min(1,(sjT()-t0)/DUR);draw(p);if(p<1)raf=requestAnimationFrame(run);else raf=0}
window.__sjGo4=()=>{measure();t0=null;if(sjRM()){draw(1);return}draw(0);raf=requestAnimationFrame(run)};
window.__sjDraw4=p=>{if(!geo)measure();draw(p)};
/* the cast page has the page's own one-time count-up from $0 on first view: hand it our start instead */
cards.forEach(c=>{const n=c.querySelector('.wc-cnt');if(n){n.removeAttribute('data-v');n.classList.remove('wc-cnt');n.classList.add('sj-cnt')}});
measure();draw(sjRM()?1:0);
const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();if(!window.__sjHold)window.__sjGo4()}},{threshold:.35});io.observe(grid);
window.__sjToggle=on=>{if(on)window.__sjGo4();else draw(1)};
H.classList.add('sj-ready-j4')})();
