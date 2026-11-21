/* H25 sol6: shared engine for the four "Smart or lucky?" takes. Mockup only: laid over the built v46-live-x2plus.html,
   on top of the live P5 engine (x2p_more.js): P5.data() gives the numbers (h_sol.js rules verbatim), P5.mountProof() mounts a take.
   Words first (lessons 124, 126): one front-loaded clause, the trade's own verbs, the sample always shown as "45 of 72".
   The coin's range is T1's luck zone in counts: n/2 ± 1.96·√n/2 (95 in 100 fair coins land inside), the same rule as the live
   scope's `zone` (1.96·√(.25/n) as a rate), so every verdict here matches the live page's. */
(function(){const P5=window.P5,S=window.S25={};
/* theme7: the models' chip colours, lit (slate, orange, green, blue); the coin is the logo's gold */
S.C={GROK:'#b9c6da',CLAUDE:'#ff8f5a',GPT:'#45e6a6',KIMI:'#66adff'};S.GOLD='#ffc83a';S.CR='#f8f0d9';S.UP='#3ee07f';S.DN='#ff5148';
S.NM=P5.NM;S.esc=P5.esc;S.t=P5.t;
S.range=n=>({lo:Math.ceil(n/2-.98*Math.sqrt(n)),hi:Math.floor(n/2+.98*Math.sqrt(n))});
/* exact fair-coin chances of k right in n (for the pile); log-space so 80 is safe */
const LG=[0];for(let i=1;i<=400;i++)LG[i]=LG[i-1]+Math.log(i);
S.pmf=(n,k)=>Math.exp(LG[n]-LG[k]-LG[n-k]-n*Math.LN2);
/* one record per AI, in the live hit-rate order */
S.rows=X=>X.arank.map(m=>{const a=X.A[m],r=S.range(a.t);return {m,W:a.W,L:a.L,t:a.t,hr:a.hr,lo:r.lo,hi:r.hi,
  beyond:a.out>0,below:a.out<0,edge:a.out===0&&(a.W===r.hi||a.W===r.lo),net:a.W-a.L,band:1.96*Math.sqrt(a.t)}});
/* running W-L per AI over its own trades (for the race) */
S.net=(X,m)=>{const s=[0];let v=0;X.RS.forEach(r=>{const x=X.P[m].per[r.n];if(x){v+=x.v>0?1:-1;s.push(v)}});return s};
S.verdict=r=>r.beyond?'Beyond a coin':r.below?'Worse than a coin':'A coin could do this';
/* a stage in the painting's own pixels (P5.stage stretches every painting to 1000x1000; these paintings are not all square) */
let uid=0;
S.stage=function(el,o){const id='s25'+(uid++),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0,IW=1000,IH=Math.round(1000*o.ar);
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]}" height="${g[3]}" rx="${g[4]||0}"/>`).join('');
  const old=el.querySelector(':scope>.s25-svg');if(old)old.remove();
  el.insertAdjacentHTML('afterbegin',`<svg class="s25-svg" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${S.esc(o.label||'')}">
   <defs>
    <filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||2.6}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||2.6)*3.4}" result="b2"/>
     <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".55"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}s" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.1 1.5" result="m"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" result="d"/><feComposite in="d" in2="m" operator="in"/></filter>
    <clipPath id="${id}c">${gl}</clipPath>
   </defs>
   <image href="${o.img}" x="0" y="0" width="${IW}" height="${IH}" preserveAspectRatio="none"/>
   ${o.base||''}
   <g class="s25-under">${o.under||''}</g>
   <g class="s25-lit" filter="url(#${id}g)">${o.lit||''}</g>
   ${gl?`<image class="s25-glare" href="${o.img}" x="0" y="0" width="${IW}" height="${IH}" preserveAspectRatio="none" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare==null?.45:o.glare}"/>`:''}
   ${o.ink?`<g class="s25-ink" filter="url(#${id}s)">${o.ink}</g>`:''}
   ${o.top||''}
  </svg>`);
  el.style.aspectRatio=`${w} / ${h}`;return el.querySelector('svg')};
/* hit areas over a stage, in painting px */
S.hits=(crop,items)=>P5.hits(crop,items);
/* the readable table for screen readers, both views */
S.table=(X,V)=>{if(V.view==='acc')return `<table class="p5-sr"><caption>Hit rate: how often a trade went the right way. A fair coin, over the same number of trades, lands inside the range 95 times in 100.</caption><tr><th>AI</th><th>Right</th><th>A coin’s range</th><th>Verdict</th></tr>${S.rows(X).map(r=>`<tr><th>${S.NM[r.m]}</th><td>${r.W} of ${r.t}</td><td>${r.lo} to ${r.hi} of ${r.t}</td><td>${S.verdict(r)}</td></tr>`).join('')}</table>`;
  const w=X.W[V.win];return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every trade, ${w.lab}, ${w.n} rounds</caption><tr><th>AI</th><th>P&amp;L</th></tr>${w.rank.map(m=>`<tr><th>${S.NM[m]}</th><td>${P5.$f(w.tot[m])}</td></tr>`).join('')}</table>`};
/* the shared words (lesson 124/126): a front-loaded clause per view; the sample is inside the sentence */
S.line=(X,V,o)=>{o=o||{};if(V.view==='acc'){const r=S.rows(X)[0];
    return `<b>Hit rate:</b> how often a trade went the right way. ${S.NM[r.m]}: <b>${r.W} of ${r.t}</b>. ${o.coin||`A coin flip lands <b>${r.lo} to ${r.hi} of ${r.t}</b>.`}`}
  const w=X.W[V.win];return w.n?`<b>P&L:</b> $100K on every trade, ${w.lab}, <b>${w.n} round${w.n===1?'':'s'}</b>.`:`<b>P&L:</b> no round closed in ${w.lab}.`};
S.$=P5.k$;S.$f=P5.$f;S.tw=P5.tw;
})();
window.S25.mount=take=>{const b=document.querySelector('#learn .p5');if(b)b.className='p5 p5-s25 p5-'+take.id;P5.mountProof(take)};
