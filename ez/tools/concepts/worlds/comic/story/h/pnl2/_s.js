/* Round H6, pnl2: one renderer for the "marks on a surface" takes (D1 ops room, D2 edge-lit glass, F the big board).
   PSurf(cfg) returns a take for PNmount. Per breakpoint (phone < 900px, wide >= 900px) cfg gives the painting, the surface's four
   corners in painting px (Q) and where on the surface the parts sit (u,v = 0..1 of the surface): top band (lead line + window tabs),
   chart, rows (or none: then the rows sit on a strip cut from the same surface under the picture).
   Every mark (lines, axis, names, figures, tabs, rows, rules) is SVG drawn in the surface's own box, then mapped onto the surface with
   one matrix3d, through one material filter (wax or chalk). Over it: the painting's own highlights, screened (the room's light crosses
   the marks); over that: the foreground cut out of the painting (what stands in front covers the marks). */
if(!document.getElementById('pq-fonts')){const l=document.createElement('link');l.id='pq-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Cabin+Sketch:wght@400;700&family=Share+Tech+Mono&display=block';document.head.appendChild(l)}
function PSurf(cfg){
const T={id:cfg.id,title:cfg.title,beat:cfg.beat,zoom:'.pn-'+cfg.id+' .pq-st'};
const M=cfg.mat;/* {font, ink(m,lead) colour, filter svg, base(x0,x1,y) svg for break-even, fs (font scale)} */
T.html=N=>`<header class="pq-top"><div role="heading" aria-level="2" class="pn-hd pq-hd" aria-label="${cfg.title}">${cfg.hd.map((l,i)=>N.letter(l,cfg.seed+i*7)).join('<br>')}</div><div class="pq-cap"><b>If you&rsquo;d bet $100K on every call.</b></div></header>
  <div class="pq-st"><div class="pq-sf"><svg class="pq-sv" role="group" aria-label="P&amp;L chart and window switch"></svg></div></div>
  <div class="pq-rw" hidden><svg class="pq-sv2" aria-hidden="true"></svg></div><div class="pq-sr"></div>
  <p class="pq-fine">Each call is its own bet. Buy on up, short on down. No leverage. Before fees.</p>`;
T.row=()=>'';
const tx=(x,y,s,txt,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.c||M.chalk}" ${o.r?`transform="rotate(${o.r} ${x.toFixed(1)} ${y.toFixed(1)})"`:''} ${o.cls?`class="${o.cls}"`:''}>${PG.esc(txt)}</text>`};
/* a hand-drawn rule: a slightly wavy line */
const rule=(x0,y0,x1,y1,c,w,seed)=>{if(M.rule2)return M.rule2(x0,y0,x1,y1,c,w);const n=6,pts=[];for(let i=0;i<=n;i++){const t=i/n;pts.push([x0+(x1-x0)*t,y0+(y1-y0)*t+(PN.rnd(seed*7+i)-.5)*1.4])}return `<path d="M${pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`};
/* a hand-drawn ring round a word (the open window, the open column) */
const ring=(cx,cy,rx,ry,c,seed)=>{if(M.ring)return M.ring(cx,cy,rx,ry,c,seed);let d='';const n=26;for(let i=0;i<=n+3;i++){const a=-2.2+i/n*Math.PI*2,k=1+(PN.rnd(seed+i)-.5)*.08+i*.004;d+=(i?'L':'M')+(cx+Math.cos(a)*rx*k).toFixed(1)+' '+(cy+Math.sin(a)*ry*k).toFixed(1)+' '}return `<path d="${d}" stroke="${c}" stroke-width="${M.rw||2.2}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`};
function rowsSvg(wid,bw,bh,fs,o){const w=PN.W[wid],cols=[['d1','24h'],['d7','7 days'],['season','Season']],x0=bw*(o.nameW||.34),cw=(bw-x0)/3,rh=bh/5,c=M.chalk;fs=Math.min(fs,cw*(M.cwk||.2),rh*.62);let s='';
  cols.forEach(([id,l],i)=>{const cx=x0+cw*(i+.5);s+=tx(cx,rh*.62,fs*.86,l,{a:'middle',c:id===wid?M.gold:M.dim});if(id===wid)s+=ring(cx,rh*.42,cw*.42,rh*.42,M.gold,i*5+3)});
  s+=rule(2,rh*.95,bw-2,rh*.95,c,M.rule||1.4,9);
  w.rank.forEach((m,i)=>{const y=rh*(i+1.66),ld=i===0;s+=tx(2,y,fs*.74,String(i+1),{c:M.dim});s+=tx(fs*1.0,y,fs*1.08,PN.NM[m],{c:M.ink(m,ld)});
    cols.forEach(([id],k)=>{const v=PN.W[id].tot[m],t=v?PN.$k(v):'·';s+=tx(x0+cw*(k+.5),y,fs*(id===wid?1.08:.94),t,{a:'middle',c:v>0?M.up:v<0?M.dn:M.dim})});
    if(i<3)s+=rule(2,rh*(i+1.95),bw-2,rh*(i+1.95),c,.7,i*11+2)});
  return s}
T.draw=function(root,wid,anim){root.classList.add('pq');const st=root.querySelector('.pq-st'),wide=PG.wide(),C=wide?cfg.wide:cfg.phone,w=PN.W[wid];
  const S=PG.stage(st,PN2.IMG+C.src,C.iw,C.ih,C.crop?C.crop(st.clientWidth):{});
  if(C.hl)PG.over(st,PN2.IMG+C.hl,S,C.iw,C.ih,'pq-hl');if(C.fg)PG.over(st,PN2.IMG+C.fg,S,C.iw,C.ih,'pq-fg');
  const sf=root.querySelector('.pq-sf'),sv=root.querySelector('.pq-sv'),Qp=C.Q.map(q=>S.P(q[0],q[1])),[bw,bh]=PG.size(Qp);PG.quad(sf,S,C.Q,bw,bh);
  sv.setAttribute('viewBox',`0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}`);sv.setAttribute('width',bw);sv.setAttribute('height',bh);
  const fs=Math.max(wide?12:10.5,C.fs*(bw/(C.ref||(wide?900:340))));
  /* top band: lead line (left) and the window tabs (right), written on the surface */
  const tb=C.top,ty=bh*tb[1],tabs=[['season','Season'],['d7','7 days'],['d1','24h']];let s='';
  const tabX=bw*tb[2],tabW=(bw*tb[3]-tabX)/3;
  tabs.forEach(([id,l],i)=>{const cx=tabX+tabW*(i+.5),on=id===wid;s+=`<g data-win="${id}" role="button" tabindex="0" aria-pressed="${on}" aria-label="${l}" class="pq-tab"><rect x="${(cx-tabW/2).toFixed(1)}" y="${(ty-fs*1.5).toFixed(1)}" width="${tabW.toFixed(1)}" height="${(fs*2.4).toFixed(1)}" fill="#000" fill-opacity="0"/>${tx(cx,ty,fs*(on?1.1:.95),l,{a:'middle',c:on?M.gold:M.dim})}${on?ring(cx,ty-fs*.38,tabW*.44,fs*.95,M.gold,i*9+1):''}</g>`});
  const leadTxt=w.n?[PN.NM[w.rank[0]]+' leads '+(wid==='season'?'the season':w.full.toLowerCase()),'by '+PN.$f(w.tot[w.rank[0]]-w.tot[w.rank[1]]).replace('+','')]:['No round closed','in this window yet'];
  const ly=bh*tb[0];s+=tx(bw*.02,ly,fs*1.02,leadTxt[0],{c:M.chalk,r:-1.2})+tx(bw*.02,ly+fs*1.25,fs*1.2,leadTxt[1],{c:M.gold,r:-1.2});
  /* the chart */
  const ch=C.chart,cx0=bw*ch[0],cy0=bh*ch[1],cx1=bw*ch[2],cy1=bh*ch[3],G=PN.geom(wid,cy1-cy0,.07),X=x=>cx0+x/1000*(cx1-cx0),Y=y=>cy0+y;
  const tk=PN.ticks(G.lo,G.hi,wide?4:3);
  tk.forEach(v=>{if(v)s+=rule(cx0,Y(G.Y(v)),cx1,Y(G.Y(v)),M.dim,.6,v/1000|0)+tx(cx0-fs*.3,Y(G.Y(v))+fs*.32,fs*.78,PN.$k(v).replace('.0K','K'),{a:'end',c:M.dim})});
  s+=M.base(cx0-fs*.2,cx1+fs*.4,Y(G.base))+tx(cx0-fs*.3,Y(G.base)+fs*.32,fs*.85,'$0',{a:'end',c:M.chalk});
  if(w.n)s+=tx(cx0,cy1+fs*1.25,fs*.78,'R'+w.first.n,{c:M.dim})+tx(cx1,cy1+fs*1.25,fs*.78,'R'+w.last.n,{a:'end',c:M.dim});
  const lines=G.lines.slice().reverse().map(l=>{const d=(M.path||PG.path)(l.pts,X,Y),ld=l.m===w.rank[0];return `<path class="pq-ln${ld?' pq-ld':''}" d="${d}" pathLength="1" stroke="${M.ink(l.m,ld)}" stroke-width="${(ld?M.lw*1.25:M.lw).toFixed(2)}"/>`}).join('');
  /* the rub: where a hand rested on the board, the early lines are half wiped and smeared sideways */
  const rx=X(1000*(C.rub||.3)),ryy=Y(G.base);
  s+=`<g mask="url(#${cfg.id}Rub)">${lines}</g><g class="pq-smear" clip-path="url(#${cfg.id}RubC)" transform="translate(${(fs*.5).toFixed(1)} ${(fs*.15).toFixed(1)})" opacity=".32" filter="url(#${cfg.id}Bl)">${lines}</g>`;
  if(M.endMark)s+=G.lines.map(l=>M.endMark(X(l.end[0]),Y(l.end[1]),M.ink(l.m,l.m===w.rank[0]),l.m===w.rank[0],X(0),Y(G.base))).join('');
  /* end labels, written by the line ends, pushed apart */
  const sp=PN.spread(G.lines.map(l=>({m:l.m,v:l.v,y:Y(l.end[1])})),fs*2.15,cy0+fs*.6,cy1-fs*.4);
  s+=sp.map(e=>{const ld=e.m===w.rank[0];return `<g class="pn-end pq-end" style="--t0:none">${tx(cx1+fs*.5,e.y-fs*.12,fs*.92,PN.NM[e.m],{c:M.ink(e.m,ld)})}${tx(cx1+fs*.5,e.y+fs*.9,fs*.92,PN.$k(e.v),{c:e.v>=0?M.up:M.dn})}</g>`}).join('');
  /* rows on the surface */
  if(C.rows){const r=C.rows,rx0=bw*r[0],ry0=bh*r[1];s+=`<g transform="translate(${rx0.toFixed(1)} ${ry0.toFixed(1)})">${rowsSvg(wid,bw*(r[2]-r[0]),bh*(r[3]-r[1]),fs*(C.rfs||1),C)}</g>`}
  sv.innerHTML=`<defs>${M.defs(cfg.id)}<radialGradient id="${cfg.id}RubG"><stop offset="0" stop-color="#555"/><stop offset=".7" stop-color="#bbb"/><stop offset="1" stop-color="#fff"/></radialGradient>
     <mask id="${cfg.id}Rub" maskUnits="userSpaceOnUse" x="0" y="0" width="${bw}" height="${bh}"><rect width="${bw}" height="${bh}" fill="#fff"/><ellipse cx="${rx}" cy="${ryy}" rx="${fs*4.2}" ry="${fs*2.2}" fill="url(#${cfg.id}RubG)" transform="rotate(-14 ${rx} ${ryy})"/></mask>
     <clipPath id="${cfg.id}RubC"><ellipse cx="${rx}" cy="${ryy}" rx="${fs*4}" ry="${fs*2}" transform="rotate(-14 ${rx} ${ryy})"/></clipPath><filter id="${cfg.id}Bl"><feGaussianBlur stdDeviation="${(fs*.22).toFixed(2)}"/></filter></defs>
     <g filter="url(#${cfg.id}Mat)" class="pq-marks" style='font-family:${M.font},cursive'>${s}</g>`;
  /* lines draw in on view and on a switch */
  if(anim&&!matchMedia('(prefers-reduced-motion: reduce)').matches){root.classList.remove('pq-re');void root.offsetWidth;root.classList.add('pq-re')}
  /* rows off the surface: a strip of the same surface under the picture */
  const rw=root.querySelector('.pq-rw');if(!C.rows){rw.hidden=false;const sv2=root.querySelector('.pq-sv2'),W2=rw.clientWidth,pad=wide?24:10,ww=Math.min(W2-pad*2,wide?780:400),hh=ww*(wide?.28:.5),f2=cfg.rfs2*(ww/340);
    rw.style.height=(hh+pad*2)+'px';sv2.style.cssText=`position:absolute;left:${(W2-ww)/2}px;top:${pad}px`;sv2.setAttribute('viewBox',`0 0 ${ww} ${hh}`);sv2.setAttribute('width',ww);sv2.setAttribute('height',hh);
    sv2.innerHTML=`<defs>${M.defs(cfg.id+'2')}</defs><g filter="url(#${cfg.id}2Mat)" style='font-family:${M.font},cursive'>${rowsSvg(wid,ww,hh,f2,{nameW:.3})}</g>`;
    if(cfg.strip)cfg.strip(rw,S,C)}else rw.hidden=true;
  root.querySelector('.pq-sr').innerHTML=PG.srTable(w);
  if(cfg.after2)cfg.after2(root,{S,C,Qp,bw,bh,X,Y,G,w,fs})};
T.after=function(root){let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;T.draw(root,root.dataset.win)}})};
return T}
window.PN2={IMG:'/tools/concepts/worlds/comic/story/h/pnl2/img/'};
/* materials */
PN2.wax={font:'"Permanent Marker"',chalk:'#e9eef0',dim:'#9fb3c4',gold:'#ffd23f',up:'#8ff0b4',dn:'#ff9a88',lw:2.6,rule:1.2,
  ink:(m,ld)=>ld?'#ffd23f':({GPT:'#4fe0a8',KIMI:'#5aa8ff',CLAUDE:'#ff9a5c',GROK:'#f2f2ec'})[m],
  /* wax on glass: the pencil drags (small dropouts), a slight wobble, a faint glow where the edge light catches the wax */
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.6 2.15" result="drop"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.5" result="w"/>
    <feComposite in="w" in2="drop" operator="in" result="wax"/><feGaussianBlur in="w" stdDeviation="2.2" result="g"/><feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".45"/></feComponentTransfer>
    <feMerge><feMergeNode in="g2"/><feMergeNode in="wax"/></feMerge></filter>`,
  base:(x0,x1,y)=>`<path d="M${x0} ${(y-2.6).toFixed(1)} L${x1} ${(y-1.8).toFixed(1)} L${x1-1} ${(y+2.8).toFixed(1)} L${x0+1} ${(y+2.2).toFixed(1)}Z" fill="#e8dcb8" fill-opacity=".72"/><path d="M${x0+3} ${(y-.6).toFixed(1)} L${x1-4} ${(y).toFixed(1)}" stroke="#fff6" stroke-width=".6"/>`};
PN2.chalk={font:'"Cabin Sketch"',chalk:'#f1efe6',dim:'#b9bdb0',gold:'#ffd86a',up:'#a9f0bf',dn:'#ffaa9a',lw:3,rule:1.3,rw:2.6,
  ink:(m,ld)=>ld?'#ffd86a':({GPT:'#8fe6bd',KIMI:'#8fc2ff',CLAUDE:'#ffb488',GROK:'#f4f2ea'})[m],
  /* chalk on slate: the stick skips over the grain (heavy dropouts), a little dust around every stroke */
  defs:id=>`<filter id="${id}Mat" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves="2" seed="11" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3.4 2.55" result="drop"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" result="w"/>
    <feComposite in="w" in2="drop" operator="in" result="ch"/><feGaussianBlur in="w" stdDeviation="1.4" result="g"/><feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
    <feMerge><feMergeNode in="g2"/><feMergeNode in="ch"/></feMerge></filter>`,
  base:(x0,x1,y)=>`<path d="M${x0} ${(y-1.6).toFixed(1)} L${x1} ${(y-1).toFixed(1)}" stroke="#f1efe6" stroke-width="1.6" fill="none"/><path d="M${x0} ${(y+1.8).toFixed(1)} L${x1} ${(y+2.3).toFixed(1)}" stroke="#f1efe6" stroke-width="1.2" fill="none"/>`};
