/* helper r: shared data for "Smarter or just lucky?" and "The race so far", computed exactly as world-comic.js's
   proofBuild() and lbBuild() compute them (ROUNDS, __x2pPnl(), MODELS, RMETA; nothing typed). A take calls
   SR.mount(t,{pnl,acc,tgt,sec,race,enter}): each html string replaces that view's body (the live tabs, their gold
   indicator and their switching stay), race replaces the race section's panel, enter(view) animates a view as it opens. */
(function(){if(window.SR)return;const D=document,H=D.documentElement;
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
const mark=(m,cls)=>`<svg class="sr-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}"/></svg>`;
const sgn=v=>(v>=0?'+':'−');
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>sgn(v)+$k(v);
const kS=v=>sgn(v)+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const callOf=(r,m)=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return null;const x=call(c[1]);return x?{ok:x.up===(r.a>0),off:+c[2],c:x,r}:null};
const PL=window.__x2pPnl(),P=PL.A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length;
const rank=ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl});
/* windows: the same rules as the live proof (each exchange's own close; 7 days = today and the six calendar days before) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};const closeAt=(t,mdy)=>{if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x};
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'2-digit',month:'numeric',day:'numeric'}).formatToParts(new Date());const g=k=>+p.find(q=>q.type===k).value;return [g('month'),g('day'),g('year')]};
const now=Date.now();
const inWin=(r,ms)=>{if(ms>864e5){const td=nyToday(),[mm,dd,yy]=(r.resolves||'').split('/').map(Number);if(!mm)return false;const a=Math.round((Date.UTC(2000+td[2],td[0]-1,td[1])-Date.UTC(2000+(yy%100),mm-1,dd))/864e5);const c=closeAt(r.ticker,r.resolves);return a>=0&&a<=6&&c!=null&&c<=now}const t=closeAt(r.ticker,r.resolves);return t!=null&&t<=now&&t>now-ms};
const win=(m,ms)=>R.reduce((s,r)=>s+(inWin(r,ms)&&P[m].per[r.n]?P[m].per[r.n].v:0),0);
/* balance and smoothed hit rate after every graded round */
const bal={},acc={};ORDER.forEach(m=>{let b=1e5,k=0,n=0;bal[m]=[b];acc[m]=[.5];R.forEach(r=>{const x=P[m].per[r.n];if(x){b+=x.v;n++;if(x.v>0)k++}bal[m].push(b);acc[m].push((k+1)/(n+2))})});
const hr=m=>Math.round(P[m].W/(P[m].W+P[m].L)*100);
const byA=ORDER.slice().sort((a,b)=>P[b].W/(P[b].W+P[b].L)-P[a].W/(P[a].W+P[a].L));
/* target hits */
const S={};ORDER.forEach(m=>{const cs=R.map(r=>callOf(r,m)).filter(Boolean);S[m]={cs,bu:cs.filter(x=>x.ok&&x.off<=.1).length,w1:cs.filter(x=>x.ok&&x.off<=1).length,ot:cs.filter(x=>!x.ok).length}});
const byT=ORDER.slice().sort((a,b)=>(S[b].bu-S[a].bu)||(S[b].w1-S[a].w1)||(S[a].ot-S[b].ot));
const target=(m,cls)=>{let k=0;const holes=S[m].cs.filter(x=>x.ok).map(x=>{const rr=Math.min(x.off,12.4)/12*46,a=(k++)*2.39996;return `<circle class="sr-th" cx="${(rr*Math.cos(a)).toFixed(2)}" cy="${(rr*Math.sin(a)).toFixed(2)}" r="2.1" style="--i:${k}"/>`}).join('');
  return `<svg class="sr-tgt ${cls||''}" viewBox="-52 -52 104 104" aria-hidden="true">${[46,34.5,23,11.5].map((r,i)=>`<circle class="sr-tr sr-tr${i%2}" r="${r}"/>`).join('')}<circle class="sr-tb" r="3.2"/>
    ${[3,6,9,12].map((p,i)=>`<text class="sr-tt" x="0" y="${-(11.5*(i+1))+4.6}">${p}%</text>`).join('')}${holes}</svg>`};
