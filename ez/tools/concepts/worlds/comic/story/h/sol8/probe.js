const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:120000});
console.log(await p.evaluate(()=>{const X=P5.data();return JSON.stringify({N:X.N,arank:X.arank,A:Object.fromEntries(X.MS.map(m=>[m,{W:X.A[m].W,L:X.A[m].L,t:X.A[m].t,hr:X.A[m].hr,end:X.A[m].s.at(-1)}])),season:{rank:X.W.season.rank,tot:X.W.season.tot,n:X.W.season.n},learnW:document.querySelector('#learn').getBoundingClientRect().width,mx:Math.max(...[].concat(...X.MS.map(m=>X.W.season.ser[m]))),mn:Math.min(...[].concat(...X.MS.map(m=>X.W.season.ser[m])))})}));
await b.close()})();
