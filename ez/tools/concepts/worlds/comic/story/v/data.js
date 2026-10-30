const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 await p.goto('http://localhost:8914/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
 console.log(await p.evaluate(()=>{const r=ROUNDS.find(x=>x.n===56),A=__x2pPnl().A;const per={};for(const m in A)per[m]=A[m].per[56];
  const cum=(m,u)=>ROUNDS.reduce((t,x)=>x.n<=u&&A[m].per[x.n]?t+A[m].per[x.n].v:t,0);
  const typ=ROUNDS.filter(x=>FILMS[x.n]).map(x=>{const up=x.a>0;const ok=x.calls.filter(c=>/UP/.test(c[1])===up).length;return x.n+':'+x.ticker+':'+x.a+':'+ok+'/'+x.calls.length+':'+x.win}).slice(-14);
  return JSON.stringify({r,per,cum:Object.fromEntries(Object.keys(A).map(m=>[m,[cum(m,55),cum(m,56)]])),G:ROUNDS.length,P:(window.PENDING||[]).length,U:(window.UPCOMING||[]).length,typ,MODELS:Object.fromEntries(Object.keys(MODELS).map(m=>[m,MODELS[m].c]))})}));await b.close()})();
