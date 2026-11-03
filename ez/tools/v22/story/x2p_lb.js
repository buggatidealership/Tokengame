/* ===== H38 LEADERBOARD (owner, 2026-11-03: "C the race board for now and push to production"; take C of round H35 lb, ported from
   tools/concepts/worlds/comic/story/h/lb/_d.js + c.js). The Leaderboard tab as a race on the board:
   - the heading and the narrator's caption box;
   - a lower third: a red "Round N" bug, the leader, its figure and the gap to second;
   - "Race on: P&L / Hit rate" and the windows Season / 24h / 7 days (tablists: arrow keys, Home, End);
   - each model a small chip in its colour on its own copper trace, the trail from the start line lit green for profit, red for a loss;
     on hit rate the start line is the coin flip at 50%;
   - the timing tower (Pos / Gap / W-L / Hit; on the hit-rate race the Gap column carries each model's own hit rate and the last
     column its P&L, so no percentage-point gaps);
   - the pit wall: one card per model with its biggest W and L (company logos), best sector and last 5.
   Every figure is computed here from ez-data.js (ROUNDS / MODELS / RMETA / CO_LOGOS / TICKERS) and the page's __x2pPnl() (flat $100,000
   on every trade, long on up, short on down, P&L = $100K x direction x move). The windows follow the comic's R11 rule: 24h = rounds
   graded at their own exchange's close in the last 24 hours (when there was none: the most recent close, said so on the board);
   7 days = today in New York and the six days before. Nothing typed.
   Mount: X2's router draws its own Leaderboard (vModels) into #view on #/leaderboard; this take goes in beside it and the old board is
   hidden (kept in the DOM, display:none while the race board is on). Re-mounted every time the router draws the tab. A failure is kept in window.__xlbErr and the
   old board shows again. The pit wall's chip frames: media/chip15-grok-1200.jpg media/chip15-claude-1200.jpg media/chip15-gpt-1200.jpg
   media/chip15-kimi-1200.jpg. window.__LBNOW (ms) moves the clock, for tests only. ===== */
