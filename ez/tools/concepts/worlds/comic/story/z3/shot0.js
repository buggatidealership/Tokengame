const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const W=+process.argv[2]||390;const p=await b.newPage({viewport:{width:W,height:844},deviceScaleFactor:1});await FONTS(p);
await p.goto('http://localhost:8918/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
await p.waitForTimeout(1500);await p.evaluate(()=>scrollTo(0,0));
await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z3-today-'+W+'.png',fullPage:true});await b.close()})();
