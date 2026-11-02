const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const secs=[...document.querySelectorAll('main section, main > *')].filter(s=>s.offsetHeight>0).map(s=>({tag:s.tagName,id:s.id,cls:s.className.slice(0,80),y:Math.round(s.getBoundingClientRect().top+scrollY),h:s.offsetHeight,h2:(s.querySelector('h2')||{}).textContent}));
const R=ROUNDS,G=R.filter(r=>r.a!=null&&r.out);return {secs,n:R.length,g:G.length,last:G.slice(-2),pend:R.filter(r=>r.a==null&&r.calls&&r.calls.length).map(r=>r.n),films:Object.keys(window.FILMS||{}).length,filmEx:(window.FILMS||{})[40],co:(window.CO_LOGOS||{}).TSLA,pnl:Object.keys(__x2pPnl()),pnlA:__x2pPnl().A.GROK&&Object.keys(__x2pPnl().A.GROK)}});
console.log(JSON.stringify(r,null,1).slice(0,5000));console.log(er);await b.close()})();