(function(){
const D=document,W=window,H=D.documentElement;
if(!D.getElementById('x2p-top'))return;
H.classList.add('xlb-live');
const NM={GROK:'Grok',CLAUDE:'Claude',GPT:'GPT',KIMI:'Kimi'};
const UC=W.X2P_MCOL||{GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const CHIP={GROK:'media/chip15-grok-1200.jpg',CLAUDE:'media/chip15-claude-1200.jpg',GPT:'media/chip15-gpt-1200.jpg',KIMI:'media/chip15-kimi-1200.jpg'};
const CTRY={GROK:'us',CLAUDE:'us',GPT:'us',KIMI:'cn'},CNAME={us:'United States',cn:'China'};
const SECT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
const XC={KS:['Asia/Seoul',15,30],KQ:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30],MI:['Europe/Rome',17,30],MC:['Europe/Madrid',17,30]};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const IDF={};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=String(mdy).split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'});
function nyDay(ms){const p=NYF.formatToParts(new Date(ms));const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(2000+g('year'),g('month')-1,g('day'))}
const dOf=s=>{const [m,d,y]=String(s).split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};
const md=ms=>{const d=new Date(ms);return MON[d.getUTCMonth()]+' '+d.getUTCDate()};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const $f=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const $k=v=>{const a=Math.abs(v);return (v<0?'−':'+')+'$'+(a>=1000?(a/1000).toFixed(a>=100000?0:1)+'K':Math.round(a))};
const pc=v=>v==null?'–':Math.round(v*100)+'%';
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- the numbers ---------- */
function data(){
  const NOW=W.__LBNOW||Date.now(),today=nyDay(NOW);
  const P=W.__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const cl=r=>r.__xc!==undefined?r.__xc:(r.__xc=closeAt(r.ticker,r.resolves));
  const dAgo=r=>r.resolves?Math.round((today-dOf(r.resolves))/864e5):1e9;
  const inD1=r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=cl(r);return c!=null&&c<=NOW&&c>NOW-864e5};
  const inD7=r=>{const a=dAgo(r);return a>=0&&a<=6};
  const lastClose=RS.reduce((a,r)=>{const c=cl(r);return c&&c<=NOW&&c>a?c:a},0);
  let d1rs=RS.filter(inD1),fb=false;
  /* no close in the last 24 hours: the most recent close instead (every round graded within 24 hours before it), and the board says so */
  if(!d1rs.length&&lastClose){d1rs=RS.filter(r=>{const c=cl(r);return c!=null&&c<=lastClose&&c>lastClose-864e5});fb=true}
  const d7rs=RS.filter(inD7);
  const wd=new Date(today-6*864e5),lcD=nyDay(lastClose||NOW),lcName=DAY[new Date(lcD).getUTCDay()]+' '+md(lcD);
  const WS={season:{k:'season',t:'Season',lab:'Season P&L',when:'Since '+md(dOf(RS[0].called||RS[0].resolves)),rs:RS},
    d1:{k:'d1',t:fb?'Last close':'Last 24 hours',fb,lc:lcName,lab:'24h P&L',when:fb?'No close in 24h · showing the last close, '+lcName:d1rs.length+' round'+(d1rs.length===1?'':'s')+' at the '+md(dOf(d1rs[d1rs.length-1].resolves))+' close',rs:d1rs},
    d7:{k:'d7',t:'Last 7 days',lab:'7-day P&L',when:md(wd.getTime())+' to '+md(today)+' · '+d7rs.length+' round'+(d7rs.length===1?'':'s'),rs:d7rs}};
  const logo=t=>{const L=W.CO_LOGOS&&CO_LOGOS[t];return L?'media/'+L.f:null};
  const co=t=>(W.TICKERS&&TICKERS[t])||t;
  const M={};
  Object.keys(P).filter(m=>NM[m]).forEach(m=>{const a=P[m],ks=Object.keys(a.per).map(Number).sort((x,y)=>x-y);
    const win={};Object.values(WS).forEach(w=>{let p=0,wn=0,l=0;w.rs.forEach(r=>{const x=a.per[r.n];if(!x)return;p+=x.v;if(x.v>0)wn++;else l++});win[w.k]={pnl:p,W:wn,L:l,n:wn+l,hit:wn+l>=5?wn/(wn+l):null}});
    const rof=n=>RS.find(r=>r.n===n);
    let bw=null,bl=null;ks.forEach(n=>{const v=a.per[n].v;if(!bw||v>bw.v)bw={v,n};if(!bl||v<bl.v)bl={v,n}});
    const pack=x=>{const r=rof(x.n);return {v:x.v,n:x.n,t:r.ticker,co:co(r.ticker),logo:logo(r.ticker)}};
    const sec={};ks.forEach(n=>{const s=(W.RMETA&&RMETA[n]&&RMETA[n].sector)||'';if(!s)return;const q=sec[s]||(sec[s]={s,p:0,w:0,n:0});q.p+=a.per[n].v;q.n++;if(a.per[n].v>0)q.w++});
    const bs=Object.values(sec).filter(q=>q.n>=3).sort((x,y)=>y.p-x.p)[0];
    const l5=ks.slice(-5).map(n=>{const r=rof(n);return {n,w:a.per[n].v>0,t:r.ticker,co:co(r.ticker),v:a.per[n].v}});
    const nm=String(MODELS[m].name||m),v=String(MODELS[m].ver||''),ver=v.toLowerCase().startsWith(nm.toLowerCase())?v.slice(nm.length).replace(/^[\s\-–]+/,''):v;
    M[m]={m,name:NM[m],NAME:nm.toUpperCase(),ver,full:v,c:UC[m],cc:CTRY[m],pnl:a.bal-1e5,W:a.W,L:a.L,n:a.W+a.L,
      win,bw:pack(bw),bl:pack(bl),sec:bs?{name:SECT[bs.s]||bs.s,p:bs.p,w:bs.w,n:bs.n}:null,l5}});
  /* ranking: P&L (or hit rate) in the window; an AI under half the graded rounds still goes after the rest (the page's rule) */
  const rank=(wk,key)=>Object.keys(M).sort((x,y)=>{const qa=M[x].n>=N/2,qb=M[y].n>=N/2;if(qa!==qb)return qa?-1:1;
      const a=M[x].win[wk],b=M[y].win[wk];if(key==='hit'){const ha=a.hit==null?-1:a.hit,hb=b.hit==null?-1:b.hit;if(hb!==ha)return hb-ha;return b.pnl-a.pnl}
      if(b.pnl!==a.pnl)return b.pnl-a.pnl;return M[y].pnl-M[x].pnl});
  return {M,WS,N,RS,rank,NOW,lastClose,today}}

/* ---------- drawn parts ---------- */
const f1=v=>(+v).toFixed(1);
function star(cx,cy,r,rot){let p=[];for(let i=0;i<10;i++){const a=(rot||0)-Math.PI/2+i*Math.PI/5,rr=i%2?r*.42:r;p.push(f1(cx+Math.cos(a)*rr)+','+f1(cy+Math.sin(a)*rr))}return p.join(' ')}
let PID=0;
/* the flag as a sewn team patch (meet14's patch: a hand-cut outline, a merrowed ink edge, the flag woven in, a hard shadow) */
function patch(cc,w){const id='xlbpt'+(PID++),h=w*.64,x=-w/2,y=-h/2,r=w*.13,pad=w*.08;
  const j=[.010,-.008,.012,-.006,.009,-.011,.007,-.01];const q=(a,b,k)=>`${f1(a+j[k%8]*w)},${f1(b+j[(k+3)%8]*w)}`;
  const o=`M${q(x+r,y,0)} Q${q(0,y-h*.03,1)} ${q(x+w-r,y,2)} Q${q(x+w,y,3)} ${q(x+w,y+r,4)} Q${q(x+w+w*.02,0,5)} ${q(x+w,y+h-r,6)} Q${q(x+w,y+h,7)} ${q(x+w-r,y+h,0)} Q${q(0,y+h+h*.03,1)} ${q(x+r,y+h,2)} Q${q(x,y+h,3)} ${q(x,y+h-r,4)} Q${q(x-w*.02,0,5)} ${q(x,y+r,6)} Q${q(x,y,7)} ${q(x+r,y,0)}Z`;
  const ix=x+w*.09,iy=y+h*.13,iw=w*.82,ih=h*.74;let fl='';
  if(cc==='us'){for(let i=0;i<13;i++)fl+=`<rect x="${f1(ix)}" y="${f1(iy+i*ih/13)}" width="${f1(iw)}" height="${f1(ih/13+.5)}" fill="${i%2?'#f3ead6':'#c8312c'}"/>`;
    const cw=iw*.44,ch=ih*7/13;fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(cw)}" height="${f1(ch)}" fill="#25366f"/>`;
    for(let a=0;a<4;a++)for(let b=0;b<5;b++)fl+=`<circle cx="${f1(ix+cw*(.12+b*.19+(a%2)*.09))}" cy="${f1(iy+ch*(.15+a*.24))}" r="${f1(ih*.026)}" fill="#f3ead6"/>`}
  else{fl+=`<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="#cf2f26"/>`;const s=ih;
    fl+=`<polygon points="${star(ix+iw*.18,iy+s*.3,s*.17,0)}" fill="#ffd21f"/>`;[[.36,.12,.3],[.44,.24,.9],[.44,.42,0],[.36,.54,.4]].forEach(([a,b,t])=>fl+=`<polygon points="${star(ix+iw*a,iy+s*b,s*.06,t)}" fill="#ffd21f"/>`)}
  const vb=`${f1(x-pad)} ${f1(y-pad)} ${f1(w+pad*2.6)} ${f1(h+pad*2.6)}`;
  return `<svg class="xl-pt" viewBox="${vb}" role="img" aria-label="${CNAME[cc]}"><path d="${o}" transform="translate(${f1(w*.035)} ${f1(h*.07)})" fill="rgba(0,0,0,.62)"/>
    <path d="${o}" fill="#1b1712"/><clipPath id="${id}"><rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" rx="${f1(w*.05)}"/></clipPath>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient>
    <g clip-path="url(#${id})">${fl}<rect x="${f1(ix)}" y="${f1(iy)}" width="${f1(iw)}" height="${f1(ih)}" fill="url(#${id}s)"/></g>
    <rect x="${f1(ix-w*.035)}" y="${f1(iy-h*.05)}" width="${f1(iw+w*.07)}" height="${f1(ih+h*.1)}" rx="${f1(w*.07)}" fill="none" stroke="#e9dcbc" stroke-opacity=".55" stroke-width="${f1(w*.012)}" stroke-dasharray="${f1(w*.035)} ${f1(w*.025)}"/></svg>`}
