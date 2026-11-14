/* T4 Binder page: four collectible cards in a 2x2 binder sleeve page (one row from 1000px). The leader's card is printed on Hedra holo
   foil (leader = holo); the others on card stock with a frame in their lab colour. Rank = the card's set number in the top corner;
   the founder in the art window; ver and flag on the type line; the stats on a black enamel plate (Hedra) in gold; the role on the
   art window's bottom edge; last five as ink pips. */
(function(){const {d,P,INK,COL,ROLE,money,mark,flag,port,sr,mount}=HC;const {sec,g}=mount('hc-t4');
d.models.forEach((x,i)=>{const b=x.best;const c=document.createElement('article');c.className='hc-card t4-c t4-r'+i+(i===0?' t4-holo':'');c.dataset.m=x.m;c.style.setProperty('--mc',COL[x.m]);
  c.innerHTML=sr(x,i)+`<div class="t4-card" aria-hidden="true">
    <div class="t4-top"><span class="t4-nm">${P.esc(x.name)}</span><span class="t4-no"><small>No.</small>${i+1}</span></div>
    <div class="t4-art">${port(x.m)}<span class="t4-role">${P.esc(ROLE[i])}</span></div>
    <div class="t4-type">${flag(x.flag,18,12)}<span>${P.esc(x.ver)}</span></div>
    <div class="t4-plate">
     <div class="t4-pl"><small>P&amp;L</small><b class="${x.pnl>=0?'up':'dn'}">${money(x.pnl)}</b></div>
     <div class="t4-row"><span><small>Right way</small><b>${x.W}/${x.tot}</b></span><span class="t4-l5">${x.last5.map(s=>mark(s,14,{w:'#5dff9e',l:'#ff6a5e'})).join('')}</span></div>
     <div class="t4-best"><small>Best</small> <b class="${b.v>=0?'up':'dn'}">${money(b.v)}</b> <span>${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</span></div>
    </div>
   </div>`;g.appendChild(c)})})();
