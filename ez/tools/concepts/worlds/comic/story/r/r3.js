/* R3 · Printed on the Season 1 ticket. Each view is a Season 1 ticket on manila card stock, the object the site already
   uses for its standings. The question is printed in the ticket's header band (no caption box, no empty corner). The
   stub is the axis: green above the line that decides it (the $100,000 start, the coin flip), red below, split exactly
   where that line runs, so the stub alone says "made money / lost money". Faces ride the line ends on the tear-off
   edge. The rows become four torn-off stubs. Target hits: four admit-one tickets, the counts as printed fields.
   Sector: who owns each industry, one stub per industry with its best AI's face. Race: the gold of first place travels
   along the leader's own line, so you see the lead pass from line to line; a balloon points at the latest pass and the
   race replays once on view, the balloon naming each pass as it happens. */
(function(){const S=SR,{NM,face,col,P,R,N,rank,bal,acc,byA,byT,target,secs,secRow,pos,leads,pm,kS}=S;const D=document;
const lab=v=>'$'+Math.round(v/1000)+'K';
function ticket(k,ser,lo,hi,base,ax,ord){const bY=S.yPct(base,lo,hi);
  const ls=ord.slice().reverse().map(m=>`<path class="sr3-o" d="${S.path(ser[m],lo,hi)}"/><path class="sr3-l" style="--mc:${col(m)}" d="${S.path(ser[m],lo,hi)}" pathLength="1"/>`).join('');
  return `<div class="sr3-tk"><div class="sr3-band"><span class="sr-qslot"></span></div>
    <div class="sr3-bd"><div class="sr3-stub" style="--b:${bY.toFixed(2)}%" aria-hidden="true"><b class="sr3-a1" style="top:${S.yPct(ax[3],lo,hi).toFixed(2)}%">${ax[0]}</b><b class="sr3-a2" style="top:${bY.toFixed(2)}%">${ax[1]}</b><b class="sr3-a3" style="top:${S.yPct(ax[4],lo,hi).toFixed(2)}%">${ax[2]}</b></div>
      <div class="sr3-pl"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><line class="sr3-base" x1="0" x2="1000" y1="${bY}" y2="${bY}"/>${ls}</svg></div>
      <div class="sr3-ends" data-ends='${JSON.stringify(ord.map(m=>({m,y:S.yPct(ser[m][N],lo,hi)})))}'>${ord.map(m=>`<span class="sr3-end" data-m="${m}">${face(m,'sr3-f')}</span>`).join('')}</div></div>
    <p class="sr3-x" aria-hidden="true"><span>Start</span><span>Round ${R[N-1].n}</span></p></div>`}
const stub=(m,i,inner)=>`<div class="sr3-sb${i===0?' sr3-1':''}" style="--mc:${col(m)}"><span class="sr3-no">No. ${i+1}</span><p class="sr3-nm">${face(m,'wc-f-s')}<b>${NM[m]}</b></p>${inner}</div>`;
/* P&L */
const all=[].concat(...S.ORDER.map(m=>bal[m])),lo=Math.min(...all),hi=Math.max(...all),pd=(hi-lo)*.07;
const vPnl=ticket('pnl',bal,lo-pd,hi+pd,1e5,[lab(hi),'$100K start',lab(lo),hi,lo],rank)+
  `<div class="sr3-sbs">${rank.map((m,i)=>{const v=P[m].pnl,d1=S.win(m,864e5),d7=S.win(m,7*864e5);return stub(m,i,`<p class="sr3-big ${v>=0?'sr-tu':'sr-td'}"><small>P&amp;L</small>${pm(v)}</p>
    <dl class="sr3-fl"><div><dt>Last 24h</dt><dd class="${d1>0?'sr-tu':d1<0?'sr-td':''}">${d1?kS(d1):'·'}</dd></div><div><dt>Last 7d</dt><dd class="${d7>0?'sr-tu':d7<0?'sr-td':''}">${d7?kS(d7):'·'}</dd></div></dl>`)}).join('')}</div>
  <p class="sr3-note">$100,000 each to start. The whole balance on every call. Buy on up, short on down. No leverage. Before fees.</p>`;
/* Accuracy */
const vAcc=ticket('acc',acc,.3,.8,.5,['75%','Coin flip','35%',.75,.35],byA)+
  `<div class="sr3-sbs">${byA.map((m,i)=>{const a=P[m];return stub(m,i,`<p class="sr3-big"><small>Hit rate</small>${S.hr(m)}%</p>
    <dl class="sr3-fl"><div><dt>W</dt><dd class="sr-tu">${a.W}</dd></div><div><dt>L</dt><dd class="sr-td">${a.L}</dd></div><div><dt>Trades</dt><dd>${a.W+a.L}</dd></div></dl>`)}).join('')}</div>
  <p class="sr3-note">Right on direction, up or down. Every line starts at 50/50 and moves with each call.</p>`;
/* Target hits: four admit-one tickets */
const vTgt=`<div class="sr3-tk sr3-tk0"><div class="sr3-band"><span class="sr-qslot"></span></div></div><div class="sr3-tgs">${byT.map((m,i)=>`<div class="sr3-tt${i===0?' sr3-1':''}" style="--mc:${col(m)}"><span class="sr3-no">No. ${i+1}</span><p class="sr3-nm">${face(m,'wc-f-s')}<b>${NM[m]}</b></p>${target(m,'sr3-tgt')}
    <dl class="sr3-tf"><div class="sr3-kb"><dd>${S.S[m].bu}</dd><dt>Bull&shy;seyes</dt></div><div class="sr3-kw"><dd>${S.S[m].w1}</dd><dt>Within 1%</dt></div><div class="sr3-ko"><dd>${S.S[m].ot}</dd><dt>Off target</dt></div></dl></div>`).join('')}</div>
  <p class="sr3-note">The bullseye is what the stock did. One hole per call that got the direction. Bullseye: within 0.1%. Off target: the wrong way.</p>`;
/* Sector: who owns each industry */
const SN={'Industrials':'Industry','Media & telecom':'Media'};
const vSec=`<div class="sr3-tk sr3-tk0"><div class="sr3-band"><span class="sr-qslot"></span></div></div><div class="sr3-scs">${secs.map(x=>{const s=secRow(x),tops=s.cs.filter(c=>c.top),best=tops.length?tops:[];
  const b=best[0]||s.cs[0],bd=b.n?(3*b.k>=2*b.n?'hi':3*b.k<=b.n?'lo':'md'):'0';
  return `<div class="sr3-sc sr-${bd}" title="${S.esc(s.nm)}"><p class="sr3-sn">${S.esc(SN[s.nm]||s.nm)}<small>${s.n}</small></p>
    <p class="sr3-sw">${best.length?best.map(c=>face(c.m,'sr3-sf')).join(''):'<span class="sr3-tie">All tied</span>'}</p><b class="sr3-sk">${best.length?`${b.k}/${b.n}`:`${s.cs[0].k}/${s.cs[0].n}`}</b>
    <ul class="sr3-so">${s.cs.filter(c=>!c.top).map(c=>`<li>${face(c.m,'wc-f-s')}<span>${c.n?c.k+'/'+c.n:'·'}</span></li>`).join('')}</ul></div>`}).join('')}</div>
  <p class="sr3-note">Each industry's best AI, right calls out of calls made (the small number is how many rounds). The others underneath. Green: 2 in 3 or better. Red: 1 in 3 or worse. Small samples.</p>`;
/* Race: the gold of first place rides the leader's own line */
const Y=p=>((p-.5)/4*100);
const rl=S.ORDER.slice().sort((a,b)=>pos[b][N]-pos[a][N]).map(m=>{const d=pos[m].map((p,i)=>(i?'L':'M')+(i/N*1000).toFixed(1)+' '+Y(p).toFixed(2)).join(' ');return `<path class="sr3-o" d="${d}"/><path class="sr3-l" style="--mc:${col(m)}" d="${d}" pathLength="1"/>`}).join('');
const gold=leads.map(l=>{const x0=l.i===1?0:(l.i-.5)/N*1000,x1=l.to===N?1000:(l.to+.5)/N*1000;return `<path class="sr3-gs" d="M${x0.toFixed(1)} ${Y(1)} L${x1.toFixed(1)} ${Y(1)}"/>`}).join('');
const last=leads[leads.length-1];
const race=`<div class="sr3-tk sr3-rtk"><div class="sr3-band"><span>Who held first, round by round</span></div>
  <div class="sr3-bd"><div class="sr3-stub sr3-rst" aria-hidden="true"><i>1st</i><i>2nd</i><i>3rd</i><i>4th</i></div>
   <div class="sr3-pl"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">${[1,2,3].map(k=>`<line class="sr3-g" x1="0" x2="1000" y1="${k*25}" y2="${k*25}"/>`).join('')}${gold}${rl}</svg>
    ${leads.slice(1).map(l=>`<i class="sr3-hp" style="left:${((l.i-.5)/N*100).toFixed(2)}%;--mc:${col(l.m)}" data-i="${l.i}"></i>`).join('')}
    </div>
   <div class="sr3-ends sr3-rends">${S.ORDER.map(m=>`<span class="sr3-end" style="top:${Y(pos[m][N]).toFixed(2)}%">${face(m,'sr3-f')}</span>`).join('')}</div></div>
  <div class="sr3-blr"><p class="sr3-bl" style="--x:${((last.i-.5)/N*100).toFixed(2)}%"><span class="sr3-blf">${face(last.from,'wc-f-s')}<em>➜</em>${face(last.m,'wc-f-s')}</span><span class="sr3-blt"><b>R${last.n}</b> ${NM[last.m]} takes first from ${NM[last.from]}</span></p></div><p class="sr3-x" aria-hidden="true"><span>Start</span><span>Round ${R[N-1].n}</span></p></div>`;
const raceH=`The gold rides whoever was in front. The lead has changed hands ${leads.length-1} times. ${NM[last.m]} has led since round ${last.n}.`;
function lay(lb){lb.querySelectorAll('.sr3-tk:not(.sr3-rtk) .sr3-ends').forEach(e=>{const h=e.clientHeight;if(!h)return;S.spread(JSON.parse(e.dataset.ends),h,24).forEach(o=>{const el=e.querySelector(`[data-m="${o.m}"]`);if(el)el.style.top=o.px+'px'})});
  /* the latest-pass balloon: keep it inside the ticket */
  lb.querySelectorAll('.sr3-bl').forEach(b=>{const pl=b.parentNode,tk=b.closest('.sr3-tk'),pp=tk.querySelector('.sr3-pl'),w=pl.clientWidth;if(!w||!pp.clientWidth)return;const x=pp.offsetLeft+parseFloat(b.style.getPropertyValue('--x'))/100*pp.clientWidth,bw=b.offsetWidth;const left=Math.max(4,Math.min(w-bw-4,x-bw*.75));b.style.left=left+'px';b.style.setProperty('--tl',(x-left)+'px')})}
function enter(v){v.querySelectorAll('.sr3-l').forEach(p=>p.animate([{strokeDashoffset:1,strokeDasharray:1},{strokeDashoffset:0,strokeDasharray:1}],{duration:900,easing:'cubic-bezier(.3,.6,.2,1)',fill:'backwards'}));
  v.querySelectorAll('.sr3-o').forEach(p=>p.animate([{opacity:0},{opacity:1}],{duration:500,fill:'backwards'}));
  v.querySelectorAll('.sr3-end').forEach((e,i)=>e.animate([{opacity:0,transform:'translateY(-50%) scale(.4)'},{opacity:1,transform:'translateY(-50%)'}],{duration:300,delay:800+i*60,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'}));
  v.querySelectorAll('.sr3-sb,.sr3-tt,.sr3-sc').forEach((e,i)=>e.animate([{opacity:0,transform:'translateY(-10px) rotate(-3deg)'},{opacity:1,transform:'none'}],{duration:300,delay:150+i*50,easing:'cubic-bezier(.3,1.4,.5,1)',fill:'backwards'}));
  v.querySelectorAll('.sr-th').forEach((e,i)=>e.animate([{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],{duration:220,delay:260+i*8,easing:'cubic-bezier(.3,1.8,.5,1)',fill:'backwards'}))}
function raceEnter(box,rm){if(rm)return;const T=6000,sv=box.querySelector('.sr3-pl svg'),bl=box.querySelector('.sr3-bl'),bf=bl.querySelector('.sr3-blf'),bt=bl.querySelector('.sr3-blt'),fin=[bf.innerHTML,bt.innerHTML,bl.style.left,bl.style.getPropertyValue('--tl')];
  const A=sv.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:T,easing:'linear',fill:'backwards'});
  box.querySelectorAll('.sr3-hp').forEach(p=>p.animate([{opacity:0,transform:'translate(-50%,-50%) scale(.2)'},{opacity:1,transform:'translate(-50%,-50%) scale(1.6)',offset:.4},{opacity:1,transform:'translate(-50%,-50%)',offset:.8},{opacity:0,transform:'translate(-50%,-50%)'}],{duration:1400,delay:+p.dataset.i/N*T,easing:'ease-out',fill:'backwards'}));
  const w=bl.parentNode.clientWidth,pp=box.querySelector('.sr3-pl');
  let cur=-1;const L=leads.slice(1);const tick=()=>{const t=A.currentTime||0;let k=-1;L.forEach((l,j)=>{if((l.i-.5)/N*T<=t)k=j});
    if(A.playState==='finished'){bf.innerHTML=fin[0];bt.innerHTML=fin[1];bl.style.left=fin[2];bl.style.setProperty('--tl',fin[3]);return}
    if(k!==cur){cur=k;if(k>=0){const l=L[k];bf.innerHTML=`${face(l.from,'wc-f-s')}<em>➜</em>${face(l.m,'wc-f-s')}`;bt.innerHTML=`<b>R${l.n}</b> ${NM[l.m]} takes first from ${NM[l.from]}`;
      const x=pp.offsetLeft+(l.i-.5)/N*pp.clientWidth,bw=bl.offsetWidth,left=Math.max(4,Math.min(w-bw-4,x-bw*.75));bl.style.left=left+'px';bl.style.setProperty('--tl',(x-left)+'px');bl.animate([{transform:'scale(.9)'},{transform:'none'}],{duration:220,easing:'cubic-bezier(.3,1.6,.5,1)'})}}
    requestAnimationFrame(tick)};requestAnimationFrame(tick)}
S.mount('r3',{pnl:vPnl,acc:vAcc,tgt:vTgt,sec:vSec,race,raceH,qInto:true,enter,raceEnter,after:lb=>{lay(lb);const ro=new ResizeObserver(()=>lay(lb));lb.querySelectorAll('.sr3-ends,.sr3-pl').forEach(x=>ro.observe(x));D.fonts.ready.then(()=>lay(lb))}});
})();
