/* round3 (Round H28) common: laid over the built v46-live-x2plus.html after x2p_top.js has built section.t4 (today's order kept).
   Rewrites the four frames of "How a round works" so each shows exactly what its sentence says, on one example (the live rule: today R40 Tesla):
   1 CALL   the four dies read LONG or SHORT (from the round's calls; no % sizes)
   2 CLOSE  the readout: the company, the move, then "MARKET CLOSE" (window.__R3W='bare', default) or who wins (window.__R3W='win')
   3 LEDGER the ledger cropped to one entry: Round n · company · move · Winner <model>; no other rows
   4 BOARD  full frontal; #1 seated in its own gold socket (window.__R3BD='r' board6 E3 made frontal by fit.json, default; 'f' board6 E2, painted head-on)
   MEM rule kept: the dies, the readout and the ledger entry stay on x2p_top's perspective surfaces (laid out at on-screen size x pixel ratio by its
   place()); the frontal board has no perspective at all (plain % boxes). Data: ROUNDS, RMETA, MODELS, CO_LOGOS, __x2pPnl. Nothing typed.
   Exposes window.R3 for the take files; a take calls R3.done() at its end. */
(function(){
/* x2p_top.js rebuilds section.t4 (innerHTML) when the width crosses 1000px or a desktop script asks; the take re-applies itself then */
function init(){
const D=document,sec=D.querySelector('section.t4'),b1=sec.querySelector('.t4-b1'),b2=sec.querySelector('.t4-b2'),b3=sec.querySelector('.t4-b3'),frs=b2.querySelector('.t4-frs');
const KEYS=['call','close','ledger','board'],FR={};KEYS.forEach(k=>FR[k]=frs.querySelector('.q4-'+k));
const HERE=(D.currentScript&&D.currentScript.dataset.base)||window.__R3BASE||'tools/concepts/worlds/comic/story/h/round3/';
const LINES={call:'Each AI goes long or short before the report.',close:'The next market close ends every trade.',ledger:'Every trade is written to the ledger.',board:'The ledger ranks the board.'};
const VERB={call:'Call',close:'Close',ledger:'Ledger',board:'Board'};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* the example: x2p_top.js's own rule (the newest graded Mag 7 round split two right, two wrong, one winner) */
const R=window.ROUNDS||[],G=R.filter(r=>r.a!=null&&r.out);
const m7=n=>!!((window.RMETA||{})[n]||{}).mag7;
const ok=(c,a)=>/^UP/i.test(c)===(a>0);
const EX=[...G].reverse().find(r=>m7(r.n)&&r.calls.length===4&&r.calls.filter(([m,c])=>ok(c,r.a)).length===2&&r.win&&!/,|&| /.test(r.win))||G[G.length-1];
const calls=EX.calls.map(([m,c])=>{const up=/^UP/i.test(c);return {m,up,side:up?'long':'short',ok:up===(EX.a>0)}});
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*/).filter(m=>NM[m]);
const W=wins(EX);
const A=window.__x2pPnl().A,rank=Object.keys(A).sort((a,b)=>A[b].bal-A[a].bal);
const MD=window.MODELS||{};
const mn=s=>String(s).replace(/^-/,'−').replace(/^(\d)/,'+$1');
const md=s=>{const[m,d]=String(s).split('/');return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]+' '+(+d)};
/* x2p_top.js's drawing words (the same classes, so the same lit-glass look) */
const em=c=>c==='up'?'url(#q4up)':c==='dn'?'url(#q4dn)':c==='gd'?'url(#q4gd)':'url(#q4em)';
const TX=(x,y,s,t,o={})=>`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${s.toFixed(1)}" ${o.a?`text-anchor="${o.a}"`:''} fill="${o.f||em()}" class="t4-an q4-tx ${o.cls||''}">${esc(t)}</text>`;
const tw=(t,f)=>String(t).length*f*.47;
const mark=(m,x,y,s,col)=>{const M=MD[m]||{},c=col||(/^#(0|1)/.test(M.c||'')||m==='GPT'?'#f8f0d9':M.c);return `<svg x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" viewBox="0 0 24 24"><path d="${M.d||''}" fill="${c}"/></svg>`};
const coLogo=(x,y,sz)=>{const L=(window.CO_LOGOS||{})[EX.ticker],f=L&&(L.f||L);return f?`<image href="media/${f}" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${sz.toFixed(1)}" height="${sz.toFixed(1)}" preserveAspectRatio="xMidYMid meet" filter="url(#q4lg)"/>`:''};
const svgOf=sf=>sf.querySelector(':scope>svg');
const dims=sf=>[+sf.dataset.bw,+sf.dataset.bh];

/* ---------- 1 CALL: LONG or SHORT, the word of the sentence, big; the AI's mark and name under it ---------- */
function call(){FR.call.querySelectorAll('.q4-die').forEach((sf,i)=>{const c=calls[i];if(!c)return;const [w,h]=dims(sf),t=c.side.toUpperCase();
  const s=h*.165,f1=h*.17,nm=NM[c.m].toUpperCase(),tot=s+f1*.28+tw(nm,f1),x0=w/2-tot/2,f2=Math.min(h*.33,w*.82/(t.length*.5));
  const g=h*.09,H=f2*.86+g+f1*.86,y2=h/2-H/2+f2*.86,y1=y2+g+f1*.86;
  svgOf(sf).innerHTML=`<g class="q4-g">`+TX(w/2,y2,f2,t,{a:'middle',f:em(c.up?'up':'dn'),cls:'q4-big'})+mark(c.m,x0,y1-s*.86,s)+TX(x0+s+f1*.28,y1,f1,nm)+`</g>`;
  sf.setAttribute('data-side',c.side)});
  FR.call.setAttribute('aria-label','1 Call: '+LINES.call+' '+calls.map(c=>NM[c.m]+' '+c.side).join(', ')+'.')}

/* ---------- 2 CLOSE: the company, the move in the middle, then the sentence's own words (bare) or who wins (win) ---------- */
function close(){const sf=FR.close.querySelector('.q4-rd');if(!sf)return;const [w,h]=dims(sf),bare=(window.__R3W||'bare')!=='win';
  const co=String(EX.co).toUpperCase(),one=W.length===1,wt=bare?'MARKET CLOSE':one?NM[W[0]].toUpperCase()+' WINS':W.length?W.map(m=>NM[m].toUpperCase()).join(' & ')+' TIE':'NOBODY WINS';
  const mv=mn(EX.out),f2=Math.min(h*.4,w*.62/(mv.length*.47)),f1=Math.min(h*.15,w*.5/(co.length*.47),w*.5/(wt.length*.47)),g=h*.085;
  const ls=f1*1.25,lw=(window.CO_LOGOS||{})[EX.ticker]?ls+f1*.35:0,t1=lw+tw(co,f1),x1=w/2-t1/2,ms=f1*1.15,wm=!bare&&one,t3=(wm?ms+f1*.3:0)+tw(wt,f1),x3=w/2-t3/2;
  const y2=h/2+f2*.43,y1=h/2-f2*.43-g,y3=h/2+f2*.43+g+f1*.86;
  svgOf(sf).innerHTML=`<g class="q4-g">`+(lw?coLogo(x1,y1-f1*.43-ls/2,ls):'')+TX(x1+lw,y1,f1,co)+TX(w/2,y2,f2,mv,{a:'middle',f:em(EX.a>0?'up':'dn'),cls:'q4-big'})
   +(wm?mark(W[0],x3,y3-f1*.95,ms):'')+TX(x3+(wm?ms+f1*.3:0),y3,f1,wt,{f:em(bare?'em':'gd'),cls:bare?'r3-mc':''})+`</g>`;
  FR.close.setAttribute('aria-label','2 Close: '+LINES.close+' '+EX.co+' '+mv+(bare?'':', '+wt.toLowerCase())+'.')}

/* ---------- 3 LEDGER: the painting cropped to the one slot; the entry in it: Round n · the company · its move · Winner <model> ---------- */
/* x2p_top's Q4.ledger (crop px of the 1400 crop, file media/top-h23-ledger.jpg); q[2] is the slot it writes the example into */
const LQ=[[136,604],[1172,564],[1232,920],[172,952]],LCW=1400,LCR=[58,532,1238,452];/* x,y,w,h of the crop shown */
function m3d(w,h,q){const s=[[0,0],[w,0],[w,h],[0,h]],A=[],B=[];
  for(let i=0;i<4;i++){const[x,y]=s[i],[u,v]=q[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);B.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);B.push(v)}
  const n=8;for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(A[r][c])>Math.abs(A[p][c]))p=r;[A[c],A[p]]=[A[p],A[c]];[B[c],B[p]]=[B[p],B[c]];
    for(let r=0;r<n;r++)if(r!==c){const f=A[r][c]/A[c][c];for(let k=c;k<n;k++)A[r][k]-=f*A[c][k];B[r]-=f*B[c]}}
  const X=B.map((b,i)=>b/A[i][i]);const[a,b,c,d,e,f,g,hh]=X;return `matrix3d(${a},${d},0,${g},${b},${e},0,${hh},0,0,1,0,${c},${f},0,1)`}
