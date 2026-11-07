// "As it stands" ticket, round 6d (owner, 2026-10-22): the small tilted ticket, its left and right edges scalloped like the film
// ticket (the shape only, no green or red), and real paper: six different stocks and print methods. Same words, Grok in gold.
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
const svg=s=>"url(\"data:image/svg+xml;utf8,"+encodeURIComponent(s)+"\")";
const noise=(f,o,rgb,a,sz)=>svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz||220}' height='${sz||220}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${o}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} 0 0 0 ${a} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`);
const GRAIN=noise('.85',3,[.3,.22,.12],'.55'),FIBRE=noise('.012 .55',2,[.42,.33,.2],'.35',300),DARK=noise('.9',3,[1,1,1],'.25'),KRAFT=noise('.7',4,[.25,.16,.07],'.7'),SPECK=noise('.35',2,[.25,.18,.1],'.18',260);
const SCAL="-webkit-mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;mask:radial-gradient(circle 4.5px at 0 6px,#0000 96%,#000) 0 0/51% 12px repeat-y,radial-gradient(circle 4.5px at 100% 6px,#0000 96%,#000) 100% 0/51% 12px repeat-y;";
const FOIL="background:linear-gradient(100deg,#6b4205 0%,#e9b843 16%,#fff1b0 28%,#c88f1c 44%,#7d5208 58%,#e6b541 76%,#fff0b0 88%,#8a5a0c 100%);-webkit-text-stroke:.5px rgba(70,40,5,.6);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;";
const S={
 // 1 Aged letterpress: warm cream stock, fibres and grain, foxing, ink pressed into the paper, a foil-stamped name
 '1':{w:'62%',rot:-2.6,css:`.tk{${SCAL}background:radial-gradient(120% 140% at 50% 50%,transparent 55%,rgba(120,80,30,.28)),radial-gradient(circle at 18% 72%,rgba(150,95,40,.16) 0 7px,transparent 9px),radial-gradient(circle at 83% 30%,rgba(150,95,40,.12) 0 4px,transparent 6px),${FIBRE},${GRAIN},#efe3c6;padding:15px 18px 14px;text-align:center;color:#2b2016;font:700 15px/1.25 'Instrument Serif',Georgia,serif;letter-spacing:.01em}
  .tk .in{border-top:1px solid rgba(43,32,22,.5);border-bottom:1px solid rgba(43,32,22,.5);padding:7px 2px 6px;} .tk .ink{filter:url(#mkInk);text-shadow:0 1px 0 rgba(255,250,235,.6),0 -.5px 0 rgba(60,40,20,.35)}
  .tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.03em;${FOIL}filter:drop-shadow(0 .8px 0 rgba(90,60,10,.6))}`},
 // 2 Carnival stub: thin pink stock, a security guilloche printed under the words, a rubber-stamp feel
 '2':{w:'58%',rot:-3.2,css:`.tk{${SCAL}background:repeating-radial-gradient(circle at 50% 50%,rgba(150,30,70,.10) 0 1px,transparent 1px 5px),repeating-linear-gradient(60deg,rgba(150,30,70,.07) 0 1px,transparent 1px 7px),repeating-linear-gradient(-60deg,rgba(150,30,70,.07) 0 1px,transparent 1px 7px),${GRAIN},#f4c9d2;padding:13px 16px;text-align:center;color:#5a1328;font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.06em}
  .tk .in{border:1.5px solid rgba(90,19,40,.65);border-radius:3px;padding:8px 6px} .tk .ink{filter:url(#mkInk)}
  .tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}}`},
 // 3 Kraft card: brown recycled board with flecks, white ink that did not cover everywhere, a foil name
 '3':{w:'60%',rot:-2,css:`.tk{${SCAL}background:radial-gradient(130% 160% at 50% 40%,transparent 60%,rgba(40,22,8,.35)),${SPECK},${KRAFT},#a9784a;padding:14px 16px;text-align:center;color:#fbf3e4;font:800 14.5px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.07em}
  .tk .ink{filter:url(#mkInk2)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}filter:drop-shadow(0 1px 0 rgba(30,15,5,.6))}`},
 // 4 Concert ticket: bright white thermal stock, black print, a holographic foil strip down one side
 '4':{w:'64%',rot:-1.8,css:`.tk{${SCAL}position:relative;background:linear-gradient(90deg,transparent calc(100% - 34px),rgba(0,0,0,.06) calc(100% - 34px) calc(100% - 33px),transparent calc(100% - 33px)),${GRAIN},#fbfaf6;padding:12px 44px 12px 18px;color:#111;font:700 14px/1.25 Barlow,sans-serif;text-align:left}
  .tk::after{content:"";position:absolute;top:0;bottom:0;right:10px;width:16px;background:linear-gradient(180deg,#ff8ad8,#ffe27a,#7cf5c4,#7ab8ff,#d39bff,#ff8ad8);background-size:100% 60px;opacity:.85;mix-blend-mode:multiply;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
  .tk .in{border-left:3px solid #111;padding-left:10px}
  .tk em{font:400 21px/1 Anton,sans-serif;letter-spacing:.03em;${FOIL}}`},
 // 5 Riso print: yellowed stock, halftone dots, two inks slightly off register
 '5':{w:'58%',rot:-2.8,css:`.tk{${SCAL}background:radial-gradient(circle,rgba(230,70,60,.22) 0 1.1px,transparent 1.4px) 0 0/5px 5px,${GRAIN},#f3e6b8;padding:13px 16px;text-align:center;color:#2a3a8c;font:800 15px/1.2 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.05em}
  .tk .ink{text-shadow:1.4px .8px 0 rgba(230,70,60,.75);filter:url(#mkInk)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.04em;${FOIL}text-shadow:none;filter:drop-shadow(1.4px .8px 0 rgba(230,70,60,.55))}`},
 // 6 Black card: soft-touch black board, a blind-embossed frame, cream foil words and a gold foil name
 '6':{w:'56%',rot:-2.2,css:`.tk{${SCAL}background:radial-gradient(120% 140% at 30% 20%,rgba(255,255,255,.07),transparent 60%),${DARK},#17151a;padding:12px 14px;text-align:center;color:#efe6d2;font:800 14px/1.25 'Barlow Condensed',sans-serif;text-transform:uppercase;letter-spacing:.08em}
  .tk .in{padding:9px 8px;border-radius:2px;box-shadow:inset 1px 1px 0 rgba(255,255,255,.12),inset -1px -1px 0 rgba(0,0,0,.6),1px 1px 0 rgba(255,255,255,.06),-1px -1px 0 rgba(0,0,0,.5);text-shadow:0 1px 0 rgba(0,0,0,.6)}
  .tk em{font:400 22px/1 Anton,sans-serif;letter-spacing:.05em;${FOIL}filter:drop-shadow(0 1px 0 rgba(0,0,0,.7))}`}};
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
