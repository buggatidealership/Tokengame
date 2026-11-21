const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
console.log(JSON.stringify(await p.evaluate(()=>({pend:PENDING.map(r=>[r.n,r.ticker,r.co,r.called,r.resolves,r.calls.length]),up:UPCOMING.slice(0,16).map(r=>[r.n,r.ticker,r.co,r.called,r.resolves]),nUp:UPCOMING.length,logo:Object.keys(CO_LOGOS).slice(0,5),lg:JSON.stringify(CO_LOGOS[UPCOMING[0]&&UPCOMING[0].ticker]),caps:CAPS&&Object.keys(CAPS).length,learnH:document.querySelector('#learn').innerText.slice(0,500),get:document.querySelector('#get').innerText.slice(0,400),upLink:[...document.querySelectorAll('a')].map(a=>a.getAttribute('href')).filter(h=>h&&h.includes('up')).slice(0,5)}))));await b.close()})();
