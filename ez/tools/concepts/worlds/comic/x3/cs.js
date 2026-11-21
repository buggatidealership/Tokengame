const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8897/v47-live-x3plus.html'+process.argv[2],{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:60000});
 console.log(await p.evaluate(sel=>{const e=document.querySelector(sel);const c=getComputedStyle(e);const r=e.getBoundingClientRect();
  const out={w:r.width,h:r.height,pos:c.position,disp:c.display,left:c.left,top:c.top,tf:c.transform,ml:c.marginLeft};
  const rules=[];for(const ss of document.styleSheets){try{for(const ru of ss.cssRules){if(ru.selectorText&&e.matches(ru.selectorText)&&/position|left|width|margin|display/.test(ru.style.cssText))rules.push(ru.selectorText.slice(0,120)+' {'+ru.style.cssText.slice(0,160)+'}')}}catch(x){}}
  out.rules=rules.slice(-12);return JSON.stringify(out,null,1)},process.argv[3]));await b.close()})();
