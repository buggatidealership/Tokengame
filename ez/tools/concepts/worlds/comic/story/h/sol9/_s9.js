/* H28 sol9: Smart or lucky in two beats, a new world. Mockup only, laid over the built v46-live-x2plus.html on the live P5
   engine (x2p_more.js) and the helpers of sol7 (_s7.js: S7.range, the exact binomial range) and sol8 (_s8.js: S8.zone, S8.env,
   S8.lead, S8.verdict, the approved sentences, the screen-reader tables).
   Two beats only, one under the other: 1 direction (the hit rate, round by round, the coin's exact range in gold), 2 the money
   (flat P&L, season only). No explainer beat, no coins counted, no selector, no buttons. Words before the picture (lesson 135),
   a ranked key under each picture (lesson 136, 131), gold = the golden ticket holder (season P&L #1, the AI we follow).
   Each world (a.js .. d.js) only says how a chart is drawn and how its key is dressed:
     S9.mount({id, kick:[k1,k2], svg(X,kind,W,H,geo) -> svg markup, h(W,kind) -> chart height, col(X,m) -> colour, tag?}).
   Everything is drawn at the chart's real CSS pixel size (viewBox = its width), so a font-size is a CSS px size. */
(function(){const P5=window.P5,S=window.S7,S8=window.S8,S9=window.S9={};
S9.NM=P5.NM;S9.esc=P5.esc;
/* ---------- geometry shared by every world ---------- */
S9.geo=function(X,kind,box){const ac=kind==='acc',w=X.W.season,[cx0,cy0,cx1,cy1]=box;let n,rank,ser,lo,hi;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8}
  else{n=w.n;rank=w.rank;ser=m=>w.ser[m];const all=[].concat(...X.MS.map(m=>w.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.07;lo=a-pd;hi=b+pd}
  const Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0),Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  const pts=m=>ser(m).map((v,i)=>[Xp(i),Y(v)]);
  const d=p=>p.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');
  const g={ac,n,rank,ser,lo,hi,Y,Xp,pts,d,cx0,cx1,cy0,cy1,lead:S8.lead(X)};
  if(ac){/* the coin's exact binomial range, drawn as an envelope (sol8): at the last round exactly S7.range(n) */
    const E=S8.env(n,S8.zone);g.up=E.map((z,i)=>[Xp(i),Y(z[1])]);g.dn=E.map((z,i)=>[Xp(i),Y(z[0])]);
    g.band=d(g.up)+' L'+g.dn.slice().reverse().map(q=>q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' L')+'Z';g.R=S.range(n);
    g.grid=[.3,.4,.5,.6,.7,.8];g.base=.5;g.fmt=v=>Math.round(v*100)+'%'}
  else{g.grid=[];for(let v=Math.ceil(lo/5e4)*5e4;v<=hi;v+=5e4)g.grid.push(v);g.base=0;g.fmt=v=>v?P5.k$(v).replace('.0K','K'):'$0'}
  /* draw order: the others first, the golden ticket holder last (on top) */
  g.order=rank.slice().reverse().sort((a,b)=>(a===g.lead)-(b===g.lead));
  return g};
/* ---------- the key: ranked rows under the picture (position and size carry the rank; colour names the line) ---------- */
const TAG={past:'Past the gold',in:'In the gold',under:'Under the gold'};
S9.rows=(X,kind,col,tag)=>{tag=tag||TAG;
  if(kind==='acc')return `<ol class="s9-rows" aria-hidden="true">${S.rows(X).map((r,i)=>{const v=S8.verdict(r);
    return `<li class="s9-r${i?'':' s9-r1'}" style="--c:${col(X,r.m)}"><i class="s9-sw"></i><b class="s9-nm">${S9.NM[r.m]}</b><span class="s9-big">${S.pc(r.hr)}</span><span class="s9-wl"><em class="s9u">${r.W}</em>-<em class="s9d">${r.L}</em></span><span class="s9-tg s9-${v}">${tag[v]}</span></li>`}).join('')}</ol>`;
  const w=X.W.season;return `<ol class="s9-rows s9-rows-p" aria-hidden="true">${w.rank.map((m,i)=>{const v=w.tot[m];
    return `<li class="s9-r${i?'':' s9-r1'}" style="--c:${col(X,m)}"><i class="s9-sw"></i><b class="s9-nm">${S9.NM[m]}</b><span class="s9-big ${v>=0?'s9u':'s9d'}">${S.$f(v)}</span><span class="s9-wl"><em class="s9u">${X.A[m].W}</em>-<em class="s9d">${X.A[m].L}</em></span></li>`}).join('')}</ol>`};
/* ---------- words: sol6 D (approved) and sol8's P&L line; the kicker is the beat's number and label ---------- */
S9.kick=(n,l)=>`<p class="s9-k"><i>${n}</i><span>${l}</span></p>`;
/* svg text at CSS px: t(x,y,size,str,{a,c,ff,op,ls,w,raw}) */
S9.t=(x,y,s,str,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||'#f8f0d9'}"${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,sans-serif'}"${o.w?` font-weight="${o.w}"`:''}${o.op?` opacity="${o.op}"`:''}${o.x?' '+o.x:''}>${o.raw||P5.esc(str)}</text>`};
let uid=0;S9.uid=()=>'s9'+(uid++);
/* ---------- compose and mount ---------- */
S9.take=W=>({id:'s9'+W.id,html(X){const k=W.kick||['Right way, round by round','Money, round by round'];
  return `<div class="p5-bleed s9 s9w-${W.id}${W.cls?" "+W.cls:""}">${P5.head('Smart or','lucky?')}
   <section class="s9-b s9-b1" aria-label="Hit rate">${W.pre?W.pre(X,'acc'):''}${W.head?W.head(1,k[0],X,'acc'):`<div class="s9-w">${S9.kick(1,k[0])}<p class="s9-ln">${S8.lineAcc(X)}</p></div>`}<div class="s9-pic"><div class="s9-ch" data-k="acc"></div>${W.rows?W.rows(X,'acc'):S9.rows(X,'acc',W.col,W.tag)}</div></section>
   <section class="s9-b s9-b2" aria-label="P&amp;L">${W.pre?W.pre(X,'pnl'):''}${W.head?W.head(2,k[1],X,'pnl'):`<div class="s9-w">${S9.kick(2,k[1])}<p class="s9-ln">${S8.linePnl(X)}</p></div>`}<div class="s9-pic"><div class="s9-ch" data-k="pnl"></div>${W.rows?W.rows(X,'pnl'):S9.rows(X,'pnl',W.col)}</div></section>
   ${S8.tables(X)}</div>`},
 draw(box,X){box.querySelectorAll('.s9-ch').forEach(el=>{const k=el.dataset.k,Wd=Math.max(240,Math.round(el.clientWidth)||358),H=Math.round(W.h(Wd,k));
   el.style.height=H+'px';el.innerHTML=`<svg class="s9-svg" viewBox="0 0 ${Wd} ${H}" width="${Wd}" height="${H}" role="img" aria-label="${k==='acc'?'Each AI’s hit rate round by round, against the gold range a fair coin lands in':'Each AI’s P&L round by round, $100K on every trade, the season'}">${W.svg(X,k,Wd,H)}</svg>`});
   W.after&&W.after(box,X)}});
S9.mount=W=>{const b=document.querySelector('#learn .p5');if(b){const n=document.createElement('div');n.className='p5 p5-s9 p5-s9'+W.id;b.replaceWith(n)}P5.mountProof(S9.take(W))};
})();
