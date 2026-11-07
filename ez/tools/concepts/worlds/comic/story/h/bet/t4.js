/* T4 · The hourglass: coins pour from the fees into the pool (Hedra gpt-image-2); the countdown is engraved on its brass base;
   ink callouts point at the parts: the top bulb = the fees, the neck = the top AI's call, the pile = what happens to the pool.
   The sand level is art, not a gauge: the pool's size is not live yet, so a small label says so. */
BT.go((sec,D)=>{
 const crop=()=>innerWidth<1000?[90,40,600,960]:[60,20,650,1000];
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap t4">${BT.head(D)}
  <div class="t4-stage"><div class="bt-shd t4-fr"><div class="bt-ink"><div class="bt-art t4-art" role="timer" aria-label="Time until the NVIDIA bet">
   <div class="t4-base" data-at="[384,905]"><span><b data-k="d"></b><small>days</small></span><i>:</i><span><b data-k="h"></b><small>hrs</small></span><i>:</i><span><b data-k="m"></b><small>min</small></span><i>:</i><span><b data-k="x"></b><small>sec</small></span></div>
  </div></div></div>
  <svg class="t4-lines" aria-hidden="true"></svg>
  <p class="t4-co t4-a" data-to="384,300"><span><b>The fees</b>${D.share}% of $EZ creator fees pour into the pool.</span></p>
  <p class="t4-co t4-b" data-to="384,520"><span><b>The call</b>The pool gets bet on the top AI's call. Today that's ${BT.face(D.lead)}<b class="n">${D.leadName}</b>.</span></p>
  <p class="t4-co t4-c t4-ok" data-to="330,760"><span><b>Right</b>$EZ buyback</span></p>
  <p class="t4-co t4-d t4-no" data-to="440,760"><span><b>Wrong</b>The pool can be wiped out</span></p>
  <small class="t4-note">The pile is a picture. The pool's size goes live with $EZ.</small></div>
  <p class="bt-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div>`);
 const st=sec.querySelector('.t4-stage'),a=sec.querySelector('.t4-art'),sv=st.querySelector('.t4-lines');
 BT.art(a,'hourglass-b-gpt.jpg',768,1024,crop);
 const draw=()=>{const c=crop(),k=a.clientWidth/c[2],R=st.getBoundingClientRect(),A=a.getBoundingClientRect();sv.setAttribute('viewBox',`0 0 ${R.width} ${R.height}`);
  sv.innerHTML=[...st.querySelectorAll('.t4-co')].map(co=>{const [x,y]=co.dataset.to.split(',').map(Number),tx=A.left-R.left+(x-c[0])*k,ty=A.top-R.top+(y-c[1])*k,q=co.getBoundingClientRect();
   const left=q.left+q.width/2<tx,sx=left?q.right-R.left-4:q.left-R.left+4,sy=q.top-R.top+q.height/2,mx=(sx+tx)/2;
   return `<path d="M${sx} ${sy} Q ${mx} ${sy-18} ${tx} ${ty}" fill="none" stroke="#0d0b10" stroke-width="5" stroke-linecap="round"/><path d="M${sx} ${sy} Q ${mx} ${sy-18} ${tx} ${ty}" fill="none" stroke="#fff8de" stroke-width="2" stroke-linecap="round"/><circle cx="${tx}" cy="${ty}" r="5" fill="#ffd21f" stroke="#0d0b10" stroke-width="2.5"/>`}).join('')};
 draw();addEventListener('resize',draw);document.fonts.ready.then(()=>setTimeout(draw,50));BT.tick(sec);
});
