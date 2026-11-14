const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [,,hash,out,...sels]=process.argv;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await fonts(p);
await p.goto('http://localhost:8897/v47-live-x3plus.html'+hash,{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});
await p.waitForTimeout(3000);const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=700){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250)}
let i=0;for(const s of sels){const e=await p.$(s);if(!e){console.log('none',s);continue}await e.scrollIntoViewIfNeeded();await p.waitForTimeout(1200);await e.screenshot({path:`${out}/c${i++}.png`})}
await b.close()})();
