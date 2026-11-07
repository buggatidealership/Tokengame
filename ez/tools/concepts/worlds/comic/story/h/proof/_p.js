/* Round H, area proof: shared data, hand-tuned ink shapes and the mount for every take.
   Every number comes from the page: ROUNDS, MODELS, RMETA, SIM, __x2pPnl() and window.SS (the scoreboard's windows), and the live
   fight bill's own rendered pieces (which pair is in the corners, the next bell, the line under it), read from the DOM after each
   window switch so the mockup never re-derives the page's logic. Nothing is typed. Classes pq-. A take sets window.PQT =
   {id, sol(D), bill(B,D), tape(x,D), dock(D), proof(D), after(root)} returning HTML; empty parts keep today's module. */
(function(){if(window.PQ)return;const Dd=document;
const MS=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FL={GPT:'US',CLAUDE:'US',GROK:'US',KIMI:'CN'};
const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* seeded jitter: the same shape every load, a different one per seed */
const rnd=s=>{let x=Math.sin(s*9301+49297)*233280;return x-Math.floor(x)};
/* ---------- data ---------- */
function data(){const P=window.__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const hit={},bal={},seqs={},tg={},sec={};
  MS.forEach(m=>{let w=0,c=0,b=100000;hit[m]=[.5];bal[m]=[100000];seqs[m]=[];tg[m]={holes:[],bulls:0,in1:0,off:0,calls:0};
    RS.forEach(r=>{const x=r.calls.find(q=>q[0]===m&&q[1]),k=x&&call(x[1]);
      if(k){c++;const ok=k.up===(r.a>0);if(ok)w++;seqs[m].push({n:r.n,ok});tg[m].calls++;
        const miss=Math.abs((k.up?1:-1)*k.v-r.a);if(ok){tg[m].holes.push(miss);if(miss<=.1)tg[m].bulls++;if(miss<=1)tg[m].in1++}else tg[m].off++;
        const s=(RMETA[r.n]&&RMETA[r.n].sector)||'';if(s){(sec[s]||(sec[s]={}));const z=sec[s][m]||(sec[s][m]={r:0,n:0});z.n++;if(ok)z.r++}}
      hit[m].push((w+1)/(c+2));if(P[m]&&P[m].per[r.n])b+=P[m].per[r.n].v;bal[m].push(b)});
    const s=seqs[m],h=Math.floor(s.length/2);seqs[m].first=h?s.slice(0,h).filter(x=>x.ok).length/h:null;seqs[m].second=s.length-h?s.slice(h).filter(x=>x.ok).length/(s.length-h):null});
  const acc={};MS.forEach(m=>{const a=P[m];acc[m]={W:a.W,L:a.L,t:a.W+a.L,rate:a.W/(a.W+a.L),pnl:a.pnl,pct:a.pnl/1000,bw:a.bw,bl:a.bl}});
  const byHit=MS.slice().sort((a,b)=>acc[b].rate-acc[a].rate),byPnl=MS.slice().sort((a,b)=>acc[b].pnl-acc[a].pnl),
    byTg=MS.slice().sort((a,b)=>tg[b].bulls-tg[a].bulls||tg[b].in1-tg[a].in1||tg[a].off-tg[b].off);
  const sectors=Object.keys(sec).filter(s=>MS.some(m=>sec[s][m])).sort((a,b)=>MS.reduce((t,m)=>t+((sec[b][m]||{}).n||0),0)-MS.reduce((t,m)=>t+((sec[a][m]||{}).n||0),0));
  const lastR=RS[N-1],firstR=RS[0];
  return {P,RS,N,hit,bal,seqs,tg,sec,sectors,acc,byHit,byPnl,byTg,lastR,firstR,MS,NM,FL,col,share:Math.round(SIM.poolShare*100)}}
/* ---------- formats ---------- */
const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1e5?Math.round(Math.abs(v)/1000)+'K':Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const pc=v=>Math.round(v*100)+'%';
/* ---------- hand-tuned shapes ---------- */
/* an irregular polygon for clip-path: n points per edge, each nudged by up to j% (seeded) */
function torn(seed,j,n){j=j==null?1.2:j;n=n||5;const pts=[],e=(i,k)=>rnd(seed*31+i*7+k)*j;
  for(let i=0;i<n;i++)pts.push([i/n*100,e(i,1)]);for(let i=0;i<n;i++)pts.push([100-e(i,2),i/n*100]);
  for(let i=0;i<n;i++)pts.push([100-i/n*100,100-e(i,3)]);for(let i=0;i<n;i++)pts.push([e(i,4),100-i/n*100]);
  return 'polygon('+pts.map(p=>p[0].toFixed(2)+'% '+p[1].toFixed(2)+'%').join(',')+')'}
/* a wobbly ink frame drawn as SVG over a box: thick outer stroke, thin inner one, both hand-jittered */
function frame(seed,o){o=o||{};const w=o.w||3.2,c=o.c||'#0d0b10',inner=o.inner!==false;const p=(s,d)=>{const q=[];const k=(i,a)=>(rnd(seed*13+s+i*3+a)-.5)*d;
    [[0,0],[50,0],[100,0],[100,50],[100,100],[50,100],[0,100],[0,50]].forEach((pt,i)=>q.push([Math.min(100,Math.max(0,pt[0]+k(i,1))),Math.min(100,Math.max(0,pt[1]+k(i,2)))]));
    return 'M'+q.map(x=>x[0].toFixed(2)+' '+x[1].toFixed(2)).join(' L')+'Z'};
  return `<svg class="pq-fr" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${p(1,1.2)}" fill="none" stroke="${c}" stroke-width="${w}" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>${inner?`<path d="${p(7,2.4)}" transform="translate(2.2 2.4) scale(.956 .952)" fill="none" stroke="${c}" stroke-width="${w*.32}" vector-effect="non-scaling-stroke" opacity=".85"/>`:''}</svg>`}
/* a tapered brush stroke (underline, slash) from x0 to x1 in a 100x10 box */
function brush(seed,c,cls){const y=(i)=>5+(rnd(seed+i)-.5)*2.4;return `<svg class="${cls||'pq-br'}" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path fill="${c||'#0d0b10'}" d="M1 ${y(1)} C 20 ${y(2)-2.2}, 60 ${y(3)-3}, 99 ${y(4)-1.2} C 70 ${y(5)+1.8}, 30 ${y(6)+2.6}, 1 ${y(1)+.6}Z"/></svg>`}
/* a jagged burst: n spikes, two layers (outer ink, inner fill) */
function burst(seed,n,fill,ink,cls){n=n||14;const pt=(r0,r1,s)=>{const q=[];for(let i=0;i<n*2;i++){const a=i/(n*2)*Math.PI*2+rnd(seed+i)*.12,r=(i%2?r0:r1)*(0.86+rnd(seed*3+i+s)*.24);q.push((50+Math.cos(a)*r).toFixed(1)+' '+(50+Math.sin(a)*r).toFixed(1))}return 'M'+q.join(' L')+'Z'};
  return `<svg class="${cls||'pq-bu'}" viewBox="0 0 100 100" aria-hidden="true"><path d="${pt(30,50,0)}" fill="${ink||'#0d0b10'}"/><path d="${pt(26,44,5)}" fill="${fill||'#ffd23f'}"/></svg>`}
/* a drawn coin (gold, rim, a highlight and a dark side), not an emoji */
const coin=(cls,spin)=>`<svg class="${cls||'pq-coin'}" viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20.6" cy="21.4" rx="17" ry="17" fill="#0d0b10"/><circle cx="19.4" cy="19.6" r="16.6" fill="#b47a12"/><circle cx="19" cy="19.2" r="14.2" fill="#f5c542"/><circle cx="19" cy="19.2" r="10.6" fill="none" stroke="#b47a12" stroke-width="1.4"/><path d="M10 13 Q 15 7 23 8" fill="none" stroke="#fff7d0" stroke-width="2.4" stroke-linecap="round"/><path d="M15.6 23.5 c0 2 1.6 3 3.6 3 s3.6-1 3.6-2.8 c0-3.8-7.1-2.5-7.1-6.1 0-1.7 1.5-2.7 3.4-2.7 1.9 0 3.3 1 3.4 2.6 M19.2 12.4 v1.2 M19.2 26.5 v1.2" fill="none" stroke="#8a5a08" stroke-width="1.6" stroke-linecap="round"/></svg>`;
/* drawn tick and cross (two strokes each, a thick ink under a colour) */
const tick=c=>`<svg class="pq-tk" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 11 L8 16 L17 4" fill="none" stroke="#0d0b10" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 11 L8 16 L17 4" fill="none" stroke="${c||'#1fbf5f'}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const cross=c=>`<svg class="pq-tk" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 4 L16 16 M16 4 L4 16" fill="none" stroke="#0d0b10" stroke-width="5" stroke-linecap="round"/><path d="M4 4 L16 16 M16 4 L4 16" fill="none" stroke="${c||'#ef3b2d'}" stroke-width="2.6" stroke-linecap="round"/></svg>`;
/* the model's mark, coloured (a character's badge), and the founder as the character */
const mark=(m,cls)=>`<i class="pq-mk ${cls||''}" style="--mc:${col(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"${MODELS[m].fr?' fill-rule="evenodd"':''}/></svg></i>`;
const founder=(m,cls,vid)=>{const f='media/founder-'+m.toLowerCase()+'-anim';return vid?`<video class="pq-fd ${cls||''}" muted loop playsinline autoplay preload="metadata" poster="${f}.jpg" aria-hidden="true"><source src="${f}.mp4" type="video/mp4"></video>`:`<img class="pq-fd ${cls||''}" src="${f}.jpg" alt="" aria-hidden="true">`};
/* hand-drawn flags (US: stripes and a canton of dots; CN: red with one big star and four small) */
function flag(m,cls){const c=FL[m];return c==='CN'?`<svg class="pq-flag ${cls||''}" viewBox="0 0 30 20" aria-hidden="true"><path d="M.6 1.2 Q15 .2 29.4 1 L29.2 19.2 Q15 18.6 .8 19.4Z" fill="#de2910" stroke="#0d0b10" stroke-width="1.2"/><path d="M6 3.4 l1.1 3.2 3.3.1-2.7 2 1 3.2-2.7-1.9-2.7 1.9 1-3.2-2.7-2 3.3-.1z" fill="#ffde00"/><circle cx="12.6" cy="3.2" r=".9" fill="#ffde00"/><circle cx="14.2" cy="5.6" r=".9" fill="#ffde00"/><circle cx="14.2" cy="8.6" r=".9" fill="#ffde00"/><circle cx="12.6" cy="10.8" r=".9" fill="#ffde00"/></svg>`
  :`<svg class="pq-flag ${cls||''}" viewBox="0 0 30 20" aria-hidden="true"><path d="M.6 1.2 Q15 .2 29.4 1 L29.2 19.2 Q15 18.6 .8 19.4Z" fill="#f4efe2" stroke="#0d0b10" stroke-width="1.2"/>${[0,2,4,6,8,10].map(i=>`<path d="M1 ${1.8+i*1.5} Q15 ${1.3+i*1.5} 29.2 ${1.7+i*1.5} L29.2 ${2.95+i*1.5} Q15 ${2.5+i*1.5} 1 ${3+i*1.5}Z" fill="#c8262d"/>`).join('')}<path d="M1 1.3 L13.4 1 13.4 10.6 1 10.9Z" fill="#253f8c"/>${[3,6,9].map(x=>[3.2,5.8,8.4].map(y=>`<circle cx="${x+rnd(x*y)*.4}" cy="${y}" r=".55" fill="#fff"/>`).join('')).join('')}</svg>`}
/* ---------- charts (drawn from the data; the take styles them) ---------- */
/* lines: series per model on [lo,hi], width 1000 x height 100, with the leader last (on top) */
function lines(series,lo,hi,order,lead,o){o=o||{};const W=1000,H=100,n=series[order[0]].length,X=i=>(i/(n-1)*W).toFixed(1),Y=v=>(H-(v-lo)/(hi-lo)*H).toFixed(2);
  const ps=order.slice().reverse().map(m=>{const d=series[m].map((v,i)=>(i?'L':'M')+X(i)+' '+Y(v)).join(' ');
    return `<path class="pq-ln-o" d="${d}"/><path class="pq-ln${m===lead?' pq-ln-lead':''}" data-m="${m}" pathLength="1" style="--mc:${col(m)}" d="${d}"/>`}).join('');
  return {svg:ps,Y:v=>+Y(v),X:i=>+X(i),W,H,ends:order.map(m=>({m,y:+Y(series[m][n-1])/H*100,v:series[m][n-1]}))}}
/* push end labels apart so they never touch (min gap in % of height) */
function spread(ends,gap){const s=ends.slice().sort((a,b)=>a.y-b.y);for(let k=0;k<20;k++)for(let i=1;i<s.length;i++)if(s[i].y-s[i-1].y<gap){const d=(gap-(s[i].y-s[i-1].y))/2;s[i].y+=d;s[i-1].y-=d}
  s.forEach(e=>e.y=Math.max(gap/2,Math.min(100-gap/2,e.y)));return ends}
/* ---------- the bill, read from the live page after each switch ---------- */
function bill(){const b=Dd.querySelector('#wc-lb .wc11n-bout');if(!b)return null;const k=b.dataset.k||'season';
  const cn=s=>{const c=b.querySelector('.wc11c-'+s);if(!c)return null;const nm=(c.querySelector('.wc11c-nm')||{}).textContent||'',m=MS.find(x=>NM[x]===nm.trim());const v=c.querySelector('[data-to]');
    const wl=c.querySelectorAll('.wc11n-wl b');return {m,v:v?+v.dataset.to:0,W:wl[0]?+wl[0].textContent:0,L:wl[1]?+wl[1].textContent:0,role:(c.querySelector('.wc11n-rl,.wc11n-gt')||{}).textContent||''}};
  const under=[...b.querySelectorAll('.wc11c-under > span')].map(s=>{const nm=(s.querySelector('em')||{}).textContent||'',m=MS.find(x=>NM[x]===nm.trim()),v=s.querySelector('[data-to]');return {m,v:v?+v.dataset.to:0}});
  const line=(b.querySelector('.wc11c-line')||{}).innerHTML||'';const bell=Dd.querySelector('#wc-lb .wc11n-bell');
  const stubs=[...Dd.querySelectorAll('#wc-lb .wc11n-stub')].map(s=>({k:s.dataset.k,t:s.querySelector('b').textContent,when:s.querySelector('small').textContent,on:s.getAttribute('aria-selected')==='true'}));
  const std=Dd.querySelector('#wc-lb .wc11n-std small');
  return {k,a:cn('a'),b:cn('b'),under,line,empty:b.classList.contains('wc11n-empty'),stubs,graded:std?std.textContent:'',
    bell:bell?{t:bell.querySelector('[data-bell]').textContent,n:bell.querySelectorAll('small')[1].textContent}:null}}
/* ---------- mount ---------- */
const css=t=>{const s=Dd.createElement('style');s.textContent=t;Dd.head.appendChild(s)};
function mount(){const T=window.PQT;if(!T)return;const D=data();window.PQD=D;Dd.documentElement.classList.add('pq-on','pq-'+T.id);
  css(`.pq-hide{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip-path:inset(50%)!important;pointer-events:none!important}
   .pq-on .sb-dock{display:none!important}
   .pq-on #wc-lb section,.pq-on .wc-splash,.pq-on #wc-lb .wc-pn{content-visibility:visible!important;contain:none!important;contain-intrinsic-size:none!important}`);
  /* Overview: Smart or lucky */
  const sp=Dd.querySelector('.wc-splash');if(sp&&T.sol){[...sp.children].forEach(c=>c.classList.add('pq-hide'));sp.insertAdjacentHTML('beforeend',`<div class="pq-sol pq-sol-${T.id}">${T.sol(D)}</div>`)}
  /* Leaderboard: the bill, the tape, the proof, the dock */
  const lb=Dd.querySelector('#wc-lb');if(!lb)return;
  const bl=lb.querySelector('.wc11n-bill'),cvs=bl&&bl.closest('section');let bh=null;if(bl&&T.bill){cvs.classList.add('pq-hide');cvs.insertAdjacentHTML('beforebegin','<div class="pq-bill"></div>');bh=lb.querySelector('.pq-bill')}
  const sh=lb.querySelector('.wc-sbd .ss-host');let th=null;if(sh&&T.tape){sh.classList.add('pq-hide');sh.insertAdjacentHTML('afterend','<div class="pq-tape"></div>');th=lb.querySelector('.pq-tape');
    const cap=lb.querySelector('.wc-sb-cap');if(cap)cap.classList.add('pq-hide');const h2=lb.querySelector('.wc-sbd > .wc-h2');if(h2&&T.tapeHead!==undefined)h2.classList.add('pq-hide')}
  const pf=lb.querySelector('.wc-pfs .wc-pf');if(pf&&T.proof){pf.classList.add('pq-hide');pf.insertAdjacentHTML('afterend',`<div class="pq-proof">${T.proof(D)}</div>`);wireProof(lb.querySelector('.pq-proof'))}
  if(T.dock){Dd.body.insertAdjacentHTML('beforeend',`<div class="pq-dock" role="group" aria-label="Scoreboard time window">${T.dock(D)}</div>`)}
  const draw=()=>{const B=bill();if(!B)return;if(bh)bh.innerHTML=T.bill(B,D);if(th)th.innerHTML=T.tape(window.SS.X[B.k],D,B);
    Dd.querySelectorAll('.pq-dock [data-k],.pq-bill [data-k],.pq-tape [data-k]').forEach(x=>x.setAttribute('aria-pressed',x.dataset.k===B.k));if(T.after)T.after(lb,D,B)};
  Dd.addEventListener('click',e=>{const x=e.target.closest('.pq-bill [data-k],.pq-tape [data-k],.pq-dock [data-k]');if(x)window.__wc11Show(x.dataset.k,false)});
  const mo=new MutationObserver(()=>setTimeout(draw,20));lb.querySelectorAll('.wc11n-stub').forEach(s=>mo.observe(s,{attributes:true,attributeFilter:['aria-selected']}));draw()}
function wireProof(r){if(!r)return;const tabs=[...r.querySelectorAll('[data-pv]')],vs=[...r.querySelectorAll('[data-view]')];
  const go=k=>{tabs.forEach(t=>{const on=t.dataset.pv===k;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1});vs.forEach(v=>v.hidden=v.dataset.view!==k);r.dataset.on=k};
  tabs.forEach(t=>t.addEventListener('click',()=>go(t.dataset.pv)));go(tabs[0]&&tabs[0].dataset.pv);window.PQgo=go}
window.PQ={data,$f,k$,pc,torn,frame,brush,burst,coin,tick,cross,mark,founder,flag,lines,spread,esc,col,rnd,MS,NM,FL,mount};
})();