const entry=(w,h)=>{const f=h*.27,co=String(EX.co).toUpperCase(),one=W.length===1,mv=mn(EX.out),ws=f*.95,
  wl=one?NM[W[0]].toUpperCase():W.length?'TIE':'NOBODY',wtot=tw('WINNER ',f*.78)+(one?ws+f*.22:0)+tw(wl,f),xw=w*.95-wtot,y1=h*.43,y2=h*.84;
  return `<g class="q4-g q4-new">`+TX(w*.05,y1,f,'ROUND '+EX.n,{f:em('gd')})+TX(w*.95,y1,f,mv,{a:'end',f:em(EX.a>0?'up':'dn')})
   +TX(w*.05,y2,f,co)+TX(xw,y2,f*.78,'WINNER',{f:em('gd'),cls:'r3-wl'})+(one?mark(W[0],xw+tw('WINNER ',f*.78),y2-ws*.84,ws):'')+TX(w*.95,y2,f,wl,{a:'end',f:em('gd')})+`</g>`};
function ledger(){const L=(x,y)=>Math.hypot(x[0]-y[0],x[1]-y[1]),bw=(L(LQ[0],LQ[1])+L(LQ[3],LQ[2]))/2,bh=(L(LQ[0],LQ[3])+L(LQ[1],LQ[2]))/2;
  const[cx,cy,cw,ch]=LCR,src='media/top-h23-ledger.jpg',clip=LQ.map(([x,y])=>`${(x/LCW*100).toFixed(2)}% ${(y/LCW*100).toFixed(2)}%`).join(',');
  const imS=`width:${(LCW/cw*100).toFixed(3)}%;left:${(-cx/cw*100).toFixed(3)}%;top:${(-cy/ch*100).toFixed(3)}%`;
  FR.ledger.querySelector('.t4-art').innerHTML=`<div class="t4-pic r3-led" data-iw="${cw}" data-cx="${cx}" data-cy="${cy}" style="aspect-ratio:${cw}/${ch}"><div class="t4-mv">`
   +`<img src="${src}" alt="" draggable="false" style="${imS}">`
   +`<div class="t4-sf q4-glass q4-row" data-q='${JSON.stringify(LQ)}' data-bw="${bw}" data-bh="${bh}" style="width:${bw}px;height:${bh}px"><svg viewBox="0 0 ${bw.toFixed(1)} ${bh.toFixed(1)}" width="100%" height="100%" aria-hidden="true">${entry(bw,bh)}</svg></div>`
   +`<img class="q4-gl" src="${src}" alt="" draggable="false" style="${imS};clip-path:polygon(${clip})">`
   +`<i class="r3-vig" aria-hidden="true"></i></div></div>`;
  FR.ledger.setAttribute('aria-label',`3 Ledger: ${LINES.ledger} Round ${EX.n}, ${EX.co} ${mn(EX.out)}, winner ${W.map(m=>NM[m]).join(' and ')||'nobody'}.`)}

