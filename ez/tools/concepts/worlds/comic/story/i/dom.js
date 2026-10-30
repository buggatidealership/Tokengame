const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://localhost:8923/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(await p.evaluate(()=>{const lb=document.getElementById('wc-lb');return [...lb.children].map(c=>c.tagName+'.'+c.className).join('\n')+'\n----\n'+lb.querySelector('.wc-sb-r').outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').replace(/data:[^"')]+/g,'DATA').slice(0,3000)+'\n----\n'+lb.querySelector('.wc-tab-cv').outerHTML}));await b.close()})();
