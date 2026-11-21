/* Q2 · Shouting match. The predictions are speech balloons, and the balloons carry the story through: 1 a comic page, one tall
   panel for the lone bull against three stacked panels for the bears, each painted in its AI's own colour, each AI shouting its
   call; 2 the film rolls on its own (muted) from the moment the calls are up, the close lettered on it as a sound effect when
   the market lands; 3 the same balloons pinned round the dial: the needle swings, the wrong-way balloon pops, the right ones
   are ticked, the closest crowned, a narration box saying each beat; 4 the payout as bills: the winner's bill, the others'
   bills by size, the loser's an IOU; the season as a podium with a pit for money lost. */
(function(){try{const {D,H,NM,face,logo,$f,k$,esc,cap,G,ticks,tv,wireTv,stage,count,once,mount,pct,col,RM}=SQ;
  const {d,pg}=mount(d=>{const {cs,bulls,bears,up,A,n,co}=d;
    const word=x=>(x.up?'Up ':'Down ')+x.v+'%';
    /* ---- 1 · the shouting match ---- */
    const pan=(x,i,solo)=>`<div class="q2-pan${solo?' q2-solo':''}" style="--mc:${col(x.m)}">${i===0?`<p class="q2-lab">${x.up?'▲ Bull':'▼ Bears'}</p>`:''}
        <p class="q2-bal ${x.up?'q2-bu':'q2-bd'}"><b>${word(x)}!</b></p>${face(x.m,'q2-fc')}<span class="q2-nm">${NM[x.m]}</span></div>`;
    const colL=(list)=>list.length?`<div class="q2-col q2-col-${list.length===1?'one':'many'}">${list.map((x,i)=>pan(x,i,list.length===1)).join('')}</div>`:'';
    const p1=`<section class="wc11s-pn sq-p sq-p1 q2-p1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
      <p class="q2-bug">${logo(d.ticker,'q2-lg')}<b>${esc(co)}</b><span>Round ${n}</span><em>Locked ${d.called}</em></p>
      <div class="q2-page" style="--nb:${bulls.length||1};--nd:${bears.length||1}">${colL(bulls)}${colL(bears)}<span class="q2-vs" aria-hidden="true">${bulls.length} vs ${bears.length}</span></div>
      <p class="wc-sr">${bulls.length} said up, ${bears.length} said down. ${cs.map(x=>NM[x.m]+' '+word(x)).join('. ')}.</p></section>`;
    /* ---- 2 · the film rolls from the calls; the close lands as a sound effect ---- */
    const p2=`<section class="wc11s-pn sq-p sq-p2 q2-p2" aria-label="Step 2">${cap(2,esc(co)+' reports. Then the close')}
      ${tv(d,{cls:'q2-tv',tag:`<button type="button" class="q2-snd" aria-label="Sound on"><i aria-hidden="true"></i><span>Tap for sound</span></button>`})}</section>`;
    /* ---- 3 · the balloons go to the grader ---- */
    const dl=G.spread(cs,13),best=d.best,gap=best?Math.abs(best.sv-A):0;
    const mk=x=>{const [X,Y]=G.ptA(x.a,G.R+27);return `<span class="q2-mk${x.ok?' q2-ok':' q2-no'}" style="left:${(X/320*100).toFixed(2)}%;top:${(Y/190*100).toFixed(2)}%;--i:${dl.indexOf(x)}">${face(x.m,'q2-mf')}</span>`};
    const bal=(x,i)=>`<p class="q2-gb ${x.up?'q2-bu':'q2-bd'}${x.ok?' q2-ok':' q2-no'}${x.win?' q2-win':''}" style="--mc:${col(x.m)};--i:${i};--k:${cs.filter(y=>y.ok).indexOf(x)}">
        ${face(x.m,'q2-gf')}<b>${x.up?'+':'−'}${x.v}%</b>${x.ok?'<i class="q2-tick" aria-hidden="true">Pass</i>':`<i class="q2-pop" aria-hidden="true"><span>POP!</span></i><i class="q2-fl" aria-hidden="true">Fail</i>`}${x.win?'<em class="q2-cr" aria-hidden="true">♛</em>':''}</p>`;
    const gA=best?(()=>{let a0=A,a1=best.sv;if(Math.abs(a1-a0)<.6){const m=(a0+a1)/2;a0=m-.3;a1=m+.3}return G.arc(Math.max(a0,a1),Math.min(a0,a1),G.R+13)})():'';
    const nar=[`The calls are in: ${bulls.length} up, ${bears.length} down.`,`The bell. ${esc(co)} closes ${up?'up':'down'} ${pct(A)}.`,`Wrong way? Pop. Right way? Pass.`,best?`${NM[best.m]} was closest: ${Math.round(gap*100)/100}% off. ${NM[best.m]} wins.`:'Nobody got the direction.'];
    const p3=`<section class="wc11s-pn sq-p sq-p3 q2-p3${up?' q2-U':' q2-D'}" aria-label="Step 3">${cap(3,'The market grades every call')}
      <div class="q2-stage" role="button" tabindex="0" aria-label="${esc(co)} ${up?'rose':'fell'} ${pct(A)} at the close. ${dl.map(x=>NM[x.m]+(x.ok?' right':' wrong')).join(', ')}.${best?' '+NM[best.m]+' was closest, '+(Math.round(gap*100)/100)+'% off.':''} Tap to play the grading again.">
        <div class="q2-cl q2-cl-u">${bulls.map(bal).join('')}</div><div class="q2-cl q2-cl-d">${bears.map((x,i)=>bal(x,i+bulls.length)).join('')}</div>
        <div class="q2-dial sq-dial">
          <svg viewBox="0 0 320 190" aria-hidden="true"><path class="q2-ol" d="${G.arc(G.MX,-G.MX,G.R)}"/><path class="q2-bd q2-bdu" d="${G.arc(G.MX,0,G.R)}"/><path class="q2-bd q2-bdd" d="${G.arc(0,-G.MX,G.R)}"/>
            <path class="q2-pl" d="M${G.cx-G.R+10} ${G.cy}A${G.R-10} ${G.R-10} 0 0 1 ${G.cx+G.R-10} ${G.cy}Z"/>${ticks()}
            <text class="q2-lb" x="${G.pt(6,G.R-50)[0].toFixed(1)}" y="${G.pt(6,G.R-50)[1].toFixed(1)}">Up</text><text class="q2-lb" x="${G.pt(-6,G.R-50)[0].toFixed(1)}" y="${G.pt(-6,G.R-50)[1].toFixed(1)}">Down</text></svg>
          <div class="q2-ly q2-lit" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q2-bd" d="${G.arc(up?G.MX:0,up?0:-G.MX,G.R)}"/></svg></div>
          <div class="q2-ly q2-dim" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q2-bd" d="${G.arc(up?0:G.MX,up?-G.MX:0,G.R)}"/></svg></div>
          ${best?`<div class="q2-ly q2-ga" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="${gA}"/></svg></div>`:''}
          <div class="q2-ly q2-nd" style="--nd:${(-(G.ang(A)-90)).toFixed(2)}deg" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="M${G.cx-4.5} ${G.cy}L${G.cx} ${G.cy-G.R+14}L${G.cx+4.5} ${G.cy}Z"/><circle cx="${G.cx}" cy="${G.cy}" r="10"/><circle class="q2-hub" cx="${G.cx}" cy="${G.cy}" r="3.6"/></svg></div>
          ${dl.map(mk).join('')}
          <span class="q2-rd" aria-hidden="true">${up?'▲ +':'▼ −'}${pct(A)}</span></div></div>
      <div class="q2-nar" aria-hidden="true">${nar.map((t,i)=>`<p style="--i:${i}"><b>${i+1}</b>${t}</p>`).join('')}</div>
      <a class="q2-open" href="#/round/${n}">Open its graded card →</a></section>`;
    /* ---- 4 · the payout as bills ---- */
    const pay=d.pay,rest=cs.filter(x=>x!==pay).sort((a,b)=>b.pl-a.pl);
    const mx=Math.max(...d.season.map(s=>Math.abs(s.v))),HM=46,LB=50,hp=Math.max(0,...d.season.map(s=>s.v))/mx*HM,hn=Math.max(0,...d.season.map(s=>-s.v))/mx*HM;
    const step=s=>{const h=Math.max(5,Math.abs(s.v)/mx*HM);return `<li class="${s.v>=0?'q2-pos':'q2-neg'}${s.rank===1?' q2-gold':''}" style="--h:${h.toFixed(1)}px">
        <i class="q2-blk"><b>${s.rank}</b></i><span class="q2-st">${face(s.m,'q2-sf')}<span class="q2-snm">${NM[s.m]}${s.mv?` <i class="${s.mv>0?'q2-up':'q2-dn'}">${s.mv>0?'▲':'▼'}${Math.abs(s.mv)}</i>`:''}</span><b class="q2-sv">${k$(s.v)}</b></span></li>`};
    const p4=`<section class="wc11s-pn sq-p sq-p4 q2-p4" aria-label="Step 4">${cap(4,'The payout')}
      <div class="q2-made"><i class="q2-seal q2-s1">$</i><i class="q2-seal q2-s2">$</i>${face(pay.m,'q2-mfc')}<span><small>${NM[pay.m]} ${pay.pl>=0?'made':'lost'}</small><b class="${pay.pl>=0?'sq-u':'sq-d'}" data-v="${pay.pl}">${$f(pay.pl)}</b><em>${pay.up?'Long':'Short'} ${esc(co)}</em></span></div>
      <div class="q2-bills">${rest.map(x=>x.pl>=0?`<div class="q2-bill" style="--s:${(.7+.3*x.pl/Math.max(1,pay.pl)).toFixed(3)}"><i class="q2-seal">$</i>${face(x.m,'q2-bf')}<span>${NM[x.m]}</span><b data-v="${x.pl}">${k$(x.pl)}</b></div>`
          :`<div class="q2-iou">${face(x.m,'q2-bf')}<span>IOU · ${NM[x.m]}</span><b data-v="${x.pl}">${k$(x.pl)}</b></div>`).join('')}</div>
      <div class="q2-pod" aria-label="Season P&L after round ${n}: ${d.season.map(s=>s.rank+' '+NM[s.m]+' '+k$(s.v)).join(', ')}"><p class="q2-ph">Season P&amp;L after round ${n}</p>
        <ol style="--up:${(hp+LB).toFixed(1)}px;--dn:${(hn+LB).toFixed(1)}px">${d.season.map(step).join('')}<i class="q2-floor" aria-hidden="true"><span>$0</span></i></ol></div>
      <p class="q2-fine">P&amp;L on this call. Pretend $100,000 accounts, the whole balance on every call.</p></section>`;
    return [p1,p2,p3,p4]});
  /* panel 2 rolls by itself (muted) once three quarters of the film is on screen, from the calls, once; reduced motion: the poster */
  const p2=pg.querySelector('.sq-p2'),T=wireTv(d,p2),snd=p2.querySelector('.q2-snd');
  snd.addEventListener('click',()=>{const v=p2.querySelector('.sq-v');if(!v)return T.play(false);v.muted=!v.muted;snd.classList.toggle('q2-on',!v.muted);if(v.paused)v.play().catch(()=>{})});
  if(!RM()){const io=new IntersectionObserver(es=>{if(es[0].intersectionRatio>=.75){io.disconnect();T.play(true);T.tv.classList.add('q2-auto')}},{threshold:[.75]});io.observe(T.tv)}
  const p3=pg.querySelector('.sq-p3'),st=p3.querySelector('.q2-stage');stage(st,null,{on:()=>p3.classList.add('sq-go')});
  st.addEventListener('click',()=>{if(RM())return;p3.classList.remove('sq-go');void p3.offsetWidth;p3.classList.add('sq-go')});
  if(RM())p3.classList.add('sq-done','sq-go');
  const p4=pg.querySelector('.sq-p4');if(RM())p4.classList.add('sq-go');once(p4,.45,()=>{p4.classList.add('sq-go');p4.querySelectorAll('[data-v]').forEach((b,i)=>setTimeout(()=>count(b,+b.dataset.v,i?650:1100,i?k$:$f),i?400+i*90:150))});
  window.__sqBeats=[[1500,'calls'],[3300,'bell'],[4500,'hit'],[null,'end']];window.__sqDur=6000;
  H.classList.add('sq-ready')}catch(e){window.__sqErr=e;console.error('q2',e)}})();
