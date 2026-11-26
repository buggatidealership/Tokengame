/* proof5 shared engine: data (h_sol.js's rules verbatim) + a painted stage (one SVG: the painting as <image>, live text lit on its glass,
   the painting's own glare screen-blended back over the glass, silkscreen words with the board's grain multiplied through them).
   Mockup only: mounts over the built v46-live-x2plus.html, replacing #learn's content (kept in the DOM, hidden) and, for the close, #get. */
(function(){
const D=document,RM=matchMedia('(prefers-reduced-motion: reduce)');
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const P5=window.P5={NM};
/* ---------- data: h_sol.js data() verbatim, plus the coin's luck zone and the card ---------- */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
P5.closeAt=closeAt;
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
P5.data=function(){
  const P=window.__x2pPnl().A,MS=Object.keys(P).filter(m=>NM[m]),RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const per=(m,r)=>P[m].per[r.n]?P[m].per[r.n].v:0;
  const A={};MS.forEach(m=>{let k=0,n=0;const s=[.5],c=[0];RS.forEach(r=>{const x=P[m].per[r.n];if(x){n++;if(x.v>0)k++}s.push((k+1)/(n+2));c.push(n)});
    const t=P[m].W+P[m].L;A[m]={s,c,W:P[m].W,L:P[m].L,t,hr:t?P[m].W/t:null,
      /* the coin's luck zone for this many calls (95% of fair coins land inside): a fact about the sample, not a verdict */
      zone:t?1.96*Math.sqrt(.25/t):1};A[m].out=A[m].hr==null?0:(A[m].hr-.5>A[m].zone?1:(.5-A[m].hr>A[m].zone?-1:0))});
  const q=m=>A[m].t*2>=N;
  const arank=MS.slice().sort((a,b)=>(q(b)-q(a))||((A[b].hr||0)-(A[a].hr||0))||(A[b].W-A[a].W));
  const NOW=Date.now(),T=nyToday(),today=Date.UTC(2000+T[2],T[0]-1,T[1]);
  const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
  const WD=[{k:'season',t:'Season',lab:'the season',f:()=>true},
    {k:'d7',t:'Last 7 days',lab:'the last 7 days',f:r=>{const a=dAgo(r);return a>=0&&a<=6}},
    {k:'d1',t:'Last 24 hours',lab:'the last 24 hours',f:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c>NOW-864e5}}];
  const W={};WD.forEach(w=>{const rs=RS.filter(w.f),ser={},tot={},set=new Set(rs.map(r=>r.n));
    MS.forEach(m=>{let b=0;ser[m]=[0];rs.forEach(r=>{b+=per(m,r);ser[m].push(b)});tot[m]=b});
    const rank=MS.slice().sort((a,b)=>w.k==='season'?((q(b)-q(a))||(tot[b]-tot[a])):(tot[b]-tot[a])||(P[b].pnl-P[a].pnl));
    W[w.k]={...w,rs,ser,tot,rank,n:rs.length,set}});
  /* the card: the next days with rounds still to come (calls in or due), by call date, from today on */
  const md=s=>{if(!s)return 9e15;const [m,d,y]=s.split('/').map(Number);return Date.UTC(2000+(y%100),m-1,d)};
  const todo=[].concat(window.PENDING||[],window.UPCOMING||[]).filter(r=>md(r.called)>=today||md(r.resolves)>=today).sort((a,b)=>md(a.called)-md(b.called)||a.n-b.n);
  const days=[];todo.forEach(r=>{const k=r.called;let d=days.find(x=>x.k===k);if(!d){d={k,t:md(k),rs:[]};days.push(d)}d.rs.push(r)});
  const cap=t=>(window.CAPS&&CAPS[t])||0;days.forEach(d=>d.rs.sort((a,b)=>cap(b.ticker)-cap(a.ticker)));
  return {P,MS,RS,N,A,arank,W,per,days,today,nUp:todo.length}};
/* ---------- formatting ---------- */
P5.$f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
P5.k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(Math.abs(v)>=1e5?0:1)+'K':Math.round(Math.abs(v)));
P5.pc=v=>v==null?'–':Math.round(v*100)+'%';
P5.day=(t,today)=>{const d=new Date(t),w=d.toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'});return t===today?'Today':t===today+864e5?'Tomorrow':w+' '+d.toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'UTC'})};
P5.esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
P5.logo=t=>{const L=window.CO_LOGOS&&CO_LOGOS[t];const f=L&&(L.f||L);return f?'media/'+f:null};
P5.mark=(m,x,y,s,fill)=>{const M=MODELS[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}" transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill||'#f8f0d9'}"/>`};
/* ---------- the stage: painting + lit text + glare, all in painting units (the painting is 1000 wide) ---------- */
const UID=()=>'p5'+Math.random().toString(36).slice(2,8);
P5.CR='#f8f0d9';P5.GD='#ffd21f';P5.UP='#3ee07f';P5.DN='#ff5148';P5.AMB='#ffb21a';
P5.INK={GPT:'#5ff0b4',KIMI:'#7fb6ff',CLAUDE:'#ff9d6b',GROK:'#f4efe4'};
/* text helpers: t(x,y,size,str,{a,c,cls,ff}) */
P5.t=(x,y,s,str,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||P5.CR}"${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,Bebas Neue,sans-serif'}"${o.cls?` class="${o.cls}"`:''}${o.op?` opacity="${o.op}"`:''}>${o.raw||P5.esc(str)}</text>`};
/* build(el,{img,crop:[x0,y0,x1,y1] in 1000-units of the painting, glass:[[x,y,w,h,r]...], lit:svg (emissive), silk:svg (board print), under:svg (behind lit)}) */
P5.stage=function(el,o){const id=UID(),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0;
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]}" height="${g[3]}" rx="${g[4]||0}"/>`).join('');
  const old=el.querySelector(':scope>.p5-svg');if(old)old.remove();el.insertAdjacentHTML('afterbegin',`<svg class="p5-svg" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${P5.esc(o.label||'')}">
   <defs>
    <filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||3.2}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||3.2)*3.4}" result="b2"/>
     <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".55"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}s" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="2.2" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.2 1.55" result="m"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale=".9" result="d"/><feComposite in="d" in2="m" operator="in"/></filter>
    <filter id="${id}e" x="-5%" y="-5%" width="110%" height="110%"><feMorphology operator="dilate" radius=".35"/><feGaussianBlur stdDeviation=".35"/></filter>
    <clipPath id="${id}c">${gl}</clipPath>
    <clipPath id="${id}k">${o.silk||''}</clipPath>
   </defs>
   <image href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none"/>
   <g class="p5-under">${o.under||''}</g>
   <g class="p5-lit" filter="url(#${id}g)">${o.lit||''}</g>
   <g class="p5-ov">${o.over||''}</g>
   ${gl?`<image class="p5-glare" href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare||.5}"/>`:''}
   ${o.silk?`<g class="p5-silk" filter="url(#${id}s)">${o.silk}</g><image href="${o.img}" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none" clip-path="url(#${id}k)" style="mix-blend-mode:multiply;opacity:.32"/>`:''}
   ${o.top||''}
  </svg>`);
  el.style.aspectRatio=`${w} / ${h}`;return el.querySelector('svg')};
/* ---------- mount ---------- */
P5.mountProof=function(take){const sec=D.querySelector('#learn');if(!sec)return;
  [...sec.children].forEach(c=>{if(!c.classList.contains('p5'))c.style.display='none'});sec.classList.add('p5-host');
  let box=sec.querySelector('.p5');if(!box){box=D.createElement('div');box.className='p5 p5-'+take.id;sec.appendChild(box)}
  const X=P5.data(),V={view:'acc',win:'season'};
  const draw=()=>{box.innerHTML=take.html(X,V);take.draw(box,X,V);
    box.querySelectorAll('[data-v],[data-w]').forEach(b=>b.onclick=()=>{if(b.dataset.v)V.view=b.dataset.v;if(b.dataset.w)V.win=b.dataset.w;draw();const f=box.querySelector(`[data-${b.dataset.v?'v':'w'}="${b.dataset.v||b.dataset.w}"]`);f&&f.focus({preventScroll:true})})};
  draw();P5.cur={X,V,draw,box};let w0=box.clientWidth;new ResizeObserver(()=>{if(box.clientWidth!==w0){w0=box.clientWidth;draw()}}).observe(box)};
P5.mountClose=function(take){const sec=D.querySelector('#get');if(!sec)return;
  [...sec.children].forEach(c=>{if(!c.classList.contains('p5c'))c.style.display='none'});sec.classList.add('p5-host');
  let box=sec.querySelector('.p5c');if(!box){box=D.createElement('div');box.className='p5c p5c-'+take.id;sec.appendChild(box)}
  const X=P5.data();const draw=()=>{box.innerHTML=take.html(X);take.draw(box,X)};P5.prepLogos([].concat(...X.days.slice(0,3).map(d=>d.rs.map(r=>r.ticker)))).then(draw);draw();P5.curC={X,draw,box};
  /* the next close ticks once a minute */
  if(!RM.matches)setInterval(()=>{const e=box.querySelector('.p5-cd');if(e&&take.cd)e.textContent=take.cd(X)},30000)};
/* switch markup shared by the takes (real buttons; the takes paint them onto their surfaces) */
P5.sw=(V)=>`<div class="p5-sw" role="group" aria-label="View">${[['acc','Hit rate'],['pnl','P&L']].map(([k,t])=>`<button type="button" data-v="${k}" aria-pressed="${V.view===k}">${t}</button>`).join('')}</div>`+
  (V.view==='pnl'?`<div class="p5-sw p5-ws" role="group" aria-label="Window">${[['season','Season'],['d7','Last 7 days'],['d1','Last 24 hours']].map(([k,t])=>`<button type="button" data-w="${k}" aria-pressed="${V.win===k}">${t}</button>`).join('')}</div>`:'');
P5.head=(a,b)=>`<h2 class="t4-h2 p5-h"><span class="t4-hw">${a}</span>${b?` <span class="t4-hw p5-hw2">${b}</span>`:''}</h2>`;
})();
(function(){const P5=window.P5;
/* real buttons over the painted controls: items [{k:'v'|'w',val,x,y,w,h,label,on}] in painting units */
P5.hits=(crop,items)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return items.map(i=>`<button type="button" class="p5-hit" data-${i.k}="${i.val}" aria-pressed="${!!i.on}" aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></button>`).join('')};
P5.link=(crop,i)=>{const [x0,y0,x1,y1]=crop,W=x1-x0,H=y1-y0;return `<a class="p5-hit" href="${i.href}"${i.ext?' target="_blank" rel="noopener"':''} aria-label="${P5.esc(i.label)}" style="left:${((i.x-x0)/W*100).toFixed(2)}%;top:${((i.y-y0)/H*100).toFixed(2)}%;width:${(i.w/W*100).toFixed(2)}%;height:${(i.h/H*100).toFixed(2)}%"></a>`};
P5.table=(X,V)=>{const pc=P5.pc,NM=P5.NM;if(V.view==='acc')return `<table class="p5-sr"><caption>Hit rate by AI, ${X.N} rounds. A coin flip gets 50%; the luck zone is where 95 in 100 coins would land after this many calls.</caption><tr><th>AI</th><th>W-L</th><th>Hit rate</th><th>Beyond the luck zone</th></tr>${X.arank.map(m=>{const a=X.A[m];return `<tr><th>${NM[m]}</th><td>${a.W}-${a.L}</td><td>${pc(a.hr)}</td><td>${a.out>0?'Yes, above':a.out<0?'Yes, below':'No'}</td></tr>`}).join('')}</table>`;
  const w=X.W[V.win];return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every call, ${w.lab}</caption><tr><th>AI</th><th>Last 24 hours</th><th>Last 7 days</th><th>Season</th></tr>${w.rank.map(m=>`<tr><th>${NM[m]}</th><td>${P5.$f(X.W.d1.tot[m])}</td><td>${P5.$f(X.W.d7.tot[m])}</td><td>${P5.$f(X.W.season.tot[m])}</td></tr>`).join('')}</table>`};
