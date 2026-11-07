/* Round H24 · board5: frame 4, BOARD, shows the whole field. A drop-in for x2p_top.js's frame 4 (li.q4-board), laid over the built page.
   window.__B5  = take: 'a' the rack (four sockets, the leader's gold), 'b' back to the chip (the opening chip's four dies, ranked),
                  'c' the trophy socket (the leader big on top, the other three below), 'd' the bus (the ledger feeds the four sockets).
   window.__B5W = what each rank window says: 'name' (rank + name, default) or 'pnl' (rank + season P&L, short).
   window.__B5IMG = folder of the paintings (default this folder's img/); the chips are Meet the models' own paintings, media/chip7-<m>-1200.jpg.
   Live: the order (season P&L, __x2pPnl), each rank numeral, each name (or P&L). Painted: the board, the sockets, the windows, and on each chip
   its mark, flag, name and version (the very chip the visitor meets below). Every figure lit in its glass, the glass's glare screened back over it. */
(function(){var n=0;(function go(){const li=document.querySelector('li.q4-board');if(!li||!window.__x2pPnl||!window.__t5){if(++n<400)setTimeout(go,50);return}
try{
const D=document,W=window,T=W.__B5||'a',WM=W.__B5W||'name',IMG=W.__B5IMG||'tools/concepts/worlds/comic/story/h/board5/img/',MED='media/';
const A=W.__x2pPnl().A,MD=W.MODELS||{},NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const rank=Object.keys(A).filter(m=>MD[m]).sort((a,b)=>A[b].bal-A[a].bal);
const pnl=m=>A[m].bal-100000,k$=v=>(v<0?'−':'+')+'$'+(Math.abs(v)>=1e6?(Math.abs(v)/1e6).toFixed(2)+'M':Math.round(Math.abs(v)/1000)+'K');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const em=c=>c==='up'?'url(#q4up)':c==='dn'?'url(#q4dn)':c==='gd'?'url(#q4gd)':'url(#q4em)';
const tw=(t,f)=>String(t).length*f*.47;
const TX=(x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.f||em()}" class="t4-an q4-tx ${o.cls||''}">${esc(t)}</text>`;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{},c=col||(/^#(0|1)/.test(M.c||'')||m==='GPT'?'#f8f0d9':M.c);return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${c}"/></svg>`};
const R2Q=([x0,y0,x1,y1])=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1]];
/* ---------- the takes: paintings, crops and the measured places, in the painting's px ---------- */
/* chip: the socket's inner cavity; the chip painting (3760 x 1520, aspect 2.474) is fitted inside it by height and centred */
const TK={
 a:{img:'a2g.jpg',iw:2048,crop:[280,130,1600,1600],cav:[[342,182,1168,505],[345,610,1165,915],[345,1020,1165,1325],[345,1430,1165,1745]],
    win:[[1338,230,1822,470],[1338,640,1822,880],[1338,1048,1822,1290],[1338,1444,1822,1686]]},
 /* the trophy: the leader's chip big in the gold socket (its own P&L window lit), the other three small below, rank and name on the board's glass */
 c:{img:'c4k.jpg',iw:2048,crop:[215,200,1630,1630],cav:[[470,262,1590,725],[255,990,815,1205],[255,1275,815,1490],[255,1580,815,1800]],
    win:[null,[1145,1085,1805,1250],[1145,1350,1805,1510],[1145,1610,1805,1775]],leadPnl:1},
 /* the bus: the ledger strip on the left feeds four sockets; the newest graded rounds scroll up the ledger, data runs along the traces */
 d:{img:'d2g.jpg',iw:2048,crop:[140,120,1780,1780],cav:[[608,192,1420,528],[610,650,1418,985],[610,1090,1418,1420],[610,1525,1418,1860]],
    win:[[1535,245,1875,398],[1535,712,1875,868],[1535,1152,1875,1308],[1535,1598,1875,1756]],ledger:[188,165,328,1858],numOnly:1},
 /* the golden ticket: a hero shot down a row of four sockets, the leader's chip lifted out of the gold one on a column of light (front = #1) */
 e:{img:'e1n.jpg',iw:2048,crop:[0,0,2048,2048],numOnly:1,cy:[230,1300],
    cq:[[[660,1220],[1490,924],[1636,1084],[690,1376]],[[430,1030],[1260,736],[1380,876],[450,1180]],[[270,730],[1096,504],[1180,636],[280,880]],[[120,500],[940,290],[1000,410],[130,640]]],
    wq:[[[1656,1080],[1970,990],[2016,1184],[1700,1256]],[[1380,740],[1680,700],[1740,820],[1410,860]],[[1180,500],[1470,456],[1520,570],[1220,624]],[[1020,296],[1280,250],[1336,366],[1044,410]]]},
 /* back to the chip: the opening picture's four dies (beat 1), now ranked, the leader's die gold; the season bar names the leader and its P&L */
 b:{img:'media/top-hero-t-h22.jpg',iw:768,crop:[110,120,680,680],dies:[[[207,180],[348,188],[371,326],[224,317]],[[399,192],[533,202],[556,334],[422,328]],[[233,379],[375,383],[395,521],[249,519]],[[432,384],[567,388],[591,520],[453,521]]],
    bar:[[212,690],[678,671],[694,775],[221,801]]}};
Object.assign(TK,W.__B5TK||{});
const C=TK[T];
const CH=2.474;
function chipQ(cv){const[x0,y0,x1,y1]=cv,h=y1-y0,w=Math.min(x1-x0,h*CH),hh=w/CH,x=(x0+x1)/2-w/2,y=(y0+y1)/2-hh/2;return R2Q([x,y,x+w,y+hh])}
function surf(q,draw,cls,inner){const L=(p,r)=>Math.hypot(p[0]-r[0],p[1]-r[1]),bw=(L(q[0],q[1])+L(q[3],q[2]))/2,bh=(L(q[0],q[3])+L(q[1],q[2]))/2;
  return `<div class="t4-sf ${cls||''}" data-q='${JSON.stringify(q.map(p=>p.map(v=>Math.round(v))))}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px">${inner?inner(bw,bh):''}${draw?`<svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="${bw}" height="${bh}" aria-hidden="true">${draw(bw,bh)}</svg>`:''}</div>`}
function glare(src,cw,ch,cx,cy,qs){return qs.map(q=>`<img class="q4-gl" src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;clip-path:polygon(${q.map(([x,y])=>`${(x/C.iw*100).toFixed(2)}% ${(y/C.iw*100).toFixed(2)}%`).join(',')})">`).join('')}
/* the rank window: the rank numeral big, then the name (or the season P&L), one line, centred in the glass */
const winDraw=(m,i)=>(w,h)=>{const r=String(i+1),lead=i===0,t=WM==='pnl'?k$(pnl(m)):NM[m].toUpperCase();
  if(C.numOnly){const f=h*.8;return `<g class="q4-g">`+TX(w/2,h/2+f*.37,f,r,{a:'middle',f:em(lead?'gd':'em'),cls:'q4-big'})+`</g>`}
  const f1=h*.7,g=h*.12,av=w*.9-tw(r,f1)-g,f2=Math.min(h*.6,av/(t.length*.47)),tot=tw(r,f1)+g+tw(t,f2),x0=w/2-tot/2,y=h/2+f1*.36;
  const col=WM==='pnl'?em(pnl(m)<0?'dn':'up'):em(lead?'gd':'em');
  return `<g class="q4-g">`+TX(x0,y,f1,r,{f:em(lead?'gd':'em'),cls:'q4-big'})+TX(x0+tw(r,f1)+g,y-(f1-f2)*.0,f2,t,{f:col})+`</g>`};
const chipIn=m=>()=>C.cy?`<img class="b5-im b5-cy" src="${MED}chip7-${m.toLowerCase()}-1200.jpg" alt="" draggable="false" style="height:${(1520/(C.cy[1]-C.cy[0])*100).toFixed(2)}%;top:${(-C.cy[0]/(C.cy[1]-C.cy[0])*100).toFixed(2)}%">`:`<img class="b5-im" src="${MED}chip7-${m.toLowerCase()}-1200.jpg" alt="" draggable="false">`;
function buildB(){const[cx,cy,cw,ch]=C.crop,src=C.img;let S='';
  rank.forEach((m,i)=>{S+=surf(C.dies[i],(w,h)=>{const s=Math.min(w,h),lead=i===0,r=String(i+1),f0=s*.5,ms=s*.3,g=s*.06,H=f0*.86+g+ms,y0=h/2-H/2+f0*.86;
    return `<g class="q4-g">`+TX(w/2,y0,f0,r,{a:'middle',f:em(lead?'gd':'em'),cls:'q4-big'})+mark(m,w/2-ms/2,y0+g,ms)+`</g>`},'q4-glass b5-die'+(i===0?' b5-dl':''),()=>`<i class="q4-scan"></i><i class="b5-rim" style="--mc:${(MD[m]||{}).c||'#888'}"></i>`)});
  const L=rank[0];S+=surf(C.bar,(w,h)=>{const t2=k$(pnl(L)),f=h*.52,ms=f*1.05,x1=w*.95,x0=x1-tw(t2,f),y=h/2+f*.37;
    return `<g class="q4-g">`+mark(L,x0-ms-f*.25,y-ms*.86,ms,'#ffd25a')+TX(x1,y,f,t2,{a:'end',f:em(pnl(L)<0?'dn':'up')})+`</g>`},'q4-glass b5-bar',()=>`<i class="q4-scan"></i>`);
  const gl=C.dies.concat([C.bar]).map(q=>`<img class="q4-gl" src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%;clip-path:polygon(${q.map(([x,y])=>`${(x/C.iw*100).toFixed(2)}% ${(y/1024*100).toFixed(2)}%`).join(',')})">`).join('');
  return `<div class="t4-pic b5-pic b5-b" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t4-mv"><img src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${S}${gl}</div></div>`}
function build(){if(C.dies)return buildB();const[cx,cy,cw,ch]=C.crop,src=IMG+C.img;let S='';
  const GQ=[];
  rank.forEach((m,i)=>{const cq=C.cq?C.cq[i]:chipQ(C.cav[i]);S+=surf(cq,null,'b5-chip'+(i===0?' b5-lead':''),chipIn(m));
   const wq=C.wq?C.wq[i]:(C.win[i]&&R2Q(C.win[i]));if(wq){S+=surf(wq,winDraw(m,i),'q4-glass b5-win'+(i===0?' b5-wl':''),()=>`<i class="q4-scan"></i>`);GQ.push(wq)}
   if(i===0&&C.leadPnl){/* the leader's own SEASON P&L window on its chip (chip7 px 1136,787 to 2585,1203 of 3760 x 1520) */
    const[x0,y0]=cq[0],sx=(cq[1][0]-x0)/3760,sy=(cq[3][1]-y0)/1520,r=[x0+1136*sx,y0+787*sy,x0+2585*sx,y0+1203*sy];
    S+=surf(R2Q(r),(w,h)=>{const t=k$(pnl(m)),f=Math.min(h*.86,w*.86/(t.length*.47));return `<g class="q4-g">`+TX(w/2,h/2+f*.37,f,t,{a:'middle',f:em(pnl(m)<0?'dn':'up'),cls:'q4-big'})+`</g>`},'q4-glass b5-win b5-lp',()=>`<i class="q4-scan"></i>`)}});
  if(C.ledger){/* the ledger strip: the newest graded rounds, turned up the strip, scrolling into the board */
   const G=(W.ROUNDS||[]).filter(r=>r.a!=null&&r.out).slice(-14).reverse(),[lx0,ly0,lx1,ly1]=C.ledger,q=[[lx0,ly1],[lx0,ly0],[lx1,ly0],[lx1,ly1]];
   S+=surf(q,(w,h)=>{const f=h*.78;let x=0,o='';const one=r=>{const t=`R${r.n} ${r.ticker||''} ${String(r.out).replace(/^-/,'−')}`;const g=`<text x="${x.toFixed(1)}" y="${(h/2+f*.37).toFixed(1)}" font-size="${f.toFixed(1)}" fill="${em(r.a>0?'up':'dn')}" class="t4-an q4-tx">${esc(t)}</text>`;x+=tw(t+'   ',f);return g};
     G.forEach(r=>o+=one(r));const L=x;G.forEach(r=>o+=one(r));return `<g class="b5-feed" style="--L:${L.toFixed(1)}px">${o}</g>`},'q4-glass b5-ledger',()=>`<i class="q4-scan"></i>`);GQ.push(q)}
  const gl=glare(src,cw,ch,cx,cy,GQ);
  return `<div class="t4-pic b5-pic b5-${T}" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t4-mv"><img src="${src}" alt="" draggable="false" style="width:${(C.iw/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%">${S}${gl}</div></div>`}
function apply(){const li=D.querySelector('li.q4-board');if(!li||li.dataset.b5===T+WM)return;const art=li.querySelector('.t4-art');art.innerHTML=build();li.dataset.b5=T+WM;
  li.setAttribute('aria-label','4 BOARD: The ledger ranks the board. '+rank.map((m,i)=>`${i+1} ${NM[m]}`).join(', ')+'.');
  W.__t5.place()}
apply();
const sec=D.querySelector('section.t4');if(sec)new MutationObserver(()=>{const li=D.querySelector('li.q4-board');if(li&&!li.dataset.b5)apply()}).observe(sec,{childList:true,subtree:true});
W.__b5={take:T,rank,apply,data:rank.map((m,i)=>({r:i+1,m,pnl:pnl(m)}))};
}catch(e){window.__b5Err=e;console.error(e)}})()})();
