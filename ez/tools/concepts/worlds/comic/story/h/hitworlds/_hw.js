/* Round H7, area hitworlds: "Smart or lucky?" as the hit rate round by round, drawn into a painted world.
   Uses ../pnl/_lib.js (PN: the flat P&L, the windows Season / 7 days / 24h, checked against the live Leaderboard) and
   ../pnl2/_g.js (PG: the painting on a stage, the homography that maps a box onto a painted surface).
   New here:
   - HW.hit: each AI's hit rate after every graded round, (right + 1) / (calls + 2), so every line starts at 50/50; the raw rate
     W / (W + L) at the end (as the page prints it); the odds that a fair coin does at least as well (one-sided binomial, as the
     live section's own coin()); checked against the live section's "1 time in N" lines on mount.
   - HWorld(cfg): one renderer. Per breakpoint (phone < 900px, wide >= 900px) cfg gives the painting, the chart surface's four corners
     in painting px (Q), where on that surface the plot and the lead line sit, an optional base (where 50% / $0 sits on the surface:
     the tide world's waterline), and the controls: each a quad in painting px (a painted plate, button, board) with its label,
     written onto it through the same homography. The modes: 'hit' (default) and the P&L windows 'season', 'd7', 'd1'.
   - Every world gives a material (M): font, inks, an SVG filter, how a line is stroked, how a control looks lit, and optional
     after() for world-specific acting (the knob turning, the slats flipping, the tubes flickering on).
   Classes hw-. */
