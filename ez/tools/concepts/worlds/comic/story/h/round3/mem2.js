// node mem2.js <page.html> <mb> <out.png> [waitMs] [target selector]: the page at 390 x 844, DPR 2.75, GPU memory capped; scrolls the target into view, waits, shoots the viewport.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const [pg,mb,out,wt,tg]=process.argv.slice(2);const b=await chromium.launch({args:['--force-gpu-mem-available-mb='+mb]});
 const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75})).newPage();if(process.env.FAKER)await p.addInitScript(r=>{Object.defineProperty(window,'devicePixelRatio',{get:()=>+r})},process.env.FAKER);await FONTS(p);
 await p.goto('http://127.0.0.1:'+(process.env.PORT||8938)+'/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView({block:'center'})},tg||'.q4-ledger');await p.waitForTimeout(+(wt||1500));
 await p.screenshot({path:out});await b.close()})();