/* the lab's mark (MODELS[m].d, a 24 box) */
function mark(m,fill){const Mo=W.MODELS&&MODELS[m];if(!Mo||!Mo.d)return '';
  return `<svg class="xl-mk" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${Mo.d}" fill-rule="${Mo.fr||'nonzero'}" fill="${fill||'currentColor'}"/>${Mo.dot?`<path d="${Mo.dot}" fill="${fill||'currentColor'}"/>`:''}</svg>`}
/* a company logo on a cream plate, the name for screen readers */
function plate(x){return x&&x.logo?`<span class="xl-lg" title="${esc(x.co)} (${esc(x.t)}), round ${x.n}"><img src="${esc(x.logo)}" alt="${esc(x.co)}" decoding="async"></span>`:`<span class="xl-lg xl-lgt">${esc(x?x.t:'')}</span>`}
/* the last five: lit lamps, W green and L red, oldest to newest */
function lamps(l5){return `<span class="xl-l5" role="img" aria-label="Last 5, oldest to newest: ${esc(l5.map(x=>(x.w?'W':'L')+' on '+x.co).join(', '))}">`+l5.map(x=>`<i class="${x.w?'xl-w':'xl-l'}" title="R${x.n} ${esc(x.co)} ${$f(x.v)}">${x.w?'W':'L'}</i>`).join('')+'</span>'}
/* a switch: a tablist (arrow keys, Home and End) */
function sw(name,opts,cur,cls){return `<div class="xl-sw ${cls||''}" role="tablist" aria-label="${esc(name)}">`+opts.map(o=>`<button type="button" role="tab" data-k="${o.k}" aria-selected="${o.k===cur}" tabindex="${o.k===cur?0:-1}">${esc(o.t)}</button>`).join('')+'</div>'}
function wireSw(root,fn){root.querySelectorAll('.xl-sw').forEach(g=>{const bs=[...g.querySelectorAll('button')];bs.forEach((b,i)=>{
  b.addEventListener('click',()=>{if(b.getAttribute('aria-selected')==='true')return;bs.forEach(x=>{x.setAttribute('aria-selected',x===b);x.tabIndex=x===b?0:-1});fn(g,b.dataset.k)});
  b.addEventListener('keydown',e=>{const n=bs.length,j={ArrowRight:(i+1)%n,ArrowLeft:(i+n-1)%n,Home:0,End:n-1}[e.key];if(j==null)return;e.preventDefault();bs[j].focus();bs[j].click()})})})}
