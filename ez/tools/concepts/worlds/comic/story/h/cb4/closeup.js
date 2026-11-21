// node closeup.js <out> [width] [port]: 3x close-ups at 390 of R80: rows 1-2 (gold + crown, PASS) and 3-4 (FAIL), and the struck mark
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const OUT=process.argv[2],W=+process.argv[3]||390,PORT=process.argv[4]||8994,b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:3,reducedMotion:'reduce'})).newPage();await FONTS(p);
for(const n of [80]){await p.goto('http://127.0.0.1:'+PORT+'/v46-live-x2plus.html?'+Date.now()+'#/round/'+n,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1800);if(process.env.CSS)await p.addStyleTag({content:require('fs').readFileSync(process.env.CSS,'utf8')});await p.evaluate(()=>{document.activeElement&&document.activeElement.blur()});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const L=[...document.querySelectorAll('#x2pRm .cb-r')].map(e=>e.getBoundingClientRect());const s=document.querySelector('#x2pRm .cb-st').getBoundingClientRect();
 return {a:[L[0].left,L[0].top,L[0].width,L[1].bottom-L[0].top],b:[L[2].left,L[2].top,L[2].width,L[3].bottom-L[2].top],s:[s.left,s.top,s.width,s.height]}});
await p.screenshot({path:`${OUT}/cu-rows12-${n}.png`,clip:{x:r.a[0]-6,y:r.a[1]-18,width:r.a[2]+12,height:r.a[3]+24}});
await p.screenshot({path:`${OUT}/cu-rows34-${n}.png`,clip:{x:r.b[0]-6,y:r.b[1]-6,width:r.b[2]+12,height:r.b[3]+12}});
await p.screenshot({path:`${OUT}/cu-stamp-${n}.png`,clip:{x:r.s[0]-4,y:r.s[1]-4,width:r.s[2]+8,height:r.s[3]+8}})}
await b.close()})();
