const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
// today's section
await p.evaluate(()=>document.getElementById('record').scrollIntoView());await p.waitForTimeout(1500);
let bb=await p.evaluate(()=>{const r=document.getElementById('record').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
await p.screenshot({path:OUT+'/today-rec.png',clip:{x:0,y:bb.y,width:390,height:Math.min(bb.h,1400)},fullPage:true});
// unhide the original carousel
await p.evaluate(()=>{document.querySelectorAll('#record .r6-old').forEach(e=>{e.classList.remove('r6-old');e.inert=false});const r=document.querySelector('#record .r6');if(r)r.style.display='none';});
await p.waitForTimeout(800);
await p.evaluate(()=>{const c=document.querySelector('#car .card[data-n="60"]');c&&c.scrollIntoView({inline:'center',block:'center'})});await p.waitForTimeout(2500);
bb=await p.evaluate(()=>{const r=document.getElementById('car').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
await p.screenshot({path:OUT+'/slab.png',clip:{x:0,y:bb.y-20,width:390,height:bb.h+40},fullPage:true});
const info=await p.evaluate(()=>{const c=document.querySelector('#car .card[data-n="60"]');const r=c.getBoundingClientRect();const z=c.querySelector('.zlab');const cs=getComputedStyle(c.querySelector('.face.front'));
 return {w:r.width,h:r.height,zl:z&&z.getBoundingClientRect().height,zlab:z&&z.outerHTML.slice(0,800),bg:cs.background.slice(0,300),fx:getComputedStyle(c.querySelector('.fx')).background.slice(0,300)}});
console.log(JSON.stringify(info,null,1));await b.close()})();
