/* T5 · Next issue: the bet as the next comic's cover (Hedra gpt-image-2 art: a giant golden chip rising over the city);
   the countdown is the cover's corner box ("on sale in"), the stakes are the cover's own blurbs and its bottom banner */
BT.go((sec,D)=>{
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap t5">${BT.head(D,'Next issue. On the stands at the close, '+D.day+'.')}
  <div class="t5-row"><div class="t5-book"><div class="t5-cov">
   <div class="t5-mast"><span class="t5-lg">Earnings Zeason</span><span class="t5-no">Season 1 · Bet #1</span></div>
   <div class="t5-box" role="timer" aria-label="Time until the NVIDIA bet"><p>On sale in</p><span><b data-k="d"></b><small>days</small></span><span><b data-k="h"></b><small>hrs</small></span><span><b data-k="m"></b><small>min</small></span><span><b data-k="x"></b><small>sec</small></span></div>
   <p class="t5-bl t5-b1"><span>${BT.face(D.lead)}${D.leadName}'s call. The whole pool.</span></p>
   <p class="t5-bl t5-b2"><span>${D.share}% of $EZ creator fees inside!</span></p>
   <div class="t5-ban"><p class="ok"><em>Right</em>$EZ buyback</p><p class="no"><em>Wrong</em>The pool can be wiped out</p></div>
  </div></div>
  <div class="t5-side"><p class="bt-cap"><span>The pool gets bet on the top AI's call. Today that's <b>${D.leadName}</b>.</span></p>
   <p class="bt-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div></div></div>`);
 sec.querySelector('.t5-cov').style.backgroundImage=`url(${BT.H}cover-c-gpt2k.jpg)`;BT.tick(sec);
});
