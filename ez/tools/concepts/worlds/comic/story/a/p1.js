/* P1 · The pile: the round's own torn stub drops onto the pile of every graded round (each layer's end green or red: its move) */
(function(){const S=SA,R=S.RS(),n=S.lrN(),r=S.byN(n);if(!r){S.ready();return}
  const rest=R.filter(x=>x.n!==n),N=R.length;
  const jit=i=>(((i*37)%5)-2)*.8,tilt=i=>(((i*53)%5)-2)*.15;
  const layers=rest.map((x,i)=>`<i class="sa-ly" style="--i:${i};--x:${jit(x.n)}px;--t:${tilt(x.n)}deg;--mv:${x.a>0?'var(--wc-g)':'var(--wc-r)'}"></i>`).join('');
  const w=S.p5(`<div class="sa-p1">
     <div class="sa-pile" style="--k:${rest.length}" aria-hidden="true">${layers}<span class="sa-drop">${S.stub(r)}</span><b class="sa-pow"><span>Filed!</span></b></div>
     <div class="sa-p1-t"><p class="sa-cnt"><b>${N}</b><span>rounds on the record</span></p><div class="sa-btn"></div></div></div>`,
    `Round ${n}, ${S.esc(r.co)}, goes onto the pile with every other graded round. ${N} rounds on the record so far.`);
  if(w)S.once(w.querySelector('.sa-pile'),.7);S.ready()})();