/* ---------- 4 BOARD: full frontal, every chip in its socket, #1 seated in the gold one; the numbers withheld (lit dashes) as live ---------- */
const GEO={"r":{"ar":[2520,3300],"img":"board-r.jpg","chip":[[47.619,9.981,39.683,12.25],[47.619,32.121,39.683,12.25],[47.619,54.261,39.683,12.25],[47.619,76.402,39.683,12.25]],"win":[[7.94,11.205,13.43,10.379],[7.94,33.346,13.43,10.379],[7.94,55.486,13.43,10.379],[7.94,77.626,13.43,10.379]]},
 "f":{"ar":[1,1],"img":"board-f.jpg","chip":[[50.264,13.656,39.648,16.035],[50.264,37.489,39.648,16.035],[50.396,61.189,39.648,16.035],[50.352,85.154,39.648,16.035]],"win":[[7.225,12.775,14.097,14.273],[7.225,37.974,13.921,14.273],[7.225,62.996,14.097,14.273],[7.225,86.96,14.097,14.449]]}};
/* chips8 take c's geometry, in chip units (as x2p_top's B6G) */
const B6G={s:[3760,1520],no:[2385,251,2604,421],d7:[1120,479,2020,759],lr:[2086,478,2604,765],se:[1121,890,2604,1087],core:[2766,305,3612,1179]};
const pc=(v,t)=>(v/t*100).toFixed(4)+'%',at=r=>`left:${pc(r[0],B6G.s[0])};top:${pc(r[1],B6G.s[1])};width:${pc(r[2]-r[0],B6G.s[0])};height:${pc(r[3]-r[1],B6G.s[1])}`;
const dash=(r,lead)=>{const w=r[2]-r[0],h=r[3]-r[1];return `<i class="b6-w" style="${at(r)}"><svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true"><rect x="${(w*.34).toFixed(1)}" y="${(h*.42).toFixed(1)}" width="${(w*.32).toFixed(1)}" height="${(h*.16).toFixed(1)}" rx="${(h*.08).toFixed(1)}" fill="${em(lead?'gd':'em')}" class="q4-tx b6-dash"/></svg></i>`};
const face=m=>'media/founder-'+m.toLowerCase()+(m==='GROK'||m==='GPT'?'-anim2':'-anim')+'.jpg';
function chip(m,i){const src='media/chip8c-'+m.toLowerCase()+'-1200.jpg',K=['no','d7','lr','se'];
  return `<img class="b6-im" src="${src}" alt="" draggable="false"><i class="b6-die" style="${at(B6G.core)}"><img class="b6-v" src="${face(m)}" alt="" draggable="false" decoding="async"></i>`
   +K.map(k=>dash(B6G[k],i===0)).join('')+`<i class="r3-cg" aria-hidden="true"></i>`}
