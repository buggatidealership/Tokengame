/* take C: text first, a small picture beside. Each step a row: the numbered sentence big, then one line of this round's own fact in the
   sentence's words (computed), the painting at the side as its proof. One row under the other at every width; desktop: the same rows, wider. */
R3start(function(R3){const {D,b2,KEYS,FR,facts,NM,esc,mk,sayHTML,EX}=R3;b2.classList.add('r3-C');b2.querySelector('.t4-frs').classList.add('r3');
const nm=m=>NM[m]||m,list=a=>a.length>1?a.slice(0,-1).join(', ')+' and '+a[a.length-1]:a[0]||'';
const bare=(window.__R3W||'bare')!=='win',W=facts.close.win,cv=facts.close;
const F={
 call:`<b>${esc(EX.co)}, round ${EX.n}:</b> `+facts.call.map(c=>`<span class="r3-nw">${mk(c.m)}${nm(c.m)} <span class="${c.up?'up':'dn'}">${c.side}</span></span>`).join(', ')+'.',
 close:`<b>${esc(cv.co)} closed <span class="${cv.up?'up':'dn'}">${cv.mv}</span>.</b>`+(bare?'':' '+(W.length===1?`<span class="r3-nw">${mk(W[0])}${nm(W[0])} wins:</span> the closest call.`:W.length?'A tie.':'Nobody won.')),
 ledger:`<b>Round ${facts.ledger.n}</b> · ${esc(facts.ledger.co)} <span class="${facts.ledger.up?'up':'dn'}">${facts.ledger.mv}</span> · <span class="gd">Winner</span> `+(W.length?W.map(m=>`<span class="r3-nw">${mk(m)}${nm(m)}</span>`).join(' and '):'Nobody')+'.',
 board:`<b>Ranked by P&amp;L:</b> `+facts.board.map((m,i)=>`<span class="r3-nw"><span class="gd">${i+1}</span> ${mk(m)}${nm(m)}</span>`).join(' ')};
KEYS.forEach((k,i)=>{const t=D.createElement('div');t.className='r3c-txt';t.innerHTML=`<p class="r3-say"><span class="r3-tab">${i+1}</span>${sayHTML(k)}</p><p class="r3-fact">${F[k]}</p>`;FR[k].prepend(t)});
R3.done();});
