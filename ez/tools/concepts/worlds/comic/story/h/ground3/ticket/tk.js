/* Proof ticket, painted round (H4 "ticket"). One live ticket drawn from the page's own data (__x2pPnl, ROUNDS, RMETA, MODELS),
   laid into a painted Hedra scene. window.__TK={take:'a'|'b'|'c', base:'<url of this folder>'}.
   Overview: the P&L view only, in place of "Smart or lucky?" (#wc-book > .wc-splash).
   Leaderboard: all four views (P&L, Accuracy, Target hits, Sector), in place of .wc-pfs. Words and numbers are page text. */
(function(){
const T=window.__TK||{take:'a',base:''},TK=T.take,B=T.base,D=document,still=matchMedia('(prefers-reduced-motion: reduce)').matches;
const M=window.MODELS,KEYS=['GPT','CLAUDE','KIMI','GROK'],NM={GPT:'GPT',CLAUDE:'Claude',KIMI:'Kimi',GROK:'Grok'};
const LC={GPT:'#0f8a69',CLAUDE:'#d0623d',KIMI:'#1e72e6',GROK:'#1b181c'},GOLD='#e2a417',INK='#1b181c',UP='#1d7a43',DN='#b3221b';
/* ---------- data ---------- */
const R=[...ROUNDS].sort((a,b)=>a.n-b.n),P=__x2pPnl(),usd=P.usd;
const dir=s=>/^UP/i.test(s)?1:/^DOWN/i.test(s)?-1:0,num=s=>parseFloat(String(s).replace(/[^\d.\-]/g,''));
function md(s){const m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);return m?new Date(2000+ +m[3],m[1]-1,+m[2]):null}
const ny=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),nv=k=>+ny.find(p=>p.type===k).value,TODAY=new Date(nv('year'),nv('month')-1,nv('day')),W7=new Date(TODAY-6*864e5);
const S={};KEYS.forEach(k=>S[k]={k,pl:0,l7:0,W:0,L:0,pts:[0],hr:[.5],bull:0,in1:0,off:0,holes:[],sec:{}});
R.forEach(r=>{const sec=(window.RMETA&&RMETA[r.n]&&RMETA[r.n].sector)||'';const rd=md(r.resolves);
 KEYS.forEach(k=>{const s=S[k],c=r.calls.find(c=>c[0]===k);const per=P.A[k]&&P.A[k].per[r.n];const v=per?per.v:0;s.pl+=v;if(rd&&rd>=W7&&rd<=TODAY)s.l7+=v;s.pts.push(s.pl);
  const d=c?dir(c[1]):0;if(d){const ok=Math.sign(r.a)===d;ok?s.W++:s.L++;const mi=num(c[2]);if(ok){if(mi<=.1)s.bull++;if(mi<=1)s.in1++;s.holes.push(mi)}else s.off++;
   if(sec){const q=s.sec[sec]||(s.sec[sec]={r:0,m:0});q.m++;if(ok)q.r++}}
  s.hr.push((s.W+1)/(s.W+s.L+2))})});
KEYS.forEach(k=>{const s=S[k];s.hit=s.W/Math.max(1,s.W+s.L)});
const half=R.length/2;
const RANK={pnl:[...KEYS].sort((a,b)=>S[b].pl-S[a].pl),
 acc:[...KEYS].sort((a,b)=>((S[b].W+S[b].L>=half)-(S[a].W+S[a].L>=half))||(S[b].hit-S[a].hit)),
 tgt:[...KEYS].sort((a,b)=>(S[b].bull-S[a].bull)||(S[b].in1-S[a].in1)||(S[a].off-S[b].off))};
