/* Take D, the page: the back of the card is one comic page. Four panels, one per founder (the cast), in rank order; each says its
   call in a balloon, and the market's verdict lands as a caption. The last tier is the close itself, the page's one loud beat. */
window.SB_d=function(g){const rows=g.pend?g.filed:g.rows,W=g.W.map(m=>RH.NM[m]);
  const pan=(r,i)=>{RH.seed(g.n*17+i);const rot=((RH.rnd()-.5)*1.6).toFixed(2);
    return `<li class="sd-p ${!g.pend&&r.win?'sd-w':''} ${!g.pend&&!r.ok?'sd-x':''}" style="--rot:${rot}deg;--mc:${RH.MC[r.m]}">
      <img class="sd-art" src="${SB.founder(r.m)}" alt="">${RH.ink(g.n*9+i,{w:3.2,w2:1})}
      <span class="sd-bl ${r.up?'up':'dn'}"><b>${SB.sgn(r)}</b><i class="sd-tl"></i></span>
      ${!g.pend&&r.win?`<i class="sd-cr">${RH.crown()}</i>`:''}${g.pend?'':`<i class="sd-rk">${i+1}</i>`}
      <span class="sd-cap"><b>${RH.NM[r.m]}</b>${g.pend?'<em>? at the close</em>':SB.stamp(r.ok?'Pass':'Fail',r.ok?SB.off(r.off):'wrong way',r.ok?'#0f7a3d':'#c8261e',g.n*3+i)}</span></li>`};
  const end=g.pend?`<div class="sd-end sd-q">${RH.burst(g.n,'#ffd23f','#fff0a6')}<span><small>The close</small><b>?</b></span><p>Graded at the close<br><strong>${g.res}</strong></p></div>`
    :`<div class="sd-end ${g.up?'up':'dn'}">${RH.burst(g.n,g.up?'#14b85c':'#ff3a31',g.up?'#7df0aa':'#ff9a8a')}<span><small>The close</small><b>${SB.mv(g.a)}</b></span>
       <p>${!W.length?(g.right?'Nobody wins':'All four went<br>the wrong way'):W.length>1?`Shared crown<br><strong>${W.join(' & ')}</strong>`:`Winner<br><strong>${W[0]}</strong>`}</p></div>`;
  return SB.mount(`<div class="sd-hd"><b>${g.pend?'Locked in':'The verdict'}</b><span>No. ${RH.pad(g.n)} · filed ${g.called}${g.pend?'':' · graded '+g.res}</span></div>
    <ol class="sd-g">${rows.map(pan).join('')}</ol>${end}<div class="sd-fl"><button type="button" class="sb-flip">See the film</button></div>`,'sb-d'+(g.pend?' sb-pd':''),g)};
