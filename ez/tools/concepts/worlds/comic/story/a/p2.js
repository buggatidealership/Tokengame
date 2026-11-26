/* P2 · Filed: the round's graded card slides into its slot in the season's card drawer (one card per graded round, in order; each tab green or red: its move) */
(function(){const S=SA,R=S.RS(),n=S.lrN(),r=S.byN(n);if(!r){S.ready();return}
  const N=R.length,W=S.W(r),up=r.a>0;
  const cards=R.map(x=>x.n===n
    ?`<span class="sa-cd sa-slot"><span class="sa-gc"><b>#${x.n}</b>${W.map(m=>S.face(m,'wc-f-s')).join('')||'<i class="wc-nob wc-nob-s">×</i>'}<em class="${up?'sa-u':'sa-d'}">${up?'+':'−'}${S.pct(x.a)}</em><i class="sa-gd">Graded</i></span></span>`
    :`<span class="sa-cd" style="--h:${[0,6,12][x.n%3]}px;--mv:${x.a>0?'var(--wc-g)':'var(--wc-r)'}"></span>`).join('');
  const w=S.p5(`<div class="sa-p2"><div class="sa-dr" aria-hidden="true"><div class="sa-cds">${cards}</div>
      <div class="sa-fr"><span class="sa-lbl"><small>Season 1</small><b>${N} graded</b></span><i class="sa-hd"></i></div></div><div class="sa-btn"></div></div>`,
    `Round ${n}'s graded card is filed in the season's drawer, with ${N} graded rounds in order.`);
  if(w)S.once(w.querySelector('.sa-dr'),.7);S.ready()})();
