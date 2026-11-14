// node look.js <out.png> <width> [hash]: full-page shot of the built X3+ tab, for looking
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const [OUT,W,HS]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:+W,height:+W<600?844:1000},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html'+(HS||'#/leaderboard'),{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
 await p.waitForTimeout(1500);await p.screenshot({path:OUT,fullPage:true});console.log(H);await b.close()})();
