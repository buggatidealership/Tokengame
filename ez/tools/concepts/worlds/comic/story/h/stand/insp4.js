const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const s=document.querySelector('section.t4');const c=getComputedStyle(s);const o=x=>{const k=getComputedStyle(x);return [x.className.slice(0,20),k.display,k.position,k.height,k.contentVisibility,k.containIntrinsicSize,k.gridTemplateRows,k.contain].join(' | ')};return [o(s),...[...s.children].map(o)].join('\n')}));
await b.close()})();
