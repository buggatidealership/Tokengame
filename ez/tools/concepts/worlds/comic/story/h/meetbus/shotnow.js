// node shotnow.js W out.png : today's Meet the models section on the built X2+
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const W=+process.argv[2],OUT=process.argv[3];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2});await FONTS(p);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('section.c8'),null,{timeout:120000});
 await p.waitForTimeout(1500);
 const info=await p.evaluate(()=>{const s=document.querySelector('section.c8');const r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height,boxes:window.__c8.boxes(),data:window.__c8.data,grounds:getComputedStyle(document.body).backgroundImage.slice(0,200)}});
 console.log(JSON.stringify(info).slice(0,1500));
 const s=await p.$('section.c8');await s.screenshot({path:OUT});console.log(errs);await b.close()})();
