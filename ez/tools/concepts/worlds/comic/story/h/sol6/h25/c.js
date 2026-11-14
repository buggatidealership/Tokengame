/* C · THE COIN TRAY: "count them". A bank teller's counting tray; one groove per AI, one coin standing on edge per trade, packed
   as tellers pack them: gold for a trade that went the right way, tarnished bronze for a wrong one (right ones first, so the gold
   run is the count). Over each groove a gold-leaf bracket marks where a fair coin's count lands, 95 in 100, over the same number of
   trades. The reader counts: Grok's gold runs one coin past the bracket; Claude's stops on its end. Empty slots are trades not
   made (Grok skipped 8 rounds). P&L view: each coin is $10K, gold for profit; a loss is the coins owed, drawn as red rings.
   Flip the coin in the corner to switch the view; the three words stamped in the wood are the window. */
(function(){const P5=window.P5,S=window.S25,{t}=S;
const DY=+(window.__s25dy||16),IMG='media/s25-tray.jpg',AR=1.3333,CROP=[96,150,965,1150];
/* groove centrelines in painting units (measured on the painting): left end, right end */
const GV=[[[172,380],[792,300]],[[187,524],[817,442]],[[202,666],[847,582]],[[217,806],[872,722]],[[232,946],[897,860]]].map(g=>g.map(([x,y])=>[x,y+DY]));
const SLOTS=80,U0=.035,U1=.965,HH=27;
const P=(g,u)=>{const [[x0,y0],[x1,y1]]=GV[g];return [x0+(x1-x0)*u,y0+(y1-y0)*u]};
const ANG=g=>{const [[x0,y0],[x1,y1]]=GV[g];return Math.atan2(y1-y0,x1-x0)*180/Math.PI};
const uK=k=>U0+(k-.5)/SLOTS*(U1-U0);
function coin(g,k,kind){const [x,y]=P(g,uK(k)),w=(U1-U0)/SLOTS*(GV[g][1][0]-GV[g][0][0])*.9,a=ANG(g);
  const f=kind==='r'||kind==='b'?'url(#s25cg)':kind==='w'?'url(#s25cw)':'none',st=kind==='o'?'#ff5148':kind==='b'?'#3ee07f':'#1a0d02',sw=kind==='o'?2:kind==='b'?3:1.1,da=kind==='o'?' stroke-dasharray="3 2.4"':'';
  return `<rect x="${(x-w/2).toFixed(1)}" y="${(y-HH).toFixed(1)}" width="${w.toFixed(1)}" height="${HH*2}" rx="${(w*.45).toFixed(1)}" fill="${f}" stroke="${st}" stroke-width="${sw}"${da} transform="rotate(${a.toFixed(2)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`}
const DEFS=`<defs><linearGradient id="s25cg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4f08"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".55" stop-color="#f2b631"/><stop offset="1" stop-color="#8a5a0a"/></linearGradient>
 <linearGradient id="s25cw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a1608"/><stop offset=".4" stop-color="#6b3f22"/><stop offset="1" stop-color="#2a1608"/></linearGradient></defs>`;
/* words along a groove's upper ridge, in the groove's angle */
const ridge=(g,u,dy,s,str,o)=>{const [x,y]=P(g,u);return `<g transform="rotate(${ANG(g).toFixed(2)} ${x.toFixed(1)} ${y.toFixed(1)})">${t(x,y-HH-dy,s,str,o)}</g>`};
function tray(X,V){const ac=V.view==='acc',w=X.W[V.win];let base=DEFS,lit='',ink='',rul='';const lab=31;
  if(ac){S.rows(X).forEach((r,g)=>{
      for(let k=1;k<=SLOTS;k++)base+=k<=r.W?coin(g,k,k>r.hi?'b':'r'):k<=r.t?coin(g,k,'w'):'';
      /* the coin's bracket, gold leaf over the groove's ridge */
      const [ax,ay]=P(g,uK(r.lo)-(U1-U0)/SLOTS/2),[bx,by]=P(g,uK(r.hi)+(U1-U0)/SLOTS/2),a=ANG(g);
      base+=`<g transform="rotate(${a.toFixed(2)} ${ax.toFixed(1)} ${ay.toFixed(1)})"><path d="M${ax.toFixed(1)} ${(ay-HH+2).toFixed(1)} v-12 H${(ax+Math.hypot(bx-ax,by-ay)).toFixed(1)} v12" fill="none" stroke="${S.GOLD}" stroke-width="4.5" stroke-linejoin="round"/></g>`;
      lit+=ridge(g,(uK(r.lo)+uK(r.hi))/2,20,lab*.82,`A COIN: ${r.lo}–${r.hi}`,{a:'middle',c:S.GOLD});
      lit+=ridge(g,U0,20,lab,'',{raw:`<tspan fill="${S.C[r.m]}">${S.NM[r.m].toUpperCase()}</tspan><tspan fill="${r.beyond?S.UP:S.CR}" dx="10">${r.W} OF ${r.t}</tspan>`})});
    ink+=t(150,206,38,'ONE COIN PER TRADE.',{c:S.GOLD,ls:1})+t(150,244,29,'GOLD: IT WENT THE RIGHT WAY.',{c:'#f3dfae'});
    /* the fifth groove: the coin itself, flipped as often as the most active AI. Half land gold; the bracket is its 95 in 100. */
    {const n=Math.max(...S.rows(X).map(r=>r.t)),rg=S.range(n),h=Math.round(n/2);for(let k=1;k<=n;k++)base+=coin(4,k,k<=h?'r':'w');
     const [ax,ay]=P(4,uK(rg.lo)-(U1-U0)/SLOTS/2),[bx,by]=P(4,uK(rg.hi)+(U1-U0)/SLOTS/2);
     base+=`<g transform="rotate(${ANG(4).toFixed(2)} ${ax.toFixed(1)} ${ay.toFixed(1)})"><path d="M${ax.toFixed(1)} ${(ay-HH+2).toFixed(1)} v-12 H${(ax+Math.hypot(bx-ax,by-ay)).toFixed(1)} v12" fill="none" stroke="${S.GOLD}" stroke-width="4.5"/></g>`;
     lit+=ridge(4,(uK(rg.lo)+uK(rg.hi))/2,20,lab*.82,`LANDS ${rg.lo}–${rg.hi}`,{a:'middle',c:S.GOLD})+ridge(4,U0,20,lab,'',{raw:`<tspan fill="${S.GOLD}">A COIN</tspan><tspan fill="${S.CR}" dx="10">~${h} OF ${n}</tspan>`})}
  }else{const per=5000;
    w.rank.forEach((m,g)=>{const v=w.tot[m],n=Math.min(SLOTS,Math.round(Math.abs(v)/per));for(let k=1;k<=n;k++)base+=coin(g,k,v>=0?'r':'o');
      lit+=ridge(g,U0,20,lab,'',{raw:`<tspan fill="${S.C[m]}">${S.NM[m].toUpperCase()}</tspan><tspan fill="${v>0?S.UP:v<0?S.DN:S.CR}" dx="10">${S.$f(v)}</tspan>`})});
    ink+=t(150,206,38,'ONE COIN PER $5K.',{c:S.GOLD,ls:1})+t(150,244,29,w.n?`RED RINGS: OWED. ${w.n} ROUND${w.n===1?'':'S'}, ${w.t.toUpperCase()}.`:`NO CLOSE IN ${w.t.toUpperCase()}.`,{c:'#f3dfae'});
    /* the window, stamped in the wood under the coin */
    [['season','SEASON',380],['d7','7D',560],['d1','24H',700]].forEach(([k,l,x])=>{const on=V.win===k;rul+=t(x,1052,34,l,{a:'middle',c:on?'#1e0e01':'#4a2c08',op:on?1:.82})+(on?`<line x1="${x-P5.tw(l,34)/2}" y1="1062" x2="${x+P5.tw(l,34)/2}" y2="1062" stroke="#2a1402" stroke-width="3"/>`:'')});
  }
  /* the corner coin is the view switch: its face says which side is up */
  ink+=t(700,236,30,ac?'P&L':'W-L',{a:'middle',c:'#3a2304',op:.85});
  ink=`<g transform="rotate(-7.3 500 250)">${ink}</g><g transform="rotate(-7.3 580 1040)">${rul}</g>`;
  return {base,lit,ink}}
P5.take={id:'c',html(X,V){return `<div class="p5-bleed">${P5.head('Smart or','lucky?')}<div class="s25-st"></div><p class="s25-ln">${S.line(X,V,{coin:`A coin flip lands in the <b>gold bracket</b>.`})}</p>${S.table(X,V)}</div>`},
 draw(box,X,V){const st=box.querySelector('.s25-st'),b=tray(X,V);
  S.stage(st,{img:IMG,ar:AR,crop:CROP,base:b.base,lit:b.lit,ink:b.ink,glare:0,bloom:1.2,label:V.view==='acc'?'Coin tray: one coin per trade for each AI, gold where the trade went the right way, a bracket where a fair coin lands':'Coin tray: P&L as coins of $10K'});
  st.insertAdjacentHTML('beforeend',S.hits(CROP,[{k:'v',val:V.view==='acc'?'pnl':'acc',x:640,y:170,w:125,h:120,label:V.view==='acc'?'Flip to P&L':'Flip to hit rate',on:false}]
   .concat(V.view==='pnl'?[['season','Season',540],['d7','Last 7 days',650],['d1','Last 24 hours',725]].map(([v,l,x])=>({k:'w',val:v,x:x-60,y:1000-(x-380)*.13,w:120,h:70,label:l,on:V.win===v})):[])));
  P5.vis(st)}};
})();
