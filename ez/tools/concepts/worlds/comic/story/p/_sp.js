/* helper p, shared core: the Leaderboard's scoreboard cards, rebuilt over the live X3+ page.
   One source of truth for the window: the live "Who's winning" stubs (.wc11n-stub, aria-selected). Every extra control a take
   adds only calls __wc11Show(k,true); a MutationObserver on the live stubs re-renders every card and every control.
   The numbers: __x2pPnl() per-round values, ROUNDS, MODELS. The windows use the live rules (r11Lb in world-comic.js):
   Season = every graded round; Last 24 hours = a round whose own exchange close fell in the last 24 hours; Last 7 days = rounds
   graded today and the six days before (New York calendar). The % under the P&L = the window's P&L over the balance it started
   the window with (Season: the $100,000). A take sets window.SPT = {cls, card(el,m,x), after(x,anim,prev), mount()}. */
(function(){if(window.SP)return;const D=document,H=D.documentElement,P=window.__x2pPnl().A,ORDER=['GPT','KIMI','CLAUDE','GROK'];
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''},coDk=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
/* each exchange's close (copied from world-comic.js) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};const closeAt=(t,mdy)=>{if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x};
const tp=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date()),tg=k=>+tp.find(x=>x.type===k).value;
const today=Date.UTC(2000+tg('year'),tg('month')-1,tg('day')),NOW=Date.now();
const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
const RS=ROUNDS.slice().sort((a,b)=>a.n-b.n);
const per=(m,r)=>P[m]&&P[m].per[r.n]?P[m].per[r.n].v:0;
const seq={};ORDER.forEach(m=>{seq[m]=[];RS.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return;seq[m].push({r,ok:/^UP/i.test(c[1])===(r.a>0)})})});
const WF={season:()=>true,d1:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c>NOW-864e5},d7:r=>{const a=dAgo(r);return a>=0&&a<=6}};
const TT={season:'Season',d1:'Last 24 hours',d7:'Last 7 days'},SH={season:'Season',d1:'24h',d7:'7d'};
const X={};Object.keys(WF).forEach(k=>{const f=WF[k],rs=RS.filter(f),x={k,t:TT[k],sh:SH[k],rs,amt:{},pct:{},wl:{},hr:{},tw:{},bal:{}};
  const st=D.querySelector(`.wc11n-stub[data-k="${k}"] small`);x.when=st?st.textContent.trim():'';
  ORDER.forEach(m=>{const a=rs.reduce((t,r)=>t+per(m,r),0),s=seq[m].filter(q=>f(q.r)),w=s.filter(q=>q.ok).length;x.amt[m]=a;
    const start=100000+P[m].pnl-a;x.pct[m]=start?a/start*100:0;
    x.wl[m]=k==='season'?{W:P[m].W,L:P[m].L}:{W:w,L:s.length-w};const t=x.wl[m].W+x.wl[m].L;x.hr[m]=t?Math.round(x.wl[m].W/t*100):null;
    let b=null,wo=null;rs.forEach(r=>{const q=P[m].per[r.n];if(!q)return;if(!b||q.v>b.v)b={v:q.v,r};if(!wo||q.v<wo.v)wo={v:q.v,r}});x.tw[m]={b,w:wo,n:rs.filter(r=>P[m].per[r.n]).length};
    /* balance after every graded round (for a line), and which of those rounds sit in this window */
    let v=100000;x.bal[m]=RS.filter(r=>P[m].per[r.n]).map(r=>{v+=per(m,r);return {v,in:f(r),n:r.n}})});X[k]=x});
const $f=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const k$=v=>(v<0?'−':'+')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const pc=v=>(v<0?'−':'+')+Math.abs(v).toFixed(1)+'%';
const ud=v=>v>=0?'wc-tu':'wc-td';
const cur=()=>{const s=D.querySelector('.wc11n-stub[aria-selected="true"]');return s?s.dataset.k:'season'};
const set=k=>{if(k!==cur()&&window.__wc11Show)window.__wc11Show(k,true)};
const lg=(r,cls)=>{const l=coLogo(r.ticker);return l?`<img class="sp-lg ${cls||''}${coDk(r.ticker)?' sp-dk':''}" src="${l}" alt="" title="${esc(r.co)}">`:''};
/* the common card: name and P&L on one line (P&L top right, % under), a dashed rule, the other window | W-L | hit rate,
   Last 5 (+ the take's filler), top and worst round */
