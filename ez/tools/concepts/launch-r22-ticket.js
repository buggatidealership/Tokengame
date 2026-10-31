// Round 22 (owner, 2026-10-23: of the proof mockups "my favorite one... is the ticket" (round 20, option 1), "but then it has to be
// for ROI, hit rate, average miss, and sector. So can you show me how those sections would look like?"). The bet ticket's card for all
// four views, every mark printed on it: lines in ink that lets the card through, the view's #1 hot-foil stamped (the NVIDIA recipe),
// logos printed onto the stock, numbers pressed in ink, the four views as printed boxes with the open one in foil. One rule for gold
// on every view: the view's own #1 (ROI: the most money; Hit rate: the most often right; Avg miss: the closest).
// Data: ROI from the page's own tiles and chart; hit rate and avg miss computed from ez-data.js like the page; sector from the page's grid.
// node launch-r22-ticket.js <outdir> [width]   writes r22-{roi,hit,miss,sector}-<width>.png
const { chromium } = require('playwright');const fs=require('fs'),path=require('path');
const OUT=process.argv[2]||'.',W=+process.argv[3]||390;
const S='html.x2p.x2d[data-theme] #learn';
const COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
global.window=global;eval(fs.readFileSync(path.join(__dirname,'..','..','ez-data.js'),'utf8').replace(/^\s*(const|let) /gm,'var '));
const MK=['GPT','KIMI','CLAUDE','GROK'],GR=SHEET.filter(r=>r[12]!==''&&r[12]!=null),NR=GR.length;
// per AI: running hit rate after each call (by round), calls with their miss and direction, X2's numbers
const ST={};MK.forEach((m,i)=>{const d=3+2*i;let n=0,k=0;const run=[],calls=[];GR.forEach((r,j)=>{if(!r[d])return;const up=r[d]==='UP',mv=+r[12],ok=(up&&mv>0)||(!up&&mv<0);n++;if(ok)k++;
  run.push([j,k/n*100]);calls.push({ok,miss:Math.abs((up?1:-1)*+r[d+1]-mv)})});ST[m]={name:m,n,k,hit:k/n,run,calls,miss:calls.reduce((s,c)=>s+c.miss,0)/n}});
