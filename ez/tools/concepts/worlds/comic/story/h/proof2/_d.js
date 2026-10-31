/* Round H3b, area proof2: data and hand-tuned helpers on top of ../proof/_p.js (PQ).
   Everything is computed from the page: ROUNDS (the calls in order), __x2pPnl() (W, L, P&L), MODELS. Nothing typed. Classes p2-. */
(function(){if(window.P2)return;const D0=PQ.data(),MS=PQ.MS,NM=PQ.NM;
/* chance a fair coin gets at least k right out of n (the page's own formula, world-comic.js coin()) */
function tail(k,n){let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s}
function pmf(n){let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);return Array.from({length:n+1},(_,k)=>Math.exp(lp[n]-lp[k]-lp[n-k]-n*Math.LN2))}
const P=__x2pPnl().A;const M={};
MS.forEach(m=>{const s=D0.seqs[m],t=s.length,W=s.filter(x=>x.ok).length,h=W/t,c=tail(W,t);
  const half=Math.floor(t/2),A=s.slice(0,half),B=s.slice(half),wa=A.filter(x=>x.ok).length,wb=B.filter(x=>x.ok).length;
  /* net walk: +1 right, -1 wrong, after every call */
  const walk=[0];s.forEach(x=>walk.push(walk[walk.length-1]+(x.ok?1:-1)));
  /* rolling hit rate over the last 20 calls (from call 20 on) */
  const R=20,roll=[];for(let i=R;i<=t;i++)roll.push(s.slice(i-R,i).filter(x=>x.ok).length/R);
  /* calls needed before a coin does this well only 1 time in 20, if it keeps this hit rate (one-sided normal approx) */
  const need=h>.5?Math.ceil(Math.pow(1.645*.5/(h-.5),2)):null;
  M[m]={m,nm:NM[m],t,W,L:t-W,h,odds:h>.5?Math.max(2,Math.round(1/c)):null,pc:c,
    A:{t:A.length,W:wa,h:wa/A.length,from:A[0]&&A[0].n,to:A[A.length-1]&&A[A.length-1].n},
    B:{t:B.length,W:wb,h:wb/B.length,from:B[0]&&B[0].n,to:B[B.length-1]&&B[B.length-1].n},
    walk,roll,need,seq:s,pnl:P[m].pnl,col:PQ.col(m),
    /* a coin's usual range after t calls (95%): +-1.96*sqrt(t) on the walk, 50% +- 1.96*0.5/sqrt(t) on the rate */
    band:1.96*.5/Math.sqrt(t),
    /* how many of 1,000 coins (same number of calls) end below this AI */
    beat:Math.round((1-c+(pmf(t)[W]||0))*1000-((pmf(t)[W]||0)*1000)/2)}});
const byH=MS.slice().sort((a,b)=>M[b].h-M[a].h);
/* hand lettering: every letter its own size, angle and baseline (seeded, the same each load) */
function letter(txt,seed,o){o=o||{};const j=o.j==null?1:o.j;let i=0;return txt.split('').map(ch=>{if(ch===' ')return '<span class="p2-sp"> </span>';i++;const r=k=>PQ.rnd(seed*17+i*5+k)-.5;
  return `<span class="p2-lt" style="--s:${(1+r(1)*.16*j).toFixed(3)};--r:${(r(2)*7*j).toFixed(2)}deg;--y:${(r(3)*.09*j).toFixed(3)}em">${ch}</span>`}).join('')}
const fmt=v=>Math.round(v*100)+'%';
const lead=MS.slice().sort((a,b)=>P[b].pnl-P[a].pnl)[0];
window.P2={M,byH,tail,pmf,letter,fmt,D0,MS,NM,lead,N:D0.N};
})();
function P2mount(){const T=window.P2T;if(!T)return;const sp=document.querySelector('.wc-splash');document.documentElement.classList.add('p2-on');
  sp.insertAdjacentHTML('beforeend',`<div class="p2 p2-${T.id}">${T.html(window.P2)}</div>`);if(T.after)T.after(sp.querySelector('.p2'),window.P2)}
/* shared drawing helpers */
P2.rate=m=>{const s=P2.M[m].seq;let w=0;return s.map((x,i)=>{if(x.ok)w++;return (w+1)/(i+3)})};
/* a scalloped cloud edge along points pts [[x,y]...], bulging up (dir -1) or down (dir 1); returns path segment */
P2.scallop=(pts,dir,seed,amp)=>{let d='';for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i],mx=(x0+x1)/2,my=(y0+y1)/2,a=(amp||1)*(10+PQ.rnd(seed+i)*9);d+=` Q${mx.toFixed(1)} ${(my+dir*a).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`}return d};
P2.rough='<filter id="p2rough" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter>';
P2.face=(m,cls)=>`<img class="p2-face ${cls||''}" src="media/founder-${m.toLowerCase()}-anim.jpg" alt="">`;
