// Round 20 mockups on the built X2+ page (owner, 2026-10-23: five takes on the proof, "everything has to feel integrated, not slapped
// on", the way the NVIDIA bet ticket and the ticket board changed: every mark is a print process on the material (ink that lets the
// card through, foil stamped into it, a stamp, a die-cut, a crease), nothing is a digital box laid on top). All open on ROI; every
// line in its model's colour, the ROI leader's line in gold, each line named where it ends. The numbers and lines are the page's own.
// 1 ticket (the bet ticket's card)  2 certificate (an engraved stock certificate)  3 origami (folded paper ribbons)
// 4 market page (a newspaper clipping)  5 manga (an inked page with screentone)
// node launch-r20-proof.js <option> <outdir> [width]   option: tk ct or nw mg
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'tk',OUT=process.argv[3]||'.',W=+process.argv[4]||390;
const S='html.x2p.x2d[data-theme] #learn';
const COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#141217'};
// the folded faces of each model's colour (origami): a lit face and a shaded face
const FACE={KIMI:['#5ea3ff','#1559b5'],CLAUDE:['#eb9d81','#a9533a'],GROK:['#4c4752','#141217'],GOLD:['#f6d67c','#b8841c']};
const TABS=['Hit rate','ROI','Avg miss','Sector'];
const FONTS='https://fonts.googleapis.com/css2?family=Cormorant+SC:wght@600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&family=Pirata+One&display=swap';
const INK='rgba(20,18,23,.88)',PRESS='0 1px 0 rgba(255,251,238,.75),0 -.6px 0 rgba(0,0,0,.2)';
const SCAL='radial-gradient(5px at 0 50%,#0000 97%,#000) 0 0/51% 12px repeat-y,radial-gradient(5px at 100% 50%,#0000 97%,#000) 100% 0/51% 12px repeat-y';
// guilloche: fine interlaced sine waves, one tile for the top and bottom bands, the same turned for the sides (green intaglio ink)
function gu(vert){const L=[],w=24,h=10;for(let k=0;k<6;k++){const f=k*Math.PI/3;let a=[],b=[];for(let x=0;x<=w;x+=.5){a.push([x,h/2+3.6*Math.sin(2*Math.PI*x/w+f)]);b.push([x,h/2+1.8*Math.sin(4*Math.PI*x/w+f)])}
  [a,b].forEach(p=>L.push('<polyline fill="none" stroke="#2c6a48" stroke-width=".42" points="'+p.map(q=>(vert?[q[1],q[0]]:q).map(n=>n.toFixed(2)).join(',')).join(' ')+'"/>'))}
  const sv='<svg xmlns="http://www.w3.org/2000/svg" width="'+(vert?h:w)+'" height="'+(vert?w:h)+'">'+L.join('')+'</svg>';return 'url("data:image/svg+xml,'+encodeURIComponent(sv)+'")'}
// a scissor-cut edge for the clipping: nearly straight, small irregular steps
function cut(){let s=7,r=()=>{s=s*16807%2147483647;return s/2147483647};const p=[];
  for(let x=0;x<=100;x+=4)p.push(`${x}% ${(r()*2.4).toFixed(1)}px`);for(let y=0;y<=100;y+=3)p.push(`calc(100% - ${(r()*2.4).toFixed(1)}px) ${y}%`);
  for(let x=100;x>=0;x-=4)p.push(`${x}% calc(100% - ${(r()*2.4).toFixed(1)}px)`);for(let y=100;y>=0;y-=3)p.push(`${(r()*2.4).toFixed(1)}px ${y}%`);return `polygon(${p.join(',')})`}
const BASE=`
 ${S} .rsw2,${S} #rflip{display:none!important}
 ${S} .q{position:relative;margin:16px 0 0;color:${INK}}
 ${S} .q .tnum{font-variant-numeric:tabular-nums lining-nums}
 ${S} .q .lg{display:inline-grid!important;place-items:center;flex:none;border-radius:4px;transform:none!important;margin:0!important;box-shadow:none!important}
 ${S} .q .lg svg{width:66%;height:66%}
 /* a logo printed onto the stock: multiplied (its black prints as ink, its white is the card) */
 ${S} .q .lp .lg{mix-blend-mode:multiply;opacity:.92}
 /* a logo printed in one ink, the line's own colour, no box */
 ${S} .q .l1 .lg{background:none!important;color:var(--c)}${S} .q .l1 .lg svg *{fill:currentColor!important}
 ${S} .q .q-ch{position:relative}
 ${S} .q .q-ch>svg{position:absolute;left:0;top:0;overflow:visible}${S} .q .q-ch>svg.ink{mix-blend-mode:multiply}
 ${S} .q .q-lb{position:absolute;transform:translateY(-50%);display:flex;align-items:center;gap:4px;white-space:nowrap}
 ${S} .q .q-lb .lg{width:15px;height:15px}
 ${S} .q .q-ax{position:relative;height:14px;font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.72)}
 ${S} .q .q-ax span{position:absolute;top:3px}${S} .q .q-ax span:last-child{right:0}
 ${S} .q .q-ax span.q-k{left:50%;transform:translateX(-50%);white-space:nowrap}
 ${S} .q .q-ax span.q-k::before{content:"";display:inline-block;width:18px;margin-right:5px;vertical-align:3px;border-top:1.5px dashed currentColor}
 ${S} .q .q-u{color:rgba(29,107,60,.95)}${S} .q .q-d{color:rgba(163,34,26,.95)}
 /* foil stamped into the stock, as on the bet ticket's NVIDIA: a satin gold with the card's grain through it, a dark wall above each
    stroke and a pale lip below */
 ${S} .q .fo{position:relative;display:inline-block;font-style:normal;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:0 -1px 0 rgba(70,42,6,.55),0 1.2px 0 rgba(255,250,232,.85)!important}
 ${S} .q .fo::after{content:attr(data-t);position:absolute;left:0;top:0;right:0;text-shadow:none;white-space:nowrap;
   background:var(--paper) 0 0/240px 240px,linear-gradient(172deg,#f6dc93 0%,#e4b54a 30%,#c99227 52%,#e7bd5b 70%,#bf8a22 100%);background-blend-mode:multiply,normal;
   -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}`;
