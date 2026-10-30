const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:fs.readFileSync('z5.css','utf8')});await p.addScriptTag({content:fs.readFileSync('z5.js','utf8')});
await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready'));
console.log(await p.evaluate(()=>{const a=document.querySelector('.z5-cf');const q=document.querySelector('.z5-bld b'),c=getComputedStyle(q);return [c.webkitTextFillColor,c.color,c.backgroundClip,c.webkitBackgroundClip,c.backgroundImage.slice(0,80),c.filter].join(' / ');JSON.stringify(CO_LOGOS.AMZN)+'\n'+JSON.stringify(CO_LOGOS['VOW3.DE'])+'\n'+[...document.querySelectorAll('#wc-book .wc-lr *')].filter(e=>/Round \d+/.test(e.textContent)&&e.children.length===0).map(e=>e.className+':'+e.textContent).slice(0,4).join('\n');const o=[];for(const ps of ['::before','::after']){const c=getComputedStyle(a,ps);o.push(ps+' '+c.content+' '+c.width+' '+c.background.slice(0,120))}
 const im=a.querySelector('img');const c2=getComputedStyle(im,'::after');o.push('img '+c2.content);
 o.push(JSON.stringify(CO_LOGOS.AMZN));o.push(document.querySelector('#wc-book .wc-lr').textContent.slice(0,300));
 const ph=a.querySelector('.z5-cf-ph');for(const ps of ['::before','::after']){const c=getComputedStyle(ph,ps);o.push('ph'+ps+' '+c.content)}
 return o.join('\n')}));await b.close()})();
