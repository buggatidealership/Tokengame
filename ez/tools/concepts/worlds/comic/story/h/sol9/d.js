/* D · THE CHAIN: the record above was a chain of blocks, one per round; here the same chain runs along the foot of each chart,
   one block per round, linked left to right, and every block holds that round's four trades (one cell per AI, in the board's
   order). In beat 1 a cell is lit in the AI's colour when its trade went the right way and dark when it didn't; the line above
   is nothing but those cells added up, so you can see where every rise and fall came from. The coin's exact range is the gold
   above it. In beat 2 the same cells hold the money: green for a win, red for a loss, brighter the bigger the trade. The
   newest block is sealed in gold. Smart or lucky reads as "the chain doesn't lie": every block is on the record. */
(function(){const S=window.S7,S8=window.S8,S9=window.S9,P5=window.P5;
const W={id:'d',
 col:(X,m)=>m===S8.lead(X)?S.GD:S.INK[m],
 h:(w,k)=>w>=560?Math.round(w*.5):Math.round(w*.92),
 svg(X,kind,w,h){const u=S9.uid(),t=S9.t,big=w>=560,sm=big?13.5:12.5,bc="'Barlow Condensed',sans-serif",mono="'Chivo Mono',monospace";
  const ch=big?11:8.5,cg=big?1.5:1,chainH=ch*4+cg*3,padL=kind==='pnl'?(big?66:52):(big?50:40);
  const top=big?14:10,cy1=h-(big?30:26)-chainH-(big?36:30),g=S9.geo(X,kind,[padL,top,w-(big?16:12),cy1]),{Y,Xp,cx0,cx1,cy0}=g;
  let s=`<defs><linearGradient id="${u}gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".5" stop-color="#ffcc33"/><stop offset="1" stop-color="#9a6a08"/></linearGradient></defs>
   <rect width="${w}" height="${h}" fill="#04070e"/>`;
  g.grid.forEach(v=>{const y=Y(v);if(y<cy0-3||y>cy1+3)return;if(v!==g.base)s+=`<line x1="${cx0}" y1="${y.toFixed(1)}" x2="${cx1}" y2="${y.toFixed(1)}" stroke="#f8f0d9" stroke-opacity=".1" stroke-width="1"/>`;
    s+=t(cx0-7,y+sm*.36,sm,g.fmt(v),{a:'end',ff:bc,w:800,c:v===g.base?'#ffd21f':'#f8f0d9',op:v===g.base?1:.7})});
  if(g.ac){s+=`<path d="${g.band}" fill="#ffcc33" fill-opacity=".13"/>`;[g.up,g.dn].forEach(p=>s+=`<path d="${g.d(p)}" fill="none" stroke="#ffcc33" stroke-opacity=".8" stroke-width="1.3" stroke-dasharray="4 3"/>`);
    s+=t(cx1,cy1-6,sm,big?'A COIN’S LINE STAYS IN THE GOLD':'A COIN STAYS IN THE GOLD',{a:'end',ff:bc,w:800,c:'#ffd21f',ls:'.04em'})}
  s+=`<line x1="${cx0}" y1="${Y(g.base).toFixed(1)}" x2="${cx1}" y2="${Y(g.base).toFixed(1)}" stroke="#ffcc33" stroke-opacity=".8" stroke-width="1.4"/>`;
  /* the lines, flat ink (no glow: not a screen), the golden ticket holder last */
  g.order.forEach(m=>{const d=g.d(g.pts(m)),ld=m===g.lead;s+=`<path d="${d}" fill="none" stroke="#04070e" stroke-width="${ld?6:5}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${W.col(X,m)}" stroke-width="${ld?3:2.2}" stroke-linejoin="round" stroke-linecap="round"/>`});
  g.rank.forEach(m=>{const p=g.pts(m),q=p[p.length-1];s+=`<circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${m===g.lead?5:4}" fill="${W.col(X,m)}" stroke="#04070e" stroke-width="1.5"/>`});
  /* the chain: one block per round under its own column, four cells (the board's order), linked by a gold rail */
  const by=cy1+(big?32:27),n=g.n,bw=(cx1-cx0)/n,gap=Math.max(.8,bw*.18),rows=X.arank,P=X.P;
  let mx=1;if(!g.ac)X.RS.forEach(r=>rows.forEach(m=>{const e=P[m].per[r.n];if(e)mx=Math.max(mx,Math.abs(e.v))}));
  s+=`<rect x="${cx0-2}" y="${(by+chainH/2-1).toFixed(1)}" width="${cx1-cx0+4}" height="2" fill="url(#${u}gd)" opacity=".85"/>`;
  rows.forEach((m,j)=>{s+=P5.mark(m,cx0-(big?16:12),by+j*(ch+cg)+ch/2,big?12:8.5,W.col(X,m))});
  X.RS.forEach((r,i)=>{const x0=cx0+i*bw+gap/2,bwi=bw-gap;
    s+=`<rect x="${(x0-.6).toFixed(2)}" y="${(by-.8).toFixed(1)}" width="${(bwi+1.2).toFixed(2)}" height="${(chainH+1.6).toFixed(1)}" rx="${big?1.6:.8}" fill="#1a1406" stroke="#ffcc33" stroke-opacity="${i===n-1?1:.32}" stroke-width="${i===n-1?1.4:.6}"/>`;
    rows.forEach((m,j)=>{const e=P[m].per[r.n],y=by+j*(ch+cg);let f,op=1;
      if(!e){f='#04070e';op=1}
      else if(g.ac){f=e.v>0?W.col(X,m):'#3a1512';op=e.v>0?.95:1}
      else{f=e.v>0?'#3ee07f':'#ff5148';op=(.22+.78*Math.sqrt(Math.abs(e.v)/mx)).toFixed(2)}
      s+=`<rect x="${x0.toFixed(2)}" y="${y.toFixed(1)}" width="${bwi.toFixed(2)}" height="${ch}" fill="${f}" opacity="${op}"/>`})});
  const ly=by+chainH+sm+(big?8:6);
  for(let i=10;i<n;i+=10)s+=t(cx0+(i-.5)*bw,ly,sm-.5,'R'+i,{a:'middle',ff:bc,w:800,c:'#f8f0d9',op:.55});
  s+=t(cx0,ly,sm-.5,'R1',{ff:bc,w:800,c:'#f8f0d9',op:.7})+t(cx1+1,ly,sm-.5,'R'+n,{a:'end',ff:bc,w:800,c:'#ffd21f'});
  s+=t(cx0,by-(big?7:6),sm-.5,g.ac?(big?'EVERY BLOCK: FOUR TRADES · LIT = RIGHT WAY':'EACH BLOCK: 4 TRADES · LIT = RIGHT WAY'):(big?'EVERY BLOCK: FOUR TRADES · GREEN WON, RED LOST · BRIGHTER = BIGGER':'GREEN WON · RED LOST · BRIGHTER = BIGGER'),{ff:bc,w:800,c:'#f8f0d9',op:.6,ls:'.05em'});
  return s}};
S9.mount(W)})();
