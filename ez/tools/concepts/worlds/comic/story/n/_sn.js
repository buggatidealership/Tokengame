/* helper n: the Leaderboard's top (round 2 of L1, the fight bill). Windows Season, Last 24 hours, Last 7 days.
   Every number from ROUNDS' resolve dates and __x2pPnl()'s per-round values; nothing typed. window.__snNow (ms) moves
   "now" for the empty-24h shot: a round counts as graded only once its close is before that moment. Uses helper i's SI
   for faces, names and money formats. A take sets window.SNT = {cls, render(x), show(bout,html,x,prev,anim), empty(x)}. */
(function(){if(window.SN)return;const S=SI,D=document,NOW=window.__snNow||Date.now(),ORDER=S.ORDER,P=S.P;
/* each exchange's close (copied from world-comic.js) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};const closeAt=(t,mdy)=>{if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x};
/* the US close (4 pm New York) of a resolve date: the rule the Leaderboard's proof uses for its "Last 24h" */
const ny4=s=>closeAt('',s);
const nyParts=t=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',month:'numeric',day:'numeric',year:'2-digit',hour:'numeric',minute:'2-digit',hourCycle:'h23'}).formatToParts(new Date(t));const g=k=>(p.find(x=>x.type===k)||{}).value;return {wd:g('weekday'),m:+g('month'),d:+g('day'),y:+g('year'),h:+g('hour'),mi:+g('minute')}};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const T0=nyParts(NOW),dayUTC=(m,d,y)=>Date.UTC(2000+(y%100),m-1,d),today=dayUTC(T0.m,T0.d,T0.y);
const dAgo=r=>{const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-dayUTC(m,d,y))/864e5)};
/* graded as of NOW (all of ROUNDS unless __snNow moves the clock back) */
const R=S.R.filter(r=>{const c=ny4(r.resolves);return c!=null&&c<=NOW});
const per=(m,r)=>P[m].per[r.n]?P[m].per[r.n].v:0;
const seq={};ORDER.forEach(m=>{seq[m]=[];R.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return;seq[m].push({r,ok:/^UP/i.test(c[1])===(r.a>0)})})});
const rankBy=(f,full)=>ORDER.slice().sort((a,b)=>{if(full){const n=R.length,ha=seq[a].length*2>=n,hb=seq[b].length*2>=n;if(ha!==hb)return hb-ha}return f(b)-f(a)});
const W=[
 {k:'season',t:'Season',f:()=>true,when:'Since '+md(R[0].called||R[0].resolves)},
 {k:'d1',t:'Last 24 hours',f:r=>ny4(r.resolves)>NOW-864e5},
 {k:'d7',t:'Last 7 days',f:r=>{const a=dAgo(r);return a>=0&&a<=6}}];
W.forEach(w=>{w.rs=R.filter(w.f);w.amt=m=>w.rs.reduce((t,r)=>t+per(m,r),0);w.wl=m=>{const s=seq[m].filter(x=>w.f(x.r)),k=s.filter(x=>x.ok).length;return {W:k,L:s.length-k}}});
const lastBell=R.reduce((a,r)=>ny4(r.resolves)>ny4(a.resolves)?r:a,R[0]);
const lbp=nyParts(ny4(lastBell.resolves));
W[1].when=W[1].rs.length?(md(W[1].rs[0].resolves)+' close'):'No close';
W[2].when=(()=>{const a=nyParts(today-6*864e5+12*36e5);return MON[a.m-1]===MON[T0.m-1]?`${MON[a.m-1]} ${a.d} to ${T0.d}`:`${MON[a.m-1]} ${a.d} to ${MON[T0.m-1]} ${T0.d}`})();
/* the board's rule for the season (P&L, an AI under half the rounds after the rest); the windows by money in them */
const season=W[0];const rank=rankBy(m=>season.amt(m),true);
/* the reign of the golden ticket holder: since which round it has led without a break */
const reign=(()=>{const bal={};ORDER.forEach(m=>bal[m]=0);let from=null;R.forEach((r,i)=>{ORDER.forEach(m=>bal[m]+=per(m,r));const n=i+1;
  const lead=ORDER.slice().sort((a,b)=>{const ha=seq[a].filter(x=>x.r.n<=r.n).length*2>=n,hb=seq[b].filter(x=>x.r.n<=r.n).length*2>=n;return (hb-ha)||(bal[b]-bal[a])})[0];
  if(lead!==rank[0])from=null;else if(!from)from=r});return from})();
