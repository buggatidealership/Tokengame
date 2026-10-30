const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8912/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(await p.evaluate(()=>{const lb=document.getElementById('wc-lb');return [...lb.children].map(c=>c.tagName+'.'+c.className+' h='+c.offsetHeight).join('\n')+'\n---\n'+lb.querySelector('.wc-sbd').outerHTML.slice(0,1500)+'\n--- body bg '+getComputedStyle(document.body).backgroundImage.slice(0,300)+' / '+getComputedStyle(document.body).backgroundColor+'\n wc-tab '+getComputedStyle(lb).backgroundImage.slice(0,200)}));await b.close()})();
