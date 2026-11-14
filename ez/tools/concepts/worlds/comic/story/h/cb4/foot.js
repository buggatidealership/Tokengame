// node foot.js <out> [W] [rounds] [PAGE env] [WIN=1] [PRESS=1]: a 3x close-up of the plate's foot (dates, the EZ. mark, See the film), card turned
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const OUT=process.argv[2],W=+process.argv[3]||390,RS=(process.argv[4]||'80').split(',').map(Number),PORT=process.env.PORT||8994,PAGE=process.env.PAGE||'v46-live-x2plus.html';require('fs').mkdirSync(OUT,{recursive:true});
const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:3,reducedMotion:'reduce'})).newPage();await FONTS(p);
if(process.env.WIN)await p.addInitScript(()=>{window.__x2pCbWin=1});
for(const n of RS){await p.goto('http://127.0.0.1:'+PORT+'/'+PAGE+'?'+Date.now()+'#/round/'+n,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');if(c.getAttribute('data-k')==='g')(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1800);
await p.evaluate(()=>{document.activeElement&&document.activeElement.blur()});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const cb=document.querySelector('#x2pRm .cb').getBoundingClientRect(),d=document.querySelector('#x2pRm .cb-bt').getBoundingClientRect(),rw=document.querySelector('#x2pRm .cb-rows').getBoundingClientRect();return {x:cb.left,w:cb.width,y:d.top-8,h:cb.bottom-d.top+8,ry:rw.top-14,rh:Math.min(rw.height,200)+16}});
await p.screenshot({path:`${OUT}/foot-${n}-${W}.png`,clip:{x:r.x,y:r.y,width:r.w,height:r.h}});
if(process.env.WIN)await p.screenshot({path:`${OUT}/rows-${n}-${W}.png`,clip:{x:r.x,y:r.ry,width:r.w,height:r.rh}});
if(process.env.PRESS){const bt=await p.$('#x2pRm .cb .cb-flip');const bb=await bt.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(200);
  await p.screenshot({path:`${OUT}/foot-pressed-${n}-${W}.png`,clip:{x:r.x,y:r.y,width:r.w,height:r.h}});await p.mouse.move(0,0);await p.mouse.up();
  await p.keyboard.press('Tab');}
}
await b.close()})();
