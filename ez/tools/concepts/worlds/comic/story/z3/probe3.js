const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8918/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:fs.readFileSync('z3.css','utf8')});await p.addScriptTag({content:fs.readFileSync('z3.js','utf8')});
await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>[...document.querySelector('#z3').children].map(e=>e.className+' order='+getComputedStyle(e).order+' top='+Math.round(e.getBoundingClientRect().top+scrollY)).join('\n')));
console.log(await p.evaluate(()=>{const e=document.querySelector('.z3-big');const r=[];for(const s of document.styleSheets){try{for(const ru of s.cssRules){if(ru.selectorText&&e.matches(ru.selectorText)&&/order|grid-row|position/.test(ru.cssText))r.push(ru.cssText.slice(0,200))}}catch(x){}}return r.join('\n')}));
await b.close()})();
