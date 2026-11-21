/* C · THE BAR TO BEAT. Beat 1 is a tale of the tape: the coin, mid-flip, with "A COIN FLIP / 50% / RIGHT WAY" struck into its
   face, and beside it the four, ranked top to bottom (#1 largest): each AI's right trades against the count a coin lands in over
   the same number of trades ("45 of 72" vs "a coin: 28–44"). The count is gold only where it gets past the coin. All four are
   there, so the leader never reads as the whole set (lesson 123). Paintings: sol6's coin (s25-coin). */
(function(){const P5=window.P5,S=window.S7,S8=window.S8;
const CI='media/s25-coin.jpg',CCROP=[210,80,930,860];
const b1={id:'c',kick:'The bar to beat',
 line2:X=>`<b>Hit rate</b>, round by round. Each line is an AI; the gold is where <b>a coin’s</b> line would run.`,
  html(X){return `<p class="s8-ln">A coin flip calls a trade right <b>half the time</b>. Same number of trades: what <b>a coin</b> gets, what each AI got.</p>
  <div class="s8c-b1"><div class="s7-st s8c-coin"></div><ol class="s8c-tape" aria-hidden="true">${S.rows(X).map((r,i)=>{const v=S8.verdict(r);
   return `<li class="s8c-r${i?'':' s8c-r1'}" style="--c:${S8.col(X,r.m)}"><b class="s8c-n">${S.NM[r.m]}</b><span class="s8c-f s8c-${v}">${r.W}<small> of ${r.t}</small></span><span class="s8c-cn">a coin: ${r.lo}–${r.hi}</span></li>`}).join('')}</ol></div>`},
 draw(el,X){S.stage(el.querySelector('.s8c-coin'),{img:CI,ar:1,crop:CCROP,ink:S8.strike(592,478,1,7,[[-120,62,'A COIN FLIP'],[70,230,'50%'],[150,62,'RIGHT WAY']]),bloom:1,label:'A gold coin mid-flip: a coin flip calls a trade right 50% of the time'})}};
S8.mount(b1)})();
