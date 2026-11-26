const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{
 const secs=[...document.querySelectorAll('main > section, main > *')].map(s=>[s.tagName,s.id,s.className.slice(0,60),Math.round(s.getBoundingClientRect().top+scrollY),Math.round(s.offsetHeight),getComputedStyle(s).display]);
 const P=__x2pPnl().A,RS=ROUNDS.filter(r=>typeof r.a==='number'&&!isNaN(r.a));
 const A={};for(const m in P){const t=P[m].W+P[m].L;A[m]={W:P[m].W,L:P[m].L,hr:P[m].W/t,pnl:P[m].pnl,band:1.96*Math.sqrt(.25/t),keys:Object.keys(P[m]).join(',')}}
 const up=ROUNDS.filter(r=>!(typeof r.a==='number'&&!isNaN(r.a))).slice(0,14).map(r=>[r.n,r.ticker,r.co||r.name,r.calls||r.date,r.resolves,Object.keys(r).join(',')]);
 return {secs,N:RS.length,A,up,models:JSON.stringify(MODELS).slice(0,800),cfg:typeof CONFIG!=='undefined'?CONFIG:null}});
console.log(JSON.stringify(r,null,1));await b.close()})();
