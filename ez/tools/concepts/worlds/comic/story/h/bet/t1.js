/* T1 · The die count: a modelled GPU chip (Hedra seedream), the countdown as page text set into its four dies in perspective */
BT.go((sec,D)=>{
 const Q=[[[605,452],[743,440],[809,575],[672,598]],[[788,431],[923,411],[999,545],[860,566]],[[981,400],[1101,382],[1184,515],[1049,534]],[[1150,376],[1273,356],[1362,485],[1233,505]]];
 const lq=q=>{const [tl,tr,br,bl]=q,f=.32,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.06),m(br,tr,.06),m(br,tr,.06+f),m(bl,tl,.06+f)]};
 const lab=['days','hrs','min','sec'],K=['d','h','m','x'];
 const dn=(i)=>`<div class="t1-die" data-q='${JSON.stringify(Q[i])}'><b data-k="${K[i]}"></b><i></i></div>`+
   `<div class="t1-lab" data-q='${JSON.stringify(lq(Q[i]))}'>${lab[i]}</div>`;
 const crop=()=>innerWidth<1000?[540,250,880,470]:[420,200,1100,560];
 sec.insertAdjacentHTML('beforeend',`<div class="bt-wrap t1">
  ${BT.head(D)}
  <div class="t1-grid">
   <div class="bt-shd t1-fr"><div class="bt-ink"><div class="bt-art t1-art" role="timer" aria-label="Time until the NVIDIA bet">${[0,1,2,3].map(dn).join('')}
     <span class="t1-sfx" aria-hidden="true">tick</span></div></div></div>
   <div class="t1-fork">
    <p class="bt-cap t1-c1"><span>${D.share}% of $EZ creator fees fill the pool.</span></p>
    <p class="bt-cap t1-c2"><span>The pool gets bet on the top AI's call. Today that's ${BT.face(D.lead)}<b>${D.leadName}</b>.</span></p>
    <div class="t1-fk"><p class="t1-w t1-ok"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 3 L37 22 L27 22 L28 37 L12 37 L13 22 L3 22Z"/></svg><em>Right</em><span>$EZ buyback</span></p>
     <p class="t1-w t1-no"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 37 L37 18 L27 18 L28 3 L12 3 L13 18 L3 18Z"/></svg><em>Wrong</em><span>The pool can be wiped out</span></p></div>
   </div></div>
  <p class="bt-s2">NVIDIA is the first bet, not the last. Season 2 brings more.</p></div>`);
 const a=sec.querySelector('.t1-art');BT.art(a,'chip-a-sd.jpg',1920,1080,crop);BT.tick(sec);
});
