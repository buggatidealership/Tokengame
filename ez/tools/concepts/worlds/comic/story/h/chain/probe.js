// node probe.js <out> : today's page around #record at 390 and 1280 (port 8961), and the section order
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 for(const W of [390,1280]){const p=await (await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1,reducedMotion:'reduce'})).newPage();await FONTS(p);
 await p.goto('http://127.0.0.1:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(2500);
 const info=await p.evaluate(()=>{const s=document.getElementById('record');const secs=[...s.parentElement.children].filter(e=>e.getBoundingClientRect().height>20).map(e=>e.id||e.className.slice(0,30));
   const h=s.querySelector('h2');const cs=h&&getComputedStyle(h);return {secs,h:h&&h.textContent,font:cs&&cs.font,color:cs&&cs.color,bg:getComputedStyle(document.body).backgroundColor}});
 console.log(W,JSON.stringify(info));
 const bx=await p.evaluate(()=>{const s=document.getElementById('record');const r=s.getBoundingClientRect();const pr=s.previousElementSibling.getBoundingClientRect();return {y:pr.bottom-300+scrollY,h:r.height+600}});
 await p.screenshot({path:`${OUT}/now-${W}.png`,clip:{x:0,y:bx.y,width:W,height:Math.min(bx.h,5000)},fullPage:true});await p.close()}
 await b.close()})();
