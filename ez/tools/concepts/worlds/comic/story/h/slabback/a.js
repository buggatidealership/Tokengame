/* Take A, the grader's bench: the report card itself (painted), each AI's call a ticket slip stapled on in rank order, the market's
   PASS or FAIL struck across the slip's end, the close torn from the tape (the one loud element), date stamps, the painted seal. */
window.SB_a=function(g){const I=SB.I,rows=g.pend?g.filed:g.rows;
  const slip=(r,i)=>{RH.seed(g.n*31+i);const rot=((RH.rnd()-.5)*3.2).toFixed(2),dx=((RH.rnd()-.5)*3).toFixed(1);
    const st=g.pend?`<span class="sa-slot"><b>?</b><i>at the close</i></span>`:SB.stamp(r.ok?'Pass':'Fail',r.ok?SB.off(r.off):'wrong way',r.ok?'#0f7a3d':'#c8261e',g.n*7+i);
    return `<li class="sa-s ${r.win&&!g.pend?'sa-w':''} ${!g.pend&&!r.ok?'sa-x':''}" style="--rot:${rot}deg;--dx:${dx}cqw">${SB.staple()}
      ${g.pend?'':`<i class="sa-rk">${i+1}</i>`}${RH.face(r.m)}<span class="sa-nm">${RH.NM[r.m]}${r.win&&!g.pend?`<em>Winner</em><i class="sa-cr">${RH.crown()}</i>`:''}</span>
      <b class="sa-cl ${r.up?'up':'dn'}">${SB.sgn(r)}</b>${st}</li>`};
  const tape=g.pend?`<div class="sa-tape sa-q" style="clip-path:${SB.torn(g.n)}"><small>The close</small><b>?</b><small class="sa-on">${g.res}</small></div>`
    :`<div class="sa-tape ${g.up?'up':'dn'}" style="clip-path:${SB.torn(g.n)}"><small>The close</small><b>${SB.mv(g.a)}</b>${SB.why(g)?`<small class="sa-on">${SB.why(g)}</small>`:''}</div>`;
  return SB.mount(`<div class="sa-hd"><b>${g.pend?'Locked in':'Grading report'}</b><span>No. ${RH.pad(g.n)}</span></div>
    <ol class="sa-rows">${rows.map(slip).join('')}</ol>${tape}
    <div class="sa-ft"><span class="sa-dt"><small>Filed</small>${g.called}</span><span class="sa-dt ${g.pend?'sa-dq':''}"><small>${g.pend?'Grades':'Graded'}</small>${g.res}</span>
      ${g.pend?`<span class="sa-wax" aria-hidden="true"><i>Locked</i></span>`:`<span class="sa-seal" aria-hidden="true"><img src="media/cert-seal-t1.png" alt=""><i>${window.X2P_LOGO||''}</i></span>`}</div>
    <div class="sa-fl"><button type="button" class="sb-flip">See the film</button></div>`,'sb-a'+(g.pend?' sb-pd':''),g)};
