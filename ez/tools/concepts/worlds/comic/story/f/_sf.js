/* Story mockups, helper "f" (2026-10-30): the Leaderboard tab as the page you come back to.
   Shared by f1, f2, f3. Laid over the built X3+ after helper c's _c.js and C4 (the line race).
   window.SF holds the "since you were here" story, computed from ROUNDS, PENDING, UPCOMING and __x2pPnl only.

   The window: the rounds graded since your last visit (localStorage "ez-lb-seen": {t, ns: graded round numbers}),
   or, with no stored visit (or nothing new since it), the rounds graded at the newest close in ROUNDS.
   window.__sfSeen overrides the stored visit for mockups. On pagehide the page stores this visit. */
window.SF=window.SF||(function(){
const D=document,d=window.__scD,{P,R,N,ORDER,NM,col,face}=d;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const key=s=>{if(!s)return 9e9;const [m,dd,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+dd};
const dt=s=>{const [m,dd,y]=s.split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,dd))};
const wd=s=>WD[dt(s).getUTCDay()],wd3=s=>wd(s).slice(0,3),md=s=>{const x=dt(s);return MON[x.getUTCMonth()]+' '+x.getUTCDate()};
const nyT=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return g('year')*1e4+g('month')*100+g('day')};
const today=nyT();
/* relative day name from New York's today: Today, Tomorrow, Yesterday, else the weekday (within a week) or the date */
const rel=s=>{const dd=Math.round((key2date(key(s))-key2date(today))/864e5);return dd===0?'today':dd===1?'tomorrow':dd===-1?'yesterday':Math.abs(dd)<7?wd(s):md(s)};
function key2date(k){return Date.UTC(2000+Math.floor(k/1e4),Math.floor(k/100)%100-1,k%100)}
/* each exchange's close, as world-comic.js's closeAt (private there, so copied) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,dd,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,dd,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const left=at=>{const ms=at-Date.now();if(ms<=0)return null;const mn=Math.round(ms/6e4),h=Math.floor(mn/60);return h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m'};
const ago=t=>{const h=Math.round((Date.now()-t)/36e5);return h<1?'under an hour ago':h<36?h+' hour'+(h===1?'':'s')+' ago':Math.round(h/24)+' days ago'};

/* ---- the window ---- */
let seen=null;try{seen=window.__sfSeen||JSON.parse(localStorage.getItem('ez-lb-seen')||'null')}catch(e){seen=null}
const lastDay=R.reduce((k,r)=>Math.max(k,key(r.resolves)),0),lastS=R.find(r=>key(r.resolves)===lastDay).resolves;
let mode='close',win=R.filter(r=>key(r.resolves)===lastDay);
if(seen&&Array.isArray(seen.ns)){const w=R.filter(r=>!seen.ns.includes(r.n));if(w.length){mode='visit';win=w}else mode='same'}
win=win.slice().sort((a,b)=>(key(a.resolves)-key(b.resolves))||(a.n-b.n));
const inW={};win.forEach(r=>inW[r.n]=1);
/* balances before the window (every graded round outside it), then replayed through it in the order it was graded */
const b0={};ORDER.forEach(m=>{b0[m]=1e5;R.forEach(r=>{if(!inW[r.n]&&P[m].per[r.n])b0[m]+=P[m].per[r.n].v})});
const rank=b=>ORDER.slice().sort((x,y)=>b[y]-b[x]);
const before=rank(b0),cur={...b0},hand=[];let lead=before[0];
win.forEach(r=>{ORDER.forEach(m=>{if(P[m].per[r.n])cur[m]+=P[m].per[r.n].v});const L=rank(cur)[0];if(L!==lead){hand.push({r,m:L,from:lead});lead=L}});
const now=rank(cur),gap=cur[now[0]]-cur[now[1]];
const delta={},wl={};ORDER.forEach(m=>{delta[m]=cur[m]-b0[m];let w=0,l=0;win.forEach(r=>{const x=P[m].per[r.n];if(x){x.v>0?w++:l++}});wl[m]={w,l}});
const days=[];win.forEach(r=>{let g=days.find(x=>x.s===r.resolves||key(x.s)===key(r.resolves));if(!g){g={s:r.resolves,rs:[]};days.push(g)}g.rs.push(r)});
/* each AI's biggest single win and loss this season (helper c's figures and today's "Best and worst calls") */
const bw={};ORDER.forEach(m=>{let b=null,w=null;R.forEach(r=>{const x=P[m].per[r.n];if(!x)return;if(!b||x.v>b.v)b={v:x.v,r};if(!w||x.v<w.v)w={v:x.v,r}});bw[m]={b,w}});

