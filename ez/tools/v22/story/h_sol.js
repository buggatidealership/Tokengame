/* H_SOL "Smart or lucky?" on the big board (owner, 2026-10-31: take F of round H6 pnl2, "On the big board"; from
   tools/concepts/worlds/comic/story/h/pnl2/{_g.js,_s.js,f.js}). A 1920s exchange: the chart is chalked on the slate wall in its
   perspective (one homography, a CSS matrix3d onto the slate's four measured corners), the clerk on his ladder and the crowd stand in
   front of it (the painting's own foreground, cut out and laid over the marks), and the rows are chalked on a strip of the same slate
   under the picture. Every word and number is live page text in chalk (one SVG filter: the stick skipping over the grain).
   Two views, chalked as a switch on the slate: Accuracy (default): each AI's hit rate after every graded round, (right + 1) / (calls + 2),
   so every line starts at 50/50, against the coin flip at 50%; the raw hit rate where each line ends. P&L: the flat P&L ($100,000 on
   every call, window.__x2pPnl) over Season / 7 days / 24 hours, with R11's window rules (24 hours: each round at its own exchange's
   close within 24 hours; 7 days: the calendar days today and the six before, New York). Lines chalk in (one wipe along time) when the
   board comes into view and on every switch; nothing moves with reduced motion. Paintings load only when the section is near.
   X3+ only: waits for html.p1-on (never with cd-on). The page's own .wc-splash content stays in the DOM, hidden. Classes hs-.
   A failure is kept in window.__x2pHsolErr. */
(function(){
const H=document.documentElement,D=document,RM=matchMedia('(prefers-reduced-motion: reduce)');
/* full file names written out: make_site.py copies only media named in the page */
const IMG={p:'media/sol-board-f1-3x4.jpg',pf:'media/sol-board-f1-3x4-fg.webp',w:'media/sol-board-f1-16x9.jpg',wf:'media/sol-board-f1-16x9-fg.webp'};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
/* chalk: one stick per AI, the leader's in gold; up and down in green and red chalk */
const INK={GPT:'#8fe6bd',KIMI:'#8fc2ff',CLAUDE:'#ffb488',GROK:'#f4f2ea'},CH='#f1efe6',DIM='#b9bdb0',GOLD='#ffd86a',UP='#a9f0bf',DN='#ffaa9a';
const FONT='"Cabin Sketch","Shantell Sans",cursive';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rnd=s=>{const x=Math.sin(s*9301+49297)*233280;return x-Math.floor(x)};
const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const pc=v=>v==null?'–':Math.round(v*100)+'%';

/* ---------- data: everything from ROUNDS and __x2pPnl ---------- */
/* each exchange's close, local time (world-comic.js XC/closeAt, verbatim) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
function data(){
  const P=window.__x2pPnl().A,MS=Object.keys(P).filter(m=>NM[m]),RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a)).slice().sort((a,b)=>a.n-b.n),N=RS.length;
  const per=(m,r)=>P[m].per[r.n]?P[m].per[r.n].v:0;
  /* accuracy: the running hit rate (the Leaderboard's formula), the raw hit rate, the last 10 calls; ranked like the board (an AI that
     called fewer than half the graded rounds goes after the rest), then by hit rate */
  const A={};MS.forEach(m=>{let k=0,n=0;const s=[.5];RS.forEach(r=>{const x=P[m].per[r.n];if(x){n++;if(x.v>0)k++}s.push((k+1)/(n+2))});
    const t=P[m].W+P[m].L,l10=P[m].seq.slice(-10);A[m]={s,W:P[m].W,L:P[m].L,t,hr:t?P[m].W/t:null,l10w:l10.filter(x=>x==='W').length,l10n:l10.length}});
  const q=m=>A[m].t*2>=N;
  const arank=MS.slice().sort((a,b)=>(q(b)-q(a))||((A[b].hr||0)-(A[a].hr||0))||(A[b].W-A[a].W));
  /* P&L windows: R11's rules (world-comic.js r11Lb / story/sb_ss.js WS) */
  const NOW=Date.now(),T=nyToday(),today=Date.UTC(2000+T[2],T[0]-1,T[1]);
  const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
  const WD=[{k:'season',t:'Season',lab:'the season',f:()=>true},
    {k:'d7',t:'7 days',lab:'the last 7 days',f:r=>{const a=dAgo(r);return a>=0&&a<=6}},
    {k:'d1',t:'24h',lab:'the last 24 hours',f:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=closeAt(r.ticker,r.resolves);return c!=null&&c>NOW-864e5}}];
  const W={};WD.forEach(w=>{const rs=RS.filter(w.f),ser={},tot={};
    MS.forEach(m=>{let b=0;ser[m]=[0];rs.forEach(r=>{b+=per(m,r);ser[m].push(b)});tot[m]=b});
    const rank=MS.slice().sort((a,b)=>w.k==='season'?((q(b)-q(a))||(tot[b]-tot[a])):(tot[b]-tot[a])||(P[b].pnl-P[a].pnl));
    W[w.k]={...w,rs,ser,tot,rank,n:rs.length,first:rs[0],last:rs[rs.length-1]}});
  return {P,MS,RS,N,A,arank,W}}

