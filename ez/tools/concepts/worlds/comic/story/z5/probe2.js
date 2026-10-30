const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
console.log(JSON.stringify(await p.evaluate(()=>({ex:[...document.querySelectorAll('#wc-book .wc-lr [data-n]')].map(e=>e.className+':'+e.dataset.n).slice(0,3),
 sim:window.SIM,nv:[].concat(UPCOMING,PENDING).find(u=>u.ticker==='NVDA'),nvl:CO_LOGOS.NVDA,f56:FILMS[56],caps:Object.keys(window.CAPS||{}).length,
 pend:PENDING.map(p=>p.n+' '+p.ticker+' '+p.resolves+' '+(p.calls||[]).length),hero:document.querySelector('main>section.hero').innerHTML.slice(0,300),
 back:!!document.querySelector('.wc-back'),vt:!!document.querySelector('.wc-film-slot .x2p-vt'),hdr:document.querySelector('header.top').offsetHeight}))),null,1);
await b.close()})();
