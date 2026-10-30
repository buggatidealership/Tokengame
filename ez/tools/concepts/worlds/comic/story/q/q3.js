/* Q3 · Bet slips and the tape. Every prediction is a printed slip from the Season 1 ticket stock, and the slips carry the story:
   1 the slips are dealt to the betting window, the lone bull's slip on the green side, the bears' three fanned like a hand on the
   red side; 2 the film from the moment the slips are up, with the market's answer printed on a strip of ticker tape under it and
   the clip's three marks (calls, close, crown) on its track; 3 the dial printed on the stock between the "called" and "graded"
   date stubs, then the slips under it: the right ones stamped PASS, the wrong one torn in half, the closest punched with the
   crown; 4 the cashier: the winning slip pays a dollar bill, the others' slips cashed or torn, the season as a race on a track. */
(function(){try{const {D,H,NM,face,logo,$f,k$,esc,cap,G,ticks,tv,wireTv,stage,count,once,mount,pct,col,RM}=SQ;
  const {d,pg}=mount(d=>{const {cs,bulls,bears,up,A,n,co}=d;
    const slip=(x,i,cls)=>`<div class="q3-slip${cls?' '+cls:''}${x.ok?' q3-ok':' q3-no'}${x.win?' q3-win':''}" style="--mc:${col(x.m)};--i:${i};--k:${cs.filter(y=>y.ok).indexOf(x)}">
        <span class="q3-stub">${face(x.m,'q3-sf')}<i>${NM[x.m]}</i></span>
        <span class="q3-body"><small>${x.up?'▲ Up':'▼ Down'} · ${esc(d.ticker)}</small><b class="${x.up?'sq-u':'sq-d'}">${x.s}</b></span>
</div>`;
    const slipG=(x,i)=>`<div class="q3-gw${x.ok?' q3-ok':' q3-no'}${x.win?' q3-win':''}" style="--i:${i};--k:${cs.filter(y=>y.ok).indexOf(x)}">${slip(x,i,'q3-g')}
        ${x.ok?`<i class="q3-stamp q3-pass">Pass</i>`:`<i class="q3-rip" aria-hidden="true"><b>RIIIP!</b></i><i class="q3-stamp q3-fail">Fail</i>`}${x.win?'<em class="q3-cr" aria-hidden="true">♛</em>':''}</div>`;
    /* ---- 1 · the betting window ---- */
    const p1=`<section class="wc11s-pn sq-p sq-p1 q3-p1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
      <p class="q3-hd">${logo(d.ticker,'q3-lg')}<b>${esc(co)}</b><em><i aria-hidden="true"></i>Locked ${d.called}</em></p>
      <div class="q3-win2"><div class="q3-side q3-su"><p class="q3-sl">▲ Bulls · ${bulls.length}</p><div class="q3-hand q3-h${bulls.length}">${bulls.map((x,i)=>slip(x,i)).join('')||'<p class="q3-none">Nobody</p>'}</div></div>
        <div class="q3-side q3-sd"><p class="q3-sl">▼ Bears · ${bears.length}</p><div class="q3-hand q3-h${bears.length}">${bears.map((x,i)=>slip(x,i)).join('')||'<p class="q3-none">Nobody</p>'}</div></div></div>
      <p class="wc-sr">${bulls.length} said up, ${bears.length} said down. ${cs.map(x=>NM[x.m]+(x.up?' up ':' down ')+x.v+'%').join('. ')}.</p></section>`;
    /* ---- 2 · the film and the tape ---- */
    const f=d.film,len=Math.min(10,20.06-f.t0),mk=t=>((t-f.t0)/len*100).toFixed(1);
    const p2=`<section class="wc11s-pn sq-p sq-p2 q3-p2" aria-label="Step 2">${cap(2,esc(co)+' reports. Then the close')}
      ${tv(d,{cls:'q3-tv'})}
      <div class="q3-track" aria-hidden="true"><i class="q3-head"></i><span style="left:0">Calls</span><span style="left:${mk(f.rev)}%">Close</span><span style="left:${mk(f.crown)}%">Crown</span><b>0:${String(Math.round(len)).padStart(2,'0')}</b></div>
      <p class="q3-tape ${up?'q3-tU':'q3-tD'}" aria-label="The close: ${esc(co)} ${up?'up':'down'} ${pct(A)}"><span aria-hidden="true">${esc(d.ticker)}</span><b aria-hidden="true">${up?'▲':'▼'} ${pct(A)}</b><small aria-hidden="true">Close · ${d.graded}</small><span aria-hidden="true">${esc(d.ticker)}</span><b aria-hidden="true">${up?'▲':'▼'} ${pct(A)}</b></p></section>`;
    /* ---- 3 · the dial on the stock, the slips graded ---- */
    const dl=G.spread(cs,13),best=d.best,gap=best?Math.abs(best.sv-A):0;
    const dmk=x=>{const [X,Y]=G.ptA(x.a,G.R+26);return `<span class="q3-mk${x.ok?' q3-ok':' q3-no'}" style="left:${(X/320*100).toFixed(2)}%;top:${(Y/190*100).toFixed(2)}%;--i:${dl.indexOf(x)}">${face(x.m,'q3-mf')}</span>`};
    const gA=best?(()=>{let a0=A,a1=best.sv;if(Math.abs(a1-a0)<.6){const m=(a0+a1)/2;a0=m-.3;a1=m+.3}return G.arc(Math.max(a0,a1),Math.min(a0,a1),G.R+13)})():'';
    const p3=`<section class="wc11s-pn sq-p sq-p3 q3-p3${up?' q3-U':' q3-D'}" aria-label="Step 3">${cap(3,'The market grades every call')}
      <div class="q3-stage" role="button" tabindex="0" aria-label="${esc(co)} ${up?'rose':'fell'} ${pct(A)} at the close. ${dl.map(x=>NM[x.m]+(x.ok?' right':' wrong')).join(', ')}.${best?' '+NM[best.m]+' was closest, '+(Math.round(gap*100)/100)+'% off.':''} Tap to play the grading again.">
        <div class="q3-card"><span class="q3-dt q3-dt1"><small>Called</small><b>${d.called}</b></span><span class="q3-dt q3-dt2"><small>Graded<span class="q3-dtl"> at the close</span></small><b>${d.graded}</b><svg class="q3-bell" viewBox="0 0 48 44" aria-hidden="true"><path d="M24 5c-8 0-12 6-12 13v8l-5 7h34l-5-7v-8c0-7-4-13-12-13Z"/><circle cx="24" cy="36.5" r="3.6"/></svg></span>
          <div class="q3-dial sq-dial"><svg viewBox="0 0 320 190" aria-hidden="true"><path class="q3-ol" d="${G.arc(G.MX,-G.MX,G.R)}"/><path class="q3-bd q3-bdu" d="${G.arc(G.MX,0,G.R)}"/><path class="q3-bd q3-bdd" d="${G.arc(0,-G.MX,G.R)}"/>${ticks()}
            <text class="q3-lb" x="${G.pt(6,G.R-46)[0].toFixed(1)}" y="${G.pt(6,G.R-46)[1].toFixed(1)}">Up</text><text class="q3-lb" x="${G.pt(-6,G.R-46)[0].toFixed(1)}" y="${G.pt(-6,G.R-46)[1].toFixed(1)}">Down</text></svg>
            <div class="q3-ly q3-lit" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q3-bd" d="${G.arc(up?G.MX:0,up?0:-G.MX,G.R)}"/></svg></div>
            <div class="q3-ly q3-dim" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="q3-bd" d="${G.arc(up?0:G.MX,up?-G.MX:0,G.R)}"/></svg></div>
            ${best?`<div class="q3-ly q3-ga" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="${gA}"/></svg></div>`:''}
            <div class="q3-ly q3-nd" style="--nd:${(-(G.ang(A)-90)).toFixed(2)}deg" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="M${G.cx-4.5} ${G.cy}L${G.cx} ${G.cy-G.R+14}L${G.cx+4.5} ${G.cy}Z"/><circle cx="${G.cx}" cy="${G.cy}" r="10"/><circle class="q3-hub" cx="${G.cx}" cy="${G.cy}" r="3.6"/></svg></div>
            ${dl.map(dmk).join('')}<span class="q3-rd" aria-hidden="true"><small>The close</small>${up?'▲ +':'▼ −'}${pct(A)}</span></div></div></div>
      <div class="q3-slips">${cs.map((x,i)=>slipG(x,i)).join('')}</div>
      <p class="q3-rule"><b>Right way:</b> stamped. <b>Wrong way:</b> torn. <b>Closest:</b> crowned${best?`, ${NM[best.m]} ${Math.round(gap*100)/100}% off`:''}.</p>
      <a class="q3-open" href="#/round/${n}">Open its graded card →</a></section>`;
    /* ---- 4 · the cashier ---- */
    const pay=d.pay,rest=cs.filter(x=>x!==pay).sort((a,b)=>b.pl-a.pl);
    const vals=d.season.map(s=>s.v),lo=Math.min(0,...vals),hi=Math.max(0,...vals),X=v=>((v-lo)/(hi-lo)*100).toFixed(2);
    const P=window.__x2pPnl().A;
    const p4=`<section class="wc11s-pn sq-p sq-p4 q3-p4" aria-label="Step 4">${cap(4,'The payout')}
      <div class="q3-cash"><div class="q3-paid" style="--mc:${col(pay.m)}"><span class="q3-stub">${face(pay.m,'q3-sf')}<i>${NM[pay.m]}</i></span>
          <span class="q3-pd"><small>${NM[pay.m]} ${pay.pl>=0?'made':'lost'}</small><b class="${pay.pl>=0?'sq-u':'sq-d'}" data-v="${pay.pl}">${$f(pay.pl)}</b><em>${pay.up?'Long':'Short'} ${esc(co)} · round ${n}</em></span><i class="q3-ps">Paid</i></div>
        <div class="q3-bill" aria-hidden="true"><i>$</i><b>${k$(pay.pl).replace(/^[+−]/,'')}</b><i>$</i></div></div>
      <ul class="q3-others">${rest.map(x=>`<li class="${x.pl>=0?'q3-oc':'q3-ot'}" style="--mc:${col(x.m)}"><span>${NM[x.m]}</span><b class="${x.pl>=0?'sq-u':'sq-d'}" data-v="${x.pl}">${k$(x.pl)}</b><i>${x.pl>=0?'Paid':'Torn'}</i></li>`).join('')}</ul>
      <div class="q3-race" aria-label="Season P&L after round ${n}: ${d.season.map(s=>s.rank+' '+NM[s.m]+' '+k$(s.v)).join(', ')}"><p class="q3-rh">The season race after round ${n} <span>P&amp;L</span></p>
        <div class="q3-lanes">${d.season.map((s,li)=>{const prev=s.v-(P[s.m].per[n]?P[s.m].per[n].v:0);return `<div class="q3-lane${s.rank===1?' q3-l1':''}"><b class="q3-lr">${s.rank}</b>
          <span class="q3-run"><i class="q3-z0" style="left:${X(0)}%">${li===d.season.length-1?'<span>$0</span>':''}</i><i class="q3-ghost" style="left:${X(prev)}%"></i><i class="q3-trail ${s.v>=prev?'q3-fw':'q3-bw'}" style="left:${Math.min(+X(prev),+X(s.v))}%;width:${Math.abs(X(s.v)-X(prev)).toFixed(2)}%"></i>
          <span class="q3-tok${+X(s.v)>55?' q3-tl':''}" style="left:${X(s.v)}%">${face(s.m,'q3-tf')}<b class="${s.v>=0?'sq-u':'sq-d'}">${k$(s.v)}</b></span></span>${s.mv?`<i class="q3-lm ${s.mv>0?'q3-up':'q3-dn'}">${s.mv>0?'▲':'▼'}${Math.abs(s.mv)}</i>`:'<i class="q3-lm"></i>'}</div>`}).join('')}</div>
        <p class="q3-key"><i class="q3-ghost"></i> before round ${n}</p></div>
      <p class="q3-fine">Pretend $100,000 accounts, the whole balance on every call.</p></section>`;
    return [p1,p2,p3,p4]});
  /* panel 2: the head runs along the track while the film plays */
  const p2=pg.querySelector('.sq-p2'),f=d.film,len=Math.min(10,20.06-f.t0),head=p2.querySelector('.q3-head');
  wireTv(d,p2,{time:t=>{head.style.left=Math.max(0,Math.min(100,(t-f.t0)/len*100))+'%';p2.classList.toggle('q3-rev',t>=f.rev)}});
  const p3=pg.querySelector('.sq-p3'),st=p3.querySelector('.q3-stage');stage(st,null,{on:()=>p3.classList.add('sq-go')});
  st.addEventListener('click',()=>{if(RM())return;p3.classList.remove('sq-go');void p3.offsetWidth;p3.classList.add('sq-go')});
  if(RM())p3.classList.add('sq-done','sq-go');
  const p4=pg.querySelector('.sq-p4');if(RM())p4.classList.add('sq-go');once(p4,.45,()=>{p4.classList.add('sq-go');p4.querySelectorAll('[data-v]').forEach((b,i)=>setTimeout(()=>count(b,+b.dataset.v,i?650:1100,i?k$:$f),i?400+i*90:150))});
  window.__sqBeats=[[1500,'calls'],[3300,'bell'],[4600,'hit'],[null,'end']];window.__sqDur=6000;
  H.classList.add('sq-ready')}catch(e){window.__sqErr=e;console.error('q3',e)}})();
