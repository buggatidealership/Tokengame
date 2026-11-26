const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:664}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8994/v46-live-x2plus.html',{waitUntil:'domcontentloaded',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl&&window.MODELS&&document.documentElement.classList.contains('m32'),null,{timeout:120000});
const o=await p.evaluate(()=>{const A=__x2pPnl().A;const q={};document.querySelectorAll('section.c8 .c8-one').forEach(o=>{const b=o.querySelector('.c8-bal span');q[o.dataset.m]=b&&b.textContent});
return {keys:Object.keys(A),a:Object.fromEntries(Object.entries(A).map(([k,v])=>[k,{bal:v.bal,W:v.W,L:v.L,n:Object.keys(v.per).length}])),M:Object.fromEntries(Object.entries(MODELS).map(([k,v])=>[k,{name:v.name,ver:v.ver,lab:v.lab,c:v.c,keys:Object.keys(v)}])),q,sec:[...document.querySelectorAll('main.wrap>section')].map(s=>s.className+'#'+s.id),h:document.querySelector('section.c8').innerHTML.length}});
console.log(JSON.stringify(o,null,1));await b.close()})();
