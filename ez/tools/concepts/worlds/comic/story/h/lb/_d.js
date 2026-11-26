/* lb · the Leaderboard tab, round H35 (mockup overlay over the built v46-live-x2plus.html). Shared data, formatting and drawn parts.
   Every figure is computed here from the page's own ROUNDS / MODELS / RMETA / CO_LOGOS and __x2pPnl() (flat $100,000 on every trade,
   direction only, P&L = $100K x direction x move). Nothing is typed. The windows follow the comic's R11 rule (sb_ss.js): Last 24 hours =
   rounds graded at their own exchange's close within 24 hours; Last 7 days = today in New York and the six days before.
   window.__LBNOW (ms) moves the clock for a mockup frame only. */
(function(){if(window.LBD)return;
const D=document,W=window;
const ORDER=['GROK','CLAUDE','GPT','KIMI'];
const NM={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};
const UC={GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const CTRY={GROK:'us',CLAUDE:'us',GPT:'us',KIMI:'cn'},CNAME={us:'United States',cn:'China'};
const SECT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const IDF={};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
function nyDay(ms){const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date(ms));const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(2000+g('year'),g('month')-1,g('day'))}
const dOf=s=>{const [m,d,y]=s.split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};
const md=ms=>{const d=new Date(ms);return MON[d.getUTCMonth()]+' '+d.getUTCDate()};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $f=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const $k=v=>{const a=Math.abs(v);return (v<0?'−':'+')+'$'+(a>=1000?(a/1000).toFixed(a>=100000?0:1)+'K':Math.round(a))};
const pc=v=>v==null?'–':Math.round(v*100)+'%';
function data(){
  const NOW=W.__LBNOW||Date.now(),today=nyDay(NOW);
  const P=W.__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const dAgo=r=>r.resolves?Math.round((today-dOf(r.resolves))/864e5):1e9;
  const inD1=r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c<=NOW&&c>NOW-864e5};
  const inD7=r=>{const a=dAgo(r);return a>=0&&a<=6};
  const lastClose=RS.reduce((a,r)=>{const c=closeAt(r.ticker,r.resolves);return c&&c<=NOW&&c>a?c:a},0);
  const d1rs=RS.filter(inD1),d7rs=RS.filter(inD7);
  const wd=new Date(today-6*864e5);
  const WS={season:{k:'season',t:'Season',lab:'Season P&L',when:'Since '+md(dOf(RS[0].called||RS[0].resolves)),rs:RS},
    d1:{k:'d1',t:'Last 24 hours',short:'24h',lab:'24h P&L',when:d1rs.length?d1rs.length+' rounds at the '+md(dOf(d1rs[d1rs.length-1].resolves))+' close':'No close in 24h · last close '+DAY[new Date(nyDay(lastClose)).getUTCDay()]+' '+md(nyDay(lastClose)),rs:d1rs},
    d7:{k:'d7',t:'Last 7 days',short:'7 days',lab:'7-day P&L',when:md(wd.getTime())+' to '+md(today)+' · '+d7rs.length+' rounds',rs:d7rs}};
  const logo=t=>{const L=W.CO_LOGOS&&CO_LOGOS[t];return L?'media/'+L.f:null};
  const co=t=>(W.TICKERS&&TICKERS[t])||t;
  const M={};
  Object.keys(P).filter(m=>NM[m]).forEach(m=>{const a=P[m],ks=Object.keys(a.per).map(Number).sort((x,y)=>x-y);
    const win={};Object.values(WS).forEach(w=>{let p=0,wn=0,l=0;w.rs.forEach(r=>{const x=a.per[r.n];if(!x)return;p+=x.v;if(x.v>0)wn++;else l++});win[w.k]={pnl:p,W:wn,L:l,n:wn+l,hit:wn+l>=5?wn/(wn+l):null,hitRaw:wn+l?wn/(wn+l):null}});
    const rof=n=>RS.find(r=>r.n===n);
    let bw=null,bl=null;ks.forEach(n=>{const v=a.per[n].v;if(!bw||v>bw.v)bw={v,n};if(!bl||v<bl.v)bl={v,n}});
    const pack=x=>{const r=rof(x.n);return {v:x.v,n:x.n,t:r.ticker,co:co(r.ticker),logo:logo(r.ticker)}};
    const sec={};ks.forEach(n=>{const s=(W.RMETA&&RMETA[n]&&RMETA[n].sector)||'';if(!s)return;const q=sec[s]||(sec[s]={s,p:0,w:0,n:0});q.p+=a.per[n].v;q.n++;if(a.per[n].v>0)q.w++});
    const bs=Object.values(sec).filter(q=>q.n>=3).sort((x,y)=>y.p-x.p)[0];
    const l5=ks.slice(-5).map(n=>{const r=rof(n);return {n,w:a.per[n].v>0,t:r.ticker,co:co(r.ticker),v:a.per[n].v}});
    const nm=String(MODELS[m].name||m),v=String(MODELS[m].ver||''),ver=v.toLowerCase().startsWith(nm.toLowerCase())?v.slice(nm.length).replace(/^[\s\-–]+/,''):v;
    /* the season's running P&L after every graded round (for sparklines and the race) */
    let run=0;const path=RS.map(r=>{const x=a.per[r.n];if(x)run+=x.v;return run});
    M[m]={m,name:NM[m],NAME:nm.toUpperCase(),ver,full:v,c:UC[m],cc:CTRY[m],ccn:CNAME[CTRY[m]],pnl:a.bal-1e5,W:a.W,L:a.L,n:a.W+a.L,hit:a.W/(a.W+a.L),
      win,bw:pack(bw),bl:pack(bl),sec:bs?{name:SECT[bs.s]||bs.s,full:bs.s,p:bs.p,w:bs.w,n:bs.n}:null,l5,path,streak:a.streak}});
  /* ranking: P&L (or hit rate) in the window; an AI under half the graded rounds still goes after the rest (the page's rule) */
  const rank=(wk,key)=>{const ms=Object.keys(M);return ms.sort((x,y)=>{const qa=M[x].n>=N/2,qb=M[y].n>=N/2;if(qa!==qb)return qa?-1:1;
      const a=M[x].win[wk],b=M[y].win[wk];if(key==='hit'){const ha=a.hit==null?-1:a.hit,hb=b.hit==null?-1:b.hit;if(hb!==ha)return hb-ha;return b.pnl-a.pnl}
      if(b.pnl!==a.pnl)return b.pnl-a.pnl;return M[y].pnl-M[x].pnl})};
  const gold=rank('season','pnl')[0];
  return {M,WS,N,RS,rank,gold,NOW,lastClose,today}}
/* ---------- drawn parts ---------- */
const f1=v=>(+v).toFixed(1);
function star(cx,cy,r,rot){let p=[];for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push(f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr))}return p.join(' ')}
let PID=0;
/* the flag as a sewn team patch (meet14's patch: a hand-cut outline, merrowed ink edge, the flag woven in, a hard shadow) */
function patch(cc,w){const id='lbpt'+(PID++),h=w*.64,x=-w/2,y=-h/2,r=w*.13,pad=w*.08;
  const j=[.010,-.008,.012,-.006,.009,-.011,.007,-.01];const q=(a,b,k)=>`${f1(a+j[k%8]*w)},${f1(b+j[(k+3)%8]*w)}`;
  const o=`M${q(x+r,y,0)} Q${q(0,y-h*.03,1)} ${q(x+w-r,y,2)} Q${q(x+w,y,3)} ${q(x+w,y+r,4)} Q${q(x+w+w*.02,0,5)} ${q(x+w,y+h-r,6)} Q${q(x+w,y+h,7)} ${q(x+w-r,y+h,0)} Q${q(0,y+h+h*.03,1)} ${q(x+r,y+h,2)} Q${q(x,y+h,3)} ${q(x,y+h-r,4)} Q${q(x-w*.02,0,5)} ${q(x,y+r,6)} Q${q(x,y,7)} ${q(x+r,y,0)}Z`;
  const ix=x+w*.09,iy=y+h*.13,iw=w*.82,ih=h*.74;let fl='';
  if(cc==='us'){for(let i=0;i<13;i++)fl+=`<rect x="${f1(ix)}" y="${f1(iy+i*ih/13)}" width="${f1(iw)}" height="${f1(ih/13+.5)}" fill="${i%2?'#f3ead6':'#c8312c'}"/>`;
    const cw=iw*.44,ch=ih*7/13;fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(cw)}" height="${f1(ch)}" fill="#25366f"/>`;
    for(let a=0;a<4;a++)for(let b=0;b<5;b++)fl+=`<circle cx="${f1(ix+cw*(.12+b*.19+(a%2)*.09))}" cy="${f1(iy+ch*(.15+a*.24))}" r="${f1(ih*.026)}" fill="#f3ead6"/>`}
  else{fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#cf2f26"/>`;const s=ih;
    fl+=`<polygon points="${star(ix+iw*.18,iy+s*.3,s*.17,0)}" fill="#ffd21f"/>`;[[.36,.12,.3],[.44,.24,.9],[.44,.42,0],[.36,.54,.4]].forEach(([a,b,t])=>fl+=`<polygon points="${star(ix+iw*a,iy+s*b,s*.06,t)}" fill="#ffd21f"/>`)}
  const vb=`${f1(x-pad)} ${f1(y-pad)} ${f1(w+pad*2.6)} ${f1(h+pad*2.6)}`;
  return `<svg class="lb-pt" viewBox="${vb}" role="img" aria-label="${CNAME[cc]}"><path d="${o}" transform="translate(${f1(w*.035)} ${f1(h*.07)})" fill="rgba(0,0,0,.62)"/>
    <path d="${o}" fill="#1b1712"/><clipPath id="${id}"><rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(w*.05)}"/></clipPath>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
    <g clip-path="url(#${id})">${fl}<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="url(#${id}s)"/></g>
    <rect x="${f1(ix-w*.035)}" y="${f1(iy-h*.05)}" width="${f1(iw+w*.07)}" height="${f1(ih+h*.1)}" rx="${f1(w*.07)}" fill="none" stroke="#e9dcbc" stroke-opacity=".55" stroke-width="${f1(w*.012)}" stroke-dasharray="${f1(w*.035)} ${f1(w*.025)}"/></svg>`}
