/* helper i: shared data for every take, computed from the page's own ROUNDS, MODELS, CO_LOGOS and __x2pPnl (nothing typed) */
(function(){if(window.SI)return;const D=document;
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const face=(m,cls,holo)=>`<i class="wc-face ${cls||''}${holo?' wc9-holo':''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const coDk=t=>((window.CO_LOGOS||{})[t]||{}).dark?' class="wc-lg-dk"':'';
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const key=s=>{const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const P=window.__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length;
/* each AI's calls in order: right way or not */
const seq={};ORDER.forEach(m=>{seq[m]=[];R.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return;const up=/^UP/i.test(c[1]);seq[m].push({n:r.n,r,ok:up===(r.a>0),up,off:+c[2]})})});
const W=m=>seq[m].filter(x=>x.ok).length,C=m=>seq[m].length;
/* the board's rule: ranked by P&L, an AI that called under half the rounds after the rest */
const rankAt=(bal,i)=>ORDER.slice().sort((a,b)=>{const ha=seq[a].filter(x=>x.n<=(i?R[i-1].n:0)).length*2>=i,hb=seq[b].filter(x=>x.n<=(i?R[i-1].n:0)).length*2>=i;return (hb-ha)||(bal[b][i]-bal[a][i])});
const bal={};ORDER.forEach(m=>{bal[m]=[1e5];R.forEach((r,i)=>bal[m].push(bal[m][i]+(P[m].per[r.n]?P[m].per[r.n].v:0)))});
const rank=rankAt(bal,N);
/* who led (held the golden ticket) after every graded round, and the reigns */
const lead=[null];for(let i=1;i<=N;i++)lead.push(rankAt(bal,i)[0]);
const reigns=[];for(let i=1;i<=N;i++){const m=lead[i],l=reigns[reigns.length-1];if(l&&l.m===m){l.to=i}else reigns.push({m,from:i,to:i})}
reigns.forEach(g=>{g.n0=R[g.from-1].n;g.n1=R[g.to-1].n;g.r0=R[g.from-1];g.len=g.to-g.from+1});
/* windows: the last close (rounds graded on the newest grading date) and the last 7 days */
const lastD=R.reduce((a,r)=>key(r.resolves)>key(a)?r.resolves:a,R[0].resolves);
const dd=(a,b)=>{const f=s=>{const [m,d,y]=s.split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};return Math.round((f(a)-f(b))/864e5)};
/* the last 7 days counted exactly as the live scoreboard does: calendar days back from today in New York (0 to 6) */
const nyT=(()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return `${g('month')}/${g('day')}/${g('year')}`})();
const inLast=r=>r.resolves===lastD,in7=r=>{const a=dd(nyT,r.resolves);return a>=0&&a<=6};
const sum=(m,f)=>R.reduce((t,r)=>f(r)&&P[m].per[r.n]?t+P[m].per[r.n].v:t,0);
/* where each AI stood 7 days ago: its balance without the last 7 days, ranked by the same rule */
const b7={};ORDER.forEach(m=>b7[m]=1e5+P[m].pnl-sum(m,in7));
const n7=m=>seq[m].filter(x=>!in7(x.r)).length,N7=R.filter(r=>!in7(r)).length;
const rank7=ORDER.slice().sort((a,b)=>((n7(b)*2>=N7)-(n7(a)*2>=N7))||(b7[b]-b7[a]));
/* runs of right and wrong calls */
const runs=m=>{let w=0,l=0,bw=0,bl=0,bwAt=null,blAt=null;seq[m].forEach((x,i)=>{if(x.ok){w++;l=0;if(w>bw){bw=w;bwAt=i}}else{l++;w=0;if(l>bl){bl=l;blAt=i}}});return {bw,bl,bwAt,blAt}};
/* chance a pure guesser gets at least k right of n (each call a 50/50) */
const tail=(k,n)=>{let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=Math.max(0,k);i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s};
/* the smallest lead (right minus wrong) a guesser reaches in n calls no more than 1 time in 20 */
const leadLine=n=>{for(let L=0;L<=n;L++){if((n+L)%2)continue;if(tail((n+L)/2,n)<=.05)return L}return n};
const FULL=120;
/* a seeded random for shots (Math.random otherwise) */
let seed=null;const rnd=()=>{if(seed==null)return Math.random();seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
window.SI={ORDER,NM,col,esc,face,coLogo,coDk,md,k$,$f,P,R,N,seq,W,C,bal,rank,lead,reigns,lastD,inLast,in7,sum,b7,rank7,nyT,runs,tail,leadLine,FULL,rnd,setSeed:s=>{seed=s},
  hr:m=>W(m)/C(m),RM:()=>matchMedia('(prefers-reduced-motion: reduce)').matches,
  ready:t=>D.documentElement.classList.add('si-ready-'+t),
  io:(el,f,th)=>{new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();f()}},{threshold:th||.25}).observe(el)}};
})();
/* the Leaderboard tab: hide the parts a take replaces, hand back the cover and the scoreboard */
(function(){const S=SI,D=document;S.lbBase=()=>{const lb=D.getElementById('wc-lb');if(!lb)return null;
  lb.querySelectorAll(':scope > .wc-pfs, :scope > .wc-race').forEach(x=>x.classList.add('si-off'));
  const sbd=lb.querySelector('.wc-sbd'),tk=[...lb.querySelectorAll('.wc-sb-r')],byM={};tk.forEach(t=>{byM[(t.querySelector('h3')||{}).textContent.trim().toUpperCase()]=t});
  return {lb,cv:lb.querySelector('.wc-tab-cv'),sbd,tk,byM}};
 S.gt=(cls)=>`<span class="si-gt ${cls||''}"><span>Golden</span><span>ticket</span></span>`;
 S.mv=m=>{const a=S.rank7.indexOf(m),b=S.rank.indexOf(m),d=a-b;return {d,html:`<span class="si-mv ${d>0?'si-mvu':d<0?'si-mvd':'si-mv0'}" title="${d>0?'Up '+d:d<0?'Down '+(-d):'No change'} since 7 days ago">${d>0?'▲'+d:d<0?'▼'+(-d):'·'}</span>`}};
 S.last5=m=>S.seq[m].slice(-5).filter(x=>x.ok).length;
})();