/* the next close after now (any round still to come), and a short countdown */
P5.nextClose=X=>{const now=Date.now();let best=null;X.days.forEach(d=>d.rs.forEach(r=>{const c=P5.closeAt(r.ticker,r.resolves);if(c&&c>now&&(!best||c<best.c))best={c,r}}));return best};
P5.cd=X=>{const b=P5.nextClose(X);if(!b)return 'Date to come';const m=Math.max(0,Math.round((b.c-Date.now())/6e4)),d=Math.floor(m/1440),h=Math.floor(m%1440/60);return d?`${d}d ${h}h`:`${h}h ${String(m%60).padStart(2,'0')}m`};
/* a company logo as a lit glyph on a display: its own shape, lit in cream (a display has one phosphor) */
/* logos: the tile (if any) keyed out on a canvas, the mark kept as an alpha mask, so a display can light it in one phosphor */
const LG={};P5.prepLogos=ts=>Promise.all(ts.filter(t=>!(t in LG)).map(t=>new Promise(res=>{const f=P5.logo(t);if(!f){LG[t]=null;return res()}const im=new Image();im.onload=()=>{try{
  const S=160,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');const k=Math.min(S/im.width,S/im.height);g.drawImage(im,(S-im.width*k)/2,(S-im.height*k)/2,im.width*k,im.height*k);
  const d=g.getImageData(0,0,S,S),p=d.data,px=(x,y)=>(y*S+x)*4;const q=Math.round(S*.13),cs=[[q,q],[S-1-q,q],[q,S-1-q],[S-1-q,S-1-q]].map(([x,y])=>px(x,y));
  const tile=cs.every(i=>p[i+3]>200)&&cs.every(i=>Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2])<70);
  for(let i=0;i<p.length;i+=4){let a=p[i+3];if(tile){const dd=Math.abs(p[i]-p[cs[0]])+Math.abs(p[i+1]-p[cs[0]+1])+Math.abs(p[i+2]-p[cs[0]+2]);a=Math.min(a,Math.max(0,Math.min(255,(dd-46)*4)))}p[i]=248;p[i+1]=240;p[i+2]=217;p[i+3]=a}
  g.putImageData(d,0,0);LG[t]=c.toDataURL()}catch(e){LG[t]=null}res()};im.onerror=()=>{LG[t]=null;res()};im.src=f})));
