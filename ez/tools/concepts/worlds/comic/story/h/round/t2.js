/* T2 The issue: the round is a comic book. Front = its cover (the film is the cover art, the round number the masthead, the grade in the corner box).
   Turning it = opening the issue: one page of four panels, in reading order: they predicted, the bell, the market grades, the winner gets paid. Pop art. */
window.RHT={show(n,side,o={}){const R=RH,d=R.data(n,o.pend);const I=R.IMG,desk=innerWidth>=1000;
 const art=d.film?R.film(d.film,'t2-art'):o.world?`<div class="rh-film t2-art"><img src="${I}w-${o.world}.jpg" alt=""></div>`:`<div class="t2-art t2-logo"><img src="${d.logo}" alt=""></div>`;
 const cover=`<article class="t2-cov">
   <div class="t2-mast"><span class="t2-ez"><b class="s">$</b><b class="e">E</b><b class="z">Z</b><i>Season 1</i></span><div class="t2-rd"><small>Round</small>${d.n}</div>
     <span class="t2-box">${R.ink(3,{w:2.4,w2:.8})}${d.pend?'<small>Graded at</small><b>the close</b>':`<small>${d.ds}</small><b>${d.gr}</b>`}</span></div>
   <div class="t2-artw">${art}${R.ink(8,{w:3.4,w2:1.1})}
     <span class="t2-co">${d.co} <small>(${d.t})</small></span>
     ${d.pend?`<span class="t2-snipe">${R.burst(4,'#ff3a31','#ff6a5a',12)}<b>Locked ${d.called}!</b></span>`:`<span class="t2-snipe">${R.burst(4,d.up?'#0fbf62':'#ff3a31',d.up?'#46d987':'#ff6a5a',12)}<b>${d.right} of ${d.total}<br>right!</b></span>`}</div>
   <div class="t2-strip"><span>Calls filed ${d.called}</span><span>${d.pend?'Final grade':'Graded'} ${d.res}</span></div></article>`;
 const say=d.filed.map((r,i)=>`<div class="t2-say ${i%2?'r':'l'}">${R.face(r.m)}<span class="t2-bl">${R.NM[r.m]}: <b class="${r.up?'up':'dn'}">${r.up?'up':'down'} ${r.v}%</b></span></div>`).join('');
 const ranked=(d.pend?d.filed:d.rows).map((r,i)=>`<li class="${d.pend?'':r.win?'w':r.ok?'ok':'no'}">${R.face(r.m)}<span>${R.NM[r.m]}</span><b class="${r.up?'up':'dn'}">${r.up?'+':'−'}${r.v}%</b>${d.pend?'<em class="q">?</em>':`<em class="${r.ok?'p':'f'}" style="--r:${r.ok?-7:6}deg">${r.ok?'Pass!':'Fail!'}</em>`}</li>`).join('');
 const W=d.rows.filter(r=>r.win);
 const page=`<article class="t2-pg">
   <section class="t2-p p1"><p class="t2-cap">1 · Before the report, they predicted</p>${say}</section>
   <section class="t2-p p2"><p class="t2-cap">2 · The bell. ${d.co} closes</p><div class="t2-bang">${R.burst(9,d.pend?'#ffd23f':d.up?'#0fbf62':'#ff3a31',d.pend?'#fff3a6':d.up?'#7be8ac':'#ff8a7d',16)}<b>${d.pend?'?':d.out}</b></div></section>
   <section class="t2-p p3"><p class="t2-cap">3 · The market grades every call</p><ol>${ranked}</ol></section>
   <section class="t2-p p4"><p class="t2-cap">4 · ${d.pend?'Who wins? At the close':W.length>1?'Shared crown':W.length?'The closest wins':'Nobody called it'}</p>
     ${d.pend?`<div class="t2-wait">Graded ${d.res}</div>`:W.length?W.map(r=>`<div class="t2-champ"><span class="t2-crn">${R.crown()}</span>${R.face(r.m)}<b>${R.NM[r.m]}</b><small>${r.off.toFixed(2)}% off · ${R.usd(r.pnl)} on the round</small></div>`).join(''):`<div class="t2-wait">Nobody</div>`}</section>
 </article>`;
 const body=desk?`<div class="t2-spread">${cover}${page}</div>`:side==='back'?page:cover;
 R.mount(`<div class="t2-dim"></div><div class="t2-stage ${desk?'dk':''}"><button class="t2-x rh-nav" aria-label="Close">${R.cross('#ff3a31')}</button>${body}
   <div class="t2-nv"><button class="rh-nav" aria-label="Previous issue">${R.arrow(-1,'#ff3a31')}</button>${desk?'':`<button class="t2-open">${side==='back'?'Close the issue':'Open the issue'}</button>`}<button class="rh-nav" aria-label="Next issue">${R.arrow(1,'#ff3a31')}</button></div></div>`,'t2')}};
