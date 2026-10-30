/* Q1 · Fight card. The round as one bout: 1 the ring (one bull alone in the green corner against a tag team of three bears),
   2 the arena screen from the moment the calls are up, the close stamped on its corner, 3 the scorecards graded beat by beat
   (calls land on the dial, the bell rings and the needle swings, then the hit), 4 the purse paid as a dollar bill and the
   season as a race of signed bars. */
(function(){try{const {D,H,NM,face,logo,$f,k$,esc,cap,G,ticks,tv,wireTv,stage,count,once,mount,pct}=SQ;
  const {d,pg}=mount(d=>{const {cs,bulls,bears,up,A,n,co}=d;
    /* ---- 1 · the ring ---- */
    const solo=x=>`<div class="q1-f q1-f-solo">${face(x.m,'q1-fc q1-fc-xl')}<span class="q1-nm">${NM[x.m]}</span><b class="q1-cl">${x.s}</b></div>`;
    const team=x=>`<div class="q1-f">${face(x.m,'q1-fc')}<span class="q1-nm">${NM[x.m]}</span><b class="q1-cl">${x.s}</b></div>`;
    const side=(list,k)=>list.length===1?solo(list[0]):list.map(team).join('');
    const p1=`<section class="wc11s-pn sq-p sq-p1 q1-p1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
      <p class="q1-bug"><span class="q1-rn">R${n}</span>${logo(d.ticker,'q1-lg')}<b>${esc(co)}</b><em>Locked ${d.called}</em></p>
      <div class="q1-ring"><i class="q1-rope" aria-hidden="true"></i><i class="q1-rope q1-rope2" aria-hidden="true"></i>
        <div class="q1-cn q1-cu${bulls.length===1?' q1-one':''}"><p class="q1-ch">▲ Bulls</p>${side(bulls)}</div>
        <div class="q1-cn q1-cd${bears.length===1?' q1-one':''}"><p class="q1-ch">Bears ▼</p>${side(bears)}</div>
        <span class="q1-vs" aria-hidden="true"><b>${bulls.length}</b><i>vs</i><b>${bears.length}</b></span></div>
      <p class="wc-sr">${bulls.length} said up, ${bears.length} said down. ${cs.map(x=>NM[x.m]+(x.up?' up ':' down ')+x.v+'%').join('. ')}.</p></section>`;
    /* ---- 2 · the arena screen ---- */
    const p2=`<section class="wc11s-pn sq-p sq-p2 q1-p2" aria-label="Step 2">${cap(2,esc(co)+' reports. Then the close')}
      ${tv(d,{tag:`<span class="q1-tag" aria-hidden="true">▶ 0:${String(Math.round(Math.min(10,20.06-d.film.t0))).padStart(2,'0')}<span class="q1-tg2"> · from the calls</span></span>`,
        mark:`<span class="q1-pow ${up?'q1-powU':'q1-powD'}" aria-label="The close: ${up?'up':'down'} ${pct(A)}"><svg viewBox="0 0 120 84" aria-hidden="true"><path d="M60 2 70 20 92 8 88 30 118 30 96 46 114 64 88 62 90 82 68 68 56 82 48 64 24 78 30 56 4 56 24 40 6 22 32 26 30 4 48 20Z"/></svg><span><small>The close</small><b>${up?'▲':'▼'} ${up?'+':'−'}${pct(A)}</b></span></span>`})}</section>`;
    /* ---- 3 · the scorecards ---- */
    const dl=G.spread(cs,14),best=d.best,gap=best?Math.abs(best.sv-A):0;
    const mk=x=>{const [X,Y]=G.ptA(x.a,G.R+31);return `<span class="q1-mk${x.ok?' q1-ok':' q1-no'}${x===dl.find(y=>y.m===(best&&best.m))?' q1-best':''}" style="left:${(X/320*100).toFixed(2)}%;top:${(Y/190*100).toFixed(2)}%;--i:${dl.indexOf(x)}">${face(x.m,'q1-mf')}${best&&x.m===best.m?'<em class="q1-cr" aria-hidden="true">♛</em>':''}</span>`};
    const gA=best?(()=>{let a0=A,a1=best.sv;if(Math.abs(a1-a0)<.6){const m=(a0+a1)/2;a0=m-.3;a1=m+.3}return G.arc(Math.max(a0,a1),Math.min(a0,a1),G.R+14)})():'';
    const card=(x)=>`<div class="q1-c${x.ok?' q1-cok':' q1-cno'}${x.win?' q1-cwin':''}" style="--mc:${SQ.col(x.m)};--i:${[...cs].filter(y=>y.ok).indexOf(x)}">${x.win?'<em class="q1-ccr" aria-hidden="true">♛</em>':''}
        ${face(x.m,'q1-cf')}<span class="q1-cn2">${NM[x.m]}</span><b class="q1-cc">${x.s}</b>
        <i class="q1-st ${x.ok?'q1-pass':'q1-fail'}">${x.ok?'Pass':'Fail'}</i>${x.win&&best?`<small class="q1-off">${Math.round(gap*100)/100}% off</small>`:''}</div>`;
    const lose=up?'d':'u',loseList=up?bears:bulls;
    const p3=`<section class="wc11s-pn sq-p sq-p3 q1-p3${up?' q1-U':' q1-D'}" aria-label="Step 3">${cap(3,'The market grades every call')}
      <ol class="q1-beats" aria-hidden="true"><li><b>1</b>Calls</li><li><b>2</b>The bell</li><li><b>3</b>Graded</li></ol>
      <div class="q1-stage" role="button" tabindex="0" aria-label="${esc(co)} ${up?'rose':'fell'} ${pct(A)} at the close. ${dl.map(x=>NM[x.m]+(x.ok?' right':' wrong')).join(', ')}.${best?' '+NM[best.m]+' was closest, '+(Math.round(gap*100)/100)+'% off.':''} Tap to play the grading again.">
        <span class="q1-co" aria-hidden="true">${logo(d.ticker,'q1-colg')}<b>${esc(d.ticker)}</b></span>
        <span class="q1-bell" aria-hidden="true"><svg viewBox="0 0 48 44"><path class="q1-bl" d="M24 5c-8 0-12 6-12 13v8l-5 7h34l-5-7v-8c0-7-4-13-12-13Z"/><circle class="q1-bc" cx="24" cy="36.5" r="3.6"/><rect class="q1-bh" x="21.5" y="1" width="5" height="5" rx="1.5"/></svg><i class="q1-rg q1-rg1"></i><i class="q1-rg q1-rg2"></i><small>${d.graded}</small></span>
        <div class="q1-dial sq-dial">
          <svg viewBox="0 0 320 190" aria-hidden="true"><path class="q1-pl" d="M${G.cx-G.R+11} ${G.cy}A${G.R-11} ${G.R-11} 0 0 1 ${G.cx+G.R-11} ${G.cy}Z"/>
            <path class="q1-bd q1-bu" d="${G.arc(G.MX,0,G.R)}"/><path class="q1-bd q1-bdn" d="${G.arc(0,-G.MX,G.R)}"/>${ticks()}
            <text class="q1-lb" x="${G.pt(6.5,G.R-52)[0].toFixed(1)}" y="${G.pt(6.5,G.R-52)[1].toFixed(1)}">▲ Up</text><text class="q1-lb" x="${G.pt(-6.5,G.R-52)[0].toFixed(1)}" y="${G.pt(-6.5,G.R-52)[1].toFixed(1)}">Down ▼</text>
            ${dl.map(x=>{const [a,b]=G.pt(x.sv,G.R+11),[c,e]=G.pt(x.sv,G.R+21);return `<path class="q1-ct" style="--i:${dl.indexOf(x)}" d="M${a.toFixed(1)} ${b.toFixed(1)}L${c.toFixed(1)} ${e.toFixed(1)}"/>`}).join('')}</svg>
          <div class="q1-ly q1-dim" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q1-bd" d="${G.arc(up?0:G.MX,up?-G.MX:0,G.R)}"/></svg></div>
          <div class="q1-ly q1-lit" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q1-bd" d="${G.arc(up?G.MX:0,up?0:-G.MX,G.R)}"/></svg></div>
          ${best?`<div class="q1-ly q1-ga" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="${gA}"/></svg></div>`:''}
          <div class="q1-ly q1-nd" style="--nd:${(-(G.ang(A)-90)).toFixed(2)}deg" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="M${G.cx-5} ${G.cy}L${G.cx} ${G.cy-G.R+16}L${G.cx+5} ${G.cy}Z"/><circle cx="${G.cx}" cy="${G.cy}" r="11"/><circle class="q1-hub" cx="${G.cx}" cy="${G.cy}" r="4"/></svg></div>
          ${dl.map(mk).join('')}
          <span class="q1-rd" aria-hidden="true"><small>The close</small><b>${up?'▲ +':'▼ −'}${pct(A)}</b></span></div></div>
      <div class="q1-cards"><div class="q1-tray q1-tu${lose==='u'?' q1-lose':''}">${bulls.map(card).join('')||'<p class="q1-none">Nobody</p>'}${lose==='u'&&loseList.length?'<span class="q1-slap" aria-hidden="true"><b>THWACK!</b></span>':''}</div>
        <div class="q1-tray q1-td${lose==='d'?' q1-lose':''}">${bears.map(card).join('')||'<p class="q1-none">Nobody</p>'}${lose==='d'&&loseList.length?'<span class="q1-slap" aria-hidden="true"><b>THWACK!</b></span>':''}</div></div>
      <p class="q1-rule">Right side passes. Closest pass wins the round.</p>
      <a class="q1-open" href="#/round/${n}">Open its graded card →</a></section>`;
    /* ---- 4 · the purse ---- */
    const pay=d.pay,rest=cs.filter(x=>x!==pay);
    const vals=d.season.map(s=>s.v),lo=Math.min(0,...vals),hi=Math.max(0,...vals),z=(-lo)/(hi-lo);
    const bar=s=>{const w=Math.abs(s.v)/(hi-lo);return `<i class="q1-bar ${s.v>=0?'q1-bp':'q1-bn'}" style="left:${((s.v>=0?z:z-w)*100).toFixed(2)}%;width:${(w*100).toFixed(2)}%"></i>`};
    const p4=`<section class="wc11s-pn sq-p sq-p4 q1-p4" aria-label="Step 4">${cap(4,'The payout')}
      <div class="q1-bill"><i class="q1-ros q1-ros1"></i><i class="q1-ros q1-ros2"></i><i class="q1-ros q1-ros3"></i><i class="q1-ros q1-ros4"></i>
        <div class="q1-por">${face(pay.m,'q1-pf')}<span>${NM[pay.m]}</span></div>
        <div class="q1-den"><p class="q1-made">${NM[pay.m]} ${pay.pl>=0?'made':'lost'}</p><b class="q1-big ${pay.pl>=0?'sq-u':'sq-d'}" data-v="${pay.pl}">${$f(pay.pl)}</b>
          <p class="q1-on">${pay.up?'Long':'Short'} ${esc(co)}, round ${n}</p></div>
        <p class="q1-trust">In the market we trust</p></div>
      <ul class="q1-rest">${rest.map(x=>`<li>${face(x.m,'q1-rf')}<span>${NM[x.m]}</span><b class="${x.pl>=0?'sq-u':'sq-d'}" data-v="${x.pl}">${k$(x.pl)}</b></li>`).join('')}</ul>
      <div class="q1-race" aria-label="Season P&L after round ${n}: ${d.season.map(s=>s.rank+' '+NM[s.m]+' '+k$(s.v)).join(', ')}"><p class="q1-rh">Season P&amp;L after round ${n}</p>
        <ol>${d.season.map(s=>`<li class="${s.rank===1?'q1-gold':''}"><b class="q1-rk">${s.rank}</b>${face(s.m,'q1-sf')}<span class="q1-sn">${NM[s.m]}</span>
          <span class="q1-tr"><i class="q1-z" style="left:${(z*100).toFixed(2)}%"></i>${bar(s)}</span><b class="q1-sv ${s.v>=0?'sq-u':'sq-d'}">${k$(s.v)}</b>
          <i class="q1-mv ${s.mv>0?'q1-up':s.mv<0?'q1-dn':''}">${s.mv>0?'▲'+s.mv:s.mv<0?'▼'+(-s.mv):''}</i></li>`).join('')}</ol></div>
      <p class="q1-fine">Pretend $100,000 accounts, the whole balance on every call.</p></section>`;
    return [p1,p2,p3,p4]});
  /* wiring */
  wireTv(d,pg.querySelector('.sq-p2'));
  const p3=pg.querySelector('.sq-p3');stage(p3.querySelector('.q1-stage'),null,{on:()=>p3.classList.add('sq-go')});
  /* the replay restarts the whole panel's timeline */
  p3.querySelector('.q1-stage').addEventListener('click',()=>{if(SQ.RM())return;p3.classList.remove('sq-go');void p3.offsetWidth;p3.classList.add('sq-go')});
  if(SQ.RM())p3.classList.add('sq-done','sq-go');
  const p4=pg.querySelector('.sq-p4');if(SQ.RM())p4.classList.add('sq-go','sq-done');once(p4,.45,()=>{p4.classList.add('sq-go');p4.querySelectorAll('[data-v]').forEach((b,i)=>setTimeout(()=>count(b,+b.dataset.v,i?700:1100,i?k$:$f),i?500+i*90:150))});
  window.__sqBeats=[[1500,'calls'],[3300,'bell'],[4500,'hit'],[null,'end']];window.__sqDur=6000;
  H.classList.add('sq-ready')}catch(e){window.__sqErr=e;console.error('q1',e)}})();
