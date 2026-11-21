const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const pg of ['v46-live-x2plus.html','v48-live-x4plus.html']){const p=await b.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true});await FONTS(p);
await p.goto('http://localhost:8897/'+pg,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
await p.evaluate(()=>document.getElementById('record').scrollIntoView({block:'center'}));await p.waitForTimeout(1500);
await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');const r=c.getBoundingClientRect();c.dispatchEvent(new MouseEvent('click',{bubbles:true,clientX:r.left+r.width/2,clientY:r.top+r.height*.3}))});await p.waitForTimeout(1500);
const nx=await p.$('.x2p-rmn.r');if(nx){await nx.click();await p.waitForTimeout(1200)}const h1=await p.evaluate(()=>location.hash);
await p.keyboard.press('Escape');await p.waitForTimeout(1200);
console.log(pg,h1,JSON.stringify(await p.evaluate(()=>({hash:location.hash,sec:document.documentElement.getAttribute('data-sec'),topHidden:document.getElementById('top').hidden,viewHidden:document.getElementById('view').hidden,y:scrollY}))))}
await b.close()})();
