/* helper s: the Leaderboard's scoreboard, three takes. Shared data and wiring.
   Every number comes from ROUNDS, MODELS, CO_LOGOS and __x2pPnl(). The windows follow r11Lb()'s own rules (world-comic.js):
   Season = every graded round, ranked as rankPnl (an AI under half the rounds after the rest, then P&L);
   Last 24 hours = rounds whose own exchange close fell in the last 24 hours (and resolved within -1..2 New York days);
   Last 7 days = rounds resolved today or in the six New York days before. Windows rank by the window's P&L.
   A take sets window.SST={id, build(sec), draw(x,prev,anim)}; the board's own switch calls the page's __wc11Show, so the fight
   bill above and the board always show the same window. Classes ss-. */
(function(){if(window.SS)return;const D=document,H=D.documentElement;
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'US',CLAUDE:'US',GROK:'US',KIMI:'CN'};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],md=s=>{const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};const closeAt=(t,mdy)=>{if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x};
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P=window.__x2pPnl().A,RS=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=RS.length,NOW=Date.now(),T=nyToday(),today=Date.UTC(2000+T[2],T[0]-1,T[1]);
const per=(m,r)=>P[m]&&P[m].per[r.n]?P[m].per[r.n].v:0;
const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
const seq={};ORDER.forEach(m=>{seq[m]=[];RS.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]),k=c&&call(c[1]);if(k)seq[m].push({r,ok:k.up===(r.a>0)})})});
const srank=ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl});
const mdy=s=>{const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const WS=[{k:'season',t:'Season',short:'Season',lab:'Season P&L',when:'Since '+md(RS[0].called||RS[0].resolves),f:()=>true},
  {k:'d1',t:'Last 24 hours',short:'24h',lab:'24h P&L',f:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c>NOW-864e5}},
  {k:'d7',t:'Last 7 days',short:'7 days',lab:'7-day P&L',f:r=>{const a=dAgo(r);return a>=0&&a<=6}}];
{const rs=RS.filter(WS[1].f);WS[1].when=rs.length?md(rs.reduce((a,r)=>mdy(r.resolves)>mdy(a.resolves)?r:a).resolves)+' close':'No close'}
{const a=new Date(today-6*864e5);WS[2].when=a.getUTCMonth()===T[0]-1?`${MON[a.getUTCMonth()]} ${a.getUTCDate()} to ${T[1]}`:`${MON[a.getUTCMonth()]} ${a.getUTCDate()} to ${MON[T[0]-1]} ${T[1]}`}
const d7=WS[2];
const X={};WS.forEach(w=>{const rs=RS.filter(w.f),row={};
  ORDER.forEach(m=>{const amt=rs.reduce((t,r)=>t+per(m,r),0);let W,L;if(w.k==='season'){W=P[m].W;L=P[m].L}else{const s=seq[m].filter(x=>w.f(x.r));W=s.filter(x=>x.ok).length;L=s.length-W}
    let top=null,low=null;rs.forEach(r=>{const x=P[m].per[r.n];if(!x)return;if(!top||x.v>top.v)top={v:x.v,r};if(!low||x.v<low.v)low={v:x.v,r}});
    const ago=P[m].pnl-RS.filter(d7.f).reduce((t,r)=>t+per(m,r),0);
    row[m]={m,amt,W,L,hr:W+L?W/(W+L):null,top,low,l5:seq[m].slice(-5).map(x=>x.ok),ago,n:rs.length}});
  const o=w.k==='season'?srank:srank.slice().sort((a,b)=>row[b].amt-row[a].amt);
  X[w.k]={w,rs,row,o,empty:!rs.length,max:Math.max(1,...ORDER.map(m=>Math.abs(row[m].amt))),lo:Math.min(0,...ORDER.map(m=>row[m].amt)),hi:Math.max(0,...ORDER.map(m=>row[m].amt))}});
