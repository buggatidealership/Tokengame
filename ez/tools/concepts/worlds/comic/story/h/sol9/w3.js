/* W3 · THE POST ON THE FLOOR: a trading post's overhead monitors (a generic post, no exchange's name or mark). Each chart is a
   monitor hung in the post's steel housing, a blue header strip with the post's number, the lines bright on the screen's navy, the
   tables as the screen's rows. Between the two monitors the post's ring carries its blue crawl: "Hit rate ▸ P&L". */
(function(){const A=window.S9.A3;
const st={cls:'s9w-po',sm:13,smB:14,lab:{ff:"'Saira Condensed',sans-serif",w:700,c:'#cfe0ff',op:.8,bc:'#ffd21f',k:.48,ls:'.06em'},
 pad:(big,k)=>[big?62:(k==='pnl'?50:42),big?18:14,big?20:14,big?36:30],ay:10,
 defs:u=>`<linearGradient id="${u}sc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2a52"/><stop offset="1" stop-color="#06162e"/></linearGradient>`,
 ground:(w,h,u)=>`<rect width="${w}" height="${h}" fill="url(#${u}sc)"/>`,
 grid:{c:'#9ec3ff',op:.16,w:1},base:{c:'#ffd21f',op:.8,w:1.4},
 line:(d,c,ld)=>`<path d="${d}" fill="none" stroke="#020a18" stroke-width="${ld?6:5}" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${ld?3.2:2.4}" stroke-linejoin="round" stroke-linecap="round"/>`,
 end:(x,y,c,ld)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?5.5:4.5}" fill="${c}" stroke="#020a18" stroke-width="1.5"/>`,
 div:X=>`<span class="w3-crawl"><i>Hit rate</i><b>▸</b><i>P&amp;L</i></span>`};
window.S9.mount(A.make('w3',st))})();
