// Round 17 mockups on the built X2+ page (owner, 2026-10-22, after round 16: "creative, but I was thinking still to keep sort of
// the horizontal structure and just have a bit of a different feel"). One row per AI, as today (rank, AI, last five, hit rate,
// ROI), in five different materials from the site's world; the board starts right under the head and the rules, in the owner's
// words, are the object's small print. Built from the page's own rows. The "As it stands" ticket stays.
// node launch-r17-board.js <option> <outdir> [width]   option: now T G F B K
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'T',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const G='https://fonts.googleapis.com/css2?';
const S='html.x2p.x2d[data-theme] #standings';
const BASE=`
 ${S} .x2p-strap,${S} .x2p-flip,${S} .lbh{display:none!important}
 ${S} .q{position:relative;margin:18px 0 0;color:#f3ead6}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:7px;box-shadow:0 0 0 1.5px #000;transform:none!important;margin:0!important}
 ${S} .q .lg svg,${S} .q .lg img{width:64%;height:64%}
 ${S} .q .q-l5{display:inline-flex;gap:3px}
 ${S} .q .q-l5 i{width:12px;height:12px;display:grid;place-items:center;font:800 8px/1 Barlow,sans-serif;font-style:normal;border:1.2px solid #000;border-radius:2.5px;background:#3a3640;color:#f3ead6}
 ${S} .q .q-l5 i.g{background:#4fe39a;color:#0b3b22}${S} .q .q-l5 i.r{background:#ff6158;color:#4a0a06}
 ${S} .q .q-lc{text-transform:none}
 ${S} .q .tnum{font-variant-numeric:tabular-nums}
 ${S} .q .q-r,${S} .q .q-h{text-align:right}`;
