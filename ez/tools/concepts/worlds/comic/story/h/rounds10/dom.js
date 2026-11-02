const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:9611/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
const o=await p.evaluate(()=>{const s=document.getElementById('record');const h=s.querySelector('h2');const cs=getComputedStyle(h);
const G=ROUNDS.filter(r=>r.a!=null&&r.out);const L=G[G.length-1];
return {html:s.innerHTML.slice(0,1500),h2:[h.className,h.outerHTML.slice(0,300),cs.font,cs.color,cs.textShadow,cs.webkitTextStroke],last:L,keys:Object.keys(L),films:Object.keys(FILMS).length,film80:FILMS[80],up:(window.UPCOMING||[]).slice(0,2),pend:(window.PENDING||[]).slice(0,3),pnl:typeof __x2pPnl,logo:CO_LOGOS[L.ticker],gl:G.length}});
console.log(JSON.stringify(o,null,1));await b.close()})();