const gold=srank[0];
/* formats */
const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const hr=x=>x.hr==null?'–':Math.round(x.hr*100)+'%';
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const face=(m,cls)=>`<i class="wc-face ${cls||''}${m===gold?' wc9-holo':''}" style="--mc:${MODELS[m].c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
const logo=(r,cls)=>{const c=(window.CO_LOGOS||{})[r.ticker];return c?`<img class="${cls||'ss-lg'}${c.dark?' ss-lgdk':''}" src="media/${c.f}" alt="" title="${esc(r.co)}">`:`<b class="${cls||'ss-lg'} ss-lgt">${esc(r.ticker.replace(/\..*$/,''))}</b>`};
const f5=x=>x.l5.map(ok=>`<i class="${ok?'ss-fw':'ss-fl'}">${ok?'✓':'✗'}</i>`).join('');
/* the page's own flag art, read from the live scoreboard (wc9-flg carries --fl as a waving SVG) */
const flagArt={};D.querySelectorAll('#wc-lb .wc-sb-r').forEach(r=>{const m=((r.querySelector('h3')||{}).textContent||'').trim().toUpperCase(),f=r.querySelector('.wc9-flg');if(f&&FLAG[m]&&!flagArt[FLAG[m]])flagArt[FLAG[m]]=getComputedStyle(f).getPropertyValue('--fl').trim()});
const flag=(m,cls)=>`<i class="ss-flg ${cls||''}" style="--fl:${flagArt[FLAG[m]]||'none'}" aria-hidden="true"></i>`;
const cur=()=>{const b=D.querySelector('#wc-lb .wc11n-stub[aria-selected="true"]');return b?b.dataset.k:'season'};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* the board's own window switch: three ticket stubs, a tablist; it drives the page's fight bill too */
const sw=cls=>`<div class="ss-sw ${cls||''}" role="tablist" aria-label="Time window for the scoreboard">${WS.map(w=>`<button type="button" role="tab" class="ss-swb" data-k="${w.k}" aria-selected="false"><b>${w.short}</b><small>${w.when}</small></button>`).join('')}</div>`;
const wire=sec=>{const bs=[...sec.querySelectorAll('.ss-swb')];bs.forEach((b,i)=>{b.addEventListener('click',()=>window.__wc11Show(b.dataset.k,!RM()));
  b.addEventListener('keydown',e=>{const n=bs.length,j={ArrowRight:(i+1)%n,ArrowLeft:(i+n-1)%n,Home:0,End:n-1}[e.key];if(j==null)return;e.preventDefault();bs[j].focus();window.__wc11Show(bs[j].dataset.k,!RM())})});
  return k=>bs.forEach(b=>{const on=b.dataset.k===k;b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1})};
/* FLIP: rows slide to their new place when the order changes */
const flip=(els,fn,anim)=>{const r0=anim?new Map(els.map(e=>[e,e.getBoundingClientRect()])):null;fn();if(!anim)return;
  els.forEach(e=>{const a=r0.get(e),b=e.getBoundingClientRect(),dy=a.top-b.top,dx=a.left-b.left;if(Math.abs(dy)>1||Math.abs(dx)>1)e.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:640,easing:'cubic-bezier(.3,1.2,.4,1)'})})};
const count=(el,from,to,dur,fmt)=>{if(RM()||!dur||Math.round(from)===Math.round(to)){el.textContent=fmt(to);return}const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0)};
window.SS={ORDER,NM,FLAG,X,WS,P,gold,srank,$f,k$,hr,col,face,logo,f5,flag,esc,sw,wire,flip,count,RM,cur,N};
/* mount: the take replaces the live list (kept in the DOM, hidden) and follows the window the bill shows */
window.SSmount=function(){const T=window.SST,sec=D.querySelector('#wc-lb .wc-sbd');if(!T||!sec)return;
  const list=sec.querySelector('.wc-sb');list.classList.add('ss-hide');const sm=sec.querySelector('.wc-h2 small');if(sm)sm.textContent='A pretend $100,000 each to start. We bet on the leader’s call.';
  const host=D.createElement('div');host.className='ss-host ss-'+T.id;list.after(host);T.build(host);const setSw=wire(host);
  let k=cur(),prev=null;setSw(k);T.draw(X[k],null,false);prev=X[k];
  const mo=new MutationObserver(()=>{const n=cur();if(n===k)return;k=n;setSw(k);T.draw(X[k],prev,!RM());prev=X[k]});
  D.querySelectorAll('#wc-lb .wc11n-stub').forEach(b=>mo.observe(b,{attributes:true,attributeFilter:['aria-selected']}));
  H.classList.add('ss-ready-'+T.id)};
})();
