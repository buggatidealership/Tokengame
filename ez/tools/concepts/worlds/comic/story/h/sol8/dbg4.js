const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
await p.addStyleTag({content:rd('../sol7/_s7.css')+rd('_s8.css')+rd('b.css')});await p.addScriptTag({content:rd('../sol7/_s7.js')+rd('_s8.js')+rd('b.js')});await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{const e=document.querySelector('#learn');const o=[];for(const ss of document.styleSheets){try{const walk=r=>{if(r.cssRules)[...r.cssRules].forEach(walk);if(r.selectorText&&/grid-column|grid-area|order/.test(r.style.cssText)){let m=false;try{m=e.matches(r.selectorText)}catch(x){}if(m)o.push(r.selectorText.slice(0,100)+' {'+r.style.cssText.slice(0,120))}};[...ss.cssRules].forEach(walk)}catch(x){}}return o.concat([e.className,!!e.querySelector('.p5-s8'),e.matches('html.x2p main.wrap>#learn.p5-host:has(.p5-s8)'),getComputedStyle(e).gridColumn,getComputedStyle(e).width,matchMedia("(min-width:1000px)").matches])}));
await b.close()})();
