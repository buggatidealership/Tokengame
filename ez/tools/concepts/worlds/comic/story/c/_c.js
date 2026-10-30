/* Story mockups, helper "c" (2026-10-30): the shared data for every take, computed from the page's own globals
   (ROUNDS, MODELS, __x2pPnl). Nothing is typed by hand. window.__scD holds it. */
(function(){
const D=document,P=window.__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length,ORDER=['GPT','KIMI','CLAUDE','GROK'];
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const face=(m,cls)=>{const M=MODELS[m];return `<i class="wc-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`};
/* exact binomial(n, 1/2): the central range a fair coin's right calls land in at least 95% of the time.
   lo = the smallest k with P(X <= k) > 2.5%, hi = n - lo (the distribution is symmetric). */
const LF=[0];for(let i=1;i<=400;i++)LF[i]=LF[i-1]+Math.log(i);
const pmf=(k,n)=>Math.exp(LF[n]-LF[k]-LF[n-k]-n*Math.LN2);
function band(n){if(!n)return {lo:0,hi:0,cov:1};let c=0,k=0;for(;k<=n;k++){c+=pmf(k,n);if(c>.025)break}const lo=k,hi=n-lo;let cov=0;for(let j=lo;j<=hi;j++)cov+=pmf(j,n);return {lo,hi,cov}}
/* chance a fair coin gets at least k of n right */
const tail=(k,n)=>{let s=0;for(let i=k;i<=n;i++)s+=pmf(i,n);return s};
const M={};ORDER.forEach(m=>{const cs=R.filter(r=>P[m].per[r.n]).map(r=>({n:r.n,ok:P[m].per[r.n].v>0,co:r.co}));let k=0;
  const sm=[.5],raw=[null];cs.forEach((c,i)=>{if(c.ok)k++;sm.push((k+1)/(i+3));raw.push(k/(i+1))});
  M[m]={cs,n:cs.length,W:k,hr:k/cs.length,sm,raw}});
/* the race: each AI's balance after every graded round (a skipped round leaves it as it is), the leader after each */
const bal={};ORDER.forEach(m=>{bal[m]=[1e5];R.forEach((r,i)=>{const x=P[m].per[r.n];bal[m].push(bal[m][i]+(x?x.v:0))})});
const order=[ORDER.slice()];for(let i=1;i<=N;i++){const pv=order[i-1];order.push(ORDER.slice().sort((a,b)=>(bal[b][i]-bal[a][i])||(pv.indexOf(a)-pv.indexOf(b))))}
const lead=order.map(o=>o[0]);
/* a lead change: the round after which a different AI is in front (round 1 sets the first leader, not counted) */
const changes=[];for(let i=2;i<=N;i++)if(lead[i]!==lead[i-1])changes.push({i,n:R[i-1].n,co:R[i-1].co,m:lead[i],from:lead[i-1],gap:bal[lead[i]][i]-bal[lead[i-1]][i]});
/* every pass for any place */
const passes=[];for(let i=2;i<=N;i++){order[i].forEach((m,now)=>{const was=order[i-1].indexOf(m);if(now<was)order[i-1].slice(now,was).filter(o=>order[i].indexOf(o)>now).forEach(o=>passes.push({i,n:R[i-1].n,m,past:o,to:now+1}))})}
const ledRounds={};ORDER.forEach(m=>ledRounds[m]=lead.slice(1).filter(x=>x===m).length);
const now=order[N];
window.__scD={P,R,N,ORDER,NM,col,face,band,tail,M,bal,order,lead,changes,passes,ledRounds,now,
  usd:v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US'),
  usdK:v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v))),
  rm:()=>matchMedia('(prefers-reduced-motion: reduce)').matches};
})();
/* the hit-rate chart with the luck band, shared by c1 and c2.
   x = calls made by that model (0 to xmax); y = the page's own hit rate (right + 1) / (calls + 2), so every line starts at 50%.
   The band is the same formula applied to the coin's 95% range: ((lo + 1) / (n + 2), (hi + 1) / (n + 2)), so a line is inside
   the band exactly when its raw count of right calls is inside the coin's range. */
