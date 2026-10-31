/* T2 · The dial: a close-up of the opener's vault door (Hedra gpt-image-2, noir with gold); the countdown is the door's own dial:
   days on its face, the needle sweeping the seconds, hours and minutes on brass tumblers; the stakes on bolted brass plates */
BT.go((sec,D)=>{
 const C=[510,441],R=104,ticks=[...Array(60)].map((_,i)=>{const a=i*6*Math.PI/180,l=i%5?8:16,r0=R-3,r1=R-3-l;return `<line x1="${C[0]+r0*Math.sin(a)}" y1="${C[1]-r0*Math.cos(a)}" x2="${C[0]+r1*Math.sin(a)}" y2="${C[1]-r1*Math.cos(a)}" stroke-width="${i%5?2.2:4.5}"/>`}).join('');
 const crop=()=>innerWidth<1000?[250,210,540,470]:[150,150,740,560];
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap t2">${BT.head(D)}
  <div class="t2-grid"><div class="bt-shd"><div class="bt-ink"><div class="bt-art t2-art" role="timer" aria-label="Time until the NVIDIA bet">
   <svg class="t2-dial" viewBox="0 0 1024 1024" preserveAspectRatio="none" aria-hidden="true">
    <defs><radialGradient id="t2f" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff6d6"/><stop offset=".55" stop-color="#e8d6a2"/><stop offset="1" stop-color="#9c8450"/></radialGradient>
     <linearGradient id="t2g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="#e2a52a"/><stop offset="1" stop-color="#8a5a0c"/></linearGradient></defs>
    <circle cx="${C[0]}" cy="${C[1]}" r="${R+16}" fill="#0d0b10"/><circle cx="${C[0]}" cy="${C[1]}" r="${R+11}" fill="url(#t2g)"/>
    <circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="url(#t2f)" stroke="#0d0b10" stroke-width="5"/>
    <g stroke="#1a1410" stroke-linecap="round">${ticks}</g>
    <path d="M${C[0]-R+18} ${C[1]+40} A ${R-18} ${R-18} 0 0 0 ${C[0]+R-18} ${C[1]+40}" fill="none" stroke="rgba(120,90,30,.35)" stroke-width="10"/>
    <g class="t2-nd" style="transform-origin:${C[0]}px ${C[1]}px"><path d="M${C[0]-7} ${C[1]+18} L${C[0]} ${C[1]-R+10} L${C[0]+7} ${C[1]+18}Z" fill="#c42a20" stroke="#0d0b10" stroke-width="3" stroke-linejoin="round"/></g>
    <circle cx="${C[0]}" cy="${C[1]}" r="11" fill="url(#t2g)" stroke="#0d0b10" stroke-width="3"/></svg>
   <div class="t2-face" data-at="[${C[0]},${C[1]}]"><b data-k="d"></b><small>days</small></div>
   <div class="t2-tum" data-at="[${C[0]},${C[1]+R+60}]"><span><b data-k="h"></b><small>hrs</small></span><span><b data-k="m"></b><small>min</small></span><span><b data-k="x"></b><small>sec</small></span></div>
  </div></div></div>
  <div class="t2-plates">
   <p class="t2-pl"><span>Inside: ${D.share}% of $EZ creator fees, the pool.</span></p>
   <p class="t2-pl"><span>It opens on the top AI's call. Today that's ${BT.face(D.lead)}<b>${D.leadName}</b>.</span></p>
   <div class="t2-two"><p class="t2-pl t2-ok"><span><em>Right</em>$EZ buyback</span></p><p class="t2-pl t2-no"><span><em>Wrong</em>The pool can be wiped out</span></p></div>
  </div></div>
  <p class="bt-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div>`);
 const a=sec.querySelector('.t2-art'),svg=a.querySelector('.t2-dial'),nd=a.querySelector('.t2-nd');
 const fit=()=>{const c=crop();svg.setAttribute('viewBox',c.join(' '))};fit();addEventListener('resize',fit);
 BT.art(a,'vault-b-gpt.jpg',1024,1024,crop);BT.tick(sec,L=>{nd.style.transform=`rotate(${L.x*6}deg)`});
});
