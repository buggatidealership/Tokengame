const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 console.log(await p.evaluate(()=>{const A=__x2pPnl().A,o={};
  for(const m of ['GPT','KIMI','CLAUDE','GROK']){let dn=0,up=0,mags=[],k15=0,miss=[];
   for(const r of ROUNDS){const c=r.calls.find(x=>x[0]===m);if(!c){miss.push(r.n);continue}const mm=/(UP|DOWN)\s*([\d.]+)/.exec(c[1]);if(!mm)continue;mm[1]==='UP'?up++:dn++;mags.push(+mm[2]);if(+mm[2]===1.5)k15++}
   const s=A[m].seq;let cur=1;for(let i=s.length-2;i>=0&&s[i]===s[s.length-1];i--)cur++;
   let best=0,run=0;for(const x of s){run=x==='W'?run+1:0;best=Math.max(best,run)}
   const wins=ROUNDS.filter(r=>(r.win||'').split(' & ').includes(m)).length;
   o[m]={up,dn,avg:(mags.reduce((a,b)=>a+b,0)/mags.length).toFixed(2),max:Math.max(...mags),k15,miss,cur:s[s.length-1]+cur,best,wins,pnl:Math.round(A[m].pnl),W:A[m].W,L:A[m].L}}
  const mk=ROUNDS.filter(r=>r.a>0).length;
  const films=ROUNDS.filter(r=>FILMS[r.n]).map(r=>r.n);
  const nowin=ROUNDS.filter(r=>!r.win||/no/i.test(r.win)).map(r=>r.n+':'+r.win);
  const dates=[...new Set(ROUNDS.map(r=>r.resolves))];
  return JSON.stringify({o,mk,G:ROUNDS.length,films:films.length,nofilm:ROUNDS.filter(r=>!FILMS[r.n]).map(r=>r.n),nowin,dates,pend:PENDING.map(p=>p.n+':'+p.ticker+':'+p.resolves+':'+(p.calls||[]).length),up:UPCOMING.slice(0,12).map(u=>u.n+':'+u.ticker+':'+u.called),nv:UPCOMING.find(u=>u.ticker==='NVDA'),cfg:window.CONFIG&&{x:CONFIG.x}},null,1)}));await b.close()})();
