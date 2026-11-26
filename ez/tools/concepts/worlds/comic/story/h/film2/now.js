// node now.js <out> : shoot today's film beat (the .t4-b3) at 390 and 1280. Serve ez/ on 8961 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const c=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();await FONTS(p);
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
 const r=await p.evaluate(()=>{const e=document.querySelector('.t4-b3'),r=e.getBoundingClientRect(),v=document.querySelector('.t4-v').getBoundingClientRect();return {y:r.top+scrollY,h:r.height,vw:v.width,vh:v.height,sw:document.documentElement.scrollWidth}});console.log(W,JSON.stringify(r));
 await p.screenshot({path:`${OUT}/now-${W}.png`,clip:{x:0,y:r.y-60,width:W,height:r.h+120},fullPage:true});await c.close()}await b.close()})();
