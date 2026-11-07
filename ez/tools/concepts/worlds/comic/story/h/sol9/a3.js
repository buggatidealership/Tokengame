/* A3 · A2 with the money table's "Last round" and equal gaps around W-L (owner, 2026-11-02).
   A2 · ETCHED, SIMPLIFIED (owner's pick of sol9, 2026-11-02): A without the coin's gold pour, without the sentences, the heads
   as How a round works' caption boxes, the key as a small table (model | Last 5 | W-L | Hit rate or P&L), one continuous board.
   A · ETCHED: the trace on the board between the chips. Meet the models put each AI in a chip on a green board; here the
   same board, seen between the chips, carries each AI's record as a copper trace. Every trace starts on one pad at 50/50
   (where a coin starts) and runs round by round. The coin's exact range is a gold-plated pour on the board: a coin's trace
   would stay on the gold. A trace that leaves the plating did something a coin rarely does; one that stays on it could be luck.
   The P&L beat is the same board's second layer: $0 is the ground plane, money is height. All drawn in code. */
(function(){const S=window.S7,S9=window.S9,P5=window.P5;
const W={id:'a3',
 col:(X,m)=>m===window.S8.lead(X)?S.GD:S.INK[m],
 kick:['Right way, round by round','Money, round by round'],
 /* the head: How a round works' caption box (round3 take B): a small label, the red number tab, the line; no sentence */
 head:(n,l,X,k)=>`<div class="s9a2-cap"><small>${k==='acc'?'Hit rate':'P&amp;L'}</small><span class="s9a2-tab">${n}</span>${l}</div>`,
 /* the key as a small table: column titles once, every figure one size, rank by order only */
 /* A3: the money table's second column is "Last round" (what each AI made or lost on its last trade: flat $100K x its direction
    x the move, the per-round value of __x2pPnl). Columns are content-sized with one gap, figures in column 2 end at its right
    edge, W-L is centred, column 4 starts at its left edge: so (col 2's end -> W-L) = (W-L -> col 4's start) on every row. */
 rows(X,kind){const P=X.P,acc=kind==='acc',ord=acc?X.arank:X.W.season.rank;
  const trades=m=>{const a=[];X.RS.forEach(r=>{const e=P[m].per[r.n];if(e)a.push(e.v)});return a};
  const box=v=>`<i class="s9a2-bx ${v>0?'w':'l'}">${v>0?'W':'L'}</i>`;
  return `<div class="s9a2-t s9a3-t" role="presentation" aria-hidden="true"><div class="s9a2-h"><span></span><span class="c2">${acc?'Last 5':'Last round'}</span><span class="c3">W-L</span><span class="c4">${acc?'Hit rate':'P&amp;L'}</span></div>${ord.map(m=>{const a=X.A[m],v=X.W.season.tot[m],tr=trades(m),lr=tr[tr.length-1];
   return `<div class="s9a2-r" style="--c:${W.col(X,m)}"><b class="s9a2-nm"><i class="s9a2-sw"></i>${S9.NM[m]}</b>${acc?`<span class="s9a2-l5 c2">${tr.slice(-5).map(box).join('')}</span>`:`<span class="s9a2-f c2 ${lr>=0?'s9u2':'s9d2'}">${S.$f(lr)}</span>`}<span class="s9a2-f c3"><em class="s9u2">${a.W}</em>-<em class="s9d2">${a.L}</em></span><span class="s9a2-f c4 ${acc?'':v>=0?'s9u2':'s9d2'}">${acc?S.pc(a.hr):S.$f(v)}</span></div>`}).join('')}</div>`},
 h:(w,k)=>w>=560?Math.round(w*.47):Math.round(w*.76),
 svg(X,kind,w,h){const u=S9.uid(),t=S9.t,sm=w>=560?13.5:12.5,big=w>=560;
  const g=S9.geo(X,kind,[big?62:46,big?26:18,w-(big?24:16),h-(big?42:34)]),{Y,Xp,cx0,cx1,cy0,cy1}=g;
  let s=`<defs>
   <pattern id="${u}h" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" fill="#ffcc33" fill-opacity=".10"/><line x1="0" y1="0" x2="0" y2="6" stroke="#ffd65a" stroke-opacity=".38" stroke-width="1.2"/></pattern>
   <linearGradient id="${u}cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".5" stop-color="#ffcc33"/><stop offset="1" stop-color="#b47a0c"/></linearGradient>
  </defs>`;
  /* silkscreen grid and its labels (the board's own print) */
  g.grid.forEach(v=>{const y=Y(v).toFixed(1);if(v===g.base)return;s+=`<line x1="${cx0}" y1="${y}" x2="${cx1}" y2="${y}" stroke="#efe6c6" stroke-opacity=".22" stroke-width="1" stroke-dasharray="1 4" stroke-linecap="round"/>`});
  g.grid.forEach(v=>{const y=Y(v);if(y<cy0-2||y>cy1+2)return;s+=t(cx0-7,y+sm*.36,sm,g.fmt(v),{a:'end',ff:"'Barlow Condensed',sans-serif",w:800,c:v===g.base?'#ffd21f':'#efe6c6',op:v===g.base?1:.78})});
  /* the base: 50/50 (or $0) as the ground plane, plated */
  s+=`<line x1="${cx0}" y1="${Y(g.base).toFixed(1)}" x2="${cx1}" y2="${Y(g.base).toFixed(1)}" stroke="#ffcc33" stroke-opacity=".75" stroke-width="1.4"/>`;
  /* the x axis: vias every 10 rounds (the board's own marks), R1 and the last round */
  for(let i=10;i<g.n;i+=10)s+=`<circle cx="${Xp(i).toFixed(1)}" cy="${(cy1+9).toFixed(1)}" r="2.4" fill="#04130a" stroke="#ffcc33" stroke-opacity=".75" stroke-width="1.2"/>`;
  s+=t(cx0,cy1+sm+12,sm,'R1',{ff:"'Barlow Condensed',sans-serif",w:800,c:'#efe6c6',op:.75})+t(cx1,cy1+sm+12,sm,'R'+g.n,{a:'end',ff:"'Barlow Condensed',sans-serif",w:800,c:'#efe6c6',op:.75})+
   t((cx0+cx1)/2,cy1+sm+12,sm,g.ac?'ROUND BY ROUND':(w>=380?'$100K ON EVERY TRADE · NO LEVERAGE':'$100K ON EVERY TRADE'),{a:'middle',ff:"'Barlow Condensed',sans-serif",w:800,c:'#efe6c6',op:.55,ls:'.08em'});
  /* the traces: a shadow cut into the mask, the copper in the AI's colour, a highlight along its top edge */
  g.order.forEach(m=>{const d=g.d(g.pts(m)),ld=m===g.lead,c=W.col(X,m),sw=ld?3.6:2.6;
    s+=`<path d="${d}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="${sw+2.4}" stroke-linejoin="round" stroke-linecap="round" transform="translate(0 1.2)"/>`+
     `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`+
     `<path d="${d}" fill="none" stroke="#fff" stroke-opacity="${ld?.55:.32}" stroke-width=".8" stroke-linejoin="round" transform="translate(0 -${(sw*.28).toFixed(2)})"/>`});
  /* one pad where every trace starts (50/50, or $0), and a pad where each ends */
  s+=`<circle cx="${cx0}" cy="${Y(g.base).toFixed(1)}" r="5.5" fill="url(#${u}cu)" stroke="#000" stroke-opacity=".5"/><circle cx="${cx0}" cy="${Y(g.base).toFixed(1)}" r="2" fill="#04130a"/>`;
  g.rank.forEach(m=>{const p=g.pts(m),q=p[p.length-1],ld=m===g.lead;s+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${ld?6.5:5}" fill="${W.col(X,m)}" stroke="#000" stroke-opacity=".55"/><circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${ld?2.4:1.9}" fill="#04130a"/>`});
  return s}};
S9.mount(W)})();
