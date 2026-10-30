const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const [hash,out,W,H,y]=process.argv.slice(2);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:+W,height:+H},deviceScaleFactor:1});await FONTS(p);
await p.goto('http://localhost:8912/v47-live-x3plus.html'+hash,{waitUntil:'load',timeout:120000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}});
await p.evaluate(y=>{const n=y.startsWith('#')||y.startsWith('.')?document.querySelector(y):null;scrollTo(0,n?n.getBoundingClientRect().top+scrollY-20:+y)},y||'0');await p.waitForTimeout(2500);
await p.screenshot({path:out});await b.close()})();