/* the lab's mark (MODELS[m].d, a 24 box) */
function mark(m,fill){const M=W.MODELS&&MODELS[m];if(!M||!M.d)return '';
  return `<svg class="lb-mk" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill-rule="${M.fr||'nonzero'}" fill="${fill||'currentColor'}"/>${M.dot?`<path d="${M.dot}" fill="${fill||'currentColor'}"/>`:''}</svg>`}
/* a company logo on a cream plate, the name for screen readers */
function plate(x,cls){return x&&x.logo?`<span class="lb-lg ${cls||''}" title="${esc(x.co)} (${esc(x.t)}), round ${x.n}"><img src="${esc(x.logo)}" alt="${esc(x.co)}" loading="eager" decoding="async"></span>`:`<span class="lb-lg lb-lgt ${cls||''}">${esc(x?x.t:'')}</span>`}
/* the last five: lit lamps, W green and L red, oldest to newest */
function lamps(l5){return `<span class="lb-l5" role="img" aria-label="Last 5, oldest to newest: ${l5.map(x=>(x.w?'W':'L')+' on '+x.co).join(', ')}">`+l5.map(x=>`<i class="${x.w?'w':'l'}" title="R${x.n} ${esc(x.co)} ${$f(x.v)}">${x.w?'W':'L'}</i>`).join('')+'</span>'}
/* a two-or-more position switch (a tablist; arrow keys, Home and End) */
function sw(name,opts,cur,cls){return `<div class="lb-sw ${cls||''}" role="tablist" aria-label="${esc(name)}">`+opts.map(o=>`<button type="button" role="tab" data-k="${o.k}" aria-selected="${o.k===cur}" tabindex="${o.k===cur?0:-1}">${esc(o.t)}</button>`).join('')+'</div>'}
function wireSw(root,fn){root.querySelectorAll('.lb-sw').forEach(g=>{const bs=[...g.querySelectorAll('button')];bs.forEach((b,i)=>{
  b.addEventListener('click',()=>{bs.forEach(x=>{x.setAttribute('aria-selected',x===b);x.tabIndex=x===b?0:-1});fn(g,b.dataset.k)});
  b.addEventListener('keydown',e=>{const n=bs.length,j={ArrowRight:(i+1)%n,ArrowLeft:(i+n-1)%n,Home:0,End:n-1}[e.key];if(j==null)return;e.preventDefault();bs[j].focus();bs[j].click()})})})}
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* FLIP: re-order children with a slide (not with reduced motion) */
function flip(parent,order,attr){const kids=[...parent.children],r0=new Map(kids.map(k=>[k,k.getBoundingClientRect()]));
  order.forEach(k=>{const el=parent.querySelector(`[${attr}="${k}"]`);if(el)parent.appendChild(el)});
  if(RM())return;kids.forEach(k=>{const a=r0.get(k),b=k.getBoundingClientRect(),dx=a.left-b.left,dy=a.top-b.top;if(dx||dy)k.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:420,easing:'cubic-bezier(.2,0,0,1)'})})}
W.LBD={data,ORDER,NM,UC,CTRY,CNAME,esc,$f,$k,pc,patch,mark,plate,lamps,sw,wireSw,flip,RM,md,DAY};
})();