const byHit=MK.slice().sort((a,b)=>{const qa=ST[a].n>=NR/2,qb=ST[b].n>=NR/2;return qa!==qb?(qa?-1:1):(ST[b].hit-ST[a].hit)||(ST[a].miss-ST[b].miss)});
const byMiss=MK.slice().sort((a,b)=>ST[a].miss-ST[b].miss);
const INK='rgba(20,18,23,.88)',PRESS='0 1px 0 rgba(255,251,238,.75),0 -.6px 0 rgba(0,0,0,.2)';
const SCAL='radial-gradient(5px at 0 50%,#0000 97%,#000) 0 0/51% 12px repeat-y,radial-gradient(5px at 100% 50%,#0000 97%,#000) 100% 0/51% 12px repeat-y';
const CSS=`
 ${S} .rsw2,${S} #rflip{display:none!important}
 ${S} .q{position:relative;margin:16px 0 0;color:${INK}}
 ${S} .q .tnum{font-variant-numeric:tabular-nums lining-nums}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:4px;transform:none!important;margin:0!important;box-shadow:none!important}
 ${S} .q .lg svg{width:66%;height:66%}
 ${S} .q .lp .lg{mix-blend-mode:multiply;opacity:.92}
 ${S} .q .fo{position:relative;display:inline-block;font-style:normal;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:0 -1px 0 rgba(70,42,6,.55),0 1.2px 0 rgba(255,250,232,.85)!important}
 ${S} .q .fo::after{content:attr(data-t);position:absolute;left:0;top:0;right:0;text-shadow:none;white-space:nowrap;
   background:var(--paper) 0 0/240px 240px,linear-gradient(172deg,#f6dc93 0%,#e4b54a 30%,#c99227 52%,#e7bd5b 70%,#bf8a22 100%);background-blend-mode:multiply,normal;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
 ${S} .q-u{color:rgba(29,107,60,.95)}${S} .q-d{color:rgba(163,34,26,.95)}
 /* the ticket */
 ${S} .q-tk{filter:drop-shadow(4px 5px 0 #000)}
 ${S} .q-tk .t-cd{position:relative;background:var(--paper) 0 0/240px 240px,#efe4c8;-webkit-mask:${SCAL};mask:${SCAL}}
 ${S} .q-tk .t-bd{display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 18px;font:800 8.6px/1 "Barlow Condensed",sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#f3ead3}
 ${S} .q-tk .t-bd i{font-style:normal;color:#f2b632}
 ${S} .q-tk .t-bd.g{background:var(--paper) 0 0/240px 240px,#1f7a45;background-blend-mode:multiply}${S} .q-tk .t-bd.r{background:var(--paper) 0 0/240px 240px,#c8372a;background-blend-mode:multiply}
 ${S} .q-tk .t-in{margin:8px 13px;padding:9px 10px 8px;border:1.5px solid rgba(20,18,23,.7);outline:.7px solid rgba(20,18,23,.5);outline-offset:-5px}
 ${S} .q-tk .t-tb{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(20,18,23,.5);margin:2px 0 6px}
 ${S} .q-tk .t-tb span{display:grid;place-items:center;height:30px;font:400 12px/1 Anton,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.48);text-shadow:${PRESS};white-space:nowrap}
 ${S} .q-tk .t-tb span+span{border-left:1px solid rgba(20,18,23,.3)}${S} .q-tk .t-tb span.on{font-size:15px}
 ${S} .q-tk .t-r{display:grid;grid-template-columns:12px 20px minmax(0,1fr) auto 64px;align-items:center;column-gap:7px;height:27px;border-bottom:1px dotted rgba(20,18,23,.45)}
 ${S} .q-tk .t-r .lg{width:19px;height:19px}
 ${S} .q-tk .t-r>b,${S} .q-tk .t-r .nm,${S} .q-tk .t-r .v,${S} .q-tk .t-r .c{font:400 15px/1 Anton,sans-serif;text-shadow:${PRESS}}
 ${S} .q-tk .t-r .nm{letter-spacing:.05em;text-transform:uppercase}${S} .q-tk .t-r .nm .fo{font-size:17px}
 ${S} .q-tk .t-r .c{justify-self:end;font-size:12.5px}${S} .q-tk .t-r .c.big{font-size:16px}
 ${S} .q-tk .t-r .v.sm{font:600 12px/1 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.72);text-shadow:none}
 ${S} .q-tk .q-ch{position:relative;margin-top:12px}
 ${S} .q-tk .q-ch>svg{position:absolute;left:0;top:0;overflow:visible}${S} .q-tk .q-ch>svg.ink{mix-blend-mode:multiply}
 ${S} .q-tk .q-lb{position:absolute;transform:translateY(-50%);display:flex;align-items:center;gap:4px;white-space:nowrap}
 ${S} .q-tk .q-lb .lg{width:15px;height:15px}
 ${S} .q-tk .q-lb b{font:400 13px/1 Anton,sans-serif;letter-spacing:.04em;color:color-mix(in srgb,var(--c) 82%,#141217);text-shadow:${PRESS}}${S} .q-tk .q-lb b.fo{font-size:14px}
 ${S} .q-tk .q-yl{position:absolute;left:0;transform:translateY(-50%);font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;color:rgba(20,18,23,.6)}
 ${S} .q-tk .q-ax{position:relative;height:14px;font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.72)}
 ${S} .q-tk .q-ax span{position:absolute;top:3px}${S} .q-tk .q-ax span:last-child{right:0}
 ${S} .q-tk .q-ax span.q-k{left:50%;transform:translateX(-50%);white-space:nowrap}
 ${S} .q-tk .q-ax span.q-k::before{content:"";display:inline-block;width:18px;margin-right:5px;vertical-align:3px;border-top:1.5px dashed currentColor}
 ${S} .q-tk .t-cp{margin:6px 0 0;font:600 11px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.74)}${S} .q-tk .t-cp b{color:${INK}}
 /* avg miss: four targets printed in red ink on the card, one ink dot per call, a red dot outside for a wrong direction */
 ${S} .q-tk .t-tg{display:grid;grid-template-columns:1fr 1fr;gap:10px 8px;margin-top:10px}
 ${S} .q-tk .t-tg figure{margin:0;display:grid;justify-items:center;gap:3px}
 ${S} .q-tk .t-tg figcaption{display:flex;align-items:center;gap:5px;font:400 13.5px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-shadow:${PRESS}}
 ${S} .q-tk .t-tg figcaption .lg{width:16px;height:16px}${S} .q-tk .t-tg figcaption small{font:600 11.5px/1 "Barlow Condensed",sans-serif;letter-spacing:0;text-transform:none;color:rgba(20,18,23,.75)}
 ${S} .q-tk .t-tg figcaption i{font-style:normal;color:rgba(20,18,23,.6)}
 ${S} .q-tk .t-tg figure>svg{width:100%;max-width:150px;height:auto;mix-blend-mode:multiply}
 /* sector: a printed grid, each cell's tint a spot ink on the card (green 2 in 3 or better, amber in between, red 1 in 3 or worse) */
 ${S} .q-tk table.t-sg{width:100%;border-collapse:collapse;margin-top:8px;table-layout:fixed}
 ${S} .q-tk .t-sg th{padding:0 0 5px;font:400 11.5px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase;text-shadow:${PRESS};vertical-align:bottom}
 ${S} .q-tk .t-sg th .lg{width:16px;height:16px;display:grid!important;margin:0 auto 3px!important}
 ${S} .q-tk .t-sg th:first-child{text-align:left;font:700 8.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;color:rgba(20,18,23,.7)}
 ${S} .q-tk .t-sg td{height:31px;border-top:1px solid rgba(20,18,23,.4);text-align:center;font:400 14.5px/1 Anton,sans-serif;text-shadow:${PRESS}}
 ${S} .q-tk .t-sg td+td{border-left:1px solid rgba(20,18,23,.25)}
 ${S} .q-tk .t-sg td:first-child{text-align:left;font:400 12px/1.05 Anton,sans-serif;letter-spacing:.03em;text-transform:uppercase}${S} .q-tk .t-sg td:first-child small{display:block;margin-top:2px;font:600 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:0;text-transform:none;color:rgba(20,18,23,.65)}
 ${S} .q-tk .t-sg td.hi{background:linear-gradient(rgba(47,160,95,.5),rgba(47,160,95,.5)) 3px 3px/calc(100% - 6px) calc(100% - 6px) no-repeat}
 ${S} .q-tk .t-sg td.md{background:linear-gradient(rgba(230,170,40,.5),rgba(230,170,40,.5)) 3px 3px/calc(100% - 6px) calc(100% - 6px) no-repeat}
 ${S} .q-tk .t-sg td.lo{background:linear-gradient(rgba(210,60,45,.48),rgba(210,60,45,.48)) 3px 3px/calc(100% - 6px) calc(100% - 6px) no-repeat}
 ${S} .q-tk .t-sg{mix-blend-mode:multiply}
 ${S} .q-tk .t-lgd{display:flex;gap:12px;justify-content:center;margin-top:7px;font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:rgba(20,18,23,.75)}
 ${S} .q-tk .t-lgd span{display:flex;align-items:center;gap:4px}${S} .q-tk .t-lgd i{width:10px;height:10px;display:block}`;
