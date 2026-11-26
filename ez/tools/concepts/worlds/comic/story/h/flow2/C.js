(function(){const {D,b2,KEYS,FR,FACT,EX,NM,mark,esc}=F2;b2.classList.add('f2-C');b2.querySelector('.t4-frs').classList.add('f2','f2-pp');
const nm=m=>NM[m]||m,list=a=>a.length>1?a.slice(0,-1).join(', ')+' and '+a[a.length-1]:a[0]||'';
/* one line of this round's facts per step, from ROUNDS and __x2pPnl (the frame shows the same, but small) */
const F={
 call:`<b>${esc(EX.co)}, round ${EX.n}:</b> `+FACT.call.map(c=>`<span class="f2-nw">${mark(c.m)}<span class="${c.up?'up':'dn'}">${c.t}</span></span>`).join(' '),
 close:`<b>${esc(EX.co)} closed <span class="${FACT.close.up?'up':'dn'}">${FACT.close.mv}</span>.</b> `+(FACT.close.win.length===1?`<span class="f2-nw">${mark(FACT.close.win[0])}${nm(FACT.close.win[0])} wins:</span> the closest call.`:FACT.close.win.length?'A tie.':'Nobody won.'),
 ledger:`<span class="up">Right:</span> ${list(FACT.ledger.right.map(nm))}. <span class="dn">Wrong:</span> ${list(FACT.ledger.wrong.map(nm))}.`,
 board:`<b>Today:</b> `+FACT.board.map(b=>`<span class="f2-nw"><span class="gd">${b.i}</span> ${mark(b.m)}</span>`).join(' ')+` <span class="gd">${FACT.board[0].p}</span> on top.`};
KEYS.forEach((k,i)=>{const t=D.createElement('div');t.className='f2c-txt';t.innerHTML=`<p class="f2-say"><span class="f2-tab">${i+1}</span>${F2.sayHTML(k)}</p><p class="f2-fact">${F[k]}</p>`;FR[k].prepend(t)});
F2.done();})();
