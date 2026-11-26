/* C · THE COIN, THEN THE SCOPE. Beat 1 is an establishing picture: the coin mid-flip with "50%" struck into its face, and beside it
   the approved line set as a tale of the tape, the leader's count against the coin's range in the same units ("45 of 72" vs
   "28 to 44 of 72"), a mark between them saying which way it falls. Beat 2: the scope, wider, the key in rows under the chart.
   The switch: folder tabs standing on the scope's top edge (a tab is the most familiar "this switches the page under it"),
   the open one gold and joined to the glass's frame; on P&L the windows as three small tabs on the right. Paintings: the coin
   from sol6 (s25-coin), s7-wide-clean. */
(function(){const P5=window.P5,S=window.S7,t=S.t;
const CI='media/s25-coin.jpg',CCROP=[210,80,930,860];
const SI='media/s7-wide-clean.jpg',SAR=.75,SCROP=[30,70,970,672],GL=[99,127,900,611];
function face(){const k=.66,c='#5a3604',lp='#ffe7a0';
  const s=(y,sz,str)=>`<text x="0" y="${y}" font-size="${sz}" text-anchor="middle" font-family="Anton,sans-serif" fill="${c}" stroke="${lp}" stroke-width="1.6" paint-order="stroke" style="letter-spacing:.02em">${str}</text>`;
  return `<g transform="translate(592 478) rotate(7) scale(${k} 1)" opacity=".9">${s(-120,62,'A COIN FLIP')}${s(70,230,'50%')}${s(150,62,'RIGHT WAY')}</g>`}
function tape(X){const r=S.rows(X)[0],c=S.col(X,r.m),v=r.beyond?'beyond':r.below?'below':'inside';
  return `<div class="s7c-tape">
   <p class="s7c-cap"><b>Hit rate:</b> how often a trade went the right way.</p>
   <div class="s7c-row s7c-ai" style="--c:${c}"><span class="s7c-n">${S.NM[r.m]}</span><span class="s7c-f">${r.W}<small> of ${r.t}</small></span></div>
   <div class="s7c-vs">vs</div>
   <div class="s7c-row s7c-coin"><span class="s7c-n">A coin flip</span><span class="s7c-f">${r.lo}–${r.hi}<small> of ${r.t}</small></span></div></div>`}
P5.take={id:'s7c',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}
  ${S.kick(1,'The bar to beat')}<div class="s7c-b1"><div class="s7-st s7c-coinst"></div>${tape(X)}</div><p class="p5-sr">${S.line(X,{view:'acc'}).replace(/<[^>]+>/g,'')}</p>
  ${S.kick(2,'Every AI, round by round')}
  <div class="s7c-tabs">${S.pill(V,'s7c-tab',true,true)}</div><div class="s7-st s7-b2 s7c-scope"></div>${V.view==='pnl'?`<p class="s7-ln">${S.line(X,V)}</p>`:''}${S.table(X,V)}</div>`},
 draw(box,X,V){S.stage(box.querySelector('.s7c-coinst'),{img:CI,ar:1,crop:CCROP,ink:face(),bloom:1,label:'A gold coin mid-flip: a coin flip goes the right way 50% of the time'});
  const s=S.scope(X,V,GL,{sm:30,lab:36,padL:84});S.stage(box.querySelector('.s7-b2'),{img:SI,ar:SAR,crop:SCROP,lit:s.lit,under:s.under,over:s.over,glass:[[GL[0],GL[1],GL[2],GL[3],16]],glare:.3,
   label:V.view==='acc'?'Scope: each AI’s hit rate round by round against where a coin lands':'Scope: P&L if you’d bet $100K on every trade'})}};
})();
