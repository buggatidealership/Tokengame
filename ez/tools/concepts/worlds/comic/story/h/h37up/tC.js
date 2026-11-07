/* Take C, the trader's diary: week to view. The alarm clock counts down to the close, tomorrow's page holds the four companies written
   in by hand with each AI's trade in green or red pen; turn the page for the predictions still to come, the big names on stickers first. */
H37.mount('C',S=>H37.generic(S,{mk:13,capInHead:1,head:{img:'c-headL.jpg',ar:'901/604',cd1:[46.6,25.4,18.75,27],inner:[22.2,58.6,69.5,37.5]},
  innerHTML:(S)=>{const b=S.bell;if(!b)return '';const p=b.p;return `<span class="cd-day">${H37.esc((H37.WD[H37.dow(p)]+' '+H37.md(p)).toUpperCase())}</span>
   <span class="cd-hand">${H37.esc(b.day)}: the ${b.mixed?'closes':'4pm '+H37.esc(b.ex)+' close'}</span>
   <span class="cd-hand cd-cap">The close grades every trade. <b>${b.nIn}</b> of <b>${b.nAll}</b> are in.</span>`},
  bigLab:'Big names',restLab:'Then the rest, day by day'}));
