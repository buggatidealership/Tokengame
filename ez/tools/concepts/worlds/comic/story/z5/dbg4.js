const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:fs.readFileSync('z5.css','utf8')});await p.addScriptTag({content:fs.readFileSync('z5.js','utf8')});
await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready'));await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const f=document.querySelector('.z5-film').getBoundingClientRect();const o=[];for(const [x,y] of [[60,f.top+8],[200,f.top+8],[50,f.top+20]]){const e=document.elementsFromPoint(x,y).slice(0,4).map(e=>e.tagName+'.'+String(e.className).slice(0,40));o.push(x+','+(y-f.top)+' '+e.join(' > '))}
 o.push([...document.querySelector('.z5-film .x2p-vt').children].map(c=>c.className+':'+c.offsetHeight+':'+getComputedStyle(c).display).join(' | '));return o.join('\n')}));await b.close()})();
