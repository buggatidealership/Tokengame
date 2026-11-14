/* T4 The Season 1 ticket: the round is the ticket you held for it. Stub (green over red, the round), the film in a die-cut window,
   the result printed on the reverse; punched where the market graded. Anime cel colour: flat fills, one hard shadow band, ink line.
   Desktop: one landscape ticket, film and result side by side (no turn needed). */
window.RHT={show(n,side,o={}){const R=RH,d=R.data(n,o.pend),I=R.IMG,desk=innerWidth>=1000;
 const art=d.film?R.film(d.film):o.world?`<div class="rh-film"><img src="${I}w-${o.world}.jpg" alt=""></div>`:`<div class="t4-lg"><img src="${d.logo}" alt=""></div>`;
 const stub=`<div class="t4-stub"><span class="t4-s1">Season 1</span><b class="t4-rn">${d.n}</b><span class="t4-s2">Round</span><span class="t4-no">No. ${R.pad(d.n)}</span></div>`;
 const face=`<div class="t4-face"><div class="t4-top"><span class="t4-co">${d.co} <small>${d.t}</small></span>
    ${d.pend?`<span class="t4-gb q"><small>Final grade</small><b>${d.res}</b></span>`:`<span class="t4-gb"><small>${d.ds}</small><b>${d.gr}</b></span>`}</div>
   <div class="t4-win">${art}</div>
   <div class="t4-bot"><span>Admit one · ${d.pend?'graded at the close':`${d.right} of ${d.total} right`}</span>${desk?'':`<button class="t4-turn">${d.pend?'See the calls':'See the result'} ↻</button>`}</div></div>`;
 const rows=(d.pend?d.filed:d.rows).map((r,i)=>`<li class="${r.win?'w':''}">${R.face(r.m)}<span class="t4-n">${R.NM[r.m]}${r.win?`<span class="t4-cr">${R.crown()}</span>`:''}</span><b class="${r.up?'up':'dn'}">${r.up?'+':'−'}${r.v}%</b>
   ${d.pend?'<span class="t4-hole e"></span>':`<span class="t4-pf ${r.ok?'p':'f'}"><i class="t4-hole"></i>${r.ok?'Pass':'Fail'}</span>`}</li>`).join('');
 const rev=`<div class="t4-rev"><div class="t4-rh"><b>${d.pend?'Locked in':'Graded at the close'}</b><span>${d.co} (${d.t})</span></div><ol>${rows}</ol>
   <div class="t4-mk ${d.pend?'q':d.up?'up':'dn'}"><small>${d.pend?'The close':'The market said'}</small><b>${d.pend?'?':d.out}</b></div>
   <div class="t4-ft"><p><small>Calls filed</small><b>${d.called}</b></p><p><small>${d.pend?'Final grade':'Graded on'}</small><b>${d.res}</b></p>${d.pend?'<span class="t4-lock">Locked</span>':`<span class="t4-seal"><img src="${I}m-seal.jpg" alt=""><i>${window.X2P_LOGO||''}</i></span>`}</div>
   ${desk?'':'<button class="t4-turn">↻ See the '+(d.film?'film':'ticket')+'</button>'}</div>`;
 const tk=desk?`<div class="t4-tk dk">${stub}${face}<div class="t4-perf"></div>${rev}</div>`:`<div class="t4-tk">${stub}${side==='back'?rev:face}</div>`;
 R.mount(`<div class="t4-dim"></div><div class="t4-stage ${desk?'dk':''}"><button class="t4-x rh-nav" aria-label="Close">${R.cross('#ffd23f')}</button>${tk}
   <div class="t4-nv"><button class="rh-nav" aria-label="Previous round">${R.arrow(-1,'#0fbf62')}</button><button class="rh-nav" aria-label="Next round">${R.arrow(1,'#ff3a31')}</button></div></div>`,'t4')}};