/* ---------- drawing helpers (in the surface's own box, CSS px) ---------- */
let CTX=null;const tw=(t,s)=>{CTX=CTX||D.createElement('canvas').getContext('2d');CTX.font=`700 ${s}px ${FONT}`;return CTX.measureText(t).width};
const tx=(x,y,s,t,o)=>{o=o||{};return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||CH}"${o.r?` transform="rotate(${o.r} ${x.toFixed(1)} ${y.toFixed(1)})"`:''}${o.cls?` class="${o.cls}"`:''}>${o.raw||esc(t)}</text>`};
/* a chalked rule: a slightly wavy line */
const rule=(x0,y0,x1,y1,c,w,seed)=>{const n=6,p=[];for(let i=0;i<=n;i++){const t=i/n;p.push([x0+(x1-x0)*t,y0+(y1-y0)*t+(rnd(seed*7+i)-.5)*1.3])}return `<path d="M${p.map(a=>a[0].toFixed(1)+' '+a[1].toFixed(1)).join(' L')}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`};
/* a chalked ring round a word (the open view, the open window, the open column) */
const ring=(cx,cy,rx,ry,c,seed)=>{let d='';const n=26;for(let i=0;i<=n+3;i++){const a=-2.2+i/n*Math.PI*2,k=1+(rnd(seed+i)-.5)*.08+i*.004;d+=(i?'L':'M')+(cx+Math.cos(a)*rx*k).toFixed(1)+' '+(cy+Math.sin(a)*ry*k).toFixed(1)+' '}
  return `<path d="${d}" stroke="${c}" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`};
/* the line every view is measured against ($0, the coin's 50%): drawn twice, as a clerk underlines the thing that matters */
const base=(x0,x1,y)=>`<path d="M${x0.toFixed(1)} ${(y-1.6).toFixed(1)} L${x1.toFixed(1)} ${(y-1).toFixed(1)}" stroke="${CH}" stroke-width="1.6" fill="none"/><path d="M${x0.toFixed(1)} ${(y+1.8).toFixed(1)} L${x1.toFixed(1)} ${(y+2.3).toFixed(1)}" stroke="${CH}" stroke-width="1.2" fill="none"/>`;
/* chalk on slate: the stick skips over the grain (heavy dropouts), a little dust around every stroke */
const mat=id=>`<filter id="${id}" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves="2" seed="11" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3.4 2.55" result="drop"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.8" result="w"/>
  <feComposite in="w" in2="drop" operator="in" result="ch"/><feGaussianBlur in="w" stdDeviation="1.4" result="g"/><feComponentTransfer in="g" result="g2"><feFuncA type="linear" slope=".22"/></feComponentTransfer>
  <feMerge><feMergeNode in="g2"/><feMergeNode in="ch"/></feMerge></filter>`;
