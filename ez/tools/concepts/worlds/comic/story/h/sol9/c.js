/* C · THE PEG BOARD: the price board on the exchange floor, a board of green baize (the table you bet on) with brass pins.
   Each AI's record is a coloured cord wound round a pin at every round; a clerk moves the pins, the cord follows. The coin's
   exact range is a polished brass plate let into the baize: a cord that stays over the brass is a cord a coin could have
   strung; one that leaves the plate is past what luck explains. The P&L board is the same baize with a brass rail at $0.
   Smart or lucky reads as the oldest question on a trading floor: skill or a lucky streak at the table. */
(function(){const S=window.S7,S8=window.S8,S9=window.S9;
const W={id:'c',
 col:(X,m)=>m===S8.lead(X)?S.GD:S.INK[m],
 tag:{past:'Off the brass',in:'On the brass',under:'Under the brass'},
 h:(w,k)=>w>=560?Math.round(w*.48):Math.round(w*.8),
 svg(X,kind,w,h){const u=S9.uid(),t=S9.t,big=w>=560,sm=big?14:12.5,bc="'Barlow Condensed',sans-serif",fr=big?16:11;
  const g=S9.geo(X,kind,[fr+(kind==='pnl'?(big?66:52):(big?50:40)),fr+(big?20:16),w-fr-(big?20:14),h-fr-(big?34:30)]),{Y,Xp,cx0,cx1,cy0,cy1}=g;
  let s=`<defs>
   <radialGradient id="${u}f" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="#1c6a3a"/><stop offset=".6" stop-color="#0f4426"/><stop offset="1" stop-color="#06210f"/></radialGradient>
   <filter id="${u}n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 .08  0 0 0 0 0  0 0 0 .55 -.1"/><feComposite in2="SourceGraphic" operator="in"/></filter>
   <linearGradient id="${u}br" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".3" stop-color="#e9b94a"/><stop offset=".55" stop-color="#9a6a12"/><stop offset=".8" stop-color="#e7bb52"/><stop offset="1" stop-color="#7a5208"/></linearGradient>
   <linearGradient id="${u}pl" x1="0" y1="0" x2="1" y2=".25"><stop offset="0" stop-color="#d9a634"/><stop offset=".35" stop-color="#f6d77a"/><stop offset=".6" stop-color="#b58324"/><stop offset="1" stop-color="#e2b453"/></linearGradient>
   <radialGradient id="${u}pin" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#fff6c8"/><stop offset=".45" stop-color="#d9a634"/><stop offset="1" stop-color="#6b4606"/></radialGradient>
   <filter id="${u}sh" x="-5%" y="-5%" width="110%" height="120%"><feDropShadow dx="0" dy="${big?2.2:1.6}" stdDeviation="${big?1.6:1.2}" flood-color="#000" flood-opacity=".75"/></filter>
  </defs>
  <rect x="0" y="0" width="${w}" height="${h}" rx="6" fill="url(#${u}br)"/><rect x="3" y="3" width="${w-6}" height="${h-6}" rx="4" fill="#2b1a04"/>
  <rect x="${fr}" y="${fr}" width="${w-fr*2}" height="${h-fr*2}" fill="url(#${u}f)"/><rect x="${fr}" y="${fr}" width="${w-fr*2}" height="${h-fr*2}" fill="#000" filter="url(#${u}n)"/>
  <rect x="${fr}" y="${fr}" width="${w-fr*2}" height="${h-fr*2}" fill="none" stroke="#000" stroke-opacity=".6" stroke-width="3"/>`;
  if(g.ac){/* the brass plate: the coin's exact range, let into the baize, polished, two screws */
    s+=`<path d="${g.band}" fill="#000" opacity=".45" transform="translate(0 2)"/><path d="${g.band}" fill="url(#${u}pl)" opacity=".36"/><path d="${g.band}" fill="none" stroke="#fff0b0" stroke-opacity=".7" stroke-width="1"/>`;
    s+=t(cx1-4,Math.min(cy1-6,(g.dn[g.n][1]+cy1)/2+sm*.36),sm,big?'A COIN’S CORD STAYS ON THE BRASS':'A COIN STAYS ON THE BRASS',{a:'end',ff:bc,w:800,c:'#ffd76a',ls:'.05em'})}
  /* the scale: brass tacks down the left at each step, the step engraved beside them; a brass rail at 50% (or $0) */
  g.grid.forEach(v=>{const y=Y(v);if(y<cy0-3||y>cy1+3)return;if(v!==g.base)s+=`<line x1="${cx0}" y1="${y.toFixed(1)}" x2="${cx1}" y2="${y.toFixed(1)}" stroke="#d7f0c8" stroke-opacity=".09" stroke-width="1"/>`;
    s+=`<circle cx="${cx0-4}" cy="${y.toFixed(1)}" r="2.2" fill="url(#${u}pin)"/>`+t(cx0-10,y+sm*.36,sm,g.fmt(v),{a:'end',ff:bc,w:800,c:v===g.base?'#ffd76a':'#e7dcb8',op:v===g.base?1:.85})});
  s+=`<rect x="${cx0}" y="${(Y(g.base)-1.6).toFixed(1)}" width="${cx1-cx0}" height="3.2" fill="url(#${u}pl)" filter="url(#${u}sh)"/>`;
  s+=t(cx0,cy1+sm+10,sm,'R1',{ff:bc,w:800,c:'#e7dcb8',op:.85})+t(cx1,cy1+sm+10,sm,'R'+g.n,{a:'end',ff:bc,w:800,c:'#e7dcb8',op:.85})+t((cx0+cx1)/2,cy1+sm+10,sm,g.ac?'ROUND BY ROUND':'$100K ON EVERY TRADE',{a:'middle',ff:bc,w:800,c:'#e7dcb8',op:.6,ls:'.08em'});
  /* the cords: a shadow on the baize, the cord, a twist drawn as short light dashes; a pin every 5 rounds, a big pin at the end */
  const step=g.n>60?5:4;
  g.order.forEach(m=>{const p=g.pts(m),d=g.d(p),ld=m===g.lead,c=W.col(X,m),cw=ld?3.6:2.8;
    s+=`<g filter="url(#${u}sh)"><path d="${d}" fill="none" stroke="${c}" stroke-width="${cw}" stroke-linejoin="round" stroke-linecap="round"/></g>`+
     `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".14" stroke-width="${cw}" stroke-dasharray="1.2 3" stroke-linejoin="round"/>`+
     `<path d="${d}" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="${(cw*.35).toFixed(2)}" stroke-dasharray="1.6 2.4" stroke-dashoffset="2" stroke-linejoin="round" transform="translate(0 -.6)"/>`;
    for(let i=step;i<p.length-1;i+=step)s+=`<circle cx="${p[i][0].toFixed(1)}" cy="${p[i][1].toFixed(1)}" r="${big?2.4:1.8}" fill="url(#${u}pin)"/>`});
  s+=`<circle cx="${cx0}" cy="${Y(g.base).toFixed(1)}" r="${big?6:5}" fill="url(#${u}pin)" filter="url(#${u}sh)"/>`;
  g.rank.forEach(m=>{const p=g.pts(m),q=p[p.length-1],ld=m===g.lead;s+=`<g filter="url(#${u}sh)"><circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${ld?(big?8:7):(big?6.5:5.5)}" fill="${W.col(X,m)}" stroke="#2b1a04" stroke-width="1.4"/></g><circle cx="${(q[0]-1.5).toFixed(1)}" cy="${(q[1]-1.8).toFixed(1)}" r="${ld?2.4:1.8}" fill="#fff" opacity=".55"/>`});
  return s}};
S9.mount(W)})();
