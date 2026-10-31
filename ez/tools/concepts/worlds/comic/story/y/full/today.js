// node today.js <out.png> [W]: full Overview of the live build
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const W=+(process.argv[3]||390);
 const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://localhost:8930/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);await p.screenshot({path:process.argv[2],fullPage:true});await b.close()})();
