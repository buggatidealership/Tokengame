// node live.js <outdir> : today's live X3+ first screen at 390 and 1280 (the board's first frame)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const H=W<600?844:800;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8971/v47-live-x3plus.html',{waitUntil:'load',timeout:90000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(2500);
 await p.screenshot({path:`${process.argv[2]}/live-${W}.png`});await ctx.close()}await b.close()})();
