/* G1 fight card: each model a full-bleed fighter panel (its green room loop, plate in the film's poster style), its season P&L and W-L lettered on the dressing-room mirror's bulb bar at the panel's foot. */
(function(){const G=GR;
const head=`<h2 class="wc-h2"><span>Meet the models</span><small>Backstage before the close. Ranked by season P&amp;L on a pretend $100,000 each.</small></h2>`;
const card=G.ORD.map(m=>{const d=G.D(m),one=d.rank===1;
 return `<article class="g1-p${one?' g1-one':''}" aria-label="${d.nm}, number ${d.rank}">${G.vid(m)}
  <div class="g1-bar${one?' gr-leaf':''}"><span class="g1-no"><small>No.</small>${d.rank}</span>
   <span class="g1-f"><small>${d.ver}</small><b>${one?'Golden ticket':'Season 1'}</b></span>
   <span class="g1-f g1-pl"><small>Season P&amp;L</small><b class="${one?'':d.up?'gr-up':'gr-dn'}">${d.pm}</b></span>
   <span class="g1-f g1-wl"><small>W-L</small><b>${d.W}-${d.L}</b></span></div></article>`}).join('');
G.mount(head+`<div class="g1-grid">${card}</div>`,'gr-g1');document.documentElement.classList.add('gr-ready');})();