P5.litLogo=(t,x,y,s)=>{if(LG[t])return `<image href="${LG[t]}" x="${(x-s/2).toFixed(1)}" y="${(y-s/2).toFixed(1)}" width="${s}" height="${s}"/>`;const f=P5.logo(t);return f?`<image href="${f}" x="${(x-s/2).toFixed(1)}" y="${(y-s/2).toFixed(1)}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid meet" style="filter:brightness(0) invert(.94) sepia(.25)"/>`:P5.t(x,y+s*.18,s*.5,t,{a:'middle'})};
/* tell the stage when it is on screen, for the re-scan */
let TW=null;P5.tw=(t,s,f)=>{TW=TW||document.createElement('canvas').getContext('2d');TW.font=`${s}px ${f||'Anton'}`;return TW.measureText(t).width};
P5.vis=el=>{if(!('IntersectionObserver' in window))return;new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('p5-vis',e.isIntersecting))).observe(el)};
})();
(function(){const P5=window.P5,{t}=P5;
/* the switch strip: a strip of the same green board (panel painting, between its display and its buttons), the controls
   silkscreened on it, the open one with a lit LED beside it; the footnote printed small on the same strip. */
P5.strip=function(el,V,o){o=o||{};const ac=V.view==='acc',G=[136,172,724,288],CROP=[118,154,882,478];
  const items=[];let lit='',under='';const s=44;
  const row=(list,y,k,sz)=>{const pad=22,ws=list.map(([v,l])=>P5.tw(l,sz)+pad*2);let x=500-(ws.reduce((a,b)=>a+b,0)+(list.length-1)*14)/2;
    list.forEach(([v,l],i)=>{const on=k==='v'?V.view===v:V.win===v,w=ws[i];
      under+=`<rect x="${x}" y="${y-sz-12}" width="${w}" height="${sz+30}" rx="6" fill="none" stroke="${P5.AMB}" stroke-opacity="${on?0:.45}" stroke-width="2"/>`;
      lit+=(on?`<rect x="${x}" y="${y-sz-12}" width="${w}" height="${sz+30}" rx="6" fill="${P5.AMB}"/>`:'')+t(x+w/2,y,sz,l,{a:'middle',c:on?'#140a00':P5.AMB,op:on?1:.8});
      items.push({k,val:v,x,y:y-sz-12,w,h:sz+30,label:l,on});x+=w+14})};
  if(ac){row([['acc','HIT RATE'],['pnl','P&L']],272,'v',s);if(o.foot)lit+=t(500,372,30,o.foot,{a:'middle',c:'#9fd8b4'})}
  else{row([['acc','HIT RATE'],['pnl','P&L']],246,'v',38);row([['season','SEASON'],['d7','7 DAYS'],['d1','24 HOURS']],336,'w',36);if(o.foot)lit+=t(500,420,26,o.foot,{a:'middle',c:'#9fd8b4'})}
  P5.stage(el,{img:'media/p5-panel.jpg',crop:CROP,glass:[[G[0],G[1],G[2],G[3],10]],lit,under,label:'View switch',bloom:2,glare:.55});
  el.insertAdjacentHTML('beforeend',P5.hits(CROP,items))};
})();
