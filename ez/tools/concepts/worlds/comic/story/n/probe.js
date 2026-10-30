// node probe.js : prints the windows' data from the built page (no mockup applied)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const I=__dirname+'/../i/';
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:390,height:844}});
 const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8914/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addScriptTag({content:fs.readFileSync(I+'_si.js','utf8')});
 const o=await p.evaluate(()=>{const S=SI;const recent=S.R.filter(r=>['10/29/26','10/28/26','10/27/26','10/26/26','10/23/26','10/24/26'].includes(r.resolves)).map(r=>[r.n,r.ticker,r.resolves,r.a,r.win,Object.fromEntries(S.ORDER.map(m=>[m,S.P[m].per[r.n]?Math.round(S.P[m].per[r.n].v):null]))]);
  return {now:new Date().toISOString(),nyT:S.nyT,N:S.N,rank:S.rank,pnl:Object.fromEntries(S.ORDER.map(m=>[m,Math.round(S.P[m].pnl)])),recent,pend:(window.PENDING||[]).map(r=>[r.n,r.ticker,r.resolves])}});
 console.log(JSON.stringify(o,null,0));console.log(er.join('|')||'ok');await b.close()})();