/* ---- what is coming ---- */
const PEN=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length).slice().sort((a,b)=>(key(a.resolves)-key(b.resolves))||(a.n-b.n));
const nextK=PEN.length?key(PEN[0].resolves):null,locked=PEN.filter(p=>key(p.resolves)===nextK);
const bellAt=locked.length?Math.max(...locked.map(p=>closeAt(p.ticker,p.resolves)||0)):null;
/* the next predictions due: rounds without calls, called today or later (a round dated in the past without calls is skipped) */
const UPx=(window.UPCOMING||[]).concat((window.PENDING||[]).filter(p=>!(p.calls&&p.calls.length))).filter(u=>key(u.called)>=today).sort((a,b)=>(key(a.called)-key(b.called))||(a.n-b.n));
const dueK=UPx.length?key(UPx[0].called):null,due=UPx.filter(u=>key(u.called)===dueK);
const stale=(window.UPCOMING||[]).filter(u=>key(u.called)<today);
const tally=p=>{let u=0,dn=0;p.calls.forEach(c=>c.v>0?u++:dn++);return {u,dn}};

/* ---- money and pictures ---- */
const usd=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const usdK=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const mv=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2).replace(/\.?0+$/,'')+'%';
const CL=t=>(window.CO_LOGOS||{})[t]||{};
const short=c=>String(c).replace(/ (Inc\.?|Corp\.?|Corporation|Holdings|Group|plc|AG|SE)$/i,'').replace(/^(The) /,'');
/* a company chip: its logo on a cream disc over its own brand colour (filled in once read from the logo file) */
const chip=(t,co,extra,cls)=>{const L=CL(t);return `<span class="sf-co ${cls||''}" data-tk="${esc(t)}" title="${esc(co)}"><i class="sf-co-d${L.dark?' sf-co-dk':''}">${L.f?`<img src="media/${esc(L.f)}" alt="" loading="eager">`:`<b>${esc(t.replace(/\..*$/,'').slice(0,4))}</b>`}</i>${extra||''}<span class="wc-sr">${esc(co)}</span></span>`};
async function paint(root){if(!window.__bpal)return;const els=[...(root||D).querySelectorAll(':is(.sf-co,.sf-tk)[data-tk]:not(.sf-pd)')];const memo={};
  await Promise.all(els.map(async e=>{const t=e.dataset.tk,L=CL(t);if(!L.f){e.classList.add('sf-pd');return}memo[t]=memo[t]||window.__bpal('media/'+L.f);const p=await memo[t];
    if(p.main){e.style.setProperty('--bc',p.main);e.style.setProperty('--ba',p.acc||p.main)}e.classList.add('sf-pd')}))}
const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||window.__kfShot;
const reveal=(el,cls,th)=>{if(rm()){el.classList.add(cls||'sf-in');return}new IntersectionObserver((es,ob)=>{if(es[0].isIntersecting){el.classList.add(cls||'sf-in');ob.disconnect()}},{threshold:th||.25}).observe(el)};
/* count a figure up from zero (money arriving); the end value is the text already there */
const count=(el,ms)=>{if(rm())return;const v=+el.dataset.v,s=el.dataset.s||'',pre=el.dataset.p||'$',k=el.dataset.k;const t0=performance.now();
  const f=t=>{const q=Math.min(1,(t-t0)/(ms||900)),e=1-Math.pow(1-q,3),x=v*e;el.textContent=s+pre+(k?(x/1000).toFixed(1)+'K':Math.round(x).toLocaleString('en-US'));if(q<1)requestAnimationFrame(f)};requestAnimationFrame(f)};

/* ---- the story line, in words (also the screen-reader summary) ---- */
const since=mode==='visit'?'Since your visit '+ago(seen.t||Date.now()):'Since '+rel(lastS)+"'s close";
const sinceShort=mode==='visit'?'Since your visit':(rel(lastS)==='yesterday'?"Yesterday's close":rel(lastS).replace(/^./,c=>c.toUpperCase())+"'s close");
const handLine=!hand.length?NM[now[0]]+' kept the lead.':hand.length===1?NM[hand[0].m]+' took the lead.':'The lead changed hands '+(hand.length===2?'twice':hand.length+' times')+'.';