const SH={'Information Technology':'Tech','Communication Services':'Comms','Consumer Discretionary':'Cons. disc.','Consumer Staples':'Staples','Health Care':'Health','Financials':'Financials','Industrials':'Industrials','Energy':'Energy','Materials':'Materials','Real Estate':'Real estate','Utilities':'Utilities'};
const SECS=[...new Set(R.map(r=>RMETA[r.n]&&RMETA[r.n].sector).filter(Boolean))].sort((a,b)=>KEYS.reduce((t,k)=>t+((S[k].sec[b]||{}).m||0)-((S[k].sec[a]||{}).m||0),0));
const NO=String(R.length).padStart(6,'0');
/* ---------- hand-drawn helpers (seeded, so the same shape every load) ---------- */
let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
function wob(pts,j,close){seed=pts.length*97+Math.round(pts[0][0]*13);const q=pts.map(([x,y])=>[x+(rnd()-.5)*j,y+(rnd()-.5)*j]);
 let d='M'+q[0].map(f).join(' ');for(let i=1;i<q.length;i++){const a=q[i-1],b=q[i],mx=(a[0]+b[0])/2+(rnd()-.5)*j*.8,my=(a[1]+b[1])/2+(rnd()-.5)*j*.8;d+=' Q'+f(mx)+' '+f(my)+' '+b.map(f).join(' ')}return d+(close?'Z':'')}
const f=x=>Math.round(x*10)/10;
const logo=(k,sz)=>{const m=M[k];return `<svg class="tk-lg" viewBox="0 0 24 24" width="${sz}" height="${sz}" aria-hidden="true"><path d="${m.d}" fill="${k==='CLAUDE'?LC.CLAUDE:INK}" ${m.fr?'fill-rule="evenodd"':''}/>${m.dot?`<path d="${m.dot}" fill="${LC.KIMI}"/>`:''}</svg>`};
const who=(k,lead)=>`<span class="tk-who">${logo(k,22)}<span class="tk-nm${lead?' tk-gold':''}">${NM[k]}<small>${M[k].ver}</small></span></span>`;
const k$=v=>(v>=0?'+$':'−$')+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
/* ---------- charts ---------- */
function lineChart(key,W,H){const N=R.length,pad={l:2,r:54,t:14,b:20};const ser=KEYS.map(k=>({k,p:key==='pnl'?S[k].pts:S[k].hr}));
 let lo,hi;if(key==='pnl'){lo=Math.min(...ser.flatMap(s=>s.p));hi=Math.max(...ser.flatMap(s=>s.p));const st=50000;lo=Math.floor(lo/st)*st;hi=Math.ceil(hi/st)*st}else{lo=.3;hi=.8}
 const X=i=>pad.l+(W-pad.l-pad.r)*i/N,Y=v=>pad.t+(H-pad.t-pad.b)*(1-(v-lo)/(hi-lo));
 const lead=(key==='pnl'?RANK.pnl:RANK.acc)[0];let g='';
 // grid: hand-ruled
 const ticks=[];if(key==='pnl'){for(let v=lo;v<=hi;v+=50000)ticks.push(v)}else ticks.push(.3,.4,.5,.6,.7,.8);
 ticks.forEach(v=>{const y=Y(v),z=key==='pnl'?v===0:v===.5;g+=`<path class="tk-gl${z?' tk-z':''}" d="${wob([[pad.l,y],[(W-pad.r)/2,y],[W-pad.r,y]],z?.9:.6)}"/><text class="tk-ax" x="${pad.l+1}" y="${y-3}">${key==='pnl'?(v===0?'$0':(v>0?'+':'−')+'$'+Math.abs(v/1000)+'K'):Math.round(v*100)+'%'}</text>`});
 if(key==='acc')g+=`<text class="tk-ax tk-ax-c" x="${(W-pad.r)*.5}" y="${Y(.5)+12}" text-anchor="middle">Coin flip</text>`;
 [1,Math.round(N/2),N].forEach(i=>g+=`<text class="tk-ax" x="${X(i)}" y="${H-5}" text-anchor="${i===1?'start':i===N?'end':'middle'}">R${i}</text>`);
 const order=ser.filter(s=>s.k!==lead).concat(ser.filter(s=>s.k===lead));
 order.forEach(s=>{const d='M'+s.p.map((v,i)=>f(X(i))+' '+f(Y(v))).join(' L');const ld=s.k===lead;
  g+=`<path class="tk-ln-u${ld?' tk-ld':''}" d="${d}" pathLength="1"/><path class="tk-ln${ld?' tk-ld':''}" d="${d}" pathLength="1" style="stroke:${ld?GOLD:LC[s.k]}"/>`});
 // end labels, pushed apart
 const ends=ser.map(s=>({k:s.k,y:Y(s.p[s.p.length-1])})).sort((a,b)=>a.y-b.y);for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<13)ends[i].y=ends[i-1].y+13;
 const over=ends[ends.length-1].y-(H-pad.b);if(over>0)ends.forEach(e=>e.y-=over);
 ends.forEach(e=>{const s=S[e.k];g+=`<text class="tk-end${e.k===lead?' tk-gold':''}" x="${X(N)+4}" y="${e.y+4}" style="fill:${e.k===lead?'':LC[e.k]}">${key==='pnl'?k$(s.pl):Math.round(s.hit*100)+'%'}</text>`});
 return `<svg class="tk-ch" viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="${key==='pnl'?'Each AI\'s P&L after every round':'Each AI\'s hit rate after every round'}">${g}</svg>`}