/* FLIP: re-order children with a slide (not with reduced motion) */
function flip(parent,order,anim){const kids=[...parent.children],r0=anim?new Map(kids.map(k=>[k,k.getBoundingClientRect()])):null;
  order.forEach(k=>{const el=parent.querySelector(`:scope>[data-m="${k}"]`);if(el)parent.appendChild(el)});
  if(!anim)return;kids.forEach(k=>{const a=r0.get(k),b=k.getBoundingClientRect(),dx=a.left-b.left,dy=a.top-b.top;if(dx||dy)k.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:420,easing:'cubic-bezier(.2,0,0,1)'})})}

/* ---------- take C, the race board ---------- */
function build(host,d){
  const {M,WS}=d;let wk='season',mt='pnl';
  const order=()=>d.rank(wk,mt==='hit'?'hit':'pnl');
  const val=m=>mt==='hit'?M[m].win[wk].hit:(M[m].win[wk].n?M[m].win[wk].pnl:null);
  function scale(){if(mt==='hit')return {lo:.3,hi:.8,start:.5,ticks:[.3,.4,.5,.6,.7,.8],fmt:v=>Math.round(v*100)+'%'};
    const vs=Object.keys(M).map(val).filter(v=>v!=null);let lo=Math.min(0,...vs),hi=Math.max(0,...vs);
    const span=Math.max(hi-lo,20000),st=[10000,25000,50000,100000].find(s=>span/s<=6)||100000;
    lo=Math.floor((lo-span*.06)/st)*st;hi=Math.ceil((hi+span*.06)/st)*st;const t=[];for(let v=lo;v<=hi+1;v+=st)t.push(v);
    return {lo,hi,start:0,ticks:t,fmt:v=>v===0?'$0':(v<0?'−':'+')+'$'+Math.abs(v/1000)+'K'}}
  /* the lane's usable run: room is kept on both ends for the figure beside the chip */
  const X=(v,s)=>14+(v-s.lo)/(s.hi-s.lo)*72;
  const lane=m=>{const x=M[m];return `<div class="xr-ln" data-m="${m}" style="--u:${x.c}">
      <span class="xr-nm"><b class="xl-n">${esc(x.NAME)}</b></span>
      <i class="xr-tr"></i><i class="xr-trail"></i>
      <span class="xr-car" title="${esc(x.full)}"><span class="xr-mk">${mark(m,'#0d0b10')}</span></span>
      <b class="xl-n xr-val"></b></div>`};
  const trow=m=>{const x=M[m];return `<li class="xr-tw" data-m="${m}" style="--u:${x.c}"><b class="xl-n xr-pos">1</b>
      <span class="xr-who"><span class="xr-tmk">${mark(m,x.c)}</span><b class="xl-n">${esc(x.NAME)}</b>${patch(x.cc,22)}</span>
      <b class="xl-n xr-gap"></b><b class="xl-n xr-wl"></b><b class="xl-n xr-hit"></b></li>`};
  const pit=m=>{const x=M[m];return `<div class="xr-pit" data-m="${m}" style="--u:${x.c};--chip:url(${CHIP[m]})">
      <div class="xr-ph"><span class="xr-tmk">${mark(m,x.c)}</span><b class="xl-n">${esc(x.NAME)}</b><small>${esc(x.ver)}</small>${patch(x.cc,22)}</div>
      <div class="xr-pr"><span class="xl-lab">Biggest W</span><span class="xr-tr2">${plate(x.bw)}<b class="xl-n xl-up">${$k(x.bw.v)}</b></span></div>
      <div class="xr-pr"><span class="xl-lab">Biggest L</span><span class="xr-tr2">${plate(x.bl)}<b class="xl-n xl-dn">${$k(x.bl.v)}</b></span></div>
      <div class="xr-pr"><span class="xl-lab">Best sector</span><span class="xr-sec">${x.sec?`<b class="xl-n">${esc(x.sec.name)}</b> <em class="${x.sec.p<0?'xl-dn':'xl-up'}">${$k(x.sec.p)}</em>`:'–'}</span></div>
      <div class="xr-pr"><span class="xl-lab">Last 5</span>${lamps(x.l5)}</div></div>`};
  const o0=order();
  host.innerHTML=`<h1 class="t4-h2 xl-h" tabindex="-1"><span class="t4-hw">Leaderboard</span></h1>
    <p class="xl-cap">Season 1 · <span class="xl-cn">${d.N}</span> rounds graded · $100K on every trade</p>
    <div class="xr-l3" aria-live="polite"><span class="xr-bug xl-n">Round ${d.N}</span><div class="xr-l3t"></div></div>
    <div class="xr-ctl"><span class="xr-cg"><span class="xl-swl" id="xlbRace">Race on</span>${sw('Race on',[{k:'pnl',t:'P&L'},{k:'hit',t:'Hit rate'}],mt,'xr-m')}</span>${sw('Window',[{k:'season',t:'Season'},{k:'d1',t:'24h'},{k:'d7',t:'7 days'}],wk,'xr-w')}</div>
    <div class="xr-grid"><div class="xr-board"><div class="xr-ax" aria-hidden="true"></div><div class="xr-lanes">${o0.map(lane).join('')}</div><p class="xr-when"></p></div>
      <div class="xr-tower"><div class="xr-th" aria-hidden="true"><span>Pos</span><span>Model</span><span class="xr-gh">Gap</span><span>W-L</span><span class="xr-hh">Hit</span></div><ol class="xr-tws">${o0.map(trow).join('')}</ol></div></div>
    <h2 class="xr-pw">The pit wall · season</h2><div class="xr-pits">${o0.map(pit).join('')}</div>
    <p class="xl-fine">Flat $100,000 on every trade, long on up and short on down, no leverage, before fees. Simulated. Gap = P&L behind the model one place ahead. 24h = rounds graded at their exchange's close in the last 24 hours (with none, the last close); 7 days = ${esc(WS.d7.when)}. Best sector = most P&L, 3 trades or more.</p>`;
  const lanes=host.querySelector('.xr-lanes'),tws=host.querySelector('.xr-tws'),pits=host.querySelector('.xr-pits');
  function draw(anim){const o=order(),s=scale(),w=WS[wk],hit=mt==='hit';
    host.dataset.mt=mt;host.dataset.wk=wk;
    const i0=s.ticks.indexOf(s.start);   /* on a narrow board every other label goes quiet (its line stays), so the figures never touch */
    host.querySelector('.xr-ax').innerHTML=s.ticks.map((t,i)=>`<span class="xr-tk${t===s.start?' xr-t0':''}${(i-i0)%2?' xr-tkh':''}" style="left:${X(t,s).toFixed(2)}%">${s.fmt(t)}</span>`).join('')+
      `<i class="xr-sl" style="left:${X(s.start,s).toFixed(2)}%"></i>`;
    flip(lanes,o,anim);flip(tws,o,anim);flip(pits,o,anim);
    host.querySelector('.xr-gh').textContent=hit?'Hit rate':'Gap';host.querySelector('.xr-hh').textContent=hit?'P&L':'Hit';
    o.forEach((m,i)=>{const v=val(m),ln=lanes.querySelector(`[data-m="${m}"]`),x0=X(s.start,s),x=v==null?x0:X(v,s),neg=v!=null&&v<s.start,x2=M[m].win[wk];
      ln.style.setProperty('--x',x.toFixed(2)+'%');ln.style.setProperty('--a',Math.min(x,x0).toFixed(2)+'%');ln.style.setProperty('--w',Math.abs(x-x0).toFixed(2)+'%');
      ln.classList.toggle('xl-neg',neg);ln.classList.toggle('xl-nil',v==null);ln.classList.toggle('xr-1',i===0);
      ln.querySelector('.xr-val').textContent=v==null?(hit?'under 5 trades':'no trade'):hit?pc(v):$f(v);
      const tw=tws.querySelector(`[data-m="${m}"]`);tw.querySelector('.xr-pos').textContent=i+1;tw.classList.toggle('xr-1',i===0);
      const g=tw.querySelector('.xr-gap'),pv=i?val(o[i-1]):null;
      /* the hit-rate race shows each model's own rate here: a gap in percentage points is a number nobody reads */
      if(hit){g.textContent=pc(x2.hit);g.className='xl-n xr-gap xr-gh2'}
      else{g.textContent=i===0?'Leader':(v==null||pv==null)?'–':$f(v-pv);g.className='xl-n xr-gap'+(i===0?' xr-ldr':'')}
      tw.querySelector('.xr-wl').innerHTML=x2.n?`<span class="xl-up">${x2.W}</span>-<span class="xl-dn">${x2.L}</span>`:'–';
      const h=tw.querySelector('.xr-hit');
      if(hit){h.textContent=x2.n?$k(x2.pnl):'–';h.className='xl-n xr-hit '+(x2.n?(x2.pnl<0?'xl-dn':'xl-up'):'')}else{h.textContent=x2.hit==null?'–':pc(x2.hit);h.className='xl-n xr-hit'}
      tw.setAttribute('aria-label',`${i+1}. ${M[m].name}: ${w.t}, ${x2.n?`P&L ${$f(x2.pnl)}, ${x2.W} right and ${x2.L} wrong`:'no trades'}${x2.hit!=null?', hit rate '+pc(x2.hit):''}`)});
    host.querySelector('.xr-when').innerHTML=`<span class="xr-key"><i></i>${hit?'Start, 50%':'Start, $0'}</span><span class="xr-wt${w.fb?' xr-fb':''}">${(hit?'Hit rate · ':'')+(w.fb?'':esc(w.t)+' · ')+esc(w.when)}</span>`;
    const a=M[o[0]],b=M[o[1]],va=val(a.m),vb=val(b.m),lt=host.querySelector('.xr-l3t');
    if(va==null)lt.innerHTML=hit?`<b class="xl-n xr-ln1">Too early</b><span>under 5 trades each in this window, too few for a hit rate</span>`:`<b class="xl-n xr-ln1">No close</b><span>${esc(w.when)}</span>`;
    else lt.innerHTML=`<b class="xl-n xr-ln1" style="color:${a.c}">${esc(a.NAME)}</b><b class="xl-n xr-ln2 ${hit||va>=0?'xl-up':'xl-dn'}">${hit?pc(va):$f(va)}</b><span>${hit?
      (w.fb?'right at the last close':'of trades right')+' · '+esc(b.name)+' '+pc(vb):(wk==='season'?'leads '+esc(b.name)+' by ':w.fb?'takes the last close by ':'takes the '+esc(w.t.toLowerCase())+' by ')+(vb==null?'':'$'+Math.abs(Math.round(va-vb)).toLocaleString('en-US'))}</span>`}
  wireSw(host,(g,k)=>{if(g.classList.contains('xr-w'))wk=k;else mt=k;draw(!RM())});
  draw(false);
  W.__xlbSet=k=>{const t=host.querySelector(`.xl-sw button[data-k="${k}"]`);t&&t.click()};
}