const fo=t=>`<em class="fo" data-t="${t}">${t}</em>`;
const TABS=[['roi','ROI'],['hit','Hit rate'],['miss','Avg miss'],['sector','Sector']];  // ROI first: the owner wants it as the default, and the default tab goes first
const ticket=(on,top,bot,body)=>`<div class="q q-tk"><div class="t-cd"><div class="t-bd g"><span><i>★</i> ${top} <i>★</i></span><span>Season 1</span></div><div class="t-in">
  <div class="t-tb">${TABS.map(([k,t])=>`<span class="${k===on?'on':''}">${k===on?fo(t):t}</span>`).join('')}</div>${body}</div>
  <div class="t-bd r"><span>${bot}</span><span>Nº ${String(NR).padStart(6,'0')}</span></div></div></div>`;
const row=(rank,lg,name,v,c,win)=>`<div class="t-r"><b>${rank}</b>${lg}<span class="nm">${win?fo(name):name}</span>${v}${c}</div>`;
const ax=(k)=>`<div class="q-ax" style="margin-right:var(--gut)"><span>R1</span><span class="q-k">${k}</span><span>R${NR}</span></div>`;
// the target for one AI, in real pixels: rings every 3% off, one ink dot per call (golden-angle spread), a red dot outside for a call
// that missed the direction
function target(m){const R=60,C=73,s=ST[m],ga=Math.PI*(3-Math.sqrt(5));let dots='';
  s.calls.forEach((c,i)=>{const a=i*ga;if(c.ok){const r=Math.min(c.miss,12)/12*R;dots+=`<circle cx="${(C+r*Math.cos(a)).toFixed(1)}" cy="${(C+r*Math.sin(a)).toFixed(1)}" r="2.7" fill="rgba(20,18,23,.9)"/>`}
    else{const r=R+4+(i%3)*1.8;dots+=`<circle cx="${(C+r*Math.cos(a)).toFixed(1)}" cy="${(C+r*Math.sin(a)).toFixed(1)}" r="2" fill="rgba(200,55,42,.9)"/>`}});
  const rings=[4,3,2,1].map((k,j)=>`<circle cx="${C}" cy="${C}" r="${(k/4*R).toFixed(1)}" fill="${j%2?'rgba(239,228,200,0)':'rgba(200,55,42,.62)'}" stroke="rgba(150,30,22,.7)" stroke-width=".8"/>`).join('');
  return `<svg viewBox="0 0 146 146" aria-hidden="true">${rings}<circle cx="${C}" cy="${C}" r="3" fill="rgba(150,30,22,.9)"/>${dots}</svg>`}
