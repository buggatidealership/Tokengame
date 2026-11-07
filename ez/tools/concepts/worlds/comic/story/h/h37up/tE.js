/* Take E, the fight bill: a letterpress poster pasted on the wall. Tomorrow's close is the main event (the red banner, the clock in the
   big box, every bout on the card with the four corners' trades); the big names are the coming attractions, billed biggest first; the
   rest is the small print at the foot, day by day. */
(function(){const H=H37;
H.mount('E',S=>{const b=S.bell;return H.generic(S,{mk:13,capInHead:1,head:{img:'e-head.jpg',ar:'1387/1183',plate:[6.5,13,86.6,20],inner:[13.2,39.2,73.4,58]},
  innerHTML:()=>b?`<span class="ep-k">Main event · graded at the close</span>
   <span class="ep-clock" data-h37cd="${b.close}" role="timer" aria-label="Time to the close"><b data-u="H">00</b><i>:</i><b data-u="m">00</b><i>:</i><b data-u="s">00</b></span>
   <span class="ep-lab"><span>hrs</span><span>min</span><span>sec</span></span>
   <span class="ep-bill">${b.rounds.map(u=>H.logo(u,'ep-lg')).join('')}</span>
   <span class="ep-cap">The close grades every trade. <b>${b.nIn}</b> of <b>${b.nAll}</b> are in.</span>`:'',
  tomLab:()=>`The bouts · four corners each`,bigLab:'Coming attractions',restLab:'Also on the card'})});
})();
