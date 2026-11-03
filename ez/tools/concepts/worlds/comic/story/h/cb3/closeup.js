// node closeup.js <out> : 3x close-ups at 390 of R80 (gold+crown PASS, FAIL rows) and its market window
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const OUT=process.argv[2],W=+process.argv[3]||390,b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?3:2})).newPage();await FONTS(p);
for(const n of [80,57]){await p.goto('http://127.0.0.1:8993/v46-live-x2plus.html?'+Date.now()+'#/round/'+n,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1800);await p.evaluate(()=>{document.fonts.ready;document.activeElement&&document.activeElement.blur()});await p.waitForTimeout(400);
const r=await p.evaluate(()=>{const q=s=>document.querySelector(s).getBoundingClientRect();const a=q('#x2pRm .cb-rows'),m=q('#x2pRm .cb-mw');return {a:[a.left,a.top,a.width,a.height],m:[m.left,m.top,m.width,m.height]}});
await p.screenshot({path:`${OUT}/cu-rows-${n}${W===390?'':'-'+W}.png`,clip:{x:r.a[0]-6,y:r.a[1]-16,width:r.a[2]+12,height:r.a[3]+22}});
await p.screenshot({path:`${OUT}/cu-mw-${n}${W===390?'':'-'+W}.png`,clip:{x:r.m[0]-4,y:r.m[1]-4,width:r.m[2]+8,height:r.m[3]+8}})}
await b.close()})();