/* ---------- mount: every time the router draws the Leaderboard tab ---------- */
let timer=0;
function tryMount(){timer=0;
  const v=D.getElementById('view');if(!v||H.getAttribute('data-sec')!=='leaderboard'||v.hidden)return;
  if(v.querySelector(':scope>.xlb-root'))return;
  if(!(W.ROUNDS&&W.MODELS&&W.__x2pPnl&&ROUNDS.length))return again();
  try{const d=data(),root=D.createElement('section');root.className='xlb-root';root.id='x2pLbx';root.setAttribute('aria-labelledby','x2pLbH');
    const hadFocus=v.contains(D.activeElement);
    build(root,d);v.appendChild(root);H.classList.add('xlb-on');
    const h1=root.querySelector('h1');h1.id='x2pLbH';if(hadFocus)h1.focus({preventScroll:true});
    W.__xlb=d}catch(e){fail(e)}}
function fail(e){W.__xlbErr=e;H.classList.remove('xlb-live');D.querySelectorAll('#view>.xlb-root').forEach(c=>c.remove());try{console.error('xlb',e)}catch(x){}}
function again(){if(!timer&&!W.__xlbErr)timer=setTimeout(tryMount,60)}
function watch(){const v=D.getElementById('view');if(!v)return setTimeout(watch,200);
  new MutationObserver(()=>{if(!W.__xlbErr&&H.getAttribute('data-sec')==='leaderboard'&&!v.querySelector(':scope>.xlb-root'))again()}).observe(v,{childList:true});
  new MutationObserver(again).observe(H,{attributes:true,attributeFilter:['data-sec']});again()}
watch();
})();
