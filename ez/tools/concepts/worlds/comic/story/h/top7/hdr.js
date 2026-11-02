const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:664}})).newPage();await FONTS(p);
await p.goto('http://localhost:8984/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
await p.evaluate(()=>scrollTo(0,800));await p.waitForTimeout(400);
console.log(await p.evaluate(()=>{const h=document.querySelector('header.top');const z=getComputedStyle(h);const r=h.getBoundingClientRect();return {pos:z.position,top:r.top,h:r.height,kids:[...h.querySelectorAll('*')].filter(e=>e.children.length==0&&e.textContent.trim()).slice(0,12).map(e=>e.textContent.trim().slice(0,20)+'@'+Math.round(e.getBoundingClientRect().top))}}));
await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/t7hdr.png'});await b.close()})();
