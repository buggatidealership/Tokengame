const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});await p.waitForTimeout(800);
 await p.evaluate(()=>document.querySelector('.wc-bi').scrollIntoView({block:'center'}));await p.waitForTimeout(600);console.log('y0',await p.evaluate(()=>scrollY));
 await p.evaluate(()=>{window.__ys=[];const t0=performance.now();addEventListener('scroll',()=>__ys.push(Math.round(performance.now()-t0)+':'+scrollY+':'+location.hash));
   new MutationObserver(ms=>ms.forEach(m=>{m.addedNodes.forEach(n=>n.id&&__ys.push(Math.round(performance.now()-t0)+':ADD '+n.id));m.removedNodes.forEach(n=>n.id&&__ys.push(Math.round(performance.now()-t0)+':DEL '+n.id))})).observe(document.body,{childList:true})});
 await p.click('.wc-bi');await p.waitForTimeout(2000);await p.keyboard.press('Escape');await p.waitForTimeout(1500);
 console.log(await p.evaluate(()=>__ys.join(' ')));await b.close()})();