/* ---------- views ---------- */
const V={
 pnl:{t:'P&L',q:'Would following them have made you money?',bot:'$100K on every call · Simulated · Before fees',
  html:W=>lineChart('pnl',W,W*.56)+`<div class="tk-rows tk-r3"><div class="tk-hd"><span></span><span></span><span>Last 7d</span><span>P&L</span></div>`+RANK.pnl.map((k,i)=>`<div class="tk-row${i?'':' tk-1'}"><span class="tk-rk">${i+1}</span>${who(k,!i)}<span class="tk-sm ${S[k].l7>=0?'tk-u':'tk-d'}">${k$(S[k].l7)}</span><span class="tk-big ${i?'':'tk-goldnum '}${S[k].pl>=0?'tk-u':'tk-d'}">${innerWidth<600?k$(S[k].pl):usd(S[k].pl)}</span></div>`).join('')+`</div>`},
 acc:{t:'Accuracy',q:'How often were they right about the direction?',bot:'Up or down only · Everyone starts at 50/50',
  html:W=>lineChart('acc',W,W*.56)+`<div class="tk-rows tk-r4"><div class="tk-hd"><span></span><span></span><span>Calls</span><span class="tk-u">W</span><span class="tk-d">L</span><span>Hit rate</span></div>`+RANK.acc.map((k,i)=>`<div class="tk-row${i?'':' tk-1'}"><span class="tk-rk">${i+1}</span>${who(k,!i)}<span class="tk-sm">${S[k].W+S[k].L}</span><span class="tk-sm tk-u">${S[k].W}</span><span class="tk-sm tk-d">${S[k].L}</span><span class="tk-big${i?'':' tk-goldnum'}">${Math.round(S[k].hit*100)}%</span></div>`).join('')+`</div>`},
 tgt:{t:'Target hits',q:'How close did they get to the real move?',bot:'The bullseye is what the stock did · One hole per right call',
  html:W=>`<div class="tk-tg">`+RANK.tgt.map((k,i)=>target(k,i)).join('')+`</div>`},
 sec:{t:'Sector',q:'Which industries do they call best?',bot:'Right calls of calls made · Small samples, it fills in',
  html:()=>`<table class="tk-sg"><thead><tr><th></th>${KEYS.map(k=>`<th>${logo(k,18)}<span class="tk-vh">${NM[k]}</span></th>`).join('')}</tr></thead><tbody>`+SECS.map(sc=>{const c=KEYS.map(k=>S[k].sec[sc]||{r:0,m:0});const best=Math.max(...c.map(q=>q.m?q.r/q.m:-1));const all=c.every(q=>q.m&&q.r/q.m===best);
   return `<tr><th>${SH[sc]||sc}</th>`+c.map(q=>{if(!q.m)return '<td class="tk-e">–</td>';const p=q.r/q.m;return `<td class="${p>=2/3?'tk-g':p<=1/3?'tk-rd':'tk-am'}${!all&&p===best?' tk-best':''}">${q.r}/${q.m}</td>`}).join('')+'</tr>'}).join('')+`</tbody></table>`}};
