const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
await p.goto('http://localhost:8913/v47-live-x3plus.html#/upcoming',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.waitForFunction(()=>window.SE,null,{timeout:60000});
const d=await p.evaluate(()=>{const L=SE.toCome();return L.filter(x=>x.locked).map(x=>x.n+' '+x.ticker+' '+x.day+' '+x.calls.map(c=>c.m+':'+c.dir+c.mag).join(','))});console.log(d.join('\n'));
const u=await p.evaluate(()=>{const L=SE.toCome();return SE.byDay(L).map(g=>g.k+':'+g.items.length+' '+g.items.slice(0,3).map(x=>x.ticker).join(','))});console.log(u.join('\n'));
await p.evaluate(()=>location.hash='#/');await p.waitForTimeout(2500);
const cast=await p.evaluate(()=>{const hh=[...document.querySelectorAll("h2,h3,[role=heading]")].find(h=>/Meet the models/i.test(h.textContent));const e=hh&&(hh.closest("section")||hh.parentElement);if(!e)return null;const r=e.getBoundingClientRect();return {y:r.top+scrollY,h:r.height,cls:e.className}});console.log(JSON.stringify(cast));
if(cast){for(let y=0;y<cast.y+cast.h;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}await p.waitForTimeout(1500);await p.screenshot({path:OUT,clip:{x:0,y:cast.y,width:390,height:Math.min(cast.h,2400)},fullPage:true})}
await b.close()})();