const last5=m=>seq[m].slice(-5).filter(x=>x.ok).length;
const logo=(r,cls)=>{const l=S.coLogo(r.ticker),dk=((window.CO_LOGOS||{})[r.ticker]||{}).dark;return l?`<img class="sn-lg${dk?' sn-dk':''} ${cls||''}" src="${l}" alt="">`:''};
/* the round that gave #1 its biggest edge over #2 in the window ("decided on" only when that round alone flips the order) */
const swing=(w,a,b)=>{let best=null;w.rs.forEach(r=>{const va=per(a,r),vb=per(b,r),d=va-vb;if(!best||d>best.d)best={r,va,vb,d}});return best};
const fight=w=>{if(w.k==='season')return {a:rank[0],b:rank[1],la:'Golden ticket',lb:'Challenger',o:rank};
  const o=rankBy(m=>w.amt(m),false);return {a:o[0],b:o[1],la:'#1',lb:'#2',o}};
const line=(w,F)=>{if(w.k==='season'){const l5=last5(F.a);return `${S.NM[F.a]} took the ticket on ${logo(reign)}<b>${S.esc(reign.co)}</b>, round ${reign.n}.${l5<=1?` Only ${l5} of its last 5 calls ${l5===1?'was':'were'} right.`:''}`}
  const s=swing(w,F.a,F.b);if(!s)return '';const flips=(w.amt(F.a)-s.va)<(w.amt(F.b)-s.vb);
  return `${flips?'Decided on':'Biggest edge:'} ${logo(s.r)}<b>${S.esc(s.r.co)}</b>. ${S.NM[F.a]} ${S.k$(s.va)}, ${S.NM[F.b]} ${S.k$(s.vb)}.`};
/* the next bell: the soonest exchange close among rounds not graded yet (calls in or to come) */
const nextBell=(()=>{const pool=[...(window.PENDING||[]),...(window.UPCOMING||[]),...S.R.filter(r=>!R.includes(r))];
  const t=pool.map(r=>({r,t:closeAt(r.ticker,r.resolves)})).filter(x=>x.t&&x.t>NOW);if(!t.length)return null;const m=Math.min(...t.map(x=>x.t));
  const at=t.filter(x=>x.t===m).map(x=>x.r);return {t:m,rs:at}})();
const wdName={Mon:'Monday',Tue:'Tuesday',Wed:'Wednesday',Thu:'Thursday',Fri:'Friday',Sat:'Saturday',Sun:'Sunday'};
const all=W.map(w=>{const F=fight(w);const amts=Object.fromEntries(ORDER.map(m=>[m,w.amt(m)]));
  return {w,F,va:amts[F.a],vb:amts[F.b],gap:Math.round(amts[F.a])-Math.round(amts[F.b]),wa:w.wl(F.a),wb:w.wl(F.b),n:w.rs.length,line:line(w,F),amts,
   under:F.o.filter(m=>m!==F.a&&m!==F.b),empty:!w.rs.length}});
