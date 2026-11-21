// Round 19 mockups on the built X2+ page (owner, 2026-10-23): the proof ("Getting smarter or just lucky?") felt lackluster. Three
// paper takes on the stats panel, all opening on ROI (owner: "the ROI should be the default"), the winner's line in gold and every
// other line in its own model colour, each line labelled where it ends (logo, name, value) so no one has to guess which is which.
// The numbers and the lines are the page's own (its ROI tiles and chart paths). N engineering pad, T printed ticket, C card back.
// node launch-r19-proof.js <option> <outdir> [width]   option: now N T C
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'N',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const S='html.x2p.x2d[data-theme] #learn';
const COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
const H=210,GUT=66;   // chart height and the label gutter on its right (px)
const BASE=`
 ${S} .rsw2,${S} #rflip{display:none!important}
 ${S} .q{position:relative;margin:16px 0 0;color:#141217}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:4px;transform:none!important;margin:0!important;box-shadow:none!important}
 ${S} .q .lg svg{width:66%;height:66%}
 ${S} .q .tnum{font-variant-numeric:tabular-nums}
 ${S} .q .q-ch{position:relative;height:${H}px;margin-top:8px}
 ${S} .q .q-ch>svg.pl{position:absolute;left:0;top:0;width:calc(100% - ${GUT}px);height:100%;overflow:visible}
 ${S} .q .q-ch>svg.ld{position:absolute;right:${GUT-8}px;top:0;width:8px;height:100%;overflow:visible}
 ${S} .q .q-ch>svg path{fill:none;vector-effect:non-scaling-stroke;stroke-linejoin:round;stroke-linecap:round}
 ${S} .q .q-lb{position:absolute;right:0;width:${GUT-12}px;transform:translateY(-50%);display:grid;grid-template-columns:auto 1fr;column-gap:4px;align-items:center}
 ${S} .q .q-lb .lg{width:15px;height:15px}
 ${S} .q .q-lb b{font:400 12.5px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
 ${S} .q .q-ax{position:relative;height:14px;margin-right:${GUT}px;font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase}
 ${S} .q .q-ax span{position:absolute;top:3px}${S} .q .q-ax span:last-child{right:0}
 ${S} .q .q-ax span.q-k{left:50%;transform:translateX(-50%);white-space:nowrap;opacity:.8}
 ${S} .q .q-ax span.q-k::before{content:"";display:inline-block;width:18px;margin-right:5px;vertical-align:3px;border-top:1.5px dashed currentColor}`;
// the chart: other lines first, the winner on top in gold foil (a dark keyline under a gold gradient); labels pushed apart where ends crowd
function chart(X,o){const lines=X.series.slice().sort((a,b)=>(a.rank===1)-(b.rank===1));
  const ends=X.series.map(s=>({s,y:s.lastY/100*H})).sort((a,b)=>a.y-b.y),gap=20;
  for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<gap)ends[i].y=ends[i-1].y+gap;
  const over=ends[ends.length-1].y-(H-12);if(over>0)ends.forEach(e=>e.y-=over);for(let i=0;i<ends.length;i++)if(ends[i].y<12)ends[i].y=12+i*gap;
  const g='<defs><linearGradient id="q-gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".45" stop-color="#d9a636"/><stop offset=".6" stop-color="#b8841c"/><stop offset="1" stop-color="#e9c262"/></linearGradient></defs>';
  const p=lines.map(s=>s.rank===1?(o.hl?`<path d="${s.d}" style="stroke:${o.hl};stroke-width:${o.hlw||10}px;stroke-linecap:round"/>`:'')+`<path d="${s.d}" style="stroke:${o.key||'#5a3a06'};stroke-width:4.6px"/><path d="${s.d}" style="stroke:url(#q-gold);stroke-width:3.2px"/>`
    :`<path d="${s.d}" style="stroke:${s.col};stroke-width:${o.w||2.2}px;opacity:${o.op||1}"${o.f?` filter="${o.f}"`:''}/>`).join('');
  const lead=ends.map(e=>`<path d="M0,${(e.s.lastY/100*H).toFixed(1)} L8,${e.y.toFixed(1)}" style="stroke:${e.s.rank===1?'#b8841c':e.s.col};stroke-width:1.2px"/>`).join('');
  const lab=ends.map(e=>`<div class="q-lb" style="top:${e.y.toFixed(1)}px">${e.s.lg}<b style="color:${e.s.rank===1?(o.goldTxt||'#8a5c06'):((o.txt||{})[e.s.name]||e.s.col)}">${e.s.name}</b></div>`).join('');
  return `<div class="q-ch"><svg class="pl" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${g}<path d="M0,${X.y0} L100,${X.y0}" style="stroke:${o.base||'rgba(20,18,23,.45)'};stroke-width:1.2px;stroke-dasharray:5 4"/>${p}</svg>`+
   `<svg class="ld" viewBox="0 0 8 ${H}" preserveAspectRatio="none" aria-hidden="true">${lead}</svg>${lab}</div><div class="q-ax"><span>R1</span><span class="q-k">Start: $100,000</span><span>R${X.n}</span></div>`}
