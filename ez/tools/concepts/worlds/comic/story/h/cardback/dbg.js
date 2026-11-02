const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8993/v46-live-x2plus.html#/round/80',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card .xc'),null,{timeout:200000});await p.waitForTimeout(1000);
await p.addStyleTag({content:rd('cb.css')});await p.addScriptTag({content:rd('cb.js')});
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const o=CB.show('a',80);const out=[];let e=o.querySelector('.cb-bg');
 for(;e&&e.id!=='x2pRm';e=e.parentElement){const s=getComputedStyle(e);out.push([e.className.slice(0,25),s.visibility,s.opacity,s.display,s.backgroundImage.slice(0,60),s.contentVisibility,s.filter.slice(0,20),s.clipPath.slice(0,20)].join(' | '))}return out.join('\n')}));
await b.close()})();