const ax=X=>`<div class="q-ax" style="margin-right:var(--gut)"><span>R1</span><span class="q-k">Start: $100,000</span><span>R${X.n}</span></div>`;
const fo=t=>`<em class="fo" data-t="${t}">${t}</em>`;
const pct=t=>`<span class="${t.up?'q-u':'q-d'}">${t.up?'▲':'▼'} ${t.pct}</span>`;
const O={
 // 1: the bet ticket's own card. Scalloped sides, green and red bands printed on it, a printed double frame; the four views are printed
 // boxes with ROI foil-stamped; the ranking printed in ink with #1's name in foil; the lines printed in ink and the leader's line
 // foil-stamped into the card like NVIDIA
 tk:{chart:{kind:'tk',h:196,gut:66,w:2.1,fw:3.2,rough:.9,gap:19},css:`
  ${S} .q-tk{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-tk .t-cd{position:relative;background:var(--paper) 0 0/240px 240px,#efe4c8;-webkit-mask:${SCAL};mask:${SCAL}}
  ${S} .q-tk .t-bd{display:flex;justify-content:space-between;align-items:center;height:24px;padding:0 18px;font:800 8.6px/1 "Barlow Condensed",sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#f3ead3}
  ${S} .q-tk .t-bd i{font-style:normal;color:#f2b632}
  ${S} .q-tk .t-bd.g{background:var(--paper) 0 0/240px 240px,#1f7a45;background-blend-mode:multiply}${S} .q-tk .t-bd.r{background:var(--paper) 0 0/240px 240px,#c8372a;background-blend-mode:multiply}
  ${S} .q-tk .t-in{margin:8px 13px;padding:9px 10px 8px;border:1.5px solid rgba(20,18,23,.7);outline:.7px solid rgba(20,18,23,.5);outline-offset:-5px}
  ${S} .q-tk .t-tb{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:1px solid rgba(20,18,23,.5);margin:2px 0 6px}
  ${S} .q-tk .t-tb span{display:grid;place-items:center;height:30px;font:400 12px/1 Anton,sans-serif;letter-spacing:.07em;text-transform:uppercase;color:rgba(20,18,23,.48);text-shadow:${PRESS}}
  ${S} .q-tk .t-tb span+span{border-left:1px solid rgba(20,18,23,.3)}${S} .q-tk .t-tb span.on{font-size:16px}
  ${S} .q-tk .t-r{display:grid;grid-template-columns:12px 20px minmax(0,1fr) auto 60px;align-items:center;column-gap:7px;height:27px;border-bottom:1px dotted rgba(20,18,23,.45)}
  ${S} .q-tk .t-r .lg{width:19px;height:19px}
  ${S} .q-tk .t-r>b,${S} .q-tk .t-r .nm,${S} .q-tk .t-r .v,${S} .q-tk .t-r .c{font:400 15px/1 Anton,sans-serif;text-shadow:${PRESS}}
  ${S} .q-tk .t-r .nm{letter-spacing:.05em;text-transform:uppercase}${S} .q-tk .t-r .nm .fo{font-size:17px}
  ${S} .q-tk .t-r .c{justify-self:end;font-size:12.5px}
  ${S} .q-tk .q-ch{margin-top:12px}
  ${S} .q-tk .q-lb b{font:400 13px/1 Anton,sans-serif;letter-spacing:.04em;color:color-mix(in srgb,var(--c) 82%,#141217);text-shadow:${PRESS}}
  ${S} .q-tk .q-lb b.fo{font-size:14px}
  ${S} .q-tk .t-cp{margin:6px 0 0;font:600 11px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.74)}${S} .q-tk .t-cp b{color:${INK}}`,
  build:X=>`<div class="q q-tk"><div class="t-cd"><div class="t-bd g"><span><i>★</i> $100,000 on every call <i>★</i></span><span>Season 1</span></div><div class="t-in">
   <div class="t-tb">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t==='ROI'?fo('ROI'):t}</span>`).join('')}</div>
   <div class="lp">${X.tiles.map(t=>`<div class="t-r"><b>${t.rank}</b>${t.lg}<span class="nm">${t.rank===1?fo(t.name):t.name}</span><span class="v tnum">${t.val}</span><span class="c tnum">${pct(t)}</span></div>`).join('')}</div>
   <div class="q-ch lp" id="qch"></div>${ax(X)}<p class="t-cp"><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call.</p></div>
   <div class="t-bd r"><span>Simulated · before fees</span><span>Nº ${String(X.n).padStart(6,'0')}</span></div></div></div>`},
 // 2: an engraved stock certificate: bond paper, a guilloche border in green intaglio ink, the four views as coupons with perforated
 // edges (ROI foil), the ranking as the register of holders with dotted leaders, the lines engraved with the leader's line in foil
 // over fine hatching, a gold foil seal embossed "No. 1"
 ct:{fonts:1,chart:{kind:'ct',h:190,gut:76,w:1.9,fw:3,rough:.6,gap:19},css:`
  ${S} .q-ct{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-ct .c-sh{position:relative;padding:24px 22px 18px;color:#1f3328;
    background:${gu(0)} 0 5px/24px 10px repeat-x,${gu(0)} 0 calc(100% - 5px)/24px 10px repeat-x,${gu(1)} 5px 0/10px 24px repeat-y,${gu(1)} calc(100% - 5px) 0/10px 24px repeat-y,var(--paper) 0 0/240px 240px,#f5f0e1;
    background-blend-mode:multiply,multiply,multiply,multiply,multiply,normal}
  ${S} .q-ct .c-sh::before{content:"";position:absolute;inset:17px 17px;border:1px solid rgba(44,106,72,.75);outline:.6px solid rgba(44,106,72,.5);outline-offset:2px;pointer-events:none}
  ${S} .q-ct .c-tt{text-align:center;font:700 18px/1 "Cormorant SC",serif;letter-spacing:.15em;color:#24563c;text-shadow:0 .6px 0 rgba(0,0,0,.18)}
  ${S} .q-ct .c-st{text-align:center;margin:5px 0 11px;font:italic 500 13px/1.2 "Cormorant Garamond",serif;color:rgba(31,51,40,.86)}
  ${S} .q-ct .c-cp{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin:0 0 11px}
  ${S} .q-ct .c-cp span{display:grid;justify-items:center;align-content:center;gap:3px;height:38px;border:1.4px dashed rgba(44,106,72,.6);font:700 12.5px/1 "Cormorant SC",serif;letter-spacing:.05em;color:rgba(36,86,60,.58)}
  ${S} .q-ct .c-cp small{font:italic 500 10px/1 "Cormorant Garamond",serif;letter-spacing:0}
  ${S} .q-ct .c-cp span.on{border-color:rgba(176,126,30,.85);color:#1f3328}${S} .q-ct .c-cp span.on .fo{font-size:16px}
  ${S} .q-ct .c-hd{font:italic 500 11.5px/1 "Cormorant Garamond",serif;color:rgba(31,51,40,.8);margin:0 0 2px}
  ${S} .q-ct .c-h{display:grid;grid-template-columns:12px 16px auto minmax(10px,1fr) auto 54px;align-items:center;column-gap:6px;height:24px}
  ${S} .q-ct .c-h i{font:italic 600 13px/1 "Cormorant Garamond",serif}
  ${S} .q-ct .c-h .lg{width:15px;height:15px}
  ${S} .q-ct .c-h b{font:700 15px/1 "Cormorant SC",serif;letter-spacing:.06em}${S} .q-ct .c-h b .fo{font-size:16px}
  ${S} .q-ct .c-h .dl{align-self:end;margin-bottom:7px;border-bottom:1.3px dotted rgba(31,51,40,.55)}
  ${S} .q-ct .c-h strong{font:700 16px/1 "Cormorant Garamond",serif}
  ${S} .q-ct .c-h .c{justify-self:end;font:700 13.5px/1 "Cormorant Garamond",serif}
  ${S} .q-ct .q-ch{margin-top:12px}
  ${S} .q-ct .q-lb b{font:700 13px/1 "Cormorant SC",serif;letter-spacing:.03em;color:color-mix(in srgb,var(--c) 80%,#14231b)}
  ${S} .q-ct .q-lb .lg{display:none!important}
  ${S} .q-ct .q-ax{color:rgba(31,51,40,.8);font:700 11px/1 "Cormorant SC",serif;letter-spacing:.06em}
  ${S} .q-ct .c-ft{display:grid;grid-template-columns:1fr 64px;align-items:center;gap:10px;margin-top:6px}
  ${S} .q-ct .c-ft p{margin:0;font:italic 500 13px/1.25 "Cormorant Garamond",serif;color:rgba(31,51,40,.88)}${S} .q-ct .c-ft p b{font-style:normal;font-weight:700}
  ${S} .q-ct .c-ft svg{display:block;width:64px;height:64px}`,
  build:X=>{const w=X.tiles.find(t=>t.rank===1);
   // the seal: a scalloped rosette in gold foil (the card's grain through it), a ring of small type, "No. 1" and the name embossed
   const ro=[];for(let i=0;i<=96;i++){const a=i/96*2*Math.PI,r=30+1.6*Math.cos(a*24);ro.push((32+r*Math.cos(a)).toFixed(2)+','+(32+r*Math.sin(a)).toFixed(2))}
   const seal=`<svg viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="sF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>
     <filter id="sG" x="0" y="0" width="64" height="64" filterUnits="userSpaceOnUse"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="5" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".4" intercept=".7"/><feFuncG type="linear" slope=".4" intercept=".7"/><feFuncB type="linear" slope=".4" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>
     <path id="sR" d="M32,32 m-21,0 a21,21 0 1,1 42,0 a21,21 0 1,1 -42,0"/></defs>
     <polygon points="${ro.join(' ')}" transform="translate(0,1)" fill="rgba(255,250,232,.85)"/><polygon points="${ro.join(' ')}" transform="translate(0,-.8)" fill="rgba(70,42,6,.5)"/><polygon points="${ro.join(' ')}" fill="url(#sF)" filter="url(#sG)"/>
     <circle cx="32" cy="32" r="24.5" fill="none" stroke="rgba(110,70,10,.55)" stroke-width=".7"/><circle cx="32" cy="32" r="15.5" fill="none" stroke="rgba(110,70,10,.55)" stroke-width=".7"/>
     <text font-family="Cormorant SC,serif" font-weight="700" font-size="5.2" letter-spacing=".6" fill="rgba(110,70,10,.8)"><textPath href="#sR">SEASON 1 · ROI LEADER · SEASON 1 · ROI LEADER ·</textPath></text>
     <g font-family="Cormorant SC,serif" font-weight="700" text-anchor="middle"><text x="32" y="31.4" font-size="9" fill="rgba(255,248,225,.8)">Nº1</text><text x="32" y="30.6" font-size="9" fill="rgba(105,66,8,.85)">Nº1</text>
     <text x="32" y="40.6" font-size="7" letter-spacing=".5" fill="rgba(255,248,225,.8)">${w.name}</text><text x="32" y="39.8" font-size="7" letter-spacing=".5" fill="rgba(105,66,8,.85)">${w.name}</text></g></svg>`;
   return `<div class="q q-ct"><div class="c-sh"><div class="c-tt">Certificate of performance</div><div class="c-st">Season 1 · ${X.n} rounds · $100,000 placed on every call</div>
   <div class="c-cp">${TABS.map((t,i)=>`<span class="${t==='ROI'?'on':''}"><small>Coupon Nº ${i+1}</small>${t==='ROI'?fo('ROI'):t}</span>`).join('')}</div>
   <div class="c-hd">Now worth, by holder:</div><div class="l1">${X.tiles.map(t=>`<div class="c-h" style="--c:${t.rank===1?'#a8770f':t.col}"><i>${t.rank}</i>${t.lg}<b>${t.rank===1?fo(t.name):t.name}</b><span class="dl"></span><strong class="tnum">${t.val}</strong><span class="c tnum">${pct(t)}</span></div>`).join('')}</div>
   <div class="q-ch l1" id="qch"></div>${ax(X)}<div class="c-ft"><p><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call. Simulated, before fees.</p>${seal}</div></div></div>`}},
 // 3: origami. The card has a dog-eared corner; the four views are paper tabs folded once (a lit face and a shaded face, ROI in gold);
 // the ranking is four folded ribbons as long as each AI's money now; the lines are folded paper ribbons with a hard shadow, the leader's
 // in gold; the start is a crease in the card; the names are folded like the straps' lettering
 or:{chart:{kind:'or',h:196,gut:66,hw:2.2,gap:19},css:`
  ${S} .q-or{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-or .o-cd{position:relative;padding:14px 13px 12px;background:var(--paper) 0 0/240px 240px,#efe4c8;clip-path:polygon(0 0,calc(100% - 24px) 0,100% 24px,100% 100%,0 100%)}
  ${S} .q-or .o-dg{position:absolute;right:0;top:0;width:24px;height:24px;background:var(--paper) 0 0/240px 240px,linear-gradient(225deg,transparent 50%,#d3c39c 50%,#e6d8b4);background-blend-mode:multiply,normal;filter:drop-shadow(-1.5px 1.5px 0 rgba(20,18,23,.85))}
  ${S} .q-or .o-tb{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin:0 30px 15px 0}
  ${S} .q-or .o-tb span{display:grid;place-items:center;height:28px;font:400 12px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:rgba(20,18,23,.6);
    background:var(--paper) 0 0/240px 240px,linear-gradient(118deg,#f7efdc 0 54%,#d8caa6 54% 100%);background-blend-mode:multiply,normal;box-shadow:2px 2px 0 rgba(20,18,23,.9)}
  ${S} .q-or .o-tb span.on{color:${INK};font-size:14px;background:var(--paper) 0 0/240px 240px,linear-gradient(118deg,#f6d67c 0 54%,#c39028 54% 100%);background-blend-mode:multiply,normal;transform:translateY(-2px);box-shadow:2px 4px 0 rgba(20,18,23,.9)}
  ${S} .q-or .o-r{display:grid;grid-template-columns:14px minmax(0,1fr) 88px;align-items:center;column-gap:8px;height:31px}
  ${S} .q-or .o-r>b{font:400 16px/1 Anton,sans-serif;text-shadow:${PRESS}}
  ${S} .q-or .o-w{filter:drop-shadow(2px 2px 0 rgba(20,18,23,.9))}
  ${S} .q-or .o-rb{display:flex;align-items:center;gap:6px;width:var(--w);height:23px;padding:0 15px 0 5px;box-sizing:border-box;
    background:var(--paper) 0 0/240px 240px,linear-gradient(180deg,var(--lt) 0 52%,var(--sh) 52% 100%);background-blend-mode:multiply,normal;clip-path:polygon(0 0,100% 0,calc(100% - 9px) 50%,100% 100%,0 100%)}
  ${S} .q-or .o-rb .lg{width:16px;height:16px;mix-blend-mode:normal;opacity:1}
  ${S} .q-or .o-rb i{font:400 13px/1 Anton,sans-serif;font-style:normal;letter-spacing:.05em;text-transform:uppercase;color:var(--tx)}
  ${S} .q-or .o-v{display:grid;justify-items:end;gap:2px}${S} .q-or .o-v strong{font:400 16px/1 Anton,sans-serif;text-shadow:${PRESS}}${S} .q-or .o-v span{font:400 11.5px/1 Anton,sans-serif;text-shadow:${PRESS}}
  ${S} .q-or .q-ch{margin-top:14px}
  ${S} .q-or .q-lb b{font:400 14.5px/1 Anton,sans-serif;letter-spacing:.04em;background:linear-gradient(162deg,var(--lt) 0 52%,var(--sh) 52% 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(1.2px 1.2px 0 rgba(20,18,23,.9))}
  ${S} .q-or .q-ax span.q-k::before{border-top:0;height:2px;background:linear-gradient(rgba(90,66,30,.5) 0 1px,rgba(255,252,240,.85) 1px 2px)}
  ${S} .q-or .o-cp{margin:6px 0 0;font:600 11px/1.35 "Barlow Condensed",sans-serif;color:rgba(20,18,23,.74)}${S} .q-or .o-cp b{color:${INK}}`,
  build:X=>{const mx=Math.max(...X.tiles.map(t=>+t.val.replace(/[$,]/g,'')));
   return `<div class="q q-or"><div class="o-cd"><i class="o-dg"></i><div class="o-tb">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div>
   <div class="lp">${X.tiles.map(t=>{const f=t.rank===1?FACE.GOLD:FACE[t.name],dark=t.rank!==1&&t.name!=='CLAUDE';
     return `<div class="o-r"><b>${t.rank}</b><span class="o-w"><span class="o-rb l1" style="--w:${(+t.val.replace(/[$,]/g,'')/mx*100).toFixed(1)}%;--lt:${f[0]};--sh:${f[1]};--tx:${dark?'#f6efdc':INK};--c:${dark?'#f6efdc':'#141217'}">${t.lg}<i>${t.name}</i></span></span><span class="o-v"><strong class="tnum">${t.val}</strong>${pct(t)}</span></div>`}).join('')}</div>
   <div class="q-ch lp" id="qch"></div>${ax(X).replace('Start: $100,000','Crease: $100,000 start')}<p class="o-cp"><b>What would $100,000 be worth now?</b> Each ribbon is as long as the money now. Buy on an up call, short on a down call. Simulated.</p></div></div>`}},
 // 4: a newspaper market page, cut out: newsprint, a blackletter masthead between rules, the four views as the paper's section index
 // (ROI reversed out of a black box), the result as the headline, a chart printed in spot inks a hair out of register with a gold
 // halftone under the leader's line, the ranking as an agate stock table with the leader's row in a gold dot screen
 nw:{fonts:1,chart:{kind:'nw',h:184,gut:66,w:2,gap:18},css:`
  ${S} .q-nw{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-nw .n-pg{position:relative;padding:12px 15px 14px;color:rgba(27,25,22,.94);background:var(--paper) 0 0/200px 200px,#e3ddcc;background-blend-mode:multiply;clip-path:${cut()}}
  ${S} .q-nw .n-mh{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;padding-bottom:5px;border-bottom:3.5px double rgba(27,25,22,.9)}
  ${S} .q-nw .n-mh small{font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase}${S} .q-nw .n-mh small+b+small{text-align:right}
  ${S} .q-nw .n-mh b{font:400 25px/1 "Pirata One",serif;font-weight:400}
  ${S} .q-nw .n-ix{display:grid;grid-template-columns:repeat(4,1fr);margin:0 0 9px;border-bottom:1px solid rgba(27,25,22,.85)}
  ${S} .q-nw .n-ix span{text-align:center;padding:6px 0 5px;font:700 11px/1 "Barlow Condensed",sans-serif;letter-spacing:.13em;text-transform:uppercase}
  ${S} .q-nw .n-ix span+span{border-left:1px solid rgba(27,25,22,.45)}${S} .q-nw .n-ix span.on{background:rgba(27,25,22,.92);color:#e3ddcc}
  ${S} .q-nw .n-hl{margin:0 0 5px;font:400 31px/.94 Anton,sans-serif;text-transform:uppercase;text-wrap:balance}
  ${S} .q-nw .n-dk{margin:0 0 9px;font:500 13.5px/1.25 "Barlow Condensed",sans-serif;color:rgba(27,25,22,.85)}
  ${S} .q-nw .n-ct{padding-top:4px;border-top:1px solid rgba(27,25,22,.85);font:700 9.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.12em;text-transform:uppercase}
  ${S} .q-nw .q-ch{margin-top:8px}
  ${S} .q-nw .q-lb b{font:700 12.5px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,var(--c) 85%,#1b1916)}
  ${S} .q-nw .q-ax{color:rgba(27,25,22,.8)}
  ${S} .q-nw table{width:100%;margin-top:9px;border-collapse:collapse;font:600 12.5px/1 "Barlow Condensed",sans-serif}
  ${S} .q-nw th{padding:0 0 3px;border-bottom:1px solid rgba(27,25,22,.85);font:700 9px/1 "Barlow Condensed",sans-serif;letter-spacing:.13em;text-transform:uppercase;text-align:left}
  ${S} .q-nw td{padding:4px 0;border-bottom:1px dotted rgba(27,25,22,.45);vertical-align:middle}${S} .q-nw .r{text-align:right}
  ${S} .q-nw td .lg{width:14px;height:14px;vertical-align:-3px;margin-right:6px!important}
  ${S} .q-nw tr.w{background:radial-gradient(rgba(201,146,39,.9) .95px,transparent 1.15px) 0 0/3px 3px;font-weight:700}`,
  build:X=>{const w=X.tiles.find(t=>t.rank===1),k=v=>'$'+(+v.replace(/[$,]/g,'')/1000).toFixed(1)+'K';
   return `<div class="q q-nw"><div class="n-pg"><div class="n-mh"><small>Markets</small><b>The EZ Journal</b><small>Season 1</small></div>
   <div class="n-ix">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div>
   <h3 class="n-hl">${w.name} turns $100K into ${k(w.val)}</h3><p class="n-dk">All in on every call for ${X.n} rounds: buy on an up call, short on a down call. Simulated, before fees.</p>
   <div class="n-ct">Value of $100,000, round by round</div><div class="q-ch l1" id="qch"></div>${ax(X)}
   <table class="l1"><tr><th>AI</th><th class="r">Now</th><th class="r">Chg</th></tr>${X.tiles.map(t=>`<tr class="${t.rank===1?'w':''}" style="--c:${t.rank===1?'#9a6a0c':t.col}"><td>${t.rank}. ${t.lg}${t.name}</td><td class="r tnum">${t.val}</td><td class="r tnum">${pct(t)}</td></tr>`).join('')}</table></div></div>`}},
 // 5: a manga page: one inked page, panels drawn on it. The four views as narration boxes (ROI inked black); the cast row as a panel
 // strip, #1 on gold with focus lines, an AI that lost money in gloom tone; the chart panel inked, the lines coloured over a black
 // ink line, the leader's in gold with its gain as a sound effect, the money lost below the start in screentone
 mg:{chart:{kind:'mg',h:200,gut:64,w:2.1,fw:3,rough:1.1,gap:19},css:`
  ${S} .q-mg{filter:drop-shadow(4px 5px 0 #000)}
  ${S} .q-mg .m-pg{position:relative;display:grid;gap:8px;padding:10px;color:#121014;background:var(--paper) 0 0/240px 240px,#f4f1e8;background-blend-mode:multiply}
  ${S} .q-mg .m-tb{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
  ${S} .q-mg .m-tb span{display:grid;place-items:center;height:26px;border:1.6px solid #121014;font:400 12px/1 Anton,sans-serif;letter-spacing:.06em;text-transform:uppercase}
  ${S} .q-mg .m-tb span.on{background:#121014;color:#f4f1e8;font-size:14px;transform:rotate(-2deg)}
  ${S} .q-mg .m-cs{display:grid;grid-template-columns:1.3fr 1fr 1fr 1fr;border:3px solid #121014;height:86px}
  ${S} .q-mg .m-c{position:relative;display:grid;align-content:center;justify-items:center;gap:3px;overflow:hidden;min-width:0}
  ${S} .q-mg .m-c+.m-c{border-left:3px solid #121014}
  ${S} .q-mg .m-c>*{position:relative;z-index:1}
  ${S} .q-mg .m-c .lg{width:18px;height:18px}
  ${S} .q-mg .m-c b{font:400 13px/1 Anton,sans-serif;letter-spacing:.05em;text-transform:uppercase;padding:0 2px;background:linear-gradient(transparent 62%,var(--hl,var(--c)) 62% 92%,transparent 92%)}
  ${S} .q-mg .m-c strong{font:400 15px/1 Anton,sans-serif}${S} .q-mg .m-c span{font:400 11px/1 Anton,sans-serif}
  ${S} .q-mg .m-c i{position:absolute;left:5px;top:4px;z-index:2;font:400 12px/1 Anton,sans-serif;font-style:normal}
  /* #1 on gold, with focus lines; an AI under water in gloom tone */
  ${S} .q-mg .m-c.w{background:var(--paper) 0 0/240px 240px,#ecc458;background-blend-mode:multiply}
  ${S} .q-mg .m-c.w::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 50% 55%,rgba(18,16,20,.75) 0 1.1deg,transparent 1.1deg 10deg);-webkit-mask:radial-gradient(circle at 50% 55%,transparent 34%,#000 70%);mask:radial-gradient(circle at 50% 55%,transparent 34%,#000 70%)}
  ${S} .q-mg .m-c.w strong{font-size:18px}${S} .q-mg .m-c.w b{font-size:15px;background:none}
  ${S} .q-mg .m-c.dn::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,rgba(18,16,20,.55) 0 1px,transparent 1px 3px);-webkit-mask:linear-gradient(#000,transparent 75%);mask:linear-gradient(#000,transparent 75%)}
  ${S} .q-mg .m-c.dn b{background:linear-gradient(transparent 62%,var(--hl,var(--c)) 62% 92%,transparent 92%),#f4f1e8}
  ${S} .q-mg .m-cp{position:relative;border:3px solid #121014;padding:10px 8px 8px}
  ${S} .q-mg .q-lb b{font:400 13px/1 Anton,sans-serif;letter-spacing:.04em;color:#121014;padding:0 2px;background:linear-gradient(transparent 62%,var(--hl,var(--c)) 62% 94%,transparent 94%)}
  ${S} .q-mg .q-lb.r1 b{--hl:#e2b23c}${S} .q-mg [data-n=GROK]{--hl:rgba(18,16,20,.3)}
  ${S} .q-mg .q-lb.r1 b{font-size:14px}
  ${S} .q-mg .m-fx{position:absolute;z-index:2;font:400 25px/1 Anton,sans-serif;letter-spacing:.02em;color:#f2c03e;-webkit-text-stroke:1.6px #121014;paint-order:stroke fill;transform:rotate(-9deg);filter:drop-shadow(2px 2px 0 #121014);white-space:nowrap}
  ${S} .q-mg .q-ax{color:#121014}
  ${S} .q-mg .m-nb{margin:8px 0 0;max-width:86%;border:1.6px solid #121014;padding:5px 8px;background:#f4f1e8;font:600 11.5px/1.3 "Barlow Condensed",sans-serif}${S} .q-mg .m-nb b{font-weight:700}`,
  build:X=>`<div class="q q-mg"><div class="m-pg"><div class="m-tb">${TABS.map(t=>`<span class="${t==='ROI'?'on':''}">${t}</span>`).join('')}</div>
   <div class="m-cs l1">${X.tiles.map(t=>`<div data-n="${t.name}" class="m-c ${t.rank===1?'w':''} ${t.up?'':'dn'}" style="--c:${t.rank===1?'#121014':t.col}"><i>#${t.rank}</i>${t.lg}<b>${t.name}</b><strong class="tnum">${t.val}</strong>${pct(t)}</div>`).join('')}</div>
   <div class="m-cp"><div class="q-ch l1" id="qch"></div>${ax(X)}<p class="m-nb"><b>What would $100,000 be worth now?</b> Buy on an up call, short on a down call. Simulated, before fees.</p></div></div></div>`},
};
// draws the chart in real pixels inside #qch: ink lines (multiplied, so the stock shows through), the leader's line per option, labels
// at the line ends pushed apart where they crowd, with a printed leader back to each end
function QDRAW(el,X,o){
  const W=el.clientWidth,H=o.h,G=o.gut,pw=W-G,pad=6,ih=H-2*pad;el.style.height=H+'px';el.style.setProperty('--gut',G+'px');el.parentNode.style.setProperty('--gut',G+'px');
  const sx=x=>x/100*pw,sy=y=>pad+y/100*ih,P=s=>s.pts.map((p,i)=>(i?'L':'M')+sx(p[0]).toFixed(1)+','+sy(p[1]).toFixed(1)).join('');
  const win=X.series.find(s=>s.rank===1),oth=X.series.filter(s=>s.rank!==1),y0=sy(X.y0),ex=sx(win.pts[win.pts.length-1][0]),ey=sy(win.lastY);
  const FL=`filterUnits="userSpaceOnUse" x="-10" y="-10" width="${W+20}" height="${H+20}"`;
  const defs=`<defs><linearGradient id="qF" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="54" y2="20" spreadMethod="reflect"><stop offset="0" stop-color="#f6dc93"/><stop offset=".3" stop-color="#e4b54a"/><stop offset=".52" stop-color="#c99227"/><stop offset=".7" stop-color="#e7bd5b"/><stop offset="1" stop-color="#bf8a22"/></linearGradient>
   <filter id="qGr" ${FL}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/><feComponentTransfer in="g" result="h"><feFuncR type="linear" slope=".38" intercept=".7"/><feFuncG type="linear" slope=".38" intercept=".7"/><feFuncB type="linear" slope=".38" intercept=".7"/></feComponentTransfer><feBlend in="SourceGraphic" in2="h" mode="multiply" result="b"/><feComposite in="b" in2="SourceGraphic" operator="in"/></filter>
   <filter id="qSp" ${FL}><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="1" seed="3" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="${o.rough||1}" xChannelSelector="R" yChannelSelector="G"/></filter>
   <pattern id="qHt" width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="3" stroke="#b8841c" stroke-width=".55"/></pattern>
   <pattern id="qDt" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(15)"><circle cx="1.6" cy="1.6" r=".9" fill="#c99227"/></pattern>
   <pattern id="qTn" width="3.4" height="3.4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="1.7" cy="1.7" r=".62" fill="#121014"/></pattern></defs>`;
  let ink='',top='';const ln=(d,c,w,x)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"${x||''}/>`;
  const area=s=>P(s)+`L${sx(s.pts[s.pts.length-1][0]).toFixed(1)},${y0.toFixed(1)}L${sx(s.pts[0][0]).toFixed(1)},${y0.toFixed(1)}Z`;
  const foil=(d,w)=>ln(d,'rgba(255,250,232,.85)',w,' transform="translate(0,1.1)"')+ln(d,'rgba(70,42,6,.55)',w,' transform="translate(0,-.9)"')+ln(d,'url(#qF)',w,' filter="url(#qGr)"');
  const K=o.kind;
  // the start: a printed dashed rule, or (origami) a crease: a dark valley with a pale lip under it
  if(K==='or')ink+=`<path d="M0,${y0}H${pw}" stroke="rgba(90,66,30,.55)" stroke-width="1"/>`,top+=`<path d="M0,${y0+1}H${pw}" stroke="rgba(255,252,240,.85)" stroke-width="1"/>`;
  else ink+=`<path d="M0,${y0}H${pw}" stroke="${K==='ct'?'rgba(31,74,52,.55)':'rgba(20,18,23,.5)'}" stroke-width="1.1" stroke-dasharray="5 4"/>`;
  if(K==='tk'||K==='ct'){if(K==='ct')ink+=`<path d="${area(win)}" fill="url(#qHt)" opacity=".85"/>`;oth.forEach(s=>ink+=ln(P(s),s.col,o.w,' filter="url(#qSp)" opacity=".92"'));top+=foil(P(win),o.fw)}
  if(K==='nw'){ink+=`<path d="${area(win)}" fill="url(#qDt)" opacity=".75"/>`;oth.forEach(s=>ink+=ln(P(s),s.col,o.w,' opacity=".3" transform="translate(.9,-.7)"')+ln(P(s),s.col,o.w));ink+=ln(P(win),'#c4901f',2.8,' opacity=".35" transform="translate(-.8,.6)"')+ln(P(win),'#c4901f',2.8)}
  if(K==='mg'){ink+=`<rect x="0" y="${y0}" width="${pw}" height="${H-y0}" fill="url(#qTn)" opacity=".5"/>`;
    oth.forEach(s=>ink+=ln(P(s),'#121014',o.w+2.2,' filter="url(#qSp)"')+ln(P(s),s.col,o.w,' filter="url(#qSp)"'));top+=ln(P(win),'#121014',o.fw+2.4,' filter="url(#qSp)"')+ln(P(win),'url(#qF)',o.fw,' filter="url(#qGr)"')}
  if(K==='or'){const hw=o.hw,rib=(s,lt,sh)=>{const p=s.pts.map(q=>[sx(q[0]),sy(q[1])]);let g=ln(P(s),'rgba(20,18,23,.9)',2*hw,' transform="translate(1.6,1.6)"')+ln(P(s),sh,2*hw);
      for(let i=0;i<p.length-1;i++){const [a,b]=[p[i],p[i+1]],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,nx=-dy/L*hw,ny=dx/L*hw;if(dy<0)g+=`<polygon points="${[[a[0]+nx,a[1]+ny],[b[0]+nx,b[1]+ny],[b[0]-nx,b[1]-ny],[a[0]-nx,a[1]-ny]].map(q=>q.map(n=>n.toFixed(1)).join(',')).join(' ')}" fill="${lt}"/>`}
      return `<g filter="url(#qGr)">${g}</g>`};
    oth.forEach(s=>top+=rib(s,s.lt,s.sh));top+=rib(win,'#f6d67c','#b8841c')}
  // labels at the ends, pushed apart where they crowd, with a printed leader back to each end
  const lead=K==='nw'?6:8,ends=X.series.map(s=>({s,y0:sy(s.lastY),y:sy(s.lastY),x:sx(s.pts[s.pts.length-1][0])})).sort((a,b)=>a.y-b.y);
  for(let i=1;i<ends.length;i++)if(ends[i].y-ends[i-1].y<o.gap)ends[i].y=ends[i-1].y+o.gap;
  const ov=ends[ends.length-1].y-(H-9);if(ov>0)ends.forEach(e=>e.y-=ov);for(let i=0;i<ends.length;i++)if(ends[i].y<9)ends[i].y=9+i*o.gap;
  ends.forEach(e=>ink+=`<path d="M${(e.x+2).toFixed(1)},${e.y0.toFixed(1)}L${(pw+lead).toFixed(1)},${e.y.toFixed(1)}" fill="none" stroke="${K==='ct'?'rgba(31,74,52,.7)':'rgba(20,18,23,.62)'}" stroke-width=".9"/>`);
  let h=`<svg class="ink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${defs}${ink}</svg><svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true">${defs.replace(/id="q/g,'id="r').replace(/url\(#q/g,'url(#r')}${top.replace(/url\(#q/g,'url(#r')}</svg>`;
  h+=ends.map(e=>{const s=e.s,w=s.rank===1;return `<div data-n="${s.name}" class="q-lb r${s.rank}" style="left:${pw+lead+3}px;top:${e.y.toFixed(1)}px;--c:${w?'#9a6a0c':s.col};--lt:${w?'#f6d67c':s.lt};--sh:${w?'#b8841c':s.sh}">${s.lg}<b${w&&(K==='tk'||K==='ct')?` class="fo" data-t="${s.name}"`:''}>${s.name}</b></div>`}).join('');
  // the sound effect: the leader's gain, set in the clearest space near the top of the chart
  if(K==='mg'){const pts=[];X.series.forEach(s=>{for(let i=0;i<s.pts.length-1;i++)for(let t=0;t<1;t+=.25)pts.push([sx(s.pts[i][0]+(s.pts[i+1][0]-s.pts[i][0])*t),sy(s.pts[i][1]+(s.pts[i+1][1]-s.pts[i][1])*t)])});
    let best=null;for(let x=4;x<pw-96;x+=6)for(let y=4;y<H*.42;y+=4){const n=pts.filter(p=>p[0]>x-4&&p[0]<x+100&&p[1]>y-4&&p[1]<y+34).length,d=Math.hypot(x+50-ex,y+17-ey);const sc=n*1000+d;if(!best||sc<best.sc)best={x,y,sc}}
    h+=`<div class="m-fx" style="left:${best.x}px;top:${best.y}px">${X.win.up?'+':'−'}${X.win.pct}!!</div>`}
  el.insertAdjacentHTML('beforeend',h)}
(async()=>{const o=O[V];const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'));await p.waitForTimeout(3000);
await p.evaluate(()=>{const t=document.querySelector('.x2p-ast .tk');if(t)document.documentElement.style.setProperty('--paper',getComputedStyle(t).backgroundImage.split(/,(?=\s*url\()/).filter(x=>/url\(/.test(x)).pop()||'none')});
await p.click('#learn [data-rk="roi"]');await p.waitForTimeout(900);
// the page's own ROI: its tiles (rank, logo, name, value, change) and its chart's lines (one path per model, told apart by colour)
const X=await p.evaluate(()=>{const f=document.querySelector('#learn #rflip');const byC={'#10a37f':'GPT','#1e80ff':'KIMI','#d97757':'CLAUDE','#111':'GROK'};
  const tiles=[...f.querySelectorAll('.pnl-k li')].map(li=>{const m=li.textContent.replace(/\s+/g,' ').match(/(\d)\s*([A-Za-z]+)\s*(\$[\d,]+)\s*([▲▼])\s*([\d.]+%)/);
    return {rank:+m[1],name:m[2].toUpperCase(),val:m[3],up:m[4]==='▲',pct:m[5],lg:li.querySelector('.lg').outerHTML}});
  const series=[...f.querySelectorAll('.pnl svg path')].filter(x=>/stroke:/.test(x.getAttribute('style')||'')).map(x=>{const c=x.getAttribute('style').match(/stroke:\s*(#[0-9a-f]+)/i)[1].toLowerCase(),k=byC[c];
    const pts=x.getAttribute('d').match(/-?[\d.]+,-?[\d.]+/g).map(q=>q.split(',').map(Number));const t=tiles.find(t=>t.name===k);return {name:k,pts,lastY:pts[pts.length-1][1],rank:t.rank,lg:t.lg}});
  const n=(typeof SHEET!=='undefined'?SHEET:[]).filter(r=>r[12]!==''&&r[12]!=null).length;return {tiles,series,y0:parseFloat(f.querySelector('.pnl-z').style.top),n}});
X.tiles.forEach(t=>t.col=COL[t.name]);X.series.forEach(s=>{s.col=COL[s.name];[s.lt,s.sh]=FACE[s.name]||FACE.GOLD});X.win=X.tiles.find(t=>t.rank===1);
if(o.fonts)await p.addStyleTag({url:FONTS});
await p.addStyleTag({content:BASE+o.css});
await p.evaluate(h=>{const l=document.getElementById('learn');const w=document.createElement('div');w.innerHTML=h;l.appendChild(w.firstElementChild)},o.build(X));
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.addScriptTag({content:'window.QDRAW='+QDRAW.toString()});
await p.evaluate(([X,c])=>QDRAW(document.getElementById('qch'),X,c),[X,o.chart]);
await p.evaluate(()=>{[...document.querySelectorAll('body *')].forEach(e=>{const cs=getComputedStyle(e);if((cs.position==='sticky'||cs.position==='fixed')&&e.getBoundingClientRect().top<=2&&e.offsetHeight>40&&e.offsetHeight<200)e.style.visibility='hidden'})});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(700);
const c=await p.evaluate(()=>{const a=document.querySelector('#learn .q').getBoundingClientRect(),h=document.querySelector('#learn').getBoundingClientRect();return {x:0,y:h.top+scrollY,width:innerWidth,height:a.bottom-h.top+14}});
await p.screenshot({path:`${OUT}/r20-${V}-${W}.png`,clip:c,fullPage:true});
console.log(V,W,'height',Math.round(c.height),'page width',await p.evaluate(()=>document.documentElement.scrollWidth),errs.length?'ERR '+errs.join('|'):'');await b.close()})();