const TABS=['Hit rate','ROI','Avg miss','Sector'];
const pct=t=>`<span class="q-pc ${t.up?'q-u':'q-d'}">${t.up?'▲':'▼'} ${t.pct}</span>`;
const O={
 now:{css:'',build:null},
 // N: an engineering pad: graph paper, index tabs on its top edge (ROI in front), the ranking written as a ledger, the lines inked,
 // the winner in gold with a highlighter stroke behind it, labels in the margin in each line's ink
 N:{css:`
  ${S} .q-N .q-tabs{display:flex;gap:4px;padding:0 10px;position:relative;z-index:1}
  ${S} .q-N .q-tabs span{flex:1;text-align:center;padding:8px 0 7px;margin-bottom:-2px;background:#e6dcc2;border:2px solid #000;border-bottom:0;border-radius:6px 6px 0 0;font:400 12px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(20,18,23,.55);transform:translateY(4px)}
  ${S} .q-N .q-tabs span.on{background:#f7f1df;color:#141217;transform:none;padding-bottom:11px}
  ${S} .q-N .q-pad{position:relative;border:2px solid #000;box-shadow:4px 5px 0 #000;padding:14px 14px 12px;background:
    linear-gradient(rgba(36,120,120,.28) 1px,transparent 1px) 0 0/50px 50px,linear-gradient(90deg,rgba(36,120,120,.28) 1px,transparent 1px) 0 0/50px 50px,
    linear-gradient(rgba(36,120,120,.13) 1px,transparent 1px) 0 0/10px 10px,linear-gradient(90deg,rgba(36,120,120,.13) 1px,transparent 1px) 0 0/10px 10px,var(--paper) 0 0/240px 240px,#f7f1df;
    background-blend-mode:normal,normal,normal,normal,multiply}
  ${S} .q-N .q-led{display:grid;gap:0;margin:0 0 4px}
  ${S} .q-N .q-led div{display:grid;grid-template-columns:20px 16px 18px minmax(0,1fr) auto 66px;align-items:center;column-gap:6px;height:27px;border-bottom:1px solid rgba(20,18,23,.25)}
  ${S} .q-N .q-led i{height:3px;border-radius:2px}
  ${S} .q-N .q-led .lg{width:18px;height:18px}
  ${S} .q-N .q-led em{font:400 15px/1 Anton,sans-serif;font-style:normal}
  ${S} .q-N .q-led b{font:400 14px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
  ${S} .q-N .q-led strong{font:400 15px/1 Anton,sans-serif;font-weight:400}
  ${S} .q-N .q-pc{justify-self:end;font:400 13px/1 Anton,sans-serif}${S} .q-N \.q-pc.q-u{color:#1d7a43}${S} .q-N \.q-pc.q-d{color:#b3261e}
  ${S} .q-N .q-led div.w{background:linear-gradient(transparent 20%,rgba(246,214,74,.55) 20% 80%,transparent 80%)}
  ${S} .q-N .q-cap{margin:8px 0 0;font:600 11.5px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.75)}${S} .q-N .q-cap b{color:#141217}`,
  opt:{hl:'rgba(246,214,74,.55)',hlw:11,f:'url(#x2pInk)'},
  build:(X,o)=>`<div class="q q-N"><div class="q-tabs">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div><div class="q-pad">
   <div class="q-led">${X.tiles.map(t=>`<div class="${t.rank===1?'w':''}"><em>${t.rank}</em><i style="background:${t.rank===1?'#c99227':t.col}"></i>${t.lg}<b>${t.name}</b><strong class="tnum">${t.val}</strong>${pct(t)}</div>`).join('')}</div>
   ${chart(X,o)}<p class="q-cap"><b>What would $100,000 be worth now?</b> All in on every call: buy on an up call, short on a down call. Simulated, before fees.</p></div></div>`},
 // T: the bet ticket's card: a green band and a red band printed across it, a double printed rule, the four views as ticket stubs,
 // the ranking as four small stubs each banded in its line's colour (#1 in foil), the winner's line hot-foil gold like NVIDIA
 T:{css:`
  ${S} .q-T .q-tabs{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px}
  ${S} .q-T .q-tabs span{position:relative;text-align:center;padding:9px 0 8px;background:var(--paper) 0 0/220px 220px,#e9dfc4;filter:drop-shadow(2px 3px 0 #000);font:400 12px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(20,18,23,.5);
    -webkit-mask:radial-gradient(4px at 0 50%,#0000 97%,#000) 0 0/51% 10px repeat-y,radial-gradient(4px at 100% 50%,#0000 97%,#000) 100% 0/51% 10px repeat-y;mask:radial-gradient(4px at 0 50%,#0000 97%,#000) 0 0/51% 10px repeat-y,radial-gradient(4px at 100% 50%,#0000 97%,#000) 100% 0/51% 10px repeat-y}
  ${S} .q-T .q-tabs span.on{color:rgba(20,18,23,.9);background:var(--paper) 0 0/220px 220px,linear-gradient(115deg,#f6d77c,#d39c1c 34%,#fbe8a8 52%,#c98a12 70%,#efc24a);background-blend-mode:multiply,normal}
  ${S} .q-T .q-card{position:relative;background:var(--paper) 0 0/240px 240px,#efe4c8;filter:drop-shadow(4px 5px 0 #000);padding:0}
  ${S} .q-T .q-band{display:flex;justify-content:space-between;align-items:center;height:26px;padding:0 14px;font:italic 900 10.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:#f6efdf}
  ${S} .q-T .q-band.g{background:var(--paper) 0 0/240px 240px,#1f7a45;background-blend-mode:multiply}${S} .q-T .q-band.r{background:var(--paper) 0 0/240px 240px,#c8372a;background-blend-mode:multiply}
  ${S} .q-T .q-in{position:relative;margin:7px;padding:12px 10px 10px;border:1.5px solid rgba(20,18,23,.75);outline:.7px solid rgba(20,18,23,.55);outline-offset:-4.5px}
  ${S} .q-T .q-stubs{display:grid;grid-template-columns:1fr 1fr;gap:7px}
  ${S} .q-T .q-stub{display:grid;grid-template-columns:7px auto 1fr;column-gap:8px;align-items:center;padding:7px 8px 7px 0;border:1px solid rgba(20,18,23,.4)}
  ${S} .q-T .q-stub i{align-self:stretch;margin:-7px 0}
  ${S} .q-T .q-stub .lg{width:22px;height:22px;mix-blend-mode:multiply}
  ${S} .q-T .q-stub b{display:block;font:400 12px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:rgba(20,18,23,.88)}
  ${S} .q-T .q-stub strong{display:block;margin-top:2px;font:400 17px/1 Anton,sans-serif;font-weight:400;color:rgba(20,18,23,.88);text-shadow:0 1px 0 rgba(255,251,238,.75)}
  ${S} .q-T .q-stub .q-pc{display:block;margin-top:2px;font:700 10.5px/1 "Barlow Condensed",sans-serif}${S} .q-T \.q-pc.q-u{color:#1d7a43}${S} .q-T \.q-pc.q-d{color:#b3261e}
  ${S} .q-T .q-cap{margin:8px 0 0;font:600 11px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.72)}${S} .q-T .q-cap b{color:rgba(20,18,23,.9)}`,
  opt:{},
  build:(X,o)=>`<div class="q q-T"><div class="q-tabs">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div><div class="q-card">
   <div class="q-band g"><span>★ $100,000 on every call ★</span><span>Season 1</span></div><div class="q-in">
   <div class="q-stubs">${X.tiles.map(t=>`<div class="q-stub"><i style="background:${t.rank===1?'linear-gradient(180deg,#f6dc93,#c99227 55%,#e9c262)':t.col}"></i>${t.lg}<span><b>${t.rank}. ${t.name}</b><strong class="tnum">${t.val}</strong>${pct(t)}</span></div>`).join('')}</div>
   ${chart(X,o)}<p class="q-cap"><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call.</p></div>
   <div class="q-band r"><span>Simulated · before fees</span><span>Nº ${String(X.n).padStart(6,'0')}</span></div></div></div>`},
 // C: the back of a collector card: grey cardboard printed in two inks (black and red), a red title bar with the words knocked out,
 // the views as a printed row of boxes, the ranking as the card's stat table, the winner's row and line in gold foil
 C:{css:`
  ${S} .q-C .q-board{position:relative;padding:12px 12px 10px;border:2px solid #000;border-radius:10px;box-shadow:4px 5px 0 #000;
    background:radial-gradient(rgba(255,255,255,.18) .6px,transparent 1px) 0 0/4px 4px,radial-gradient(rgba(60,45,25,.14) .7px,transparent 1.1px) 1px 2px/5px 5px,linear-gradient(160deg,#cfc3a8,#bfb193)}
  ${S} .q-C .q-tt{display:flex;justify-content:space-between;align-items:center;margin:-2px -2px 10px;padding:7px 10px 6px;background:rgba(178,34,26,.92);border-radius:6px 6px 0 0;font:400 13px/1 Anton,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#d8ccb2}
  ${S} .q-C .q-tt small{font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em}
  ${S} .q-C .q-tabs{display:grid;grid-template-columns:repeat(4,1fr);border:1.5px solid rgba(20,18,23,.85);margin-bottom:10px}
  ${S} .q-C .q-tabs span{text-align:center;padding:7px 0 6px;font:400 11.5px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(20,18,23,.8)}
  ${S} .q-C .q-tabs span+span{border-left:1.5px solid rgba(20,18,23,.85)}
  ${S} .q-C .q-tabs span.on{background:rgba(20,18,23,.88);color:#cfc3a8}
  ${S} .q-C table{width:100%;border-collapse:collapse;font:400 13px/1 Anton,sans-serif;color:rgba(20,18,23,.88)}
  ${S} .q-C th{font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.1em;text-transform:uppercase;color:rgba(178,34,26,.95);text-align:left;padding:0 4px 4px;border-bottom:1.5px solid rgba(20,18,23,.8)}
  ${S} .q-C td{padding:6px 4px;border-bottom:1px dotted rgba(20,18,23,.55);vertical-align:middle}
  ${S} .q-C td.r,${S} .q-C th.r{text-align:right}
  ${S} .q-C td .lg{width:17px;height:17px;vertical-align:-4px;margin-right:6px!important;mix-blend-mode:multiply}
  ${S} .q-C td i{display:inline-block;width:14px;height:3px;border-radius:2px;vertical-align:4px;margin-right:6px}
  ${S} .q-C tr.w{background:linear-gradient(115deg,rgba(246,215,124,.85),rgba(211,156,28,.75) 34%,rgba(251,232,168,.85) 52%,rgba(201,138,18,.75) 70%,rgba(239,194,74,.85))}
  ${S} .q-C \.q-pc.q-u{color:#1d6b3c}${S} .q-C \.q-pc.q-d{color:#a3221a}
  ${S} .q-C .q-cap{margin:8px 0 0;font:600 11px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.78)}${S} .q-C .q-cap b{color:rgba(178,34,26,.95)}`,
  opt:{op:.92,base:'rgba(20,18,23,.55)',goldTxt:'#6e4602',txt:{CLAUDE:'#a9472a',KIMI:'#0f5cc4'}},
  build:(X,o)=>`<div class="q q-C"><div class="q-board"><div class="q-tt"><span>$100K · all in on every call</span><small>Season 1 · ${X.n} rounds</small></div>
   <div class="q-tabs">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div>
   <table><tr><th>Rk</th><th>AI</th><th class="r">Now</th><th class="r">ROI</th></tr>${X.tiles.map(t=>`<tr class="${t.rank===1?'w':''}"><td>${t.rank}</td><td><i style="background:${t.rank===1?'#b8841c':t.col}"></i>${t.lg}${t.name}</td><td class="r tnum">${t.val}</td><td class="r">${pct(t)}</td></tr>`).join('')}</table>
   ${chart(X,o)}<p class="q-cap"><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call. Simulated, before fees.</p></div></div>`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
await p.click('#learn [data-rk="roi"]');await p.waitForTimeout(900);
if(o.build){
  // the page's own ROI: its tiles (rank, logo, name, value, change) and its chart's lines (one path per model, told apart by colour)
  const X=await p.evaluate(COL=>{const f=document.querySelector('#learn #rflip');const byC={'#10a37f':'GPT','#1e80ff':'KIMI','#d97757':'CLAUDE','#111':'GROK'};
   const tiles=[...f.querySelectorAll('.pnl-k li')].map(li=>{const m=li.textContent.replace(/\s+/g,' ').match(/(\d)\s*([A-Za-z]+)\s*(\$[\d,]+)\s*([▲▼])\s*([\d.]+%)/);
     return {rank:+m[1],name:m[2].toUpperCase(),val:m[3],up:m[4]==='▲',pct:m[5],lg:li.querySelector('.lg').outerHTML,col:COL[m[2].toUpperCase()]}});
   const ps=[...f.querySelectorAll('.pnl svg path')].filter(x=>/stroke:/.test(x.getAttribute('style')||''));
   const series=ps.map(x=>{const c=(x.getAttribute('style').match(/stroke:\s*(#[0-9a-f]+)/i)||[])[1].toLowerCase(),k=byC[c],d=x.getAttribute('d'),pts=d.match(/-?[\d.]+,-?[\d.]+/g),last=pts[pts.length-1].split(',');
     const t=tiles.find(t=>t.name===k);return {k,name:k,col:COL[k],d,lastY:+last[1],rank:t.rank,lg:t.lg,val:'$'+(parseFloat(t.val.replace(/[$,]/g,''))/1000).toFixed(1)+'K'}});
   const z=f.querySelector('.pnl-z');const y0=parseFloat(z.style.top);
   const n=(typeof SHEET!=='undefined'?SHEET:[]).filter(r=>r[12]!==''&&r[12]!=null).length;return {tiles,series,y0,n}},COL);
  await p.addStyleTag({content:BASE+o.css});
  await p.evaluate(h=>{const l=document.getElementById('learn');const w=document.createElement('div');w.innerHTML=h;l.appendChild(w.firstElementChild)},o.build(X,o.opt||{}));
  console.log(V,'winner',X.series.find(s=>s.rank===1).name,'ends',X.series.map(s=>s.name+':'+s.lastY).join(' '))}
await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#learn').getBoundingClientRect();return {x:0,y:a.top+scrollY,width:innerWidth,height:a.height+10}});
await p.screenshot({path:`${OUT}/r19-${V}-${W}.png`,clip:c,fullPage:true});
console.log(V,W,'height',Math.round(c.height),'page width',await p.evaluate(()=>document.documentElement.scrollWidth),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
