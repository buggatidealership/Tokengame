/* V2 Gold leaf over the door: the bank's name lettered over its vault, the way banks gild their names, and the gold leaf is the
   pool's own coins (the letters are filled with the painted coin pile, a mirrored tile cut from the painting: coin-pile.jpg).
   Lit from below by the vault's glow, an ink outline as sign writers paint it, rain falling in front of it. Phone: one line
   over the arch. Desktop crops the arch away, so the sign stands on the dark wall left of the vault. */
H7.ready(()=>{const L=H7.scene();if(!L)return;
 const s=H7.share();
 L.insertAdjacentHTML('beforeend',`<div class="v2-s"><b class="v2-a">The pool</b><span class="v2-dt"> · </span><b class="v2-b">${s}% of $EZ creator fees</b></div>${H7.rain(400,240,46,11,.55).replace('class="h7-rn"','class="h7-rn v2-rn"')}`)});
