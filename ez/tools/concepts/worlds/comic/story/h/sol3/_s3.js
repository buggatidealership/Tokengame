/* Round H9, area sol3: "Smart or lucky?" in two worlds (the lie detector, the arcade), each in several drawn styles.
   Data: everything from the page. Hit rate per AI after every graded round = (right + 1) / (calls + 2) (every line starts at 50/50;
   an AI that skipped a round keeps its value); the figure printed is the raw W / (W + L), as the page prints it. P&L: ../pnl/_lib.js PN
   (flat $100,000 on every call, __x2pPnl; Season / 7 days / 24h with the live page's own window rules; PN checks itself against the
   Leaderboard rows). W-L per P&L window = the calls inside that window that got the direction right / wrong.
   Checked on mount against the live big board's own table (h_sol.js .hs-sr: W-L and hit rate per AI): kept in S3.check.
   Drawing rules (owner, round H9): the data surface is seen head-on, so the chart is an axis-aligned SVG laid exactly on the measured
   surface (no matrix3d, no filter, no glow, no blur: as crisp as the NVIDIA countdown digits); nothing crosses a label; each end label
   one line, name then value; the P&L view shows a small table under the chart (W-L, P&L); controls are the world's own parts
   (the game's menu on the arcade screen, the console's brass plates and its knob, the chart paper's printed header), and the one
   control not yet used moves a little until it is used (lesson 86). Classes s3-. */
