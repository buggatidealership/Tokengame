/* H28 sol9, A3's content as a kit (A4 and the worlds W1..W4): the caption heads, the two small tables (equal gaps around W-L,
   Last round on the money table), the four lines with no coin band, and a divider between the two charts. A world only says how
   its ground, grid, labels, lines and line ends are drawn (S9.A3.make(id, style)). Loaded by run.js before every take; it does
   nothing until a take calls it. */
(function(){const S=window.S7,S8=window.S8,S9=window.S9,P5=window.P5,A=S9.A3={};
A.head=(n,l,X,k)=>`<div class="s9a2-cap"><small>${k==='acc'?'Hit rate':'P&amp;L'}</small><span class="s9a2-tab">${n}</span>${l}</div>`;
A.rows=col=>function(X,kind){const P=X.P,acc=kind==='acc',ord=acc?X.arank:X.W.season.rank;
  const trades=m=>{const a=[];X.RS.forEach(r=>{const e=P[m].per[r.n];if(e)a.push(e.v)});return a};
  const box=v=>`<i class="s9a2-bx ${v>0?'w':'l'}">${v>0?'W':'L'}</i>`;
  return `<div class="s9a2-t s9a3-t" role="presentation" aria-hidden="true"><div class="s9a2-h"><span></span><span class="c2">${acc?'Last 5':'Last round'}</span><span class="c3">W-L</span><span class="c4">${acc?'Hit rate':'P&amp;L'}</span></div>${ord.map(m=>{const a=X.A[m],v=X.W.season.tot[m],tr=trades(m),lr=tr[tr.length-1];
   return `<div class="s9a2-r" style="--c:${col(X,m)}"><b class="s9a2-nm"><i class="s9a2-sw"></i>${S9.NM[m]}</b>${acc?`<span class="s9a2-l5 c2">${tr.slice(-5).map(box).join('')}</span>`:`<span class="s9a2-f c2 ${lr>=0?'s9u2':'s9d2'}">${S.$f(lr)}</span>`}<span class="s9a2-f c3"><em class="s9u2">${a.W}</em>-<em class="s9d2">${a.L}</em></span><span class="s9a2-f c4 ${acc?'':v>=0?'s9u2':'s9d2'}">${acc?S.pc(a.hr):S.$f(v)}</span></div>`}).join('')}</div>`};
/* the chart, drawn by a style: st.pad(big)=[l,t,r,b], st.defs(u), st.ground(w,h,u), st.grid, st.lab, st.base, st.tick(x,y,u),
   st.line(d,c,ld,u), st.start(x,y,u), st.end(x,y,c,ld,u), st.over(w,h,u) */
A.chart=(st,col)=>function(X,kind,w,h){const u=S9.uid(),t=S9.t,big=w>=560,sm=big?(st.smB||13.5):(st.sm||12.5),L=st.lab;
  const pd=st.pad(big,kind),g=S9.geo(X,kind,[pd[0],pd[1],w-pd[2],h-pd[3]]),{Y,Xp,cx0,cx1,cy0,cy1}=g;
  let s=`<defs>${st.defs?st.defs(u):''}</defs>`+(st.ground?st.ground(w,h,u):'');
  g.grid.forEach(v=>{if(v===g.base)return;const y=Y(v).toFixed(1);s+=`<line x1="${cx0}" y1="${y}" x2="${cx1}" y2="${y}" stroke="${st.grid.c}" stroke-opacity="${st.grid.op}" stroke-width="${st.grid.w||1}"${st.grid.dash?` stroke-dasharray="${st.grid.dash}" stroke-linecap="round"`:''}/>`});
  g.grid.forEach(v=>{const y=Y(v);if(y<cy0-2||y>cy1+2)return;s+=t(cx0-7,y+sm*.36,sm,g.fmt(v),{a:'end',ff:L.ff,w:L.w,c:v===g.base?L.bc:L.c,op:v===g.base?1:L.op})});
  s+=`<line x1="${cx0}" y1="${Y(g.base).toFixed(1)}" x2="${cx1}" y2="${Y(g.base).toFixed(1)}" stroke="${st.base.c}" stroke-opacity="${st.base.op||1}" stroke-width="${st.base.w||1.4}"${st.base.dash?` stroke-dasharray="${st.base.dash}"`:''}/>`;
  if(st.tick)for(let i=10;i<g.n;i+=10)s+=st.tick(Xp(i),cy1+9,u);
  const ay=cy1+sm+(st.ay||12),mid=g.ac?'ROUND BY ROUND':(w>=380?'$100K ON EVERY TRADE · NO LEVERAGE':'$100K ON EVERY TRADE'),cap=s=>st.lower?s.replace(/\B[A-Z]+/g,x=>x.toLowerCase()):s;
  s+=t(cx0,ay,sm,'R1',{ff:L.ff,w:L.w,c:L.c,op:L.op})+t(cx1,ay,sm,'R'+g.n,{a:'end',ff:L.ff,w:L.w,c:L.c,op:L.op});
  if(cap(mid).length*sm*(L.k||.5)<(cx1-cx0)-70)s+=t((cx0+cx1)/2,ay,sm,cap(mid),{a:'middle',ff:L.ff,w:L.w,c:L.c,op:L.op*.75,ls:L.ls||'.06em'});
  g.order.forEach(m=>{s+=st.line(g.d(g.pts(m)),col(X,m),m===g.lead,u)});
  if(st.start)s+=st.start(cx0,Y(g.base),u);
  g.rank.forEach(m=>{const p=g.pts(m),q=p[p.length-1];s+=st.end(q[0],q[1],col(X,m),m===g.lead,u)});
  return s+(st.over?st.over(w,h,u):'')};
/* a take: the style, its colours, an optional divider (html put between the two beats on every draw) */
A.make=(id,st)=>{const col=st.col||((X,m)=>m===S8.lead(X)?S.GD:S.INK[m]);
  return {id,col,cls:st.cls,kick:['Right way, round by round','Money, round by round'],head:A.head,rows:A.rows(col),h:st.h||((w,k)=>w>=560?Math.round(w*.47):Math.round(w*.76)),svg:A.chart(st,col),
   after(box,X){const b2=box.querySelector('.s9-b2');if(st.div&&b2&&!box.querySelector('.s9-div'))b2.insertAdjacentHTML('beforebegin',`<div class="s9-div" aria-hidden="true">${st.div(X)}</div>`)}}};
/* the etched board (A3), as a style */
A.ETCH={pad:(big,k)=>[big?62:46,big?26:18,big?24:16,big?42:34],
 defs:u=>`<linearGradient id="${u}cu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".5" stop-color="#ffcc33"/><stop offset="1" stop-color="#b47a0c"/></linearGradient>`,
 grid:{c:'#efe6c6',op:.22,dash:'1 4'},lab:{ff:"'Barlow Condensed',sans-serif",w:800,c:'#efe6c6',op:.78,bc:'#ffd21f',ls:'.08em'},base:{c:'#ffcc33',op:.75},
 tick:(x,y)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#04130a" stroke="#ffcc33" stroke-opacity=".75" stroke-width="1.2"/>`,
 line:(d,c,ld)=>{const sw=ld?3.6:2.6;return `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="${sw+2.4}" stroke-linejoin="round" stroke-linecap="round" transform="translate(0 1.2)"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity="${ld?.55:.32}" stroke-width=".8" stroke-linejoin="round" transform="translate(0 -${(sw*.28).toFixed(2)})"/>`},
 start:(x,y,u)=>`<circle cx="${x}" cy="${y.toFixed(1)}" r="5.5" fill="url(#${u}cu)" stroke="#000" stroke-opacity=".5"/><circle cx="${x}" cy="${y.toFixed(1)}" r="2" fill="#04130a"/>`,
 end:(x,y,c,ld)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?6.5:5}" fill="${c}" stroke="#000" stroke-opacity=".55"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?2.4:1.9}" fill="#04130a"/>`};
})();
