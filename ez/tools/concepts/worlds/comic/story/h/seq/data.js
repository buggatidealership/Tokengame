const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
await p.goto('http://localhost:8942/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const r=await p.evaluate(()=>{const o={};o.globals=Object.keys(window).filter(k=>/^[A-Z_]{3,}$|x2p|__/.test(k)).slice(0,120);
 o.P=typeof PENDING!=='undefined'?PENDING.slice(0,3):null;o.U=typeof UPCOMING!=='undefined'?UPCOMING.slice(0,6):null;o.R=ROUNDS.slice(-2);o.M=typeof MODELS!=='undefined'?MODELS:null;
 const pn=window.__x2pPnl&&window.__x2pPnl();o.pnl=pn&&Object.keys(pn);o.pnlA=pn&&JSON.stringify(pn.A).slice(0,800);o.CO=typeof CO_LOGOS!=='undefined'?Object.entries(CO_LOGOS).slice(0,3):null;o.TICK=typeof TICKERS!=='undefined'?Object.entries(TICKERS).slice(0,3):null;return o});
console.log(JSON.stringify(r,null,1).slice(0,9000));await b.close()})();
