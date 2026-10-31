// Round 16 mockups on the built X2+ page (owner, 2026-10-22: redesign the standings TABLE itself, carte blanche: "the format, the
// aesthetics, the fonts, everything can be changed", in the site's colours and paper-manga world; the board is what matters,
// the three rules are secondary and must read that way to a new viewer). Five different objects, each built from the page's own
// rows and the sheet; the rules keep the owner's words and become the object's fine print. The "As it stands" ticket stays.
// node launch-r16-board.js <option> <outdir> [width]   option: now P R M D H
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'P',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const G='https://fonts.googleapis.com/css2?';
const S='html.x2p.x2d[data-theme] #standings';
const BASE=`
 ${S} .x2p-strap,${S} .x2p-flip,${S} .lbh{display:none!important}
 ${S} .q{position:relative;margin:18px 0 0;color:#f3ead6}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:8px;box-shadow:0 0 0 2px #000;transform:none!important;margin:0!important}
 ${S} .q .lg svg,${S} .q .lg img{width:64%;height:64%}
 ${S} .q .q-l5{display:inline-flex;gap:3px}
 ${S} .q .q-l5 i{width:15px;height:15px;display:grid;place-items:center;font:800 10px/1 Barlow,sans-serif;font-style:normal;border:1.5px solid #000;border-radius:3px;background:#3a3640;color:#f3ead6}
 ${S} .q .q-l5 i.g{background:#4fe39a;color:#0b3b22}${S} .q .q-l5 i.r{background:#ff6158;color:#4a0a06}
 ${S} .q .q-lc{text-transform:none}
 ${S} .q .tnum{font-variant-numeric:tabular-nums}`;
