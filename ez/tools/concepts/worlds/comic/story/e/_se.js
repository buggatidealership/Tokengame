/* story mockups, helper "e" (2026-10-30): the cover, the Upcoming tab and the back cover. Shared bits.
   Laid over the built X3+ page; every number, date, colour and logo comes from the page's data. */
window.SE=window.SE||(function(){
  const D=document,H=D.documentElement,ORDER=['GPT','KIMI','CLAUDE','GROK'],STAR=['GPT','CLAUDE','GROK','KIMI'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const col=m=>m==='GROK'?'#15121a':MODELS[m].c;
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const pd=s=>{if(!s)return null;const [m,d,y]=s.split('/').map(Number);return {m,d,y:2000+(y%100),t:Date.UTC(2000+(y%100),m-1,d)}};
  const md=s=>{const p=pd(s);return p?MON[p.m-1]+' '+p.d:''};
  const wd=(s,long)=>{const p=pd(s);return p?new Date(p.t).toLocaleDateString('en-US',{weekday:long?'long':'short',timeZone:'UTC'}):''};
  const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(2000+g('year'),g('month')-1,g('day'))};
  const rel=s=>{const p=pd(s);if(!p)return null;const dd=Math.round((p.t-nyToday())/864e5);return dd===0?'Today':dd===1?'Tomorrow':dd<0?'past':null};
  const cap=t=>((window.CAPS||{})[t])||0;
  const L=t=>(window.CO_LOGOS||{})[t]||{};
  const logo=t=>L(t).f?'media/'+L(t).f:'';
  /* the company's own colour (CO_LOGOS.c, read from its logo file); a near-black logo gets ink */
  const brand=t=>{const c=L(t).c;return c&&!/^#1[0-9a-f]131a$/i.test(c)?c:'#2b2733'};
  const lum=h=>{const n=parseInt(h.slice(1),16),f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(n>>16)+.7152*f(n>>8&255)+.0722*f(n&255)};
  const onB=h=>1.05/(lum(h)+.05)<3?'#15121a':'#fff';  /* ink or white on a brand colour, whichever reads */
  const tk=t=>String(t).replace(/\..*$/,'');
  const meta=n=>((window.RMETA||{})[n])||{};
  /* every round still to come, one list: locked (calls in) by the close that grades them, the rest by the day their calls are due */
  const toCome=()=>{const L=[];(window.PENDING||[]).forEach(p=>{if(p.calls&&p.calls.length)L.push({...p,locked:1,day:p.resolves})});
    (window.UPCOMING||[]).forEach(u=>L.push({...u,locked:0,calls:[],day:u.called}));
    L.forEach(x=>{const m=meta(x.n);x.m7=!!m.mag7;x.ai=(m.themes||[]).indexOf('AI')>-1;x.nv=x.ticker==='NVDA';x.up=x.calls.filter(c=>c.dir==='UP').length;x.dn=x.calls.length-x.up;x.r=rel(x.day)});
    return L};
  /* days: key = the day, past days whose calls never came in go last as one "waiting" group */
  const byDay=L=>{const g={};L.forEach(x=>{const k=x.r==='past'&&!x.locked?'wait':(x.day||'wait');(g[k]=g[k]||[]).push(x)});
    return Object.keys(g).sort((a,b)=>a==='wait'?1:b==='wait'?-1:pd(a).t-pd(b).t).map(k=>({k,items:g[k].sort((a,b)=>b.locked-a.locked||cap(b.ticker)-cap(a.ticker))}))};
  const closeTxt=x=>{const el=D.querySelector(`#wc-up .wc-bell[data-t="${x.ticker}"]`);return el?el.textContent:''};
  const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const once=(el,th)=>{if(rm()){el.classList.add('se-go');return}const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();el.classList.add('se-go')}},{threshold:th||.4});io.observe(el)};
  const P=()=>window.__x2pPnl().A;
  const lead=()=>{const A=P();return Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl)[0]};
  const X=()=>esc((window.CONFIG||{}).x||'https://x.com/earningszn');
  const totals=()=>{const g=ROUNDS.length,l=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length).length,u=(window.UPCOMING||[]).length+(window.PENDING||[]).length-l;return {g,l,u,all:g+l+u}};
  return {D,H,ORDER,STAR,NM,esc,col,face,md,wd,pd,rel,cap,logo,brand,onB,tk,toCome,byDay,closeTxt,rm,once,P,lead,X,totals,L,ready:()=>H.classList.add('se-ready')};
})();
/* Upcoming: swap the tab's lists for a take's own root (the tab's cover stays); the All / Mag 7 / AI filter keeps working on it */
SE.upMount=function(cls){const S=SE,up=S.D.getElementById('wc-up');if(!up)return null;
  up.querySelectorAll(':scope > .wc-spot, :scope > .wc-h2-b, :scope > .wc-cal').forEach(e=>e.classList.add('se-hide'));
  const root=S.D.createElement('div');root.className='se-up '+cls;const flt=up.querySelector('.wc-flt');
  (up.querySelector('.wc-cal')||up.querySelector('.wc-back')).before(root);
  if(flt){root.before(flt);flt.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{root.dataset.f=b.dataset.f}))}
  return root};
SE.dayLab=function(k){const S=SE;if(k==='wait')return {a:'Waiting on calls',b:'Their dates passed. The calls are not in yet.'};
  const r=S.rel(k),d=S.wd(k,1)+', '+S.md(k);return {a:r==='Today'||r==='Tomorrow'?r:S.wd(k,1),b:r==='Today'||r==='Tomorrow'?d:S.md(k)}};
SE.coImg=function(t,cls){const S=SE,lg=S.logo(t);return lg?`<img class="${cls||''}${S.L(t).dark?' se-dk':''}" src="${lg}" alt="" loading="lazy">`:`<b class="${cls||''} se-nolg">${S.esc(S.tk(t)).slice(0,4)}</b>`};
SE.MDK=t=>{const d=new Date(t);return (d.getUTCMonth()+1)+'/'+d.getUTCDate()+'/'+(d.getUTCFullYear()%100)};
SE.today=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'numeric'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'))};