const ticks=(lo,hi,k)=>{const raw=(hi-lo)/(k||4),p=Math.pow(10,Math.floor(Math.log10(raw))),st=[1,2,2.5,5,10].map(x=>x*p).find(x=>x>=raw);const o=[];for(let v=Math.ceil(lo/st)*st;v<=hi;v+=st)o.push(Math.round(v*1e6)/1e6);return o};
/* end labels pushed apart so they never touch, order kept */
function spread(it,gap,min,max){const a=it.slice().sort((x,y)=>x.y-y.y);for(let i=1;i<a.length;i++)if(a[i].y-a[i-1].y<gap)a[i].y=a[i-1].y+gap;
  const ov=a.length?a[a.length-1].y-max:0;if(ov>0){a[a.length-1].y-=ov;for(let i=a.length-2;i>=0;i--)if(a[i+1].y-a[i].y<gap)a[i].y=a[i+1].y-gap}
  if(a.length&&a[0].y<min){const d=min-a[0].y;a.forEach(x=>x.y+=d)}return a}
/* homography: the rect (0,0)-(w,h) onto the quad p (tl,tr,br,bl) as a CSS matrix3d (transform-origin 0 0) */
function m3d(w,h,p){const [x0,y0]=p[0],[x1,y1]=p[1],[x2,y2]=p[2],[x3,y3]=p[3];
  const dx1=x1-x2,dx2=x3-x2,dy1=y1-y2,dy2=y3-y2,sx=x0-x1+x2-x3,sy=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(sx*dy2-dx2*sy)/den,hh=(dx1*sy-sx*dy1)/den,a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  return `matrix3d(${[a/w,d/w,0,g/w,b/h,e/h,0,hh/h,0,0,1,0,c,f,0,1].map(v=>+v.toFixed(8)).join(',')})`}
const qsize=Q=>[(Math.hypot(Q[1][0]-Q[0][0],Q[1][1]-Q[0][1])+Math.hypot(Q[2][0]-Q[3][0],Q[2][1]-Q[3][1]))/2,(Math.hypot(Q[3][0]-Q[0][0],Q[3][1]-Q[0][1])+Math.hypot(Q[2][0]-Q[1][0],Q[2][1]-Q[1][1]))/2];

/* ---------- the two paintings: the slate's corners and where the parts sit, measured on these files ----------
   Q: the slate's corners in painting px (tl,tr,br,bl); u/v are fractions of the slate. top: switch row v, lead row v, the windows'
   span [u0,u1]; chart [u0,v0,u1,v1]. The 3x4 is cropped for phones (the board, the clerk, the first heads of the crowd). */
const CF={
 phone:{src:IMG.p,fg:IMG.pf,iw:768,ih:1024,Q:[[25,250],[522,122],[522,605],[25,598]],crop:W=>({w:W*1.34,ox:25*(W*1.34/768)-W*.02,top:.09,bot:.8}),
   fs:13,ref:340,min:12,minS:12.5,sw:.075,win:[.5,.97],chart:[.17,.36,.74,.91]},
 wide:{src:IMG.w,fg:IMG.wf,iw:1280,ih:720,Q:[[255,190],[860,95],[860,480],[255,492]],crop:()=>({}),
   fs:13,ref:380,min:13,minS:12,sw:.075,win:[.56,.97],chart:[.12,.3,.73,.89]}};
/* the rows' slate: a clean panel of the same wall (3x4 painting, between its two dividers) */
const SLATE=[200,330,505,590];

function stage(st,C){const W=st.clientWidth,o=C.crop(W),s=(o.w||W)/C.iw,ox=o.ox!=null?o.ox:(C.iw*s-W)/2,top=(o.top||0)*C.ih*s,bot=(o.bot!=null?o.bot:1)*C.ih*s;
  st.style.height=(bot-top).toFixed(1)+'px';
  const put=(im)=>{im.style.cssText=`left:${(-ox).toFixed(1)}px;top:${(-top).toFixed(1)}px;width:${(C.iw*s).toFixed(1)}px;height:${(C.ih*s).toFixed(1)}px`};
  st.querySelectorAll('img').forEach(put);
  return {s,ox,top,P:(x,y)=>[x*s-ox,y*s-top]}}

