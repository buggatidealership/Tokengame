/* B · THE RECORDER: the exchange's strip-chart recorder, the lie detector of the floor. Four pens ride on one carriage at the
   right; the paper runs out under them round by round, so the newest trade is always at the pen and the season trails off to
   the left. The paper comes printed with the coin's exact range as a gold zone: a pen that wanders inside it reads like a coin;
   a pen that writes outside it is telling you something a coin can't. The P&L beat is the same recorder's second channel, $0
   printed in red. The paper is the object (the record being written), lit by one warm lamp, inside a black machine. */
(function(){const S=window.S7,S8=window.S8,S9=window.S9;
/* pen inks: each AI's colour, deep enough to read on paper; the golden ticket holder writes in gold ink */
const PEN={GPT:'#0a7d52',KIMI:'#1f4dc0',CLAUDE:'#c44f17',GROK:'#2a2420'},GOLD='#b98000';
const W={id:'b',
 col:(X,m)=>m===S8.lead(X)?GOLD:PEN[m],
 tag:{past:'Past the gold',in:'In the gold',under:'Under the gold'},
 kick:['Right way, round by round','Money, round by round'],
 h:(w,k)=>w>=700?Math.round(w*.5):Math.round(w*.86),
 svg(X,kind,w,h){const u=S9.uid(),t=S9.t,big=w>=700,sm=big?13.5:12.5,mono="'Chivo Mono',monospace";
  /* the machine: a black case; the paper strip inside it with sprocket holes; the pen carriage at the right */
  const px0=big?18:10,px1=w-(big?92:62),py0=big?16:12,py1=h-(big?16:12),hole=big?7:5.5;
  const g=S9.geo(X,kind,[px0+(kind==='pnl'?(big?70:58):(big?52:42)),py0+hole*2+(big?14:10),px1-6,py1-hole*2-(big?30:28)]),{Y,Xp,cx0,cx1,cy0,cy1}=g;
  let s=`<defs>
   <radialGradient id="${u}p" cx="62%" cy="45%" r="75%"><stop offset="0" stop-color="#f1e2b6"/><stop offset=".55" stop-color="#dcc690"/><stop offset="1" stop-color="#9c8455"/></radialGradient>
   <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a2c"/><stop offset=".5" stop-color="#121214"/><stop offset="1" stop-color="#050506"/></linearGradient>
   <linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6b4a08"/><stop offset=".45" stop-color="#ffd45a"/><stop offset="1" stop-color="#8a5e08"/></linearGradient>
   <pattern id="${u}z" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)"><rect width="5" height="5" fill="#f2b100" fill-opacity=".20"/><line x1="0" y1="0" x2="0" y2="5" stroke="#c98a00" stroke-opacity=".42" stroke-width="1"/></pattern>
   <filter id="${u}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .27 0 0 0 0 .12 0 0 0 .28 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
   <clipPath id="${u}k"><rect x="${px0}" y="${py0}" width="${px1-px0}" height="${py1-py0}"/></clipPath>
  </defs>
  <rect x="0" y="0" width="${w}" height="${h}" rx="${big?14:10}" fill="url(#${u}c)"/>
  <rect x="2" y="2" width="${w-4}" height="${h-4}" rx="${big?12:8}" fill="none" stroke="#ffffff" stroke-opacity=".08"/>`;
  /* the paper: toned stock, a fine grain, printed grid (green ink: minor every 5 rounds, major every 10), sprocket rows */
  s+=`<g clip-path="url(#${u}k)"><rect x="${px0}" y="${py0}" width="${px1-px0}" height="${py1-py0}" fill="url(#${u}p)"/><rect x="${px0}" y="${py0}" width="${px1-px0}" height="${py1-py0}" fill="#000" filter="url(#${u}n)"/>`;
  for(let i=0;i<=g.n;i+=5){const x=Xp(i).toFixed(1);s+=`<line x1="${x}" y1="${cy0}" x2="${x}" y2="${cy1}" stroke="#1d7a48" stroke-opacity="${i%10?.16:.34}" stroke-width="${i%10?.7:1}"/>`}
  const gs=g.ac?[.3,.35,.4,.45,.5,.55,.6,.65,.7,.75,.8]:g.grid;
  gs.forEach(v=>{const y=Y(v).toFixed(1),maj=g.ac?Math.round(v*100)%10===0:true;if(v===g.base)return;s+=`<line x1="${cx0}" y1="${y}" x2="${cx1}" y2="${y}" stroke="#1d7a48" stroke-opacity="${maj?.36:.16}" stroke-width="${maj?1:.7}"/>`});
  if(g.ac){/* the gold zone is printed on the paper before any pen touches it: the coin's exact range */
    s+=`<path d="${g.band}" fill="url(#${u}z)"/>`;[g.up,g.dn].forEach(p=>s+=`<path d="${g.d(p)}" fill="none" stroke="#a87400" stroke-width="1.3" stroke-dasharray="5 3"/>`);
    s+=t(cx1-6,cy1-7,sm-.5,big?'A COIN WRITES INSIDE THE GOLD':'A COIN WRITES IN THE GOLD',{a:'end',ff:mono,w:700,c:'#8a5c00',ls:'.02em'})}
  s+=`<line x1="${cx0}" y1="${Y(g.base).toFixed(1)}" x2="${cx1}" y2="${Y(g.base).toFixed(1)}" stroke="${g.ac?'#a87400':'#c0261d'}" stroke-width="1.5"/>`;
  g.grid.forEach(v=>{const y=Y(v);if(y<cy0-3||y>cy1+3)return;s+=t(cx0-6,y+sm*.36,sm-.5,g.fmt(v),{a:'end',ff:mono,w:700,c:v===g.base?(g.ac?'#8a5c00':'#a8201a'):'#2c4a33',op:.95})});
  s+=t(cx0,cy1+sm+8,sm-.5,'R1',{ff:mono,w:700,c:'#2c4a33'})+t(cx1,cy1+sm+8,sm-.5,'R'+g.n,{a:'end',ff:mono,w:700,c:'#2c4a33'});{const ml=g.ac?'ROUND BY ROUND →':'$100K ON EVERY TRADE →';if(ml.length*(sm-.5)*.62<(cx1-cx0)-80)s+=t((cx0+cx1)/2,cy1+sm+8,sm-.5,ml,{a:'middle',ff:mono,w:700,c:'#2c4a33',op:.8})}
  /* the ink: a slight bleed under each line, then the line; the golden ticket holder in gold ink with a dark edge */
  g.order.forEach(m=>{const d=g.d(g.pts(m)),ld=m===g.lead,c=W.col(X,m);
    s+=`<path d="${d}" fill="none" stroke="${c}" stroke-opacity=".22" stroke-width="${ld?5.5:4}" stroke-linejoin="round" stroke-linecap="round"/>`+(ld?`<path d="${d}" fill="none" stroke="#3a2600" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"/>`:'')+
     `<path d="${d}" fill="none" stroke="${c}" stroke-width="${ld?2.4:1.9}" stroke-linejoin="round" stroke-linecap="round"/>`});
  /* the sprocket holes, top and bottom margins */
  for(let x=px0+hole*1.6;x<px1;x+=hole*3.4){s+=`<rect x="${(x-hole/2).toFixed(1)}" y="${py0+hole*.6}" width="${hole}" height="${hole}" rx="1.4" fill="#0a0a0b"/><rect x="${(x-hole/2).toFixed(1)}" y="${(py1-hole*1.6).toFixed(1)}" width="${hole}" height="${hole}" rx="1.4" fill="#0a0a0b"/>`}
  /* the paper falls into the machine's shadow at its left (where the season trails off) */
  s+=`<rect x="${px0}" y="${py0}" width="${big?60:36}" height="${py1-py0}" fill="url(#${u}sh)"/></g>
   <linearGradient id="${u}sh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>`;
  /* the pen carriage: a brass rail at the right; each pen's arm runs from the rail to its line's end, nib in its ink */
  const rx=w-(big?40:28);
  s+=`<rect x="${rx-3}" y="${py0}" width="6" height="${py1-py0}" rx="3" fill="url(#${u}b)"/><rect x="${px1}" y="${py0}" width="2" height="${py1-py0}" fill="#000" opacity=".6"/>`;
  const ends=g.rank.map(m=>{const p=g.pts(m);return {m,y:p[p.length-1][1]}}).sort((a,b)=>a.y-b.y);
  /* the arms' mounts on the rail are spread so none overlap; the arms themselves meet their lines exactly */
  const gap=big?22:17;let prev=-1e9;ends.forEach(e=>{e.my=Math.max(e.y,prev+gap);prev=e.my});const over=prev-(py1-10);if(over>0)ends.forEach(e=>e.my-=over);
  ends.forEach(e=>{const ld=e.m===g.lead,c=W.col(X,e.m),nx=cx1;
    s+=`<path d="M${rx} ${e.my.toFixed(1)} L${(px1+8).toFixed(1)} ${e.my.toFixed(1)} L${(nx+7).toFixed(1)} ${e.y.toFixed(1)}" fill="none" stroke="#000" stroke-opacity=".7" stroke-width="${ld?5:4}" stroke-linecap="round" stroke-linejoin="round"/>`+
     `<path d="M${rx} ${e.my.toFixed(1)} L${(px1+8).toFixed(1)} ${e.my.toFixed(1)} L${(nx+7).toFixed(1)} ${e.y.toFixed(1)}" fill="none" stroke="url(#${u}b)" stroke-width="${ld?2.6:2}" stroke-linecap="round" stroke-linejoin="round"/>`+
     `<path d="M${(nx+9).toFixed(1)} ${(e.y-3.2).toFixed(1)} L${(nx-1).toFixed(1)} ${e.y.toFixed(1)} L${(nx+9).toFixed(1)} ${(e.y+3.2).toFixed(1)}Z" fill="${c}" stroke="#000" stroke-width=".8"/>`+
     `<circle cx="${rx}" cy="${e.my.toFixed(1)}" r="${ld?6:5}" fill="${ld?'#ffd21f':S.INK[e.m]}" stroke="#000" stroke-width="1.2"/>`});
  return s}};
S9.mount(W)})();
