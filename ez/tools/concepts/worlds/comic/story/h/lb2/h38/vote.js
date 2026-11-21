/* Take G · Election night: the season reported like a race on results night. The painted studio's blank video wall carries the leader
   and the gap; the race is a results wall of bars from the start line (each model's bar in its colour, its figure at the end); the
   results table is the timing tower; each model's results card (its biggest night, its worst, its stronghold sector, its last five) is the pit wall. */
(function(){window.LBT=window.LBT||{};window.LBT.vote=(h,d)=>R38.build(h,d,{id:'vote',bar:true,x0:25,xs:68,
  words:{bug:'Leading',tower:'The results · '+d.N+' of '+d.N+' rounds in',pit:'Results cards',start:'Start, $0',startHit:'Coin flip, 50%'},
  top:()=>`<div class="g-st"><img src="${R38.IMG}g-studio.jpg" alt="" class="g-img"><div class="g-scr"></div></div>`,
  after:(host)=>{const s=host.querySelector('.g-scr'),l=host.querySelector('.r-lead');if(s&&l&&l.parentNode!==s)s.appendChild(l)}})})();
