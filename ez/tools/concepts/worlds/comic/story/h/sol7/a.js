/* A · THE TALLY, THEN THE SCOPE. Beat 1: a bar-graph module with the coin set into it. One slot per AI, one segment per trade
   (green: went the right way, dark red: didn't), the coin's range for that many trades as a gold bracket; the top slot is the
   coin itself over 80 flips. Whoever's green runs past its gold bracket did what a coin rarely does. Beat 2: the scope, wider,
   no label column, the key in coloured rows under the chart. The switch: one plain two-way pill above the scope (page UI, the
   most obvious control), the windows as a second smaller pill that appears only on P&L. Paintings: s7-tally, s7-wide-clean. */
(function(){const P5=window.P5,S=window.S7,t=S.t;
const TI='media/s7-tally.jpg',TAR=.5625,TCROP=[18,48,982,492],COIN=[223,266,108],
 SLOT=[[402,112,906,154],[402,177,906,219],[402,242,906,284],[402,307,906,349],[402,372,906,414]];
const SI='media/s7-wide-clean.jpg',SAR=.75,SCROP=[30,70,970,672],GL=[99,127,900,611];
function tally(X){let lit='',under='',ink='';const R=S.rows(X),T=Math.max(...R.map(r=>r.t)),lab=32,LW=182;
  /* the coin's face: struck, not lit */
  const [cx,cy]=COIN,c='#5a3604',lp='#ffe7a0',st=(y,sz,s)=>`<text x="${cx}" y="${cy+y}" font-size="${sz}" text-anchor="middle" font-family="Anton,sans-serif" fill="${c}" stroke="${lp}" stroke-width="1.4" paint-order="stroke" letter-spacing="1">${s}</text>`;
  ink+=st(-46,30,'A COIN FLIP')+st(42,96,'50%')+st(82,28,'RIGHT WAY');
  const rows=[{coin:true,m:null,t:T,W:Math.round(T/2),...S.range(T)}].concat(R);
  rows.forEach((r,i)=>{const [x0,y0,x1,y1]=SLOT[i],sx0=x0+10,sx1=x1-LW,per=(sx1-sx0)/T,h=y1-y0,by=y0+h*.22,bh=h*.56;
    /* tens: faint ticks so the scale reads as counted trades */
    for(let k=10;k<=T;k+=10)under+=`<line x1="${(sx0+k*per).toFixed(1)}" y1="${y0+3}" x2="${(sx0+k*per).toFixed(1)}" y2="${y1-3}" stroke="#7dffb0" stroke-opacity=".12" stroke-width="1.2"/>`;
    if(r.coin){lit+=`<rect x="${sx0}" y="${by}" width="${(r.W*per).toFixed(1)}" height="${bh}" rx="2" fill="${S.AMB}" fill-opacity=".55"/>`}
    else{lit+=`<rect x="${sx0}" y="${by}" width="${(r.W*per).toFixed(1)}" height="${bh}" rx="2" fill="${S.UP}"/>`;
      under+=`<rect x="${(sx0+r.W*per).toFixed(1)}" y="${by}" width="${(r.L*per).toFixed(1)}" height="${bh}" rx="2" fill="#a3221a" fill-opacity=".75"/>`}
    /* the bracket: where a coin's count lands for this many trades */
    const bx0=sx0+r.lo*per,bx1=sx0+r.hi*per;
    lit+=`<rect x="${bx0.toFixed(1)}" y="${y0+4}" width="${(bx1-bx0).toFixed(1)}" height="${h-8}" rx="3" fill="${S.GD}" fill-opacity=".14" stroke="${S.GD}" stroke-width="2.6"/>`;
    /* the label in the slot's right end: who, and the count */
    const lx=x1-12,ly=y0+h/2+lab*.36,nm=r.coin?'A COIN':S.NM[r.m].toUpperCase(),col=r.coin?S.AMB:S.col(X,r.m),cnt=r.coin?`${r.lo}–${r.hi}`:`${r.W}/${r.t}`;
    lit+=t(lx,ly,lab,'',{a:'end',raw:`<tspan fill="${col}" font-size="${lab*.86}">${nm}</tspan> <tspan fill="${r.beyond?S.UP:S.CR}">${cnt}</tspan>`})});
  return {lit,under,ink}}
P5.take={id:'s7a',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}
  ${S.kick(1,'A coin vs the four')}<div class="s7-st s7-b1"></div><p class="s7-ln">${S.line(X,{view:'acc'})}</p>
  ${S.kick(2,'Round by round')}${S.pill(V,'s7-pill')}<div class="s7-st s7-b2"></div>${V.view==='pnl'?`<p class="s7-ln">${S.line(X,V)}</p>`:''}${S.table(X,V)}</div>`},
 draw(box,X,V){const a=tally(X);S.stage(box.querySelector('.s7-b1'),{img:TI,ar:TAR,crop:TCROP,lit:a.lit,under:a.under,ink:a.ink,glass:SLOT.map(s=>[s[0],s[1],s[2],s[3],8]),glare:.35,bloom:1.6,
   label:'Bar graph: each AI’s trades, right way in green, against the gold range a coin flip lands in'});
  const s=S.scope(X,V,GL,{sm:30,lab:36,padL:84});S.stage(box.querySelector('.s7-b2'),{img:SI,ar:SAR,crop:SCROP,lit:s.lit,under:s.under,over:s.over,glass:[[GL[0],GL[1],GL[2],GL[3],16]],glare:.3,
   label:V.view==='acc'?'Scope: each AI’s hit rate round by round against where a coin lands':'Scope: P&L if you’d bet $100K on every trade'})}};
})();
