const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8987/v46-live-x2plus.html',{waitUntil:'domcontentloaded',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl,null,{timeout:120000});
console.log(await p.evaluate(()=>{const A=__x2pPnl().A;const o={};for(const m in A){const per=A[m].per;const ks=Object.keys(per).map(Number).sort((a,b)=>b-a);o[m]={W:A[m].W,L:A[m].L,pnl:A[m].pnl,n:ks.length,zero:ks.filter(k=>per[k].v===0).length,l10:ks.slice(0,10).map(k=>per[k].v>0?'W':'L').join(''),name:MODELS[m]&&MODELS[m].name,hasd:!!(MODELS[m]&&MODELS[m].d)}}
const L=document.getElementById('learn');o.learn=L?[...L.children].map(c=>c.tagName+'.'+c.className).join(' | '):null;o.lh=L&&L.offsetHeight;o.cs=L&&getComputedStyle(L).padding;return JSON.stringify(o,null,0)}));await b.close()})();
