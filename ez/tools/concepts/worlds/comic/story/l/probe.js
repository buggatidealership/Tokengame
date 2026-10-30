const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8912/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addScriptTag({content:fs.readFileSync(__dirname+'/../i/_si.js','utf8')});
const o=await p.evaluate(()=>{const S=SI;const f=v=>Math.round(v);
 const lastR=S.R.filter(S.inLast).map(r=>r.n+':'+r.ticker);
 const w=(fn)=>Object.fromEntries(S.ORDER.map(m=>[m,f(S.sum(m,fn))]));
 const cnt=(m,fn)=>{const s=S.seq[m].filter(x=>fn(x.r));return s.filter(x=>x.ok).length+'-'+s.filter(x=>!x.ok).length};
 return {N:S.N,nyT:S.nyT,lastD:S.lastD,lastR,season:Object.fromEntries(S.ORDER.map(m=>[m,f(S.P[m].pnl)])),rank:S.rank,
  close:w(S.inLast),week:w(S.in7),closeWL:Object.fromEntries(S.ORDER.map(m=>[m,cnt(m,S.inLast)])),weekWL:Object.fromEntries(S.ORDER.map(m=>[m,cnt(m,S.in7)])),
  last5:Object.fromEntries(S.ORDER.map(m=>[m,S.last5(m)])),reigns:S.reigns.map(g=>g.m+' '+g.n0+'-'+g.n1),rank7:S.rank7,
  weekR:S.R.filter(S.in7).map(r=>r.n+':'+r.ticker+':'+r.resolves).length,
  seasonWL:Object.fromEntries(S.ORDER.map(m=>[m,S.W(m)+'-'+(S.C(m)-S.W(m))]))}});
console.log(JSON.stringify(o,null,1));await b.close()})();
