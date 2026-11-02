/* W1 · THE TRADER'S WHITEBOARD: the desk's whiteboard, the season drawn in marker. Each AI's line in its marker (the page's colours,
   inked darker so they read on white; the golden ticket holder in gold), a round magnet where each line ends, the axes and the
   50/50 line drawn by hand, the tables written in marker under each chart. Two boards on one wall, the aluminium tray between
   them, a magnetic label on it: "Hit rate ▸ P&L". */
(function(){const A=window.S9.A3,S8=window.S8;
const MK={GPT:'#0d8a5a',KIMI:'#2457c9',CLAUDE:'#d2561b',GROK:'#2a2a2e'},GOLD='#b37a00',col=(X,m)=>m===S8.lead(X)?GOLD:MK[m];
const st={col,cls:'s9w-wb',sm:13,smB:14,lab:{ff:"'Shantell Sans',sans-serif",w:700,c:'#2c2f36',op:.85,bc:'#2c2f36',k:.55,ls:'0'},lower:true,
 pad:(big,k)=>[big?70:(k==='pnl'?64:44),big?24:18,big?26:18,big?40:32],
 defs:u=>`<filter id="${u}m" x="-2%" y="-5%" width="104%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.6"/></filter>
  <radialGradient id="${u}mg" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></radialGradient>`,
 grid:{c:'#9aa3ad',op:.35,dash:'2 6',w:1},base:{c:'#2c2f36',op:.8,w:1.6,dash:'7 5'},
 line:(d,c,ld,u)=>`<path d="${d}" fill="none" stroke="${c}" stroke-opacity=".92" stroke-width="${ld?3.6:2.8}" stroke-linejoin="round" stroke-linecap="round" filter="url(#${u}m)"/>`,
 start:(x,y,u)=>`<circle cx="${x}" cy="${y.toFixed(1)}" r="3.5" fill="#2c2f36"/>`,
 end:(x,y,c,ld,u)=>`<circle cx="${(x+1).toFixed(1)}" cy="${(y+2).toFixed(1)}" r="${ld?8:7}" fill="#0003"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?8:7}" fill="${c}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ld?8:7}" fill="url(#${u}mg)"/>`,
 div:X=>`<span class="w1-tray"></span><span class="s9-dvt w1-lab">Hit rate <b>▸</b> P&amp;L</span>`};
window.S9.mount(A.make('w1',st))})();
