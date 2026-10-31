/* T1 The slab, for real: a painted acrylic holder (Hedra) around holo label stock, the film in the window;
   turned, the window holds a certificate on painted security paper, stamped by hand, sealed with a painted hologram. 3D first, comic ink. */
window.RHT={show(n,side,o={}){const R=RH,d=R.data(n,o.pend);const I=R.IMG;
 const lab=`<div class="t1-lab">${R.ink(11,{w:2.4,w2:.8})}<div class="t1-l"><span class="t1-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span>
   <span class="t1-nm"><b>${d.co}</b> <small>(${d.t})</small></span>
   <span class="t1-sub">${d.pend?`Locked ${d.called} · graded at the close`:`<b>${d.right} of ${d.total} right</b>${d.avg!=null?` · ${d.avg.toFixed(2)}% off on avg`:''}`}</span></div>
   <div class="t1-r"><span class="t1-no">#${d.n}</span>${d.pend?`<span class="t1-ds">Final grade</span><span class="t1-q">?</span>`:`<span class="t1-ds">${d.ds}</span><span class="t1-gr" data-g="${d.gr}">${d.gr}</span>`}</div></div>`;
 const world=o.world?`<div class="rh-film t1-world"><img src="${I}w-${o.world}.jpg" alt="${d.co}: its world, painted"></div>`:'';
 const front=d.film?R.film(d.film):world;
 const rows=d.rows.map((r,i)=>`<div class="t1-row ${r.win?'w':r.ok?'ok':'no'}"><i class="t1-rk">${i+1}</i>${R.face(r.m)}<span class="t1-n">${R.NM[r.m]}${r.win?`<span class="t1-cr">${R.crown()}</span>`:''}</span>
   <span class="t1-c ${r.up?'up':'dn'}">${r.up?'+':'−'}${r.v}%</span><b class="t1-st ${r.ok?'p':'f'}" style="--r:${(r.ok?-6:5)+i*2}deg">${r.ok?'Pass':'Fail'}</b></div>`).join('');
 const pend=d.filed.map(r=>`<div class="t1-row"><i class="t1-rk">·</i>${R.face(r.m)}<span class="t1-n">${R.NM[r.m]}</span><span class="t1-c ${r.up?'up':'dn'}">${r.up?'+':'−'}${r.v}%</span><b class="t1-st e">&nbsp;</b></div>`).join('');
 const cert=`<div class="t1-cert"><div class="t1-ch"><b>${d.pend?'Locked in!':'Graded!'}</b><span>No. ${R.pad(d.n)}</span></div><div class="t1-rows">${d.pend?pend:rows}</div>
   <div class="t1-mk ${d.pend?'q':d.up?'up':'dn'}">${R.ink(31,{w:2.6,w2:.9})}<small>The close</small><b>${d.pend?'?':d.out}</b></div></div>`;
 const foot=side==='front'&&(d.film||o.world)?`<div class="t1-ft"><span class="t1-wl">Winner</span><span class="t1-wn">${d.W.map(m=>R.face(m)+'<b>'+R.NM[m]+'</b>').join('')||'<b>Nobody</b>'}</span><button class="t1-turn">See the grade ↻</button></div>`
   :`<div class="t1-ft b"><p><small>Calls filed</small><b>${d.called}</b></p><p><small>${d.pend?'Final grade':'Graded on'}</small><b>${d.res}</b></p>
   ${d.pend?`<span class="t1-lock" style="--r:-9deg">Locked</span>`:`<span class="t1-seal"><img src="${I}m-seal.jpg" alt=""><i>${window.X2P_LOGO||''}</i></span>`}${d.film?'<button class="t1-turn">↻ See the film</button>':''}</div>`;
 const win=side==='front'&&(d.film||o.world)?front:cert;
 R.mount(`<div class="t1-dim"></div><div class="t1-stage"><button class="t1-x rh-nav" aria-label="Close">${R.cross('#ffd23f')}</button>
   <div class="t1-slab"><div class="t1-in">${lab}<div class="t1-win ${side}">${win}${R.ink(5,{w:3,w2:1})}</div>${foot}</div></div>
   <div class="t1-nv"><button class="rh-nav" aria-label="Previous round">${R.arrow(-1)}</button><button class="rh-nav" aria-label="Next round">${R.arrow(1)}</button></div></div>`,'t1')}};
