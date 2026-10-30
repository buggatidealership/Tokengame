/* R1 · The ground is the verdict. No frame round the module: every view is printed straight on the page.
   Each chart's ground is split at the line that decides it (the $100,000 start, the coin flip): green above, red below,
   so "made money / beat a coin" is read before any number. The question sits in the chart's empty corner, where a comic
   puts its caption. Faces ride the line ends (no label band). Rows take the same verdict colour. Target hits: no cards,
   the targets printed on the page with their counts stacked beside them. Sector: no label column and no corner cell, each
   sector's name over its four cells. Race: the first-place lane is gold; each change of leader is marked where the new
   leader enters the gold, and the race replays once on view so you see each pass happen. */
(function(){const S=SR,{NM,face,col,P,R,N,rank,bal,acc,byA,byT,target,secs,secRow,steps,pos,leads,ev,pm,kS}=S;
const D=document;
/* a chart: ground split at base; ser = {m:[values]}; ord = draw order (leader last, on top) */
function chart(k,ser,lo,hi,base,zu,zd,ord){const bY=S.yPct(base,lo,hi);
  const ls=ord.slice().reverse().map(m=>`<path class="sr1-o" d="${S.path(ser[m],lo,hi)}"/><path class="sr1-l${m===ord[0]?' sr1-lead':''}" style="--mc:${col(m)}" d="${S.path(ser[m],lo,hi)}" pathLength="1"/>`).join('');
  const ends=ord.map(m=>({m,y:S.yPct(ser[m][N],lo,hi)}));
  return `<div class="sr1-ch" data-k="${k}" data-ends='${JSON.stringify(ends)}' data-ser='${JSON.stringify(ord.map(m=>ser[m].map(v=>+S.yPct(v,lo,hi).toFixed(2))))}'>
    <div class="sr1-z sr1-zu" style="height:${bY.toFixed(2)}%"><span>${zu}</span></div><div class="sr1-z sr1-zd" style="top:${bY.toFixed(2)}%"><span>${zd}</span></div>
    <div class="sr1-pl"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><line class="sr1-base" x1="0" x2="1000" y1="${bY}" y2="${bY}"/>${ls}</svg></div>
    <span class="sr-qslot"></span>
    <div class="sr1-ends">${ends.map(e=>`<span class="sr1-end" data-m="${e.m}">${face(e.m,'sr1-f')}</span>`).join('')}</div>
    <p class="sr1-x" aria-hidden="true"><span>Start</span><span>R${R[N-1].n}</span></p></div>`}
/* P&L */
const all=[].concat(...S.ORDER.map(m=>bal[m])),lo=Math.min(...all),hi=Math.max(...all),pd=(hi-lo)*.07;
const vPnl=chart('pnl',bal,lo-pd,hi+pd,1e5,'Made money','Lost money',rank)+
  `<div class="sr1-rows" role="table" aria-label="P&amp;L"><div class="sr1-hd" role="row"><span role="columnheader">AI</span><span role="columnheader">Last 24h</span><span role="columnheader">Last 7d</span><span role="columnheader">P&amp;L</span></div>
  ${rank.map((m,i)=>{const d1=S.win(m,864e5),d7=S.win(m,7*864e5),v=P[m].pnl;return `<div class="sr1-r ${v>=0?'sr1-up':'sr1-dn'}${i===0?' sr1-1':''}" role="row"><span class="sr1-nm" role="cell"><i class="sr1-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></span>
    <span role="cell" class="${d1>0?'sr-tu':d1<0?'sr-td':''}">${d1?kS(d1):'·'}</span><span role="cell" class="${d7>0?'sr-tu':d7<0?'sr-td':''}">${d7?kS(d7):'·'}</span><b role="cell" class="sr1-big ${v>=0?'sr-tu':'sr-td'}">${pm(v)}</b></div>`}).join('')}</div>
  <p class="sr1-note">$100,000 each to start. The whole balance on every call. Buy on up, short on down. No leverage. Before fees.</p>`;
/* Accuracy */
const vAcc=chart('acc',acc,.3,.8,.5,'Better than a coin','Worse than a coin',byA)+
  `<div class="sr1-rows sr1-r5" role="table" aria-label="Accuracy"><div class="sr1-hd" role="row"><span role="columnheader">AI</span><span role="columnheader">Trades</span><span role="columnheader">W</span><span role="columnheader">L</span><span role="columnheader">Hit rate</span></div>
  ${byA.map((m,i)=>{const a=P[m],t=a.W+a.L,h=S.hr(m);return `<div class="sr1-r ${a.W*2>t?'sr1-up':'sr1-dn'}${i===0?' sr1-1':''}" role="row"><span class="sr1-nm" role="cell"><i class="sr1-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></span><span role="cell">${t}</span><span role="cell" class="sr-tu">${a.W}</span><span role="cell" class="sr-td">${a.L}</span><b role="cell" class="sr1-big">${h}%</b></div>`}).join('')}</div>
  <p class="sr1-note">Right on direction, up or down. Every line starts at 50/50 and moves with each call.</p>`;
/* Target hits */
const vTgt=`<span class="sr-qslot sr1-qtop"></span><div class="sr1-tg">${byT.map((m,i)=>`<div class="sr1-tc${i===0?' sr1-1':''}" style="--mc:${col(m)}">${target(m)}
    <div class="sr1-tk"><p class="sr1-tn"><i class="sr1-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></p>
    <dl><div class="sr1-kb"><dd>${S.S[m].bu}</dd><dt>Bullseyes</dt></div><div class="sr1-kw"><dd>${S.S[m].w1}</dd><dt>Within 1%</dt></div><div class="sr1-ko"><dd>${S.S[m].ot}</dd><dt>Off target</dt></div></dl></div></div>`).join('')}</div>
  <p class="sr1-note">The bullseye is what the stock did. One hole per call that got the direction. Bullseye: within 0.1%. Off target: the wrong way.</p>`;
/* Sector */
const vSec=`<span class="sr-qslot sr1-qtop"></span><div class="sr1-sc" role="table" aria-label="Right calls by sector"><div class="sr1-sh" role="row">${rank.map(m=>`<span role="columnheader">${face(m,'wc-f-s')}<b>${NM[m]}</b></span>`).join('')}</div>
  ${secs.map(x=>{const s=secRow(x);return `<div class="sr1-sr" role="row"><p class="sr1-sn" role="rowheader">${S.esc(s.nm)} <small>${s.n} round${s.n>1?'s':''}</small></p>
    ${s.cs.map(c=>!c.n?`<span role="cell" class="sr1-c sr-0">·</span>`:`<span role="cell" class="sr1-c sr-${3*c.k>=2*c.n?'hi':3*c.k<=c.n?'lo':'md'}${c.top?' sr1-top':''}">${c.k}/${c.n}</span>`).join('')}</div>`}).join('')}</div>
  <p class="sr1-note">Right calls out of calls made. Green: 2 in 3 or better. Red: 1 in 3 or worse. Starred: the best in its row. Small samples.</p>`;
/* Race: the gold first-place lane; each new leader marked where it enters the gold */
const Y=p=>((p-.5)/4*100);
const rl=S.ORDER.slice().sort((a,b)=>pos[a][N]-pos[b][N]).reverse().map(m=>{const d=pos[m].map((p,i)=>(i?'L':'M')+(i/N*1000).toFixed(1)+' '+Y(p).toFixed(2)).join(' ');return `<path class="sr1-o" d="${d}"/><path class="sr1-l${pos[m][N]===1?' sr1-lead':''}" style="--mc:${col(m)}" d="${d}" pathLength="1"/>`}).join('');
const mk=leads.slice(1).map((l,k)=>`<span class="sr1-pass" style="left:${(l.i/N*100).toFixed(2)}%;--mc:${col(l.m)}" data-i="${l.i}" title="R${l.n}: ${NM[l.m]} passes ${NM[l.from]}">${face(l.m,'sr1-pf')}</span>`).join('');
const last=leads[leads.length-1];
const race=`<div class="sr1-rc"><span class="sr1-ry" aria-hidden="true"><i>1st</i><i>2nd</i><i>3rd</i><i>4th</i></span>
   <div class="sr1-rcv"><i class="sr1-gold" aria-hidden="true"><b>Leader</b></i><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${[1,2,3].map(k=>`<line class="sr1-g" x1="0" x2="1000" y1="${k*25}" y2="${k*25}"/>`).join('')}${rl}</svg>${mk}
   <i class="sr1-ph" aria-hidden="true"></i>
   <div class="sr1-rends">${S.ORDER.map(m=>`<span class="sr1-rend" style="top:${Y(pos[m][N]).toFixed(2)}%">${face(m,'sr1-f')}</span>`).join('')}</div></div></div>
   <p class="sr1-x sr1-rx" aria-hidden="true"><span>Start</span><span>R${R[N-1].n}</span></p>
   <p class="sr1-pop" aria-live="polite"><span class="sr1-popf">${face(last.m,'sr1-f')}<b>passes</b>${face(last.from,'sr1-f')}</span><span class="sr1-popt"><b>R${last.n} · ${S.esc(last.co)}</b> ${NM[last.m]} takes the lead from ${NM[last.from]}.</span></p>
   <h3 class="sr1-rh">Every change of leader</h3>
   <ol class="sr1-ls">${leads.slice(1).reverse().map(l=>`<li><span class="sr1-lr">R${l.n}</span>${face(l.m,'wc-f-s')}<b>${NM[l.m]}</b><span class="sr1-ar">passes</span>${face(l.from,'wc-f-s')}<span>${NM[l.from]}</span><small>${S.esc(l.co)}</small></li>`).join('')}</ol>`;
const raceH=`Who was in front after every graded round. The lead has changed hands ${leads.length-1} times. ${NM[last.m]} has led since round ${last.n}.`;
/* place the question in the chart's emptiest corner; place the end faces */
function lay(lb){lb.querySelectorAll('.sr1-ch').forEach(ch=>{const pl=ch.querySelector('.sr1-pl'),w=pl.clientWidth,h=pl.clientHeight,ser=JSON.parse(ch.dataset.ser),ends=JSON.parse(ch.dataset.ends);
    S.spread(ends,h,24).forEach(e=>{const el=ch.querySelector(`.sr1-end[data-m="${e.m}"]`);if(el)el.style.top=(pl.offsetTop+e.px)+'px'});
    const q=ch.querySelector('.sr-qslot .wc-pf-q');if(!q)return;const qw=q.offsetWidth,qh=q.offsetHeight;
    const at=(a,x)=>{const t=x/w*(a.length-1),i=Math.max(0,Math.min(a.length-2,Math.floor(t))),f=t-i;return (a[i]+(a[i+1]-a[i])*f)/100*h};
    let best=null;for(let top=6;top<=h-qh-6;top+=4)for(const x0 of [8,Math.round((w-qw)/2),w-qw-8]){if(x0<0)continue;let d=1e9;for(let x=x0-4;x<=x0+qw+4;x+=3)for(const a of ser){const y=at(a,Math.max(0,Math.min(w,x)));d=Math.min(d,y<top?top-y:y>top+qh?y-top-qh:-1)}
      const sc=Math.min(d,12)-x0*.004-top*.01;if(!best||sc>best.sc)best={sc,x0,top}}
    const sl=ch.querySelector('.sr-qslot');sl.style.left=best.x0+'px';sl.style.top=(pl.offsetTop+best.top)+'px'})}
/* motion: lines draw in, faces land, rows step in; the race replays its passes once */
function enter(v){const sv=v.querySelectorAll('.sr1-l');sv.forEach(p=>p.animate([{strokeDashoffset:1,strokeDasharray:1},{strokeDashoffset:0,strokeDasharray:1}],{duration:900,easing:'cubic-bezier(.3,.6,.2,1)',fill:'backwards'}));
  v.querySelectorAll('.sr1-o').forEach(p=>p.animate([{opacity:0},{opacity:1}],{duration:500,fill:'backwards'}));
  v.querySelectorAll('.sr1-end').forEach((e,i)=>e.animate([{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'none'}],{duration:300,delay:780+i*60,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'}));
  v.querySelectorAll('.sr1-z span').forEach((e,i)=>e.animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:300,delay:200+i*120,fill:'backwards'}));
  v.querySelectorAll('.sr1-r,.sr1-tc,.sr1-sr').forEach((e,i)=>e.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:280,delay:120+i*45,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'}));
  v.querySelectorAll('.sr-th').forEach((e,i)=>e.animate([{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],{duration:220,delay:260+i*10,easing:'cubic-bezier(.3,1.8,.5,1)',fill:'backwards'}))}
function raceEnter(box,rm){if(rm)return;const cv=box.querySelector('.sr1-rcv'),ph=box.querySelector('.sr1-ph'),pop=box.querySelector('.sr1-pop'),T=6500;
  const ln=box.querySelectorAll('.sr1-l'),ol=box.querySelectorAll('.sr1-o');
  ln.forEach(p=>p.animate([{strokeDashoffset:1,strokeDasharray:1},{strokeDashoffset:0,strokeDasharray:1}],{duration:T,easing:'linear',fill:'backwards'}));
  ol.forEach(p=>p.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:T,easing:'linear',fill:'backwards'}));
  box.querySelector('.sr1-rcv svg').animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:T,easing:'linear',fill:'backwards'});
  ph.animate([{left:'0%',opacity:1},{left:'100%',opacity:1},{left:'100%',opacity:0}],{duration:T+300,easing:'linear'});
  box.querySelectorAll('.sr1-pass').forEach(p=>{const i=+p.dataset.i,t=i/N*T;p.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.2)'},{opacity:1,transform:'translate(-50%,-50%) scale(1.5)',offset:.4},{opacity:1,transform:'translate(-50%,-50%) scale(1)'}],{duration:500,delay:t,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})});
  /* the caption under the chart names each pass as it happens, then rests on the latest */
  const pf=pop.querySelector('.sr1-popf'),pt=pop.querySelector('.sr1-popt'),fin=[pf.innerHTML,pt.innerHTML];
  S.leads.slice(1).forEach(l=>setTimeout(()=>{pf.innerHTML=`${face(l.m,'sr1-f')}<b>passes</b>${face(l.from,'sr1-f')}`;pt.innerHTML=`<b>R${l.n} · ${S.esc(l.co)}</b> ${NM[l.m]} takes the lead from ${NM[l.from]}.`;
    pop.animate([{transform:'scale(.94)'},{transform:'none'}],{duration:220,easing:'cubic-bezier(.3,1.6,.5,1)'})},l.i/N*T));
  setTimeout(()=>{pf.innerHTML=fin[0];pt.innerHTML=fin[1]},T+60)}
S.mount('r1',{pnl:vPnl,acc:vAcc,tgt:vTgt,sec:vSec,race,raceH,qInto:true,enter,raceEnter,after:lb=>{lay(lb);const ro=new ResizeObserver(()=>lay(lb));lb.querySelectorAll('.sr1-ch .sr1-pl').forEach(x=>ro.observe(x));D.fonts.ready.then(()=>lay(lb))}});
})();