const twl=(q,lab,cls)=>q?`<div class="sp-tw ${cls}"><dt>${lab}</dt><dd><b class="${ud(q.v)}">${k$(q.v)}</b>${lg(q.r)}<span class="sp-sr">${esc(q.r.co)}</span></dd></div>`:`<div class="sp-tw ${cls}"><dt>${lab}</dt><dd><span class="sp-no">No rounds</span></dd></div>`;
const cardHTML=(m,x)=>{const a=x.amt[m],other=x.k==='season'?X.d7:X.season,ov=other.amt[m],wl=x.wl[m],tw=x.tw[m];
  return `<div class="sp-c">
  <div class="sp-hd"><div class="sp-nm"><h3 class="sp-h3">${NM[m]}</h3><small>${esc(MODELS[m].ver)}</small></div>
   <p class="sp-pl"><small class="sp-plk"><span class="sp-wn">${x.sh}</span> P&amp;L</small><b class="sp-fig ${ud(a)}" data-v="${a}">${$f(a)}</b><span class="sp-pc ${ud(a)}">${pc(x.pct[m])}</span></p></div>
  <dl class="sp-st"><div class="sp-s1"><dt>${other.sh} P&amp;L</dt><dd class="${ud(ov)}">${k$(ov)}</dd></div>
   <div class="sp-s2"><dt>W-L</dt><dd><b class="wc-tu">${wl.W}</b>-<b class="wc-td">${wl.L}</b></dd></div>
   <div class="sp-s3"><dt>Hit rate</dt><dd>${wl.W+wl.L?x.hr[m]+'%':'–'}</dd></div></dl>
  <div class="sp-l5"><div class="sp-f"><span class="sp-k">Last 5</span><span class="wc-form sp-form">${seq[m].slice(-5).map(q=>`<i class="${q.ok?'wc-fw':'wc-fl'}" title="${esc(q.r.co)}">${q.ok?'✓':'✗'}</i>`).join('')}</span></div><div class="sp-fill"></div></div>
  <dl class="sp-tws">${tw.n===1?twl(tw.b,'Only round','sp-twb'):twl(tw.b,'Top round','sp-twb')+twl(tw.w,'Worst round','sp-tww')}</dl></div>`};
/* money counter: from the last window's figure to this one's (money accruing); instant with reduced motion */
const count=(el,from,to,dur)=>{if(RM()||!dur||Math.round(from)===Math.round(to)){el.textContent=$f(to);return}const t0=performance.now();
  const st=t=>{const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3),v=from+(to-from)*e;el.textContent=$f(v);el.classList.toggle('wc-tu',v>=0);el.classList.toggle('wc-td',v<0);if(k<1)requestAnimationFrame(st)};requestAnimationFrame(st)};
let last=null;
const render=anim=>{const T=window.SPT||{},k=cur(),x=X[k],prev=last?X[last]:null;if(last===k&&!anim)return;
  H.dataset.spw=k;D.querySelectorAll('#wc-lb .wc-sb-r').forEach(t=>{const m=((t.querySelector('h3')||{}).textContent||'').trim().toUpperCase();if(!P[m])return;
    const cap=t.querySelector('.wc9-cap');if(!cap)return;let box=cap.querySelector(':scope>.sp-c');if(box)box.remove();
    cap.insertAdjacentHTML('beforeend',cardHTML(m,x));const fig=cap.querySelector('.sp-fig');if(prev&&anim)count(fig,prev.amt[m],x.amt[m],700);
    t.dataset.spm=m;t.classList.toggle('sp-up',x.amt[m]>=0);t.classList.toggle('sp-dn',x.amt[m]<0);
    const rk=(+t.style.order||0)+1,sb=t.querySelector('.wc9-stub b');if(sb)sb.textContent='#'+rk;
    if(T.card)T.card(t,m,x,prev,anim)});
  D.querySelectorAll('[data-spk]').forEach(b=>{const on=b.dataset.spk===k;b.setAttribute('aria-pressed',on);b.classList.toggle('sp-on',on)});
  if(T.after)T.after(x,anim,prev);last=k};
/* the controls a take prints: three stubs, Season / Last 24 hours / Last 7 days (short words where asked) */
const ctl=(cls,short)=>`<div class="sp-ctl ${cls||''}" role="group" aria-label="Scoreboard time window">${['season','d1','d7'].map(k=>`<button type="button" class="sp-b" data-spk="${k}" aria-pressed="false"><b>${short?X[k].sh:X[k].t}</b>${short?'':`<small>${esc(X[k].when)}</small>`}</button>`).join('')}</div>`;
D.addEventListener('click',e=>{const b=e.target.closest('[data-spk]');if(b){e.preventDefault();set(b.dataset.spk)}});
const mount=()=>{const T=window.SPT||{};H.classList.add('sp-on',T.cls||'sp-x');
  D.querySelectorAll('#wc-lb .wc11n-sk').forEach(s=>s.remove());
  if(T.mount)T.mount();render(false);
  const stubs=D.querySelector('.wc11n-stubs');if(stubs)new MutationObserver(()=>{if(cur()!==last){D.querySelectorAll('#wc-lb .wc11n-sk').forEach(s=>s.style.display='none');render(true)}}).observe(stubs,{attributes:true,subtree:true,attributeFilter:['aria-selected']});
  requestAnimationFrame(()=>H.classList.add('sp-ready-'+(T.id||'x')))};
/* the scoreboard section's on-screen state, for docks */
const watch=(fn)=>{const sb=D.querySelector('#wc-lb .wc-sbd'),st=D.querySelector('.wc11n-stubs');const s={sb:false,st:true};
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.target===sb)s.sb=e.isIntersecting;else s.st=e.isIntersecting});fn(s)},{rootMargin:'-110px 0px -80px 0px'});
  if(sb)io.observe(sb);if(st)io.observe(st)};
window.SP={X,P,ORDER,NM,col,esc,$f,k$,pc,ud,lg,coLogo,cur,set,ctl,render,mount,watch,RM,seq,RS,MODELS};
})();
