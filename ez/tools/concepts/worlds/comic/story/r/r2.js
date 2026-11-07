/* R2 · Every rival in its own corner. No module and no shared white chart: each view is four strips, one per AI,
   painted in that AI's own colour (Claude orange, Kimi blue, GPT green, Grok ink), so who is who is read before a word.
   Each strip carries its own line on one shared scale (so the shapes still compare), with the money or the rate on a
   cream price tag. Target hits: the target sits in its owner's strip, the three counts as tags. Sector: each AI's strip
   holds its industries as chips. Race: above the position chart, one bar shows who held first, painted in the holder's
   colour, so every change of leader is a change of colour (no stars). */
(function(){const S=SR,{NM,face,col,P,R,N,rank,bal,acc,byA,byT,target,secs,secRow,pos,leads,pm,kS}=S;const D=document;
const ink=m=>m==='GROK';
const spark=(ser,m,lo,hi,base)=>{const d=S.path(ser[m],lo,hi),bY=S.yPct(base,lo,hi);
  return `<div class="sr2-sp"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><line class="sr2-base" x1="0" x2="1000" y1="${bY}" y2="${bY}"/><path class="sr2-o" d="${d}"/><path class="sr2-l" d="${d}" pathLength="1"/></svg></div>`};
const strip=(m,i,inner,cls)=>`<article class="sr2-s${ink(m)?' sr2-dk':''}${i===0?' sr2-1':''} ${cls||''}" style="--mc:${col(m)}"><header class="sr2-h"><i class="sr2-rk">${i+1}</i>${face(m,'sr2-f')}<b>${NM[m]}</b></header>${inner}</article>`;
/* P&L: shared scale across the four strips */
const all=[].concat(...S.ORDER.map(m=>bal[m])),lo=Math.min(...all),hi=Math.max(...all),pd=(hi-lo)*.06;
const vPnl=`<div class="sr2-ss">${rank.map((m,i)=>{const v=P[m].pnl,d1=S.win(m,864e5),d7=S.win(m,7*864e5);
  return strip(m,i,`<p class="sr2-tag"><small>P&amp;L</small><b class="${v>=0?'sr-tu':'sr-td'}">${pm(v)}</b></p>
    <p class="sr2-mini"><span>24h <b class="${d1>0?'sr-tu':d1<0?'sr-td':''}">${d1?kS(d1):'·'}</b></span><span>7d <b class="${d7>0?'sr-tu':d7<0?'sr-td':''}">${d7?kS(d7):'·'}</b></span></p>${spark(bal,m,lo-pd,hi+pd,1e5)}`)}).join('')}</div>
  <p class="sr2-key"><i class="sr2-kd"></i> $100,000 start. Same scale in every strip.</p>
  <p class="sr2-note">The whole balance on every call. Buy on up, short on down. No leverage. Before fees.</p>`;
/* Accuracy */
const vAcc=`<div class="sr2-ss">${byA.map((m,i)=>{const a=P[m],t=a.W+a.L;
  return strip(m,i,`<p class="sr2-tag"><small>Hit rate</small><b>${S.hr(m)}%</b></p>
    <p class="sr2-mini"><span><b class="sr-tu">${a.W}</b> W</span><span><b class="sr-td">${a.L}</b> L</span><span>${t} trades</span></p>${spark(acc,m,.3,.8,.5)}`)}).join('')}</div>
  <p class="sr2-key"><i class="sr2-kd"></i> Coin flip, 50%. Every line starts at 50/50.</p>
  <p class="sr2-note">Right on direction, up or down.</p>`;
/* Target hits */
const vTgt=`<div class="sr2-ss sr2-tg">${byT.map((m,i)=>strip(m,i,`${target(m,'sr2-tgt')}
    <dl class="sr2-k"><div class="sr2-kb"><dd>${S.S[m].bu}</dd><dt>Bullseyes</dt></div><div class="sr2-kw"><dd>${S.S[m].w1}</dd><dt>Within 1%</dt></div><div class="sr2-ko"><dd>${S.S[m].ot}</dd><dt>Off target</dt></div></dl>`,'sr2-st')).join('')}</div>
  <p class="sr2-note">The bullseye is what the stock did. One hole per call that got the direction. Bullseye: within 0.1%. Off target: the wrong way.</p>`;
/* Sector: each AI's industries as chips; a star where it is the best of the four */
const SN={'Industrials':'Industry','Media & telecom':'Media','Consumer':'Consumer'},rows=secs.map(x=>secRow(x)).map(r=>({...r,full:r.nm,nm:SN[r.nm]||r.nm}));
const vSec=`<div class="sr2-ss sr2-sc">${rank.map((m,i)=>strip(m,i,`<ul class="sr2-ch">${rows.map(s=>{const c=s.cs.find(q=>q.m===m);
    return !c.n?`<li class="sr-0"><small>${S.esc(s.nm)}</small><b>·</b></li>`:`<li title="${S.esc(s.full)}" class="sr-${3*c.k>=2*c.n?'hi':3*c.k<=c.n?'lo':'md'}${c.top?' sr2-top':''}"><small>${S.esc(s.nm)}</small><b>${c.k}/${c.n}</b></li>`}).join('')}</ul>`,'sr2-ss2')).join('')}</div>
  <p class="sr2-note">Right calls out of calls made. Green: 2 in 3 or better. Red: 1 in 3 or worse. Starred: the best of the four in that industry. Small samples.</p>`;
/* Race: who held first, as a bar of the holder's colour, over the position chart */
const Y=p=>((p-.5)/4*100);
const rl=S.ORDER.slice().sort((a,b)=>pos[b][N]-pos[a][N]).map(m=>{const d=pos[m].map((p,i)=>(i?'L':'M')+(i/N*1000).toFixed(1)+' '+Y(p).toFixed(2)).join(' ');return `<path class="sr2-ro" d="${d}"/><path class="sr2-rl" style="--mc:${col(m)}" d="${d}" pathLength="1"/>`}).join('');
const segs=leads.map(l=>{const x0=l.i===1?0:(l.i-.5)/N*100,x1=l.to===N?100:(l.to+.5)/N*100,w=x1-x0;return `<span class="sr2-seg${ink(l.m)?' sr2-dk':''}" style="left:${x0.toFixed(2)}%;width:${w.toFixed(2)}%;--mc:${col(l.m)}" title="${NM[l.m]} led R${l.n} to R${R[l.to-1].n}">${l.len>=4?face(l.m,'sr2-sf'):''}</span>`}).join('');
const last=leads[leads.length-1];
const race=`<p class="sr2-rbk">Who held first</p><div class="sr2-rb" aria-hidden="true">${segs}</div>
  <div class="sr2-rc"><span class="sr2-ry" aria-hidden="true"><i>1st</i><i>2nd</i><i>3rd</i><i>4th</i></span>
  <div class="sr2-rcv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${[1,2,3].map(k=>`<line class="sr2-g" x1="0" x2="1000" y1="${k*25}" y2="${k*25}"/>`).join('')}${leads.slice(1).map(l=>`<line class="sr2-hv" x1="${(l.i-.5)/N*1000}" x2="${(l.i-.5)/N*1000}" y1="0" y2="100"/>`).join('')}${rl}</svg>
  <div class="sr2-rends">${S.ORDER.map(m=>`<span class="sr2-rend" style="top:${Y(pos[m][N]).toFixed(2)}%">${face(m,'sr2-f')}</span>`).join('')}</div></div></div>
  <p class="sr2-rx" aria-hidden="true"><span>Start</span><span>R${R[N-1].n}</span></p>
  <ol class="sr2-hl">${leads.slice(1).reverse().slice(0,3).map(l=>`<li style="--mc:${col(l.m)}"><span class="sr2-hr">R${l.n}</span>${face(l.from,'wc-f-s')}<span class="sr2-ar" aria-label="hands first to">➜</span>${face(l.m,'wc-f-s')}<span><b>${NM[l.m]}</b> takes first from ${NM[l.from]}<small>${S.esc(l.co)}</small></span></li>`).join('')}</ol>`;
const raceH=`Who was in front after every graded round. The lead has changed hands ${leads.length-1} times. ${NM[last.m]} has led since round ${last.n}.`;
function enter(v){v.querySelectorAll('.sr2-l').forEach((p,i)=>p.animate([{strokeDashoffset:1,strokeDasharray:1},{strokeDashoffset:0,strokeDasharray:1}],{duration:800,delay:i*90,easing:'cubic-bezier(.3,.6,.2,1)',fill:'backwards'}));
  v.querySelectorAll('.sr2-s').forEach((e,i)=>e.animate([{opacity:0,transform:'translateX(-14px)'},{opacity:1,transform:'none'}],{duration:300,delay:i*70,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'}));
  v.querySelectorAll('.sr-th').forEach((e,i)=>e.animate([{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],{duration:220,delay:260+i*8,easing:'cubic-bezier(.3,1.8,.5,1)',fill:'backwards'}))}
function raceEnter(box,rm){if(rm)return;const T=5200;
  box.querySelectorAll('.sr2-rcv svg,.sr2-rb').forEach(e=>e.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:T,easing:'linear',fill:'backwards'}));
  box.querySelectorAll('.sr2-seg').forEach(e=>{const l=parseFloat(e.style.left)/100;e.animate([{transform:'scaleY(.2)'},{transform:'scaleY(1.25)',offset:.5},{transform:'none'}],{duration:420,delay:l*T,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})})}
S.mount('r2',{pnl:vPnl,acc:vAcc,tgt:vTgt,sec:vSec,race,raceH,enter,raceEnter});
})();