const RULES=['4 AI<span class="q-lc">s</span> predict a stock\'s move <em>before</em> it reports.','Graded at the next market close <em>after</em> earnings.','In public, every earnings season.'];
const l5=a=>'<span class="q-l5" aria-hidden="true">'+a.map(c=>'<i class="'+c+'">'+(c==='g'?'✓':c==='r'?'✗':'–')+'</i>').join('')+'</span>';
const COLS='grid-template-columns:44px minmax(0,1fr) 70px 50px 58px;column-gap:6px';
const O={
 now:{fonts:[],css:'',build:null},
 // T: ticket stubs: every row is a ticket from the film's ticket world (lit card, scalloped ends), the rank on a stub torn along a
 // perforation, #1's stub in gold; the rules as the tickets' terms in small print
 T:{fonts:[],css:`
  ${S} .q-T{display:grid;gap:9px}
  ${S} .q-T .q-hd{display:grid;${COLS};padding:0 12px 0 0;font:italic 800 10.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.12em;text-transform:uppercase;color:rgba(243,234,214,.62)}
  ${S} .q-T .q-hd span:nth-child(3){text-align:center}
  ${S} .q-T .q-tw{filter:drop-shadow(3px 4px 0 #000)}
  ${S} .q-T .q-tk{position:relative;display:grid;${COLS};align-items:center;height:60px;padding-right:12px;background:var(--paper) 0 0/240px 240px;color:#141217;
    -webkit-mask:radial-gradient(4.5px at 0 50%,#0000 97%,#000) 0 0/51% 11px repeat-y,radial-gradient(4.5px at 100% 50%,#0000 97%,#000) 100% 0/51% 11px repeat-y;
    mask:radial-gradient(4.5px at 0 50%,#0000 97%,#000) 0 0/51% 11px repeat-y,radial-gradient(4.5px at 100% 50%,#0000 97%,#000) 100% 0/51% 11px repeat-y}
  ${S} .q-T .q-st{align-self:stretch;display:grid;place-content:center;justify-items:center;background:#e2d3ac;border-right:2px dashed rgba(20,18,23,.55)}
  ${S} .q-T .q-st small{font:italic 800 8.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.12em;text-transform:uppercase;color:#a3221a}
  ${S} .q-T .q-st b{font:400 26px/1 Anton,sans-serif}
  ${S} .q-T .q-1 .q-tk{height:70px}${S} .q-T .q-1 .q-st{background:linear-gradient(162deg,#ffd76a 0 52%,#e2a823 52% 100%)}${S} .q-T .q-1 .q-st b{font-size:32px}
  ${S} .q-T .q-ai{display:flex;align-items:center;gap:8px;min-width:0;padding-left:4px}
  ${S} .q-T .q-ai .lg{width:28px;height:28px}
  ${S} .q-T .q-nm{display:grid;gap:3px;min-width:0}
  ${S} .q-T .q-nm b{font:400 17px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
  ${S} .q-T .q-1 .q-nm b{font-size:20px}
  ${S} .q-T .q-nm small{font:600 10.5px/1 "Barlow Condensed",sans-serif;color:#4a4552;white-space:nowrap}
  ${S} .q-T .q-l{justify-self:center}
  ${S} .q-T .q-h b{display:block;font:400 22px/1 Anton,sans-serif}${S} .q-T .q-1 .q-h b{font-size:26px;color:#a3221a}
  ${S} .q-T .q-h small,${S} .q-T .q-r small{display:block;margin-top:2px;font:600 9.5px/1 "Barlow Condensed",sans-serif;color:#4a4552}
  ${S} .q-T .q-r b{display:block;font:400 15px/1 Anton,sans-serif}
  ${S} .q-T .q-fine{margin:4px 4px 0;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.62);text-wrap:balance}
  ${S} .q-T .q-fine b{color:#ff6158}${S} .q-T .q-fine em{font-style:normal;color:#f2b632}`,
  build:(D,X)=>`<div class="q q-T"><div class="q-hd"><span></span><span>AI</span><span>Last 5</span><span class="q-h">Hit rate</span><span class="q-r">ROI</span></div>
   ${D.map(d=>`<div class="q-tw q-${d.rank}"><div class="q-tk"><span class="q-st"><small>No.</small><b>${d.rank}</b></span>
    <span class="q-ai">${d.lg}<span class="q-nm"><b>${d.name}</b><small>${d.model}</small></span></span><span class="q-l">${l5(d.l5)}</span>
    <span class="q-h tnum"><b>${d.hit}</b><small>on direction</small></span><span class="q-r tnum"><b>${d.roi}</b><small>${d.usd}</small></span></div></div>`).join('')}
   <div class="q-fine"><b>Terms.</b> ${RULES.join(' ')}</div></div>`},
 // G: the hand-set scoreboard: a green board with painted slot-in plates (the golf majors and Wimbledon still change theirs by hand),
 // names in slab capitals, the hit rate in green above a coin flip and red below; the rules on a small plaque at its foot
 G:{fonts:['family=Zilla+Slab:wght@600;700'],css:`
  ${S} .q-G{background:#1a4d31;border:3px solid #0b2a1a;box-shadow:inset 0 0 0 2px #e9e2cc,5px 5px 0 #000;padding:12px 10px 11px;
    background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.08) 0 1px,transparent 1px 22px)}
  ${S} .q-G .q-ttl{display:flex;align-items:center;gap:10px;margin:0 2px 9px;font:700 17px/1 "Zilla Slab",serif;letter-spacing:.24em;text-transform:uppercase;color:#f7f3e6}
  ${S} .q-G .q-ttl::before,${S} .q-G .q-ttl::after{content:"";flex:1;height:2px;background:#e9e2cc}
  ${S} .q-G .q-hd,${S} .q-G .q-row{display:grid;grid-template-columns:30px minmax(0,1fr) 68px 52px 56px;column-gap:5px}
  ${S} .q-G .q-hd{margin-bottom:6px;font:700 9.5px/1 "Zilla Slab",serif;letter-spacing:.14em;text-transform:uppercase;color:#e9e2cc}
  ${S} .q-G .q-hd span{text-align:center}${S} .q-G .q-hd span:nth-child(2){text-align:left;padding-left:4px}
  ${S} .q-G .q-row{height:46px;margin-top:5px}
  ${S} .q-G .q-row>span{display:grid;align-content:center;background:linear-gradient(#fbf8ee,#ece5d0);border-radius:2px;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 0 #0b2a1a;color:#17492e}
  ${S} .q-G .q-pos{justify-items:center;font:700 22px/1 "Zilla Slab",serif}
  ${S} .q-G .q-1 .q-pos{background:linear-gradient(162deg,#ffd76a 0 52%,#e2a823 52% 100%)!important;color:#141217}
  ${S} .q-G .q-1{height:54px}
  ${S} .q-G .q-ai{grid-template-columns:auto 1fr;column-gap:7px;align-items:center;padding:0 6px}
  ${S} .q-G .q-ai .lg{width:24px;height:24px;grid-row:span 2}
  ${S} .q-G .q-ai b{align-self:end;font:700 16.5px/1 "Zilla Slab",serif;letter-spacing:.02em;text-transform:uppercase}
  ${S} .q-G .q-1 .q-ai b{font-size:19px}
  ${S} .q-G .q-ai small{align-self:start;margin-top:2px;font:600 10px/1 "Barlow Condensed",sans-serif;color:#4c6b58}
  ${S} .q-G .q-l5c{justify-items:center;background:none!important;box-shadow:none!important}
  ${S} .q-G .q-l5c .q-l5 i{border-radius:1.5px;border-color:#0b2a1a}
  ${S} .q-G .q-hit{justify-items:center;font:700 22px/1 "Zilla Slab",serif}
  ${S} .q-G .q-hit.up{color:#17703f}${S} .q-G .q-hit.dn{color:#c0261c}
  ${S} .q-G .q-roi{justify-items:center;font:700 15px/1 "Zilla Slab",serif}
  ${S} .q-G .q-roi small{margin-top:2px;font:600 9.5px/1 "Barlow Condensed",sans-serif;color:#4c6b58}
  ${S} .q-G .q-roi.dn{color:#c0261c}
  ${S} .q-G .q-pl{margin:12px auto 0;width:fit-content;max-width:94%;padding:6px 10px;background:#f1ead6;border-radius:2px;box-shadow:0 2px 0 #0b2a1a;color:#17492e;text-align:center;font:600 10.5px/1.4 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase;text-wrap:balance}
  ${S} .q-G .q-pl b{color:#c0261c}${S} .q-G .q-pl em{font-style:normal;color:#c0261c}`,
  build:(D,X)=>`<div class="q q-G"><div class="q-ttl">Leaders</div>
   <div class="q-hd"><span>Pos</span><span>AI</span><span>Last 5</span><span>Hit</span><span>ROI</span></div>
   ${D.map(d=>`<div class="q-row q-${d.rank}"><span class="q-pos">${d.rank}</span><span class="q-ai">${d.lg}<b>${d.name}</b><small>${d.model}</small></span>
    <span class="q-l5c">${l5(d.l5)}</span><span class="q-hit tnum ${d.hitN>=50?'up':'dn'}">${d.hit}</span><span class="q-roi tnum ${/^[−-]/.test(d.roi)?'dn':''}">${d.roi}<small>${d.usd}</small></span></div>`).join('')}
   <div class="q-pl"><b>The rules</b> · ${RULES.join(' · ')}</div></div>`},
 // F: the split-flap board: a departures board, every character on its own flap with the hinge across the middle; #1's flaps in
 // gold, the last five as coloured flaps; the model and ROI in the board's small amber line, the rules under "Remarks"
 F:{fonts:[],css:`
  ${S} .q-F{background:#0c0b10;border:2px solid #000;box-shadow:inset 0 0 0 1px #2a2633,5px 5px 0 #000;padding:10px 10px 10px;border-radius:6px}
  ${S} .q-F .q-hd{display:flex;align-items:center;gap:6px;margin:0 2px 8px;font:700 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#f2b632}
  ${S} .q-F .q-hd i{width:7px;height:7px;border-radius:50%;background:#ff6158;box-shadow:0 0 6px #ff6158}
  ${S} .q-F .q-hd span:last-child{margin-left:auto;color:rgba(242,182,50,.7)}
  ${S} .q-F .q-cl{display:grid;grid-template-columns:22px 128px 1fr 64px;column-gap:8px;margin:0 2px 5px;font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:rgba(243,234,214,.5)}
  ${S} .q-F .q-cl span:nth-child(3){text-align:center}${S} .q-F .q-cl span:last-child{text-align:right}
  ${S} .q-F .q-row{padding:7px 2px 6px;border-top:1px solid #24212b}
  ${S} .q-F .q-ln{display:grid;grid-template-columns:22px 128px 1fr 64px;column-gap:8px;align-items:center}
  ${S} .q-F .q-w{display:flex;gap:2px}
  ${S} .q-F .q-w.r{justify-content:flex-end}
  ${S} .q-F .fl{position:relative;display:grid;place-items:center;width:20px;height:30px;border-radius:2px;background:linear-gradient(#2c2933 0 48%,#08070b 48% 52%,#232029 52%);box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 1px 0 #000;font:700 22px/1 "Barlow Condensed",sans-serif;color:#f3ead6}
  ${S} .q-F .fl.sm{width:20px}
  ${S} .q-F .q-1 .fl{color:#f2b632}
  ${S} .q-F .q-l5f{display:flex;gap:3px;justify-content:center}
  ${S} .q-F .q-l5f i{width:10px;height:18px;border-radius:1.5px;background:linear-gradient(#3a3640 0 48%,#08070b 48% 52%,#33303a 52%)}
  ${S} .q-F .q-l5f i.g{background:linear-gradient(#4fe39a 0 48%,#08070b 48% 52%,#3fcb87 52%)}
  ${S} .q-F .q-l5f i.r{background:linear-gradient(#ff6158 0 48%,#08070b 48% 52%,#e8524a 52%)}
  ${S} .q-F .q-sub{margin:5px 0 0 30px;font:600 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.08em;text-transform:uppercase;color:rgba(242,182,50,.75)}
  ${S} .q-F .q-rm{margin-top:4px;padding:7px 2px 0;border-top:1px solid #24212b;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.6);text-wrap:balance}
  ${S} .q-F .q-rm b{color:#f2b632}${S} .q-F .q-rm em{font-style:normal;color:#f2b632}`,
  build:(D,X)=>{const flaps=(t,n,cl)=>{t=String(t).toUpperCase();t=cl==='r'?t.padStart(n,' '):t.padEnd(n,' ');return '<span class="q-w '+(cl||'')+'" aria-label="'+t.trim()+'">'+[...t].map(c=>'<span class="fl">'+(c===' '?'&nbsp;':c)+'</span>').join('')+'</span>'};
   return `<div class="q q-F"><div class="q-hd"><i></i><span>Standings</span><span>After ${X.n} rounds</span></div>
   <div class="q-cl"><span>No</span><span>AI</span><span>Last 5</span><span>Hit</span></div>
   ${D.map(d=>`<div class="q-row q-${d.rank}"><div class="q-ln">${flaps(d.rank,1)}${flaps(d.name,6)}<span class="q-l5f" aria-hidden="true">${d.l5.map(c=>'<i class="'+c+'"></i>').join('')}</span>${flaps(d.hit,3,'r')}</div>
    <div class="q-sub tnum">${d.model} · ROI ${d.roi} · ${d.usd}</div></div>`).join('')}
   <div class="q-rm"><b>Remarks</b> · ${RULES.join(' · ')}</div></div>`}},
 // B: ribbon bars: every row is a folded paper ribbon as long as its hit rate (0 to 100%, to scale), #1's in gold, a gold
 // coin-flip mark at 50% across all four; the model, last five and ROI on a line under each ribbon; the rules as fine print
 B:{fonts:[],css:`
  ${S} .q-B{position:relative;padding:20px 0 0}${S} .q-B .q-pl{position:relative}${S} .q-B .q-row{position:relative;z-index:1}
  ${S} .q-B .q-cf{position:absolute;top:-20px;bottom:16px;border-left:2px dashed #f2b632;z-index:0;pointer-events:none}
  ${S} .q-B .q-cf span{position:absolute;top:0;left:6px;white-space:nowrap;font:italic 900 10.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase;color:#f2b632}
  ${S} .q-B .q-row{margin-top:10px}
  ${S} .q-B .q-rb{filter:drop-shadow(3px 4px 0 #000)}
  ${S} .q-B .q-rib{display:flex;align-items:center;gap:8px;height:42px;padding:0 20px 0 8px;color:#141217;background:linear-gradient(180deg,#fbf3df 0 50%,#d8caa4 50% 100%);clip-path:polygon(0 0,100% 0,calc(100% - 11px) 50%,100% 100%,0 100%)}
  ${S} .q-B .q-1 .q-rib{height:48px;background:linear-gradient(180deg,#ffd76a 0 50%,#e2a823 50% 100%)}
  ${S} .q-B .q-rk{font:400 20px/1 Anton,sans-serif;min-width:14px}
  ${S} .q-B .q-rib .lg{width:26px;height:26px}
  ${S} .q-B .q-nm{font:400 17px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
  ${S} .q-B .q-1 .q-nm{font-size:20px}
  ${S} .q-B .q-pc{margin-left:auto;font:400 21px/1 Anton,sans-serif}
  ${S} .q-B .q-1 .q-pc{font-size:25px;color:#7a1810}
  ${S} .q-B .q-sub{display:flex;width:fit-content;align-items:center;gap:8px;margin:6px 0 0 8px;padding-right:6px;font:600 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.04em;color:rgba(243,234,214,.75)}
  ${S} .q-B .q-ax{position:relative;height:16px;margin-top:9px;border-top:1px solid rgba(243,234,214,.25)}
  ${S} .q-B .q-ax span{position:absolute;top:4px;transform:translateX(-50%);font:600 10px/1 "Barlow Condensed",sans-serif;color:rgba(243,234,214,.5)}
  ${S} .q-B .q-ax span:first-child{transform:none}${S} .q-B .q-ax span:last-child{transform:translateX(-100%)}
  ${S} .q-B .q-fine{margin:10px 4px 0;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.62);text-wrap:balance}
  ${S} .q-B .q-fine b{color:#ff6158}${S} .q-B .q-fine em{font-style:normal;color:#f2b632}`,
  build:(D,X)=>`<div class="q q-B"><div class="q-pl"><i class="q-cf" style="left:50%"><span>Coin flip · 50%</span></i>
   ${D.map(d=>`<div class="q-row q-${d.rank}"><div class="q-rb" style="width:${d.hitN.toFixed(2)}%"><div class="q-rib"><span class="q-rk">${d.rank}</span>${d.lg}<span class="q-nm">${d.name}</span><span class="q-pc tnum">${d.hit}</span></div></div>
    <div class="q-sub tnum"><span>${d.model}</span>${l5(d.l5)}<span>ROI ${d.roi}</span></div></div>`).join('')}
   <div class="q-ax">${[0,25,50,75,100].map(v=>`<span style="left:${v}%">${v}%</span>`).join('')}</div></div>
   <div class="q-fine"><b>The rules</b> · ${RULES.join(' · ')}</div></div>`},
 // K: manga strips: every row is a manga panel slanted the same way, #1's panel with speed lines and its hit rate as a sound effect,
 // an AI under a coin flip in gloom tone; the rules as a margin note
 K:{fonts:['family=Dela+Gothic+One'],css:`
  ${S} .q-K{display:grid;gap:9px;padding:0 4px}
  ${S} .q-K .q-hd{display:grid;grid-template-columns:minmax(0,1fr) 64px 58px 50px;column-gap:5px;padding:0 14px 0 0;font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;text-transform:uppercase;color:rgba(243,234,214,.6)}
  ${S} .q-K .q-hd span{text-align:right}${S} .q-K .q-hd span:nth-child(2){text-align:center}
  ${S} .q-K .q-p{position:relative;transform:skewX(-6deg);border:3px solid #000;background:#fffaf0;box-shadow:4px 4px 0 #000;color:#141217;overflow:hidden}
  ${S} .q-K .q-in{transform:skewX(6deg);display:grid;grid-template-columns:minmax(0,1fr) 64px 58px 50px;column-gap:5px;align-items:center;height:56px;padding:0 12px 0 34px}
  ${S} .q-K .q-1{background:#fffaf0}${S} .q-K .q-1 .q-in{height:70px}
  ${S} .q-K .q-1::before{content:"";position:absolute;inset:-120% -20%;background:repeating-conic-gradient(from 0deg at 72% 50%,rgba(20,18,23,.85) 0 .9deg,transparent .9deg 5deg);-webkit-mask:radial-gradient(ellipse 30% 40% at 72% 50%,transparent 40%,#000 75%);mask:radial-gradient(ellipse 30% 40% at 72% 50%,transparent 40%,#000 75%);opacity:.5}
  ${S} .q-K .q-gl{background:radial-gradient(circle,rgba(20,18,23,.3) 0 .9px,transparent 1.3px) 0 0/5px 5px,#ece5d5}
  ${S} .q-K .q-tg{position:absolute;left:-2px;top:-2px;bottom:-2px;width:28px;display:grid;place-items:center;background:#141217;color:#fff;font:400 15px/1 "Dela Gothic One",sans-serif;z-index:1}
  ${S} .q-K .q-1 .q-tg{background:#c8372a;font-size:18px}
  ${S} .q-K .q-ai{position:relative;display:flex;align-items:center;gap:8px;min-width:0}
  ${S} .q-K .q-ai .lg{width:26px;height:26px;box-shadow:0 0 0 2px #000}
  ${S} .q-K .q-nm{display:grid;gap:3px;min-width:0}
  ${S} .q-K .q-nm b{font:400 14px/1 "Dela Gothic One",sans-serif}
  ${S} .q-K .q-1 .q-nm b{font-size:16px}
  ${S} .q-K .q-nm small{font:700 10px/1 "Barlow Condensed",sans-serif;letter-spacing:.04em;text-transform:uppercase;color:#4a4552;white-space:nowrap}
  ${S} .q-K .q-l{position:relative;justify-self:center}${S} .q-K .q-l .q-l5{gap:1.5px}${S} .q-K .q-l .q-l5 i{width:11px;height:11px;font-size:7.5px}
  ${S} .q-K .q-h{position:relative;font:400 20px/1 "Dela Gothic One",sans-serif}
  ${S} .q-K .q-1 .q-h{justify-self:start;font-size:21px;color:#f2b632;-webkit-text-stroke:2.2px #000;paint-order:stroke fill;text-shadow:3px 3px 0 #000;transform:rotate(-6deg)}
  ${S} .q-K .q-r{position:relative;font:400 11px/1 "Dela Gothic One",sans-serif}
  ${S} .q-K .q-r small{display:block;margin-top:3px;font:700 9.5px/1 "Barlow Condensed",sans-serif;color:#4a4552}
  ${S} .q-K .q-note{margin:2px 2px 0;font:italic 600 11px/1.4 "Barlow Condensed",sans-serif;color:rgba(243,234,214,.66);text-wrap:balance}
  ${S} .q-K .q-note b{font-style:normal;color:#ff6158}${S} .q-K .q-note em{font-style:normal;color:#f2b632;font-weight:700}`,
  build:(D,X)=>`<div class="q q-K"><div class="q-hd"><span></span><span>Last 5</span><span>Hit rate</span><span>ROI</span></div>
   ${D.map(d=>`<div class="q-p q-${d.rank}${d.hitN<50?' q-gl':''}"><span class="q-tg">${d.rank}</span><div class="q-in"><span class="q-ai">${d.lg}<span class="q-nm"><b>${d.name}</b><small>${d.model}</small></span></span>
    <span class="q-l">${l5(d.l5)}</span><span class="q-h tnum">${d.hit}</span><span class="q-r tnum">${d.roi}<small>${d.usd}</small></span></div></div>`).join('')}
   <div class="q-note">※ <b>The rules:</b> ${RULES.join(' ')}</div></div>`},
};
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'#efe4c8')});
for(const f of o.fonts)await p.addStyleTag({url:G+f+'&display=block'});
if(o.build)await p.addStyleTag({content:BASE+o.css});
if(o.build){
  // the page's own rows, plus from the sheet: each model's exact hit rate, rounds graded, and since when #1 has led (X2's rule)
  const data=await p.evaluate(()=>{const col={GPT:3,KIMI:5,CLAUDE:7,GROK:9};const g=SHEET.filter(r=>r[12]!==''&&r[12]!=null);
   const st=n=>{const rs=g.slice(0,n);return Object.keys(col).map(k=>{const c=col[k];let made=0,right=0,miss=0;rs.forEach(r=>{if(!r[c])return;made++;const a=+r[12],d=r[c]==='UP'?1:-1;if(Math.sign(a)===d)right++;miss+=Math.abs(+r[c+1]*d-a)});return {k,made,right,hr:made?right/made:0,am:made?miss/made:0,el:made>=rs.length/2}}).sort((a,b)=>(b.el-a.el)||(b.hr-a.hr)||(a.am-b.am))};
   const now=st(g.length);let since=g.length;while(since>1&&st(since-1)[0].k===now[0].k)since--;
   const D=[...document.querySelectorAll('#standings li.lbr')].map(li=>{const name=li.querySelector('.pc-t h3').textContent.trim(),m=now.find(x=>x.k===name.toUpperCase());const bs=li.querySelectorAll('.lb-c b');
    return {rank:+li.querySelector('.rk').textContent.replace(/\D/g,''),name,model:li.querySelector('.pc-t small').textContent.trim(),lg:li.querySelector('.lg').outerHTML.replace(/ style="[^"]*transform[^"]*"/,m=>m.replace(/transform:[^;"]*;?/,'')),
     l5:[...li.querySelectorAll('.x2p-l5 .fq i')].map(i=>i.className),hit:bs[0].textContent.trim(),hitN:m?m.hr*100:parseFloat(bs[0].textContent),roi:bs[1].textContent.trim(),usd:(li.querySelector('.lb-c.roi small')||{}).textContent||'',right:m&&m.right,made:m&&m.made}});
   return {D,X:{n:g.length,since}}});
  await p.evaluate(h=>{const fl=document.querySelector('#standings .x2p-flip');const w=document.createElement('div');w.innerHTML=h;fl.before(w.firstElementChild)},o.build(data.D,data.X));
  console.log(V,'since R'+data.X.since,data.D.map(d=>d.name+' '+d.hitN.toFixed(1)).join(', '))}
await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('standings').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:z.bottom-a.top+26}});
await p.screenshot({path:`${OUT}/r17-${V}-${W}.png`,clip:c,fullPage:true});
const m=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),q=document.querySelector('#standings .q')||document.querySelector('#standings .x2p-flip'),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();
 return 'board top '+Math.round(q.getBoundingClientRect().top-a.top)+'px under the head, section '+Math.round(z.bottom-a.top)+'px, page width '+document.documentElement.scrollWidth});
console.log(V,W,m,errs.length?'ERR '+errs.join('|'):'');await b.close()})();
