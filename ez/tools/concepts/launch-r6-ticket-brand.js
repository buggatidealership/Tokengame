// "As it stands" ticket, round 6d (owner, 2026-10-22): the small tilted ticket, its left and right edges scalloped like the film
// ticket (the shape only, no green or red), and real paper: six different stocks and print methods. Same words, Grok in gold.
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
const svg=s=>"url(\"data:image/svg+xml;utf8,"+encodeURIComponent(s)+"\")";
const noise=(f,o,rgb,a,sz)=>svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz||220}' height='${sz||220}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${o}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} 0 0 0 ${a} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`);
const GRAIN=noise('.85',3,[.3,.22,.12],'.55'),FIBRE=noise('.012 .55',2,[.42,.33,.2],'.35',300),DARK=noise('.9',3,[1,1,1],'.25'),KRAFT=noise('.7',4,[.25,.16,.07],'.7'),SPECK=noise('.35',2,[.25,.18,.1],'.18',260);
const SCAL="-webkit-mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;";
const FOIL="background:linear-gradient(100deg,#6b4205 0%,#e9b843 16%,#fff1b0 28%,#c88f1c 44%,#7d5208 58%,#e6b541 76%,#fff0b0 88%,#8a5a0c 100%);-webkit-text-stroke:.5px rgba(70,40,5,.6);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;";
// brand colours only (owner, 2026-10-22): green #1f7a45, gold #f2b632, red #c8372a, beige #efe5cf
const G='#1f7a45',R='#c8372a',B='#efe5cf';
const GREENP=noise('.85',3,[.02,.12,.06],'.6'),REDP=noise('.85',3,[.25,.03,.02],'.55');
const S={
 // 1 Beige letterpress: aged beige stock, green ink pressed in, red rules, a gold foil name
 '1':{w:'62%',rot:-2.6,css:`.tk{${SCAL}background:radial-gradient(120% 140% at 50% 50%,transparent 55%,rgba(120,80,30,.26)),radial-gradient(circle at 18% 72%,rgba(150,95,40,.14) 0 7px,transparent 9px),${FIBRE},${GRAIN},${B};padding:14px 18px 13px;text-align:center;color:${G};font:700 15.5px/1.25 'Instrument Serif',Georgia,serif}
  .tk .in{border-top:1.5px solid ${R};border-bottom:1.5px solid ${R};padding:7px 2px 6px} .tk .ink{filter:url(#mkInk);text-shadow:0 1px 0 rgba(255,250,235,.6)}
  .tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.03em;${FOIL}filter:drop-shadow(0 .8px 0 rgba(90,60,10,.6))}`},
 // 2 Green board: deep green card with fibres, beige ink, a gold foil name, a fine gold rule
 '2':{w:'60%',rot:-2.2,css:`.tk{${SCAL}background:radial-gradient(120% 140% at 40% 30%,rgba(255,255,255,.08),transparent 60%),${GREENP},${G};padding:12px 16px;text-align:center;color:${B};font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.07em}
  .tk .in{border:1px solid rgba(242,182,50,.7);outline:1px solid rgba(242,182,50,.35);outline-offset:3px;padding:8px 6px} .tk .ink{filter:url(#mkInk)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}filter:drop-shadow(0 1px 0 rgba(0,0,0,.5))}`},
 // 3 Red raffle: red stock, a dashed beige frame, beige ink, a gold foil name
 '3':{w:'58%',rot:-3.2,css:`.tk{${SCAL}background:radial-gradient(120% 140% at 50% 40%,transparent 55%,rgba(60,5,0,.3)),${REDP},${R};padding:9px 14px;text-align:center;color:${B};font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.06em}
  .tk .in{border:2px dashed rgba(239,229,207,.7);padding:9px 6px} .tk .ink{filter:url(#mkInk)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}filter:drop-shadow(0 1px 0 rgba(40,0,0,.6))}`},
 // 4 Stub and body: beige body, a green stub on the left behind a perforation, red ink, a gold foil name
 '4':{w:'64%',rot:-1.9,css:`.tk{${SCAL}position:relative;background:linear-gradient(90deg,${G} 0 30px,transparent 30px),${GRAIN},${B};padding:12px 16px 12px 44px;color:${R};font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.06em;text-align:center}
  .tk::before{content:"";position:absolute;left:30px;top:4px;bottom:4px;border-left:2px dotted rgba(20,18,23,.55)}
  .tk::after{content:"★";position:absolute;left:9px;top:50%;margin-top:-8px;color:#f2b632;font-size:13px;line-height:16px}
  .tk .ink{filter:url(#mkInk)} .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}}`},
 // 5 Two inks on beige: green and red printed slightly off register over halftone dots, a gold foil name
 '5':{w:'58%',rot:-2.8,css:`.tk{${SCAL}background:radial-gradient(circle,rgba(200,55,42,.18) 0 1.1px,transparent 1.4px) 0 0/5px 5px,${GRAIN},${B};padding:13px 16px;text-align:center;color:${G};font:800 15px/1.2 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.05em}
  .tk .ink{text-shadow:1.4px .8px 0 rgba(200,55,42,.7);filter:url(#mkInk)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}filter:drop-shadow(1.2px .8px 0 rgba(200,55,42,.5))}`},
 // 6 Gold card: metallic gold board, a pressed frame, green ink, the name in red foil edged in gold? no: deep green type, the name in beige on a red flag
 '6':{w:'56%',rot:-2.2,css:`.tk{${SCAL}background:linear-gradient(120deg,#c98a12,#f2b632 35%,#fde7a0 50%,#e0a62a 65%,#b47d12),${GRAIN};padding:11px 14px;text-align:center;color:${G};font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.07em}
  .tk .in{padding:8px 6px;box-shadow:inset 1px 1px 0 rgba(255,250,220,.6),inset -1px -1px 0 rgba(90,55,5,.5),1px 1px 0 rgba(255,250,220,.4),-1px -1px 0 rgba(90,55,5,.4)} .tk .ink{filter:url(#mkInk)}
  .tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.04em;color:${B};background:${R};padding:1px 6px 2px!important;margin:0 2px;box-shadow:1.5px 1.5px 0 rgba(20,18,23,.6)}`}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
const s=S[V];
await p.evaluate(()=>{const ft=document.querySelector('#standings .x2p-lbfoot'),st0=ft.querySelector('.x2p-say .st'),em0=st0.querySelector('em'),nm=em0.textContent.trim();
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent)),i=parts.indexOf(null),before=parts.slice(0,i).join(''),after=parts.slice(i+1).join('');
  ft.style.cssText='display:flex!important;justify-content:center;margin-top:24px';
  ft.innerHTML='<div class="mk-wrap"><div class="tk"><div class="in"><span class="ink">'+before+'</span><em>'+nm+'</em><span class="ink">'+after+'</span></div></div></div>'+
   '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mkInk" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.1" xChannelSelector="R" yChannelSelector="G"/></filter>'+
   '<filter id="mkInk2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.55" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="c"/><feDisplacementMap in="c" in2="n" scale=".9" xChannelSelector="R" yChannelSelector="G"/></filter></svg>'});
await p.addStyleTag({content:`html.x2p #standings .mk-wrap{width:${s.w};transform:rotate(${s.rot}deg);filter:drop-shadow(0 1px 1px rgba(0,0,0,.5)) drop-shadow(3px 6px 6px rgba(0,0,0,.45));white-space:normal}
 html.x2p #standings .mk-wrap .tk,html.x2p #standings .mk-wrap .in{white-space:normal!important;text-wrap:balance}
 html.x2p #standings .mk-wrap em{font-style:normal;display:inline-block;padding:0 1px} html.x2p #standings .mk-wrap .ink{display:inline}
 html.x2p #standings `+s.css.replace(/\}\s*\./g,'} html.x2p #standings .')});
await p.waitForTimeout(500);
const box=await p.evaluate(()=>{const r=document.querySelectorAll('#standings li.lbr')[2].getBoundingClientRect(),t=document.querySelector('#standings .mk-wrap').getBoundingClientRect();return {y0:r.top+scrollY,y1:t.bottom+scrollY+26,w:Math.round(t.width)}});
await p.screenshot({path:'p'+V+'-full.png',fullPage:true});fs.writeFileSync('p'+V+'.json',JSON.stringify(box));console.log(V,box.w);await b.close()})();
