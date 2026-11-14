/* T4 "Meanwhile...": who's winning told as a comic page. The window switch is the comic's own time caption ("All season...",
   "In the last 24 hours...", "This past week..."). The leader gets the splash panel on the penthouse roof, everyone else a panel
   of their own: climbing the fire escape when they're up, out in the rain when they're down. Each character says its P&L in a
   balloon; the gap to the leader is the climber's line. Then "By the numbers": one band per AI in its own colour, every stat in
   one column. Painted: the roof, the stairs, the rain (gpt-image-2). */
(function(){const {S,esc,$f,$abs,col,NM,MS,face,mark,logo,IMG,k$}=window.LQ;const R=window.PQ.rnd;
const CAP={season:'All season...',d1:'In the last 24 hours...',d7:'This past week...'};
const tail=(s,flip)=>`<svg class="t4-tl${flip?' t4-tlf':''}" viewBox="0 0 30 24" aria-hidden="true"><path d="M2 0 L${16+R(s)*4} 22 L22 0Z" fill="#fffdf4" stroke="#0d0b10" stroke-width="2.4" stroke-linejoin="round"/><path d="M1 -1 L23 -1" stroke="#fffdf4" stroke-width="4"/></svg>`;
function build(D){return `<h2 class="t4-h"><span>Who's</span> <span>winning?</span></h2>
  <div class="t4-sw" role="tablist" aria-label="Time window">${D.WS.map((w,i)=>`<button type="button" role="tab" class="t4-b" data-k="${w.k}" aria-selected="false" style="--t:${((R(60+i)-.5)*3).toFixed(1)}deg"><b>${CAP[w.k]}</b><small>${esc(w.when)}</small></button>`).join('')}</div>
  <div class="t4-pg lq-z"></div><p class="t4-close"></p>
  <div class="t4-num" role="table" aria-label="By the numbers"><h3 class="t4-nh">By the numbers</h3><div class="t4-nr t4-nhd" role="row"><span role="columnheader">AI</span><span role="columnheader">P&amp;L</span><span role="columnheader">W-L</span><span role="columnheader">Hit</span><span role="columnheader">Last 5</span><span role="columnheader">Best</span><span role="columnheader">Worst</span></div><div class="t4-rows"></div></div>`}
function say(m,r,X,i){const L=X.row[X.o[0]];if(i===0)return r.amt>=0?`Up ${$abs(r.amt)}.`:`Down ${$abs(r.amt)}, and still on top.`;
  const gap=L.amt-r.amt;return (r.amt>=0?`Up ${$abs(r.amt)}.`:`Down ${$abs(r.amt)}.`)+(i===1?` <small>${$abs(gap)} behind ${NM[X.o[0]]}.</small>`:'')}
function draw(root,k,prev,anim,D){const X=D.X[k],pg=root.querySelector('.t4-pg');
  pg.innerHTML=X.o.map((m,i)=>{const r=X.row[m],bg=i===0&&r.amt>=0?'t4-up':r.amt>=0?'t4-stairs':'t4-down',s=MS.indexOf(m)*7;
    return `<div class="t4-pn t4-p${i} t4-bg-${bg}" style="--mc:${col(m)};background-image:url(${D.IMG}${bg}.jpg);--t:${((R(s)-.5)*1.4).toFixed(2)}deg" role="group" aria-label="${NM[m]}, number ${i+1}">
     <span class="t4-rk">${i===0?(m===D.gold?'#1 · Golden ticket':'#1'):'#'+(i+1)}</span>
     <span class="t4-bl"><b class="${r.amt>=0?'lq-u':'lq-d'}">${say(m,r,X,i)}</b><em>${r.W} right, ${r.L} wrong</em>${tail(s,i%2)}</span>
     <span class="t4-ch"><span class="t4-fc">${face(m)}</span><span class="t4-nm">${mark(m,'t4-mk')}${NM[m]}</span></span></div>`}).join('');
  if(anim)pg.querySelectorAll('.t4-pn').forEach((p,i)=>p.animate([{transform:'translateX(30px) rotate(2deg)',opacity:0},{transform:'none',opacity:1}],{duration:420,delay:i*110,easing:'cubic-bezier(.2,1.2,.4,1)',composite:'add',fill:'backwards'}));
  root.querySelector('.t4-close').innerHTML=k==='season'?D.line:`${esc(X.w.lab)} · ${esc(X.w.when)}. The golden ticket stays with ${NM[D.gold]}, the season leader.`;
  root.querySelector('.t4-rows').innerHTML=X.o.map((m,i)=>{const r=X.row[m];return `<div class="t4-nr" role="row" style="--mc:${col(m)}"><span role="cell" class="t4-nn">${mark(m,'t4-mk')}${NM[m]}</span>
   <span role="cell" class="t4-npl">${$f(r.amt)}</span><span role="cell">${r.W}-${r.L}</span><span role="cell">${S.hr(r)}</span><span role="cell" class="t4-n5">${r.l5.map(ok=>`<i class="${ok?'t4-w':'t4-l'}">${ok?'W':'L'}</i>`).join('')}</span>
   <span role="cell" class="t4-nb">${r.top?logo(r.top.r,'t4-lg')+k$(r.top.v):'–'}</span><span role="cell" class="t4-nb">${r.low?logo(r.low.r,'t4-lg')+k$(r.low.v):'–'}</span></div>`}).join('')}
window.LQT={id:'t4',build,draw};})();
