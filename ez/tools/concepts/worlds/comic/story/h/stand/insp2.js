const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const d=(e,l)=>[...e.children].map(c=>' '.repeat(l)+c.tagName+'.'+String(c.className).slice(0,50)+'#'+c.id+' y'+Math.round(c.getBoundingClientRect().top+scrollY)+' h'+Math.round(c.getBoundingClientRect().height)+'\n'+(l<4?d(c,l+1):'')).join('');return d(document.querySelector('main'),0)}));
await b.close()})();