function board(){const g=GEO[window.__R3BD||'r'],box=r=>`left:${r[0]}%;top:${r[1]}%;width:${r[2]}%;height:${r[3]}%`;
  let h=`<div class="r3-bd r3-bd-${window.__R3BD||'r'}" style="aspect-ratio:${g.ar[0]}/${g.ar[1]}"><img class="r3-bdi" src="${HERE}img/${g.img}" alt="" draggable="false">`;
  rank.forEach((m,i)=>{h+=`<div class="r3-chip${i===0?' r3-lead':''}" style="${box(g.chip[i])}">${chip(m,i)}</div>`;
    h+=`<i class="r3-rk${i===0?' r3-rk1':''}" style="${box(g.win[i])}"><svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true"><text x="50" y="78" font-size="78" text-anchor="middle" fill="${em(i?'em':'gd')}" class="t4-an q4-tx q4-big">${i+1}</text></svg></i>`});
  FR.board.querySelector('.t4-art').innerHTML=h+`</div>`;
  FR.board.setAttribute('aria-label','4 Board: '+LINES.board+' '+rank.map((m,i)=>(i+1)+' '+NM[m]).join(', ')+'. The numbers are in Meet the models.')}

/* placement: x2p_top's own place() lays out every .t4-pic surface (MEM rule) and sets --k; the board's lit numerals take --k from its own width */
function place(){try{window.__t4&&window.__t4.place()}catch(e){window.__r3err=String(e)}
  D.querySelectorAll('.r3-bd').forEach(b=>{b.style.setProperty('--k',(b.clientWidth/1400).toFixed(5))});
  D.querySelectorAll('.r3-rk').forEach(r=>{r.style.setProperty('--k',(r.clientWidth/100).toFixed(5))});
  if(window.__r3placeTake)try{window.__r3placeTake()}catch(e){window.__r3err=String(e)}}
window.__r3place=place;
if(!window.__r3rs){window.__r3rs=1;let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;requestAnimationFrame(()=>window.__r3place&&window.__r3place())}})}
/* the sentence with the trade's key words in its colours */
const sayHTML=k=>esc(LINES[k]).replace(/\blong\b/,'<span class="up">long</span>').replace(/\bshort\b/,'<span class="dn">short</span>')
  .replace(/(market close)/,'<span class="gd">$1</span>').replace(/(the ledger)\.$/,'<span class="gd">$1</span>.').replace(/(the board)\.$/,'<span class="gd">$1</span>.');
function all(){[call,close,ledger,board].forEach(f=>{try{f()}catch(e){window.__r3err=(window.__r3err||'')+f.name+':'+e+' '}})}
window.R3={D,sec,b1,b2,b3,frs,KEYS,FR,LINES,VERB,NM,esc,EX,calls,W,rank,A,mn,md,sayHTML,
  facts:{call:calls.map(c=>({m:c.m,side:c.side,up:c.up})),close:{co:EX.co,mv:mn(EX.out),up:EX.a>0,win:W},ledger:{n:EX.n,co:EX.co,mv:mn(EX.out),up:EX.a>0,win:W},board:rank},
  mk:(m,cls)=>{const M=MD[m]||{},c=(/^#(0|1)/.test(M.c||'')||m==='GPT')?'#f8f0d9':M.c;return `<svg class="${cls||'r3-mk'}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d||''}" fill="${c}"/></svg>`},
  rebuild:all,
  done(){requestAnimationFrame(()=>{place();setTimeout(()=>{place();window.__r3done=true},150)})}};
all();
if(window.__r3take)window.__r3take(window.R3);
}
window.R3start=take=>{window.__r3take=take;init();const sec=document.querySelector('section.t4');
  new MutationObserver(()=>{if(!sec.querySelector('.t4-frs.r3')&&sec.querySelector('.t4-frs')){window.__r3re=(window.__r3re||0)+1;init()}}).observe(sec,{childList:true})};
})();
