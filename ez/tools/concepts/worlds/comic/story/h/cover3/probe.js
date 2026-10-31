const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://localhost:8961/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
const r=await p.evaluate(()=>{const g=ROUNDS[ROUNDS.length-1];const P=__x2pPnl();return {g:{n:g.n,a:g.a,out:g.out,win:g.win,called:g.called,res:g.resolves,film:g.film,poster:g.poster,tag:g.tag},tot:SE.totals(),pk:Object.keys(P),A:JSON.stringify(P.A||P).slice(0,700),toCome:SE.toCome().slice(0,4).map(x=>[x.ticker,x.day,x.co,x.n]),films:Object.keys(window.FILMS||{}).slice(-5)}});
console.log(JSON.stringify(r,null,1));await b.close()})();
