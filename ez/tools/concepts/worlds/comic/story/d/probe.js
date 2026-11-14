const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
console.log(await p.evaluate(()=>{const n=+document.querySelector('.wc-lr-pg').dataset.n,r=ROUNDS.find(x=>x.n===n),P=__x2pPnl().A;
 const bal={};const RS=ROUNDS.slice().sort((a,b)=>a.n-b.n);
 const out={n,r,per:{},seq:{},FILM:FILMS[n],logo:CO_LOGOS[r.ticker],models:Object.fromEntries(Object.entries(MODELS).map(([k,v])=>[k,{c:v.c,ver:v.ver}]))};
 for(const m in P){out.per[m]=P[m].per[n];const keys=Object.keys(P[m].per).map(Number).sort((a,b)=>a-b);out.seq[m]={pnl:P[m].pnl,keysLen:keys.length,sample:P[m].per[keys[0]]}}
 // P&L before and after this round, by summing per values up to n
 const cum=(m,upto)=>Object.entries(P[m].per).filter(([k])=>+k<=upto).reduce((t,[k,x])=>t+x.v,0);
 out.before={};out.after={};for(const m in P){out.before[m]=Math.round(cum(m,n-1));out.after[m]=Math.round(cum(m,n))}
 out.pend=(window.PENDING||[]).length;out.up=(window.UPCOMING||[]).length;out.graded=ROUNDS.length;out.lastGraded=RS[RS.length-1].n;
 return JSON.stringify(out,null,1)}));await b.close()})();
