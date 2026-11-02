const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1280,height:900}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8992/v46-live-x2plus.html',{waitUntil:'domcontentloaded'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl,null,{timeout:120000});await p.waitForTimeout(1000);
await p.addStyleTag({content:rd('_m.css')+rd('c.css')});for(const f of ['_d.js','c.js','_m.js'])await p.addScriptTag({content:rd(f)});await p.evaluate(()=>__LB('c'));await p.waitForTimeout(500);
console.log(await p.evaluate(()=>{const e=document.querySelector('.c-ln2');const h=document.querySelector('#lbx h2');const cs=getComputedStyle(h);return e.outerHTML+' | '+getComputedStyle(e).fontFeatureSettings+' '+getComputedStyle(e).fontVariant+'\nH '+cs.textAlign+' '+cs.marginLeft+' '+cs.width+' '+cs.display+' '+h.getBoundingClientRect().left}));
await b.close()})();