const V={
 roi:X=>ticket('roi','$100,000 on every call','Simulated · before fees',`<div class="lp">${X.tiles.map(t=>row(t.rank,t.lg,t.name,`<span class="v tnum">${t.val}</span>`,`<span class="c tnum ${t.up?'q-u':'q-d'}">${t.up?'▲':'▼'} ${t.pct}</span>`,t.rank===1)).join('')}</div>
   <div class="q-ch lp" id="ch-roi"></div>${ax('Start: $100,000')}<p class="t-cp"><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call.</p>`),
 hit:X=>ticket('hit','Right on direction','Up or down only',`<div class="lp">${byHit.map((m,i)=>{const s=ST[m];return row(i+1,X.lg[m],m,`<span class="v sm tnum">${s.k} of ${s.n}</span>`,`<span class="c big tnum">${Math.round(s.hit*100)}%</span>`,i===0)}).join('')}</div>
   <div class="q-ch lp" id="ch-hit"></div>${ax('Coin flip: 50%')}<p class="t-cp"><b>How often were they right about the stock's direction?</b> Only up or down counts here, not the size.</p>`),
 miss:X=>ticket('miss','How close they got','Closer is better',`<div class="t-tg lp">${byMiss.map((m,i)=>`<figure><figcaption><i>${i+1}</i>${X.lg[m]}${i===0?fo(m):m}<small>${ST[m].miss.toFixed(2)}% off</small></figcaption>${target(m)}</figure>`).join('')}</div>
   <p class="t-cp"><b>How close did they get?</b> The bullseye is what the stock did; each ring is 3% further off. One dot per call; a red dot outside missed the direction.</p>`),
 sector:X=>ticket('sector','Where they are sharpest','Small samples · it fills in',`<table class="t-sg lp"><colgroup><col style="width:30%"><col><col><col><col></colgroup><tr><th>Sector</th>${X.sg.cols.map(m=>`<th>${X.lg[m]}${m}</th>`).join('')}</tr>
   ${X.sg.rows.map(r=>`<tr><td>${r.name}<small>${r.n}</small></td>${r.cells.map(c=>`<td class="${c.k} tnum">${c.v}</td>`).join('')}</tr>`).join('')}</table>
   <div class="t-lgd"><span><i style="background:rgba(47,160,95,.55)"></i>2 in 3 or better</span><span><i style="background:rgba(230,170,40,.55)"></i>In between</span><span><i style="background:rgba(210,60,45,.5)"></i>1 in 3 or worse</span></div>
   <p class="t-cp"><b>Where are they sharpest?</b> Right calls by sector.</p>`)};
