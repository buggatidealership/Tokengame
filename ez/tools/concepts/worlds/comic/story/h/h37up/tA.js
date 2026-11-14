/* Take A, Departures: the exchange's split-flap board. Every letter of a ticker, a date and the countdown on its own painted flap. */
H37.mount('A',S=>H37.generic(S,{chars:true,mk:13,head:{img:'a-head.jpg',ar:'1812/794',plate:[11.6,24.9,76.8,15.2],
  cd4:[[6.64,46.5,20.06,50.6],[28.53,46.5,20.3,50.6],[50.99,46.5,20.06,50.6],[73.45,46.5,19.77,50.6]]},
  capHTML:b=>`<span class="fa-w">The close grades every trade</span><span class="fa-l2"><span class="fa-n">${H37.chars(String(b.nIn),1)}</span><span class="fa-of">of</span><span class="fa-n">${H37.chars(String(b.nAll),1)}</span><span class="fa-of">trades in</span></span>`,
  tomLab:b=>`Graded at this close`,bigLab:'Big names',restLab:'Then the rest, day by day'}));
