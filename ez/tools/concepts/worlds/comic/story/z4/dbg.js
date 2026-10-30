const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8919/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:fs.readFileSync('_z4.css','utf8')});await p.addScriptTag({content:fs.readFileSync('_z4.js','utf8')});
await p.waitForFunction(()=>document.documentElement.classList.contains('z4-ready'));await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const im=document.querySelector('.z4-bi-nf img');return JSON.stringify({src:im&&im.src,nw:im&&im.naturalWidth,nh:im&&im.naturalHeight,st:im&&im.getAttribute('style'),cl:im&&im.className,lg:CO_LOGOS['AZN.L'],ls:!!document.querySelector('.x2p-vt .x2p-ls')})}));await b.close()})();
