/* q9 "Ligne claire": one round as one album page in the clear line (Herge, Moebius).
   Uniform line, flat colour, no shading, detailed settings, every panel readable at a glance.
   Tier 1 Locked (London; the four AIs say their calls), tier 2 The close (the tower strikes 16:30; Shell's own price sign
   answers), tier 3 Graded (each AI reacts; stamp; the money on the call), tier 4 the archive shelf (Round 66 joins the record).
   Phones read one tier per tap; desktop fills the album page tier by tier. Numbers from ROUNDS, CO_LOGOS, __x2pPnl(). */
(function(){'use strict';
const D=document,H=D.documentElement,ID='q9',RN=66;
try{
if(D.getElementById(ID))return;
const fl=D.createElement('link');fl.rel='stylesheet';
fl.href='https://fonts.googleapis.com/css2?family=Lilita+One&family=Patrick+Hand+SC&family=Patrick+Hand&display=swap';D.head.appendChild(fl);
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{const [m,d]=String(s).split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const pc=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const r=ROUNDS.find(x=>+x.n===RN),P=window.__x2pPnl().A;
const co=(window.TICKERS||{})[r.ticker]||r.co||r.ticker,CO=co+' ('+r.ticker+')';
const L=(window.CO_LOGOS||{})[r.ticker];
const C={};(r.calls||[]).forEach(c=>{C[c[0]]={...call(c[1]),off:+c[2]}});
const up=r.a>0,right=m=>C[m]&&C[m].up===up,win=String(r.win||'').split(' & ').filter(m=>MODELS[m]);
const per=m=>((P[m].per||{})[RN]||{}).v;
const lead=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl)[0];
const INK='#1b1a22',SW='stroke="#1b1a22" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"';
const JK={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#3a3542'};
const TX={GPT:'#fff',KIMI:'#fff',CLAUDE:'#1b1a22',GROK:'#fff'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');

/* a character: head = the AI's own mark, flat jacket in its colour, arms tell the call or the verdict */
function fig(m,x,y,pose,s){const M=MODELS[m],j=JK[m];s=s||1;const sl=pose==='slump';const hy=sl?20:14;
  const arm=(x1,y1,x2,y2,x3,y3)=>`<path d="M${x1} ${y1}Q${x2} ${y2} ${x3} ${y3}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><path d="M${x1} ${y1}Q${x2} ${y2} ${x3} ${y3}" fill="none" stroke="${j}" stroke-width="5.5" stroke-linecap="round"/><circle cx="${x3}" cy="${y3}" r="4" fill="#f1c9a0" ${SW}/>`;
  const A={up:arm(14,38,26,26,24,4)+arm(-14,38,-20,52,-19,64),
    down:arm(14,38,24,52,26,72)+arm(-14,38,-20,52,-19,64),
    cheer:arm(14,38,28,26,26,4)+arm(-14,38,-28,26,-26,4),
    slump:arm(14,42,18,58,15,72)+arm(-14,42,-18,58,-15,72)}[pose];
  return `<g transform="translate(${x} ${y}) scale(${s})" class="q9-fig" data-ai="${m}">
    <path d="M-7 70 L-9 100M7 70 L9 100" ${SW} stroke-width="5" fill="none"/><path d="M-7 70 L-9 100M7 70 L9 100" stroke="#3b3f5c" stroke-width="3" fill="none" stroke-linecap="round"/>
    <ellipse cx="-11" cy="101" rx="7" ry="3" fill="${INK}"/><ellipse cx="11" cy="101" rx="7" ry="3" fill="${INK}"/>
    <path d="M-15 ${sl?36:32}Q-17 54 -13 72H13Q17 54 15 ${sl?36:32}Q0 ${sl?30:26} -15 ${sl?36:32}Z" fill="${j}" ${SW}/>
    <path d="M-4 ${sl?33:29}L0 ${sl?40:36}L4 ${sl?33:29}" fill="none" ${SW}/>
    ${A}
    <circle cx="0" cy="${hy}" r="15" fill="${M.bg}" ${SW}/>
    <g transform="translate(-9.6 ${hy-9.6}) scale(.8)"><path d="${M.d}" fill="${M.fg}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc||M.fg}"/>`:''}</g>
  </g>`}
/* a balloon in the speaker's own flat colour, its tail to the speaker's head */
function bal(m,cx,cy,w,lines,tx,ty){const h=14+lines.length*14,x=cx-w/2,y=cy-h/2;
  return `<g class="q9-bal" data-ai="${m}"><path d="M${cx-8} ${y+h-2}L${tx} ${ty}L${cx+8} ${y+h-2}Z" fill="${JK[m]}" ${SW}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h/2}" fill="${JK[m]}" ${SW}/><path d="M${cx-7} ${y+h-1.2}H${cx+7}" stroke="${JK[m]}" stroke-width="3"/>
    ${lines.map((t,i)=>`<text x="${cx}" y="${y+18+i*14}" text-anchor="middle" fill="${TX[m]}" class="${i?'q9-bt':'q9-bn'}">${t}</text>`).join('')}</g>`}
const tri=(u,x,y,s,c)=>`<path d="${u?`M${x} ${y-s}L${x+s} ${y+s*.7}H${x-s}Z`:`M${x} ${y+s}L${x+s} ${y-s*.7}H${x-s}Z`}" fill="${c||(u?'#1f9d55':'#d6382f')}" ${SW}/>`;
const logoImg=(x,y,s)=>L?`<rect x="${x-4}" y="${y-4}" width="${s+8}" height="${s+8}" rx="4" fill="#fff6dc" ${SW}/><image href="media/${L.f}" x="${x}" y="${y}" width="${s}" height="${s}" class="q9-lg" data-logo="1"/>`:'';
const cloud=(x,y,s)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0 14Q-2 4 8 4Q10 -4 20 0Q28 -6 34 2Q44 0 42 10Q48 16 40 18H2Q-4 18 0 14Z" fill="#fdfaf0" ${SW}/>`;
const win1=(x,y,w,h,c)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" ${SW}/>`;

/* ---------- the station, drawn once (canopy in Shell's red and yellow, pumps, kiosk, the sign) ---------- */
const canopy=(x,y,w)=>`<rect x="${x}" y="${y}" width="${w}" height="9" fill="#f6c21c" ${SW}/><rect x="${x}" y="${y+9}" width="${w}" height="9" fill="#dd2a1f" ${SW}/><rect x="${x}" y="${y+18}" width="${w}" height="4" fill="#f6c21c" ${SW}/>`;
const pump=(x,y)=>`<g transform="translate(${x} ${y})"><rect x="-9" y="0" width="18" height="34" rx="3" fill="#dd2a1f" ${SW}/><rect x="-6" y="4" width="12" height="9" fill="#cfe7f3" ${SW}/><circle cx="0" cy="-5" r="6" fill="#f6c21c" ${SW}/><path d="M9 14Q16 16 15 28" fill="none" ${SW}/><rect x="-11" y="34" width="22" height="4" fill="#8b8f9e" ${SW}/></g>`;

/* tier 1: London establishing shot + the four calls */
const sky='#7db7de',river='#3f78a3',bank='#c99c62';
const pA=`<svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <rect x="-300" y="-60" width="960" height="340" fill="${sky}"/>${cloud(24,30,1.1)}${cloud(150,18,.8)}${cloud(250,46,.9)}
  <g class="q9-city">
    <rect x="-300" y="118" width="960" height="30" fill="#9db7c9" ${SW}/>
    <path d="M18 118V84H26V118M54 118V84H62V118" fill="#b6c0cc" ${SW}/><path d="M16 84L22 70L28 84ZM52 84L58 70L64 84Z" fill="#6f7f95" ${SW}/>
    <rect x="16" y="92" width="48" height="5" fill="#5f87b0" ${SW}/><path d="M-20 118Q22 104 22 118M62 118Q100 104 120 118" fill="none" ${SW}/>
    <path d="M128 118V96H170V118" fill="#d8c9a6" ${SW}/><path d="M136 96Q149 74 162 96Z" fill="#a9b3bd" ${SW}/><path d="M149 76V68" ${SW}/>
    ${[0,1,2,3].map(i=>`<rect x="${176+i*14}" y="${100-i%2*8}" width="12" height="${18+i%2*8}" fill="${['#c5a77d','#a7b2c4','#d8c9a6','#9fb0a0'][i]}" ${SW}/>`).join('')}
  </g>
  <rect x="-300" y="148" width="960" height="34" fill="${river}" ${SW}/>
  <path d="M10 160h22M60 170h30M120 158h18M170 168h26M30 176h16" stroke="#b9dbef" stroke-width="2" stroke-linecap="round"/>
  <path d="M84 156h34l-5 8h-25Z" fill="#fdfaf0" ${SW}/><path d="M100 156V140l10 14Z" fill="#dd2a1f" ${SW}/>
  <rect x="-300" y="182" width="960" height="60" fill="${bank}" ${SW}/>
  <g class="q9-stn">
    <rect x="222" y="134" width="96" height="48" fill="#f2e3c2" ${SW}/>${win1(232,146,22,20,'#9fd0ea')}${win1(260,146,22,20,'#9fd0ea')}<rect x="290" y="146" width="18" height="36" fill="#7a4a2c" ${SW}/>
    ${canopy(206,108,140)}<rect x="214" y="130" width="6" height="52" fill="#fdfaf0" ${SW}/><rect x="334" y="130" width="6" height="52" fill="#fdfaf0" ${SW}/>
    ${pump(250,146)}${pump(296,146)}
    <rect x="190" y="104" width="5" height="78" fill="#8b8f9e" ${SW}/>
    ${logoImg(172,64,40)}
  </g>
</svg>`;
const pB=`<svg viewBox="0 76 360 224" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="-300" y="-50" width="960" height="400" fill="#e7c48c"/>
  <rect x="-300" y="150" width="960" height="12" fill="#c99c62" ${SW}/><path d="M-300 230H660M-300 270H660" stroke="#b9895a" stroke-width="2"/>
  <rect x="-300" y="96" width="960" height="54" fill="#f2e3c2" ${SW}/>${[0,1,2,3,4,5].map(i=>win1(-10+i*66,106,46,34,'#9fd0ea')).join('')}
  ${canopy(-300,82,960)}
  ${pump(12,190)}${pump(348,190)}
  ${ORDER.map((m,i)=>{const x=54+i*84,c=C[m];return fig(m,x,182,c.up?'up':'down')}).join('')}
  ${ORDER.map((m,i)=>{const x=54+i*84,c=C[m];return bal(m,x,116,80,[NM[m],`${c.up?'Up':'Down'} ${pc(c.v)}`],x+(i<2?4:-4),168)}).join('')}
  ${ORDER.map((m,i)=>tri(C[m].up,54+i*84+30,122,5)).join('')}
</svg>`;

/* tier 2: the tower strikes the London close; Shell's own price sign answers */
const ang=(h,m)=>[((h%12)+m/60)*30,m*6];
const [ha,ma]=ang(4,30);
const pC=`<svg viewBox="0 0 170 380" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="-300" y="-60" width="770" height="500" fill="#f2a65a"/>${cloud(-6,70,.7)}
  <rect x="58" y="96" width="54" height="290" fill="#d8b97c" ${SW}/>
  ${[0,1,2,3,4,5,6].map(i=>`<path d="M66 ${180+i*28}h38M66 ${190+i*28}V${204+i*28}M85 ${190+i*28}V${204+i*28}M104 ${190+i*28}V${204+i*28}" ${SW} fill="none"/>`).join('')}
  <path d="M54 96L85 30L116 96Z" fill="#5f6f86" ${SW}/><path d="M85 30V8" ${SW}/><circle cx="85" cy="8" r="3" fill="#f6c21c" ${SW}/>
  <rect x="52" y="100" width="66" height="70" fill="#c9a56a" ${SW}/>
  <circle class="q9-face" cx="85" cy="135" r="27" fill="#fdf3d8" ${SW}/>
  ${Array.from({length:12},(_,i)=>{const a=i*30*Math.PI/180;return `<path d="M${85+22*Math.sin(a)} ${135-22*Math.cos(a)}L${85+25*Math.sin(a)} ${135-25*Math.cos(a)}" ${SW}/>`}).join('')}
  <path d="M85 135L${85+14*Math.sin(ha*Math.PI/180)} ${135-14*Math.cos(ha*Math.PI/180)}" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M85 135L${85+21*Math.sin(ma*Math.PI/180)} ${135-21*Math.cos(ma*Math.PI/180)}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M-300 330H0V310l8-10 8 10V330H40V300l8-12 8 12V330H114V300l8-12 8 12V330H154V310l8-10 8 10V330H470V420H-300Z" fill="#c7a873" ${SW}/>${[0,1,2,3,4,5,6,7].map(i=>`<rect x="${-6+i*24}" y="342" width="8" height="14" fill="#7a5a34" ${SW}/>`).join("")}
  <g class="q9-dong"><text x="88" y="218" class="q9-sfx" text-anchor="middle" transform="rotate(-8 88 218)">DONG!</text><path d="M120 120l16-8M122 136h18M120 152l16 8" ${SW} fill="none"/></g>
</svg>`;
const pD=`<svg viewBox="0 0 190 380" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="-300" y="-60" width="790" height="500" fill="#f2a65a"/>
  ${canopy(-300,250,790)}<rect x="-300" y="272" width="790" height="140" fill="#e7c48c" ${SW}/>
  <rect x="88" y="150" width="14" height="230" fill="#8b8f9e" ${SW}/>
  <rect x="34" y="20" width="122" height="196" rx="6" fill="#f6c21c" ${SW}/>
  ${L?`<rect x="70" y="28" width="50" height="50" rx="5" fill="#fff6dc" ${SW}/><image href="media/${L.f}" x="74" y="32" width="42" height="42" class="q9-lg" data-logo="1"/>`:''}
  <rect x="44" y="88" width="102" height="26" fill="#2b2f45" ${SW}/><text x="95" y="107" text-anchor="middle" class="q9-sign">${esc(r.ticker)}</text>
  <g class="q9-flap"><rect x="44" y="120" width="102" height="54" fill="#2b2f45" ${SW}/><path d="M44 147H146" stroke="#1b1a22" stroke-width="2"/>
    ${tri(up,58,147,8,up?'#3ccf6e':'#ff5a4c')}<text x="106" y="160" text-anchor="middle" class="q9-mv" fill="${up?'#7dfc9c':'#ff8a80'}">${up?'+':'−'}${pc(r.a)}</text></g>
  <rect x="44" y="180" width="102" height="26" fill="#2b2f45" ${SW}/><text x="95" y="199" text-anchor="middle" class="q9-sign">${md(r.resolves).toUpperCase()}</text>
  <text x="146" y="244" class="q9-sfx q9-sfx-s" text-anchor="middle" transform="rotate(-6 146 244)">CLACK!</text>
  ${pump(30,300)}${pump(160,300)}<g transform="translate(60 312)"><path d="M0 26V14Q2 4 14 2H50Q62 4 68 14H76Q82 16 82 26Z" fill="#7aa6c8" stroke="#1b1a22" stroke-width="2" stroke-linejoin="round"/><rect x="18" y="6" width="16" height="9" fill="#cfe7f3" stroke="#1b1a22" stroke-width="2"/><rect x="38" y="6" width="16" height="9" fill="#cfe7f3" stroke="#1b1a22" stroke-width="2"/><circle cx="16" cy="27" r="7" fill="#3b3f5c" stroke="#1b1a22" stroke-width="2"/><circle cx="64" cy="27" r="7" fill="#3b3f5c" stroke="#1b1a22" stroke-width="2"/></g>
</svg>`;

/* tier 3: each AI reacts to the verdict */
const pG=m=>{const ok=right(m),w=win.includes(m),v=per(m),ld=m===lead;
  return `<svg viewBox="0 0 180 236" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="-300" y="-60" width="780" height="330" fill="${ok?'#a9d8b5':'#e3a79f'}"/>
  <rect x="-300" y="132" width="780" height="140" fill="${ok?'#7fbf93':'#c9877f'}" ${SW}/>
  ${canopy(-300,0,780)}<rect x="-300" y="22" width="780" height="30" fill="#f2e3c2" ${SW}/>${[0,1,2,3].map(i=>win1(-6+i*52,28,38,18,'#9fd0ea')).join('')}
  <g transform="translate(152 66)"><rect x="-2" y="40" width="6" height="30" fill="#8b8f9e" ${SW}/><rect x="-28" y="0" width="58" height="42" rx="3" fill="#f6c21c" ${SW}/><rect x="-24" y="6" width="50" height="30" fill="#2b2f45" ${SW}/><text x="1" y="25" text-anchor="middle" class="q9-mvs" fill="${up?'#7dfc9c':'#ff8a80'}">${up?'+':'\u2212'}${pc(r.a)}</text></g>
  ${pump(30,96)}
  ${fig(m,98,94,ok?'cheer':'slump',1)}
  ${w?`<g class="q9-laurel"><path d="M74 96Q70 70 86 58M122 96Q126 70 110 58" fill="none" stroke="#c99a17" stroke-width="4" stroke-linecap="round"/>${[0,1,2,3].map(i=>`<ellipse cx="${76+i*2}" cy="${88-i*9}" rx="5" ry="2.6" fill="#e9b829" ${SW} transform="rotate(-50 ${76+i*2} ${88-i*9})"/><ellipse cx="${120-i*2}" cy="${88-i*9}" rx="5" ry="2.6" fill="#e9b829" ${SW} transform="rotate(50 ${120-i*2} ${88-i*9})"/>`).join('')}</g>`:''}
  ${ld?`<g class="q9-gt" transform="translate(124 150) rotate(-14)"><rect x="0" y="0" width="38" height="22" rx="2" fill="#f2c230" ${SW}/><path d="M6 6h26M6 11h18M6 16h22" stroke="#9c7208" stroke-width="1.6"/></g>`:''}
  <g class="q9-stamp" transform="translate(44 70) rotate(${ok?-10:9})"><rect x="-30" y="-14" width="60" height="28" rx="4" fill="${ok?'#1f9d55':'#d6382f'}" ${SW}/><text x="0" y="7" text-anchor="middle" class="q9-st">${ok?'PASS':'FAIL'}</text></g>
  </svg>`};
const gradeCap=m=>{const v=per(m),w=win.includes(m),ld=m===lead;return `<p class="q9-cap q9-cap-b"><b>${NM[m]}</b> <span class="${v>=0?'q9-pv':'q9-nv'}">${pm(v)}</span> on the call${w?`<em class="q9-w">Winner · ${pc(C[m].off)} off</em>`:''}${ld?`<em class="q9-g">Still holds the golden ticket</em>`:''}</p>`};

/* tier 4: the archive shelf; Round 66 slides into its gap */
const byN=ROUNDS.slice().sort((a,b)=>a.n-b.n),ix=byN.findIndex(x=>+x.n===RN);
const row=byN.slice(Math.max(0,ix-5),ix+6);
const spines=row.map((x,i)=>{const X=12+i*31.5,me=+x.n===RN,h=118-(i%3)*8;
  if(me)return `<g class="q9-in"><rect x="${X}" y="${44}" width="28" height="${h}" fill="#f6c21c" ${SW}/><rect x="${X}" y="${44}" width="28" height="12" fill="#dd2a1f" ${SW}/>
    <text x="${X+14}" y="${70}" text-anchor="middle" class="q9-sn q9-sn-me">${x.n}</text><text transform="translate(${X+18} ${80}) rotate(90)" class="q9-snt">${esc(CO)}</text></g>`;
  return `<rect x="${X}" y="${178-h}" width="28" height="${h}" fill="${['#3f6fa6','#7a4a2c','#2f7d5a','#8b3f5f','#5b5f8a'][i%5]}" ${SW}/><rect x="${X}" y="${178-h}" width="28" height="10" fill="${x.a>0?'#3ccf6e':'#ff5a4c'}" ${SW}/>
    <text x="${X+14}" y="${178-h+26}" text-anchor="middle" class="q9-sn">${x.n}</text><text transform="translate(${X+18} ${178-h+34}) rotate(90)" class="q9-snt">${esc(((window.TICKERS||{})[x.ticker]||x.ticker))} (${esc(x.ticker)})</text>`}).join('');
const pE=`<svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
  <rect x="-300" y="-60" width="960" height="420" fill="#c98f52"/>
  ${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${-300+i*130} -60V360" stroke="#b47c43" stroke-width="2"/>`).join('')}
  <rect x="2" y="12" width="356" height="176" fill="#7a4a2c" ${SW}/><rect x="8" y="18" width="344" height="160" fill="#4a2c19" ${SW}/>
  ${spines}
  <rect x="2" y="178" width="356" height="12" fill="#9b6236" ${SW}/>
  <rect x="2" y="196" width="356" height="96" fill="#7a4a2c" ${SW}/><rect x="8" y="202" width="344" height="80" fill="#4a2c19" ${SW}/>
  ${Array.from({length:11},(_,i)=>`<rect x="${12+i*31.5}" y="${206+(i%2)*6}" width="28" height="${70-(i%2)*6}" fill="${['#5b5f8a','#3f6fa6','#8b3f5f','#2f7d5a'][i%4]}" ${SW}/>`).join('')}
  <rect x="2" y="282" width="356" height="12" fill="#9b6236" ${SW}/>
  <g transform="translate(130 240)"><rect x="0" y="0" width="100" height="26" rx="3" fill="#e9b829" ${SW}/><text x="50" y="18" text-anchor="middle" class="q9-plq">SEASON 1</text></g>
</svg>`;

const root=D.createElement('div');root.id=ID;root.setAttribute('role','region');root.setAttribute('aria-label','One round, start to finish: round 66, '+CO);
root.innerHTML=`<div class="q9-page">
  <header class="q9-ttl" data-panel="title"><span class="q9-ttl-r">Round ${RN}</span><span class="q9-ttl-c">${esc(CO)}</span></header>
  <section class="q9-tier q9-t1" data-t="1" aria-label="Locked">
    <figure class="q9-pn q9-pa" data-panel="London">${pA}<p class="q9-cap">London, ${md(r.called)}. ${esc(CO)} reports.</p></figure>
    <figure class="q9-pn q9-pb" data-panel="the calls">${pB}<p class="q9-cap q9-cap-b">The calls lock before the report.</p></figure>
  </section>
  <section class="q9-tier q9-t2" data-t="2" aria-label="The close">
    <figure class="q9-pn q9-pc" data-panel="the tower">${pC}<p class="q9-cap q9-cap-b">16:30. The London close.</p></figure>
    <figure class="q9-pn q9-pd" data-panel="the sign">${pD}<p class="q9-cap q9-cap-b">The market answers.</p></figure>
  </section>
  <section class="q9-tier q9-t3" data-t="3" aria-label="Graded">
    ${ORDER.map(m=>`<figure class="q9-pn q9-pg" data-panel="${NM[m]}">${pG(m)}${gradeCap(m)}</figure>`).join('')}
  </section>
  <section class="q9-tier q9-t4" data-t="4" aria-label="The record">
    <figure class="q9-pn q9-pe" data-panel="the shelf">${pE}<p class="q9-cap">Round ${RN} joins the record. Every round stays here.</p></figure>
    <button class="q9-open" type="button" data-panel="next section">Every round so far <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v11M3 8l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </section>
</div>
<nav class="q9-nav" aria-label="Beats">${['Locked','The close','Graded','The record'].map((t,i)=>`<button type="button" data-go="${i+1}"><b>${i+1}</b> ${t}</button>`).join('')}<button class="q9-next" type="button" data-next>Next</button></nav>`;
const book=D.getElementById('wc-book');book.parentNode.insertBefore(root,book);H.classList.add('q9-on');

let beat=1;
const desk=()=>innerWidth>=1000;
function go(n,instant){beat=Math.max(1,Math.min(4,n));root.dataset.beat=beat;
  root.querySelectorAll('.q9-tier').forEach(t=>{const k=+t.dataset.t;const sh=desk()?(k<=beat&&k>=beat-2):k===beat;t.dataset.shown=sh?'1':'0';t.classList.toggle('q9-cur',k===beat);t.classList.toggle('q9-past',sh&&k<beat)});
  root.querySelectorAll('[data-go]').forEach(b=>b.setAttribute('aria-current',+b.dataset.go===beat?'step':'false'));
  root.querySelector('.q9-next').textContent=beat<4?'Next':'Again';
  const cur=root.querySelector(`.q9-tier[data-t="${beat}"]`);cur.classList.remove('q9-play');if(!instant&&!RM()){void cur.offsetWidth;cur.classList.add('q9-play')}}
root.addEventListener('click',e=>{const g=e.target.closest('[data-go]'),n=e.target.closest('[data-next]');if(g)go(+g.dataset.go);else if(n)go(beat<4?beat+1:1)});
addEventListener('resize',()=>go(beat,true));
window.__qGo=go;go(1,true);H.classList.add(ID+'-ready');
}catch(e){window.__qErr=e;H.classList.add(ID+'-ready')}
})();
