const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:fs.readFileSync('z5.css','utf8')+(process.argv[2]||'')});await p.addScriptTag({content:fs.readFileSync('z5.js','utf8')});
await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready'));await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const q=document.querySelector('.z5-bld b');const c=getComputedStyle(q);return [c.backgroundImage.slice(0,60),c.backgroundSize,c.backgroundColor,q.getBoundingClientRect().height, c.mixBlendMode, getComputedStyle(q.parentNode).color].join(' | ')}));
await p.locator('.z5-sky-w').screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z5/zz.png'});await b.close()})();
