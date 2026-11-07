const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();
await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
console.log(await p.evaluate(()=>{const v=document.querySelector('.wc-cover .x2p-vt')||document.querySelector('.x2p-vt');let s='';let e=v;for(let i=0;i<4;i++){e=e.parentElement;s+=e.tagName+'.'+e.className+' > '}
return s+'\n'+v.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').replace(/<source[^>]*>/g,'')}));
console.log(await p.evaluate(()=>{const l=document.getElementById('x2pLoad');return getComputedStyle(l).cssText.slice(0,10)+' '+[...document.styleSheets].map(s=>{try{return [...s.cssRules].filter(r=>r.cssText.includes('x2pLoad')).map(r=>r.cssText).join('\n')}catch(e){return ''}}).join('\n').slice(0,1500)}));
await b.close()})();
