const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>window.__x2pPnl&&window.ROUNDS,null,{timeout:90000});
console.log(await p.evaluate(()=>{const P=window.__x2pPnl();const m=Object.keys(P.A)[0];const a=P.A[m];
return JSON.stringify({keys:Object.keys(P),mk:Object.keys(P.A),akeys:Object.keys(a),per:Object.entries(a.per).slice(-3),usd:[P.usd(2603),P.usd(-847),P.usd(0),P.usd(15191,1),P.usd(0,1)],last:ROUNDS.slice(-8).map(r=>[r.n,r.t||r.ticker,r.resolves,r.called])})}));
await b.close()})();
