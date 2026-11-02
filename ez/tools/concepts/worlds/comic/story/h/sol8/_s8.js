/* H27 sol8: Smart or lucky in three beats, no selector. Mockup only, laid over the built v46-live-x2plus.html on the live P5
   engine (x2p_more.js) and sol7's helpers (_s7.js: S7.stage, S7.range, S7.t). Shared here:
   - beat 2: the hit-rate scope, full width of the glass, the coin's EXACT binomial range as the gold (one rule everywhere now:
     the counts and the funnel both use S7.range), no label column, a dot at each line's end, the key in ranked rows under it;
   - beat 3: the P&L scope, season only, flat $100K a trade, ranked rows under it;
   - one colour per AI across the whole section; gold = the golden ticket holder (season P&L #1), the one we follow;
   - S8.take(beat1): composes a beat-1 take with beats 2 and 3 into one P5 take. No tabs, no windows, no knobs (H27). */
(function(){const P5=window.P5,S=window.S7,t=S.t,S8=window.S8={};
const SI='media/s7-wide-clean.jpg',SAR=.75,SCROP=[30,70,970,672],GL=[99,127,900,611];
S8.SI=SI;S8.GL=GL;S8.SCROP=SCROP;
/* the golden ticket holder: season P&L #1 (who we follow); everyone else keeps one colour in every beat */
S8.lead=X=>X.W.season.rank[0];
S8.col=(X,m)=>m===S8.lead(X)?S.GD:S.INK[m];
/* the coin's zone after i trades, in the smoothed rate the lines are drawn in ((right+1)/(trades+2), every line starts at 50/50):
   the binomial count range [lo,hi] mapped the same way, so a line leaves the gold exactly when its count leaves the coin's range */
S8.zone=i=>{if(!i)return [.5,.5];const r=S.range(i);return [(r.lo+1)/(i+2),(r.hi+1)/(i+2)]};
/* drawn as an envelope: the exact range alternates by a whole trade between odd and even counts (it drew spikes, not luck), so the
   band at i is the widest exact range from i trades on. It only ever widens the gold, so "95 in 100 coins land inside" stays true;
   at the last round it is exactly the binomial range. f(i) -> [lo,hi] in the chart's units. */
S8.env=(n,f)=>{const a=[];for(let i=0;i<=n;i++)a.push(f(i));for(let i=n-1;i>=1;i--){a[i]=[Math.min(a[i][0],a[i+1][0]),Math.max(a[i][1],a[i+1][1])]}return a};
S8.verdict=r=>r.W>r.hi?'past':r.W<r.lo?'under':'in';
const TAG={past:'Past the gold',in:'In the gold',under:'Under the gold'};
/* ---------- the chart on the scope's glass ---------- */
S8.chart=function(X,kind,o){o=o||{};const ac=kind==='acc',w=X.W.season;let lit='',under='',over='';
  const [g0,g1,g2,g3]=GL,sm=o.sm||30,padL=o.padL||(kind==='acc'?86:112),padR=o.padR||30,padT=o.padT||34,axH=sm+18;
  const cx0=g0+padL,cx1=g2-padR,cy0=g1+padT,cy1=g3-axH;
  let lo,hi,n,rank,ser;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8}
  else{n=w.n;rank=w.rank;ser=m=>w.ser[m];const all=[].concat(...X.MS.map(m=>w.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.08;lo=a-pd;hi=b+pd}
  const Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0),Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  for(let i=0;i<=8;i++)under+=`<line x1="${(cx0+(cx1-cx0)*i/8).toFixed(1)}" y1="${cy0}" x2="${(cx0+(cx1-cx0)*i/8).toFixed(1)}" y2="${cy1}" stroke="#7dffb0" stroke-opacity=".08" stroke-width="1.2"/>`;
  if(ac){const up=[],dn=[],E=S8.env(n,S8.zone);for(let i=0;i<=n;i++){const z=E[i];up.push([Xp(i),Y(z[1])]);dn.push([Xp(i),Y(z[0])])}
    under+=`<path d="M${up.map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')} L${dn.slice().reverse().map(p=>p.map(v=>v.toFixed(1)).join(' ')).join(' L')}Z" fill="${S.AMB}" fill-opacity=".14" stroke="${S.AMB}" stroke-opacity=".75" stroke-width="2" stroke-dasharray="7 6"/>`;
    [.3,.4,.6,.7,.8].forEach(v=>{under+=`<line x1="${cx0}" y1="${Y(v).toFixed(1)}" x2="${cx1}" y2="${Y(v).toFixed(1)}" stroke="#7dffb0" stroke-opacity=".11" stroke-width="1.2"/>`;if(v<.8)over+=t(cx0-12,Y(v)+sm*.36,sm,Math.round(v*100)+'%',{a:'end',c:S.DIM,op:.85})});
    lit+=`<line x1="${cx0}" y1="${Y(.5).toFixed(1)}" x2="${cx1}" y2="${Y(.5).toFixed(1)}" stroke="${S.AMB}" stroke-width="2.4"/>`;over+=t(cx0-12,Y(.5)+sm*.36,sm,'50%',{a:'end',c:S.AMB});
    const z=S8.zone(n);lit+=t(cx1-4,Math.min(cy1-8,(Y(z[0])+cy1)/2+sm*.36),sm,'A COIN LANDS IN THE GOLD',{a:'end',c:S.AMB});
  }else{lit+=`<line x1="${cx0}" y1="${Y(0).toFixed(1)}" x2="${cx1}" y2="${Y(0).toFixed(1)}" stroke="${S.AMB}" stroke-width="2.4"/>`;over+=t(cx0-12,Y(0)+sm*.36,sm,'$0',{a:'end',c:S.AMB});
    const all=[].concat(...X.MS.map(m=>w.ser[m])),top=Math.max(...all),bot=Math.min(...all);
    /* gridlines every $50K so the scale reads as money */
    for(let v=Math.ceil(lo/5e4)*5e4;v<=hi;v+=5e4)if(v)under+=`<line x1="${cx0}" y1="${Y(v).toFixed(1)}" x2="${cx1}" y2="${Y(v).toFixed(1)}" stroke="#7dffb0" stroke-opacity=".11" stroke-width="1.2"/>`;
    /* label the $50K gridlines (not the extremes: the top one sat under the painted glare), skipping the top band */
    for(let v=Math.ceil(lo/5e4)*5e4;v<=hi;v+=5e4)if(v&&Y(v)>cy0+sm*1.6&&Y(v)<cy1-sm*.6)over+=t(cx0-12,Y(v)+sm*.36,sm,S.k$(v).replace('.0K','K'),{a:'end',c:S.DIM,op:.85})}
  lit+=t(cx0,cy1+sm+6,sm,'R1',{c:S.DIM,op:.8})+t(cx1,cy1+sm+6,sm,'R'+n,{a:'end',c:S.DIM,op:.8})+t((cx0+cx1)/2,cy1+sm+6,sm,ac?'ROUND BY ROUND':'$100K ON EVERY TRADE',{a:'middle',c:S.DIM,op:.6});
  const L=S8.lead(X);
  rank.slice().reverse().sort((a,b)=>(a===L)-(b===L)).forEach(m=>{const p=ser(m),ld=m===L;
    lit+=`<path class="s8-tr" pathLength="1" d="${p.map((v,i)=>(i?'L':'M')+Xp(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${S8.col(X,m)}" stroke-width="${ld?4.6:3.4}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`});
  rank.forEach(m=>{const p=ser(m);lit+=`<circle cx="${cx1.toFixed(1)}" cy="${Y(p[p.length-1]).toFixed(1)}" r="${m===L?9:7}" fill="${S8.col(X,m)}"/>`});
  return {lit,under,over}};
S8.scope=(el,X,kind)=>{const s=S8.chart(X,kind);return S.stage(el,{img:SI,ar:SAR,crop:SCROP,lit:s.lit,under:s.under,over:s.over,glass:[[GL[0],GL[1],GL[2],GL[3],16]],glare:.3,
  label:kind==='acc'?'Scope: each AI’s hit rate round by round against the gold range a coin flip lands in':'Scope: each AI’s P&L round by round, $100K on every trade, the season'})};
/* ---------- the key: ranked rows under each chart (position and size carry the rank; colour names the line) ---------- */
S8.rowsAcc=X=>`<ol class="s8-rows" aria-hidden="true">${S.rows(X).map((r,i)=>{const v=S8.verdict(r);return `<li class="s8-r${i?'':' s8-r1'}" style="--c:${S8.col(X,r.m)}"><i class="s8-sw"></i><b class="s8-nm">${S.NM[r.m]}</b><span class="s8-big">${S.pc(r.hr)}</span><span class="s8-wl"><em class="s8u">${r.W}</em>-<em class="s8d">${r.L}</em></span><span class="s8-tg s8-${v}">${TAG[v]}</span></li>`}).join('')}</ol>`;
S8.rowsPnl=X=>{const w=X.W.season;return `<ol class="s8-rows" aria-hidden="true">${w.rank.map((m,i)=>{const v=w.tot[m];return `<li class="s8-r${i?'':' s8-r1'}" style="--c:${S8.col(X,m)}"><i class="s8-sw"></i><b class="s8-nm">${S.NM[m]}</b><span class="s8-big ${v>=0?'s8u':'s8d'}">${S.$f(v)}</span><span class="s8-wl"><em class="s8u">${X.A[m].W}</em>-<em class="s8d">${X.A[m].L}</em></span></li>`}).join('')}</ol>`};
/* ---------- words (sol6 D, approved), front-loaded, before each picture (lesson 135) ---------- */
S8.lineAcc=X=>{const r=S.rows(X)[0];return `<b>Hit rate:</b> how often a trade went the right way. ${S.NM[r.m]}: <b>${r.W} of ${r.t}</b>. A coin flip lands <b>${r.lo} to ${r.hi} of ${r.t}</b>.`};
S8.linePnl=X=>`<b>P&amp;L:</b> $100K on every trade, the whole season, <b>${X.W.season.n} rounds</b>. No leverage, before fees.`;
S8.kick=(n,l)=>`<p class="s8-k"><i>${n}</i>${l}</p>`;
S8.tables=X=>S.table(X,{view:'acc',win:'season'})+S.table(X,{view:'pnl',win:'season'});
/* ---------- compose: beat 1 (the take's own) + beat 2 + beat 3 ---------- */
S8.take=b1=>({id:'s8'+b1.id,html(X){return `<div class="p5-bleed s8">${P5.head('Smart or','lucky?')}
   <section class="s8-b s8-b1" aria-label="What luck looks like">${S8.kick(1,b1.kick)}${b1.html(X)}</section>
   <div class="s8-23">
   <section class="s8-b s8-b2" aria-label="Hit rate">${S8.kick(2,'Right way, round by round')}<p class="s8-ln">${b1.line2?b1.line2(X):S8.lineAcc(X)}</p><div class="s7-st s8-sc s8-acc"></div>${S8.rowsAcc(X)}</section>
   <section class="s8-b s8-b3" aria-label="P&amp;L">${S8.kick(3,'Money, round by round')}<p class="s8-ln">${S8.linePnl(X)}</p><div class="s7-st s8-sc s8-pnl"></div>${S8.rowsPnl(X)}</section>
   </div>${S8.tables(X)}</div>`},
 draw(box,X){b1.draw(box.querySelector('.s8-b1'),X);S8.scope(box.querySelector('.s8-acc'),X,'acc');S8.scope(box.querySelector('.s8-pnl'),X,'pnl')}});
S8.mount=b1=>{const b=document.querySelector('#learn .p5');if(b)b.className='p5 p5-s8 p5-s8'+b1.id;P5.mountProof(S8.take(b1))};
/* a coin's face, struck (sol7 C): words pressed into the gold, not lit */
S8.strike=(x,y,k,rot,lines)=>{const c='#5a3604',lp='#ffe7a0';return `<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${k*.66} ${k})" opacity=".92">${lines.map(([dy,sz,s])=>`<text x="0" y="${dy}" font-size="${sz}" text-anchor="middle" font-family="Anton,sans-serif" fill="${c}" stroke="${lp}" stroke-width="1.6" paint-order="stroke" style="letter-spacing:.02em">${s}</text>`).join('')}</g>`};
})();
