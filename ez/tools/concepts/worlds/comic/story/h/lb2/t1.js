/* T1 "Going up": the standings as a cutaway Art Deco tower. Each AI rides its own elevator; the car's floor is its P&L in the
   window (street level = $0, profit above, losses in the basement under red emergency light). The call panel is the window
   switch: press a brass button and the cars ride to their new floors and the shafts swap places to the new rank. Under it the
   lobby directory (a felt letter board) carries the full stats on one shared axis. Painted: the tower (seedream-50-pro). */
(function(){const {S,esc,$f,k$,col,NM,MS,face,mark,logo,IMG}=window.LQ;
const STREET=.765; /* the street line in the painting, measured on t1-tower.jpg (735 of 960) */
const cage=s=>{const r=k=>(window.PQ.rnd(s*7+k)-.5)*1.6;
  return `<svg class="t1-cg" viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true">
   <path d="M${4+r(1)} 118 L${3+r(2)} 22 Q 50 ${-2+r(3)} ${97+r(4)} 22 L${96+r(5)} 118Z" fill="none" stroke="#120d0a" stroke-width="7" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
   <path d="M${4+r(1)} 118 L${3+r(2)} 22 Q 50 ${-2+r(3)} ${97+r(4)} 22 L${96+r(5)} 118Z" fill="none" stroke="var(--brass)" stroke-width="3.4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
   <path d="M10 30 Q50 ${10+r(6)} 90 30" fill="none" stroke="var(--brass)" stroke-width="1.6" vector-effect="non-scaling-stroke"/>
   ${[22,38,62,78].map((x,i)=>`<path d="M${x+r(10+i)} 34 L${x+r(20+i)} 118" stroke="#120d0a" stroke-width="2.2" vector-effect="non-scaling-stroke" opacity=".75"/><path d="M${x+r(10+i)} 34 L${x+r(20+i)} 118" stroke="var(--brass)" stroke-width="1" vector-effect="non-scaling-stroke" opacity=".9"/>`).join('')}
   <path d="M4 104 L96 104" stroke="#120d0a" stroke-width="4" vector-effect="non-scaling-stroke"/><path d="M4 104 L96 104" stroke="var(--brass)" stroke-width="2" vector-effect="non-scaling-stroke"/>
   <path d="M50 ${-2+r(3)} L50 -60" stroke="#120d0a" stroke-width="2" vector-effect="non-scaling-stroke"/></svg>`};
const ticket=`<svg class="t1-tk" viewBox="0 0 60 26" aria-hidden="true"><path d="M2 3 Q30 1 58 3 L57 9 A4 4 0 0 0 57 17 L58 23 Q30 25 2 23 L3 17 A4 4 0 0 0 3 9Z" fill="#120d0a" transform="translate(1.4 1.6)"/><path d="M2 3 Q30 1 58 3 L57 9 A4 4 0 0 0 57 17 L58 23 Q30 25 2 23 L3 17 A4 4 0 0 0 3 9Z" fill="#f2c13a" stroke="#120d0a" stroke-width="1.4"/><path d="M14 4 L14 22" stroke="#8a5a08" stroke-width="1" stroke-dasharray="2 2"/></svg>`;
function build(D){const W=D.WS;
  const btn=(w,i)=>`<button type="button" role="tab" class="t1-b" data-k="${w.k}" aria-selected="false"><i class="t1-bk" aria-hidden="true"><svg viewBox="0 0 40 40"><circle cx="21" cy="22" r="17" fill="#120d0a"/><circle cx="20" cy="20" r="16.5" fill="url(#t1brass)" stroke="#120d0a" stroke-width="1.6"/><circle class="t1-lamp" cx="20" cy="20" r="10.5"/><path d="M13 14 Q18 10 25 11" fill="none" stroke="#fff6d8" stroke-width="2" stroke-linecap="round" opacity=".7"/></svg></i><b>${w.short==='24h'?'24 hours':w.short}</b><small>${esc(w.when)}</small></button>`;
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><radialGradient id="t1brass" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe6a0"/><stop offset=".45" stop-color="#d49b2e"/><stop offset="1" stop-color="#6f4710"/></radialGradient></defs></svg>
  <header class="t1-hd"><p class="t1-kick"><span>${esc(D.graded)}</span>${D.bell?`<span>Next bell <b>${esc(D.bell.t)}</b></span>`:''}</p>
   <h2 class="t1-h"><span>Who's</span> <span>winning?</span></h2>
   <p class="t1-sub">If you'd bet $100K on every call. The higher the floor, the bigger the P&amp;L.</p></header>
  <div class="t1-wrap"><div class="t1-tw lq-z"><img class="t1-bg" src="${IMG}t1-tower.jpg" alt="">
    <div class="t1-panel" role="tablist" aria-label="Time window">${W.map(btn).join('')}</div>
    <div class="t1-fls" aria-hidden="true"></div><div class="t1-st" aria-hidden="true"><span>Street level · $0</span></div>
    ${MS.map(m=>`<div class="t1-sh" data-m="${m}" style="--mc:${col(m)}"><i class="t1-cb" aria-hidden="true"></i><div class="t1-car${m===D.gold?' t1-gold':''}">
       <b class="t1-pl"></b><div class="t1-cab"><div class="t1-face">${face(m)}</div>${cage(MS.indexOf(m)+3)}</div>
       <span class="t1-nm">${mark(m,'t1-mk')}${NM[m]}</span>${m===D.gold?`<span class="t1-gt">${ticket}<em>Golden ticket</em></span>`:''}</div></div>`).join('')}
   </div>
   <div class="t1-dir"><div class="t1-dh"><b>Directory</b><span class="t1-dw"></span></div>
    <div class="t1-dg" role="table" aria-label="Scoreboard"><div class="t1-dr t1-dhd" role="row"><span role="columnheader">Floor</span><span role="columnheader">AI</span><span role="columnheader">P&amp;L</span><span role="columnheader">W-L</span><span role="columnheader">Hit</span><span role="columnheader">Last 5</span><span role="columnheader">Best</span><span role="columnheader">Worst</span></div><div class="t1-rows"></div></div>
    <p class="t1-dn">W = right direction. Hit rate shows "–" under 5 calls. ${esc(D.line.replace(/<[^>]+>/g,''))}</p></div></div>`}
function draw(root,k,prev,anim,D){const X=D.X[k],tw=root.querySelector('.t1-tw'),img=tw.querySelector('.t1-bg');
  const go=()=>{const bw=tw.clientWidth,bh=tw.clientHeight,iw=img.naturalWidth||1080,ih=img.naturalHeight||1920,s=Math.max(bw/iw,bh/ih),oy=(bh-ih*s)/2;
   const street=oy+STREET*ih*s,top=root.querySelector('.t1-panel').offsetHeight+86,up=street-top,dn=bh-street-30;
   const hi=Math.max(1,...MS.map(m=>X.row[m].amt)),lo=Math.min(-1,...MS.map(m=>X.row[m].amt));const px=Math.min(up/hi,dn/-lo);
   tw.style.setProperty('--street',street+'px');
   /* floor lines every nice step */
   const span=Math.max(hi,-lo),st=[10e3,20e3,25e3,50e3,100e3,200e3].find(v=>span/v<=3.2)||200e3;let fl='';
   for(let v=st;v<=hi*1.02+st*.3&&street-v*px>top-24;v+=st)fl+=`<span class="t1-fl" style="top:${street-v*px}px"><b>+$${v/1000}K</b></span>`;
   for(let v=-st;street-v*px<bh-6;v-=st)fl+=`<span class="t1-fl t1-flb" style="top:${street-v*px}px"><b>−$${-v/1000}K</b></span>`;
   tw.querySelector('.t1-fls').innerHTML=fl;
   X.o.forEach((m,i)=>{const sh=tw.querySelector(`.t1-sh[data-m="${m}"]`),r=X.row[m],car=sh.querySelector('.t1-car');sh.style.setProperty('--i',i);
     car.style.setProperty('--y',(street-r.amt*px)+'px');car.classList.toggle('t1-neg',r.amt<0);
     const pl=car.querySelector('.t1-pl');window.SS.count(pl,prev&&anim?D.X[prev].row[m].amt:r.amt,r.amt,anim?900:0,k$)});
   tw.classList.toggle('t1-anim',!!anim)};
  if(img.complete)go();else img.onload=go;window.addEventListener('resize',go);
  root.querySelector('.t1-dw').textContent=X.w.lab+' · '+X.w.when;
  root.querySelector('.t1-rows').innerHTML=X.o.map((m,i)=>{const r=X.row[m];return `<div class="t1-dr" role="row" style="--mc:${col(m)}">
    <span role="cell" class="t1-dfl">${i+1}</span><span role="cell" class="t1-dnm">${NM[m]}</span><span role="cell" class="${r.amt>=0?'lq-u':'lq-d'} t1-dpl">${$f(r.amt)}</span>
    <span role="cell"><b class="lq-u">${r.W}</b>-<b class="lq-d">${r.L}</b></span><span role="cell">${window.SS.hr(r)}</span>
    <span role="cell" class="t1-d5">${r.l5.map(ok=>`<i class="${ok?'lq-u':'lq-d'}">${ok?'W':'L'}</i>`).join('')}</span>
    <span role="cell" class="t1-dbw">${r.top?logo(r.top.r,'t1-lg')+`<em class="${r.top.v>=0?'lq-u':'lq-d'}">${k$(r.top.v)}</em>`:'–'}</span>
    <span role="cell" class="t1-dbw">${r.low?logo(r.low.r,'t1-lg')+`<em class="${r.low.v>=0?'lq-u':'lq-d'}">${k$(r.low.v)}</em>`:'–'}</span></div>`}).join('')}
window.LQT={id:'t1',build,draw};})();
