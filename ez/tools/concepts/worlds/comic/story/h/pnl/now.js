// node now.js <out> [widths]: today's live "Smart or lucky?" section (with its beat caption), as the page draws it.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch();for(const W of WS){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:W>1000?1:2})).newPage();await FONTS(p);
 await p.goto(`http://localhost:${process.env.PORT||8961}/v47-live-x3plus.html#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash .wc10-ch'),null,{timeout:120000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.scrollIntoView();document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'||c.position==='sticky')e.style.setProperty('visibility','hidden','important')})});
 for(let k=0;k<6;k++){await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView({block:'center'})});await p.waitForTimeout(500)}
 const r=await p.evaluate(()=>{const s=document.querySelector('.wc-splash'),c=s.previousElementSibling,a=s.getBoundingClientRect(),q=c.getBoundingClientRect();return {y:q.top+scrollY,h:a.bottom-q.top,d:[a.top,a.bottom,q.top,getComputedStyle(s).display]}});
 console.log(W,JSON.stringify(r));await p.screenshot({path:`${OUT}/pn-now-${W}.png`,fullPage:true,clip:{x:0,y:r.y-8,width:W,height:r.h+16}})}await b.close()})();
