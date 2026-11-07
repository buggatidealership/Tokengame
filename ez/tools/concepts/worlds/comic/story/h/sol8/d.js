/* D · COIN ROLLS. Beat 1 counts it out like a bank teller: each AI's trades as a roll of coins on edge, one coin per trade, the
   right-way trades in gold first, the wrong-way ones dark after them (sorted, so the gold is a count, not a history). Over each
   roll a gold bracket marks where a fair coin's count lands for that many trades (the exact binomial 95 in 100). The roll whose
   gold runs past its bracket did what a coin rarely does; the rest stop inside it. Ranked top to bottom, #1 largest.
   Drawn in code: one trade = one coin, 4.7 CSS px at 390 (sol7's tally was 1.5 px per trade). */
(function(){const P5=window.P5,S=window.S7,S8=window.S8,t=S.t;
const b1={id:'d',kick:'Count the coins',
 line2:X=>`<b>Hit rate</b>, round by round. Each line is an AI; the gold is where <b>a coin’s</b> line would run.`,
  html(X){return `<p class="s8-ln">One coin per trade: <b>gold</b> went the right way, dark didn’t. The bracket is where <b>a fair coin’s</b> gold would stop.</p><div class="s8d-st"></div>`},
 draw(el,X){const R=S.rows(X),T=Math.max(...R.map(r=>r.t)),x0=24,x1=976,pc=(x1-x0)/T,rh=[150,118,118,118],y0=14;let g='',y=y0;
  R.forEach((r,i)=>{const col=S8.col(X,r.m),v=S8.verdict(r),big=!i,ry=y+(big?60:48),ch=big?44:34,cw=pc*.42;
   g+=t(x0,y+(big?42:34),big?44:36,'',{raw:`<tspan fill="${col}">${S.NM[r.m].toUpperCase()}</tspan><tspan fill="${v==='past'?'#ffd21f':'#f8f0d9'}" dx="14">${r.W}</tspan><tspan fill="#9fd8b4" font-size="${big?30:28}"> OF ${r.t}</tspan>`});
   g+=t(x1,y+(big?40:30),big?32:30,`A COIN: ${r.lo}–${r.hi}`,{a:'end',c:'#ffb21a'});
   const by=ry+ch/2+6;
   for(let k=0;k<r.t;k++){const cx=x0+(k+.5)*pc,gold=k<r.W;
    g+=`<rect x="${(cx-cw).toFixed(1)}" y="${(by-ch/2+2).toFixed(1)}" width="${(cw*2).toFixed(1)}" height="${ch}" rx="${cw.toFixed(1)}" fill="${gold?'#7a4e06':'#2a1210'}"/><rect x="${(cx-cw).toFixed(1)}" y="${(by-ch/2).toFixed(1)}" width="${(cw*2).toFixed(1)}" height="${ch}" rx="${cw.toFixed(1)}" fill="url(#${gold?'s8dg':'s8dk'})"/>`}
   /* the coin's bracket over the roll: from its lowest to its highest count */
   const bx0=x0+r.lo*pc,bx1=x0+r.hi*pc,bt=by-ch/2-9;
   g+=`<path d="M${bx0.toFixed(1)} ${bt+8} V${bt} H${bx1.toFixed(1)} V${bt+8}" fill="none" stroke="#ffd21f" stroke-width="3.2"/><rect x="${bx0.toFixed(1)}" y="${(by-ch/2-2).toFixed(1)}" width="${(bx1-bx0).toFixed(1)}" height="${ch+6}" fill="#ffd21f" fill-opacity=".07"/>`;
   if(v==='past'){const ex=x0+r.W*pc;g+=`<line x1="${(x0+r.hi*pc).toFixed(1)}" y1="${by+ch/2+10}" x2="${ex.toFixed(1)}" y2="${by+ch/2+10}" stroke="#ffd21f" stroke-width="4"/>`+t(ex,by+ch/2+42,30,'PAST THE COIN',{a:'end',c:'#ffd21f'})}
   y+=rh[i]+(v==='past'?30:0)});
  const H=Math.round(y+6);
  el.querySelector('.s8d-st').style.aspectRatio=`1000/${H}`;
  el.querySelector('.s8d-st').innerHTML=`<svg class="s8d-svg" viewBox="0 0 1000 ${H}" role="img" aria-label="Each AI's trades as coins, right way in gold: ${R.map(r=>S.NM[r.m]+' '+r.W+' of '+r.t+', a coin '+r.lo+' to '+r.hi).join('; ')}.">
   <defs><linearGradient id="s8dg" x1="0" x2="1"><stop offset="0" stop-color="#a86d08"/><stop offset=".35" stop-color="#ffe27a"/><stop offset=".6" stop-color="#ffc21f"/><stop offset="1" stop-color="#9a6206"/></linearGradient>
    <linearGradient id="s8dk" x1="0" x2="1"><stop offset="0" stop-color="#2a1311"/><stop offset=".4" stop-color="#5a2a22"/><stop offset="1" stop-color="#26100e"/></linearGradient>
    <radialGradient id="s8dbk" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#14100a"/><stop offset="1" stop-color="#030504"/></radialGradient></defs>
   <rect width="1000" height="${H}" fill="url(#s8dbk)"/>${g}</svg>`}};
S8.mount(b1)})();
