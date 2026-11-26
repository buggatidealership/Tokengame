const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
 await p.goto('http://127.0.0.1:8973/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>window.ROUNDS&&window.__x2pPnl,null,{timeout:120000});
 console.log(await p.evaluate(()=>{const P=__x2pPnl().A,G=ROUNDS.filter(r=>r.a!=null&&r.out);
  const W=G.map(r=>{let best=null,k=0;for(const m in P){const x=P[m].per[r.n];if(x&&x.v>0){k++;if(!best||x.v>best.v)best={m,v:x.v}}}return {n:r.n,co:r.co,a:r.a,win:r.win,best,k,film:!!(FILMS||{})[r.n]}});
  const top=W.filter(w=>w.best).sort((a,b)=>b.best.v-a.best.v||a.k-b.k||b.n-a.n).slice(0,6);
  const miss=[];G.forEach(r=>(r.calls||[]).forEach(c=>{const up=/^UP/i.test(c[1]);if(up===(r.a>0))miss.push({n:r.n,co:r.co,m:c[0],miss:+c[2]})}));miss.sort((a,b)=>a.miss-b.miss||b.n-a.n);
  return JSON.stringify({top,bull:miss.slice(0,5),nofilm:G.filter(r=>!(FILMS||{})[r.n]).map(r=>r.n),last:G.slice(-7).map(r=>[r.n,r.co,r.out,r.win])},null,0)}));await b.close()})();
