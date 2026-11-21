/* S3 · The bet slip: a ticket stub cut from the chip's own board (painted board texture, drawn die-cut, gold traces), the stakes printed on it */
BT.go((sec,D)=>{
 const st=`<div class="s3-slip" role="group" aria-label="Bet slip">
  <svg class="s3-cut" viewBox="0 0 360 240" preserveAspectRatio="none" aria-hidden="true"><defs>
   <pattern id="s3tx" patternUnits="userSpaceOnUse" width="180" height="90"><image href="/tools/concepts/worlds/comic/story/h/bet2/img/stub-tex.jpg" width="180" height="90" preserveAspectRatio="none"/></pattern>
   <linearGradient id="s3au" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#d8a238"/><stop offset="1" stop-color="#8a5c12"/></linearGradient>
   <radialGradient id="s3lt" cx=".3" cy=".1" r=".9"><stop offset="0" stop-color="#ffd27a" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>
   <path class="ed" d="M14 6 Q4 6 3.5 17 L4 104 A14 14 0 0 1 4 136 L4.5 223 Q5 234 15 234 L346 233 Q356 233 356 222 L356.5 137 A14 14 0 0 1 356 105 L355.5 18 Q355 7 345 7 Z"/>
   <path class="bd" d="M14 6 Q4 6 3.5 17 L4 104 A14 14 0 0 1 4 136 L4.5 223 Q5 234 15 234 L346 233 Q356 233 356 222 L356.5 137 A14 14 0 0 1 356 105 L355.5 18 Q355 7 345 7 Z" fill="url(#s3tx)"/>
   <path d="M14 6 Q4 6 3.5 17 L4 104 A14 14 0 0 1 4 136 L4.5 223 Q5 234 15 234 L346 233 Q356 233 356 222 L356.5 137 A14 14 0 0 1 356 105 L355.5 18 Q355 7 345 7 Z" fill="url(#s3lt)"/>
   <path class="tr" d="M20 16 H262 L270 24 V96 M270 144 V216 L262 224 H20 L14 218 V146 M14 94 V22Z"/>
   <path class="tr t2" d="M26 22 H258 L264 28 V92 M264 148 V210 L258 218 H26 L20 212 V22"/>
   <g class="pf">${Array.from({length:17},(_,i)=>`<circle cx="${283+(i%2)*.6}" cy="${16+i*13}" r="2.3"/>`).join('')}</g>
   <g class="ct">${Array.from({length:14},(_,i)=>`<rect x="334" y="${30+i*13}" width="14" height="8" rx="1.2"/>`).join('')}</g>
   <circle class="vi" cx="300" cy="22" r="3.5"/><circle class="vi" cx="300" cy="218" r="3.5"/>
  </svg>
  <div class="s3-tx">
   <p class="s3-h">Bet slip · Nº 1</p>
   <dl><dt>Stake</dt><dd><b class="s3-g">${D.share}%</b> of $EZ creator fees: the pool</dd>
   <dt>Pick</dt><dd>the top AI's call. Today that's ${BT.face(D.lead,'s3-f')}<b class="s3-ld">${D.leadName}</b></dd>
   <dt class="s3-ok">If right</dt><dd>$EZ buyback</dd>
   <dt class="s3-no">If wrong</dt><dd>the pool can be wiped out</dd></dl></div>
  <p class="s3-stub" aria-hidden="true"><b>NVIDIA</b><span>NVDA · Bet #1</span></p></div>`;
 BT2.build(sec,D,st,'s3');
});
