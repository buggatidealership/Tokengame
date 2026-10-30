const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:1000}});
await p.goto('http://localhost:8912/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.waitForTimeout(3000);
const r=await p.evaluate(()=>{const L=SE.toCome();return {n:L.length,days:SE.byDay(L).map(d=>({k:d.k,lab:SE.dayLab(d.k),items:d.items.map(x=>[x.n,x.ticker,x.co,x.locked,x.m7,x.ai,x.calls.map(c=>c.m+':'+c.dir[0]+c.mag).join(' '),SE.cap(x.ticker)])})),pnow:(window.PENDING||[]).length,up:(window.UPCOMING||[]).length,
 pen0:JSON.stringify((window.PENDING||[])[0]),up0:JSON.stringify((window.UPCOMING||[])[0]),models:Object.keys(MODELS).map(m=>m+' '+MODELS[m].c+' '+(MODELS[m].ver||'')),bell:[...document.querySelectorAll('#wc-up .wc-bell')].slice(0,3).map(b=>b.textContent+'|'+b.dataset.t)}});
console.log(JSON.stringify(r,null,1));await b.close()})();