// a chart in real pixels: each AI's line in its colour, ink multiplied into the card; the view's #1 foil-stamped; names where lines end
function QDRAW(el,X,o){const W=el.clientWidth,H=o.h,G=o.gut,L=o.left||0,pw=W-G-L,pad=6,ih=H-2*pad;el.style.height=H+'px';el.parentNode.style.setProperty('--gut',G+'px');
  const sx=x=>L+x/100*pw,sy=y=>pad+y/100*ih,P=s=>s.pts.map((p,i)=>(i?'L':'M')+sx(p[0]).toFixed(1)+','+sy(p[1]).toFixed(1)).join('');
  const win=X.series.find(s=>s.rank===1),y0=sy(X.y0),FL=`filterUnits="userSpaceOnUse" x="-10" y="-10" width="${W+20}" height="${H+20}"`;
  const defs=`<defs><linearGradient id="qF${o.id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="54" y2="20" spreadMethod="reflect"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>
   <filter id="qG${o.id}" ${FL}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>
   <filter id="qS${o.id}" ${FL}><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
  const ln=(d,c,w,x)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${x||''}/>`;
  let ink=(o.grid||[]).map(g=>`<path d="M${L},${sy(g)}H${L+pw}" stroke="rgba(20,18,23,.18)" stroke-width=".8"/>`).join('')+`<path d="M${L},${y0}H${L+pw}" stroke="rgba(20,18,23,.5)" stroke-width="1.1" stroke-dasharray="5 4"/>`;
  X.series.filter(s=>s.rank!==1).forEach(s=>ink+=ln(P(s),s.col,2.1,` filter="url(#qS${o.id})" opacity=".92"`));
  const top=ln(P(win),'rgba(255,250,232,.85)',3.2,' transform="translate(0,1.1)"')+ln(P(win),'rgba(70,42,6,.55)',3.2,' transform="translate(0,-.9)"')+ln(P(win),`url(#qF${o.id})`,3.2,` filter="url(#qG${o.id})"`);
  const ends=X.series.map(s=>({s,y0:sy(s.lastY),y:sy(s.lastY),x:sx(s.pts[s.pts.length-1][0])})).sort((a,b)=>a.y-b.y);
  for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<19)ends[i].y=ends[i-1].y+19;const ov=ends[ends.length-1].y-(H-9);if(ov>0)ends.forEach(e=>e.y-=ov);
  ends.forEach(e=>ink+=`<path d="M${(e.x+2).toFixed(1)},${e.y0.toFixed(1)}L${(L+pw+8).toFixed(1)},${e.y.toFixed(1)}" fill="none" stroke="rgba(20,18,23,.62)" stroke-width=".9"/>`);
  el.insertAdjacentHTML('beforeend',`<svg class="ink" width="${W}" height="${H}" aria-hidden="true">${defs}${ink}</svg><svg width="${W}" height="${H}" aria-hidden="true">${defs.replace(/id="q/g,'id="r').replace(/url\(#q/g,'url(#r')}${top.replace(/url\(#q/g,'url(#r')}</svg>`+
    ends.map(e=>{const w=e.s.rank===1;return `<div class="q-lb" style="left:${L+pw+11}px;top:${e.y.toFixed(1)}px;--c:${e.s.col}">${e.s.lg}<b${w?` class="fo" data-t="${e.s.name}"`:''}>${e.s.name}</b></div>`}).join('')+
    (o.ylab||[]).map(g=>`<span class="q-yl" style="top:${sy(g[0]).toFixed(1)}px">${g[1]}</span>`).join(''))}
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'none')});
await p.click('#learn [data-rk="sector"]');await p.waitForTimeout(700);
const sg=await p.evaluate(()=>{const g=document.querySelector('#learn .sgr');const cols=[...g.querySelectorAll('.sgr-h [role=columnheader] b')].map(b=>b.textContent.toUpperCase());
  const rows=[...g.querySelectorAll('.sgr-r:not(.sgr-h)')].map(r=>({name:r.querySelector('.st-sec b').textContent,n:r.querySelector('.st-sec small').textContent,cells:[...r.querySelectorAll('.sgr-c')].map(c=>({v:c.textContent.trim(),k:['hi','md','lo'].find(k=>c.classList.contains(k))||''}))}));return {cols,rows}});
