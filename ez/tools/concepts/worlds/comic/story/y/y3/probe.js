const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000}});await FONTS(p);
await p.goto('http://localhost:8923/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(W,await p.evaluate(()=>{const s=document.querySelector('.wc-chars'),r=s.getBoundingClientRect();const A=__x2pPnl().A;
return {sec:[r.width,r.height],cards:[...s.querySelectorAll('.wc-ch')].map(c=>{const q=c.getBoundingClientRect();return [c.dataset.m,Math.round(q.width),Math.round(q.height)]}),
models:Object.fromEntries(Object.keys(MODELS).map(m=>[m,{c:MODELS[m].c,ver:MODELS[m].ver,nm:MODELS[m].name}])),pnl:Object.fromEntries(Object.keys(A).map(m=>[m,[Math.round(A[m].pnl),A[m].W,A[m].L,A[m].seq.slice(-5).join('')]])),
logoKeys:Object.keys(CO_LOGOS).slice(0,3),logo0:JSON.stringify(CO_LOGOS[Object.keys(CO_LOGOS)[0]]).slice(0,200),h2:s.querySelector('h2').outerHTML.slice(0,300)}}));await p.close()}await b.close()})();
