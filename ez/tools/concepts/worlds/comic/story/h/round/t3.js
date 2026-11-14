/* T3 Case file: noir. The round is a case. Front = the folder, the film a glossy print clipped to it, the grade stamped in red.
   Turned = the verdict sheet typed on onion skin, each call stamped, the winner ringed in red pencil, sealed with a gold seal. Ink, rain-light, one gold spot. */
window.RHT={show(n,side,o={}){const R=RH,d=R.data(n,o.pend);const I=R.IMG;
 const clipSvg=`<svg class="t3-clip" viewBox="0 0 30 80" aria-hidden="true"><path d="M9 74 L9 14 C9 6 21 6 21 14 L21 62 C21 67 14 67 14 62 L14 20" fill="none" stroke="#0d0b10" stroke-width="5" stroke-linecap="round"/><path d="M9 74 L9 14 C9 6 21 6 21 14 L21 62 C21 67 14 67 14 62 L14 20" fill="none" stroke="#c9c4b4" stroke-width="2.6" stroke-linecap="round"/><path d="M10.5 30 L10.5 15" stroke="#fff" stroke-width="1" opacity=".8"/></svg>`;
 const print=d.film?R.film(d.film,'t3-ph'):o.world?`<div class="rh-film t3-ph"><img src="${I}w-${o.world}.jpg" alt=""></div>`:`<div class="t3-ph t3-lg"><img src="${d.logo}" alt=""></div>`;
 const front=`<div class="t3-fold">
   <div class="t3-tab"><span>Case No. ${R.pad(d.n)}</span></div>
   <div class="t3-head"><span class="t3-lbl"><small>Subject</small><b>${d.co} (${d.t})</b></span><span class="t3-lbl"><small>Opened</small><b>${d.called}</b></span></div>
   <div class="t3-print" style="--r:-2.2deg">${print}${clipSvg}</div>
   ${d.pend?`<div class="t3-tape"><span>Sealed until the close · ${d.res}</span></div>`:`<div class="t3-stamp" style="--r:-11deg"><small>Graded</small><b>${d.ds} ${d.gr}</b></div>`}
   <p class="t3-note">${d.pend?'Four statements on file. The market answers at the close.':`${d.right} of ${d.total} called the direction.`}</p></div>`;
 const lines=(d.pend?d.filed:d.rows).map((r,i)=>`<li class="${r.win?'w':''}"><span class="t3-i">${d.pend?'·':i+1+'.'}</span>${R.face(r.m)}<span class="t3-who">${R.NM[r.m]}${r.win?'<svg class="t3-ring" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M8 22 C6 8 40 3 62 5 C86 7 97 14 94 24 C90 36 52 38 28 35 C10 33 3 26 10 16 C16 9 30 6 44 6" fill="none" stroke="#c0261d" stroke-width="2.4" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg>':''}</span><span class="t3-dots"></span><span class="t3-said ${r.up?'up':'dn'}">${r.up?'up':'down'} ${r.v}%</span>
   ${d.pend?'<span class="t3-blank"></span>':`<span class="t3-sf ${r.ok?'p':'f'}" style="--r:${r.ok?-5:7}deg">${r.ok?'Pass':'Fail'}</span>`}</li>`).join('');
 const back=`<div class="t3-sheet">
   <div class="t3-sh"><b>${d.pend?'Statements':'Verdict'}</b><span>Case No. ${R.pad(d.n)} · ${d.co} (${d.t})</span></div>
   <p class="t3-q">${d.pend?'Before the report, they said:':'Before the report, they said. At the close, the market ruled.'}</p>
   <ol>${lines}</ol>
   <div class="t3-close ${d.pend?'q':d.up?'up':'dn'}"><small>The close, ${d.res}</small><b>${d.pend?'pending':d.out}</b></div>
   ${d.pend?'':`<p class="t3-ruling">${d.W.length?`Closest: ${d.W.map(m=>R.NM[m]).join(' and ')}, ${d.rows.find(r=>r.win).off.toFixed(2)}% off.`:'Nobody called the direction.'}</p>`}
   <div class="t3-ft"><span>Filed ${d.called}</span><span>${d.pend?'Final grade':'Graded'} ${d.res}</span>${d.pend?'':`<span class="t3-seal"><img src="${I}m-seal.jpg" alt=""><i>${window.X2P_LOGO||''}</i></span>`}</div></div>`;
 R.mount(`<div class="t3-dim"></div><div class="t3-stage"><button class="t3-x rh-nav" aria-label="Close">${R.cross('#e9e2cf','#0d0b10')}</button>
   ${side==='back'?back:front}
   <div class="t3-nv"><button class="rh-nav" aria-label="Previous case">${R.arrow(-1,'#e9e2cf')}</button><button class="t3-turn">${side==='back'?'Back to the evidence':d.pend?'Read the statements':'Read the verdict'}</button><button class="rh-nav" aria-label="Next case">${R.arrow(1,'#e9e2cf')}</button></div></div>`,'t3')}};
