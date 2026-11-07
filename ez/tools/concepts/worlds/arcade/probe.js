const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const [hash,size,expr]=process.argv.slice(2);const [VW,VH]=(size||'390x844').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});await FONTS(p);
const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
await p.goto('http://localhost:8897/'+(process.env.PAGE||'v48-live-x4plus.html')+(hash&&hash!=='-'?hash:''),{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(expr),null,1));console.log('errors:',er.join('\n')||'none');await b.close()})();
