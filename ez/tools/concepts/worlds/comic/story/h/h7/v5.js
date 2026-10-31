/* V5 The light on the wet floor: the gold light pouring out of the vault lands on the wet ground right of the door and the words
   are in it, lying flat on the floor in perspective, as light and not as paint (screen blend: dark floor shows through, wet
   highlights brighten it). Rain rings break the letters where drops land. Beside the headline, it names what the headline bets. */
H7.ready(()=>{const L=H7.scene();if(!L)return;
 const r=H7.rng(41);let rings='';for(let i=0;i<9;i++){const x=(innerWidth>=1000?790:1190)+r()*330,y=(innerWidth>=1000?712:748)+r()*(innerWidth>=1000?70:96),w=10+r()*22;rings+=`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${w.toFixed(0)}" ry="${(w*.28).toFixed(1)}"/>`}
 L.insertAdjacentHTML('beforeend',`<div class="v5-f"><b>The pool</b></div><svg class="v5-r" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><g>${rings}</g></svg>`)});
