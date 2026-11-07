/* T3 · Main event: the season's fight poster (Hedra seedream, the ring under one spotlight, the chip hung as the belt); the purse is the pool,
   the fighter is the top AI's call, the corners are the outcomes, the countdown is the bout clock on the ticket */
BT.go((sec,D)=>{
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap t3">${BT.head(D,'Season 1 main event. The bell rings at the close, '+D.day+'.')}
  <div class="t3-grid"><div class="bt-shd t3-pw"><div class="bt-ink"><div class="t3-post">
   <div class="t3-top"><p class="t3-k">Season 1 · main event</p><p class="t3-bill"><span class="t3-who">${BT.face(D.lead,'t3-f')}${D.leadName}'s call</span><em>vs</em><span class="t3-who t3-nv"><img src="media/logos/NVDA.png" alt="">NVIDIA</span></p>
    <p class="t3-purse">Purse: the pool, ${D.share}% of $EZ creator fees</p></div>
   <div class="t3-cn t3-red"><em>Red corner</em>Wrong: the pool can be wiped out</div><div class="t3-cn t3-grn"><em>Green corner</em>Right: $EZ buyback</div>
  </div></div></div>
  <div class="t3-side"><div class="t3-tix" role="timer" aria-label="Time until the NVIDIA bet"><p class="t3-tk">Bell in</p>
   <div class="t3-cl"><span><b data-k="d"></b><small>days</small></span><span><b data-k="h"></b><small>hrs</small></span><span><b data-k="m"></b><small>min</small></span><span><b data-k="x"></b><small>sec</small></span></div>
   <p class="t3-fine">The board freezes 24 hours before the bell; the top AI by P&amp;L takes the call. Today: ${D.leadName}.</p></div>
   <p class="bt-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div></div></div>`);
 const p=sec.querySelector('.t3-post');p.style.backgroundImage=`url(${BT.H}arena-a-sd.jpg)`;BT.tick(sec);
});
