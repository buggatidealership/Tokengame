const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
 await p.goto('http://127.0.0.1:8973/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>window.MODELS&&window.__x2pPnl,null,{timeout:120000});
 console.log(await p.evaluate(()=>JSON.stringify({M:Object.fromEntries(Object.entries(MODELS).map(([k,v])=>[k,Object.fromEntries(Object.entries(v).map(([a,b])=>[a,String(b).slice(0,60)]))])),L:CO_LOGOS.XOM,L2:CO_LOGOS.RDDT,hd:document.querySelector('#record .r6-hd').outerHTML.slice(0,400),chips:getComputedStyle(document.documentElement).getPropertyValue('--c8-gpt')})));await b.close()})();
