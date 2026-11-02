const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const e=document.querySelector('#learn'),m=e.parentElement,cs=getComputedStyle(m);const out=[m.tagName+'.'+m.className,cs.display,cs.gridTemplateColumns,getComputedStyle(e).gridColumn,getComputedStyle(e).width,getComputedStyle(e).maxWidth,getComputedStyle(e).justifySelf,e.className,'style='+e.getAttribute('style'),document.documentElement.className.slice(0,200)];
 for(const ss of document.styleSheets){try{for(const r of ss.cssRules){const walk=r=>{if(r.cssRules)[...r.cssRules].forEach(walk);else if(r.selectorText&&e.matches(r.selectorText.replace(/::?(before|after|marker)/g,''))&&/width|grid-column|justify/.test(r.style.cssText))out.push((r.parentRule&&r.parentRule.conditionText||'')+' | '+r.selectorText.slice(0,120)+' {'+r.style.cssText.slice(0,160))};walk(r)}}catch(x){}}return out.join('\n')}));
await b.close()})();