const RULES=['4 AI<span class="q-lc">s</span> predict a stock\'s move <em>before</em> it reports.','Graded at the next market close <em>after</em> earnings.','In public, every earnings season.'];
const l5=a=>'<span class="q-l5" aria-hidden="true">'+a.map(c=>'<i class="'+c+'">'+(c==='g'?'✓':c==='r'?'✗':'–')+'</i>').join('')+'</span>';
const O={
 now:{fonts:[],css:'',build:null},
 // P: the main event: a letterpress fight poster. #1 is the headliner (wood-type name, its hit rate in red ink), the other three
 // are the undercard in three columns; the rules are the poster's fine print at the foot
 P:{fonts:['family=Alfa+Slab+One'],css:`
  ${S} .q-P{background:var(--paper) 0 0/240px 240px;border:2px solid #000;box-shadow:5px 5px 0 #000;padding:12px 14px 12px;color:#17151b;text-align:center}
  ${S} .q-P::before{content:"";position:absolute;inset:5px;border:1.5px solid rgba(20,18,23,.7);pointer-events:none}
  ${S} .q-P .q-top{display:flex;justify-content:space-between;padding:3px 4px 8px;border-bottom:1.5px solid rgba(20,18,23,.7);font:italic 900 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.12em;text-transform:uppercase;color:#a3221a}
  ${S} .q-P .q-rule{display:flex;align-items:center;gap:10px;font:400 12px/1 Anton,sans-serif;letter-spacing:.34em;text-transform:uppercase;color:#17151b}
  ${S} .q-P .q-rule::before,${S} .q-P .q-rule::after{content:"";flex:1;height:1.5px;background:rgba(20,18,23,.7)}
  ${S} .q-P .q-me{margin:12px 0 2px}
  ${S} .q-P .q-h1 .lg{width:48px;height:48px;margin:8px auto 5px!important;border-radius:50%;box-shadow:0 0 0 2px #000,3px 3px 0 #000}
  ${S} .q-P .q-nm{display:block;font:400 60px/.92 "Alfa Slab One",serif;letter-spacing:.01em;text-transform:uppercase;color:#17151b;text-shadow:0 1px 0 rgba(255,255,255,.65),0 -1px 0 rgba(0,0,0,.25)}
  ${S} .q-P .q-md{display:block;margin-top:7px;font:italic 800 12px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.12em;text-transform:uppercase;color:#a3221a}
  ${S} .q-P .q-big{display:block;margin-top:8px;font:400 52px/.95 Anton,sans-serif;color:#a3221a;text-shadow:0 1px 0 rgba(255,255,255,.6)}
  ${S} .q-P .q-big small{display:block;margin-top:3px;font:italic 800 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.14em;text-transform:uppercase;color:#17151b}
  ${S} .q-P .q-row{display:flex;justify-content:center;align-items:center;gap:14px;margin-top:11px}
  ${S} .q-P .q-roi{font:400 14px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase}
  ${S} .q-P .q-uc{margin:15px 0 0}
  ${S} .q-P .q-under{display:grid;grid-template-columns:repeat(3,1fr);margin-top:9px;border-top:1.5px solid rgba(20,18,23,.7);border-bottom:1.5px solid rgba(20,18,23,.7)}
  ${S} .q-P .q-u{display:grid;justify-items:center;gap:5px;padding:10px 2px 10px}
  ${S} .q-P .q-u+.q-u{border-left:1px solid rgba(20,18,23,.45)}
  ${S} .q-P .q-u .lg{width:30px;height:30px;border-radius:50%}
  ${S} .q-P .q-rk{font:400 13px/1 Anton,sans-serif;letter-spacing:.08em;color:#a3221a}
  ${S} .q-P .q-n2{font:400 19px/1 "Alfa Slab One",serif;text-transform:uppercase}
  ${S} .q-P .q-pc{font:400 27px/1 Anton,sans-serif}
  ${S} .q-P .q-u .q-l5 i{width:12px;height:12px;font-size:8px;border-width:1.2px}
  ${S} .q-P .q-r2{font:italic 800 10.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.08em;text-transform:uppercase;color:rgba(20,18,23,.75)}
  ${S} .q-P .q-fine{margin:10px 4px 2px;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.72);text-wrap:balance}
  ${S} .q-P .q-fine b{color:#a3221a;font-weight:800}${S} .q-P .q-fine em{font-style:normal;color:#a3221a}`,
  build:(D,X)=>{const a=D[0];return `<div class="q q-P">
   <div class="q-top"><span>★ $EZ Season 1 ★</span><span>After ${X.n} rounds</span></div>
   <div class="q-rule q-me">Main event</div>
   <div class="q-h1">${a.lg}<span class="q-nm">${a.name}</span><span class="q-md">${a.model} · #1 since R${X.since}</span>
    <span class="q-big tnum">${a.hit}<small>right on direction</small></span>
    <div class="q-row">${l5(a.l5)}<span class="q-roi tnum">ROI ${a.roi}</span></div></div>
   <div class="q-rule q-uc">The undercard</div>
   <div class="q-under">${D.slice(1).map(d=>`<div class="q-u"><span class="q-rk">#${d.rank}</span>${d.lg}<span class="q-n2">${d.name}</span><span class="q-pc tnum">${d.hit}</span>${l5(d.l5)}<span class="q-r2 tnum">ROI ${d.roi}</span></div>`).join('')}</div>
   <div class="q-fine"><b>The rules.</b> ${RULES.join(' ')}</div></div>`}},
 // R: the race: an athletics track, one lane per AI (lane = rank). Each AI's token stands at its hit rate on a 30 to 80% scale,
 // its last five calls trail behind it as footprints, and a gold "coin flip" line marks 50%. The rules sit on the trackside board
 R:{fonts:[],css:`
  ${S} .q-R .q-cf{position:relative;height:22px}
  ${S} .q-R .q-cf span{position:absolute;bottom:4px;transform:translateX(-50%);white-space:nowrap;font:italic 900 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase;color:#f2b632}
  ${S} .q-R .q-track{position:relative;border:2px solid #000;box-shadow:5px 5px 0 #000;background:#a83a2c;border-top:7px solid #1f7a45;border-bottom:7px solid #1f7a45;
    background-image:radial-gradient(rgba(0,0,0,.16) .7px,transparent 1.2px),radial-gradient(rgba(255,220,200,.12) .7px,transparent 1.2px);background-size:4px 4px,5px 5px;background-position:0 0,2px 3px}
  ${S} .q-R .q-lane{position:relative;height:62px}
  ${S} .q-R .q-lane+.q-lane{border-top:2px solid rgba(255,248,236,.9)}
  ${S} .q-R .q-lead{background:linear-gradient(90deg,rgba(242,182,50,.32),rgba(242,182,50,.05) 70%)}
  ${S} .q-R .q-start{position:absolute;left:0;top:0;bottom:0;width:96px;display:grid;grid-template-columns:22px 1fr;align-items:center;column-gap:6px;padding-left:9px;border-right:3px solid rgba(255,248,236,.95)}
  ${S} .q-R .q-ln{grid-row:span 2;font:400 26px/1 Anton,sans-serif;color:#fff8ec;text-align:center}
  ${S} .q-R .q-lead .q-ln{color:#f2b632;text-shadow:2px 2px 0 #000}
  ${S} .q-R .q-nm{align-self:end;font:400 15px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#fff8ec}
  ${S} .q-R .q-md{align-self:start;margin-top:3px;white-space:nowrap;font:600 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.04em;color:rgba(255,248,236,.82)}
  ${S} .q-R .q-run{position:absolute;top:50%;display:flex;align-items:center}
  ${S} .q-R .q-run .lg{width:32px;height:32px;transform:translate(-50%,0)!important;box-shadow:0 0 0 2px #000,3px 3px 0 #000;margin-left:0!important}
  ${S} .q-R .q-lead .q-run .lg{width:38px;height:38px;box-shadow:0 0 0 2px #000,0 0 0 4.5px #f2b632,4px 4px 0 #000}
  ${S} .q-R .q-run{transform:translateY(-50%)}
  ${S} .q-R .q-trail{position:absolute;right:calc(100% + 22px);display:flex;gap:4px}
  ${S} .q-R .q-lead .q-trail{right:calc(100% + 28px)}
  ${S} .q-R .q-trail i{width:8px;height:8px;border-radius:50%;border:1.5px solid #000;background:#3a3640}
  ${S} .q-R .q-trail i.g{background:#4fe39a}${S} .q-R .q-trail i.r{background:#ff6158}
  ${S} .q-R .q-trail i:nth-child(1){opacity:.55}${S} .q-R .q-trail i:nth-child(2){opacity:.7}${S} .q-R .q-trail i:nth-child(3){opacity:.85}
  ${S} .q-R .q-pc{position:absolute;left:calc(100% - 10px);font:400 22px/1 Anton,sans-serif;color:#fff8ec;text-shadow:2px 2px 0 #000;white-space:nowrap}
  ${S} .q-R .q-lead .q-pc{left:calc(100% - 6px);font-size:27px;color:#f2b632}
  ${S} .q-R .q-line{position:absolute;top:-7px;bottom:-7px;border-left:2.5px dashed #f2b632;z-index:0;pointer-events:none}
  ${S} .q-R .q-axis{position:relative;height:20px;margin-top:6px}
  ${S} .q-R .q-axis span{position:absolute;transform:translateX(-50%);font:600 10.5px/1 "Barlow Condensed",sans-serif;color:rgba(243,234,214,.6)}
  ${S} .q-R .q-axis span.k{color:#f2b632}${S} .q-R .q-axis span.lg5{white-space:nowrap;letter-spacing:.02em}
  ${S} .q-R .q-board{margin-top:6px;padding:6px 10px 6px;background:#141217;border:1.5px solid #000;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.7);text-wrap:balance}
  ${S} .q-R .q-board b{color:#ff6158;font-weight:800}${S} .q-R .q-board em{font-style:normal;color:#f2b632}`,
  build:(D,X)=>{const lo=30,hi=80,f=v=>(v-lo)/(hi-lo),x=v=>`calc(96px + 22px + (100% - 96px - 22px - 62px) * ${f(v).toFixed(4)})`;
   return `<div class="q q-R"><div class="q-cf"><span style="left:${x(50)}">Coin flip · 50%</span></div>
   <div class="q-track"><i class="q-line" style="left:${x(50)}"></i>${D.map(d=>`<div class="q-lane${d.rank===1?' q-lead':''}">
    <div class="q-start"><span class="q-ln">${d.rank}</span><span class="q-nm">${d.name}</span><span class="q-md tnum">ROI ${d.roi}</span></div>
    <div class="q-run" style="left:${x(d.hitN)}"><span class="q-trail" aria-hidden="true">${d.l5.map(c=>'<i class="'+c+'"></i>').join('')}</span>${d.lg}<span class="q-pc tnum">${d.hit}</span></div></div>`).join('')}</div>
   <div class="q-axis">${[40,50,60,70].map(v=>`<span class="${v===50?'k':''}" style="left:${x(v)}">${v}%</span>`).join('')}<span class="lg5" style="left:48px">●●● last 5 calls</span><span style="left:calc(100% - 30px)">hit rate</span></div>
   <div class="q-board"><b>The rules</b> · ${RULES.join(' · ')}</div></div>`}},
 // M: the splash page: a manga page. #1 gets the splash panel (speed lines, a starburst, its hit rate as a sound effect), the
 // other three share the panel row under it, the one under a coin flip in gloom tone; the rules are the margin note
 M:{fonts:['family=Dela+Gothic+One'],css:`
  ${S} .q-M{background:#f6efdf;border:2px solid #000;box-shadow:5px 5px 0 #000;padding:8px;display:grid;gap:8px;color:#141217}
  ${S} .q-M .q-p1{position:relative;height:238px;border:3px solid #000;background:#fffaf0;overflow:hidden}
  ${S} .q-M .q-p1::before{content:"";position:absolute;inset:-60%;background:repeating-conic-gradient(from 3deg at 50% 50%,#141217 0 1.1deg,transparent 1.1deg 5.5deg);
    -webkit-mask:radial-gradient(circle at 50% 50%,transparent 0 13%,#000 30%);mask:radial-gradient(circle at 50% 50%,transparent 0 13%,#000 30%);transform:translate(-14%,4%)}
  ${S} .q-M .q-p1 .lg{position:absolute;left:31%;top:56%;width:90px;height:90px;border-radius:14px;transform:translate(-50%,-50%) rotate(-6deg)!important;box-shadow:0 0 0 4px #000,8px 8px 0 #000}
  ${S} .q-M .q-burst{position:absolute;left:6px;top:6px;width:66px;height:66px;display:grid;place-items:center;background:#c8372a;color:#fff;font:400 21px/1 "Dela Gothic One",sans-serif;
    clip-path:polygon(50% 0,59% 18%,79% 8%,77% 30%,98% 33%,83% 50%,98% 67%,77% 70%,79% 92%,59% 82%,50% 100%,41% 82%,21% 92%,23% 70%,2% 67%,17% 50%,2% 33%,23% 30%,21% 8%,41% 18%);filter:drop-shadow(0 0 0 #000)}
  ${S} .q-M .q-sfx{position:absolute;right:8px;top:22px;font:400 72px/.9 "Dela Gothic One",sans-serif;color:#f2b632;-webkit-text-stroke:3px #000;paint-order:stroke fill;transform:rotate(-8deg);text-shadow:5px 5px 0 #000;text-align:right}
  ${S} .q-M .q-sfx small{display:inline-block;margin-top:6px;padding:3px 6px 2px;background:#141217;color:#fff;-webkit-text-stroke:0;text-shadow:none;font:400 11px/1 "Dela Gothic One",sans-serif;letter-spacing:.06em}
  ${S} .q-M .q-name{position:absolute;left:10px;bottom:12px;display:grid;justify-items:start;gap:3px}
  ${S} .q-M .q-name b{background:#141217;color:#fff;padding:6px 11px 5px;font:400 27px/1 "Dela Gothic One",sans-serif;transform:skewX(-8deg);box-shadow:4px 4px 0 #c8372a}
  ${S} .q-M .q-name span{background:#fff;border:2px solid #000;padding:2px 6px;font:700 11px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase}
  ${S} .q-M .q-st{position:absolute;right:10px;bottom:12px;display:grid;justify-items:end;gap:5px;background:#fff;border:2px solid #000;padding:6px 8px;box-shadow:3px 3px 0 #000}
  ${S} .q-M .q-st span{font:400 12px/1 "Dela Gothic One",sans-serif}
  ${S} .q-M .q-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 3px}
  ${S} .q-M .q-p{position:relative;transform:skewX(-4deg);border:3px solid #000;background:#fffaf0;min-height:154px}
  ${S} .q-M .q-p>div{transform:skewX(4deg);display:grid;justify-items:center;gap:5px;padding:24px 4px 9px}
  ${S} .q-M .q-p .lg{width:36px;height:36px}
  ${S} .q-M .q-pr{position:absolute;left:-3px;top:-3px;background:#141217;color:#fff;padding:4px 7px 3px;font:400 13px/1 "Dela Gothic One",sans-serif}
  ${S} .q-M .q-n{font:400 15px/1 "Dela Gothic One",sans-serif}
  ${S} .q-M .q-pc{font:400 30px/1 "Dela Gothic One",sans-serif}
  ${S} .q-M .q-p .q-l5 i{width:12px;height:12px;font-size:8px;border-width:1.2px}
  ${S} .q-M .q-r{font:700 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#4a4552}
  ${S} .q-M .q-gloom{background:radial-gradient(circle,rgba(20,18,23,.3) 0 .9px,transparent 1.3px) 0 0/5px 5px,#ece5d5}
  ${S} .q-M .q-gloom::before{content:"";position:absolute;left:8%;right:8%;top:0;height:46%;background:repeating-linear-gradient(90deg,rgba(20,18,23,.5) 0 1.5px,transparent 1.5px 7px);-webkit-mask:linear-gradient(#000,transparent);mask:linear-gradient(#000,transparent)}
  ${S} .q-M .q-note{padding:1px 4px 0;font:italic 600 11px/1.4 "Barlow Condensed",sans-serif;color:#4a4552;text-wrap:balance}
  ${S} .q-M .q-note b{font-style:normal;color:#a3221a;font-weight:800}${S} .q-M .q-note em{font-style:normal;color:#a3221a;font-weight:700}`,
  build:(D,X)=>{const a=D[0];return `<div class="q q-M"><div class="q-p1">${a.lg}<span class="q-burst">#1</span>
   <div class="q-sfx tnum">${a.hit}<br><small>RIGHT ON DIRECTION</small></div>
   <div class="q-name"><b>${a.name}</b><span>${a.model} · on top since R${X.since}</span></div>
   <div class="q-st">${l5(a.l5)}<span class="tnum">ROI ${a.roi}</span></div></div>
   <div class="q-row">${D.slice(1).map(d=>`<div class="q-p${d.hitN<50?' q-gloom':''}"><span class="q-pr">#${d.rank}</span><div>${d.lg}<span class="q-n">${d.name}</span><span class="q-pc tnum">${d.hit}</span>${l5(d.l5)}<span class="q-r tnum">ROI ${d.roi}</span></div></div>`).join('')}</div>
   <div class="q-note">※ <b>The rules:</b> ${RULES.join(' ')}</div></div>`}},
 // D: the podium: a folded-paper podium in the strap lettering's origami (a lit face and a shaded face), gold for #1, #4 on the
 // low block beside it; the last five and ROI on the floor strip, the rules on the plinth
 D:{fonts:[],css:`
  ${S} .q-D .q-stage{display:grid;grid-template-columns:24fr 30fr 24fr 22fr;align-items:end;padding:0 2px}
  ${S} .q-D .q-col{display:grid;justify-items:center;min-width:0}
  ${S} .q-D .q-who{display:grid;justify-items:center;gap:6px;margin-bottom:9px}
  ${S} .q-D .q-who .lg{width:40px;height:40px;box-shadow:0 0 0 2px #000,3px 3px 0 #000}
  ${S} .q-D .q-c1 .q-who .lg{width:56px;height:56px;box-shadow:0 0 0 2px #000,0 0 0 4.5px #f2b632,4px 4px 0 #000}
  ${S} .q-D .q-crown{font-size:20px;line-height:1;margin-bottom:-2px}
  ${S} .q-D .q-nm{font:400 15px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#f3ead6}
  ${S} .q-D .q-c1 .q-nm{font-size:20px;color:#f2b632}
  ${S} .q-D .q-step{width:100%;filter:drop-shadow(4px 4px 0 #000)}
  ${S} .q-D .q-tp{display:block;height:11px;background:#fbf3df;clip-path:polygon(7% 0,93% 0,100% 100%,0 100%);border-bottom:2px solid #000}
  ${S} .q-D .q-c1 .q-tp{background:#ffe7a0}
  ${S} .q-D .q-fr{display:grid;justify-items:center;align-content:start;padding-top:9px;border:2px solid #000;border-top:0;background:linear-gradient(162deg,#efe4c8 0 52%,#cdbf9c 52% 100%)}
  ${S} .q-D .q-c1 .q-fr{background:linear-gradient(162deg,#ffd76a 0 52%,#e2a823 52% 100%);height:138px}
  ${S} .q-D .q-c2 .q-fr{height:108px}${S} .q-D .q-c3 .q-fr{height:86px}${S} .q-D .q-c4 .q-fr{height:68px}
  ${S} .q-D .q-c4{margin-left:6px}
  ${S} .q-D .q-num{font:400 46px/.9 Anton,sans-serif;color:#141217;text-shadow:0 1px 0 rgba(255,255,255,.55)}
  ${S} .q-D .q-c1 .q-num{font-size:66px}${S} .q-D .q-c4 .q-num{font-size:32px}
  ${S} .q-D .q-pc{margin-top:4px;font:400 20px/1 Anton,sans-serif;color:#141217}
  ${S} .q-D .q-c1 .q-pc{font-size:27px}${S} .q-D .q-c4 .q-pc{font-size:17px;margin-top:2px}
  ${S} .q-D .q-c1 .q-pc small{display:block;margin-top:3px;font:italic 800 9.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase}
  ${S} .q-D .q-floor{display:grid;grid-template-columns:24fr 30fr 24fr 22fr;margin-top:0;padding:9px 2px 9px;background:#141217;border:2px solid #000;box-shadow:5px 5px 0 #000}
  ${S} .q-D .q-fl{display:grid;justify-items:center;gap:5px;min-width:0}
  ${S} .q-D .q-fl .q-l5{gap:2px}${S} .q-D .q-fl .q-l5 i{width:11px;height:11px;font-size:7.5px;border-width:1.2px;border-radius:2px}
  ${S} .q-D .q-fl span.r{font:600 10.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.04em;color:rgba(243,234,214,.75)}
  ${S} .q-D .q-plinth{margin:10px 6px 0;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(243,234,214,.66);text-align:center;text-wrap:balance}
  ${S} .q-D .q-plinth b{color:#ff6158;font-weight:800}${S} .q-D .q-plinth em{font-style:normal;color:#f2b632}`,
  build:(D,X)=>{const ord=[1,0,2,3].map(i=>D[i]);return `<div class="q q-D"><div class="q-stage">${ord.map(d=>`<div class="q-col q-c${d.rank}">
    <div class="q-who">${d.rank===1?'<span class="q-crown" aria-hidden="true">👑</span>':''}${d.lg}<span class="q-nm">${d.name}</span></div>
    <div class="q-step"><i class="q-tp"></i><div class="q-fr"><span class="q-num">${d.rank}</span><span class="q-pc tnum">${d.hit}${d.rank===1?'<small>on direction</small>':''}</span></div></div></div>`).join('')}</div>
   <div class="q-floor">${ord.map(d=>`<div class="q-fl">${l5(d.l5)}<span class="r tnum">ROI ${d.roi}</span></div>`).join('')}</div>
   <div class="q-plinth"><b>The rules</b> · ${RULES.join(' · ')}</div></div>`}},
 // H: the hand: four playing cards fanned like a hand you hold, #1 face up in front, the others showing their corner index
 // (rank, logo as the suit, hit rate) the way a card player reads a hand; the rules on the small rules card that comes in the box
 H:{fonts:[],css:`
  ${S} .q-H .q-fan{position:relative;height:292px;margin:4px 0 0}
  ${S} .q-H .q-cd{position:absolute;top:14px;width:150px;height:250px;background:var(--paper) 0 0/220px 220px;border:2px solid #000;border-radius:12px;box-shadow:4px 5px 0 #000;transform-origin:50% 100%;color:#141217}
  ${S} .q-H .q-cd::before{content:"";position:absolute;inset:6px;border:1.5px solid rgba(20,18,23,.7);border-radius:8px;pointer-events:none}
  ${S} .q-H .q-c1::before{border:3px solid #f2b632;box-shadow:inset 0 0 0 1.5px #000,0 0 0 1.5px #000}
  ${S} .q-H .q-c1{left:22px;transform:rotate(-5deg);z-index:4}
  ${S} .q-H .q-c2{left:80px;transform:rotate(1deg);z-index:3}
  ${S} .q-H .q-c3{left:128px;transform:rotate(6deg);z-index:2}
  ${S} .q-H .q-c4{left:170px;transform:rotate(11deg);z-index:1}
  ${S} .q-H .q-ix{position:absolute;top:13px;right:12px;display:grid;justify-items:center;gap:4px;width:38px}
  ${S} .q-H .q-ix b{font:400 30px/.85 Anton,sans-serif}
  ${S} .q-H .q-ix .lg{width:22px;height:22px;border-radius:5px;box-shadow:0 0 0 1.5px #000}
  ${S} .q-H .q-ix span{font:400 15px/1 Anton,sans-serif}
  ${S} .q-H .q-ix i{font:400 13px/1 Anton,sans-serif;font-style:normal;letter-spacing:.05em;writing-mode:vertical-rl;text-transform:uppercase;margin-top:4px}
  ${S} .q-H .q-ix.bl{top:auto;right:auto;bottom:13px;left:12px;transform:rotate(180deg)}
  ${S} .q-H .q-c1 .q-ix b{color:#a3221a}
  ${S} .q-H .q-face{position:absolute;left:12px;right:12px;top:78px;bottom:14px;display:grid;justify-items:center;align-content:start;gap:4px;text-align:center}
  ${S} .q-H .q-c1>.lg{position:absolute;left:15px;top:16px;width:50px;height:50px;box-shadow:0 0 0 2px #000,3px 3px 0 #000}
  ${S} .q-H .q-face .q-nm{font:400 30px/1 Anton,sans-serif;letter-spacing:.04em;text-transform:uppercase}
  ${S} .q-H .q-face .q-md{font:700 10px/1.15 "Barlow Condensed",sans-serif;letter-spacing:.05em;text-transform:uppercase;color:#4a4552}
  ${S} .q-H .q-face .q-pc{margin-top:3px;font:400 44px/.9 Anton,sans-serif;color:#a3221a}
  ${S} .q-H .q-face .q-pc small{display:block;margin-top:3px;font:italic 800 9.5px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.1em;text-transform:uppercase;color:#141217}
  ${S} .q-H .q-face .q-l5 i{width:13px;height:13px;font-size:8.5px}
  ${S} .q-H .q-face .q-r{font:400 12px/1 Anton,sans-serif;letter-spacing:.06em}
  ${S} .q-H .q-rc{width:min(78%,330px);margin:2px auto 0;padding:8px 12px 9px;background:#efe6cf;border:1.5px solid #000;border-radius:6px;box-shadow:3px 3px 0 #000;transform:rotate(-1.2deg);color:#141217;font:600 10.5px/1.45 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase;text-align:center;text-wrap:balance}
  ${S} .q-H .q-rc b{display:block;margin-bottom:2px;font:italic 900 11px/1 Archivo,sans-serif;font-stretch:62%;letter-spacing:.12em;color:#a3221a}
  ${S} .q-H .q-rc em{font-style:normal;color:#a3221a}`,
  build:(D,X)=>{const ix=(d,c)=>d.rank===1?`<span class="q-ix"><b>${d.rank}</b>${d.lg}</span>`:`<span class="q-ix"><b>${d.rank}</b>${d.lg}<span class="tnum">${d.hit}</span><i>${d.name}</i></span>`;
   return `<div class="q q-H"><div class="q-fan">${D.map(d=>`<div class="q-cd q-c${d.rank}">${ix(d,'')}${d.rank===1?`${d.lg}<div class="q-face"><span class="q-nm">${d.name}</span><span class="q-md">${d.model}<br>#1 since R${X.since}</span><span class="q-pc tnum">${d.hit}<small>right on direction</small></span>${l5(d.l5)}<span class="q-r tnum">ROI ${d.roi}</span></div>`:''}</div>`).join('')}</div>
   <div class="q-rc"><b>The rules</b>${RULES.join(' ')}</div></div>`}},
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
     l5:[...li.querySelectorAll('.x2p-l5 .fq i')].map(i=>i.className),hit:bs[0].textContent.trim(),hitN:m?m.hr*100:parseFloat(bs[0].textContent),roi:bs[1].textContent.trim(),right:m&&m.right,made:m&&m.made}});
   return {D,X:{n:g.length,since}}});
  await p.evaluate(h=>{const fl=document.querySelector('#standings .x2p-flip');const w=document.createElement('div');w.innerHTML=h;fl.before(w.firstElementChild)},o.build(data.D,data.X));
  console.log(V,'since R'+data.X.since,data.D.map(d=>d.name+' '+d.hitN.toFixed(1)).join(', '))}
await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('standings').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();return {x:0,y:a.top+scrollY-12,width:innerWidth,height:z.bottom-a.top+26}});
await p.screenshot({path:`${OUT}/r16-${V}-${W}.png`,clip:c,fullPage:true});
const m=await p.evaluate(()=>{const a=document.querySelector('#standings .sh').getBoundingClientRect(),q=document.querySelector('#standings .q')||document.querySelector('#standings .x2p-flip'),z=document.querySelector('#standings .x2p-astf').getBoundingClientRect();
 return 'board top '+Math.round(q.getBoundingClientRect().top-a.top)+'px under the head, section '+Math.round(z.bottom-a.top)+'px, page width '+document.documentElement.scrollWidth});
console.log(V,W,m,errs.length?'ERR '+errs.join('|'):'');await b.close()})();
