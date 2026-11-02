/* W4 · THE TICKER WALL: the exchange's LED wall. A black wall of dark LEDs; each AI's line lit as a run of LEDs in its colour, the
   golden ticket holder in amber gold, the scale lit dim; the tables in the wall's lit type. Between the two charts a row of the
   wall's modules spells "Hit rate ▸ P&L". */
(function(){const A=window.S9.A3;
const st={cls:'s9w-lw',sm:12.5,smB:13.5,lab:{ff:"'Chivo Mono',monospace",w:700,c:'#ffb21a',op:.75,bc:'#ffd21f',k:.62,ls:'0'},
 pad:(big,k)=>[big?70:(k==='pnl'?60:44),big?16:12,big?18:12,big?34:30],ay:10,
 defs:u=>`<pattern id="${u}dot" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.1" fill="#1d1a14"/></pattern>
  <filter id="${u}gl" x="-5%" y="-10%" width="110%" height="120%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`,
 ground:(w,h,u)=>`<rect width="${w}" height="${h}" fill="#050505"/><rect width="${w}" height="${h}" fill="url(#${u}dot)"/>`,
 grid:{c:'#ffb21a',op:.22,dash:'1.5 3.5',w:1.5},base:{c:'#ffd21f',op:.8,w:1.6,dash:'2 3'},
 line:(d,c,ld,u)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${ld?3.4:3}" stroke-dasharray="0.1 ${ld?4.4:4.6}" stroke-linecap="round" stroke-linejoin="round" filter="url(#${u}gl)"/>`,
 end:(x,y,c,ld,u)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?4:3.4}" fill="${c}" filter="url(#${u}gl)"/>`,
 div:X=>`<span class="w4-mod">Hit rate ▸ P&amp;L</span>`};
window.S9.mount(A.make('w4',st))})();
