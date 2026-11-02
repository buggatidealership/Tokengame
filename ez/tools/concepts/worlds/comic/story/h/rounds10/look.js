// node look.js <out.png> [W] : full page screenshot of v46 (scaled down) to see the context
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const W=+(process.argv[3]||390);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:844},deviceScaleFactor:1,reducedMotion:'reduce'})).newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://127.0.0.1:9611/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await p.waitForTimeout(1500);
const info=await p.evaluate(()=>[...document.querySelectorAll('main > section, main > *')].map(s=>({id:s.id,cls:s.className.slice(0,60),y:Math.round(s.getBoundingClientRect().top+scrollY),h:Math.round(s.getBoundingClientRect().height)})).filter(x=>x.h>0));
console.log(JSON.stringify(info),er);await p.screenshot({path:process.argv[2],fullPage:true});await b.close()})();