(function(){const d=window.__scD,{M,ORDER,NM,col,face,band}=d;
d.chart=function(o){const xmax=o.xmax,now=Math.max(...ORDER.map(m=>M[m].n)),lo=.2,hi=.8;
  const X=n=>n/xmax*1000,Y=v=>(hi-Math.max(lo,Math.min(hi,v)))/(hi-lo)*100,XP=n=>(n/xmax*100),
    ex=n=>{const b=band(n);return [(b.hi+1)/(n+2),(b.lo+1)/(n+2)]},
    /* the exact band zigzags between odd and even call counts; the drawn edge is its envelope from that call on
       (the widest the exact range gets at this count or any later one), so the edge never jumps. It is never narrower than the exact band. */
    EU=[],EL=[];for(let n=xmax+4;n>=0;n--){const [t,u]=ex(n);EU[n]=Math.max(t,EU[n+1]==null?t:EU[n+1]);EL[n]=Math.min(u,EL[n+1]==null?u:EL[n+1])}
  const bt=n=>[EU[n],EL[n]];
  const pts=(a,b)=>{const up=[],dn=[];for(let n=a;n<=b;n++){const [t,u]=bt(n);up.push([n,t]);dn.push([n,u])}return {up,dn}};
  const poly=(a,b)=>{const {up,dn}=pts(a,b);return up.concat(dn.reverse()).map(([n,v])=>XP(n).toFixed(3)+'% '+Y(v).toFixed(3)+'%').join(',')};
  const edge=(a,b,cls)=>{const {up,dn}=pts(a,b);return [up,dn].map(L=>'<path class="'+cls+'" d="'+L.map(([n,v],i)=>(i?'L':'M')+X(n).toFixed(1)+' '+Y(v).toFixed(2)).join(' ')+'"/>').join('')};
  const by=ORDER.slice().sort((a,b)=>M[b].hr-M[a].hr);
  const lines=by.slice().reverse().map(m=>'<path class="sc-l'+(m===by[0]?' sc-lead':'')+'" pathLength="1" style="--mc:'+col(m)+'" d="'+M[m].sm.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(2)).join(' ')+'"/>').join('');
  const gl=[.3,.4,.6,.7];
  let h='<div class="sc-cv'+(o.future?' sc-fut':'')+'"><div class="sc-rv">'
   +'<div class="sc-bf" style="clip-path:polygon('+poly(0,Math.min(now,xmax))+')"></div>'
   +(o.future?'<div class="sc-bf sc-bf2" style="clip-path:polygon('+poly(now,xmax)+')"></div>':'')
   +'<svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">'+gl.map(v=>'<line class="sc-g" x1="0" x2="1000" y1="'+Y(v)+'" y2="'+Y(v)+'"/>').join('')
   +edge(0,Math.min(now,xmax),'sc-be')+(o.future?edge(now,xmax,'sc-be sc-be2'):'')
   +'<line class="sc-coinl" x1="0" x2="1000" y1="'+Y(.5)+'" y2="'+Y(.5)+'"/>'+lines+'</svg></div>'
   +gl.map(v=>'<span class="sc-yl" style="top:'+Y(v)+'%">'+Math.round(v*100)+'%</span>').join('')+'<span class="sc-yl sc-yl5" style="top:'+Y(.5)+'%">50%</span>';
  return {html:h,X,Y,XP,bt,ex,now,by,lo,hi}};
d.rateTxt=m=>Math.round(M[m].hr*100)+'%';
/* reveal once in view; nothing moves with reduced motion */
d.reveal=(el,cls)=>{if(d.rm()||window.__kfShot){el.classList.add(cls||'sc-in');return}new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){el.classList.add(cls||'sc-in');ob.disconnect()}},{threshold:.3}).observe(el)};
})();
/* the Leaderboard race: a section placed above the scoreboard (story first, then the numbers); today's rank-only
   "The race so far" further down is hidden, since every take here replaces it */
(function(){const d=window.__scD;
d.raceSec=(cls,inner,small)=>{const lb=document.getElementById('wc-lb'),sb=lb.querySelector('.wc-sbd');
  const s=document.createElement('section');s.className='sc-race '+cls;s.setAttribute('aria-label','The race');
  s.innerHTML='<h2 class="wc-h2"><span>The race</span><small>'+small+'</small></h2>'+inner;sb.before(s);
  const old=lb.querySelector('.wc-race');if(old)old.style.display='none';return s};
const last=d.changes[d.changes.length-1],g=d.bal[d.now[0]][d.N]-d.bal[d.now[1]][d.N];
d.raceLine=d.changes.length+' lead changes. '+d.NM[d.now[0]]+' has led since round '+last.n+', by $'+Math.round(g).toLocaleString('en-US')+'.';
d.gap=g;
})();
