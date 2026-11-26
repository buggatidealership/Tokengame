// node vid.js <framesdir> : 3 s of the foil's drift at 390 (R80 turned), 30 fps, frames by setting the animation's time (its real speed)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],PORT=process.env.PORT||8993;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3})).newPage();await FONTS(p);
await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/80`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(2000);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(2500);
await p.evaluate(()=>{document.activeElement&&document.activeElement.blur();document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}})});
const r=await p.evaluate(()=>{const a=document.querySelector('#x2pRm .cb-mw').getBoundingClientRect(),c=document.querySelector('#x2pRm .cb').getBoundingClientRect();return {x:c.left,y:a.top-6,w:c.width,h:c.bottom-a.top+6}});
const t0=await p.evaluate(()=>{const a=document.querySelector('#x2pRm .cb-hf').getAnimations()[0];a.pause();return a.currentTime});
for(let i=0;i<90;i++){await p.evaluate(t=>{document.querySelector('#x2pRm .cb-hf').getAnimations()[0].currentTime=t},t0+i*1000/30);
 await p.screenshot({path:`${OUT}/f${String(i).padStart(3,'0')}.png`,clip:{x:Math.round(r.x),y:Math.round(r.y),width:Math.round(r.w),height:Math.round(r.h)}})}
await b.close()})();
