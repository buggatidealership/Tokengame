const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
console.log(await p.evaluate(()=>JSON.stringify({R:ROUNDS.length,last:ROUNDS.slice(-2),PEN:PENDING.map(x=>[x.n,x.ticker,x.called,x.resolves,(x.calls||[]).length,JSON.stringify(x.calls&&x.calls[0])]),UP:UPCOMING.map(x=>[x.n,x.ticker,x.called,x.resolves]),RM:RMETA[74],caps:Object.keys(CAPS).length,logo:CO_LOGOS.AMZN,lead:Object.entries(__x2pPnl().A).map(([k,v])=>[k,Math.round(v.pnl)]),cfg:CONFIG.x,ny:new Date().toString()},null,0)));
await b.close()})();
