// "As it stands" ticket, round 6f (owner, 2026-10-22: carte blanche; only the brand colours carry over; thin and subtle like
// the first one; realistic and crisp). Six materials: A roll ticket torn off, B brass plate with green enamel, C woven label,
// D scratch-off strip, E folded thermal slip, F gilt-edged letterpress card. Same words, Grok in gold.
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'A',W=+process.argv[3]||412,H=+process.argv[4]||863;
const G='#1f7a45',R='#c8372a',B='#efe5cf',GD='#f2b632';
const svg=s=>"url(\"data:image/svg+xml;utf8,"+encodeURIComponent(s)+"\")";
const noise=(f,o,rgb,a,sz)=>svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz||220}' height='${sz||220}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${o}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} 0 0 0 ${a} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`);
const GRAIN=noise('.85',3,[.3,.22,.12],'.5'),FIBRE=noise('.012 .55',2,[.42,.33,.2],'.3',300),CRUMPLE=noise('.018',3,[0,0,0],'.5',300),METAL=noise('.9 .02',2,[1,1,1],'.35',300),SILVER=noise('.6',3,[.2,.2,.22],'.9');
const FOIL="background:linear-gradient(100deg,#6b4205 0%,#e9b843 16%,#fff1b0 28%,#c88f1c 44%,#7d5208 58%,#e6b541 76%,#fff0b0 88%,#8a5a0c 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:.4px rgba(70,40,5,.55);";
// a torn right edge for A (a jagged polygon) and a die-cut left edge of half holes
const TORN=svg(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 100' preserveAspectRatio='none'><polygon fill='black' points='0,0 6,0 8,4 5,9 9,14 6,19 8,25 5,31 9,37 6,43 8,49 4,55 9,61 6,67 8,73 5,79 9,85 6,91 8,96 6,100 0,100'/></svg>`);
const S={
 A:{w:'60%',rot:-2.6,html:(b,nm,a)=>`<div class="tk"><span class="ink">${b}</span> <em>${nm}</em> <span class="ink">${a}</span></div>`,
  css:`.tk{position:relative;padding:9px 22px 9px 20px;color:${G};font:700 13px/1.25 Barlow,sans-serif;text-align:center;
   background:linear-gradient(180deg,rgba(255,255,255,.35),transparent 30%,transparent 70%,rgba(90,60,20,.12)),${FIBRE},${GRAIN},${B};
   box-shadow:inset 0 0 0 1px rgba(200,55,42,.0);
   -webkit-mask:radial-gradient(circle 3px at 0 50%,#0000 96%,#000) 0 0/100% 8px repeat-y,${TORN} 100% 0/12px 100% no-repeat,linear-gradient(#000,#000) 0 0/calc(100% - 11px) 100% no-repeat;-webkit-mask-composite:source-in,source-over;mask-composite:intersect,add}
   .tk::before{content:"";position:absolute;inset:4px 14px 4px 9px;border:1px solid ${R};opacity:.75;pointer-events:none}
   .tk .ink{filter:url(#mkInk)} .tk em{font:400 17px/1 Anton,sans-serif;letter-spacing:.03em;${FOIL}}`},
 B:{w:'62%',rot:-2,html:(b,nm,a)=>`<div class="tk"><i class="rv l"></i><div class="en"><span class="eng">${b}</span> <em>${nm}</em> <span class="eng">${a}</span></div><i class="rv r"></i></div>`,
  css:`.tk{position:relative;display:flex;align-items:center;gap:6px;padding:5px 7px;border-radius:5px;
   background:linear-gradient(180deg,#fff2bf 0%,#e6b84a 18%,#b9821c 50%,#e9c35e 78%,#8a5a0c 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.7),inset 0 -1px 0 rgba(60,35,5,.6),0 0 0 1px rgba(60,35,5,.7)}
   .tk::after{content:"";position:absolute;inset:0;border-radius:5px;background:${METAL};mix-blend-mode:overlay;opacity:.5;pointer-events:none}
   .tk .en{flex:1;position:relative;z-index:1;padding:6px 8px;border-radius:3px;background:radial-gradient(120% 160% at 50% 0%,#2a8f57,${G} 55%,#145334);box-shadow:inset 0 1px 2px rgba(0,0,0,.6),inset 0 -1px 0 rgba(255,255,255,.12);text-align:center;color:${B};font:800 12.5px/1.2 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.07em}
   .tk .eng{text-shadow:0 -1px 0 rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.18)} .tk em{font:400 16px/1 Anton,sans-serif;letter-spacing:.05em;${FOIL}-webkit-text-stroke:.5px rgba(40,20,0,.7)}
   .tk .rv{position:relative;z-index:1;flex:none;width:8px;height:8px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff6d0,#c9952a 45%,#6b4205);box-shadow:0 1px 1px rgba(0,0,0,.5)}
   .tk .rv::after{content:"";position:absolute;left:1px;right:1px;top:3.5px;height:1px;background:rgba(60,35,5,.7);transform:rotate(35deg)}`},
 C:{w:'60%',rot:-1.6,html:(b,nm,a)=>`<div class="tk"><div class="wv"><span class="th">${b}</span> <em>${nm}</em> <span class="th">${a}</span></div></div>`,
  css:`.tk{position:relative;padding:0 12px}
   .tk::before,.tk::after{content:"";position:absolute;top:3px;bottom:3px;width:14px;background:repeating-linear-gradient(90deg,rgba(0,0,0,.18) 0 1px,transparent 1px 2px),${R};z-index:0}
   .tk::before{left:0;clip-path:polygon(0 0,100% 12%,100% 88%,0 100%,40% 50%)}.tk::after{right:0;clip-path:polygon(100% 0,0 12%,0 88%,100% 100%,60% 50%)}
   .tk .wv{position:relative;z-index:1;padding:8px 12px;text-align:center;color:${B};font:800 12.5px/1.2 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.08em;
    background:repeating-linear-gradient(0deg,rgba(255,255,255,.07) 0 1px,transparent 1px 2px),repeating-linear-gradient(90deg,rgba(0,0,0,.22) 0 1px,transparent 1px 3px),linear-gradient(180deg,#25915a,${G} 50%,#17603a);
    box-shadow:inset 0 0 0 1.5px rgba(242,182,50,.55),inset 0 0 0 3px ${G},inset 0 0 0 4px rgba(242,182,50,.35)}
   .tk .th{text-shadow:0 1px 0 rgba(0,0,0,.35)} .tk em{font:400 17px/1 Anton,sans-serif;letter-spacing:.05em;background:repeating-linear-gradient(0deg,#fff0b0 0 1px,#d9a228 1px 2px,#8a5a0c 2px 3px);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;filter:drop-shadow(0 1px 0 rgba(0,0,0,.4))}`},
 D:{w:'60%',rot:-2.4,html:(b,nm,a)=>`<div class="tk"><span class="ink">${b}</span> <span class="sc"><em>${nm}</em><i></i></span> <span class="ink">${a}</span></div>`,
  css:`.tk{padding:9px 14px;border-radius:4px;text-align:center;color:${B};font:800 12.5px/1.35 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.07em;
   background:radial-gradient(circle at 20% 30%,rgba(255,255,255,.08) 0 2px,transparent 3px) 0 0/14px 14px,linear-gradient(160deg,#25915a,${G} 60%,#155a35);box-shadow:inset 0 0 0 2px ${R},inset 0 0 0 3px rgba(239,229,207,.7)}
   .tk .sc{position:relative;display:inline-block;padding:1px 6px;border-radius:3px;background:#2b1a05;vertical-align:-3px}
   .tk em{font:400 17px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}}
   .tk .sc i{position:absolute;inset:0;border-radius:3px;background:${SILVER},linear-gradient(135deg,#d9dbe0,#9ea2aa 50%,#e8e9ec);
     -webkit-mask:linear-gradient(#000,#000) 0 0/100% 100%,radial-gradient(ellipse 62% 70% at 48% 52%,#000 92%,#0000) 0 0/100% 100%;-webkit-mask-composite:xor;mask-composite:exclude;opacity:.95}`},
 E:{w:'58%',rot:-3,html:(b,nm,a)=>`<div class="tk"><span class="ink">${b}</span> <em>${nm}</em> <span class="ink">${a}</span></div>`,
  css:`.tk{position:relative;padding:10px 16px;text-align:center;color:${G};font:600 12.5px/1.3 'Courier New',ui-monospace,monospace;text-transform:uppercase;letter-spacing:.02em;
   background:linear-gradient(90deg,rgba(0,0,0,.0) 0 47%,rgba(0,0,0,.14) 49.5%,rgba(255,255,255,.55) 50.5%,rgba(0,0,0,0) 53%),linear-gradient(180deg,rgba(255,255,255,.4),transparent 40%),${CRUMPLE},${GRAIN},#f4ecd6;
   -webkit-mask:linear-gradient(-45deg,#0000 6px,#000 6.5px) 100% 0/60% 100% no-repeat,linear-gradient(#000,#000) 0 0/41% 100% no-repeat;}
   .tk::after{content:"";position:absolute;right:0;top:0;width:8.5px;height:8.5px;background:linear-gradient(225deg,transparent 50%,#d9cdb0 50%);filter:drop-shadow(-1px 1px 1px rgba(0,0,0,.3))}
   .tk .ink{filter:url(#mkInk);opacity:.92} .tk em{font:400 17px/1 Anton,sans-serif;letter-spacing:.03em;${FOIL}}`},
 F:{w:'62%',rot:-2,html:(b,nm,a)=>`<div class="tk"><span class="ink">${b}</span> <em>${nm}</em> <span class="ink">${a}</span></div>`,
  css:`.tk{position:relative;padding:9px 16px;border-radius:2px;text-align:center;color:${R};font:400 15px/1.2 'Instrument Serif',Georgia,serif;
   background:linear-gradient(180deg,rgba(255,255,255,.5),transparent 25%),${GRAIN},#f3ead2;
   box-shadow:0 0 0 1.5px #c9952a,0 0 0 2.5px #7d5208,inset 0 0 0 4px #f3ead2,inset 0 0 0 5px rgba(31,122,69,.75)}
   .tk .ink{text-shadow:0 1px 0 rgba(255,255,255,.75),0 -.6px 0 rgba(90,30,20,.35)} .tk em{font:400 18px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}filter:drop-shadow(0 1px 0 rgba(255,255,255,.6)) drop-shadow(0 -.5px 0 rgba(90,60,10,.5))}`}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
const s=S[V];
const words=await p.evaluate(()=>{const st0=document.querySelector('#standings .x2p-lbfoot .x2p-say .st'),em0=st0.querySelector('em'),nm=em0.textContent.trim();
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent)),i=parts.indexOf(null);return [parts.slice(0,i).join('').trim(),nm,parts.slice(i+1).join('').trim()]});
await p.evaluate(({h})=>{const ft=document.querySelector('#standings .x2p-lbfoot');ft.style.cssText='display:flex!important;justify-content:center;margin-top:24px';
  ft.innerHTML='<div class="mk-wrap">'+h+'</div><svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mkInk" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></svg>'},{h:s.html(...words)});