function target(k,i){const s=S[k],R0=46,c=50;let g='';const rings=[[R0,'#c2261d'],[R0*.75,'#fffbf1'],[R0*.5,'#c2261d'],[R0*.25,'#fffbf1']];
 rings.forEach(([r,col],j)=>{seed=j*31+i*7+3;const pts=[];for(let a=0;a<16;a++){const t=a/16*Math.PI*2;pts.push([c+Math.cos(t)*r*(1+(rnd()-.5)*.025),c+Math.sin(t)*r*(1+(rnd()-.5)*.025)])}pts.push(pts[0]);g+=`<path d="${wob(pts,.5,1)}" fill="${col}" class="tk-ring"/>`});
 g+=`<circle cx="${c}" cy="${c}" r="3.2" fill="${INK}"/>`;
 s.holes.forEach((mi,h)=>{const r=Math.min(1,mi/12)*R0,t=h*2.39996;g+=`<g class="tk-hole" style="--d:${h*14}ms"><circle cx="${f(c+Math.cos(t)*r)}" cy="${f(c+Math.sin(t)*r)}" r="2.3" fill="#2a2420"/><circle cx="${f(c+Math.cos(t)*r)}" cy="${f(c+Math.sin(t)*r)}" r="2.3" fill="none" stroke="#f3e6c6" stroke-width=".7"/></g>`});
 return `<div class="tk-t${i?'':' tk-1'}"><div class="tk-th">${logo(k,18)}<b class="${i?'':'tk-gold'}">${NM[k]}</b></div><svg viewBox="0 0 100 100" aria-hidden="true">${g}</svg>
  <dl><div><dt>Bullseyes</dt><dd class="tk-gn">${s.bull}</dd></div><div><dt>Within 1%</dt><dd class="tk-u">${s.in1}</dd></div><div><dt>Off target</dt><dd class="tk-d">${s.off}</dd></div></dl></div>`}
/* ---------- build ---------- */
const ORDER=['pnl','acc','tgt','sec'];
function ticket(page){const views=page==='ov'?['pnl']:ORDER;const el=D.createElement('section');el.className=`tk-sec tk-${TK} tk-${page}`;el.setAttribute('aria-label',page==='ov'?'Would following them have made you money?':'Smarter or just lucky? Four ways to check');
 const tabs=views.length>1?`<div class="tk-tabs" role="tablist" aria-label="Show the AIs by">${views.map((k,i)=>`<button type="button" role="tab" data-v="${k}" aria-selected="${!i}"><svg class="tk-tabsh" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 40"><path d="${wob([[2,40],[6,6],[14,1.5],[86,1.5],[94,6],[98,40]],1.4)}"/></svg><span>${V[k].t}</span><i class="tk-punch" aria-hidden="true"></i></button>`).join('')}</div>`:'';
 const cap=page==='ov'?`<p class="tk-cap"><span>If you'd bet $100K on every call…</span></p>`:`<p class="tk-cap"><span>Smarter or just lucky? Four ways to check.</span></p>`;
 el.innerHTML=`<div class="tk-scene">${cap}${TK==='c'?'<div class="tk-panel" role="img" aria-label="A comic kiosk counter at night"></div>':''}<div class="tk-stage"><div class="tk-tix">${TK==='b'?'<div class="tk-stamp" aria-hidden="true"><svg viewBox="0 0 120 150"><path class="tk-sh" d="'+wob([[38,4],[82,4],[86,60],[74,70],[74,96],[46,96],[46,70],[34,60]],1.2,1)+'"/><path class="tk-sb" d="'+wob([[14,98],[106,98],[110,124],[10,124]],1.2,1)+'"/><path class="tk-sr" d="'+wob([[12,124],[108,124],[106,138],[14,138]],1,1)+'"/></svg></div>':''}${tabs}
  <div class="tk-paper"><div class="tk-band"><span class="tk-q"><i>★</i><b>${V[views[0]].q}</b><i>★</i></span></div>
  <div class="tk-body" role="tabpanel"></div>
  <div class="tk-foot"><span class="tk-bot">${V[views[0]].bot}</span><span>No. ${NO}</span></div></div></div></div>
  ${page==='ov'?`<p class="tk-more"><a href="#/leaderboard">Accuracy, target hits and sectors on the Leaderboard</a></p>`:''}</div>`;
 return el}
