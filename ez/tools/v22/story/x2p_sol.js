/* ===== H33 SMART OR LUCKY (owner, 2026-11-02: the agreed chart, H29 director's cut over sol9 A4; ported from
   tools/concepts/worlds/comic/story/h/h29/end/end.js + sol9/_a3core.js + h29/director/dir.js, without their mockup scaffolding).
   One board, one chart at a time: 1 Hit rate, "Right way, round by round" (each AI's hit rate after every graded round, (right + 1) / (calls + 2),
   so every line starts at 50/50; 30 to 80%; the 50% line), under it Last 5 (W/L boxes), W-L, Hit rate; 2 P&L, "Money, round by round"
   (the flat P&L from $0: $100K on every trade, no leverage), under it Last round, W-L, P&L. The rail tab at the board's foot,
   "Hit rate ▸ P&L", is the switch (two buttons; the arrow points from the open view to the other). Switching draws the new lines in
   (a wipe, not with reduced motion): the line drawing is the progression.
   Lines in the chips' colours with a pattern each so they stay apart for red-green colour blindness: Grok cream solid, Claude orange
   dashes, GPT violet dots, Kimi blue solid (window.X2P_MCOL, shared with Upcoming); green and red only for W/L and profit/loss.
   Type (H32): the title in Bangers gold (the section title), the narrator box cream with ink in Bangers, numbers Anton, words Shantell Sans.
   Numbers from the live engine (P5.data(), x2p_more.js: __x2pPnl, ROUNDS); nothing typed. Mounted through P5.mountProof, so the page's own
   resize redraw holds; x2p_more.js mounts T1 (the old scope take) only if this file did not. ===== */
