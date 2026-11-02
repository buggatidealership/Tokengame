/* H26 sol7: Smart or lucky in two beats, T1 refined. Mockup only, laid over the built v46-live-x2plus.html on top of the live
   P5 engine (x2p_more.js): P5.data() gives every number (h_sol.js rules), P5.mountProof() mounts a take.
   Shared here: a stage in the painting's own units (S7.stage), the coin's range in counts (S7.range, the live scope's zone
   rule n/2 ± 1.96·√n/2, so every verdict matches the live page), the refined scope (S7.scope: no label column, the chart to
   the glass's right edge, the colour key carried by the rows under it), and the shared words (sol6 D, approved by the owner). */
(function(){const P5=window.P5,S=window.S7={};
S.GD='#ffd21f';S.AMB='#ffb21a';S.UP='#3ee07f';S.DN='#ff5148';S.CR='#f8f0d9';S.DIM='#9fd8b4';
/* the models' colours as lit on a display; the hit-rate leader (arank[0]) in gold, as on the live scope */
S.INK={GPT:'#5ff0b4',KIMI:'#7fb6ff',CLAUDE:'#ff9d6b',GROK:'#f4efe4'};
S.NM=P5.NM;S.esc=P5.esc;S.t=P5.t;S.k$=P5.k$;S.$f=P5.$f;S.pc=P5.pc;
S.range=n=>({lo:Math.ceil(n/2-.98*Math.sqrt(n)),hi:Math.floor(n/2+.98*Math.sqrt(n))});
S.rows=X=>X.arank.map(m=>{const a=X.A[m],r=S.range(a.t);return {m,W:a.W,L:a.L,t:a.t,hr:a.hr,lo:r.lo,hi:r.hi,beyond:a.out>0,below:a.out<0}});
S.col=(X,m,rank)=>m===(rank||X.arank)[0]?S.GD:S.INK[m];
/* the approved line (sol6 D): one front-loaded clause, the sample inside the sentence, the coin in the same units */
S.line=(X,V)=>{if(V.view==='acc'){const r=S.rows(X)[0];
    return `<b>Hit rate:</b> how often a trade went the right way. ${S.NM[r.m]}: <b>${r.W} of ${r.t}</b>. A coin flip lands <b>${r.lo} to ${r.hi} of ${r.t}</b>.`}
  const w=X.W[V.win];return w.n?`<b>P&amp;L:</b> $100K on every trade, ${w.lab}, <b>${w.n} round${w.n===1?'':'s'}</b>.`:`<b>P&amp;L:</b> no round closed in ${w.lab}.`};
S.table=(X,V)=>{if(V.view==='acc')return `<table class="p5-sr"><caption>Hit rate: how often a trade went the right way. A fair coin, over the same number of trades, lands inside the range 95 times in 100.</caption><tr><th>AI</th><th>Right</th><th>A coin’s range</th><th>Hit rate</th></tr>${S.rows(X).map(r=>`<tr><th>${S.NM[r.m]}</th><td>${r.W} of ${r.t}</td><td>${r.lo} to ${r.hi} of ${r.t}</td><td>${S.pc(r.hr)}</td></tr>`).join('')}</table>`;
  const w=X.W[V.win];return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every trade, ${w.lab}, ${w.n} rounds</caption><tr><th>AI</th><th>P&amp;L</th></tr>${w.rank.map(m=>`<tr><th>${S.NM[m]}</th><td>${S.$f(w.tot[m])}</td></tr>`).join('')}</table>`};
/* a stage in painting units: image 1000 wide, 1000·ar tall; crop [x0,y0,x1,y1]. No P5.vis: the frames are still (H26). */
let uid=0;
S.stage=function(el,o){const id='s7'+(uid++),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0,IW=1000,IH=Math.round(1000*o.ar);
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]-g[0]}" height="${g[3]-g[1]}" rx="${g[4]||0}"/>`).join('');
  const old=el.querySelector(':scope>.s7-svg');if(old)old.remove();
  el.insertAdjacentHTML('afterbegin',`<svg class="s7-svg" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${S.esc(o.label||'')}">
   <defs>
    <filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||2.2}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||2.2)*3.2}" result="b2"/>
     <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".45"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <filter id="${id}e" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".8"/></filter>
    <clipPath id="${id}c">${gl}</clipPath>
   </defs>
   <image href="${o.img}" x="0" y="0" width="${IW}" height="${IH}" preserveAspectRatio="none"/>
   <g class="s7-under">${o.under||''}</g>
   <g class="s7-lit" filter="url(#${id}g)">${o.lit||''}</g>
   ${gl?`<image class="s7-glare" href="${o.img}" x="0" y="0" width="${IW}" height="${IH}" preserveAspectRatio="none" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare==null?.4:o.glare}"/>`:''}
   ${o.over?`<g class="s7-ov" filter="url(#${id}g)">${o.over}</g>`:''}
   ${o.ink?`<g class="s7-ink" filter="url(#${id}e)">${o.ink}</g>`:''}
   ${o.top||''}
  </svg>`);
  el.style.aspectRatio=`${w} / ${h}`;return el.querySelector('svg')};
/* ---------- the refined scope ----------
   g: the glass [x0,y0,x1,y1] in painting units. o.cal: calibration (the coin's zone only, the AIs waiting, "?" for numbers).
   Layout on the glass: y labels at the left, the chart to the right edge (no label column), a dot at each line's end in its
   colour, R1 and R<n> under it, then the key as rows: name and hit rate (or P&L) over the W-L, each in the AI's colour. */
S.scope=function(X,V,g,o){o=o||{};const t=S.t,ac=V.view==='acc',w=X.W[V.win];let lit='',under='',over='';
  const [g0,g1,g2,g3]=g,sm=o.sm||28,lab=o.lab||34,rowsH=o.rowsH||(lab+sm+30),padL=o.padL||74,padR=o.padR||22,padT=o.padT||30,axH=sm+12;
  const cx0=g0+padL,cx1=g2-padR,cy0=g1+padT,cy1=g3-rowsH-axH;
  let lo,hi,n,rank,ser;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8}
  else{n=w.n;rank=w.rank;ser=m=>w.ser[m];const all=[].concat(...X.MS.map(m=>w.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.1;lo=a-pd;hi=b+pd}
  const Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0),Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  for(let i=0;i<=8;i++)under+=`<line x1="${(cx0+(cx1-cx0)*i/8).toFixed(1)}" y1="${cy0}" x2="${(cx0+(cx1-cx0)*i/8).toFixed(1)}" y2="${cy1}" stroke="#7dffb0" stroke-opacity=".08" stroke-width="1.2"/>`;
  if(ac){
    const up=[],dn=[];for(let i=0;i<=n;i++){const z=i?1.96*Math.sqrt(i/4)/(i+2):0;up.push([Xp(i),Y(.5+z)]);dn.push([Xp(i),Y(.5-z)])}
    under+=`<path d="M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.slice().reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z" fill="${S.AMB}" fill-opacity="${o.cal?.2:.12}" stroke="${S.AMB}" stroke-opacity=".75" stroke-width="2" stroke-dasharray="7 6"/>`;
    [.3,.4,.6,.7,.8].forEach(v=>{under+=`<line x1="${cx0}" y1="${Y(v).toFixed(1)}" x2="${cx1}" y2="${Y(v).toFixed(1)}" stroke="#7dffb0" stroke-opacity=".11" stroke-width="1.2"/>`;if(v<.8)over+=t(cx0-10,Y(v)+sm*.36,sm,Math.round(v*100)+'%',{a:'end',c:S.DIM,op:.85})});
    lit+=`<line x1="${cx0}" y1="${Y(.5).toFixed(1)}" x2="${cx1}" y2="${Y(.5).toFixed(1)}" stroke="${S.AMB}" stroke-width="2.4"/>`;over+=t(cx0-10,Y(.5)+sm*.36,sm,'50%',{a:'end',c:S.AMB});
    /* the zone's name, under the funnel at its right end, where no line passes (the funnel is narrowest there) */
    const zl=1.96*Math.sqrt(n/4)/(n+2),yb=(Y(.5-zl)+cy1)/2+sm*.36;lit+=t(cx1-(o.cal?40:6),Math.min(cy1-6,yb),sm,o.zoneLabel||'A COIN LANDS IN THE GOLD',{a:'end',c:S.AMB});
  }else{
    if(n){lit+=`<line x1="${cx0}" y1="${Y(0).toFixed(1)}" x2="${cx1}" y2="${Y(0).toFixed(1)}" stroke="${S.AMB}" stroke-width="2.4"/>`;over+=t(cx0-10,Y(0)+sm*.36,sm,'$0',{a:'end',c:S.AMB});
      const all=[].concat(...X.MS.map(m=>w.ser[m])),top=Math.max(...all),bot=Math.min(...all);
      [top,bot].forEach(v=>{if(Math.abs(Y(v)-Y(0))>sm*1.3)over+=t(cx0-10,Math.max(cy0+sm,Y(v)+sm*.36),sm,S.k$(v).replace('.0K','K'),{a:'end',c:S.DIM,op:.85})})}
    else lit+=t((cx0+cx1)/2,(cy0+cy1)/2,lab,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:S.AMB});
  }
  /* the x axis: the sample, as rounds */
  if(n){lit+=t(cx0,cy1+sm+4,sm,'R1',{c:S.DIM,op:.8})+t(cx1,cy1+sm+4,sm,(ac?'R':'')+(ac?n:n+(n===1?' ROUND':' ROUNDS')),{a:'end',c:S.DIM,op:.8})}
  /* the lines (the leader's in gold, drawn last), a dot at each end in its colour; in calibration none yet */
  const lead=rank[0],cl=m=>m===lead?S.GD:S.INK[m];
  if(n&&!o.cal){rank.slice().reverse().forEach(m=>{const p=ser(m),ld=m===lead;
    lit+=`<path class="s7-tr" d="${p.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${cl(m)}" stroke-width="${ld?4.6:3.4}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`});
    rank.forEach(m=>{const p=ser(m);lit+=`<circle cx="${cx1.toFixed(1)}" cy="${Y(p[p.length-1]).toFixed(1)}" r="${m===lead?8:6.5}" fill="${cl(m)}"/>`})}
  if(o.cal&&n){/* the four, waiting at the zone's mouth: their colours on, their numbers withheld (lesson 128) */
    rank.forEach((m,i)=>{const y=cy0+14+i*((cy1-cy0-28)/3);lit+=`<circle cx="${cx1}" cy="${y.toFixed(1)}" r="11" fill="none" stroke="${cl(m)}" stroke-width="3"/>`+t(cx1,y+9,24,'?',{a:'middle',c:cl(m)})})}
  /* the key: rows under the chart, the colour coding carried here */
  const ry=g3-rowsH+lab*.2,cw=(g2-g0-24)/rank.length;
  rank.forEach((m,i)=>{const x=g0+12+i*cw+cw/2,c=cl(m);let l1,l2,c2=c;
    if(ac){const a=X.A[m];l1=S.NM[m].toUpperCase()+(o.cal?'':' '+S.pc(a.hr));l2=o.cal?'?–?':a.W+'-'+a.L}
    else{const v=w.tot[m];l1=S.NM[m].toUpperCase();l2=S.k$(v).replace('.0K','K');c2=v>0?S.UP:v<0?S.DN:S.CR}
    if(o.oneLine){const nm=S.NM[m].toUpperCase();lit+=t(x,g3-rowsH/2+lab*.36,lab,'',{a:'middle',raw:`<tspan fill="${c}" font-size="${sm}">${nm}</tspan> <tspan fill="${c2}">${l2}</tspan>`})}
    else lit+=t(x,ry+sm*.9,sm,l1,{a:'middle',c})+t(x,ry+sm*.9+lab+4,lab,l2,{a:'middle',c:c2})});
  return {lit,under,over}};
/* the view switch as page buttons (take A's pill; take C's tabs reuse the markup with another class) */
S.pill=(V,cls,wins,short)=>`<div class="${cls}" role="group" aria-label="What the scope shows">${[['acc','Hit rate'],['pnl','P&L']].map(([k,l])=>`<button type="button" data-v="${k}" aria-pressed="${V.view===k}">${l}</button>`).join('')}</div>`+
  (wins!==false&&V.view==='pnl'?`<div class="${cls} ${cls}-w" role="group" aria-label="Window">${(short?[['season','Season'],['d7','7D'],['d1','24H']]:[['season','Season'],['d7','7 days'],['d1','24 hours']]).map(([k,l])=>`<button type="button" data-w="${k}" aria-pressed="${V.win===k}">${l}</button>`).join('')}</div>`:'');
S.kick=(n,l)=>`<p class="s7-k"><i>${n}</i>${l}</p>`;
S.mount=take=>{const b=document.querySelector('#learn .p5');if(b)b.className='p5 p5-s7 p5-'+take.id;P5.mountProof(take)};
})();