/* ---- the body every take shares: cut to what earns its place (lesson 25) ---- */
function body(o){o=o||{};const lb=D.getElementById('wc-lb');if(!lb)return;
  lb.classList.add('sf-on');
  const cv=lb.querySelector('.wc-tab-cv');if(cv)cv.classList.add('sf-hide');                 // the cover asks "Who's winning?"; the take answers it
  const bws=lb.querySelector('.wc-bws');if(bws)bws.classList.add('sf-hide');                 // folded into each scoreboard ticket
  const bk=lb.querySelector('.wc-back');if(bk)bk.classList.add('sf-hide');                   // the X link moves next to the predictions
  /* C4: its head line no longer repeats the lead and the gap (the take's top says them) */
  const rc=lb.querySelector('.sc-race');if(rc){const s=rc.querySelector('.wc-h2 small');if(s)s.textContent='P&L after every graded round.'}
  /* the scoreboard: one short line, no streak (the last five already show it), each AI's top W and top L folded in */
  const sb=lb.querySelector('.wc-sbd');if(sb){const sm=sb.querySelector('.wc-h2 small');if(sm)sm.textContent='Ranked by P&L. We bet on the leader’s call.';
    const cp=sb.querySelector('.wc-sb-cap');if(cp)cp.textContent='Simulated: $100,000 each, the whole balance on every call, no leverage, before fees.';
    sb.querySelectorAll('.wc-sb-r').forEach(r=>{const m=((r.querySelector('h3')||{}).textContent||'').trim().toUpperCase();if(!P[m])return;
      const st=r.querySelectorAll('.wc-sb-st > div');if(st[2])st[2].classList.add('sf-hide');
      const c=r.querySelector('.wc9-cap')||r,x=bw[m];if(!c.querySelector('.sf-bw')&&x.b)c.insertAdjacentHTML('beforeend',`<p class="sf-bw"><span class="sf-bw-w"><small>Top W</small>${chip(x.b.r.ticker,x.b.r.co,'','sf-co-xs')}<b class="wc-tu">${usdK(x.b.v)}</b></span><span class="sf-bw-l"><small>Top L</small>${chip(x.w.r.ticker,x.w.r.co,'','sf-co-xs')}<b class="wc-td">${usdK(x.w.v)}</b></span></p>`);
      if(o.stamps&&!r.querySelector('.sf-ds')){const v=delta[m];r.insertAdjacentHTML('beforeend',`<span class="sf-ds ${v>=0?'sf-ds-u':'sf-ds-d'}" title="${esc(since)}"><b>${usdK(v)}</b><small>${esc(sinceShort.toLowerCase().replace(/^since /,''))}</small></span>`)}})}
  /* the proof: the P&L view is the race above, so the switch opens on Accuracy */
  const pf=lb.querySelector('.wc-pf');if(pf&&!pf.dataset.sf){pf.dataset.sf=1;const t=pf.querySelector('#wc-pft-acc');if(t)t.click();
    setTimeout(()=>{const a=pf.querySelector('#wc-pft-pnl'),v=pf.querySelector('#wc-pfv-pnl');if(a)a.remove();if(v)v.remove();dispatchEvent(new Event('resize'))},rm()?0:700);
    const s=lb.querySelector('.wc-pfs .wc-h2 small');if(s)s.textContent='Three ways to check. Small samples, so it can still flip.'}
  paint(lb);
  try{addEventListener('pagehide',()=>{try{localStorage.setItem('ez-lb-seen',JSON.stringify({t:Date.now(),ns:R.map(r=>r.n)}))}catch(e){}})}catch(e){}}

/* place a take's top where the cover was */
function top(el){const lb=D.getElementById('wc-lb'),rc=lb.querySelector('.sc-race')||lb.querySelector('.wc-sbd');rc.before(el);paint(el);return el}

return {d,P,R,N,ORDER,NM,col,face,esc,key,wd,wd3,md,rel,closeAt,left,ago,usd,usdK,mv,chip,paint,rm,reveal,count,short,
  mode,seen,win,days,hand,before,now,gap,cur,b0,delta,wl,bw,lastS,PEN,locked,bellAt,due,dueK,stale,tally,since,sinceShort,handLine,body,top,today};
})();
