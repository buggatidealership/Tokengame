/* B · THE COIN AND ITS PILES: "where luck lands". The coin is the section's character: a gold coin mid-flip with its claim struck
   into its face ("A coin is right 50% of the time"). Under it, the coin's piles: 100 fair coins, each flipped as many times as an AI
   traded, stacked by how many came up right (the exact binomial spread, rounded to whole coins; not a simulation). The gold part
   of each pile is where 95 in 100 coins land (the live scope's luck zone, in counts); the rest is tarnished. Each AI's count stands
   on the pile as a lit post in its chip colour. Grok's 72 trades get their own pile; Claude, GPT and Kimi share one (80 each).
   P&L view: the piles become each AI's money, one coin per $5K, gold for profit, red rings for what is owed.
   No "1 time in N" caption (owner, H9: drop the coin captions): the picture shows it, the words don't. */
(function(){const P5=window.P5,S=window.S25,{t}=S;
const IMG='media/s25-coin.jpg',CE='media/s25-coinedge.png',CROP=[150,70,900,860];
let uid=0;
function face(){/* struck into the face: the claim, turned with the face (an ellipse 225 x 342 around 592,470) */
  const k=.66,c='#5a3604',lp='#ffe7a0';
  const s=(y,sz,str)=>`<text x="0" y="${y}" font-size="${sz}" text-anchor="middle" font-family="Anton,sans-serif" fill="${c}" stroke="${lp}" stroke-width="1.6" paint-order="stroke" style="letter-spacing:.02em">${str}</text>`;
  return `<g transform="translate(592 478) rotate(7) scale(${k} 1)" opacity=".9">${s(-120,62,'A COIN IS RIGHT')}${s(70,230,'50%')}${s(150,62,'OF THE TIME')}</g>`}
/* one pile: n trades, columns for every count from n/2−3σ to n/2+3σ */
function pile(n,posts,o){const id='s25p'+(uid++),W=1000,sd=Math.sqrt(n)/2,k0=Math.max(0,Math.floor(n/2-3.2*sd)),k1=Math.min(n,Math.ceil(n/2+3.2*sd)),cols=k1-k0+1,cw=900/cols,x0=50,
   cH=15,floor=o.h-112,rg=S.range(n),X=k=>x0+(k-k0+.5)*cw;let s='',lit='';
  const tall=Math.max(...posts.map(p=>p.k)),top=floor-Math.round(S.pmf(n,Math.round(n/2))*100)*cH;
  for(let k=k0;k<=k1;k++){const m=Math.round(S.pmf(n,k)*100),inz=k>=rg.lo&&k<=rg.hi;for(let j=0;j<m;j++){const jx=((k*7+j*13)%5-2)*.9;
      s+=`<image href="${CE}" x="${(X(k)-cw*.46+jx).toFixed(1)}" y="${(floor-(j+1)*cH).toFixed(1)}" width="${(cw*.92).toFixed(1)}" height="${cH+2}" preserveAspectRatio="none"${inz?'':` filter="url(#${id}d)" opacity=".75"`}/>`}}
  /* the floor, its counts, and the gold bracket under the lit part */
  s+=`<line x1="${x0}" y1="${floor+2}" x2="${x0+900}" y2="${floor+2}" stroke="#6b5222" stroke-width="2"/>`;
  for(let k=k0;k<=k1;k++)if(k%4===0)lit+=t(X(k),floor+40,36,String(k),{a:'middle',c:'#cdbb92',op:.85});
  lit+=`<path d="M${X(rg.lo)-cw/2} ${floor+52} v10 H${X(rg.hi)+cw/2} v-10" fill="none" stroke="${S.GOLD}" stroke-width="4"/>`+t((X(rg.lo)+X(rg.hi))/2,floor+100,36,`95 IN 100 LAND ${rg.lo}–${rg.hi}`,{a:'middle',c:S.GOLD});
  /* the AIs' posts: a beam from the floor to above the pile, the name and count on top, pushed apart */
  const ps=posts.map(p=>({...p,x:X(p.k)})).sort((a,b)=>a.x-b.x);
  ps.forEach((p,i)=>{const yT=top-30-(i%2)*48,c=S.C[p.m];
    s+=`<rect x="${(p.x-3).toFixed(1)}" y="${yT+8}" width="6" height="${floor-yT-8}" fill="${c}" opacity=".9"/>`;
    lit+=`<circle cx="${p.x.toFixed(1)}" cy="${yT+8}" r="7" fill="${c}"/>`+t(p.x,yT-8,38,'',{a:'middle',raw:`<tspan fill="${c}">${S.NM[p.m].toUpperCase()}</tspan> <tspan fill="${p.beyond?S.UP:S.CR}">${p.k}</tspan>`})});
  lit+=t(x0,40,36,o.cap,{c:'#e9d9b0'});
  return `<svg class="s25-pl" viewBox="0 0 ${W} ${o.h}" role="img" aria-label="${S.esc(o.cap)}"><defs><filter id="${id}d"><feColorMatrix type="matrix" values=".42 0 0 0 0 0 .3 0 0 0 0 0 .22 0 0 0 0 0 1 0"/></filter>
   <filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
   ${s}<g filter="url(#${id}g)">${lit}</g></svg>`}
function money(X,V){const w=X.W[V.win],per=5000,cH=15,cw=150,floor=330,x0=110;let s='',lit='';
  if(!w.n)return `<svg class="s25-pl" viewBox="0 0 1000 200">${t(500,110,40,'NO CLOSE IN '+w.t.toUpperCase(),{a:'middle',c:S.GOLD})}</svg>`;
  w.rank.forEach((m,i)=>{const v=w.tot[m],n=Math.round(Math.abs(v)/per),x=x0+i*215;
    for(let j=0;j<n&&j<18;j++)s+=v>=0?`<image href="${CE}" x="${x+((j*7)%5-2)}" y="${floor-(j+1)*cH}" width="${cw}" height="${cH+2}" preserveAspectRatio="none"/>`:`<rect x="${x+4}" y="${floor-(j+1)*cH+2}" width="${cw-8}" height="${cH-3}" rx="6" fill="none" stroke="${S.DN}" stroke-width="2" stroke-dasharray="5 3"/>`;
    lit+=t(x+cw/2,floor+40,30,S.NM[m].toUpperCase(),{a:'middle',c:S.C[m]})+t(x+cw/2,floor+80,34,S.$(v),{a:'middle',c:v>0?S.UP:v<0?S.DN:S.CR})});
  lit+=t(40,40,34,`ONE COIN PER $5K · RED RINGS: OWED · ${w.n} ROUND${w.n===1?'':'S'}`,{c:'#e9d9b0'});
  return `<svg class="s25-pl" viewBox="0 0 1000 430" role="img" aria-label="P&L as coins"><defs><filter id="s25mg"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>${s}<g filter="url(#s25mg)">${lit}</g></svg>`}
/* the switch: words struck on the ground beside the coin, the open one gold and underlined */
const SW=V=>`<div class="s25b-sw">${[['v','acc','Hit rate'],['v','pnl','P&L']].map(([k,v,l])=>`<button type="button" data-${k}="${v}" aria-pressed="${V.view===v}">${l}</button>`).join('')}${V.view==='pnl'?`<span class="s25b-ws">${[['season','Season'],['d7','7D'],['d1','24H']].map(([v,l])=>`<button type="button" data-w="${v}" aria-pressed="${V.win===v}">${l}</button>`).join('')}</span>`:''}</div>`;
P5.take={id:'b',html(X,V){const r=S.rows(X)[0];return `<div class="p5-bleed s25b"><div class="s25b-top"><div class="s25-st"></div><div class="s25b-tx">${P5.head('Smart or','lucky?')}<p class="s25-ln">${V.view==='acc'?`<b>Hit rate:</b> how often a trade went the right way. ${S.NM[r.m]}: <b>${r.W} of ${r.t}</b>.`:S.line(X,V)}</p>${SW(V)}</div></div><div class="s25b-piles"></div>${V.view==='acc'?`<p class="s25-ln">Each stack: how many of 100 coins got that many right. <span class="a">Gold: where luck lands.</span></p>`:''}${S.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.s25-st');
  S.stage(st,{img:IMG,ar:1,crop:CROP,ink:face(),glare:0,bloom:1,label:'A gold coin mid-flip: a coin is right 50% of the time'});
  const pl=box.querySelector('.s25b-piles');
  if(V.view==='acc'){const rows=S.rows(X),g=rows.filter(r=>r.t!==80),e=rows.filter(r=>r.t===80),grp={};rows.forEach(r=>(grp[r.t]=grp[r.t]||[]).push(r));
    pl.innerHTML=Object.keys(grp).sort((a,b)=>a-b).map(n=>pile(+n,grp[n].map(r=>({m:r.m,k:r.W,beyond:r.beyond})),{h:430,cap:`100 COINS × ${n} FLIPS · LIKE ${grp[n].map(r=>S.NM[r.m].toUpperCase()).join(', ')}`})).join('')}
  else pl.innerHTML=money(X,V);
  P5.vis(st)}};
})();