await p.addStyleTag({content:`html.x2p #standings .mk-wrap{width:${s.w};transform:rotate(${s.rot}deg);white-space:normal;filter:drop-shadow(0 1px .5px rgba(0,0,0,.55)) drop-shadow(2px 5px 5px rgba(0,0,0,.5))}
 html.x2p #standings .mk-wrap *{white-space:normal} html.x2p #standings .mk-wrap .tk{text-wrap:balance} html.x2p #standings .mk-wrap em{font-style:normal}
 html.x2p #standings `+s.css.replace(/\}\s*\./g,'} html.x2p #standings .')});
await p.waitForTimeout(500);
const box=await p.evaluate(()=>{const r=document.querySelectorAll('#standings li.lbr')[2].getBoundingClientRect(),t=document.querySelector('#standings .mk-wrap').getBoundingClientRect();return {y0:r.top+scrollY,y1:t.bottom+scrollY+22,w:Math.round(t.width),h:Math.round(t.height),text:document.querySelector('#standings .mk-wrap').textContent.replace(/\s+/g,' ').trim()}});
await p.screenshot({path:'c'+V+'-full.png',fullPage:true});fs.writeFileSync('c'+V+'.json',JSON.stringify(box));console.log(V,box.w+'x'+box.h,box.text);await b.close()})();
