const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
await p.addStyleTag({content:rd('../sol7/_s7.css')+rd('_s8.css')+rd('b.css')});await p.addScriptTag({content:rd('../sol7/_s7.js')+rd('_s8.js')+rd('b.js')});
console.log(await p.evaluate(()=>{const e=document.querySelector('.p5');const cs=getComputedStyle(e);const out=[cs.containerType,e.getBoundingClientRect().width,cs.maxWidth,cs.width,getComputedStyle(e.parentElement).width,e.parentElement.id,getComputedStyle(e.parentElement).maxWidth,getComputedStyle(e.parentElement).display,getComputedStyle(e.parentElement).gridTemplateColumns];
 for(const ss of document.styleSheets){try{for(const r of ss.cssRules){if(r.cssText.includes('s8-23'))out.push(r.cssText.slice(0,200))}}catch(x){}}return out}));
await b.close()})();