/* sector */
const SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
const sec=r=>((window.RMETA||{})[r.n]||{}).sector||'',cnt={};R.forEach(r=>{const x=sec(r);if(x)cnt[x]=(cnt[x]||0)+1});
const secs=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
const cell=(m,x)=>{let n=0,k=0;R.forEach(r=>{if(sec(r)!==x)return;const c=callOf(r,m);if(c){n++;if(c.ok)k++}});return {n,k}};
const band=c=>3*c.k>=2*c.n?'hi':3*c.k<=c.n?'lo':'md';
const secRow=x=>{const cs=rank.map(m=>cell(m,x)),v=cs.map(c=>c.n?c.k/c.n:-1),mx=Math.max(...v),allq=v.every(y=>y===mx);return {x,nm:SH[x]||x,n:cnt[x],cs:rank.map((m,i)=>({m,...cs[i],top:!allq&&cs[i].n&&v[i]===mx}))}};
/* the race: exactly lbBuild()'s order (balance, ties by the previous order), lead changes and overtakes */
const pos={};ORDER.forEach(m=>pos[m]=[]);let prev=ORDER.slice();const steps=[prev.slice()];
R.forEach((r,i)=>{const o=ORDER.slice().sort((a,b)=>(bal[b][i+1]-bal[a][i+1])||(prev.indexOf(a)-prev.indexOf(b)));steps.push(o);prev=o});
steps.forEach((o,i)=>o.forEach((m,j)=>pos[m][i]=j+1));
const leads=[];for(let i=1;i<steps.length;i++){if(i===1||steps[i][0]!==steps[i-1][0])leads.push({i,n:R[i-1].n,co:R[i-1].co,m:steps[i][0],from:i>1?steps[i-1][0]:null})}
leads.forEach((l,k)=>{const nx=leads[k+1];l.to=nx?nx.i-1:N;l.len=l.to-l.i+1});
const ev=[];for(let i=2;i<steps.length;i++){steps[i].forEach(m=>{const was=steps[i-1].indexOf(m),now2=steps[i].indexOf(m);if(now2<was){const past=steps[i-1].slice(now2,was).filter(o=>steps[i].indexOf(o)>now2);if(past.length)ev.push({i,n:R[i-1].n,co:R[i-1].co,m,past,to:now2+1})}})}
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const and=a=>a.length<2?a[0]||'':a.slice(0,-1).join(', ')+' and '+a[a.length-1];
/* an svg line path in a 1000 x 100 box, preserveAspectRatio none (strokes are non-scaling) */
const path=(ser,lo,hi)=>ser.map((v,i)=>(i?'L':'M')+(i/N*1000).toFixed(1)+' '+(100-(v-lo)/(hi-lo)*100).toFixed(2)).join(' ');
const yPct=(v,lo,hi)=>100-(v-lo)/(hi-lo)*100;
/* end labels pushed apart (in px of a box h tall): ys = [{m,y}] in %, gap px */
const spread=(ys,h,gap)=>{const a=ys.map(o=>({...o,px:o.y/100*h})).sort((p,q)=>p.px-q.px);for(let i=1;i<a.length;i++)if(a[i].px-a[i-1].px<gap)a[i].px=a[i-1].px+gap;const ov=a[a.length-1].px-(h-gap/2);if(ov>0)a.forEach(o=>o.px-=ov);if(a[0].px<gap/2){const d=gap/2-a[0].px;a.forEach(o=>o.px+=d)}return a};
function mount(t,v){const lb=D.getElementById('wc-lb'),pf=lb.querySelector('.wc-pf'),sec2=lb.querySelector('.wc-pfs'),race=lb.querySelector('.wc-race');
  lb.classList.add('sr-on','sr-'+t);
  ['pnl','acc','tgt','sec'].forEach(k=>{const vw=pf.querySelector(`.wc-pf-v[data-v="${k}"]`);if(!vw||v[k]==null)return;const q=vw.querySelector('.wc-pf-q');vw.innerHTML='';if(q&&!v.dropQ)vw.appendChild(q);
    const box=D.createElement('div');box.className='sr-v sr-v-'+k;box.innerHTML=v[k];vw.appendChild(box);if(v.qInto&&q){const slot=box.querySelector('.sr-qslot');if(slot)slot.appendChild(q)}});
  if(v.race!=null){const pn=race.querySelector('.wc-rc');const h2=race.querySelector('.wc-h2');if(v.raceH&&h2)h2.querySelector('small').innerHTML=v.raceH;pn.outerHTML=`<div class="sr-race">${v.race}</div>`}
  if(v.after)v.after(lb);
  const views=[...pf.querySelectorAll('.wc-pf-v')];
  if(v.enter){new MutationObserver(ms=>ms.forEach(x=>{if(x.attributeName==='hidden'&&!x.target.hidden&&!RM())v.enter(x.target)})).observe(pf,{subtree:true,attributes:true,attributeFilter:['hidden']});
    let f=true;new IntersectionObserver(es=>{if(f&&es[0].isIntersecting){f=false;if(!RM())v.enter(views.find(x=>!x.hidden))}},{threshold:.2}).observe(pf);
    if(v.raceEnter){let g=true;new IntersectionObserver(es=>{if(g&&es[0].isIntersecting){g=false;v.raceEnter(lb.querySelector('.sr-race'),RM())}},{threshold:.35}).observe(lb.querySelector('.sr-race'))}}
  H.classList.add('sr-ready-'+t)}
window.SR={ORDER,NM,col,esc,face,mark,pm,kS,$k,sgn,P,R,N,rank,win,bal,acc,hr,byA,S,byT,target,secs,secRow,cnt,steps,pos,leads,ev,RM,and,path,yPct,spread,mount,callOf};
})();