await p.click('#learn [data-rk="roi"]');await p.waitForTimeout(900);
const X=await p.evaluate(()=>{const f=document.querySelector('#learn #rflip');const byC={'#10a37f':'GPT','#1e80ff':'KIMI','#d97757':'CLAUDE','#111':'GROK'};
  const tiles=[...f.querySelectorAll('.pnl-k li')].map(li=>{const m=li.textContent.replace(/\s+/g,' ').match(/(\d)\s*([A-Za-z]+)\s*(\$[\d,]+)\s*([▲▼])\s*([\d.]+%)/);return {rank:+m[1],name:m[2].toUpperCase(),val:m[3],up:m[4]==='▲',pct:m[5],lg:li.querySelector('.lg').outerHTML}});
  const series=[...f.querySelectorAll('.pnl svg path')].filter(x=>/stroke:/.test(x.getAttribute('style')||'')).map(x=>{const k=byC[x.getAttribute('style').match(/stroke:\s*(#[0-9a-f]+)/i)[1].toLowerCase()];
    const pts=x.getAttribute('d').match(/-?[\d.]+,-?[\d.]+/g).map(q=>q.split(',').map(Number));return {name:k,pts,lastY:pts[pts.length-1][1],rank:tiles.find(t=>t.name===k).rank}});
  return {tiles,series,y0:parseFloat(f.querySelector('.pnl-z').style.top)}});
X.lg={};X.tiles.forEach(t=>X.lg[t.name]=t.lg);X.series.forEach(s=>{s.col=COL[s.name];s.lg=X.lg[s.name]});X.sg=sg;
// the hit-rate chart: each AI's running hit rate by round, on 25% to 100%
const LO=25,HI=100,yy=v=>(1-(v-LO)/(HI-LO))*100;
const XH={series:byHit.map((m,i)=>{const pts=ST[m].run.map(([j,v])=>[j/(NR-1)*100,yy(v)]);return {name:m,pts,lastY:pts[pts.length-1][1],rank:i+1,col:COL[m],lg:X.lg[m]}}),y0:yy(50)};
await p.addStyleTag({content:CSS});await p.addScriptTag({content:'window.QDRAW='+QDRAW.toString()});
const shots=[];
for(const k of ['roi','hit','miss','sector']){
  await p.evaluate(h=>{document.querySelectorAll('#learn .q').forEach(e=>e.remove());const l=document.getElementById('learn');const w=document.createElement('div');w.innerHTML=h;l.appendChild(w.firstElementChild)},V[k](X));
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  if(k==='roi')await p.evaluate(X=>QDRAW(document.getElementById('ch-roi'),X,{h:196,gut:66,id:'a'}),X);
  if(k==='hit')await p.evaluate(X=>QDRAW(document.getElementById('ch-hit'),X,{h:196,gut:66,left:26,id:'b',grid:[0,33.33,66.67,100],ylab:[[0,'100%'],[33.33,'75%'],[100,'25%']]}),XH);
  await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
  await p.evaluate(()=>document.querySelector('#learn .q').scrollIntoView({block:'center'}));await p.waitForTimeout(500);
  const c=await p.evaluate(()=>{const a=document.querySelector('#learn .q').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:a.height+24}});
  await p.screenshot({path:`${OUT}/r22-${k}-${W}.png`,clip:c,fullPage:true});shots.push(k+' '+Math.round(c.height))}
console.log(shots.join(' | '),'page width',await p.evaluate(()=>document.documentElement.scrollWidth),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
