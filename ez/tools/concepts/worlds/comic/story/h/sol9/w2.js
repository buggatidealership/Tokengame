/* W2 · THE TERMINAL: a Bloomberg-style screen. Black, amber type, a title bar per panel with its function code, the lines in the
   AIs' colours as thin plotted lines with square markers, the tables as the terminal's own rows. Between the two panels the
   terminal's command line: "1 HIT RATE <GO> ▸ 2 P&L <GO>". */
(function(){const A=window.S9.A3;
const st={cls:'s9w-tm',sm:12.5,smB:13.5,lab:{ff:"'Chivo Mono',monospace",w:700,c:'#ffb000',op:.9,bc:'#ffb000',k:.62,ls:'0'},
 pad:(big,k)=>[big?70:(k==='pnl'?60:44),big?14:12,big?18:12,big?34:30],ay:10,
 grid:{c:'#ffb000',op:.18,dash:'1 3',w:1},base:{c:'#ffb000',op:.75,w:1.2},
 ground:(w,h)=>`<rect width="${w}" height="${h}" fill="#000"/>`,
 line:(d,c,ld)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${ld?2.4:1.8}" stroke-linejoin="miter"/>`,
 end:(x,y,c,ld)=>`<rect x="${(x-(ld?4:3.5)).toFixed(1)}" y="${(y-(ld?4:3.5)).toFixed(1)}" width="${ld?8:7}" height="${ld?8:7}" fill="${c}"/>`,
 div:X=>`<span class="w2-cmd"><i>1</i> HIT RATE <em>&lt;GO&gt;</em> <b>▸</b> <i>2</i> P&amp;L <em>&lt;GO&gt;</em></span>`};
window.S9.mount(A.make('w2',st))})();