(function(){const P5=window.P5,D=document;if(!P5||!P5.data||!P5.mountProof)return;
try{
const COL=window.X2P_MCOL=window.X2P_MCOL||{GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const DASH={CLAUDE:'7 4.5',GPT:'0.01 5'},SW={GPT:3.4};
const NM=P5.NM,esc=P5.esc,$f=P5.$f,pc=P5.pc,k$=P5.k$,CR='#efe6c6';
const lead=X=>X.W.season.rank[0];
const RM=matchMedia('(prefers-reduced-motion: reduce)');
/* svg text at CSS px */
const t=(x,y,s,str,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||CR}"${o.op?` opacity="${o.op}"`:''}${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,sans-serif'}"${o.w?` font-weight="${o.w}"`:''}>${esc(str)}</text>`};
/* ---------- the chart, drawn at the box's real CSS width (viewBox = its width, so a font size is a CSS px size) ---------- */
function chart(X,kind,w,h){const ac=kind==='acc',big=w>=560,sm=big?14:12,P=big?[62,26,24,42]:[46,18,16,34];
  const cx0=P[0],cy0=P[1],cx1=w-P[2],cy1=h-P[3],S=X.W.season;
  let n,rank,ser,lo,hi,grid,base,fmt;
  if(ac){n=X.N;rank=X.arank;ser=m=>X.A[m].s;lo=.3;hi=.8;grid=[.3,.4,.5,.6,.7,.8];base=.5;fmt=v=>Math.round(v*100)+'%'}
  else{n=S.n;rank=S.rank;ser=m=>S.ser[m];const all=[].concat(...X.MS.map(m=>S.ser[m]));const a=Math.min(0,...all),b=Math.max(0,...all),pd=(b-a||1)*.07;lo=a-pd;hi=b+pd;
    grid=[];const st=(hi-lo)>4e5?1e5:5e4;for(let v=Math.ceil(lo/st)*st;v<=hi;v+=st)grid.push(v);base=0;fmt=v=>v?k$(v).replace('.0K','K'):'$0'}
  const Y=v=>cy1-(Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*(cy1-cy0),Xp=i=>cx0+(n?i/n:0)*(cx1-cx0);
  const pts=m=>ser(m).map((v,i)=>[Xp(i),Y(v)]),d=p=>p.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ');
  let s='';
  grid.forEach(v=>{if(v===base)return;const y=Y(v).toFixed(1);s+=`<line x1="${cx0}" y1="${y}" x2="${cx1}" y2="${y}" stroke="${CR}" stroke-opacity=".22" stroke-dasharray="1 4" stroke-linecap="round"/>`});
  grid.forEach(v=>{const y=Y(v);if(y<cy0-2||y>cy1+2)return;s+=t(cx0-7,y+sm*.36,sm,fmt(v),{a:'end',op:v===base?1:.8})});
  const yb=Y(base).toFixed(1);s+=`<line x1="${cx0}" y1="${yb}" x2="${cx1}" y2="${yb}" stroke="${CR}" stroke-opacity=".55" stroke-width="1.4"/>`;
  for(let i=10;i<n;i+=10)s+=`<circle cx="${Xp(i).toFixed(1)}" cy="${(cy1+9).toFixed(1)}" r="2.2" fill="#04130a" stroke="${CR}" stroke-opacity=".55" stroke-width="1.1"/>`;
  const ay=cy1+sm+11;s+=t(cx0,ay,sm,'R1',{op:.8})+t(cx1,ay,sm,'R'+n,{a:'end',op:.8});
  if(!ac){const mid=w>=380?'$100K on every trade · no leverage':'$100K on every trade';if(mid.length*sm*.5<(cx1-cx0)-70)s+=t((cx0+cx1)/2,ay,sm,mid,{a:'middle',op:.6,ff:"'Shantell Sans',system-ui",w:800,ls:'.02em'})}
  /* the lines: the others first, the golden ticket holder (season P&L #1) last, on top; a dark under-stroke so they read on the board */
  const L=lead(X),order=rank.slice().reverse().sort((a,b)=>(a===L)-(b===L));let ln='';
  if(n)order.forEach(m=>{const p=d(pts(m)),da=DASH[m]?` stroke-dasharray="${DASH[m]}"`:'',c=COL[m]||CR;
    ln+=`<path d="${p}" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"${da} transform="translate(0 1.2)"/><path d="${p}" fill="none" stroke="${c}" stroke-width="${SW[m]||2.6}" stroke-linejoin="round" stroke-linecap="round"${da}/>`});
  s+=`<g class="sx-ln">${ln}</g>`;
  s+=`<circle cx="${cx0}" cy="${yb}" r="5" fill="${CR}" stroke="#000" stroke-opacity=".5"/><circle cx="${cx0}" cy="${yb}" r="1.9" fill="#04130a"/>`;
  if(n)rank.forEach(m=>{const p=pts(m),q=p[p.length-1];s+=`<circle class="sx-end" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="4.6" fill="${COL[m]||CR}" stroke="#000" stroke-opacity=".6"/><circle class="sx-end" cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="1.7" fill="#04130a"/>`});
  if(!n)s+=t((cx0+cx1)/2,(cy0+cy1)/2,16,'No rounds graded yet',{a:'middle',ff:"'Shantell Sans',system-ui",w:800});
  return s}
/* ---------- the table under the chart: titles once, every figure one size, rank by order ---------- */
function trades(X,m){const a=[];X.RS.forEach(r=>{const e=X.P[m].per[r.n];if(e)a.push(e.v)});return a}
function rows(X,kind){const acc=kind==='acc',S=X.W.season,ord=acc?X.arank:S.rank;
  const box=v=>`<i class="sx-bx ${v>0?'w':'l'}">${v>0?'W':'L'}</i>`;
  return `<div class="sx-t" aria-hidden="true"><div class="sx-h"><span></span><span class="c2">${acc?'Last 5':'Last<br class="sx-br"> round'}</span><span class="c3">W-L</span><span class="c4">${acc?'Hit<br class="sx-br"> rate':'P&amp;L'}</span></div>${ord.map(m=>{const a=X.A[m],v=S.tot[m],tr=trades(X,m),lr=tr[tr.length-1];
   return `<div class="sx-r" data-m="${m}" style="--c:${COL[m]||CR}"><b class="sx-nm"><i class="sx-sw"></i>${esc(NM[m])}</b>${acc?`<span class="sx-l5 c2">${tr.slice(-5).map(box).join('')}</span>`:`<span class="sx-f c2 ${lr==null?'':lr>=0?'sx-u':'sx-d'}">${lr==null?'–':$f(lr)}</span>`}<span class="sx-f c3"><em class="sx-u">${a.W}</em>-<em class="sx-d">${a.L}</em></span><span class="sx-f c4 ${acc?'':v>=0?'sx-u':'sx-d'}">${acc?pc(a.hr):$f(v)}</span></div>`}).join('')}</div>`}
/* the same table for screen readers */
function sr(X,kind){const acc=kind==='acc',S=X.W.season,ord=acc?X.arank:S.rank;
  if(acc)return `<table class="p5-sr"><caption>Hit rate: how often each AI's trade went the right way, round by round, over ${X.N} graded rounds. A coin flip gets 50%.</caption><tr><th>AI</th><th>Last 5</th><th>W-L</th><th>Hit rate</th></tr>${ord.map(m=>{const a=X.A[m];return `<tr><th>${esc(NM[m])}</th><td>${trades(X,m).slice(-5).map(v=>v>0?'W':'L').join(' ')}</td><td>${a.W}-${a.L}</td><td>${pc(a.hr)}</td></tr>`}).join('')}</table>`;
  return `<table class="p5-sr"><caption>P&amp;L if you’d bet $100K on every trade, no leverage, the season, ${S.n} rounds</caption><tr><th>AI</th><th>Last round</th><th>W-L</th><th>P&amp;L</th></tr>${ord.map(m=>{const a=X.A[m],tr=trades(X,m),lr=tr[tr.length-1];return `<tr><th>${esc(NM[m])}</th><td>${lr==null?'none':$f(lr)}</td><td>${a.W}-${a.L}</td><td>${$f(S.tot[m])}</td></tr>`}).join('')}</table>`}
/* ---------- the take ---------- */
const CAP={acc:['Hit rate','How often their long or short was right'],pnl:['P&amp;L','Money, round by round']};
let anim=false;
const take={id:'sx',html(X,V){const k=V.view==='pnl'?'pnl':'acc',c=CAP[k];
  return `<div class="p5-bleed sx sx-${k}">${P5.head('Smart or','lucky?')}
   <div class="sx-bd">
    <p class="sx-cap"><small>${c[0]}</small>${c[1]}</p>
    <div class="sx-pic"><div class="sx-ch"></div>${rows(X,k)}</div>
    <div class="sx-rail"><div class="sx-dvt" role="group" aria-label="Chart"><button type="button" data-sx="acc" aria-pressed="${k==='acc'}">Hit rate</button><b aria-hidden="true">${k==='acc'?'▸':'◂'}</b><button type="button" data-sx="pnl" aria-pressed="${k==='pnl'}">P&amp;L</button></div></div>
   </div>${sr(X,k)}</div>`},
 draw(box,X,V){const k=V.view==='pnl'?'pnl':'acc',el=box.querySelector('.sx-ch');
  if(el){const Wd=Math.max(240,Math.round(el.clientWidth)||358),Hh=Wd>=560?Math.round(Wd*.47):Math.round(Wd*.76);el.style.height=Hh+'px';
   el.innerHTML=`<svg class="sx-svg" viewBox="0 0 ${Wd} ${Hh}" width="${Wd}" height="${Hh}" role="img" aria-label="${k==='acc'?'Each AI’s hit rate round by round, from 50/50, against the 50% line':'Each AI’s P&L round by round from $0, $100K on every trade, no leverage, the season'}">${chart(X,k,Wd,Hh)}</svg>`}
  P5.fitH&&P5.fitH(box.querySelector('.p5-h'));
  if(anim&&!RM.matches){box.classList.remove('sx-go');void box.offsetWidth;box.classList.add('sx-go')}anim=false;
  box.querySelectorAll('[data-sx]').forEach(b=>b.onclick=()=>{const v=b.dataset.sx;if(V.view===v)return;V.view=v;anim=true;P5.cur.draw();const f=box.querySelector(`[data-sx="${v}"]`);f&&f.focus({preventScroll:true})})}};
P5.mountProof(take);
}catch(e){window.__x2pSolErr=e;try{console.error('x2p_sol',e)}catch(x){}}
})();
