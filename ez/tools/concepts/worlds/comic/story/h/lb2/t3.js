/* T3 "The wall": the old hand-hung scoreboard in the outfield wall. The board is a line score: one row per AI in rank order, every
   stat in its own column (P&L, W, L, hit rate, the last five as the board's lit bulbs, best and worst round with the company's
   plate). The window switch is the board's own header: three hung plates, the lit one is the window shown; switching re-hangs the
   rows (they slide to their new place) and the plates flip. Painted: the ballpark at dusk (gpt-image-2). The board, its planks,
   nails and plates are drawn. */
(function(){const {S,esc,$f,k$,col,NM,MS,mark,logo,IMG}=window.LQ;const R=window.PQ.rnd;
const tilt=s=>((R(s)-.5)*2.4).toFixed(2)+'deg';
const plate=(txt,cls,s)=>`<span class="t3-p ${cls||''}" style="--t:${tilt(s)}"><i aria-hidden="true"></i><b>${txt}</b></span>`;
function build(D){return `<div class="t3-park lq-z" style="background-image:url(${IMG}t3-park.jpg)"><div class="t3-bd">
  <div class="t3-top"><h2 class="t3-h">Who's winning?</h2><p class="t3-k">${esc(D.graded)}${D.bell?' · next bell '+esc(D.bell.t):''}</p></div>
  <div class="t3-sw" role="tablist" aria-label="Time window">${D.WS.map((w,i)=>`<button type="button" role="tab" class="t3-b" data-k="${w.k}" aria-selected="false" style="--t:${tilt(40+i)}"><i class="t3-bulb" aria-hidden="true"></i><b>${w.short==='24h'?'24 hours':w.short}</b><small>${esc(w.when)}</small></button>`).join('')}</div>
  <div class="t3-g" role="table" aria-label="Scoreboard"><div class="t3-r t3-hr" role="row"><span role="columnheader"></span><span role="columnheader">AI</span><span role="columnheader" class="t3-plh">P&amp;L</span><span role="columnheader">W</span><span role="columnheader">L</span><span role="columnheader">Hit</span><span role="columnheader">Last 5</span><span role="columnheader">Best</span><span role="columnheader">Worst</span></div>
   ${MS.map(m=>`<div class="t3-r" role="row" data-m="${m}" style="--mc:${col(m)}"></div>`).join('')}</div>
  <p class="t3-ft"></p></div></div>
  <p class="t3-note">If you'd bet $100K on every call. W = the right direction. A lit bulb is a right call, red a wrong one, newest on the right. ${D.line}</p>`}
function draw(root,k,prev,anim,D){const X=D.X[k],g=root.querySelector('.t3-g'),rows=[...g.querySelectorAll('.t3-r[data-m]')];
  S.flip(rows,()=>{X.o.forEach((m,i)=>{const r=X.row[m],e=g.querySelector(`.t3-r[data-m="${m}"]`);e.style.order=i+1;const s=MS.indexOf(m)*20;
    e.innerHTML=`<span role="cell">${plate(i+1,'t3-rk',s+1)}</span><span role="cell" class="t3-nm">${mark(m,'t3-mk')}<b>${NM[m]}</b>${m===D.gold?'<em class="t3-gt">Golden ticket</em>':''}</span>
     <span role="cell" class="t3-plc">${plate($f(r.amt),'t3-pl '+(r.amt>=0?'t3-up':'t3-dn'),s+3)}</span><span role="cell">${plate(r.W,'',s+4)}</span><span role="cell">${plate(r.L,'',s+5)}</span><span role="cell">${plate(S.hr(r),'t3-sm',s+6)}</span>
     <span role="cell" class="t3-l5">${r.l5.map((ok,j)=>`<i class="${ok?'t3-on':'t3-off'}" title="${ok?'Right way':'Wrong way'}"></i>`).join('')}</span>
     <span role="cell" class="t3-bw">${r.top?`<span class="t3-co">${logo(r.top.r,'t3-lg')}</span><em class="${r.top.v>=0?'t3-up':'t3-dn'}">${k$(r.top.v)}</em>`:'–'}</span>
     <span role="cell" class="t3-bw">${r.low?`<span class="t3-co">${logo(r.low.r,'t3-lg')}</span><em class="${r.low.v>=0?'t3-up':'t3-dn'}">${k$(r.low.v)}</em>`:'–'}</span>`})},anim);
  if(anim)g.querySelectorAll('.t3-pl').forEach((p,i)=>p.animate([{transform:'perspective(200px) rotateX(90deg)'},{transform:'none'}],{duration:420,delay:200+i*90,easing:'cubic-bezier(.2,1.3,.5,1)',composite:'add'}));
  root.querySelector('.t3-ft').textContent=X.w.lab+' · '+X.w.when}
window.LQT={id:'t3',build,draw};})();
