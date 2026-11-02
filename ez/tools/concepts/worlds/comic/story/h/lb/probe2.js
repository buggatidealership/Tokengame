const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8992/v46-live-x2plus.html',{waitUntil:'domcontentloaded'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl,null,{timeout:120000});await p.waitForTimeout(1000);
console.log(await p.evaluate(()=>{const h=document.querySelector('section.c8 h2');const cs=getComputedStyle(h.querySelector('*')||h);return h.outerHTML.slice(0,800)+'\n'+cs.color+' '+cs.textShadow+' '+cs.webkitTextStroke+'\nSEC '+document.querySelector('section.c8').outerHTML.slice(0,300)+'\nMAIN '+document.querySelector('main').className+' bg '+getComputedStyle(document.querySelector('section.c8')).backgroundImage.slice(0,200)}));
await b.close()})();
