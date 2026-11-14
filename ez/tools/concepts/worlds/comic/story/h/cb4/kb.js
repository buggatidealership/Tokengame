// node kb.js <out> [W]: keyboard and pointer on the See the film push-plate: Tab reaches it with a visible ring, a mouse press shows
// no ring and sinks the plate, Enter turns the card, Escape closes
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const OUT=process.argv[2],W=+process.argv[3]||390,PORT=process.env.PORT||8994;require('fs').mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
const p=await (await b.newContext({viewport:{width:W,height:844},deviceScaleFactor:3})).newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://127.0.0.1:'+PORT+'/v46-live-x2plus.html?'+Date.now()+'#/round/80',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
const st=()=>p.evaluate(()=>{const c=document.querySelector('#x2pRm .card'),a=document.activeElement,fp=document.querySelector('#x2pRm .cb-fp');const cs=fp&&getComputedStyle(fp);
  return {flipped:c&&c.classList.contains('flipped'),active:a&&(a.className||a.tagName),ring:cs?cs.outlineStyle+' '+cs.outlineWidth:null,tf:cs?cs.transform:null,rm:!!document.getElementById('x2pRm')}});
const r={};
await p.focus('#x2pRm .card .face.front [data-flip]');await p.keyboard.press('Enter');await p.waitForTimeout(1600);r.afterEnterFront=await st();
for(let i=0;i<12;i++){const a=await p.evaluate(()=>document.activeElement&&document.activeElement.classList.contains('cb-flip'));if(a)break;await p.keyboard.press('Tab');await p.waitForTimeout(80)}
r.tabbed=await st();
const box=await p.evaluate(()=>{const e=document.querySelector('#x2pRm .cb-bt').getBoundingClientRect();return {x:e.left-10,y:e.top-10,width:e.width+20,height:e.height+30}});
await p.screenshot({path:OUT+'/kb-focus-'+W+'.png',clip:box});
await p.keyboard.press('Enter');await p.waitForTimeout(1600);r.afterEnterPlate=await st();
// back again, then a mouse press on the plate: no ring, the plate sinks
await p.focus('#x2pRm .card .face.front [data-flip]');await p.keyboard.press('Enter');await p.waitForTimeout(1600);
const bb=await (await p.$('#x2pRm .cb .cb-flip')).boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await p.mouse.down();await p.waitForTimeout(150);r.pressed=await st();
await p.screenshot({path:OUT+'/kb-pressed-'+W+'.png',clip:box});await p.mouse.up();await p.waitForTimeout(1600);r.afterClick=await st();
await p.keyboard.press('Escape');await p.waitForTimeout(1500);r.afterEsc=await st();r.errors=er;
// pointer only, in a fresh page: tap the front's flip, then press the plate: no ring either time
{const q=await (await b.newContext({viewport:{width:W,height:844},deviceScaleFactor:3})).newPage();await FONTS(q);
 await q.goto('http://127.0.0.1:'+PORT+'/v46-live-x2plus.html?'+Date.now()+'#/round/80',{waitUntil:'load',timeout:150000});
 await q.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await q.waitForTimeout(1500);
 await q.click('#x2pRm .card .face.front [data-flip]');await q.waitForTimeout(1600);
 const ring=()=>q.evaluate(()=>{const fp=document.querySelector('#x2pRm .cb-fp'),a=document.activeElement;return {active:a&&(a.className||a.tagName),ring:getComputedStyle(fp).outlineStyle,flipped:document.querySelector('#x2pRm .card').classList.contains('flipped')}});
 r.ptrBack=await ring();const bb=await (await q.$('#x2pRm .cb .cb-flip')).boundingBox();await q.mouse.move(bb.x+bb.width/2,bb.y+bb.height/2);await q.mouse.down();await q.waitForTimeout(150);r.ptrPressed=await ring();await q.mouse.up();await q.waitForTimeout(1600);r.ptrAfter=await ring()}
console.log(JSON.stringify(r,null,1));await b.close()})();
