/* cover3 shared take: the layout's contents as one recipe; a take swaps the object family (cfg.tok), the lettering (fonts) and the materials (CSS). */
window.T3M=async function(cfg){await T3.font(cfg.fonts.concat(['Luckiest+Guy']));
 const tok=(T,m,cls)=>`<span class="t3-tok m-tok ${cls||''}${m===T.lead?' is-ld':''}">${cfg.tok(T,m,cls||"")}</span>`;
 const P={
  issue:T=>T.plate(`<b>${T.letters('Season 1')}</b><small>Season 2 next</small>`,'m-is m-is1',3)+T.plate(`<b>No. ${ROUNDS.length}</b><small>reports graded</small>`,'m-is m-is2',5)+T.plate(`<small>Next bell</small><b>${T.esc(T.dayWord(T.nd))} 4 PM ET</b>`,'m-is m-is3',7),
  starH:T=>T.plate(T.letters('Starring'),'m-sth',9),
  token:(T,m)=>tok(T,m,'m-st'),
  head:T=>{const hh=document.querySelector('#wc-book .sh-h1 .wc-h1');const w=Math.min(Math.max(140,(hh?hh.clientWidth:200)-(innerWidth<1000?26:8)),340);const h=cfg.head;
    return `<span class="m-k">4 AI<span class="wc-lc">s</span></span>${POP.ext('Trade',{size:60,font:h.font,fill:h.fill,shade:h.shade,max:w,measureAs:'Earnings'})}${POP.ext('Earnings',{size:60,font:h.font,fill:h.fill,shade:h.shade,max:w})}<span class="m-q">${T.plate(T.letters('Who calls it best?'),'m-qp',13)}</span>`},
  num:(T,i)=>`<span class="m-n"><b>${i}</b></span>`,
  capbox:(T,c,i)=>T.plate(c,'m-cap',20+i),
  p1:T=>{const e=T.ex1;return `<div class="m-v1"><span class="m-co">${T.plate(`${T.com(e.t)}<small>${T.coName(e)}</small>`,'m-cop',41)}</span><span class="m-row">${e.calls.map((c,i)=>`<span class="m-sp">${T.balloon(c,i,'b')}${tok(T,c.m,'m-sm')}</span>`).join('')}</span></div>`},
  p2:T=>{const e=T.ex2,a=e.a;return `<div class="m-v2"><img class="m-bell" src="${T.CUT}bell3.webp" alt=""><svg class="m-rg" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 10 Q2 20 6 30M12 6 Q6 20 12 34"/></svg>
      <span class="m-bx ${a>=0?'up':'dn'}"><svg viewBox="-12 -6 124 112" aria-hidden="true"><path class="b2" d="${T.burst(7,12)}" transform="translate(3 4)"/><path class="b1" d="${T.burst(7,12)}"/><path class="b0" d="${T.burst(19,12)}" transform="translate(50 50) scale(.72) translate(-50 -50)"/></svg><b>${a>=0?'+':'−'}${Math.abs(a).toFixed(2)}%</b></span>
      <span class="m-gr">${e.calls.map(c=>`<span>${tok(T,c.m,'m-xs')}${T.stamp(T.pass(c,a))}</span>`).join('')}</span><span class="t3-sr">${T.esc(e.co)} closed ${a>=0?'up':'down'} ${Math.abs(a)}%. ${e.calls.map(c=>T.NM[c.m]+(T.pass(c,a)?' passed':' failed')).join(', ')}.</span></div>`},
  p3:T=>`<div class="m-v3"><span class="m-gt"><img src="${T.CUT}tk-gold.webp" alt="">${tok(T,T.lead,'m-gtc')}</span><span class="m-gn">${T.plate(`<b>${T.letters(T.NM[T.lead])}</b><small>P&amp;L ${T.money(T.pnl(T.lead))}</small>`,'m-gnp',51)}</span></div>`,
  p4:T=>`<div class="m-v4"><span class="m-gt m-gt4"><img src="${T.CUT}tk-gold.webp" alt="">${tok(T,T.lead,'m-gtc')}</span><span class="m-bt">${T.plate(`<small>Bet #1</small><b>NVIDIA</b>`,'m-btp',61)}</span></div>`,
  hub:T=>`<span class="m-hub"><svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="27" class="d"/><circle cx="30" cy="30" r="22" class="r"/><g class="m-hr"><path d="M30 10a20 20 0 0 1 19 13" class="a"/><path d="M45 18l7 6 1-9z" class="h"/><path d="M30 50a20 20 0 0 1-19-13" class="a"/><path d="M15 42l-7-6-1 9z" class="h"/></g></svg><b>Every<br>round</b></span>`,
  btn:T=>T.plate(`${T.letters('Meet the four models')} <i aria-hidden="true">↓</i>`,'m-btp2',71),
 };
 T3.build(cfg.id,P);document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="t4gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6a8"/><stop offset=".45" stop-color="#ffd21f"/><stop offset=".7" stop-color="#ff9a00"/><stop offset="1" stop-color="#fff0a0"/></linearGradient></defs></svg>');T3.ready()};
