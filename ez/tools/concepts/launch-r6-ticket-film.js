// "As it stands" ticket, round 6g (owner, 2026-10-22): the film ticket's layout (green band and stripe on the left, red on the
// right, scalloped sides), thinner and wider (one line, about 80% of the board), and six real-paper art styles. Paper relief
// from noise lit by a distant light (feTurbulence -> feDiffuseLighting); ink pressed into the stock (letterpress), halftone,
// misregistration, ageing. Same words, Grok in gold.
const { chromium } = require('playwright');const fs=require('fs');
const V=process.argv[2]||'1',W=+process.argv[3]||412,H=+process.argv[4]||863;
const G='#1f7a45',R='#c8372a';
const svg=s=>"url(\"data:image/svg+xml;utf8,"+encodeURIComponent(s)+"\")";
// lit paper: noise as a height map, lit from the top left, in the paper's colour
const lit=(col,f,oct,scale,el,sz)=>svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz||300}' height='${sz||300}'><filter id='p' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${oct}' stitchTiles='stitch' result='n'/><feDiffuseLighting in='n' lighting-color='${col}' surfaceScale='${scale}' result='l'><feDistantLight azimuth='225' elevation='${el}'/></feDiffuseLighting></filter><rect width='100%' height='100%' filter='url(#p)'/></svg>`);
const noise=(f,o,rgb,a,sz)=>svg(`<svg xmlns='http://www.w3.org/2000/svg' width='${sz||220}' height='${sz||220}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${f}' numOctaves='${o}' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 ${rgb[0]} 0 0 0 0 ${rgb[1]} 0 0 0 0 ${rgb[2]} 0 0 0 ${a} 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`);
const FIBRE=noise('.01 .6',2,[.4,.3,.18],'.28',300),FOX=noise('.05',2,[.55,.33,.1],'.22',260),GRAIN=noise('.9',3,[.25,.2,.12],'.4');
const LINEN="repeating-linear-gradient(0deg,rgba(90,70,40,.07) 0 1px,transparent 1px 3px),repeating-linear-gradient(90deg,rgba(90,70,40,.07) 0 1px,transparent 1px 3px)";
const FOIL="background:linear-gradient(100deg,#6b4205 0%,#e9b843 16%,#fff1b0 28%,#c88f1c 44%,#7d5208 58%,#e6b541 76%,#fff0b0 88%,#8a5a0c 100%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent;-webkit-text-stroke:.4px rgba(70,40,5,.55);";
const SCAL="-webkit-mask:radial-gradient(circle 4px at 0 5.5px,#0000 96%,#000) 0 0/51% 11px repeat-y,radial-gradient(circle 4px at 100% 5.5px,#0000 96%,#000) 100% 0/51% 11px repeat-y;mask:radial-gradient(circle 4px at 0 5.5px,#0000 96%,#000) 0 0/51% 11px repeat-y,radial-gradient(circle 4px at 100% 5.5px,#0000 96%,#000) 100% 0/51% 11px repeat-y;";
// the film ticket's bands: a 12px band and a 4px stripe on each side
const bands=(g,r)=>`linear-gradient(90deg,${g} 0 12px,transparent 12px 16px,${g} 16px 20px,transparent 20px),linear-gradient(270deg,${r} 0 12px,transparent 12px 16px,${r} 16px 20px,transparent 20px)`;
const S={
 // 1 Lit cream card, letterpress: the paper has relief; the words are pressed in (dark inner edge above, light below)
 '1':{css:`.tk{background:${bands(G,R)},${lit('#f1e6cc','.045',5,1.6,62)};color:#2a3b2c}
   .tk .ink{color:#22352a;text-shadow:0 1px 0 rgba(255,250,235,.85),0 -.7px 0 rgba(40,30,15,.45);filter:url(#mkInk)}`},
 // 2 Raffle stock: thin, bright, a little shiny; bands printed as halftone dots; flat black-green ink
 '2':{css:`.tk{background:radial-gradient(circle,${G} 0 1.5px,transparent 1.8px) 0 0/4px 4px no-repeat,${bands(G,R)},linear-gradient(180deg,rgba(255,255,255,.55),transparent 35%,transparent 65%,rgba(0,0,0,.05)),${GRAIN},#f7f1e3;color:#1b2a20}
   .tk .bandh{position:absolute;top:0;bottom:0;width:22px;pointer-events:none}
   .tk .bandh.l{left:0;background:radial-gradient(circle,rgba(247,241,227,.9) 0 .9px,transparent 1.1px) 0 0/3px 3px}
   .tk .bandh.r{right:0;background:radial-gradient(circle,rgba(247,241,227,.9) 0 .9px,transparent 1.1px) 0 0/3px 3px}`},
 // 3 Aged: yellowed stock, foxing, darker worn edges, bands faded by light
 '3':{css:`.tk{background:radial-gradient(130% 260% at 50% 50%,transparent 50%,rgba(120,70,20,.35)),${FOX},${FIBRE},${bands('#4f7f5d','#b45a48')},${lit('#ead7a6','.05',4,1.2,60)};color:#3a2a17}
   .tk .ink{filter:url(#mkInk);opacity:.88}`},
 // 4 Linen card, foil bands: a fine linen weave; the bands foil-stamped (metallic green and red with a sheen); crisp ink
 '4':{css:`.tk{background:${LINEN},${lit('#f4ead3','.08',3,.8,70)};color:#163322}
   .tk .fb{position:absolute;top:0;bottom:0;width:20px;pointer-events:none;-webkit-mask:linear-gradient(90deg,#000 0 12px,#0000 12px 16px,#000 16px 20px);mask:linear-gradient(90deg,#000 0 12px,#0000 12px 16px,#000 16px 20px)}
   .tk .fb.l{left:0;background:linear-gradient(180deg,#7fd6a3,#1f7a45 40%,#0d3f23 55%,#4fb47c 80%,#1f7a45)}
   .tk .fb.r{right:0;transform:scaleX(-1);background:linear-gradient(180deg,#ff9f8f,#c8372a 40%,#6e140c 55%,#ea6a58 80%,#c8372a)}`},
 // 5 Offset, off register: the bands printed a little off the cut (they shift right), halftone midtone, ink spread
 '5':{css:`.tk{background:${bands(G,R)} 3px 0/100% 100% no-repeat,radial-gradient(circle,rgba(200,55,42,.14) 0 1px,transparent 1.3px) 0 0/4px 4px,${GRAIN},#f2e7cc;color:#1f3d2b}
   .tk .ink{text-shadow:.8px .4px 0 rgba(200,55,42,.45);filter:url(#mkInk)}`},
 // 6 Cotton card, blind deboss: heavy cotton stock with strong fibres, a pressed (uninked) border, bands with soft ink edges
 '6':{css:`.tk{background:linear-gradient(90deg,transparent 26px,rgba(255,255,255,.0) 26px),${bands(G,R)},${FIBRE},${lit('#f3ebd8','.025',6,2.4,55)};color:#25342a;box-shadow:inset 26px 0 0 -25px rgba(0,0,0,0)}
   .tk::after{content:"";position:absolute;inset:5px 25px;border-radius:2px;box-shadow:inset 1px 1px 0 rgba(60,45,25,.35),inset -1px -1px 0 rgba(255,255,255,.8),1px 1px 0 rgba(255,255,255,.7),-1px -1px 0 rgba(60,45,25,.25);pointer-events:none}
   .tk .ink{text-shadow:0 1px 0 rgba(255,255,255,.8);filter:url(#mkInk2)}`}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
const words=await p.evaluate(()=>{const st0=document.querySelector('#standings .x2p-lbfoot .x2p-say .st'),em0=st0.querySelector('em'),nm=em0.textContent.trim();
  const parts=[...st0.childNodes].map(n=>n.nodeType===3?n.nodeValue:(n===em0?null:n.textContent)),i=parts.indexOf(null);return [parts.slice(0,i).join('').trim(),nm,parts.slice(i+1).join('').trim()]});
await p.evaluate(({w,V})=>{const ft=document.querySelector('#standings .x2p-lbfoot');ft.style.cssText='display:flex!important;justify-content:center;margin-top:24px';
  ft.innerHTML='<div class="mk-wrap"><div class="tk">'+(V==='2'?'<i class="bandh l"></i><i class="bandh r"></i>':V==='4'?'<i class="fb l"></i><i class="fb r"></i>':'')+'<span class="ink">'+w[0]+'</span> <em>'+w[1]+'</em> <span class="ink">'+w[2]+'</span></div></div>'+
   '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="mkInk" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale=".8" xChannelSelector="R" yChannelSelector="G"/></filter>'+
   '<filter id="mkInk2" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.45" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter></svg>'},{w:words,V});
await p.addStyleTag({content:`html.x2p #standings .mk-wrap{width:84%;transform:rotate(-1.8deg);filter:drop-shadow(0 1px .5px rgba(0,0,0,.6)) drop-shadow(2px 5px 5px rgba(0,0,0,.5))}
 html.x2p #standings .tk{position:relative;${SCAL}padding:11px 30px 10px;text-align:center;white-space:nowrap;font:700 12px/1.2 Barlow,sans-serif;letter-spacing:0}
 html.x2p #standings .tk em{font:400 16px/1 Anton,sans-serif;font-style:normal;letter-spacing:.03em;${FOIL}vertical-align:-1px;margin:0 1px}
 html.x2p #standings `+S[V].css.replace(/\}\s*\./g,'} html.x2p #standings .')});
await p.waitForTimeout(500);
const box=await p.evaluate(()=>{const r=document.querySelectorAll('#standings li.lbr')[2].getBoundingClientRect(),t=document.querySelector('#standings .mk-wrap').getBoundingClientRect(),k=document.querySelector('#standings .tk');return {y0:r.top+scrollY,y1:t.bottom+scrollY+22,w:Math.round(t.width),h:Math.round(k.offsetHeight),over:k.scrollWidth>k.clientWidth+1}});
await p.screenshot({path:'d'+V+'-full.png',fullPage:true});fs.writeFileSync('d'+V+'.json',JSON.stringify(box));console.log(V,box.w+'x'+box.h,'overflow:',box.over);await b.close()})();