function wire(el){const paper=el.querySelector('.tk-paper'),body=el.querySelector('.tk-body'),q=el.querySelector('.tk-q b'),bot=el.querySelector('.tk-bot');let cur=el.querySelector('[data-v][aria-selected="true"]');cur=cur?cur.dataset.v:'pnl';
 function k(){const w=paper.getBoundingClientRect().width;el.style.setProperty('--k',(w/700).toFixed(4))}
 function qfit(){const b=q.parentNode;b.style.fontSize='';b.classList.remove('tk-q2');let z=parseFloat(getComputedStyle(b).fontSize);while(q.scrollWidth>q.clientWidth+.5&&z>12){z-=.5;b.style.fontSize=z+'px'}if(q.scrollWidth>q.clientWidth+.5){b.style.fontSize='';b.classList.add('tk-q2')}}
 function render(v){q.textContent=V[v].q;qfit();bot.textContent=V[v].bot;body.innerHTML=`<div class="tk-v tk-v-${v}">${V[v].html(Math.round(body.clientWidth||300))}</div>`;el.dataset.view=v}
 function fit(){k();const tabs=el.querySelectorAll('[data-v]');if(!tabs.length){render(cur);return}body.style.minHeight='';let mx=0;
  [...tabs].forEach(b=>{render(b.dataset.v);mx=Math.max(mx,body.scrollHeight)});body.style.minHeight=(mx+6)+'px';render(cur)}
 let plT;function play(){if(still)return;el.classList.remove('tk-play');void el.offsetWidth;el.classList.add('tk-play');clearTimeout(plT);plT=setTimeout(()=>el.classList.remove('tk-play'),1700)}
 el.addEventListener('click',e=>{const b=e.target.closest('[data-v]');if(!b||b.dataset.v===cur)return;cur=b.dataset.v;
  el.querySelectorAll('[data-v]').forEach(x=>x.setAttribute('aria-selected',String(x===b)));
  if(still){render(cur);return}b.classList.remove('tk-punched');void b.offsetWidth;b.classList.add('tk-punched');
  el.classList.remove('tk-in');el.classList.add('tk-out');setTimeout(()=>{render(cur);el.classList.remove('tk-out');void el.offsetWidth;el.classList.add('tk-in');play()},TK==='b'?260:TK==='c'?240:140)});
 el.addEventListener('keydown',e=>{const t=[...el.querySelectorAll('[data-v]')];const i=t.indexOf(D.activeElement);if(i<0)return;let j=i;if(e.key==='ArrowRight')j=(i+1)%t.length;else if(e.key==='ArrowLeft')j=(i+t.length-1)%t.length;else return;t[j].focus();t[j].click();e.preventDefault()});
 fit();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;fit()}});D.fonts&&D.fonts.ready.then(fit);
 if('IntersectionObserver' in window&&!still){const io=new IntersectionObserver(es=>{if(es.some(x=>x.isIntersecting)){io.disconnect();play()}},{threshold:.3});io.observe(el)}
 el.__fit=fit}
function mount(){const sp=D.querySelector('#wc-book > .wc-splash');if(sp&&!D.querySelector('.tk-ov')){const t=ticket('ov');const cp=sp.previousElementSibling;if(cp&&cp.matches('.wc-cap'))cp.style.display='none';sp.style.display='none';sp.before(t);wire(t)}
 const pf=D.querySelector('.wc-pfs');if(pf&&!D.querySelector('.tk-lb')){const t=ticket('lb');pf.style.display='none';pf.before(t);wire(t)}
 D.querySelectorAll('.tk-sec').forEach(s=>s.__fit&&s.__fit())}
if(TK==='b'&&!D.getElementById('tkSpread')){const sv=D.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('width','0');sv.setAttribute('height','0');sv.style.position='absolute';sv.innerHTML='<filter id="tkSpread"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>';D.body.append(sv)}
mount();addEventListener('hashchange',()=>setTimeout(mount,200));window.__tkMount=mount;
})();
