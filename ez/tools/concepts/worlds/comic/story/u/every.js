const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const OUT=process.argv[2],W=+process.argv[3]||390;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);
await p.goto('http://localhost:8913/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
await p.waitForFunction(()=>document.querySelector('.wc-season canvas.sa-gc5'),null,{timeout:30000});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const e=document.querySelector('.wc-season');const q=e.getBoundingClientRect();return {y:q.top+scrollY,h:q.height,html:e.querySelector('.wc-bi').outerHTML.slice(0,1500)}});console.log(r.html);
await p.screenshot({path:OUT,clip:{x:0,y:r.y,width:W,height:Math.min(r.h,1400)},fullPage:true});await b.close()})();
