/* A4b · A3 split into two boards joined by a ribbon cable: four wires, one per AI in its colour, run from the hit-rate board down
   to the P&L board (the same four AIs, a second measure). A printed tab on the cable: "Hit rate ▸ P&L". */
(function(){const A=window.S9.A3,S8=window.S8,S=window.S7;
const col=(X,m)=>m===S8.lead(X)?S.GD:S.INK[m];
window.S9.mount(A.make('a4b',Object.assign({},A.ETCH,{cls:'s9w-et',div:X=>`<i class="s9-rb">${X.arank.map(m=>`<i style="--c:${col(X,m)}"></i>`).join('')}</i><span class="s9-dvt">Hit rate <b>▸</b> P&amp;L</span>`})))})();