/* ---------- the board: switch, lead line, chart ---------- */
function board(V,X0,C,wide,bw,bh,fs){const ac=V.view==='acc',w=X0.W[V.win];let s='',L='';
  /* the switch: two words chalked at the top left, the open one ringed in gold; a tap on the writing switches */
  const sy=bh*C.sw,vs=fs*1.18,v1=tw('Accuracy',vs),v2=tw('P&L',vs),gx=fs*1.4;let x=bw*.035;
  [['acc','Accuracy',v1],['pnl','P&L',v2]].forEach(([k,t,tw0],i)=>{const on=V.view===k,cx=x+tw0/2;
    s+=`<g class="hs-tab" data-hs-view="${k}" role="button" tabindex="0" aria-pressed="${on}" aria-label="${k==='acc'?'Accuracy':'P&amp;L'} view"><rect x="${(x-fs*.4).toFixed(1)}" y="${(sy-vs*1.15).toFixed(1)}" width="${(tw0+fs*.8).toFixed(1)}" height="${(vs*1.8).toFixed(1)}" fill="#000" fill-opacity="0"/>`
      +tx(x,sy,vs,t,{c:on?GOLD:DIM})+(on?ring(cx,sy-vs*.34,tw0/2+fs*.55,vs*.82,GOLD,i*9+3):'')+'</g>';x+=tw0+gx});
  /* the windows (P&L only), chalked smaller at the top right */
  if(!ac){const ws=fs*.95,W0=[['season','Season'],['d7','7 days'],['d1','24h']],ww=W0.map(a=>tw(a[1],ws)),u0=bw*C.win[0],u1=bw*C.win[1],gap=Math.max(fs*.6,(u1-u0-ww.reduce((a,b)=>a+b,0))/2);
    let wx=u1-ww.reduce((a,b)=>a+b,0)-gap*2;W0.forEach(([k,t],i)=>{const on=V.win===k,cx=wx+ww[i]/2;
      s+=`<g class="hs-tab" data-hs-win="${k}" role="button" tabindex="0" aria-pressed="${on}" aria-label="${k==='season'?'Season':k==='d7'?'Last 7 days':'Last 24 hours'}"><rect x="${(wx-fs*.35).toFixed(1)}" y="${(sy-ws*1.2).toFixed(1)}" width="${(ww[i]+fs*.7).toFixed(1)}" height="${(ws*1.9).toFixed(1)}" fill="#000" fill-opacity="0"/>`
        +tx(wx,sy,ws,t,{c:on?GOLD:DIM})+(on?ring(cx,sy-ws*.34,ww[i]/2+fs*.45,ws*.8,GOLD,i*7+5):'')+'</g>';wx+=ww[i]+gap})}
  /* the lead line, under the switch: one sentence, the figure in gold; a smaller line under it says what is counted */
  const ly=sy+fs*2.05,lx=bw*.035,sm=Math.max(fs*.8,C.minS);let lead,sub,l1=fs*1.05;
  if(ac){const m=X0.arank[0],a=X0.A[m];lead=`${esc(NM[m])} is right <tspan fill="${GOLD}">${pc(a.hr)} of the time</tspan>`;sub='a coin flip gets 50%'}
  else if(w.n){const a=w.rank[0],b=w.rank[1];lead=`${esc(NM[a])} leads ${w.lab} by <tspan fill="${GOLD}">${esc($f(w.tot[a]-w.tot[b]).replace('+',''))}</tspan>`;sub='if you’d bet $100K on every call'}
  else{lead='No round closed in '+w.lab;sub='the board stays clean till the next close'}
  /* the sentence fits the slate: stepped down (never under the small chalk's size) where the slate is narrow */
  {const room=bw*.93,lw0=tw(lead.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&'),l1);if(lw0>room)l1=Math.max(sm,l1*room/lw0)}
  s+=tx(lx,ly,l1,'',{raw:lead,r:-.6})+tx(lx+fs*.1,ly+Math.max(fs*1.15,sm*1.2),sm,sub,{c:DIM,r:-.6});
  /* the chart */
  const ch=C.chart,cx0=bw*ch[0],cy0=Math.max(bh*ch[1],ly+Math.max(fs*1.15,sm*1.2)+fs*1.3),cx1=bw*ch[2],cy1=bh*ch[3],ph=cy1-cy0;
  let ser,lo,hi,n,rank,lab,val,col,lead0;
  if(ac){n=X0.N;ser=X0.A;rank=X0.arank;lead0=rank[0];const all=[].concat(...X0.MS.map(m=>ser[m].s));lo=Math.min(.3,Math.min(...all)-.02);hi=Math.max(.8,Math.max(...all)+.02)}
  else{n=w.n;rank=w.rank;lead0=rank[0];const all=[].concat(...X0.MS.map(m=>w.ser[m]));const lo0=Math.min(0,...all),hi0=Math.max(0,...all),pd=(hi0-lo0||1)*.07;lo=lo0-pd;hi=hi0+pd}
  const Y=v=>cy1-(v-lo)/(hi-lo)*ph,X=i=>cx0+(n?i/n:0)*(cx1-cx0);
  if(ac){[.4,.6,.7].forEach((v,i)=>{s+=rule(cx0,Y(v),cx1,Y(v),DIM,.6,i+3)+tx(cx0-fs*.3,Y(v)+sm*.35,sm,Math.round(v*100)+'%',{a:'end',c:DIM})});
    s+=base(cx0-fs*.2,cx1+fs*.3,Y(.5))+tx(cx0-fs*.3,Y(.5)+sm*.35,sm*1.05,'50%',{a:'end'})}
  else{if(n)ticks(lo,hi,wide?4:3).forEach((v,i)=>{if(v)s+=rule(cx0,Y(v),cx1,Y(v),DIM,.6,i+5)+tx(cx0-fs*.3,Y(v)+sm*.35,sm,k$(v).replace('.0K','K'),{a:'end',c:DIM})});
    if(n)s+=base(cx0-fs*.2,cx1+fs*.3,Y(0))+tx(cx0-fs*.3,Y(0)+sm*.35,sm*1.05,'$0',{a:'end'})}
  const rs=ac?X0.RS:w.rs;
  /* an empty window: the board wiped clean, the eraser's smear left in the dust */
  if(!rs.length){let d='';for(let i=0;i<4;i++){const y=cy0+ph*(.18+i*.2),a=cx0+(cx1-cx0)*(.05+rnd(i+31)*.08),z=cx1-(cx1-cx0)*(.04+rnd(i+37)*.1);d+=`M${a.toFixed(1)} ${y.toFixed(1)} C${(a+(z-a)*.3).toFixed(1)} ${(y-ph*.07).toFixed(1)} ${(a+(z-a)*.7).toFixed(1)} ${(y+ph*.07).toFixed(1)} ${z.toFixed(1)} ${(y-ph*.02).toFixed(1)} `}
    s+=`<path d="${d}" stroke="${CH}" stroke-opacity=".07" stroke-width="${(fs*2.6).toFixed(1)}" fill="none" stroke-linecap="round" filter="url(#hsEr)"/>`}
  if(rs.length)s+=tx(cx0,cy1+sm*1.25,sm,'R'+rs[0].n,{c:DIM})+(rs.length>1?tx(cx1,cy1+sm*1.25,sm,'R'+rs[rs.length-1].n,{a:'end',c:DIM}):'');
  /* the lines (the leader's in gold, drawn last), and what each line ends on, chalked beside its end */
  if(n){const sr=m=>ac?ser[m].s:w.ser[m];
    L+=rank.slice().reverse().map(m=>{const ld=m===lead0,p=sr(m);return `<path class="hs-ln" d="${p.map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" stroke="${ld?GOLD:INK[m]}" stroke-width="${ld?3.6:2.9}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`}).join('');
    const one=ac,gap=one?fs*1.25:fs*2.1;
    const ends=spread(rank.map(m=>{const p=sr(m);return {m,y:Y(p[p.length-1])}}),gap,cy0+fs*.5,cy1-(one?fs*.1:fs*.9));
    L+=ends.map(e=>{const ld=e.m===lead0,ex=cx1+fs*.5,c=ld?GOLD:INK[e.m];
      if(one){const h=X0.A[e.m].hr;return tx(ex,e.y+fs*.32,fs*.95,'',{raw:`<tspan fill="${c}">${esc(NM[e.m])}</tspan> <tspan fill="${ld?GOLD:h>.5?UP:h<.5?DN:DIM}">${pc(h)}</tspan>`})}
      const v=w.tot[e.m];return tx(ex,e.y-fs*.1,fs*.92,NM[e.m],{c})+tx(ex,e.y+fs*.92,fs*.92,v?k$(v):'·',{c:ld?GOLD:v>0?UP:v<0?DN:DIM})}).join('')}
  return {s,L,cx0,bw}}

/* ---------- the rows, chalked on a strip of the same slate ---------- */
function rows(V,X0,ww,f2){const ac=V.view==='acc',w=X0.W[V.win];let s='';
  const cols=ac?[['wl','W-L'],['l10','Last 10'],['hr','Hit rate']]:[['d1','24h'],['d7','7 days'],['season','Season']],open=ac?'hr':V.win;
  const rank=ac?X0.arank:w.rank,x0=ww*.32,cw=(ww-x0)/3,rh=f2*2.05,top=f2*1.5;
  cols.forEach(([k,l],i)=>{const cx=x0+cw*(i+.5),on=k===open;s+=tx(cx,top,f2*.86,l,{a:'middle',c:on?GOLD:DIM});if(on)s+=ring(cx,top-f2*.3,Math.min(cw*.46,tw(l,f2*.86)/2+f2*.7),f2*.78,GOLD,i*5+3)});
  s+=rule(2,top+f2*.62,ww-2,top+f2*.62,CH,1.3,9);
  rank.forEach((m,i)=>{const y=top+f2*.62+rh*(i+.72),ld=i===0;
    s+=tx(2,y,f2*.74,String(i+1),{c:DIM})+tx(f2*1.05,y,f2*1.06,NM[m],{c:ld?GOLD:INK[m]});
    const cell=ac?(()=>{const a=X0.A[m];return [[a.W+'-'+a.L,CH],[a.l10n?a.l10w+' of '+a.l10n:'–',a.l10n?(a.l10w*2>a.l10n?UP:a.l10w*2<a.l10n?DN:DIM):DIM],[pc(a.hr),ld?GOLD:a.hr>.5?UP:a.hr<.5?DN:DIM]]})()
      :cols.map(([k])=>{const v=X0.W[k].tot[m];return [X0.W[k].n?k$(v):'·',k===open&&ld&&v?GOLD:v>0?UP:v<0?DN:DIM]});
    cell.forEach(([t,c],k)=>{const on=cols[k][0]===open;s+=tx(x0+cw*(k+.5),y,f2*(on?1.08:.94),t,{a:'middle',c})});
    if(i<rank.length-1)s+=rule(2,y+rh*.36,ww-2,y+rh*.36,CH,.7,i*11+2)});
  const fy=top+f2*.62+rh*rank.length+f2*.55,fine=ac?['W = the stock moved the way the AI called it.','Every line starts at 50/50 and moves with each call.']:['Each call is its own $100K bet. Buy on up, short on down.','No leverage. Before fees.'];
  fine.forEach((t,i)=>{s+=tx(ww/2,fy+f2*(.5+i*1.05),f2*.7,t,{a:'middle',c:DIM})});
  return {s,h:fy+f2*(.5+fine.length*1.05)+f2*.2}}

/* an accessible copy of the open view */
function sr(V,X0){if(V.view==='acc')return `<table><caption>Hit rate by AI, season (a coin flip gets 50%)</caption><tr><th>AI</th><th>W-L</th><th>Last 10 calls</th><th>Hit rate</th></tr>${X0.arank.map(m=>{const a=X0.A[m];return `<tr><th>${NM[m]}</th><td>${a.W}-${a.L}</td><td>${a.l10w} of ${a.l10n}</td><td>${pc(a.hr)}</td></tr>`}).join('')}</table>`;
  const w=X0.W[V.win];return `<table><caption>P&amp;L by AI if you’d bet $100K on every call, ranked by ${w.k==='season'?'season':w.t}</caption><tr><th>AI</th><th>Last 24 hours</th><th>Last 7 days</th><th>Season</th></tr>${w.rank.map(m=>`<tr><th>${NM[m]}</th><td>${$f(X0.W.d1.tot[m])}</td><td>${$f(X0.W.d7.tot[m])}</td><td>${$f(X0.W.season.tot[m])}</td></tr>`).join('')}</table>`}

/* ---------- mount ---------- */
function html(){return `<div class="hs-wrap">
  <h2 class="hs-h"><span class="hs-w">Smart or</span> <span class="hs-w hs-w2">lucky?</span></h2>
  <div class="hs-st"><img class="hs-bg" alt="" decoding="async"><div class="hs-sf"><svg class="hs-bd" role="group" aria-label="Chalk board: the view switch and the chart"></svg><div class="hs-lw"><svg class="hs-ln" aria-hidden="true"></svg></div></div><img class="hs-fg" alt="" decoding="async"></div>
  <div class="hs-rw"><svg class="hs-rs" aria-hidden="true"></svg></div>
  <div class="hs-sr" aria-live="polite"></div></div>`}
function mount(sec){
  const X0=data(),V={view:'acc',win:'season'},wrap=sec.querySelector('.hs-wrap'),st=wrap.querySelector('.hs-st'),sf=wrap.querySelector('.hs-sf'),bd=wrap.querySelector('.hs-bd'),lw=wrap.querySelector('.hs-lw'),ln=wrap.querySelector('.hs-ln'),rw=wrap.querySelector('.hs-rw'),rs=wrap.querySelector('.hs-rs');
  let seen=RM.matches||!('IntersectionObserver' in window),near=!('IntersectionObserver' in window),wipeA=null,lastStart=0;
  const kind=()=>st.clientWidth>=700?'wide':'phone';
  function wipe(){if(wipeA){try{wipeA.cancel()}catch(e){}wipeA=null}lw.classList.remove('hs-wait');if(RM.matches||!lw.animate)return;
    const r=(100-lastStart).toFixed(2);wipeA=lw.animate([{clipPath:`inset(-30% ${r}% -30% -30%)`},{clipPath:'inset(-30% -30% -30% -30%)'}],{duration:1500,easing:'cubic-bezier(.35,0,.25,1)'});wipeA.onfinish=()=>{wipeA=null}}
  function draw(anim){if(!st.clientWidth||!rw.clientWidth)return;const k=kind(),C=CF[k],wide=k==='wide';
    const bg=st.querySelector('.hs-bg'),fg=st.querySelector('.hs-fg');if(near){if(bg.getAttribute('src')!==C.src)bg.src=C.src;if(fg.getAttribute('src')!==C.fg)fg.src=C.fg}
    const S=stage(st,C),Qp=C.Q.map(q=>S.P(q[0],q[1])),[bw,bh]=qsize(Qp),tf=m3d(bw,bh,Qp);
    sf.style.cssText=`width:${bw.toFixed(1)}px;height:${bh.toFixed(1)}px;transform:${tf}`;
    const fs=Math.max(C.min,C.fs*(bw/C.ref)),B=board(V,X0,C,wide,bw,bh,fs);lastStart=B.cx0/bw*100;
    [bd,ln].forEach(v=>{v.setAttribute('viewBox',`0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}`);v.setAttribute('width',bw.toFixed(1));v.setAttribute('height',bh.toFixed(1))});
    bd.innerHTML=`<defs>${mat('hsMb')}<filter id="hsEr" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="${(fs*.5).toFixed(1)}"/></filter></defs><g filter="url(#hsMb)" style='font-family:${FONT};font-weight:700'>${B.s}</g>`;
    ln.innerHTML=`<defs>${mat('hsMl')}</defs><g filter="url(#hsMl)" style='font-family:${FONT};font-weight:700'>${B.L}</g>`;
    /* the rows strip: the slate panel laid under, the rows chalked on it */
    const W2=rw.clientWidth,pad=wide?22:12,ww=Math.min(W2-pad*2,wide?760:430),f2=Math.max(12.5,Math.min(wide?18:15.5,ww/(wide?44:27))),R=rows(V,X0,ww,f2),hh=R.h+pad*2;
    rw.style.height=hh.toFixed(1)+'px';rs.style.cssText=`left:${((W2-ww)/2).toFixed(1)}px;top:${pad}px`;rs.setAttribute('viewBox',`0 0 ${ww.toFixed(1)} ${R.h.toFixed(1)}`);rs.setAttribute('width',ww.toFixed(1));rs.setAttribute('height',R.h.toFixed(1));
    rs.innerHTML=`<defs>${mat('hsMr')}</defs><g filter="url(#hsMr)" style='font-family:${FONT};font-weight:700'>${R.s}</g>`;
    if(near){const s2=Math.max(W2/(SLATE[2]-SLATE[0]),hh/(SLATE[3]-SLATE[1]));rw.style.backgroundImage=`url(${IMG.p})`;rw.style.backgroundSize=`${(768*s2).toFixed(1)}px ${(1024*s2).toFixed(1)}px`;
      rw.style.backgroundPosition=`${(-SLATE[0]*s2-((SLATE[2]-SLATE[0])*s2-W2)/2).toFixed(1)}px ${(-SLATE[1]*s2-((SLATE[3]-SLATE[1])*s2-hh)/2).toFixed(1)}px`}
    wrap.querySelector('.hs-sr').innerHTML=sr(V,X0);wrap.dataset.view=V.view;wrap.dataset.win=V.win;
    if(!seen)lw.classList.add('hs-wait');else if(anim)wipe()}
  const set=(v,w,focus)=>{if(v)V.view=v;if(w)V.win=w;draw(true);if(focus){const b=bd.querySelector(focus);if(b)b.focus({preventScroll:true})}};
  bd.addEventListener('click',e=>{const b=e.target.closest('[data-hs-view],[data-hs-win]');if(!b)return;const v=b.dataset.hsView,w=b.dataset.hsWin;
    if((v&&v===V.view)||(w&&w===V.win))return;set(v,w,v?`[data-hs-view="${v}"]`:`[data-hs-win="${w}"]`)});
  bd.addEventListener('keydown',e=>{const b=e.target.closest&&e.target.closest('[data-hs-view],[data-hs-win]');if(!b)return;
    if(e.key==='Enter'||e.key===' '){e.preventDefault();b.dispatchEvent(new MouseEvent('click',{bubbles:true}));return}
    const grp=[...bd.querySelectorAll(b.dataset.hsView?'[data-hs-view]':'[data-hs-win]')],i=grp.indexOf(b),j={ArrowRight:i+1,ArrowLeft:i-1,Home:0,End:grp.length-1}[e.key];
    if(j==null||j<0||j>=grp.length)return;e.preventDefault();grp[j].dispatchEvent(new MouseEvent('click',{bubbles:true}))});
  draw(false);
  if('IntersectionObserver' in window){
    new IntersectionObserver((es,o)=>{if(es.some(x=>x.isIntersecting)){o.disconnect();near=true;draw(false)}},{rootMargin:'900px 0px'}).observe(wrap);
    if(!seen)new IntersectionObserver((es,o)=>{if(es.some(x=>x.isIntersecting)){o.disconnect();seen=true;wipe()}},{threshold:.35}).observe(st)}
  let w0=wrap.clientWidth,rt=0;
  if(window.ResizeObserver)new ResizeObserver(()=>{const w=wrap.clientWidth;if(!w||w===w0)return;w0=w;clearTimeout(rt);rt=setTimeout(()=>draw(false),120)}).observe(wrap);
  if(D.fonts&&D.fonts.load)D.fonts.load(`700 20px "Cabin Sketch"`).then(()=>{CTX=null;draw(false)}).catch(()=>{});
  window.__x2pHsol={V,X0,draw:()=>draw(false),set}}
function dress(){const sec=D.querySelector('#wc-book .wc-splash');if(!sec||sec.classList.contains('hs-on'))return;
  sec.insertAdjacentHTML('beforeend',html());sec.classList.add('hs-on');H.classList.add('hs-ready');mount(sec)}
function start(){if(!D.getElementById('hs-font')){const l=D.createElement('link');l.id='hs-font';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Cabin+Sketch:wght@700&display=swap';D.head.appendChild(l)}
  try{dress()}catch(e){window.__x2pHsolErr=e;console.error('h_sol',e);return}
  const main=D.querySelector('main');if(main)new MutationObserver(()=>{try{dress()}catch(e){window.__x2pHsolErr=e}}).observe(main,{childList:true})}
(function wait(n){if(H.classList.contains('p1-on')&&!H.classList.contains('cd-on')&&D.querySelector('#wc-book .wc-splash')&&window.__x2pPnl&&window.ROUNDS)start();else if(n<480)setTimeout(()=>wait(n+1),250)})(0);
})();
