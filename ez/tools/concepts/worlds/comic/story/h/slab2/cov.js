/* Take D, the cover: the back reads as the round's own comic cover. Masthead with the round, the close in the price box,
   the star of the issue as the cover art (the winner crowned; both on a shared crown; all four when nobody won or while pending),
   his call lettered into his painted balloon, a cover line, and the rest of the cast in a co-starring strip. Pop art finish. */
window.SB_cov=function(g){const rows=S2.rows(g),fin='pop';
  const star=g.pend||!g.W.length?rows:rows.filter(r=>r.win),rest=rows.filter(r=>!star.includes(r));
  const big=(r,i)=>{const k=S2.key(fin,r,g),s=S2.state(r,g);return `<div class="cv-a s2-${s}" style="--mc:${RH.MC[r.m]}"><div class="cv-sq"><img src="${S2.I}${k}.jpg" alt="${RH.NM[r.m]}: ${s}">${S2.balloon(k,r)}</div>${RH.ink(g.n*5+i,{w:3.6,w2:1.1})}
     ${star.length>1?`<span class="cv-tag">${S2.wob(g.n*13+i,'#fff3c4','#f1d98a',{w:2.4})}<b>${RH.NM[r.m]}</b>${g.pend?'':`<small class="${r.ok?'ok':'no'}">${r.ok?'Pass':'Fail'}</small>`}</span>`:''}</div>`};
  const sm=(r,i)=>{const k=S2.key(fin,r,g),s=S2.state(r,g);return `<li class="cv-s s2-${s}" style="--mc:${RH.MC[r.m]}"><img src="${S2.I}${k}.jpg" alt="${RH.NM[r.m]}: ${s}">${RH.ink(g.n*3+i,{w:2.6,w2:.8})}
     <span class="cv-st">${S2.wob(g.n*17+i,'#fff3c4','#f1d98a',{w:2.2})}<b>${RH.NM[r.m]} <i class="${r.up?'up':'dn'}">${SB.sgn(r)}</i></b><small class="${r.ok?'ok':'no'}">${r.ok?'Pass · '+SB.off(r.off):'Fail · wrong way'}</small></span></li>`};
  const W=g.W.map(m=>RH.NM[m]);const LNf=c=>`<span class="${c}">${S2.wob(g.n*19,'#ffd23f','#e9a91c',{w:3})}<b>${line[0]}</b><small>${line[1]}</small></span>`;
  const LN=c=>LNf(c);const line=g.pend?['Who calls it?',`Graded at the close ${g.res}`]:!W.length?['They all went the wrong way!','Nobody wins this round']:W.length>1?[`${W.join(' & ')} share the crown!`,'Tied on the closest call']:[`${W[0]} calls it!`,`Closest of the four · ${SB.off(rows[0].off)}`];
  return SB.mount(`<div class="cv-m">${S2.wob(g.n*7,'#ff3a31','#b51d18',{w:3.6})}<span class="cv-t"><small>Earnings Zeason · Season 1</small><b>Round <i class="cv-no">${g.n}</i></b><em>${g.co} (${g.t}) · filed ${g.called}</em></span>
     <span class="cv-px">${S2.wob(g.n*11,g.pend?'#ffd23f':g.up?'#14b85c':'#ff3a31',g.pend?'#e9a91c':g.up?'#0b7d3c':'#b51d18',{w:3})}<small>The close</small><b>${g.pend?'?':SB.mv(g.a)}</b><i>${g.res}</i></span></div>
   ${star.length>1?LN('cv-line cv-top'):''}<div class="cv-art cv-n${star.length}">${star.map(big).join('')}${star.length===1?LN('cv-line'):''}</div>
   ${rest.length?`<ol class="cv-strip k${rest.length}"><li class="cv-co"><b>Also in this issue</b></li>${rest.map(sm).join('')}</ol>`:''}
   <div class="sd-fl cv-fl"><button type="button" class="sb-flip">See the film</button></div>`,'cv'+(g.pend?' sb-pd':''),g)};
