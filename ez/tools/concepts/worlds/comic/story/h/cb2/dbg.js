const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:+process.argv[2]||320,height:844},deviceScaleFactor:2})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8997/v46-live-x2plus.html#/round/'+(process.argv[3]||80),{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1800);await p.evaluate(()=>document.fonts.ready);
console.log(await p.evaluate(new Function(process.argv[4]||'return 1')));await b.close()})();
