const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();
for(const W of [390,1280,320]){const p=await b.newPage({viewport:{width:W,height:W<600?844:860}});
await p.goto('http://localhost:8993/v46-live-x2plus.html#/round/64',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card .xc'),null,{timeout:200000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.x),Math.round(r.y),Math.round(r.width),Math.round(r.height)]};
 const fin=document.querySelector('#x2pRm .face.back .fin');const cs=getComputedStyle(fin);
 return {zoom:document.querySelector('#x2pRm .x2p-rmz').style.zoom,card:q('#x2pRm .card'),fin:q('#x2pRm .face.back .fin'),xc:q('#x2pRm .face.back .xc'),lab:q('#x2pRm .face.back .zlab')||q('#x2pRm .zlab'),finpad:cs.padding,aria:document.querySelector('#x2pRm .card').getAttribute('aria-label'),kids:[...fin.children].map(e=>e.className)}});
console.log(W,JSON.stringify(r));await p.close()}
await b.close()})();
