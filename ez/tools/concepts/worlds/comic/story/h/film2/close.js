// node close.js <out> <ids> : DPR 3 at 390, a close-up of the LED window and the gold key (close-<id>.png) and of the film's top-left corner under the glass glare
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const id of IDS){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const p=await c.newPage();await FONTS(p);
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_f2.css')});await p.evaluate(i=>window.__F2=i,id);await p.addScriptTag({content:rd('_f2.js')});await p.waitForFunction(()=>window.__f2);await p.waitForTimeout(1500);
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'});document.querySelector('.f2-pic').scrollIntoView({block:'center'})});await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{const a=document.querySelector('.f2-led').getBoundingClientRect(),k=document.querySelector('.f2-btn').getBoundingClientRect();const x=Math.min(a.left,k.left)-14,y=Math.min(a.top,k.top)-14;return {x,y:y+scrollY,width:Math.max(a.right,k.right)-x+14,height:Math.max(a.bottom,k.bottom)-y+14}});
 await p.screenshot({path:`${OUT}/close-${id}.png`,clip:r,fullPage:true,timeout:180000});await c.close()}await b.close()})();
