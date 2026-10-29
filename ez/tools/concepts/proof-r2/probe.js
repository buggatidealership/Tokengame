const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');
const OUT='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/pr2';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(()=>document.getElementById('learn').scrollIntoView());await p.waitForTimeout(3000);
const el=await p.$('#learn');await el.screenshot({path:OUT+'/now-learn.png'});
console.log(await p.evaluate(()=>{const cd=document.querySelector('#learn .pt-cd');const f=e=>e.tagName+'.'+e.className;return {html:document.querySelector('#learn').outerHTML.length, kids:[...cd.children].map(f), innKids:[...cd.querySelector('.pt-in').children].map(f), body:[...cd.querySelector('.pt-body').children].map(f), rect:JSON.stringify(cd.getBoundingClientRect()), head:document.querySelector('#learn').children.length, learnKids:[...document.querySelector('#learn').children].map(f)}}));
await b.close()})();
