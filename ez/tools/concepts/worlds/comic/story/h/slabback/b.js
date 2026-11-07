/* Take B, the judges' scorecard: fight night. The round is a bout; the four founders (the cast) are the fighters, each with what it
   called and how far off it landed, PASS or FAIL struck by the market; the bell (the close) and the decision sash close the card. */
window.SB_b=function(g){const rows=g.pend?g.filed:g.rows,W=g.W.map(m=>RH.NM[m]);
  const row=(r,i)=>`<li class="sbb-r ${!g.pend&&r.win?'sbb-w':''} ${!g.pend&&!r.ok?'sbb-x':''}"><i class="sbb-rk">${g.pend?'':i+1}</i>
      <span class="sbb-ph" style="--mc:${RH.MC[r.m]}"><img src="${SB.founder(r.m)}" alt=""></span>
      <span class="sbb-nm">${RH.NM[r.m]}${!g.pend&&r.win?`<i class="sbb-cr">${RH.crown()}</i>`:''}</span>
      <b class="sbb-cl ${r.up?'up':'dn'}">${SB.sgn(r)}</b>
      <span class="sbb-of">${g.pend?'·':r.ok?r.off.toFixed(2).replace(/\.?0+$/,'')+'%':'wrong way'}</span>
      <span class="sbb-v">${g.pend?'<i class="sbb-q">?</i>':SB.stamp(r.ok?'Pass':'Fail','',r.ok?'#0f7a3d':'#c8261e',g.n*5+i)}</span></li>`;
  const dec=g.pend?`<div class="sbb-dec sbb-dq"><small>Fight night</small><b>Bell at the close</b><small>${g.res}</small></div>`
    :!W.length?`<div class="sbb-dec sbb-nc"><small>Decision</small><b>No contest</b><small>${g.right?'nobody close enough':'all four went the wrong way'}</small></div>`
    :`<div class="sbb-dec"><small>${W.length>1?'Split decision':'Winner'}</small><b>${W.join(' & ')}</b>${RH.crown()}</div>`;
  return SB.mount(`<div class="sbb-top"><b>Judges' scorecard</b><span>Bout ${RH.pad(g.n)}</span></div>
    <div class="sbb-card"><div class="sbb-hd"><span>Fighter</span><span>Called</span><span>Off</span><span>Verdict</span></div>
    <ol class="sbb-rows">${rows.map(row).join('')}</ol>
    <div class="sbb-bell ${g.pend?'':g.up?'up':'dn'}"><svg class="sbb-bl" viewBox="0 0 40 40" aria-hidden="true"><path d="M8 29 C9 18 11 9 20 8 C29 9 31 18 32 29 Z" fill="#ffcf33" stroke="#16131a" stroke-width="2.6" stroke-linejoin="round"/><path d="M12 25 C13 17 15 12 20 11.5" stroke="#fff6c8" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M5 30 L35 30" stroke="#16131a" stroke-width="3.4" stroke-linecap="round"/><circle cx="20" cy="33.5" r="3" fill="#16131a"/><path d="M20 3 L20 8" stroke="#16131a" stroke-width="2.6"/></svg><small>The bell</small><b>${g.pend?'?':SB.mv(g.a)}</b>
      <span class="sbb-dt"><small>Filed</small>${g.called}<small>${g.pend?'Grades':'Graded'}</small>${g.res}</span></div></div>
    ${dec}<div class="sbb-fl"><button type="button" class="sb-flip">See the film</button></div>`,'sb-b'+(g.pend?' sb-pd':''),g)};
