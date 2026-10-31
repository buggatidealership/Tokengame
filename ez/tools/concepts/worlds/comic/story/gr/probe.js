const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(JSON.stringify(await p.evaluate(()=>{const A=__x2pPnl().A;const o={};for(const m in A)o[m]={pnl:A[m].pnl,W:A[m].W,L:A[m].L,ver:MODELS[m].ver,c:MODELS[m].c,last5:A[m].seq.slice(-5).join('')};
const s=document.querySelector('.wc-chars');const r=s.getBoundingClientRect();return {o,graded:ROUNDS.length,sec:[r.top+scrollY,r.height],h2:s.querySelector('h2').outerHTML.slice(0,300),order:[...s.parentNode.children].map(x=>x.className).slice(0,12)}})));await b.close()})();
