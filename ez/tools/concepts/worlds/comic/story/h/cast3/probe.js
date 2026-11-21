const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await fonts(p);
await p.goto('http://localhost:8931/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2000);
console.log(await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-chars');const o={cls:s.className,kids:[...s.children].map(c=>c.tagName+'.'+c.className+' '+c.offsetHeight),h2:s.querySelector('h2').outerHTML.slice(0,400),bg:getComputedStyle(s).background.slice(0,200),
 A:Object.fromEntries(Object.entries(__x2pPnl().A).map(([k,v])=>[k,{pnl:v.pnl,W:v.W,L:v.L,seq:v.seq.slice(-5).join('')}])),order:[...s.querySelectorAll('article.wc-ch')].map(a=>a.dataset.m),ver:Object.fromEntries(Object.entries(MODELS).map(([k,v])=>[k,v.ver]))};return JSON.stringify(o,null,1)}));
await b.close()})();
