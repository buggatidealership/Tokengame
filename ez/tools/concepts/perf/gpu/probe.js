// node probe.js <page> "<js expression returning JSON-able>" : evaluates in the built page on a phone (after the cover lifts).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
(async()=>{const [pg,ex]=process.argv.slice(2);const b=await chromium.launch({args:['--force-device-scale-factor=2.75']});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true});const p=await ctx.newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8971/'+pg,{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(ex),null,1));await b.close()})();