(function(){
const H=window.HW={};const MS=PN.MS,NM=PN.NM,P=PN.P,RS=PN.RS;
/* hit rate series over the graded rounds, in order; an AI that skipped a round keeps its value */
const ser={},raw={},odds={},calls={};
const coin=(k,n)=>{/* P(X >= k), X ~ Bin(n, .5) */let lg=[0];for(let i=1;i<=n;i++)lg[i]=lg[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lg[n]-lg[i]-lg[n-i]-n*Math.LN2);return s};
MS.forEach(m=>{let r=0,c=0;ser[m]=[.5];RS.forEach(R=>{const x=P[m].per[R.n];if(x){c++;if(x.v>0)r++}ser[m].push((r+1)/(c+2))});raw[m]=c?r/c:.5;calls[m]=[r,c];odds[m]=coin(r,c)});
const rank=MS.slice().sort((a,b)=>raw[b]-raw[a]);
H.hit={ser,raw,odds,calls,rank,n:RS.length};
H.pct=v=>Math.round(v*100)+'%';
H.oddsTxt=m=>raw[m]<=.5?'worse than a coin':'a coin does that 1 time in '+Math.max(2,Math.round(1/odds[m]));
/* check against the live section (its own lines, before the take replaces it) */
H.check=[...document.querySelectorAll('.wc-splash .wc-cn')].map(e=>{const nm=e.querySelector('.wc-cn-n').textContent.trim(),m=MS.find(k=>NM[k]===nm),p=e.querySelector('.wc-cn-p').textContent.trim(),o=e.querySelector('small').textContent;
  const want=H.pct(raw[m]),wo=raw[m]<=.5?'Doing worse':'1 time in '+Math.max(2,Math.round(1/odds[m]))+'.';return p===want&&o.includes(wo)?'ok':nm+' '+want+'/'+wo+' vs '+p+'/'+o});
if(H.check.some(x=>x!=='ok'))console.warn('HW check',H.check);
/* one view's data: lines {m, pts [x 0..1000, value]}, ends, rank, value range, base value, formats */
H.view=wid=>{if(wid==='hit')return {wid,n:RS.length,first:RS[0],last:RS[RS.length-1],rank,lines:MS.map(m=>({m,s:ser[m],end:raw[m]})),lo:.3,hi:.8,base:.5,ticks:[.4,.6,.7],
    fmt:v=>Math.round(v*100)+'%',endFmt:m=>H.pct(raw[m]),baseLab:'Coin flip 50%',lead:[NM[rank[0]]+' '+H.pct(raw[rank[0]])+': '+H.oddsTxt(rank[0])+'.',NM[rank[rank.length-1]]+' '+H.pct(raw[rank[rank.length-1]])+': '+H.oddsTxt(rank[rank.length-1])+'.']};
  const w=PN.W[wid],all=[].concat(...MS.map(m=>w.ser[m])),lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*.08;
  const g=w.n?[w.rank[0],w.rank[1]]:null;
  return {wid,n:w.n,first:w.first,last:w.last,rank:w.rank,lines:MS.map(m=>({m,s:w.ser[m],end:w.tot[m]})),lo:lo0-pd,hi:hi0+pd,base:0,ticks:PN.ticks(lo0-pd,hi0+pd,3).filter(v=>v),
    fmt:v=>PN.$k(v).replace('.0K','K'),endFmt:m=>PN.$k(w.tot[m]),baseLab:'$0',
    lead:w.n?[NM[g[0]]+' leads '+(wid==='season'?'the season':w.full.toLowerCase())+' by '+PN.$f(w.tot[g[0]]-w.tot[g[1]]).replace('+','')+'.','If you’d bet $100K on every call.']:['No round closed in this window yet.','If you’d bet $100K on every call.']}};
/* a value -> y in a plot of height h; if yb (px) is given, the base value sits exactly there (the waterline) */
H.ymap=(V,h,yb)=>{if(yb==null)return v=>h-(v-V.lo)/(V.hi-V.lo)*h;const k=Math.min(yb/(V.hi-V.base),(h-yb)/(V.base-V.lo));return v=>yb-(v-V.base)*k};
H.esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const T=(x,y,s,txt,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c}"${o.cls?` class="${o.cls}"`:''}${o.st?` style="${o.st}"`:''}${o.w?` font-weight="${o.w}"`:''}>${H.esc(txt)}</text>`};H.T=T;
const LABS={hit:'Hit rate',season:'Season',d7:'7 days',d1:'24h'};H.LABS=LABS;
H.srTable=V=>`<table class="pn-sr"><caption>${V.wid==='hit'?'Hit rate: calls that got the direction right':'P&L, '+LABS[V.wid]+', $100K on every call'}</caption><tr><th>AI</th><th>${V.wid==='hit'?'Hit rate':'P&L'}</th>${V.wid==='hit'?'<th>A coin does as well</th>':''}</tr>${V.rank.map(m=>`<tr><th>${NM[m]}</th><td>${V.endFmt(m)}</td>${V.wid==='hit'?`<td>${H.oddsTxt(m)}</td>`:''}</tr>`).join('')}</table>`;

window.HWorld=function(cfg){const M=cfg.mat,id=cfg.id;
 const W={id,title:cfg.title||'Smart or lucky?',beat:cfg.beat};
 W.html=()=>`<header class="hw-top"><h2 class="hw-hd">${cfg.hd||'Smart or lucky?'}</h2></header>
   <div class="hw-st"><div class="hw-sf"><svg class="hw-sv" role="img" aria-label="Chart"></svg></div><div class="hw-ctl" role="group" aria-label="Hit rate or P&amp;L, and the P&amp;L window"></div></div>
   <div class="hw-sr"></div>`;
 W.draw=function(root,wid,anim){const wide=innerWidth>=900,C=wide?cfg.wide:cfg.phone,V=H.view(wid);if(wid==='hit'&&C.hi)V.hi=C.hi;root.classList.add('hw','hw-'+id);root.dataset.mode=wid==='hit'?'hit':'pnl';
  const st=root.querySelector('.hw-st');if(st.clientWidth<60)return;const S=PG.stage(st,cfg.img+C.src,C.iw,C.ih,C.crop?C.crop(st.clientWidth):{});
  st.querySelectorAll('img.pq-bg').forEach(i=>i.classList.add('hw-bg'));
  const sf=root.querySelector('.hw-sf'),sv=root.querySelector('.hw-sv'),Qp=C.Q.map(q=>S.P(q[0],q[1])),[bw,bh]=PG.size(Qp);PG.quad(sf,S,C.Q,bw,bh);
  sv.setAttribute('viewBox',`0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}`);sv.setAttribute('width',bw);sv.setAttribute('height',bh);
  const fs=Math.max(C.fmin||(wide?12:10),C.fs*(bw/(C.ref||(wide?900:340))));
  const pl=C.plot,x0=bw*pl[0],y0=bh*pl[1],x1=bw*pl[2],y1=bh*pl[3],ph=y1-y0,yb=C.base!=null?bh*C.base-y0:null,Yv=H.ymap(V,ph,yb),X=i=>x0+i/Math.max(1,V.n)*(x1-x0),Y=v=>y0+Yv(Math.max(V.lo,Math.min(V.hi,v)));
  let s='';
  /* lead line, written on the surface */
  if(C.lead){const lx=bw*C.lead[0],ly=bh*C.lead[1];s+=T(lx,ly,fs*(C.lfs||1.05),V.lead[0],{c:M.gold,cls:'hw-lead',a:C.lead[2]})+T(lx,ly+fs*1.3,fs*.9,V.lead[1],{c:M.dim,cls:'hw-lead',a:C.lead[2]})}
  /* grid, base (coin flip or $0), axis */
  V.ticks.forEach(v=>{const y=Y(v);if(y>y0-1&&y<y1+1)s+=M.rule(x0,y,x1,y,M.dim,.7)+T(x0-fs*.35,y+fs*.32,fs*.78,V.fmt(v),{a:'end',c:M.dim})});
  s+=M.base(x0,x1,Y(V.base),V)+T(C.blx!=null?bw*C.blx:x1,Y(V.base)+fs*(C.bly||1.05),fs*.8,V.baseLab,{c:M.baseC||M.gold,cls:'hw-bl',a:C.blx!=null?'start':'end'});
  if(V.n)s+=T(x0,y1+fs*1.2,fs*.76,'R'+V.first.n,{c:M.dim})+T(x1,y1+fs*1.2,fs*.76,'R'+V.last.n,{a:'end',c:M.dim});
  /* the lines, leader last (on top) */
  const lead=V.rank[0];
  const L=V.lines.slice().sort((a,b)=>a.m===lead?1:b.m===lead?-1:0).map(l=>{const pts=l.s.map((v,i)=>[X(i),Y(v)]);return {m:l.m,ld:l.m===lead,pts,d:'M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L'),end:pts[pts.length-1]}});
  s+=`<g class="hw-lines">${L.map(l=>M.line(l,M.ink(l.m,l.ld),fs)).join('')}</g>`;
  /* end labels, pushed apart */
  const stk=C.stack,sp=PN.spread(L.map(l=>({m:l.m,y:l.end[1]})),fs*(C.gap||(stk?2.15:1.25)),y0,y1+fs*.4);
  s+=`<g class="hw-ends">${sp.map(e=>{const ld=e.m===lead,v=V.lines.find(q=>q.m===e.m).end,c=wid==='hit'?M.ink(e.m,ld):(v>=0?M.up:M.dn),lx=x1+fs*.45;
    return stk?T(lx,e.y-fs*.12,fs*.86,NM[e.m],{c:M.ink(e.m,ld),cls:'hw-en'})+T(lx,e.y+fs*.86,fs*.95,V.endFmt(e.m),{c,cls:'hw-ev'})
      :T(lx,e.y+fs*.32,fs*.9,NM[e.m],{c:M.ink(e.m,ld),cls:'hw-en'})+T(lx+fs*(C.vx||3.3),e.y+fs*.32,fs*.9,V.endFmt(e.m),{c,cls:'hw-ev'})}).join('')}</g>`;
  sv.innerHTML=`<defs>${M.defs(id)}</defs><g class="hw-marks" filter="url(#${id}Mat)" style='font-family:${M.font}'>${s}</g>`;
  /* the controls: each written onto its own painted plate */
  const box=root.querySelector('.hw-ctl');box.innerHTML='';
  (C.ctl||[]).forEach(k=>{const q=k.Q.map(p=>S.P(p[0],p[1])),[cw,chh]=PG.size(q),on=k.id===wid||(k.id==='pnl'&&wid!=='hit'),dim=k.id!=='hit'&&k.id!=='pnl'&&wid==='hit';
    const d=document.createElement('button');d.type='button';d.className='hw-c'+(on?' hw-on':'')+(dim?' hw-dim':'');d.dataset.win=k.id==='pnl'?(root.dataset.lastP||'season'):k.id;d.setAttribute('aria-pressed',on);d.setAttribute('aria-label',k.lab||LABS[k.id]||'P&L');
    d.innerHTML=`<svg viewBox="0 0 ${cw.toFixed(1)} ${chh.toFixed(1)}" width="${cw}" height="${chh}" aria-hidden="true"><defs>${M.defs(id+'c'+k.id)}</defs><g filter="url(#${id}c${k.id}Mat)" style='font-family:${M.cfont||M.font}'>${M.ctl(cw,chh,k.lab||LABS[k.id]||'P&L',on,dim,k)}</g></svg>`;
    box.appendChild(d);PG.quad(d,S,k.Q,cw,chh);d.style.position='absolute'});
  root.querySelectorAll('.hw-glow').forEach(e=>e.remove());(C.ctl||[]).forEach(k=>{const on=k.id===wid||(k.id==='pnl'&&wid!=='hit');if(!k.glow||!on)return;const g=document.createElement('i'),p=S.P(k.glow[0],k.glow[1]),r=k.glow[2]*S.s;
    g.className='hw-glow';g.style.cssText=`left:${p[0]-r}px;top:${p[1]-r}px;width:${2*r}px;height:${2*r}px;--gc:${k.glow[3]||'#fdbc2a'}`;root.querySelector('.hw-st').appendChild(g)});
  root.querySelector('.hw-sr').innerHTML=H.srTable(V);
  if(wid!=='hit')root.dataset.lastP=wid;
  root.classList.remove('hw-re');if(anim&&!matchMedia('(prefers-reduced-motion: reduce)').matches){void root.offsetWidth;root.classList.add('hw-re')}
  if(cfg.after)cfg.after(root,{S,C,V,wid,anim,bw,bh,X,Y,x0,x1,y0,y1,fs,L,wide})};
 return W};
/* mount: the take replaces the splash's content (the live section stays in the DOM, hidden, as pnl does) */
window.HWmount=function(W){const sp=document.querySelector('.wc-splash');if(!W||!sp)return;document.documentElement.classList.add('pn-on','hw-on1');
  const beat=sp.previousElementSibling;if(beat&&beat.classList.contains('wc-beat')&&W.beat)beat.textContent=W.beat;
  sp.setAttribute('aria-label',W.title);sp.insertAdjacentHTML('beforeend',`<div class="pn hw-root">${W.html()}</div>`);const root=sp.querySelector('.hw-root');
  const set=(wid,anim)=>{root.dataset.win=wid;W.draw(root,wid,anim)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b)set(b.dataset.win,true)});
  set(window.HW_WIN||'hit',false);let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;set(root.dataset.win,false)}});
  const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!rm&&!window.PN_STILL)new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();set(root.dataset.win,true)}},{threshold:.35}).observe(root);
  window.HWset=set};
/* shared material pieces */
H.wobble=(x0,y0,x1,y1,c,w,seed,n)=>{n=n||8;let d='';for(let i=0;i<=n;i++){const t=i/n;d+=(i?' L':'M')+(x0+(x1-x0)*t).toFixed(1)+' '+(y0+(y1-y0)*t+(PN.rnd((seed||3)*7+i)-.5)*1.2).toFixed(1)}return `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`};
})();