(function(){
const S=window.S3={};const MS=PN.MS,NM=PN.NM,P=PN.P,RS=PN.RS;
const ser={},raw={},WL={};
MS.forEach(m=>{let r=0,c=0;ser[m]=[.5];RS.forEach(R=>{const x=P[m].per[R.n];if(x){c++;if(x.v>0)r++}ser[m].push((r+1)/(c+2))});raw[m]=c?r/c:.5;WL[m]=[r,c-r]});
const hrank=MS.slice().sort((a,b)=>raw[b]-raw[a]||WL[b][0]-WL[a][0]);
const wl=(m,rs)=>{let w=0,l=0;rs.forEach(R=>{const x=P[m].per[R.n];if(x){if(x.v>0)w++;else if(x.v<0)l++}});return [w,l]};
S.hit={ser,raw,WL,rank:hrank};
const pct=v=>Math.round(v*100)+'%';S.pct=pct;
/* check against the live board's table */
S.check=(()=>{const t=document.querySelector('.hs-sr table');if(!t)return ['no live table'];
  return [...t.querySelectorAll('tr')].slice(1).map(tr=>{const c=[...tr.children].map(x=>x.textContent.trim()),m=MS.find(k=>NM[k]===c[0]);if(!m)return 'name? '+c[0];
    const want=[WL[m][0]+'-'+WL[m][1],pct(raw[m])];return want[0]===c[1]&&want[1]===c[3]?'ok':m+' '+want.join('/')+' vs '+c[1]+'/'+c[3]})})();
if(S.check.some(x=>x!=='ok'))console.warn('S3 check',S.check);
S.view=wid=>{if(wid==='hit'){const all=[].concat(...MS.map(m=>ser[m]));return {wid,n:RS.length,first:RS[0],last:RS[RS.length-1],rank:hrank,
    lines:MS.map(m=>({m,s:ser[m]})),lo:Math.min(.35,Math.min(...all)-.02),hi:Math.max(.75,Math.max(...all)+.02),base:.5,ticks:[.4,.5,.6,.7],
    fmt:v=>Math.round(v*100)+'%',val:m=>pct(raw[m]),wl:m=>WL[m]}}
  const w=PN.W[wid],all=[].concat(...MS.map(m=>w.ser[m])),lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*.1;
  return {wid,n:w.n,first:w.first,last:w.last,rank:w.rank,lines:MS.map(m=>({m,s:w.ser[m]})),lo:lo0-pd,hi:hi0+pd,base:0,ticks:PN.ticks(lo0-pd,hi0+pd,4),
    fmt:v=>v===0?'$0':PN.$k(v).replace('.0K','K'),val:m=>PN.$f(w.tot[m]),tot:m=>w.tot[m],wl:m=>wl(m,w.rs)}};
S.LAB={hit:'Hit rate',pnl:'P&L',season:'Season',d7:'7 days',d1:'24h'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');S.esc=esc;
const cv=document.createElement('canvas').getContext('2d');S.tw=(t,font)=>{cv.font=font;return cv.measureText(t).width};
const T=(x,y,s,txt,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c}"${o.w?` font-weight="${o.w}"`:''}${o.cls?` class="${o.cls}"`:''}>${esc(txt)}</text>`};S.T=T;
/* spread labels so they never touch, keeping order */
const spread=(it,gap,min,max)=>{const a=it.slice().sort((x,y)=>x.y-y.y);for(let i=1;i<a.length;i++)if(a[i].y-a[i-1].y<gap)a[i].y=a[i-1].y+gap;
  const ov=a[a.length-1].y-max;if(ov>0){a[a.length-1].y-=ov;for(let i=a.length-2;i>=0;i--)if(a[i+1].y-a[i].y<gap)a[i].y=a[i+1].y-gap}
  if(a[0].y<min){const d=min-a[0].y;a.forEach(x=>x.y+=d)}return a};

window.S3World=function(cfg){const M=cfg.mat;
 const W={id:cfg.id};
 W.html=()=>`<header class="s3-top"><h2 class="s3-h"><span class="s3-w">Smart or</span> <span class="s3-w s3-w2">lucky?</span></h2></header>
  <div class="s3-st"><img class="s3-bg" alt="" decoding="async"><div class="s3-sf"><svg class="s3-sv" role="img"></svg><div class="s3-ctl" role="group" aria-label="Hit rate or P&amp;L, and the P&amp;L window"></div></div><div class="s3-hw"></div></div>
  <div class="s3-sr"></div>`;
 W.draw=function(root,wid,anim){const wide=innerWidth>=900,C=wide?cfg.wide:cfg.phone,st=root.querySelector('.s3-st'),SW=Math.min(root.clientWidth,C.maxW||1e9);if(SW<60)return;st.style.width=SW+'px';st.style.margin='0 auto';
  const mode=wid==='hit'?'hit':'pnl';root.classList.add('s3','s3-'+cfg.id,'s3-'+(cfg.kind||cfg.id));root.dataset.mode=mode;
  /* the stage: the crop of the painting at the stage's width */
  const [cx0,cy0,cx1,cy1]=C.crop,s=SW/(cx1-cx0),H=(cy1-cy0)*s,img=st.querySelector('.s3-bg');st.style.height=H.toFixed(1)+'px';
  if(img.dataset.src!==C.src){img.dataset.src=C.src;img.src=cfg.img+C.src}
  img.style.cssText=`width:${(C.iw*s).toFixed(1)}px;left:${(-cx0*s).toFixed(1)}px;top:${(-cy0*s).toFixed(1)}px`;
  const Pp=(x,y)=>[(x-cx0)*s,(y-cy0)*s];
  /* the surface: inset a hair inside the measured black so nothing touches a bezel */
  const [a0,b0]=Pp(C.surf[0],C.surf[1]),[a1,b1]=Pp(C.surf[2],C.surf[3]),ins=(C.ins||.025)*(a1-a0),sx=Math.round(a0+ins),sy=Math.round(b0+ins),sw=Math.round(a1-a0-2*ins),sh=Math.round(b1-b0-2*ins);
  const sf=root.querySelector('.s3-sf');sf.style.cssText=`left:${sx}px;top:${sy}px;width:${sw}px;height:${sh}px`;
  const sv=root.querySelector('.s3-sv');sv.setAttribute('viewBox',`0 0 ${sw} ${sh}`);sv.setAttribute('width',sw);sv.setAttribute('height',sh);
  const V=S.view(wid),fs=Math.max(C.fmin||(wide?14:10),Math.min(C.fmax||22,sw*(C.fk||.034))),DF=M.font,lead=V.rank[0];
  const ink=m=>m===lead?M.gold:M.ink[m];
  let o='',top=0;
  /* controls printed on the surface (arcade menu, paper header) take the top row */
  const ctlTop=C.ctl==='menu'||C.ctl==='header';if(ctlTop)top=fs*2.1;
  /* the table under the chart: in P&L always; in hit rate only where the world can't label line ends (pens in the way) */
  const tab=mode==='pnl'||cfg.alwaysTable,rowH=fs*1.32,tabH=tab?rowH*(V.rank.length+1)+fs*.5:0;
  const ends=!cfg.alwaysTable;/* end labels at the line ends */
  const endW=ends?Math.max(...V.rank.map(m=>S.tw(NM[m]+(mode==='hit'?' '+V.val(m):''),`${fs*.95}px ${DF}`)))+fs*.8:0;
  const axW=Math.max(...V.ticks.map(v=>S.tw(V.fmt(v),`${fs*.8}px ${DF}`)))+fs*.55;
  const penX=C.pen!=null?Pp(C.pen,0)[0]-sx-fs*.6:sw;/* lines stop short of the pen tips */
  const x0=axW,x1=Math.min(sw-endW-fs*.4,penX),y0=top+fs*.8,y1=sh-tabH-fs*1.6;
  const Y=v=>y1-(Math.max(V.lo,Math.min(V.hi,v))-V.lo)/(V.hi-V.lo)*(y1-y0),X=i=>x0+i/Math.max(1,V.n)*(x1-x0);
  /* grid and axis */
  V.ticks.forEach(v=>{const y=Y(v);if(v===V.base)return;o+=`<path d="M${x0.toFixed(1)} ${y.toFixed(1)}H${x1.toFixed(1)}" stroke="${M.grid}" stroke-width="1" ${M.gridDash?`stroke-dasharray="${M.gridDash}"`:''} fill="none" shape-rendering="crispEdges"/>`+T(x0-fs*.35,y+fs*.28,fs*.8,V.fmt(v),{a:'end',c:M.dim})});
  const yb=Y(V.base);o+=(mode==='hit'?M.base(x0,x1,yb,fs):`<path d="M${x0.toFixed(1)} ${yb.toFixed(1)}H${x1.toFixed(1)}" stroke="${M.dim}" stroke-width="1.2" stroke-dasharray="5 4" fill="none" shape-rendering="crispEdges"/>`)+T(x0-fs*.35,yb+fs*.28,fs*.8,mode==='hit'?'50%':'$0',{a:'end',c:mode==='hit'?M.baseC:M.dim});
  if(V.n)o+=T(x0,y1+fs*1.15,fs*.78,'R'+V.first.n,{c:M.dim})+T(x1,y1+fs*1.15,fs*.78,'R'+V.last.n,{a:'end',c:M.dim});
  /* the lines, the leader last */
  const L=V.lines.slice().sort((a,b)=>a.m===lead?1:b.m===lead?-1:0).map(l=>{const pts=l.s.map((v,i)=>[X(i),Y(v)]);return {m:l.m,pts,end:pts[pts.length-1],d:'M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')}});
  if(V.n)o+=`<g class="s3-lines">${L.map(l=>`<path class="s3-ln" pathLength="1" d="${l.d}" stroke="${ink(l.m)}" stroke-width="${l.m===lead?M.lw*1.45:M.lw}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><circle class="s3-dot" cx="${l.end[0].toFixed(1)}" cy="${l.end[1].toFixed(1)}" r="${(M.lw*1.6).toFixed(1)}" fill="${ink(l.m)}"/>`).join('')}</g>`;
  else o+=T((x0+x1)/2,(y0+y1)/2,fs,'No round closed in this window yet.',{a:'middle',c:M.dim});
  /* end labels: one line each, name then value, pushed apart, in a gutter no line enters */
  if(ends&&V.n){const sp=spread(L.map(l=>({m:l.m,y:l.end[1]})),fs*1.22,y0,y1);o+=`<g class="s3-ends">${sp.map(e=>{const c=ink(e.m),tx=x1+fs*.55;
      return mode==='hit'?T(tx,e.y+fs*.33,fs*.95,NM[e.m]+' '+V.val(e.m),{c}):T(tx,e.y+fs*.33,fs*.95,NM[e.m],{c})}).join('')}</g>`}
  /* the table under the chart */
  if(tab){const ty=sh-tabH+fs*.2,c1=fs*.2,cV=Math.min(sw-fs*.4,penX),cW=c1+(cV-c1)*.6;const hd=mode==='hit'?'Hit rate':'P&L'+(wid==='season'?'':' · '+S.LAB[wid]);
    o+=`<g class="s3-tab">`+T(c1,ty+fs*.85,fs*.78,M.tabHead||'',{c:M.dim})+T(cW,ty+fs*.85,fs*.78,'W-L',{a:'middle',c:M.dim})+T(cV,ty+fs*.85,fs*.78,hd,{a:'end',c:M.dim});
    if(M.tabRule)o+=`<path d="M${c1} ${(ty+fs*1.12).toFixed(1)}H${cV}" stroke="${M.grid}" stroke-width="1" shape-rendering="crispEdges"/>`;
    V.rank.forEach((m,i)=>{const y=ty+rowH*(i+1)+fs*.85,v=mode==='hit'?V.val(m):V.val(m),[w,l]=V.wl(m),vc=mode==='hit'?ink(m):(V.tot(m)>=0?M.up:M.dn);
      o+=T(c1,y,fs*.92,(M.rankNo?(i+1)+'  ':'')+NM[m],{c:ink(m)})+T(cW,y,fs*.92,w+'-'+l,{a:'middle',c:M.txt})+T(cV,y,fs*.92,v,{a:'end',c:vc})});
    o+='</g>'}
  sv.innerHTML=`<g style='font-family:${DF}' text-rendering="geometricPrecision">${o}</g>`;sv.setAttribute('aria-label',mode==='hit'?'Hit rate, round by round, against a coin flip at 50%':'P&L, '+S.LAB[wid]);
  /* the controls */
  const box=root.querySelector('.s3-ctl'),used=root.dataset.used==='1';box.innerHTML='';root.querySelector('.s3-hw').innerHTML='';
  const btn=(id,lab,x,y,w,h,cls)=>{const on=id===wid||(id==='pnl'&&mode==='pnl'),dim=!['hit','pnl'].includes(id)&&mode==='hit';const b=document.createElement('button');b.type='button';
    b.className='s3-c '+(cls||'')+(on?' s3-on':'')+(dim?' s3-dim':'');b.dataset.win=id==='pnl'?(root.dataset.lastP||'season'):id;b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',S.LAB[id]);
    b.style.cssText=`left:${x.toFixed(1)}px;top:${y.toFixed(1)}px;width:${w.toFixed(1)}px;height:${h.toFixed(1)}px;font-size:${(cls&&cls.includes('s3-pl')?C.pfs*s:fs*.95).toFixed(1)}px`;
    b.innerHTML=`<span>${esc(M.cap?lab.toUpperCase():lab)}</span>`;if(!used&&id===(mode==='hit'?'pnl':'hit'))b.classList.add('s3-call');return b};
  const flow=ids=>{/* a printed row across the surface's top: modes, then windows */let x=fs*.15;const y=fs*.25,h=fs*1.55,f=`${fs*.95}px ${DF}`;
    ids.forEach(([id,lab],i)=>{if(lab==='|'){x+=fs*.9;return}const w=S.tw(M.cap?lab.toUpperCase():lab,f)+fs*.9;box.appendChild(btn(id,lab,x,y,w,h,'s3-mn'));x+=w+fs*.25})};
  if(C.ctl==='menu')flow([['hit',M.lab1||'1P Hit rate'],['pnl',M.lab2||'2P P&L'],['','|'],['season','Season'],['d7','7D'],['d1','24H']]);
  if(C.ctl==='header')flow([['hit','Hit rate'],['pnl','P&L'],['','|'],['season','Season'],['d7','7D'],['d1','24H']]);
  if(C.ctl==='plates'){/* brass plates in painting px, laid relative to the surface box */C.plates.forEach(p=>{const [q0,r0]=Pp(p.q[0],p.q[1]),[q1,r1]=Pp(p.q[2],p.q[3]);
      if(p.id==='mode'){/* the knob's plate names what the knob points at; a tap turns it */const b=btn(mode==='hit'?'pnl':'hit',mode==='hit'?'Hit rate':'P&L',q0-sx,r0-sy,q1-q0,r1-r0,'s3-pl s3-pm');b.classList.remove('s3-dim','s3-call');b.classList.add('s3-on');b.setAttribute('aria-label','Showing '+(mode==='hit'?'hit rate':'P&L')+'. Switch to '+(mode==='hit'?'P&L':'hit rate'));box.appendChild(b)}
      else box.appendChild(btn(p.id,p.lab||S.LAB[p.id],q0-sx,r0-sy,q1-q0,r1-r0,'s3-pl'))});
    if(C.knob){/* the painted knob itself turns: a disc of the painting, rotated */const [kx,ky]=Pp(C.knob[0],C.knob[1]),R=C.knob[2]*s,k=document.createElement('button');k.type='button';
      k.className='s3-knob'+(used?'':' s3-call');k.dataset.win=mode==='hit'?(root.dataset.lastP||'season'):'hit';k.setAttribute('aria-label','Turn to '+(mode==='hit'?'P&L':'hit rate'));
      k.style.cssText=`left:${(kx-R).toFixed(1)}px;top:${(ky-R).toFixed(1)}px;width:${(2*R).toFixed(1)}px;height:${(2*R).toFixed(1)}px;background-image:url("${cfg.img+C.src}");background-size:${(C.iw*s).toFixed(1)}px auto;background-position:${(-(C.knob[0]-C.knob[2])*s).toFixed(1)}px ${(-(C.knob[1]-C.knob[2])*s).toFixed(1)}px;--a:${mode==='hit'?-38:38}deg`;
      root.querySelector('.s3-hw').appendChild(k)}}
  root.querySelector('.s3-sr').innerHTML=`<table><caption>${mode==='hit'?'Hit rate: calls that got the direction right (a coin flip gets 50%)':'P&L, '+S.LAB[wid]+', $100K on every call'}</caption><tr><th>AI</th><th>W-L</th><th>${mode==='hit'?'Hit rate':'P&L'}</th></tr>${V.rank.map(m=>{const [w,l]=V.wl(m);return `<tr><th>${NM[m]}</th><td>${w}-${l}</td><td>${V.val(m)}</td></tr>`}).join('')}</table>`;
  if(mode==='pnl')root.dataset.lastP=wid;
  root.classList.remove('s3-re');if(anim&&!matchMedia('(prefers-reduced-motion: reduce)').matches){void root.offsetWidth;root.classList.add('s3-re')}};
 return W};
window.S3mount=function(W){const sp=document.querySelector('.wc-splash');if(!W||!sp)return;document.documentElement.classList.add('pn-on','s3-on');
  sp.setAttribute('aria-label','Smart or lucky?');sp.querySelectorAll(':scope>.hs-wrap').forEach(e=>e.style.setProperty('display','none','important'));sp.insertAdjacentHTML('beforeend',`<div class="pn s3-root">${W.html()}</div>`);const root=sp.querySelector('.s3-root');root.style.setProperty('display','block','important');
  const set=(wid,anim)=>{root.dataset.win=wid;W.draw(root,wid,anim)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b){root.dataset.used='1';set(b.dataset.win,true)}});
  set(window.S3_WIN||'hit',false);let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;set(root.dataset.win,false)}});
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!window.PN_STILL)new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();set(root.dataset.win,true)}},{threshold:.35}).observe(root);
  window.S3set=set};
})();