const inT=ms=>{const mn=Math.max(1,Math.round(ms/6e4)),h=Math.floor(mn/60);return h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m'};
const bellWhen=nb=>{const p=nyParts(nb.t),hh=(p.h%12||12)+(p.mi?':'+String(p.mi).padStart(2,'0'):'')+(p.h<12?' am':' pm');
  return (p.d===T0.d&&p.m===T0.m?'Today':wdName[p.wd])+' '+hh+' ET'};
/* the empty 24h: said plainly, with the last bell and the next one */
const emptyLine=()=>`No close in the last 24 hours. Last bell: ${wdName[lbp.wd]} ${MON[lbp.m-1]} ${lbp.d}.${nextBell?` Next: ${bellWhen(nextBell)}, ${nextBell.rs.map(r=>logo(r)+'<b>'+S.esc(r.co)+'</b>').slice(0,2).join(' and ')}${nextBell.rs.length>2?' +'+(nextBell.rs.length-2):''}.`:''}`;
/* money counter: from where the fighter stood in the last window to the new figure; instant with reduced motion */
const count=(el,to,dur)=>{const from=+el.dataset.v||0;el.dataset.v=to;const fmt=v=>el.dataset.plain?S.$f(v).replace(/^[+−]/,''):S.$f(v);
  const cl=v=>{if(el.dataset.plain)return;el.classList.toggle('wc-tu',v>=0);el.classList.toggle('wc-td',v<0)};
  if(S.RM()||!dur||Math.round(from)===Math.round(to)){el.textContent=fmt(to);cl(to);return}const t0=performance.now();
  const step=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3),v=from+(to-from)*e;el.textContent=fmt(v);cl(v);if(k<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
const wlh=x=>`<span class="sn-wl"><b class="wc-tu">${x.W}</b>-<b class="wc-td">${x.L}</b><small>W-L</small></span>`;
/* the scoreboard below follows the window (re-ordered, with the window's money on a sticker) */
const board=(x,anim)=>{const lb=D.getElementById('wc-lb'),list=lb&&lb.querySelector('.wc-sb');if(!list)return;
  const tk=[...list.querySelectorAll('.wc-sb-r')],byM={};tk.forEach(t=>{byM[(t.querySelector('h3')||{}).textContent.trim().toUpperCase()]=t});
  const o=x.w.k==='season'?rank:x.F.o,r0=new Map(tk.map(t=>[t,t.getBoundingClientRect()]));
  o.forEach((m,i)=>{const t=byM[m];if(!t)return;t.style.order=i;let sk=t.querySelector('.sn-sk');if(!sk){t.insertAdjacentHTML('beforeend','<span class="sn-sk" aria-hidden="true"></span>');sk=t.querySelector('.sn-sk')}
    sk.innerHTML=x.w.k==='season'?'':`<small>${x.w.t}</small><b class="${x.amts[m]>=0?'wc-tu':'wc-td'}">${S.k$(x.amts[m])}</b><i>#${i+1}</i>`;sk.classList.toggle('sn-on',x.w.k!=='season')});
  list.style.display='grid';
  if(anim&&!S.RM())tk.forEach(t=>{const a=r0.get(t),z=t.getBoundingClientRect(),dy=a.top-z.top;if(dy)t.animate([{transform:`translateY(${dy}px)`},{transform:'none'}],{duration:620,easing:'cubic-bezier(.3,1.2,.4,1)'})})};
/* the bell chip (top right of the header): when the next round is graded */
const bell=()=>nextBell?`<span class="sn-bell" title="Next close that grades a round"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a1.6 1.6 0 0 1 1.6 1.6v.7c3 .8 4.9 3.4 4.9 6.6v3.7l1.8 2.4H3.7l1.8-2.4v-3.7c0-3.2 1.9-5.8 4.9-6.6v-.7A1.6 1.6 0 0 1 12 2.5zM9.6 19.6h4.8a2.4 2.4 0 0 1-4.8 0z"/></svg>
  <span><small>Next bell</small><b data-bell>${inT(nextBell.t-NOW)}</b><small>${nextBell.rs.length} round${nextBell.rs.length>1?'s':''}</small></span></span>`:'';
const mount=(cls)=>{const T=window.SNT,lb=D.getElementById('wc-lb');if(!lb||!T)return;const cv=lb.querySelector('.wc-tab-cv');
  lb.querySelectorAll(':scope > .wc-pfs, :scope > .wc-race').forEach(x=>x.classList.add('sn-off'));
  cv.classList.add('sn-cv',cls+'-cv');
  cv.innerHTML=`<div class="sn-bill ${cls}">
   <div class="sn-hd"><div class="sn-top"><span class="sn-std">The standings<small>${R.length} earnings reports graded</small></span>${bell()}</div>
   <h1 class="wc-tab-h">Who's winning?</h1>
   <div class="sn-stubs" role="tablist" aria-label="Time window">${all.map(x=>`<button type="button" role="tab" class="sn-stub" data-k="${x.w.k}" aria-selected="${x.w.k==='season'}"><b>${x.w.t}</b><small>${x.w.when}</small></button>`).join('')}</div></div>
   <div class="sn-bout" aria-live="polite"></div></div>`;
  const bout=cv.querySelector('.sn-bout'),btns=[...cv.querySelectorAll('.sn-stub')];let cur=null;
  const show=(i,anim)=>{const x=all[i],prev=cur!=null?all[cur]:null;if(prev===x)return;btns.forEach(b=>b.setAttribute('aria-selected',b.dataset.k===x.w.k));
    const html=x.empty?T.empty(x):T.render(x,prev);
    const after=()=>{bout.querySelectorAll('[data-to]').forEach(el=>{const m=el.dataset.m;el.dataset.v=prev?(m?prev.amts[m]:+(el.dataset.from||0)):0;if(el.dataset.gap)el.dataset.v=prev?Math.abs(prev.gap):0;count(el,+el.dataset.to,anim?760:0)})};
    T.show(bout,html,x,prev,anim&&!S.RM(),after);cur=i;bout.dataset.k=x.w.k;bout.classList.toggle('sn-empty',x.empty);if(!window.__snNow)board(x,anim)};
  btns.forEach((b,i)=>b.onclick=()=>show(i,true));
  btns.forEach((b,i)=>b.onkeydown=e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();const j=(i+k+3)%3;btns[j].focus();show(j,true)}});
  show(0,false);
  const be=cv.querySelector('[data-bell]');if(be&&!window.__snNow)setInterval(()=>{be.textContent=inT(nextBell.t-Date.now())},30000);
  window.__snShow=(k,anim)=>show(W.findIndex(w=>w.k===k),anim);S.ready(cls)};
window.SN={W,all,rank,R,NOW,count,wlh,logo,emptyLine,nextBell,bellWhen,lastBell,mount,face:S.face,NM:S.NM,col:S.col,$f:S.$f,k$:S.k$,esc:S.esc,RM:S.RM,
  /* print a model's colour as a corner ground: Grok's ink stays ink */
  ink:m=>S.col(m)};
})();
